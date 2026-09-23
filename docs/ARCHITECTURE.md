# Neural Lab — Technical Architecture

## Filosofi Arsitektur

**Zero Dependencies, Maximum Quality**
- Pure HTML5 + CSS3 + Vanilla JavaScript
- Tidak ada React, Vue, Angular, D3, Tailwind, atau library apapun
- Tidak ada CDN — semua lokal, bisa offline
- Build step? Tidak perlu. Buka file langsung jalan.

**Performance First**
- Target: < 2MB total, < 2s load time
- Visual response: < 100ms
- Animasi: smooth 60fps dengan requestAnimationFrame
- Mobile-friendly: responsive 320px - 1920px

**Maintainability**
- Modular: setiap bab = 1 file viz terpisah
- Shared utilities: canvas helpers, math functions
- Clear separation: content vs logic vs presentation
- Well-documented: JSDoc comments, inline explanations

---

## Struktur File

```
neural-lab/
├── index.html              # Single page app, semua bab
├── css/
│   └── style.css           # Design system lengkap
├── js/
│   ├── lib/
│   │   ├── canvas.js       # Canvas utilities (HiDPI, axes, curves)
│   │   ├── math.js         # Math helpers (activation, loss, etc)
│   │   └── state.js        # State management (localStorage)
│   ├── app.js              # Router, XP, quiz engine, theme
│   ├── content.js          # Semua konten bab (text, quiz data)
│   ├── viz-bab01.js        # Visualisasi bab 1
│   ├── viz-bab02.js        # Visualisasi bab 2
│   ├── ...
│   └── viz-bab11.js        # Visualisasi bab 11
├── docs/
│   ├── PRD.md              # Product requirements
│   ├── ARCHITECTURE.md     # File ini
│   ├── STORY.md            # Narrative script
│   └── DESIGN.md           # Design system documentation
└── README.md
```

---

## Core Systems

### 1. Router System (app.js)

**Hash-based routing:**
```javascript
// URL: #bab1 → show section #sec-bab01
// URL: #bab2 → show section #sec-bab02
```

**Lazy initialization:**
- Visualisasi hanya di-init saat bab pertama kali dibuka
- Prevent memory leak & improve initial load
- Track initialized modules in `vizDone` object

**Navigation:**
- Sidebar dengan grouping (Dasar, Belajar, Indra, Praktik)
- Progress indicator per bab
- "Bab sebelumnya/berikutnya" buttons
- Mobile: hamburger menu + overlay

### 2. State Management (lib/state.js)

**localStorage keys:**
- `neurallab-progress` → `{bab01: true, bab02: false, ...}`
- `neurallab-xp` → `{total: 150, quizzes: {bab01: true, ...}}`
- `neurallab-theme` → `"light"` atau `"dark"`
- `neurallab-speed` → `1.0` (animasi multiplier)

**State object:**
```javascript
const AppState = {
  theme: 'light',
  progress: {},
  xp: { total: 0, quizzes: {} },
  speed: 1.0,
  currentRoute: 'beranda'
};
```

**Methods:**
- `loadProgress()` / `saveProgress()`
- `loadXP()` / `saveXP()` / `addXP(amount)`
- `applyTheme(theme)` → dispatch `themechange` event

### 3. XP & Gamification (app.js)

**XP sources:**
- +100 XP per bab selesai (tombol "Tandai selesai")
- +25 XP per kuis benar pertama kali

**Level system:**
```javascript
const LEVELS = [
  { name: 'Bibit', xp: 0 },
  { name: 'Tunas', xp: 150 },
  { name: 'Anak', xp: 400 },
  { name: 'Remaja', xp: 700 },
  { name: 'Dewasa', xp: 1100 },
  { name: 'Master', xp: 1500 }
];
```

**Avatar evolution:**
- SVG-based, procedural generation
- Different features per level (antenna, smile, star, cap, aura)
- Smooth transitions between levels

**Badge system:**
- 11 badges, 1 per bab
- Unlock when bab marked as complete
- Display in sidebar

### 4. Quiz Engine (app.js)

**Quiz structure:**
```javascript
const quiz = {
  q: "Pertanyaan?",
  opts: ["Opsi A", "Opsi B", "Opsi C", "Opsi D"],
  answer: 2,  // index jawaban benar
  fb: "Feedback edukatif..."
};
```

**Rendering:**
- Dynamically generate quiz UI from content.js
- Event delegation for option clicks
- Disable options after answer
- Highlight correct/wrong
- Show feedback message
- Award XP only on first correct attempt

**Answer randomization:**
- Answers stored in original order in content.js
- Display order randomized per session
- Prevents memorization of position

### 5. Theme System (app.js + CSS)

**CSS variables:**
```css
:root {
  --bg: #fafbfc;
  --card: #ffffff;
  --text: #1a1a2e;
  --accent: #2563eb;
  /* ... */
}

[data-theme="dark"] {
  --bg: #0d1117;
  --card: #161b22;
  --text: #e6edf3;
  --accent: #58a6ff;
  /* ... */
}
```

**Theme toggle:**
- Button in sidebar
- Save preference to localStorage
- Dispatch `themechange` event
- All canvas visualizations listen & redraw

**Canvas redraw:**
```javascript
document.addEventListener('themechange', () => {
  draw(); // re-render with new colors
});
```

---

## Visualization Architecture

### Pattern: Module per Bab

Setiap `viz-babXX.js` mengikuti pattern yang sama:

```javascript
function initVizBab01() {
  'use strict';
  
  // 1. Get canvas & setup
  const canvas = document.getElementById('b01-canvas');
  const ctx = canvas.getContext('2d');
  const { ctx, w, h } = CanvasUtils.setupCanvas(canvas, 460, 340);
  
  // 2. Module state (closure-scoped)
  const state = { w1: 1, w2: 1, b: -1.2, x1: 0.7, x2: 0.6 };
  
  // 3. Compute function (pure)
  function compute() {
    return state.w1 * state.x1 + state.w2 * state.x2 + state.b;
  }
  
  // 4. Render function
  function draw() {
    const colors = CanvasUtils.getThemeColors();
    CanvasUtils.clear(ctx, w, h);
    // ... draw visualization
  }
  
  // 5. Event listeners
  ['b01-w1', 'b01-w2', 'b01-b'].forEach(id => {
    document.getElementById(id).addEventListener('input', draw);
  });
  
  // 6. Theme listener
  document.addEventListener('themechange', draw);
  
  // 7. Initial render
  draw();
}
```

### Shared Utilities (lib/canvas.js)

**CanvasUtils object:**
```javascript
const CanvasUtils = {
  // Setup
  setupCanvas(canvas, w, h) → { ctx, w, h, dpr }
  getThemeColors() → { bg, text, accent, ... }
  clear(ctx, w, h)
  
  // Drawing
  drawAxes(ctx, opts) → { pad, plotW, plotH }
  drawCurve(ctx, fn, opts)
  drawPoint(ctx, x, y, opts)
  
  // Coordinate conversion
  toPixel(x, y, opts) → { px, py }
  toData(px, py, opts) → { x, y }
  
  // Math
  mapRange(value, inMin, inMax, outMin, outMax)
  clamp(v, min, max)
};
```

**Benefits:**
- Consistent look across all visualizations
- HiDPI support built-in
- Theme-aware rendering
- Reusable axis/curve drawing
- Less boilerplate per module

---

## Content Architecture (content.js)

**Structure:**
```javascript
// Module metadata
const MODULES = [
  { id: 'bab01', title: 'Satu Sel Otak', time: '10 mnt', ... },
  { id: 'bab02', title: 'Memberi Perasaan', time: '8 mnt', ... },
  // ...
];

// Quiz bank
const QUIZZES = {
  bab01: [
    { q: "...", opts: [...], answer: 0, fb: "..." },
    // ...
  ],
  bab02: [ /* ... */ ],
  // ...
};
```

**Separation of concerns:**
- Content (text, quiz) terpisah dari logic (app.js)
- Easy to edit content tanpa touch logic
- Easy to translate ke bahasa lain
- Easy to A/B test different explanations

---

## Performance Strategy

### Canvas Optimization

**HiDPI support:**
```javascript
function setupCanvas(canvas, w, h) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return { ctx, w, h, dpr };
}
```

**Animation:**
- Use `requestAnimationFrame` for smooth 60fps
- Throttle slider events if needed
- Respect `window.GLOBAL_SPEED` multiplier
- Honor `prefers-reduced-motion`

**Decision boundary (playground):**
- Grid resolution: 50x50 (bukan pixel-by-pixel)
- Reuse ImageData object
- Batch pixel updates
- Throttle redraw during training

### DOM Optimization

**SVG (MLP visualization):**
- Create elements once, update attributes
- Don't recreate DOM on every change
- Use CSS transitions for smooth updates

**Event delegation:**
- Quiz container: 1 listener, not N
- Grid cells (CNN): 1 listener on parent
- Reduce memory footprint

**Lazy initialization:**
- Only init viz when bab first opened
- Prevent unnecessary computation
- Track in `vizDone` object

---

## Accessibility Strategy

### Keyboard Navigation

**Tab order:**
- Logical: top to bottom, left to right
- All interactive elements focusable
- Visible focus ring (2px accent, offset 2px)

**Keyboard shortcuts:**
- Enter/Space: activate buttons
- Arrow keys: adjust sliders
- Escape: close mobile menu

### Screen Reader

**ARIA labels:**
```html
<canvas aria-label="Visualisasi decision boundary: garis pemisah antara daerah YA dan TIDAK"></canvas>
<button aria-label="Reset visualisasi ke nilai awal">↺ Reset</button>
```

**Live regions:**
```html
<div aria-live="polite" id="b01-calc">z = 1.0 × 0.7 + 1.0 × 0.6 + (-1.2) = 1.1</div>
```

**Semantic HTML:**
- `<nav>` untuk navigation
- `<main>` untuk main content
- `<section>` untuk setiap bab
- `<button>` untuk buttons (bukan div)

### Color & Contrast

**WCAG AA compliance:**
- Text: minimum 4.5:1 contrast ratio
- UI elements: minimum 3:1 contrast ratio
- Test with contrast checker tools

**Colorblind-safe palette:**
- 6-color palette tested for deuteranopia, protanopia, tritanopia
- Use shape/label in addition to color
- Avoid red-green only distinctions

**Dark mode:**
- Proper contrast in both modes
- Not just invert colors
- Test readability in both

---

## Testing Strategy

### Manual Testing Checklist

**Every bab:**
- [ ] Buka via `file://` — works
- [ ] Buka via `localhost` — works
- [ ] Dark mode — canvas redraws correctly
- [ ] Mobile (320px) — responsive, usable
- [ ] Refresh — progress preserved
- [ ] Reset — all data cleared
- [ ] Every slider — response < 100ms
- [ ] Quiz — can answer, XP awarded
- [ ] Keyboard — fully navigable

**Playground (bab 11):**
- [ ] 4 datasets konvergen
- [ ] Different hidden layers work
- [ ] Different activations work
- [ ] Different learning rates work
- [ ] Stop/resume works
- [ ] Loss chart updates

### Automated Checks

**Audit script (tools/audit.py):**
- Check all sections exist
- Check all IDs referenced in JS exist in HTML
- Check all quizzes have answer + feedback
- Check banned terms not present

**Linting:**
- No console errors
- No unused variables
- Consistent code style

---

## Deployment

**Static hosting:**
- GitHub Pages
- Netlify
- Vercel
- Any static host

**No build step:**
- Just upload files
- No npm install
- No webpack/vite/rollup

**Offline capable:**
- Works via `file://` protocol
- No external resources
- All assets inline or local

---

## Future Enhancements (Out of Scope v1)

**Nice to have:**
- Export PNG dari visualisasi
- Share progress via URL
- Multi-language support
- Text-to-speech narration
- Keyboard shortcuts guide
- Printable cheat sheets

**Advanced features:**
- WebGL for complex visualizations
- Web Workers for heavy computation
- Service Worker for offline caching
- PWA manifest for installability

---

**Versi:** 1.0.0
**Status:** Complete
