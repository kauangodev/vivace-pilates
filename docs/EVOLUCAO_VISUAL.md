# Vivace — evolução visual, fotografia e serviços

Implementado em 14/10/2026 na branch `codex/fotografia-servicos`, a partir de `codex/conteudo-experiencia` (commit `7f97112`). A versão anterior permanece disponível para comparação. Prévia local: http://127.0.0.1:4173/.

## Auditoria e decisões

A base é estática: módulos JavaScript geram HTML no build, CSS local, comportamento nativo e servidor de preview em Node. Não havia páginas individuais de serviços, galeria ou acervo institucional integrado; havia uma foto ilustrativa e uma lista curta dos demais serviços.

Foram preservados logo original, paleta coral/grafite, fontes Archivo e Manrope, contatos confirmados, endereço, âncoras existentes, FAQ, orientações da primeira aula, 404 real e proteção de indexação. A nova navegação acrescenta Serviços. O detalhamento acontece na Home, sem páginas vazias nem migração de framework.

## Direção de arte e seções

- **Hero:** título expressivo ao lado de fotografia real publicada pela Vivace. Proporção original preservada no layout, sem texto sobre o rosto ou identificação inventada da pessoa.
- **Conheça a Vivace:** narrativa ampliada sobre os serviços, cuidado e acolhimento; composição assimétrica com equipamentos e fachada publicados pela marca.
- **Serviços:** três apresentações amplas, alternando texto e imagem. Pilates tem fotografia horizontal; fisioterapia usa um recorte vertical; LPF usa retrato e mais espaço para leitura.
- **Conteúdo progressivo:** cada serviço tem explicação principal, detalhes em `details/summary` e CTA com mensagem específica para o WhatsApp oficial.
- **Galeria:** seis fotografias podem ser ampliadas em diálogo nativo com Anterior, Próxima, setas de teclado, Escape, foco contido e retorno ao elemento de origem.
- **Mobile:** imagens e texto seguem uma sequência vertical; menu por toque, proporções próprias e parallax desativado.

Não foram acrescentados ícones decorativos, gradientes, setas em CTAs, carrossel automático ou bibliotecas de animação.

## Conteúdo e pesquisa

A biografia e duas publicações oficiais foram consultadas novamente no Chromium, sem autenticação. Acesso direto pelo leitor web falhou; a navegação anônima normal permitiu ler os materiais públicos. Foram confirmados os serviços anunciados e utilizados materiais sobre a proposta de cuidado e o endereço.

As descrições distinguem o serviço anunciado pela Vivace da explicação geral da prática. Não afirmam protocolos específicos, credenciais, fundação, nomes de equipe, resultados clínicos, gratuidade ou preços.

Fontes:

- [Instagram oficial](https://www.instagram.com/vivace.igarape/): serviços divulgados.
- [Apresentação institucional](https://www.instagram.com/vivace.igarape/p/DT-GdyyjoPz/): proposta, endereço e fotografia do hero.
- [Publicação sobre Pilates](https://www.instagram.com/vivace.igarape/p/DR0p2cxjHsx/): orientação individual e fotografia dos acessórios.
- [Cadastro da Vivace no Wellhub](https://wellhub.com/pt-br/search/partners/vivace-a-definir/): fachada, orientação profissional e ambiente climatizado.
- [Merrithew](https://www.merrithew.com/blog/post/2023-05-17/what-is-pilates-everything-you-need-to-know-about-pilates): explicação do Pilates.
- [NHS — fisioterapia](https://www.nhs.uk/tests-and-treatments/physiotherapy/) e [NHS Liverpool — saúde pélvica](https://www.uhliverpool.nhs.uk/services/service-finder/pelvic-health-physiotherapy): explicações gerais das áreas e avaliação.
- [Low Pressure Fitness](https://mx.lowpressurefitness.com/es/conoce-el-sistema-lpf/): treinamento postural e respiratório.

O telefone e o Instagram continuam os canais confirmados pelo usuário: (31) 99690-6333 e @vivace.igarape. Os links iniciam a conversa; não enviam mensagens automaticamente nem efetuam reservas.

## Fotografias, origem e permissões

| Uso | Origem | Situação |
| --- | --- | --- |
| Hero, fachada com pessoa | Publicação institucional do Instagram oficial | Material da marca selecionado para esta prévia; confirmar autoria e cessão para produção |
| Acessórios de Pilates | Publicação oficial sobre Pilates | Material da marca selecionado para esta prévia; confirmar cessão para produção |
| Fachada sem pessoas | Cadastro público da Vivace no Wellhub | Confirmar cessão e atualidade; original disponível tem 639 × 359 px |
| Serviço Pilates | [Ahmet Kurt / Pexels](https://www.pexels.com/photo/fit-woman-exercising-on-pilates-reformer-25596679/) | Licença Pexels; imagem ilustrativa |
| Serviço fisioterapia | [Diana Light / Pexels](https://www.pexels.com/photo/physiotherapist-working-with-woman-14254048/) | Licença Pexels; imagem ilustrativa |
| Serviço LPF | [Angela Roma / Pexels](https://www.pexels.com/photo/african-american-sportswoman-stretching-arms-in-studio-7479739/) | Licença Pexels; representa postura e movimento, não uma demonstração de LPF |

A [licença Pexels](https://www.pexels.com/license/) foi consultada. As pessoas dessas imagens não são apresentadas como equipe ou clientes da Vivace. Há legendas e descrições alternativas distinguindo os materiais ilustrativos.

Fotos oficiais foram convertidas para WebP e redimensionadas, sem gerar, retocar, redesenhar pessoas ou apagar os textos originais. São 11 arquivos responsivos para seis fotografias. Todas têm dimensões explícitas; cinco carregam sob demanda e o hero tem prioridade alta. Os ativos ficam locais: nenhum feed ou CDN externo é carregado pelo visitante.

O catálogo `content/photography.mjs` registra origem, licença, proporções e `productionApproved`. Disponibilidade pública não foi tratada como cessão documental. O build de produção recusa publicação enquanto houver fotografia institucional sem liberação. O material completo para autorização agora pode ser revisado nesta prévia.

## Linguagem de movimento

- Título do hero por linha: 650 ms, defasagem de 80 ms.
- Texto de apoio: 600 ms, início coordenado em 120 ms.
- Fotografia principal: entrada de 750 ms e acomodação de escala em 900 ms.
- Revelações institucionais e dos serviços: 480–800 ms, executadas uma vez por elemento.
- Parallax: apenas no hero, desktop com ponteiro preciso, deslocamento máximo de 8 px, sem interceptar scroll.
- Hover fotográfico: escala de 1,025 em 700 ms, apenas com mouse.
- Detalhes e FAQ: entrada do conteúdo em 240 ms, sem animar altura.
- Galeria: abertura em 220 ms e troca manual em 260 ms.

A preferência de movimento reduzido remove transições, cancela animações ativas e zera o parallax. Textos permanecem visíveis antes da execução do JavaScript. A opacidade inicial dos textos foi mantida próxima da final para preservar leitura.

## Arquivos alterados

- `content/site.mjs`, `content/photography.mjs`, `content/research.mjs`.
- `src/render.mjs`, `src/components.mjs`, `src/sections.mjs`, `src/media.mjs`.
- `styles.css`, `app.js`, `scripts/validate.mjs`, `.gitignore`.
- Fotografias em `assets/`; `index.html` e `404.html` gerados.
- README, este relatório, relatório de validação, JSON de resultados e capturas.

Build, servidor local e configuração da Vercel conservam a arquitetura anterior. Fontes e logo não foram substituídas.

## Validação e evidências

Build, verificação de sintaxe, whitespace e testes Chromium/Playwright passaram. Sete larguras, de 320 a 1920 px, sem overflow; imagens carregadas; um H1; contatos, âncoras, menu, FAQ e 404 operacionais.

Foram testados os novos detalhes dos serviços, mensagens contextuais, galeria por teclado/toque, Tab e Shift+Tab, Escape e retorno de foco. Também foram verificados o fallback das fotografias e os detalhes sem JavaScript, o cancelamento do movimento e a ausência de parallax no mobile.

Resultados: [validação](VALIDACAO.md) e [JSON](validation.json).

Capturas: [hero desktop](screenshots/evolution-desktop-first.png), [hero mobile](screenshots/evolution-mobile-first.png), [institucional](screenshots/evolution-about.png), [serviços desktop](screenshots/evolution-services.png), [serviços mobile](screenshots/evolution-mobile-services.png) e [galeria](screenshots/evolution-gallery.png). Os recortes altos de seção omitem temporariamente o header na captura para evitar sua sobreposição; os testes funcionais usam o header normal.

## Limitações e pendências

A entrega está como prévia local sem indexação. Para publicação definitiva, confirmar domínio, aprovação editorial e cessão das três fotografias institucionais, incluindo o retrato do hero. Horários, preços, condições da primeira aula e o serviço truncado na biografia continuam sem publicação.

A fachada do Wellhub tem resolução limitada; a galeria permite ampliar até o arquivo original, sem prometer detalhe inexistente. A logo original de 150 × 150 px foi mantida no tamanho adequado; usos maiores precisam do original de maior resolução ou vetorial.

Não houve deploy, criação de repositório remoto, auditoria completa WCAG, teste com leitor de tela ou medição de desempenho em campo. GitHub/Vercel seguem sem conexão operacional confirmada para publicação.
