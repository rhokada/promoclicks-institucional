/**
 * Servidor estático local para pré-visualização do /dist com suporte a:
 * - Content Negotiation (Accept: text/markdown)
 * - Cabeçalhos de Descoberta de Agentes (Link, Content-Signal)
 * - Mapeamento MIME para Catálogos e Metadados de IA
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const PORT = Number(process.env.PORT || 5178);
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon'
};

const LINK_HEADER = '</.well-known/api-catalog>; rel="api-catalog", </.well-known/ai-catalog.json>; rel="service-desc", </auth.md>; rel="service-doc"';

createServer(async (req, res) => {
  let urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const accept = req.headers['accept'] || '';

  // 1. Content Negotiation: Accept: text/markdown
  if (accept.includes('text/markdown')) {
    let mdRel = urlPath;
    if (mdRel.endsWith('/')) mdRel += 'index.md';
    else if (!extname(mdRel)) mdRel += '/index.md';
    else if (mdRel.endsWith('.html')) mdRel = mdRel.replace(/\.html$/, '.md');

    let mdFile = join(DIST, mdRel);
    try {
      await stat(mdFile);
      const content = await readFile(mdFile);
      const tokenCount = Math.ceil(content.length / 4);
      res.writeHead(200, {
        'Content-Type': 'text/markdown; charset=utf-8',
        'x-markdown-tokens': String(tokenCount),
        'Vary': 'Accept',
        'Content-Signal': 'ai-train=no, search=yes, ai-input=no',
        'Link': LINK_HEADER,
        'Access-Control-Allow-Origin': '*'
      });
      return res.end(content);
    } catch {
      // Fallback para llms.txt
      try {
        const fallbackFile = join(DIST, 'llms.txt');
        const content = await readFile(fallbackFile);
        res.writeHead(200, {
          'Content-Type': 'text/markdown; charset=utf-8',
          'x-markdown-tokens': String(Math.ceil(content.length / 4)),
          'Vary': 'Accept',
          'Content-Signal': 'ai-train=no, search=yes, ai-input=no',
          'Link': LINK_HEADER,
          'Access-Control-Allow-Origin': '*'
        });
        return res.end(content);
      } catch {
        // Segue fluxo normal
      }
    }
  }

  // 2. Normalização de trailing slash para rotas sem extensão
  if (!urlPath.endsWith('/') && !extname(urlPath)) {
    // Permite endpoints de .well-known sem barra final
    if (!urlPath.startsWith('/.well-known/')) {
      res.writeHead(301, { Location: urlPath + '/' });
      return res.end();
    }
  }

  let file = join(DIST, urlPath.endsWith('/') ? urlPath + 'index.html' : urlPath);
  if (!file.startsWith(DIST)) {
    res.writeHead(403);
    return res.end();
  }

  try {
    await stat(file);
    let contentType = MIME[extname(file)] || 'application/octet-stream';
    if (urlPath === '/.well-known/api-catalog') contentType = 'application/linkset+json; charset=utf-8';
    else if (urlPath.startsWith('/.well-known/') && !extname(urlPath)) contentType = 'application/json; charset=utf-8';

    const headers = {
      'Content-Type': contentType,
      'Content-Signal': 'ai-train=no, search=yes, ai-input=no',
      'Access-Control-Allow-Origin': '*'
    };

    if (urlPath === '/' || urlPath === '/index.html') {
      headers['Link'] = LINK_HEADER;
    }

    res.writeHead(200, headers);
    res.end(await readFile(file));
  } catch {
    res.writeHead(404, { 'Content-Type': MIME['.html'] });
    res.end(await readFile(join(DIST, '404.html')));
  }
}).listen(PORT, () => console.log(`PromoClicks preview em http://localhost:${PORT}/`));
