/**
 * PromoClicks — Componentes Nativos Interativos & Apresentação Comercial de Alta Performance
 * Substitui diagramas estáticos por blocos semânticos responsivos, tipografia nativa e alta conversão
 */

/**
 * 1. Ciclo de Conversão e Inteligência Comercial (Arquitetura de Receita)
 * Usado na Home e em Campanhas Exclusivas
 */
export function renderArchitecturePipeline({
  title = 'Ciclo de Conversão e Inteligência Comercial',
  subtitle = 'Conectamos o estímulo no ponto de venda físico à captação digital ágil e leitura analítica em 4 etapas auditáveis.',
  actionLink = '/servicos/inteligencia-de-dados/',
  actionLabel = 'Ver inteligência analítica'
} = {}) {
  return `<div class="pipeline-widget" role="region" aria-label="Ciclo de Conversão e Inteligência Comercial PromoClicks">
    <div class="pipeline-widget__header">
      <div class="pipeline-widget__badge-row">
        <span class="pipeline-tag">Método Operacional PromoClicks</span>
        <span class="pipeline-pill-live">
          <span class="live-dot" aria-hidden="true"></span>
          Operação Auditável
        </span>
      </div>
      <h3 class="pipeline-widget__title">${title}</h3>
      <p class="pipeline-widget__desc">${subtitle}</p>
    </div>

    <div class="pipeline-flow">
      <!-- Etapa 01 -->
      <div class="pipeline-card">
        <div class="pipeline-card__num-bar">
          <span class="pipeline-num">01</span>
          <span class="pipeline-step-badge">PDV &amp; Digital</span>
        </div>
        <h4 class="pipeline-card__title">Atração Promocional</h4>
        <p class="pipeline-card__body">
          Comunicação de benefício de alto impacto visual no ponto de venda, QR Code dinâmico e ativação nas redes da loja para atrair atenção imediata.
        </p>
        <div class="pipeline-card__footer">
          <span class="pipeline-metric-tag">Indicador: Alcance &amp; Tráfego</span>
        </div>
      </div>

      <div class="pipeline-connector" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-5-5l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>

      <!-- Etapa 02 -->
      <div class="pipeline-card">
        <div class="pipeline-card__num-bar">
          <span class="pipeline-num">02</span>
          <span class="pipeline-step-badge">No Caixa</span>
        </div>
        <h4 class="pipeline-card__title">Compra Elegível</h4>
        <p class="pipeline-card__body">
          Incentivo comercial no checkout para atingir o valor mínimo da promoção, estimulando cross-selling e elevando o ticket médio da compra.
        </p>
        <div class="pipeline-card__footer">
          <span class="pipeline-metric-tag">Indicador: Conversão de Venda</span>
        </div>
      </div>

      <div class="pipeline-connector" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-5-5l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>

      <!-- Etapa 03 -->
      <div class="pipeline-card">
        <div class="pipeline-card__num-bar">
          <span class="pipeline-num">03</span>
          <span class="pipeline-step-badge">Mobile Web</span>
        </div>
        <h4 class="pipeline-card__title">Registro Digital</h4>
        <p class="pipeline-card__body">
          Interface mobile sem atrito nem downloads pesados: o consumidor fotografa o cupom fiscal e recebe instantaneamente seus números da sorte.
        </p>
        <div class="pipeline-card__footer">
          <span class="pipeline-metric-tag">Indicador: Taxa de Adesão</span>
        </div>
      </div>

      <div class="pipeline-connector" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-5-5l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>

      <!-- Etapa 04 -->
      <div class="pipeline-card pipeline-card--highlight">
        <div class="pipeline-card__num-bar">
          <span class="pipeline-num pipeline-num--highlight">04</span>
          <span class="pipeline-step-badge pipeline-step-badge--highlight">BI &amp; Analytics</span>
        </div>
        <h4 class="pipeline-card__title">Big Data &amp; LTV</h4>
        <p class="pipeline-card__body">
          Consolidação do perfil de consumo, métricas de recompra, frequência de visitas e insumos estratégicos para planejar novas alavancas de venda.
        </p>
        <div class="pipeline-card__footer">
          <span class="pipeline-metric-tag pipeline-metric-tag--highlight">Decisão Comercial</span>
        </div>
      </div>
    </div>

    <div class="pipeline-widget__compliance">
      <div class="compliance-info">
        <svg class="compliance-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
        <div>
          <strong>Conformidade e Governança Regulatória</strong>
          <span>Processos desenhados para auditoria, alinhados às diretrizes da SPA / Ministério da Fazenda e segurança LGPD.</span>
        </div>
      </div>
      <a href="${actionLink}" class="pipeline-action-link">
        ${actionLabel} <span aria-hidden="true">→</span>
      </a>
    </div>
  </div>`;
}

/**
 * 2. Pilares de Excelência Operacional (Governança, Tecnologia e BI)
 * Substitui o diagrama de arquétipos na página Quem Somos
 */
export function renderAuthorityPillars() {
  return `<div class="authority-widget" role="region" aria-label="Pilares de Excelência Operacional PromoClicks">
    <div class="authority-widget__header">
      <span class="pipeline-tag">Excelência Corporativa</span>
      <h3 class="authority-widget__title">Rigor Executivo, Conformidade Jurídica e Tecnologia de Dados</h3>
      <p class="authority-widget__desc">
        A união entre a segurança de quem protege o investimento do lojista e a agilidade tecnológica necessária para engajar consumidores no varejo físico e digital.
      </p>
    </div>

    <div class="authority-grid">
      <!-- Pilar 1 -->
      <div class="authority-card">
        <div class="authority-card__icon-wrap">
          <svg class="authority-icon-svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v18"/><path d="M5 6l7-3 7 3"/><path d="M2 13l3-7 3 7a3 3 0 0 1-6 0z"/><path d="M16 13l3-7 3 7a3 3 0 0 1-6 0z"/><path d="M4 21h16"/></svg>
        </div>
        <span class="authority-card__tag">Governança Regulatória</span>
        <h4 class="authority-card__title">Rigor Jurídico &amp; SPA</h4>
        <p class="authority-card__desc">
          Toda campanha exige respaldo legal inequívoco. Conduzimos as operações em conformidade com as exigências da Secretaria de Prêmios e Apostas (SPA/Ministério da Fazenda).
        </p>
        <ul class="authority-card__list">
          <li>Homologação regulatória e prestação de contas</li>
          <li>Apurações vinculadas à Loteria Federal</li>
          <li>Adequação de regras e conformidade integral à LGPD</li>
          <li>Blindagem de risco jurídico para marcas e lojistas</li>
        </ul>
      </div>

      <!-- Pilar 2 -->
      <div class="authority-card authority-card--featured">
        <div class="authority-card__icon-wrap authority-card__icon-wrap--featured">
          <svg class="authority-icon-svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        </div>
        <span class="authority-card__tag authority-card__tag--featured">Experiência do Usuário</span>
        <h4 class="authority-card__title">Tecnologia &amp; Engajamento</h4>
        <p class="authority-card__desc">
          Eliminamos barreiras de entrada para o cliente. Plataforma digital ágil que transforma o registro de comprovantes fiscais em uma experiência rápida e prazerosa.
        </p>
        <ul class="authority-card__list">
          <li>Participação direta via web mobile e QR Code</li>
          <li>Sem necessidade de baixar aplicativos pesados</li>
          <li>Distribuição automatizada de números da sorte</li>
          <li>Infraestrutura em nuvem resiliente para picos de tráfego</li>
        </ul>
      </div>

      <!-- Pilar 3 -->
      <div class="authority-card">
        <div class="authority-card__icon-wrap">
          <svg class="authority-icon-svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
        </div>
        <span class="authority-card__tag">Inteligência Comercial</span>
        <h4 class="authority-card__title">Big Data &amp; Métricas de Varejo</h4>
        <p class="authority-card__desc">
          Uma campanha que não gera dados perde metade do seu valor. Traduzimos interações promocionais em indicadores práticos para fidelização e aumento de LTV.
        </p>
        <ul class="authority-card__list">
          <li>Acompanhamento de cadastros e conversão por loja</li>
          <li>Mapeamento de comportamento e frequência de compra</li>
          <li>Leitura de ticket médio gerado ao longo da ação</li>
          <li>Base qualificada para ativações e campanhas futuras</li>
        </ul>
      </div>
    </div>

    <div class="authority-widget__footer">
      <div class="authority-footer-pill">
        <span class="verified-badge" aria-hidden="true">✓</span>
        <span>100% dos processos orientados a métricas comerciais auditáveis</span>
      </div>
      <a href="/contato/?assunto=Quero+conhecer+a+governanca" class="btn btn--outline btn--sm">
        Falar sobre conformidade e governança <span aria-hidden="true">→</span>
      </a>
    </div>
  </div>`;
}

/**
 * 3. Indicadores de Participação e Cases de Sucesso (Big Numbers PromoClicks)
 * Usado na Home e em Cases
 */
export function renderCaseMetricsComparison() {
  return '';
}

/**
 * 4. Cronograma Operacional do Natal Premiado 2026
 * Usado na página Natal Premiado e Campanhas Coletivas
 */
export function renderNatalTimeline() {
  return `<div class="timeline-widget" role="region" aria-label="Cronograma Operacional do Natal Premiado 2026">
    <div class="timeline-widget__header">
      <div class="metric-header-top">
        <span class="pipeline-tag">Cronograma Previsto · Edição 2026</span>
        <span class="pipeline-pill-live">
          <span class="live-dot" aria-hidden="true"></span>
          Adesões Abertas
        </span>
      </div>
      <h3 class="timeline-widget__title">Marcos Operacionais da Campanha Natal Premiado</h3>
      <p class="timeline-widget__desc">
        Planejamento com prazos estritos para garantir a preparação do material de PDV, período comercial de vendas natalinas e apuração oficial auditada.
      </p>
    </div>

    <div class="timeline-steps">
      <!-- Marco 1 -->
      <div class="timeline-step">
        <div class="timeline-step__marker">
          <span class="step-dot">1</span>
          <span class="timeline-line" aria-hidden="true"></span>
        </div>
        <div class="timeline-step__card">
          <span class="timeline-date">Até 22 de Novembro de 2026</span>
          <h4 class="timeline-step__title">Adesão de Lojistas: fale conosco até 22/11 para garantir sua vaga</h4>
          <p class="timeline-step__desc">
            Escolha do plano (Bronze a Diamante), envio da foto de fachada, dados cadastrais e ativação da página exclusiva da loja no portal com QR Code.
          </p>
          <span class="timeline-status timeline-status--urgent">Prazo Limite de Adesão</span>
        </div>
      </div>

      <!-- Marco 2 -->
      <div class="timeline-step">
        <div class="timeline-step__marker">
          <span class="step-dot step-dot--highlight">2</span>
          <span class="timeline-line" aria-hidden="true"></span>
        </div>
        <div class="timeline-step__card timeline-step__card--highlight">
          <span class="timeline-date">01 a 25 de Dezembro de 2026</span>
          <h4 class="timeline-step__title">Participação B2C (Compras)</h4>
          <p class="timeline-step__desc">
            Período de compras elegíveis nas lojas participantes. Consumidores cadastram cupons fiscais no ambiente web e acumulam números da sorte.
          </p>
          <span class="timeline-status timeline-status--active">Período de Vendas na sua Loja</span>
        </div>
      </div>

      <!-- Marco 3 -->
      <div class="timeline-step">
        <div class="timeline-step__marker">
          <span class="step-dot">3</span>
          <span class="timeline-line" aria-hidden="true"></span>
        </div>
        <div class="timeline-step__card">
          <span class="timeline-date">30 de Dezembro de 2026</span>
          <h4 class="timeline-step__title">Sorteio</h4>
          <p class="timeline-step__desc">
            Data do Sorteio pela extração da Loteria Federal.
          </p>
          <span class="timeline-status">Sorteio</span>
        </div>
      </div>

      <!-- Marco 4 -->
      <div class="timeline-step">
        <div class="timeline-step__marker">
          <span class="step-dot">4</span>
        </div>
        <div class="timeline-step__card">
          <span class="timeline-date">4 de Janeiro de 2027</span>
          <h4 class="timeline-step__title">Divulgação Oficial</h4>
          <p class="timeline-step__desc">
            Anúncio oficial do ganhador nos canais da PromoClicks após validação dos requisitos do regulamento e entrega da premiação de R$ 1.000,00.
          </p>
          <span class="timeline-status">Encerramento da Campanha</span>
        </div>
      </div>
    </div>

    <div class="timeline-widget__cta">
      <div>
        <strong>Garanta a participação da sua loja no Natal Premiado</strong>
        <p>Adesões limitadas pela capacidade de produção gráfica de kits de ponto de venda.</p>
      </div>
      <a href="/contato/?perfil=Lojista&amp;assunto=Natal+Premiado" class="btn btn--primary" data-track="cta_natal_timeline_click">
        Garantir vaga da minha loja <span aria-hidden="true">→</span>
      </a>
    </div>
  </div>`;
}

/**
 * 5. Matriz Comparativa de Modalidades de Campanha
 * Usado na página Serviços
 */
export function renderSolutionsMatrix() {
  return `<div class="solutions-matrix" role="region" aria-label="Matriz Comparativa de Soluções PromoClicks">
    <div class="solutions-matrix__header">
      <span class="pipeline-tag">Arquitetura de Soluções B2B</span>
      <h3 class="solutions-matrix__title">Como Escolher a Solução Ideal para o seu Momento Comercial</h3>
      <p class="solutions-matrix__desc">
        Oferecemos caminhos distintos para negócios que buscam adesão imediata a campanhas sazonais ou empresas que necessitam de operações 100% customizadas.
      </p>
    </div>

    <div class="solutions-matrix__grid">
      <!-- Opção 1 -->
      <div class="matrix-card">
        <div class="matrix-card__badge-row">
          <span class="matrix-type-tag">Adesão por Planos</span>
          <span class="pill-badge">Custo Compartilhado</span>
        </div>
        <h4 class="matrix-card__title">Campanhas Coletivas</h4>
        <p class="matrix-card__summary">
          Perfeito para lojistas e comércios que desejam realizar uma promoção oficial de alto impacto sem arcar sozinhos com o prêmio, impostos, custos legais e toda a burocracia regulatória.
        </p>

        <ul class="matrix-card__features">
          <li><strong>Investimento reduzido:</strong> Cota por loja significativamente menor que o próprio prêmio</li>
          <li><strong>Custos legais e burocracia:</strong> Taxas SPA, impostos e processos jurídicos 100% rateados</li>
          <li><strong>Total legalidade:</strong> Operação formalmente autorizada pela SPA/MF, sem riscos de multas</li>
          <li><strong>Página customizada:</strong> Ambiente web exclusivo e QR Code individual para a sua empresa</li>
          <li><strong>Campanha Ativa:</strong> Natal Premiado 2026 (Sorteio oficial do prêmio de R$ 1.000)</li>
          <li><strong>Ideal para:</strong> Lojas de rua, comércios locais, restaurantes e pequenas redes</li>
        </ul>

        <a href="/natal-premiado/" class="btn btn--outline btn--full">
          Conhecer Natal Premiado <span aria-hidden="true">→</span>
        </a>
      </div>

      <!-- Opção 2 -->
      <div class="matrix-card matrix-card--featured">
        <div class="matrix-card__badge-row">
          <span class="matrix-type-tag matrix-type-tag--featured">Projeto Sob Medida</span>
          <span class="pill-badge pill-badge--gold">100% Exclusivo</span>
        </div>
        <h4 class="matrix-card__title">Campanhas Exclusivas</h4>
        <p class="matrix-card__summary">
          Desenvolvimento customizado de ponta a ponta para indústrias, redes varejistas, marcas e shoppings que demandam mecânica própria, prêmios dedicados e alcance de metas estratégicas avançadas.
        </p>

        <ul class="matrix-card__features">
          <li><strong>Público estratégico:</strong> Indústrias de bens de consumo, redes de franquias, shoppings e grandes marcas</li>
          <li><strong>Modelos de participação inovadores:</strong> Dinâmicas exclusivas e interativas desenvolvidas pela PromoClicks</li>
          <li><strong>Alcance estratégico avançado:</strong> Sell-out acelerado, penetração de mix de produtos e geração de dados primários</li>
          <li><strong>Visual e identidade:</strong> 100% alinhado à comunicação e branding da sua empresa</li>
          <li><strong>Gestão regulatória integral:</strong> Processo de autorização e prestação de contas na SPA do início ao fim</li>
        </ul>

        <a href="/servicos/campanhas-exclusivas/" class="btn btn--primary btn--full">
          Planejar Campanha Exclusiva <span aria-hidden="true">→</span>
        </a>
      </div>

      <!-- Opção 3 -->
      <div class="matrix-card">
        <div class="matrix-card__badge-row">
          <span class="matrix-type-tag">Analytics Integrado</span>
          <span class="pill-badge">LTV &amp; Retenção</span>
        </div>
        <h4 class="matrix-card__title">Inteligência de Dados</h4>
        <p class="matrix-card__summary">
          Camada analítica que transforma cada comprovante fiscal registrado em inteligência acionável para elevar a recorrência de compras e o valor de vida do cliente.
        </p>

        <ul class="matrix-card__features">
          <li><strong>Dashboards:</strong> Visão de engajamento e adesão por ponto de venda</li>
          <li><strong>Comportamento:</strong> Identificação de perfis de compradores</li>
          <li><strong>Taxa de Conversão:</strong> Leitura de abandono de checkout</li>
          <li><strong>Base de Clientes:</strong> Ativos qualificados para futuras ações</li>
          <li><strong>Ideal para:</strong> Gestores de marketing, diretores comerciais e expansão</li>
        </ul>

        <a href="/servicos/inteligencia-de-dados/" class="btn btn--outline btn--full">
          Explorar Inteligência de Dados <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </div>`;
}


/**
 * 6. Fluxo Visual "Como Funciona na Prática" (Jornada do Lojista → Benefício ao Cliente → Escala de Ganhos)
 * Usado na Home para exemplificar visualmente, com ícones e indicadores intuitivos, a alavanca de conversão
 */
export function renderVisualHowItWorks() {
  return `<div class="how-it-works-visual" role="region" aria-label="Como funciona a parceria PromoClicks na prática">
    <div class="hiw-flow-grid">
      <!-- Passo 1 -->
      <article class="hiw-card">
        <div class="hiw-card__top">
          <div class="hiw-icon-box" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <div class="hiw-step-meta">
            <span class="hiw-step-num">PASSO 01</span>
            <span class="hiw-step-pill">Lojista / Empresa</span>
          </div>
        </div>
        <h3 class="hiw-card__title">Sua Empresa Contrata um Plano</h3>
        <p class="hiw-card__desc">
          Você escolhe o plano ideal (Coletivo ou Exclusivo) por uma fração do custo de fazer sozinho. A PromoClicks entrega sua <strong>página exclusiva</strong>, QR Code próprio, kit de PDV e 100% da homologação na SPA/MF.
        </p>
        <ul class="hiw-mini-list">
          <li>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Investimento menor que o próprio prêmio</span>
          </li>
          <li>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Zero burocracia jurídica para sua loja</span>
          </li>
        </ul>
      </article>

      <!-- Seta Conectora 1 → 2 -->
      <div class="hiw-connector" aria-hidden="true">
        <div class="hiw-connector__circle">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
        <span class="hiw-connector__label">Oferece no PDV</span>
      </div>

      <!-- Passo 2 -->
      <article class="hiw-card hiw-card--accent">
        <div class="hiw-card__top">
          <div class="hiw-icon-box hiw-icon-box--accent" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 12 20 22 4 22 4 12"></polyline>
              <rect x="2" y="7" width="20" height="5"></rect>
              <line x1="12" y1="22" x2="12" y2="7"></line>
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
            </svg>
          </div>
          <div class="hiw-step-meta">
            <span class="hiw-step-num">PASSO 02</span>
            <span class="hiw-step-pill hiw-step-pill--accent">Benefício ao Cliente</span>
          </div>
        </div>
        <h3 class="hiw-card__title">Seu Cliente Ganha Chances Reais</h3>
        <p class="hiw-card__desc">
          Ao comprar na sua loja, seu cliente recebe um benefício tangível: ele escaneia o QR Code da sua vitrine ou balcão, cadastra o cupom fiscal pelo celular em segundos e <strong>concorre a prêmios oficiais em dinheiro</strong>.
        </p>
        <ul class="hiw-mini-list">
          <li>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Cadastro 100% web mobile sem baixar app</span>
          </li>
          <li>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Números da sorte auditados pela Loteria Federal</span>
          </li>
        </ul>
      </article>

      <!-- Seta Conectora 2 → 3 -->
      <div class="hiw-connector" aria-hidden="true">
        <div class="hiw-connector__circle">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
        <span class="hiw-connector__label">Gera Resultado</span>
      </div>

      <!-- Passo 3 -->
      <article class="hiw-card hiw-card--result">
        <div class="hiw-card__top">
          <div class="hiw-icon-box hiw-icon-box--result" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
          </div>
          <div class="hiw-step-meta">
            <span class="hiw-step-num">PASSO 03</span>
            <span class="hiw-step-pill hiw-step-pill--result">Escala de Ganhos</span>
          </div>
        </div>
        <h3 class="hiw-card__title">Mais Compras, Ticket Maior e Escala</h3>
        <p class="hiw-card__desc">
          Para ganhar mais números da sorte, o consumidor <strong>compra mais vezes e adiciona mais itens ao carrinho</strong>. Sua empresa vende mais, fideliza clientes e constrói uma base de dados própria para crescer.
        </p>
        <ul class="hiw-mini-list">
          <li>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Elevação direta da taxa de conversão e recompra</span>
          </li>
          <li>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Inteligência de dados e LTV para escalar vendas</span>
          </li>
        </ul>
      </article>
    </div>

    <!-- Barra de Resumo de Impacto Visual -->
    <div class="hiw-impact-bar">
      <div class="hiw-impact-bar__items">
        <div class="hiw-impact-pill">
          <span class="hiw-impact-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          </span>
          <div>
            <strong>+ Taxa de Compra</strong>
            <span>Cliente prefere comprar onde ganha benefício</span>
          </div>
        </div>
        <div class="hiw-impact-pill">
          <span class="hiw-impact-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </span>
          <div>
            <strong>+ Ticket Médio</strong>
            <span>Incentivo no caixa para atingir o valor elegível</span>
          </div>
        </div>
        <div class="hiw-impact-pill">
          <span class="hiw-impact-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
          </span>
          <div>
            <strong>+ Escala &amp; Dados</strong>
            <span>Base própria de clientes para recompra contínua</span>
          </div>
        </div>
      </div>
      <div class="hiw-impact-bar__cta">
        <a href="/natal-premiado/" class="btn btn--outline">Ver planos a partir de R$ 399</a>
        <a href="/contato/?perfil=Lojista&amp;assunto=Quero+incluir+minha+empresa+/+loja+em+uma+campanha" class="btn btn--primary" data-track="hiw_visual_cta">
          Quero contratar para minha empresa <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </div>`;
}
