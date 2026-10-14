import {site, whatsappLink} from '../content/site.mjs';

export const escape = text => String(text).replace(/[&<>"']/g, char =>
  ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export const disclosureIcon = () => '<span class="disclosure-icon" aria-hidden="true"></span>';
const nav = [['inicio','Início'],['vivace','A Vivace'],['servicos','Serviços'],['pilates','Pilates'],['primeira-aula','Primeira aula'],['contato','Contato']];
export const contactUrl = () => whatsappLink(site.contact.whatsapp) || site.contact.instagram;

export function brand(home='/#inicio') {
  if (site.logo) return '<a class="brand" aria-label="Vivace Pilates, início" href="'+home+'"><img src="'+escape(site.logo.src)+'" width="'+site.logo.width+'" height="'+site.logo.height+'" alt="'+escape(site.name)+'"></a>';
  // Identificação textual provisória; não pretende reproduzir o logotipo oficial.
  return '<a class="brand brand-label" href="'+home+'" aria-label="Vivace Pilates, início">'+escape(site.name)+'</a>';
}
export function header({notFound=false}={}) {
  const prefix=notFound?'/':'', url=contactUrl();
  return '<header class="header" id="site-header"><div class="header-inner">'+brand(prefix+'#inicio')+
    '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav" hidden><span class="menu-label">Menu</span><span class="menu-lines" aria-hidden="true"></span></button>'+
    '<nav class="nav" id="main-nav" aria-label="Navegação principal">'+nav.map(([id,label])=>
      '<a href="'+prefix+'#'+id+'">'+label+'</a>').join('')+
    (url?'<a class="button small" href="'+escape(url)+'">WhatsApp</a>':'')+'</nav></div></header>';
}
export function footer({production=false}={}) {
  return '<footer class="footer"><div class="container footer-top">'+brand()+
    '<nav aria-label="Navegação do rodapé" data-motion-sequence>'+nav.map(([id,label])=>'<a href="/#'+id+'">'+label+'</a>').join('')+
    '</nav><a class="top-link" href="/#inicio">Voltar ao início</a></div><div class="container footer-bottom"><small>© '+new Date().getFullYear()+' Vivace Pilates</small>'+
    (production?'':'<span>Prévia editorial · Conteúdo em validação</span>')+'</div></footer>';
}
export function contactSection() {
  const url=contactUrl();
  return '<section class="contact-section" id="contato" aria-labelledby="contact-title"><div class="container contact-layout">'+
    '<div class="contact-copy" data-motion-sequence><h2 id="contact-title">'+escape(site.copy.contactTitle)+'</h2>'+
    (url?'<p>'+escape(site.copy.contactDescription)+'</p><a class="button" href="'+escape(url)+'">Falar com a equipe</a><p class="contact-note">Você iniciará uma conversa. Aguarde a confirmação da equipe para considerar o horário agendado.</p>':
      '<p class="contact-pending">Contato oficial em confirmação.</p>')+
    '</div><div class="contact-details" data-motion-sequence><p class="location-city">'+escape(site.city)+'<span>Minas Gerais</span></p>'+
    (site.contact.phoneDisplay?'<p class="contact-channel"><span>WhatsApp</span><a href="'+escape(url)+'">'+escape(site.contact.phoneDisplay)+'</a></p>':'')+
    (site.contact.instagram?'<p class="contact-channel"><span>Instagram</span><a href="'+escape(site.contact.instagram)+'">@vivace.igarape</a></p>':'')+
    (site.contact.address?'<address>'+escape(site.contact.address)+'</address><a class="text-link" href="https://www.google.com/maps/search/?api=1&amp;query='+encodeURIComponent(site.name+' '+site.contact.address)+'">Ver localização</a>':'')+
    (site.contact.hours?'<p>'+escape(site.contact.hours)+'</p>':'')+'</div></div></section>';
}
