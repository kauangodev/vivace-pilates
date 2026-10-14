// Imagens locais. O licenciamento e a revisão para produção ficam explícitos.
const pexelsLicense='https://www.pexels.com/license/';
const stock=(id,file,width,height,alt,credit,source)=>({
  id,kind:'illustrative',src:'/assets/'+file+'-1400.webp',
  variants:[{src:'/assets/'+file+'-700.webp',width:700},{src:'/assets/'+file+'-1000.webp',width:1000},{src:'/assets/'+file+'-1400.webp',width:1400}],
  width,height,alt,credit,source,license:pexelsLicense,productionApproved:true
});
export const photography={
  hero:{
    id:'vivace-institution',kind:'institutional',src:'/assets/vivace-institution-1400.webp',
    variants:[{src:'/assets/vivace-institution-700.webp',width:700},{src:'/assets/vivace-institution-1000.webp',width:1000},{src:'/assets/vivace-institution-1400.webp',width:1400}],
    width:1400,height:1667,
    alt:'Registro publicado pela Vivace: uma mulher diante da fachada da clínica em Igarapé, com a marca coral acima da entrada.',
    credit:'Instagram oficial da Vivace',source:'https://www.instagram.com/vivace.igarape/p/DT-GdyyjoPz/',
    license:null,productionApproved:false,
    permission:'Material público da própria marca selecionado para a prévia solicitada. Autoria e cessão para publicação definitiva precisam ser confirmadas.'
  },
  equipment:{
    id:'vivace-equipment',kind:'institutional',src:'/assets/vivace-equipment-1400.webp',
    variants:[{src:'/assets/vivace-equipment-700.webp',width:700},{src:'/assets/vivace-equipment-1000.webp',width:1000},{src:'/assets/vivace-equipment-1400.webp',width:1400}],
    width:1400,height:1750,
    alt:'Publicação da Vivace com acessórios de Pilates sobre um aparelho: bola azul, círculo, halteres e faixas. Texto na fotografia: Por que fazer Pilates?',
    credit:'Instagram oficial da Vivace',source:'https://www.instagram.com/vivace.igarape/p/DR0p2cxjHsx/',
    license:null,productionApproved:false,
    permission:'Material público da própria marca selecionado para a prévia solicitada. Confirmar cessão para publicação definitiva.'
  },
  facade:{
    id:'vivace-facade',kind:'institutional',src:'/assets/vivace-facade-639.webp',
    variants:[{src:'/assets/vivace-facade-639.webp',width:639}],
    width:639,height:359,alt:'Fachada da Vivace com o nome e o símbolo coral sobre a entrada de vidro.',
    credit:'Cadastro da Vivace no Wellhub',source:'https://wellhub.com/pt-br/search/partners/vivace-a-definir/',
    license:null,productionApproved:false,
    permission:'Foto do cadastro público da marca usada na prévia. Confirmar arquivo original, atualidade e cessão para produção.'
  },
  pilates:stock('pilates-practice','pilates-practice',1400,933,
    'Fotografia ilustrativa: mulher praticando Pilates em um reformer de madeira, em um ambiente claro. Não é uma aluna nem o espaço da Vivace.',
    'Ahmet Kurt / Pexels','https://www.pexels.com/photo/fit-woman-exercising-on-pilates-reformer-25596679/'),
  physiotherapy:stock('physio-care','physio-care',1400,2034,
    'Fotografia ilustrativa de acompanhamento de um movimento durante uma sessão de fisioterapia. Não representa a equipe ou um atendimento da Vivace.',
    'Diana Light / Pexels','https://www.pexels.com/photo/physiotherapist-working-with-woman-14254048/'),
  lpf:stock('posture-movement','posture-movement',1400,2100,
    'Fotografia ilustrativa de uma mulher em roupa esportiva alongando um braço. Representa postura e movimento; não demonstra a técnica LPF nem um atendimento da Vivace.',
    'Angela Roma / Pexels','https://www.pexels.com/photo/african-american-sportswoman-stretching-arms-in-studio-7479739/')
};
