# Validação atual da Vivace

14/10/2026 · Chromium/Playwright · Node.js 24.19.0 · Windows.

- Build, sintaxe e whitespace passaram.
- Regressão em 18 larguras; refinamento de motion em 24, com larguras intermediárias.
- Nenhum overflow, inclusive com os três passos expandidos.
- Um H1, imagens carregadas, logo original e links internos válidos.
- Menu em celular/tablet, viewport baixa, Escape, foco e resize para desktop.
- Galeria por teclado/toque, foco contido, retorno e cliques rápidos.
- FAQ, serviços e passos expansíveis funcionam sem JavaScript.
- Sem Web Animations e IntersectionObserver: controles e conteúdo permanecem utilizáveis.
- Falha no script: navegação entregue como fallback.
- Entrada do hero, cenas sem repetição e animações canceladas ao mudar a preferência.
- Variantes intermediárias selecionadas em densidade 2x.
- Serviços alternados no desktop.
- Menor contraste dos 12 pares principais: 4,88:1.
- Contatos oficiais e mapa preservados, sem envio de mensagens.
- 404 real e retorno à Home.
- Brotli, gzip, identidade, q=0, noindex e integridade do HTML verificados.
- Zero erros de JavaScript nas sessões normais; zero cargas automáticas externas no perfil.
- Diagnóstico local sem limitação: LCP 164 ms, CLS 0.
- Perfil CPU 4x/rede 750 kbps/120 ms: LCP aproximadamente 3,65 s, CLS 0 e evento máximo observado de 64 ms.
- Métricas sintéticas; não são Core Web Vitals de campo nem INP p75.

Evidências em [regressão](validation.json) e [motion](motion-validation.json). Relatório de entrega e capturas em [MOTION_RESPONSIVO.md](MOTION_RESPONSIVO.md).

Não foram executados Safari/Firefox, testes em aparelhos físicos, leitor de tela ou certificação WCAG. Lint/TypeScript não estão configurados. A produção continua pendente.
