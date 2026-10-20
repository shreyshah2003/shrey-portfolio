(() => {
  const dialog = document.querySelector('#contact-dialog');
  if (!dialog) return;
  let opener;
  const close = () => dialog.close();
  document.querySelectorAll('[data-contact-choice]').forEach(link => {
    link.addEventListener('click', event => {
      if (typeof dialog.showModal !== 'function') return;
      event.preventDefault();
      opener = link;
      dialog.showModal();
    });
  });
  dialog.querySelector('.contact-close').addEventListener('click', close);
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close();
  });
  dialog.querySelectorAll('.contact-option').forEach(link => link.addEventListener('click', close));
  dialog.addEventListener('close', () => opener?.focus({preventScroll:true}));
})();
