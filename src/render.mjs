import {site} from '../content/site.mjs';
import {escape, header, footer, photo, contactSection, contactUrl} from './components.mjs';
import {aboutSection, educationSection, firstVisitSection, faqSection} from './sections.mjs';

function document(body,{notFound=false,production=false}={}) {
  const title=notFound?'Página não encontrada | Vivace Pilates':'Vivace Pilates | Pilates em Igarapé, MG';
  const description='Conheça a Vivace Pilates em Igarapé, entenda a prática e converse com a equipe pelo WhatsApp oficial sobre aulas e horários.';
  return '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'+
    '<meta name="robots" content="'+(production&&!notFound?'index, follow':'noindex, nofollow')+'"><title>'+title+'</title>'+
    '<meta name="description" content="'+description+'"><meta name="theme-color" content="#F7F7F7">'+
    '<meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:title" content="'+title+
    '"><meta property="og:description" content="'+description+'"><meta property="og:site_name" content="Vivace Pilates">'+
    (production&&!notFound&&site.domain?'<link rel="canonical" href="'+escape(site.domain)+'/"><meta property="og:url" content="'+escape(site.domain)+'/">':'')+
    (site.favicon?'<link rel="icon" href="'+escape(site.favicon)+'">':'<link rel="icon" href="data:,">')+
    '<link rel="preload" href="/assets/archivo-latin.woff2" as="font" type="font/woff2" crossorigin>'+
    '<link rel="stylesheet" href="/styles.css"><script src="/app.js" defer></script></head><body>'+
    '<a class="skip" href="#conteudo">Pular para o conteúdo</a>'+
    (production?'':'<div class="preview-banner">Prévia da Vivace · em revisão</div>')+
    header({notFound})+'<main id="conteudo" tabindex="-1">'+body+'</main>'+footer({production})+'</body></html>';
}
export function renderHome(options={}) {
  const url=contactUrl();
  const heading=site.copy.heroLines.map((line,index)=>'<span class="title-line'+(index===1?' title-accent':'')+'">'+escape(line)+'</span>').join('');
  const hero='<section class="hero container" id="inicio" aria-labelledby="hero-title"><div class="hero-heading">'+
    '<h1 id="hero-title" data-intro>'+heading+'</h1><div class="hero-intro"><p>'+escape(site.copy.heroDescription)+'</p>'+
    '<a class="button" href="'+escape(url||'#vivace')+'">'+(url?'Consultar as aulas':'Conheça a Vivace')+'</a>'+
    '</div></div>'+photo()+'</section>';
  return document(hero+aboutSection()+educationSection()+firstVisitSection()+faqSection()+contactSection(),options);
}
export function render404(options={}) {
  return document('<section class="not-found container"><p class="error-code">404</p><h1>Página não<br>encontrada.</h1>'+
    '<p>Este endereço não existe ou pode ter mudado.</p><a class="button" href="/">Voltar para o início</a></section>',{...options,notFound:true});
}
