/*
 * Marlowby — main.js
 * Plain JavaScript, no libraries. Every feature first checks that its
 * elements exist, so this one file runs safely on every page.
 * City, plan, and search data come from js/data.js.
 */
(function () {
  'use strict';

  document.documentElement.classList.add('js');
  var MB = window.MB || {};
  var cities = MB.cities || [];
  var plans = MB.plans || [];
  var params = new URLSearchParams(window.location.search);
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var STATES = { LA: 'Louisiana', MI: 'Michigan', NM: 'New Mexico', ME: 'Maine', NC: 'North Carolina', AZ: 'Arizona', WI: 'Wisconsin', WA: 'Washington', GA: 'Georgia', VT: 'Vermont', TX: 'Texas', MN: 'Minnesota' };
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function photo(id, w) { return 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&w=' + (w || 800) + '&q=80'; }
  /* Photos load from the site's own images/food folder first (works offline),
     then fall back to Unsplash if the file is missing. */
  function pic(c, w, alt, extra) {
    return '<img src="images/food/' + c.file + '" data-fallback="' + photo(c.photo, w) + '" alt="' + (alt === undefined ? esc(c.photoAlt) : alt) + '"' + (extra || '') + '>';
  }
  function money(n) { return '$' + (Math.round(n * 100) / 100).toFixed(n % 1 ? 2 : 0); }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  /* ---------- Header, menu, announcement ---------- */
  var header = $('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 10); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  var toggle = $('.menu-toggle'), nav = $('#primary-nav');
  if (toggle && nav) {
    var setMenu = function (open) { toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); };
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); toggle.focus(); } });
    document.addEventListener('click', function (e) { if (nav.classList.contains('is-open') && !nav.contains(e.target) && !toggle.contains(e.target)) { setMenu(false); } });
  }

  var days = $('[data-days-left]');
  if (days) {
    var left = Math.ceil((new Date('2026-12-01T00:00:00-05:00') - new Date()) / 86400000);
    if (left > 1) { days.textContent = 'Founding waitlist closes December 1 · ' + left + ' days left · Box 001 ships January 2027'; }
    else if (left === 1) { days.textContent = 'Last day to join the founding waitlist'; }
    else { days.textContent = 'Box 001 ships from New Orleans in January 2027 · Join the general waitlist'; }
  }

  /* ---------- Shared builders ---------- */
  function stampCard(c, opts) {
    opts = opts || {};
    var tag = opts.tag || 'div';
    var attrs = tag === 'a' ? ' href="city.html#' + c.slug + '"' : '';
    return '<' + tag + ' class="stamp-card' + (opts.cls ? ' ' + opts.cls : '') + '"' + attrs + ' data-season="' + c.season + '"' + (opts.role ? ' role="' + opts.role + '"' : '') + '>' +
      '<div class="stamp"><div class="stamp-frame">' +
        pic(c, opts.w || 700, undefined, ' loading="lazy"') +
      '</div></div>' +
      (opts.noInfo ? '' : '<div class="stamp-info"><p class="meta"><span>' + c.month + '</span></p><h3>' + esc(c.city) + ', ' + c.st + '</h3><p>Inside: ' + c.finds.map(function (f) { return esc(f[0]); }).join(', ') + '</p></div>') +
      '</' + tag + '>';
  }

  /* ---------- Marquee ---------- */
  var mq = $('[data-marquee]');
  if (mq && cities.length) {
    var words = cities.map(function (c) { return '<span>' + esc(c.city) + '</span><span>✳</span>'; }).join('');
    mq.innerHTML = words + words;
  }

  /* ---------- Home: city rail ---------- */
  var rail = $('[data-rail-track]');
  if (rail && cities.length) {
    rail.innerHTML = cities.map(function (c) { return '<div role="listitem">' + stampCard(c) + '</div>'; }).join('');
    $$('[data-rail]').forEach(function (b) {
      b.addEventListener('click', function () {
        var step = rail.firstElementChild ? rail.firstElementChild.getBoundingClientRect().width + 22 : 300;
        rail.scrollBy({ left: step * parseInt(b.getAttribute('data-rail'), 10) * 2, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });
  }

  /* ---------- Plan cards ---------- */
  var monthly = plans.length ? plans[0].price : 0;
  $$('[data-plan-cards]').forEach(function (host) {
    var feats = {
      monthly: ['A new U.S. city every month', 'Skip or cancel anytime', 'Free contiguous U.S. shipping'],
      season: ['Three cities in a row', 'Help choose future cities', 'One skip per plan'],
      route: ['All twelve cities', 'Lowest price per box', 'Collector’s route poster in the final box']
    };
    host.innerHTML = plans.map(function (p, i) {
      var per = p.price / p.boxes;
      var save = Math.round((1 - per / monthly) * 100);
      return '<article class="plan-card' + (p.featured ? ' is-featured' : '') + '">' +
        '<div class="plan-top"><span class="label">' + esc(p.tag) + '</span>' + (p.featured ? '<span class="badge">Most popular</span>' : '') + '</div>' +
        '<h3>' + esc(p.name) + '</h3>' +
        '<p class="price price-tba"><strong>Price TBA</strong><span>Announced at launch</span></p>' +
        '<p class="billing">' + esc(p.billing) + '</p>' +
        '<a class="button ' + (p.featured ? 'button-ink' : 'button-line') + ' button-block" href="join.html?plan=' + p.key + '">Choose ' + esc(p.name) + '</a>' +
        '<ul>' + (feats[p.key] || []).map(function (f) { return '<li>' + f + '</li>'; }).join('') + '</ul>' +
      '</article>';
    }).join('');
  });

  /* ---------- Route page: map + preview ---------- */
  var picker = $('[data-route-picker]');
  if (picker && cities.length) {
    var preview = $('[data-preview]', picker);
    var pins = $('[data-map-pins]', picker);
    pins.innerHTML = cities.map(function (c, i) {
      // Same projection used to draw the map outline in route.html
      var x = (c.lon + 125.5) * 16.6 + 8, y = (49.8 - c.lat) * 21.2 + 6;
      return '<li class="map-pin" style="left:' + (x / 10).toFixed(2) + '%;top:' + (y / 5.6).toFixed(2) + '%">' +
        '<button type="button" aria-pressed="' + (i === 0) + '" aria-label="Box ' + c.n + ', ' + c.month + ': ' + esc(c.city) + ', ' + c.st + '">' + (i + 1) + '</button>' +
        '<span class="map-label" aria-hidden="true">' + esc(c.city) + '</span></li>';
    }).join('');
    var buttons = $$('button', pins);
    var show = function (i, focus) {
      i = (i + cities.length) % cities.length;
      var c = cities[i];
      buttons.forEach(function (b, k) { b.setAttribute('aria-pressed', String(k === i)); });
      preview.classList.remove('is-changing'); void preview.offsetWidth;
      preview.innerHTML =
        '<div class="preview-photo">' + pic(c, 900) + '</div>' +
        '<div class="preview-body"><span class="label">Box ' + c.n + ': ' + c.month + '</span>' +
        '<h3>' + esc(c.city) + ', ' + c.st + '</h3><p class="preview-theme">' + esc(c.theme) + '</p>' +
        '<ul>' + c.finds.map(function (f) { return '<li>' + esc(f[0]) + '</li>'; }).join('') + '</ul>' +
        '<a class="text-link" href="city.html#' + c.slug + '">Open the ' + esc(c.city) + ' box</a></div>';
      preview.classList.add('is-changing');
      if (focus) { buttons[i].focus(); }
    };
    buttons.forEach(function (b, i) {
      b.addEventListener('click', function () { show(i); });
      b.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); show(i + 1, true); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); show(i - 1, true); }
      });
    });
    show(0);
    preview.classList.remove('is-changing');
  }

  /* ---------- Route page: grid + season filter ---------- */
  var grid = $('[data-city-grid]');
  if (grid && cities.length) {
    grid.innerHTML = cities.map(function (c) { return stampCard(c); }).join('');
    var bar = $('[data-filter]'), count = $('[data-filter-count]');
    $$('button', bar).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var s = btn.getAttribute('data-season'), shown = 0;
        $$('button', bar).forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
        $$('.stamp-card', grid).forEach(function (card) {
          var on = s === 'all' || card.getAttribute('data-season') === s;
          card.classList.toggle('is-hidden', !on);
          if (on) { shown++; }
        });
        count.textContent = s === 'all' ? 'Showing all ' + shown + ' boxes' : 'Showing ' + shown + ' ' + s + ' boxes';
      });
    });
  }

  /* ---------- City page ---------- */
  var cityPage = $('[data-city-page]');
  if (cityPage && cities.length) {
    var slug = decodeURIComponent(window.location.hash.slice(1)) || params.get('c');
    var idx = 0;
    cities.forEach(function (c, i) { if (c.slug === slug) { idx = i; } });
    var c = cities[idx], prev = cities[idx - 1], next = cities[idx + 1];
    document.title = c.city + ', ' + c.st + ' · Box ' + c.n + ' — Marlowby';
    var meta = $('meta[name="description"]');
    if (meta) { meta.setAttribute('content', 'Marlowby Box ' + c.n + ', ' + c.month + ': ' + c.city + ', ' + c.st + '. ' + c.theme + '.'); }
    $('[data-city-crumb]').textContent = c.city;
    $('[data-city-chip]').textContent = 'Box ' + c.n + ': ' + c.month;
    $('[data-city-title]').textContent = c.city + ', ' + c.st;
    $('[data-city-theme]').textContent = c.theme + '.';
    $('[data-city-photo]').innerHTML = pic(c, 1000, '');
    var items = c.finds.map(function (f) {
      return '<li><div class="box-item-name"><strong>' + esc(f[0]) + '</strong><span>' + esc(f[1]) + '</span></div><p>' + esc(f[2]) + '</p></li>';
    });
    items.push('<li><div class="box-item-name"><strong>Printed field guide</strong><span>Included in every box</span></div><p>Stories about each maker, plus a neighborhood walk (' + esc(c.walk) + ') and a playlist (' + esc(c.sound.charAt(0).toLowerCase() + c.sound.slice(1)) + ').</p></li>');
    $('[data-city-finds]').innerHTML = items.join('');
    $('[data-city-count]').textContent = items.length + ' items in this box.';
    $('[data-city-story]').innerHTML = c.story.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
    var thumb = function (x) { return pic(x, 200, ''); };
    $('[data-city-pager]').innerHTML =
      (prev ? '<a href="city.html#' + prev.slug + '" rel="prev">' + thumb(prev) + '<span><span class="label">← Box ' + prev.n + ' · ' + prev.month + '</span><strong>' + esc(prev.city) + ', ' + prev.st + '</strong></span></a>'
            : '<a href="route.html"><span class="thumb" aria-hidden="true"></span><span><span class="label">← The route</span><strong>All twelve cities</strong></span></a>') +
      (next ? '<a class="next" href="city.html#' + next.slug + '" rel="next">' + thumb(next) + '<span><span class="label">Box ' + next.n + ' · ' + next.month + ' →</span><strong>' + esc(next.city) + ', ' + next.st + '</strong></span></a>'
            : '<a class="next" href="plans.html"><span class="thumb" aria-hidden="true"></span><span><span class="label">The whole route</span><strong>See plans &amp; prices</strong></span></a>');
    $('[data-city-credit]').innerHTML = 'Photo: ' + esc(c.credit) + ' on <a href="https://unsplash.com/photos/' + c.creditId + '">Unsplash</a>.';
    window.addEventListener('hashchange', function () { window.scrollTo({ top: 0, behavior: 'instant' }); window.location.reload(); });
  }

  /* ---------- Plans page: plan finder ---------- */
  var finder = $('[data-finder]');
  if (finder && plans.length && cities.length) {
    var planHost = $('[data-finder-plans]', finder);
    var monthSel = $('[data-finder-month]', finder);
    var giftBox = $('[data-finder-gift]', finder);
    var result = $('[data-finder-result]', finder);
    var start = params.get('plan');
    planHost.innerHTML = plans.map(function (p) {
      var checked = start ? p.key === start : p.featured;
      return '<label class="finder-option"><input type="radio" name="finder-plan" value="' + p.key + '"' + (checked ? ' checked' : '') + '>' +
        '<span><strong>' + esc(p.name) + '</strong><br><span>' + p.boxes + (p.boxes === 1 ? ' city at a time' : ' cities') + '</span></span><b>' + money(p.price) + '</b></label>';
    }).join('');
    monthSel.innerHTML = cities.map(function (c, i) { return '<option value="' + i + '">' + c.month + ' 2027 · starts in ' + esc(c.city) + '</option>'; }).join('');
    if (start === 'gift' && giftBox) { giftBox.checked = true; }

    var render = function () {
      var key = ($('input[name="finder-plan"]:checked', finder) || {}).value || plans[0].key;
      var p = plans.filter(function (x) { return x.key === key; })[0];
      var from = parseInt(monthSel.value, 10) || 0;
      var count = p.key === 'monthly' ? 3 : p.boxes;  // monthly preview shows the next 3 cities
      var list = [], extra = 0;
      for (var k = 0; k < count; k++) {
        if (from + k < cities.length) { list.push(cities[from + k]); } else { extra++; }
      }
      var per = p.price / p.boxes;
      var saved = monthly * p.boxes - p.price;
      var gift = giftBox && giftBox.checked;
      result.innerHTML =
        '<span class="label">' + (gift ? 'Your gift' : 'Your plan') + ' · ' + esc(p.name) + '</span>' +
        '<p class="finder-total"><strong>' + money(p.price) + '</strong><span>' + (p.key === 'monthly' ? 'per month' : 'total, ' + money(per) + ' per box') + '</span></p>' +
        '<p class="finder-sub">' + (saved > 0 ? 'You save ' + money(saved) + ' compared with monthly. ' : 'Skip or cancel before the 1st of any month. ') +
          (gift ? 'Includes a printed message card, and the plan never renews.' : 'Free shipping in the contiguous U.S.') + '</p>' +
        '<span class="label">' + (p.key === 'monthly' ? 'Your first three cities' : 'Your ' + count + ' boxes') + '</span>' +
        '<ul class="finder-route">' + list.map(function (c) {
          return '<li>' + pic(c, 120, '') + '<span><small>' + c.month.slice(0, 3) + '</small>' + esc(c.city) + '</span></li>';
        }).join('') + (extra ? '<li><span class="thumb-2028" aria-hidden="true">2028</span><span><small>+' + extra + ' more</small>2028 route stops</span></li>' : '') + '</ul>' +
        '<a class="button button-orange button-block" href="join.html?plan=' + (gift ? 'gift' : p.key) + '">Reserve this plan</a>';
    };
    finder.addEventListener('change', render);
    finder.addEventListener('submit', function (e) { e.preventDefault(); });
    render();
  }

  /* ---------- Sign-up forms (demo: checks input, stores nothing) ---------- */
  $$('.signup-form').forEach(function (form) {
    var msg = $('.form-message', form);
    var plan = form.elements.plan;
    if (plan && params.get('plan')) { $$('option', plan).forEach(function (o) { if (o.value === params.get('plan')) { plan.value = o.value; } }); }
    if (params.get('maker') === '1' && form.elements.maker) { form.elements.maker.checked = true; }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name, email = form.elements.email, zip = form.elements.zip;
      [name, email, zip].forEach(function (f) { f.removeAttribute('aria-invalid'); f.removeAttribute('aria-describedby'); });
      var problem = null;
      if (!name.value.trim()) { problem = [name, 'Please add your first name.']; }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) { problem = [email, 'Please enter an email like you@example.com.']; }
      else if (zip.value.trim() && !/^\d{5}$/.test(zip.value.trim())) { problem = [zip, 'ZIP codes have five digits.']; }
      if (problem) {
        msg.textContent = problem[1];
        msg.classList.add('is-error');
        problem[0].setAttribute('aria-invalid', 'true');
        problem[0].setAttribute('aria-describedby', msg.id);
        problem[0].focus();
        return;
      }
      var planName = plan ? plan.options[plan.selectedIndex].text.split(' · ')[0] : '';
      var done = document.createElement('div');
      done.className = 'form-success';
      done.setAttribute('role', 'status');
      done.tabIndex = -1;
      done.innerHTML = '<h3>You’re on the list, ' + esc(name.value.trim()) + '.</h3><p>We’ll write to ' + esc(email.value.trim()) + ' with launch details' +
        (planName && planName !== 'Not sure yet' ? ' for the ' + esc(planName) + ' plan' : '') + ' before Box 001 ships from New Orleans.</p>' +
        '<p class="privacy-note" style="text-align:left;margin-top:12px">Website preview: nothing was sent or stored.</p>';
      form.replaceWith(done);
      done.focus();
    });
  });

  /* ---------- Search (all forms land on search.html) ---------- */
  var results = $('[data-search-results]');
  $$('form[role="search"]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = encodeURIComponent((f.elements.q.value || '').trim());
      if (results) { window.location.hash = v; window.location.reload(); } else { window.location.href = 'search.html#' + v; }
    });
  });
  if (results) {
    var q = (params.get('q') || decodeURIComponent(window.location.hash.slice(1)) || '').trim();
    var input = $('#search-q'), summary = $('[data-search-summary]');
    input.value = q;
    if (!q) { input.focus(); }
    var index = (MB.pages || []).map(function (p) { return { type: 'Page', title: p.title, url: p.url, text: p.text, blurb: p.blurb || '' }; })
      .concat(cities.map(function (c) {
        return {
          type: 'City box ' + c.n + ' · ' + c.month + ' 2027', title: c.city + ', ' + c.st, url: 'city.html#' + c.slug, thumb: c,
          text: [c.city, STATES[c.st], c.month, c.season, c.theme, c.walk, c.sound, c.story.join(' ')].concat(c.finds.map(function (f) { return f.join(' '); })).join(' '),
          blurb: c.theme + '. Sample finds: ' + c.finds.map(function (f) { return f[0]; }).join(', ') + '.'
        };
      }));
    if (q) {
      var words = q.toLowerCase().split(/\s+/).filter(Boolean);
      var hits = index.map(function (it) {
        var hay = (it.title + ' ' + it.text).toLowerCase(), score = 0;
        words.forEach(function (w) { if (hay.indexOf(w) < 0) { score = -999; } else { score += it.title.toLowerCase().indexOf(w) > -1 ? 5 : 1; } });
        return { it: it, score: score };
      }).filter(function (h) { return h.score > 0; }).sort(function (a, b) { return b.score - a.score; });
      var mark = function (s) {
        var out = esc(s);
        words.forEach(function (w) { out = out.replace(new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark>$1</mark>'); });
        return out;
      };
      summary.textContent = hits.length ? hits.length + (hits.length === 1 ? ' result' : ' results') + ' for “' + q + '”'
        : 'No results for “' + q + '”. Try a city, a food like “honey,” or a topic like “shipping.”';
      results.innerHTML = hits.map(function (h) {
        var it = h.it;
        return '<li><a href="' + it.url + '"' + (it.thumb ? '' : ' class="no-thumb"') + '>' + (it.thumb ? pic(it.thumb, 200, '') : '') +
          '<span><span class="label">' + esc(it.type) + '</span><h2>' + mark(it.title) + '</h2><p>' + mark(it.blurb) + '</p></span></a></li>';
      }).join('');
      document.title = 'Search: ' + q + ' — Marlowby';
    } else {
      summary.textContent = 'Type a word above to search every page and city box.';
    }
  }

  /* ---------- Photo fallback ----------
     1st failure: switch to the online Unsplash copy.
     2nd failure: show a neat labeled placeholder instead of a broken image. */
  function photoFailed(im) {
    var fb = im.getAttribute('data-fallback');
    if (fb && im.getAttribute('src') !== fb) { im.setAttribute('src', fb); return; }
    if (im.closest('.pager, .results, .finder-route')) { im.style.visibility = 'hidden'; return; }
    var box = im.parentNode;
    if (!box || box.classList.contains('photo-missing')) { return; }
    box.classList.add('photo-missing');
    box.setAttribute('data-alt', im.alt);
    if (getComputedStyle(box).position === 'static') { box.style.position = 'relative'; }
  }
  document.addEventListener('error', function (e) { if (e.target && e.target.tagName === 'IMG') { photoFailed(e.target); } }, true);
  $$('img').forEach(function (im) { if (im.complete && im.naturalWidth === 0) { photoFailed(im); } });

  /* ---------- Scroll reveal ---------- */
  var targets = $$('.numbered li, .inside-card, .plan-card, .stamp-grid .stamp-card, .info-grid > div, .stat-grid li, .guide-list li, .find-list li, .timeline li');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    targets.forEach(function (el, i) {
      if (el.getBoundingClientRect().top < window.innerHeight) { return; }
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 4) * 80 + 'ms';
      io.observe(el);
    });
  }

  /* ---------- Page position: every page opens at the top, unless a link points to a section ---------- */
  if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
  var target = location.hash && location.hash.length > 1 && document.getElementById(location.hash.slice(1));
  window.addEventListener('load', function () {
    if (target) { target.scrollIntoView({ block: 'start' }); }
    else { window.scrollTo({ top: 0, behavior: 'instant' }); }
  });
})();
