Primeira coisa que irá fazer é criar uma preview nova para esse projeto expecifico, depois você irá criar o projeto no github e na vercel vinculando os dois.




# PROMPT MASTER — SITE PREMIUM DA VIVACE PILATES

## 1. MISSÃO E RESULTADO

Atue com competências de desenvolvimento web, UI/UX, direção de arte, acessibilidade, desempenho, SEO local e conversão. Aplique essas competências de forma integrada, sem exigir múltiplos agentes.

Desenvolva ou melhore o site institucional da **Vivace Pilates**, situada em **Igarapé, Minas Gerais**, conforme o briefing fornecido. Verifique as informações institucionais antes da publicação.

O objetivo principal é facilitar o contato com a equipe e as solicitações de agendamento. O objetivo secundário é apresentar a proposta da Vivace com clareza, acolhimento e credibilidade.

Implemente o site no projeto disponível. Entregue código funcional, experiência responsiva, navegação acessível e validação documentada. Não encerre com um plano, uma descrição de layout ou um protótipo quando houver condições de implementação.

**Ordem de prioridade:** informações verdadeiras e funcionalidades essenciais; acessibilidade e experiência mobile; desempenho e descoberta; identidade visual; animações e recursos opcionais.

## 2. INSPEÇÃO INICIAL E AUTONOMIA

Antes de alterar arquivos:

1. Leia as instruções aplicáveis ao repositório.
2. Inspecione a estrutura, as tecnologias, os comandos existentes, as páginas, as integrações e os ativos disponíveis.
3. Identifique alterações locais e preserve o trabalho existente.
4. Consulte conteúdos e configurações para identificar dados institucionais utilizáveis e pendências.
5. Defina brevemente a abordagem e comece a execução.

Se já existir um site, melhore sua implementação e preserve as funcionalidades, URLs e integrações úteis. Não recrie o projeto nem migre sua tecnologia apenas por preferência pessoal.

Tome decisões técnicas e visuais reversíveis com autonomia. Evite perguntas sobre detalhes que possam ser resolvidos pelo briefing ou pela inspeção. Se faltar uma informação indispensável, avance nas partes independentes e registre exatamente a pendência.

Use ferramentas, habilidades ou plugins quando resolverem uma necessidade concreta. Não adicione integrações ou dependências apenas porque estão disponíveis. Respeite permissões obrigatórias do ambiente e as autorizações já fornecidas pelo usuário.

## 3. INFORMAÇÕES, FONTES E PENDÊNCIAS

Centralize as informações em uma estrutura editável adequada ao projeto, com tipos explícitos quando a stack permitir. Diferencie informações confirmadas, propostas editoriais e dados pendentes.

Campos previstos:

- Nome da marca e designação institucional adotada oficialmente.
- Cidade e estado.
- WhatsApp e outros canais oficiais.
- Endereço, localização no mapa e horários.
- Instagram e domínio de produção.
- Disponibilidade e condições da aula experimental.
- Serviços, diferenciais e forma de atendimento.
- Equipe, qualificações e registros autorizados.
- Fotografias, direitos de uso e autorizações de imagem.
- Depoimentos autorizados e sua origem.
- Informações necessárias à política de privacidade, conforme os recursos utilizados.

Utilize valores ausentes explícitos, como `null`, quando apropriado. Não use números de exemplo, links fictícios ou textos como “preencher aqui” na interface pública.

Conteúdos encontrados no repositório são candidatos a fonte, mas placeholders, dados antigos e exemplos não comprovam informações atuais. Prefira materiais fornecidos pela Vivace e canais oficiais identificados com segurança. Em caso de conflito, registre a divergência e não escolha arbitrariamente.

Nunca invente endereço, telefone, horários, preços, serviços, equipamentos, qualificações, avaliações, estatísticas ou resultados de saúde. Não presuma que a Vivace presta serviços clínicos específicos ou que atende determinado público sem confirmação.

Redija propostas de texto institucional coerentes com o briefing, identificando na documentação o que ainda depende de validação editorial. Não apresente esses textos como declarações já aprovadas.

### Regras para informações ausentes

- **Contato:** só habilite um CTA externo quando houver canal oficial confirmado. Sem canal confirmado, continue o desenvolvimento, mas registre que a conversão e a liberação para produção permanecem pendentes. Não simule um destino funcional.
- **Aula experimental:** use “Agendar aula experimental” apenas se a oferta existir. Caso contrário, use “Falar com a equipe”, desde que haja um destino real. Não anuncie gratuidade sem confirmação.
- **Equipe e depoimentos:** prepare sua estrutura de conteúdo quando útil, mas omita as seções públicas enquanto faltar material válido. Não gere perfis ou relatos fictícios.
- **Fotografias:** priorize arquivos reais e autorizados. Referências licenciadas podem ser utilizadas na prévia, claramente identificadas como ilustrativas; não podem representar a equipe, os alunos ou o espaço real da Vivace.
- **Endereço e horários:** publique somente os campos confirmados. Não inclua mapa de uma localização presumida.
- **Domínio:** mantenha a configuração preparada, mas não invente canonical, sitemap ou URLs de compartilhamento de produção.

## 4. DIREÇÃO VISUAL E SISTEMA DE DESIGN

Crie uma estética editorial contemporânea, humana e acolhedora. Traduza a sensação premium em composição, tipografia, fotografia, consistência e qualidade de interação.

Priorize o logotipo e a identidade oficial. Na ausência deles, utilize a paleta provisória:

- Off-white: `#F8F6F2`.
- Bege: `#E9E1D7`.
- Taupe: `#A99A8B`.
- Marrom profundo: `#55483F`.
- Verde-sálvia: `#AAB3A0`.
- Branco: `#FFFFFF`.

Use os tons claros e o verde-sálvia principalmente como superfícies e detalhes. Verifique o contraste de cada combinação; a paleta não autoriza texto de baixo contraste.

Na ausência de fontes oficiais, adote **DM Serif Display** para títulos e **Manrope** para textos e controles, desde que disponíveis e licenciadas para o uso previsto. Utilize alternativas adequadas se necessário e justifique a escolha. Limite famílias e pesos ao que o layout utiliza.

Centralize tokens de cor, tipografia, espaçamento, largura de conteúdo, bordas, foco e movimento. Use uma escala consistente, layout fluido e tamanhos adaptáveis com `clamp()` quando apropriado.

Direção de composição:

- Hero com texto legível e fotografia editorial ampla.
- Assimetria moderada no desktop e sequência clara no mobile.
- Alternância de superfícies e proporções, sem repetir o mesmo bloco em toda a página.
- Textos concisos, margens confortáveis e detalhes decorativos discretos.
- Ícones de uma única família visual.

Evite gradientes ostensivos, excesso de vidro translúcido, sombras fortes, carrosséis automáticos, imagens artificiais apresentadas como reais e efeitos que dificultem o contato.

## 5. CONTEÚDO E ARQUITETURA

Implemente uma landing page institucional, com estrutura preparada para expansão. Preserve rotas existentes relevantes. Páginas adicionais, como privacidade, devem existir quando fizerem parte do escopo efetivo.

**Não há obrigação de exibir todas as seções:** a ordem abaixo é a base. Una ou omita blocos conforme o conteúdo confirmado e a clareza da página. Ajuste a navegação para apontar apenas a seções presentes.

### A. Header

Inclua marca, navegação curta e CTA principal quando houver destino confirmado. Links sugeridos: Início, A Vivace, Pilates, Diferenciais e Contato.

Use header sticky sem encobrir conteúdo ou foco. A transparência inicial é opcional e depende de contraste consistente. Se prejudicar a leitura, utilize superfície sólida desde o início.

O menu mobile deve ter controle com nome acessível, estado expandido e fechamento ao selecionar um link. Se implementado como modal, gerencie foco, tecla Escape e retorno do foco ao acionador.

### B. Hero

Apresente a marca, a proposta e a localização de maneira rapidamente compreensível. Use uma headline principal e um CTA prioritário; o CTA secundário pode levar à apresentação da Vivace.

Textos iniciais propostos:

- Eyebrow: “PILATES EM IGARAPÉ, MG”.
- Headline: “Seu corpo em movimento. Sua vida em equilíbrio.”
- Apoio: “Conheça a Vivace Pilates e converse com a equipe para saber mais sobre as aulas.”
- CTA secundário: “Conheça a Vivace”.

Refine a proposta textual com informações reais sobre atendimento e diferenciais. Não acrescente benefícios comerciais ou profissionais sem respaldo.

O CTA de contato solicita uma conversa ou agendamento; não deve sugerir reserva automaticamente confirmada quando a integração apenas abre o WhatsApp.

Use fotografia real quando disponível, recorte responsivo e posição que preserve o sujeito. A imagem principal e o texto devem aparecer sem depender de animações.

### C. Apresentação da Vivace

Explique a proposta do espaço, sua forma de atendimento e o que o visitante pode esperar, com base nos dados disponíveis. Título sugerido: “Cuidado que acompanha o seu movimento”.

Combine texto curto e fotografia autorizada. Inclua link para a galeria somente se ela existir e apresentar material pertinente.

### D. Diferenciais

Apresente de dois a quatro diferenciais confirmados. Cada item precisa comunicar um aspecto distinto e relevante; evite repetir “acompanhamento”, “atenção” e “orientação” com descrições equivalentes.

Use títulos curtos, descrições concretas e ícones opcionais. Não force quatro cards quando houver apenas dois diferenciais reais.

### E. Conheça o Pilates

Explique brevemente a prática, abordando controle, respiração e consciência corporal. Use linguagem informativa, sem diagnóstico, garantia de resultados ou promessa de cura.

Relacione a seção aos serviços confirmados da Vivace. Se necessário, valide afirmações técnicas em fontes confiáveis. Evite recomendações individuais de saúde.

### F. Espaço e equipe — condicionais

Utilize galeria editorial com fotografias reais, autorizadas e legendas pertinentes. Não exija ampliação se as imagens já forem compreensíveis no layout.

Se houver lightbox, implemente nomes acessíveis, navegação por teclado, Escape, gerenciamento de foco e retorno ao acionador.

Publique perfis profissionais apenas quando houver nome, fotografia e apresentação autorizados. Inclua formação e registro somente quando fornecidos e aplicáveis.

### G. Depoimentos — condicionais

Publique relatos autênticos com atribuição e autorização adequadas. Preserve o sentido original e registre a origem na documentação.

Não crie avaliações, estrelas ou números. Se não houver material, omita a seção sem duplicar os diferenciais para ocupar espaço.

### H. FAQ — condicional ao conteúdo válido

Use perguntas que respondam a dúvidas reais, como primeiro contato, consulta de horários, localização e agendamento. Inclua condições da aula experimental apenas quando confirmadas.

As respostas institucionais dependem de informação válida. Não publique respostas presumidas nem uma coleção de perguntas com o mesmo texto genérico.

Prefira um componente semântico que permaneça utilizável sem JavaScript, como `details` e `summary`, quando compatível com o projeto.

### I. Contato e chamada final

Concentre os canais confirmados e a chamada final em um bloco claro. Título sugerido: “Seu próximo passo começa com uma conversa”.

Inclua WhatsApp, Instagram, endereço e horários conforme disponibilidade. Prefira link para a localização; adicione mapa incorporado apenas quando trouxer benefício e suas implicações de desempenho e privacidade forem tratadas.

Evite dois botões concorrentes que levam ao mesmo destino. Um CTA principal pode atender ao contato e à solicitação de aula.

### J. Footer

Inclua marca, apresentação breve, navegação útil, canais confirmados e direitos autorais. Exiba links de privacidade ou outros documentos apenas quando as páginas correspondentes estiverem implementadas.

## 6. TECNOLOGIA E MANUTENÇÃO

Preserve a stack existente quando adequada. Em um projeto novo, prefira React e TypeScript se forem compatíveis com o ambiente; decida a ferramenta de build e a estratégia de renderização conforme hospedagem, SEO e manutenção.

Garanta que o conteúdo institucional essencial esteja disponível no HTML entregue, por geração estática, pré-renderização ou renderização no servidor, conforme a arquitetura permitir. Não imponha migração desnecessária; se houver uma limitação real, documente e implemente a alternativa viável.

Utilize CSS organizado ou os recursos já adotados pelo projeto. Prefira CSS e APIs nativas para interações simples. Adicione bibliotecas de animação somente quando justificadas.

Separe componentes por responsabilidade e mantenha conteúdo, canais e tokens centralizados. Não crie componentes vazios apenas para cumprir uma lista nem concentre toda a aplicação em um componente monolítico.

Inclua instruções de execução, build e configuração. Se forem necessárias variáveis de ambiente, forneça exemplos sem segredos e explique quais pertencem ao servidor.

## 7. CONVERSÃO E INTEGRAÇÕES

Todos os controles visíveis devem ter comportamento real. Não use `href="#"` como destino provisório, botões sem ação ou confirmações simuladas.

Para WhatsApp, utilize `https://wa.me/` com número internacional confirmado, composto por dígitos, e mensagem corretamente codificada. Mensagem sugerida:

“Olá! Conheci a Vivace pelo site e gostaria de saber mais sobre as aulas de Pilates e os horários disponíveis.”

Centralize a geração dos links para evitar divergências. O funcionamento do link não comprova que houve mensagem enviada, resposta ou agendamento.

Não inclua formulário por padrão quando o contato via WhatsApp atender à necessidade. Se houver formulário, implemente envio real, validação no servidor quando aplicável, proteção proporcional contra abuso, estados de envio, erro, tentativa novamente e confirmação somente após o envio ser aceito pelo serviço.

Não exponha segredos no frontend. Não adicione serviços pagos nem custos recorrentes sem autorização aplicável. Utilize integrações existentes e configuradas quando disponíveis.

## 8. MOBILE, ACESSIBILIDADE E MOVIMENTO

Desenvolva para smartphones e amplie o layout progressivamente. Teste, no mínimo, larguras de 320, 375, 768, 1024 e 1440 px, além de um desktop amplo, quando as ferramentas permitirem.

Adote WCAG 2.2 nível AA como referência de acessibilidade:

- HTML semântico, landmarks e hierarquia lógica de títulos.
- Um título principal claro para a landing page.
- Link para pular ao conteúdo.
- Contraste mínimo de 4,5:1 para texto comum e 3:1 para texto grande, conforme a definição da WCAG.
- Contraste adequado de controles e indicação de foco.
- Navegação completa por teclado, sem armadilhas de foco.
- Labels e mensagens associadas a campos, quando existirem.
- Textos alternativos úteis; imagens decorativas sem descrição redundante.
- Preferência de áreas de toque de pelo menos 44 × 44 CSS px para os principais controles.
- Leitura e interação preservadas ao ampliar o texto.

Não trate uma pontuação automática como comprovação de conformidade integral.

Evite scroll horizontal involuntário, imagens distorcidas e sobreposição de controles fixos. Compense o header nas âncoras. Uma barra inferior de contato é opcional; use apenas se respeitar a área segura do dispositivo e não encobrir conteúdo, foco ou teclado virtual.

Movimento:

- Microinterações de aproximadamente 150–250 ms.
- Transições de componentes de aproximadamente 250–400 ms.
- Entradas opcionais de aproximadamente 350–550 ms, com deslocamento de até 16 px.
- Preferência por `transform` e `opacity`.
- Respeito a `prefers-reduced-motion`.
- Sem parallax, rolagem interceptada ou animação contínua por padrão.

Faça o conteúdo permanecer visível caso o JavaScript falhe. Preserve as funções essenciais de navegação e contato sem depender de efeitos.

## 9. SEO, DESEMPENHO E PRIVACIDADE

### SEO

Use português do Brasil e configure `lang="pt-BR"`. Trabalhe “Vivace Pilates” e “Pilates em Igarapé, MG” naturalmente, sem repetição artificial.

Implemente title, description, hierarquia de headings, compartilhamento social e favicon com ativos válidos. Configure canonical e sitemap apenas com o domínio confirmado e URLs públicas reais. Preserve URLs existentes ou configure redirecionamentos quando necessário.

Utilize dados estruturados compatíveis com a atividade confirmada e o conteúdo visível. Não force uma categoria clínica ou profissional específica. Inclua somente propriedades reais e valide a marcação disponível.

Configure a indexação por ambiente. Prévias não devem ser indexadas; quando precisarem de proteção, use controle de acesso. `robots.txt` não protege informações privadas. Na produção, confira que configurações de prévia não bloqueiem a indexação desejada.

### Desempenho

Metas de Core Web Vitals em uso real, no percentil 75, considerando mobile e desktop: LCP ≤ 2,5 s; INP ≤ 200 ms; CLS ≤ 0,1.

Use testes locais para diagnóstico; não declare aprovação de métricas de campo sem dados reais suficientes. Registre ferramenta, ambiente, limitações e resultados medidos.

Otimize imagens com formatos e tamanhos adequados, dimensões reservadas e variantes responsivas. Não aplique lazy loading à imagem principal responsável pelo LCP. Utilize carregamento diferido nas imagens abaixo da primeira área visível.

Reduza JavaScript e pesos de fontes. Evite carregamento desnecessário de mapas, widgets e bibliotecas.

### Privacidade e segurança

Minimize a coleta de dados. Não solicite informações de saúde no formulário comercial. Trate credenciais no servidor e não registre dados sensíveis indevidamente.

Não adicione analytics, pixels ou cookies não essenciais por padrão. Se forem parte do escopo autorizado, avalie os recursos efetivamente utilizados e implemente transparência e controles aplicáveis. Não trate um banner genérico como garantia de adequação à LGPD.

A política de privacidade deve refletir o tratamento real, os fornecedores e os canais confirmados, com as pendências de validação claramente documentadas. Não invente responsável, contato ou prazos.

## 10. EXECUÇÃO E VALIDAÇÃO

Execute nesta sequência, adaptando-a ao projeto:

1. Inspecione o estado atual e as fontes de conteúdo.
2. Defina tokens, estrutura de conteúdo e hierarquia da página.
3. Implemente os fluxos essenciais e o layout responsivo.
4. Adicione seções condicionais apenas com material válido.
5. Aplique movimento discreto e otimizações.
6. Execute as verificações disponíveis e corrija falhas encontradas.
7. Prepare a documentação e registre as pendências reais.

Critérios de aceitação:

- Build de produção concluído sem erros; verificações de tipos e lint existentes executadas e resultados registrados.
- Navegação, âncoras, menu, FAQ e galeria funcionais quando presentes.
- CTAs com destinos confirmados, sem links quebrados ou ações simuladas.
- Fluxo de formulário validado de ponta a ponta, incluindo erro, se houver formulário.
- Ausência de imagens quebradas, sobreposição de conteúdo e scroll horizontal nos tamanhos verificados.
- Conteúdo legível e controles utilizáveis por teclado e com movimento reduzido.
- Ausência de erros de execução da aplicação no console durante os fluxos testados.
- Metadados, URLs e configurações de indexação conferidos para o ambiente de entrega.
- Conteúdo e ativos pendentes ausentes da interface de produção.

Use testes automatizados existentes ou testes adicionais pertinentes aos fluxos de risco. Complemente com inspeção visual no navegador. Não escreva testes que apenas repitam a implementação nem afirme ter usado ferramentas indisponíveis.

Documente qualquer verificação não executada e sua razão. Corrija os problemas solucionáveis antes da entrega; não encerre deixando falhas conhecidas que possam ser resolvidas dentro do escopo.

## 11. ENTREGA E ESTADO DE PUBLICAÇÃO

Entregue:

- Implementação nos arquivos do projeto.
- Resumo do que mudou e das decisões relevantes.
- Evidências dos testes realizados e limitações de medição.
- Instruções de execução, build e configuração.
- Orientação para editar textos, canais e fotografias.
- Lista objetiva de informações ou acessos ainda necessários.

Distinga o estado efetivo:

1. **Prévia implementada:** permite avaliar o design, mas possui pendências institucionais ou integrações.
2. **Pronto para publicação:** requisitos essenciais verificados, conteúdo necessário validado e configuração de produção preparada.
3. **Publicado:** implantação realizada e endereço público conferido.

Pendências opcionais podem levar à omissão de uma seção. Pendências essenciais, como ausência de um canal real de contato, impedem declarar o site pronto para seu objetivo comercial.

Publique somente quando a implantação estiver autorizada no contexto e os requisitos essenciais estiverem resolvidos. A preparação para publicação, por si só, não constitui autorização de implantação.

**Execute com autonomia e preserve a identidade da Vivace. O resultado deve equilibrar clareza, confiança, qualidade visual e contato fácil, com cada recurso cumprindo uma função real.**

---

Referências técnicas para os critérios verificáveis:

- [W3C — WCAG 2.2](https://www.w3.org/TR/WCAG22/).
- [W3C — Contraste mínimo](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
- [web.dev — Limites e medição dos Core Web Vitals](https://web.dev/articles/defining-core-web-vitals-thresholds/).
