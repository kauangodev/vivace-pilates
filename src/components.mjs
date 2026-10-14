import {site, whatsappLink} from '../content/site.mjs';

export const escape = text => String(text).replace(/[&<>"']/g, char =>
  ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const nav = [['inicio','Início'],['vivace','A Vivace'],['pilates','Pilates'],['contato','Contato']];
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
    (url?'<a class="button small" href="'+escape(url)+'">Falar com a equipe</a>':'')+'</nav></div></header>';
}
export function footer({production=false}={}) {
  return '<footer class="footer"><div class="container footer-top">'+brand()+
    '<nav aria-label="Navegação do rodapé">'+nav.map(([id,label])=>'<a href="/#'+id+'">'+label+'</a>').join('')+
    '</nav><a class="top-link" href="/#inicio">Voltar ao início</a></div><div class="container footer-bottom"><small>© '+new Date().getFullYear()+' Vivace Pilates</small>'+
    (production?'':'<span>Prévia editorial · Conteúdo em validação</span>')+'</div></footer>';
}
export function photo() {
  const p=site.photography;
  const large=p.large ? ', '+p.large+' 2200w' : '';
  return '<figure class="hero-photo"><div class="photo-window"><img src="'+p.src+'" srcset="'+p.small+' 700w, '+p.src+' 1400w'+large+
    '" sizes="(max-width:767px) calc(100vw - 40px), (min-width:1600px) 1440px, 90vw" width="'+p.width+'" height="'+p.height+
    '" alt="'+escape(p.alt)+'" fetchpriority="high" decoding="async"></div><figcaption><span>'+
    (p.status==='autorizada'?'':'Fotografia ilustrativa. Não representa o espaço da Vivace.')+
    '</span><span>'+escape(p.credit)+'</span></figcaption></figure>';
}
export function contactSection() {
  const url=contactUrl();
  return '<section class="contact-section" id="contato" aria-labelledby="contact-title"><div class="container contact-layout">'+
    '<div class="contact-copy" data-reveal><h2 id="contact-title">'+escape(site.copy.contactTitle)+'</h2>'+
    (url?'<p>Para saber mais sobre as aulas e consultar horários, fale com a equipe.</p><a class="button" href="'+escape(url)+'">Falar com a equipe</a><p class="contact-note">O contato inicia uma conversa. O agendamento depende de confirmação.</p>':
      '<p class="contact-pending">O contato oficial da Vivace ainda precisa ser confirmado para esta prévia.</p>')+
    '</div><div class="contact-details"><p class="location-city">'+escape(site.city)+'<span>Minas Gerais</span></p>'+
    (site.contact.address?'<p>'+escape(site.contact.address)+'</p>':'')+
    (site.contact.hours?'<p>'+escape(site.contact.hours)+'</p>':'')+'</div></div></section>';
}

