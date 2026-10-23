import { spawn } from 'node:child_process';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9223;

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function run() {
  const proc = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${PORT}`,
    'about:blank'
  ]);
  
  for (let i = 0; i < 20; i++) {
    await sleep(250);
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) break;
    } catch {}
  }

  const listRes = await fetch(`http://127.0.0.1:${PORT}/json/list`);
  const pages = await listRes.json();
  const ws = new WebSocket(pages[0].webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const curId = id++;
    const handler = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.id === curId) {
        ws.removeEventListener('message', handler);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: curId, method, params }));
  });

  await send('Page.enable');
  await send('Page.navigate', { url: 'http://localhost:4173/' });
  await sleep(600);

  // Set 768 viewport AFTER navigation
  await send('Emulation.setDeviceMetricsOverride', {
    width: 768,
    height: 1024,
    deviceScaleFactor: 2,
    mobile: true
  });
  await sleep(400);

  const evalRes = await send('Runtime.evaluate', {
    expression: `(() => {
      const winW = window.innerWidth;
      const elements = [];
      document.querySelectorAll('*').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.right > winW + 1) {
          elements.push({
            tag: el.tagName.toLowerCase(),
            class: el.className,
            parent: el.parentElement ? el.parentElement.tagName.toLowerCase() + '.' + el.parentElement.className : null,
            width: Math.round(r.width),
            right: Math.round(r.right),
            inlineStyle: el.getAttribute('style') || ''
          });
        }
      });
      return { winW, scrollW: document.documentElement.scrollWidth, elements: elements.slice(0, 10) };
    })()`,
    returnByValue: true
  });

  console.log(JSON.stringify(evalRes.result.value, null, 2));

  ws.close();
  proc.kill();
}

run().catch(console.error);
