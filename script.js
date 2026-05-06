/* =========================================================
   Harshala Pawar — Portfolio interactions
   ========================================================= */

(function () {
  'use strict';

  // ---------- Mobile nav toggle ----------
  const toggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu on link click (mobile)
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ---------- Nav scroll state ----------
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Reveal on scroll ----------
  const revealEls = document.querySelectorAll('.section, .project-card, .blog-card, .exp-item');
  revealEls.forEach((el) => el.classList.add('reveal'));

  const revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealIO.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => revealIO.observe(el));

  // ---------- Skill bar animation ----------
  const skillEls = document.querySelectorAll('.skill');
  const skillIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const pct = e.target.getAttribute('data-pct') || '0';
          const fill = e.target.querySelector('.fill');
          if (fill) fill.style.width = pct + '%';
          skillIO.unobserve(e.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  skillEls.forEach((el) => skillIO.observe(el));

  // ---------- Stat counter ----------
  const animateCount = (el, target, duration = 1400) => {
    const suffixSpan = el.querySelector('span'); // the "+" span
    const suffix = suffixSpan ? suffixSpan.outerHTML : '';
    const start = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const value = Math.round(target * easeOut(t));
      el.innerHTML = value + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const statEls = document.querySelectorAll('.stat-num[data-target]');
  const statIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const target = parseInt(e.target.getAttribute('data-target'), 10) || 0;
          animateCount(e.target, target);
          statIO.unobserve(e.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  statEls.forEach((el) => statIO.observe(el));

  // ---------- Active section highlight in nav ----------
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const setActive = (id) => {
    navAnchors.forEach((a) => {
      const isActive = a.getAttribute('href') === '#' + id;
      a.style.color = isActive ? 'var(--accent)' : '';
    });
  };

  const sectionIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => sectionIO.observe(s));

  // ---------- Smooth scroll offset compensation ----------
  // (covers the fixed nav so anchor jumps land below it)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight + 2;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
