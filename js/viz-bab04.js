/**
 * viz-bab04.js — Loss function visualization (MSE & Cross-Entropy)
 */
function initVizBab04() {
  'use strict';
  var CU = CanvasUtils;
  var canvas = document.getElementById('b04-canvas');
  if (!canvas) return;
  var W = 460, H = 340;
  var setup = CU.setupCanvas(canvas, W, H);
  var ctx = setup.ctx;

  function loss(fn, t, p) {
    if (fn === 'mse') return (t - p) * (t - p);
    // cross-entropy
    p = Math.max(0.001, Math.min(0.999, p));
    return -(t * Math.log(p) + (1 - t) * Math.log(1 - p));
  }

  function $(id) { return document.getElementById(id); }

  function draw() {
    var fn = $('b04-fn').value;
    var target = parseFloat($('b04-target').value);
    var pred = parseFloat($('b04-pred').value);
    $('b04-target-v').textContent = target.toFixed(2);
    $('b04-pred-v').textContent = pred.toFixed(2);

    var c = CU.getThemeColors();
    CU.clear(ctx, W, H);

    var pad = { l: 50, r: 20, t: 20, b: 35 };
    var xMin = 0.01, xMax = 0.99;
    var yMax = fn === 'mse' ? 1.2 : 5;

    var plot = CU.drawAxes(ctx, {
      w: W, h: H, pad: pad,
      xMin: xMin, xMax: xMax, yMin: 0, yMax: yMax,
      xSteps: 4, ySteps: 4,
      xLabels: ['0', '0.25', '0.5', '0.75', '1'],
      yLabels: [yMax.toFixed(1), '', '', '', '0']
    });

    // Draw loss curve
    var fnToDraw = function(p) { return loss(fn, target, p); };
    CU.drawCurve(ctx, fnToDraw, {
      pad: pad, plotW: plot.plotW, plotH: plot.plotH,
      xMin: xMin, xMax: xMax, yMin: 0, yMax: yMax,
      color: c.accent, lineWidth: 2.5, steps: 200
    });

    // Target line
    var tp = CU.toPixel(target, 0, { pad: pad, plotW: plot.plotW, plotH: plot.plotH, xMin: xMin, xMax: xMax, yMin: 0, yMax: yMax });
    ctx.strokeStyle = c.success;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 3]);
    ctx.beginPath(); ctx.moveTo(tp.px, pad.t); ctx.lineTo(tp.px, H - pad.b); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = c.success;
    ctx.font = '11px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Target', tp.px, pad.t - 5);

    // Prediction point
    var lossVal = loss(fn, target, pred);
    var pp = CU.toPixel(pred, lossVal, { pad: pad, plotW: plot.plotW, plotH: plot.plotH, xMin: xMin, xMax: xMax, yMin: 0, yMax: yMax });
    ctx.beginPath();
    ctx.arc(pp.px, pp.py, 7, 0, Math.PI * 2);
    ctx.fillStyle = c.viz2;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Calc text
    var fnName = fn === 'mse' ? 'MSE' : 'Cross-Entropy';
    var msg = lossVal < 0.1 ? '✅ Hampir tepat!' : lossVal < 1 ? '⚠️ Masih meleset' : '❌ Sangat meleset!';
    $('b04-calc').innerHTML = fnName + ': <b>' + lossVal.toFixed(4) + '</b> ' + msg +
      '<br>Target: ' + target.toFixed(2) + ' | Prediksi: ' + pred.toFixed(2) +
      (fn === 'ce' ? '<br><span class="tiny">CE menghukum "salah tapi pede" jauh lebih berat dari MSE</span>' : '');
  }

  ['b04-fn', 'b04-target', 'b04-pred'].forEach(function(id) {
    $(id).addEventListener('input', draw);
  });
  document.addEventListener('themechange', draw);
  draw();
}
