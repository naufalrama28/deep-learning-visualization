/**
 * viz-bab05.js — Gradient descent visualization
 */
function initVizBab05() {
  'use strict';
  var CU = CanvasUtils;
  var canvas = document.getElementById('b05-canvas');
  if (!canvas) return;
  var W = 460, H = 340;
  var setup = CU.setupCanvas(canvas, W, H);
  var ctx = setup.ctx;

  // f(x) = 0.5x² + 0.4sin(2.5x) — has local minima
  function f(x) { return 0.5 * x * x + 0.4 * Math.sin(2.5 * x); }
  function g(x) { return x + 0.4 * 2.5 * Math.cos(2.5 * x); } // derivative

  var state = { pos: 3.2, trail: [], running: false, timer: null };

  function $(id) { return document.getElementById(id); }

  function draw() {
    var lr = parseFloat($('b05-lr').value);
    $('b05-lr-v').textContent = lr.toFixed(2);
    $('b05-start-v').textContent = $('b05-start').value;

    var c = CU.getThemeColors();
    CU.clear(ctx, W, H);

    var pad = { l: 45, r: 20, t: 20, b: 35 };
    var xMin = -4, xMax = 4;
    var yMin = -1, yMax = 10;

    var plot = CU.drawAxes(ctx, {
      w: W, h: H, pad: pad,
      xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax,
      xSteps: 4, ySteps: 4,
      xLabels: ['-4', '-2', '0', '2', '4'],
      yLabels: ['10', '', '5', '', '0']
    });

    // Draw curve
    CU.drawCurve(ctx, f, {
      pad: pad, plotW: plot.plotW, plotH: plot.plotH,
      xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax,
      color: c.accent, lineWidth: 2.5, steps: 300
    });

    // Trail
    var opts = { pad: pad, plotW: plot.plotW, plotH: plot.plotH, xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax };
    for (var i = 0; i < state.trail.length; i++) {
      var tp = CU.toPixel(state.trail[i], f(state.trail[i]), opts);
      var alpha = 0.2 + 0.8 * (i / state.trail.length);
      ctx.beginPath();
      ctx.arc(tp.px, tp.py, 3, 0, Math.PI * 2);
      ctx.fillStyle = c.viz5;
      ctx.globalAlpha = alpha;
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Current ball
    var bp = CU.toPixel(state.pos, f(state.pos), opts);
    ctx.beginPath();
    ctx.arc(bp.px, bp.py, 10, 0, Math.PI * 2);
    ctx.fillStyle = c.viz2;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Gradient arrow
    var grad = g(state.pos);
    var arrowLen = Math.min(Math.abs(grad) * lr * 30, 60);
    var dir = grad > 0 ? -1 : 1;
    ctx.strokeStyle = c.viz4;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bp.px, bp.py - 15);
    ctx.lineTo(bp.px + dir * arrowLen, bp.py - 15);
    ctx.stroke();
    // Arrowhead
    ctx.beginPath();
    ctx.moveTo(bp.px + dir * arrowLen, bp.py - 15);
    ctx.lineTo(bp.px + dir * (arrowLen - 6), bp.py - 20);
    ctx.lineTo(bp.px + dir * (arrowLen - 6), bp.py - 10);
    ctx.closePath();
    ctx.fillStyle = c.viz4;
    ctx.fill();

    // Calc
    var fv = f(state.pos);
    var gv = g(state.pos);
    var msg = '';
    if (!isFinite(state.pos) || Math.abs(state.pos) > 8) {
      msg = '<span style="color:var(--danger)">💥 DIVERGEN! Bola kabur — learning rate terlalu besar!</span>';
      stop();
    } else if (Math.abs(gv) < 0.05) {
      msg = '<span style="color:var(--success)">✅ Sampai di lembah! Gradien ≈ 0.</span>';
      stop();
    } else {
      msg = 'Gradien: ' + gv.toFixed(3) + ' → melangkah ' + (grad > 0 ? 'kiri' : 'kanan');
    }
    $('b05-calc').innerHTML = 'Posisi: <b>' + state.pos.toFixed(3) + '</b> | f(x): <b>' + fv.toFixed(3) + '</b><br>' + msg;
  }

  function stepOnce() {
    var lr = parseFloat($('b05-lr').value);
    state.trail.push(state.pos);
    if (state.trail.length > 60) state.trail.shift();
    state.pos = state.pos - lr * g(state.pos);
    draw();
  }

  function stop() {
    state.running = false;
    if (state.timer) { clearInterval(state.timer); state.timer = null; }
  }

  function run() {
    if (state.running) { stop(); return; }
    state.running = true;
    var speed = window.GLOBAL_SPEED || 1;
    state.timer = setInterval(function() {
      stepOnce();
      if (!isFinite(state.pos) || Math.abs(state.pos) > 8 || Math.abs(g(state.pos)) < 0.05) stop();
    }, 300 / speed);
  }

  // Events
  $('b05-run').addEventListener('click', run);
  $('b05-step').addEventListener('click', stepOnce);
  $('b05-reset').addEventListener('click', function() {
    stop();
    state.pos = parseFloat($('b05-start').value);
    state.trail = [];
    draw();
  });
  $('b05-start').addEventListener('input', function() {
    stop();
    state.pos = parseFloat(this.value);
    state.trail = [];
    draw();
  });
  $('b05-lr').addEventListener('input', draw);
  document.addEventListener('themechange', draw);
  draw();
}
