// scroll bar
window.addEventListener('scroll', () => {
  const p = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  document.getElementById('scroll-fill').style.width = (p * 100) + '%';
});

// typed text
const phrases = [
  'Proteger dados é proteger pessoas.',
  'GRC não é burocracia — é continuidade do negócio.',
  'O fator humano é o vetor mais explorado.',
  'Conformidade com a LGPD não é opcional em 2026.'
];
let pi = 0, ci = 0, deleting = false;
function type() {
  const el = document.getElementById('typed-text');
  const phrase = phrases[pi];
  if (!deleting) {
    el.textContent = phrase.slice(0, ++ci);
    if (ci === phrase.length) { deleting = true; setTimeout(type, 2000); return; }
  } else {
    el.textContent = phrase.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 40 : 70);
}
type();

// counters
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const isFloat = target % 1 !== 0;
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = prefix + (isFloat ? current.toFixed(2) : Math.floor(current)) + suffix;
    if (current >= target) clearInterval(timer);
  }, 25);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-target]').forEach(animateCounter);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.stats-row').forEach(el => counterObs.observe(el));

// fade-up
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
}), { threshold: 0.08 });
document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

// cursor
const dot = document.createElement('div');
dot.style.cssText = 'position:fixed;width:8px;height:8px;background:#00d4aa;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:transform .1s';
document.body.appendChild(dot);
const ring = document.createElement('div');
ring.style.cssText = 'position:fixed;width:28px;height:28px;border:1px solid rgba(0,212,170,0.4);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:left .08s ease,top .08s ease';
document.body.appendChild(ring);
document.addEventListener('mousemove', e => {
  dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px';
  ring.style.left = e.clientX + 'px'; ring.style.top = e.clientY + 'px';
});
document.querySelectorAll('a,button').forEach(el => {
  el.addEventListener('mouseenter', () => { dot.style.transform = 'translate(-50%,-50%) scale(2)'; ring.style.transform = 'translate(-50%,-50%) scale(1.4)'; });
  el.addEventListener('mouseleave', () => { dot.style.transform = 'translate(-50%,-50%) scale(1)'; ring.style.transform = 'translate(-50%,-50%) scale(1)'; });
});

// particles
const canvas = document.createElement('canvas');
canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:0.18';
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');
const pts = [];
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resize(); window.addEventListener('resize', resize);
for (let i = 0; i < 50; i++) pts.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4 });
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pts.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath(); ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2); ctx.fillStyle = '#00d4aa'; ctx.fill();
  });
  for (let a = 0; a < pts.length; a++) for (let b = a + 1; b < pts.length; b++) {
    const d = Math.hypot(pts[a].x - pts[b].x, pts[a].y - pts[b].y);
    if (d < 120) { ctx.beginPath(); ctx.moveTo(pts[a].x, pts[a].y); ctx.lineTo(pts[b].x, pts[b].y); ctx.strokeStyle = `rgba(0,212,170,${1 - d / 120})`; ctx.lineWidth = .4; ctx.stroke(); }
  }
  requestAnimationFrame(draw);
}
draw();
