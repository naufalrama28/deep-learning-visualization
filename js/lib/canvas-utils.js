/**
 * canvas-utils.js — Shared canvas rendering utilities
 * Neural Lab v3
 */
var CanvasUtils = (function() {
  'use strict';

  /** Read CSS custom property with fallback */
  function cssVar(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback || '#888';
  }

  /** Get all theme colors as an object */
  function getThemeColors() {
    return {
      bg: cssVar('--card', '#ffffff'),
      bgSubtle: cssVar('--bg-subtle', '#f0f2f5'),
      text: cssVar('--text', '#111827'),
      textSec: cssVar('--text-secondary', '#4b5563'),
      textMuted: cssVar('--text-muted', '#9ca3af'),
      border: cssVar('--card-border', '#e2e6ed'),
      accent: cssVar('--accent', '#2563eb'),
      success: cssVar('--success', '#059669'),
      warning: cssVar('--warning', '#d97706'),
      danger: cssVar('--danger', '#dc2626'),
      viz1: cssVar('--viz-1', '#2563eb'),
      viz2: cssVar('--viz-2', '#dc2626'),
      viz3: cssVar('--viz-3', '#059669'),
      viz4: cssVar('--viz-4', '#d97706'),
      viz5: cssVar('--viz-5', '#7c3aed'),
      viz6: cssVar('--viz-6', '#db2777')
    };
  }

  /** Setup canvas for HiDPI displays. Returns {ctx, w, h} */
  function setupCanvas(canvas, w, h) {
    var dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { ctx: ctx, w: w, h: h, dpr: dpr };
  }

  /** Map value from one range to another */
  function mapRange(v, inMin, inMax, outMin, outMax) {
    return outMin + (v - inMin) / (inMax - inMin) * (outMax - outMin);
  }

  /** Clamp value between min and max */
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  /** Draw axes with labels */
  function drawAxes(ctx, opts) {
    var c = getThemeColors();
    var pad = opts.pad || { l: 45, r: 15, t: 15, b: 30 };
    var w = opts.w, h = opts.h;
    var plotW = w - pad.l - pad.r;
    var plotH = h - pad.t - pad.b;

    ctx.save();

    // Grid lines
    ctx.strokeStyle = c.border;
    ctx.lineWidth = 0.5;
    ctx.setLineDash([3, 3]);

    // Y grid
    var ySteps = opts.ySteps || 4;
    for (var i = 0; i <= ySteps; i++) {
      var y = pad.t + (plotH / ySteps) * i;
      ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(w - pad.r, y); ctx.stroke();
    }

    // X grid
    var xSteps = opts.xSteps || 4;
    for (var j = 0; j <= xSteps; j++) {
      var x = pad.l + (plotW / xSteps) * j;
      ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, h - pad.b); ctx.stroke();
    }

    ctx.setLineDash([]);

    // Axes lines
    ctx.strokeStyle = c.textMuted;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad.l, pad.t);
    ctx.lineTo(pad.l, h - pad.b);
    ctx.lineTo(w - pad.r, h - pad.b);
    ctx.stroke();

    // Labels
    ctx.fillStyle = c.textMuted;
    ctx.font = '11px ' + getComputedStyle(document.body).fontFamily;
    ctx.textAlign = 'center';

    // X labels
    if (opts.xLabels) {
      for (var xi = 0; xi <= xSteps; xi++) {
        var xp = pad.l + (plotW / xSteps) * xi;
        var label = opts.xLabels[xi] !== undefined ? opts.xLabels[xi] : '';
        ctx.fillText(label, xp, h - pad.b + 16);
      }
    }

    // Y labels
    if (opts.yLabels) {
      ctx.textAlign = 'right';
      for (var yi = 0; yi <= ySteps; yi++) {
        var yp = pad.t + (plotH / ySteps) * yi;
        var yl = opts.yLabels[yi] !== undefined ? opts.yLabels[yi] : '';
        ctx.fillText(yl, pad.l - 6, yp + 4);
      }
    }

    // Axis titles
    if (opts.xTitle) {
      ctx.textAlign = 'center';
      ctx.fillStyle = c.textSec;
      ctx.font = '12px ' + getComputedStyle(document.body).fontFamily;
      ctx.fillText(opts.xTitle, pad.l + plotW / 2, h - 2);
    }
    if (opts.yTitle) {
      ctx.save();
      ctx.translate(12, pad.t + plotH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.fillStyle = c.textSec;
      ctx.font = '12px ' + getComputedStyle(document.body).fontFamily;
      ctx.fillText(opts.yTitle, 0, 0);
      ctx.restore();
    }

    ctx.restore();

    return { pad: pad, plotW: plotW, plotH: plotH };
  }

  /** Draw a function curve on canvas */
  function drawCurve(ctx, fn, opts) {
    var c = opts.colors || getThemeColors();
    var pad = opts.pad;
    var plotW = opts.plotW;
    var plotH = opts.plotH;
    var xMin = opts.xMin, xMax = opts.xMax;
    var yMin = opts.yMin, yMax = opts.yMax;
    var steps = opts.steps || 200;
    var color = opts.color || c.accent;
    var lineWidth = opts.lineWidth || 2.5;

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = 'round';
    ctx.beginPath();

    var first = true;
    for (var i = 0; i <= steps; i++) {
      var x = xMin + (xMax - xMin) * i / steps;
      var y = fn(x);
      var px = pad.l + (x - xMin) / (xMax - xMin) * plotW;
      var py = pad.t + plotH - (y - yMin) / (yMax - yMin) * plotH;

      if (!isFinite(y) || py < pad.t - 50 || py > pad.t + plotH + 50) {
        first = true;
        continue;
      }

      if (first) { ctx.moveTo(px, py); first = false; }
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.restore();
  }

  /** Draw a point (circle) at data coordinates */
  function drawPoint(ctx, x, y, opts) {
    var pad = opts.pad;
    var plotW = opts.plotW;
    var plotH = opts.plotH;
    var px = pad.l + (x - opts.xMin) / (opts.xMax - opts.xMin) * plotW;
    var py = pad.t + plotH - (y - opts.yMin) / (opts.yMax - opts.yMin) * plotH;
    var r = opts.radius || 6;
    var color = opts.color || '#dc2626';

    ctx.save();
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    return { px: px, py: py };
  }

  /** Convert data coords to pixel coords */
  function toPixel(x, y, opts) {
    return {
      px: opts.pad.l + (x - opts.xMin) / (opts.xMax - opts.xMin) * opts.plotW,
      py: opts.pad.t + opts.plotH - (y - opts.yMin) / (opts.yMax - opts.yMin) * opts.plotH
    };
  }

  /** Convert pixel coords to data coords */
  function toData(px, py, opts) {
    return {
      x: opts.xMin + (px - opts.pad.l) / opts.plotW * (opts.xMax - opts.xMin),
      y: opts.yMin + (opts.pad.t + opts.plotH - py) / opts.plotH * (opts.yMax - opts.yMin)
    };
  }

  /** Clear canvas with theme background */
  function clear(ctx, w, h) {
    var c = getThemeColors();
    ctx.fillStyle = c.bg;
    ctx.fillRect(0, 0, w, h);
  }

  return {
    cssVar: cssVar,
    getThemeColors: getThemeColors,
    setupCanvas: setupCanvas,
    mapRange: mapRange,
    clamp: clamp,
    drawAxes: drawAxes,
    drawCurve: drawCurve,
    drawPoint: drawPoint,
    toPixel: toPixel,
    toData: toData,
    clear: clear
  };
})();
