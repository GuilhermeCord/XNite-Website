/* Native details provide the individual answers even without JavaScript. */
(() => {
  document.querySelectorAll('[data-faq-section]').forEach(section => {
    const questions = [...section.querySelectorAll('.xn-faq-question')];
    const toggle = document.createElement('button');
    toggle.type = 'button';toggle.className = 'xn-faq-toggle';
    toggle.setAttribute('aria-controls',section.querySelector('.xn-faq-items').id);
    function update() {
      const allOpen = questions.every(question=>question.open);
      toggle.textContent = allOpen ? section.dataset.collapseLabel : section.dataset.expandLabel;
      toggle.setAttribute('aria-expanded',String(allOpen));
    }
    toggle.addEventListener('click',()=>{
      const open = !questions.every(question=>question.open);
      questions.forEach(question=>{question.open=open;});update();
    });
    questions.forEach(question=>question.addEventListener('toggle',update));
    section.querySelector('.xn-faq-section__heading').append(toggle);update();
  });
})();
