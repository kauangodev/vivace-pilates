(() => {
  function mount() {
    const disposers=[],observers=[];
    const listen=(target,type,handler,options)=>{
      if(!target)return;
      target.addEventListener(type,handler,options);
      disposers.push(()=>target.removeEventListener(type,handler,options));
    };
    const compact=matchMedia('(max-width:959px)');
    const reduced=matchMedia('(prefers-reduced-motion:reduce)');
    const fine=matchMedia('(min-width:1100px) and (hover:hover) and (pointer:fine)');
    const styles=getComputedStyle(document.documentElement);
    const timing=name=>parseFloat(styles.getPropertyValue('--motion-'+name))||240;
    const ease=styles.getPropertyValue('--motion-ease').trim()||'ease-out';
    const distance=()=>compact.matches?8:20;
    const animations=new Set();
    let disposed=false;

    // Um único contrato de movimento para cenas e interações.
    function run(element,frames,{preset='copy',...options}={}) {
      if(!element?.animate||reduced.matches||document.hidden||disposed)return null;
      const animation=element.animate(frames,{duration:timing(preset),easing:ease,...options});
      animations.add(animation);
      animation.finished.catch(()=>{}).finally(()=>animations.delete(animation));
      return animation;
    }
    const cancel=()=>animations.forEach(animation=>animation.cancel());
    const seen=new WeakSet();
    function reveal(element,{type='copy',order=0,direction='right'}={}) {
      if(seen.has(element)||element.dataset.motionState==='done')return;
      seen.add(element);
      element.dataset.motion=type;
      element.dataset.motionState='running';
      const delay=compact.matches?0:Math.min(order,4)*64;
      const created=[];
      const add=(target,frames,options)=>{const animation=run(target,frames,{delay,...options});if(animation)created.push(animation);};
      if(type==='title'){
        const lines=element.querySelectorAll('.title-line, :scope > span');
        if(lines.length){
          add(element,[{opacity:.98},{opacity:1}],{preset:'title'});
          lines.forEach((line,index)=>add(line,[{transform:'translateY('+distance()+'px)'},{transform:'translateY(0)'}],{preset:'title',delay:delay+index*70}));
        }else add(element,[{opacity:.98,transform:'translateY('+distance()+'px)'},{opacity:1,transform:'translateY(0)'}],{preset:'title'});
      }else if(type==='photo'){
        const window=element.querySelector('.photo-window');
        const lateral=element.closest('.service-fisioterapia');
        if(!compact.matches&&CSS.supports('clip-path','inset(0 0 8% 0)')){
          add(window,[{clipPath:lateral?'inset(0 9% 0 0)':'inset(0 0 9% 0)'},{clipPath:'inset(0 0 0 0)'}],{preset:'photo'});
        }else add(window,[{opacity:.96,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{preset:'photo',duration:560});
      }else{
        const lateral=(type==='side'||type==='row')&&!compact.matches;
        const offset=(direction==='left'?-1:1)*distance();
        const from=lateral?'translateX('+offset+'px)':'translateY('+distance()+'px)';
        add(element,[{opacity:.98,transform:from},{opacity:1,transform:'translate(0)'}],{preset:type==='control'?'control':'copy'});
      }
      Promise.allSettled(created.map(animation=>animation.finished)).then(()=>{element.dataset.motionState='done';});
    }
    const sceneObserver=typeof IntersectionObserver==='function'?new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        const element=entry.target;
        reveal(element,{type:element.dataset.motion,order:Number(element.dataset.motionOrder)||0,direction:element.dataset.motionDirection});
        sceneObserver.unobserve(element);
      });
    },{threshold:.14,rootMargin:'0px 0px -5% 0px'}):null;
    if(sceneObserver)observers.push(sceneObserver);
    const registered=new WeakSet();
    function register(element,type='copy',order=0,direction='right'){
      if(!element||registered.has(element))return;
      registered.add(element);
      element.dataset.motion=element.dataset.motion||type;
      element.dataset.motionOrder=String(order);
      element.dataset.motionDirection=direction;
      if(sceneObserver)sceneObserver.observe(element);
      else element.dataset.motionState='done';
    }
    document.querySelectorAll('[data-motion-sequence]').forEach(sequence=>{
      [...sequence.children].forEach((element,index)=>{
        const title=/^H[1-6]$/.test(element.tagName);
        const control=element.matches('a,button,details');
        const type=title?'title':element.tagName==='ARTICLE'?'row':control?'control':sequence.dataset.motionDirection?'side':'copy';
        register(element,type,index,sequence.dataset.motionDirection||'right');
      });
    });
    document.querySelectorAll('[data-title-reveal], [data-motion="title"]').forEach(element=>register(element,'title'));
    document.querySelectorAll('[data-photo-reveal]').forEach((element,index)=>register(element,'photo',index%2));
    document.querySelectorAll('[data-reveal]').forEach(element=>register(element));
    document.querySelectorAll('[data-guide-step]').forEach((element,index)=>register(element,'row',index));
    register(document.querySelector('.footer-top .brand'),'copy');
    register(document.querySelector('.footer-top .top-link'),'control');
    register(document.querySelector('.footer-bottom'),'copy');

    // O hero fica completamente legível durante toda a sequência de 880 ms.
    const intro=document.querySelector('[data-intro]');
    if(intro){
      const lines=intro.querySelectorAll('.title-line');
      run(intro,[{opacity:.98},{opacity:1}],{preset:'title'});
      lines.forEach((line,index)=>run(line,[{transform:'translateY('+distance()+'px)'},{transform:'translateY(0)'}],{preset:'title',delay:index*70}));
    }
    const heroCopy=document.querySelector('[data-hero-copy]');
    if(heroCopy){
      run(heroCopy.querySelector('p'),[{opacity:.98,transform:'translateY('+distance()+'px)'},{opacity:1,transform:'translateY(0)'}],{preset:'copy',delay:140});
      heroCopy.querySelectorAll('a').forEach((link,index)=>run(link,[{transform:'translateY(8px)'},{transform:'translateY(0)'}],{preset:'control',delay:220+index*40}));
    }
    document.querySelectorAll('[data-image-intro]').forEach(element=>run(element,
      [{opacity:.96,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{preset:'hero'}));

    const header=document.querySelector('.header');
    const trigger=document.querySelector('.menu-toggle');
    const navigation=document.querySelector('#main-nav');
    let menuOpen=false,menuRevision=0;
    function fitMenu(){
      if(menuOpen&&compact.matches){
        navigation.style.maxHeight=Math.max(80,(window.visualViewport?.height||innerHeight)-header.getBoundingClientRect().bottom)+'px';
      }
    }
    function setMenu(value,{immediate=false,returnFocus=false}={}){
      const revision=++menuRevision;
      menuOpen=value;
      trigger.setAttribute('aria-expanded',String(value));
      trigger.querySelector('.menu-label').textContent=value?'Fechar':'Menu';
      header.toggleAttribute('data-menu-open',value);
      if(returnFocus||(!value&&navigation.contains(document.activeElement)))trigger.focus({preventScroll:true});
      navigation.inert=!value&&compact.matches;
      if(value){
        navigation.hidden=false;fitMenu();
        run(navigation,[{opacity:.98,transform:'translateY(-8px)'},{opacity:1,transform:'translateY(0)'}],{preset:'control'});
        navigation.querySelectorAll('a').forEach((link,index)=>run(link,
          [{transform:'translateX(-8px)'},{transform:'translateX(0)'}],{preset:'control',delay:index*24}));
      }else{
        const finish=()=>{if(revision===menuRevision){navigation.hidden=compact.matches;navigation.style.maxHeight='';}};
        const exit=!immediate&&compact.matches&&!navigation.hidden?run(navigation,
          [{opacity:1,transform:'translateY(0)'},{opacity:.98,transform:'translateY(-6px)'}],{preset:'control',duration:160}):null;
        if(exit)exit.finished.catch(()=>{}).then(finish);
        else finish();
      }
    }
    if(header&&trigger&&navigation){
      header.setAttribute('data-enhanced','');
      function syncNavigation(){
        const hadFocus=document.activeElement===trigger;
        trigger.hidden=!compact.matches;
        setMenu(false,{immediate:true});
        navigation.inert=false;
        if(compact.matches)navigation.inert=true;
        if(hadFocus&&!compact.matches)navigation.querySelector('a')?.focus({preventScroll:true});
      }
      listen(trigger,'click',()=>setMenu(!menuOpen));
      listen(compact,'change',syncNavigation);
      listen(document,'keydown',event=>{if(event.key==='Escape'&&menuOpen)setMenu(false,{returnFocus:true});});
      listen(document,'click',event=>{if(menuOpen&&!header.contains(event.target))setMenu(false);});
      listen(document,'focusin',event=>{if(menuOpen&&!header.contains(event.target))setMenu(false);});
      navigation.querySelectorAll('a').forEach(link=>listen(link,'click',()=>{
        if(!compact.matches)return;
        const target=document.getElementById(new URL(link.href).hash.slice(1));
        setMenu(false,{immediate:true});
        if(target){
          target.setAttribute('tabindex','-1');
          target.focus({preventScroll:true});
          listen(target,'blur',()=>target.removeAttribute('tabindex'),{once:true});
        }
      }));
      syncNavigation();
    }
    clearTimeout(window.vivaceNavFallback);
    delete window.vivaceNavFallback;
    document.documentElement.removeAttribute('data-nav-pending');

    document.querySelectorAll('.faq details, .service-details, .guide-details').forEach(details=>{
      listen(details,'toggle',()=>{
        if(details.open)run(details.querySelector('.faq-answer, .details-content, .guide-answer'),
          [{opacity:.98,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{preset:'control'});
      });
    });

    if(typeof IntersectionObserver==='function'){
      const steps=[...document.querySelectorAll('[data-guide-step]')];
      const reading=new IntersectionObserver(entries=>{
        const visible=entries.filter(entry=>entry.isIntersecting);
        if(!visible.length)return;
        const nearest=visible.sort((a,b)=>Math.abs(a.boundingClientRect.top+a.boundingClientRect.height/2-innerHeight/2)-Math.abs(b.boundingClientRect.top+b.boundingClientRect.height/2-innerHeight/2))[0];
        steps.forEach(step=>step.toggleAttribute('data-current-step',step===nearest.target));
      },{rootMargin:'-25% 0px -25% 0px'});
      steps.forEach(step=>reading.observe(step));observers.push(reading);
      if(navigation){
        const active=new IntersectionObserver(entries=>{
          const visible=entries.filter(entry=>entry.isIntersecting);
          if(!visible.length)return;
          const id=visible[visible.length-1].target.id;
          navigation.querySelectorAll('a').forEach(link=>{
            if(new URL(link.href).hash==='#'+id)link.setAttribute('aria-current','location');
            else link.removeAttribute('aria-current');
          });
        },{rootMargin:'-112px 0px -50% 0px'});
        document.querySelectorAll('main section[id]').forEach(section=>active.observe(section));
        observers.push(active);
      }
    }

    const dialog=document.querySelector('.photo-dialog');
    const heroPhoto=document.querySelector('.hero-photo .photo-window');
    const photoSurface=heroPhoto?.querySelector('.photo-surface');
    let photoVisible=false,frame=null;
    function updatePhoto(){
      frame=null;
      if(!photoSurface)return;
      if(reduced.matches||!fine.matches||!photoVisible||document.hidden||dialog?.open){
        photoSurface.style.transform='';return;
      }
      const rect=heroPhoto.getBoundingClientRect();
      const offset=Math.max(-8,Math.min(8,(innerHeight/2-rect.top-rect.height/2)*.012));
      photoSurface.style.transform='translateY('+offset.toFixed(2)+'px) scale(1.025)';
    }
    function schedulePhoto(){if(frame===null&&!disposed)frame=requestAnimationFrame(updatePhoto);}
    if(heroPhoto&&typeof IntersectionObserver==='function'){
      const view=new IntersectionObserver(entries=>{photoVisible=entries[0].isIntersecting;schedulePhoto();});
      view.observe(heroPhoto);observers.push(view);
      listen(window,'scroll',()=>{if(photoVisible&&fine.matches&&!reduced.matches)schedulePhoto();},{passive:true});
      listen(fine,'change',schedulePhoto);
    }
    listen(window,'resize',()=>{fitMenu();schedulePhoto();},{passive:true});
    listen(window.visualViewport,'resize',fitMenu,{passive:true});
    listen(reduced,'change',event=>{if(event.matches)cancel();schedulePhoto();});
    listen(document,'visibilitychange',()=>{if(document.hidden)cancel();schedulePhoto();});

    // A troca preserva a foto anterior até a nova estar decodificada.
    const gallery=[...document.querySelectorAll('[data-gallery]')];
    let galleryRevision=0;
    if(dialog&&typeof dialog.showModal==='function'&&gallery.length){
      const media=dialog.querySelector('.dialog-media');
      const caption=dialog.querySelector('.dialog-caption');
      const counter=dialog.querySelector('.dialog-counter');
      let current=0,initiator=null;
      async function showPhoto(index,{initial=false}={}){
        current=(index+gallery.length)%gallery.length;
        const revision=++galleryRevision;
        media.setAttribute('aria-busy','true');
        const link=gallery[current],original=link.querySelector('img');
        const image=new Image();
        image.alt=original.alt;image.src=link.href;
        if(initial){
          const immediate=original.cloneNode();
          immediate.removeAttribute('srcset');immediate.removeAttribute('sizes');immediate.removeAttribute('loading');
          immediate.src=original.currentSrc||original.src;
          media.replaceChildren(immediate);
          caption.textContent=link.dataset.caption;counter.textContent=(current+1)+' de '+gallery.length;
        }
        try{await image.decode();}catch{if(revision===galleryRevision){media.removeAttribute('aria-busy');counter.textContent='Não foi possível carregar';}return;}
        if(revision!==galleryRevision||disposed||!dialog.open)return;
        media.removeAttribute('aria-busy');
        const old=media.querySelector('img');
        caption.textContent=link.dataset.caption;counter.textContent=(current+1)+' de '+gallery.length;
        if(old&&!initial&&!reduced.matches&&image.animate){
          old.setAttribute('aria-hidden','true');
          media.replaceChildren(old,image);
          run(image,[{opacity:0,transform:'translateX(6px)'},{opacity:1,transform:'translateX(0)'}],{preset:'control'});
          const exit=run(old,[{opacity:1},{opacity:0}],{preset:'control',duration:180});
          if(exit)exit.finished.catch(()=>{}).then(()=>old.remove());
          else old.remove();
        }else media.replaceChildren(image);
      }
      gallery.forEach((link,index)=>listen(link,'click',event=>{
        if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||event.button!==0)return;
        event.preventDefault();initiator=link;
        dialog.showModal();showPhoto(index,{initial:true});schedulePhoto();
        run(dialog,[{opacity:.98,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{preset:'control'});
      }));
      listen(dialog.querySelector('.dialog-close'),'click',()=>dialog.close());
      listen(dialog.querySelector('.dialog-previous'),'click',()=>showPhoto(current-1));
      listen(dialog.querySelector('.dialog-next'),'click',()=>showPhoto(current+1));
      listen(dialog,'keydown',event=>{
        if(event.key==='Tab'){
          const controls=[...dialog.querySelectorAll('button:not([disabled]),a[href],[tabindex="0"]')].filter(control=>control.getClientRects().length);
          const first=controls[0],last=controls[controls.length-1];
          if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
          else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
        }
        if(event.key==='ArrowLeft'){event.preventDefault();showPhoto(current-1);}
        if(event.key==='ArrowRight'){event.preventDefault();showPhoto(current+1);}
      });
      listen(dialog,'click',event=>{
        if(event.target!==dialog)return;
        const rect=dialog.getBoundingClientRect();
        if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();
      });
      listen(dialog,'close',()=>{galleryRevision++;media.replaceChildren();initiator?.focus({preventScroll:true});schedulePhoto();});
    }
    return ()=>{
      disposed=true;galleryRevision++;menuRevision++;
      if(frame!==null)cancelAnimationFrame(frame);
      if(dialog?.open)dialog.close();
      cancel();observers.forEach(observer=>observer.disconnect());disposers.forEach(dispose=>dispose());
      if(photoSurface)photoSurface.style.transform='';
    };
  }
  let dispose=mount();
  addEventListener('pagehide',()=>dispose());
  addEventListener('pageshow',event=>{if(event.persisted)dispose=mount();});
})();
