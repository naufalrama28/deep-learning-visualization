/**
 * viz-bab01.js — Neuron / Perceptron: decision boundary visualization
 */
function initVizBab01() {
  'use strict';
  var CU = CanvasUtils;
  var canvas = document.getElementById('b01-canvas');
  if (!canvas) return;
  var W = 460, H = 340;
  var setup = CU.setupCanvas(canvas, W, H);
  var ctx = setup.ctx;

  var state = { w1: 1, w2: 1, b: -1.2, x1: 0.7, x2: 0.6 };

  function $(id) { return document.getElementById(id); }
  function sync() {
    state.w1 = parseFloat($('b01-w1').value);
    state.w2 = parseFloat($('b01-w2').value);
    state.b = parseFloat($('b01-b').value);
    state.x1 = parseFloat($('b01-x1').value);
    state.x2 = parseFloat($('b01-x2').value);
    $('b01-w1-v').textContent = state.w1.toFixed(1);
    $('b01-w2-v').textContent = state.w2.toFixed(1);
    $('b01-b-v').textContent = state.b.toFixed(1);
    $('b01-x1-v').textContent = state.x1.toFixed(2);
    $('b01-x2-v').textContent = state.x2.toFixed(2);
  }

  function draw() {
    sync();
    var c = CU.getThemeColors();
    CU.clear(ctx, W, H);

    // Decision region heatmap
    var step = 8;
    for (var px = 0; px < W; px += step) {
      for (var py = 0; py < H; py += step) {
        var x1v = px / W;
        var x2v = 1 - py / H;
        var z = state.w1 * x1v + state.w2 * x2v + state.b;
        if (z > 0) {
          ctx.fillStyle = c.viz1 + '22';
        } else {
          ctx.fillStyle = c.viz4 + '22';
        }
        ctx.fillRect(px, py, step, step);
      }
    }

    // Axes labels
    ctx.fillStyle = c.textMuted;
    ctx.font = '11px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Petunjuk 1 →', W / 2, H - 4);
    ctx.save();
    ctx.translate(12, H / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Petunjuk 2 →', 0, 0);
    ctx.restore();

    // Decision line: w1*x1 + w2*x2 + b = 0 → x2 = -(w1*x1 + b) / w2
    if (Math.abs(state.w2) > 0.05) {
      ctx.strokeStyle = c.accent;
      ctx.lineWidth = 2.5;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      var started = false;
      for (var i = 0; i <= 100; i++) {
        var xv = i / 100;
        var yv = -(state.w1 * xv + state.b) / state.w2;
        var px2 = xv * W;
        var py2 = (1 - yv) * H;
        if (yv >= -0.5 && yv <= 1.5) {
          if (!started) { ctx.moveTo(px2, py2); started = true; }
          else ctx.lineTo(px2, py2);
        }
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Input point
    var ipx = state.x1 * W;
    var ipy = (1 - state.x2) * H;
    ctx.beginPath();
    ctx.arc(ipx, ipy, 8, 0, Math.PI * 2);
    ctx.fillStyle = c.viz2;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Calc text
    var z = state.w1 * state.x1 + state.w2 * state.x2 + state.b;
    var on = z > 0;
    $('b01-calc').innerHTML =
      'z = ' + state.w1.toFixed(1) + ' × ' + state.x1.toFixed(2) +
      ' + ' + state.w2.toFixed(1) + ' × ' + state.x2.toFixed(2) +
      ' + (' + state.b.toFixed(1) + ') = <b>' + z.toFixed(2) + '</b>' +
      (on ? ' → <b style="color:var(--success)">YA ✓</b>' : ' → <b style="color:var(--danger)">TIDAK ✗</b>');

    // Lamp
    var lamp = $('b01-lamp');
    if (on) { lamp.textContent = '💡 NYALA — YA, matang!'; lamp.className = 'lamp on'; }
    else { lamp.textContent = '💡 MATI — TIDAK, belum matang'; lamp.className = 'lamp'; }
  }

  // Events
  ['b01-w1', 'b01-w2', 'b01-b', 'b01-x1', 'b01-x2'].forEach(function(id) {
    $(id).addEventListener('input', draw);
  });

  $('b01-and').addEventListener('click', function() {
    $('b01-w1').value = 1; $('b01-w2').value = 1; $('b01-b').value = -1.2;
    draw();
  });
  $('b01-or').addEventListener('click', function() {
    $('b01-w1').value = 1; $('b01-w2').value = 1; $('b01-b').value = -0.5;
    draw();
  });
  $('b01-reset').addEventListener('click', function() {
    $('b01-w1').value = 1; $('b01-w2').value = 1; $('b01-b').value = -1.2;
    $('b01-x1').value = 0.7; $('b01-x2').value = 0.6;
    draw();
  });

  document.addEventListener('themechange', draw);
  draw();
}
