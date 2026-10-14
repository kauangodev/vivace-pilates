import {escape} from './components.mjs';

export function photograph(photo,{className='',sizes='(max-width:767px) calc(100vw - 48px), 45vw',eager=false,reveal=true,caption=null}={}) {
  const srcset=photo.variants.map(variant=>variant.src+' '+variant.width+'w').join(', ');
  const label=caption||(photo.kind==='institutional'?'Registro da Vivace':'Fotografia ilustrativa · não é um atendimento da Vivace');
  return '<figure class="editorial-photo '+escape(className)+'"'+(reveal?' data-photo-reveal':'')+'>'+
    '<div class="photo-window"'+(eager?' data-image-intro':'')+'><a class="photo-link" href="'+escape(photo.src)+'" data-gallery data-caption="'+escape(label+' · '+photo.credit)+'" aria-label="Ampliar fotografia: '+escape(label)+'"><div class="photo-surface"><img src="'+escape(photo.src)+'" srcset="'+escape(srcset)+'" sizes="'+escape(sizes)+
    '" width="'+photo.width+'" height="'+photo.height+'" alt="'+escape(photo.alt)+'" decoding="async"'+
    (eager?' fetchpriority="high"':' loading="lazy" fetchpriority="low"')+'></div></a></div>'+
    '<figcaption><span>'+escape(label)+'</span><a href="'+escape(photo.source)+'">'+escape(photo.credit)+'</a></figcaption></figure>';
}

export function preloadPhotograph(photo,sizes){
  const srcset=photo.variants.map(variant=>variant.src+' '+variant.width+'w').join(', ');
  return '<link rel="preload" as="image" href="'+escape(photo.src)+'" imagesrcset="'+escape(srcset)+'" imagesizes="'+escape(sizes)+'" fetchpriority="high">';
}
