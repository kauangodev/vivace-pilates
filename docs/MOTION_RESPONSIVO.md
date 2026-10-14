# Vivace — motion e responsividade

Implementado em 14/10/2026 na branch `codex/motion-responsivo`, a partir de `codex/fotografia-servicos` (3137c59). Prévia local: http://127.0.0.1:4173/.

## 1. Aprimoramentos visuais

A evolução preserva logo, paleta, Archivo/Manrope, textos, seis fotografias, contatos e âncoras. O hero recebeu composições próprias para celular, tablet e desktop. Fotografias institucionais ficaram maiores no celular; os serviços continuam alternando imagem e texto no desktop. A tipografia de leitura passou a 15 px e a navegação recolhida a 17 px.

A comparação em 390 px mostra a fotografia principal começando em aproximadamente 286 px, contra 547 px na versão anterior. A informação e as ações seguem a foto no celular; em tablet e desktop ficam ao lado dela. O CTA permanece no fluxo da página.

## 2. Sistema e animações implementadas

O sistema em `app.js` reúne execução, duração, curva, registro, sequência e cancelamento. As durações vêm dos tokens CSS; não há biblioteca adicional.

| Movimento | Implementação |
| --- | --- |
| Hero | Título por linha, texto e ações coordenados; sequência termina em 880 ms |
| Títulos | 640 ms, deslocamento de 20 px no desktop ou 8 px em telas compactas |
| Conteúdo | Entradas de 520 ms; sequências com defasagem de 64 ms no desktop |
| Serviços | Títulos e conteúdo sequenciais; entradas laterais alternadas no desktop |
| Fotografias | Máscaras de 760 ms no desktop; entrada vertical leve de 560 ms no mobile |
| Hover | Botões em 180 ms; fotografia com escala discreta de 1,018, apenas com mouse |
| Menu | Abertura de 240 ms e saída de 160 ms, com sequência dos links |
| Expansões | Conteúdo em 240 ms e indicador de “+” para “−”; altura continua nativa |
| Galeria | Troca após decodificação, com transição de 240 ms; foto atual permanece enquanto a próxima carrega |
| Parallax | Hero somente; máximo de 8 px, desativado em telas compactas, com galeria aberta ou movimento reduzido |

Os alvos de entrada passaram de 22 na versão anterior para 60 na atual. São elementos preparados para aparecer conforme entram na área visível, sem repetição cansativa. Não são 60 animações simultâneas.

Texto, imagem e controles permanecem disponíveis durante as transições. Preferência de movimento reduzido cancela animações em andamento e desativa transições. Ausência das APIs opcionais mantém o conteúdo e os controles funcionais.

## 3. Componentes responsivos reconfigurados

- Header e navegação: painel recolhido em celular/tablet; menu aberto não desloca o conteúdo.
- Hero: título, foto, descrição e ações reorganizados por dimensão.
- Institucional: fotos deixam de ser miniaturas no celular e ganham composição editorial no tablet.
- Serviços: fluxo vertical compacto; duas colunas e alternância quando há espaço.
- Pilates e primeira aula: escala de leitura, colunas e alinhamentos revisados.
- Passos expansíveis, FAQ e contato: áreas de interação e texto mais confortáveis.
- Rodapé: duas colunas de navegação no celular, três no tablet e distribuição horizontal ampla.
- Galeria: área fotográfica estável, controles de pelo menos 44 px e foco contido.

A inspeção visual detectou uma ordem do mobile sendo herdada pela grade desktop dos serviços. A ordem foi corrigida e a alternância foi conferida em 900, 1024 e 1440 px.

## 4. Breakpoints e técnicas

A base CSS agora parte da composição mobile. Grid, Flexbox, `minmax()`, `clamp()`, `aspect-ratio` e limites de medida definem a adaptação.

| Condição | Adaptação principal |
| --- | --- |
| Menos de 640 px | Hero vertical; fotos institucionais legíveis em coluna |
| A partir de 640 px | Hero com imagem e apresentação lado a lado; galeria institucional e rodapé ganham colunas |
| A partir de 768 px | Título e texto institucional em colunas próprias |
| A partir de 900 px | Serviços, informação e contato em duas colunas |
| A partir de 960 px | Header completo; hero editorial com título e texto à esquerda |
| A partir de 1200 px | Composição institucional ampla, proporções dos serviços e rodapé horizontal |
| 900 px e altura mínima de 720 px | Título da primeira aula pode acompanhar a leitura |

Os testes também verificam transições como 639/640, 767/768, 899/900, 959/960 e 1199/1200 px.

## 5. Melhorias no mobile

A foto principal aparece mais cedo, conserva a proporção e tem largura limitada para controlar altura e transferência. Corpo de texto em 15 px, navegação em 17 px e ações confortáveis substituem a redução excessiva de elementos.

Movimentos têm amplitude menor, sem parallax ou dependência de hover. O painel de navegação respeita a altura disponível, inclusive em 320 × 568 e tablet horizontal de 768 × 500 px. Escape, Tab, seleção de seção e foco foram verificados.

As cinco fotos de maior resolução agora têm variantes de 700, 1000 e 1400 px. A fachada mantém seu original de 639 px. No teste de densidade 2x em 430 px, as três fotos dos serviços selecionaram 1000 px; a de fisioterapia usa cerca de 89 KB, frente a 198 KB da variante de 1400 px.

## 6. Melhorias no desktop

Título e conteúdo têm medida controlada, fotografias amplas e ritmo entre as seções. Serviços alternam imagem e texto, com entradas laterais correspondentes à composição. A navegação mantém fonte de 13 px, sem comprimir links para 10 px.

Máscaras fotográficas e movimento por linha valorizam o conteúdo; a câmera discreta fica restrita ao hero. Nenhum cursor personalizado, rolagem interceptada, seta decorativa ou efeito de blur foi adicionado.

## 7. Desempenho e estabilidade

- Preload responsivo do hero usa o mesmo `srcset/sizes` da imagem, sem download duplicado.
- Fotos secundárias continuam lazy e recebem prioridade baixa.
- Variantes de 1000 px reduzem transferência em telas intermediárias de alta densidade.
- O servidor local negocia Brotli/gzip para HTML, CSS e JavaScript. Arquivos já comprimidos ficam intactos.
- Cache de compressão limitado a 64 entradas, associado a tamanho e modificação do arquivo; a preview mantém `no-store`.
- Scroll usa listener passivo e um frame por atualização do hero visível.
- Observers e listeners são removidos no ciclo de saída; a reinicialização foi verificada com eventos de restauração.
- Galeria evita mostrar resposta antiga após cliques rápidos.
- Zero carregamentos automáticos de terceiros no cenário medido.

Diagnósticos observados no Chromium local:

| Cenário | LCP | CLS | Recursos |
| --- | --- | --- | --- |
| Rede local, sem limitação | 164 ms | 0 | aproximadamente 304 KB |
| CPU 4x, 750 kbps, 120 ms, sem cache | 3,65 s | 0 | aproximadamente 304 KB |

Antes da compressão, o cenário restrito registrou cerca de 4,0 s e 334 KB de recursos. A maior duração de evento observada no cenário final foi 64 ms. É um diagnóstico de poucos eventos, não INP de campo ou percentil 75.

O perfil de rede lenta ainda apresenta LCP acima de 2,5 s. A transferência da fotografia domina esse cenário; desempenho do hosting e de dispositivos reais precisa ser avaliado antes de produção. Nenhum resultado local foi tratado como Core Web Vitals de campo.

## 8. Arquivos modificados

`app.js`, `styles.css`, `src/render.mjs`, `src/components.mjs`, `src/sections.mjs`, `src/media.mjs`, `content/photography.mjs`, `scripts/preview.mjs`, `scripts/validate.mjs`, `scripts/validate-motion.mjs`, cinco variantes WebP, HTML gerados, README, relatórios, resultados JSON e capturas.

A base estática, as rotas, o build da Vercel, as fontes e a logo foram preservados. Não houve reescrita da aplicação em outro framework.

## 9. Testes e evidências

Build, sintaxe e whitespace passaram. O teste de regressão cobre 18 larguras; a nova suíte cobre 24: 320, 375, 390, 430, 540, 600, 639, 640, 700, 767, 768, 820, 899, 900, 959, 960, 1024, 1100, 1199, 1200, 1280, 1440, 1600 e 1920 px.

Verificações: nenhum overflow, imagens carregadas, um H1, teclado, toque, foco, menu em viewport baixa, resize com menu aberto, detalhes nativos, galeria e troca rápida, ausência de repetição, cancelamento real de animações, APIs de animação ausentes, falha no script, navegação sem JavaScript, âncoras, contatos e 404.

Também foram conferidos densidade 2x em 430/1024 px, alternância dos serviços e negociação HTTP Brotli/gzip/identidade/q=0. O menor contraste dos 12 pares principais calculados continua em 4,88:1. Zoom CSS de 200% passou; não substitui teste completo do zoom de todos os navegadores.

Resultados: [regressão](validation.json), [motion](motion-validation.json), [auditoria inicial](responsive-audit-before.json) e [inspeção final](responsive-audit-after.json).

| Comparação de primeira dobra | Antes | Depois |
| --- | --- | --- |
| Celular 390 px | [antes](screenshots/motion-before-390.png) | [depois](screenshots/motion-after-390.png) |
| Tablet 768 px | [antes](screenshots/motion-before-768.png) | [depois](screenshots/motion-after-768.png) |
| Notebook 1024 px | [antes](screenshots/motion-before-1024.png) | [depois](screenshots/motion-after-1024.png) |
| Desktop 1440 px | [antes](screenshots/motion-before-1440.png) | [depois](screenshots/motion-after-1440.png) |

Outros recortes: [institucional mobile](screenshots/motion-institution-390.png), [serviços desktop](screenshots/motion-services-1440.png), [serviços mobile](screenshots/motion-services-390.png), [menu do tablet](screenshots/motion-tablet-menu.png) e [rodapé mobile](screenshots/motion-footer-390.png). Recortes altos de seção omitem temporariamente o header na captura; testes funcionais usam o header normal.

## 10. Limitações e pendências

Validação feita no Chromium, com emulação de viewport e toque. Safari, Firefox, aparelhos físicos e leitor de tela não foram testados; não é uma certificação WCAG completa. Lint e TypeScript não estão configurados.

A prévia continua sem indexação. Domínio, aprovação editorial e cessão para produção das fotos oficiais permanecem pendentes. A logo pequena e a fachada de resolução limitada conservam os limites documentados. As novas variantes são redimensionamentos técnicos; pessoas e originais não foram retocados.

Nenhum repositório remoto ou deploy foi criado nesta etapa. Os valores de desempenho precisam ser reavaliados no ambiente de publicação.
