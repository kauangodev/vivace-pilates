import {createRequire} from 'node:module';
import {writeFile,readFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/kauan/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base='http://127.0.0.1:4173';
const browser=await chromium.launch({headless:true});
const profileOnly=process.argv.includes('--profile-only');
const result=profileOnly?JSON.parse(await readFile('docs/motion-validation.json','utf8')):{timestamp:new Date().toISOString(),node:process.versions.node,checks:[]};
if(profileOnly){result.profilePrevious=result.profile;result.profileUpdatedAt=new Date().toISOString();}
try{
 if(!profileOnly){
 const page=await browser.newPage({reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 const widths=[320,375,390,430,540,600,639,640,700,767,768,820,899,900,959,960,1024,1100,1199,1200,1280,1440,1600,1920];
 result.layouts=[];
 for(const width of widths){
  await page.setViewportSize({width,height:900});
  await page.goto(base+'/?motion='+width,{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  const layout=await page.evaluate(()=>{
   const box=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};};
   return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,menu:!document.querySelector('.menu-toggle').hidden,navFont:getComputedStyle(document.querySelector('#main-nav a')).fontSize,bodyFont:getComputedStyle(document.querySelector('.service-description')).fontSize,heroPhoto:box(document.querySelector('.hero-photo .photo-window')),heroCopy:box(document.querySelector('.hero-intro')),heroSource:document.querySelector('.hero-photo img').currentSrc.split('/').pop(),scenes:document.querySelectorAll('[data-motion]').length};
  });
  assert.equal(layout.scrollWidth<=width,true);assert.equal(layout.menu,width<960);assert.equal(parseFloat(layout.bodyFont)>=15,true);
  result.layouts.push(layout);
  for(const detail of await page.locator('.guide-details').all()){await detail.locator('summary').click();assert.equal(await detail.evaluate(e=>e.open),true);}
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 }
 result.checks.push('24 larguras; nenhum overflow, inclusive com os três passos abertos');

 // O painel não desloca a página e permanece utilizável em telas baixas.
 result.menus=[];
 for(const viewport of [{width:320,height:568},{width:768,height:500},{width:959,height:600}]){
  await page.setViewportSize(viewport);await page.goto(base+'/?menu='+viewport.width,{waitUntil:'networkidle'});
  const before=await page.locator('.header').evaluate(e=>e.getBoundingClientRect().height);
  await page.locator('.menu-toggle').focus();await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  assert.equal(await page.locator('#main-nav a').first().evaluate(e=>document.activeElement===e),true);
  const nav=await page.locator('#main-nav').evaluate(e=>({bottom:e.getBoundingClientRect().bottom,height:innerHeight,scrollable:e.scrollHeight>=e.clientHeight}));
  assert.equal(nav.bottom<=nav.height+1,true);
  assert.equal(await page.locator('.header').evaluate(e=>e.getBoundingClientRect().height),before);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.menu-toggle').evaluate(e=>document.activeElement===e),true);
  await page.waitForFunction(()=>document.querySelector('#main-nav').hidden);
  await page.locator('.menu-toggle').click();await page.setViewportSize({width:1024,height:700});
  assert.equal(await page.locator('.menu-toggle').isVisible(),false);
  assert.equal(await page.locator('#main-nav').isVisible(),true);
  assert.equal(await page.locator('#main-nav').evaluate(e=>e.inert),false);
  result.menus.push({viewport,fixedHeader:true,keyboard:true,resize:true});
 }
 result.checks.push('Menu em celular e tablet; viewport baixa, Escape, foco e mudança para desktop');

 // Uma cena é executada uma vez e preferências interrompem todo o movimento.
 const motion=await browser.newPage({reducedMotion:'no-preference',viewport:{width:1440,height:1000}});
 await motion.goto(base,{waitUntil:'domcontentloaded'});
 assert.equal(await motion.locator('[data-intro]').evaluate(e=>e.getAnimations().some(a=>a.playState==='running')),true);
 const scene=motion.locator('#servico-fisioterapia h3');
 await scene.scrollIntoViewIfNeeded();
 await motion.waitForFunction(()=>document.querySelector('#servico-fisioterapia h3').dataset.motionState==='done');
 await motion.locator('footer').scrollIntoViewIfNeeded();await scene.scrollIntoViewIfNeeded();
 assert.equal(await scene.evaluate(e=>e.getAnimations().length),0);
 await motion.goto(base+'/?cancel',{waitUntil:'domcontentloaded'});
 const activeCount=await motion.evaluate(()=>{window.cancellationAnimations=document.getAnimations();return window.cancellationAnimations.length;});
 assert.equal(activeCount>0,true);
 await motion.emulateMedia({reducedMotion:'reduce'});
 await motion.waitForFunction(()=>window.cancellationAnimations.every(animation=>animation.playState==='idle'),null,{timeout:1500});
 result.cancelledAnimations=activeCount;
 await motion.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
 assert.equal(await motion.evaluate(()=>document.getAnimations().length),0);
 assert.equal(await motion.locator('.photo-surface').first().evaluate(e=>e.style.transform),'');
 result.checks.push('Entrada do hero, cena sem repetição e cancelamento do movimento ativo');

 // Expansão nativa e foco visível nas fotos.
 await page.setViewportSize({width:390,height:844});await page.goto(base,{waitUntil:'networkidle'});
 const summary=page.locator('.guide-details summary').first();
 await summary.focus();await page.keyboard.press('Enter');
 assert.equal(await page.locator('.guide-details').first().evaluate(e=>e.open),true);
 await page.keyboard.press('Space');assert.equal(await page.locator('.guide-details').first().evaluate(e=>e.open),false);
 await page.locator('.hero-photo [data-gallery]').focus();
 assert.equal(await page.locator('.hero-photo .photo-window').evaluate(e=>getComputedStyle(e).outlineWidth),'3px');
 await page.keyboard.press('Enter');
 await page.locator('.dialog-next').click();await page.locator('.dialog-next').click();await page.locator('.dialog-previous').click();
 await page.waitForFunction(()=>document.querySelector('.dialog-counter').textContent==='2 de 6');
 await page.locator('.dialog-media img').evaluate(e=>e.decode());
 assert.match(await page.locator('.dialog-media img').getAttribute('src'),/vivace-equipment/);
 await page.keyboard.press('Escape');
 result.checks.push('Passos expansíveis, foco fotográfico e troca rápida de fotos sem resultado antigo');

 // O núcleo permanece funcional sem Web Animations / IntersectionObserver.
 const fallback=await browser.newPage({viewport:{width:768,height:600}});
 await fallback.addInitScript(()=>{Element.prototype.animate=undefined;window.IntersectionObserver=undefined;});
 await fallback.goto(base,{waitUntil:'networkidle'});await fallback.locator('.menu-toggle').click();
 await fallback.locator('#main-nav').getByRole('link',{name:'Serviços',exact:true}).click();
 assert.equal(new URL(fallback.url()).hash,'#servicos');
 await fallback.locator('.service-details summary').first().click();
 assert.equal(await fallback.locator('.service-details').first().evaluate(e=>e.open),true);
 const noJs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});
 await noJs.goto(base);
 assert.equal(await noJs.locator('#main-nav').isVisible(),true);
 await noJs.locator('.guide-details summary').first().click();
 assert.equal(await noJs.locator('.guide-details').first().evaluate(e=>e.open),true);
 const failedScript=await browser.newPage({viewport:{width:390,height:844}});
 await failedScript.route('**/app.js',route=>route.abort());
 await failedScript.goto(base,{waitUntil:'networkidle'});
 await failedScript.waitForFunction(()=>!document.documentElement.hasAttribute('data-nav-pending'));
 assert.equal(await failedScript.locator('#main-nav').isVisible(),true);
 result.checks.push('Sem JavaScript, sem APIs de animação e falha no arquivo JS: conteúdo e navegação acessíveis');

 // Comparação com a versão anterior, sem executar seu JavaScript.
 const oldHtml=execFileSync('git',['-c','safe.directory=D:/[ProjetosSite]/Vivace','show','codex/fotografia-servicos:index.html'],{encoding:'utf8'});
 const previous=await page.evaluate(html=>new DOMParser().parseFromString(html,'text/html').querySelectorAll('[data-reveal],[data-title-reveal],[data-photo-reveal],[data-guide-step],[data-intro],[data-hero-copy],[data-image-intro]').length,oldHtml);
 result.motionTargets={before:previous,after:await page.locator('[data-motion]').count()};
 assert.equal(result.motionTargets.after>result.motionTargets.before,true);
 assert.equal(errors.length,0);result.errors=errors;

 }
 // Diagnóstico controlado, separado dos testes de interação e sem cache.
 const profile=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'no-preference'});
 const cdp=await profile.context().newCDPSession(profile);
 await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
 await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:120,downloadThroughput:93750,uploadThroughput:31250,connectionType:'cellular3g'});
 const network=[];profile.on('request',request=>network.push(request.url()));
 await profile.addInitScript(()=>{
  window.vivaceProfile={lcp:null,cls:0,eventDurations:[]};
  new PerformanceObserver(list=>{const entries=list.getEntries();window.vivaceProfile.lcp=entries[entries.length-1].startTime;}).observe({type:'largest-contentful-paint',buffered:true});
  new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.vivaceProfile.cls+=e.value;}).observe({type:'layout-shift',buffered:true});
  if(PerformanceObserver.supportedEntryTypes.includes('event'))new PerformanceObserver(list=>{for(const e of list.getEntries())if(e.interactionId)window.vivaceProfile.eventDurations.push(e.duration);}).observe({type:'event',buffered:true,durationThreshold:16});
 });
 await profile.goto(base,{waitUntil:'networkidle'});await profile.evaluate(()=>document.fonts.ready);
 await profile.locator('.hero-photo img').evaluate(e=>e.decode());
 await profile.evaluate(async()=>{await Promise.all(document.getAnimations().map(a=>a.finished.catch(()=>{})));await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));});
 result.profile=await profile.evaluate(()=>({...window.vivaceProfile,heroResponseEnd:performance.getEntriesByType('resource').find(r=>r.name.includes('vivace-institution'))?.responseEnd,resourceBytes:performance.getEntriesByType('resource').reduce((sum,r)=>sum+r.encodedBodySize,0)}));
 await profile.locator('.menu-toggle').click();await profile.keyboard.press('Escape');
 await profile.locator('.guide-details summary').first().click();
 await profile.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))));
 const durations=await profile.evaluate(()=>window.vivaceProfile.eventDurations);
 result.profile.localMaxEventDuration=durations.length?Math.max(...durations):null;
 result.profile.context='Chromium local, CPU 4x, rede 750 kbps/120 ms, cache desativado; diagnóstico sintético, não dados de campo ou INP p75';
 assert.equal(network.every(url=>url.startsWith(base)),true);
 assert.equal(result.profile.cls<.1,true,'Deslocamento visual excessivo no cenário controlado');
 result.profile.externalRequests=0;
 result.profile.heroRequests=network.filter(url=>url.includes('vivace-institution')).length;
 assert.equal(result.profile.heroRequests,1,'Preload duplicou a fotografia principal');
 await writeFile('docs/motion-validation.json',JSON.stringify(result,null,2));
 console.log(JSON.stringify(result,null,2));
}finally{await browser.close();}
