/**
 * app.js — Router, XP system, quiz engine, theme management
 * Neural Lab v1.0
 */
(function() {
  'use strict';

  // Configuration
  var TITLES = {
    beranda: ['Neural Lab', 'Bangun kesadaran buatan dari nol'],
    bab01: ['Bab 1 — Satu Sel Otak', 'Neuron: menimbang petunjuk → keputusan'],
    bab02: ['Bab 2 — Memberi Perasaan', 'Fungsi aktivasi: dari kaku ke bertingkat'],
    bab03: ['Bab 3 — Kekuatan Tim', 'MLP: estafet peringkas berlapis'],
    bab04: ['Bab 4 — Cermin Kebenaran', 'Loss: mengukur seberapa meleset'],
    bab05: ['Bab 5 — Menuruni Bukit', 'Gradient descent: seni memperbaiki diri'],
    bab06: ['Bab 6 — Evaluasi Bersama', 'Backpropagation: bagi salah dengan adil'],
    bab07: ['Bab 7 — Hafal vs Paham', 'Overfitting: jebakan nilai sempurna'],
    bab08: ['Bab 8 — Mata Digital', 'CNN: meraba gambar dengan filter'],
    bab09: ['Bab 9 — Ingatan Berantai', 'RNN: catatan kecil yang diupdate'],
    bab10: ['Bab 10 — Seni Mendengarkan', 'Attention: siapa yang paling relevan?'],
    bab11: ['Bab 11 — Laboratorium', 'Latih AI sungguhan di browser']
  };

  var VIZ_INIT = {
    bab01: 'initVizBab01',
    bab02: 'initVizBab02',
    bab03: 'initVizBab03',
    bab04: 'initVizBab04',
    bab05: 'initVizBab05',
    bab06: 'initVizBab06',
    bab07: 'initVizBab07',
    bab08: 'initVizBab08',
    bab09: 'initVizBab09',
    bab10: 'initVizBab10',
    bab11: 'initVizBab11'
  };

  var LEVELS = [
    { name: 'Bibit', xp: 0 },
    { name: 'Tunas', xp: 150 },
    { name: 'Anak', xp: 400 },
    { name: 'Remaja', xp: 700 },
    { name: 'Dewasa', xp: 1100 },
    { name: 'Master', xp: 1500 }
  ];

  var ABILITIES = {
    bab01: 'Menimbang', bab02: 'Merasakan', bab03: 'Bekerja Tim',
    bab04: 'Berkaca', bab05: 'Melangkah', bab06: 'Evaluasi',
    bab07: 'Jujur', bab08: 'Melihat', bab09: 'Mengingat',
    bab10: 'Mendengar', bab11: 'Melatih'
  };

  // State
  var progress = StateManager.loadProgress();
  var xpState = StateManager.loadXP();
  var vizDone = {};
  var currentRoute = 'beranda';

  // Helpers
  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return document.querySelectorAll(sel); }

  function levelFor(xp) {
    for (var i = LEVELS.length - 1; i >= 0; i--) {
      if (xp >= LEVELS[i].xp) return i;
    }
    return 0;
  }

  function levelProgress(xp) {
    var lv = levelFor(xp);
    var curr = LEVELS[lv].xp;
    var next = lv < LEVELS.length - 1 ? LEVELS[lv + 1].xp : LEVELS[lv].xp;
    if (next === curr) return 100;
    return Math.round((xp - curr) / (next - curr) * 100);
  }

  // Mascot SVG
  function mascotSVG(lv) {
    var parts = '';
    parts += '<circle cx="18" cy="20" r="14" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" stroke-width="1.5"/>';
    parts += '<circle cx="13" cy="17" r="2" fill="var(--accent)"/>';
    parts += '<circle cx="23" cy="17" r="2" fill="var(--accent)"/>';

    if (lv >= 1) {
      parts += '<line x1="18" y1="6" x2="18" y2="2" stroke="var(--accent)" stroke-width="1.5"/>';
      parts += '<circle cx="18" cy="2" r="2" fill="var(--viz-5)"/>';
    }
    if (lv >= 2) {
      parts += '<path d="M12 23 Q18 28 24 23" fill="none" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round"/>';
    }
    if (lv >= 3) {
      parts += '<text x="18" y="38" text-anchor="middle" font-size="8" fill="var(--viz-4)">★</text>';
    }
    if (lv >= 4) {
      parts += '<polygon points="8,8 18,3 28,8 18,12" fill="var(--text)" opacity="0.7"/>';
      parts += '<line x1="28" y1="8" x2="28" y2="14" stroke="var(--text)" stroke-width="1" opacity="0.5"/>';
    }
    if (lv >= 5) {
      parts += '<circle cx="18" cy="20" r="17" fill="none" stroke="var(--viz-4)" stroke-width="1" opacity="0.4" stroke-dasharray="3,2"/>';
    }

    return '<svg viewBox="0 0 36 42" xmlns="http://www.w3.org/2000/svg">' + parts + '</svg>';
  }

  // Router
  function getRoute() {
    var h = location.hash.replace('#', '') || 'beranda';
    return TITLES[h] ? h : 'beranda';
  }

  function show(route) {
    currentRoute = route;
    $$('.page').forEach(function(el) { el.classList.add('hidden'); });
    var sec = $('#sec-' + route);
    if (sec) sec.classList.remove('hidden');

    var t = TITLES[route] || ['Neural Lab', ''];
    var titleEl = $('.topbar-title');
    var subEl = $('.topbar-sub');
    if (titleEl) titleEl.textContent = t[0];
    if (subEl) subEl.textContent = t[1];

    $$('#nav a').forEach(function(a) {
      a.classList.toggle('active', a.getAttribute('data-route') === route);
    });

    if (VIZ_INIT[route] && !vizDone[route]) {
      vizDone[route] = true;
      try {
        var fn = window[VIZ_INIT[route]];
        if (typeof fn === 'function') fn();
      } catch(e) {
        console.error('Viz init error:', route, e);
      }
    }

    window.scrollTo(0, 0);

    var sidebar = $('#sidebar');
    if (sidebar) sidebar.classList.remove('open');
    var overlay = $('.overlay');
    if (overlay) overlay.classList.remove('show');
  }

  // Render functions
  function renderProgress() {
    var total = MODULES.length;
    var done = 0;
    MODULES.forEach(function(m) { if (progress[m.id]) done++; });
    var pct = Math.round(done / total * 100);

    var fill = $('#progress-fill');
    if (fill) fill.style.width = pct + '%';
    var label = $('#progress-pct');
    if (label) label.textContent = pct + '%';

    $$('#nav a[data-route]').forEach(function(a) {
      var r = a.getAttribute('data-route');
      if (progress[r]) a.classList.add('done');
      else a.classList.remove('done');
    });
  }

  function renderXP() {
    var lv = levelFor(xpState.total);
    var lp = levelProgress(xpState.total);

    var levelEl = $('#xp-level');
    if (levelEl) levelEl.textContent = 'Level ' + lv + ' · ' + LEVELS[lv].name;

    var xpFill = $('#xp-fill');
    if (xpFill) xpFill.style.width = lp + '%';

    var xpText = $('#xp-text');
    if (xpText) xpText.textContent = xpState.total + ' XP';

    var mascot = $('#mascot-avatar');
    if (mascot) mascot.innerHTML = mascotSVG(lv);

    var abEl = $('#abilities');
    if (abEl) {
      var html = '';
      MODULES.forEach(function(m) {
        if (progress[m.id] && ABILITIES[m.id]) {
          html += '<span class="badge">🔓 ' + ABILITIES[m.id] + '</span> ';
        }
      });
      abEl.innerHTML = html;
    }
  }

  function addXP(amount) {
    xpState.total += amount;
    StateManager.saveXP(xpState);
    renderXP();
  }

  function renderQuizzes() {
    $$('.quiz').forEach(function(container) {
      var key = container.getAttribute('data-quiz');
      var questions = QUIZZES[key];
      if (!questions || container.dataset.rendered) return;
      container.dataset.rendered = '1';

      var html = '';
      questions.forEach(function(q, qi) {
        var qid = key + '-q' + qi;
        html += '<div class="quiz-block" data-qid="' + qid + '">';
        html += '<div class="quiz-q">' + (qi + 1) + '. ' + q.q + '</div>';
        html += '<div class="quiz-opts">';
        q.opts.forEach(function(opt, oi) {
          html += '<div class="quiz-opt" data-qi="' + qi + '" data-oi="' + oi + '">' + opt + '</div>';
        });
        html += '</div>';
        html += '<div class="quiz-fb hidden" id="' + qid + '-fb"></div>';
        html += '</div>';
        if (qi < questions.length - 1) html += '<hr style="border:none;border-top:1px solid var(--card-border);margin:var(--sp-4) 0">';
      });
      container.innerHTML = html;

      container.addEventListener('click', function(e) {
        var opt = e.target.closest('.quiz-opt');
        if (!opt || opt.classList.contains('disabled')) return;

        var block = opt.closest('.quiz-block');
        var qi = parseInt(opt.getAttribute('data-qi'));
        var oi = parseInt(opt.getAttribute('data-oi'));
        var qid = block.getAttribute('data-qid');
        var q = questions[qi];
        var fb = block.querySelector('.quiz-fb');

        block.querySelectorAll('.quiz-opt').forEach(function(o) { o.classList.add('disabled'); });

        if (oi === q.answer) {
          opt.classList.add('correct');
          fb.className = 'quiz-fb ok';
          fb.textContent = '✓ Benar! ' + q.fb;
          fb.classList.remove('hidden');
          if (!xpState.quizzes[qid]) {
            xpState.quizzes[qid] = true;
            addXP(25);
          }
        } else {
          opt.classList.add('wrong');
          block.querySelectorAll('.quiz-opt').forEach(function(o) {
            if (parseInt(o.getAttribute('data-oi')) === q.answer) o.classList.add('correct');
          });
          fb.className = 'quiz-fb no';
          fb.textContent = '✗ Kurang tepat. ' + q.fb;
          fb.classList.remove('hidden');
        }
      });
    });
  }

  function renderHome() {
    var container = $('#home-cards');
    if (!container || container.dataset.rendered) return;
    container.dataset.rendered = '1';

    var html = '';
    MODULES.forEach(function(m, i) {
      html += '<a class="mini-card" href="#' + m.id + '">';
      html += '<h4>' + (i + 1) + '. ' + m.title + '</h4>';
      html += '<p>' + m.goal + '</p>';
      html += '</a>';
    });
    container.innerHTML = html;
  }

  // Theme
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    StateManager.saveTheme(t);
    var btn = $('#theme-btn');
    if (btn) btn.textContent = t === 'dark' ? '☀️ Mode Terang' : '🌙 Mode Gelap';
    document.dispatchEvent(new CustomEvent('themechange'));
  }

  // Init
  document.addEventListener('DOMContentLoaded', function() {
    renderProgress();
    renderXP();
    renderQuizzes();
    renderHome();

    var savedTheme = StateManager.loadTheme();
    applyTheme(savedTheme);

    var themeBtn = $('#theme-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', function() {
        var curr = document.documentElement.getAttribute('data-theme');
        applyTheme(curr === 'dark' ? 'light' : 'dark');
      });
    }

    var resetBtn = $('#reset-progress');
    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        if (confirm('Hapus semua progress, XP, dan jawaban kuis?')) {
          StateManager.resetAll();
          progress = {};
          xpState = { total: 0, quizzes: {} };
          vizDone = {};
          renderProgress();
          renderXP();
          $$('.quiz').forEach(function(el) { el.dataset.rendered = ''; el.innerHTML = ''; });
          renderQuizzes();
          location.hash = '#beranda';
        }
      });
    }

    $$('.done-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var mod = btn.getAttribute('data-mod');
        if (!progress[mod]) {
          progress[mod] = true;
          StateManager.saveProgress(progress);
          addXP(100);
          renderProgress();
          btn.textContent = '✓ Selesai!';
          btn.classList.remove('ghost');
          btn.style.opacity = '0.6';
        }
      });
      var mod = btn.getAttribute('data-mod');
      if (progress[mod]) {
        btn.textContent = '✓ Selesai!';
        btn.classList.remove('ghost');
        btn.style.opacity = '0.6';
      }
    });

    var menuBtn = $('#menu-btn');
    var sidebar = $('#sidebar');
    var overlay = $('.overlay');
    if (menuBtn && sidebar) {
      menuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        if (overlay) overlay.classList.toggle('show');
      });
    }
    if (overlay) {
      overlay.addEventListener('click', function() {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
      });
    }

    var speedInput = $('#global-speed');
    if (speedInput) {
      speedInput.addEventListener('input', function() {
        window.GLOBAL_SPEED = parseFloat(speedInput.value) || 1;
      });
      window.GLOBAL_SPEED = StateManager.loadSpeed();
    }

    window.addEventListener('hashchange', function() { show(getRoute()); });
    show(getRoute());
  });

})();
