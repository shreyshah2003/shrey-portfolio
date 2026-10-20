(() => {
  const name = document.querySelector('.identity-name');
  const slot = document.querySelector('.identity-name-slot');
  const brand = document.querySelector('.brand');
  const star = document.querySelector('.identity-asterisk');
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  if (!name || !slot || !brand) return;
  let queued = false, spinFrame = 0, angle = 0, lastSpin = 0;
  function spin(now) {
    spinFrame = 0;
    const target = motionPreference.matches ? 0 : scrollY * .045;
    const dt = Math.min(.05, (now - lastSpin) / 1000 || .016);
    lastSpin = now;
    angle = motionPreference.matches ? 0 : angle + (target - angle) * (1 - Math.exp(-10 * dt));
    if (Math.abs(target - angle) < .01) angle = target;
    star.style.transform = `rotate(${angle}deg)`;
    if (Math.abs(target - angle) >= .01) spinFrame = requestAnimationFrame(spin);
  }
  function place() {
    queued = false;
    if (star && !spinFrame) { lastSpin = performance.now(); spinFrame = requestAnimationFrame(spin); }
    const origin = slot.getBoundingClientRect();
    const destination = brand.getBoundingClientRect();
    const large = innerWidth <= 360 ? 35 : innerWidth <= 800 ? 40 : Math.min(54, Math.max(38, innerWidth * .04));
    const small = parseFloat(getComputedStyle(brand).fontSize);
    const arrival = destination.top + (destination.height - small) / 2;
    const progress = Math.max(0, Math.min(1, 1 - (origin.top - arrival) / 95));
    const ease = progress * progress * (3 - 2 * progress);
    name.style.fontSize = `${large + (small - large) * ease}px`;
    name.style.top = `${Math.max(arrival, origin.top)}px`;
    name.style.left = `${origin.left + (destination.left - origin.left) * ease}px`;
  }
  function schedule() { if (!queued) { queued = true; requestAnimationFrame(place); } }
  document.documentElement.classList.add('identity-travels');
  place();
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', schedule);
  motionPreference.addEventListener('change', schedule);
  document.fonts?.ready.then(place);
})();
