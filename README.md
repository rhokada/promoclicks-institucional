# PromoClicks — Site Institucional Multipáginas

Site institucional multipáginas de alta performance, visualmente sofisticado, otimizado para mecanismos de busca (SEO técnico e semântico) e orientado à conversão comercial da **PromoClicks** — empresa brasileira de inteligência promocional, gamificação e aceleração de vendas.

---

## 1. Visão Geral e Arquitetura

O projeto adota uma **arquitetura estática pré-renderizada (Static Site Generation)** em Node.js puro sem dependências externas de runtime (`node:fs`, `node:path`, `node:http`), gerando 14 rotas HTML completas e independentes, permitindo indexação direta pelos mecanismos de busca (Googlebot), carregamento instantâneo e total conformidade com os princípios da W3C e WCAG 2.2 AA.

### Estrutura de Rotas Implementadas

| Rota | Arquivo Gerado | Finalidade Estratégica e Intenção de Busca | Indexabilidade |
|---|---|---|:---:|
| `/` | `dist/index.html` | Apresentação institucional, proposta de valor, método e direcionamento comercial | `index, follow` |
| `/quem-somos/` | `dist/quem-somos/index.html` | Manifesto, missão, visão, valores, arquétipos (Governante/Mago) e governança | `index, follow` |
| `/servicos/` | `dist/servicos/index.html` | Hub de soluções com matriz comparativa entre modalidades de campanha | `index, follow` |
| `/servicos/campanhas-coletivas/` | `dist/servicos/campanhas-coletivas/index.html` | Solução B2B de promoções sazonais compartilhadas por planos de adesão | `index, follow` |
| `/servicos/campanhas-exclusivas/` | `dist/servicos/campanhas-exclusivas/index.html` | Projetos customizados para marcas, redes varejistas e centros comerciais | `index, follow` |
| `/servicos/inteligencia-de-dados/` | `dist/servicos/inteligencia-de-dados/index.html` | Business intelligence promocional, mensuração de funil e leitura comercial | `index, follow` |
| `/natal-premiado/` | `dist/natal-premiado/index.html` | Campanha coletiva 2026: planos (Bronze, Prata, Ouro, Diamante), cronograma e FAQ | `index, follow` |
| `/cases/` | `dist/cases/index.html` | Evidências analíticas: referências de briefing (Urbano e Ultraprêmio) | `index, follow` |
| `/participe/` | `dist/participe/index.html` | Guias operacionais e abas acessíveis WAI-ARIA (Jornada Lojista vs. Consumidor) | `index, follow` |
| `/contato/` | `dist/contato/index.html` | Formulário comercial inteligente com pré-preenchimento e resumo estruturado | `index, follow` |
| `/politica-de-privacidade/` | `dist/politica-de-privacidade/index.html` | Estrutura de governança e proteção de dados pessoais (Lei nº 13.709/2018 — LGPD) | `noindex, follow` |
| `/termos-de-uso/` | `dist/termos-de-uso/index.html` | Termos de uso, propriedade intelectual e limites sobre dados preliminares | `noindex, follow` |
| `/regulamento/` | `dist/regulamento/index.html` | Quadro de transparência sobre o status de homologação da campanha 2026 | `noindex, follow` |
| `/404.html` | `dist/404.html` | Página de erro personalizada com links de recuperação de navegação | `noindex, nofollow` |

---

## 2. Identidade Visual e Branding

O design foi rigorosamente alinhado ao **Manual de Marca PromoClicks (Documento 1)**:

- **Arquétipos de Marca:** 70% Governante (autoridade, controle, método, segurança regulatória) e 30% Mago (transformação, gamificação, tecnologia e dados).
- **Paleta Cromática Oficial:**
  - Vermelho Ação: `#FF3131` (botões principais, alertas, elementos de destaque)
  - Laranja Promocional: `#FF914D` (estímulo visual, detalhe de transição)
  - Gradiente Oficial: `linear-gradient(108deg, #FF3131 0%, #FF914D 100%)`
  - Grafite Institucional: `#404040`
  - Preto Absoluto: `#000000` (e superfícies escuras `#141414` / `#181818`)
  - Branco Puro: `#FFFFFF`
  - Cinza Secundário: `#B8B8B8` (e bordas suaves `#E8E2DC`)
  - Centelha Dourada Sazonal: `#E5B95C` (distintivos premium do Natal Premiado)
- **Tipografia:**
  - Headlines: *Alegreya Sans* (pesos 700, 800 e 900)
  - Corpo de texto e UI: *Poppins* (pesos 400, 500, 600 e 700)
- **Logotipo Oficial:**
  - Versão para fundos claros: `promoclicks-logo-horizontal-light.webp` e `.png`
  - Versão para fundos escuros: `promoclicks-logo-horizontal-dark.webp` e `.png` (Promo em branco e Clicks no gradiente oficial)
  - Área de proteção de 50% da altura respeitada em todas as aplicações.

---

## 3. SEO Técnico, Semântico e Performance

- **Metadados Únicos por Página:** Cada URL possui `<title>` exclusivo alinhado à intenção de busca, `<meta name="description">` entre 120 e 160 caracteres, URL canônica absoluta e diretiva `robots`.
- **Social Sharing:** Tags completas Open Graph (`og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image`) com imagem card oficial em 1200×630px (`og-promoclicks-share.jpg`), além de Twitter Cards.
- **Hierarquia de Headings:** Exatamente 1 `<h1>` por página, com desdobramento estrito em `<h2>` e `<h3>` sem saltos de nível.
- **Dados Estruturados (Schema.org via JSON-LD):**
  - Home: `Organization` + `WebSite` + `WebPage`
  - Quem somos: `AboutPage` vinculado à `Organization`
  - Serviços: `CollectionPage` + `ItemList` de `Service`
  - Subpáginas de serviço: `Service` individual com `audience` e `areaServed`
  - Natal Premiado: `WebPage` + `FAQPage` (sem classificar prematuramente como Event ou Offer)
  - Cases: `CollectionPage` com referências a `CreativeWork`
  - Contato: `ContactPage` com entidade `Organization`
  - Breadcrumbs em todas as páginas via `BreadcrumbList`.
- **Imagens Responsivas:**
  - Todas as fotos em WebP moderno com fallback em JPG/PNG, servidas via `<picture>` com `srcset` (480w, 800w, 1200w) e `sizes`.
  - Atributos `width` e `height` explícitos em todas as tags `<img>` para evitar CLS (Cumulative Layout Shift).
  - Imagens de topo com `loading="eager"` e `fetchpriority="high"`; imagens inferiores com `loading="lazy"`.
- **Sitemap & Robots:**
  - `dist/sitemap.xml`: gerado dinamicamente contendo exclusivamente as 10 URLs canônicas indexáveis.
  - `dist/robots.txt`: instrução universal apontando para o sitemap canônico.
  - `dist/_redirects`: regras de redirecionamento 301 para trailing-slash e fallback 404 para Netlify/Cloudflare Pages.

---

## 4. Estrutura de Arquivos

```
promoclicks-site/
├── assets/
│   ├── css/
│   │   ├── tokens.css           # Variáveis do Design System (cores do manual, fontes, espaçamento)
│   │   └── main.css             # Folha de estilos completa, responsiva e acessível
│   ├── js/
│   │   ├── analytics.js         # Camada de telemetria CRO segura (window.PromoClicksAnalytics)
│   │   └── main.js              # Menu mobile, abas WAI-ARIA, formulário inteligente e pré-preenchimento
│   └── images/
│       ├── brand/               # Logotipos oficiais transparentes, favicons e cards sociais
│       ├── editorial/           # Fotografias responsivas com srcset (hero, varejo, mobile)
│       └── infographics/        # 5 infográficos vetoriais SVG contextuais de alta resolução
├── dist/                        # Saída compilada pronta para produção (14 páginas HTML + assets)
├── scripts/
│   ├── build.mjs                # Pipeline de geração estática e sitemap.xml
│   ├── server.mjs               # Servidor HTTP local sem dependências
│   └── validate.mjs             # Validador de integridade SEO, semântica, imagens e links
├── src/
│   ├── components/
│   │   └── layoutComponents.mjs # Componentes compartilhados (head, header, breadcrumbs, footer, planos)
│   ├── config/
│   │   └── siteConfig.mjs       # Configuração centralizada de marca, rotas, SEO, planos e FAQs
│   ├── pages/
│   │   └── pagesContent.mjs     # Conteúdo editorial e conversão de todas as páginas
│   └── seo/
│       └── schemaGenerator.mjs  # Gerador modular de JSON-LD Schema.org
├── package.json                 # Scripts npm de build, validação e visualização
└── README.md                    # Documentação do projeto
```

---

## 5. Como Executar e Validar Localmente

O projeto utiliza **Node.js (v18+)** e não necessita de nenhuma instalação prévia via `npm install` (zero runtime dependencies).

### 1. Compilar o site para a pasta `/dist`
```bash
npm run build
# ou: node scripts/build.mjs
```

### 2. Executar a suíte automatizada de validação
```bash
npm run validate
# ou: node scripts/validate.mjs
```
A suíte verifica automaticamente:
- Existência e estrutura dos 14 arquivos HTML.
- Declaração de idioma `pt-BR`.
- Unicidade e tamanho adequado de `<title>` e `<meta name="description">`.
- Canônicas absolutas e diretivas `robots`.
- Presença de exatamente um `<h1>` por página e ausência de saltos na hierarquia (`<h2>`, `<h3>`).
- Sintaxe e regras semânticas dos blocos Schema.org JSON-LD.
- Presença de atributos `alt`, `width` e `height` em todas as imagens.
- Verificação de 100% dos links internos e imagens para evitar links ou imagens quebradas.
- Cobertura de classes CSS entre templates e folha de estilos.
- Paridade estrita entre as URLs indexáveis e as entradas no `sitemap.xml`.

### 3. Iniciar o servidor de pré-visualização local
```bash
npm run preview
# ou: node scripts/server.mjs
```
O servidor estará acessível em: `http://localhost:4173/`

---

## 6. Governança e Transparência Factual (Seção 12)

Em estrito respeito à veracidade e integridade documental:

1. **Natal Premiado 2026:** Todas as menções a valores de planos (Bronze R$ 399, Prata R$ 499, Ouro R$ 699, Diamante R$ 899), limites de números da sorte por CPF (03, 06, 10 e 20), cronograma (adesão até 22/11/2026, participação de 01/12 a 25/12/2026) e prêmio único compartilhado previsto de R$ 1.000 são expressamente identificadas como **condições preliminares previstas no planejamento da campanha**, sujeitas à confirmação no Regulamento Oficial Definitivo e autorização da Secretaria de Prêmios e Apostas (SPA/MF).
2. **Modalidade Complementar de E-book IA:** O modelo alternativo de e-book a R$ 4,99 é explicitado como **em avaliação técnica e regulatória**, sem afirmação de validade jurídica antecipada.
3. **Indicadores Históricos de Cases:** Os dados de *Promoção Urbano Alimentos* (180 mil usuários únicos e 91 mil cadastros em 3 meses) e *Promoção Ultraprêmio* (163 mil acessos e 101 mil clientes cadastrados em 3 meses) trazem notas metodológicas esclarecendo que refletem números informados em briefing da equipe, medem funis distintos (alcance vs. cadastro) e não constituem faturamento direto ou vendas líquidas.
4. **Formulário de Contato:** O formulário prepara um resumo estruturado no navegador para cópia e encaminhamento imediato, com aviso transparente de que o envio direto via servidor requer a integração do endpoint definitivo de produção.
5. **Documentos Legais:** As páginas de Política de Privacidade, Termos de Uso e Regulamento contêm estruturas normativas técnicas completas (LGPD e SPA), com identificação clara de que a homologação societária final deve ser concluída pelo setor jurídico da PromoClicks.

---

## 7. Instruções para Deploy em Produção

A pasta `dist/` gerada pelo script de build é auto-suficiente e pode ser hospedada em qualquer provedor estático moderno:

- **Netlify / Cloudflare Pages:** Basta apontar o diretório de publicação para `dist` e o comando de build para `npm run build`. O arquivo `_redirects` já garante tratamento de trailing-slash e páginas de erro 404.
- **Vercel:** Configure o Output Directory como `dist` e o Build Command como `node scripts/build.mjs`.
- **Nginx:**
  ```nginx
  server {
      listen 80;
      server_name promoclicks.com.br;
      root /caminho/para/promoclicks-site/dist;
      index index.html;

      location / {
          try_files $uri $uri/ =404;
      }

      error_page 404 /404.html;
  }
  ```
