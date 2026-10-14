// Registro de pesquisa; estes dados não são renderizados automaticamente.
export const research = {
  consultedOn: '2026-10-14',
  sources: [
    {id:'wellhub',title:'Cadastro público da Vivace no Wellhub',url:'https://wellhub.com/pt-br/search/partners/vivace-a-definir/',access:'conteúdo consultado',role:'apresentação institucional informada no cadastro'},
    {id:'instagram',title:'Instagram oficial da Vivace',url:'https://www.instagram.com/vivace.igarape/',access:'biografia pública consultada no Chromium; acesso web direto falhou',role:'canal confirmado pelo usuário; serviços divulgados na biografia'},
    {id:'instagram-post-institution',title:'Apresentação institucional da Vivace',url:'https://www.instagram.com/vivace.igarape/p/DT-GdyyjoPz/',access:'legenda pública consultada sem autenticação',role:'apresentação e endereço'},
    {id:'instagram-post-pilates',title:'Publicação da Vivace sobre Pilates',url:'https://www.instagram.com/vivace.igarape/p/DR0p2cxjHsx/',access:'legenda pública consultada sem autenticação',role:'orientação individual, endereço e telefone'},
    {id:'cleveland',title:'Pilates: What It Is and Health Benefits',url:'https://health.clevelandclinic.org/everything-you-want-to-know-about-pilates',access:'conteúdo consultado',role:'conteúdo educativo'},
    {id:'merrithew',title:'What is Pilates? Everything you need to know',url:'https://www.merrithew.com/blog/post/2023-05-17/what-is-pilates-everything-you-need-to-know-about-pilates',access:'conteúdo consultado',role:'conteúdo educativo e princípios de execução'},
  ],
  confirmedByUser: {instagram:'https://www.instagram.com/vivace.igarape/',whatsapp:'5531996906333',date:'2026-10-14'},
  publiclyReported: [
    {claim:'Acompanhamento por fisioterapeutas e atendimento personalizado',source:'wellhub',status:'cadastro público; revisão institucional pendente'},
    {claim:'Ambiente climatizado',source:'wellhub',status:'cadastro público; revisão institucional pendente'},
    {claim:'Fisioterapia pélvica e ortopédica e LPF',source:'instagram',status:'biografia oficial consultada; sem extrapolação de técnicas ou públicos'},
    {claim:'Rua Primeiro de Maio, 555, Centro, Igarapé, MG',source:'instagram-post-institution e instagram-post-pilates',status:'corroborado em duas publicações oficiais e no cadastro público'},
  ],
  withheld: [
    {field:'drainage',candidate:'Drenagem para...',reason:'Biografia truncada; público e nome completo não inferidos.'},
    {field:'hours',candidate:'Segunda a sábado, 07:00–20:00',reason:'Disponibilidade atual não confirmada; não publicada.'},
    {field:'trialClass',candidate:'Aula experimental gratuita',reason:'Condições podem variar; não anunciada sem confirmação.'},
    {field:'services',candidate:'Mat Pilates',reason:'Modalidade listada no cadastro; disponibilidade atual deve ser validada.'},
    {field:'photography',reason:'Não há arquivos institucionais com autorização de uso documentada.'},
  ],
};
