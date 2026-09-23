/**
 * viz-bab07.js — Overfitting: polynomial regression visualization
 */
function initVizBab07() {
  'use strict';
  var CU = CanvasUtils;
  var canvas = document.getElementById('b07-canvas');
  if (!canvas) return;
  var W = 460, H = 340;
  var setup = CU.setupCanvas(canvas, W, H);
  var ctx = setup.ctx;

  var trainData = [], testData = [];

  function trueF(x) { return Math.sin(1.2 * x) * 1.5 + 0.2 * x; }

  function genData() {
    var n = parseInt(document.getElementById('b07-n').value);
    var noise = parseFloat(document.getElementById('b07-noise').value);
    trainData = [];
    for (var i = 0; i < n; i++) {
      var x = -3 + 6 * i / (n - 1) + (Math.random() - 0.5) * 0.3;
      var y = trueF(x) + (Math.random() - 0.5) * noise * 2;
      trainData.push({ x: x, y: y });
    }
    testData = [];
    for (var j = 0; j < 40; j++) {
      var x2 = -3 + 6 * j / 39;
      var y2 = trueF(x2) + (Math.random() - 0.5) * noise * 2;
      testData.push({ x: x2, y: y2 });
    }
  }

  // Gaussian elimination for polynomial fitting
  function polyfit(pts, d) {
    var n = d + 1;
    // Build normal equations (X^T X) beta = X^T y
    var M = [];
    for (var i = 0; i < n; i++) {
      M[i] = [];
      for (var j = 0; j <= n; j++) M[i][j] = 0;
    }
    for (var k = 0; k < pts.length; k++) {
      var x = pts[k].x, y = pts[k].y;
      for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
          M[i][j] += Math.pow(x, i + j);
        }
        M[i][n] += Math.pow(x, i) * y;
      }
    }
    // Solve
    for (var i = 0; i < n; i++) {
      var maxRow = i;
      for (var k = i + 1; k < n; k++) {
        if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) maxRow = k;
      }
      var tmp = M[i]; M[i] = M[maxRow]; M[maxRow] = tmp;
      if (Math.abs(M[i][i]) < 1e-10) return null;
      for (var k = i + 1; k < n; k++) {
        var factor = M[k][i] / M[i][i];
        for (var j = i; j <= n; j++) M[k][j] -= factor * M[i][j];
      }
    }
    var coef = [];
    for (var i = n - 1; i >= 0; i--) {
      var s = M[i][n];
      for (var j = i + 1; j < n; j++) s -= M[i][j] * coef[n - 1 - j];
      coef[n - 1 - i] = s / M[i][i];
    }
    return coef;
  }

  function peval(coef, x) {
    var s = 0;
    for (var i = 0; i < coef.length; i++) s += coef[i] * Math.pow(x, i);
    return s;
  }

  function mse(pts, coef) {
    var s = 0;
    for (var i = 0; i < pts.length; i++) {
      var d = pts[i].y - peval(coef, pts[i].x);
      s += d * d;
    }
    return s / pts.length;
  }

  function draw() {
    var degree = parseInt(document.getElementById('b07-degree').value);
    document.getElementById('b07-degree-v').textContent = degree;
    document.getElementById('b07-noise-v').textContent = document.getElementById('b07-noise').value;
    document.getElementById('b07-n-v').textContent = document.getElementById('b07-n').value;

    var c = CU.getThemeColors();
    CU.clear(ctx, W, H);

    var pad = { l: 45, r: 20, t: 20, b: 35 };
    var xMin = -3.5, xMax = 3.5, yMin = -4, yMax = 4;

    var plot = CU.drawAxes(ctx, {
      w: W, h: H, pad: pad,
      xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax,
      xSteps: 4, ySteps: 4,
      xLabels: ['-3', '-1.5', '0', '1.5', '3'],
      yLabels: ['4', '2', '0', '-2', '-4']
    });

    var opts = { pad: pad, plotW: plot.plotW, plotH: plot.plotH, xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax };

    // True curve
    CU.drawCurve(ctx, trueF, {
      pad: pad, plotW: plot.plotW, plotH: plot.plotH,
      xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax,
      color: c.success, lineWidth: 2, steps: 200
    });
    ctx.setLineDash([5, 3]);
    ctx.strokeStyle = c.success;
    ctx.lineWidth = 1.5;
    // (already drawn via drawCurve, but let's add label)
    ctx.setLineDash([]);

    // Fit polynomial
    var coef = polyfit(trainData, degree);
    if (coef) {
      var fitFn = function(x) { return Math.max(yMin, Math.min(yMax, peval(coef, x))); };
      CU.drawCurve(ctx, fitFn, {
        pad: pad, plotW: plot.plotW, plotH: plot.plotH,
        xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax,
        color: c.viz2, lineWidth: 2.5, steps: 300
      });

      var trainMSE = mse(trainData, coef);
      var testMSE = mse(testData, coef);

      // Train points
      for (var i = 0; i < trainData.length; i++) {
        var p = CU.toPixel(trainData[i].x, trainData[i].y, opts);
        ctx.beginPath();
        ctx.arc(p.px, p.py, 4, 0, Math.PI * 2);
        ctx.fillStyle = c.viz1;
        ctx.fill();
      }

      // Test points
      for (var j = 0; j < testData.length; j++) {
        var p2 = CU.toPixel(testData[j].x, testData[j].y, opts);
        ctx.beginPath();
        ctx.arc(p2.px, p2.py, 3, 0, Math.PI * 2);
        ctx.fillStyle = c.textMuted;
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Verdict
      var verdict = '';
      if (degree <= 1) verdict = '🔵 Underfit — terlalu sederhana';
      else if (degree <= 5) verdict = '✅ Pas — menangkap pola umum';
      else verdict = '🔴 Overfit — menghafal noise!';

      $('b07-calc').innerHTML = 'Derajat: ' + degree + ' | Train MSE: <b>' + trainMSE.toFixed(3) + '</b> | Test MSE: <b>' + testMSE.toFixed(3) + '</b><br>' + verdict;
    } else {
      $('b07-calc').innerHTML = '<span style="color:var(--danger)">Fit gagal (matriks singular). Coba derajat lebih rendah.</span>';
    }
  }

  ['b07-degree', 'b07-noise', 'b07-n'].forEach(function(id) {
    document.getElementById(id).addEventListener('input', function() {
      if (id === 'b07-noise' || id === 'b07-n') genData();
      draw();
    });
  });
  document.getElementById('b07-new').addEventListener('click', function() { genData(); draw(); });
  document.getElementById('b07-reset').addEventListener('click', function() {
    document.getElementById('b07-degree').value = 3;
    document.getElementById('b07-noise').value = 0.3;
    document.getElementById('b07-n').value = 18;
    genData(); draw();
  });
  document.addEventListener('themechange', draw);
  genData();
  draw();
}
