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
  return `<div class="pipeline-widget" aria-label="Ciclo de Conversão e Inteligência Comercial PromoClicks">
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
  return `<div class="authority-widget" aria-label="Pilares de Excelência Operacional PromoClicks">
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
  return `<div class="timeline-widget" aria-label="Cronograma Operacional do Natal Premiado 2026">
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
          <span class="timeline-date">26 de Dezembro de 2026 (Previsto)</span>
          <h4 class="timeline-step__title">Apuração &amp; Auditoria</h4>
          <p class="timeline-step__desc">
            Fechamento da base de participações, conferência dos cupons fiscais e identificação do número da sorte contemplado com base no sorteio oficial.
          </p>
          <span class="timeline-status">Auditoria Documental</span>
        </div>
      </div>

      <!-- Marco 4 -->
      <div class="timeline-step">
        <div class="timeline-step__marker">
          <span class="step-dot">4</span>
        </div>
        <div class="timeline-step__card">
          <span class="timeline-date">29 de Dezembro de 2026 (Previsto)</span>
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
  return `<div class="solutions-matrix" aria-label="Matriz Comparativa de Soluções PromoClicks">
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
