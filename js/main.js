/* ========================================
   GlowApp Landing — Main JS
   ======================================== */

(function () {
  'use strict';

  /* --- Apply links from config --- */
  function applyLinks() {
    var tgLinks = ['link-tg-hero', 'link-tg-cta', 'link-tg-footer'];
    var maxLinks = ['link-max-hero', 'link-max-cta', 'link-max-footer'];

    tgLinks.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.href = CONFIG.telegram;
    });

    maxLinks.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.href = CONFIG.max;
    });

    var emailEl = document.getElementById('link-email-footer');
    if (emailEl) {
      emailEl.href = 'mailto:' + CONFIG.email;
      emailEl.textContent = CONFIG.email;
    }
  }

  /* --- Year --- */
  function setYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* --- Header scroll effect --- */
  function initHeaderScroll() {
    var header = document.getElementById('header');
    if (!header) return;

    var onScroll = function () {
      header.classList.toggle('header--scrolled', window.scrollY > 10);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Mobile menu --- */
  function initBurger() {
    var burger = document.getElementById('burger');
    var body = document.body;

    if (!burger) return;

    burger.addEventListener('click', function () {
      body.classList.toggle('nav-open');
    });

    var links = document.querySelectorAll('.header__link');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        body.classList.remove('nav-open');
      });
    });
  }

  /* --- Fade-in on scroll --- */
  function initFadeIn() {
    var elements = document.querySelectorAll('.fade-in');
    if (!elements.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* --- Custom cursor (desktop only) --- */
  function initCursor() {
    // Skip on touch devices
    if (!window.matchMedia('(hover: hover)').matches) return;
    if (window.innerWidth < 769) return;

    var dot = document.getElementById('cursor');
    var trail = document.getElementById('cursor-trail');
    if (!dot || !trail) return;

    var mouseX = 0, mouseY = 0;
    var dotX = 0, dotY = 0;
    var trailX = 0, trailY = 0;

    document.body.classList.add('cursor-ready');
    dot.style.opacity = '1';
    trail.style.opacity = '1';

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    // Hover detection for interactive elements
    var interactives = 'a, button, [role="button"], input, textarea, select';

    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(interactives)) {
        dot.classList.add('cursor--hover');
        trail.classList.add('cursor--hover');
      }
    });

    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(interactives)) {
        dot.classList.remove('cursor--hover');
        trail.classList.remove('cursor--hover');
      }
    });

    // Hide when mouse leaves window
    document.addEventListener('mouseleave', function () {
      dot.style.opacity = '0';
      trail.style.opacity = '0';
    });

    document.addEventListener('mouseenter', function () {
      dot.style.opacity = '1';
      trail.style.opacity = '1';
    });

    // Smooth follow with RAF
    function animate() {
      // Dot follows instantly
      dotX = mouseX;
      dotY = mouseY;
      dot.style.left = dotX + 'px';
      dot.style.top = dotY + 'px';

      // Trail follows with delay (lerp)
      trailX += (mouseX - trailX) * 0.15;
      trailY += (mouseY - trailY) * 0.15;
      trail.style.left = trailX + 'px';
      trail.style.top = trailY + 'px';

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  /* --- Mouse-follow glow in hero --- */
  function initMouseGlow() {
    var hero = document.getElementById('hero');
    var glow = document.getElementById('mouse-glow');
    if (!hero || !glow) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      glow.style.left = (e.clientX - rect.left) + 'px';
      glow.style.top = (e.clientY - rect.top) + 'px';
      glow.style.opacity = '1';
    }, { passive: true });

    hero.addEventListener('mouseleave', function () {
      glow.style.opacity = '0';
    });
  }

  /* --- Loading screen --- */
  function initLoader() {
    var loader = document.getElementById('loader');
    if (!loader) return;

    // Dismiss after progress bar animation (0.6s) + small buffer
    setTimeout(function () {
      loader.classList.add('loader--hidden');
    }, 700);

    // Remove from DOM after fade
    setTimeout(function () {
      if (loader.parentNode) loader.parentNode.removeChild(loader);
    }, 1100);
  }

  /* --- Init --- */
  document.addEventListener('DOMContentLoaded', function () {
    initLoader();
    applyLinks();
    setYear();
    initHeaderScroll();
    initBurger();
    initFadeIn();
    initCursor();
    initMouseGlow();
  });
})();
