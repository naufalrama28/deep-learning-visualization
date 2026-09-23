/**
 * viz-bab06.js — Backpropagation step-by-step visualization
 */
function initVizBab06() {
  'use strict';

  // Simple network: 2 inputs → 1 sigmoid neuron, target = 1
  var state = {
    w1: 0.5, w2: 0.3, b: 0.1,
    x1: 0.8, x2: 0.4,
    lr: 0.5,
    stepIdx: 0 // 0=forward, 1=loss, 2=grad, 3=update
  };

  function sig(x) { return 1 / (1 + Math.exp(-x)); }

  function $(id) { return document.getElementById(id); }

  function snapshot() {
    var x1 = state.x1, x2 = state.x2;
    var z = state.w1 * x1 + state.w2 * x2 + state.b;
    var pred = sig(z);
    var target = 1;
    var err = pred - target;
    // MSE gradient through sigmoid: dL/dz = (pred - target) * pred * (1 - pred)
    var dz = err * pred * (1 - pred);
    var dw1 = dz * x1;
    var dw2 = dz * x2;
    var db = dz;
    return { z: z, pred: pred, target: target, err: err, dz: dz, dw1: dw1, dw2: dw2, db: db };
  }

  function draw() {
    state.x1 = parseFloat($('b06-x1').value);
    state.x2 = parseFloat($('b06-x2').value);
    state.lr = parseFloat($('b06-lr').value);
    $('b06-x1-v').textContent = state.x1.toFixed(2);
    $('b06-x2-v').textContent = state.x2.toFixed(2);
    $('b06-lr-v').textContent = state.lr.toFixed(2);

    var snap = snapshot();
    var steps = document.querySelectorAll('#b06-steps li');
    steps.forEach(function(s, i) {
      s.classList.toggle('active', i === state.stepIdx);
    });

    var viz = $('b06-viz');
    var html = '';
    var c = CanvasUtils.getThemeColors();

    if (state.stepIdx === 0) {
      html = '<div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">';
      html += '<div style="padding:8px 12px;background:var(--accent-subtle);border-radius:8px">x₁=' + state.x1.toFixed(2) + '</div>';
      html += '<div style="padding:8px 12px;background:var(--accent-subtle);border-radius:8px">x₂=' + state.x2.toFixed(2) + '</div>';
      html += '<span>→ z = ' + state.w1.toFixed(2) + '×' + state.x1.toFixed(2) + ' + ' + state.w2.toFixed(2) + '×' + state.x2.toFixed(2) + ' + ' + state.b.toFixed(2) + ' = <b>' + snap.z.toFixed(3) + '</b></span>';
      html += '<span>→ σ(z) = <b>' + snap.pred.toFixed(3) + '</b></span>';
      html += '</div>';
    } else if (state.stepIdx === 1) {
      html = '<div>Target: ' + snap.target + ' | Prediksi: <b>' + snap.pred.toFixed(3) + '</b></div>';
      html += '<div style="margin-top:8px">Error = ' + snap.pred.toFixed(3) + ' − ' + snap.target + ' = <b>' + snap.err.toFixed(3) + '</b></div>';
      html += '<div style="margin-top:4px">Loss (MSE) = <b>' + (snap.err * snap.err).toFixed(4) + '</b></div>';
    } else if (state.stepIdx === 2) {
      html = '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">';
      html += '<div style="padding:8px;background:var(--warning-subtle);border-radius:8px;text-align:center">∂L/∂w₁ = <b>' + snap.dw1.toFixed(4) + '</b></div>';
      html += '<div style="padding:8px;background:var(--warning-subtle);border-radius:8px;text-align:center">∂L/∂w₂ = <b>' + snap.dw2.toFixed(4) + '</b></div>';
      html += '<div style="padding:8px;background:var(--warning-subtle);border-radius:8px;text-align:center">∂L/∂b = <b>' + snap.db.toFixed(4) + '</b></div>';
      html += '</div>';
      html += '<div class="tiny" style="margin-top:8px">Yang pegang bola lama (input besar) → tanggung jawab besar</div>';
    } else if (state.stepIdx === 3) {
      html = '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">';
      html += '<div style="padding:8px;background:var(--success-subtle);border-radius:8px;text-align:center">w₁: ' + state.w1.toFixed(3) + ' → <b>' + (state.w1 - state.lr * snap.dw1).toFixed(3) + '</b></div>';
      html += '<div style="padding:8px;background:var(--success-subtle);border-radius:8px;text-align:center">w₂: ' + state.w2.toFixed(3) + ' → <b>' + (state.w2 - state.lr * snap.dw2).toFixed(3) + '</b></div>';
      html += '<div style="padding:8px;background:var(--success-subtle);border-radius:8px;text-align:center">b: ' + state.b.toFixed(3) + ' → <b>' + (state.b - state.lr * snap.db).toFixed(3) + '</b></div>';
      html += '</div>';
    }
    viz.innerHTML = html;

    // Calc
    $('b06-calc').innerHTML = 'Langkah ' + (state.stepIdx + 1) + '/4 | w₁=' + state.w1.toFixed(3) + ' w₂=' + state.w2.toFixed(3) + ' b=' + state.b.toFixed(3) + '<br>Prediksi: ' + snap.pred.toFixed(3) + ' | Loss: ' + (snap.err * snap.err).toFixed(4);
  }

  function applyUpdate() {
    var snap = snapshot();
    state.w1 -= state.lr * snap.dw1;
    state.w2 -= state.lr * snap.dw2;
    state.b -= state.lr * snap.db;
  }

  $('b06-next').addEventListener('click', function() {
    if (state.stepIdx === 3) {
      applyUpdate();
      state.stepIdx = 0;
    } else {
      state.stepIdx++;
    }
    draw();
  });
  $('b06-prev').addEventListener('click', function() {
    state.stepIdx = (state.stepIdx + 3) % 4;
    draw();
  });
  $('b06-reset').addEventListener('click', function() {
    state.w1 = 0.5; state.w2 = 0.3; state.b = 0.1;
    state.stepIdx = 0;
    draw();
  });
  ['b06-x1', 'b06-x2', 'b06-lr'].forEach(function(id) {
    $(id).addEventListener('input', draw);
  });
  draw();
}
