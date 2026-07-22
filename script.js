// Keep the portfolio experience section aligned with the latest resume.
const experienceTimeline = document.querySelector('#experience .timeline');
if (experienceTimeline) {
  experienceTimeline.innerHTML = `
    <div class="tl-item reveal">
      <div class="tl-when">Jan 2026 — May 2026</div>
      <h4>Solution Architect Academic Intern</h4>
      <div class="tl-org">Resilient Privacy Inc. · Dallas, TX</div>
      <p>
        • Architected a cloud-native, multi-tenant AWS platform delivering scalable, resilient, and highly available infrastructure for enterprise SaaS applications.<br><br>
        • Implemented authentication and authorization controls using IAM role-based access control and least-privilege security policies across a multi-tenant environment.<br><br>
        • Monitored service health and performance using Amazon CloudWatch metrics, logs, dashboards, and alerts to troubleshoot issues and improve reliability.<br><br>
        • Configured Auto Scaling and Elastic Load Balancing (ELB/ALB) to support high availability, fault tolerance, and production readiness under variable workloads.<br><br>
        • Reduced monthly cloud spend by 15–20% by right-sizing EC2 and S3 configurations and analyzing resource-utilization metrics.
      </p>
      <div class="proj-tags"><span>AWS</span><span>IAM</span><span>CloudWatch</span><span>Auto Scaling</span><span>ELB/ALB</span></div>
    </div>

    <div class="tl-item reveal">
      <div class="tl-when">Aug 2023 — Jun 2024</div>
      <h4>Full Stack Developer</h4>
      <div class="tl-org">Cinematic Psychos Production · Mumbai, India</div>
      <p>
        • Developed and maintained scalable web application features using React and JavaScript, translating client business requirements into technical deliverables in an Agile environment.<br><br>
        • Designed and integrated 6+ REST API endpoints that enabled communication between frontend applications and backend services.<br><br>
        • Built and maintained CI/CD pipeline stages to automate build, test, and deployment workflows and improve release reliability.<br><br>
        • Troubleshot client-reported production issues across application and database layers, optimized SQL queries, and contributed to code reviews and unit testing.
      </p>
      <div class="proj-tags"><span>React</span><span>JavaScript</span><span>REST APIs</span><span>SQL</span><span>CI/CD</span></div>
    </div>

    <div class="tl-item reveal">
      <div class="tl-when">Jan 2023 — Apr 2023</div>
      <h4>Software Developer</h4>
      <div class="tl-org">Sourcewell Device Private Limited · Mumbai, India</div>
      <p>
        • Developed and maintained backend features and REST APIs for enterprise web applications.<br><br>
        • Wrote and optimized SQL queries across databases containing 50K+ records to support business workflows and improve application performance.<br><br>
        • Collaborated with cross-functional teams in an Agile environment to integrate backend services with databases.<br><br>
        • Resolved 30+ application defects, performed unit testing, and participated in code reviews using Jira and Postman, improving application stability.
      </p>
      <div class="proj-tags"><span>Backend Development</span><span>REST APIs</span><span>SQL</span><span>Jira</span><span>Postman</span></div>
    </div>
  `;
}

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
