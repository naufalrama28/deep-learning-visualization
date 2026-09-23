/**
 * viz-bab03.js — MLP forward pass visualization (SVG)
 */
function initVizBab03() {
  'use strict';
  var svg = document.getElementById('b03-svg');
  if (!svg) return;

  // Architecture: 2 → 3 → 2 → 1
  var layers = [2, 3, 2, 1];
  var labels = [['C1', 'C2'], ['A', 'B', 'C'], ['D', 'E'], ['★']];
  var W = []; // weight matrices
  var B = []; // bias arrays

  function rand(a, b) { return a + Math.random() * (b - a); }
  function randW(r, c) { var m = []; for (var i = 0; i < r; i++) { m[i] = []; for (var j = 0; j < c; j++) m[i][j] = rand(-1.5, 1.5); } return m; }

  function resetW() {
    W = [randW(3, 2), randW(2, 3), randW(1, 2)];
    B = [[0, 0, 0], [0, 0], [0]];
  }
  resetW();

  function act(name, x) {
    if (name === 'sigmoid') return 1 / (1 + Math.exp(-x));
    if (name === 'tanh') return Math.tanh(x);
    if (name === 'relu') return Math.max(0, x);
    return x;
  }

  function forward(i1, i2, actName) {
    var inp = [i1, i2];
    var vals = [inp];
    for (var l = 0; l < W.length; l++) {
      var next = [];
      for (var j = 0; j < W[l].length; j++) {
        var s = B[l][j];
        for (var k = 0; k < vals[l].length; k++) {
          s += W[l][j][k] * vals[l][k];
        }
        next.push(act(actName, s));
      }
      vals.push(next);
    }
    return vals;
  }

  function pos(layerIdx, nodeIdx, total) {
    var xSpacing = W / (layers.length + 1);
    var x = xSpacing * (layerIdx + 1);
    var ySpacing = H / (total + 1);
    var y = ySpacing * (nodeIdx + 1);
    return { x: x, y: y };
  }

  var H = 340;

  function $(id) { return document.getElementById(id); }

  function draw() {
    var i1 = parseFloat($('b03-i1').value);
    var i2 = parseFloat($('b03-i2').value);
    var actName = $('b03-act').value;
    $('b03-i1-v').textContent = i1.toFixed(2);
    $('b03-i2-v').textContent = i2.toFixed(2);

    var vals = forward(i1, i2, actName);
    var c = CanvasUtils.getThemeColors();

    var html = '';

    // Draw connections first (behind nodes)
    for (var l = 0; l < W.length; l++) {
      for (var j = 0; j < W[l].length; j++) {
        for (var k = 0; k < W[l][j].length; k++) {
          var w = W[l][j][k];
          var from = pos(l, k, layers[l]);
          var to = pos(l + 1, j, layers[l + 1]);
          var thick = Math.min(Math.abs(w) * 2, 5);
          var color = w > 0 ? c.viz1 : c.viz2;
          var opacity = 0.3 + Math.min(Math.abs(w) * 0.3, 0.7);
          html += '<line x1="' + from.x + '" y1="' + from.y + '" x2="' + to.x + '" y2="' + to.y + '" stroke="' + color + '" stroke-width="' + thick + '" opacity="' + opacity + '" />';
          // Weight label
          var mx = (from.x + to.x) / 2;
          var my = (from.y + to.y) / 2;
          html += '<text x="' + mx + '" y="' + (my - 4) + '" text-anchor="middle" font-size="8" fill="' + c.textMuted + '" font-family="monospace">' + w.toFixed(1) + '</text>';
        }
      }
    }

    // Draw nodes
    for (var l = 0; l < layers.length; l++) {
      for (var n = 0; n < layers[l]; n++) {
        var p = pos(l, n, layers[l]);
        var v = vals[l][n];
        var r = 18;
        var fillColor = v > 0 ? c.viz1 + '30' : c.viz2 + '30';
        html += '<circle cx="' + p.x + '" cy="' + p.y + '" r="' + r + '" fill="' + fillColor + '" stroke="' + c.accent + '" stroke-width="1.5"/>';
        html += '<text x="' + p.x + '" y="' + (p.y + 4) + '" text-anchor="middle" font-size="10" font-weight="600" fill="' + c.text + '" font-family="monospace">' + v.toFixed(2) + '</text>';
        html += '<text x="' + p.x + '" y="' + (p.y + r + 14) + '" text-anchor="middle" font-size="9" fill="' + c.textMuted + '">' + labels[l][n] + '</text>';
      }
    }

    svg.innerHTML = html;

    // Calc
    var out = vals[vals.length - 1][0];
    $('b03-calc').innerHTML = 'Output: <b>' + out.toFixed(3) + '</b><br>(Acak bobot untuk lihat bagaimana keputusan berubah!)';
  }

  $('b03-random').addEventListener('click', function() { resetW(); draw(); });
  $('b03-reset').addEventListener('click', function() {
    resetW();
    $('b03-i1').value = 0.8; $('b03-i2').value = 0.3;
    $('b03-act').value = 'relu';
    draw();
  });
  ['b03-i1', 'b03-i2', 'b03-act'].forEach(function(id) {
    $(id).addEventListener('input', draw);
  });
  document.addEventListener('themechange', draw);
  draw();
}
