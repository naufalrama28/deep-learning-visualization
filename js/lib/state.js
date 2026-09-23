/**
 * state.js — State management for Neural Lab
 * localStorage wrapper for progress, XP, theme
 */
var StateManager = (function() {
  'use strict';

  var KEYS = {
    progress: 'neurallab-progress',
    xp: 'neurallab-xp',
    theme: 'neurallab-theme',
    speed: 'neurallab-speed'
  };

  // Progress
  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(KEYS.progress)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveProgress(progress) {
    localStorage.setItem(KEYS.progress, JSON.stringify(progress));
  }

  // XP
  function loadXP() {
    try {
      return JSON.parse(localStorage.getItem(KEYS.xp)) || { total: 0, quizzes: {} };
    } catch (e) {
      return { total: 0, quizzes: {} };
    }
  }

  function saveXP(xp) {
    localStorage.setItem(KEYS.xp, JSON.stringify(xp));
  }

  // Theme
  function loadTheme() {
    return localStorage.getItem(KEYS.theme) || 'light';
  }

  function saveTheme(theme) {
    localStorage.setItem(KEYS.theme, theme);
  }

  // Speed
  function loadSpeed() {
    return parseFloat(localStorage.getItem(KEYS.speed)) || 1.0;
  }

  function saveSpeed(speed) {
    localStorage.setItem(KEYS.speed, speed.toString());
  }

  // Reset all
  function resetAll() {
    localStorage.removeItem(KEYS.progress);
    localStorage.removeItem(KEYS.xp);
    // Keep theme and speed preferences
  }

  // Public API
  return {
    loadProgress: loadProgress,
    saveProgress: saveProgress,
    loadXP: loadXP,
    saveXP: saveXP,
    loadTheme: loadTheme,
    saveTheme: saveTheme,
    loadSpeed: loadSpeed,
    saveSpeed: saveSpeed,
    resetAll: resetAll
  };
})();
