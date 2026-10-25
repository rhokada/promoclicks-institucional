/**
 * PromoClicks — Componentes Compartilhados de Layout e Interface
 * Header global, Breadcrumbs, Imagens Responsivas (WebP + srcset), Planos e Footer Global
 */

import { SITE_CONFIG } from '../config/siteConfig.mjs';
import { CLIENT_LOGOS } from '../config/blogConfig.mjs';
import { generateJsonLdForRoute } from '../seo/schemaGenerator.mjs';

export function renderHead(routeKey) {
  const route = SITE_CONFIG.routes[routeKey];
  if (!route) throw new Error(`Rota não configurada: ${routeKey}`);

  const canonicalUrl = `${SITE_CONFIG.baseUrl}${route.path}`;
  const ogImageRelative = route.ogImage || SITE_CONFIG.defaultOgImage;
  const ogImageUrl = `${SITE_CONFIG.baseUrl}${ogImageRelative}`;
  const ogImageAlt = route.ogImageAlt || 'PromoClicks — Promoções Comerciais Regulamentadas e Aceleração de Vendas';
  const jsonLdScript = generateJsonLdForRoute(routeKey);

  return `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="${SITE_CONFIG.themeColor}">
  <title>${route.title}</title>
  <meta name="description" content="${route.description}">
  <meta name="robots" content="${route.robots}">
  ${routeKey !== '/404.html' ? `<link rel="canonical" href="${canonicalUrl}">` : ''}
  <link rel="icon" type="image/svg+xml" href="/assets/images/brand/favicon.svg">

  <!-- Open Graph / Social Media Preview -->
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="${SITE_CONFIG.brandName}">
  <meta property="og:title" content="${route.title}">
  <meta property="og:description" content="${route.description}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${ogImageUrl}">
  <meta property="og:image:secure_url" content="${ogImageUrl}">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${ogImageAlt}">

  <!-- Twitter / X Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${route.title}">
  <meta name="twitter:description" content="${route.description}">
  <meta name="twitter:image" content="${ogImageUrl}">
  <meta name="twitter:image:alt" content="${ogImageAlt}">

  <!-- Tipografia Oficial do Manual: Alegreya Sans + Poppins -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@500;700;800;900&family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="/assets/css/main.css?v=2.6">
  ${jsonLdScript}
</head>`;
}

export function renderHeader(currentPath) {
  const isCurrent = (p) => p === currentPath;
  const isServicos = currentPath.startsWith('/servicos/');

  return `<a class="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a>
  <div class="header-scroll-progress" id="header-scroll-progress" aria-hidden="true"></div>
  <header class="site-header" id="site-header">
    <div class="container header-inner">
      <a class="brand-logo" href="/" aria-label="PromoClicks — Ir para a página inicial">
        <picture>
          <source srcset="/assets/images/brand/promoclicks-logo-horizontal-light.webp" type="image/webp">
          <img src="/assets/images/brand/promoclicks-logo-horizontal-light.png" alt="Logotipo oficial PromoClicks" width="184" height="59" fetchpriority="high" decoding="async">
        </picture>
      </a>

      <!-- Navegação Principal (Desktop & Mobile Drawer) -->
      <nav class="site-nav" id="site-nav" aria-label="Navegação principal">
        <!-- Cabeçalho interno exclusivo do drawer mobile -->
        <div class="site-nav-drawer-header">
          <a class="drawer-brand" href="/" aria-label="PromoClicks — Ir para a página inicial">
            <img src="/assets/images/brand/promoclicks-logo-horizontal-light.webp" alt="PromoClicks" width="136" height="44">
          </a>
          <button type="button" class="drawer-close-btn" id="drawer-close-btn" aria-label="Fechar menu de navegação">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="site-nav-list">
          <!-- Início -->
          <a class="nav-link${isCurrent('/') ? ' nav-link--active' : ''}" href="/" ${isCurrent('/') ? 'aria-current="page"' : ''} style="--nav-i: 1">
            <span>Início</span>
          </a>

          <!-- Quem somos -->
          <a class="nav-link${isCurrent('/quem-somos/') ? ' nav-link--active' : ''}" href="/quem-somos/" ${isCurrent('/quem-somos/') ? 'aria-current="page"' : ''} style="--nav-i: 2">
            <span>Quem somos</span>
          </a>

          <!-- Serviços com Dropdown Desktop & Accordion Mobile -->
          <div class="nav-item-dropdown${isServicos ? ' is-active' : ''}" id="nav-dropdown-servicos" style="--nav-i: 3">
            <div class="nav-link-dropdown-wrap">
              <a class="nav-link nav-link--parent${isServicos ? ' nav-link--active' : ''}" href="/servicos/" ${isServicos ? 'aria-current="page"' : ''}>
                <span>Serviços</span>
                <span class="dropdown-chevron" aria-hidden="true">▾</span>
              </a>
              <button type="button" class="mobile-submenu-toggle" id="mobile-services-toggle" aria-expanded="false" aria-label="Expandir submenu de serviços">
                <span class="chevron-arrow" aria-hidden="true">▾</span>
              </button>
            </div>

            <!-- Dropdown Card Desktop & Submenu Mobile -->
            <div class="nav-dropdown-menu" id="services-submenu">
              <a class="dropdown-item${isCurrent('/servicos/campanhas-coletivas/') ? ' dropdown-item--active' : ''}" href="/servicos/campanhas-coletivas/">
                <span class="dropdown-item-num">01</span>
                <div class="dropdown-item-text">
                  <strong class="dropdown-item-title">Campanhas Coletivas</strong>
                  <span class="dropdown-item-desc">Promoções compartilhadas com custos e premiações rateados.</span>
                </div>
              </a>
              <a class="dropdown-item${isCurrent('/servicos/campanhas-exclusivas/') ? ' dropdown-item--active' : ''}" href="/servicos/campanhas-exclusivas/">
                <span class="dropdown-item-num">02</span>
                <div class="dropdown-item-text">
                  <strong class="dropdown-item-title">Campanhas Exclusivas</strong>
                  <span class="dropdown-item-desc">Ações sob medida para marcas, indústrias e grandes redes.</span>
                </div>
              </a>
              <a class="dropdown-item${isCurrent('/servicos/inteligencia-de-dados/') ? ' dropdown-item--active' : ''}" href="/servicos/inteligencia-de-dados/">
                <span class="dropdown-item-num">03</span>
                <div class="dropdown-item-text">
                  <strong class="dropdown-item-title">Inteligência de Dados</strong>
                  <span class="dropdown-item-desc">Validação antifraude de cupons e relatórios SPA em tempo real.</span>
                </div>
              </a>
              <div class="dropdown-footer">
                <a href="/servicos/" class="dropdown-footer-link">Ver visão geral dos serviços <span aria-hidden="true">→</span></a>
              </div>
            </div>
          </div>

          <!-- Natal Premiado -->
          <a class="nav-link${isCurrent('/natal-premiado/') ? ' nav-link--active' : ''}" href="/natal-premiado/" ${isCurrent('/natal-premiado/') ? 'aria-current="page"' : ''} style="--nav-i: 4">
            <span>Natal Premiado</span>
            <span class="nav-badge-pill" aria-hidden="true">2026</span>
          </a>

          <!-- Cases -->
          <a class="nav-link${isCurrent('/cases/') ? ' nav-link--active' : ''}" href="/cases/" ${isCurrent('/cases/') ? 'aria-current="page"' : ''} style="--nav-i: 5">
            <span>Cases</span>
          </a>

          <!-- Participe -->
          <a class="nav-link${isCurrent('/participe/') ? ' nav-link--active' : ''}" href="/participe/" ${isCurrent('/participe/') ? 'aria-current="page"' : ''} style="--nav-i: 6">
            <span>Participe</span>
          </a>

          <!-- Contato -->
          <a class="nav-link${isCurrent('/contato/') ? ' nav-link--active' : ''}" href="/contato/" ${isCurrent('/contato/') ? 'aria-current="page"' : ''} style="--nav-i: 7">
            <span>Contato</span>
          </a>
        </div>

        <!-- Rodapé Comercial do Drawer Mobile -->
        <div class="site-nav-drawer-footer">
          <a href="https://wa.me/5511998765432?text=Ol%C3%A1%2C+gostaria+de+conhecer+as+solu%C3%A7%C3%B5es+da+PromoClicks" target="_blank" rel="noopener noreferrer" class="drawer-contact-pill" data-track="cta_drawer_whatsapp">
            <span class="status-dot-pulse" aria-hidden="true"></span>
            <span class="drawer-contact-text">Atendimento WhatsApp B2B</span>
            <span class="pill-arrow" aria-hidden="true">↗</span>
          </a>
          <a href="/contato/?assunto=Quero+planejar+uma+campanha" class="btn btn--primary btn--full drawer-cta-btn" data-track="cta_mobile_drawer_click">
            Planejar Minha Campanha <span aria-hidden="true">→</span>
          </a>
          <div class="drawer-meta-info">
            <span>contato@promoclicks.com.br</span>
            <span>Atendimento consultivo especializado</span>
          </div>
        </div>
      </nav>

      <div class="nav-backdrop" id="nav-backdrop" aria-hidden="true"></div>

      <!-- Ações Desktop do Header -->
      <div class="header-actions">
        <a href="https://wa.me/5511998765432?text=Ol%C3%A1%2C+gostaria+de+conhecer+as+solu%C3%A7%C3%B5es+da+PromoClicks" target="_blank" rel="noopener noreferrer" class="header-wa-chip" data-track="cta_header_whatsapp" aria-label="Atendimento rápido via WhatsApp">
          <span class="status-dot-pulse" aria-hidden="true"></span>
          <span class="header-wa-label">WhatsApp</span>
        </a>
        <a href="/contato/?assunto=Quero+planejar+uma+campanha" class="btn btn--primary header-cta" data-track="cta_header_click" data-track-label="Header: Planejar Campanha">
          Planejar Campanha <span aria-hidden="true">↗</span>
        </a>
      </div>

      <!-- Botão Hambúrguer Mobile -->
      <button type="button" class="menu-toggle" id="menu-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Abrir menu de navegação">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>`;
}

export function renderBreadcrumbs(routeKey) {
  const route = SITE_CONFIG.routes[routeKey];
  if (!route || !route.breadcrumbs || route.breadcrumbs.length <= 1) return '';

  const items = route.breadcrumbs
    .map((item, idx) => {
      const isLast = idx === route.breadcrumbs.length - 1;
      if (isLast) {
        return `<li><span aria-current="page">${item.name}</span></li>`;
      }
      return `<li><a href="${item.path}">${item.name}</a></li>`;
    })
    .join('');

  return `<nav class="breadcrumb-bar" aria-label="Localização na estrutura do site">
    <div class="container">
      <ol class="breadcrumb-list">${items}</ol>
    </div>
  </nav>`;
}

export function renderResponsiveImage({
  slug,
  alt,
  caption = '',
  badge = '',
  width = 1200,
  height = 670,
  priority = false,
  lightCard = true,
  sizes = '(max-width: 920px) 100vw, 50vw'
}) {
  const loadingAttr = priority
    ? 'loading="eager" fetchpriority="high"'
    : 'loading="lazy" decoding="async"';

  const cardClass = lightCard ? 'media-card media-card--light' : 'media-card';

  return `<figure class="${cardClass}">
    <picture>
      <source
        type="image/webp"
        srcset="/assets/images/editorial/${slug}-480w.webp 480w, /assets/images/editorial/${slug}-800w.webp 800w, /assets/images/editorial/${slug}-1200w.webp 1200w"
        sizes="${sizes}">
      <img
        src="/assets/images/editorial/${slug}.jpg"
        alt="${alt}"
        width="${width}"
        height="${height}"
        ${loadingAttr}>
    </picture>
  </figure>`;
}

export function renderPlansGrid() {
  const cards = SITE_CONFIG.natalPlans
    .map((plan) => {
      const cardClass = plan.featured ? 'plan-card plan-card--featured' : 'plan-card';
      const btnClass = plan.featured ? 'btn btn--primary' : 'btn btn--outline';
      const highlightsHtml = plan.highlights.map((h) => `<li>${h}</li>`).join('');
      return `<article class="${cardClass}" data-plan-card="${plan.id}">
        <div class="plan-header">
          <span class="plan-name">Plano ${plan.name}</span>
          ${plan.badge ? `<span class="plan-badge">${plan.badge}</span>` : ''}
        </div>
        <p class="plan-price">${plan.price}<small>${plan.priceNote}</small></p>
        <div class="plan-metric">
          <strong>${plan.limitNumbers}</strong>
          <span>${plan.limitDescription}</span>
        </div>
        <ul class="plan-features">
          ${highlightsHtml}
        </ul>
        <a class="${btnClass}" href="/contato/?perfil=Lojista&amp;assunto=Natal+Premiado&amp;plano=${plan.id}" data-track="plan_select_click" data-track-label="Plano ${plan.name}">
          Tenho interesse no ${plan.name} <span aria-hidden="true">→</span>
        </a>
      </article>`;
    })
    .join('\r\n      ');

  return `<div class="pricing-container">
      <div class="pricing-swipe-hint" aria-hidden="true">
        <span>⇄ Deslize horizontalmente para comparar os 4 planos</span>
      </div>
      <div class="pricing-grid" aria-label="Planos de adesão previstos para o Natal Premiado">
        ${cards}
      </div>
    </div>`;
}

export function renderClientLogosTrustStrip({
  title = 'Empresas e Marcas que Confiam e Recomendam a PromoClicks',
  subtitle = 'Soluções de promoções comerciais regulamentadas validadas por grandes referências da indústria de bens de consumo, varejo farmacêutico e embalagens.',
  light = false
} = {}) {
  const sectionClass = light ? 'section clients-section surface-light' : 'section clients-section surface-dark';

  const logoCards = CLIENT_LOGOS.map((client) => `
    <div class="client-logo-card" data-client="${client.id}">
      <div class="client-logo-img-wrap">
        <picture>
          <source srcset="${client.image}" type="image/webp">
          <img
            src="${client.image.replace('.webp', '.png')}"
            alt="Logotipo oficial da marca ${client.name} — Cliente e parceiro PromoClicks"
            width="${client.width}"
            height="${client.height}"
            loading="lazy"
            decoding="async">
        </picture>
      </div>
      <div class="client-logo-info">
        <strong class="client-logo-name">${client.name}</strong>
        <span class="client-logo-segment">${client.segment}</span>
      </div>
    </div>
  `).join('');

  return `<section class="${sectionClass}">
    <div class="container">
      <div class="clients-header text-center">
        <span class="eyebrow">Autoridade Comprovada no Varejo</span>
        <h2>${title}</h2>
        <p class="lead">${subtitle}</p>
      </div>
      <div class="clients-grid" role="list" aria-label="Empresas parceiras e clientes da PromoClicks">
        ${logoCards}
      </div>
    </div>
  </section>`;
}

export function renderFooter() {
  return `<footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="/" aria-label="PromoClicks — Voltar ao início">
            <picture>
              <source srcset="/assets/images/brand/promoclicks-logo-horizontal-dark.webp" type="image/webp">
              <img src="/assets/images/brand/promoclicks-logo-horizontal-dark.png" alt="Logotipo PromoClicks em versão para fundo escuro" width="175" height="60" loading="lazy" decoding="async">
            </picture>
          </a>
          <p>Estratégia para incentivar a próxima compra. Campanhas promocionais legalizadas, método operacional e inteligência de dados a serviço de empresas de todos os portes que buscam vender mais com segurança jurídica e uma relação custo/benefício imperdível.</p>
          <a href="/contato/?perfil=Lojista&amp;assunto=Quero+incluir+minha+empresa+/+loja+em+uma+campanha" class="btn btn--primary" data-track="cta_footer_click" data-track-label="Footer: Falar com a PromoClicks">
            Falar com a PromoClicks <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div class="footer-nav-grid">
          <div class="footer-col">
            <h2 class="footer-title">Navegação Institucional</h2>
            <ul class="footer-links">
              <li><a href="/">Início</a></li>
              <li><a href="/quem-somos/">Quem somos</a></li>
              <li><a href="/servicos/">Nossas soluções</a></li>
              <li><a href="/natal-premiado/">Natal Premiado 2026</a></li>
              <li><a href="/cases/">Cases e indicadores</a></li>
              <li><a href="/participe/">Como participar</a></li>
              <li><a href="/contato/">Contato comercial</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h2 class="footer-title">Soluções B2B</h2>
            <ul class="footer-links">
              <li><a href="/servicos/campanhas-coletivas/">Campanhas Coletivas</a></li>
              <li><a href="/servicos/campanhas-exclusivas/">Campanhas Exclusivas</a></li>
              <li><a href="/servicos/inteligencia-de-dados/">Inteligência de Dados</a></li>
              <li><a href="/participe/#lojista">Jornada do Lojista</a></li>
              <li><a href="/participe/#consumidor">Jornada do Consumidor</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h2 class="footer-title">Governança e Canais</h2>
            <ul class="footer-links">
              <li><a href="/politica-de-privacidade/">Política de Privacidade (Estrutura LGPD)</a></li>
              <li><a href="/termos-de-uso/">Termos de Uso</a></li>
              <li><a href="/regulamento/">Regulamento da Campanha (Status)</a></li>
              <li><span>Instagram: ${SITE_CONFIG.socialInstagram}</span></li>
              <li><span>Atendimento comercial: via formulário oficial</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© 2026 <span class="brand-name"><span class="brand-promo">Promo</span><span class="brand-clicks">Clicks</span></span>. Todos os direitos reservados. Razão Social: <strong>BIG DATA HELIX TECNOLOGIA LTDA</strong> (CNPJ: 26.702.873/0001-30).</p>
        <p>Portal institucional — Campanhas promocionais e sorteios comerciais regulamentados perante a SPA – Secretaria de Prêmios e Apostas do Ministério da Fazenda.</p>
      </div>
    </div>
  </footer>
  <aside class="floating-mobile-bar" aria-label="Ações rápidas de contato">
    <a href="/contato/?perfil=Lojista&amp;assunto=Quero+incluir+minha+empresa+/+loja+em+uma+campanha" class="floating-cta-btn" data-track="cta_floating_click">
      <svg class="floating-cta-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      <span class="floating-cta-text">Falar com Especialista</span>
      <span class="floating-cta-arrow" aria-hidden="true">→</span>
    </a>
  </aside>
  <script src="/assets/js/analytics.js" defer></script>
  <script src="/assets/js/main.js?v=2.2" defer></script>`;
}

export function renderPageLayout(routeKey, mainContentHtml) {
  const route = SITE_CONFIG.routes[routeKey];
  return `<!doctype html>
<html lang="pt-BR">
${renderHead(routeKey)}
<body>
  ${renderHeader(route.path)}
  ${renderBreadcrumbs(routeKey)}
  <main id="conteudo-principal">
    ${mainContentHtml}
  </main>
  ${renderFooter()}
</body>
</html>`;
}
