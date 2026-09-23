# Neural Lab — Design System Documentation

## Filosofi Desain

**"Neural Canvas"** — Clean, modern, scientific feel dengan karakter unique.

**Inspirasi:**
- Linear.app (clean layout, attention to detail)
- Stripe.com (typography, spacing)
- Brilliant.org (pedagogical UX)
- Observable (data visualization)

**Prinsip:**
1. **Clarity over decoration** — Setiap elemen punya tujuan
2. **Progressive disclosure** — Yang penting dulu, detail di collapsible
3. **Consistent rhythm** — Spacing, sizing, warna mengikuti sistem
4. **Delight in interaction** — Hover states, transitions, feedback smooth
5. **Dark mode as first-class** — Bukan afterthought

---

## Color System

### Light Mode

**Surface:**
```css
--bg: #f8fafc;              /* Page background */
--bg-subtle: #f1f5f9;       /* Subtle sections */
--bg-elevated: #ffffff;     /* Cards, elevated surfaces */
--card: #ffffff;            /* Card background */
--card-border: #e2e8f0;     /* Card borders */
```

**Text:**
```css
--text: #0f172a;            /* Primary text */
--text-secondary: #475569;  /* Secondary text */
--text-muted: #94a3b8;      /* Muted text */
--text-inverse: #ffffff;    /* Text on accent */
```

**Accent:**
```css
--accent: #3b82f6;          /* Primary action */
--accent-hover: #2563eb;    /* Hover state */
--accent-subtle: #dbeafe;   /* Accent background */
--accent-text: #1e40af;     /* Accent text */
```

**Semantic:**
```css
--success: #10b981;         /* Success, correct */
--success-subtle: #d1fae5;
--warning: #f59e0b;         /* Warning, caution */
--warning-subtle: #fef3c7;
--danger: #ef4444;          /* Error, danger */
--danger-subtle: #fee2e2;
```

**Data Visualization:**
```css
--viz-1: #3b82f6;  /* Blue */
--viz-2: #ef4444;  /* Red */
--viz-3: #10b981;  /* Green */
--viz-4: #f59e0b;  /* Amber */
--viz-5: #8b5cf6;  /* Violet */
--viz-6: #ec4899;  /* Pink */
```

### Dark Mode

**Surface:**
```css
--bg: #0f172a;
--bg-subtle: #1e293b;
--bg-elevated: #334155;
--card: #1e293b;
--card-border: #334155;
```

**Text:**
```css
--text: #f1f5f9;
--text-secondary: #cbd5e1;
--text-muted: #64748b;
--text-inverse: #0f172a;
```

**Accent:**
```css
--accent: #60a5fa;
--accent-hover: #93c5fd;
--accent-subtle: #1e3a8a;
--accent-text: #93c5fd;
```

**Semantic:**
```css
--success: #34d399;
--success-subtle: #064e3b;
--warning: #fbbf24;
--warning-subtle: #78350f;
--danger: #f87171;
--danger-subtle: #7f1d1d;
```

**Data Visualization:**
```css
--viz-1: #60a5fa;
--viz-2: #f87171;
--viz-3: #34d399;
--viz-4: #fbbf24;
--viz-5: #a78bfa;
--viz-6: #f472b6;
```

---

## Typography

### Font Stack

```css
--font-body: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-mono: ui-monospace, 'Cascadia Code', 'Fira Code', 'JetBrains Mono', monospace;
```

**Rationale:**
- System fonts = fast load, native feel
- No web fonts = offline capable
- Monospace untuk code/numbers = consistent alignment

### Scale (Fluid dengan clamp)

```css
/* Display */
--text-3xl: clamp(2rem, 1.5rem + 2.5vw, 3rem);      /* 32-48px */

/* Headings */
--text-2xl: clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem); /* 24-36px */
--text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.75rem); /* 20-28px */
--text-lg: clamp(1.1rem, 1rem + 0.5vw, 1.35rem);     /* 17.6-21.6px */

/* Body */
--text-base: clamp(0.95rem, 0.9rem + 0.25vw, 1.05rem); /* 15.2-16.8px */
--text-sm: clamp(0.85rem, 0.8rem + 0.25vw, 0.95rem);   /* 13.6-15.2px */
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.85rem);   /* 12-13.6px */
```

**Rationale:**
- Fluid typography = smooth scaling
- No media queries needed
- Readable di semua ukuran layar

### Weights & Line Heights

```css
/* Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Line heights */
--leading-tight: 1.25;    /* Headings */
--leading-normal: 1.5;    /* Body */
--leading-relaxed: 1.75;  /* Long-form reading */
```

### Usage

```css
h1 { font-size: var(--text-3xl); font-weight: var(--font-bold); line-height: var(--leading-tight); }
h2 { font-size: var(--text-2xl); font-weight: var(--font-bold); line-height: var(--leading-tight); }
h3 { font-size: var(--text-xl); font-weight: var(--font-semibold); line-height: var(--leading-tight); }
h4 { font-size: var(--text-lg); font-weight: var(--font-semibold); line-height: var(--leading-tight); }
body { font-size: var(--text-base); font-weight: var(--font-normal); line-height: var(--leading-normal); }
small { font-size: var(--text-sm); }
code { font-family: var(--font-mono); font-size: 0.9em; }
```

---

## Spacing System

**Base unit: 4px (0.25rem)**

```css
--sp-1: 0.25rem;  /* 4px */
--sp-2: 0.5rem;   /* 8px */
--sp-3: 0.75rem;  /* 12px */
--sp-4: 1rem;     /* 16px */
--sp-5: 1.25rem;  /* 20px */
--sp-6: 1.5rem;   /* 24px */
--sp-8: 2rem;     /* 32px */
--sp-10: 2.5rem;  /* 40px */
--sp-12: 3rem;    /* 48px */
--sp-16: 4rem;    /* 64px */
```

**Usage:**
- `--sp-2` — Tight gaps (related items)
- `--sp-4` — Default gap (cards, sections)
- `--sp-6` — Card padding
- `--sp-8` — Section gaps
- `--sp-12` — Major sections

---

## Border Radius

```css
--r-sm: 6px;    /* Small elements (badges, tags) */
--r-md: 10px;   /* Medium elements (buttons, inputs) */
--r-lg: 16px;   /* Large elements (cards) */
--r-xl: 24px;   /* Extra large (hero sections) */
--r-full: 9999px; /* Pills, circles */
```

---

## Shadows

```css
/* Light mode */
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

/* Dark mode */
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.4);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.5);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.6);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.7);
```

---

## Layout

### Breakpoints

```css
/* Mobile first */
--bp-sm: 640px;   /* Small tablets */
--bp-md: 950px;   /* Tablets, small laptops */
--bp-lg: 1200px;  /* Laptops */
--bp-xl: 1400px;  /* Desktops */
```

### Grid System

**Container:**
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--sp-6);
}
```

**Content area:**
```css
.content {
  max-width: 900px;
  margin: 0 auto;
}
```

**Two-column layout (bab pages):**
```css
.cols {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: var(--sp-6);
}

@media (max-width: 950px) {
  .cols { grid-template-columns: 1fr; }
}
```

### Sidebar

```css
--sidebar-w: 280px;

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--sidebar-w);
  overflow-y: auto;
}

@media (max-width: 950px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  .sidebar.open {
    transform: translateX(0);
  }
}
```

---

## Components

### Card

```css
.card {
  background: var(--card);
  border: 1px solid var(--card-border);
  border-radius: var(--r-lg);
  padding: var(--sp-6);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: var(--shadow-md);
}
```

**Variants:**
```css
.card--story { border-left: 3px solid var(--viz-4); }
.card--challenge { border: 2px dashed var(--warning); }
.card--conclusion { background: linear-gradient(135deg, var(--accent-subtle), var(--card)); }
```

### Button

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-2);
  padding: 0.5rem 1.25rem;
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  border-radius: var(--r-md);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:active { transform: scale(0.98); }
```

**Variants:**
```css
.btn-primary {
  background: var(--accent);
  color: var(--text-inverse);
}
.btn-primary:hover { background: var(--accent-hover); }

.btn-secondary {
  background: var(--card);
  color: var(--text);
  border-color: var(--card-border);
}
.btn-secondary:hover { background: var(--bg-subtle); }

.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
}
.btn-ghost:hover { background: var(--bg-subtle); }
```

**Sizes:**
```css
.btn-sm { padding: 0.375rem 0.875rem; font-size: var(--text-xs); }
.btn-lg { padding: 0.75rem 1.75rem; font-size: var(--text-base); }
```

### Input (Range Slider)

```css
input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  background: var(--bg-subtle);
  border-radius: var(--r-full);
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  background: var(--accent);
  border: 2px solid var(--card);
  border-radius: 50%;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: transform 0.15s ease;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.15);
}
```

### Badge

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.625rem;
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  background: var(--success-subtle);
  color: var(--success);
  border-radius: var(--r-full);
}
```

### Tag

```css
.tag {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  font-size: var(--text-xs);
  background: var(--card);
  border: 1px solid var(--card-border);
  border-radius: var(--r-full);
  color: var(--text-secondary);
}
```

---

## Animation

### Principles

- **Purposeful** — Setiap animasi mengkomunikasikan sesuatu
- **Fast** — 150-300ms untuk UI, 300-500ms untuk visual
- **Eased** — `cubic-bezier(0.4, 0, 0.2, 1)` untuk enter
- **Respect** — Honor `prefers-reduced-motion`

### Patterns

```css
/* Page transition */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}

.page { animation: fadeIn 0.2s ease; }

/* Hover lift */
.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Button press */
.btn:active {
  transform: scale(0.98);
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Visualization Standards

### Canvas

**Setup:**
```javascript
// HiDPI support
const dpr = window.devicePixelRatio || 1;
canvas.width = width * dpr;
canvas.height = height * dpr;
canvas.style.width = width + 'px';
canvas.style.height = height + 'px';
ctx.scale(dpr, dpr);
```

**Theme-aware:**
```javascript
function draw() {
  const colors = getThemeColors();
  clear(ctx, width, height);
  // ... draw with colors
}

document.addEventListener('themechange', draw);
```

**Axes:**
- Thin lines (1px)
- Muted color (text-muted)
- Labeled with font-size 11px
- Grid: dashed, subtle

**Data:**
- High contrast (minimum 2px stroke)
- Distinguishable without color (use shape/label)
- Smooth curves (200+ points for bezier)

### Color Mapping

**Sequential (magnitude):**
```javascript
function colorScale(value, min, max) {
  const t = (value - min) / (max - min);
  return `rgba(59, 130, 246, ${0.1 + t * 0.9})`;
}
```

**Diverging (positive/negative):**
```javascript
function divergingScale(value) {
  if (value > 0) return `rgba(16, 185, 129, ${value})`;
  return `rgba(239, 68, 68, ${-value})`;
}
```

**Categorical (classes):**
- Use 6-color palette
- Test for colorblind safety
- Add labels/shapes for redundancy

---

## Accessibility

### Contrast Ratios

**WCAG AA:**
- Normal text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- UI components: 3:1 minimum

**Testing:**
- Use WebAIM Contrast Checker
- Test both light & dark modes
- Verify all text meets minimum

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

**Rationale:**
- `:focus-visible` = keyboard only
- Mouse clicks don't trigger
- Clear visual indicator

### Touch Targets

```css
/* Minimum 44x44px */
button, a, input[type="range"]::-webkit-slider-thumb {
  min-width: 44px;
  min-height: 44px;
}
```

---

## Responsive Design

### Mobile First

```css
/* Base styles (mobile) */
.sidebar { display: none; }

/* Tablet+ */
@media (min-width: 950px) {
  .sidebar { display: block; }
}
```

### Fluid Layout

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--sp-6);
}

@media (max-width: 640px) {
  .container { padding: 0 var(--sp-4); }
}
```

### Grid Adaptation

```css
.cols {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: var(--sp-6);
}

@media (max-width: 950px) {
  .cols {
    grid-template-columns: 1fr;
    gap: var(--sp-4);
  }
}
```

---

## Dark Mode

### Principles

1. **Not just invert** — Proper contrast, not harsh
2. **Elevated surfaces** — Lighter = higher
3. **Reduce saturation** — Colors less intense
4. **Test readability** — Both modes equally usable

### Implementation

```css
:root {
  --bg: #f8fafc;
  --text: #0f172a;
  /* ... light mode */
}

[data-theme="dark"] {
  --bg: #0f172a;
  --text: #f1f5f9;
  /* ... dark mode */
}
```

**Toggle:**
```javascript
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('neurallab-theme', theme);
  document.dispatchEvent(new CustomEvent('themechange'));
}
```

---

**Versi:** 1.0.0
**Status:** Complete
