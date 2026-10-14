(() => {
  const header=document.querySelector('.header');
  const trigger=document.querySelector('.menu-toggle');
  const navigation=document.querySelector('#main-nav');
  const mobile=window.matchMedia('(max-width: 767px)');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const ownedAnimations=new Set();

  function animate(element,frames,options) {
    if(reduced.matches||!element.animate)return;
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

  // O conteúdo fica visível antes, durante e sem a execução das animações.
  document.querySelectorAll('[data-intro]').forEach(element=>
    animate(element,[{opacity:.65,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:550}));

  if('IntersectionObserver' in window){
    const reveal=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        animate(entry.target,[{opacity:.6,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}]);
        reveal.unobserve(entry.target);
      });
    },{threshold:.12});
    document.querySelectorAll('[data-reveal]').forEach(element=>reveal.observe(element));

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
  reduced.addEventListener('change',event=>{
    if(event.matches)ownedAnimations.forEach(animation=>animation.cancel());
  });
})();
