/* Feature workspace and accessible galleries share the guide's controls. */
(() => {
 'use strict';
 const root=document.querySelector('.xn-profile-feature');
 if(!root)return;
 const lang=document.documentElement.lang.split('-')[0];
 const words={
  en:['Enlarge image','Previous image','Next image'],
  pt:['Ampliar imagem','Imagem anterior','Próxima imagem'],
  es:['Ampliar imagen','Imagen anterior','Siguiente imagen'],
  fr:['Agrandir l’image','Image précédente','Image suivante'],
  it:['Ingrandisci immagine','Immagine precedente','Immagine successiva']
 }[lang] || ['Enlarge image','Previous image','Next image'];
 const sections=[...root.querySelectorAll('.xn-feature-section')];
 const profileSections=['choose','overview','customize','avatar','color','backgrounds'];
 const sectionNames=sections.map((section,index)=>section.dataset.featureSection || profileSections[index]);
 const targets=document.querySelector('[data-feature-subsections]');
 const navigation=document.querySelector('.xn-feature-navigation');
 const mobile=matchMedia('(max-width:900px)');
 const sidebar=document.querySelector('.xn-feature-sidebar');
 const navBody=navigation?.querySelector('nav');
 const selector=document.createElement('button');selector.type='button';selector.className='xn-feature-mobile-selector';
 const selectorLabel=document.createElement('span');selectorLabel.textContent=navigation.querySelector('summary > span').textContent;
 const selectorCurrent=document.createElement('strong');
 const chevron=document.createElement('span');chevron.className='xn-chevron';chevron.setAttribute('aria-hidden','true');
 const selectorCopy=document.createElement('span');selectorCopy.append(selectorLabel,selectorCurrent);selector.append(selectorCopy,chevron);
 selector.setAttribute('aria-haspopup','dialog');selector.setAttribute('aria-expanded','false');
 sidebar.prepend(selector);
 const sheet=document.createElement('dialog');sheet.className='xn-feature-sheet';
 const sheetWords={
  en:['Explore features','Choose a category and topic.','Close navigation'],
  pt:['Explorar recursos','Escolha uma categoria e um tópico.','Fechar navegação'],
  es:['Explorar funciones','Elige una categoría y un tema.','Cerrar navegación'],
  fr:['Explorer les fonctionnalités','Choisissez une catégorie et un sujet.','Fermer la navigation'],
  it:['Esplora le funzionalità','Scegli una categoria e un argomento.','Chiudi navigazione']
 }[lang] || ['Explore features','Choose a category and topic.','Close navigation'];
 const sheetTitle=document.createElement('h2');sheetTitle.id='xn-feature-sheet-title';sheetTitle.textContent=sheetWords[0];
 const sheetHint=document.createElement('p');sheetHint.textContent=sheetWords[1];
 const close=document.createElement('button');close.type='button';close.className='xn-feature-sheet__close';close.setAttribute('aria-label',sheetWords[2]);close.innerHTML='<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19"/></svg>';
 sheet.setAttribute('aria-labelledby',sheetTitle.id);sheet.append(close,sheetTitle,sheetHint);document.body.append(sheet);
 function mountNavigation(){
  if(sheet.open)sheet.close();
  navigation.open=true;
  if(mobile.matches)sheet.append(navBody);else navigation.append(navBody);
 }
 mountNavigation();mobile.addEventListener('change',mountNavigation);
 selector.addEventListener('click',()=>{sheet.showModal();selector.setAttribute('aria-expanded','true');document.documentElement.classList.add('xn-features-open');close.focus();});
 close.addEventListener('click',()=>sheet.close());
 sheet.addEventListener('close',()=>{selector.setAttribute('aria-expanded','false');document.documentElement.classList.remove('xn-features-open');selector.focus({preventScroll:true});});
 sheet.addEventListener('click',event=>{
  if(event.target!==sheet)return;const r=sheet.getBoundingClientRect();
  if(event.clientY<r.top||event.clientY>r.bottom||event.clientX<r.left||event.clientX>r.right)sheet.close();
 });
 // Other categories load their localized topics only when first expanded.
 navBody.querySelectorAll('[data-feature-url]').forEach(category=>{
  let pending=false;
  category.addEventListener('toggle',async()=>{
   if(!category.open || pending || category.dataset.topicsLoaded)return;
   pending=true;
   try{
    const response=await fetch(category.dataset.featureUrl);
    if(!response.ok)throw new Error('Feature navigation unavailable');
    const doc=new DOMParser().parseFromString(await response.text(),'text/html');
    const topics=[...doc.querySelectorAll('.xn-feature-section')];
    const container=category.querySelector('[data-feature-remote]');
    const items=topics.map((topic,index)=>{
     const link=document.createElement('a');
     link.href=category.dataset.featureUrl+'#'+(topic.dataset.featureSection || profileSections[index]);
     link.textContent=topic.querySelector('h1').textContent;
     return link;
    });
    if(items.length)container.replaceChildren(...items);
    category.dataset.topicsLoaded='true';
   }catch(error){ /* Keep the direct category link available and allow retry. */ }
   finally{pending=false;}
  });
 });
 const categoryName=navBody.querySelector('.xn-feature-category--active > summary > span').textContent;
 const links=sections.map((section,index)=>{
  const link=document.createElement('a');link.href='#'+sectionNames[index];
  link.textContent=section.querySelector('h1').textContent;
  link.addEventListener('click',event=>{
   event.preventDefault();showSection(index,true);
   if(sheet.open)sheet.close();
  });
  targets?.append(link);
  return link;
 });
 function showSection(index,remember){
  selectorCurrent.textContent=categoryName+' / '+sections[index].querySelector('h1').textContent;
  sections.forEach((section,n)=>{section.hidden=n!==index;if(n!==index)section.querySelectorAll('video').forEach(v=>v.pause());});
  links.forEach((link,n)=>{if(n===index)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
  if(remember){
   history.replaceState(null,'','#'+sectionNames[index]);
   const heading=sections[index].querySelector('h1');heading.tabIndex=-1;heading.focus({preventScroll:true});
   if(matchMedia('(max-width:900px)').matches)root.scrollIntoView({block:'start'});
  }
 }
 if(targets)showSection(Math.max(0,sectionNames.indexOf(location.hash.slice(1))),false);
 window.addEventListener('hashchange',()=>{const index=sectionNames.indexOf(location.hash.slice(1));if(index>=0)showSection(index,false);});
 root.querySelectorAll('.xn-feature-video').forEach(host=>{
  const video=host.querySelector('video'),button=host.querySelector('button');
  // A blob URL permits seeking even on preview servers without HTTP Range support.
  const observer=new IntersectionObserver(entries=>{
   if(!entries.some(entry=>entry.isIntersecting))return;observer.disconnect();
   fetch(video.src).then(response=>{if(!response.ok)throw Error();return response.blob();}).then(blob=>{
    const time=video.currentTime,playing=!video.paused;
    const url=URL.createObjectURL(blob);video.src=url;
    video.addEventListener('loadedmetadata',()=>{video.currentTime=time;if(playing)video.play().catch(()=>{});},{once:true});
    window.addEventListener('pagehide',()=>URL.revokeObjectURL(url),{once:true});
   }).catch(()=>{});
  });observer.observe(video);
  button.addEventListener('click',()=>{if(video.paused)video.play().catch(()=>{});else video.pause();});
  video.addEventListener('play',()=>{button.textContent='Ⅱ';host.classList.add('is-playing');});
  video.addEventListener('pause',()=>{button.textContent='▶';host.classList.remove('is-playing');});
 });
 root.querySelectorAll('[data-feature-gallery]').forEach((gallery,group)=>{
  const frames=[...gallery.querySelectorAll('[data-feature-frame]')];
  const toolbar=document.createElement('div');toolbar.className='xn-feature-gallery__toolbar';
  const tabs=document.createElement('div');tabs.className='xn-feature-gallery__tabs';
  tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label',gallery.getAttribute('aria-label'));
  const expand=document.createElement('button');expand.type='button';expand.className='xn-feature-expand';expand.textContent=words[0];
  expand.addEventListener('click',()=>frames[current].querySelector('a')?.click());
  toolbar.append(tabs);
  const media=document.createElement('div');media.className='xn-feature-gallery__media';
  frames[0].before(media);frames.forEach(frame=>media.append(frame));media.append(expand);
  const footer=document.createElement('div');footer.className='xn-feature-gallery__footer';
  const caption=document.createElement('span');caption.className='xn-feature-gallery__caption';
  const pager=document.createElement('div');pager.className='xn-image-controls';
  const previous=document.createElement('button');previous.type='button';previous.className='xn-image-arrow xn-image-arrow--previous';previous.setAttribute('aria-label',words[1]);
  const count=document.createElement('span');count.className='xn-feature-count';count.setAttribute('aria-live','polite');
  const next=document.createElement('button');next.type='button';next.className='xn-image-arrow xn-image-arrow--next';next.setAttribute('aria-label',words[2]);
  pager.append(previous,count,next);footer.append(caption,pager);
  let current=0;
  const buttons=frames.map((frame,index)=>{
   const button=document.createElement('button');button.type='button';button.setAttribute('role','tab');
   button.id='xn-feature-tab-'+group+'-'+index;frame.id='xn-feature-panel-'+group+'-'+index;
   button.textContent=frame.querySelector('figcaption').textContent;
   button.setAttribute('aria-controls',frame.id);frame.setAttribute('role','tabpanel');frame.setAttribute('aria-labelledby',button.id);
   button.addEventListener('click',()=>show(index));
   button.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();
    const target=event.key==='Home'?0:event.key==='End'?frames.length-1:(index+(event.key==='ArrowLeft'?-1:1)+frames.length)%frames.length;
    show(target);buttons[target].focus({preventScroll:true});
   });
   tabs.append(button);return button;
  });
  function show(index){
   frames.forEach(frame=>frame.querySelector('video')?.pause());
   current=index;
   expand.hidden=!!frames[index].querySelector('video');
   frames.forEach((frame,n)=>frame.hidden=n!==index);
   buttons.forEach((button,n)=>{button.setAttribute('aria-selected',String(n===index));button.tabIndex=n===index?0:-1;});
   caption.textContent=buttons[index].textContent;
   count.textContent=(index+1)+' / '+frames.length;
   previous.disabled=index===0;next.disabled=index===frames.length-1;
  }
  previous.addEventListener('click',()=>show(Math.max(0,current-1)));
  next.addEventListener('click',()=>show(Math.min(frames.length-1,current+1)));
  gallery.addEventListener('xn-feature-image-change',event=>show(event.detail.index));
  gallery.prepend(toolbar);gallery.append(footer);gallery.classList.add('xn-feature-gallery--enhanced');
  if(frames.length===1){tabs.hidden=true;pager.hidden=true;}
  const initialSlide=Number(new URLSearchParams(location.search).get('slide'))||0;
  show(Math.max(0,Math.min(frames.length-1,initialSlide)));
 });
})();
