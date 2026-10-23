import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import os from 'node:os';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9333;
const BASE_URL = 'http://localhost:5178';

mkdirSync('screenshots', { recursive: true });

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function startChrome() {
  const tempProfileDir = join(os.tmpdir(), `chrome-verify-${Date.now()}`);
  mkdirSync(tempProfileDir, { recursive: true });

  const proc = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    `--user-data-dir=${tempProfileDir}`,
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
  console.log('Iniciando Chrome Headless CDP...');
  const { proc, wsUrl } = await startChrome();
  const cdp = new CDPClient(wsUrl);
  await cdp.ready();
  console.log('Conectado ao Chrome DevTools Protocol via WebSocket.');

  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const pageRes = await fetch(`http://127.0.0.1:${PORT}/json/list`);
  const pages = await pageRes.json();
  const targetPage = pages.find(p => p.id === targetId);
  const pageCdp = new CDPClient(targetPage.webSocketDebuggerUrl);
  await pageCdp.ready();

  await pageCdp.send('Page.enable');
  await pageCdp.send('DOM.enable');

  const viewports = [
    { name: 'mobile-375', width: 375, height: 812, mobile: true },
    { name: 'mobile-320', width: 320, height: 568, mobile: true },
    { name: 'tablet-768', width: 768, height: 1024, mobile: true },
    { name: 'desktop-1280', width: 1280, height: 800, mobile: false }
  ];

  const routes = [
    '/',
    '/natal-premiado/',
    '/participe/',
    '/servicos/',
    '/servicos/campanhas-coletivas/',
    '/servicos/campanhas-exclusivas/',
    '/servicos/inteligencia-de-dados/',
    '/cases/',
    '/quem-somos/',
    '/contato/',
    '/regulamento/'
  ];

  const summary = [];

  for (const vp of viewports) {
    console.log(`\n========================================`);
    console.log(`TESTANDO VIEWPORT: ${vp.name} (${vp.width}x${vp.height})`);
    console.log(`========================================`);

    await pageCdp.send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 2,
      mobile: vp.mobile
    });
    await sleep(250);

    for (const route of routes) {
      const url = `${BASE_URL}${route}`;
      await pageCdp.send('Page.navigate', { url });
      await sleep(1000);

      // Check overflow & element metrics
      const evalRes = await pageCdp.send('Runtime.evaluate', {
        expression: `(() => {
          const docW = document.documentElement.scrollWidth;
          const bodyW = document.body.scrollWidth;
          const winW = window.innerWidth;
          
          const overflowing = [];
          document.querySelectorAll('*').forEach(el => {
            // Ignore deliberate horizontal scroll containers (tables and mobile pricing carousels)
            if (el.closest('.table-wrapper, .table-wrap, .table-responsive, .pricing-grid, .site-nav:not(.is-open)')) return;

            const r = el.getBoundingClientRect();
            // allow 1px tolerance for subpixel antialiasing
            if (r.right > winW + 1) {
              overflowing.push({
                tag: el.tagName.toLowerCase(),
                cls: el.className ? el.className.toString().slice(0, 40) : '',
                id: el.id,
                right: Math.round(r.right),
                width: Math.round(r.width),
                text: (el.innerText || '').slice(0, 30).trim()
              });
            }
          });

          // Check card text wrapping specifically
          const clippedCards = [];
          document.querySelectorAll('.card, .plan-card, .step-item, .stat-card, .tab-trigger, .differential-item').forEach(card => {
            if (card.scrollWidth > card.clientWidth + 2) {
              clippedCards.push({
                cls: card.className ? card.className.toString().slice(0, 40) : '',
                scrollW: card.scrollWidth,
                clientW: card.clientWidth,
                text: (card.innerText || '').slice(0, 30).trim()
              });
            }
          });

          // Check font size >= 16px (15.9px tolerance for subpixel rounding)
          const sub16Elements = [];
          document.querySelectorAll('body *:not(script):not(style):not(svg):not(path)').forEach(el => {
            const hasDirectText = Array.from(el.childNodes).some(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0);
            if (!hasDirectText) return;
            const style = window.getComputedStyle(el);
            if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;
            const size = parseFloat(style.fontSize);
            if (size < 15.9) {
              sub16Elements.push({
                tag: el.tagName.toLowerCase(),
                cls: el.className ? el.className.toString().slice(0, 40) : '',
                fontSize: size,
                text: (el.innerText || '').slice(0, 30).trim()
              });
            }
          });

          return {
            winW,
            docW,
            bodyW,
            hasHScroll: docW > winW || bodyW > winW,
            overflowCount: overflowing.length,
            overflowing: overflowing.slice(0, 5),
            clippedCardsCount: clippedCards.length,
            clippedCards: clippedCards.slice(0, 5),
            sub16Count: sub16Elements.length,
            sub16Elements: sub16Elements.slice(0, 5)
          };
        })()`,
        returnByValue: true
      });

      if (!evalRes?.result?.value) {
        console.error(`Falha ao avaliar métricas na rota: ${route}`, evalRes);
        summary.push({
          viewport: vp.name,
          route,
          pass: false,
          metrics: { winW: vp.width, hasHScroll: true, overflowCount: 1, clippedCardsCount: 0, sub16Count: 0 }
        });
        continue;
      }

      const metrics = evalRes.result.value;
      const pass = !metrics.hasHScroll && metrics.overflowCount === 0 && metrics.clippedCardsCount === 0 && metrics.sub16Count === 0;

      const statusStr = pass ? '✔ PASS' : '❌ FAIL';
      console.log(`[${statusStr}] ${route.padEnd(20)} | winW: ${metrics.winW}px | cardClips: ${metrics.clippedCardsCount} | overflows: ${metrics.overflowCount} | sub16: ${metrics.sub16Count}`);

      if (!pass) {
        if (metrics.overflowing.length > 0) {
          console.log(`   Elementos fora da viewport:`, metrics.overflowing);
        }
        if (metrics.clippedCards.length > 0) {
          console.log(`   Cards com scroll interno/corte:`, metrics.clippedCards);
        }
        if (metrics.sub16Count > 0) {
          console.log(`   Elementos com fonte < 16px:`, metrics.sub16Elements);
        }
      }

      // Take screenshot of key routes on mobile 375 and desktop 1280
      if ((vp.name === 'mobile-375' || vp.name === 'desktop-1280') && (route === '/' || route === '/natal-premiado/' || route === '/participe/')) {
        const cleanName = route === '/' ? 'home' : route.replace(/\//g, '');
        const filename = `screenshot-${cleanName}-${vp.name}.png`;
        const ssRes = await pageCdp.send('Page.captureScreenshot', {
          format: 'png',
          captureBeyondViewport: false
        });
        writeFileSync(join('screenshots', filename), Buffer.from(ssRes.data, 'base64'));
        console.log(`   📸 Screenshot salvo: screenshots/${filename}`);
      }

      summary.push({
        viewport: vp.name,
        route,
        pass,
        metrics
      });
    }
  }

  await pageCdp.close();
  await cdp.close();
  proc.kill();

  const totalTests = summary.length;
  const passedTests = summary.filter(s => s.pass).length;
  console.log(`\n========================================`);
  console.log(`RESUMO DA VALIDAÇÃO RESPONSIVA`);
  console.log(`Total de testes: ${totalTests}`);
  console.log(`Aprovados: ${passedTests} / ${totalTests}`);
  console.log(`========================================\n`);

  if (passedTests === totalTests) {
    console.log('🎉 SUCESSO TOTAL: 100% das páginas testadas são 100% responsivas sem nenhum corte ou overflow horizontal em nenhuma viewport!');
    process.exit(0);
  } else {
    console.error('⚠️ ALGUNS ITENS REQUEREM AJUSTES');
    process.exit(1);
  }
}

run().catch(err => {
  console.error('Erro na execução:', err);
  process.exit(1);
});
