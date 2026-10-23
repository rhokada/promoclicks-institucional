import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9225;
const USER_DATA_DIR = "C:\\Users\\marco\\.gemini\\antigravity\\scratch\\promoclicks-site\\.chrome-temp";

mkdirSync('screenshots/cards', { recursive: true });
mkdirSync(USER_DATA_DIR, { recursive: true });

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function run() {
  const proc = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    `--user-data-dir=${USER_DATA_DIR}`,
    `--remote-debugging-port=${PORT}`,
    'about:blank'
  ]);

  for (let i = 0; i < 25; i++) {
    await sleep(200);
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

  const targets = [
    {
      name: 'home-cards',
      url: 'http://localhost:4173/',
      selector: '.cards-grid'
    },
    {
      name: 'natal-plans',
      url: 'http://localhost:4173/natal-premiado/',
      selector: '.pricing-grid'
    },
    {
      name: 'participe-tabs',
      url: 'http://localhost:4173/participe/',
      selector: '.tab-nav'
    },
    {
      name: 'participe-steps',
      url: 'http://localhost:4173/participe/',
      selector: '.steps-container'
    },
    {
      name: 'servicos-cards',
      url: 'http://localhost:4173/servicos/',
      selector: '.cards-grid'
    }
  ];

  for (const t of targets) {
    await send('Page.navigate', { url: t.url });
    await sleep(500);

    await send('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true
    });
    await sleep(300);

    // Scroll element into view
    await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.querySelector('${t.selector}');
        if (el) {
          el.scrollIntoView({ block: 'start', inline: 'nearest' });
          window.scrollBy(0, -60); // Offset header
        }
      })()`
    });
    await sleep(300);

    const ssRes = await send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false
    });

    const filepath = join('screenshots/cards', `${t.name}-mobile-375.png`);
    writeFileSync(filepath, Buffer.from(ssRes.data, 'base64'));
    console.log(`Saved screenshot: ${filepath}`);
  }

  ws.close();
  proc.kill();
  console.log('Done capturing all card screenshots!');
}

run().catch(console.error);
