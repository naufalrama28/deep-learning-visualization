/**
 * viz-bab10.js — Attention / Transformer visualization
 */
function initVizBab10() {
  'use strict';

  var SENTENCES = [
    ['Kucing', 'mengejar', 'tikus', 'karena', 'ia', 'lapar'],
    ['Saya', 'menabung', 'di', 'bank', 'sungai'],
    ['Dia', 'memberi', 'buku', 'itu', 'kepadanya']
  ];

  // Hand-crafted attention for sentence 0 (didactic)
  var RAW0 = [
    [0.05, 0.15, 0.30, 0.10, 0.30, 0.10], // Kucing
    [0.20, 0.10, 0.30, 0.10, 0.15, 0.15], // mengejar
    [0.10, 0.25, 0.10, 0.10, 0.25, 0.20], // tikus
    [0.05, 0.10, 0.10, 0.15, 0.35, 0.25], // karena
    [0.35, 0.10, 0.10, 0.10, 0.10, 0.25], // ia → Kucing!
    [0.15, 0.15, 0.15, 0.15, 0.20, 0.20]  // lapar
  ];

  function hashVec(word, dim) {
    var v = [];
    for (var d = 0; d < dim; d++) {
      var h = 0;
      for (var i = 0; i < word.length; i++) {
        h = ((h << 5) - h + word.charCodeAt(i) + d * 31) | 0;
      }
      v.push(Math.sin(h) * 0.5);
    }
    return v;
  }

  function dot(a, b) {
    var s = 0;
    for (var i = 0; i < a.length; i++) s += a[i] * b[i];
    return s;
  }

  function softmax(arr) {
    var max = -Infinity;
    for (var i = 0; i < arr.length; i++) max = Math.max(max, arr[i]);
    var exps = arr.map(function(v) { return Math.exp(v - max); });
    var sum = exps.reduce(function(a, b) { return a + b; }, 0);
    return exps.map(function(v) { return v / sum; });
  }

  function getScores(si) {
    if (si === 0) return RAW0;
    var words = SENTENCES[si];
    var dim = 4;
    var vecs = words.map(function(w) { return hashVec(w, dim); });
    var matrix = [];
    for (var i = 0; i < words.length; i++) {
      var row = [];
      for (var j = 0; j < words.length; j++) {
        row.push(dot(vecs[i], vecs[j]) / Math.sqrt(dim));
      }
      matrix.push(softmax(row));
    }
    return matrix;
  }

  var selectedWord = -1;

  function $(id) { return document.getElementById(id); }

  function draw() {
    var si = parseInt($('b10-sent').value);
    var words = SENTENCES[si];
    var scores = getScores(si);
    var c = CanvasUtils.getThemeColors();

    // Word buttons
    var wordsEl = $('b10-words');
    var html = '';
    for (var i = 0; i < words.length; i++) {
      html += '<button class="word-btn' + (i === selectedWord ? ' active' : '') + '" data-idx="' + i + '">' + words[i] + '</button>';
    }
    wordsEl.innerHTML = html;

    // Click handlers
    wordsEl.querySelectorAll('.word-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        selectedWord = parseInt(this.getAttribute('data-idx'));
        draw();
      });
    });

    // Attention matrix
    var matrixEl = $('b10-matrix');
    var n = words.length;
    matrixEl.style.gridTemplateColumns = '60px repeat(' + n + ', 1fr)';
    var mhtml = '';

    // Header row
    mhtml += '<div class="att-cell" style="font-weight:600;font-size:0.7rem;color:var(--text-muted)">↓ query →</div>';
    for (var j = 0; j < n; j++) {
      mhtml += '<div class="att-cell" style="font-weight:600;font-size:0.7rem;color:var(--text-secondary)">' + words[j] + '</div>';
    }

    for (var i = 0; i < n; i++) {
      // Row label
      mhtml += '<div class="att-cell" style="font-weight:600;font-size:0.7rem;color:var(--text-secondary);justify-content:flex-end">' + words[i] + '</div>';
      for (var j = 0; j < n; j++) {
        var p = scores[i][j];
        var isHighlighted = (selectedWord === -1 || i === selectedWord || j === selectedWord);
        var opacity = isHighlighted ? (0.05 + p * 0.9) : 0.05;
        var bg = 'rgba(37, 99, 235, ' + opacity + ')';
        mhtml += '<div class="att-cell" style="background:' + bg + '">' + (p * 100).toFixed(0) + '%</div>';
      }
    }
    matrixEl.innerHTML = mhtml;

    // Calc
    if (selectedWord >= 0) {
      var row = scores[selectedWord];
      var pairs = [];
      for (var k = 0; k < n; k++) pairs.push({ word: words[k], score: row[k] });
      pairs.sort(function(a, b) { return b.score - a.score; });
      var top3 = pairs.slice(0, 3).map(function(p) { return '<b>' + p.word + '</b> (' + (p.score * 100).toFixed(0) + '%)'; }).join(' > ');
      $('b10-calc').innerHTML = '"' + words[selectedWord] + '" mendengarkan: ' + top3;
    } else {
      $('b10-calc').innerHTML = 'Klik salah satu kata untuk melihat apa yang didengarkannya.';
    }
  }

  $('b10-sent').addEventListener('change', function() { selectedWord = -1; draw(); });
  draw();
}
