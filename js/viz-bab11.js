/**
 * viz-bab11.js — Training Playground: full neural network training
 */
function initVizBab11() {
  'use strict';
  var CU = CanvasUtils;
  var bCanvas = document.getElementById('b11-canvas');
  var lCanvas = document.getElementById('b11-loss');
  if (!bCanvas || !lCanvas) return;

  var BW = 460, BH = 460;
  var LW = 460, LH = 120;
  var bSetup = CU.setupCanvas(bCanvas, BW, BH);
  var lSetup = CU.setupCanvas(lCanvas, LW, LH);
  var bCtx = bSetup.ctx;
  var lCtx = lSetup.ctx;

  var GRID = 50; // decision boundary resolution
  var N = 180; // data points

  var state = {
    data: [], labels: [],
    W: [], B: [],
    layers: [2, 4, 0, 1],
    actName: 'tanh',
    lr: 0.5,
    noise: 0.1,
    dataset: 'circle',
    epoch: 0,
    lossHist: [],
    running: false,
    timer: null
  };

  function $(id) { return document.getElementById(id); }
  function rand(a, b) { return a + Math.random() * (b - a); }
  function randn() { var u = 0, v = 0; while(u === 0) u = Math.random(); while(v === 0) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }

  // Data generation
  function genData() {
    state.data = []; state.labels = [];
    var n = N;
    var noise = state.noise;
    if (state.dataset === 'circle') {
      for (var i = 0; i < n; i++) {
        var a = Math.random() * Math.PI * 2;
        var r = i < n / 2 ? 0.3 + randn() * noise : 0.7 + randn() * noise;
        state.data.push([Math.cos(a) * r, Math.sin(a) * r]);
        state.labels.push(i < n / 2 ? 0 : 1);
      }
    } else if (state.dataset === 'xor') {
      for (var i = 0; i < n; i++) {
        var x = rand(-1, 1), y = rand(-1, 1);
        x += randn() * noise * 0.3; y += randn() * noise * 0.3;
        state.data.push([x, y]);
        state.labels.push((x > 0) === (y > 0) ? 0 : 1);
      }
    } else if (state.dataset === 'spiral') {
      for (var i = 0; i < n; i++) {
        var cls = i < n / 2 ? 0 : 1;
        var t = (i % (n / 2)) / (n / 2) * 2 * Math.PI + cls * Math.PI;
        var r = t / (2 * Math.PI) * 0.8 + 0.1;
        state.data.push([r * Math.cos(t) + randn() * noise * 0.15, r * Math.sin(t) + randn() * noise * 0.15]);
        state.labels.push(cls);
      }
    } else { // gauss
      for (var i = 0; i < n; i++) {
        var cls = i < n / 2 ? 0 : 1;
        var cx = cls === 0 ? -0.4 : 0.4;
        var cy = cls === 0 ? -0.4 : 0.4;
        state.data.push([cx + randn() * (0.2 + noise * 0.3), cy + randn() * (0.2 + noise * 0.3)]);
        state.labels.push(cls);
      }
    }
  }

  // Network
  function initW() {
    var h1 = parseInt($('b11-h1').value);
    var h2 = parseInt($('b11-h2').value);
    state.actName = $('b11-act').value;
    state.lr = parseFloat($('b11-lr').value);
    state.layers = [2, h1, h2, 1];
    state.W = []; state.B = [];
    for (var l = 0; l < 3; l++) {
      var fanIn = state.layers[l], fanOut = state.layers[l + 1];
      if (fanOut === 0) continue;
      var scale = Math.sqrt(2 / Math.max(1, fanIn));
      var w = [];
      for (var i = 0; i < fanOut; i++) {
        w[i] = [];
        for (var j = 0; j < fanIn; j++) w[i][j] = rand(-1, 1) * scale;
      }
      state.W.push(w);
      state.B.push(new Array(fanOut).fill(0));
    }
    state.epoch = 0;
    state.lossHist = [];
  }

  function actF(x) {
    if (state.actName === 'relu') return Math.max(0, x);
    if (state.actName === 'sigmoid') return 1 / (1 + Math.exp(-x));
    return Math.tanh(x); // tanh default
  }
  function actD(x) {
    if (state.actName === 'relu') return x > 0 ? 1 : 0;
    if (state.actName === 'sigmoid') { var s = 1 / (1 + Math.exp(-x)); return s * (1 - s); }
    var t = Math.tanh(x); return 1 - t * t;
  }

  function forward(px, py) {
    var inp = [px, py];
    var cache = [inp];
    var zs = [];
    for (var l = 0; l < state.W.length; l++) {
      var z_arr = [], a_arr = [];
      for (var i = 0; i < state.W[l].length; i++) {
        var s = state.B[l][i];
        for (var j = 0; j < cache[l].length; j++) s += state.W[l][i][j] * cache[l][j];
        z_arr.push(s);
        a_arr.push(l === state.W.length - 1 ? 1 / (1 + Math.exp(-s)) : actF(s)); // sigmoid output
      }
      zs.push(z_arr);
      cache.push(a_arr);
    }
    return { cache: cache, zs: zs };
  }

  function trainStep() {
    var n = state.data.length;
    // Accumulate gradients
    var gW = state.W.map(function(w) { return w.map(function(r) { return r.map(function() { return 0; }); }); });
    var gB = state.B.map(function(b) { return b.map(function() { return 0; }); });
    var totalLoss = 0;
    var correct = 0;

    for (var d = 0; d < n; d++) {
      var result = forward(state.data[d][0], state.data[d][1]);
      var cache = result.cache, zs = result.zs;
      var pred = cache[cache.length - 1][0];
      var target = state.labels[d];
      var predC = Math.max(0.001, Math.min(0.999, pred));
      totalLoss += -(target * Math.log(predC) + (1 - target) * Math.log(1 - predC));
      if ((pred > 0.5 ? 1 : 0) === target) correct++;

      // Backprop
      // Output layer gradient (BCE + sigmoid)
      var delta = [pred - target];
      for (var l = state.W.length - 1; l >= 0; l--) {
        for (var i = 0; i < state.W[l].length; i++) {
          for (var j = 0; j < cache[l].length; j++) {
            gW[l][i][j] += delta[i] * cache[l][j];
          }
          gB[l][i] += delta[i];
        }
        if (l > 0) {
          var newDelta = [];
          for (var j = 0; j < cache[l].length; j++) {
            var s = 0;
            for (var i = 0; i < state.W[l].length; i++) {
              s += state.W[l][i][j] * delta[i];
            }
            newDelta.push(s * actD(zs[l - 1][j]));
          }
          delta = newDelta;
        }
      }
    }

    // Update weights
    for (var l = 0; l < state.W.length; l++) {
      for (var i = 0; i < state.W[l].length; i++) {
        for (var j = 0; j < state.W[l][i].length; j++) {
          state.W[l][i][j] -= state.lr * gW[l][i][j] / n;
        }
        state.B[l][i] -= state.lr * gB[l][i] / n;
      }
    }

    state.epoch++;
    state.lossHist.push(totalLoss / n);
    if (state.lossHist.length > 200) state.lossHist.shift();
    return { loss: totalLoss / n, acc: correct / n };
  }

  // Drawing
  function drawBoundary() {
    var c = CU.getThemeColors();
    CU.clear(bCtx, BW, BH);

    var imgData = bCtx.createImageData(BW, BH);
    var step = Math.ceil(BW / GRID);
    for (var gx = 0; gx < GRID; gx++) {
      for (var gy = 0; gy < GRID; gy++) {
        var px = (gx / GRID) * 2 - 1;
        var py = (gy / GRID) * 2 - 1;
        var result = forward(px, py);
        var pred = result.cache[result.cache.length - 1][0];
        var r, g, b;
        if (pred > 0.5) {
          var t = (pred - 0.5) * 2;
          r = Math.round(37 + (1 - t) * 200);
          g = Math.round(99 + (1 - t) * 100);
          b = Math.round(235);
        } else {
          var t2 = (0.5 - pred) * 2;
          r = Math.round(217 + (1 - t2) * 30);
          g = Math.round(119 + (1 - t2) * 80);
          b = Math.round(6 + (1 - t2) * 40);
        }
        // Fill pixels
        for (var dx = 0; dx < step && gx * step + dx < BW; dx++) {
          for (var dy = 0; dy < step && gy * step + dy < BH; dy++) {
            var idx = ((gy * step + dy) * BW + (gx * step + dx)) * 4;
            imgData.data[idx] = r;
            imgData.data[idx + 1] = g;
            imgData.data[idx + 2] = b;
            imgData.data[idx + 3] = 100;
          }
        }
      }
    }
    bCtx.putImageData(imgData, 0, 0);

    // Data points
    for (var i = 0; i < state.data.length; i++) {
      var sx = (state.data[i][0] + 1) / 2 * BW;
      var sy = (state.data[i][1] + 1) / 2 * BH;
      bCtx.beginPath();
      bCtx.arc(sx, sy, 3.5, 0, Math.PI * 2);
      bCtx.fillStyle = state.labels[i] === 1 ? c.viz1 : c.viz2;
      bCtx.fill();
      bCtx.strokeStyle = '#fff';
      bCtx.lineWidth = 1;
      bCtx.stroke();
    }

    // Border
    bCtx.strokeStyle = c.border;
    bCtx.lineWidth = 1;
    bCtx.strokeRect(0, 0, BW, BH);
  }

  function drawLoss() {
    var c = CU.getThemeColors();
    CU.clear(lCtx, LW, LH);
    if (state.lossHist.length < 2) return;

    var pad = { l: 40, r: 10, t: 10, b: 20 };
    var plotW = LW - pad.l - pad.r;
    var plotH = LH - pad.t - pad.b;

    var maxL = Math.max.apply(null, state.lossHist) * 1.1;
    var minL = 0;

    // Axes
    lCtx.strokeStyle = c.border;
    lCtx.lineWidth = 0.5;
    lCtx.beginPath();
    lCtx.moveTo(pad.l, pad.t);
    lCtx.lineTo(pad.l, LH - pad.b);
    lCtx.lineTo(LW - pad.r, LH - pad.b);
    lCtx.stroke();

    lCtx.fillStyle = c.textMuted;
    lCtx.font = '10px system-ui';
    lCtx.textAlign = 'right';
    lCtx.fillText(maxL.toFixed(2), pad.l - 4, pad.t + 10);
    lCtx.fillText('0', pad.l - 4, LH - pad.b + 4);
    lCtx.textAlign = 'center';
    lCtx.fillText('Loss', LW / 2, LH - 2);

    // Line
    lCtx.strokeStyle = c.viz2;
    lCtx.lineWidth = 2;
    lCtx.beginPath();
    for (var i = 0; i < state.lossHist.length; i++) {
      var px = pad.l + (i / (state.lossHist.length - 1)) * plotW;
      var py = pad.t + plotH - (state.lossHist[i] - minL) / (maxL - minL) * plotH;
      if (i === 0) lCtx.moveTo(px, py);
      else lCtx.lineTo(px, py);
    }
    lCtx.stroke();
  }

  function updateCalc(loss, acc) {
    $('b11-calc').innerHTML = 'Epoch ' + state.epoch +
      ' • Loss: <b>' + (loss !== undefined ? loss.toFixed(4) : '-') + '</b>' +
      ' • Akurasi: <b>' + (acc !== undefined ? (acc * 100).toFixed(1) + '%' : '-') + '</b>';
  }

  function trainLoop() {
    if (!state.running) return;
    var stepsPerTick = 10;
    var result;
    for (var i = 0; i < stepsPerTick; i++) {
      result = trainStep();
    }
    drawBoundary();
    drawLoss();
    updateCalc(result.loss, result.acc);
    var speed = window.GLOBAL_SPEED || 1;
    state.timer = setTimeout(trainLoop, 120 / speed);
  }

  // Events
  $('b11-train').addEventListener('click', function() {
    if (state.running) return;
    if (state.epoch === 0) initW();
    state.running = true;
    trainLoop();
  });
  $('b11-stop').addEventListener('click', function() {
    state.running = false;
    if (state.timer) clearTimeout(state.timer);
  });
  $('b11-step').addEventListener('click', function() {
    if (state.epoch === 0) initW();
    var result;
    for (var i = 0; i < 50; i++) result = trainStep();
    drawBoundary(); drawLoss();
    updateCalc(result.loss, result.acc);
  });
  $('b11-reset').addEventListener('click', function() {
    state.running = false;
    if (state.timer) clearTimeout(state.timer);
    initW();
    drawBoundary(); drawLoss();
    updateCalc();
  });
  $('b11-newdata').addEventListener('click', function() {
    state.running = false;
    if (state.timer) clearTimeout(state.timer);
    state.dataset = $('b11-data').value;
    genData();
    initW();
    drawBoundary(); drawLoss();
    updateCalc();
  });

  // Slider updates
  ['b11-h1', 'b11-h2'].forEach(function(id) {
    $(id).addEventListener('input', function() {
      $(id + '-v').textContent = this.value;
    });
  });
  $('b11-lr').addEventListener('input', function() {
    $('b11-lr-v').textContent = parseFloat(this.value).toFixed(2);
    state.lr = parseFloat(this.value);
  });
  $('b11-noise').addEventListener('input', function() {
    $('b11-noise-v').textContent = parseFloat(this.value).toFixed(2);
    state.noise = parseFloat(this.value);
  });
  $('b11-data').addEventListener('change', function() {
    state.dataset = this.value;
  });
  $('b11-act').addEventListener('change', function() {
    state.actName = this.value;
  });

  document.addEventListener('themechange', function() { drawBoundary(); drawLoss(); });

  // Init
  state.dataset = $('b11-data').value;
  genData();
  initW();
  drawBoundary();
  drawLoss();
  updateCalc();
}
