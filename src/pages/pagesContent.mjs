/**
 * PromoClicks — Conteúdo Editorial e Arquitetura de Conversão de Todas as Páginas
 * Rigorosamente alinhado ao Manual de Marca (Documento 1) e à Textualização (Documento 2).
 */

import { SITE_CONFIG } from '../config/siteConfig.mjs';
import { BLOG_CATEGORIES, BLOG_POSTS, CLIENT_LOGOS, getBlogPostBySlug } from '../config/blogConfig.mjs';
import {
  renderResponsiveImage,
  renderPlansGrid,
  renderClientLogosTrustStrip
} from '../components/layoutComponents.mjs';
import {
  renderArchitecturePipeline,
  renderAuthorityPillars,
  renderCaseMetricsComparison,
  renderNatalTimeline,
  renderSolutionsMatrix,
} from '../components/interactiveComponents.mjs';

export const BRAND_HTML = '<span class="brand-name"><span class="brand-promo">Promo</span><span class="brand-clicks">Clicks</span></span>';

export function getHomeContent() {
  const h1 = SITE_CONFIG.routes['/'].h1;
  return `
    <!-- Hero Principal (Superfície Escura — Governança e Inteligência) -->
    <section class="hero-section">
      <div class="container hero-grid">
        <div>
          <span class="eyebrow">Promoções Regulamentadas · Relação Custo/Benefício Imperdível · Ao Alcance de Todas as Empresas</span>
          <h1>${h1}</h1>
          <p class="lead">
            Somos especialistas em promoções e sorteios legalizados, conectando segurança jurídica, site, inteligência de dados e estratégia comercial para criar campanhas focadas em aumento de vendas e ticket médio, com uma relação custo/benefício imperdível para diversos segmentos e portes de empresa.
          </p>
          <div class="cta-group">
            <a href="/contato/?perfil=Lojista&amp;assunto=Quero+incluir+minha+empresa+/+loja+em+uma+campanha" class="btn btn--primary" data-track="hero_cta_primary" data-track-label="Home Hero: Fale com um especialista">
              Fale com um especialista <span aria-hidden="true">→</span>
            </a>
            <a href="/natal-premiado/" class="btn btn--secondary" data-track="hero_cta_secondary" data-track-label="Home Hero: Ver campanha coletiva aberta">
              Ver campanha coletiva aberta: Natal Premiado 2026
            </a>
          </div>
          <div class="trust-strip" role="list" aria-label="Pilares estratégicos da PromoClicks">
            <div class="trust-pill" role="listitem">
              <strong>Foco em Receita e Giro</strong>
              <span>Mecânicas atreladas a compras reais e aumento de ticket médio</span>
            </div>
            <div class="trust-pill" role="listitem">
              <strong>Com a Cara do seu Negócio</strong>
              <span>Página customizada da sua loja, QR Code próprio e materiais personalizados</span>
            </div>
            <div class="trust-pill" role="listitem">
              <strong>Segurança e Legalidade</strong>
              <span>Campanhas 100% legalizadas e aprovadas na SPA/MF com custo-benefício imperdível</span>
            </div>
          </div>
        </div>
        <div>
          ${renderResponsiveImage({
            slug: 'hero-varejo-inteligencia-promocional',
            alt: 'Ambiente de varejo moderno com cliente interagindo via smartphone no ponto de venda após realizar compra elegível',
            priority: true,
            lightCard: false
          })}
        </div>
      </div>
    </section>

    <!-- Faixa de Autoridade e Clientes que Recomendam -->
    ${renderClientLogosTrustStrip({
      title: 'Marcas e Redes que Confiam e Recomendam a PromoClicks',
      subtitle: 'Lideranças de mercado em bens de consumo, farmacêutica, embalagens e alimentos que aceleram resultados com soluções de inteligência promocional.',
      light: true
    })}

    <!-- Apresentação das Soluções (Hub de Serviços) -->
    <section class="section surface-light">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="eyebrow">Soluções PromoClicks</span>
            <h2>Escolha a campanha pelo que seu negócio precisa alcançar.</h2>
          </div>
          <p>
            Atendemos desde comércios locais que buscam aderir a campanhas sazonais compartilhadas até indústrias e marcas que demandam projetos exclusivos sob medida.
          </p>
        </div>

        <div class="cards-grid cards-grid--3">
          ${SITE_CONFIG.serviceItems
            .map(
              (srv) => `
          <article class="card ${srv.featured ? 'card--featured' : ''}">
            <span class="card-num">${srv.num} · ${srv.shortTitle}</span>
            <h3>${srv.title}</h3>
            <p>${srv.summary}</p>
            <a class="card-link" href="${srv.path}" data-track="service_card_click" data-track-label="${srv.title}">
              ${srv.ctaLabel} <span aria-hidden="true">→</span>
            </a>
          </article>`
            )
            .join('')}
        </div>

        <div class="cta-group" style="margin-top: 2rem;">
          <a href="/servicos/" class="btn btn--outline">Comparar todas as modalidades de serviço</a>
        </div>
      </div>
    </section>

    <!-- Proposta de Valor e Pilares de Execução (Posicionada após Soluções para equilíbrio de portfólio) -->
    <section class="section surface-warm">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="eyebrow">Por que PromoClicks</span>
            <h2>Mais que visibilidade: incentivo direto à compra e conformidade legal.</h2>
          </div>
          <p>
            Grandes redes investem valores expressivos em campanhas promocionais. A ${BRAND_HTML} disponibiliza essa mesma expertise para empresas de diversos portes e segmentos, com custos rateados e processos simplificados.
          </p>
        </div>

        <div class="cards-grid cards-grid--4">
          <article class="card">
            <span class="card-num">01 · Estratégia</span>
            <h3>Estímulo real à compra</h3>
            <p>Criamos um motivo concreto para o consumidor escolher o seu estabelecimento, antecipar decisões de compra e elevar o ticket médio por comprovante fiscal.</p>
          </article>
          <article class="card">
            <span class="card-num">02 · Identidade</span>
            <h3>Com a cara da sua loja</h3>
            <p>Sua empresa ganha uma página exclusiva da campanha (ex.: <code>natalpremiado.promoclicks.com.br/SUALOJA</code>), materiais personalizados e QR Code próprio.</p>
          </article>
          <article class="card">
            <span class="card-num">03 · Acessibilidade</span>
            <h3>Excelente relação custo-benefício e alto alcance</h3>
            <p>Custos legais, impostos e burocracia são rateados entre os participantes, com investimento menor que o valor do próprio prêmio.</p>
          </article>
          <article class="card">
            <span class="card-num">04 · Governança</span>
            <h3>100% de conformidade legal</h3>
            <p>Processos homologados perante a SPA (Secretaria de Prêmios e Apostas do Ministério da Fazenda), garantindo total tranquilidade jurídica para o seu negócio.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Arquitetura de Receita: Método Operacional -->
    <section class="section surface-light">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="eyebrow">Método Operacional</span>
            <h2>Como transformamos campanhas promocionais em alavanca de receita.</h2>
          </div>
          <p class="section-lede">
            Uma promoção de alto impacto não depende de improviso. Conectamos estímulo de compras no ponto de venda físico, validação digital ágil e inteligência analítica em etapas auditáveis.
          </p>
        </div>

        ${renderArchitecturePipeline()}

        <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-top: 1.5rem;">
          <a href="/quem-somos/" class="btn btn--outline">Conhecer nosso método e governança</a>
          <a href="/servicos/inteligencia-de-dados/" class="btn btn--primary">Explorar inteligência de dados <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>

    <!-- Destaque Comercial: Campanha Natal Premiado 2026 -->
    <section class="section surface-dark">
      <div class="container split-layout">
        <div>
          <span class="eyebrow">Campanha Coletiva em Destaque</span>
          <h2>Natal Premiado 2026: a campanha coletiva que coloca sua loja no centro do fim de ano.</h2>
          <p class="lead">
            Seus clientes realizam compras elegíveis, cadastram o comprovante pelo celular e concorrem ao sorteio do <span class="badge-prize">Prêmio de R$ 1.000</span>. Conte com identidade visual, QR Code exclusivo para a loja e cadastro de compras pelo link <code>natalpremiado.promoclicks.com.br/SUALOJA</code> com custos compartilhados.
          </p>
          <div class="notice-banner notice-banner--dark" role="note" style="margin-bottom: 1.5rem;">
            <strong>Transparência Comercial e Regulatória:</strong>
            O cronograma de adesão (fale conosco até 22/11/2026 para garantir sua vaga) e as condições operacionais estão sujeitos à confirmação contratual, aprovação e publicação do regulamento oficial perante a SPA (Secretaria de Prêmios e Apostas do Ministério da Fazenda).
          </div>
          <div class="cta-group">
            <a href="/natal-premiado/" class="btn btn--primary" data-track="home_natal_cta" data-track-label="Home: Ver planos do Natal Premiado">
              Ver planos e mecânica do Natal Premiado <span aria-hidden="true">→</span>
            </a>
            <a href="/contato/?perfil=Lojista&amp;assunto=Quero+incluir+minha+empresa+/+loja+em+uma+campanha" class="btn btn--secondary" data-track="home_natal_lojista" data-track-label="Home: Incluir minha empresa">
              Quero incluir minha empresa / loja
            </a>
          </div>
        </div>
        <div>
          ${renderResponsiveImage({
            slug: 'home-natal-destaque-vitrine',
            alt: 'Vitrine iluminada de loja elegante com decoração festiva de fim de ano atraindo consumidores no varejo',
            lightCard: false
          })}
        </div>
      </div>
    </section>

    <!-- Prévia de Cases e Big Numbers -->
    <section class="section surface-light">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="eyebrow">Evidências e Big Numbers</span>
            <h2>Conheça os Big Numbers da ${BRAND_HTML} e alguns cases desafiadores e seus resultados.</h2>
          </div>
          <p class="section-lede">
            Mais de 343 mil acessos únicos, mais de 192 mil cadastros de participantes e cupons fiscais registrados, e 100% de conformidade regulatória perante a SPA/MF em janelas de 3 meses.
          </p>
        </div>

        ${renderCaseMetricsComparison()}

        <div style="text-align: center; margin-top: 1.5rem;">
          <a href="/cases/" class="btn btn--outline" data-track="home_cases_cta" data-track-label="Home: Analisar cases e indicadores">
            Analisar cases e metodologia de leitura completa <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>

        ${renderCaseMetricsComparison()}

        <div style="text-align: center; margin-top: 1.5rem;">
          <a href="/cases/" class="btn btn--outline" data-track="home_cases_cta" data-track-label="Home: Analisar cases e indicadores">
            Analisar cases e metodologia de leitura completa <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Bifurcação de Jornadas: Lojistas vs. Consumidores -->
    <section class="section surface-warm">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="eyebrow">Jornadas Dedicadas</span>
            <h2>Direcionamento rápido para empresas e consumidores.</h2>
          </div>
          <p>
            Selecione o seu perfil para acessar as orientações operacionais, regras previstas e canais de atendimento adequados.
          </p>
        </div>

        <div class="cards-grid cards-grid--2">
          <article class="card card--featured">
            <span class="card-num">Perfil B2B · Estabelecimentos, Indústrias e Marcas</span>
            <h3>Sou Lojista, Gestor Comercial ou Indústria</h3>
            <p>
              Quero incluir meu estabelecimento no Natal Premiado 2026, comparar os planos previstos ou desenhar uma campanha promocional exclusiva sob medida para minha rede ou indústria.
            </p>
            <div class="cta-group">
              <a href="/participe/#lojista" class="btn btn--primary" data-track="home_fork_lojista" data-track-label="Home Fork: Jornada do Lojista">
                Ver passo a passo do lojista <span aria-hidden="true">→</span>
              </a>
              <a href="/contato/?perfil=Lojista&amp;assunto=Quero+incluir+minha+empresa+/+loja+em+uma+campanha" class="btn btn--outline">Solicitar adesão comercial</a>
            </div>
          </article>

          <article class="card">
            <span class="card-num">Perfil B2C · Clientes das Lojas Participantes</span>
            <h3>Sou Consumidor Participante</h3>
            <p>
              Realizei ou pretendo realizar compras em uma loja participante e quero entender como acessar o QR Code do estabelecimento, cadastrar meu comprovante fiscal e consultar o regulamento.
            </p>
            <div class="cta-group">
              <a href="/participe/#consumidor" class="btn btn--outline" data-track="home_fork_consumidor" data-track-label="Home Fork: Jornada do Consumidor">
                Ver como participar como consumidor <span aria-hidden="true">→</span>
              </a>
              <a href="/regulamento/" class="card-link">Consultar status do regulamento</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  `;
}

export function getQuemSomosContent() {
  const h1 = SITE_CONFIG.routes['/quem-somos/'].h1;
  return `
    <!-- Hero Institucional -->
    <section class="page-hero">
      <div class="container hero-grid">
        <div>
          <span class="eyebrow">Quem Somos · Empresa Habilitada em Promoções Comerciais</span>
          <h1>${h1}</h1>
          <p class="lead">
            A ${BRAND_HTML} não é apenas uma plataforma: é uma empresa capacitada e habilitada para realizar promoções comerciais legalizadas completas. Nossa razão social é <strong>BIG DATA HELIX TECNOLOGIA LTDA</strong> (CNPJ: 26.702.873/0001-30). Levamos a expertise obtida na operação de grandes promoções nacionais para empresas de diversos portes e segmentos, garantindo segurança jurídica absoluta e uma relação custo/benefício imperdível.
          </p>
          <div class="cta-group">
            <a href="/servicos/" class="btn btn--primary">Conhecer nossas soluções <span aria-hidden="true">→</span></a>
            <a href="/contato/?assunto=Quero+incluir+minha+empresa+/+loja+em+uma+campanha" class="btn btn--secondary">Falar com nossa equipe</a>
          </div>
        </div>
        <div>
          ${renderResponsiveImage({
            slug: 'quem-somos-governanca-estrategia-dados',
            alt: 'Lideranças estratégicas analisando fluxo de jornada promocional e indicadores de dados em sala de reunião executiva',
            priority: true,
            lightCard: false
          })}
        </div>
      </div>
    </section>

    <!-- Faixa de Clientes e Autoridade Corporativa -->
    ${renderClientLogosTrustStrip({
      title: 'Validada por Grandes Lideranças do Mercado',
      subtitle: 'Nossa abordagem de governança e rigor operacional é atestada por indústrias e redes que exigem conformidade legal e segurança de dados.',
      light: true
    })}

    <!-- Manifesto e Tese Institucional -->
    <section class="section surface-light">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="eyebrow">Nosso Manifesto</span>
            <h2>Usamos nossa expertise de grandes campanhas nacionais ao alcance de empresas de todos os portes.</h2>
          </div>
          <p class="section-lede">
            Muitas empresas acreditam que realizar uma promoção comercial legalizada perante a SPA/MF é algo inacessível ou restrito a grandes conglomerados. A ${BRAND_HTML} foi criada para transformar essa realidade. Reunimos a bagagem de operações que movimentaram centenas de milhares de consumidores em todo o Brasil para entregar campanhas promocionais estruturadas, acessíveis e 100% legalizadas.
          </p>
        </div>

        ${renderAuthorityPillars()}
      </div>
    </section>

    <!-- Missão, Visão e Valores -->
    <section class="section surface-warm">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="eyebrow">Diretrizes Corporativas</span>
            <h2>Missão, Visão e Valores que sustentam nossa entrega.</h2>
          </div>
          <p>
            Nossa cultura combina a disciplina de quem protege o investimento do lojista com a agilidade tecnológica necessária para engajar o consumidor moderno.
          </p>
        </div>

        <div class="cards-grid cards-grid--2" style="margin-bottom: 2rem;">
          <article class="card card--featured">
            <span class="card-num">Missão Institucional</span>
            <h3>Democratizar promoções legalizadas de alto impacto</h3>
            <p>
              Conectar nossa expertise na operação de grandes promoções a empresas e comércios de todos os segmentos e portes, impulsionando vendas com segurança jurídica inequívoca e excelente relação custo-benefício.
            </p>
          </article>
          <article class="card">
            <span class="card-num">Visão de Futuro</span>
            <h3>Referência em promoções acessíveis e de alto impacto</h3>
            <p>
              Consolidar-se como a principal empresa no Brasil em soluções de promoções comerciais acessíveis e seguras para o varejo e indústrias, reconhecida pela excelência técnica, conformidade regulatória e geração de resultados.
            </p>
          </article>
        </div>

        <div class="cards-grid cards-grid--3">
          <article class="card">
            <span class="card-num">Valor 01 · Foco em Resultado</span>
            <h3>Obsessão pela venda</h3>
            <p>Nossas campanhas são meios para um fim comercial concreto: aumentar o fluxo de clientes, estimular o giro de estoque e favorecer a recompra.</p>
          </article>
          <article class="card">
            <span class="card-num">Valor 02 · Segurança Jurídica</span>
            <h3>Rigor regulatório SPA</h3>
            <p>Atuamos com total respeito às normas vigentes de promoções comerciais da Secretaria de Prêmios e Apostas (SPA/MF) e à proteção de dados pessoais (LGPD).</p>
          </article>
          <article class="card">
            <span class="card-num">Valor 03 · Democratização</span>
            <h3>Relação custo/benefício e viabilidade</h3>
            <p>Estruturamos modelos inteligentes com excelente relação custo-benefício para que empresas de diversos portes tenham acesso ao mesmo padrão promocional de grandes redes.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Como Estruturamos e Operamos Campanhas -->
    <section class="section surface-light">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="eyebrow">Arquitetura Operacional</span>
            <h2>O que torna uma campanha PromoClicks diferente no dia a dia da loja.</h2>
          </div>
          <p>
            Sabemos que o varejista não pode perder tempo com processos burocráticos no caixa. Por isso, estruturamos a operação em três camadas operacionais.
          </p>
        </div>

        <div class="cards-grid cards-grid--3">
          <article class="card">
            <span class="card-num">Camada 01 · Ponto de Venda</span>
            <h3>Identificação imediata por loja</h3>
            <p>Cada estabelecimento participante conta com página customizada (ex.: <code>natalpremiado.promoclicks.com.br/SUALOJA</code>) e QR Code próprio, facilitando a divulgação no balcão e nas redes sociais.</p>
          </article>
          <article class="card">
            <span class="card-num">Camada 02 · Ambiente Digital</span>
            <h3>Captação fluida via mobile</h3>
            <p>O consumidor realiza o cadastro e o envio do comprovante fiscal diretamente pelo smartphone, sem filas na loja e com regras de participação apresentadas de forma transparente.</p>
          </article>
          <article class="card">
            <span class="card-num">Camada 03 · Gestão e Leitura</span>
            <h3>Acompanhamento e conformidade</h3>
            <p>Monitoramos os registros de participação, validamos os critérios previstos no regulamento e entregamos conformidade e segurança jurídica do início ao fim.</p>
          </article>
        </div>

        <div class="cta-group" style="margin-top: 2.5rem;">
          <a href="/natal-premiado/" class="btn btn--primary">Ver aplicação prática no Natal Premiado 2026 <span aria-hidden="true">→</span></a>
          <a href="/cases/" class="btn btn--outline">Consultar indicadores e referências de campanhas</a>
        </div>
      </div>
    </section>
  `;
}

export function getServicosContent() {
  const h1 = SITE_CONFIG.routes['/servicos/'].h1;
  return `
    <!-- Hero de Serviços -->
    <section class="page-hero">
      <div class="container hero-grid">
        <div>
          <span class="eyebrow">Portfólio de Soluções B2B</span>
          <h1>${h1}</h1>
          <p class="lead">
            Estruturamos soluções promocionais legalizadas para diferentes necessidades: campanhas coletivas com custos compartilhados, projetos exclusivos sob medida para marcas e indústrias, além de campanhas inovadoras desenvolvidas pela ${BRAND_HTML}.
          </p>
          <div class="cta-group">
            <a href="/contato/?assunto=Quero+incluir+minha+empresa+/+loja+em+uma+campanha" class="btn btn--primary">Solicitar recomendação para minha empresa <span aria-hidden="true">→</span></a>
            <a href="/natal-premiado/" class="btn btn--secondary">Ver campanha coletiva aberta</a>
          </div>
        </div>
        <div>
          ${renderResponsiveImage({
            slug: 'servicos-ecossistema-campanhas-varejo',
            alt: 'Corredor de estabelecimento comercial moderno com iluminação arquitetônica quente simbolizando ecossistema de campanhas para varejo',
            priority: true,
            lightCard: false
          })}
        </div>
      </div>
    </section>

    <!-- As Modalidades de Soluções -->
    <section class="section surface-light">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="eyebrow">Arquitetura de Soluções</span>
            <h2>Soluções dimensionadas para diferentes portes e objetivos comerciais.</h2>
          </div>
          <p>
            Explore os formatos disponíveis ou acesse a página dedicada de cada modalidade para avaliar o formato ideal para as suas metas de vendas.
          </p>
        </div>

        <div class="cards-grid cards-grid--3">
          <article class="card card--featured">
            <span class="card-num">01 · Adesão Compartilhada</span>
            <h3>Campanhas Coletivas</h3>
            <p>
              Seu estabelecimento participa de uma promoção compartilhada legalizada perante a SPA/MF. Custos legais, impostos, burocracia e premiação são rateados, permitindo que sua loja ofereça uma grande campanha com investimento menor que o próprio prêmio.
            </p>
            <ul class="check-list">
              <li>Investimento menor que o próprio prêmio</li>
              <li>Custos legais, impostos e burocracia SPA rateados</li>
              <li>Página customizada e QR Code exclusivo para sua loja</li>
              <li>Total legalidade e aprovação na SPA/MF</li>
            </ul>
            <a href="/servicos/campanhas-coletivas/" class="btn btn--primary">Explorar Campanhas Coletivas <span aria-hidden="true">→</span></a>
          </article>

          <article class="card">
            <span class="card-num">02 · Projeto Sob Medida</span>
            <h3>Campanhas Exclusivas para Marcas e Indústrias</h3>
            <p>
              Projetos desenhados sob medida para indústrias, redes varejistas e marcas. Modelos de participação dos consumidores exclusivos e inovadores, voltados ao alcance de objetivos estratégicos mais amplos e avançados.
            </p>
            <ul class="check-list">
              <li>Projetos sob medida para marcas e INDÚSTRIAS</li>
              <li>Modelos de participação inovadores e exclusivos</li>
              <li>Alcance de objetivos estratégicos amplos e avançados</li>
              <li>Gestão integral da homologação e prestação de contas na SPA/MF</li>
            </ul>
            <a href="/servicos/campanhas-exclusivas/" class="btn btn--outline">Conhecer Campanhas Exclusivas <span aria-hidden="true">→</span></a>
          </article>

          <article class="card">
            <span class="card-num">03 · Inovação PromoClicks</span>
            <h3>Campanhas Inovadoras PromoClicks</h3>
            <p>
              Formatos originais e dinâmicas proprietárias desenvolvidas pela ${BRAND_HTML} que combinam tecnologia, engajamento sem atrito na sua loja e visibilidade estruturada de adesão.
            </p>
            <ul class="check-list">
              <li>Dinâmicas inovadoras e exclusivas PromoClicks</li>
              <li>Jornada mobile sem fricção no ponto de venda</li>
              <li>Acompanhamento de participação por unidade e região</li>
            </ul>
            <a href="/servicos/inteligencia-de-dados/" class="btn btn--outline">Ver Inteligência Aplicada <span aria-hidden="true">→</span></a>
          </article>
        </div>
      </div>
    </section>

    <!-- Matriz Comparativa Visual -->
    <section class="section surface-warm">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="eyebrow">Comparativo Técnico e Comercial</span>
            <h2>Qual modalidade faz mais sentido para o seu momento?</h2>
          </div>
          <p>
            Compare o formato de contratação, o nível de personalização e a aplicação recomendada entre campanhas coletivas e exclusivas.
          </p>
        </div>

        ${renderSolutionsMatrix()}

        <p class="table-scroll-hint"><span>← Deslize horizontalmente para comparar todos os critérios →</span></p>
        <div class="table-wrapper" role="region" aria-label="Tabela comparativa de campanhas coletivas e exclusivas" tabindex="0">
          <table class="comparison-table">
            <thead>
              <tr>
                <th scope="col">Critério</th>
                <th scope="col">Campanhas Coletivas</th>
                <th scope="col">Campanhas Exclusivas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Público indicado</strong></td>
                <td>Lojas de rua, pequenos e médios varejos, supermercados e serviços</td>
                <td>Indústrias de bens de consumo, grandes redes varejistas, marcas e shoppings</td>
              </tr>
              <tr>
                <td><strong>Estrutura de custos</strong></td>
                <td>Custos legais, impostos, burocracia e premiação rateados (investimento menor que o próprio prêmio)</td>
                <td>Orçamento dimensionado sob medida para o escopo e objetivos estratégicos da marca/indústria</td>
              </tr>
              <tr>
                <td><strong>Identidade e ambiente</strong></td>
                <td>Página customizada para sua loja (ex.: <code>natalpremiado.promoclicks.com.br/SUALOJA</code>) e QR Code próprio</td>
                <td>Ambiente digital 100% exclusivo com a identidade da marca ou indústria</td>
              </tr>
              <tr>
                <td><strong>Modelos de participação</strong></td>
                <td>Mecânica padronizada de compras elegíveis e cadastro ágil de comprovante fiscal</td>
                <td>Modelos de participação dos consumidores exclusivos e inovadores, com metas estratégicas avançadas</td>
              </tr>
              <tr>
                <td><strong>Legalidade e SPA/MF</strong></td>
                <td>Promoção autorizada e gerenciada pela PromoClicks perante a SPA/MF</td>
                <td>Condução jurídica integral (autorização, auditoria e prestação de contas) pela PromoClicks perante a SPA/MF</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="cta-group" style="margin-top: 2rem;">
          <a href="/contato/?assunto=Quero+incluir+minha+empresa+/+loja+em+uma+campanha" class="btn btn--primary">Falar com um especialista em campanhas <span aria-hidden="true">→</span></a>
          <a href="/participe/#lojista" class="btn btn--outline">Ver jornada de adesão do lojista</a>
        </div>
      </div>
    </section>
  `;
}

export function getServicoColetivasContent() {
  const h1 = SITE_CONFIG.routes['/servicos/campanhas-coletivas/'].h1;
  return `
    <section class="page-hero">
      <div class="container hero-grid">
        <div>
          <span class="eyebrow">Serviço 01 · Promoções Compartilhadas e Acessíveis</span>
          <h1>${h1}</h1>
          <p class="lead">
            Participe de promoções comerciais compartilhadas e legalizadas. Custos legais, impostos, burocracia e premiação são rateados entre os participantes, permitindo que seu estabelecimento ofereça uma grande campanha com investimento menor que o próprio prêmio.
          </p>
          <div class="cta-group">
            <a href="/natal-premiado/#planos" class="btn btn--primary">Ver planos do Natal Premiado 2026 <span aria-hidden="true">→</span></a>
            <a href="/contato/?perfil=Lojista&amp;assunto=Quero+incluir+minha+empresa+/+loja+em+uma+campanha" class="btn btn--secondary">Solicitar atendimento comercial</a>
          </div>
        </div>
        <div>
          ${renderResponsiveImage({
            slug: 'servicos-coletivas-comercio-local',
            alt: 'Galeria comercial com lojistas locais e consumidores participando de campanha promocional coletiva',
            priority: true,
            lightCard: false
          })}
        </div>
      </div>
    </section>

    <section class="section surface-light">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="eyebrow">Como Funciona na Prática</span>
            <h2>Por que aderir a uma campanha promocional coletiva?</h2>
          </div>
          <p>
            Para muitos estabelecimentos comerciais, criar uma promoção individual do zero exige tempo, assessoria jurídica, plataforma tecnológica e verba integral de premiação. Na modalidade coletiva, a ${BRAND_HTML} entrega essa estrutura pronta para uso.
          </p>
        </div>

        <div class="cards-grid cards-grid--3">
          <article class="card">
            <span class="card-num">Vantagem 01</span>
            <h3>Investimento menor que o prêmio</h3>
            <p>Custos legais, impostos, burocracia e premiação são rateados entre os participantes. Sua loja oferece o <span class="badge-prize">Prêmio de R$ 1.000</span> com uma cota de adesão acessível e investimento previsível.</p>
          </article>
          <article class="card">
            <span class="card-num">Vantagem 02</span>
            <h3>Identidade visual e QR Code exclusivo</h3>
            <p>Seu estabelecimento recebe identidade visual própria, página exclusiva dentro do portal (<code>natalpremiado.promoclicks.com.br/SUALOJA</code>) e QR Code individual para o balcão.</p>
          </article>
          <article class="card">
            <span class="card-num">Vantagem 03</span>
            <h3>Total legalidade perante a SPA/MF</h3>
            <p>A ${BRAND_HTML} cuida de todo o processo regulatório junto à Secretaria de Prêmios e Apostas do Ministério da Fazenda, blindando seu comércio contra irregularidades.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section surface-warm">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="eyebrow">Campanha Coletiva em Destaque</span>
            <h2>Natal Premiado 2026: a oportunidade para o comércio vender mais no fim de ano.</h2>
          </div>
          <p class="section-lede">
            Seus clientes realizam compras elegíveis, cadastram o comprovante pelo celular e concorrem ao sorteio do <span class="badge-prize">Prêmio de R$ 1.000</span>, com custos compartilhados entre os estabelecimentos aderentes.
          </p>
        </div>

        ${renderNatalTimeline()}

        <div class="exclusive-cta-callout" role="complementary" aria-label="Campanhas Exclusivas">
          <div class="exclusive-cta-callout__content">
            <span class="exclusive-cta-callout__tag">Sob Medida para Redes e Indústrias</span>
            <h3 class="exclusive-cta-callout__title">Deseja uma campanha exclusiva apenas para a sua rede?</h3>
            <p class="exclusive-cta-callout__desc">Caso sua empresa busque um projeto individual fora do calendário coletivo, desenhamos mecânicas inovadoras, identidade própria e inteligência de dados dedicada.</p>
          </div>
          <a href="/servicos/campanhas-exclusivas/" class="btn btn--primary">Acessar Campanhas Exclusivas <span aria-hidden="true">→</span></a>
        </div>

        <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-top: 1.5rem;">
          <a href="/natal-premiado/" class="btn btn--primary">Acessar página completa do Natal Premiado <span aria-hidden="true">→</span></a>
          <a href="/servicos/" class="btn btn--outline">Voltar para todas as soluções</a>
        </div>
      </div>
    </section>
  `;
}

export function getServicoExclusivasContent() {
  const h1 = SITE_CONFIG.routes['/servicos/campanhas-exclusivas/'].h1;
  return `
    <section class="page-hero">
      <div class="container hero-grid">
        <div>
          <span class="eyebrow">Serviço 02 · Projetos Sob Medida para Marcas e Indústrias</span>
          <h1>${h1}</h1>
          <p class="lead">
            Planejamos e operamos campanhas promocionais exclusivas para indústrias, marcas, redes varejistas e centros comerciais. Desenvolvemos modelos de participação dos consumidores exclusivos e inovadores, voltados ao alcance de objetivos estratégicos mais amplos e avançados.
          </p>
          <div class="cta-group">
            <a href="/contato/?perfil=Marca+ou+Rede&amp;assunto=Campanha+Exclusiva" class="btn btn--primary">Solicitar proposta sob medida <span aria-hidden="true">→</span></a>
            <a href="/cases/" class="btn btn--secondary">Ver referências de escala e participação</a>
          </div>
        </div>
        <div>
          ${renderResponsiveImage({
            slug: 'servicos-exclusivas-flagship-store',
            alt: 'Flagship store de grande rede varejista com atendimento exclusivo e experiência de compra personalizada',
            priority: true,
            lightCard: false
          })}
        </div>
      </div>
    </section>

    <section class="section surface-light">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="eyebrow">Escopo Personalizado para Indústrias e Redes</span>
            <h2>Quando optar por uma campanha exclusiva da PromoClicks?</h2>
          </div>
          <p>
            Quando sua indústria ou rede comercial possui múltiplas unidades, metas específicas por categoria de produto ou necessita de modelos de participação inovadores e alinhados a objetivos corporativos avançados.
          </p>
        </div>

        <div class="cards-grid cards-grid--4">
          <article class="card">
            <span class="card-num">Etapa 01 · Estratégia</span>
            <h3>Modelos inovadores e exclusivos</h3>
            <p>Criamos dinâmicas de participação customizadas para produtos aceleradores, ticket médio e sell-out de indústrias e redes em múltiplos pontos de venda.</p>
          </article>
          <article class="card">
            <span class="card-num">Etapa 02 · Governança</span>
            <h3>Homologação integral SPA/MF</h3>
            <p>Conduzimos todo o processo regulatório perante a Secretaria de Prêmios e Apostas do Ministério da Fazenda, da submissão inicial à prestação final de contas.</p>
          </article>
          <article class="card">
            <span class="card-num">Etapa 03 · Tecnologia</span>
            <h3>Hotsite e jornada dedicados</h3>
            <p>Disponibilizamos ambiente digital responsivo com a identidade visual da sua marca ou indústria para cadastro de participantes e upload de notas fiscais.</p>
          </article>
          <article class="card">
            <span class="card-num">Etapa 04 · Resultados</span>
            <h3>Apuração e metas avançadas</h3>
            <p>Validamos os ganhadores com base no sorteio oficial e consolidamos os indicadores de adesão para orientar futuras decisões de expansão e recompra.</p>
          </article>
        </div>

        <!-- Matriz de Entregáveis e Insumos da Campanha Exclusiva -->
        <div style="margin-top: 3rem;">
          <div class="section-header">
            <div>
              <span class="eyebrow">Entregáveis e Planejamento</span>
              <h2>O que está incluído na operação de uma campanha exclusiva.</h2>
            </div>
            <p class="section-lede">
              Transparência em cada etapa: veja exatamente o que a equipe PromoClicks entrega e quais são as dependências operacionais da sua empresa.
            </p>
          </div>

          <div class="cards-grid cards-grid--3">
            <article class="card">
              <span class="card-num">Entregáveis Jurídicos</span>
              <h3>Assessoria Regulatória SPA</h3>
              <ul class="check-list">
                <li>Redação do regulamento oficial e plano de operação</li>
                <li>Submissão e acompanhamento no SCPC / SPA do Ministério da Fazenda</li>
                <li>Recolhimento de taxas de fiscalização e emissão do Certificado de Autorização</li>
                <li>Auditoria de conformidade e prestação de contas legal ao término</li>
              </ul>
            </article>

            <article class="card">
              <span class="card-num">Entregáveis Tecnológicos</span>
              <h3>Plataforma e Motor de Validação</h3>
              <ul class="check-list">
                <li>Hotsite mobile-first sob domínio ou subdomínio exclusivo da sua marca</li>
                <li>Motor de captura e auditoria de comprovantes fiscais (NFC-e / SAT / ECF)</li>
                <li>Algoritmo antifraude com validação de duplicidade de chave fiscal</li>
                <li>Geração automática de números da sorte vinculados à Loteria Federal</li>
              </ul>
            </article>

            <article class="card">
              <span class="card-num">Insumos e Dependências</span>
              <h3>O que a sua empresa fornece</h3>
              <ul class="check-list">
                <li>Definição da premiação ou verba total destinada aos prêmios</li>
                <li>Relação de produtos participantes (linhas padrão ou aceleradoras)</li>
                <li>Manual de aplicação da identidade visual e guia de marca</li>
                <li>Prazos de protocolo: recomenda-se início de 40 a 60 dias antes da veiculação</li>
              </ul>
            </article>
          </div>
        </div>

        <div class="notice-banner" role="note" style="margin-top: 2.5rem;">
          <strong>Referência de Escala em Operações Dedicadas:</strong>
          Empresas como <em>Urbano Alimentos</em> e <em>Ultraprêmio</em> operaram estruturas exclusivas com captação superior a 90 mil cadastros em janelas trimestrais. Confira a análise metodológica e os indicadores completos em nossa página de <a href="/cases/" style="color: var(--color-brand-red); font-weight: 700;">Cases de Sucesso</a>.
        </div>

        <div class="cta-group" style="margin-top: 2.5rem;">
          <a href="/contato/?perfil=Marca+ou+Rede&amp;assunto=Campanha+Exclusiva" class="btn btn--primary">Agendar reunião de briefing <span aria-hidden="true">→</span></a>
          <a href="/cases/" class="btn btn--outline">Ver cases e Big Numbers da PromoClicks</a>
        </div>
      </div>
    </section>
  `;
}

export function getServicoDadosContent() {
  const h1 = SITE_CONFIG.routes['/servicos/inteligencia-de-dados/'].h1;
  return `
    <section class="page-hero">
      <div class="container hero-grid">
        <div>
          <span class="eyebrow">Serviço 03 · Business Intelligence Promocional</span>
          <h1>${h1}</h1>
          <p class="lead">
            Campanhas tradicionais terminam no dia do sorteio. Na PromoClicks, cada participação registrada gera aprendizado estruturado sobre alcance, conversão de cadastro e comportamento de compra no seu negócio.
          </p>
          <div class="cta-group">
            <a href="/contato/?assunto=Inteligencia+de+Dados+Promocionais" class="btn btn--primary">Conversar sobre inteligência promocional <span aria-hidden="true">→</span></a>
            <a href="/cases/" class="btn btn--secondary">Ver aplicação nos cases de referência</a>
          </div>
        </div>
        <div>
          ${renderResponsiveImage({
            slug: 'servicos-dados-analytics-varejo',
            alt: 'Painel operacional com métricas e analytics de campanhas promocionais de varejo em tablet corporativo',
            priority: true,
            lightCard: false
          })}
        </div>
      </div>
    </section>

    <section class="section surface-light">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="eyebrow">Rigor Analítico e Comercial</span>
            <h2>O que medimos — e por que não confundimos métricas diferentes.</h2>
          </div>
          <p class="section-lede">
            Nossa metodologia organiza os indicadores em três níveis auditáveis: Alcance (topo), Participação (meio) e Compras Fiscais Elegíveis (fundo), garantindo clareza total para diretores e gestores de rede.
          </p>
        </div>

        ${renderArchitecturePipeline({
          title: 'Ciclo Dedicado para Inteligência Promocional',
          subtitle: 'Operação analítica desenhada para medir sell-out, ticket médio e comportamento de compra.',
          actionLink: '/contato/?assunto=Inteligencia+de+Dados+Promocionais',
          actionLabel: 'Falar com especialista em inteligência de dados'
        })}

        <!-- Dicionário Metodológico e Entregáveis de BI -->
        <div style="margin-top: 3rem;">
          <div class="section-header">
            <div>
              <span class="eyebrow">Dicionário e Critérios Analíticos</span>
              <h2>Como estruturamos os indicadores de campanha.</h2>
            </div>
            <p class="section-lede">
              Para orientar decisões gerenciais sem distorções, separamos rigorosamente cada métrica do funil promocional:
            </p>
          </div>

          <div class="cards-grid cards-grid--3">
            <article class="card">
              <span class="card-num">Nível 01 · Topo</span>
              <h3>Alcance e Visitas Únicas</h3>
              <p>Mede o volume de acessos ao hotsite ou leituras de QR Code no PDV. Indica a atratividade visual das peças e a curiosidade inicial gerada pela premiação no consumidor.</p>
              <div class="pipeline-card__footer" style="margin-top: 1rem;">
                <span class="pipeline-metric-tag">Atratividade de Marca</span>
              </div>
            </article>

            <article class="card">
              <span class="card-num">Nível 02 · Meio</span>
              <h3>Cadastros com Consentimento LGPD</h3>
              <p>Consumidores reais que completaram seus dados de identificação e contato de forma consentida, gerando uma base proprietária e qualificada para a empresa promotora.</p>
              <div class="pipeline-card__footer" style="margin-top: 1rem;">
                <span class="pipeline-metric-tag">Base Própria de Contatos</span>
              </div>
            </article>

            <article class="card">
              <span class="card-num">Nível 03 · Fundo</span>
              <h3>Cupons e Compras Fiscais Válidas</h3>
              <p>Notas fiscais autenticadas que cumpriram todos os critérios de valor mínimo e período. Mede diretamente o engajamento comercial e a conversão em vendas na loja.</p>
              <div class="pipeline-card__footer" style="margin-top: 1rem;">
                <span class="pipeline-metric-tag">Auditoria Fiscal Concluída</span>
              </div>
            </article>
          </div>

          <div class="cards-grid cards-grid--2" style="margin-top: 1.5rem;">
            <article class="card">
              <span class="card-num">Entregáveis de BI</span>
              <h3>Relatórios e Painéis Executivos</h3>
              <ul class="check-list">
                <li>Painel dinâmico para acompanhamento diário de participações</li>
                <li>Curva horária e dias da semana com maior registro de compras</li>
                <li>Distribuição geográfica por filial, cidade ou estabelecimento parceiro</li>
                <li>Mapeamento de ticket médio apurado nos comprovantes fiscais participantes</li>
              </ul>
            </article>

            <article class="card">
              <span class="card-num">Governança dos Dados</span>
              <h3>Limites Metodológicos e Segurança LGPD</h3>
              <ul class="check-list">
                <li>Total conformidade com a Lei nº 13.709/2018 (LGPD) e finalidade promocional específica</li>
                <li>Auditoria eletrônica de cupons impedindo duplicidades e fraudes na emissão de números da sorte</li>
                <li>Métricas analisadas com notas conceituais (distinção entre acessos brutos e compras fiscais)</li>
                <li>Relatório final entregue pronto para auditoria da Secretaria de Prêmios e Apostas (SPA/MF)</li>
              </ul>
            </article>
          </div>
        </div>

        <div style="text-align: center; margin-top: 2.5rem;">
          <a href="/cases/" class="btn btn--outline">Ver leitura aplicada nos cases Urbano e Ultraprêmio <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  `;
}

export function getNatalPremiadoContent() {
  const h1 = SITE_CONFIG.routes['/natal-premiado/'].h1;
  return `
    <!-- Hero Natal Premiado -->
    <section class="page-hero">
      <div class="container hero-grid">
        <div>
          <span class="eyebrow">Campanha Coletiva Sazonal · Edição 2026</span>
          <h1>${h1}</h1>
          <p class="lead">
            Seus clientes realizam compras elegíveis, cadastram o comprovante pelo celular e concorrem ao sorteio do <span class="badge-prize">Prêmio de R$ 1.000</span>. Sua empresa conta com identidade visual e QR Code exclusivo para a loja, e cadastro de compras diretamente pelo link <code>natalpremiado.promoclicks.com.br/SUALOJA</code> com custos rateados.
          </p>
          <div class="cta-group">
            <a href="#planos" class="btn btn--primary" data-track="natal_hero_planos" data-track-label="Natal Hero: Escolher plano da loja">
              Conhecer planos para minha loja <span aria-hidden="true">↓</span>
            </a>
            <a href="/participe/#consumidor" class="btn btn--secondary" data-track="natal_hero_consumidor" data-track-label="Natal Hero: Sou consumidor">
              Sou consumidor: como participar
            </a>
          </div>
          <div class="trust-strip" role="list" aria-label="Resumo das condições do Natal Premiado">
            <div class="trust-pill" role="listitem">
              <strong class="badge-prize" style="font-size: 0.95rem; padding: 2px 10px;">Prêmio de R$ 1.000</strong>
              <span>Premiação oficial compartilhada entre os estabelecimentos participantes</span>
            </div>
            <div class="trust-pill" role="listitem">
              <strong>Adesão de Lojistas: até 22/11</strong>
              <span>Fale conosco até 22/11 para garantir a vaga da sua loja</span>
            </div>
            <div class="trust-pill" role="listitem">
              <strong>Vendas na sua Loja: 01 a 25/12</strong>
              <span>Cadastro de compras pelo link natalpremiado.promoclicks.com.br/SUALOJA</span>
            </div>
          </div>
        </div>
        <div>
          ${renderResponsiveImage({
            slug: 'natal-premiado-experiencia-varejo-sazonal',
            alt: 'Experiência de compra natalina em loja participante do Natal Premiado com entrega de comprovante fiscal e sacola de presentes',
            priority: true,
            lightCard: false
          })}
        </div>
      </div>
    </section>

    <!-- Aviso de Transparência e Conformidade Regulatória -->
    <section class="section surface-light" style="padding-bottom: 1.5rem;">
      <div class="container">
        <div class="notice-banner" role="region" aria-label="Nota de transparência comercial e regulatória">
          <strong>Nota de Transparência e Conformidade Regulatória:</strong>
          As condições operacionais e cronograma desta campanha estão sujeitos à confirmação contratual, aprovação e publicação do regulamento oficial perante a SPA (Secretaria de Prêmios e Apostas do Ministério da Fazenda).
        </div>
      </div>
    </section>

    <!-- Como funciona para Lojistas e Consumidores -->
    <section class="section surface-light" style="padding-top: 2rem;">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="eyebrow">Mecânica Operacional</span>
            <h2>Uma campanha coletiva simples para a loja e envolvente para o cliente.</h2>
          </div>
          <p class="section-lede">
            No Natal Premiado, os comércios participantes compartilham a mesma estrutura tecnológica e a premiação oficial, mantendo páginas customizadas (<code>natalpremiado.promoclicks.com.br/SUALOJA</code>) e QR Codes individuais para ativação no ponto de venda.
          </p>
        </div>

        ${renderNatalTimeline()}
      </div>
    </section>

    <!-- Planos de Adesão para Lojistas -->
    <section class="section surface-warm" id="planos">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="eyebrow">Cotas de Adesão Comercial</span>
            <h2>Escolha o plano do seu estabelecimento pelo limite de números da sorte por CPF.</h2>
          </div>
          <p>
            Todos os planos garantem a participação da sua loja na campanha coletiva com sorteio do prêmio de R$ 1.000. A diferença entre eles está no <strong>limite máximo de números da sorte que um mesmo CPF pode acumular comprando no seu estabelecimento</strong>.
          </p>
        </div>

        ${renderPlansGrid()}

        <div class="notice-banner" style="margin-top: 2rem;">
          <strong>Distinção importante sobre os números da sorte:</strong>
          Os números <strong>03, 06, 10 e 20</strong> indicam o <strong>limite máximo de números da sorte por CPF dentro daquele estabelecimento</strong> durante a campanha, e não a quantidade automática gerada em uma única compra. A regra exata de emissão por compra constará no regulamento oficial aprovado pela SPA/MF.
        </div>
      </div>
    </section>

    <!-- Cronograma Operacional e Modalidade Complementar -->
    <section class="section surface-light">
      <div class="container split-layout">
        <div>
          <span class="eyebrow">Calendário Operacional</span>
          <h2>Datas-chave do Natal Premiado 2026.</h2>
          <p>
            Organize a adesão do seu estabelecimento com antecedência para receber os materiais de identificação e ativar sua página antes da abertura para os consumidores.
          </p>
          <ol class="step-timeline">
            <li class="step-item">
              <span class="step-badge">1</span>
              <div class="step-body">
                <h3>Adesão lojistas: fale conosco até 22/11 para garantir sua vaga</h3>
                <p>Data-limite para adesão comercial dos estabelecimentos participantes, envio das informações e ativação da página exclusiva da loja.</p>
              </div>
            </li>
            <li class="step-item">
              <span class="step-badge">2</span>
              <div class="step-body">
                <h3>Período de vendas na sua loja: 1º a 25 de dezembro de 2026</h3>
                <p>Período de participação dos consumidores: realização de compras elegíveis nas lojas aderentes e cadastro de notas fiscais pelo celular.</p>
              </div>
            </li>
            <li class="step-item">
              <span class="step-badge">3</span>
              <div class="step-body">
                <h3>26 de dezembro de 2026</h3>
                <p>Data prevista para apuração e auditoria/validação documental da participação contemplada conforme regulamento oficial.</p>
              </div>
            </li>
            <li class="step-item">
              <span class="step-badge">4</span>
              <div class="step-body">
                <h3>29 de dezembro de 2026</h3>
                <p>Divulgação oficial do resultado após a confirmação de conformidade dos dados e entrega do prêmio de R$ 1.000.</p>
              </div>
            </li>
          </ol>
        </div>

        <div>
          <article class="card" style="margin-bottom: 1.5rem;">
            <span class="card-num">Modalidade Complementar (Sujeita a Confirmação)</span>
            <h3>Aquisição de E-book sobre Inteligência Artificial</h3>
            <p>
              O briefing operacional prevê, em caráter complementar e <strong>sujeito à confirmação regulatória e comercial</strong>, uma modalidade alternativa de participação mediante a aquisição de um e-book sobre Inteligência Artificial pelo valor previsto de <strong>R$ 4,99</strong>.
            </p>
            <ul class="check-list">
              <li>Concessão prevista de <strong>01 número da sorte</strong> (limite de 01 por CPF nesta modalidade).</li>
              <li>Repasse previsto de <strong>R$ 1,00</strong> ao estabelecimento vinculado à indicação.</li>
              <li><em>Status atual:</em> modalidade em avaliação técnica; consulte o <a href="/regulamento/" style="text-decoration: underline; font-weight: 600;">status do regulamento</a> antes do início da campanha.</li>
            </ul>
          </article>

          <article class="card card--featured">
            <span class="card-num">Página Customizada da Sua Loja</span>
            <h3>Ambiente digital dedicado da campanha</h3>
            <p>
              O acesso dos consumidores para cadastro e registro de comprovantes ocorrerá por meio da URL exclusiva da sua loja: <code>natalpremiado.promoclicks.com.br/SUALOJA</code>, integrado ao QR Code individual do estabelecimento.
            </p>
            <div class="cta-group">
              <a href="/contato/?perfil=Lojista&amp;assunto=Quero+incluir+minha+empresa+/+loja+em+uma+campanha" class="btn btn--primary">Quero reservar a vaga da minha loja <span aria-hidden="true">→</span></a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Perguntas Frequentes (FAQ com Schema FAQPage correspondente) -->
    <section class="section surface-warm" id="faq">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="eyebrow">Dúvidas Frequentes</span>
            <h2>Perguntas e respostas sobre o Natal Premiado.</h2>
          </div>
          <p>
            Esclareça os principais pontos sobre planos para lojistas, limites de números da sorte por CPF e regras de participação.
          </p>
        </div>

        <div class="faq-list">
          ${SITE_CONFIG.natalFaqs
            .map(
              (faq, i) => `
          <details class="faq-item"${i === 0 ? ' open' : ''}>
            <summary>${faq.question}</summary>
            <div class="faq-answer">
              <p>${faq.answer}</p>
            </div>
          </details>`
            )
            .join('')}
        </div>

        <div class="cta-group" style="margin-top: 2.25rem;">
          <a href="/contato/?perfil=Lojista&amp;assunto=Quero+incluir+minha+empresa+/+loja+em+uma+campanha" class="btn btn--primary">Incluir minha loja no Natal Premiado <span aria-hidden="true">→</span></a>
          <a href="/regulamento/" class="btn btn--outline">Consultar página de Regulamento e Status</a>
        </div>
      </div>
    </section>
  `;
}

export function getCasesContent() {
  const h1 = SITE_CONFIG.routes['/cases/'].h1;
  return `
    <!-- Hero Cases -->
    <section class="page-hero">
      <div class="container hero-grid">
        <div>
          <span class="eyebrow">Big Numbers &amp; Cases Reais · PromoClicks</span>
          <h1>${h1}</h1>
          <p class="lead">
            Mais de 343 mil acessos únicos, mais de 192 mil cadastros de participantes e cupons fiscais registrados, e 100% de conformidade regulatória perante a SPA/MF. Conheça os Big Numbers da ${BRAND_HTML} e os resultados obtidos em campanhas nacionais de 3 meses de duração.
          </p>
          <div class="cta-group">
            <a href="/contato/?assunto=Quero+incluir+minha+empresa+/+loja+em+uma+campanha" class="btn btn--primary">Planejar campanha para minha marca ou loja <span aria-hidden="true">→</span></a>
            <a href="/servicos/" class="btn btn--secondary">Conhecer Soluções PromoClicks</a>
          </div>
        </div>
        <div>
          ${renderResponsiveImage({
            slug: 'cases-sucesso-crescimento-comercial',
            alt: 'Equipe executiva celebrando resultados comerciais auditados e crescimento de vendas no varejo',
            priority: true,
            lightCard: false
          })}
        </div>
      </div>
    </section>

    <!-- Faixa de Clientes que Recomendam -->
    ${renderClientLogosTrustStrip({
      title: 'Marcas que Validam Nosso Histórico Comercial',
      subtitle: 'Grandes marcas e cooperativas como Urbano Alimentos, Ultrafarma, L\'Oréal Paris, Seara, SIG Combibloc, TCL, Sococo, Sicoob, Broto Legal, Quatá Alimentos, Instituto Galo e Nissin Foods.',
      light: true
    })}

    <!-- Nota Metodológica Obrigatória -->
    <section class="section surface-light" style="padding-bottom: 1.5rem;">
      <div class="container">
        <div class="notice-banner" role="region" aria-label="Nota sobre os indicadores e Big Numbers">
          <strong>Big Numbers PromoClicks: Experiência Comprovada em Campanhas Nacionais</strong>
          Os dados consolidados refletem o histórico operacional da PromoClicks em janelas de 3 meses: mais de 343 mil acessos e usuários únicos impactados, mais de 192 mil cadastros concluídos e 100% de conformidade regulatória perante a SPA (Secretaria de Prêmios e Apostas do Ministério da Fazenda).
        </div>
      </div>
    </section>

    <!-- Cases Reais e Big Numbers -->
    <section class="section surface-light" style="padding-top: 1rem;">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="eyebrow">Casos Reais do Editorial PromoClicks</span>
            <h2>Conheça os Big Numbers da PromoClicks e alguns cases desafiadores e seus resultados.</h2>
          </div>
          <p class="section-lede">
            Observe como mecânicas promocionais claras, tecnologia proprietária e governança jurídica sustentam taxas expressivas de conversão, inovação na cadeia e aceleração real de vendas.
          </p>
        </div>

        ${renderCaseMetricsComparison()}

        <div class="cards-grid cards-grid--3">
          <article class="card card--featured">
            <span class="card-num">Case 01 · Janela de 3 Meses</span>
            <h3>Urbano Alimentos</h3>
            <p>
              Campanha promocional de abrangência massiva com foco em atração de tráfego qualificado para o ambiente digital e conversão de consumidores em base cadastrada de cupons fiscais.
            </p>
            <div class="case-detail-block">
              <span class="case-detail-label">Desafio</span>
              <p class="case-detail-text">Realizar uma promoção comercial de grande escala durante o período desafiador da COVID-19.</p>
            </div>
            <div class="case-detail-block">
              <span class="case-detail-label">Ações</span>
              <p class="case-detail-text">Forte integração da campanha com mídias digitais, lives e shows digitais, engajando os consumidores remotamente no ambiente online.</p>
            </div>
            <div class="case-detail-block">
              <span class="case-detail-label">Resultados</span>
              <p class="case-detail-text">Aumento da exposição e reconhecimento da marca e alta taxa de conversão (&gt;70%), com 180 mil usuários únicos e 91 mil cadastros em 3 meses.</p>
            </div>
          </article>

          <article class="card">
            <span class="card-num">Case 02 · Janela de 3 Meses</span>
            <h3>Ultrafarma</h3>
            <p>
              Ação promocional orientada à alta retenção e estímulo de conversão no varejo farmacêutico e canais digitais de compra.
            </p>
            <div class="case-detail-block">
              <span class="case-detail-label">Desafio</span>
              <p class="case-detail-text">Aumentar a exposição da marca e acelerar as vendas nos canais de e-commerce online.</p>
            </div>
            <div class="case-detail-block">
              <span class="case-detail-label">Ações</span>
              <p class="case-detail-text">Utilização de mecânicas de gamificação nas premiações com roleta digital interativa integrada ao fluxo de compras.</p>
            </div>
            <div class="case-detail-block">
              <span class="case-detail-label">Resultados</span>
              <p class="case-detail-text">Aumento expressivo de 30% nas vendas online, registrando 163 mil acessos e 101 mil clientes cadastrados em 3 meses.</p>
            </div>
          </article>

          <article class="card">
            <span class="card-num">Case 03 · Inovação Tecnológica</span>
            <h3>SIG (Embalagens Longa Vida)</h3>
            <p>
              Projeto pioneiro conectando inovação industrial, tecnologia de validação promocional e rastreamento unitário de produtos.
            </p>
            <div class="case-detail-block">
              <span class="case-detail-label">Desafio</span>
              <p class="case-detail-text">Lançar uma promoção utilizando inovação desenvolvida pela SIG: rastreamento total da cadeia de produção de cada unidade de leite longa-vida, do mercado até a casa do consumidor.</p>
            </div>
            <div class="case-detail-block">
              <span class="case-detail-label">Ações</span>
              <p class="case-detail-text">Desenvolvimento de técnicas e integrações inovadoras na arquitetura do sistema promocional PromoClicks para validação ponta a ponta dos códigos únicos.</p>
            </div>
            <div class="case-detail-block">
              <span class="case-detail-label">Resultados</span>
              <p class="case-detail-text">Geração de dados e análises estratégicas sobre a inovação na cadeia produtiva, inteligência sobre o comportamento do consumidor e segurança operacional absoluta.</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Metodologia de Avaliação de Campanhas -->
    <section class="section surface-warm">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="eyebrow">Padrão de Execução PromoClicks</span>
            <h2>Como avaliamos o sucesso de uma campanha promocional no seu negócio.</h2>
          </div>
          <p>
            Independentemente do porte da ação — seja uma adesão ao Natal Premiado ou uma campanha exclusiva — estruturamos a análise em três dimensões claras.
          </p>
        </div>

        <div class="cards-grid cards-grid--3">
          <article class="card">
            <span class="card-num">Dimensão 01 · Na Sua Loja</span>
            <h3>A comunicação atraiu atenção dos clientes?</h3>
            <p>Avaliamos o volume de leituras de QR Code e acessos à página customizada da loja (ex.: <code>natalpremiado.promoclicks.com.br/SUALOJA</code>) para identificar o engajamento no balcão.</p>
          </article>
          <article class="card">
            <span class="card-num">Dimensão 02 · No Mobile</span>
            <h3>A jornada converteu visitantes em cadastros?</h3>
            <p>Medimos a proporção de usuários que iniciam e concluem o cadastro pessoal, garantindo um fluxo rápido e sem atrito no smartphone.</p>
          </article>
          <article class="card">
            <span class="card-num">Dimensão 03 · Nas Vendas</span>
            <h3>Qual foi a intensidade de compra vinculada?</h3>
            <p>Analisamos a quantidade de comprovantes fiscais válidos registrados e o aproveitamento do teto de números da sorte por CPF em cada faixa de plano.</p>
          </article>
        </div>

        <div class="cta-group" style="margin-top: 2.25rem;">
          <a href="/natal-premiado/#planos" class="btn btn--primary">Aplicar essa estrutura na minha loja neste Natal <span aria-hidden="true">→</span></a>
          <a href="/contato/?assunto=Quero+incluir+minha+empresa+/+loja+em+uma+campanha" class="btn btn--outline">Solicitar apresentação comercial</a>
        </div>
      </div>
    </section>
  `;
}

export function getParticipeContent() {
  const h1 = SITE_CONFIG.routes['/participe/'].h1;
  return `
    <!-- Hero Participe -->
    <section class="page-hero">
      <div class="container hero-grid">
        <div>
          <span class="eyebrow">Guia Operacional · Lojistas e Consumidores</span>
          <h1>${h1}</h1>
          <p class="lead">
            Estruturamos dois caminhos claros e independentes: veja como incluir seu estabelecimento comercial nas campanhas da PromoClicks ou como cadastrar suas compras caso você seja consumidor de uma loja participante.
          </p>
          <div class="cta-group">
            <a href="#lojista" class="btn btn--primary" data-track="participe_anchor_lojista" data-track-label="Participe: Sou Lojista">
              Jornada do Lojista (B2B) <span aria-hidden="true">↓</span>
            </a>
            <a href="#consumidor" class="btn btn--secondary" data-track="participe_anchor_consumidor" data-track-label="Participe: Sou Consumidor">
              Jornada do Consumidor (B2C) <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div>
          ${renderResponsiveImage({
            slug: 'participe-jornada-mobile-comprovante',
            alt: 'Consumidor segurando smartphone ao lado de comprovante fiscal de compra e sacola de varejo para registro na campanha',
            priority: true,
            lightCard: false
          })}
        </div>
      </div>
    </section>

    <!-- Seletor Interativo Acessível (Tabs WAI-ARIA + Fallback completo) -->
    <section class="section surface-light">
      <div class="container">
        <div class="tabs-container" data-tabs>
          <div class="tabs-list" role="tablist" aria-label="Escolha seu perfil de participação">
            <button
              type="button"
              class="tab-trigger"
              role="tab"
              id="tab-btn-lojista"
              aria-selected="true"
              aria-controls="lojista"
              data-tab-target="lojista">
              1. Quero incluir minha loja (Lojista / Empresa)
            </button>
            <button
              type="button"
              class="tab-trigger"
              role="tab"
              id="tab-btn-consumidor"
              aria-selected="false"
              aria-controls="consumidor"
              tabindex="-1"
              data-tab-target="consumidor">
              2. Quero concorrer aos prêmios (Consumidor)
            </button>
          </div>

          <!-- Painel 1: Jornada do Lojista -->
          <div class="tab-panel" id="lojista" role="tabpanel" aria-labelledby="tab-btn-lojista">
            <div class="split-layout">
              <div>
                <span class="eyebrow">Jornada B2B · Estabelecimentos Comerciais</span>
                <h2>Passo a passo para incluir sua loja no Natal Premiado 2026.</h2>
                <p>
                  Qualquer estabelecimento comercial elegível pode solicitar adesão à campanha coletiva dentro do prazo previsto (<strong>até 22 de novembro de 2026</strong>). Veja como funciona a implantação:
                </p>

                <ol class="step-timeline">
                  <li class="step-item">
                    <span class="step-badge">1</span>
                    <div class="step-body">
                      <h3>Escolha da faixa de plano</h3>
                      <p>Defina entre os planos previstos <strong>Bronze (R$ 399)</strong>, <strong>Prata (R$ 499)</strong>, <strong>Ouro (R$ 699)</strong> ou <strong>Diamante (R$ 899)</strong>, de acordo com o limite de números da sorte por CPF que deseja oferecer na sua loja (03, 06, 10 ou 20).</p>
                    </div>
                  </li>
                  <li class="step-item">
                    <span class="step-badge">2</span>
                    <div class="step-body">
                      <h3>Cadastro empresarial e confirmação comercial</h3>
                      <p>Envie os dados do estabelecimento (Razão Social, Nome Fantasia, CNPJ, endereço, responsável e WhatsApp) pelo nosso canal comercial e conclua a formalização da adesão.</p>
                    </div>
                  </li>
                  <li class="step-item">
                    <span class="step-badge">3</span>
                    <div class="step-body">
                      <h3>Ativação da página exclusiva e QR Code</h3>
                      <p>Após a confirmação e validação operacional, a PromoClicks configura a página vinculada ao seu estabelecimento e libera o <strong>QR Code individual da sua loja</strong>.</p>
                    </div>
                  </li>
                  <li class="step-item">
                    <span class="step-badge">4</span>
                    <div class="step-body">
                      <h3>Divulgação e operação de 01/12 a 25/12/2026</h3>
                      <p>Posicione o QR Code no caixa e oriente sua equipe: a cada compra elegível no período previsto da campanha, o próprio cliente escaneia o código e cadastra o comprovante fiscal.</p>
                    </div>
                  </li>
                </ol>

                <div class="cta-group" style="margin-top: 2rem;">
                  <a href="/contato/?perfil=Lojista&amp;assunto=Natal+Premiado" class="btn btn--primary" data-track="participe_lojista_cta" data-track-label="Participe: Solicitar adesão da loja">
                    Solicitar adesão da minha loja agora <span aria-hidden="true">→</span>
                  </a>
                  <a href="/natal-premiado/#planos" class="btn btn--outline">Rever tabela de planos</a>
                </div>
              </div>

              <div>
                <article class="card card--featured">
                  <span class="card-num">Checklist de Preparação do Lojista</span>
                  <h3>O que você precisará informar na adesão</h3>
                  <ul class="check-list">
                    <li>CNPJ ativo e Razão Social do estabelecimento</li>
                    <li>Nome Fantasia como aparecerá na página da campanha</li>
                    <li>Segmento de atuação e cidade/UF</li>
                    <li>Nome e contato (WhatsApp e e-mail) do responsável pela loja</li>
                    <li>Plano escolhido (Bronze, Prata, Ouro ou Diamante)</li>
                    <li>Logotipo da loja para aplicação na página vinculada</li>
                  </ul>
                  <div class="exclusive-cta-callout" role="complementary" aria-label="Campanhas Exclusivas" style="margin-top: 1.5rem;">
                    <div class="exclusive-cta-callout__content">
                      <span class="exclusive-cta-callout__tag">Sob Medida para Redes e Indústrias</span>
                      <h4 class="exclusive-cta-callout__title">Deseja uma campanha exclusiva apenas para a sua rede?</h4>
                      <p class="exclusive-cta-callout__desc">Caso sua empresa busque um projeto individual fora do calendário coletivo, desenvolvemos mecânicas exclusivas sob medida, tecnologia dedicada e gestão integral SPA.</p>
                    </div>
                    <a href="/servicos/campanhas-exclusivas/" class="btn btn--primary" style="margin-top: 0.75rem;">Acessar Campanhas Exclusivas <span aria-hidden="true">→</span></a>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <!-- Painel 2: Jornada do Consumidor -->
          <div class="tab-panel" id="consumidor" role="tabpanel" aria-labelledby="tab-btn-consumidor" hidden>
            <div class="split-layout">
              <div>
                <span class="eyebrow">Jornada B2C · Clientes das Lojas Participantes</span>
                <h2>Como participar e concorrer como consumidor no Natal Premiado.</h2>
                <p>
                  Se você comprou ou vai comprar em um estabelecimento participante durante o período previsto da campanha (<strong>1º a 25 de dezembro de 2026</strong>), siga as etapas abaixo para registrar sua participação:
                </p>

                <ol class="step-timeline">
                  <li class="step-item">
                    <span class="step-badge">1</span>
                    <div class="step-body">
                      <h3>Realize uma compra elegível em loja participante</h3>
                      <p>Efetue sua compra em um estabelecimento aderente ao Natal Premiado dentro do período previsto e solicite seu comprovante fiscal válido. Lembre-se: o critério previsto considera <strong>compra única por comprovante</strong>, sem acúmulo de saldos entre compras menores.</p>
                    </div>
                  </li>
                  <li class="step-item">
                    <span class="step-badge">2</span>
                    <div class="step-body">
                      <h3>Acesse o QR Code exclusivo da loja</h3>
                      <p>Escaneie o QR Code disponível no balcão do estabelecimento ou acesse a página da loja no portal previsto da campanha (<code>natalpremiado.promoclicks.com.br</code>).</p>
                    </div>
                  </li>
                  <li class="step-item">
                    <span class="step-badge">3</span>
                    <div class="step-body">
                      <h3>Preencha seu cadastro e envie o comprovante</h3>
                      <p>Informe seus dados pessoais (incluindo CPF e contato) e registre os dados ou imagem do comprovante fiscal conforme solicitado no ambiente digital da promoção.</p>
                    </div>
                  </li>
                  <li class="step-item">
                    <span class="step-badge">4</span>
                    <div class="step-body">
                      <h3>Acompanhe seus números da sorte e a apuração</h3>
                      <p>Receba seus números da sorte respeitando o limite por CPF do plano da loja (03, 06, 10 ou 20 números). O sorteio e auditoria estão previstos para <strong>26/12/2026</strong>, com divulgação prevista em <strong>29/12/2026</strong>.</p>
                    </div>
                  </li>
                </ol>

                <div class="cta-group" style="margin-top: 2rem;">
                  <a href="/regulamento/" class="btn btn--primary">Consultar Regulamento e Condições Oficiais <span aria-hidden="true">→</span></a>
                  <a href="/contato/?perfil=Consumidor&amp;assunto=Duvida+de+Consumidor" class="btn btn--outline">Preciso de suporte como consumidor</a>
                </div>
              </div>

              <div>
                <article class="card">
                  <span class="card-num">Regras Essenciais Previstas para o Consumidor</span>
                  <h3>O que observar antes de cadastrar</h3>
                  <ul class="check-list">
                    <li><strong>Guarde o comprovante fiscal:</strong> a apresentação do documento original pode ser exigida na etapa de auditoria e validação do contemplado.</li>
                    <li><strong>Limite por CPF por estabelecimento:</strong> cada loja participante possui um teto máximo de números da sorte por CPF (03 no Bronze, 06 no Prata, 10 no Ouro e 20 no Diamante).</li>
                    <li><strong>Liberdade para comprar em várias lojas:</strong> você pode participar comprando em diferentes estabelecimentos participantes, respeitando o teto individual de cada loja.</li>
                    <li><strong>Status do portal de cadastro:</strong> o ambiente de registro de cupons (<code>natalpremiado.promoclicks.com.br</code>) permanece bloqueado para envios até a abertura oficial prevista em 01/12/2026.</li>
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function getContatoContent() {
  const h1 = SITE_CONFIG.routes['/contato/'].h1;
  return `
    <!-- Hero Contato -->
    <section class="page-hero" style="padding-bottom: 3rem;">
      <div class="container">
        <span class="eyebrow">Atendimento Comercial e Institucional</span>
        <h1>${h1}</h1>
        <p class="lead">
          Preencha os dados abaixo de acordo com o seu perfil (Lojista, Marca/Rede, Parceiro ou Consumidor). Nossa estrutura organiza automaticamente seu resumo de atendimento para agilizar o retorno da equipe PromoClicks.
        </p>
      </div>
    </section>

    <!-- Seção Principal de Contato e Formulário Inteligente -->
    <section class="section surface-light">
      <div class="container contact-layout">
        <!-- Coluna de Informações e Governança de Atendimento -->
        <div>
          <span class="eyebrow">Canais e Direcionamento</span>
          <h2>Atendimento segmentado por objetivo.</h2>
          <p>
            Para garantir agilidade tanto aos estabelecimentos que desejam aderir às campanhas quanto aos consumidores que buscam informações, estruturamos nosso atendimento por frente:
          </p>

          <div class="cards-grid" style="margin: 1.5rem 0;">
            <article class="card">
              <span class="card-num">Frente 01 · Adesão Natal Premiado 2026</span>
              <h3>Lojistas e Estabelecimentos</h3>
              <p>Orientação sobre os planos previstos (Bronze, Prata, Ouro e Diamante), prazos de adesão até 22/11/2026 e ativação de página e QR Code da loja.</p>
            </article>

            <article class="card">
              <span class="card-num">Frente 02 · Projetos Sob Medida</span>
              <h3>Marcas, Redes e Associações</h3>
              <p>Diagnóstico estratégico para campanhas promocionais exclusivas, modelos inovadores de participação para marcas e indústrias, e leitura de dados em múltiplas unidades.</p>
            </article>

            <article class="card">
              <span class="card-num">Frente 03 · Suporte ao Participante</span>
              <h3>Consumidores e Dúvidas Gerais</h3>
              <p>Esclarecimentos sobre regras previstas de participação, acesso às páginas das lojas aderentes e consulta de documentação oficial.</p>
            </article>
          </div>

          <div class="card" style="margin-top: 1.5rem; background: var(--color-surface); border-left: 4px solid var(--color-brand-red);">
            <h3 style="font-size: 1.15rem; margin-bottom: 0.75rem;">Canais Oficiais de Atendimento</h3>
            <p style="font-size: 0.95rem; margin-bottom: 0.5rem;">
              <strong>E-mail comercial:</strong> <a href="mailto:contato@promoclicks.com.br" style="color: var(--color-brand-red); font-weight: 600;">contato@promoclicks.com.br</a>
            </p>
            <p style="font-size: 0.95rem; margin-bottom: 0.5rem;">
              <strong>Horário operacional:</strong> Segunda a sexta-feira, das 09h às 18h (horário de Brasília).
            </p>
            <p style="font-size: 0.95rem; margin-bottom: 0;">
              <strong>Instagram oficial:</strong> <a href="https://www.instagram.com/campanhas.promoclicks/" target="_blank" rel="noopener noreferrer" style="color: var(--color-brand-red); font-weight: 600;">${SITE_CONFIG.socialInstagram}</a>
            </p>
          </div>

          <div class="notice-banner" role="note" style="margin-top: 1.5rem;">
            <strong>Presença Digital e Transparência:</strong>
            Acompanhe as atualizações oficiais pelo Instagram <strong>${SITE_CONFIG.socialInstagram}</strong>. Nenhuma taxa é cobrada de consumidores para recebimento de prêmios contemplados.
          </div>
        </div>

        <!-- Coluna do Formulário Estruturado (Sem falso envio) -->
        <div class="form-card">
          <h2 style="font-size: 1.65rem; margin-bottom: 0.35rem;">Formulário de Solicitação e Briefing Rápido</h2>
          <p style="font-size: 1rem; margin-bottom: 1.5rem;">
            Os campos marcados com <strong>*</strong> são obrigatórios. Ao selecionar um assunto comercial, campos adicionais de empresa e plano serão exibidos.
          </p>

          <form id="contact-form" novalidate>
            <div class="form-grid">
              <div class="form-field">
                <label for="field-nome">Nome completo <span class="req" aria-hidden="true">*</span></label>
                <input type="text" id="field-nome" name="nome" class="form-control" placeholder="Seu nome e sobrenome" autocomplete="name" required>
              </div>

              <div class="form-field">
                <label for="field-perfil">Seu perfil <span class="req" aria-hidden="true">*</span></label>
                <select id="field-perfil" name="perfil" class="form-control" required>
                  <option value="Lojista" selected>Lojista / Estabelecimento Comercial</option>
                  <option value="Marca ou Rede">Gestor de Marca / Rede / Shopping / Indústria</option>
                  <option value="Parceiro">Agência / Associação / Parceiro Comercial</option>
                  <option value="Consumidor">Consumidor Participante</option>
                </select>
              </div>

              <div class="form-field">
                <label for="field-email">E-mail profissional ou de contato <span class="req" aria-hidden="true">*</span></label>
                <input type="email" id="field-email" name="email" class="form-control" placeholder="voce@empresa.com.br" autocomplete="email" required>
              </div>

              <div class="form-field">
                <label for="field-telefone">Telefone / WhatsApp com DDD <span class="req" aria-hidden="true">*</span></label>
                <input type="tel" id="field-telefone" name="telefone" class="form-control" placeholder="(00) 00000-0000" autocomplete="tel" required>
              </div>

              <div class="form-field form-field--full">
                <label for="field-assunto">Assunto principal <span class="req" aria-hidden="true">*</span></label>
                <select id="field-assunto" name="assunto" class="form-control" required>
                  <option value="Quero incluir minha empresa / loja em uma campanha" selected>Quero incluir minha empresa / loja em uma campanha</option>
                  <option value="Natal Premiado">Quero incluir minha loja no Natal Premiado 2026</option>
                  <option value="Campanha Coletiva">Interesse em próximas Campanhas Coletivas</option>
                  <option value="Campanha Exclusiva">Orçamento de Campanha Exclusiva para Marca ou Indústria</option>
                  <option value="Inteligencia de Dados">Inteligência de Dados Aplicada ao Varejo</option>
                  <option value="Parceria Comercial">Parceria com Associação Comercial / Agência / Advocacia</option>
                  <option value="Duvida de Consumidor">Dúvida de Consumidor sobre participação</option>
                  <option value="Outro Assunto">Outro assunto institucional</option>
                </select>
              </div>

              <!-- Campos Condicionais B2B (Empresa eCidade) -->
              <div class="form-field conditional-group" id="group-empresa">
                <label for="field-empresa">Nome da Empresa / Loja</label>
                <input type="text" id="field-empresa" name="empresa" class="form-control" placeholder="Nome fantasia do estabelecimento" autocomplete="organization">
              </div>

              <div class="form-field conditional-group" id="group-cidade">
                <label for="field-cidade">Cidade / UF</label>
                <input type="text" id="field-cidade" name="cidade" class="form-control" placeholder="Ex.: São Paulo / SP">
              </div>

              <!-- Campo Condicional: Plano do Natal Premiado -->
              <div class="form-field form-field--full conditional-group" id="group-plano" hidden>
                <label for="field-plano">Plano de interesse no Natal Premiado (Condições Previstas)</label>
                <select id="field-plano" name="plano" class="form-control">
                  <option value="Ainda quero comparar os planos">Ainda quero comparar os planos com um consultor</option>
                  <option value="Bronze">Plano Bronze — R$ 399 (limite de até 03 números da sorte por CPF na loja)</option>
                  <option value="Prata">Plano Prata — R$ 499 (limite de até 06 números da sorte por CPF na loja)</option>
                  <option value="Ouro">Plano Ouro — R$ 699 (limite de até 10 números da sorte por CPF na loja)</option>
                  <option value="Diamante">Plano Diamante — R$ 899 (limite de até 20 números da sorte por CPF na loja)</option>
                </select>
              </div>

              <div class="form-field form-field--full">
                <label for="field-mensagem">Mensagem ou objetivos da campanha <span class="req" aria-hidden="true">*</span></label>
                <textarea id="field-mensagem" name="mensagem" class="form-control" placeholder="Conte brevemente sobre o seu estabelecimento, segmento ou dúvida para direcionarmos o atendimento..." required></textarea>
              </div>

              <div class="form-field form-field--full">
                <label class="checkbox-row" for="field-consentimento">
                  <input type="checkbox" id="field-consentimento" name="consentimento" required>
                  <span>
                    Concordo em fornecer os dados acima para que a PromoClicks realize o atendimento da minha solicitação, conforme as diretrizes da <a href="/politica-de-privacidade/" style="text-decoration: underline; font-weight: 600;">Política de Privacidade (LGPD)</a>. <span class="req" aria-hidden="true">*</span>
                  </span>
                </label>
              </div>
            </div>

            <div class="cta-group" style="margin-top: 1.5rem;">
              <button type="submit" class="btn btn--primary" style="width: 100%;">
                Preparar resumo da solicitação comercial <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>

          <!-- Painel de Retorno Transparente e Canais de Envio Direto -->
          <div class="form-feedback" id="form-feedback" role="status" aria-live="polite" tabindex="-1" hidden>
            <h3>Sua solicitação está pronta para envio</h3>
            <p id="feedback-intro" style="font-size: 1rem; margin-bottom: 0.75rem;"></p>
            <div class="cta-group" style="margin-bottom: 1.25rem;">
              <a href="#" target="_blank" rel="noopener noreferrer" class="btn btn--primary" id="whatsapp-summary-btn" style="background: #25D366; border-color: #25D366; color: #fff;">
                Conversar no WhatsApp com este resumo <span aria-hidden="true">→</span>
              </a>
              <a href="#" class="btn btn--secondary" id="email-summary-btn">
                Enviar por E-mail (contato@promoclicks.com.br)
              </a>
              <button type="button" class="btn btn--outline" id="copy-summary-btn" data-track="contact_copy_summary" data-track-label="Copiar resumo do contato">
                Copiar texto do resumo
              </button>
            </div>
            <p style="font-size: 0.9rem; margin-bottom: 0.5rem; color: var(--color-text-muted);">
              <strong>Resumo estruturado gerado:</strong>
            </p>
            <pre class="summary-box" id="form-summary-box"></pre>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function getPoliticaPrivacidadeContent() {
  const h1 = SITE_CONFIG.routes['/politica-de-privacidade/'].h1;
  return `
    <section class="page-hero" style="padding-bottom: 2.5rem;">
      <div class="container">
        <span class="eyebrow">Governança e Proteção de Dados · LGPD</span>
        <h1>${h1}</h1>
        <p class="lead">
          Estrutura institucional dedicada à transparência sobre o tratamento de dados pessoais no site da PromoClicks e nos ambientes de campanhas promocionais.
        </p>
      </div>
    </section>

    <section class="section surface-light">
      <div class="container">
        <div class="legal-document">
          <h2>1. Identificação do Controlador e Escopo</h2>
          <p>
            Esta Política de Privacidade aplica-se ao site institucional da <strong>PromoClicks</strong> (<code>promoclicks.com.br</code>) e estabelece a arquitetura de governança para os subdomínios de campanhas promocionais operados pela marca (incluindo o ambiente previsto <code>natalpremiado.promoclicks.com.br</code>).
          </p>
          <ul>
            <li><strong>Controlador de Dados:</strong> <strong>BIG DATA HELIX TECNOLOGIA LTDA</strong>, inscrita no CNPJ sob o nº 26.702.873/0001-30, com sede na Alameda Afonso Schmidt, nº 264, sala 143, CEP 02450-000, São Paulo/SP.</li>
            <li><strong>Encarregado pelo Tratamento de Dados Pessoais (DPO):</strong> Canal oficial de atendimento e requisições LGPD via e-mail corporativo ou formulário institucional.</li>
          </ul>

          <h2>2. Categorias de Dados Tratados</h2>
          <p>
            A arquitetura do portal separa estritamente os dados coletados em duas jornadas distintas:
          </p>
          <ul>
            <li><strong>Jornada Institucional e Comercial (B2B):</strong> nome, perfil profissional, e-mail, telefone/WhatsApp, nome da empresa, cidade/UF e mensagem informados voluntariamente no formulário de contato para fins de atendimento comercial e envio de propostas.</li>
            <li><strong>Jornada de Participação em Campanhas Promocionais (B2C):</strong> dados cadastrais do consumidor participante (como nome completo, CPF, contato e dados do comprovante fiscal de compra elegível), coletados exclusivamente no ambiente específico de cada campanha e regidos pelo respectivo Regulamento Oficial.</li>
          </ul>

          <h2>3. Finalidades e Bases Legais de Tratamento</h2>
          <p>
            O tratamento de dados pessoais observa as hipóteses legais do art. 7º da Lei nº 13.709/2018 (LGPD):
          </p>
          <ul>
            <li><strong>Atendimento a solicitações comerciais e pré-contratuais:</strong> execução de procedimentos preliminares relacionados a contrato do qual seja parte o titular ou a empresa representada.</li>
            <li><strong>Execução de campanhas promocionais e apuração de sorteios:</strong> cumprimento de obrigação legal/regulatória perante os órgãos fiscalizadores (como a Secretaria de Prêmios e Apostas — SPA/MF) e execução do regulamento aceito pelo participante.</li>
            <li><strong>Prevenção à fraude e auditoria de comprovantes fiscais:</strong> garantia da lisura das participações e respeito aos limites de números da sorte por CPF.</li>
          </ul>

          <h2>4. Direitos dos Titulares (Art. 18 da LGPD)</h2>
          <p>
            É assegurado ao titular dos dados pessoais, a qualquer momento e mediante requisição formal ao canal oficial de privacidade da PromoClicks, o direito de solicitar: confirmação da existência de tratamento, acesso aos dados, correção de dados incompletos ou desatualizados, anonimização ou eliminação de dados desnecessários e informações sobre compartilhamento.
          </p>

          <div class="cta-group" style="margin-top: 2rem;">
            <a href="/contato/?assunto=Outro+Assunto" class="btn btn--outline">Entrar em contato com a equipe</a>
            <a href="/" class="card-link">Voltar para a página inicial <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function getTermosUsoContent() {
  const h1 = SITE_CONFIG.routes['/termos-de-uso/'].h1;
  return `
    <section class="page-hero" style="padding-bottom: 2.5rem;">
      <div class="container">
        <span class="eyebrow">Governança Institucional</span>
        <h1>${h1}</h1>
        <p class="lead">
          Regras de utilização, propriedade intelectual da marca PromoClicks e limites de responsabilidade sobre informações preliminares de campanhas.
        </p>
      </div>
    </section>

    <section class="section surface-light">
      <div class="container">
        <div class="legal-document">
          <div class="notice-banner" role="note" style="margin-bottom: 2rem;">
            <strong>Estrutura Institucional de Termos de Uso:</strong>
            Este documento consolida as diretrizes de navegação e proteção de marca do portal institucional da PromoClicks, reservando o espaço para averbação de foro e qualificação societária definitiva pelo setor jurídico da empresa.
          </div>

          <h2>1. Finalidade do Portal Institucional</h2>
          <p>
            O site institucional da <strong>PromoClicks</strong> (mantido pela <strong>BIG DATA HELIX TECNOLOGIA LTDA</strong>, CNPJ: 26.702.873/0001-30) tem por finalidade apresentar suas soluções de inteligência promocional e aceleração de vendas, bem como divulgar informações comerciais e operacionais sobre campanhas coletivas e exclusivas para lojistas, indústrias, marcas e consumidores.
          </p>

          <h2>2. Distinção entre Informações Preliminares e Regulamento Oficial</h2>
          <p>
            As informações comerciais relativas a campanhas futuras ou em fase de captação de estabelecimentos — incluindo valores de planos de adesão, limites previstos de números da sorte por CPF, cronogramas e premiações do <strong>Natal Premiado 2026</strong> — possuem caráter informativo e preliminar até a publicação do respectivo <strong>Regulamento Oficial</strong> e número de certificado de autorização (SPA).
          </p>

          <h2>3. Propriedade Intelectual e Manual de Marca</h2>
          <p>
            O nome empresarial, a marca <strong>PromoClicks</strong>, o logotipo oficial (cursor e sacola de compras em gradiente vermelho e laranja), os infográficos, textos, códigos-fonte e elementos visuais deste portal são protegidos pela legislação de propriedade intelectual. É vedada a reprodução, modificação ou utilização indevida do logotipo fora dos padrões estabelecidos no Manual de Marca da PromoClicks.
          </p>

          <h2>4. Responsabilidades do Visitante</h2>
          <p>
            Ao utilizar os formulários de contato deste portal, o usuário compromete-se a fornecer informações verídicas e atualizadas, respondendo pela exatidão dos dados informados em nome próprio ou do estabelecimento comercial que representa.
          </p>

          <div class="cta-group" style="margin-top: 2rem;">
            <a href="/regulamento/" class="btn btn--outline">Consultar Status do Regulamento de Campanhas</a>
            <a href="/politica-de-privacidade/" class="card-link">Ver Política de Privacidade <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function getRegulamentoContent() {
  const h1 = SITE_CONFIG.routes['/regulamento/'].h1;
  return `
    <section class="page-hero" style="padding-bottom: 2.5rem;">
      <div class="container">
        <span class="eyebrow">Transparência Regulatória · Natal Premiado 2026</span>
        <h1>${h1}</h1>
        <p class="lead">
          Consulte o quadro de condições preliminares previstas no briefing da campanha Natal Premiado 2026 e acompanhe o status de publicação do regulamento oficial e autorização (SPA).
        </p>
      </div>
    </section>

    <section class="section surface-light">
      <div class="container">
        <div class="legal-document">
          <div class="notice-banner" role="region" aria-label="Status atual do regulamento oficial" style="margin-bottom: 2rem;">
            <strong>Status Documental Atual: Em Fase de Planejamento e Homologação</strong>
            Em estrita observância à transparência com lojistas e consumidores, informamos que o <strong>Regulamento Oficial Definitivo</strong> e o respectivo número de Certificado de Autorização (SPA/MF) do <em>Natal Premiado 2026</em> serão publicados nesta página antes da abertura do período de participação dos consumidores (previsto para 01/12/2026). Nenhum número de processo ou certificado é exibido de forma fictícia antes de sua emissão oficial.
          </div>

          <h2>Quadro Consolidado de Condições Preliminares (Briefing Natal Premiado 2026)</h2>
          <p>
            Abaixo estão listados os parâmetros operacionais e comerciais previstos na documentação de planejamento da campanha, todos sujeitos à confirmação no texto definitivo do regulamento:
          </p>

          <p class="table-scroll-hint"><span>← Deslize horizontalmente para comparar os parâmetros da campanha →</span></p>
          <div class="table-wrapper" style="margin: 1.5rem 0;">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Item da Campanha</th>
                  <th scope="col">Parâmetro Previsto no Briefing</th>
                  <th scope="col">Status de Validação</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Modalidade</strong></td>
                  <td>Campanha promocional coletiva por adesão de estabelecimentos</td>
                  <td>Condição preliminar prevista</td>
                </tr>
                <tr>
                  <td><strong>Premiação Principal</strong></td>
                  <td>Prêmio de R$ 1.000 (premiação única compartilhada)</td>
                  <td>Sujeito à confirmação no regulamento final</td>
                </tr>
                <tr>
                  <td><strong>Planos de Adesão Lojista</strong></td>
                  <td>Bronze (R$ 399 / até 03 nº por CPF), Prata (R$ 499 / até 06), Ouro (R$ 699 / até 10) e Diamante (R$ 899 / até 20)</td>
                  <td>Valores e limites previstos para adesão comercial</td>
                </tr>
                <tr>
                  <td><strong>Prazo de Adesão Comercial</strong></td>
                  <td>Até 22 de novembro de 2026</td>
                  <td>Cronograma previsto de planejamento</td>
                </tr>
                <tr>
                  <td><strong>Período de Participação (Consumidor)</strong></td>
                  <td>De 1º de dezembro a 25 de dezembro de 2026</td>
                  <td>Abertura condicionada à publicação do regulamento oficial</td>
                </tr>
                <tr>
                  <td><strong>Sorteio e Auditoria</strong></td>
                  <td>Sorteio/auditoria previstos em 26/12/2026 e divulgação prevista em 29/12/2026</td>
                  <td>Datas previstas sujeitas à homologação</td>
                </tr>
                <tr>
                  <td><strong>Critério de Compra Elegível</strong></td>
                  <td>Compra única por comprovante fiscal em loja participante (sem acúmulo de saldo excedente)</td>
                  <td>Regra operacional prevista em briefing</td>
                </tr>
                <tr>
                  <td><strong>Modalidade Complementar (E-book IA)</strong></td>
                  <td>Previsão de e-book sobre IA por R$ 4,99 (1 número da sorte, limite 1 por CPF, repasse previsto de R$ 1,00 à loja)</td>
                  <td>Em avaliação técnica e regulatória (sujeito a confirmação)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Relação de Estabelecimentos Participantes</h2>
          <p>
            A lista oficial de lojas aderentes ao Natal Premiado 2026, com seus respectivos planos e links de participação, será disponibilizada após o encerramento da janela de adesão comercial e ativação operacional de cada estabelecimento.
          </p>

          <div class="cta-group" style="margin-top: 2rem;">
            <a href="/natal-premiado/" class="btn btn--primary">Voltar para a página do Natal Premiado <span aria-hidden="true">→</span></a>
            <a href="/contato/?perfil=Lojista&amp;assunto=Natal+Premiado" class="btn btn--outline">Sou lojista e quero solicitar adesão</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function get404Content() {
  const h1 = SITE_CONFIG.routes['/404.html'].h1;
  return `
    <section class="page-hero">
      <div class="container">
        <span class="eyebrow">Erro 404 · Endereço Não Localizado</span>
        <h1>${h1}</h1>
        <p class="lead">
          O link que você acessou pode ter sido movido ou digitado incorretamente. Utilize os atalhos abaixo para continuar navegando pelas páginas oficiais da PromoClicks.
        </p>
        <div class="cta-group">
          <a href="/" class="btn btn--primary">Voltar para a Página Inicial <span aria-hidden="true">→</span></a>
          <a href="/natal-premiado/" class="btn btn--secondary">Ver Natal Premiado 2026</a>
          <a href="/contato/" class="btn btn--outline" style="color: #fff; border-color: rgba(255,255,255,0.3);">Falar com a PromoClicks</a>
        </div>
      </div>
    </section>
  `;
}

export function getBlogHubContent() {
  const h1 = SITE_CONFIG.routes['/blog/'].h1;

  const cardsHtml = BLOG_POSTS.map((post, idx) => {
    const isFeatured = idx === 0;
    const cardClass = isFeatured ? 'blog-card blog-card--featured' : 'blog-card';
    return `
      <article class="${cardClass}">
        <a href="${post.path}" class="blog-card__thumb-link" tabindex="-1" aria-hidden="true">
          <div class="blog-card__thumb">
            <picture>
              <source type="image/webp" srcset="/assets/images/editorial/${post.coverImage.slug}-480w.webp 480w, /assets/images/editorial/${post.coverImage.slug}-800w.webp 800w, /assets/images/editorial/${post.coverImage.slug}-1200w.webp 1200w" sizes="${isFeatured ? '(max-width: 880px) 100vw, 560px' : '(max-width: 820px) 100vw, 560px'}">
              <img src="/assets/images/editorial/${post.coverImage.slug}.jpg" alt="${post.coverImage.alt}" width="1376" height="768" loading="${idx === 0 ? 'eager' : 'lazy'}" ${idx === 0 ? 'fetchpriority="high"' : 'decoding="async"'} class="blog-card__thumb-img">
            </picture>
          </div>
        </a>
        <div class="blog-card__content">
          <div class="blog-card__header">
            <span class="blog-card__category">${post.category}</span>
            <span class="blog-card__meta">${post.readingTime} · Atualizado em ${post.updatedAt.split('-').reverse().join('/')}</span>
          </div>
          <h2 class="blog-card__title">
            <a href="${post.path}">${post.h1}</a>
          </h2>
          <p class="blog-card__excerpt">${post.excerpt}</p>
        </div>
        <div class="blog-card__footer">
          <span class="blog-card__author">Por ${post.author.name}</span>
          <a href="${post.path}" class="blog-card__readmore" aria-label="Ler artigo: ${post.title}">
            Ler artigo completo <span aria-hidden="true">→</span>
          </a>
        </div>
      </article>
    `;
  }).join('');

  return `
    <!-- Hero do Blog -->
    <section class="blog-hero">
      <div class="container">
        <span class="eyebrow">Inteligência &amp; Conteúdo Estratégico</span>
        <h1>${h1}</h1>
        <p class="lead" style="max-width: 840px;">
          Artigos técnicos e análises aprofundadas sobre o mercado de promoções comerciais no Brasil: regulamentação SPA/MF, mecânicas gamificadas no PDV, cálculo de retorno e táticas de aceleração de vendas.
        </p>

        <div class="blog-filter-bar" role="navigation" aria-label="Filtrar artigos do blog">
          <span class="blog-filter-pill is-active">Todos os Artigos</span>
          <a class="blog-filter-pill" href="/blog/como-funciona-regulamentacao-spa-campanhas-promocionais/">Legislação SPA</a>
          <a class="blog-filter-pill" href="/blog/campanhas-coletivas-vs-exclusivas-qual-escolher/">Coletivas vs. Exclusivas</a>
          <a class="blog-filter-pill" href="/blog/gamificacao-no-pdv-aumento-ticket-medio-engajamento/">Gamificação no PDV</a>
          <a class="blog-filter-pill" href="/blog/como-lojistas-lucram-no-natal-premiado/">Natal Premiado</a>
        </div>
      </div>
    </section>

    <!-- Grid de Artigos -->
    <section class="section surface-light">
      <div class="container">
        <div class="blog-grid" role="feed" aria-label="Lista de artigos de inteligência promocional">
          ${cardsHtml}
        </div>

        <div class="article-cta-box" style="margin: 0 auto;">
          <h3>Deseja desenhar uma campanha sob medida para sua marca?</h3>
          <p>
            Nossa equipe analisa a viabilidade técnica, o volume de compras e o enquadramento regulatório perante a SPA/MF.
          </p>
          <a href="/contato/?assunto=Quero+planejar+uma+campanha+promocional" class="btn btn--primary">Conversar com Especialistas da PromoClicks <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>

    <!-- Faixa de Clientes Recomendados -->
    ${renderClientLogosTrustStrip({
      title: 'Marcas e Redes que Confiam na PromoClicks',
      subtitle: 'Conheça as grandes lideranças que atestam nosso método operacional em promoções comerciais de grande escala.',
      light: true
    })}
  `;
}

export function getBlogPostContent(slug) {
  const post = getBlogPostBySlug(slug);
  if (!post) throw new Error(`Artigo de blog não encontrado para o slug: ${slug}`);

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);
  const relatedCardsHtml = relatedPosts.map((rel) => `
    <article class="blog-card" style="padding: 1.5rem 1.25rem;">
      <a href="${rel.path}" class="blog-card__thumb-link" tabindex="-1" aria-hidden="true">
        <div class="blog-card__thumb" style="margin-bottom: 1rem;">
          <picture>
            <source type="image/webp" srcset="/assets/images/editorial/${rel.coverImage.slug}-480w.webp 480w, /assets/images/editorial/${rel.coverImage.slug}-800w.webp 800w" sizes="(max-width: 768px) 100vw, 420px">
            <img src="/assets/images/editorial/${rel.coverImage.slug}.jpg" alt="${rel.coverImage.alt}" width="1376" height="768" loading="lazy" decoding="async" class="blog-card__thumb-img">
          </picture>
        </div>
      </a>
      <div>
        <div class="blog-card__header">
          <span class="blog-card__category">${rel.category}</span>
          <span class="blog-card__meta">${rel.readingTime}</span>
        </div>
        <h3 class="blog-card__title" style="font-size: 1.25rem;">
          <a href="${rel.path}">${rel.h1}</a>
        </h3>
        <p class="blog-card__excerpt" style="font-size: 1rem;">${rel.excerpt}</p>
      </div>
      <div class="blog-card__footer">
        <a href="${rel.path}" class="blog-card__readmore">Ler artigo <span aria-hidden="true">→</span></a>
      </div>
    </article>
  `).join('');

  return `
    <!-- Hero do Artigo -->
    <article class="blog-article">
      <header class="blog-article-hero">
        <div class="container blog-article-hero__header">
          <div class="blog-card__header" style="margin-bottom: 0.5rem;">
            <span class="blog-card__category">${post.category}</span>
            <span class="blog-card__meta">${post.readingTime} · Publicado em ${post.publishedAt.split('-').reverse().join('/')}</span>
          </div>
          <h1>${post.h1}</h1>
          <p class="lead">${post.lead}</p>

          <div class="blog-article-meta">
            <div>
              <span>Publicado por: </span>
              <strong>${post.author.name}</strong>
            </div>
            <div>
              <span>Especialidade: </span>
              <span>${post.author.role}</span>
            </div>
            <div>
              <span>Status: </span>
              <strong>Revisado &amp; Vigente</strong>
            </div>
          </div>

          <!-- Capa Editorial de Alta Resolução -->
          <div class="blog-article__cover">
            <picture>
              <source type="image/webp" srcset="/assets/images/editorial/${post.coverImage.slug}-480w.webp 480w, /assets/images/editorial/${post.coverImage.slug}-800w.webp 800w, /assets/images/editorial/${post.coverImage.slug}-1200w.webp 1200w" sizes="(max-width: 920px) 100vw, 920px">
              <img src="/assets/images/editorial/${post.coverImage.slug}.jpg" alt="${post.coverImage.alt}" width="1376" height="768" loading="eager" fetchpriority="high" class="blog-article__cover-img">
            </picture>
          </div>
        </div>
      </header>

      <!-- Conteúdo do Artigo -->
      <section class="section surface-light">
        <div class="container">
          ${post.contentHtml}
        </div>
      </section>

      <!-- Artigos Relacionados -->
      <section class="section surface-warm" style="border-top: 1px solid var(--pc-border-light);">
        <div class="container" style="max-width: 920px;">
          <div class="section-header" style="margin-bottom: 2rem;">
            <div>
              <span class="eyebrow">Continue Aprendendo</span>
              <h2>Artigos recomendados sobre estratégia promocional</h2>
            </div>
            <a href="/blog/" class="btn btn--secondary btn--sm">Ver todos os artigos <span aria-hidden="true">→</span></a>
          </div>

          <div class="cards-grid cards-grid--2">
            ${relatedCardsHtml}
          </div>
        </div>
      </section>
    </article>

    <!-- Faixa de Clientes Recomendados -->
    ${renderClientLogosTrustStrip({
      title: 'Empresas que Recomendam a PromoClicks',
      subtitle: 'A mesma tecnologia e conformidade jurídica utilizada por grandes referências industriais e do varejo brasileiro.',
      light: true
    })}
  `;
}

export const PAGE_RENDERERS = {
  '/': getHomeContent,
  '/quem-somos/': getQuemSomosContent,
  '/servicos/': getServicosContent,
  '/servicos/campanhas-coletivas/': getServicoColetivasContent,
  '/servicos/campanhas-exclusivas/': getServicoExclusivasContent,
  '/servicos/inteligencia-de-dados/': getServicoDadosContent,
  '/natal-premiado/': getNatalPremiadoContent,
  '/cases/': getCasesContent,
  '/participe/': getParticipeContent,
  '/contato/': getContatoContent,
  '/blog/': getBlogHubContent,
  '/blog/como-funciona-regulamentacao-spa-campanhas-promocionais/': () => getBlogPostContent('como-funciona-regulamentacao-spa-campanhas-promocionais'),
  '/blog/campanhas-coletivas-vs-exclusivas-qual-escolher/': () => getBlogPostContent('campanhas-coletivas-vs-exclusivas-qual-escolher'),
  '/blog/gamificacao-no-pdv-aumento-ticket-medio-engajamento/': () => getBlogPostContent('gamificacao-no-pdv-aumento-ticket-medio-engajamento'),
  '/blog/como-lojistas-lucram-no-natal-premiado/': () => getBlogPostContent('como-lojistas-lucram-no-natal-premiado'),
  '/politica-de-privacidade/': getPoliticaPrivacidadeContent,
  '/termos-de-uso/': getTermosUsoContent,
  '/regulamento/': getRegulamentoContent,
  '/404.html': get404Content
};
