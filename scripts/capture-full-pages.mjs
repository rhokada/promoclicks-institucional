import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9222;
const BASE_URL = 'http://localhost:4173';

mkdirSync('screenshots/full', { recursive: true });

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function startChrome() {
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
      if (res.ok) {
        const json = await res.json();
        return { proc, wsUrl: json.webSocketDebuggerUrl };
      }
    } catch {}
  }
  proc.kill();
  throw new Error('Chrome failed to start or open debugging port');
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.callbacks = new Map();
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && this.callbacks.has(data.id)) {
        const cb = this.callbacks.get(data.id);
        this.callbacks.delete(data.id);
        if (data.error) cb.reject(new Error(data.error.message));
        else cb.resolve(data.result);
      }
    };
  }

  async ready() {
    if (this.ws.readyState === WebSocket.OPEN) return;
    await new Promise((res, rej) => {
      this.ws.onopen = res;
      this.ws.onerror = rej;
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async close() {
    this.ws.close();
  }
}

async function run() {
  const { proc, wsUrl } = await startChrome();
  const cdp = new CDPClient(wsUrl);
  await cdp.ready();

  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const pageRes = await fetch(`http://127.0.0.1:${PORT}/json/list`);
  const pages = await pageRes.json();
  const targetPage = pages.find(p => p.id === targetId);
  const pageCdp = new CDPClient(targetPage.webSocketDebuggerUrl);
  await pageCdp.ready();

  await pageCdp.send('Page.enable');

  const routes = [
    { name: 'home', path: '/' },
    { name: 'natal', path: '/natal-premiado/' },
    { name: 'participe', path: '/participe/' },
    { name: 'contato', path: '/contato/' }
  ];

  for (const r of routes) {
    await pageCdp.send('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true
    });

    await pageCdp.send('Page.navigate', { url: `${BASE_URL}${r.path}` });
    await sleep(500);

    const ssRes = await pageCdp.send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true
    });
    const filename = `full-${r.name}-mobile-375.png`;
    writeFileSync(join('screenshots/full', filename), Buffer.from(ssRes.data, 'base64'));
    console.log(`Saved: screenshots/full/${filename}`);
  }

  await pageCdp.close();
  await cdp.close();
  proc.kill();
  console.log('Done!');
}

run().catch(console.error);
