# Validação da versão enriquecida

14/10/2026 · Chromium/Playwright · Windows · Node.js 24.19.0 · HTTP local.

- Build e sintaxe de módulos passaram; diff sem erros de whitespace.
- Sete larguras: 320, 375, 390, 768, 1024, 1440 e 1920 px, sem overflow.
- Imagens carregadas, um H1 e conteúdo entregue no HTML.
- Menu por toque, abertura, Escape, seleção e foco corretos.
- Skip link, navegação sem JavaScript e 404 real com retorno.
- FAQ details/summary por teclado e sem JavaScript.
- Contato do WhatsApp e mensagem codificada conferidos sem envio real.
- Instagram confirmado pelo usuário; serviços e endereço visíveis; Maps usa o endereço correto.
- Logo original, favicon, ausência de setas decorativas e links internos válidos.
- Animações com movimento normal; nenhuma com movimento reduzido.
- Menor contraste calculado nos pares principais: 4,88:1. Pêssego e texto: 5,21:1.
- Ampliação via CSS zoom 200% sem overflow do corpo; não substitui teste completo de zoom.
- Zero erros de JavaScript. Única resposta 404: rota intencional do teste.
- Zero carregamentos automáticos de terceiros no cenário medido.
- Diagnóstico local: LCP 140 ms e CLS 0; cerca de 152 KB de recursos. Não são resultados de campo e não incluem INP.

Evidências: [JSON](validation.json), [desktop](screenshots/desktop-1440.png), [mobile](screenshots/mobile-390.png).
Pesquisa e entrega: [relatório completo](ENRIQUECIMENTO.md).

Sem auditoria completa WCAG, leitor de tela, Lighthouse ou publicação externa. Lint e TypeScript não estão configurados.
