// Null significa dado não confirmado; nunca use dados de exemplo.
export const site = {
  name:'Vivace Pilates', city:'Igarapé', state:'MG',
  source:'Briefings e confirmação do usuário em 14/10/2026; pesquisa em content/research.mjs',
  editorialApproved:false,
  logo:{src:'/assets/vivace-logo-original.png',width:150,height:150,source:'PNG original fornecido pelo usuário'},
  favicon:'/assets/vivace-logo-original.png', domain:null,
  contact:{
    whatsapp:'5531996906333', phoneDisplay:'(31) 99690-6333',
    instagram:'https://www.instagram.com/vivace.igarape/',
    status:'confirmado pelo usuário em 14/10/2026',
    address:'Rua Primeiro de Maio, 555 — Centro, Igarapé, MG', hours:null
  },
  services:[{title:'Pilates',source:'instagram'},{title:'Fisioterapia pélvica e ortopédica',source:'instagram'},{title:'LPF',source:'instagram'}], team:[], testimonials:[], trialClass:null,
  copy:{
    status:'proposta editorial, fundamentada em pesquisa',
    heroTitle:'Pilates em Igarapé.', heroLines:['Pilates em','Igarapé.'],
    heroDescription:'Respiração, força e controle em cada movimento. Converse com a Vivace sobre as aulas e encontre o seu ponto de partida.',
    aboutTitle:'A Vivace.',
    aboutDescription:'Pilates com acompanhamento de fisioterapeutas, em Igarapé, Minas Gerais.',
    aboutBody:'A proposta da Vivace reúne orientação profissional e acolhimento. As aulas são apresentadas com atenção às necessidades de cada pessoa e à forma de executar os movimentos.',
    contactTitle:'Vamos conversar.',
    contactDescription:'Quer conhecer as aulas? Chame a equipe no WhatsApp para consultar horários, valores e as condições para começar.'
  },
  institutionSource:'https://wellhub.com/pt-br/search/partners/vivace-a-definir/',
  differentials:[
    {title:'Acompanhamento profissional',description:'Fisioterapeutas e atenção individualizada na prática, conforme a apresentação pública do espaço.',status:'cadastro público',source:'wellhub'},
    {title:'Ambiente climatizado',description:'Ar-condicionado para o conforto durante as aulas.',status:'cadastro público',source:'wellhub'},
    {title:'Atenção a cada pessoa',description:'A proposta divulgada pela Vivace considera as necessidades individuais na condução dos exercícios.',status:'publicação oficial',source:'instagram-post-pilates'}
  ],
  education:{
    title:'Entenda o Pilates.',
    intro:'A prática reúne exercícios de força e mobilidade com atenção à respiração e à precisão. Os movimentos podem ser realizados no solo ou em aparelhos, conforme a orientação e a proposta das aulas.',
    principles:[
      {title:'Respiração',description:'O ritmo da respiração acompanha o exercício. Perceber essa relação ajuda a dar atenção à execução.'},
      {title:'Controle',description:'O movimento é feito com consciência, observando alinhamento e precisão. A qualidade da execução orienta a prática.'},
      {title:'Consciência corporal',description:'Perceber o corpo e como ele se move faz parte do aprendizado, além de completar uma sequência de exercícios.'}
    ],
    sources:[
      {label:'Cleveland Clinic',url:'https://health.clevelandclinic.org/everything-you-want-to-know-about-pilates'},
      {label:'Merrithew',url:'https://www.merrithew.com/blog/post/2023-05-17/what-is-pilates-everything-you-need-to-know-about-pilates'}
    ]
  },
  firstVisit:{
    title:'Antes da primeira aula.',
    intro:'Você não precisa resolver todas as dúvidas sozinho. Uma conversa com a equipe ajuda a entender as possibilidades e combinar o próximo passo.',
    steps:[
      {title:'Conte o que você busca',description:'Diga se já pratica Pilates e quais dúvidas tem sobre as aulas.'},
      {title:'Conheça as possibilidades',description:'Consulte modalidades, horários, frequência e valores. Pergunte também como funciona o primeiro atendimento.'},
      {title:'Confirme antes de ir',description:'Combine as condições da primeira aula e aguarde a confirmação do horário. Abrir o WhatsApp inicia uma conversa, não uma reserva.'}
    ]
  },
  faq:[
    {question:'Pilates é só alongamento?',answer:'Não. A prática também envolve força, controle e coordenação, com atenção à respiração e à execução. O alongamento é uma parte possível da sequência, e não sua única finalidade.',source:'cleveland'},
    {question:'Qual é a diferença entre solo e aparelhos?',answer:'No solo, os exercícios utilizam o corpo e podem incluir acessórios. Em aparelhos, molas podem oferecer resistência e apoio. A escolha depende da proposta da aula; consulte a equipe sobre as modalidades disponíveis na Vivace.',source:'merrithew'},
    {question:'Posso reservar uma aula pelo site?',answer:'O site abre uma conversa no WhatsApp oficial. A equipe informa disponibilidade e condições; o agendamento fica combinado apenas depois da confirmação.',source:'funcionamento real do site'}
  ],
  photography:{
    status:'ilustrativa, somente para preview',
    src:'/assets/pilates-studio-1400.webp',small:'/assets/pilates-studio-700.webp',large:'/assets/pilates-studio-2200.webp',
    width:1400,height:2100,
    alt:'Fotografia ilustrativa de um ambiente claro com aparelhos de Pilates; não representa o espaço da Vivace.',
    credit:'Ahmet Kurt / Pexels',
    source:'https://www.pexels.com/photo/pilates-reformers-in-bright-room-25596894/',
    license:'https://www.pexels.com/license/'
  }
};
export function whatsappLink(number) {
  if(number===null)return null;
  if(!/^[1-9]\d{7,14}$/.test(number))throw new Error('WhatsApp precisa conter número internacional confirmado, apenas com dígitos.');
  return 'https://wa.me/'+number+'?text='+encodeURIComponent('Olá! Conheci a Vivace pelo site e gostaria de saber mais sobre as aulas de Pilates e os horários disponíveis.');
}
export function productionIssues(data=site) {
  return [
    !data.editorialApproved&&'Aprovação editorial pendente',
    !data.logo&&'Logo oficial ausente',!data.favicon&&'Favicon da marca ausente',
    !data.domain&&'Domínio de produção não confirmado',
    !data.contact.whatsapp&&!data.contact.instagram&&'Canal oficial ausente',
    data.photography.status!=='autorizada'&&'Fotografia definitiva não autorizada'
  ].filter(Boolean);
}
