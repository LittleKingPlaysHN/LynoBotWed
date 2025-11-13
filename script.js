
(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  const menuToggle = document.querySelector('#menu-toggle');
const nav = document.querySelector('#main-nav');

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !open);
  nav.classList.toggle('open', !open);
});


  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnLoad = () => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('load', revealOnLoad);

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, {threshold: 0.12});
  revealElements.forEach(el => io.observe(el));

  const stats = { servers: '1,234', users: '56,789' };
  setTimeout(() => {
    $('#stat-servers') && ($('#stat-servers').textContent = stats.servers);
    $('#stat-users') && ($('#stat-users').textContent = stats.users);
  }, 800);


const form = document.querySelector('#contact-form');

form?.addEventListener('submit', (ev) => {
  ev.preventDefault();

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar';

 
    showToast('Mensaje enviado correctamente !Feliz Dia!');

    form.reset();
  }, 900);
});

function showToast(message, duration = 2500) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

document.querySelector('#copy-invite')?.addEventListener('click', () => {
  const invite = 'https://discord.com/oauth2/authorize?client_id=1398492279194390578';
  navigator.clipboard?.writeText(invite)
    .then(() => showToast('Enlace de invitación copiado al portapapeles.'))
    .catch(() => showToast('No se pudo copiar. Usa Ctrl+C.'));
});

  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  if (!canvas || !ctx) return;

  let W, H, particles = [], maxP = 80;
  function resize() {
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function rand(min, max){ return Math.random()*(max-min)+min; }

  function createParticles(){
    particles = [];
    const count = Math.min(maxP, Math.floor(W/15));
    for(let i=0;i<count;i++){
      particles.push({
        x: rand(0,W),
        y: rand(0,H),
        r: rand(0.8,2.2),
        vx: rand(-0.3,0.3),
        vy: rand(-0.3,0.3),
        hue: rand(190,220),
        life: rand(40,200)
      });
    }
  }
  createParticles();

  function step(){
    ctx.clearRect(0,0,W,H);
    for(let p of particles){
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.2;
      if(p.life < 0){ p.x = rand(0,W); p.y = rand(0,H); p.life = rand(40,200); }

      ctx.beginPath();
      const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*8);
      g.addColorStop(0, `hsla(${p.hue},95%,60%,0.12)`);
      g.addColorStop(0.3, `hsla(${p.hue},95%,60%,0.06)`);
      g.addColorStop(1, `rgba(0,0,0,0)`);
      ctx.fillStyle = g;
      ctx.fillRect(p.x - p.r*8, p.y - p.r*8, p.r*16, p.r*16);

      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue},90%,60%,0.95)`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    }

    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const a = particles[i], b = particles[j];
        const dx = a.x-b.x, dy = a.y-b.y;
        const d = Math.sqrt(dx*dx+dy*dy);
        if(d < 110){
          ctx.beginPath();
          ctx.strokeStyle = `rgba(46,117,255,${0.08 * (1 - d/110)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(step);
  }
  step();
})();
