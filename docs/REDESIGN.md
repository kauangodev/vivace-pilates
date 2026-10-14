# Redesign editorial da Vivace

Implementado em 14/10/2026.

## Mudanças visuais

A primeira dobra passou a combinar um título geográfico claro, CTA único e fotografia panorâmica. A apresentação usa grafite; o conteúdo educativo usa linhas editoriais; contato e footer usam superfície neutra. Archivo nos títulos e Manrope no texto separam função de leitura e expressão.

Retirados: setas decorativas, ícones sem função, etiquetas em todas as seções, bloco flutuante, moldura em arco, cards repetidos, numeração decorativa, slogans e frases de preenchimento. Botões têm texto objetivo, proporções consistentes e hover discreto.

## Movimento

Entrada do título em 550 ms; entrada de três grupos abaixo da primeira dobra em 480 ms, deslocamento de 12 px, uma vez por grupo. Menu abre em 240 ms. Links e botões respondem em 180 ms; imagem tem ampliação sutil de 1,8% no hover de dispositivos com ponteiro.

Animações usam Web Animations API e IntersectionObserver, sem bibliotecas. O conteúdo está sempre visível no estado base. Prefers-reduced-motion impede entradas, remove transições e cancela animações em andamento. Não há parallax, preloader ou interceptação da rolagem.

## Logo

Recuperado o PNG fornecido anteriormente, 150 × 150 px. Original integrado ao header, footer e favicon, sem alterar pixels, desenho ou cores. Fundo neutro harmonizado com o fundo existente; limite de exibição adequado a 2x. Não foi criada falsa versão vetorial nem usada IA para redesenhar a marca.

Para uso maior, falta original vetorial SVG/PDF ou PNG de maior resolução. A baixa resolução não permite restaurar detalhes perdidos com garantia de fidelidade.

## Arquivos principais

- `content/site.mjs`: texto revisado, arquivo da marca e variantes da foto.
- `src/components.mjs`: header, footer, fotografia e contato.
- `src/render.mjs`: Home e 404.
- `styles.css`: tipografia, paleta, composição e estados.
- `app.js`: menu, seção ativa e animações.
- `scripts/validate.mjs`: verificações funcionais e visuais adicionais.
- `assets/`: logo original, fonte Archivo, licenças e imagem maior.
- `index.html` e `404.html`: saídas geradas.

Build, scripts de preview, configuração da Vercel e proteção de indexação foram preservados.

## Resultados

Build e verificações de sintaxe passaram. Layouts entre 320 e 1920 px passaram sem overflow; testes de toque, teclado, foco, 404, links locais, navegação sem JavaScript, logo em 2x, animações e movimento reduzido passaram. Capturas reais foram inspecionadas em desktop e mobile.

Nenhum erro de JavaScript observado. O único HTTP 404 foi a rota inexistente solicitada pelo teste. Menor contraste calculado nos pares textuais da paleta final: 4,88:1.

## Pendências

Contato oficial, conteúdo institucional aprovado, domínio e fotografia da Vivace. Logo original de alta resolução é desejável para aplicações maiores, mas a versão disponível já está integrada. Site continua como prévia, não publicado. Não houve auditoria completa WCAG, leitor de tela, Lighthouse ou métricas de campo.
