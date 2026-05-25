/* ═══════════════════════════════════════════
   Yael Swimmer Portfolio — main.js
   ═══════════════════════════════════════════ */

'use strict';

/* ──────────────── Nav scroll effect ──────────────── */
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 60);
  lastScroll = y;
}, { passive: true });


/* ──────────────── Mobile menu ──────────────── */
const toggle   = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const spans    = toggle.querySelectorAll('span');

function openMenu() {
  navLinks.classList.add('open');
  spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
  spans[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  navLinks.classList.remove('open');
  spans[0].style.transform = '';
  spans[1].style.transform = '';
  document.body.style.overflow = '';
}

toggle.addEventListener('click', () => {
  navLinks.classList.contains('open') ? closeMenu() : openMenu();
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !toggle.contains(e.target)) {
    closeMenu();
  }
});

// Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});


/* ──────────────── Scroll reveal (IntersectionObserver) ──────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach((el, i) => {
  // Stagger siblings inside the same parent
  const siblings = el.parentElement.querySelectorAll('.reveal');
  if (siblings.length > 1) {
    const idx = Array.from(siblings).indexOf(el);
    el.style.transitionDelay = `${idx * 0.08}s`;
  }
  revealObserver.observe(el);
});


/* ──────────────── Masonry layout ──────────────── */
function runMasonry() {
  const grid = document.querySelector('.portfolio-grid');
  if (!grid) return;
  const gap = parseFloat(getComputedStyle(grid).columnGap) || 28;
  grid.querySelectorAll('.card').forEach(card => {
    card.style.gridRowEnd = 'auto';
  });
  grid.querySelectorAll('.card:not(.hidden)').forEach(card => {
    const h = card.getBoundingClientRect().height;
    card.style.gridRowEnd = `span ${Math.ceil(h + gap)}`;
  });
}

window.addEventListener('load', runMasonry);
window.addEventListener('resize', runMasonry);

// Re-run masonry whenever any thumb image finishes loading
document.querySelectorAll('.card img').forEach(img => {
  if (img.complete) return;
  img.addEventListener('load', runMasonry);
  img.addEventListener('error', runMasonry);
});
// Initial run after DOM ready (in case images already cached)
if (document.readyState !== 'loading') runMasonry();
else document.addEventListener('DOMContentLoaded', runMasonry);


/* ──────────────── Portfolio filter ──────────────── */
const filterBtns = document.querySelectorAll('.filter__btn');
const cards      = document.querySelectorAll('.card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    cards.forEach(card => {
      const cat = (card.dataset.category || '').toLowerCase();
      const show = filter === 'all' || cat.includes(filter);
      card.classList.toggle('hidden', !show);
    });

    requestAnimationFrame(runMasonry);
  });
});


/* ──────────────── Active nav link on scroll ──────────────── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, {
  threshold: 0.35
});

sections.forEach(s => sectionObserver.observe(s));


/* ──────────────── Subtle card tilt on mouse move ──────────────── */
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect  = card.getBoundingClientRect();
    const cx    = rect.left + rect.width / 2;
    const cy    = rect.top  + rect.height / 2;
    const dx    = (e.clientX - cx) / (rect.width / 2);
    const dy    = (e.clientY - cy) / (rect.height / 2);
    const tiltX = -(dy * 4).toFixed(2);
    const tiltY =  (dx * 4).toFixed(2);
    card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


/* ──────────────── Smooth anchor scroll (offset for fixed nav) ──────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH   = nav.offsetHeight;
    const top    = target.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
