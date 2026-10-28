/* The source pages remain readable without JavaScript; enhance the shared guide. */
(() => {
  'use strict';
  const redirect = document.querySelector('[data-guide-redirect]');
  if (redirect) { location.replace(redirect.href); return; }
  const guide = document.querySelector('[data-guide-tutorial]');
  if (!guide) return;
  const frames = [...guide.querySelectorAll('[data-guide-frame]')];
  const previous = guide.querySelector('[data-guide-prev]');
  const next = guide.querySelector('[data-guide-next]');
  const counter = guide.querySelector('[data-guide-counter]');
  const tabs = guide.querySelector('[data-guide-dots]');
  const picker = guide.querySelector('[data-guide-step-select]');
  if (!frames.length || !previous || !next || !picker) return;
  const language = document.documentElement.lang.split('-')[0];
  const translations = {
    en: ['Installation guide','Steps','Close steps','Back to current step','Previous image','Next image','Continue','Next','In preparation','Enlarge image'],
    pt: ['Guia de instalação','Etapas','Fechar etapas','Voltar ao passo atual','Imagem anterior','Próxima imagem','Continuar','Próximo','Em preparação','Ampliar imagem'],
    es: ['Guía de instalación','Etapas','Cerrar etapas','Volver al paso actual','Imagen anterior','Siguiente imagen','Continuar','Siguiente','En preparación','Ampliar imagen'],
    fr: ['Guide d’installation','Étapes','Fermer les étapes','Revenir à l’étape actuelle','Image précédente','Image suivante','Continuer','Suivant','En préparation','Agrandir l’image'],
    it: ['Guida all’installazione','Passaggi','Chiudi passaggi','Torna al passaggio attuale','Immagine precedente','Immagine successiva','Continua','Successivo','In preparazione','Ingrandisci immagine']
  };
  const t = translations[language] || translations.en;
  const names = {
    en: {3:['Add-ons','Metadata providers'],4:['Settings','Grid view','Layout','Performance'],5:['SteamGridDB','Metadata','Provider order'],6:['Sync & updates','Steam account','Check connection'],7:['Downloads','Extract tools','Video settings'],9:['Sign in','Create API key','Copy API key'],14:['X-Nite packages','Metadata extras'],15:['Theme and extension','Metadata folder'],18:['Fullscreen','Settings','Select X-Nite','Restart']},
    pt: {3:['Complementos','Fontes de metadados'],4:['Configurações','Visualização em grade','Layout','Desempenho'],5:['SteamGridDB','Metadados','Ordem dos provedores'],6:['Sincronização','Conta Steam','Verificar conexão'],7:['Downloads','Extrair ferramentas','Configurar vídeos'],9:['Entrar','Criar chave API','Copiar chave API'],14:['Pacotes X-Nite','Extras de metadados'],15:['Tema e extensão','Pasta de metadados'],18:['Tela cheia','Configurações','Selecionar X-Nite','Reiniciar']},
    es: {3:['Complementos','Proveedores'],4:['Ajustes','Vista de cuadrícula','Diseño','Rendimiento'],5:['SteamGridDB','Metadatos','Orden de proveedores'],6:['Sincronización','Cuenta Steam','Comprobar conexión'],7:['Descargas','Extraer herramientas','Configurar vídeos'],9:['Iniciar sesión','Crear clave API','Copiar clave API'],14:['Paquetes X-Nite','Extras'],15:['Tema y extensión','Carpeta de metadatos'],18:['Pantalla completa','Ajustes','Seleccionar X-Nite','Reiniciar']},
    fr: {3:['Extensions','Fournisseurs'],4:['Paramètres','Vue en grille','Disposition','Performances'],5:['SteamGridDB','Métadonnées','Ordre des fournisseurs'],6:['Synchronisation','Compte Steam','Vérifier la connexion'],7:['Téléchargements','Extraire les outils','Configurer les vidéos'],9:['Connexion','Créer la clé API','Copier la clé API'],14:['Paquets X-Nite','Extras'],15:['Thème et extension','Dossier des métadonnées'],18:['Plein écran','Paramètres','Choisir X-Nite','Redémarrer']},
    it: {3:['Estensioni','Fornitori'],4:['Impostazioni','Vista a griglia','Layout','Prestazioni'],5:['SteamGridDB','Metadati','Ordine dei fornitori'],6:['Sincronizzazione','Account Steam','Verifica connessione'],7:['Download','Estrarre gli strumenti','Configurare i video'],9:['Accedi','Crea chiave API','Copia chiave API'],14:['Pacchetti X-Nite','Extra'],15:['Tema ed estensione','Cartella metadati'],18:['Schermo intero','Impostazioni','Seleziona X-Nite','Riavvia']}
  };
  const options = [...picker.options];
  const step = picker.selectedIndex;
  const totalSteps = options.length;
  const sourceStep = Number(new URL(options[step].value,location.href).pathname.match(/\/(\d+)-/)[1]);
  const stageLinks = [...guide.querySelectorAll('.xn-guide-stages > a')];
  const stageIndex = step < 3 ? 0 : step < 8 ? 1 : step < 13 ? 2 : 3;
  const progress = guide.querySelector('.xn-guide-progress');
  const progressText = progress.querySelector('span').textContent;
  const progressLabels = {en:'completed',pt:'concluídos',es:'completados',fr:'terminés',it:'completati'};
  const completedLabel = progressLabels[language] || progressLabels.en;
  const progressKey = 'xnite-guide-completed-v3';
  let completed = new Set();
  try {
    let saved = JSON.parse(localStorage.getItem(progressKey) || 'null');
    if (saved === null) {
      let old = JSON.parse(localStorage.getItem('xnite-guide-completed-v2') || 'null');
      if (old === null) {
        const original = JSON.parse(localStorage.getItem('xnite-guide-completed-v1') || '[]');
        old = Array.isArray(original) ? original.filter(n=>Number.isInteger(n) && n>=0 && n<18 && (n<6 || n>8)).map(n=>n<6?n:n-2) : [];
        if (Array.isArray(original) && [6,7,8].every(n=>original.includes(n))) old.push(6);
      }
      saved = Array.isArray(old) ? old.filter(n=>Number.isInteger(n) && n>=0 && n<16 && (n<7 || n>10)).map(n=>n<7?n:n-3) : [];
      if (Array.isArray(old) && [7,8,9,10].every(n=>old.includes(n))) saved.push(7);
      localStorage.setItem(progressKey,JSON.stringify(saved));
    }
    if (Array.isArray(saved)) completed = new Set(saved.filter(n=>Number.isInteger(n) && n>=0 && n<totalSteps));
  } catch (_) { /* Navigation remains available if browser storage is disabled. */ }
  const title = guide.querySelector('h1');
  const cleanTitle = text => text.replace(/^\d+\.\s*/, '');
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  const button = (className, text, action) => {
    const node = element('button', className, text);node.type = 'button';node.addEventListener('click', action);return node;
  };
  function navigation() {
    const nav = element('nav','xn-step-tree');nav.setAttribute('aria-label',t[0]);
    const ranges = [[0,3],[3,8],[8,13],[13,totalSteps]];
    stageLinks.forEach((link, groupIndex) => {
      const group = element('details','xn-step-tree__group');group.open = groupIndex === stageIndex;
      const summary = element('summary');
      summary.append(element('span','xn-step-tree__number',String(groupIndex + 1)),element('span','xn-step-tree__title',link.textContent.replace(/^\s*\d+\s*/,'')),element('span','xn-chevron'));
      summary.querySelector('.xn-chevron').setAttribute('aria-hidden','true');
      const list = element('ol');
      for (let n=ranges[groupIndex][0];n<Math.min(ranges[groupIndex][1],options.length);n++) {
        const li=element('li');const a=element('a');
        a.dataset.stepIndex=String(n);
        const marker=element('span','xn-step-marker',String(n+1));marker.setAttribute('aria-hidden','true');
        const label=element('span','xn-step-label',cleanTitle(options[n].textContent));
        a.append(marker,label);
        a.href=options[n].value;
        if (n===step) { a.setAttribute('aria-current','step');a.href='#current-step';a.addEventListener('click',event=>{event.preventDefault();if(sheet.open)sheet.close();title.focus({preventScroll:true});}); }
        li.append(a);list.append(li);
      }
      group.append(summary,list);nav.append(group);
    });
    return nav;
  }
  const workspace=element('div','xn-guide-workspace');guide.before(workspace);
  const sidebar=element('aside','xn-guide-sidebar');
  sidebar.append(element('h2',null,t[0]),progress);
  const sheet=element('dialog','xn-step-sheet');sheet.setAttribute('aria-labelledby','xn-step-sheet-title');
  const sheetHead=element('div','xn-step-sheet__heading');
  const sheetTitle=element('h2',null,t[0]);sheetTitle.id='xn-step-sheet-title';
  const close=button('xn-step-sheet__close','×',()=>sheet.close());close.setAttribute('aria-label',t[2]);
  sheetHead.append(sheetTitle,close);
  const sheetProgress=progress.cloneNode(true);sheetProgress.classList.add('xn-sheet-progress');
  sheet.append(sheetHead,sheetProgress,navigation());
  sheet.append(button('xn-step-sheet__return',t[3],()=>sheet.close()));
  sheet.addEventListener('click',event=>{if(event.target===sheet){const r=sheet.getBoundingClientRect();if(event.clientY<r.top||event.clientX<r.left||event.clientX>r.right)sheet.close();}});
  document.body.append(sheet);
  sidebar.append(navigation());workspace.append(sidebar,guide);
  function renderCompletion() {
    [sidebar,sheet].forEach(surface=>{
      surface.querySelectorAll('[data-step-index]').forEach(link=>{
        const index=Number(link.dataset.stepIndex);
        const done=completed.has(index);
        link.classList.toggle('xn-step-complete',done);
        const marker=link.querySelector('.xn-step-marker');
        marker.textContent=done?'✓':String(index+1);
        link.setAttribute('aria-label',`${options[index].textContent}${done ? ' · '+completedLabel : ''}`);
      });
      const status=surface.querySelector('.xn-guide-progress');
      status.querySelector('span').textContent=`${completed.size} / ${totalSteps} · ${completedLabel}`;
      const meter=status.querySelector('progress');meter.max=totalSteps;meter.value=completed.size;meter.setAttribute('aria-label',status.textContent);
    });
  }
  renderCompletion();
  next.addEventListener('click',()=>{
    if(step===totalSteps-1) {
      completed.clear();
      try {
        ['xnite-guide-completed-v1','xnite-guide-completed-v2',progressKey].forEach(key=>localStorage.removeItem(key));
      } catch (_) {}
    } else {
      completed.add(step);
      try {localStorage.setItem(progressKey,JSON.stringify([...completed]));} catch (_) {}
    }
    renderCompletion();
  });
  const mobileSteps=button('xn-mobile-steps',`${t[1]} · ${progressText}`,()=>{sheet.showModal();close.focus();});
  mobileSteps.setAttribute('aria-haspopup','dialog');mobileSteps.setAttribute('aria-expanded','false');
  const originalShow=()=>{mobileSteps.setAttribute('aria-expanded','true');document.documentElement.classList.add('xn-steps-open');};
  mobileSteps.addEventListener('click',originalShow);
  sheet.addEventListener('close',()=>{mobileSteps.setAttribute('aria-expanded','false');document.documentElement.classList.remove('xn-steps-open');mobileSteps.focus({preventScroll:true});});
  guide.prepend(mobileSteps);
  const heading=guide.querySelector('.xn-tutorial__heading');
  heading.prepend(element('div','xn-guide-kicker',stageLinks[stageIndex].textContent.replace(/^\s*\d+\s*/,'')));
  guide.querySelector('.xn-guide-stages').hidden=true;guide.querySelector('.xn-step-picker').hidden=true;
  const visual=guide.querySelector('.xn-tutorial__visual');
  const expand=button('xn-guide-expand',t[9],()=>frames[current].querySelector('a').click());
  visual.prepend(expand);
  const notes=guide.querySelector('.xn-tutorial__notes');
  // These pages already describe separate tasks; keep their translated markup
  // and show the instructions belonging to the image instead of repeating all of them.
  const addOnParagraph=step===2 ? notes.querySelector(':scope > p') : null;
  const providerMarker={en:'Add metadata providers',pt:'Instale as fontes',es:'Elige los proveedores',fr:'Ajoutez les fournisseurs',it:'Aggiungi i fornitori'}[language] || 'Add metadata providers';
  const addOnParts=addOnParagraph?.innerHTML.split(providerMarker);
  const originalNotes=[...notes.children];
  const accessNote=element('p','xn-guide-access-note');accessNote.hidden=true;notes.append(accessNote);
  const noteGroups=[...notes.querySelectorAll('[data-guide-note-start]')];
  const keyTasks=[...notes.querySelectorAll('[data-guide-key-tasks] > ol > li')];
  const frameTitle=element('h2','xn-frame-title');notes.prepend(frameTitle);
  const footer=guide.querySelector('.xn-tutorial__footer');
  counter.remove();
  next.textContent=step===totalSteps-1
    ? ({en:'Finish guide',pt:'Concluir guia',es:'Finalizar guía',fr:'Terminer le guide',it:'Concludi guida'}[language] || 'Finish guide')
    : t[6];
  const controls=element('div','xn-image-controls');
  const prevImage=button('xn-image-arrow xn-image-arrow--previous','',()=>show(current-1,true));prevImage.setAttribute('aria-label',t[4]);
  const nextImage=button('xn-image-arrow xn-image-arrow--next','',()=>show(current+1,true));nextImage.setAttribute('aria-label',t[5]);
  controls.append(prevImage,counter,nextImage);tabs.after(controls);
  const strip=element('div','xn-substeps');tabs.before(strip);strip.append(tabs,controls);
  let current=0;
  let labels=(names[language]||names.en)[sourceStep];
  if(sourceStep===7) {
    const logoNames={en:'Enable logos',pt:'Ativar logos',es:'Activar logos',fr:'Activer les logos',it:'Attivare i loghi'};
    labels.push(logoNames[language]||logoNames.en,...(names[language]||names.en)[9]);
  }
  if(sourceStep===10) {
    const musicNames={en:['Music profile','Playback','Default source','Pause behaviour'],pt:['Perfil de música','Reprodução','Fonte padrão','Pausas'],es:['Perfil musical','Reproducción','Fuente predeterminada','Pausas'],fr:['Profil musical','Lecture','Source par défaut','Pauses'],it:['Profilo musicale','Riproduzione','Sorgente predefinita','Pause']};
    labels=musicNames[language]||musicNames.en;
  }
  const buttons=frames.map((frame,index)=>{
    const label=frame.dataset.guideLabel || labels?.[index] || (frames.length===1 ? title.textContent : `${guide.dataset.imageLabel} ${index+1}`);
    const node=button('xn-substep',null,()=>show(index,true));
    node.append(element('span','xn-substep__number',String(index+1)),element('span',null,label));
    node.setAttribute('aria-controls',`xn-guide-frame-${index}`);frame.id=`xn-guide-frame-${index}`;
    tabs.append(node);return node;
  });
  if(frames.length===1)strip.hidden=true;
  function show(index,remember) {
    current=Math.max(0,Math.min(frames.length-1,index));
    originalNotes.forEach(node=>node.hidden=false);
    accessNote.hidden=true;
    frames.forEach((frame,n)=>{frame.hidden=n!==current;});
    buttons.forEach((node,n)=>{node.setAttribute('aria-pressed',String(n===current));});
    counter.textContent=`${current+1} / ${frames.length}`;
    prevImage.disabled=current===0;nextImage.disabled=current===frames.length-1;
    frameTitle.textContent=frames.length>1 ? buttons[current].textContent.replace(/^\d+/,'') : title.textContent;
    if(addOnParts?.length===2) addOnParagraph.innerHTML=frames[current].dataset.guideKind==='addons' ? addOnParts[0] : providerMarker+addOnParts[1];
    noteGroups.forEach(group=>{group.hidden=current<Number(group.dataset.guideNoteStart)||current>Number(group.dataset.guideNoteEnd);});
    const keyIndex=Number(frames[current].dataset.guideKeyIndex ?? current-4);
    keyTasks.forEach((task,n)=>{task.hidden=keyIndex<2 ? n!==keyIndex : n<2;});
    if(frames[current].dataset.guideAccess){
      originalNotes.forEach(node=>node.hidden=true);
      accessNote.textContent=frames[current].dataset.guideAccess;accessNote.hidden=false;
    }
    if(remember) {
      history.replaceState(null,'',`#image=${current+1}`);
      notes.scrollTop=0;
      const tab=buttons[current];tabs.scrollLeft=Math.max(0,tab.offsetLeft-tabs.offsetLeft-tabs.clientWidth/2+tab.offsetWidth/2);
    }
  }
  tabs.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();const index=event.key==='Home'?0:event.key==='End'?frames.length-1:current+(event.key==='ArrowLeft'?-1:1);
    show(index,true);buttons[current].focus({preventScroll:true});
  });
  guide.addEventListener('xn-guide-image-change',event=>show(event.detail.index,true));
  previous.textContent=previous.textContent.replace(/^[←‹]\s*/, '');
  previous.hash='guide-prev';next.hash='guide-next';
  picker.addEventListener('change',()=>location.assign(picker.value+'#guide-next'));
  const savedImage=/^#image=(\d+)$/.exec(location.hash);
  show(savedImage?Number(savedImage[1])-1:0,false);
  guide.classList.add('xn-tutorial--enhanced','xn-tutorial--workspace');
  if(location.hash==='#guide-next'||location.hash==='#guide-prev')title.focus({preventScroll:true});
})();
