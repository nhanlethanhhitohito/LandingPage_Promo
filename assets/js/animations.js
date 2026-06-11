/* ==========================================================================
   Scroll reveal + count-up + nav state
   Pure IntersectionObserver — no dependency.
   Respects prefers-reduced-motion.
   ========================================================================== */

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Scroll reveal (BẮT BUỘC 3 — every section) ---------- */
export function initReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -8% 0px'
  });

  targets.forEach(el => io.observe(el));
}

/* ---------- Count-up for [data-count] ---------- */
export function initCountUp() {
  const nodes = document.querySelectorAll('[data-count]');
  if (!nodes.length) return;

  if (reduced || !('IntersectionObserver' in window)) {
    nodes.forEach(n => { n.textContent = n.dataset.count; });
    return;
  }

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  const run = (node) => {
    const target = parseInt(node.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      const value = Math.round(easeOut(p) * target);
      node.textContent = value.toLocaleString('vi-VN');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        run(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  nodes.forEach(n => io.observe(n));
}

/* ---------- Sticky nav: solid background after scroll ---------- */
export function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const apply = () => {
    if (window.scrollY > 8) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  apply();
  window.addEventListener('scroll', apply, { passive: true });
}

/* ---------- Hero product subtle parallax on scroll ---------- */
export function initParallax() {
  if (reduced) return;
  const product = document.querySelector('.hero__product');
  if (!product) return;

  let ticking = false;
  const apply = () => {
    const offset = Math.min(window.scrollY * 0.12, 60);
    product.style.setProperty('--parallax-y', `${offset}px`);
    product.style.translate = `0 ${offset}px`;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(apply);
      ticking = true;
    }
  }, { passive: true });
}

/* ---------- Calc explosion (reverse-assemble) — scrub linked to scroll ----------
   Replicates ASUS .phone_explosion (GSAP ScrollTrigger: start "top 60%", end
   "bottom 80%", scrub). Drives a CSS custom property --p on the stage.
*/
export function initExplosion() {
  const stages = document.querySelectorAll('[data-explosion]');
  if (!stages.length) return;

  if (reduced) {
    stages.forEach(s => s.style.setProperty('--p', '1'));
    return;
  }

  const visible = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) visible.add(e.target);
      else visible.delete(e.target);
    });
  }, { rootMargin: '40% 0px 40% 0px', threshold: 0 });

  stages.forEach(s => io.observe(s));

  let ticking = false;
  const compute = () => {
    const vh = window.innerHeight;
    visible.forEach(stage => {
      const rect = stage.getBoundingClientRect();
      const startY = 0.60 * vh;
      const endTopY = 0.80 * vh - rect.height;
      const denom = startY - endTopY;
      if (denom <= 0) { stage.style.setProperty('--p', '1'); return; }
      const p = Math.max(0, Math.min(1, (startY - rect.top) / denom));
      stage.style.setProperty('--p', p.toFixed(3));
    });
    ticking = false;
  };

  const schedule = () => {
    if (!ticking) {
      requestAnimationFrame(compute);
      ticking = true;
    }
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  compute();
}

/* ---------- Color picker on showcase ---------- */
export function initColorPicker() {
  const dots = document.querySelectorAll('.color-dot');
  if (!dots.length) return;
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('is-active'));
      dot.classList.add('is-active');
    });
  });
}
