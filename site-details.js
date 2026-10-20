// Keep dated details accurate without introducing a loading dependency.
(() => {
  const now = new Date();
  document.querySelectorAll('[data-current-year]').forEach(el => el.textContent = now.getFullYear());
  document.querySelectorAll('[data-start]').forEach(el => {
    const [year, month] = el.dataset.start.split('-').map(Number);
    const elapsed = Math.max(0, (now.getFullYear() - year) * 12 + now.getMonth() - (month - 1));
    const years = Math.floor(elapsed / 12), months = elapsed % 12;
    const value = el.querySelector('strong');
    value.replaceChildren();
    if (years) value.append(`${years} yr${years === 1 ? '' : 's'}`);
    if (months || !years) {
      if (years) value.append(' ');
      const part = document.createElement('span');
      part.textContent = `${months} mo`;
      value.append(part);
    }
    el.setAttribute('aria-label', `${years} year${years === 1 ? '' : 's'} and ${months} month${months === 1 ? '' : 's'} at Speed`);
  });
})();
