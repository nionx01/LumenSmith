/* ═══════════════════════════════════════════════════════════════
   LumenSmith Wiki — Interactive Enhancements
   Scroll animations, anchor links, ripple effects, lightbox, etc.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ──── Reading Progress Bar ────
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress';
  document.body.appendChild(progressBar);

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }

  // ──── Back to Top Button ────
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>';
  document.body.appendChild(backToTop);

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  function updateBackToTop() {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  // ──── Sidebar Overlay (Mobile) ────
  const sidebar = document.querySelector('.sidebar');
  let overlay = document.querySelector('.sidebar-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
  }

  function closeSidebar() {
    if (sidebar) {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    }
  }

  overlay.addEventListener('click', closeSidebar);

  // Update menu toggle to also manage overlay
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = sidebar.classList.toggle('open');
      if (isOpen) {
        overlay.classList.add('active');
      } else {
        overlay.classList.remove('active');
      }
    });
  }

  // Close sidebar when clicking a nav link (mobile)
  document.querySelectorAll('.sidebar .nav-link, .sidebar-sub a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        closeSidebar();
      }
    });
  });

  // ──── Heading Anchor Links ────
  document.querySelectorAll('.main h2[id], .main h3[id]').forEach(function (heading) {
    var anchor = document.createElement('a');
    anchor.className = 'heading-anchor';
    anchor.href = '#' + heading.id;
    anchor.textContent = '#';
    anchor.setAttribute('aria-label', 'Link to this section');
    heading.appendChild(anchor);
  });

  // Auto-generate IDs for headings without one
  var idCounter = 0;
  document.querySelectorAll('.main h2:not([id]), .main h3:not([id])').forEach(function (heading) {
    var text = heading.textContent.trim().toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 50);
    if (!text) text = 'section-' + (++idCounter);

    // Ensure unique
    var baseId = text;
    var counter = 1;
    while (document.getElementById(text)) {
      text = baseId + '-' + counter++;
    }

    heading.id = text;

    var anchor = document.createElement('a');
    anchor.className = 'heading-anchor';
    anchor.href = '#' + heading.id;
    anchor.textContent = '#';
    anchor.setAttribute('aria-label', 'Link to this section');
    heading.appendChild(anchor);
  });

  // ──── Scroll Reveal Animation ────
  var revealElements = [];

  // Mark sections for reveal
  document.querySelectorAll('.main h2, .main h3, .main .info-box, .main pre, .main table, .main .feature-card, .main .quick-link, .main .screenshot-grid img').forEach(function (el) {
    el.classList.add('reveal');
    revealElements.push(el);
  });

  // Mark grids for stagger
  document.querySelectorAll('.feature-grid, .quick-links').forEach(function (grid) {
    grid.classList.add('reveal-stagger');
    revealElements.push(grid);
    // Remove reveal from children since parent handles it
    grid.querySelectorAll('.reveal').forEach(function (child) {
      child.classList.remove('reveal');
      var idx = revealElements.indexOf(child);
      if (idx > -1) revealElements.splice(idx, 1);
    });
  });

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ──── Ripple Effect on Interactive Elements ────
  function createRipple(e) {
    var el = this;
    var rect = el.getBoundingClientRect();
    var ripple = document.createElement('span');
    var size = Math.max(rect.width, rect.height);

    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

    el.appendChild(ripple);

    ripple.addEventListener('animationend', function () {
      ripple.remove();
    });
  }

  document.querySelectorAll('.quick-link, .nav-link, .header-link, .feature-card').forEach(function (el) {
    el.addEventListener('click', createRipple);
  });

  // ──── Image Lightbox ────
  var lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = '<img src="" alt="Preview">';
  document.body.appendChild(lightbox);

  var lightboxImg = lightbox.querySelector('img');

  document.querySelectorAll('.screenshot-grid img').forEach(function (img) {
    img.addEventListener('click', function () {
      lightboxImg.src = this.src;
      lightboxImg.alt = this.alt;
      lightbox.classList.add('active');
    });
  });

  lightbox.addEventListener('click', function () {
    lightbox.classList.remove('active');
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
    }
  });

  // ──── Active Section Tracking in Sidebar ────
  var headingsForTracking = document.querySelectorAll('.main h2[id]');
  var sidebarSubLinks = document.querySelectorAll('.sidebar-sub a');

  if (headingsForTracking.length > 0 && sidebarSubLinks.length > 0) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          sidebarSubLinks.forEach(function (link) {
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active-section');
            } else {
              link.classList.remove('active-section');
            }
          });
        }
      });
    }, {
      threshold: 0,
      rootMargin: '-80px 0px -70% 0px'
    });

    headingsForTracking.forEach(function (heading) {
      sectionObserver.observe(heading);
    });
  }

  // ──── Smooth Scroll for Same-Page Links ────
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href').substring(1);
      var target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Update URL without scroll jump
        history.pushState(null, '', '#' + targetId);
      }
    });
  });

  // ──── Scroll Event Handling (throttled) ────
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateProgress();
        updateBackToTop();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Initial calls
  updateProgress();
  updateBackToTop();

  // ──── Handle Hash on Load ────
  if (window.location.hash) {
    var target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(function () {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }

})();
