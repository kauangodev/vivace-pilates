(() => {
  const header=document.querySelector('.header');
  const trigger=document.querySelector('.menu-toggle');
  const navigation=document.querySelector('#main-nav');
  const mobile=window.matchMedia('(max-width: 767px)');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktopPhoto=window.matchMedia('(min-width:1100px) and (hover:hover) and (pointer:fine)');
  const ownedAnimations=new Set();

  function animate(element,frames,options={}) {
    if(!element||reduced.matches||!element.animate)return;
    const animation=element.animate(frames,{duration:480,easing:'cubic-bezier(.2,.65,.3,1)',...options});
    ownedAnimations.add(animation);
    animation.finished.catch(()=>{}).finally(()=>ownedAnimations.delete(animation));
  }

  if(header&&trigger&&navigation){
    let open=false;
    function setOpen(value,returnFocus=false){
      open=value;
      trigger.setAttribute('aria-expanded',String(value));
      trigger.querySelector('.menu-label').textContent=value?'Fechar':'Menu';
      header.toggleAttribute('data-menu-open',value);
      navigation.hidden=mobile.matches&&!value;
      if(value)animate(navigation,[{opacity:.5,transform:'translateY(-6px)'},{opacity:1,transform:'translateY(0)'}],{duration:240});
      if(returnFocus)trigger.focus();
    }
    function sync(){trigger.hidden=!mobile.matches;setOpen(false);}
    trigger.addEventListener('click',()=>setOpen(!open));
    navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
      if(!mobile.matches)return;
      const hash=new URL(link.href).hash;
      const target=hash?document.getElementById(hash.slice(1)):null;
      setOpen(false);
      if(target){
        target.setAttribute('tabindex','-1');
        target.focus({preventScroll:true});
        target.addEventListener('blur',()=>target.removeAttribute('tabindex'),{once:true});
      }
    }));
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&open)setOpen(false,true);});
    document.addEventListener('click',event=>{if(open&&!header.contains(event.target))setOpen(false);});
    mobile.addEventListener('change',sync);sync();
  }

  // Conteúdo visível também antes do JS e se o movimento for interrompido.
  function revealTitle(element){
    animate(element,[{opacity:.96},{opacity:1}],{duration:650});
    element.querySelectorAll('.title-line, :scope > span').forEach((line,index)=>animate(line,
      [{opacity:.9,transform:'translateY(16px)'},{opacity:1,transform:'translateY(0)'}],
      {duration:650,delay:index*80}));
  }
  document.querySelectorAll('[data-intro]').forEach(revealTitle);
  document.querySelectorAll('[data-hero-copy]').forEach(element=>animate(element,
    [{opacity:.9,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:600,delay:120}));
  document.querySelectorAll('[data-image-intro]').forEach(element=>{
    animate(element,[{opacity:.8,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:750,delay:80});
    animate(element.querySelector('img'),[{transform:'scale(1.03)'},{transform:'scale(1)'}],{duration:900,delay:80});
  });
  document.querySelectorAll('.faq details, .service-details').forEach(details=>{
    details.addEventListener('toggle',()=>{
      if(details.open)animate(details.querySelector('.faq-answer, .details-content'),
        [{opacity:.65,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:240});
    });
  });

  if('IntersectionObserver' in window){
    const steps=[...document.querySelectorAll('[data-guide-step]')];
    const stepReveal=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        animate(entry.target,[{opacity:.9,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}]);
        stepReveal.unobserve(entry.target);
      });
    },{threshold:.18});
    const stepReading=new IntersectionObserver(entries=>{
      const visible=entries.filter(entry=>entry.isIntersecting);
      if(!visible.length)return;
      const nearest=visible.sort((a,b)=>Math.abs(a.boundingClientRect.top+a.boundingClientRect.height/2-innerHeight/2)-Math.abs(b.boundingClientRect.top+b.boundingClientRect.height/2-innerHeight/2))[0];
      steps.forEach(step=>step.toggleAttribute('data-current-step',step===nearest.target));
    },{rootMargin:'-35% 0px -35% 0px'});
    steps.forEach(step=>{stepReveal.observe(step);stepReading.observe(step);});
    const reveal=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        const element=entry.target;
        if(element.hasAttribute('data-title-reveal'))revealTitle(element);
        else if(element.hasAttribute('data-photo-reveal')){
          animate(element,[{opacity:.75,transform:'translateY(16px)'},{opacity:1,transform:'translateY(0)'}],{duration:650});
          animate(element.querySelector('img'),[{transform:'scale(1.035)'},{transform:'scale(1)'}],{duration:800});
        }else animate(element,[{opacity:.65,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}]);
        reveal.unobserve(element);
      });
    },{threshold:.12});
    document.querySelectorAll('[data-reveal], [data-title-reveal], [data-photo-reveal]').forEach(element=>reveal.observe(element));

    if(navigation){
      const sections=[...document.querySelectorAll('main section[id]')];
      const active=new IntersectionObserver(entries=>{
        const visible=entries.filter(entry=>entry.isIntersecting);
        if(!visible.length)return;
        const id=visible[visible.length-1].target.id;
        navigation.querySelectorAll('a').forEach(link=>{
          if(new URL(link.href).hash==='#'+id)link.setAttribute('aria-current','location');
          else link.removeAttribute('aria-current');
        });
      },{rootMargin:'-100px 0px -50% 0px',threshold:0});
      sections.forEach(section=>active.observe(section));
    }
  }

  // Um único plano fotográfico, com deslocamento limitado a 8 px no desktop.
  const heroPhoto=document.querySelector('.hero-photo .photo-window');
  const photoSurface=heroPhoto?.querySelector('.photo-surface');
  let photoVisible=false,frame=null;
  function updatePhoto(){
    frame=null;
    if(!photoSurface)return;
    if(reduced.matches||!desktopPhoto.matches||!photoVisible){photoSurface.style.transform='';return;}
    const rect=heroPhoto.getBoundingClientRect();
    const offset=Math.max(-8,Math.min(8,(innerHeight/2-rect.top-rect.height/2)*.012));
    photoSurface.style.transform='translateY('+offset.toFixed(2)+'px) scale(1.025)';
  }
  function schedulePhoto(){
    if(frame!==null)return;
    frame=requestAnimationFrame(updatePhoto);
  }
  if(heroPhoto&&'IntersectionObserver' in window){
    new IntersectionObserver(entries=>{photoVisible=entries[0].isIntersecting;schedulePhoto();}).observe(heroPhoto);
    addEventListener('scroll',()=>{if(photoVisible&&desktopPhoto.matches&&!reduced.matches)schedulePhoto();},{passive:true});
    addEventListener('resize',schedulePhoto,{passive:true});
    desktopPhoto.addEventListener('change',schedulePhoto);
  }
  reduced.addEventListener('change',event=>{
    if(event.matches)ownedAnimations.forEach(animation=>animation.cancel());
    schedulePhoto();
  });

  // Ampliação progressiva: sem suporte ao dialog, o link abre o arquivo local.
  const dialog=document.querySelector('.photo-dialog');
  const gallery=[...document.querySelectorAll('[data-gallery]')];
  if(dialog&&typeof dialog.showModal==='function'&&gallery.length){
    const media=dialog.querySelector('.dialog-media');
    const caption=dialog.querySelector('.dialog-caption');
    const counter=dialog.querySelector('.dialog-counter');
    let current=0,initiator=null;
    function showPhoto(index){
      current=(index+gallery.length)%gallery.length;
      const link=gallery[current];
      const original=link.querySelector('img');
      const image=new Image();
      image.alt=original.alt;
      image.src=link.href;
      media.replaceChildren(image);
      caption.textContent=link.dataset.caption;
      counter.textContent=(current+1)+' de '+gallery.length;
      image.decode().then(()=>{
        if(media.contains(image))animate(image,[{opacity:.6},{opacity:1}],{duration:260});
      }).catch(()=>{});
    }
    gallery.forEach((link,index)=>link.addEventListener('click',event=>{
      if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||event.button!==0)return;
      event.preventDefault();
      initiator=link;showPhoto(index);dialog.showModal();
      animate(dialog,[{opacity:.7,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:220});
    }));
    dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
    dialog.querySelector('.dialog-previous').addEventListener('click',()=>showPhoto(current-1));
    dialog.querySelector('.dialog-next').addEventListener('click',()=>showPhoto(current+1));
    dialog.addEventListener('keydown',event=>{
      if(event.key==='Tab'){
        const controls=[...dialog.querySelectorAll('button:not([disabled]), a[href], [tabindex="0"]')].filter(control=>control.getClientRects().length);
        const first=controls[0],last=controls[controls.length-1];
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
      }
      if(event.key==='ArrowLeft'){event.preventDefault();showPhoto(current-1);}
      if(event.key==='ArrowRight'){event.preventDefault();showPhoto(current+1);}
    });
    dialog.addEventListener('click',event=>{
      if(event.target!==dialog)return;
      const rect=dialog.getBoundingClientRect();
      if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();
    });
    dialog.addEventListener('close',()=>{media.replaceChildren();initiator?.focus({preventScroll:true});});
  }
})();
