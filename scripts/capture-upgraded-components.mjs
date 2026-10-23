import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TEMP_PROFILE = path.resolve('.chrome-temp-capture');

async function main() {
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9223',
    `--user-data-dir=${TEMP_PROFILE}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const list = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9223/json/list', res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const page = list.find(t => t.type === 'page') || list[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let idCounter = 1;
  const pending = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  await new Promise(r => ws.onopen = r);

  await send('Page.enable');
  await send('DOM.enable');

  // Set viewport to 1280x900
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 900,
    deviceScaleFactor: 2,
    mobile: false
  });

  // Navigate to Home
  await send('Page.navigate', { url: 'http://localhost:4173/' });
  await new Promise(r => setTimeout(r, 1500));

  const shotHome = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/desktop-home-hero.png', Buffer.from(shotHome.data, 'base64'));

  // Scroll to pipeline widget and capture
  await send('Runtime.evaluate', {
    expression: `document.querySelector('.pipeline-widget').scrollIntoView({ behavior: 'instant', block: 'center' })`
  });
  await new Promise(r => setTimeout(r, 800));
  const shotPipeline = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/desktop-home-pipeline.png', Buffer.from(shotPipeline.data, 'base64'));

  // Navigate to Quem Somos and capture authority widget
  await send('Page.navigate', { url: 'http://localhost:4173/quem-somos/' });
  await new Promise(r => setTimeout(r, 1500));
  await send('Runtime.evaluate', {
    expression: `document.querySelector('.authority-widget').scrollIntoView({ behavior: 'instant', block: 'center' })`
  });
  await new Promise(r => setTimeout(r, 800));
  const shotAuthority = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/desktop-quem-somos-authority.png', Buffer.from(shotAuthority.data, 'base64'));

  console.log('Capturas salvas com sucesso!');
  ws.close();
  chromeProc.kill();
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
