# auth.md - PromoClicks Agent Authentication & Registration

## Visão Geral
Este documento define as diretrizes de autenticação e registro para agentes autônomos de IA que interagem com os serviços e APIs da **PromoClicks** (Razão Social: BIG DATA HELIX TECNOLOGIA LTDA, CNPJ: 26.702.873/0001-30).

## Recursos Protegidos
- **Identificador de Recurso (PRM)**: `https://promoclicks.com.br/api`
- **Servidores de Autorização**: `https://promoclicks.com.br`
- **Escopos Disponíveis**:
  - `read:public`: Acesso de leitura a informações de planos, cases e diretrizes regulatórias.
  - `write:leads`: Envio de briefings e solicitações comerciais de adesão.
  - `agent:register`: Registro e emissão de credenciais para agentes de IA parceiros.

## Métodos de Autenticação Suportados
1. **Bearer Header**: Requisições para endpoints autenticados devem incluir o cabeçalho `Authorization: Bearer <TOKEN>`.
2. **API Key Pública**: Para consultas abertas e checagens de status, a chave pública de agente pode ser enviada no cabeçalho `X-Agent-Key`.

## Descoberta de Metadados
- Metadados de Recursos Protegidos (RFC 9728): `/.well-known/oauth-protected-resource`
- Servidor de Autorização OAuth (RFC 8414): `/.well-known/oauth-authorization-server`
- OpenID Connect Discovery: `/.well-known/openid-configuration`
- MCP Server Card: `/.well-known/mcp/server-card.json`
- Agent Skills Discovery: `/.well-known/agent-skills/index.json`
- API Catalog (RFC 9727): `/.well-known/api-catalog`
- Agentic Resource Discovery (ARD): `/.well-known/ai-catalog.json`

## Contato e Suporte de Engenharia
- E-mail técnico: `contato@promoclicks.com.br`
- Portal institucional: `https://promoclicks.com.br`
