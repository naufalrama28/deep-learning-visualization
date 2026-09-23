/**
 * viz-bab09.js — RNN: hidden state evolution
 */
function initVizBab09() {
  'use strict';
  var CU = CanvasUtils;
  var canvas = document.getElementById('b09-canvas');
  if (!canvas) return;
  var W = 460, H = 180;
  var setup = CU.setupCanvas(canvas, W, H);
  var ctx = setup.ctx;

  var state = { seq: [], h: 0, idx: 0, hist: [], running: false, timer: null };

  function $(id) { return document.getElementById(id); }

  function parseSeq() {
    var raw = $('b09-seq').value;
    return raw.split(',').map(function(s) { return parseFloat(s.trim()) || 0; });
  }

  function reset() {
    stop();
    state.seq = parseSeq();
    state.h = 0;
    state.idx = 0;
    state.hist = [0];
    draw();
  }

  function stop() {
    state.running = false;
    if (state.timer) { clearInterval(state.timer); state.timer = null; }
  }

  function stepOnce() {
    if (state.idx >= state.seq.length) return;
    var W_val = parseFloat($('b09-w').value);
    var x = state.seq[state.idx] / 10; // scale down
    state.h = Math.tanh(W_val * state.h + 0.9 * x);
    state.idx++;
    state.hist.push(state.h);
    draw();
  }

  function play() {
    if (state.running) { stop(); return; }
    if (state.idx >= state.seq.length) reset();
    state.running = true;
    var speed = window.GLOBAL_SPEED || 1;
    state.timer = setInterval(function() {
      if (state.idx >= state.seq.length) { stop(); return; }
      stepOnce();
    }, 600 / speed);
  }

  function draw() {
    var W_val = parseFloat($('b09-w').value);
    $('b09-w-v').textContent = W_val.toFixed(2);

    var c = CU.getThemeColors();
    CU.clear(ctx, W, H);

    var pad = { l: 40, r: 15, t: 15, b: 25 };
    var plotW = W - pad.l - pad.r;
    var plotH = H - pad.t - pad.b;

    // Axes
    ctx.strokeStyle = c.border;
    ctx.lineWidth = 0.5;
    ctx.setLineDash([3, 3]);
    // Zero line
    var zeroY = pad.t + plotH / 2;
    ctx.beginPath(); ctx.moveTo(pad.l, zeroY); ctx.lineTo(W - pad.r, zeroY); ctx.stroke();
    ctx.setLineDash([]);

    // Y labels
    ctx.fillStyle = c.textMuted;
    ctx.font = '10px system-ui';
    ctx.textAlign = 'right';
    ctx.fillText('+1', pad.l - 4, pad.t + 4);
    ctx.fillText('0', pad.l - 4, zeroY + 4);
    ctx.fillText('-1', pad.l - 4, H - pad.b + 4);

    // Plot hidden state history
    if (state.hist.length > 1) {
      ctx.strokeStyle = c.accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var i = 0; i < state.hist.length; i++) {
        var px = pad.l + (i / Math.max(state.seq.length, state.hist.length - 1)) * plotW;
        var py = pad.t + plotH / 2 - state.hist[i] * (plotH / 2);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Points
      for (var j = 0; j < state.hist.length; j++) {
        var px2 = pad.l + (j / Math.max(state.seq.length, state.hist.length - 1)) * plotW;
        var py2 = pad.t + plotH / 2 - state.hist[j] * (plotH / 2);
        ctx.beginPath();
        ctx.arc(px2, py2, 4, 0, Math.PI * 2);
        ctx.fillStyle = j === state.hist.length - 1 ? c.viz2 : c.accent;
        ctx.fill();
      }
    }

    // Track chips
    var track = $('b09-track');
    var html = '';
    for (var k = 0; k < state.seq.length; k++) {
      var active = k < state.idx;
      html += '<div class="track-chip" style="' + (active ? '' : 'opacity:0.4') + '">t=' + k + ': ' + state.seq[k] + '</div>';
    }
    track.innerHTML = html;

    // Calc
    $('b09-calc').innerHTML = 'Langkah: ' + state.idx + '/' + state.seq.length +
      ' | Hidden state: <b>' + state.h.toFixed(3) + '</b>' +
      (W_val < 0.1 ? '<br><span style="color:var(--warning)">⚠️ Daya ingat ≈ 0 → amnesia! Catatan tidak menyimpan apapun.</span>' : '') +
      (state.idx >= state.seq.length && state.seq.length > 0 ? '<br><span class="tiny">Urutan selesai. Klik Reset untuk ulang.</span>' : '');
  }

  $('b09-play').addEventListener('click', play);
  $('b09-step').addEventListener('click', stepOnce);
  $('b09-reset').addEventListener('click', reset);
  $('b09-w').addEventListener('input', function() { reset(); });
  $('b09-seq').addEventListener('change', reset);
  document.addEventListener('themechange', draw);
  reset();
}
