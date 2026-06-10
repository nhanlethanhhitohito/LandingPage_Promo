/* ==========================================================================
   Mobile nav drawer (hamburger toggle)
   ========================================================================== */

export function initNav() {
  const nav = document.getElementById('nav');
  const button = document.getElementById('hamburger');
  const drawer = document.getElementById('navDrawer');
  if (!nav || !button || !drawer) return;

  const close = () => {
    nav.classList.remove('is-open');
    button.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
  };

  const open = () => {
    nav.classList.add('is-open');
    button.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
  };

  button.addEventListener('click', () => {
    if (nav.classList.contains('is-open')) close();
    else open();
  });

  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) close();
  });

  const mq = window.matchMedia('(min-width: 1024px)');
  mq.addEventListener('change', (e) => { if (e.matches) close(); });
}
