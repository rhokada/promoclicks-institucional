/**
 * PromoClicks — Configuração Centralizada de Marca, Conteúdo, Rotas e SEO
 * Fontes de autoridade:
 * 1. Manual de Marca PromoClicks (Documento 1)
 * 2. Estrutura Visual e Textualização (Documento 2) + Briefing Natal Premiado 2026
 */

export const SITE_CONFIG = {
  brandName: 'PromoClicks',
  baseUrl: process.env.SITE_URL || 'https://promoclicks.pages.dev',
  campaignPortalUrl: 'https://natalpremiado.promoclicks.com.br',
  locale: 'pt-BR',
  socialInstagram: '@campanha.promoclicks',
  themeColor: '#141414',
  defaultOgImage: '/assets/images/brand/og-promoclicks-share.jpg',

  navigation: [
    { label: 'Início', path: '/' },
    { label: 'Quem somos', path: '/quem-somos/' },
    { label: 'Serviços', path: '/servicos/' },
    { label: 'Natal Premiado', path: '/natal-premiado/' },
    { label: 'Cases', path: '/cases/' },
    { label: 'Participe', path: '/participe/' },
    { label: 'Contato', path: '/contato/' }
  ],

  serviceItems: [
    {
      slug: 'campanhas-coletivas',
      path: '/servicos/campanhas-coletivas/',
      num: '01',
      title: 'Campanhas Coletivas',
      shortTitle: 'Campanhas coletivas',
      summary:
        'Seu estabelecimento participa de uma promoção compartilhada legalizada. Custos legais, impostos, burocracia e premiação são rateados, com investimento menor que o próprio prêmio.',
      ctaLabel: 'Explorar campanhas coletivas',
      featured: true
    },
    {
      slug: 'campanhas-exclusivas',
      path: '/servicos/campanhas-exclusivas/',
      num: '02',
      title: 'Campanhas Exclusivas para Marcas e Indústrias',
      shortTitle: 'Campanhas exclusivas',
      summary:
        'Ações desenhadas sob medida para indústrias, redes de varejo, marcas e centros comerciais, com modelos de participação inovadores e alcance de objetivos estratégicos avançados.',
      ctaLabel: 'Conhecer campanhas exclusivas',
      featured: false
    },
    {
      slug: 'inteligencia-de-dados',
      path: '/servicos/inteligencia-de-dados/',
      num: '03',
      title: 'Inteligência de Dados Aplicada',
      shortTitle: 'Inteligência aplicada',
      summary:
        'Transforme registros de participação em insumos estratégicos. Indicadores de alcance, cadastro, adesão e aprendizados para orientar decisões comerciais e recompra.',
      ctaLabel: 'Ver inteligência de dados',
      featured: false
    }
  ],

  natalPlans: [
    {
      id: 'Bronze',
      name: 'Bronze',
      price: 'R$ 399',
      priceNote: 'Adesão prevista · cota única',
      limitNumbers: '03',
      limitDescription: 'números da sorte: limite por CPF neste estabelecimento',
      featured: false,
      highlights: [
        'Participação na campanha coletiva Natal Premiado 2026',
        'Página vinculada ao estabelecimento no ambiente da campanha',
        'QR Code individual após confirmação e ativação',
        'Limite de até 03 números da sorte por CPF na loja'
      ]
    },
    {
      id: 'Prata',
      name: 'Prata',
      price: 'R$ 499',
      priceNote: 'Adesão prevista · cota única',
      limitNumbers: '06',
      limitDescription: 'números da sorte: limite por CPF neste estabelecimento',
      featured: false,
      highlights: [
        'Participação na campanha coletiva Natal Premiado 2026',
        'Página vinculada ao estabelecimento no ambiente da campanha',
        'QR Code individual após confirmação e ativação',
        'Limite de até 06 números da sorte por CPF na loja'
      ]
    },
    {
      id: 'Ouro',
      name: 'Ouro',
      price: 'R$ 699',
      priceNote: 'Adesão prevista · cota única',
      limitNumbers: '10',
      limitDescription: 'números da sorte: limite por CPF neste estabelecimento',
      featured: true,
      badge: 'Mais Equilibrado',
      highlights: [
        'Participação na campanha coletiva Natal Premiado 2026',
        'Página vinculada ao estabelecimento no ambiente da campanha',
        'QR Code individual após confirmação e ativação',
        'Limite ampliado de até 10 números da sorte por CPF na loja'
      ]
    },
    {
      id: 'Diamante',
      name: 'Diamante',
      price: 'R$ 899',
      priceNote: 'Adesão prevista · cota única',
      limitNumbers: '20',
      limitDescription: 'números da sorte: limite por CPF neste estabelecimento',
      featured: false,
      highlights: [
        'Participação na campanha coletiva Natal Premiado 2026',
        'Página vinculada ao estabelecimento no ambiente da campanha',
        'QR Code individual após confirmação e ativação',
        'Maior teto previsto: até 20 números da sorte por CPF na loja'
      ]
    }
  ],

  natalFaqs: [
    {
      question: 'Como o cliente participa do Natal Premiado?',
      answer:
        'O consumidor realiza uma compra elegível em um estabelecimento participante durante o período previsto (1º a 25 de dezembro de 2026) e acessa o QR Code ou link específico da loja em natalpremiado.promoclicks.com.br. A partir daí, preenche seus dados pessoais e registra o comprovante fiscal conforme as condições estabelecidas no regulamento final.'
    },
    {
      question: 'Os números da sorte são concedidos a cada compra?',
      answer:
        'O limite de números da sorte por CPF varia de acordo com o plano contratado pela loja (03 no Bronze, 06 no Prata, 10 no Ouro e 20 no Diamante). A forma de emissão e a relação exata entre valor de compra e números serão definidas nas regras oficiais. O limite informado na tabela refere-se ao teto por CPF no estabelecimento, e não à quantidade concedida por compra isolada.'
    },
    {
      question: 'Posso acumular compras menores para atingir o valor mínimo?',
      answer:
        'Conforme a estrutura prevista no briefing da campanha, o critério de elegibilidade considera compra única por comprovante fiscal, e eventuais saldos excedentes não se acumulam para compras seguintes. Consulte sempre as condições finais aprovadas do estabelecimento e da campanha.'
    },
    {
      question: 'O consumidor pode participar comprando em mais de uma loja?',
      answer:
        'Sim. A estrutura prevista permite a participação em diferentes estabelecimentos integrantes do Natal Premiado, respeitando os critérios de elegibilidade e os limites por CPF aplicáveis a cada loja participante conforme o regulamento oficial.'
    },
    {
      question: 'Onde encontro o regulamento oficial e a identificação de autorização?',
      answer:
        'O regulamento definitivo e os dados de homologação/autorização (SPA) serão publicados antes da abertura da participação dos consumidores. Até a conclusão dessa validação documental, os valores, datas e descritivos permanecem identificados como condições preliminares.'
    }
  ],

  routes: {
    '/': {
      path: '/',
      outputFile: 'index.html',
      title: 'PromoClicks | Promoções Regulamentadas e Aceleração de Vendas',
      description:
        'A PromoClicks desenvolve campanhas promocionais legalizadas a baixo custo para empresas de todos os portes incentivarem compras e acelerarem vendas.',
      robots: 'index, follow',
      h1: 'Sua próxima campanha começa com uma meta: vender mais.',
      searchIntent: 'Institucional e Comercial B2B (Descoberta de soluções promocionais e adesão ao Natal Premiado)',
      primaryKeyword: 'campanhas promocionais regulamentadas',
      secondaryKeywords: [
        'inteligência promocional',
        'aceleração de vendas no varejo',
        'promoções regulamentadas a baixo custo',
        'Natal Premiado PromoClicks'
      ],
      breadcrumbs: [{ name: 'Início', path: '/' }]
    },
    '/quem-somos/': {
      path: '/quem-somos/',
      outputFile: 'quem-somos/index.html',
      title: 'Quem Somos | PromoClicks: Expertise em Promoções Regulamentadas',
      description:
        'Conheça a PromoClicks: empresa habilitada para operar promoções comerciais completas com segurança jurídica e baixo custo para todos os segmentos.',
      robots: 'index, follow',
      h1: 'Acelerar vendas é o jogo. Estratégia e conformidade são o ponto de partida.',
      searchIntent: 'Informacional e Institucional (Avaliação de autoridade, proposta de valor e método da PromoClicks)',
      primaryKeyword: 'empresa de promoções comerciais legalizadas',
      secondaryKeywords: [
        'quem é a PromoClicks',
        'governança em campanhas promocionais',
        'inteligência comercial para varejo',
        'conformidade SPA promoções'
      ],
      breadcrumbs: [
        { name: 'Início', path: '/' },
        { name: 'Quem somos', path: '/quem-somos/' }
      ]
    },
    '/servicos/': {
      path: '/servicos/',
      outputFile: 'servicos/index.html',
      title: 'Soluções em Campanhas Promocionais B2B | PromoClicks',
      description:
        'Escolha a arquitetura promocional ideal para sua empresa: campanhas coletivas por adesão com custo rateado e campanhas exclusivas sob medida.',
      robots: 'index, follow',
      h1: 'Escolha a campanha pelo que seu negócio precisa alcançar.',
      searchIntent: 'Comercial e Transacional B2B (Comparação de soluções de marketing promocional)',
      primaryKeyword: 'soluções de campanhas promocionais para empresas',
      secondaryKeywords: [
        'campanhas promocionais coletivas',
        'campanhas promocionais exclusivas',
        'promoção regulamentada a baixo custo',
        'inteligência de dados em promoções'
      ],
      breadcrumbs: [
        { name: 'Início', path: '/' },
        { name: 'Serviços', path: '/servicos/' }
      ]
    },
    '/servicos/campanhas-coletivas/': {
      path: '/servicos/campanhas-coletivas/',
      outputFile: 'servicos/campanhas-coletivas/index.html',
      title: 'Campanhas Promocionais Coletivas para Lojas e Varejo | PromoClicks',
      description:
        'Participe de promoções comerciais compartilhadas: prêmio, impostos e burocracia SPA rateados, com investimento menor que o próprio prêmio.',
      robots: 'index, follow',
      h1: 'Campanhas promocionais coletivas: estrutura compartilhada para movimentar sua loja.',
      searchIntent: 'Comercial B2B Específica (Adesão de lojistas e supermercados a campanhas promocionais compartilhadas)',
      primaryKeyword: 'campanha promocional coletiva para varejo',
      secondaryKeywords: [
        'promoção compartilhada para lojistas',
        'sorteio coletivo para comércio',
        'campanha sazonal para supermercados'
      ],
      breadcrumbs: [
        { name: 'Início', path: '/' },
        { name: 'Serviços', path: '/servicos/' },
        { name: 'Campanhas Coletivas', path: '/servicos/campanhas-coletivas/' }
      ]
    },
    '/servicos/campanhas-exclusivas/': {
      path: '/servicos/campanhas-exclusivas/',
      outputFile: 'servicos/campanhas-exclusivas/index.html',
      title: 'Campanhas Promocionais Exclusivas para Marcas e Indústrias | PromoClicks',
      description:
        'Projetos promocionais sob medida para indústrias, marcas e varejo. Modelos inovadores de participação, jornada dedicada e gestão integral SPA.',
      robots: 'index, follow',
      h1: 'Campanhas promocionais exclusivas: mecânica e identidade desenhadas para a sua marca.',
      searchIntent: 'Comercial B2B Enterprise (Contratação de campanha promocional customizada para marca ou rede)',
      primaryKeyword: 'campanhas promocionais exclusivas sob medida',
      secondaryKeywords: [
        'mecânica promocional personalizada',
        'promoções comerciais para indústrias',
        'planejamento de campanha promocional SPA'
      ],
      breadcrumbs: [
        { name: 'Início', path: '/' },
        { name: 'Serviços', path: '/servicos/' },
        { name: 'Campanhas Exclusivas', path: '/servicos/campanhas-exclusivas/' }
      ]
    },
    '/servicos/inteligencia-de-dados/': {
      path: '/servicos/inteligencia-de-dados/',
      outputFile: 'servicos/inteligencia-de-dados/index.html',
      title: 'Inteligência de Dados e Métricas para Campanhas Promocionais | PromoClicks',
      description:
        'Acompanhe a jornada promocional do alcance ao cadastro e à compra vinculada. Transforme dados de participação em decisões comerciais para recompra e retenção.',
      robots: 'index, follow',
      h1: 'Inteligência de dados aplicada: transforme participação promocional em resultados e recompra.',
      searchIntent: 'Comercial e Analítica B2B (Mensuração de resultados promocionais, comportamento de compra e LTV)',
      primaryKeyword: 'inteligência de dados em campanhas promocionais',
      secondaryKeywords: [
        'métricas de campanhas promocionais',
        'indicadores de participação no varejo',
        'análise de jornada promocional'
      ],
      breadcrumbs: [
        { name: 'Início', path: '/' },
        { name: 'Serviços', path: '/servicos/' },
        { name: 'Inteligência de Dados', path: '/servicos/inteligencia-de-dados/' }
      ]
    },
    '/natal-premiado/': {
      path: '/natal-premiado/',
      outputFile: 'natal-premiado/index.html',
      title: 'Natal Premiado 2026 | Planos para Lojistas e Mecânica — PromoClicks',
      description:
        'Inclua sua loja no Natal Premiado 2026: planos previstos Bronze, Prata, Ouro e Diamante a partir de R$ 399, adesão até 22/11 e jornada do consumidor.',
      robots: 'index, follow',
      ogImage: '/assets/images/brand/og-natal-premiado.jpg',
      ogImageAlt: 'Natal Premiado 2026 — Campanha Coletiva de Vendas para Lojistas e Varejo | PromoClicks',
      h1: 'Natal Premiado: mais um motivo para comprar na sua loja.',
      searchIntent: 'Transacional B2B e Informativa B2C (Adesão de estabelecimentos aos planos de Natal e consulta da mecânica)',
      primaryKeyword: 'campanha Natal Premiado 2026 para lojistas',
      secondaryKeywords: [
        'planos Natal Premiado PromoClicks',
        'promoção de Natal para comércio e varejo',
        'como aderir ao Natal Premiado'
      ],
      breadcrumbs: [
        { name: 'Início', path: '/' },
        { name: 'Natal Premiado', path: '/natal-premiado/' }
      ]
    },
    '/cases/': {
      path: '/cases/',
      outputFile: 'cases/index.html',
      title: 'Cases e Big Numbers de Campanhas Promocionais | PromoClicks',
      description:
        'Confira os big numbers e cases reais da PromoClicks em campanhas de 3 meses para marcas como Urbano Alimentos, Ultrafarma e L\'Oréal Paris.',
      robots: 'index, follow',
      h1: 'Não basta chamar atenção. É preciso entender a participação.',
      searchIntent: 'Comercial e Investigativa B2B (Avaliação de evidências, indicadores de alcance/cadastro e método analítico)',
      primaryKeyword: 'cases de campanhas promocionais e indicadores',
      secondaryKeywords: [
        'big numbers PromoClicks',
        'métricas de alcance e cadastro promocional',
        'cases de campanhas no varejo'
      ],
      breadcrumbs: [
        { name: 'Início', path: '/' },
        { name: 'Cases de Sucesso', path: '/cases/' }
      ]
    },
    '/participe/': {
      path: '/participe/',
      outputFile: 'participe/index.html',
      title: 'Como Participar | Jornada do Lojista e do Consumidor — PromoClicks',
      description:
        'Veja o passo a passo completo para incluir seu estabelecimento no Natal Premiado ou para participar como consumidor comprando nas lojas aderentes.',
      robots: 'index, follow',
      h1: 'Sua loja quer aderir? Você quer participar? Comece por aqui.',
      searchIntent: 'Navegacional e Operacional B2B / B2C (Orientação passo a passo de adesão comercial e cadastro de consumidor)',
      primaryKeyword: 'como participar das campanhas PromoClicks',
      secondaryKeywords: [
        'passo a passo lojista Natal Premiado',
        'como cadastrar cupom Natal Premiado',
        'regras de participação PromoClicks'
      ],
      breadcrumbs: [
        { name: 'Início', path: '/' },
        { name: 'Participe', path: '/participe/' }
      ]
    },
    '/contato/': {
      path: '/contato/',
      outputFile: 'contato/index.html',
      title: 'Contato Comercial e Atendimento | Fale com a PromoClicks',
      description:
        'Entre em contato com a equipe da PromoClicks para aderir ao Natal Premiado, solicitar proposta de campanha exclusiva, firmar parcerias ou esclarecer dúvidas.',
      robots: 'index, follow',
      h1: 'Vamos definir o próximo passo da sua campanha.',
      searchIntent: 'Transacional e Atendimento (Solicitação de proposta comercial, adesão a plano ou suporte)',
      primaryKeyword: 'contato comercial PromoClicks',
      secondaryKeywords: [
        'contratar campanha promocional',
        'adesão lojista Natal Premiado',
        'atendimento PromoClicks'
      ],
      breadcrumbs: [
        { name: 'Início', path: '/' },
        { name: 'Contato', path: '/contato/' }
      ]
    },
    '/politica-de-privacidade/': {
      path: '/politica-de-privacidade/',
      outputFile: 'politica-de-privacidade/index.html',
      title: 'Política de Privacidade e Proteção de Dados (LGPD) | PromoClicks',
      description:
        'Estrutura institucional da Política de Privacidade e diretrizes de proteção de dados pessoais (LGPD) aplicáveis ao site e às operações da PromoClicks.',
      robots: 'noindex, follow',
      h1: 'Política de Privacidade e Diretrizes de Proteção de Dados.',
      searchIntent: 'Institucional / Governança Legal (Consulta de diretrizes de privacidade)',
      primaryKeyword: 'política de privacidade PromoClicks',
      secondaryKeywords: ['LGPD PromoClicks', 'proteção de dados pessoais em promoções'],
      breadcrumbs: [
        { name: 'Início', path: '/' },
        { name: 'Política de Privacidade', path: '/politica-de-privacidade/' }
      ]
    },
    '/termos-de-uso/': {
      path: '/termos-de-uso/',
      outputFile: 'termos-de-uso/index.html',
      title: 'Termos de Uso do Site Institucional | PromoClicks',
      description:
        'Estrutura dos Termos de Uso do site da PromoClicks: finalidade do portal, propriedade intelectual da marca e caráter preliminar das informações de campanhas.',
      robots: 'noindex, follow',
      h1: 'Termos e Condições de Uso do Site Institucional.',
      searchIntent: 'Institucional / Governança Legal',
      primaryKeyword: 'termos de uso PromoClicks',
      secondaryKeywords: ['condições de navegação PromoClicks'],
      breadcrumbs: [
        { name: 'Início', path: '/' },
        { name: 'Termos de Uso', path: '/termos-de-uso/' }
      ]
    },
    '/regulamento/': {
      path: '/regulamento/',
      outputFile: 'regulamento/index.html',
      title: 'Regulamento e Condições Oficiais — Natal Premiado 2026 | PromoClicks',
      description:
        'Acompanhe o status de validação documental e o quadro de condições preliminares do regulamento da campanha Natal Premiado 2026.',
      robots: 'noindex, follow',
      h1: 'Regulamento da Campanha e Transparência Documental.',
      searchIntent: 'Operacional e Regulatória (Consulta do status do regulamento da campanha)',
      primaryKeyword: 'regulamento Natal Premiado PromoClicks',
      secondaryKeywords: ['regras oficiais Natal Premiado', 'autorização SPA campanha'],
      breadcrumbs: [
        { name: 'Início', path: '/' },
        { name: 'Natal Premiado', path: '/natal-premiado/' },
        { name: 'Regulamento', path: '/regulamento/' }
      ]
    },
    '/404.html': {
      path: '/404.html',
      outputFile: '404.html',
      title: 'Página Não Encontrada (404) | PromoClicks',
      description:
        'A página solicitada não foi encontrada. Navegue pelas soluções da PromoClicks, conheça o Natal Premiado ou fale com nossa equipe.',
      robots: 'noindex, nofollow',
      h1: 'Página não encontrada. Sua estratégia continua no caminho certo.',
      searchIntent: 'Recuperação de Navegação (Erro 404)',
      primaryKeyword: 'erro 404 PromoClicks',
      secondaryKeywords: [],
      breadcrumbs: [
        { name: 'Início', path: '/' },
        { name: 'Página não encontrada', path: '/404.html' }
      ]
    }
  },

  /**
   * Rotas inativas / sob demanda (ex.: Blog retirado temporariamente a pedido do cliente)
   * Preservadas com todas as configurações para reativação imediata.
   */
  inactiveRoutes: {
    '/blog/': {
      path: '/blog/',
      outputFile: 'blog/index.html',
      title: 'Blog de Inteligência Promocional e Estratégia de Varejo | PromoClicks',
      description:
        'Artigos estratégicos sobre promoções comerciais, conformidade SPA/MF e aceleração de receita para marcas e redes varejistas.',
      robots: 'index, follow',
      h1: 'Inteligência Promocional e Estratégia de Varejo.',
      searchIntent: 'Informativa e Educacional B2B (Estratégias de trade marketing e promoções comerciais)',
      primaryKeyword: 'blog de inteligência promocional para varejo',
      secondaryKeywords: [
        'artigos sobre promoções comerciais',
        'como fazer sorteios no varejo',
        'regulamentação SPA MF promoções'
      ],
      breadcrumbs: [
        { name: 'Início', path: '/' },
        { name: 'Blog', path: '/blog/' }
      ]
    },
    '/blog/como-funciona-regulamentacao-spa-campanhas-promocionais/': {
      path: '/blog/como-funciona-regulamentacao-spa-campanhas-promocionais/',
      outputFile: 'blog/como-funciona-regulamentacao-spa-campanhas-promocionais/index.html',
      title: 'Regulamentação SPA/MF: Promoções no Varejo sem Risco Jurídico | PromoClicks',
      description:
        'Entenda os prazos da SPA/MF, taxas de fiscalização, regras para sorteios na Loteria Federal para proteger sua marca e faturar mais.',
      robots: 'index, follow',
      h1: 'Regulamentação SPA/MF: Como Homologar Promoções Comerciais na Lei nº 5.768/71 sem Risco Jurídico.',
      ogImage: '/assets/images/editorial/blog-regulamentacao-spa-compliance.jpg',
      ogImageAlt: 'Mesa corporativa de governança e auditoria fiscal em São Paulo analisando conformidade jurídica de campanhas comerciais na SPA/MF',
      searchIntent: 'Informativa Regulatória e Compliance B2B (Autorização de promoções na SPA/MF)',
      primaryKeyword: 'autorização SPA MF promoção comercial',
      secondaryKeywords: [
        'Secretaria de Prêmios e Apostas Ministério da Fazenda',
        'como registrar promoção no Ministério da Fazenda',
        'sorteio comercial Lei 5768 71'
      ],
      breadcrumbs: [
        { name: 'Início', path: '/' },
        { name: 'Blog', path: '/blog/' },
        { name: 'Regulamentação SPA/MF', path: '/blog/como-funciona-regulamentacao-spa-campanhas-promocionais/' }
      ]
    },
    '/blog/campanhas-coletivas-vs-exclusivas-qual-escolher/': {
      path: '/blog/campanhas-coletivas-vs-exclusivas-qual-escolher/',
      outputFile: 'blog/campanhas-coletivas-vs-exclusivas-qual-escolher/index.html',
      title: 'Campanhas Coletivas vs. Exclusivas: Qual o Modelo Ideal? | PromoClicks',
      description:
        'Compare custos, retorno sobre investimento, tempo de go-to-market e impacto de marca entre promoções compartilhadas e campanhas proprietárias no varejo.',
      robots: 'index, follow',
      h1: 'Campanhas Coletivas vs. Exclusivas: Qual o Modelo Ideal para a Escala Comercial do seu Varejo?',
      ogImage: '/assets/images/editorial/blog-campanhas-coletivas-vs-exclusivas.jpg',
      ogImageAlt: 'Galeria comercial sofisticada com vitrines iluminadas e consumidores com sacolas de compras em centro de varejo',
      searchIntent: 'Comercial e Comparativa B2B (Escolha entre campanha coletiva ou exclusiva)',
      primaryKeyword: 'campanha promocional coletiva ou exclusiva',
      secondaryKeywords: [
        'vantagens promoção coletiva lojistas',
        'campanha de vendas sob medida varejo',
        'estratégia promocional comparativo b2b'
      ],
      breadcrumbs: [
        { name: 'Início', path: '/' },
        { name: 'Blog', path: '/blog/' },
        { name: 'Coletivas vs. Exclusivas', path: '/blog/campanhas-coletivas-vs-exclusivas-qual-escolher/' }
      ]
    },
    '/blog/gamificacao-no-pdv-aumento-ticket-medio-engajamento/': {
      path: '/blog/gamificacao-no-pdv-aumento-ticket-medio-engajamento/',
      outputFile: 'blog/gamificacao-no-pdv-aumento-ticket-medio-engajamento/index.html',
      title: 'Engajamento no PDV: Transforme Cupons em Dados e Recompra | PromoClicks',
      description:
        'Descubra como dinâmicas no ponto de venda aumentam o ticket médio, engajam o consumidor no PDV e constroem bases seguras.',
      robots: 'index, follow',
      h1: 'Engajamento no Ponto de Venda: Como Converter Cupons Fiscais em Recompra, Ticket Médio e Dados LGPD.',
      ogImage: '/assets/images/editorial/blog-gamificacao-pdv-ticket-medio.jpg',
      ogImageAlt: 'Consumidor no caixa de loja contemporânea utilizando smartphone com interface luminosa para escanear cupom fiscal em terminal de PDV',
      searchIntent: 'Educacional e Tecnológica B2B (Mecânicas de engajamento no ponto de venda)',
      primaryKeyword: 'engajamento ponto de venda varejo',
      secondaryKeywords: [
        'como aumentar ticket médio com promoção',
        'lgpd em campanhas promocionais varejo'
      ],
      breadcrumbs: [
        { name: 'Início', path: '/' },
        { name: 'Blog', path: '/blog/' },
        { name: 'Engajamento no PDV', path: '/blog/gamificacao-no-pdv-aumento-ticket-medio-engajamento/' }
      ]
    },
    '/blog/como-lojistas-lucram-no-natal-premiado/': {
      path: '/blog/como-lojistas-lucram-no-natal-premiado/',
      outputFile: 'blog/como-lojistas-lucram-no-natal-premiado/index.html',
      title: 'Natal Premiado: Estratégias para Lojistas Lucrarem Mais | PromoClicks',
      description:
        'Aprenda como pequenos e médios varejistas utilizam os planos do Natal Premiado para competir com grandes magazines e atrair fluxo qualificado de compras.',
      robots: 'index, follow',
      h1: 'Natal Premiado 2026: Estratégias Táticas para Lojistas Multiplicarem Vendas no Fim de Ano.',
      ogImage: '/assets/images/editorial/blog-natal-premiado-estrategia-lojistas.jpg',
      ogImageAlt: 'Ambiente refinado de boutique brasileira no período natalino com iluminação festiva dourada e caixas de presente elegantes',
      searchIntent: 'Comercial e Tática B2B (Estratégias de vendas de Natal para lojistas)',
      primaryKeyword: 'natal premiado lojistas como funciona',
      secondaryKeywords: [
        'estratégia vendas fim de ano comércio',
        'campanha coletiva natal varejo',
        'planos natal premiado promoclicks'
      ],
      breadcrumbs: [
        { name: 'Início', path: '/' },
        { name: 'Blog', path: '/blog/' },
        { name: 'Estratégias Natal Premiado', path: '/blog/como-lojistas-lucram-no-natal-premiado/' }
      ]
    }
  }
};
