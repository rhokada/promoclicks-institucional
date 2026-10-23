/**
 * Servidor estático local para pré-visualização do /dist (sem dependências).
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const PORT = Number(process.env.PORT || 5178);
const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png',
  '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.ico': 'image/x-icon'
};

createServer(async (req, res) => {
  let urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (!urlPath.endsWith('/') && !extname(urlPath)) {
    res.writeHead(301, { Location: urlPath + '/' });
    return res.end();
  }
  let file = join(DIST, urlPath.endsWith('/') ? urlPath + 'index.html' : urlPath);
  if (!file.startsWith(DIST)) { res.writeHead(403); return res.end(); }
  try {
    await stat(file);
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404, { 'Content-Type': MIME['.html'] });
    res.end(await readFile(join(DIST, '404.html')));
  }
}).listen(PORT, () => console.log(`PromoClicks em http://localhost:${PORT}/`));
