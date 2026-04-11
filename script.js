/* ── CURSOR GLOW ── */
const glow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});

/* ── MOBILE NAV TOGGLE ── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── TYPEWRITER ── */
const roles = [
  'Software Engineer',
  'Cloud Architect',
  'Full Stack Developer',
  'AI/ML Engineer',
];
let ri = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const word = roles[ri];
  if (!deleting) {
    typedEl.textContent = word.slice(0, ci + 1);
    ci++;
    if (ci === word.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = word.slice(0, ci - 1);
    ci--;
    if (ci === 0) {
      deleting = false;
      ri = (ri + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 48 : 88);
}
type();

/* ── FLOATING PARTICLES ── */
const pc = document.getElementById('particles');
const pColors = [
  'rgba(91,71,224,0.22)',
  'rgba(13,148,136,0.18)',
  'rgba(124,111,255,0.2)'
];
for (let i = 0; i < 14; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const s = Math.random() * 3 + 1;
  p.style.cssText = `
    width:${s}px; height:${s}px;
    left:${Math.random() * 100}%;
    background:${pColors[Math.floor(Math.random() * pColors.length)]};
    animation-duration:${Math.random() * 14 + 10}s;
    animation-delay:${Math.random() * 10}s;
  `;
  pc.appendChild(p);
}

/* ── SCROLL REVEAL ── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.timeline-item, .project-card, .cert-card, .skill-block, .edu-card, .reveal'
).forEach(el => revObs.observe(el));

/* Stagger transitions */
document.querySelectorAll('.cert-card').forEach((c, i) => {
  c.style.transitionDelay = (i * 0.07) + 's';
});
document.querySelectorAll('.project-card').forEach((c, i) => {
  c.style.transitionDelay = (i * 0.09) + 's';
});
document.querySelectorAll('.skill-block').forEach((c, i) => {
  c.style.transitionDelay = (i * 0.07) + 's';
});

/* ── COUNTER ANIMATION ── */
function animateCounter(el, target) {
  let n = 0;
  const step = target / 40;
  const iv = setInterval(() => {
    n = Math.min(n + step, target);
    el.innerHTML = Math.round(n) + '<span>+</span>';
    if (n >= target) clearInterval(iv);
  }, 28);
}

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
  let countersRun = false;
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !countersRun) {
        countersRun = true;
        document.querySelectorAll('.stat-num[data-count]').forEach(el => {
          animateCounter(el, parseInt(el.dataset.count));
        });
      }
    });
  }, { threshold: 0.5 }).observe(statsSection);
}

/* ── NAVBAR SCROLL SHADOW ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 2px 20px rgba(80,60,200,0.07)';
  } else {
    navbar.style.boxShadow = 'none';
  }
}, { passive: true });
