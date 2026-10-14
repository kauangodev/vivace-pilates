# Vivace Pilates

Prévia institucional com direção editorial, logo original, títulos em Archivo, texto em Manrope e animações nativas. HTML gerado no build; conteúdo e navegação essenciais continuam disponíveis sem JavaScript.

## Execução e edição

- `node scripts/preview.mjs`: gera o build e serve http://127.0.0.1:4173.
- `node scripts/build.mjs`: gera `dist/`, `index.html` e `404.html`.
- Após editar, rode o build e recarregue a preview. Não há hot reload.
- `npm run dev` e `npm run build` são equivalentes quando npm estiver disponível.
- Node.js 20+ recomendado. Sem dependências de aplicação.
- Edite os dados em `content/site.mjs`, componentes em `src/components.mjs` e `src/sections.mjs`, composição e metadados em `src/render.mjs`, tokens em `styles.css` e comportamento em `app.js`.
- Não edite os HTML gerados: o build os sobrescreve.
- `heroLines` define as quebras editoriais do título; mantenha o significado alinhado a `heroTitle`.

## Logo e identidade

O PNG original fornecido anteriormente foi recuperado de um anexo temporário e está em `assets/vivace-logo-original.png`. Resolução: 150 × 150 px, RGB, fundo opaco. O arquivo foi copiado sem alteração; não houve redesenho, vetorização aproximada, interpolação ou SVG contendo raster.

Exibição: 72 CSS px no desktop e 64 CSS px no mobile, suportando densidade 2x com a resolução existente. O mesmo PNG serve como favicon. Fundo neutro #F7F7F7 foi selecionado a partir do fundo predominante do arquivo; coral permanece próximo à referência do briefing. O header e o footer substituem a identificação textual provisória pela marca recebida.

Limitação: o PNG pequeno possui artefatos e não permite recuperar detalhes perdidos com fidelidade garantida. Para usos maiores, fornecer o **original da Vivace em SVG/PDF vetorial ou PNG de maior resolução**, mantendo desenho e proporções. Não são anunciadas nitidez reconstruída ou transparência inexistente.

## Conteúdo

Nome e cidade têm como fonte os briefings do usuário. Textos atuais são propostas editoriais. WhatsApp e Instagram foram confirmados pelo usuário. Serviços e endereço têm fontes oficiais registradas. Horários, valores, condições da primeira aula, perfis profissionais e depoimentos continuam pendentes. As informações institucionais derivadas da pesquisa ainda precisam de aprovação editorial final.

`null` e listas vazias significam dados ausentes; seções condicionais ficam omitidas. Não adicione placeholders públicos. `contact.whatsapp` deve conter apenas o número internacional confirmado, sem sinais ou espaços. `whatsappLink` centraliza a mensagem; os CTAs de contato surgem no build apenas com canal real.

## Ativos

Fotografia de Ahmet Kurt: [origem](https://www.pexels.com/photo/pilates-reformers-in-bright-room-25596894/) · [Licença Pexels](https://www.pexels.com/license/). É uma referência ilustrativa, identificada na interface, e não representa o espaço ou os equipamentos da Vivace. Variantes WebP de 700, 1400 e 2200 px atendem recortes e densidades diferentes. Substituir por fotografia real autorizada antes de produção.

Manrope e Archivo são hospedadas localmente em WOFF2 latino; licenças SIL OFL acompanham os arquivos em `assets/`. Total das duas fontes: aproximadamente 60 KB.

Conteúdo educativo conferido no material [The Key Principles of the Pilates Method — Summa Health, página 3](https://www.summahealth.org/~/media/files/microsites/wellnessinstitute/pilates.pdf). Sem promessa de resultado ou recomendação individual.

## Publicação e ambientes

`vercel.json` preserva o build estático e a saída `dist/`. Preview possui noindex no HTML, robots.txt bloqueado e headers noindex. O servidor local aplica noindex sempre. Rotas desconhecidas têm página e status 404 reais.

Para produção: aprovar conteúdo e confirmar domínio HTTPS, substituir a foto ilustrativa por material autorizado e revisar os headers da Vercel. Só então definir `VIVACE_ENV=production`. O build recusa produção se persistirem pendências essenciais ou headers que bloqueiem indexação. Não há canonical/sitemap com domínio fictício.

Não houve deploy externo neste redesign. Não foram adicionados CMS, banco, autenticação, formulário, analytics ou cookies.

## Testes e evidências

`node scripts/validate.mjs` executa testes com o Playwright do runtime local. Para outro computador, instalar Playwright e adaptar o caminho documentado no script. A ferramenta não faz parte do site publicado.

Resultados em `docs/validation.json`, relatório em `docs/VALIDACAO.md` e capturas em `docs/screenshots/`. Histórico do redesign em `docs/REDESIGN.md`; pesquisa e enriquecimento em `docs/ENRIQUECIMENTO.md`. Não há configuração de lint nem TypeScript neste projeto.

Pesquisa e origens: `content/research.mjs`. A branch `codex/conteudo-experiencia` preserva a versão anterior na main para comparação. Não publique candidates/withheld como dados institucionais.
