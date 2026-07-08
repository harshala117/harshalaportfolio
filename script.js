// nav border on scroll
  const nav = document.getElementById('nav');
  addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20));

  // reveal on scroll
  const io = new IntersectionObserver((es) => {
    es.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold:.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // 3D tilt on hero card
  const card = document.getElementById('tiltCard');
  const parent = card.parentElement;
  parent.addEventListener('mousemove', (e) => {
    const r = parent.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - .5;
    const y = (e.clientY - r.top)/r.height - .5;
    card.style.transform = `rotateY(${x*10}deg) rotateX(${-y*10}deg)`;
  });
  parent.addEventListener('mouseleave', () => card.style.transform = 'rotateY(0) rotateX(0)');

  // spotlight on skill cards
  document.querySelectorAll('.skill-card').forEach(c => {
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', (e.clientX-r.left)+'px');
      c.style.setProperty('--my', (e.clientY-r.top)+'px');
    });
  });
