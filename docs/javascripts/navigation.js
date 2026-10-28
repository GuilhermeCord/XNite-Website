/* Native details remain usable with JavaScript disabled. */
(() => {
  const header = document.querySelector('.xn-header');
  if (!header) return;
  // Keep the current topic and gallery tab when changing language.
  document.addEventListener('click',event=>{
    const link=event.target.closest('.md-select a[hreflang]');
    if(!link)return;
    const target=new URL(link.href,location.href);target.hash=location.hash;
    const tab=document.querySelector('.xn-feature-section:not([hidden]) [role="tab"][aria-selected="true"]');
    if(tab)target.searchParams.set('slide',String([...tab.parentElement.children].indexOf(tab)));
    event.preventDefault();event.stopImmediatePropagation();location.assign(target.href);
  },true);
  const groups = [...header.querySelectorAll('.xn-nav-group')];
  groups.forEach(group => group.addEventListener('toggle', () => {
    if (group.open) groups.forEach(other => { if (other !== group) other.open = false; });
    else group.querySelectorAll('.xn-nav-subgroup[open]').forEach(child => { child.open = false; });
  }));
  header.querySelectorAll('[data-feature-menu-url]').forEach(group=>{
    let loaded=false,pending=false;
    group.addEventListener('toggle',async()=>{
      if(!group.open||loaded||pending)return;pending=true;
      try{
        const response=await fetch(group.dataset.featureMenuUrl);if(!response.ok)throw Error();
        const doc=new DOMParser().parseFromString(await response.text(),'text/html');
        const topics=[...doc.querySelectorAll('.xn-feature-section')];
        const fallback=['choose','overview','customize','avatar','color','backgrounds'];
        if(topics.length)group.querySelector('.xn-nav-flyout').replaceChildren(...topics.map((topic,i)=>{
          const a=document.createElement('a');a.href=group.dataset.featureMenuUrl+'#'+(topic.dataset.featureSection||fallback[i]);a.textContent=topic.querySelector('h1').textContent;return a;
        }));
        loaded=true;
      }catch(error){}finally{pending=false;}
    });
  });
  const subgroups = [...header.querySelectorAll('.xn-nav-subgroup')];
  subgroups.forEach(group => group.addEventListener('toggle', () => {
    if (group.open) {
      subgroups.forEach(other => { if (other !== group) other.open = false; });
      const flyout = group.querySelector('.xn-nav-flyout');
      group.classList.remove('xn-nav-subgroup--flip');
      if (flyout.getBoundingClientRect().right > innerWidth - 12) group.classList.add('xn-nav-subgroup--flip');
    }
  }));
  header.addEventListener('keydown', event => {
    const subgroup = event.target.closest('.xn-nav-subgroup');
    if (!subgroup || event.target.closest('.xn-mobile-navigation')) return;
    if (event.key === 'ArrowRight' && event.target === subgroup.querySelector('summary')) {
      event.preventDefault();
      subgroup.open = true;
      subgroup.querySelector('a').focus();
    } else if (event.key === 'ArrowLeft' && subgroup.open) {
      event.preventDefault();
      subgroup.open = false;
      subgroup.querySelector('summary').focus();
    }
  });
  document.addEventListener('click', event => {
    if (!header.contains(event.target)) header.querySelectorAll('details[open]').forEach(item => { item.open = false; });
  });
  header.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const active = document.activeElement;
    const group = active.closest('details[open]');
    if (group) {
      event.preventDefault();
      event.stopPropagation();
      group.open = false;
      group.querySelector('summary').focus();
    }
  });
  const mobileMenu = header.querySelector('.xn-mobile-navigation');
  const searchToggle = document.querySelector('#__search');
  const search = header.querySelector('[data-md-component="search"]');
  const launcher = header.querySelector('.xn-search-launcher');
  const query = header.querySelector('[data-md-component="search-query"]');
  if (search && searchToggle && launcher && query) {
    const back = document.createElement('button');
    back.type = 'button';
    back.className = 'xn-mobile-search-back';
    const locale = document.documentElement.lang;
    back.setAttribute('aria-label', ({pt: 'Voltar',es: 'Volver',fr: 'Retour',it: 'Indietro'})[locale.split('-')[0]] || 'Back');
    back.textContent = '←';
    search.prepend(back);
    function closeSearch() {
      searchToggle.checked = false;
      searchToggle.dispatchEvent(new Event('change', {bubbles: true}));
      launcher.focus({preventScroll: true});
    }
    back.addEventListener('click', closeSearch);
    launcher.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); launcher.click(); }
    });
    searchToggle.addEventListener('change', () => {
      if (searchToggle.checked && mobileMenu) mobileMenu.open = false;
    });
    query.addEventListener('keydown', event => {
      if (event.key === 'Escape' && matchMedia('(max-width: 1100px)').matches) {
        event.preventDefault(); event.stopPropagation(); closeSearch();
      }
    });
  }
  if (mobileMenu) header.addEventListener('keydown', event => {
    if (event.key !== 'Tab' || !mobileMenu.open) return;
    const controls = [...header.querySelectorAll('a, button, summary, [tabindex="0"]')].filter(item => item.getClientRects().length);
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  if (location.hash === '#guide-next' && document.querySelector('.xn-profile-stage')) {
    const title = document.querySelector('.xn-profile-stage h1');
    title.tabIndex = -1;
    title.focus({preventScroll: true});
  }
})();
