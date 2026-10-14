# Publicação da demonstração Vivace

Publicada em 14/10/2026. Acesso público verificado sem sessão ou autenticação: **https://vivace-pilates.vercel.app/**.

## Resultado do deploy

- URL: https://vivace-pilates.vercel.app/
- Destino da plataforma: production, usado como demonstração pública com noindex.
- Estado: READY.
- Commit da aplicação publicada: 7d8bd79.
- Framework: estático, preset Other, Node.js 24.x.
- Build: 3 segundos; finalização: 5 segundos, conforme Vercel inspect.
- Deployment: dpl_2FndagRfiX3QZkBFdnhvDqQ6nd5C.
- Projeto: prj_u2LGNJhboWVId7gEJm35W4EW4JPO / vivace-pilates.
- Equipe: team_WE2aZfep7fvyKpLLn6kUNUxN / kauanpdoliveira-7733.
- URL imutável: https://vivace-pilates-ca41tr7h6-kauanpdoliveira-7733.vercel.app/.

Use o endereço principal para a cliente. A URL imutável pode estar sujeita à autenticação Vercel; o endereço principal respondeu HTTP 200 sem credenciais.

## GitHub e configuração

Repositório: https://github.com/kauangodev/vivace-pilates. A versão atual e o histórico local foram enviados às branches main e codex/motion-responsivo. A documentação de publicação foi adicionada depois do deploy, sem alterar a aplicação publicada.

A CLI Vercel 64.0.2 foi autenticada pelo fluxo oficial. O checkout foi vinculado ao projeto, a equipe foi conferida com acesso OWNER e o deploy foi executado explicitamente nesse projeto e equipe.

O arquivo .vercelignore exclui Git, configurações locais de autenticação, arquivos .env, dependências locais, build local, referências e documentos de QA. A saída servida é dist. Nenhum arquivo .env foi versionado. O header X-Robots-Tag continua noindex, nofollow; o build usa o modo de demonstração existente.

## Verificação no endereço publicado

- Home HTTP 200 sem login e conteúdo Vivace presente.
- CSS, JavaScript, logo, foto institucional e fonte conferidos por SHA-256 contra o build local; todos idênticos e HTTP 200.
- Rota inexistente respondeu HTTP 404.
- Chromium em 390 e 1440 px: 8 imagens carregadas, nenhum overflow horizontal e nenhum erro de JavaScript.
- Menu mobile e Escape, expansão da primeira aula, galeria e troca de foto passaram.
- WhatsApp oficial 5531996906333 conferido nos links; não foi enviada mensagem.
- Resultado: [deployment-validation.json](deployment-validation.json).
- Capturas: [mobile](screenshots/published-390.png) e [desktop](screenshots/published-1440.png).

Observabilidade: zero erros no navegador nos dois cenários verificados. Logs de runtime da Vercel, drains e monitoramento contínuo não foram avaliados nesta entrega; a aplicação publicada é estática.

## Pendência do vínculo automático

A tentativa de conectar o GitHub à Vercel foi recusada com HTTP 400: a conexão Git da Vercel não possui acesso admin/write a kauangodev/vivace-pilates. A conta do GitHub foi autenticada para o push, e o repositório está atualizado; essa autenticação é diferente da conexão Git da Vercel.

O deploy concluído foi feito pela CLI, a partir do checkout verificado. Novos pushes não têm publicação automática configurada. Para habilitá-la, a conexão Git da Vercel precisa receber acesso ao repositório. Não foi alterada a conexão global com outros projetos.

A demonstração continua sem indexação. Aprovação editorial, domínio oficial e autorizações para lançamento institucional seguem as pendências registradas nos relatórios anteriores.
