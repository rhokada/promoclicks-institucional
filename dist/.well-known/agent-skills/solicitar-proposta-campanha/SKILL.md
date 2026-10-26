# Skill: Solicitar Proposta de Campanha Promocional

## Descrição
Orienta agentes de IA a estruturar e submeter briefings de campanhas promocionais (coletivas por adesão ou exclusivas sob medida) para a equipe comercial e regulatória da PromoClicks.

## Endpoint da API
- URL: https://promoclicks.com.br/api/openapi.json
- Operação: `POST /api/v1/propostas`

## Campos Obrigatórios do Briefing
- `nome`: Nome completo do responsável comercial ou lojista.
- `email`: E-mail corporativo válido para recebimento de retorno.
- `telefone`: Telefone com DDD ou WhatsApp.
- `perfil`: "Lojista", "Marca ou Rede", "Parceiro" ou "Consumidor".
- `assunto`: Assunto comercial ("Natal Premiado", "Campanha Coletiva", "Campanha Exclusiva", "Inteligência de Dados").
- `empresa`: Nome fantasia ou razão social da empresa (para perfis B2B).
- `cidade`: Cidade e UF da operação.
- `plano`: Plano de interesse para o Natal Premiado (Bronze, Prata, Ouro, Diamante).
- `mensagem`: Descrição do objetivo comercial, número de PDVs ou contexto do negócio.

## Garantias de Conformidade
Todas as campanhas da PromoClicks operam em conformidade estrita com a Lei Federal nº 5.768/71, fiscalizadas pela SPA — Secretaria de Prêmios e Apostas do Ministério da Fazenda.
