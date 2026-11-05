/* ============================================================
   Harshala Pawar portfolio behaviour
   Theme switch, active menu highlight and footer year.
   Every lookup is null guarded so nothing can break the page.
   ============================================================ */

(() => {
  'use strict';

  const root = document.documentElement;

  /* ---------- light / dark theme ---------- */
  const toggle = document.getElementById('themeToggle');
  const label = toggle ? toggle.querySelector('.theme-label') : null;
  const meta = document.querySelector('meta[name="theme-color"]');

  const apply = (theme) => {
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    if (label) label.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0F1420' : '#EEF2F9');
  };

  apply(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem('hp-theme', next); } catch (e) { /* storage unavailable */ }
    });
  }

  /* ---------- highlight the menu link for the section in view ---------- */
  const links = [...document.querySelectorAll('.navlink')];
  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = '#' + entry.target.id;
        links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === id));
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach((s) => observer.observe(s));
  }

  /* ---------- footer year ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
