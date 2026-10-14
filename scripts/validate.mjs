import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/kauan/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true});
const base='http://127.0.0.1:4173';
const errors=[],responses=[];
const page=await browser.newPage({reducedMotion:'reduce'});
page.on('pageerror',error=>errors.push(error.message));
page.on('console',msg=>{if(msg.type()==='error' && !msg.text().includes('404'))errors.push(msg.text());});
page.on('response',response=>{if(response.status()>=400)responses.push({url:response.url(),status:response.status()});});
await mkdir('docs/screenshots',{recursive:true});
const layouts=[];
for(const width of [320,375,390,768,1024,1440,1920]){
 await page.setViewportSize({width,height:1000});
 const response=await page.goto(base,{waitUntil:'networkidle'});
 assert.equal(response.status(),200);
 await page.evaluate(()=>document.fonts.ready);
 for(const img of await page.locator('.editorial-photo img').all()){
   await img.scrollIntoViewIfNeeded();
   await img.evaluate(image=>image.decode());
 }
 await page.evaluate(()=>scrollTo(0,0));
 const layout=await page.evaluate(()=>{
 const nodes=[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left< -1)&&!e.classList.contains('skip');}).map(e=>({tag:e.tagName,className:e.className?.baseVal??e.className,right:e.getBoundingClientRect().right,left:e.getBoundingClientRect().left}));
 return {viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,overflow:nodes,heading:document.querySelectorAll('h1').length,images:[...document.images].every(i=>i.complete&&i.naturalWidth>0)};
 });
 layouts.push(layout);
 assert.equal(layout.heading,1);assert.equal(layout.images,true);
 if(width===1440)await page.screenshot({path:'docs/screenshots/desktop-1440.png',fullPage:true});
 if(width===390)await page.screenshot({path:'docs/screenshots/mobile-390.png',fullPage:true});
 if(width<768){
 const trigger=page.locator('.menu-toggle');
 assert.equal(await trigger.getAttribute('aria-expanded'),'false');
 await trigger.click();
 assert.equal(await trigger.getAttribute('aria-expanded'),'true');
 await page.keyboard.press('Escape');
 assert.equal(await trigger.getAttribute('aria-expanded'),'false');
 assert.equal(await trigger.evaluate(e=>document.activeElement===e),true);
 await trigger.click();
 await page.locator('#main-nav').getByRole('link',{name:'Pilates',exact:true}).click();
 assert.equal(await trigger.getAttribute('aria-expanded'),'false');
 assert.equal(new URL(page.url()).hash,'#pilates');
 assert.equal(await page.locator('#pilates').evaluate(e=>document.activeElement===e),true);
 }
}
await page.setViewportSize({width:390,height:844});
await page.goto(base,{waitUntil:'networkidle'});
await page.keyboard.press('Tab');
assert.equal(await page.locator('.skip').evaluate(e=>document.activeElement===e),true);
await page.keyboard.press('Enter');
assert.equal(new URL(page.url()).hash,'#conteudo'); assert.equal(await page.locator('main').evaluate(e=>document.activeElement===e),true);
await page.emulateMedia({reducedMotion:'reduce'});
assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');
const missing=await page.goto(base+'/pagina-ausente',{waitUntil:'networkidle'});
assert.equal(missing.status(),404);
assert.match(await page.title(),/Página não encontrada/);
await page.getByRole('link',{name:'Voltar para o início',exact:true}).click();
assert.equal(new URL(page.url()).pathname,'/');
const noJs=await browser.newPage({javaScriptEnabled:false,viewport:{width:320,height:900}});
await noJs.goto(base);
assert.equal(await noJs.getByRole('navigation',{name:'Navegação principal',exact:true}).isVisible(),true);
assert.equal(await noJs.locator('h1').isVisible(),true);
await noJs.locator('#main-nav').getByRole('link',{name:'A Vivace',exact:true}).click();
assert.equal(new URL(noJs.url()).hash,'#vivace');
function luminance(hex){const values=hex.match(/\w\w/g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return values[0]*.2126+values[1]*.7152+values[2]*.0722;}
const contrasts=[['Grafite sobre coral','242a2d','f27f53'],['Coral escuro sobre neutro da marca','b94823','f7f7f7'],['Texto secundário sobre neutro da marca','596269','f7f7f7'],['Texto de apoio sobre branco','596269','ffffff'],['Branco sobre coral escuro','ffffff','b94823'],['Marfim sobre grafite','f7f7f7','242a2d'],['Texto sobre pêssego','596269','fce7dc'],['Passo ativo sobre pêssego','8f3519','fce7dc'],['Texto de apoio sobre grafite','d4d7d8','242a2d'],['Coral da marca sobre grafite','f27f53','242a2d'],['Texto sobre faixa de prévia','596269','f3ede8'],['Texto de controle na galeria','ffffff','3d4549']].map(([label,fg,bg])=>{const a=luminance(fg),b=luminance(bg);return {label,ratio:Number(((Math.max(a,b)+.05)/(Math.min(a,b)+.05)).toFixed(2))};});
assert.equal(contrasts.every(c=>c.ratio>=4.5),true,'Contraste de texto abaixo de 4.5:1');
await page.setViewportSize({width:1440,height:1000});
await page.goto(base,{waitUntil:'networkidle'});
await page.evaluate(()=>{document.documentElement.style.zoom='2';});
const zoom=await page.evaluate(()=>({viewport:innerWidth,bodyRight:document.body.getBoundingClientRect().right,heading:document.querySelector('h1').getBoundingClientRect().right}));
assert.equal(zoom.bodyRight<=zoom.viewport+1,true,'Overflow com ampliação de 200%');

// Comportamentos novos do redesign.
await page.evaluate(()=>{document.documentElement.style.zoom='';});
await page.goto(base,{waitUntil:'networkidle'});
assert.equal(await page.locator('main svg, .button svg, .text-link svg').count(),0,'Ícones decorativos voltaram ao layout');
assert.equal(await page.locator('.image-label, .eyebrow, .principle-top').count(),0);
const anchors=await page.locator('a').evaluateAll(links=>links.map(a=>a.getAttribute('href')));
assert.equal(anchors.some(href=>href==='#'||!href),false);
const localTargets=await page.evaluate(()=>[...document.querySelectorAll('a[href*="#"]')].every(a=>{const url=new URL(a.href);return url.origin!==location.origin||!!document.getElementById(url.hash.slice(1));}));
assert.equal(localTargets,true);
const logo=await page.locator('.header .brand img').evaluate(image=>({naturalWidth:image.naturalWidth,width:image.getBoundingClientRect().width,src:image.getAttribute('src')}));
assert.equal(logo.src,'/assets/vivace-logo-original.png');
assert.equal(logo.naturalWidth>=logo.width*2,true,'Logo ultrapassa tamanho adequado para densidade 2x');
assert.match(await page.locator('link[rel="icon"]').getAttribute('href'),/vivace-logo-original\.png/);

const motionPage=await browser.newPage({reducedMotion:'no-preference'});
await motionPage.goto(base,{waitUntil:'domcontentloaded'});
const motionStarted=await motionPage.locator('[data-intro]').evaluate(element=>element.getAnimations().some(a=>a.playState==='running'));
assert.equal(motionStarted,true,'Entrada do título não foi iniciada');
await motionPage.emulateMedia({reducedMotion:'reduce'});
await motionPage.goto(base,{waitUntil:'domcontentloaded'});
assert.equal(await motionPage.locator('[data-intro]').evaluate(element=>element.getAnimations().length),0,'Movimento reduzido ainda anima o título');
assert.equal(await motionPage.evaluate(()=>getComputedStyle(document.querySelector('.hero-photo img')).transitionDuration),'0s');

const touchContext=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const touchPage=await touchContext.newPage();
await touchPage.goto(base,{waitUntil:'networkidle'});
await touchPage.locator('.menu-toggle').tap();
assert.equal(await touchPage.locator('.menu-toggle').getAttribute('aria-expanded'),'true');
await touchPage.locator('#main-nav').getByRole('link',{name:'Contato',exact:true}).tap();
assert.equal(new URL(touchPage.url()).hash,'#contato');
assert.equal(await touchPage.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
const redesign={noDecorativeArrows:true,localTargetsValid:localTargets,logo,motionStarted,reducedMotion:true,touchMenu:true};


// Verificações de conteúdo e conversão adicionados nesta branch.
await page.goto(base,{waitUntil:'networkidle'});
const whatsapp=await page.locator('.hero .button').getAttribute('href');
const whatsappUrl=new URL(whatsapp);
assert.equal(whatsappUrl.host,'wa.me');
assert.equal(whatsappUrl.pathname,'/5531996906333');
assert.equal(whatsappUrl.searchParams.get('text'),'Olá! Conheci a Vivace pelo site e gostaria de saber mais sobre as aulas de Pilates e os horários disponíveis.');
assert.equal(await page.locator('.contact-details a[href="https://www.instagram.com/vivace.igarape/"]').count(),1);
assert.equal(await page.locator('[data-guide-step]').count(),3);
assert.equal(await page.locator('.service-story').count(),3);
assert.equal(await page.getByRole('heading',{name:'Fisioterapia pélvica e ortopédica',exact:true}).count(),1);
assert.equal(await page.getByRole('heading',{name:'LPF',exact:true}).count(),1);
const mapUrl=new URL(await page.getByRole('link',{name:'Ver localização',exact:true}).getAttribute('href'));
assert.equal(mapUrl.hostname,'www.google.com');
assert.equal(mapUrl.searchParams.get('query').includes('Primeiro de Maio, 555'),true);
assert.equal(await page.locator('.contact-details address').innerText().then(text=>text.includes('Centro, Igarapé, MG')),true);
assert.equal(await page.locator('.care-points article').count(),3);
assert.equal(await page.locator('.faq details').count(),3);
const firstQuestion=page.locator('.faq details').first();
await firstQuestion.locator('summary').focus();
await page.keyboard.press('Enter');
assert.equal(await firstQuestion.evaluate(e=>e.open),true);
assert.equal(await firstQuestion.locator('.faq-answer').isVisible(),true);
await page.keyboard.press('Enter');
assert.equal(await firstQuestion.evaluate(e=>e.open),false);
assert.equal(await page.locator('body').innerText().then(text=>text.includes('aula experimental gratuita')),false);
assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'),'noindex, nofollow');
const noJsQuestion=noJs.locator('.faq details').first();
await noJsQuestion.locator('summary').click();
assert.equal(await noJsQuestion.evaluate(e=>e.open),true);

const diagnosticPage=await browser.newPage();
const network=[];
diagnosticPage.on('request',request=>network.push(request.url()));
await diagnosticPage.addInitScript(()=>{
  window.vivaceVitals={lcp:null,cls:0};
  new PerformanceObserver(list=>{const entries=list.getEntries();window.vivaceVitals.lcp=entries[entries.length-1].startTime;}).observe({type:'largest-contentful-paint',buffered:true});
  new PerformanceObserver(list=>{for(const entry of list.getEntries())if(!entry.hadRecentInput)window.vivaceVitals.cls+=entry.value;}).observe({type:'layout-shift',buffered:true});
});
await diagnosticPage.setViewportSize({width:390,height:844});
await diagnosticPage.goto(base,{waitUntil:'networkidle'});
await diagnosticPage.evaluate(()=>document.fonts.ready);
await diagnosticPage.locator('.hero-photo img').waitFor({state:'visible'});
await diagnosticPage.evaluate(async()=>{await Promise.all(document.getAnimations().map(animation=>animation.finished.catch(()=>{})));await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));});
const diagnostic=await diagnosticPage.evaluate(()=>({
  lcpMilliseconds:window.vivaceVitals.lcp,
  cls:window.vivaceVitals.cls,
  resourceBytes:performance.getEntriesByType('resource').reduce((sum,r)=>sum+r.encodedBodySize,0),
  context:'Chromium local, sem limitação de rede; valores de diagnóstico, não métricas de campo'
}));
assert.equal(network.every(url=>url.startsWith(base)),true,'Há carga automática de terceiros');
const enrichment={officialServicesVisible:true,addressAndMapVerified:true,whatsappDestinationVerified:true,instagramOfficial:true,firstVisitSteps:3,nativeFaqWithAndWithoutJs:true,noUnconfirmedFreeTrial:true,externalResourceRequests:0,diagnostic};

// Serviços com detalhes progressivos e destino específico, sem envio de mensagens.
await page.goto(base,{waitUntil:'networkidle'});
const serviceDestinations=[];
for(const id of ['pilates','fisioterapia','lpf']){
 const story=page.locator('#servico-'+id);
 const details=story.locator('.service-details');
 await details.locator('summary').focus();
 await page.keyboard.press('Enter');
 assert.equal(await details.evaluate(element=>element.open),true);
 assert.equal(await details.locator('.details-content').isVisible(),true);
 await page.keyboard.press('Enter');
 assert.equal(await details.evaluate(element=>element.open),false);
 const target=new URL(await story.locator('.service-cta').getAttribute('href'));
 assert.equal(target.host,'wa.me');
 assert.equal(target.pathname,'/5531996906333');
 assert.match(target.searchParams.get('text'),new RegExp(id==='fisioterapia'?'fisioterapia':id==='lpf'?'LPF':'Pilates'));
 serviceDestinations.push({id,number:target.pathname,message:target.searchParams.get('text')});
}
assert.equal(new Set(await page.locator('.service-photo img').evaluateAll(images=>images.map(i=>i.getAttribute('src')))).size,3);
assert.equal(await page.locator('.editorial-photo').count(),6);
assert.equal(await page.locator('.editorial-photo img[loading="lazy"]').count(),5);
assert.equal(await page.locator('.hero-photo img[fetchpriority="high"]').count(),1);
const heroAspect=await page.locator('.hero-photo').evaluate(photo=>{
 const img=photo.querySelector('img'),rect=photo.querySelector('.photo-window').getBoundingClientRect();
 return {source:img.naturalWidth/img.naturalHeight,display:rect.width/rect.height};
});
assert.equal(Math.abs(heroAspect.source-heroAspect.display)<.002,true,'A fotografia real do hero foi recortada além de sua proporção');
await page.getByRole('heading',{name:'Pilates em Igarapé.',exact:true}).waitFor();
const imageLink=page.locator('.hero-photo [data-gallery]');
await imageLink.focus();await page.keyboard.press('Enter');
const dialog=page.getByRole('dialog',{name:'Fotografias da prévia Vivace',exact:true});
assert.equal(await dialog.isVisible(),true);
assert.equal(await dialog.getByRole('button',{name:'Fechar',exact:true}).evaluate(e=>document.activeElement===e),true);
await page.locator('.dialog-media img').evaluate(image=>image.decode());
assert.equal(await page.locator('.dialog-counter').innerText(),'1 de 6');
await dialog.getByRole('button',{name:'Próxima',exact:true}).click();
assert.equal(await page.locator('.dialog-counter').innerText(),'2 de 6');
await page.keyboard.press('ArrowLeft');
assert.equal(await page.locator('.dialog-counter').innerText(),'1 de 6');
await dialog.getByRole('button',{name:'Próxima',exact:true}).focus();await page.keyboard.press('Tab');
assert.equal(await dialog.getByRole('button',{name:'Fechar',exact:true}).evaluate(e=>document.activeElement===e),true,'Foco escapou do dialog');
await page.keyboard.press('Shift+Tab');
assert.equal(await dialog.getByRole('button',{name:'Próxima',exact:true}).evaluate(e=>document.activeElement===e),true,'Shift+Tab escapou do dialog');
await page.keyboard.press('Escape');
assert.equal(await dialog.isVisible(),false);
assert.equal(await imageLink.evaluate(e=>document.activeElement===e),true,'Foco não retornou à fotografia');
await touchPage.goto(base,{waitUntil:'networkidle'});
await touchPage.locator('.hero-photo [data-gallery]').tap();
assert.equal(await touchPage.locator('.photo-dialog').isVisible(),true);
await touchPage.locator('.dialog-next').tap();
assert.equal(await touchPage.locator('.dialog-counter').innerText(),'2 de 6');
await touchPage.locator('.dialog-close').tap();
assert.equal(await touchPage.locator('.photo-dialog').isVisible(),false);
const noJsDetails=noJs.locator('.service-details').first();
await noJsDetails.locator('summary').click();assert.equal(await noJsDetails.evaluate(e=>e.open),true);
const fallback=await noJs.locator('.hero-photo [data-gallery]').getAttribute('href');
assert.match(fallback,/^\/assets\/vivace-institution-1400\.webp$/);
const imageResponse=await noJs.request.get(base+fallback);assert.equal(imageResponse.status(),200);
await motionPage.emulateMedia({reducedMotion:'no-preference'});
await motionPage.setViewportSize({width:1440,height:1000});
await motionPage.goto(base,{waitUntil:'networkidle'});
const parallaxDesktop=await motionPage.locator('.hero-photo .photo-surface').evaluate(e=>e.style.transform);
assert.match(parallaxDesktop,/translateY/);
await motionPage.emulateMedia({reducedMotion:'reduce'});
await motionPage.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
assert.equal(await motionPage.locator('.hero-photo .photo-surface').evaluate(e=>e.style.transform),'');
assert.equal(await motionPage.evaluate(()=>document.getAnimations().length),0);
await motionPage.emulateMedia({reducedMotion:'no-preference'});
await motionPage.setViewportSize({width:390,height:844});
await motionPage.goto(base,{waitUntil:'networkidle'});
assert.equal(await motionPage.locator('.hero-photo .photo-surface').evaluate(e=>e.style.transform),'');
const evolution={serviceDestinations,distinctServicePhotos:true,institutionalPhotos:3,illustrativePhotos:3,lazyPhotos:5,heroAspect,photoDialogKeyboard:true,photoDialogTouch:true,focusTrapAndReturn:true,noJsImageFallback:true,noJsServiceDetails:true,parallaxDesktop,reducedMotionCancelsAll:true,mobileParallaxDisabled:true};
const result={layouts,errors,responses,contrasts,zoom,redesign,enrichment,evolution,checks:['Menu em todas as larguras mobile: abertura, Escape, foco e navegação','Link para pular ao conteúdo','Movimento reduzido','404 com status correto e retorno','Conteúdo e navegação sem JavaScript'],timestamp:new Date().toISOString()};
await writeFile('docs/validation.json',JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
await browser.close();
assert.equal(errors.length,0);
assert.equal(layouts.every(l=>l.scrollWidth<=l.viewport+1),true,'Há overflow horizontal');
