/**
 * PromoClicks — Gerador de OG Images Oficiais (Open Graph 1200x630)
 * Renderiza via Chrome Headless com supersampling 2x (2400x1260 -> 1200x630 Lanczos)
 * Fontes oficiais do manual de marca (Alegreya Sans + Poppins)
 * Gera JPG, WebP e PNG para todas as redes sociais.
 */

import { spawn, execSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9224;

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function startChrome() {
  const proc = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${PORT}`,
    'about:blank'
  ]);

  for (let i = 0; i < 25; i++) {
    await sleep(200);
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) {
        const json = await res.json();
        return { proc, wsUrl: json.webSocketDebuggerUrl };
      }
    } catch {}
  }
  proc.kill();
  throw new Error('Chrome failed to start on port ' + PORT);
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

const logoPath = join(ROOT, 'assets', 'images', 'brand', 'promoclicks-logo-horizontal-dark.png');
const logoBase64 = `data:image/png;base64,${readFileSync(logoPath).toString('base64')}`;

const templates = [
  {
    id: 'og-promoclicks-share',
    title: 'Geral B2B',
    html: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@700;800;900&family=Poppins:wght@400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    body {
      width: 1200px;
      height: 630px;
      overflow: hidden;
      background: #0b0c10;
      font-family: 'Poppins', sans-serif;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .glow-coral {
      position: absolute;
      top: -120px;
      right: -80px;
      width: 560px;
      height: 560px;
      background: radial-gradient(circle, rgba(255, 49, 49, 0.35) 0%, rgba(255, 49, 49, 0) 70%);
      filter: blur(50px);
      pointer-events: none;
    }
    .glow-orange {
      position: absolute;
      bottom: -140px;
      left: -80px;
      width: 520px;
      height: 520px;
      background: radial-gradient(circle, rgba(255, 145, 77, 0.28) 0%, rgba(255, 145, 77, 0) 70%);
      filter: blur(55px);
      pointer-events: none;
    }
    .grid-pattern {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
      background-size: 44px 44px;
      pointer-events: none;
      opacity: 0.7;
    }
    .og-card {
      width: 1120px;
      height: 550px;
      background: linear-gradient(135deg, rgba(20, 22, 28, 0.92) 0%, rgba(13, 14, 18, 0.97) 100%);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 24px;
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.12);
      padding: 44px 54px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      z-index: 2;
    }
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand-logo {
      height: 62px;
      object-fit: contain;
    }
    .badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(255, 49, 49, 0.12);
      border: 1px solid rgba(255, 49, 49, 0.35);
      padding: 8px 20px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #FF914D;
    }
    .pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #FF3131;
      box-shadow: 0 0 12px #FF3131;
    }
    .content-area {
      margin-top: 10px;
    }
    .main-title {
      font-family: 'Alegreya Sans', sans-serif;
      font-size: 52px;
      font-weight: 900;
      line-height: 1.12;
      letter-spacing: -0.5px;
      color: #FFFFFF;
      margin-bottom: 14px;
      max-width: 980px;
    }
    .gradient-text {
      background: linear-gradient(135deg, #FF3131 0%, #FF914D 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .description {
      font-size: 19px;
      line-height: 1.5;
      color: #A5AAB8;
      max-width: 960px;
      font-weight: 400;
    }
    .footer-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 22px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    .features-list {
      display: flex;
      gap: 12px;
    }
    .feature-chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 8px 16px;
      border-radius: 10px;
      font-size: 13.5px;
      font-weight: 500;
      color: #E2E4EB;
      white-space: nowrap;
    }
    .feature-icon {
      color: #FF914D;
      font-size: 14px;
    }
    .url-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 700;
      color: #FF914D;
      letter-spacing: 0.5px;
      background: rgba(255, 145, 77, 0.1);
      border: 1px solid rgba(255, 145, 77, 0.3);
      padding: 8px 18px;
      border-radius: 999px;
      white-space: nowrap;
    }
  </style>
</head>
<body>
  <div class="glow-coral"></div>
  <div class="glow-orange"></div>
  <div class="grid-pattern"></div>
  <div class="og-card">
    <div class="top-bar">
      <img src="${logoBase64}" alt="PromoClicks" class="brand-logo">
      <div class="badge-pill">
        <span class="pulse-dot"></span>
        Plataforma B2B de Aceleração
      </div>
    </div>
    <div class="content-area">
      <h1 class="main-title">
        Inteligência Promocional, <span class="gradient-text">Gamificação</span> e Aceleração de Vendas.
      </h1>
      <p class="description">
        Campanhas coletivas e exclusivas para marcas e redes varejistas. Estrutura homologada, sorteios digitais com segurança jurídica (SPA / MF) e auditoria de resultados.
      </p>
    </div>
    <div class="footer-bar">
      <div class="features-list">
        <div class="feature-chip"><span class="feature-icon">✦</span> Campanhas Coletivas & Exclusivas</div>
        <div class="feature-chip"><span class="feature-icon">✦</span> Sorteios Digitais & Gamificação</div>
        <div class="feature-chip"><span class="feature-icon">✦</span> Conformidade Jurídica SPA / MF</div>
      </div>
      <div class="url-badge">promoclicks.pages.dev</div>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'og-natal-premiado',
    title: 'Natal Premiado',
    html: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@700;800;900&family=Poppins:wght@400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    body {
      width: 1200px;
      height: 630px;
      overflow: hidden;
      background: #0d0a0f;
      font-family: 'Poppins', sans-serif;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .glow-gold {
      position: absolute;
      top: -100px;
      right: -60px;
      width: 540px;
      height: 540px;
      background: radial-gradient(circle, rgba(255, 180, 50, 0.3) 0%, rgba(255, 180, 50, 0) 70%);
      filter: blur(48px);
      pointer-events: none;
    }
    .glow-red {
      position: absolute;
      bottom: -120px;
      left: -60px;
      width: 520px;
      height: 520px;
      background: radial-gradient(circle, rgba(255, 49, 49, 0.32) 0%, rgba(255, 49, 49, 0) 70%);
      filter: blur(52px);
      pointer-events: none;
    }
    .grid-pattern {
      position: absolute;
      inset: 0;
      background-image: 
        radial-gradient(rgba(255, 215, 0, 0.14) 1.5px, transparent 1.5px);
      background-size: 32px 32px;
      pointer-events: none;
      opacity: 0.6;
    }
    .og-card {
      width: 1120px;
      height: 550px;
      background: linear-gradient(135deg, rgba(24, 20, 26, 0.92) 0%, rgba(14, 12, 16, 0.97) 100%);
      border: 1px solid rgba(255, 200, 100, 0.22);
      border-radius: 24px;
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 215, 0, 0.2);
      padding: 44px 54px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      z-index: 2;
    }
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand-logo {
      height: 60px;
      object-fit: contain;
    }
    .badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(255, 180, 50, 0.14);
      border: 1px solid rgba(255, 200, 80, 0.45);
      padding: 8px 20px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #FFD060;
    }
    .pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #FFD060;
      box-shadow: 0 0 12px #FFD060;
    }
    .content-area {
      margin-top: 8px;
    }
    .tag-sazonal {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #FF914D;
      margin-bottom: 8px;
    }
    .main-title {
      font-family: 'Alegreya Sans', sans-serif;
      font-size: 50px;
      font-weight: 900;
      line-height: 1.12;
      letter-spacing: -0.5px;
      color: #FFFFFF;
      margin-bottom: 14px;
      max-width: 980px;
    }
    .gold-text {
      background: linear-gradient(135deg, #FFB830 0%, #FF6536 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .description {
      font-size: 19px;
      line-height: 1.48;
      color: #CBCDD6;
      max-width: 960px;
      font-weight: 400;
    }
    .footer-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 22px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    .features-list {
      display: flex;
      gap: 12px;
    }
    .feature-chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 215, 0, 0.2);
      padding: 8px 16px;
      border-radius: 10px;
      font-size: 13.5px;
      font-weight: 500;
      color: #FFFFFF;
      white-space: nowrap;
    }
    .feature-chip.highlight {
      background: rgba(255, 49, 49, 0.16);
      border-color: rgba(255, 49, 49, 0.45);
      color: #FFB830;
      font-weight: 600;
    }
    .url-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 700;
      color: #FFD060;
      letter-spacing: 0.5px;
      background: rgba(255, 208, 96, 0.12);
      border: 1px solid rgba(255, 208, 96, 0.35);
      padding: 8px 18px;
      border-radius: 999px;
      white-space: nowrap;
    }
  </style>
</head>
<body>
  <div class="glow-gold"></div>
  <div class="glow-red"></div>
  <div class="grid-pattern"></div>
  <div class="og-card">
    <div class="top-bar">
      <img src="${logoBase64}" alt="PromoClicks" class="brand-logo">
      <div class="badge-pill">
        <span class="pulse-dot"></span>
        Campanha Coletiva 2026
      </div>
    </div>
    <div class="content-area">
      <div class="tag-sazonal">Varejo de Fim de Ano • 1º a 25 de Dezembro</div>
      <h1 class="main-title">
        Natal Premiado 2026: <span class="gold-text">Acelere as Vendas</span> da Sua Loja.
      </h1>
      <p class="description">
        Estrutura pronta para o lojista: página exclusiva, QR Code individual no PDV, números da sorte digitais e cotas de adesão a partir de R$ 199.
      </p>
    </div>
    <div class="footer-bar">
      <div class="features-list">
        <div class="feature-chip highlight">★ Planos a partir de R$ 199</div>
        <div class="feature-chip">✓ QR Code no Ponto de Venda</div>
        <div class="feature-chip">✓ Sorteios via Loteria Federal</div>
      </div>
      <div class="url-badge">natalpremiado.promoclicks.com.br</div>
    </div>
  </div>
</body>
</html>`
  }
];

async function generate() {
  console.log('Iniciando Chrome para captura de OG Images em 2x...');
  const { proc, wsUrl } = await startChrome();
  const cdp = new CDPClient(wsUrl);
  await cdp.ready();

  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const pageRes = await fetch(`http://127.0.0.1:${PORT}/json/list`);
  const pages = await pageRes.json();
  const targetPage = pages.find((p) => p.id === targetId);
  const pageCdp = new CDPClient(targetPage.webSocketDebuggerUrl);
  await pageCdp.ready();

  await pageCdp.send('Page.enable');
  await pageCdp.send('DOM.enable');

  // Captura supersample 2x: 2400x1260
  await pageCdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1200,
    height: 630,
    deviceScaleFactor: 2,
    mobile: false
  });

  const tempDir = join(ROOT, '.og-temp');
  mkdirSync(tempDir, { recursive: true });

  const captured = [];

  for (const t of templates) {
    const tempHtml = join(tempDir, `${t.id}.html`);
    writeFileSync(tempHtml, t.html, 'utf8');

    const fileUrl = 'file:///' + tempHtml.replace(/\\/g, '/');
    await pageCdp.send('Page.navigate', { url: fileUrl });
    await sleep(800);

    // Aguardar fontes carregarem
    await pageCdp.send('Runtime.evaluate', {
      expression: 'document.fonts.ready',
      awaitPromise: true
    });
    await sleep(800);

    const ssRes = await pageCdp.send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: 1200, height: 630, scale: 2 }
    });

    const pngBuffer = Buffer.from(ssRes.data, 'base64');
    const outPng = join(tempDir, `${t.id}-2x.png`);
    writeFileSync(outPng, pngBuffer);
    captured.push({ id: t.id, path: outPng });
    console.log(`✔ Capturado ${t.id}-2x.png (2400x1260)`);
  }

  await pageCdp.close();
  await cdp.close();
  proc.kill();

  console.log('Convertendo para JPG, WebP e PNG a 1200x630 via PIL Lanczos...');

  const pyCode = `
import os
from PIL import Image

temp_dir = r"${tempDir.replace(/\\/g, '/')}"
brand_dir = r"${join(ROOT, 'assets', 'images', 'brand').replace(/\\/g, '/')}"
dist_brand_dir = r"${join(ROOT, 'dist', 'assets', 'images', 'brand').replace(/\\/g, '/')}"
os.makedirs(brand_dir, exist_ok=True)
os.makedirs(dist_brand_dir, exist_ok=True)

targets = ['og-promoclicks-share', 'og-natal-premiado']

for name in targets:
    src = os.path.join(temp_dir, f"{name}-2x.png")
    if not os.path.exists(src):
        continue
    im = Image.open(src)
    resized = im.resize((1200, 630), Image.Resampling.LANCZOS)
    rgb = resized.convert('RGB')
    
    for dest_dir in [brand_dir, dist_brand_dir]:
        jpg_p = os.path.join(dest_dir, f"{name}.jpg")
        webp_p = os.path.join(dest_dir, f"{name}.webp")
        png_p = os.path.join(dest_dir, f"{name}.png")
        
        rgb.save(jpg_p, 'JPEG', quality=95, optimize=True)
        rgb.save(webp_p, 'WEBP', quality=92)
        resized.save(png_p, 'PNG', optimize=True)
        print(f"Salvo {name} em {dest_dir}")
`;
  const pyTemp = join(tempDir, 'convert.py');
  writeFileSync(pyTemp, pyCode, 'utf8');
  execSync(`python "${pyTemp}"`, { stdio: 'inherit' });

  console.log('🎉 OG Images geradas com sucesso!');
}

generate().catch((err) => {
  console.error('Erro na geração de OG images:', err);
  process.exit(1);
});
