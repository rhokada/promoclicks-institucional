/**
 * Cloudflare Worker com suporte a Content Negotiation para Agentes de IA
 * Responde requisições com Accept: text/markdown retornando a versão Markdown
 * com cabeçalhos x-markdown-tokens, Content-Signal e Vary: Accept.
 */
export default {
  async fetch(request, env) {
    const accept = request.headers.get('accept') || '';

    if (accept.includes('text/markdown')) {
      const url = new URL(request.url);
      let pathname = url.pathname;

      let targetPath = pathname;
      if (targetPath.endsWith('/')) {
        targetPath += 'index.md';
      } else if (!targetPath.includes('.')) {
        targetPath += '/index.md';
      } else if (targetPath.endsWith('.html')) {
        targetPath = targetPath.replace(/\.html$/, '.md');
      }

      try {
        const mdUrl = new URL(targetPath, request.url);
        const mdResponse = await env.ASSETS.fetch(new Request(mdUrl, request));
        if (mdResponse.status === 200) {
          const text = await mdResponse.text();
          const tokenEstimate = Math.ceil(text.length / 4);
          return new Response(text, {
            status: 200,
            headers: {
              'Content-Type': 'text/markdown; charset=utf-8',
              'x-markdown-tokens': String(tokenEstimate),
              'Vary': 'Accept',
              'Content-Signal': 'ai-train=no, search=yes, ai-input=no',
              'Cache-Control': 'public, max-age=0, must-revalidate',
              'Access-Control-Allow-Origin': '*'
            }
          });
        }
      } catch {
        // Fallback
      }

      try {
        const fallbackRes = await env.ASSETS.fetch(new Request(new URL('/llms.txt', request.url), request));
        if (fallbackRes.status === 200) {
          const text = await fallbackRes.text();
          return new Response(text, {
            status: 200,
            headers: {
              'Content-Type': 'text/markdown; charset=utf-8',
              'x-markdown-tokens': String(Math.ceil(text.length / 4)),
              'Vary': 'Accept',
              'Content-Signal': 'ai-train=no, search=yes, ai-input=no',
              'Access-Control-Allow-Origin': '*'
            }
          });
        }
      } catch {
        // Fallback para ASSETS default
      }
    }

    return env.ASSETS.fetch(request);
  }
};
