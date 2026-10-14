import {site} from '../content/site.mjs';
import {escape} from './components.mjs';

export function aboutSection() {
  return '<section class="about-section" id="vivace" aria-labelledby="about-title"><div class="container">'+
    '<div class="about-layout"><h2 id="about-title">'+escape(site.copy.aboutTitle)+'</h2>'+
    '<div class="about-copy" data-reveal><p class="about-lead">'+escape(site.copy.aboutDescription)+'</p>'+
    '<p class="about-body">'+escape(site.copy.aboutBody)+'</p><div class="other-services"><p>Além do Pilates, a Vivace anuncia:</p><ul>'+site.services.filter(service=>service.title!=='Pilates').map(service=>'<li>'+escape(service.title)+'</li>').join('')+'</ul><p>Consulte a equipe sobre disponibilidade e condições.</p></div></div></div>'+
    '<div class="care-points">'+site.differentials.map(d=>'<article><h3>'+escape(d.title)+'</h3><p>'+escape(d.description)+'</p></article>').join('')+'</div>'+
    '<p class="institution-note">Conheça também o <a href="'+escape(site.contact.instagram)+'">Instagram oficial da Vivace</a>.</p></div></section>';
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
    '<ol class="first-steps">'+data.steps.map((step,index)=>'<li class="guide-step" data-guide-step><span class="step-number" aria-hidden="true">'+String(index+1).padStart(2,'0')+'</span>'+
      '<div><h3>'+escape(step.title)+'</h3><p>'+escape(step.description)+'</p></div></li>').join('')+'</ol></div></section>';
}
export function faqSection() {
  if(!site.faq.length)return '';
  return '<section class="faq-section" id="duvidas" aria-labelledby="faq-title"><div class="container faq-layout">'+
    '<h2 id="faq-title">Dúvidas<br>frequentes.</h2><div class="faq">'+site.faq.map(f=>'<details><summary>'+escape(f.question)+
      '</summary><div class="faq-answer"><p>'+escape(f.answer)+'</p></div></details>').join('')+'</div></div></section>';
}
