// ===== Scroll progress bar =====
const scrollFill = document.getElementById('scroll-fill');
function updateScrollBar(){
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  if(scrollFill) scrollFill.style.width = scrolled + '%';
}
document.addEventListener('scroll', updateScrollBar, { passive:true });
updateScrollBar();
 
// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if(navToggle && navLinks){
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
 
// ===== Reveal on scroll =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold:0.15 });
revealEls.forEach(el => revealObserver.observe(el));
 
// ===== Animated stat counters =====
const statEls = document.querySelectorAll('.stat-val');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const duration = 1200;
    const start = performance.now();
 
    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = prefix + value.toFixed(decimals) + suffix;
      if(progress < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(tick);
    statObserver.unobserve(el);
  });
}, { threshold:0.4 });
statEls.forEach(el => statObserver.observe(el));
 
// ===== Footer year + badge date =====
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();
const badgeDate = document.getElementById('badgeDate');
if(badgeDate) badgeDate.textContent = new Date().getFullYear();
