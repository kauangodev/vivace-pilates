# Validação do redesign

Data: 14/10/2026. Windows, Node.js 24.19.0, Chromium do Playwright e servidor HTTP local. Rede móvel não simulada.

## Verificado

- Build estático e sintaxe de todos os módulos JavaScript.
- Home em HTTP 200 e conteúdo no HTML entregue.
- 320, 375, 390, 768, 1024, 1440 e 1920 px: sem overflow horizontal.
- Um H1 e imagens carregadas; capturas reais de desktop e mobile inspecionadas.
- Menu: abertura, aria-expanded, Escape, retorno de foco e seleção de seção.
- Emulação mobile com toque e densidade 2x: navegação até Contato e fechamento do menu.
- Skip link com foco no main; navegação sem JavaScript.
- 404 com status correto, título específico e retorno à Home.
- Ausência de setas e ícones decorativos, etiquetas e antigos blocos flutuantes.
- Destinos internos válidos, sem href vazio ou # provisório.
- Logo original carregada, exibida a 72 px com fonte de 150 px, e favicon da marca.
- Entrada do título com movimento normal; ausência de animação e transição com movimento reduzido.
- Contraste calculado: coral escuro sobre neutro 4,88:1; texto secundário sobre neutro 5,81:1; neutro sobre grafite 13,57:1. Demais pares em validation.json.
- Ampliação simulada via CSS zoom 200%: sem overflow do corpo.
- Zero erros JavaScript. A resposta 404 registrada é a rota intencional do teste.

## Limites

Não houve auditoria completa WCAG, leitor de tela, Lighthouse, teste de todos os navegadores ou medição de Core Web Vitals em campo. CSS zoom não substitui uma auditoria completa de ampliação de navegador.

Lint e TypeScript não estão configurados. Não há formulário ou canal real para testar mensagem ou agendamento. Não houve deploy externo. A foto é ilustrativa; o PNG oficial é pequeno e foi preservado sem reconstrução de detalhes.

## Evidências

- [Resultados](validation.json)
- [Desktop 1440 px](screenshots/desktop-1440.png)
- [Mobile 390 px](screenshots/mobile-390.png)
