/* ═══════════════════════════════════════════════════════════════
   LumenSmith Wiki — Interactive Enhancements
   Scroll animations, anchor links, ripple effects, lightbox, etc.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ──── Search ────
  var searchIndex = [
    { title: 'Home', desc: 'Overview, features, quick start guide, and screenshots', url: 'index.html', page: 'Getting Started', keywords: 'lumensmith home overview introduction' },
    { title: 'What is LumenSmith?', desc: 'Beginner-friendly plugin to disable, replace, and create crafting recipes via GUI or config.yml', url: 'index.html#what-is-lumensmith', page: 'Home', keywords: 'about plugin description' },
    { title: 'Key Features', desc: 'Block vanilla recipes, 9 recipe types, in-game creator, permissions, cooldowns, auto-unlock, world filter', url: 'index.html#key-features', page: 'Home', keywords: 'features list capabilities' },
    { title: 'Quick Start', desc: 'Download, install, edit config.yml or use /ls create, then /ls reload', url: 'index.html#quick-start', page: 'Home', keywords: 'install setup getting started guide' },
    { title: 'Commands', desc: 'All LumenSmith commands: /ls help, list, reload, rescan, fixbook, recipes, create, delete', url: 'commands.html', page: 'Getting Started', keywords: '/ls /lumensmith command reference' },
    { title: 'Command Reference', desc: 'Table of all commands with descriptions and required permissions', url: 'commands.html#command-reference', page: 'Commands', keywords: '/ls help list reload rescan fixbook recipes create delete' },
    { title: 'Command Details', desc: '/ls help, /ls list, /ls reload, /ls rescan, /ls fixbook, /ls recipes, /ls create, /ls delete', url: 'commands.html#command-details', page: 'Commands', keywords: 'recipe browser gui creator' },
    { title: 'Permissions', desc: 'Plugin permissions and per-recipe permission system with LuckPerms examples', url: 'permissions.html', page: 'Getting Started', keywords: 'luckperms permission access control' },
    { title: 'Plugin Permissions', desc: 'lumensmith.admin, lumensmith.gui, lumensmith.create — global permission nodes', url: 'permissions.html#plugin-permissions', page: 'Permissions', keywords: 'admin gui create op' },
    { title: 'Per-Recipe Permissions', desc: 'Require specific permission to craft individual recipes with custom deny messages', url: 'permissions.html#per-recipe-permissions', page: 'Permissions', keywords: 'craft permission deny message restrict' },
    { title: 'Example Permission Setup', desc: 'LuckPerms command examples for admin, VIP, and builder groups', url: 'permissions.html#example-setup', page: 'Permissions', keywords: 'luckperms lp group vip builder' },
    { title: 'Config Guide', desc: 'Complete configuration reference: global settings, world filter, blocked outputs, custom recipes', url: 'configuration.html', page: 'Configuration', keywords: 'config.yml yaml settings options' },
    { title: 'Global Settings', desc: 'update_checker and cooldown_storage (file-persistent or session memory)', url: 'configuration.html#global', page: 'Config Guide', keywords: 'update checker cooldown storage file session' },
    { title: 'World Filter', desc: 'Control which worlds LumenSmith rules apply in using whitelist or specific world list', url: 'configuration.html#world-filter', page: 'Config Guide', keywords: 'world whitelist multiworld' },
    { title: 'Blocked Outputs', desc: 'Block crafting of specific materials using remove_by_output list', url: 'configuration.html#blocked', page: 'Config Guide', keywords: 'remove block prevent disable vanilla recipe tnt' },
    { title: 'Deny Message', desc: 'Customizable message when players try to craft blocked items. Supports color codes and %item%', url: 'configuration.html#deny-message', page: 'Config Guide', keywords: 'message color code placeholder' },
    { title: 'Custom Recipes', desc: 'Define recipes with key, type, result, permissions, cooldowns, max crafts, effects (sound/particle)', url: 'configuration.html#custom-recipes', page: 'Config Guide', keywords: 'recipe custom create shaped shapeless furnace result' },
    { title: 'Full Example Config', desc: 'Complete config.yml example with Excalibur recipe, enchantments, custom model data, effects', url: 'configuration.html#full-example', page: 'Config Guide', keywords: 'example full config excalibur enchantment' },
    { title: 'Recipe Types', desc: 'All 9 recipe types: shaped, shapeless, furnace, blasting, smoking, campfire, stonecutting, smithing, adjacent pair', url: 'recipes.html', page: 'Configuration', keywords: 'recipe type crafting smelting' },
    { title: 'Shaped Recipe', desc: '3x3 crafting grid recipe with shape pattern and ingredients map', url: 'recipes.html#shaped', page: 'Recipe Types', keywords: 'shaped 3x3 grid pattern craft' },
    { title: 'Shapeless Recipe', desc: 'Any arrangement recipe — place ingredients in any slots, up to 9', url: 'recipes.html#shapeless', page: 'Recipe Types', keywords: 'shapeless any order arrangement' },
    { title: 'Furnace Recipe', desc: 'Standard furnace smelting with configurable experience and cooking time', url: 'recipes.html#furnace', page: 'Recipe Types', keywords: 'furnace smelt cook experience xp' },
    { title: 'Blasting Recipe', desc: 'Blast furnace smelting at 2x speed', url: 'recipes.html#blasting', page: 'Recipe Types', keywords: 'blast furnace blasting smelt' },
    { title: 'Smoking Recipe', desc: 'Smoker cooking for food items', url: 'recipes.html#smoking', page: 'Recipe Types', keywords: 'smoker smoking cook food' },
    { title: 'Campfire Recipe', desc: 'Campfire cooking without fuel, typically longer cook time', url: 'recipes.html#campfire', page: 'Recipe Types', keywords: 'campfire cook no fuel' },
    { title: 'Fuel Restrictions', desc: 'Restrict allowed fuel types for furnace, blasting, and smoking recipes', url: 'recipes.html#fuel', page: 'Recipe Types', keywords: 'fuel allowed restrict coal lava' },
    { title: 'Stonecutting Recipe', desc: 'Stonecutter recipe with single input and output', url: 'recipes.html#stonecutting', page: 'Recipe Types', keywords: 'stonecutter cut stone' },
    { title: 'Smithing Transform', desc: 'Smithing table recipe: template + base item + addition material', url: 'recipes.html#smithing', page: 'Recipe Types', keywords: 'smithing transform netherite upgrade template' },
    { title: 'Adjacent Pair Recipe', desc: 'Two items side-by-side in crafting grid. Direction: horizontal, vertical, or both', url: 'recipes.html#adjacent-pair', page: 'Recipe Types', keywords: 'adjacent pair side by side direction horizontal vertical' },
    { title: 'Changelog', desc: 'Version history and release notes for all LumenSmith updates', url: 'changelog.html', page: 'Updates', keywords: 'changelog version update release notes history' },
    { title: 'v0.1.4 — Major Update', desc: 'In-game recipe creator, recipe editing/deletion, adjacent pair directions, bug fixes, performance', url: 'changelog.html#v014', page: 'Changelog', keywords: 'v0.1.4 latest creator editor gui' },
    { title: 'v0.1.3', desc: 'Instant recipe unlocks, /ls rescan, world filter improvements', url: 'changelog.html#v013', page: 'Changelog', keywords: 'v0.1.3 auto unlock rescan' },
    { title: 'v0.1.2', desc: 'World filter, adjacent_pair recipe type, /ls fixbook command', url: 'changelog.html#v012', page: 'Changelog', keywords: 'v0.1.2 world filter adjacent fixbook' },
    { title: 'v0.1.1', desc: 'Full protection for blocked items — prevent clicking, shift-crafting, dragging', url: 'changelog.html#v011', page: 'Changelog', keywords: 'v0.1.1 protection blocked shift click drag' },
    { title: 'v0.1.0 — Initial Release', desc: 'First release with shaped/shapeless recipes, blocking, auto-unlock, permissions', url: 'changelog.html#v010', page: 'Changelog', keywords: 'v0.1.0 initial first release' }
  ];

  // Create search trigger button in header
  var headerRight = document.querySelector('.header-right');
  if (headerRight) {
    var searchBtn = document.createElement('button');
    searchBtn.className = 'search-trigger';
    searchBtn.setAttribute('aria-label', 'Search');
    searchBtn.innerHTML = '<svg class="icon-svg" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><span>Search...</span><kbd>Ctrl K</kbd>';
    headerRight.insertBefore(searchBtn, headerRight.firstChild);
  }

  // Create search overlay + modal
  var searchOverlay = document.createElement('div');
  searchOverlay.className = 'search-overlay';
  document.body.appendChild(searchOverlay);

  var searchModal = document.createElement('div');
  searchModal.className = 'search-modal';
  searchModal.innerHTML =
    '<div class="search-header">' +
      '<svg class="icon-svg" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
      '<input class="search-input" type="text" placeholder="Search pages, commands, config..." autocomplete="off" spellcheck="false">' +
      '<button class="search-close">ESC</button>' +
    '</div>' +
    '<div class="search-results"></div>' +
    '<div class="search-footer">' +
      '<span><kbd>&uarr;</kbd><kbd>&darr;</kbd> Navigate</span>' +
      '<span><kbd>Enter</kbd> Open</span>' +
      '<span><kbd>Esc</kbd> Close</span>' +
    '</div>';
  document.body.appendChild(searchModal);

  var searchInput = searchModal.querySelector('.search-input');
  var searchResults = searchModal.querySelector('.search-results');
  var searchCloseBtn = searchModal.querySelector('.search-close');
  var activeResultIdx = -1;

  function openSearch() {
    searchOverlay.classList.add('active');
    searchModal.classList.add('active');
    searchInput.value = '';
    searchInput.focus();
    activeResultIdx = -1;
    renderSearchResults('');
  }

  function closeSearch() {
    searchOverlay.classList.remove('active');
    searchModal.classList.remove('active');
    searchInput.blur();
  }

  function highlightMatch(text, query) {
    if (!query) return text;
    var escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp('(' + escaped + ')', 'gi'), '<mark>$1</mark>');
  }

  function searchFilter(query) {
    if (!query) return searchIndex.slice(0, 8);
    var q = query.toLowerCase();
    var terms = q.split(/\s+/).filter(function (t) { return t.length > 0; });

    var scored = [];
    searchIndex.forEach(function (item) {
      var haystack = (item.title + ' ' + item.desc + ' ' + item.keywords + ' ' + item.page).toLowerCase();
      var match = true;
      var score = 0;

      for (var i = 0; i < terms.length; i++) {
        if (haystack.indexOf(terms[i]) === -1) { match = false; break; }
        // Boost for title match
        if (item.title.toLowerCase().indexOf(terms[i]) !== -1) score += 10;
        // Boost for keyword match
        if (item.keywords.toLowerCase().indexOf(terms[i]) !== -1) score += 5;
        // Base score for description match
        score += 1;
      }

      if (match) scored.push({ item: item, score: score });
    });

    scored.sort(function (a, b) { return b.score - a.score; });
    return scored.map(function (s) { return s.item; }).slice(0, 10);
  }

  function renderSearchResults(query) {
    var results = searchFilter(query);
    activeResultIdx = -1;

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-empty">No results for "' + query.replace(/</g, '&lt;') + '"</div>';
      return;
    }

    var html = '';
    results.forEach(function (item, i) {
      html += '<a class="search-result" href="' + item.url + '" data-idx="' + i + '">' +
        '<div class="search-result-page">' + item.page + '</div>' +
        '<div class="search-result-title">' + highlightMatch(item.title, query) + '</div>' +
        '<div class="search-result-desc">' + highlightMatch(item.desc, query) + '</div>' +
      '</a>';
    });

    searchResults.innerHTML = html;
  }

  function updateActiveResult() {
    var items = searchResults.querySelectorAll('.search-result');
    items.forEach(function (el, i) {
      if (i === activeResultIdx) {
        el.classList.add('active');
        el.scrollIntoView({ block: 'nearest' });
      } else {
        el.classList.remove('active');
      }
    });
  }

  // Events
  if (searchBtn) {
    searchBtn.addEventListener('click', openSearch);
  }

  searchOverlay.addEventListener('click', closeSearch);
  searchCloseBtn.addEventListener('click', closeSearch);

  searchInput.addEventListener('input', function () {
    renderSearchResults(this.value.trim());
  });

  searchModal.addEventListener('keydown', function (e) {
    var items = searchResults.querySelectorAll('.search-result');
    var count = items.length;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeResultIdx = (activeResultIdx + 1) % count;
      updateActiveResult();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeResultIdx = activeResultIdx <= 0 ? count - 1 : activeResultIdx - 1;
      updateActiveResult();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      var target = activeResultIdx >= 0 ? items[activeResultIdx] : items[0];
      if (target) {
        closeSearch();
        window.location.href = target.getAttribute('href');
      }
    } else if (e.key === 'Escape') {
      closeSearch();
    }
  });

  // Ctrl+K global shortcut
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (searchModal.classList.contains('active')) {
        closeSearch();
      } else {
        openSearch();
      }
    }
  });

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
  document.querySelectorAll('.main h2, .main h3, .main .info-box, .main pre, .main table, .main .feature-card, .main .quick-link, .main .screenshot-grid img, .main > p, .main > ul, .main > ol, .main .page-header, .main .hero').forEach(function (el) {
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
      } else {
        // Only remove when element is well outside viewport to prevent
        // flickering at the edge boundary
        var rect = entry.boundingClientRect;
        if (rect.bottom < -100 || rect.top > window.innerHeight + 100) {
          entry.target.classList.remove('visible');
        }
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '50px 0px -40px 0px'
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
  var headingsForTracking = Array.from(document.querySelectorAll('.main h2[id]'));
  var sidebarSubLinks = document.querySelectorAll('.sidebar-sub a');

  // Click-based override: when a sidebar sub-link is clicked,
  // force that section active as long as its heading is visible.
  // This fixes short pages where the last heading can never scroll
  // into the threshold zone.
  var clickedSectionId = null;

  sidebarSubLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      var href = this.getAttribute('href');
      if (href && href.charAt(0) === '#') {
        clickedSectionId = href.substring(1);
      }
    });
  });

  function updateActiveSection() {
    if (headingsForTracking.length === 0 || sidebarSubLinks.length === 0) return;

    var threshold = Math.min(window.innerHeight * 0.3, 400);
    var activeId = headingsForTracking[0].id;

    for (var i = 0; i < headingsForTracking.length; i++) {
      if (headingsForTracking[i].getBoundingClientRect().top <= threshold) {
        activeId = headingsForTracking[i].id;
      }
    }

    // When scrolled to the very bottom of the page, activate the last section.
    // This fixes pages where the last heading can never scroll far enough
    // into the threshold zone (short pages like Permissions, Home bottom).
    var scrolledToBottom = (window.innerHeight + Math.ceil(window.scrollY)) >= document.documentElement.scrollHeight - 5;
    if (scrolledToBottom && headingsForTracking.length > 0) {
      activeId = headingsForTracking[headingsForTracking.length - 1].id;
    }

    // If a sidebar link was clicked and the natural tracking picked
    // a different section, keep the clicked section active as long
    // as its heading is still visible in the viewport.
    if (clickedSectionId && clickedSectionId !== activeId) {
      var clickedEl = document.getElementById(clickedSectionId);
      if (clickedEl) {
        var top = clickedEl.getBoundingClientRect().top;
        if (top >= -50 && top <= window.innerHeight) {
          activeId = clickedSectionId;
        } else {
          clickedSectionId = null;
        }
      } else {
        clickedSectionId = null;
      }
    } else if (clickedSectionId === activeId) {
      // Natural tracking agrees, clear the override
      clickedSectionId = null;
    }

    sidebarSubLinks.forEach(function (link) {
      if (link.getAttribute('href') === '#' + activeId) {
        link.classList.add('active-section');
      } else {
        link.classList.remove('active-section');
      }
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
        updateActiveSection();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Initial calls
  updateProgress();
  updateBackToTop();
  updateActiveSection();

  // ──── Handle Hash on Load ────
  if (window.location.hash) {
    var target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(function () {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }

  // ──── Smooth Page Transitions ────
  document.querySelectorAll('a[href]').forEach(function (link) {
    var href = link.getAttribute('href');
    // Only intercept internal .html links (not anchors, not external)
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
    if (!href.endsWith('.html')) return;

    link.addEventListener('click', function (e) {
      // Don't intercept ctrl/cmd+click (open in new tab)
      if (e.ctrlKey || e.metaKey || e.shiftKey) return;

      e.preventDefault();
      var destination = href;
      var mainEl = document.querySelector('.main');

      if (mainEl) {
        mainEl.classList.add('page-leaving');
      }

      setTimeout(function () {
        window.location.href = destination;
      }, 150);
    });
  });

})();
