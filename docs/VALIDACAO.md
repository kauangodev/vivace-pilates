# Validação da evolução visual da Vivace

14/10/2026 · Chromium/Playwright · Windows · Node.js 24.19.0 · HTTP local.

- Build estático, sintaxe dos módulos e JavaScript e diff sem erros de whitespace.
- Sete larguras: 320, 375, 390, 768, 1024, 1440 e 1920 px, sem overflow.
- Seis fotografias carregadas após percorrer as imagens sob demanda; hero prioritário e proporção preservada.
- Menu por toque, abertura, Escape, seleção e retorno de foco.
- Skip link, um H1, navegação sem JavaScript e 404 real com retorno.
- FAQ e três detalhes dos serviços por teclado e sem JavaScript.
- Destino oficial do WhatsApp, mensagens específicas de Pilates, fisioterapia e LPF; nenhuma mensagem enviada.
- Instagram, endereço e link de localização preservados.
- Galeria: abertura por Enter, troca manual e setas, Tab/Shift+Tab contidos, Escape e retorno ao link da foto.
- Galeria por toque e arquivo local como fallback quando o JavaScript está desativado.
- Área de imagem estável nas seis trocas, verificada também em 320 × 568 px; o diálogo permanece dentro da tela.
- Logo original, favicon, ausência de setas decorativas e âncoras internas válidas.
- Animações com movimento normal; cancelamento e ausência de parallax com movimento reduzido.
- Parallax presente no desktop e ausente no mobile.
- Menor contraste calculado nos 12 pares principais: 4,88:1.
- Ampliação via CSS zoom 200% sem overflow; não substitui teste completo de zoom do navegador.
- Zero erros de JavaScript. Única resposta 404: rota intencional do teste.
- Zero carregamentos automáticos de terceiros no cenário medido.
- Diagnóstico local: LCP 120 ms, CLS 0, aproximadamente 376 KB de recursos. Sem limitação de rede; não são dados de campo nem incluem INP.
- Produção recusada com pendências de conteúdo, domínio e cessão das fotos; a prévia existente permaneceu intacta.

O teste encontrou inicialmente um ciclo incompleto de foco ao pressionar Tab no último controle da galeria. A implementação foi corrigida; a rodada final confirmou Tab e Shift+Tab, Escape e retorno de foco.

Evidências: [JSON](validation.json), [desktop completo](screenshots/desktop-1440.png), [mobile completo](screenshots/mobile-390.png), [hero desktop](screenshots/evolution-desktop-first.png), [hero mobile](screenshots/evolution-mobile-first.png), [galeria](screenshots/evolution-gallery.png).

Pesquisa, origem das fotos e entrega: [relatório completo](EVOLUCAO_VISUAL.md).

Sem auditoria completa WCAG, leitor de tela, Lighthouse ou publicação externa. Lint e TypeScript não estão configurados.

## Ajuste da seção Antes da primeira aula

Os três passos passam a iniciar recolhidos e expandir por clique, Enter, Espaço ou toque. Controles nativos details/summary continuam funcionais sem JavaScript. Verificado em 320, 390, 768, 1240 e 1440 px, sem overflow ou erros de JavaScript; movimento reduzido respeitado. Capturas em screenshots/first-visit-expandable-1240.png e screenshots/first-visit-expandable-390.png.
