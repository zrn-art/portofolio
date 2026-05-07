// ===== CUSTOM CURSOR (desktop only) =====
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

if (window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });
  (function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  })();
  document.querySelectorAll('a, button, .skill-card, .net-card, .social-card, .cert-badge').forEach(el => {
    el.addEventListener('mouseenter', () => cursorFollower.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover'));
  });
}

// ===== MOBILE HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ===== SKILL BAR ANIMATION =====
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const w = target.style.width;
      target.style.width = '0';
      requestAnimationFrame(() => requestAnimationFrame(() => { target.style.width = w; }));
      skillObserver.unobserve(target);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(el => {
  const w = el.style.width; el.style.width = '0';
  skillObserver.observe(el);
});

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll('.skill-card, .net-card, .social-card, .cert-badge, .info-item');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
reveals.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// ===== ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 140) current = sec.id; });
  navLinks.forEach(a => {
    a.style.opacity = a.getAttribute('href') === '#' + current ? '1' : '0.7';
  });
});

// ===== HERO ENTRANCE =====
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.hero-eyebrow, .title-line, .hero-desc, .hero-btns, .hero-stats').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, 200 + i * 120);
  });
});
