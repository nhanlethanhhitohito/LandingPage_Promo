/* ==========================================================================
   Entry point — Bitex landing page
   ========================================================================== */

import { initReveal, initCountUp, initNavScroll, initParallax, initColorPicker, initExplosion, initExplosionHoverLink } from './animations.js';
import { initNav } from './nav.js';

const boot = () => {
  initNav();
  initNavScroll();
  initReveal();
  initCountUp();
  initParallax();
  initColorPicker();
  initExplosion();
  initExplosionHoverLink();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
