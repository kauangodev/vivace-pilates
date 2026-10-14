import {photography} from './photography.mjs';
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
  services:[
    {id:'pilates',title:'Pilates',source:'instagram',photo:'pilates',
      intro:'Respiração, força e controle em uma prática atenta ao movimento.',
      description:'Na Vivace, o Pilates tem acompanhamento de fisioterapeutas e exercícios adaptados às necessidades individuais. Uma oportunidade de conhecer a prática com orientação.',
      detailTitle:'O que faz parte da prática',
      details:[
        {title:'Precisão e consciência',body:'O método trabalha a qualidade dos movimentos, combinando exercícios de força e mobilidade com atenção à respiração.'},
        {title:'Solo e aparelhos',body:'Pilates pode utilizar o peso do corpo, acessórios ou aparelhos. Consulte a equipe sobre as modalidades e a organização das aulas na Vivace.'}
      ],
      cta:'Conversar sobre Pilates',
      message:'Olá! Conheci a Vivace pelo site e gostaria de saber mais sobre as aulas de Pilates e os horários disponíveis.',
      caption:'Pilates em aparelhos · fotografia ilustrativa',
      reference:{label:'Merrithew',url:'https://www.merrithew.com/blog/post/2023-05-17/what-is-pilates-everything-you-need-to-know-about-pilates'}
    },
    {id:'fisioterapia',title:'Fisioterapia pélvica e ortopédica',source:'instagram',photo:'physiotherapy',
      intro:'Avaliação e orientação para compreender as suas necessidades.',
      description:'A fisioterapia pélvica e ortopédica faz parte dos serviços da Vivace. O cuidado fisioterapêutico considera a função do corpo e o movimento; a avaliação profissional orienta cada abordagem.',
      detailTitle:'Conheça as duas áreas',
      details:[
        {title:'Fisioterapia pélvica',body:'É uma área voltada à função do assoalho pélvico. A avaliação ajuda o profissional a definir orientações e possibilidades de cuidado para cada pessoa.'},
        {title:'Fisioterapia ortopédica',body:'Relaciona-se a músculos, articulações e movimento. Exercícios e orientações podem integrar o cuidado, conforme a avaliação. Consulte a Vivace sobre o atendimento disponível.'}
      ],
      cta:'Consultar a fisioterapia',
      message:'Olá! Conheci a Vivace pelo site e gostaria de informações sobre o atendimento de fisioterapia pélvica e ortopédica.',
      caption:'Acompanhamento fisioterapêutico · fotografia ilustrativa',
      reference:{label:'NHS',url:'https://www.nhs.uk/tests-and-treatments/physiotherapy/'}
    },
    {id:'lpf',title:'LPF',source:'instagram',photo:'lpf',
      intro:'Postura e respiração no centro da prática.',
      description:'Low Pressure Fitness é um programa de treinamento postural e respiratório. A técnica relaciona posições do corpo e padrões de respiração com atenção à execução. Converse com a equipe para conhecer a prática na Vivace.',
      detailTitle:'Entenda a proposta do LPF',
      details:[
        {title:'Aprendizado da técnica',body:'A prática envolve aprender a coordenação entre postura e respiração. A condução profissional ajuda a compreender os detalhes da execução.'},
        {title:'Orientação antes de começar',body:'Converse com a equipe sobre a proposta, a disponibilidade e as condições para praticar. A indicação deve considerar a avaliação e as necessidades individuais.'}
      ],
      cta:'Saber mais sobre LPF',
      message:'Olá! Conheci a Vivace pelo site e gostaria de saber mais sobre o LPF e como funciona a prática.',
      caption:'Postura e movimento · imagem ilustrativa, não demonstra a técnica LPF',
      reference:{label:'Low Pressure Fitness',url:'https://mx.lowpressurefitness.com/es/conoce-el-sistema-lpf/'}
    }
  ], team:[], testimonials:[], trialClass:null,
  copy:{
    status:'proposta editorial, fundamentada em pesquisa',
    heroTitle:'Pilates em Igarapé.', heroLines:['Pilates em','Igarapé.'],
    heroDescription:'Pilates com orientação profissional e atenção a cada movimento. Conheça também a fisioterapia pélvica e ortopédica e o LPF na Vivace.',
    aboutTitle:'A Vivace.',
    aboutDescription:'Pilates, fisioterapia e LPF. Cuidado e acolhimento em Igarapé.',
    aboutBody:'A Vivace reúne práticas de movimento e atendimento fisioterapêutico em um mesmo espaço. Cuidado, atenção e acolhimento fazem parte da sua proposta, com uma experiência humanizada.',
    aboutExperience:'Nas aulas de Pilates, a orientação de fisioterapeutas e a adaptação dos exercícios às necessidades individuais fazem parte do cuidado. O ambiente climatizado complementa o cuidado durante as aulas.',
    contactTitle:'Vamos conversar.',
    contactDescription:'Quer conhecer as aulas ou os atendimentos? Chame a equipe no WhatsApp para consultar disponibilidade, valores e o próximo passo.'
  },
  institutionSource:'https://wellhub.com/pt-br/search/partners/vivace-a-definir/',
  differentials:[
    {title:'Acompanhamento profissional',description:'Orientação de fisioterapeutas durante a prática de Pilates.',status:'cadastro público',source:'wellhub'},
    {title:'Ambiente climatizado',description:'Ar-condicionado para o conforto durante as aulas.',status:'cadastro público',source:'wellhub'},
    {title:'Atenção a cada pessoa',description:'Exercícios adaptados às necessidades individuais, com atenção à execução.',status:'publicação oficial',source:'instagram-post-pilates'}
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
  photography:photography.hero,
  photographs:photography
};
export function whatsappLink(number,message='Olá! Conheci a Vivace pelo site e gostaria de saber mais sobre as aulas de Pilates e os horários disponíveis.') {
  if(number===null)return null;
  if(!/^[1-9]\d{7,14}$/.test(number))throw new Error('WhatsApp precisa conter número internacional confirmado, apenas com dígitos.');
  return 'https://wa.me/'+number+'?text='+encodeURIComponent(message);
}
export function productionIssues(data=site) {
  return [
    !data.editorialApproved&&'Aprovação editorial pendente',
    !data.logo&&'Logo oficial ausente',!data.favicon&&'Favicon da marca ausente',
    !data.domain&&'Domínio de produção não confirmado',
    !data.contact.whatsapp&&!data.contact.instagram&&'Canal oficial ausente',
    Object.values(data.photographs).some(photo=>!photo.productionApproved)&&'Cessão das fotografias institucionais pendente'
  ].filter(Boolean);
}
