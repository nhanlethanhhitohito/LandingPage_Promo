/* ==========================================================================
   Entry point — Bitex landing page
   ========================================================================== */

import { initReveal, initCountUp, initNavScroll, initParallax, initColorPicker } from './animations.js';
import { initNav } from './nav.js';

const boot = () => {
  initNav();
  initNavScroll();
  initReveal();
  initCountUp();
  initParallax();
  initColorPicker();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
