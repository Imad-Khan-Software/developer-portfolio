/* ================================================
   IMAD KHAN — PORTFOLIO JS  (Professional v2)
   ================================================ */

/* ── THEME — runs immediately to prevent flash ── */
(function () {
  if (localStorage.getItem('theme') === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

function toggleTheme() {
  const html    = document.documentElement;
  const btn     = document.getElementById('themeSwitch');
  const isLight = html.getAttribute('data-theme') === 'light';
  if (isLight) {
    html.removeAttribute('data-theme');
    if (btn) btn.textContent = '🌙';
    localStorage.setItem('theme', 'dark');
  } else {
    html.setAttribute('data-theme', 'light');
    if (btn) btn.textContent = '☀️';
    localStorage.setItem('theme', 'light');
  }
}

/* ── INIT ── */
window.addEventListener('DOMContentLoaded', () => {

  /* Sync button icon with saved theme */
  const btn = document.getElementById('themeSwitch');
  if (btn) {
    btn.textContent = document.documentElement.getAttribute('data-theme') === 'light' ? '☀️' : '🌙';
  }

  /* Typing animation */
  const typingEl = document.getElementById('typingText');
  if (typingEl) {
    const phrases = [
      'Front-end Developer',
      'UI/UX Enthusiast',
      'JavaScript Engineer',
      'Freelance Developer',
    ];
    let pi = 0, ci = 0, deleting = false;

    function type() {
      const phrase = phrases[pi];
      typingEl.textContent = deleting
        ? phrase.substring(0, ci - 1)
        : phrase.substring(0, ci + 1);
      deleting ? ci-- : ci++;

      if (!deleting && ci === phrase.length) { setTimeout(() => deleting = true, 2200); }
      else if (deleting && ci === 0)         { deleting = false; pi = (pi + 1) % phrases.length; }

      setTimeout(type, deleting ? 45 : 95);
    }
    type();
  }

  /* Scroll fade-in */
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('fade-in'); }),
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('section, .project-card, .edu-card, .skill-category, .timeline-item')
    .forEach(el => observer.observe(el));

  /* Nav hide-on-scroll */
  const nav = document.getElementById('mainNav') || document.querySelector('nav');
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (nav) nav.style.transform = (y > lastY && y > 80) ? 'translateY(-100%)' : 'translateY(0)';
    lastY = y <= 0 ? 0 : y;

    let current = '';
    document.querySelectorAll('section[id]').forEach(s => {
      if (y >= s.offsetTop - 120) current = s.id;
    });
    document.querySelectorAll('nav ul a').forEach(a => {
      a.classList.remove('active');
      const href = a.getAttribute('href');
      if (href === '#' + current || href === current + '.html') a.classList.add('active');
    });
  }, { passive: true });

  /* Smooth scroll for hash links */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      document.getElementById('navMenu')?.classList.remove('open');
    });
  });

  /* Close mobile menu on outside click */
  document.addEventListener('click', e => {
    const menu = document.getElementById('navMenu');
    if (!e.target.closest('nav') && menu?.classList.contains('open')) {
      menu.classList.remove('open');
    }
  });

  /* Animate hero skill pills */
  document.querySelectorAll('.hero-skill-pill').forEach((pill, i) => {
    setTimeout(() => pill.classList.add('visible'), 600 + i * 80);
  });

});