/**
 * PromoClicks — Gerador de Padrões e Descoberta para Agentes de IA
 * Em estrita conformidade com:
 * 1. RFC 8288 (Link Response Headers)
 * 2. DNS-AID (draft-mozleywilliams-dnsop-dnsaid & RFC 9460)
 * 3. Content Negotiation (Accept: text/markdown & llmstxt.org)
 * 4. Content Signals (contentsignals.org & draft-romm-aipref-contentsignals)
 * 5. RFC 9727 (API Catalog / Linkset RFC 9264)
 * 6. RFC 8414 / RFC 9728 (OAuth Authorization Server & Protected Resource Metadata)
 * 7. Auth.md (Agent Registration Discovery)
 * 8. SEP-1649 (MCP Server Card)
 * 9. Agent Skills Discovery RFC v0.2.0 (Agent Skills Index & SKILL.md)
 * 10. WebMCP (Declarative Form & Programmatic Model Context Tool Registration)
 * 11. ARD (Agentic Resource Discovery / ai-catalog.json)
 */

import crypto from 'node:crypto';
import { SITE_CONFIG } from '../config/siteConfig.mjs';

export function generateAgentReadyArtifacts() {
  const baseUrl = SITE_CONFIG.baseUrl;

  // =========================================================================
  // 1. SKILL.md: Consultar Planos do Natal Premiado 2026
  // =========================================================================
  const skillNatalMd = `# Skill: Consultar Planos e Condições do Natal Premiado 2026

## Descrição
Permite a agentes de IA consultar as faixas de planos (Bronze, Prata, Ouro e Diamante), preços de adesão e limites de números da sorte por CPF para estabelecimentos comerciais na campanha coletiva Natal Premiado 2026 da PromoClicks.

## Endpoint da API
- URL: ${baseUrl}/api/openapi.json
- Operação: \`GET /api/v1/natal-premiado/planos\`

## Tabela Oficial de Planos de Adesão
1. **Bronze**: R$ 399 (cota única de adesão prevista) — Limite de até 03 números da sorte por CPF na loja participante.
2. **Prata**: R$ 499 (cota única de adesão prevista) — Limite de até 06 números da sorte por CPF na loja participante.
3. **Ouro (Destaque / Recomendado)**: R$ 699 (cota única de adesão prevista) — Limite ampliado de até 10 números da sorte por CPF na loja participante.
4. **Diamante**: R$ 899 (cota única de adesão prevista) — Maior teto previsto de até 20 números da sorte por CPF na loja participante.

## Cronograma e Requisitos
- Período de compras da campanha: 01 a 25 de dezembro de 2026.
- Prazo limite para adesão de lojistas: até 22 de novembro de 2026.
- Prêmio ao consumidor contemplado: R$ 1.000 em dinheiro / certificado em barras de ouro via Loteria Federal.
- Requisitos: CNPJ ativo, razão social e foto da fachada para ativação da página vinculada.
`;

  // =========================================================================
  // 2. SKILL.md: Solicitar Proposta de Campanha Promocional
  // =========================================================================
  const skillPropostaMd = `# Skill: Solicitar Proposta de Campanha Promocional

## Descrição
Orienta agentes de IA a estruturar e submeter briefings de campanhas promocionais (coletivas por adesão ou exclusivas sob medida) para a equipe comercial e regulatória da PromoClicks.

## Endpoint da API
- URL: ${baseUrl}/api/openapi.json
- Operação: \`POST /api/v1/propostas\`

## Campos Obrigatórios do Briefing
- \`nome\`: Nome completo do responsável comercial ou lojista.
- \`email\`: E-mail corporativo válido para recebimento de retorno.
- \`telefone\`: Telefone com DDD ou WhatsApp.
- \`perfil\`: "Lojista", "Marca ou Rede", "Parceiro" ou "Consumidor".
- \`assunto\`: Assunto comercial ("Natal Premiado", "Campanha Coletiva", "Campanha Exclusiva", "Inteligência de Dados").
- \`empresa\`: Nome fantasia ou razão social da empresa (para perfis B2B).
- \`cidade\`: Cidade e UF da operação.
- \`plano\`: Plano de interesse para o Natal Premiado (Bronze, Prata, Ouro, Diamante).
- \`mensagem\`: Descrição do objetivo comercial, número de PDVs ou contexto do negócio.

## Garantias de Conformidade
Todas as campanhas da PromoClicks operam em conformidade estrita com a Lei Federal nº 5.768/71, fiscalizadas pela SPA — Secretaria de Prêmios e Apostas do Ministério da Fazenda.
`;

  const digestNatal = `sha256:${crypto.createHash('sha256').update(skillNatalMd, 'utf8').digest('hex')}`;
  const digestProposta = `sha256:${crypto.createHash('sha256').update(skillPropostaMd, 'utf8').digest('hex')}`;

  // =========================================================================
  // 3. Agent Skills Discovery Index (RFC v0.2.0)
  // =========================================================================
  const agentSkillsIndex = {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
      {
        name: "consultar-planos-natal",
        type: "skill-md",
        description: "Consulta as tabelas de planos, preços e cotas de números da sorte por CPF para lojistas no Natal Premiado 2026.",
        url: `${baseUrl}/.well-known/agent-skills/consultar-planos-natal/SKILL.md`,
        digest: digestNatal
      },
      {
        name: "solicitar-proposta-campanha",
        type: "skill-md",
        description: "Estrutura e envia briefings para adesão de estabelecimentos ou criação de campanhas promocionais exclusivas sob medida.",
        url: `${baseUrl}/.well-known/agent-skills/solicitar-proposta-campanha/SKILL.md`,
        digest: digestProposta
      }
    ]
  };

  // =========================================================================
  // 4. MCP Server Card (SEP-1649)
  // =========================================================================
  const mcpServerCard = {
    serverInfo: {
      name: "PromoClicks MCP Server",
      version: "1.0.0"
    },
    description: "Servidor MCP oficial da PromoClicks para descoberta de ferramentas de marketing promocional, conformidade legal SPA/MF e simulação de planos comerciais.",
    url: `${baseUrl}/mcp`,
    transport: {
      type: "streamable-http"
    },
    capabilities: {
      tools: true,
      resources: true,
      prompts: false
    }
  };

  // =========================================================================
  // 5. API Catalog (RFC 9727 / application/linkset+json)
  // =========================================================================
  const apiCatalog = {
    linkset: [
      {
        anchor: `${baseUrl}/api`,
        "service-desc": [
          {
            href: `${baseUrl}/api/openapi.json`,
            type: "application/json",
            title: "PromoClicks Public OpenAPI Specification"
          }
        ],
        "service-doc": [
          {
            href: `${baseUrl}/auth.md`,
            type: "text/markdown",
            title: "PromoClicks Agent Authentication & API Documentation"
          }
        ],
        status: [
          {
            href: `${baseUrl}/api/health`,
            type: "application/json",
            title: "PromoClicks API Health Status"
          }
        ]
      }
    ]
  };

  // =========================================================================
  // 6. ARD Manifest (Agentic Resource Discovery / ai-catalog.json v1.0)
  // =========================================================================
  const aiCatalog = {
    specVersion: "1.0",
    host: {
      displayName: "PromoClicks",
      identifier: "did:web:promoclicks.com.br"
    },
    entries: [
      {
        identifier: "urn:air:promoclicks.com.br:service:promocoes-comerciais",
        displayName: "PromoClicks Campanhas e Sorteios Comerciais",
        type: "application/json",
        url: `${baseUrl}/api/openapi.json`,
        representativeQueries: [
          "como autorizar sorteio promocional na SPA Ministério da Fazenda",
          "quanto custa participar do Natal Premiado 2026 para lojistas",
          "planejar campanha promocional coletiva ou exclusiva"
        ]
      },
      {
        identifier: "urn:air:promoclicks.com.br:mcp:server-card",
        displayName: "PromoClicks MCP Server Card",
        type: "application/mcp-server-card+json",
        url: `${baseUrl}/.well-known/mcp/server-card.json`,
        representativeQueries: [
          "conectar ao MCP server da PromoClicks",
          "consultar ferramentas de marketing promocional e planos"
        ]
      },
      {
        identifier: "urn:air:promoclicks.com.br:skills:discovery-index",
        displayName: "PromoClicks Agent Skills Index",
        type: "application/json",
        url: `${baseUrl}/.well-known/agent-skills/index.json`,
        representativeQueries: [
          "quais skills de IA estão disponíveis no site da PromoClicks",
          "como agentes autônomos podem solicitar adesão de lojas"
        ]
      }
    ]
  };

  // =========================================================================
  // 7. OAuth Authorization Server Metadata (RFC 8414)
  // =========================================================================
  const oauthAuthServer = {
    issuer: baseUrl,
    authorization_endpoint: `${baseUrl}/oauth/authorize`,
    token_endpoint: `${baseUrl}/oauth/token`,
    jwks_uri: `${baseUrl}/.well-known/jwks.json`,
    response_types_supported: ["token", "code"],
    grant_types_supported: ["client_credentials", "authorization_code"],
    token_endpoint_auth_methods_supported: ["client_secret_post", "client_secret_basic", "private_key_jwt"],
    scopes_supported: ["read:public", "write:leads", "agent:register"],
    agent_auth: {
      skill: `${baseUrl}/.well-known/agent-skills/index.json`,
      register_uri: `${baseUrl}/agent/register`,
      identity_types_supported: ["anonymous", "verified_email"],
      anonymous: {
        credential_types_supported: ["api_key"],
        claim_uri: `${baseUrl}/agent/claim`
      }
    }
  };

  // =========================================================================
  // 8. OpenID Configuration (OIDC Discovery)
  // =========================================================================
  const openidConfiguration = {
    issuer: baseUrl,
    authorization_endpoint: `${baseUrl}/oauth/authorize`,
    token_endpoint: `${baseUrl}/oauth/token`,
    userinfo_endpoint: `${baseUrl}/oauth/userinfo`,
    jwks_uri: `${baseUrl}/.well-known/jwks.json`,
    response_types_supported: ["code", "token", "id_token"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"],
    scopes_supported: ["openid", "profile", "email", "read:public", "write:leads"]
  };

  // =========================================================================
  // 9. OAuth Protected Resource Metadata (RFC 9728)
  // =========================================================================
  const oauthProtectedResource = {
    resource: `${baseUrl}/api`,
    authorization_servers: [baseUrl],
    scopes_supported: ["read:public", "write:leads", "agent:register"],
    bearer_methods_supported: ["header"],
    resource_documentation: `${baseUrl}/auth.md`
  };

  // =========================================================================
  // 10. Auth.md (Agent Registration & Discovery per WorkOS auth.md standard)
  // =========================================================================
  const authMd = `# auth.md - PromoClicks Agent Authentication & Registration

## Visão Geral
Este documento define as diretrizes de autenticação e registro para agentes autônomos de IA que interagem com os serviços e APIs da **PromoClicks** (Razão Social: BIG DATA HELIX TECNOLOGIA LTDA, CNPJ: 26.702.873/0001-30).

## Recursos Protegidos
- **Identificador de Recurso (PRM)**: \`${baseUrl}/api\`
- **Servidores de Autorização**: \`${baseUrl}\`
- **Escopos Disponíveis**:
  - \`read:public\`: Acesso de leitura a informações de planos, cases e diretrizes regulatórias.
  - \`write:leads\`: Envio de briefings e solicitações comerciais de adesão.
  - \`agent:register\`: Registro e emissão de credenciais para agentes de IA parceiros.

## Métodos de Autenticação Suportados
1. **Bearer Header**: Requisições para endpoints autenticados devem incluir o cabeçalho \`Authorization: Bearer <TOKEN>\`.
2. **API Key Pública**: Para consultas abertas e checagens de status, a chave pública de agente pode ser enviada no cabeçalho \`X-Agent-Key\`.

## Descoberta de Metadados
- Metadados de Recursos Protegidos (RFC 9728): \`/.well-known/oauth-protected-resource\`
- Servidor de Autorização OAuth (RFC 8414): \`/.well-known/oauth-authorization-server\`
- OpenID Connect Discovery: \`/.well-known/openid-configuration\`
- MCP Server Card: \`/.well-known/mcp/server-card.json\`
- Agent Skills Discovery: \`/.well-known/agent-skills/index.json\`
- API Catalog (RFC 9727): \`/.well-known/api-catalog\`
- Agentic Resource Discovery (ARD): \`/.well-known/ai-catalog.json\`

## Contato e Suporte de Engenharia
- E-mail técnico: \`contato@promoclicks.com.br\`
- Portal institucional: \`${baseUrl}\`
`;

  // =========================================================================
  // 11. OpenAPI Specification 3.1
  // =========================================================================
  const openApiSpec = {
    openapi: "3.1.0",
    info: {
      title: "PromoClicks Public API",
      version: "1.0.0",
      description: "API pública e interfaces para agentes de IA da PromoClicks (Campanhas Comerciais, Natal Premiado 2026 e Briefings)."
    },
    servers: [
      {
        url: baseUrl,
        description: "Servidor Oficial de Produção"
      }
    ],
    paths: {
      "/api/health": {
        get: {
          summary: "Verificação de integridade e status da API",
          responses: {
            "200": {
              description: "Status operacional da infraestrutura",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: { type: "string", example: "ok" },
                      uptime: { type: "string", example: "100%" },
                      timestamp: { type: "string" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/natal-premiado/planos": {
        get: {
          summary: "Lista os planos de adesão do Natal Premiado 2026",
          responses: {
            "200": {
              description: "Lista completa dos planos para lojistas",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        nome: { type: "string" },
                        preco: { type: "string" },
                        limiteNumerosCPF: { type: "string" },
                        destaque: { type: "boolean" }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/propostas": {
        post: {
          summary: "Submete briefing ou interesse em campanha promocional",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["nome", "email", "telefone", "perfil", "assunto"],
                  properties: {
                    nome: { type: "string" },
                    email: { type: "string", format: "email" },
                    telefone: { type: "string" },
                    perfil: { type: "string", enum: ["Lojista", "Marca ou Rede", "Parceiro", "Consumidor"] },
                    assunto: { type: "string" },
                    empresa: { type: "string" },
                    cidade: { type: "string" },
                    plano: { type: "string" },
                    mensagem: { type: "string" }
                  }
                }
              }
            }
          },
          responses: {
            "200": {
              description: "Briefing registrado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      sucesso: { type: "boolean" },
                      protocolo: { type: "string" },
                      mensagem: { type: "string" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  // =========================================================================
  // 12. Health Status JSON
  // =========================================================================
  const apiHealth = {
    status: "ok",
    service: "PromoClicks Institutional & Agent Discovery",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    environment: "production"
  };

  // =========================================================================
  // 13. llms.txt (llmstxt.org specification)
  // =========================================================================
  const llmsTxt = `# PromoClicks

> Estratégia, tecnologia e operação completa de campanhas promocionais e sorteios comerciais regulamentados perante a SPA/Ministério da Fazenda (Lei Federal nº 5.768/71).

## Documentação e Recursos para Agentes
- [Visão Geral e Serviços](${baseUrl}/servicos/)
- [Campanhas Coletivas](${baseUrl}/servicos/campanhas-coletivas/)
- [Campanhas Exclusivas para Marcas](${baseUrl}/servicos/campanhas-exclusivas/)
- [Inteligência de Dados e Compliance SPA](${baseUrl}/servicos/inteligencia-de-dados/)
- [Natal Premiado 2026 - Guia Completo e Planos](${baseUrl}/natal-premiado/)
- [Jornada de Participação (Lojista e Consumidor)](${baseUrl}/participe/)
- [Cases de Sucesso e Big Numbers](${baseUrl}/cases/)
- [Contato Comercial e Briefing](${baseUrl}/contato/)

## Catálogos e Descoberta de Agentes (AI Ready)
- [API Catalog (RFC 9727)](${baseUrl}/.well-known/api-catalog)
- [Agentic Resource Discovery (ARD)](${baseUrl}/.well-known/ai-catalog.json)
- [MCP Server Card (SEP-1649)](${baseUrl}/.well-known/mcp/server-card.json)
- [Agent Skills Index](${baseUrl}/.well-known/agent-skills/index.json)
- [Auth.md Agent Registration](${baseUrl}/auth.md)
- [OpenAPI Specification](${baseUrl}/api/openapi.json)
- [Documentação Completa (llms-full.txt)](${baseUrl}/llms-full.txt)
`;

  // =========================================================================
  // 14. llms-full.txt
  // =========================================================================
  const llmsFullTxt = `# PromoClicks — Documentação Completa para Modelos de Linguagem e Agentes de IA

Razão Social: BIG DATA HELIX TECNOLOGIA LTDA
CNPJ: 26.702.873/0001-30
Website Oficial: ${baseUrl}
Contato: contato@promoclicks.com.br

---

## 1. Sobre a PromoClicks
A PromoClicks desenvolve soluções completas de marketing promocional, sorteios eletrônicos e campanhas de vendas com respaldo jurídico integral perante a Secretaria de Prêmios e Apostas do Ministério da Fazenda (SPA/MF), sob a Lei Federal nº 5.768/1971.

---

## 2. Modelos de Campanhas Promocionais
### 2.1 Campanhas Coletivas
Promoções colaborativas e integradas entre estabelecimentos comerciais de diversos segmentos. Todos os custos legais, autorizações na SPA, prêmios, taxas e tecnologia são compartilhados, reduzindo o investimento do lojista a uma fração do custo total.

### 2.2 Campanhas Exclusivas
Projetos 100% personalizados para marcas, indústrias, redes de franquias e shopping centers. Inclui arquitetura promocional dedicada, mecânicas inovadoras (compre e concorra, raspadinha digital, cashback condicionado, acúmulo de cupons) e validação antifraude.

### 2.3 Inteligência de Dados Aplicada
Módulo de captura segura e auditada de dados fiscais (QR Code no cupom fiscal), em conformidade estrita com a Lei Geral de Proteção de Dados (LGPD). Gera insights comportamentais de consumo, frequência de recompra e ticket médio.

---

## 3. Natal Premiado 2026 (Campanha Coletiva em Destaque)
- **Período de Vendas e Compras**: 01 a 25 de dezembro de 2026.
- **Prazo Limite de Adesão de Lojistas**: até 22 de novembro de 2026.
- **Prêmio Previsto**: R$ 1.000 em dinheiro / certificado em barras de ouro para o consumidor contemplado via Loteria Federal.
- **Planos de Adesão para Estabelecimentos**:
  - **Bronze**: R$ 399 | Cota única prevista | Até 03 números da sorte por CPF na loja.
  - **Prata**: R$ 499 | Cota única prevista | Até 06 números da sorte por CPF na loja.
  - **Ouro**: R$ 699 | Cota única prevista | Até 10 números da sorte por CPF na loja (Recomendado).
  - **Diamante**: R$ 899 | Cota única prevista | Até 20 números da sorte por CPF na loja (Máximo alcance).

---

## 4. Descoberta e Integração Técnica para Agentes
- Catálogo de APIs (RFC 9727): ${baseUrl}/.well-known/api-catalog
- ARD Manifest: ${baseUrl}/.well-known/ai-catalog.json
- MCP Server Card: ${baseUrl}/.well-known/mcp/server-card.json
- Agent Skills: ${baseUrl}/.well-known/agent-skills/index.json
- Auth.md: ${baseUrl}/auth.md
`;

  // =========================================================================
  // 15. Geração de Markdown para cada rota do site (Content Negotiation)
  // =========================================================================
  const routeMarkdownMap = {};

  // Rota Home (/)
  routeMarkdownMap['index.md'] = `# Promoções Comerciais Regulamentadas | PromoClicks

> A PromoClicks desenvolve campanhas promocionais legalizadas com relação custo/benefício imperdível para empresas de todos os portes incentivarem compras e acelerarem vendas.

## Sobre a PromoClicks
A PromoClicks estrutura e opera campanhas promocionais de ponta a ponta com respaldo jurídico perante a Secretaria de Prêmios e Apostas do Ministério da Fazenda (SPA/MF), sob a Lei Federal nº 5.768/1971.

### Pilares de Atuação
1. **Campanhas Coletivas**: Estabelecimentos comerciais dividem custos legais, taxas, prêmios e tecnologia. O lojista investe menos que o valor do próprio prêmio e atrai fluxo qualificado.
2. **Campanhas Exclusivas**: Campanhas sob medida para indústrias, marcas, franquias e shoppings, com mecânicas como compre-e-concorra, raspadinha e cashback.
3. **Inteligência de Dados**: Validação automática de cupons fiscais via QR Code (NFC-e / SAT / Cupom Fiscal), conformidade LGPD e relatórios de inteligência de vendas.

## Natal Premiado 2026 (Destaque)
A maior campanha coletiva de Natal para o comércio varejista.
- **Período da Ação**: 01 a 25 de dezembro de 2026.
- **Prazo para Adesão de Lojas**: até 22 de novembro de 2026.
- **Planos de Adesão**:
  - Bronze: R$ 399 (cota única) | Até 03 números da sorte por CPF
  - Prata: R$ 499 (cota única) | Até 06 números da sorte por CPF
  - Ouro: R$ 699 (cota única) | Até 10 números da sorte por CPF (Recomendado)
  - Diamante: R$ 899 (cota única) | Até 20 números da sorte por CPF

## Contato Comercial
- Website: ${baseUrl}
- E-mail: contato@promoclicks.com.br | comercial@promoclicks.com.br
- WhatsApp / Comercial: (31) 98409-5406
`;

  // Rota Natal Premiado (/natal-premiado/)
  routeMarkdownMap['natal-premiado/index.md'] = `# Natal Premiado 2026 — PromoClicks

> Participe da maior campanha promocional coletiva de Natal. Seu estabelecimento comercial oferece um super prêmio com investimento acessível e respaldo jurídico total.

## Informações Gerais da Campanha
- **Período de Compras**: 01 a 25 de dezembro de 2026.
- **Data Limite para Adesão de Lojistas**: até 22 de novembro de 2026.
- **Premiação**: R$ 1.000 em dinheiro ou certificado em barras de ouro para o consumidor contemplado pela Loteria Federal.
- **Regulamentação**: Homologação na Secretaria de Prêmios e Apostas (SPA/MF).

## Planos para Lojistas
| Plano | Valor (Cota Única) | Limite Números da Sorte por CPF | Destaque |
|---|---|---|---|
| **Bronze** | R$ 399 | Até 03 números da sorte | Entrada |
| **Prata** | R$ 499 | Até 06 números da sorte | Intermediário |
| **Ouro** | R$ 699 | Até 10 números da sorte | **Recomendado** |
| **Diamante** | R$ 899 | Até 20 números da sorte | Máxima conversão |

## Como Funciona para o Lojista
1. Escolha o plano e preencha os dados do estabelecimento.
2. Receba o kit digital, materiais de divulgação e QR Code exclusivo da sua loja.
3. Seus clientes realizam compras na sua loja durante o período e cadastram a nota fiscal.
4. O sorteio acontece com auditoria e base na Loteria Federal.

Para solicitar adesão: acesse ${baseUrl}/contato/ ou envie e-mail para comercial@promoclicks.com.br.
`;

  // Rota Serviços (/servicos/)
  routeMarkdownMap['servicos/index.md'] = `# Soluções e Serviços em Promoções Comerciais | PromoClicks

A PromoClicks oferece arquiteturas promocionais completas e seguras para marcas, redes e varejistas.

## 1. Campanhas Coletivas
Modelos colaborativos em que diversos lojistas dividem custos de homologação na SPA, premiação e plataforma tecnológica.
- Link: ${baseUrl}/servicos/campanhas-coletivas/

## 2. Campanhas Exclusivas para Marcas e Indústrias
Projetos sob medida criados para redes com dezenas ou centenas de filiais, indústrias que desejam incentivar o sell-out em canais distribuidores e shoppings centers.
- Link: ${baseUrl}/servicos/campanhas-exclusivas/

## 3. Inteligência de Dados Aplicada
Tecnologia para leitura de QR Code fiscal, identificação de produtos promocionados, emissão automática de números da sorte e análises de cesta de compras.
- Link: ${baseUrl}/servicos/inteligencia-de-dados/
`;

  // Rota Campanhas Coletivas (/servicos/campanhas-coletivas/)
  routeMarkdownMap['servicos/campanhas-coletivas/index.md'] = `# Campanhas Coletivas por Adesão | PromoClicks

> Sua loja oferece premiações expressivas dividindo custos legais, operacionais e de tecnologia com centenas de lojistas.

### Vantagens do Modelo Coletivo
- **Custo Rateado**: Cota de adesão menor que o valor individual do prêmio.
- **Burocracia Zero**: A PromoClicks cuida de todas as autorizações perante a SPA/MF.
- **Kit Completo**: Material visual digital pronto para divulgação no ponto de venda e redes sociais.
- **QR Code Exclusivo**: Cada estabelecimento possui identificador único para os clientes concorrerem.
`;

  // Rota Campanhas Exclusivas (/servicos/campanhas-exclusivas/)
  routeMarkdownMap['servicos/campanhas-exclusivas/index.md'] = `# Campanhas Exclusivas sob Medida | PromoClicks

> Projetos promocionais personalizados para indústrias, redes de franquias, grandes marcas e shoppings.

### Mecânicas Disponíveis
- Compre e Concorra (Sorteios com base na Loteria Federal).
- Vale-Brinde Instantâneo (Raspadinha Digital).
- Cashback condicionado a metas de compras.
- Concursos culturais e gamificação de vendas.
- Integração via API com sistemas de PDV e ERP.
`;

  // Rota Inteligência de Dados (/servicos/inteligencia-de-dados/)
  routeMarkdownMap['servicos/inteligencia-de-dados/index.md'] = `# Inteligência de Dados Aplicada ao Varejo | PromoClicks

> Transforme a participação em campanhas promocionais em um ativo estratégico de inteligência de clientes e recompra.

### Recursos Tecnológicos
- Leitura e validação instantânea de cupom fiscal via QR Code NFC-e / SAT.
- Mecanismo antifraude inteligente (checagem de duplicidade e horários).
- Tratamento e armazenamento seguro de dados pessoais conforme a LGPD.
- Relatórios com perfil dos consumidores, ticket médio e produtos com maior giro.
`;

  // Rota Quem Somos (/quem-somos/)
  routeMarkdownMap['quem-somos/index.md'] = `# Quem Somos — PromoClicks

> Estratégia, tecnologia e conformidade jurídica para acelerar vendas no comércio e na indústria.

Razão Social: BIG DATA HELIX TECNOLOGIA LTDA
CNPJ: 26.702.873/0001-30

A PromoClicks nasceu para democratizar o acesso às grandes campanhas promocionais. Combinamos expertise jurídica regulatória (Lei nº 5.768/71 perante a SPA/MF) com infraestrutura tecnológica de alta performance para engajar consumidores e impulsionar o faturamento dos lojistas.
`;

  // Rota Cases (/cases/)
  routeMarkdownMap['cases/index.md'] = `# Cases de Sucesso e Resultados | PromoClicks

Grandes marcas confiam na tecnologia e na operação da PromoClicks para acelerar suas campanhas promocionais:
- L'Oréal
- Sococo
- TCL
- Sicoob
- Drogal
- Grupo Mateus
- Minaspetro
- Instituto Galo

Resultados comprovados em captação de clientes, validação de notas fiscais em segundos e crescimento expressivo de vendas.
`;

  // Rota Participe (/participe/)
  routeMarkdownMap['participe/index.md'] = `# Como Participar | PromoClicks

## Para o Lojista
1. Escolha a campanha ativa (ex.: Natal Premiado 2026).
2. Selecione o plano adequado ao volume da sua loja.
3. Receba os materiais e posicione o QR Code no seu balcão.

## Para o Consumidor
1. Realize suas compras no estabelecimento credenciado.
2. Solicite o cupom fiscal com QR Code.
3. Acesse o portal da campanha, envie a foto do cupom e receba seus números da sorte.
4. Acompanhe a apuração oficial via Loteria Federal.
`;

  // Rota Contato (/contato/)
  routeMarkdownMap['contato/index.md'] = `# Contato e Atendimento Comercial | PromoClicks

Entre em contato com nossos consultores para contratar planos ou solicitar um projeto exclusivo.

- **E-mails**: comercial@promoclicks.com.br | contato@promoclicks.com.br
- **Telefone / WhatsApp**: (31) 98409-5406
- **Endereço**: Belo Horizonte / MG
- **Horário de Atendimento**: Segunda a Sexta, das 09h às 18h
`;

  // Rotas Legais
  routeMarkdownMap['politica-de-privacidade/index.md'] = `# Política de Privacidade | PromoClicks
A PromoClicks respeita a privacidade de seus usuários e cumpre rigorosamente as normas da Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018). Os dados coletados são utilizados exclusivamente para operacionalização e auditoria das campanhas promocionais.`;

  routeMarkdownMap['termos-de-uso/index.md'] = `# Termos de Uso | PromoClicks
Diretrizes e termos para navegação institucional e utilização das plataformas tecnológicas de campanhas promocionais geridas pela PromoClicks.`;

  routeMarkdownMap['regulamento/index.md'] = `# Regulamentação e Compliance | PromoClicks
Todas as operações promocionais da PromoClicks seguem a Lei nº 5.768/1971, o Decreto nº 70.951/1972 e as normas da Secretaria de Prêmios e Apostas do Ministério da Fazenda (SPA/MF).`;

  // Espelhamento para arquivos .md planos (ex: natal-premiado.md)
  routeMarkdownMap['natal-premiado.md'] = routeMarkdownMap['natal-premiado/index.md'];
  routeMarkdownMap['servicos.md'] = routeMarkdownMap['servicos/index.md'];
  routeMarkdownMap['quem-somos.md'] = routeMarkdownMap['quem-somos/index.md'];
  routeMarkdownMap['cases.md'] = routeMarkdownMap['cases/index.md'];
  routeMarkdownMap['participe.md'] = routeMarkdownMap['participe/index.md'];
  routeMarkdownMap['contato.md'] = routeMarkdownMap['contato/index.md'];

  // Compilação do dicionário com todos os arquivos
  const artifacts = {
    // 1. API Catalog (RFC 9727)
    '.well-known/api-catalog': JSON.stringify(apiCatalog, null, 2),

    // 2. ARD Manifest
    '.well-known/ai-catalog.json': JSON.stringify(aiCatalog, null, 2),

    // 3. MCP Server Card (SEP-1649)
    '.well-known/mcp/server-card.json': JSON.stringify(mcpServerCard, null, 2),

    // 4. Agent Skills Index (RFC v0.2.0)
    '.well-known/agent-skills/index.json': JSON.stringify(agentSkillsIndex, null, 2),

    // 5. Skills files
    '.well-known/agent-skills/consultar-planos-natal/SKILL.md': skillNatalMd,
    '.well-known/agent-skills/solicitar-proposta-campanha/SKILL.md': skillPropostaMd,

    // 6. OAuth Authorization Server Metadata (RFC 8414)
    '.well-known/oauth-authorization-server': JSON.stringify(oauthAuthServer, null, 2),

    // 7. OpenID Configuration
    '.well-known/openid-configuration': JSON.stringify(openidConfiguration, null, 2),

    // 8. OAuth Protected Resource Metadata (RFC 9728)
    '.well-known/oauth-protected-resource': JSON.stringify(oauthProtectedResource, null, 2),

    // 9. Auth.md
    'auth.md': authMd,

    // 10. OpenAPI & Health
    'api/openapi.json': JSON.stringify(openApiSpec, null, 2),
    'api/health': JSON.stringify(apiHealth, null, 2),
    'api/health.json': JSON.stringify(apiHealth, null, 2),

    // 11. LLMs.txt
    'llms.txt': llmsTxt,
    'llms-full.txt': llmsFullTxt,

    // 12. Markdown versions of pages
    ...routeMarkdownMap
  };

  return {
    artifacts,
    skillNatalMd,
    skillPropostaMd,
    agentSkillsIndex,
    mcpServerCard,
    apiCatalog,
    aiCatalog,
    oauthAuthServer,
    openidConfiguration,
    oauthProtectedResource,
    authMd,
    openApiSpec,
    apiHealth,
    llmsTxt,
    llmsFullTxt
  };
}
