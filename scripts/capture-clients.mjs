import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9224;
const BASE_URL = 'http://localhost:4173';
const OUTPUT_DIR = 'C:/Users/marco/.gemini/antigravity/brain/f11926d1-a63f-4dfb-a62b-01c8b380803b';

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

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
  throw new Error('Chrome failed to start');
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
    if (this.ws.readyState === 1) return;
    return new Promise((resolve) => {
      this.ws.onopen = resolve;
    });
  }

  async send(method, params = {}) {
    await this.ready();
    const id = this.id++;
    return new Promise((resolve, reject) => {
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

  const newTarget = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const pageCdp = new CDPClient(`ws://127.0.0.1:${PORT}/devtools/page/${newTarget.targetId}`);
  await pageCdp.send('Page.enable');
  await pageCdp.send('DOM.enable');

  await pageCdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  // 1. Home Clients
  await pageCdp.send('Page.navigate', { url: `${BASE_URL}/` });
  await sleep(1500);
  await pageCdp.send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.querySelector('.clients-section');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`
  });
  await sleep(500);
  let ss = await pageCdp.send('Page.captureScreenshot', { format: 'png' });
  writeFileSync(join(OUTPUT_DIR, 'clients-view-home-v2.png'), Buffer.from(ss.data, 'base64'));
  console.log('Saved clients-view-home-v2.png');

  // 2. Quem Somos Authority Pillars (replaced emojis)
  await pageCdp.send('Page.navigate', { url: `${BASE_URL}/quem-somos/` });
  await sleep(1500);
  await pageCdp.send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.querySelector('.authority-widget');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`
  });
  await sleep(500);
  ss = await pageCdp.send('Page.captureScreenshot', { format: 'png' });
  writeFileSync(join(OUTPUT_DIR, 'authority-pillars-view-v2.png'), Buffer.from(ss.data, 'base64'));
  console.log('Saved authority-pillars-view-v2.png');

  await pageCdp.close();
  await cdp.close();
  proc.kill();
}

run().catch(console.error);
