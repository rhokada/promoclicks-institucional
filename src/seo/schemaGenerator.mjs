/**
 * PromoClicks — Gerador Modular de Dados Estruturados Schema.org (JSON-LD)
 *
 * Diretrizes de Integridade Semântica (Seção 7 e Seção 12):
 * - Nenhuma avaliação (AggregateRating/Review), preço não confirmado como Offer definitiva
 *   ou evento não homologado (Event) é emitido.
 * - Cada rota recebe exatamente os tipos compatíveis com o conteúdo visível na página.
 */

import { SITE_CONFIG } from '../config/siteConfig.mjs';
import { BLOG_POSTS, CLIENT_LOGOS } from '../config/blogConfig.mjs';

export function getOrganizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.baseUrl}/#organization`,
    name: SITE_CONFIG.brandName,
    legalName: 'BIG DATA HELIX TECNOLOGIA LTDA',
    taxID: '26.702.873/0001-30',
    url: `${SITE_CONFIG.baseUrl}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_CONFIG.baseUrl}/assets/images/brand/promoclicks-logo-horizontal-light.png`,
      width: 541,
      height: 173
    },
    description:
      'Empresa capacitada e habilitada para realizar promoções comerciais legalizadas completas a baixo custo para empresas de diversos portes e segmentos.',
    knowsAbout: [
      'Marketing Promocional',
      'Promoções Comerciais Regulamentadas a Baixo Custo',
      'Regulamentação SPA/MF e Lei 5.768/71',
      'Campanhas Promocionais Coletivas e Exclusivas',
      'Sorteios Eletrônicos pela Loteria Federal',
      'Auditoria de Cupons Fiscais e Compliance'
    ],
    brand: CLIENT_LOGOS.map((c) => ({
      '@type': 'Brand',
      name: c.name
    })),
    sameAs: ['https://www.instagram.com/campanha.promoclicks/']
  };
}

export function getWebSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.baseUrl}/#website`,
    url: `${SITE_CONFIG.baseUrl}/`,
    name: SITE_CONFIG.brandName,
    inLanguage: SITE_CONFIG.locale,
    publisher: {
      '@id': `${SITE_CONFIG.baseUrl}/#organization`
    }
  };
}

export function getBreadcrumbSchema(breadcrumbs) {
  if (!breadcrumbs || breadcrumbs.length <= 1) return null;
  return {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${SITE_CONFIG.baseUrl}${item.path}`
    }))
  };
}

export function generateJsonLdForRoute(routeKey) {
  const route = SITE_CONFIG.routes[routeKey];
  if (!route) return '';

  const canonicalUrl = `${SITE_CONFIG.baseUrl}${route.path}`;
  const graph = [];

  if (routeKey === '/') {
    graph.push(getOrganizationSchema());
    graph.push(getWebSiteSchema());
    graph.push({
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: route.title,
      description: route.description,
      inLanguage: SITE_CONFIG.locale,
      isPartOf: { '@id': `${SITE_CONFIG.baseUrl}/#website` },
      about: { '@id': `${SITE_CONFIG.baseUrl}/#organization` }
    });
  } else if (routeKey === '/quem-somos/') {
    graph.push(getOrganizationSchema());
    graph.push({
      '@type': 'AboutPage',
      '@id': `${canonicalUrl}#aboutpage`,
      url: canonicalUrl,
      name: route.title,
      description: route.description,
      inLanguage: SITE_CONFIG.locale,
      mainEntity: { '@id': `${SITE_CONFIG.baseUrl}/#organization` }
    });
  } else if (routeKey === '/servicos/') {
    graph.push(getOrganizationSchema());
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${canonicalUrl}#collectionpage`,
      url: canonicalUrl,
      name: route.title,
      description: route.description,
      inLanguage: SITE_CONFIG.locale,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: SITE_CONFIG.serviceItems.map((srv, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          item: {
            '@type': 'Service',
            name: srv.title,
            description: srv.summary,
            url: `${SITE_CONFIG.baseUrl}${srv.path}`,
            provider: { '@id': `${SITE_CONFIG.baseUrl}/#organization` },
            areaServed: { '@type': 'Country', name: 'Brasil' }
          }
        }))
      }
    });
  } else if (routeKey.startsWith('/servicos/')) {
    const srv = SITE_CONFIG.serviceItems.find((s) => s.path === routeKey);
    graph.push(getOrganizationSchema());
    if (srv) {
      graph.push({
        '@type': 'Service',
        '@id': `${canonicalUrl}#service`,
        name: srv.title,
        description: route.description,
        url: canonicalUrl,
        provider: { '@id': `${SITE_CONFIG.baseUrl}/#organization` },
        serviceType: srv.title,
        areaServed: { '@type': 'Country', name: 'Brasil' },
        audience: {
          '@type': 'BusinessAudience',
          audienceType: 'Lojistas, estabelecimentos comerciais, redes varejistas e gestores de marketing'
        }
      });
    }
  } else if (routeKey === '/natal-premiado/') {
    // Natal Premiado: WebPage + FAQPage (sem classificar automaticamente como Event ou Offer definitivo)
    graph.push(getOrganizationSchema());
    graph.push({
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: route.title,
      description: route.description,
      inLanguage: SITE_CONFIG.locale,
      publisher: { '@id': `${SITE_CONFIG.baseUrl}/#organization` }
    });
    graph.push({
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}#faqpage`,
      mainEntity: SITE_CONFIG.natalFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  } else if (routeKey === '/cases/') {
    graph.push(getOrganizationSchema());
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${canonicalUrl}#collectionpage`,
      url: canonicalUrl,
      name: route.title,
      description: route.description,
      inLanguage: SITE_CONFIG.locale,
      about: { '@id': `${SITE_CONFIG.baseUrl}/#organization` },
      hasPart: [
        {
          '@type': 'CreativeWork',
          name: 'Referência de Briefing: Promoção Urbano Alimentos (Janela de 3 meses)',
          description:
            'Registro histórico informado em briefing: 180 mil usuários únicos no site e 91 mil cadastros em três meses.'
        },
        {
          '@type': 'CreativeWork',
          name: 'Referência de Briefing: Promoção Ultraprêmio (Janela de 3 meses)',
          description:
            'Registro histórico informado em briefing: 163 mil acessos e 101 mil clientes cadastrados em três meses.'
        }
      ]
    });
  } else if (routeKey === '/participe/') {
    graph.push(getOrganizationSchema());
    graph.push({
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: route.title,
      description: route.description,
      inLanguage: SITE_CONFIG.locale,
      publisher: { '@id': `${SITE_CONFIG.baseUrl}/#organization` }
    });
  } else if (routeKey === '/contato/') {
    graph.push(getOrganizationSchema());
    graph.push({
      '@type': 'ContactPage',
      '@id': `${canonicalUrl}#contactpage`,
      url: canonicalUrl,
      name: route.title,
      description: route.description,
      inLanguage: SITE_CONFIG.locale,
      mainEntity: { '@id': `${SITE_CONFIG.baseUrl}/#organization` }
    });
  } else if (routeKey === '/blog/') {
    graph.push(getOrganizationSchema());
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${canonicalUrl}#collectionpage`,
      url: canonicalUrl,
      name: route.title,
      description: route.description,
      inLanguage: SITE_CONFIG.locale,
      about: { '@id': `${SITE_CONFIG.baseUrl}/#organization` },
      mainEntity: {
        '@type': 'Blog',
        '@id': `${canonicalUrl}#blog`,
        name: 'Blog de Inteligência Promocional PromoClicks',
        description: route.description,
        blogPost: BLOG_POSTS.map((post) => ({
          '@type': 'BlogPosting',
          headline: post.h1 || post.title,
          url: `${SITE_CONFIG.baseUrl}${post.path}`,
          description: post.excerpt,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          articleSection: post.category,
          image: post.coverImage ? `${SITE_CONFIG.baseUrl}${post.coverImage.src}` : `${SITE_CONFIG.baseUrl}${SITE_CONFIG.defaultOgImage}`
        }))
      }
    });
  } else if (routeKey.startsWith('/blog/')) {
    const post = BLOG_POSTS.find((p) => p.path === routeKey);
    graph.push(getOrganizationSchema());
    if (post) {
      const coverUrl = post.coverImage
        ? `${SITE_CONFIG.baseUrl}${post.coverImage.src}`
        : `${SITE_CONFIG.baseUrl}${SITE_CONFIG.defaultOgImage}`;
      const coverWidth = post.coverImage?.width || 1200;
      const coverHeight = post.coverImage?.height || 630;
      graph.push({
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}#article`,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl
        },
        headline: post.h1 || post.title,
        name: post.title,
        description: post.description,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        inLanguage: SITE_CONFIG.locale,
        articleSection: post.category,
        keywords: post.keywords.join(', '),
        author: {
          '@type': 'Organization',
          '@id': `${SITE_CONFIG.baseUrl}/#organization`,
          name: post.author.name
        },
        publisher: {
          '@id': `${SITE_CONFIG.baseUrl}/#organization`
        },
        image: {
          '@type': 'ImageObject',
          url: coverUrl,
          width: coverWidth,
          height: coverHeight
        }
      });
    }
  } else {
    graph.push({
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: route.title,
      description: route.description,
      inLanguage: SITE_CONFIG.locale
    });
  }

  const breadcrumbSchema = getBreadcrumbSchema(route.breadcrumbs);
  if (breadcrumbSchema) {
    graph.push(breadcrumbSchema);
  }

  const payload = {
    '@context': 'https://schema.org',
    '@graph': graph
  };

  return `<script type="application/ld+json">${JSON.stringify(payload)}</script>`;
}
