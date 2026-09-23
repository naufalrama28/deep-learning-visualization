/**
 * viz-bab08.js — CNN: convolution, feature map, pooling
 */
function initVizBab08() {
  'use strict';

  var FILTERS = {
    edge: [[-1,-1,-1],[-1,8,-1],[-1,-1,-1]],
    blur: [[1,1,1],[1,1,1],[1,1,1]].map(function(r){return r.map(function(v){return v/9;});}),
    sharpen: [[0,-1,0],[-1,5,-1],[0,-1,0]],
    vert: [[-1,0,1],[-1,0,1],[-1,0,1]]
  };

  var PATTERNS = {
    x: [[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1]],
    o: [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
    line: [[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
    random: null
  };

  var grid = []; // 5x5
  var featureMap = []; // 3x3
  var pooled = []; // 2x2

  function $(id) { return document.getElementById(id); }

  function setPattern(name) {
    if (name === 'random') {
      grid = [];
      for (var i = 0; i < 5; i++) {
        grid[i] = [];
        for (var j = 0; j < 5; j++) grid[i][j] = Math.random() > 0.5 ? 1 : 0;
      }
    } else {
      grid = PATTERNS[name].map(function(r) { return r.slice(); });
    }
  }

  function convolve() {
    var filterName = $('b08-filter').value;
    var filter = FILTERS[filterName];
    featureMap = [];
    for (var i = 0; i < 3; i++) {
      featureMap[i] = [];
      for (var j = 0; j < 3; j++) {
        var s = 0;
        for (var fi = 0; fi < 3; fi++) {
          for (var fj = 0; fj < 3; fj++) {
            s += grid[i + fi][j + fj] * filter[fi][fj];
          }
        }
        featureMap[i][j] = Math.max(0, s); // ReLU
      }
    }
    // Max pooling 2x2 stride 1 on 3x3 → 2x2
    pooled = [];
    for (var pi = 0; pi < 2; pi++) {
      pooled[pi] = [];
      for (var pj = 0; pj < 2; pj++) {
        var max = -Infinity;
        for (var di = 0; di < 2; di++) {
          for (var dj = 0; dj < 2; dj++) {
            max = Math.max(max, featureMap[pi + di][pj + dj]);
          }
        }
        pooled[pi][pj] = max;
      }
    }
  }

  function colorVal(v, min, max) {
    if (max === min) return 'var(--bg-subtle)';
    var t = (v - min) / (max - min);
    // Blue gradient
    var r = Math.round(37 + t * 0);
    var g = Math.round(99 + t * 100);
    var b = Math.round(235);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + (0.1 + t * 0.9) + ')';
  }

  function renderGrid(containerId, data, rows, cols, min, max, clickable) {
    var container = $(containerId);
    container.innerHTML = '';
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        var cell = document.createElement('div');
        cell.className = 'grid-cell';
        var v = data[i][j];
        if (clickable) {
          cell.style.background = v > 0.5 ? 'var(--accent)' : 'var(--bg-subtle)';
          cell.addEventListener('click', (function(r, c) {
            return function() {
              grid[r][c] = grid[r][c] > 0.5 ? 0 : 1;
              convolve();
              draw();
            };
          })(i, j));
        } else {
          cell.style.background = colorVal(v, min, max);
          cell.textContent = v.toFixed(1);
          cell.style.fontSize = '9px';
          cell.style.display = 'flex';
          cell.style.alignItems = 'center';
          cell.style.justifyContent = 'center';
          cell.style.color = 'var(--text)';
          cell.style.fontFamily = 'var(--font-mono)';
        }
        container.appendChild(cell);
      }
    }
  }

  function draw() {
    convolve();

    // Find min/max for feature map
    var fMin = Infinity, fMax = -Infinity;
    for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) {
      fMin = Math.min(fMin, featureMap[i][j]);
      fMax = Math.max(fMax, featureMap[i][j]);
    }
    var pMin = Infinity, pMax = -Infinity;
    for (var i = 0; i < 2; i++) for (var j = 0; j < 2; j++) {
      pMin = Math.min(pMin, pooled[i][j]);
      pMax = Math.max(pMax, pooled[i][j]);
    }

    renderGrid('b08-in', grid, 5, 5, 0, 1, true);
    renderGrid('b08-out', featureMap, 3, 3, fMin, fMax, false);
    renderGrid('b08-pool', pooled, 2, 2, pMin, pMax, false);

    // Calc
    var filterName = $('b08-filter').value;
    var names = { edge: 'Pendeteksi tepi (Laplacian)', blur: 'Pelembut (rata-rata)', sharpen: 'Penajam', vert: 'Pencari garis tegak' };
    $('b08-calc').innerHTML = 'Filter: <b>' + names[filterName] + '</b><br>Klik kotak gambar untuk menggambar sendiri!';
  }

  $('b08-pattern').addEventListener('change', function() {
    setPattern(this.value);
    draw();
  });
  $('b08-filter').addEventListener('change', draw);
  $('b08-reset').addEventListener('click', function() {
    $('b08-pattern').value = 'x';
    $('b08-filter').value = 'edge';
    setPattern('x');
    draw();
  });
  document.addEventListener('themechange', draw);
  setPattern('x');
  draw();
}
