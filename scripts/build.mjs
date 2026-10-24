/**
 * PromoClicks — Pipeline de Build Estático (pré-renderização multipáginas)
 * Gera HTML independente por rota + sitemap.xml + robots.txt + _redirects em /dist.
 */
import { mkdirSync, writeFileSync, rmSync, cpSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_CONFIG } from '../src/config/siteConfig.mjs';
import { renderPageLayout } from '../src/components/layoutComponents.mjs';
import { PAGE_RENDERERS } from '../src/pages/pagesContent.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

if (existsSync(DIST)) rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

// 1. Copia de ativos estáticos
cpSync(join(ROOT, 'assets'), join(DIST, 'assets'), { recursive: true });

// 2. Renderização de cada rota (em /dist e espelhada na raiz do repositório)
const indexable = [];
for (const [routeKey, route] of Object.entries(SITE_CONFIG.routes)) {
  const renderer = PAGE_RENDERERS[routeKey];
  if (!renderer) throw new Error(`Sem renderizador para a rota ${routeKey}`);
  const html = renderPageLayout(routeKey, renderer());
  
  // Grava em dist/
  const outPath = join(DIST, route.outputFile);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html, 'utf8');

  // Grava diretamente na pasta correspondente na raiz do repositório
  const rootOutPath = join(ROOT, route.outputFile);
  mkdirSync(dirname(rootOutPath), { recursive: true });
  writeFileSync(rootOutPath, html, 'utf8');

  if (route.robots.startsWith('index')) indexable.push(route.path);
  console.log(`✔ ${route.path.padEnd(36)} → dist/${route.outputFile} & ${route.outputFile}`);
}

// 3. sitemap.xml (apenas URLs canônicas indexáveis)
const today = new Date().toISOString().slice(0, 10);
const priority = (p) => (p === '/' ? '1.0' : p === '/natal-premiado/' ? '0.9' : p.split('/').length > 3 ? '0.7' : '0.8');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map(
    (p) => `  <url>
    <loc>${SITE_CONFIG.baseUrl}${p}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority(p)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
writeFileSync(join(DIST, 'sitemap.xml'), sitemap, 'utf8');
writeFileSync(join(ROOT, 'sitemap.xml'), sitemap, 'utf8');

// 4. robots.txt
const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_CONFIG.baseUrl}/sitemap.xml\n`;
writeFileSync(join(DIST, 'robots.txt'), robotsTxt, 'utf8');
writeFileSync(join(ROOT, 'robots.txt'), robotsTxt, 'utf8');

// 5. _redirects (Netlify/Cloudflare Pages) — barra final canônica e normalização permanente 301 de index.html
// Nota: Cloudflare Workers Assets não permite status 404 em _redirects (apenas 200, 301, 302, 303, 307, 308).
// O 404 é tratado nativamente via "not_found_handling": "404-page" no wrangler.jsonc.
const redirectsTxt = [
  '/index.html                                  /                                      301',
  '/quem-somos                                  /quem-somos/                           301',
  '/quem-somos/index.html                       /quem-somos/                           301',
  '/servicos                                    /servicos/                             301',
  '/servicos/index.html                         /servicos/                             301',
  '/servicos/campanhas-coletivas                /servicos/campanhas-coletivas/         301',
  '/servicos/campanhas-coletivas/index.html     /servicos/campanhas-coletivas/         301',
  '/servicos/campanhas-exclusivas               /servicos/campanhas-exclusivas/        301',
  '/servicos/campanhas-exclusivas/index.html    /servicos/campanhas-exclusivas/        301',
  '/servicos/inteligencia-de-dados              /servicos/inteligencia-de-dados/       301',
  '/servicos/inteligencia-de-dados/index.html   /servicos/inteligencia-de-dados/       301',
  '/natal-premiado                              /natal-premiado/                       301',
  '/natal-premiado/index.html                   /natal-premiado/                       301',
  '/cases                                       /cases/                                301',
  '/cases/index.html                            /cases/                                301',
  '/participe                                   /participe/                            301',
  '/participe/index.html                        /participe/                            301',
  '/contato                                     /contato/                              301',
  '/contato/index.html                          /contato/                              301',
  '/politica-de-privacidade                     /politica-de-privacidade/              301',
  '/politica-de-privacidade/index.html          /politica-de-privacidade/              301',
  '/termos-de-uso                               /termos-de-uso/                        301',
  '/termos-de-uso/index.html                    /termos-de-uso/                        301',
  '/regulamento                                 /regulamento/                          301',
  '/regulamento/index.html                      /regulamento/                          301',
  ''
].join('\n');
writeFileSync(join(DIST, '_redirects'), redirectsTxt, 'utf8');
writeFileSync(join(ROOT, '_redirects'), redirectsTxt, 'utf8');

// 6. _headers (Cloudflare Pages) — segurança e política de cache inteligente sem sobreposição conflitante
const headersTxt = [
  '/*',
  '  X-Content-Type-Options: nosniff',
  '  X-Frame-Options: SAMEORIGIN',
  '  Referrer-Policy: strict-origin-when-cross-origin',
  '  Permissions-Policy: camera=(), microphone=(), geolocation=()',
  '/assets/css/*',
  '  Cache-Control: public, max-age=0, must-revalidate',
  '/assets/js/*',
  '  Cache-Control: public, max-age=0, must-revalidate',
  '/assets/images/*',
  '  Cache-Control: public, max-age=86400, stale-while-revalidate=604800',
  ''
].join('\n');
writeFileSync(join(DIST, '_headers'), headersTxt, 'utf8');
writeFileSync(join(ROOT, '_headers'), headersTxt, 'utf8');

console.log(`\nBuild concluído: ${Object.keys(SITE_CONFIG.routes).length} páginas, ${indexable.length} URLs no sitemap.`);
