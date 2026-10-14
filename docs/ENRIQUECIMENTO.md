# Conteúdo, pesquisa e experiência da Vivace

Implementação concluída em 14/10/2026 na branch `codex/conteudo-experiencia`. A versão anterior foi preservada no commit `063c213`, na main. Compare com `git diff main...codex/conteudo-experiencia` depois do commit final.

## 1. Melhorias implementadas

A Home passou a conduzir o visitante da apresentação da Vivace à compreensão do Pilates, às perguntas para a primeira aula e ao contato real. O redesign anterior, a logo original, a fotografia panorâmica e os tokens de identidade foram preservados.

WhatsApp e Instagram foram encontrados na pesquisa e confirmados diretamente pelo usuário nesta conversa. O contato abre uma mensagem no número 5531996906333; não envia automaticamente nem confirma agendamento. O endereço foi corroborado em duas publicações do perfil oficial e no cadastro público, permitindo um link de busca no Google Maps, sem mapa incorporado.

## 2. Textos reescritos

- Hero: “Respiração, força e controle em cada movimento. Converse com a Vivace sobre as aulas e encontre o seu ponto de partida.”
- Apresentação: ampliada para explicar a proposta de atendimento e os serviços divulgados, com linguagem própria e sem copiar legendas.
- Conteúdo educativo: explica execução, respiração, controle e consciência corporal.
- Chamada final: “Vamos conversar.”, com consulta de aulas, horários, valores e condições pelo contato oficial.

A escrita permaneceu como proposta editorial para aprovação. Não foram reaproveitadas as promessas de cura, prevenção ou redução de dores presentes em material promocional.

## 3. Novas informações e seções

- Apresentação institucional ampliada, com serviços anunciados no perfil: Pilates, fisioterapia pélvica e ortopédica e LPF.
- Aspectos do atendimento fundamentados em fontes: orientação profissional, atenção individual e ambiente climatizado.
- “Antes da primeira aula”: três orientações para o visitante preparar a conversa e confirmar o horário.
- Dúvidas com respostas sobre alongamento, solo/aparelhos e funcionamento do contato.
- Bloco final com telefone, Instagram, endereço e localização.

Equipe, registros, depoimentos e oferta gratuita foram omitidos por falta de validação suficiente.

## 4. Pesquisa efetivamente realizada

A leitura inicial pelo buscador não conseguiu abrir o Instagram. Uma navegação anônima normal no Chromium permitiu ler a biografia e as legendas de duas publicações, sem autenticação, interação social ou contorno de restrições.

Foram observados nome, segmento, serviços anunciados, tom de acolhimento, endereço e telefone. Não foi feita análise integral de feed, destaques ou comentários. Números sociais e comentários de terceiros não foram incorporados. A expressão “Drenagem para...” ficou truncada; seu complemento não foi inferido.

Wellhub serviu de fonte complementar para características informadas no cadastro. A biografia oficial foi usada para os serviços; as publicações oficiais resolveram a informação incompleta do bairro no diretório. Conteúdo educativo foi conferido na Cleveland Clinic e na Merrithew.

## 5. Fontes principais

- [Instagram oficial](https://www.instagram.com/vivace.igarape/): biografia e serviços.
- [Apresentação institucional da Vivace](https://www.instagram.com/vivace.igarape/p/DT-GdyyjoPz/): proposta e endereço.
- [Publicação sobre Pilates](https://www.instagram.com/vivace.igarape/p/DR0p2cxjHsx/): proposta das aulas, endereço e telefone.
- [Cadastro da Vivace no Wellhub](https://wellhub.com/pt-br/search/partners/vivace-a-definir/): características do atendimento.
- [Cleveland Clinic — Pilates](https://health.clevelandclinic.org/everything-you-want-to-know-about-pilates): conteúdo educativo.
- [Merrithew — What is Pilates?](https://www.merrithew.com/blog/post/2023-05-17/what-is-pilates-everything-you-need-to-know-about-pilates): prática, solo/aparelhos e execução.

Detalhes e pendências em `content/research.mjs`. O registro não é renderizado ou copiado para o build público.

## 6. Animações e interações

Títulos entram por linha em 650 ms, com defasagem de 90 ms. A fotografia tem entrada discreta em 700 ms. A leitura dos três passos é acompanhada por indicação sutil do passo na faixa central da tela e entradas uma vez por elemento. Respostas do FAQ aparecem em 220 ms; os controles usam details/summary nativos.

Menu, hover e marcação da seção ativa foram preservados. Não há biblioteca adicional, scroll interceptado, parallax ou conteúdo oculto aguardando animação. Movimento reduzido cancela as animações e remove transições.

## 7. Mobile e desempenho

Layouts verificados de 320 a 1920 px, com menu por toque, foco, teclado e sem overflow. A seção de primeira aula usa título sticky apenas no desktop; no mobile, segue o fluxo normal. A FAQ é utilizável sem JavaScript.

Fontes e imagens continuam locais, com variantes responsivas. WhatsApp, Instagram, fontes de pesquisa e Maps são apenas links: nenhum recurso de terceiros carrega automaticamente. Não foram adicionados feed, analytics, formulário, cookies ou serviços pagos.

Diagnóstico local no Chromium, sem limitação de rede: LCP observado 140 ms, CLS observado 0, aproximadamente 152 KB de recursos no cenário medido. Esses valores não comprovam métricas de campo, INP ou desempenho móvel real.

## 8. Arquivos alterados

`content/site.mjs`, `content/research.mjs`, `src/sections.mjs`, `src/components.mjs`, `src/render.mjs`, `styles.css`, `app.js`, `scripts/validate.mjs`, HTML gerados, documentação e capturas. Build/preview, proteção de indexação e configuração da Vercel foram preservados.

## 9. Validação

Build, sintaxe, diff e testes de navegador passaram. Evidências em `docs/validation.json`; capturas de desktop e mobile em `docs/screenshots/`.

Verificados: menu, toque, teclado, retorno de foco, skip link, imagens, logo 2x, anchors, 404, movimento reduzido, FAQ com e sem JS, destino e mensagem de WhatsApp, endereço/Maps e ausência de gratuidade não confirmada. Não houve envio de mensagens reais. Não há lint ou TypeScript configurados.

## 10. Limitações e liberação

Continuam pendentes: aprovação institucional do conteúdo final, horários e preços atuais, condições da primeira aula, complementação do serviço truncado, domínio e fotos reais com autorização. A logo original possui 150 × 150 px e foi preservada; aplicações maiores precisam do original vetorial ou PNG de maior resolução.

A foto usada ainda é ilustrativa e não representa a Vivace. O site continua como preview sem indexação; não houve publicação externa. Não foi executada auditoria completa WCAG, leitor de tela ou avaliação de Core Web Vitals em campo.
