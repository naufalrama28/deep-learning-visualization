# ARCHITECTURE.md — Arsitektur Teknis Neural Lab v3

## 1. Keputusan Arsitektur

### 100% Statis, Zero Dependencies
- Satu `index.html` + satu `style.css` + N file JS vanilla
- Tanpa React, Vue, D3, TensorFlow.js, Tailwind, atau CDN apapun
- Bisa dibuka via `file://` tanpa CORS issues
- Total target < 2MB

### SPA Hash Router
- Satu halaman, navigasi via `#bab1`, `#bab2`, dst.
- `app.js` show/hide `<section>` berdasarkan hash
- Lazy init: visualisasi hanya diinisialisasi saat bab pertama kali dibuka

### Rendering Strategy
| Tipe Visual | Teknologi | Alasan |
|-------------|-----------|--------|
| Grafik fungsi (loss, gradient, overfit) | Canvas 2D | Performa tinggi, pixel-level control |
| Decision boundary (neuron, playground) | Canvas 2D + ImageData | Grid evaluation, fast redraw |
| Diagram jaringan (MLP) | SVG inline | DOM manipulation, animasi mudah |
| Grid interaktif (CNN) | DOM divs | Click handling, CSS transitions |
| Attention heatmap | DOM grid | Dynamic sizing, easy coloring |
| Backprop steps | DOM + CSS | Step-by-step reveal, transitions |

### Shared Utilities (`js/lib/canvas-utils.js`)
Fungsi bersama yang dipakai semua visualisasi canvas:
- `getThemeColors()` — baca CSS variables, return object warna
- `drawAxes(ctx, opts)` — gambar sumbu X/Y dengan label
- `mapRange(value, inMin, inMax, outMin, outMax)` — linear mapping
- `drawGrid(ctx, bounds, step)` — gambar grid background
- `responsiveCanvas(canvas)` — setup HiDPI + resize handling

---

## 2. Alur Data Per Visualisasi

```
┌─────────────────────────────────────────────────────┐
│  User Interaction (slider/button/select)            │
│       │ event listener                              │
│       ▼                                             │
│  State Update (closure-scoped object)               │
│       │ recompute                                   │
│       ▼                                             │
│  Render (canvas.draw / svg update / DOM rebuild)    │
│       │                                             │
│       ▼                                             │
│  Info Display (calc text, labels, readouts)         │
└─────────────────────────────────────────────────────┘
```

Setiap modul memiliki:
- **State object** — semua parameter yang bisa diubah user
- **compute()** — fungsi matematika murni (state → results)
- **render()** — fungsi visual (results → pixels/DOM)
- **init()** — setup event listeners, first render

---

## 3. State Management

### Global State (app.js)
```javascript
AppState = {
  theme: 'light' | 'dark',
  progress: { bab1: true, bab2: false, ... },
  xp: { total: 0, quizzes: {} },
  speed: 1.0,
  currentRoute: 'beranda'
}
```

### Per-Module State (closure-scoped)
```javascript
function initVizBab01() {
  const state = { w1: 1, w2: 1, b: -1.2, x1: 0.7, x2: 0.6 };
  function compute() { /* ... */ }
  function render() { /* ... */ }
  // event listeners update state → compute → render
}
```

### Persistence (localStorage)
| Key | Content | Reset |
|-----|---------|-------|
| `neuralab-progress` | `{bab1: true, ...}` | Tombol Reset |
| `neuralab-xp` | `{total: 0, quizzes: {}}` | Tombol Reset |
| `neuralab-theme` | `"light"` atau `"dark"` | Tidak direset |
| `neuralab-speed` | `1.0` | Tidak direset |

---

## 4. Peta File → Konsep

| File | Bab | Konsep | Render |
|------|-----|--------|--------|
| `viz-bab01.js` | 1 | Neuron: weight, bias, decision boundary | Canvas: heatmap + line |
| `viz-bab02.js` | 2 | Aktivasi: step, sigmoid, tanh, ReLU | Canvas: kurva + titik |
| `viz-bab03.js` | 3 | MLP: forward pass, layer, flow | SVG: nodes + animated edges |
| `viz-bab04.js` | 4 | Loss: MSE, cross-entropy | Canvas: lembah + titik |
| `viz-bab05.js` | 5 | Gradient descent: LR, convergence | Canvas: lembah + bola + trail |
| `viz-bab06.js` | 6 | Backprop: 4 langkah, chain rule | DOM: step cards + viz |
| `viz-bab07.js` | 7 | Overfitting: polynomial fitting | Canvas: kurva + data points |
| `viz-bab08.js` | 8 | CNN: konvolusi, filter, pooling | DOM: clickable grid + heatmap |
| `viz-bab09.js` | 9 | RNN: hidden state, LSTM | Canvas: state graph + chips |
| `viz-bab10.js` | 10 | Attention: Q/K/V, softmax | DOM: heatmap grid |
| `viz-bab11.js` | 11 | Playground: full training | Canvas: boundary + loss chart |

---

## 5. Design System

### CSS Custom Properties
```css
:root {
  /* Colors - Light */
  --bg: #fafbfc;
  --bg-subtle: #f0f2f5;
  --card: #ffffff;
  --card-border: #e2e8f0;
  --text: #1a1a2e;
  --text-muted: #64748b;
  --accent: #2563eb;
  --accent-hover: #1d4ed8;
  --accent2: #059669;
  --danger: #dc2626;
  --warning: #d97706;

  /* Typography */
  --font-body: system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-mono: ui-monospace, 'Cascadia Code', 'Fira Code', monospace;
  --text-xs: clamp(0.7rem, 0.65rem + 0.25vw, 0.8rem);
  --text-sm: clamp(0.8rem, 0.75rem + 0.25vw, 0.9rem);
  --text-base: clamp(0.9rem, 0.85rem + 0.25vw, 1rem);
  --text-lg: clamp(1.1rem, 1rem + 0.5vw, 1.25rem);
  --text-xl: clamp(1.3rem, 1.1rem + 1vw, 1.75rem);
  --text-2xl: clamp(1.6rem, 1.3rem + 1.5vw, 2.25rem);

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* Shadow */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.05);

  /* Layout */
  --sidebar-w: 280px;
  --topbar-h: 56px;
  --content-max: 900px;
}

[data-theme="dark"] {
  --bg: #0d1117;
  --bg-subtle: #161b22;
  --card: #161b22;
  --card-border: #30363d;
  --text: #e6edf3;
  --text-muted: #8b949e;
  --accent: #58a6ff;
  --accent-hover: #79c0ff;
  --accent2: #3fb950;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.4);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.5);
}
```

### Data Visualization Palette
6 warna yang distinguishable dan colorblind-safe:
```css
--viz-1: #2563eb;  /* blue */
--viz-2: #dc2626;  /* red */
--viz-3: #059669;  /* green */
--viz-4: #d97706;  /* amber */
--viz-5: #7c3aed;  /* violet */
--viz-6: #db2777;  /* pink */
```

---

## 6. Performance Strategy

### Canvas Optimization
- HiDPI: `canvas.width = rect.width * devicePixelRatio`
- Reuse `ImageData` objects ketika memungkinkan
- Decision boundary: grid 50×50 (bukan pixel-by-pixel)
- `requestAnimationFrame` untuk animasi, bukan `setInterval`
- Throttle resize events

### DOM Optimization
- SVG elements dibuat sekali, diupdate (bukan recreate)
- Event delegation untuk grid cells
- CSS transitions untuk smooth updates (bukan JS animation)

### Loading Strategy
- Script tags di akhir `<body>`
- Lazy init: viz hanya diinit saat bab dibuka pertama kali
- No external resources (fonts, images, CDN)

---

## 7. Testing Strategy

### Manual Testing Checklist
- [ ] Buka via `file://` — semua modul bekerja
- [ ] Buka via `localhost:8000` — semua modul bekerja
- [ ] Dark mode: semua canvas redraw correctly
- [ ] Mobile (320px): sidebar collapse, controls stack
- [ ] Refresh: progress + XP preserved
- [ ] Reset: semua data cleared
- [ ] Setiap slider: response < 100ms
- [ ] Setiap bab: kuis bisa dijawab, XP bertambah
- [ ] Playground: 4 dataset konvergen

### Automated Audit (`tools/audit.py`)
- Struktur HTML: semua section + card types ada
- ID integrity: setiap getElementById punya matching HTML id
- Quiz integrity: semua bab punya quiz dengan answer + feedback
- Banned terms: tidak ada terjemahan aneh
