/**
 * canvas.js — Canvas utilities for Neural Lab
 * Shared helpers for all visualizations
 */
var CanvasUtils = (function() {
  'use strict';

  /**
   * Read CSS custom property with fallback
   */
  function cssVar(name, fallback) {
    var value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return value || fallback || '#888';
  }

  /**
   * Get all theme colors as object
   */
  function getThemeColors() {
    return {
      bg: cssVar('--card', '#ffffff'),
      bgSubtle: cssVar('--bg-subtle', '#f1f5f9'),
      text: cssVar('--text', '#0f172a'),
      textSec: cssVar('--text-secondary', '#475569'),
      textMuted: cssVar('--text-muted', '#94a3b8'),
      border: cssVar('--card-border', '#e2e8f0'),
      accent: cssVar('--accent', '#3b82f6'),
      success: cssVar('--success', '#10b981'),
      warning: cssVar('--warning', '#f59e0b'),
      danger: cssVar('--danger', '#ef4444'),
      viz1: cssVar('--viz-1', '#3b82f6'),
      viz2: cssVar('--viz-2', '#ef4444'),
      viz3: cssVar('--viz-3', '#10b981'),
      viz4: cssVar('--viz-4', '#f59e0b'),
      viz5: cssVar('--viz-5', '#8b5cf6'),
      viz6: cssVar('--viz-6', '#ec4899')
    };
  }

  /**
   * Setup canvas for HiDPI displays
   * Returns {ctx, w, h, dpr}
   */
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

  /**
   * Map value from one range to another
   */
  function mapRange(value, inMin, inMax, outMin, outMax) {
    return outMin + (value - inMin) / (inMax - inMin) * (outMax - outMin);
  }

  /**
   * Clamp value between min and max
   */
  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  /**
   * Clear canvas with theme background
   */
  function clear(ctx, w, h) {
    var colors = getThemeColors();
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, w, h);
  }

  /**
   * Draw axes with labels
   * Returns {pad, plotW, plotH}
   */
  function drawAxes(ctx, opts) {
    var colors = getThemeColors();
    var pad = opts.pad || { l: 45, r: 15, t: 15, b: 30 };
    var w = opts.w, h = opts.h;
    var plotW = w - pad.l - pad.r;
    var plotH = h - pad.t - pad.b;

    ctx.save();

    // Grid lines
    ctx.strokeStyle = colors.border;
    ctx.lineWidth = 0.5;
    ctx.setLineDash([3, 3]);

    var ySteps = opts.ySteps || 4;
    for (var i = 0; i <= ySteps; i++) {
      var y = pad.t + (plotH / ySteps) * i;
      ctx.beginPath();
      ctx.moveTo(pad.l, y);
      ctx.lineTo(w - pad.r, y);
      ctx.stroke();
    }

    var xSteps = opts.xSteps || 4;
    for (var j = 0; j <= xSteps; j++) {
      var x = pad.l + (plotW / xSteps) * j;
      ctx.beginPath();
      ctx.moveTo(x, pad.t);
      ctx.lineTo(x, h - pad.b);
      ctx.stroke();
    }

    ctx.setLineDash([]);

    // Axes lines
    ctx.strokeStyle = colors.textMuted;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad.l, pad.t);
    ctx.lineTo(pad.l, h - pad.b);
    ctx.lineTo(w - pad.r, h - pad.b);
    ctx.stroke();

    // Labels
    ctx.fillStyle = colors.textMuted;
    ctx.font = '11px system-ui';
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
      ctx.fillStyle = colors.textSec;
      ctx.font = '12px system-ui';
      ctx.fillText(opts.xTitle, pad.l + plotW / 2, h - 2);
    }
    if (opts.yTitle) {
      ctx.save();
      ctx.translate(12, pad.t + plotH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.fillStyle = colors.textSec;
      ctx.font = '12px system-ui';
      ctx.fillText(opts.yTitle, 0, 0);
      ctx.restore();
    }

    ctx.restore();

    return { pad: pad, plotW: plotW, plotH: plotH };
  }

  /**
   * Draw a function curve
   */
  function drawCurve(ctx, fn, opts) {
    var colors = opts.colors || getThemeColors();
    var pad = opts.pad;
    var plotW = opts.plotW;
    var plotH = opts.plotH;
    var xMin = opts.xMin, xMax = opts.xMax;
    var yMin = opts.yMin, yMax = opts.yMax;
    var steps = opts.steps || 200;
    var color = opts.color || colors.accent;
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

      if (first) {
        ctx.moveTo(px, py);
        first = false;
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();
    ctx.restore();
  }

  /**
   * Draw a point at data coordinates
   */
  function drawPoint(ctx, x, y, opts) {
    var pad = opts.pad;
    var plotW = opts.plotW;
    var plotH = opts.plotH;
    var px = pad.l + (x - opts.xMin) / (opts.xMax - opts.xMin) * plotW;
    var py = pad.t + plotH - (y - opts.yMin) / (opts.yMax - opts.yMin) * plotH;
    var r = opts.radius || 6;
    var color = opts.color || '#ef4444';

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

  /**
   * Convert data coordinates to pixel coordinates
   */
  function toPixel(x, y, opts) {
    return {
      px: opts.pad.l + (x - opts.xMin) / (opts.xMax - opts.xMin) * opts.plotW,
      py: opts.pad.t + opts.plotH - (y - opts.yMin) / (opts.yMax - opts.yMin) * opts.plotH
    };
  }

  /**
   * Convert pixel coordinates to data coordinates
   */
  function toData(px, py, opts) {
    return {
      x: opts.xMin + (px - opts.pad.l) / opts.plotW * (opts.xMax - opts.xMin),
      y: opts.yMin + (opts.pad.t + opts.plotH - py) / opts.plotH * (opts.yMax - opts.yMin)
    };
  }

  // Public API
  return {
    cssVar: cssVar,
    getThemeColors: getThemeColors,
    setupCanvas: setupCanvas,
    mapRange: mapRange,
    clamp: clamp,
    clear: clear,
    drawAxes: drawAxes,
    drawCurve: drawCurve,
    drawPoint: drawPoint,
    toPixel: toPixel,
    toData: toData
  };
})();
