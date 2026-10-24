/**
 * PromoClicks — Validação automatizada do build (SEO, semântica, imagens e links).
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_CONFIG } from '../src/config/siteConfig.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const errors = [];
const warnings = [];
const titles = new Map();
const descs = new Map();
const err = (p, m) => errors.push(`[${p}] ${m}`);

const resolveTarget = (href) => {
  const clean = href.split('#')[0].split('?')[0];
  if (!clean) return true;
  const p = join(DIST, clean.endsWith('/') ? clean + 'index.html' : clean);
  return existsSync(p);
};

for (const route of Object.values(SITE_CONFIG.routes)) {
  const file = join(DIST, route.outputFile);
  if (!existsSync(file)) { err(route.path, 'arquivo não gerado'); continue; }
  const html = readFileSync(file, 'utf8');
  const tag = route.path;

  if (!/<html lang="pt-BR">/.test(html)) err(tag, 'lang pt-BR ausente');
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!title) err(tag, 'title ausente');
  if (!desc) err(tag, 'meta description ausente');
  if (title && titles.has(title)) err(tag, `title duplicado com ${titles.get(title)}`);
  if (desc && descs.has(desc)) err(tag, `description duplicada com ${descs.get(desc)}`);
  titles.set(title, tag); descs.set(desc, tag);
  if (title && title.length > 75) warnings.push(`[${tag}] title com ${title.length} caracteres`);
  if (desc && (desc.length < 110 || desc.length > 175)) warnings.push(`[${tag}] description com ${desc.length} caracteres`);

  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  if (route.path !== '/404.html') {
    if (canonical !== `${SITE_CONFIG.baseUrl}${route.path}`) err(tag, `canonical incorreta: ${canonical}`);
  } else if (canonical) {
    err(tag, 'página 404 não deve conter tag canonical');
  }
  if (!html.includes(`<meta name="robots" content="${route.robots}"`)) err(tag, 'robots incorreto');
  for (const og of ['og:title', 'og:description', 'og:url', 'og:image', 'og:locale']) {
    if (!html.includes(`property="${og}"`)) err(tag, `${og} ausente`);
  }

  // Headings
  const h1s = html.match(/<h1[\s>]/g) || [];
  if (h1s.length !== 1) err(tag, `esperado 1 H1, encontrado ${h1s.length}`);
  const main = html.split('<main')[1]?.split('</main>')[0] || '';
  const levels = [...main.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) err(tag, `salto de heading H${levels[i - 1]} → H${levels[i]}`);
  }

  // JSON-LD
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!ld.length) err(tag, 'JSON-LD ausente');
  for (const m of ld) {
    try {
      const data = JSON.parse(m[1]);
      const types = JSON.stringify(data);
      if (/"Event"|"AggregateRating"|"Review"/.test(types)) err(tag, 'schema proibido (Event/Review/Rating)');
    } catch (e) { err(tag, `JSON-LD inválido: ${e.message}`); }
  }

  // Imagens
  for (const m of html.matchAll(/<img\b([^>]*)>/g)) {
    const a = m[1];
    if (!/\balt="/.test(a)) err(tag, `img sem alt: ${a.slice(0, 80)}`);
    if (!/\bwidth="\d+"/.test(a) || !/\bheight="\d+"/.test(a)) err(tag, `img sem dimensões: ${a.slice(0, 80)}`);
    const src = (a.match(/\bsrc="([^"]+)"/) || [])[1];
    if (src && !resolveTarget(src)) err(tag, `imagem quebrada: ${src}`);
  }
  for (const m of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const part of m[1].split(',')) {
      const u = part.trim().split(/\s+/)[0];
      if (u.startsWith('/') && !resolveTarget(u)) err(tag, `srcset quebrado: ${u}`);
    }
  }

  // Links e assets internos
  for (const m of html.matchAll(/\b(?:href|src)="(\/[^"]*)"/g)) {
    const u = m[1].replace(/&amp;/g, '&');
    if (!resolveTarget(u)) err(tag, `link interno quebrado: ${u}`);
  }
  // Âncoras na mesma página
  for (const m of html.matchAll(/href="#([^"]+)"/g)) {
    if (m[1] !== 'conteudo-principal' && !html.includes(`id="${m[1]}"`)) err(tag, `âncora inexistente: #${m[1]}`);
  }
}

// Sitemap
const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const expected = Object.values(SITE_CONFIG.routes).filter((r) => r.robots.startsWith('index')).map((r) => SITE_CONFIG.baseUrl + r.path);
if (locs.length !== expected.length || !expected.every((u) => locs.includes(u))) err('sitemap', 'URLs divergentes das rotas indexáveis');
if (!existsSync(join(DIST, 'robots.txt'))) err('robots.txt', 'ausente');

// Cobertura de classes CSS (toda classe usada no HTML precisa existir na folha de estilo)
const css = readFileSync(join(DIST, 'assets/css/main.css'), 'utf8').replace(/url\([^)]*\)/g, '');
const cssClasses = new Set([...css.matchAll(/\.([a-zA-Z][\w-]*)/g)].map((m) => m[1]));
const jsHooks = new Set(['is-open', 'is-selected']);
const missingClasses = new Set();
for (const route of Object.values(SITE_CONFIG.routes)) {
  const html = readFileSync(join(DIST, route.outputFile), 'utf8');
  for (const m of html.matchAll(/class="([^"]+)"/g)) {
    m[1].split(/\s+/).filter(Boolean).forEach((c) => { if (!cssClasses.has(c) && !jsHooks.has(c)) missingClasses.add(c); });
  }
}
if (missingClasses.size) err('css', `classes sem estilo: ${[...missingClasses].join(', ')}`);

// Peso total de imagens
let imgBytes = 0;
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : (imgBytes += statSync(p).size); });
walk(join(DIST, 'assets', 'images'));

console.log(`Páginas verificadas: ${Object.keys(SITE_CONFIG.routes).length}`);
console.log(`URLs no sitemap: ${locs.length}`);
console.log(`Peso total da pasta de imagens: ${(imgBytes / 1024 / 1024).toFixed(2)} MB`);
if (warnings.length) console.log(`\nAvisos (${warnings.length}):\n  ` + warnings.join('\n  '));
if (errors.length) {
  console.error(`\nERROS (${errors.length}):\n  ` + errors.join('\n  '));
  process.exit(1);
}
console.log('\n✔ Validação concluída sem erros.');
