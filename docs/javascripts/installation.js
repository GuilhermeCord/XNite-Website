/* Accessible image viewer; desktop can continue through the guide in the dialog. */
(() => {
  'use strict';
  if (window.xniteGuideImages) return;
  window.xniteGuideImages = true;
  let dialog, opener, activeGuide, links = [], current = 0;
  const word = key => {
    const language = document.documentElement.lang.split('-')[0];
    const labels = {en:['Previous image','Next image'],pt:['Imagem anterior','Próxima imagem'],es:['Imagen anterior','Siguiente imagen'],fr:['Image précédente','Image suivante'],it:['Immagine precedente','Immagine successiva']};
    return (labels[language] || labels.en)[key];
  };
  let scale=1, panX=0, panY=0;
  function updateZoom() {
    const viewport=dialog.querySelector('.xn-lightbox-viewport'), image=viewport.querySelector('img');
    const limitX=Math.max(0,(image.clientWidth*scale-viewport.clientWidth)/2);
    const limitY=Math.max(0,(image.clientHeight*scale-viewport.clientHeight)/2);
    panX=Math.max(-limitX,Math.min(limitX,panX));panY=Math.max(-limitY,Math.min(limitY,panY));
    image.style.transform=`translate(${panX}px,${panY}px) scale(${scale})`;
    viewport.classList.toggle('is-zoomed',scale>1);
    dialog.querySelector('.xn-zoom-out').disabled=scale<=1;
    dialog.querySelector('.xn-zoom-in').disabled=scale>=4;
    dialog.querySelector('.xn-zoom-level').textContent=Math.round(scale*100)+'%';
  }
  function zoom(value) {scale=Math.max(1,Math.min(4,value));updateZoom();}
  function render() {
    scale=1;panX=panY=0;
    const link = links[current];
    const thumbnail = link.querySelector('img');
    dialog.querySelector('#xn-guide-image-title').textContent = thumbnail.alt.replace(/\s*[—–-]?\s*\d+\/\d+\s*$/, '');
    const image = dialog.querySelector('img');image.alt = thumbnail.alt;image.src = link.href;
    const previous = dialog.querySelector('.xn-lightbox-previous');
    const next = dialog.querySelector('.xn-lightbox-next');
    previous.disabled = current === 0;next.disabled = current === links.length - 1;
    dialog.querySelector('.xn-lightbox-count').textContent = `${current + 1} / ${links.length}`;
    dialog.querySelector('.xn-lightbox-navigation').hidden = links.length < 2;
    dialog.querySelector('.xn-guide-lightbox__footer').hidden = false;
    updateZoom();
    const desktop = matchMedia('(min-width: 901px)').matches && activeGuide;
    dialog.classList.toggle('xn-guide-lightbox--workspace',Boolean(desktop));
    const noteHost=dialog.querySelector('.xn-lightbox-notes');
    const stepHost=dialog.querySelector('.xn-lightbox-steps');
    noteHost.replaceChildren();stepHost.replaceChildren();
    dialog.querySelector('.xn-lightbox-stage').textContent='';
    if(desktop) {
      const notes=activeGuide.querySelector('.xn-tutorial__notes').cloneNode(true);
      notes.querySelectorAll('[id]').forEach(node=>node.removeAttribute('id'));
      noteHost.append(notes);
      dialog.querySelector('#xn-guide-image-title').textContent=activeGuide.querySelector('h1').textContent;
      const picker=activeGuide.querySelector('[data-guide-step-select]');
      dialog.querySelector('.xn-lightbox-stage').textContent=
        activeGuide.querySelector('.xn-guide-kicker').textContent+' · '+(picker.selectedIndex+1)+' / '+picker.options.length;
      ['prev','next'].forEach(direction=>{
        const source=activeGuide.querySelector('[data-guide-'+direction+']');
        const action=document.createElement('a');
        action.className='xn-lightbox-step xn-lightbox-step--'+direction;
        action.textContent=source.textContent;
        const target=new URL(source.href);
        if(target.pathname.includes('/installation/')) target.searchParams.set('view','expanded');
        action.href=target.href;
        action.addEventListener('click',()=>{const click=new MouseEvent('click',{bubbles:true,cancelable:true}); source.addEventListener('click',event=>event.preventDefault(),{once:true}); source.dispatchEvent(click);});
        stepHost.append(action);
      });
    }
    dialog.querySelector('.xn-lightbox-close').setAttribute('aria-label',link.dataset.closeLabel);
  }
  function move(delta) {
    const index = Math.max(0, Math.min(links.length - 1, current + delta));
    if (index === current) return;
    current = index;
    activeGuide?.dispatchEvent(new CustomEvent('xn-guide-image-change',{detail:{index:current}}));
    links[current].closest('[data-feature-gallery]')?.dispatchEvent(new CustomEvent('xn-feature-image-change',{detail:{index:current}}));
    render();
    if (!opener?.classList.contains('xn-guide-expand')) opener = links[current];
    if (document.activeElement?.disabled) dialog.querySelector('.xn-lightbox-close').focus();
  }
  function createDialog() {
    dialog = document.createElement('dialog');dialog.className = 'xn-guide-lightbox';dialog.setAttribute('aria-labelledby','xn-guide-image-title');
    const bar = document.createElement('div');bar.className = 'xn-guide-lightbox__bar';
    const title = document.createElement('span');title.id = 'xn-guide-image-title';
    const navigation = document.createElement('div');navigation.className = 'xn-lightbox-navigation';
    const previous = document.createElement('button');previous.type = 'button';previous.className = 'xn-lightbox-previous';previous.setAttribute('aria-label',word(0));previous.addEventListener('click',()=>move(-1));
    const count = document.createElement('span');count.className = 'xn-lightbox-count';count.setAttribute('role','status');count.setAttribute('aria-live','polite');
    const next = document.createElement('button');next.type = 'button';next.className = 'xn-lightbox-next';next.setAttribute('aria-label',word(1));next.addEventListener('click',()=>move(1));
    navigation.append(previous,count,next);
    const close = document.createElement('button');close.type = 'button';close.className = 'xn-lightbox-close';
    close.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m5 5 14 14M19 5 5 19"/></svg>';
    close.addEventListener('click',()=>dialog.close());
    const image = document.createElement('img');
    const footer = document.createElement('div');footer.className = 'xn-guide-lightbox__footer';footer.append(navigation);
    const stage=document.createElement('div');stage.className='xn-lightbox-stage';
    const content=document.createElement('div');content.className='xn-lightbox-content';
    const media=document.createElement('div');media.className='xn-lightbox-media';const viewport=document.createElement('div');viewport.className='xn-lightbox-viewport';viewport.append(image);
    image.draggable=false;image.addEventListener('load',updateZoom);
    const controls=document.createElement('div');controls.className='xn-lightbox-zoom';
    const zoomLabels={en:['Zoom out','Zoom in'],pt:['Diminuir zoom','Aumentar zoom'],es:['Reducir zoom','Ampliar zoom'],fr:['Réduire le zoom','Agrandir'],it:['Riduci zoom','Aumenta zoom']}[document.documentElement.lang.split('-')[0]] || ['Zoom out','Zoom in'];
    const minus=document.createElement('button');minus.type='button';minus.className='xn-zoom-out';minus.textContent='−';minus.setAttribute('aria-label',zoomLabels[0]);minus.title=zoomLabels[0];minus.onclick=()=>zoom(scale-.25);
    const level=document.createElement('span');level.className='xn-zoom-level';level.setAttribute('role','status');level.setAttribute('aria-live','polite');
    const plus=document.createElement('button');plus.type='button';plus.className='xn-zoom-in';plus.textContent='+';plus.setAttribute('aria-label',zoomLabels[1]);plus.title=zoomLabels[1];plus.onclick=()=>zoom(scale+.25);
    controls.append(minus,level,plus);footer.prepend(controls);media.append(viewport,footer);
    const pointers=new Map();let gesture;
    function baseline(){const points=[...pointers.values()];gesture={points,scale,x:panX,y:panY};}
    viewport.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse' && event.button!==0)return;viewport.setPointerCapture(event.pointerId);pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});baseline();});
    viewport.addEventListener('pointermove',event=>{
      if(!pointers.has(event.pointerId))return;pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});
      const points=[...pointers.values()];
      if(points.length===2 && gesture.points.length===2){
        const distance=p=>Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);
        zoom(gesture.scale*distance(points)/Math.max(1,distance(gesture.points)));
      }else if(points.length===1 && gesture.points.length===1){panX=gesture.x+points[0].x-gesture.points[0].x;panY=gesture.y+points[0].y-gesture.points[0].y;updateZoom();}
    });
    const release=event=>{pointers.delete(event.pointerId);baseline();};
    viewport.addEventListener('pointerup',release);viewport.addEventListener('pointercancel',release);
    window.addEventListener('resize',()=>{if(dialog.open)updateZoom();});
    const notes=document.createElement('div');notes.className='xn-lightbox-notes';
    const steps=document.createElement('div');steps.className='xn-lightbox-steps';
    content.append(media,notes);
    bar.append(title,close);dialog.append(stage,bar,content,steps);
    dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
    dialog.addEventListener('keydown',event=>{
      if (event.key==='ArrowLeft' || event.key==='ArrowRight') {event.preventDefault();move(event.key==='ArrowLeft'?-1:1);}
    });
    dialog.addEventListener('close',()=>{
      image.removeAttribute('src');document.documentElement.classList.remove('xn-image-open');
      if (opener?.isConnected) opener.focus({preventScroll:true});
      const url=new URL(location.href);url.searchParams.delete('view');history.replaceState(null,'',url);
      opener=null;links=[];activeGuide=null;
    });
    document.body.append(dialog);
  }
  document.addEventListener('click',event=>{
    const link=event.target.closest?.('a[data-guide-image]');
    if(!link || event.button!==0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)return;
    if(!window.HTMLDialogElement || !HTMLDialogElement.prototype.showModal)return;
    event.preventDefault();if(!dialog)createDialog();
    opener=document.activeElement?.classList.contains('xn-guide-expand')?document.activeElement:link;
    activeGuide=link.closest('[data-guide-tutorial]');
    const gallery=activeGuide || link.closest('[data-feature-gallery]');
    links=gallery?[...gallery.querySelectorAll('a[data-guide-image]')]:[link];current=Math.max(0,links.indexOf(link));
    render();dialog.showModal();document.documentElement.classList.add('xn-image-open');dialog.querySelector('.xn-lightbox-close').focus();
  });
  if(new URL(location.href).searchParams.get('view')==='expanded' && matchMedia('(min-width: 901px)').matches) {
    const open=()=>document.querySelector('.xn-guide-expand')?.click();
    if(document.readyState==='complete') setTimeout(open,0); else window.addEventListener('load',open,{once:true});
  }
  if(typeof document$!=='undefined')document$.subscribe(()=>{if(dialog?.open)dialog.close();});
})();
