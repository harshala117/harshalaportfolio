

// nav border on scroll
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20));

// reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach((element) => io.observe(element));

// 3D tilt on hero card
const card = document.getElementById('tiltCard');
const parent = card.parentElement;
parent.addEventListener('mousemove', (event) => {
  const bounds = parent.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - .5;
  const y = (event.clientY - bounds.top) / bounds.height - .5;
  card.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
});
parent.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateY(0) rotateX(0)';
});

// spotlight on skill cards
document.querySelectorAll('.skill-card').forEach((skillCard) => {
  skillCard.addEventListener('mousemove', (event) => {
    const bounds = skillCard.getBoundingClientRect();
    skillCard.style.setProperty('--mx', `${event.clientX - bounds.left}px`);
    skillCard.style.setProperty('--my', `${event.clientY - bounds.top}px`);
  });
});
