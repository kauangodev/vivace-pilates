import {site} from '../content/site.mjs';
import {photograph,preloadPhotograph} from './media.mjs';
import {photography} from '../content/photography.mjs';
import {escape, header, footer, contactSection, contactUrl} from './components.mjs';
import {aboutSection, servicesSection, educationSection, firstVisitSection, faqSection} from './sections.mjs';

const heroSizes="(max-width:767px) min(340px, calc(100vw - 40px)), (max-width:959px) calc((100vw - 96px) / 2), (min-width:1440px) 620px, 46vw";

function document(body,{notFound=false,production=false}={}) {
  const title=notFound?'Página não encontrada | Vivace Pilates':'Vivace Pilates | Pilates em Igarapé, MG';
  const description='Conheça a Vivace em Igarapé: Pilates, fisioterapia pélvica e ortopédica e LPF. Converse com a equipe pelo WhatsApp oficial.';
  return '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'+
    '<meta name="robots" content="'+(production&&!notFound?'index, follow':'noindex, nofollow')+'"><title>'+title+'</title>'+
    '<meta name="description" content="'+description+'"><meta name="theme-color" content="#F7F7F7">'+
    '<meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:title" content="'+title+
    '"><meta property="og:description" content="'+description+'"><meta property="og:site_name" content="Vivace Pilates">'+
    (production&&!notFound&&site.domain?'<link rel="canonical" href="'+escape(site.domain)+'/"><meta property="og:url" content="'+escape(site.domain)+'/">':'')+
    (site.favicon?'<link rel="icon" href="'+escape(site.favicon)+'">':'<link rel="icon" href="data:,">')+
    (notFound?'':preloadPhotograph(photography.hero,heroSizes))+
    '<link rel="preload" href="/assets/archivo-latin.woff2" as="font" type="font/woff2" crossorigin>'+
    '<script>document.documentElement.setAttribute("data-nav-pending","");window.vivaceNavFallback=setTimeout(function(){document.documentElement.removeAttribute("data-nav-pending")},3000)</script><link rel="stylesheet" href="/styles.css"><script src="/app.js" defer onerror="document.documentElement.removeAttribute(&quot;data-nav-pending&quot;)"></script></head><body>'+
    '<a class="skip" href="#conteudo">Pular para o conteúdo</a>'+
    (production?'':'<div class="preview-banner">Prévia da Vivace · em revisão</div>')+
    header({notFound})+'<main id="conteudo" tabindex="-1">'+body+'</main>'+footer({production})+(notFound?'':'<dialog class="photo-dialog" aria-label="Fotografias da prévia Vivace" aria-describedby="dialog-caption"><div class="dialog-toolbar"><p>Fotografias</p><button class="dialog-button dialog-close" type="button" autofocus>Fechar</button></div><div class="dialog-media"></div><p class="dialog-caption" id="dialog-caption"></p><div class="dialog-navigation"><button class="dialog-button dialog-previous" type="button">Anterior</button><span class="dialog-counter" aria-live="polite"></span><button class="dialog-button dialog-next" type="button">Próxima</button></div></dialog>')+'</body></html>';
}
export function renderHome(options={}) {
  const url=contactUrl();
  const heading=site.copy.heroLines.map((line,index)=>'<span class="title-line'+(index===1?' title-accent':'')+'">'+escape(line)+'</span>').join(' ');
  const hero='<section class="hero container" id="inicio" aria-labelledby="hero-title">'+
    '<h1 class="hero-title" id="hero-title" data-intro>'+heading+'</h1>'+
    photograph(photography.hero,{className:'hero-photo',sizes:heroSizes,eager:true,reveal:false,caption:'Vivace, Igarapé · registro institucional'})+
    '<div class="hero-intro" data-hero-copy><p>'+escape(site.copy.heroDescription)+'</p>'+
    '<div class="hero-actions"><a class="button" href="'+escape(url||'#vivace')+'">'+(url?'Consultar as aulas':'Conheça a Vivace')+'</a>'+
    '<a class="text-link hero-services" href="#servicos">Conhecer todos os serviços</a></div></div></section>';
  return document(hero+aboutSection()+servicesSection()+educationSection()+firstVisitSection()+faqSection()+contactSection(),options);
}
export function render404(options={}) {
  return document('<section class="not-found container"><p class="error-code">404</p><h1>Página não<br>encontrada.</h1>'+
    '<p>Este endereço não existe ou pode ter mudado.</p><a class="button" href="/">Voltar para o início</a></section>',{...options,notFound:true});
}
