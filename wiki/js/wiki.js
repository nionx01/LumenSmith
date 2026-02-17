/* ═══════════════════════════════════════════════════════════════
   LumenSmith Wiki — Interactive Enhancements
   Scroll animations, anchor links, ripple effects, lightbox, etc.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ──── Search ────
  var searchIndex = [
    // ── Home ──
    { title: 'Home', desc: 'Overview, features, quick start guide, and screenshots', url: 'index.html', page: 'Getting Started', keywords: 'lumensmith home overview introduction main landing' },
    { title: 'What is LumenSmith?', desc: 'Beginner-friendly plugin to disable, replace, and create crafting recipes via GUI or config.yml', url: 'index.html#what-is-lumensmith', page: 'Home', keywords: 'about plugin description what is explain minecraft spigot bukkit paper' },
    { title: 'Key Features', desc: 'Block vanilla recipes, 9 recipe types, in-game creator, permissions, cooldowns, auto-unlock, world filter', url: 'index.html#key-features', page: 'Home', keywords: 'features list capabilities block vanilla 9 types gui creator auto unlock lightweight' },
    { title: 'Quick Start', desc: 'Download, install, edit config.yml or use /ls create, then /ls reload', url: 'index.html#quick-start', page: 'Home', keywords: 'install setup getting started guide download how to begin first steps tutorial' },
    { title: 'Screenshots', desc: 'Screenshots of LumenSmith in action — recipe browser, config examples, in-game GUI', url: 'index.html#screenshots', page: 'Home', keywords: 'screenshot images preview visual gui look' },
    { title: 'Why LumenSmith?', desc: 'Lightweight, beginner-friendly, no coding needed — reasons to choose LumenSmith for your server', url: 'index.html#why-lumensmith', page: 'Home', keywords: 'why choose reasons benefits lightweight easy simple no code server' },

    // ── Commands ──
    { title: 'Commands', desc: 'All LumenSmith commands: /ls help, list, reload, rescan, fixbook, recipes, create, delete', url: 'commands.html', page: 'Getting Started', keywords: '/ls /lumensmith command reference slash all' },
    { title: 'Command Reference', desc: 'Table of all commands with descriptions and required permissions', url: 'commands.html#command-reference', page: 'Commands', keywords: '/ls help list reload rescan fixbook recipes create delete table overview' },
    { title: 'Command Details', desc: '/ls help, /ls list, /ls reload, /ls rescan, /ls fixbook, /ls recipes, /ls create, /ls delete', url: 'commands.html#command-details', page: 'Commands', keywords: 'recipe browser gui creator details explanation usage' },
    { title: '/ls help', desc: 'Shows all available LumenSmith commands and their descriptions', url: 'commands.html#command-details', page: 'Commands', keywords: 'help info information how to use' },
    { title: '/ls list', desc: 'Shows all loaded custom recipes with their keys and types', url: 'commands.html#command-details', page: 'Commands', keywords: 'list show recipes loaded active' },
    { title: '/ls reload', desc: 'Reloads config.yml and re-registers all custom recipes', url: 'commands.html#command-details', page: 'Commands', keywords: 'reload refresh config update restart apply changes' },
    { title: '/ls rescan', desc: 'Re-scans and re-discovers all recipes, fixes missing knowledge book entries', url: 'commands.html#command-details', page: 'Commands', keywords: 'rescan rediscover fix missing recipes scan' },
    { title: '/ls fixbook', desc: 'Fixes the recipe knowledge book for online players', url: 'commands.html#command-details', page: 'Commands', keywords: 'fixbook fix book knowledge recipe book repair' },
    { title: '/ls recipes', desc: 'Opens the in-game recipe browser GUI to view all custom recipes', url: 'commands.html#command-details', page: 'Commands', keywords: 'recipes browser gui view browse inventory' },
    { title: '/ls create', desc: 'Opens the in-game recipe creator GUI to create a new recipe interactively', url: 'commands.html#command-details', page: 'Commands', keywords: 'create new recipe maker gui interactive editor /ls create key' },
    { title: '/ls delete', desc: 'Deletes a custom recipe by key from config.yml', url: 'commands.html#command-details', page: 'Commands', keywords: 'delete remove recipe key destroy' },

    // ── Permissions ──
    { title: 'Permissions', desc: 'Plugin permissions and per-recipe permission system with LuckPerms examples', url: 'permissions.html', page: 'Getting Started', keywords: 'luckperms permission access control security' },
    { title: 'Plugin Permissions', desc: 'lumensmith.admin, lumensmith.gui, lumensmith.create — global permission nodes', url: 'permissions.html#plugin-permissions', page: 'Permissions', keywords: 'admin gui create op operator lumensmith.admin lumensmith.gui lumensmith.create node' },
    { title: 'Per-Recipe Permissions', desc: 'Require specific permission to craft individual recipes with custom deny messages', url: 'permissions.html#per-recipe-permissions', page: 'Permissions', keywords: 'craft permission deny message restrict per recipe individual lock gate' },
    { title: 'Example Permission Setup', desc: 'LuckPerms command examples for admin, VIP, and builder groups — /lp group', url: 'permissions.html#example-setup', page: 'Permissions', keywords: 'luckperms lp group vip builder example setup guide /lp lp group admin permission set' },

    // ── Configuration ──
    { title: 'Config Guide', desc: 'Complete configuration reference: global settings, world filter, blocked outputs, custom recipes', url: 'configuration.html', page: 'Configuration', keywords: 'config.yml yaml settings options configuration reference guide' },
    { title: 'Global Settings', desc: 'update_checker and cooldown_storage (file-persistent or session memory)', url: 'configuration.html#global', page: 'Config Guide', keywords: 'update checker cooldown storage file session global settings update_checker cooldown_storage' },
    { title: 'World Filter', desc: 'Control which worlds LumenSmith rules apply in using whitelist or specific world list', url: 'configuration.html#world-filter', page: 'Config Guide', keywords: 'world whitelist multiworld whitelistworldoff world_filter worlds list filter' },
    { title: 'Blocked Outputs', desc: 'Block crafting of specific materials using remove_by_output list', url: 'configuration.html#blocked', page: 'Config Guide', keywords: 'remove block prevent disable vanilla recipe tnt remove_by_output blocked outputs ban material' },
    { title: 'Deny Message', desc: 'Customizable message when players try to craft blocked items. Supports color codes and %item%', url: 'configuration.html#deny-message', page: 'Config Guide', keywords: 'message color code placeholder %item% deny deny_message custom text notification warning' },
    { title: 'Custom Recipes', desc: 'Define recipes with key, type, result, permissions, cooldowns, max crafts, effects (sound/particle)', url: 'configuration.html#custom-recipes', page: 'Config Guide', keywords: 'recipe custom create shaped shapeless furnace result custom_recipes define add new' },
    { title: 'Result Object', desc: 'Configure the recipe output: item material, amount, custom name, lore, enchantments, custom_model_data', url: 'configuration.html#custom-recipes', page: 'Config Guide', keywords: 'result item amount name lore enchantments custom_model_data output material display_name' },
    { title: 'Recipe Effects', desc: 'Add sounds and particles when crafting: sound type, volume, pitch, particle type, count', url: 'configuration.html#custom-recipes', page: 'Config Guide', keywords: 'effects sound particle volume pitch count crafting feedback visual audio' },
    { title: 'Cooldowns & Max Crafts', desc: 'Limit how often players can craft a recipe with cooldown seconds and max_crafts', url: 'configuration.html#custom-recipes', page: 'Config Guide', keywords: 'cooldown max_crafts limit rate craft timer seconds restrict how many' },
    { title: 'Enchantments', desc: 'Add enchantments to crafted items with type and level in result config', url: 'configuration.html#custom-recipes', page: 'Config Guide', keywords: 'enchantment enchant level sharpness damage all protection type magic' },
    { title: 'Full Example Config', desc: 'Complete config.yml example with Excalibur recipe, enchantments, custom model data, effects', url: 'configuration.html#full-example', page: 'Config Guide', keywords: 'example full config excalibur enchantment yaml copy paste template sample' },

    // ── Recipe Types ──
    { title: 'Recipe Types Overview', desc: 'All 9 recipe types: shaped, shapeless, furnace, blasting, smoking, campfire, stonecutting, smithing, adjacent pair', url: 'recipes.html', page: 'Configuration', keywords: 'recipe type crafting smelting all types overview 9 list' },
    { title: 'Shaped Recipe', desc: '3x3 crafting grid recipe with shape pattern and ingredients map', url: 'recipes.html#shaped', page: 'Recipe Types', keywords: 'shaped 3x3 grid pattern craft crafting table shape ingredients map row' },
    { title: 'Shapeless Recipe', desc: 'Any arrangement recipe — place ingredients in any slots, up to 9 items', url: 'recipes.html#shapeless', page: 'Recipe Types', keywords: 'shapeless any order arrangement no pattern ingredients list' },
    { title: 'Furnace Recipe', desc: 'Standard furnace smelting with configurable experience and cooking time', url: 'recipes.html#furnace', page: 'Recipe Types', keywords: 'furnace smelt cook experience xp cooking time input output smelting' },
    { title: 'Blasting Recipe', desc: 'Blast furnace smelting at 2x speed for ores and metals', url: 'recipes.html#blasting', page: 'Recipe Types', keywords: 'blast furnace blasting smelt ore metal faster 2x speed' },
    { title: 'Smoking Recipe', desc: 'Smoker cooking for food items at 2x speed', url: 'recipes.html#smoking', page: 'Recipe Types', keywords: 'smoker smoking cook food meat fish 2x speed' },
    { title: 'Campfire Recipe', desc: 'Campfire cooking without fuel, typically 30s cook time', url: 'recipes.html#campfire', page: 'Recipe Types', keywords: 'campfire cook no fuel slow 30 seconds outdoor' },
    { title: 'Cooking Time Reference', desc: 'Cooking times for furnace (200t), blast furnace (100t), smoker (100t), campfire (600t)', url: 'recipes.html#furnace', page: 'Recipe Types', keywords: 'cooking time ticks seconds duration furnace blast smoker campfire how long' },
    { title: 'Fuel Restrictions', desc: 'Restrict which fuel items can be used: allowed_fuels list for furnace, blasting, smoking', url: 'recipes.html#fuel', page: 'Recipe Types', keywords: 'fuel allowed restrict coal lava bucket charcoal blaze rod allowed_fuels COAL LAVA_BUCKET' },
    { title: 'Stonecutting Recipe', desc: 'Stonecutter recipe with single input and output, no shape needed', url: 'recipes.html#stonecutting', page: 'Recipe Types', keywords: 'stonecutter cut stone slab stairs simple single' },
    { title: 'Smithing Transform', desc: 'Smithing table recipe: template + base item + addition material for upgrading', url: 'recipes.html#smithing', page: 'Recipe Types', keywords: 'smithing transform netherite upgrade template base addition smithing table armor tools' },
    { title: 'Adjacent Pair Recipe', desc: 'Two items side-by-side in crafting grid. Direction: horizontal, vertical, or both', url: 'recipes.html#adjacent-pair', page: 'Recipe Types', keywords: 'adjacent pair side by side direction horizontal vertical both two items next to adjacent_pair' },
    { title: 'Direction Options', desc: 'Adjacent pair direction: horizontal (left-right), vertical (up-down), or both', url: 'recipes.html#adjacent-pair', page: 'Recipe Types', keywords: 'direction horizontal vertical both left right up down adjacent pair option' },

    // ── Minecraft Items & Materials (common searches) ──
    { title: 'Block TNT Crafting', desc: 'Use remove_by_output to prevent players from crafting TNT or other dangerous items', url: 'configuration.html#blocked', page: 'Config Guide', keywords: 'tnt block disable prevent TNT explosive griefing remove_by_output ENDER_CHEST' },
    { title: 'Diamond Items', desc: 'Use diamonds in shaped recipes — DIAMOND, DIAMOND_SWORD, DIAMOND_PICKAXE, DIAMOND_BLOCK', url: 'recipes.html#shaped', page: 'Recipe Types', keywords: 'diamond sword pickaxe axe helmet chestplate leggings boots block DIAMOND' },
    { title: 'Netherite Upgrade', desc: 'Create netherite upgrade recipes using smithing transform type with NETHERITE_INGOT', url: 'recipes.html#smithing', page: 'Recipe Types', keywords: 'netherite ingot upgrade smithing NETHERITE_INGOT armor tools NETHERITE_UPGRADE_SMITHING_TEMPLATE' },

    // ── Changelog ──
    { title: 'Changelog', desc: 'Version history and release notes for all LumenSmith updates', url: 'changelog.html', page: 'Updates', keywords: 'changelog version update release notes history what changed new' },
    { title: 'v0.1.4 — Major Update', desc: 'In-game recipe creator, recipe editing/deletion, adjacent pair directions, bug fixes, performance', url: 'changelog.html#v014', page: 'Changelog', keywords: 'v0.1.4 latest creator editor gui new features' },
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

  // ── Recent searches (localStorage) ──
  var RECENT_KEY = 'lumensmith-recent-searches';
  var MAX_RECENT = 5;

  function getRecentSearches() {
    try {
      var data = JSON.parse(localStorage.getItem(RECENT_KEY));
      return Array.isArray(data) ? data : [];
    } catch (e) { return []; }
  }

  function saveRecentSearch(term) {
    if (!term || term.length < 2) return;
    var recent = getRecentSearches();
    // Remove duplicate, add to front
    recent = recent.filter(function (r) { return r.toLowerCase() !== term.toLowerCase(); });
    recent.unshift(term);
    if (recent.length > MAX_RECENT) recent = recent.slice(0, MAX_RECENT);
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(recent)); } catch (e) {}
  }

  function clearRecentSearches() {
    try { localStorage.removeItem(RECENT_KEY); } catch (e) {}
  }

  // ── Popular / suggested searches ──
  var popularSearches = [
    { term: 'commands', label: 'Commands', desc: '/ls help, list, reload, create...' },
    { term: 'permissions', label: 'Permissions', desc: 'Permission nodes & per-recipe access' },
    { term: 'shaped recipe', label: 'Shaped Recipe', desc: '3x3 crafting grid recipes' },
    { term: 'config', label: 'Config Guide', desc: 'Settings, world filter, custom recipes' },
    { term: 'adjacent pair', label: 'Adjacent Pair', desc: 'Two items side by side in grid' },
    { term: 'cooldown', label: 'Cooldowns', desc: 'Craft cooldowns & max crafts' },
    { term: 'enchantment', label: 'Enchantments', desc: 'Add enchants to crafted items' },
    { term: 'block tnt', label: 'Block Items', desc: 'Prevent crafting specific items' }
  ];

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
    // Split query on separators so "adjacent_pair" highlights "adjacent" and "pair" individually
    var terms = query.replace(/[_\-./]/g, ' ').split(/\s+/).filter(function (t) { return t.length > 0; });
    var result = text;
    terms.forEach(function (term) {
      var escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      result = result.replace(new RegExp('(' + escaped + ')', 'gi'), '<mark>$1</mark>');
    });
    return result;
  }

  // Normalize underscores, hyphens, and special chars to spaces for matching
  function normalizeText(str) {
    return str.toLowerCase().replace(/[_\-./]/g, ' ');
  }

  // Fuzzy match: does `needle` appear in `haystack` allowing up to 1 typo per 4 chars?
  // Returns a quality score (higher = better match) or 0 for no match.
  function fuzzyMatch(needle, haystack) {
    // Exact substring — best possible
    if (haystack.indexOf(needle) !== -1) return 3;
    // Short queries: require exact match (fuzzy on 1-2 chars gives false positives)
    if (needle.length < 3) return 0;
    // Prefix match — any word in haystack starts with needle
    var words = haystack.split(/\s+/);
    for (var w = 0; w < words.length; w++) {
      if (words[w].indexOf(needle) === 0) return 2.5;
    }
    // Allow 1 character difference (substitution, insertion, deletion)
    // Only if needle is 4+ chars to avoid false positives
    if (needle.length >= 4) {
      for (var w2 = 0; w2 < words.length; w2++) {
        if (editDist1(needle, words[w2])) return 1;
      }
      // Check if needle is contained fuzzily in any longer word
      for (var w3 = 0; w3 < words.length; w3++) {
        if (words[w3].length >= needle.length && substringFuzzy(needle, words[w3])) return 0.8;
      }
    }
    return 0;
  }

  // Check if two words are within edit distance 1
  function editDist1(a, b) {
    var lenDiff = a.length - b.length;
    if (lenDiff > 1 || lenDiff < -1) return false;
    if (lenDiff === 0) {
      // Same length: check substitution (max 1 mismatch)
      var mismatches = 0;
      for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) mismatches++;
        if (mismatches > 1) return false;
      }
      return mismatches === 1;
    }
    // Different lengths: check insertion/deletion
    var longer = lenDiff > 0 ? a : b;
    var shorter = lenDiff > 0 ? b : a;
    var found = false;
    for (var j = 0, k = 0; j < longer.length; j++) {
      if (longer[j] !== shorter[k]) {
        if (found) return false;
        found = true;
      } else {
        k++;
      }
    }
    return true;
  }

  // Check if needle appears as a fuzzy substring (1 typo) inside word
  function substringFuzzy(needle, word) {
    for (var i = 0; i <= word.length - needle.length; i++) {
      var mismatches = 0;
      for (var j = 0; j < needle.length; j++) {
        if (word[i + j] !== needle[j]) mismatches++;
        if (mismatches > 1) break;
      }
      if (mismatches <= 1) return true;
    }
    return false;
  }

  // Pre-normalize search index once at load — avoids re-normalizing on every keystroke
  var searchCache = searchIndex.map(function (item) {
    return {
      item: item,
      title: normalizeText(item.title),
      desc: normalizeText(item.desc),
      keywords: normalizeText(item.keywords),
      page: normalizeText(item.page)
    };
  });

  function searchFilter(query) {
    if (!query) return searchIndex.slice(0, 8);
    // Normalize the query so "adjacent_pair" becomes "adjacent pair"
    var q = normalizeText(query);
    var terms = q.split(/\s+/).filter(function (t) { return t.length > 0; });

    var scored = [];
    for (var c = 0; c < searchCache.length; c++) {
      var cached = searchCache[c];
      var item = cached.item;
      var titleNorm = cached.title;
      var descNorm = cached.desc;
      var keywordsNorm = cached.keywords;
      var pageNorm = cached.page;

      var score = 0;
      var allTermsMatched = true;

      for (var i = 0; i < terms.length; i++) {
        var t = terms[i];
        // Try exact match first (in full haystack), then fuzzy per-field
        var titleQ = fuzzyMatch(t, titleNorm);
        var descQ = fuzzyMatch(t, descNorm);
        var kwQ = fuzzyMatch(t, keywordsNorm);
        var pageQ = fuzzyMatch(t, pageNorm);
        var bestQ = Math.max(titleQ, descQ, kwQ, pageQ);

        if (bestQ === 0) { allTermsMatched = false; break; }

        // Weight by field and match quality
        if (titleQ > 0) score += 20 * titleQ;
        if (descQ > 0) score += 8 * descQ;
        if (kwQ > 0) score += 5 * kwQ;
        score += bestQ; // base
      }

      if (!allTermsMatched) continue;

      // Boost exact title match (full query found in title)
      if (titleNorm.indexOf(q) !== -1) score += 30;

      // Deprioritize changelog version entries — they reference everything
      // but are rarely what the user is looking for
      if (pageNorm === 'changelog' || /^v\d/.test(item.title)) {
        score = Math.floor(score * 0.3);
      }

      scored.push({ item: item, score: score });
    }

    scored.sort(function (a, b) { return b.score - a.score; });
    return scored.map(function (s) { return s.item; }).slice(0, 12);
  }

  function renderSearchResults(query) {
    activeResultIdx = -1;

    // Empty query — show recent searches + popular suggestions
    if (!query) {
      var html = '';
      var recent = getRecentSearches();
      var idx = 0;

      if (recent.length > 0) {
        html += '<div class="search-section-header"><span>Recent</span><button class="search-clear-recent">Clear</button></div>';
        recent.forEach(function (term) {
          html += '<div class="search-result search-suggestion" data-query="' + term.replace(/"/g, '&quot;') + '" data-idx="' + idx + '">' +
            '<div class="search-result-title"><svg class="icon-svg" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 105.64-11.36L1 10"/></svg>' + term + '</div>' +
          '</div>';
          idx++;
        });
      }

      html += '<div class="search-section-header"><span>Popular</span></div>';
      popularSearches.forEach(function (p) {
        html += '<div class="search-result search-suggestion" data-query="' + p.term.replace(/"/g, '&quot;') + '" data-idx="' + idx + '">' +
          '<div class="search-result-title"><svg class="icon-svg" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>' + p.label + '</div>' +
          '<div class="search-result-desc">' + p.desc + '</div>' +
        '</div>';
        idx++;
      });

      searchResults.innerHTML = html;

      // Wire up clear recent button
      var clearBtn = searchResults.querySelector('.search-clear-recent');
      if (clearBtn) {
        clearBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          clearRecentSearches();
          renderSearchResults('');
        });
      }

      // Wire up suggestion clicks — fill the search input with the term
      searchResults.querySelectorAll('.search-suggestion').forEach(function (el) {
        el.addEventListener('click', function () {
          var q = this.getAttribute('data-query');
          searchInput.value = q;
          renderSearchResults(q);
        });
      });

      return;
    }

    var results = searchFilter(query);

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

  // Close search when clicking a result + save the search term
  searchResults.addEventListener('click', function (e) {
    var link = e.target.closest('a.search-result');
    if (link) {
      var q = searchInput.value.trim();
      if (q) saveRecentSearch(q);
      closeSearch();
    }
  });

  searchInput.addEventListener('input', function () {
    renderSearchResults(this.value.trim());
  });

  // All keyboard handling in one document-level listener
  document.addEventListener('keydown', function (e) {
    // Ctrl+K — toggle search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (searchModal.classList.contains('active')) {
        closeSearch();
      } else {
        openSearch();
      }
      return;
    }

    // Everything below only when search is open
    if (!searchModal.classList.contains('active')) return;

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
        // If it's a suggestion (recent/popular), fill the input instead
        if (target.classList.contains('search-suggestion')) {
          searchInput.value = target.getAttribute('data-query');
          renderSearchResults(searchInput.value);
        } else {
          var term = searchInput.value.trim();
          if (term) saveRecentSearch(term);
          closeSearch();
          window.location.href = target.getAttribute('href');
        }
      }
    } else if (e.key === 'Escape') {
      closeSearch();
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

  // ──── Sidebar Sliding Hover Pill ────
  if (sidebar) {
    var hoverPill = document.createElement('div');
    hoverPill.className = 'sidebar-hover-pill';
    sidebar.appendChild(hoverPill);

    var navLinks = sidebar.querySelectorAll('.nav-link');
    var pillHideTimer = null;

    function movePill(linkEl) {
      // Position pill relative to the sidebar's scroll container
      var sidebarRect = sidebar.getBoundingClientRect();
      var linkRect = linkEl.getBoundingClientRect();

      var top = linkRect.top - sidebarRect.top + sidebar.scrollTop;
      var left = linkRect.left - sidebarRect.left;
      var width = linkRect.width;
      var height = linkRect.height;

      hoverPill.style.top = top + 'px';
      hoverPill.style.left = left + 'px';
      hoverPill.style.right = 'auto';
      hoverPill.style.width = width + 'px';
      hoverPill.style.height = height + 'px';
      hoverPill.classList.add('visible');
    }

    navLinks.forEach(function (link) {
      link.addEventListener('mouseenter', function () {
        clearTimeout(pillHideTimer);
        movePill(this);
      });
    });

    // Also handle sub-links
    var subLinks = sidebar.querySelectorAll('.sidebar-sub a');
    subLinks.forEach(function (link) {
      link.addEventListener('mouseenter', function () {
        clearTimeout(pillHideTimer);
        movePill(this);
      });
    });

    sidebar.addEventListener('mouseleave', function () {
      pillHideTimer = setTimeout(function () {
        hoverPill.classList.remove('visible');
      }, 120);
    });

    // Update pill position on scroll (since it's absolute-positioned)
    sidebar.addEventListener('scroll', function () {
      if (hoverPill.classList.contains('visible')) {
        // Temporarily hide during sidebar scroll to avoid jarring jump
        hoverPill.classList.remove('visible');
      }
    });
  }

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

  // ── Scroll velocity tracking ──
  var lastScrollY = window.scrollY;
  var scrollSpeed = 0;
  var fastScrolling = false;
  var fastScrollTimer = null;

  function trackScrollSpeed() {
    var currentY = window.scrollY;
    scrollSpeed = Math.abs(currentY - lastScrollY);
    lastScrollY = currentY;

    // Fast scroll threshold: if moving >120px per frame, skip transitions
    if (scrollSpeed > 120) {
      if (!fastScrolling) {
        fastScrolling = true;
        document.body.classList.add('fast-scroll');
      }
      // Reset the cooldown timer on each fast frame
      clearTimeout(fastScrollTimer);
      fastScrollTimer = setTimeout(function () {
        fastScrolling = false;
        document.body.classList.remove('fast-scroll');
      }, 80);
    }
  }

  // Scroll-based reveal with hysteresis — different thresholds for
  // entering vs leaving prevents edge flickering while allowing
  // smooth bidirectional in/out animations on every scroll.
  function updateRevealElements() {
    trackScrollSpeed();
    var viewH = window.innerHeight;
    for (var i = 0; i < revealElements.length; i++) {
      var el = revealElements[i];
      var rect = el.getBoundingClientRect();
      var isVisible = el.classList.contains('visible');

      if (!isVisible) {
        // ENTER: element's top enters the bottom 90% of viewport
        if (rect.top < viewH - 40 && rect.bottom > 60) {
          el.classList.add('visible');
        }
      } else {
        // EXIT: only when element is well outside viewport
        // Large gap between enter/exit thresholds = no flicker
        if (rect.bottom < -150 || rect.top > viewH + 150) {
          el.classList.remove('visible');
        }
      }
    }
  }

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

  // ──── Image Protection — prevent drag & right-click copy ────
  document.querySelectorAll('img').forEach(function (img) {
    img.setAttribute('draggable', 'false');
    img.addEventListener('dragstart', function (e) { e.preventDefault(); });
    img.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  });

  // ──── Image Lightbox ────
  var lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = '<img src="" alt="Preview" draggable="false">';
  document.body.appendChild(lightbox);

  var lightboxImg = lightbox.querySelector('img');
  lightboxImg.addEventListener('contextmenu', function (e) { e.preventDefault(); });

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
        updateRevealElements();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Initial calls
  updateProgress();
  updateBackToTop();
  updateActiveSection();
  updateRevealElements();

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
