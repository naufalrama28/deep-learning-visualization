/**
 * math.js — Math helpers for Neural Lab
 * Activation functions, loss functions, etc.
 */
var MathUtils = (function() {
  'use strict';

  // Activation functions
  function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }

  function sigmoidDerivative(x) {
    var s = sigmoid(x);
    return s * (1 - s);
  }

  function tanh(x) {
    return Math.tanh(x);
  }

  function tanhDerivative(x) {
    var t = Math.tanh(x);
    return 1 - t * t;
  }

  function relu(x) {
    return Math.max(0, x);
  }

  function reluDerivative(x) {
    return x > 0 ? 1 : 0;
  }

  function step(x) {
    return x > 0 ? 1 : 0;
  }

  // Loss functions
  function mse(target, prediction) {
    var diff = target - prediction;
    return diff * diff;
  }

  function crossEntropy(target, prediction) {
    prediction = Math.max(0.001, Math.min(0.999, prediction));
    return -(target * Math.log(prediction) + (1 - target) * Math.log(1 - prediction));
  }

  // Utility functions
  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function randn() {
    var u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  function softmax(arr) {
    var max = -Infinity;
    for (var i = 0; i < arr.length; i++) {
      max = Math.max(max, arr[i]);
    }
    var exps = arr.map(function(v) { return Math.exp(v - max); });
    var sum = exps.reduce(function(a, b) { return a + b; }, 0);
    return exps.map(function(v) { return v / sum; });
  }

  function dot(a, b) {
    var sum = 0;
    for (var i = 0; i < a.length; i++) {
      sum += a[i] * b[i];
    }
    return sum;
  }

  // Public API
  return {
    sigmoid: sigmoid,
    sigmoidDerivative: sigmoidDerivative,
    tanh: tanh,
    tanhDerivative: tanhDerivative,
    relu: relu,
    reluDerivative: reluDerivative,
    step: step,
    mse: mse,
    crossEntropy: crossEntropy,
    rand: rand,
    randn: randn,
    softmax: softmax,
    dot: dot
  };
})();
