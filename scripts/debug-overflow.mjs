import { createServer } from 'node:http';
import { readFileSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';

const file = 'dist/index.html';
const orig = readFileSync(file, 'utf8');

const detector = `<script>
window.addEventListener('load', () => {
  setTimeout(() => {
    const w = window.innerWidth;
    const bad = [];
    document.querySelectorAll('*').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.right > w + 1) {
        bad.push({
          tag: el.tagName,
          cls: el.className,
          id: el.id,
          right: Math.round(r.right),
          w: Math.round(r.width),
          text: (el.innerText || '').slice(0, 50).replace(/\\n/g, ' ')
        });
      }
    });
    fetch('http://localhost:5999/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ w, bad })
    });
  }, 500);
});
</script>`;

writeFileSync(file, orig.replace('</body>', detector + '</body>'), 'utf8');

const srv = createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/report') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      res.writeHead(200);
      res.end('ok');
      const data = JSON.parse(body);
      console.log(`\n=== OVERFLOW REPORT (Viewport = ${data.w}px) ===`);
      console.log(`Found ${data.bad.length} overflowing elements:\n`);
      data.bad.forEach((item, idx) => {
        console.log(`${idx + 1}. <${item.tag.toLowerCase()} class="${item.cls}" id="${item.id}"> width=${item.w}px right=${item.right}px`);
        if (item.text) console.log(`   Text: "${item.text}"`);
      });
      console.log('===============================================\n');
      srv.close();
      proc.kill();
      writeFileSync(file, orig, 'utf8');
      process.exit(0);
    });
  }
}).listen(5999);

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const proc = spawn(chrome, [
  '--headless=new',
  '--disable-gpu',
  '--window-size=375,812',
  'http://localhost:4173/'
]);
