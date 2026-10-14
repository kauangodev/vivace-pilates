import {site} from '../content/site.mjs';
import {escape, header, footer, photo, contactSection, contactUrl} from './components.mjs';

function document(body,{notFound=false,production=false}={}) {
  const title=notFound?'Página não encontrada | Vivace Pilates':'Vivace Pilates | Pilates em Igarapé, MG';
  const description='Vivace Pilates, em Igarapé, Minas Gerais. Conheça a prática do Pilates e consulte as informações de contato disponíveis.';
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
    '<a class="button" href="'+escape(url||'#vivace')+'">'+(url?'Falar com a equipe':'Conheça a Vivace')+'</a>'+
    '</div></div>'+photo()+'</section>';
  const about='<section class="about-section" id="vivace" aria-labelledby="about-title"><div class="container about-layout">'+
    '<div><h2 id="about-title">'+escape(site.copy.aboutTitle)+'</h2></div>'+
    '<div class="about-copy" data-reveal><p class="about-lead">'+escape(site.copy.aboutDescription)+'</p>'+
    '<a class="text-link" href="#pilates">Conheça o Pilates</a></div></div></section>';
  const principles='<section class="pilates-section" id="pilates" aria-labelledby="pilates-title"><div class="container pilates-layout">'+
    '<div class="pilates-heading"><h2 id="pilates-title">Pilates.</h2><p>Pilates combina movimento, respiração e controle, com atenção à execução de cada exercício.</p></div>'+
    '<div class="principles" data-reveal><article><h3>Respiração</h3><p>A respiração acompanha o movimento e faz parte da prática.</p></article>'+
    '<article><h3>Controle</h3><p>Movimentos conscientes, com atenção à execução e à precisão.</p></article>'+
    '<article><h3>Concentração</h3><p>Atenção ao corpo e ao movimento durante os exercícios.</p></article>'+
    '<p class="educational-note">Sobre a prática do Pilates. As modalidades oferecidas pela Vivace ainda estão em confirmação.</p></div></div></section>';
  const differentials=site.differentials.length?'<section class="differentials-section"><div class="container"><h2>Na Vivace</h2>'+
    '<div class="editorial-list">'+site.differentials.map(d=>'<article><h3>'+escape(d.title)+'</h3><p>'+escape(d.description)+'</p></article>').join('')+'</div></div></section>':'';
  const faq=site.faq.length?'<section class="faq-section"><div class="container faq"><h2>Perguntas frequentes</h2>'+
    site.faq.map(f=>'<details><summary>'+escape(f.question)+'</summary><p>'+escape(f.answer)+'</p></details>').join('')+'</div></section>':'';
  return document(hero+about+principles+differentials+faq+contactSection(),options);
}
export function render404(options={}) {
  return document('<section class="not-found container"><p class="error-code">404</p><h1>Página não<br>encontrada.</h1>'+
    '<p>Este endereço não existe ou pode ter mudado.</p><a class="button" href="/">Voltar para o início</a></section>',{...options,notFound:true});
}


