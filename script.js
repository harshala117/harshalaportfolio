/* ============================================================
   Harshala Pawar — portfolio behaviour
   All content lives in index.html; this file only enhances it.
   Every lookup is null-guarded so a missing element can never
   break the rest of the page.
   ============================================================ */

(() => {
  'use strict';

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer  = matchMedia('(pointer: fine)').matches;

  /* ---------- headline: wrap words so they can stagger in ---------- */
  document.querySelectorAll('[data-split]').forEach((node) => {
    if (reduceMotion) return;
    let i = 0;
    const wrap = (el) => {
      [...el.childNodes].forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((token) => {
            if (!token.trim()) { frag.appendChild(document.createTextNode(token)); return; }
            const span = document.createElement('span');
            span.className = 'word';
            span.style.setProperty('--w', i++);
            span.textContent = token;
            frag.appendChild(span);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          // Never split inside a gradient span: background-clip:text clips to
          // the element's OWN text run, so text moved into child inline-blocks
          // loses the fill and renders transparent. Animate it as one unit.
          if (child.classList.contains('grad')) {
            child.classList.add('word');
            child.style.setProperty('--w', i++);
          } else {
            wrap(child);
          }
        }
      });
    };
    wrap(node);
  });

  /* ---------- mobile rail ---------- */
  const rail    = document.getElementById('rail');
  const menuBtn = document.getElementById('menuBtn');

  if (rail && menuBtn) {
    const setOpen = (open) => {
      rail.classList.toggle('open', open);
      menuBtn.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
    };
    menuBtn.addEventListener('click', () => setOpen(!rail.classList.contains('open')));
    rail.addEventListener('click', (e) => { if (e.target.tagName === 'A') setOpen(false); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  }

  /* ---------- scroll progress ---------- */
  const scrollBar = document.getElementById('scrollBar');

  /* ---------- experience stack: depth as a function of scroll ----------
     Each card reports how far the NEXT card has covered it, 0 → 1.
     CSS turns that into scale, lift and rotateX. */
  const stackCards = [...document.querySelectorAll('.stack-card')];

  const updateStack = () => {
    if (reduceMotion || innerWidth <= 960) return;
    stackCards.forEach((card, idx) => {
      const next = stackCards[idx + 1];
      if (!next) { card.style.setProperty('--p', '0'); return; }
      const cardTop = card.getBoundingClientRect().top;
      const nextTop = next.getBoundingClientRect().top;
      const span    = Math.max(next.offsetTop - card.offsetTop, 1);
      const covered = 1 - Math.min(Math.max((nextTop - cardTop) / span, 0), 1);
      card.style.setProperty('--p', covered.toFixed(3));
    });
  };

  /* ---------- active section in the rail ---------- */
  const navLinks = [...document.querySelectorAll('[data-nav]')];
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const updateActive = () => {
    const line = innerHeight * 0.34;
    let current = 0;
    sections.forEach((sec, i) => { if (sec.getBoundingClientRect().top <= line) current = i; });
    navLinks.forEach((a, i) => a.classList.toggle('active', i === current));
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      if (scrollBar) {
        const max = document.documentElement.scrollHeight - innerHeight;
        scrollBar.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
      }
      updateStack();
      updateActive();
      ticking = false;
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  /* ---------- reveal ----------
     Classes are added here rather than in the HTML, so the page stays
     fully readable if this script never runs. */
  const revealTargets = document.querySelectorAll('.sec-head, .cell, .flip, .stack-card, .contact-card');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((el) => el.classList.add('reveal', 'in'));
  } else {
    revealTargets.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px' });

    revealTargets.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 4, 3) * 65}ms`;
      io.observe(el);
    });
  }

  /* ---------- hero deck: pointer takes over from the auto-orbit ---------- */
  const stage = document.getElementById('stage');

  if (stage && finePointer && !reduceMotion) {
    const BASE_X = 56, BASE_Z = -40;

    // Written as custom properties, not as a transform, so the billboarded
    // plane labels can derive their counter-rotation from the same values.
    const setDeck = (rx, rz) => {
      stage.style.setProperty('--rx', `${rx}deg`);
      stage.style.setProperty('--rz', `${rz}deg`);
    };

    stage.addEventListener('mouseenter', () => {
      // A running animation outranks inline styles, so the orbit has to be
      // dropped entirely before the pointer can drive the deck.
      stage.classList.remove('auto-orbit');
    });

    stage.addEventListener('mousemove', (event) => {
      const b = stage.getBoundingClientRect();
      const dx = (event.clientX - b.left) / b.width  - 0.5;
      const dy = (event.clientY - b.top)  / b.height - 0.5;
      setDeck(BASE_X - dy * 14, BASE_Z + dx * 18);
    });

    stage.addEventListener('mouseleave', () => {
      setDeck(BASE_X, BASE_Z);
      stage.style.removeProperty('--rx');
      stage.style.removeProperty('--rz');
      stage.classList.add('auto-orbit');
    });
  }

  /* ---------- bento cells: tilt toward the pointer ---------- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll('.tilt').forEach((cardEl) => {
      cardEl.addEventListener('mousemove', (event) => {
        const b = cardEl.getBoundingClientRect();
        const x = (event.clientX - b.left) / b.width  - 0.5;
        const y = (event.clientY - b.top)  / b.height - 0.5;
        cardEl.style.transform =
          `translateY(-4px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
      });
      cardEl.addEventListener('mouseleave', () => { cardEl.style.transform = ''; });
    });
  }

  /* ---------- stat count-up ---------- */
  const counters = document.querySelectorAll('.num[data-count]');

  if (counters.length && !reduceMotion && 'IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el     = entry.target;
        const target = Number(el.dataset.count);
        countObserver.unobserve(el);
        if (!Number.isFinite(target)) return;

        const DURATION = 1100;
        const start    = performance.now();

        const step = (now) => {
          const p = Math.min((now - start) / DURATION, 1);
          el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });

    counters.forEach((el) => countObserver.observe(el));
  }
})();
