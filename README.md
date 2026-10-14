# Vivace Pilates

Prévia institucional com direção editorial, seis fotografias, serviços detalhados, galeria acessível e animações nativas. Logo original, Archivo e Manrope preservados. HTML gerado no build; conteúdo, contatos, detalhes e navegação essenciais continuam disponíveis sem JavaScript.

Etapa atual: [motion e responsividade](docs/MOTION_RESPONSIVO.md), na branch `codex/motion-responsivo`, com composições por dispositivo, 60 alvos de entrada e variantes de imagem de 1000 px.

## Execução e edição

- `node scripts/preview.mjs`: gera o build e serve http://127.0.0.1:4173.
- `node scripts/build.mjs`: gera `dist/`, `index.html` e `404.html`.
- Após editar, rode o build e recarregue a preview. Não há hot reload.
- `npm run dev` e `npm run build` são equivalentes quando npm estiver disponível.
- Node.js 20+ recomendado. Sem dependências de aplicação.
- Edite os dados em `content/site.mjs`, fotografias em `content/photography.mjs`, componentes em `src/components.mjs`, `src/sections.mjs` e `src/media.mjs`, composição e metadados em `src/render.mjs`, tokens em `styles.css` e comportamento em `app.js`.
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

Seis fotografias estão integradas: três materiais públicos da Vivace (duas publicações do Instagram e fachada no Wellhub) e três fotos ilustrativas licenciadas no Pexels. Origem, variantes, legendas, descrições e situação de cessão estão em `content/photography.mjs`; detalhes em [EVOLUCAO_VISUAL.md](docs/EVOLUCAO_VISUAL.md).

As imagens oficiais foram selecionadas para esta prévia local da própria marca. Sua publicação definitiva depende de confirmação de autoria, cessão e atualidade; disponibilidade pública não foi tratada como licença documental. As fotos de banco têm [licença Pexels](https://www.pexels.com/license/) e não representam equipe, clientes ou espaço da Vivace. A imagem do LPF é uma representação de postura, sem afirmar demonstração da técnica.

Variantes WebP de 700, 1000 e 1400 px, proporções explícitas, cinco imagens sob demanda e hero prioritário. A fachada do diretório conserva a resolução disponível de 639 × 359 px. Fotos não receberam retoques ou geração artificial; a logo foi preservada byte a byte.

Manrope e Archivo são hospedadas localmente em WOFF2 latino; licenças SIL OFL acompanham os arquivos em `assets/`. Total das duas fontes: aproximadamente 60 KB.

Conteúdo educativo e descrições gerais das práticas foram conferidos na Cleveland Clinic, Merrithew, NHS e Low Pressure Fitness. Fontes em `content/research.mjs`, sem promessa de resultado ou recomendação individual.

## Publicação e ambientes

`vercel.json` preserva o build estático e a saída `dist/`. Preview possui noindex no HTML, robots.txt bloqueado e headers noindex. O servidor local aplica noindex sempre. Rotas desconhecidas têm página e status 404 reais.

Para produção: aprovar conteúdo e confirmar domínio HTTPS, confirmar a cessão das fotografias institucionais selecionadas e revisar os headers da Vercel. Só então definir `VIVACE_ENV=production`. O build recusa produção se persistirem pendências essenciais ou headers que bloqueiem indexação. Não há canonical/sitemap com domínio fictício.

Não houve deploy externo neste redesign. A integração remota GitHub/Vercel continua pendente de conexão operacional das contas. Não foram adicionados CMS, banco, autenticação, formulário, analytics ou cookies.

## Testes e evidências

`node scripts/validate.mjs` executa testes com o Playwright do runtime local. Para outro computador, instalar Playwright e adaptar o caminho documentado no script. A ferramenta não faz parte do site publicado.

Resultados em `docs/validation.json`, relatório em `docs/VALIDACAO.md` e capturas em `docs/screenshots/`. Entrega atual em `docs/MOTION_RESPONSIVO.md`. Fotografia e conteúdo em `docs/EVOLUCAO_VISUAL.md`. Histórico do redesign em `docs/REDESIGN.md` e do enriquecimento em `docs/ENRIQUECIMENTO.md`. Não há configuração de lint nem TypeScript neste projeto.

Pesquisa e origens: `content/research.mjs`. A branch atual `codex/motion-responsivo` parte de `codex/fotografia-servicos` (3137c59), preservada para comparar a evolução. Use `git diff codex/fotografia-servicos...codex/motion-responsivo`. Não publique candidates/withheld como dados institucionais.

`node scripts/validate-motion.mjs` verifica as novas interações, 24 larguras, fallbacks e o perfil de CPU/rede. `--profile-only` atualiza apenas o diagnóstico após uma rodada completa já registrada. A prévia comprime HTML/CSS/JS em Brotli ou gzip conforme o navegador, mantendo noindex e no-store.
