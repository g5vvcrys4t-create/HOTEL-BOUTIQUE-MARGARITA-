(function () {
  'use strict';

  var WHATSAPP = '524441921784';

  function waLink(mensaje) {
    return 'https://wa.me/' + WHATSAPP + (mensaje ? '?text=' + encodeURIComponent(mensaje) : '');
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  window.MARGARITA = { waLink: waLink, esc: esc };

  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.href = waLink(a.getAttribute('data-wa'));
    a.target = '_blank';
    a.rel = 'noopener';
  });

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  function setMenu(open) {
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('no-scroll', open);
  }
  if (header && toggle) {
    toggle.addEventListener('click', function () { setMenu(!header.classList.contains('nav-open')); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('nav-open')) { setMenu(false); toggle.focus(); }
    });
    header.querySelectorAll('.main-nav a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    window.matchMedia('(min-width: 1000px)').addEventListener('change', function (e) { if (e.matches) setMenu(false); });
  }

  function onScroll() { if (header) header.classList.toggle('is-solid', window.scrollY > 40); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    window.MARGARITA.observeReveal = function (root) {
      (root || document).querySelectorAll('.reveal:not(.is-visible)').forEach(function (el) { io.observe(el); });
    };
  } else {
    window.MARGARITA.observeReveal = function (root) {
      (root || document).querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
    };
  }
  window.MARGARITA.observeReveal();
})();
