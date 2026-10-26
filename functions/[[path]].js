/**
 * Cloudflare Pages Functions: Middleware de Negociação de Conteúdo para Agentes de IA
 * Intercepta requisições com Accept: text/markdown e serve a versão Markdown correspondente
 * com os cabeçalhos x-markdown-tokens, Content-Signal e Vary: Accept.
 */
export async function onRequest(context) {
  const { request, next, env } = context;
  const accept = request.headers.get('accept') || '';

  if (accept.includes('text/markdown')) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    // Resolve o caminho para arquivo .md
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
      // Continua para fallback
    }

    // Fallback gracioso para llms.txt caso a rota específica não tenha .md
    try {
      const llmsUrl = new URL('/llms.txt', request.url);
      const llmsRes = await env.ASSETS.fetch(new Request(llmsUrl, request));
      if (llmsRes.status === 200) {
        const text = await llmsRes.text();
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
      // Passa para next()
    }
  }

  return next();
}
