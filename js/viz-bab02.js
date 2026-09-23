/**
 * viz-bab02.js — Activation functions visualization
 */
function initVizBab02() {
  'use strict';
  var CU = CanvasUtils;
  var canvas = document.getElementById('b02-canvas');
  if (!canvas) return;
  var W = 460, H = 340;
  var setup = CU.setupCanvas(canvas, W, H);
  var ctx = setup.ctx;

  var fns = {
    sigmoid: function(x) { return 1 / (1 + Math.exp(-x)); },
    tanh: function(x) { return Math.tanh(x); },
    relu: function(x) { return Math.max(0, x); },
    step: function(x) { return x > 0 ? 1 : 0; }
  };

  var names = { sigmoid: 'Si Lembut (Sigmoid)', tanh: 'Si Seimbang (Tanh)', relu: 'Si Cuek (ReLU)', step: 'Si Tegas (Step)' };

  function $(id) { return document.getElementById(id); }

  function draw() {
    var name = $('b02-fn').value;
    var x = parseFloat($('b02-x').value);
    $('b02-x-v').textContent = x.toFixed(1);

    var fn = fns[name];
    var y = fn(x);
    var c = CU.getThemeColors();
    CU.clear(ctx, W, H);

    var pad = { l: 50, r: 20, t: 20, b: 35 };
    var xMin = -5, xMax = 5;
    var yMin, yMax;
    if (name === 'relu') { yMin = -0.5; yMax = 5; }
    else if (name === 'step') { yMin = -0.2; yMax = 1.3; }
    else { yMin = -1.3; yMax = 1.3; }

    var plot = CU.drawAxes(ctx, {
      w: W, h: H, pad: pad,
      xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax,
      xSteps: 5, ySteps: 4,
      xLabels: ['-5', '-3', '0', '3', '5', ''],
      yLabels: [yMax.toFixed(1), '', '0', '', yMin.toFixed(1), '']
    });

    // Draw zero line
    var zero = CU.toPixel(0, 0, { pad: pad, plotW: plot.plotW, plotH: plot.plotH, xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax });
    ctx.strokeStyle = c.textMuted;
    ctx.lineWidth = 0.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(pad.l, zero.py); ctx.lineTo(W - pad.r, zero.py); ctx.stroke();
    ctx.setLineDash([]);

    // Draw curve
    CU.drawCurve(ctx, fn, {
      pad: pad, plotW: plot.plotW, plotH: plot.plotH,
      xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax,
      color: c.accent, lineWidth: 3, steps: 300
    });

    // Draw point
    var pt = CU.toPixel(x, y, { pad: pad, plotW: plot.plotW, plotH: plot.plotH, xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax });
    ctx.beginPath();
    ctx.arc(pt.px, pt.py, 7, 0, Math.PI * 2);
    ctx.fillStyle = c.viz2;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Gradient (numerical)
    var eps = 0.01;
    var g = (fn(x + eps) - fn(x - eps)) / (2 * eps);
    if (name === 'step') g = 0;

    // Calc text
    var info = names[name] + '<br>Input: ' + x.toFixed(1) + ' → Output: <b>' + y.toFixed(3) + '</b><br>Gradien: <b>' + g.toFixed(3) + '</b>';
    if (name === 'sigmoid' && Math.abs(x) > 3) info += '<br><span style="color:var(--warning)">⚠️ Saturasi — gradien hampir nol, mesin berhenti belajar!</span>';
    if (name === 'relu' && x < 0) info += '<br><span style="color:var(--text-muted)">Negatif → diam (0). Hanya positif yang "dihidupkan".</span>';
    $('b02-calc').innerHTML = info;
  }

  ['b02-fn', 'b02-x'].forEach(function(id) {
    $(id).addEventListener('input', draw);
  });
  document.addEventListener('themechange', draw);
  draw();
}
