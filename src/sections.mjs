import {site,whatsappLink} from '../content/site.mjs';
import {photography} from '../content/photography.mjs';
import {escape} from './components.mjs';
import {photograph} from './media.mjs';

export function aboutSection() {
  return '<section class="about-section" id="vivace" aria-labelledby="about-title"><div class="container">'+
    '<div class="about-layout"><div class="about-heading"><h2 id="about-title" data-title-reveal><span>Conheça</span> <span>a Vivace.</span></h2>'+
    '<div class="about-copy" data-reveal><p class="about-lead">'+escape(site.copy.aboutDescription)+'</p>'+
    '<p class="about-body">'+escape(site.copy.aboutBody)+'</p><p class="about-body">'+escape(site.copy.aboutExperience)+'</p>'+
    '<a class="text-link" href="#servicos">Conhecer os serviços</a></div></div>'+
    '<div class="institution-images">'+photograph(photography.equipment,{className:'institution-equipment',sizes:'(max-width:767px) calc(100vw - 48px), 42vw',caption:'Pilates no Instagram da Vivace'})+
    '<div class="institution-location">'+photograph(photography.facade,{className:'institution-facade',sizes:'(max-width:767px) calc(100vw - 48px), 330px',caption:'A fachada da Vivace'})+
    '<p>Rua Primeiro de Maio, 555<br>Centro, Igarapé.</p></div></div></div>'+
    '<div class="care-points">'+site.differentials.map(d=>'<article data-reveal><h3>'+escape(d.title)+'</h3><p>'+escape(d.description)+'</p></article>').join('')+'</div>'+
    '<p class="institution-note">Mais sobre a Vivace no <a href="'+escape(site.contact.instagram)+'">Instagram oficial</a>.</p></div></section>';
}
export function servicesSection(){
  return '<section class="services-section" id="servicos" aria-labelledby="services-title"><div class="container">'+
    '<div class="services-heading"><h2 id="services-title" data-title-reveal><span>Pilates, fisioterapia</span> <span>e LPF.</span></h2>'+
    '<p>Conheça a proposta de cada serviço. Para disponibilidade, valores e orientações de atendimento, converse com a equipe.</p></div>'+
    '<div class="service-stories">'+site.services.map(service=>{
      const photo=photography[service.photo];
      const url=whatsappLink(site.contact.whatsapp,service.message)||site.contact.instagram;
      return '<article class="service-story service-'+service.id+'" id="servico-'+service.id+'" aria-labelledby="service-title-'+service.id+'">'+
        '<div class="service-copy" data-reveal><h3 id="service-title-'+service.id+'">'+escape(service.title)+'</h3>'+
        '<p class="service-intro">'+escape(service.intro)+'</p><p class="service-description">'+escape(service.description)+'</p>'+
        '<details class="service-details"><summary>'+escape(service.detailTitle)+'</summary><div class="details-content">'+
        service.details.map(detail=>'<div><h4>'+escape(detail.title)+'</h4><p>'+escape(detail.body)+'</p></div>').join('')+
        '<p class="service-reference">Sobre a prática: <a href="'+escape(service.reference.url)+'">'+escape(service.reference.label)+'</a>.</p></div></details>'+
        '<a class="text-link service-cta" href="'+escape(url)+'">'+escape(service.cta)+'</a></div>'+
        photograph(photo,{className:'service-photo',sizes:'(max-width:767px) calc(100vw - 48px), (min-width:1600px) 720px, 48vw',caption:service.caption})+'</article>';
    }).join('')+'</div></div></section>';
}
export function educationSection() {
  const data=site.education;
  return '<section class="pilates-section" id="pilates" aria-labelledby="pilates-title"><div class="container pilates-layout">'+
    '<div class="pilates-heading"><h2 id="pilates-title">'+escape(data.title)+'</h2><p>'+escape(data.intro)+'</p></div>'+
    '<div class="principles" data-reveal>'+data.principles.map(p=>'<article><h3>'+escape(p.title)+'</h3><p>'+escape(p.description)+'</p></article>').join('')+
    '<p class="educational-note">Conteúdo sobre a prática. Referências: '+data.sources.map(s=>'<a href="'+escape(s.url)+'">'+escape(s.label)+'</a>').join(' e ')+'.</p></div></div></section>';
}
export function firstVisitSection() {
  const data=site.firstVisit;
  return '<section class="first-visit-section" id="primeira-aula" aria-labelledby="first-title"><div class="container first-layout">'+
    '<div class="first-heading"><h2 id="first-title">'+escape(data.title)+'</h2><p>'+escape(data.intro)+'</p>'+
    '<a class="text-link" href="#contato">Ver os canais de contato</a></div>'+
    '<ol class="first-steps">'+data.steps.map((step,index)=>'<li class="guide-step" data-guide-step><details class="guide-details"><summary><span class="step-number" aria-hidden="true">'+String(index+1).padStart(2,'0')+'</span>'+
      '<h3>'+escape(step.title)+'</h3></summary><div class="guide-answer"><p>'+escape(step.description)+'</p></div></details></li>').join('')+'</ol></div></section>';
}
export function faqSection() {
  if(!site.faq.length)return '';
  return '<section class="faq-section" id="duvidas" aria-labelledby="faq-title"><div class="container faq-layout">'+
    '<h2 id="faq-title">Dúvidas<br>frequentes.</h2><div class="faq">'+site.faq.map(f=>'<details><summary>'+escape(f.question)+
      '</summary><div class="faq-answer"><p>'+escape(f.answer)+'</p></div></details>').join('')+'</div></div></section>';
}
