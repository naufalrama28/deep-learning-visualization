# DESIGN_SYSTEM.md — Neural Lab Visual Language

## Filosofi Desain

**"Neural Canvas"** — Clean, modern, scientific. Bukan purple-gradient AI slop.

Inspirasi: Linear.app (clean layout), Stripe (typography), Brilliant.org (pedagogical UX), Observable (data viz).

### Prinsip
1. **Clarity over decoration** — Setiap elemen punya tujuan. Tidak ada hiasan tanpa fungsi.
2. **Progressive disclosure** — Tampilkan yang penting dulu, detail di collapsible.
3. **Consistent rhythm** — Spacing, sizing, dan warna mengikuti sistem yang ketat.
4. **Delight in interaction** — Hover states, transitions, dan feedback yang smooth.
5. **Dark mode as first-class** — Bukan afterthought. Setiap warna diuji di kedua mode.

---

## Color System

### Light Mode
```
Background:    #fafbfc  (page)
               #f0f2f5  (subtle sections)
               #ffffff  (cards)
Border:        #e2e8f0  (card borders, dividers)
               #cbd5e1  (input borders)
Text:          #1a1a2e  (primary)
               #64748b  (secondary/muted)
               #94a3b8  (tertiary/disabled)

Accent:        #2563eb  (primary action, links)
               #1d4ed8  (hover)
               #dbeafe  (accent background)
Accent2:       #059669  (success, secondary action)
               #d1fae5  (success background)
Danger:        #dc2626  (error, negative)
               #fee2e2  (danger background)
Warning:       #d97706  (caution)
               #fef3c7  (warning background)
```

### Dark Mode
```
Background:    #0d1117  (page)
               #161b22  (subtle sections, cards)
               #21262d  (elevated cards)
Border:        #30363d  (card borders)
               #484f58  (input borders)
Text:          #e6edf3  (primary)
               #8b949e  (secondary/muted)
               #6e7681  (tertiary/disabled)

Accent:        #58a6ff  (primary action, links)
               #79c0ff  (hover)
               #1c3d5a  (accent background)
Accent2:       #3fb950  (success, secondary action)
               #1a3a2a  (success background)
Danger:        #f85149  (error, negative)
               #3d1a1a  (danger background)
Warning:       #d29922  (caution)
               #3d2e1a  (warning background)
```

### Data Visualization Palette
Colorblind-safe, distinguishable di kedua mode:
```
--viz-blue:    #2563eb / #58a6ff
--viz-red:     #dc2626 / #f85149
--viz-green:   #059669 / #3fb950
--viz-amber:   #d97706 / #d29922
--viz-violet:  #7c3aed / #a78bfa
--viz-pink:    #db2777 / #f472b6
```

---

## Typography

### Font Stack
```css
--font-body: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
--font-mono: ui-monospace, 'Cascadia Code', 'Fira Code', 'JetBrains Mono', monospace;
```

### Scale (fluid dengan clamp)
```
2xl:   clamp(1.6rem, 1.3rem + 1.5vw, 2.25rem)   — Page titles
xl:    clamp(1.3rem, 1.1rem + 1vw, 1.75rem)      — Section titles
lg:    clamp(1.1rem, 1rem + 0.5vw, 1.25rem)      — Card titles
base:  clamp(0.9rem, 0.85rem + 0.25vw, 1rem)     — Body text
sm:    clamp(0.8rem, 0.75rem + 0.25vw, 0.9rem)   — Captions, labels
xs:    clamp(0.7rem, 0.65rem + 0.25vw, 0.8rem)   — Fine print, badges
```

### Rules
- Body: 400 weight, line-height 1.6
- Headings: 700 weight, line-height 1.2, tight letter-spacing
- Labels: 500 weight, uppercase tracking untuk section headers
- Code/numbers: monospace font, tabular-nums
- Links: accent color, underline on hover only

---

## Spacing System

```
xs:   0.25rem (4px)   — tight gaps
sm:   0.5rem  (8px)   — related items
md:   1rem    (16px)  — default gap
lg:   1.5rem  (24px)  — card padding
xl:   2rem    (32px)  — section gaps
2xl:  3rem    (48px)  — major sections
```

---

## Component Patterns

### Card
```css
.card {
  background: var(--card);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
}
```

Varian:
- `.card--interactive` — hover lift, cursor pointer
- `.card--accent` — left border accent color
- `.card--story` — background subtle, italic border
- `.card--challenge` — dashed border, warning accent
- `.card--result` — success accent

### Button
```
Primary:    bg accent, text white, rounded-lg
Secondary:  bg transparent, border accent, text accent
Ghost:      bg transparent, text muted, hover bg subtle
Danger:     bg danger, text white
```

Sizes: sm (28px), md (36px), lg (44px — touch target minimum)

### Slider (Range Input)
```
Track: 4px height, rounded, bg border
Thumb: 18px circle, bg accent, shadow
Active: thumb scales 1.2, track fills with accent
```

### Badge
```
Inline:   px-2 py-0.5, rounded-full, text-xs, bg subtle
Status:   px-2 py-0.5, rounded-full, text-xs, bg success/danger
```

---

## Layout

### Desktop (>950px)
```
┌──────────┬──────────────────────────────────┐
│ Sidebar  │ Topbar                           │
│ (280px)  ├──────────────────────────────────┤
│ fixed    │                                  │
│          │ Content                          │
│ - Brand  │ (max-width: 900px, centered)     │
│ - Nav    │                                  │
│ - XP     │                                  │
│ - Theme  │                                  │
└──────────┴──────────────────────────────────┘
```

### Tablet (640-950px)
```
┌──────────────────────────────────────────────┐
│ ☰ Topbar                                     │
├──────────────────────────────────────────────┤
│                                              │
│ Content (full width, padding)                │
│                                              │
└──────────────────────────────────────────────┘
Sidebar: overlay on hamburger click
```

### Mobile (<640px)
```
┌──────────────────────┐
│ ☰ Topbar             │
├──────────────────────┤
│                      │
│ Content              │
│ (stacked cards)      │
│                      │
└──────────────────────┘
```

---

## Animation

### Principles
- Purposeful: setiap animasi mengkomunikasikan sesuatu
- Fast: 150-300ms untuk UI, 300-500ms untuk visual
- Eased: `cubic-bezier(0.4, 0, 0.2, 1)` untuk enter, `cubic-bezier(0.4, 0, 1, 1)` untuk exit
- Respect: `prefers-reduced-motion: reduce` → disable non-essential animation

### Patterns
- Card enter: opacity 0→1, translateY 8px→0, 200ms
- Hover lift: translateY -2px, shadow increase, 150ms
- Page transition: opacity fade, 150ms
- Slider feedback: value text updates instantly, visual follows

---

## Visualization Standards

### Canvas
- HiDPI aware (devicePixelRatio)
- Theme-aware (redraw on themechange)
- Axes: thin lines, muted color, labeled
- Data: high contrast, minimum 2px stroke
- Grid: subtle, dashed, optional

### Color Mapping
- Sequential: light→dark single hue (untuk magnitude)
- Diverging: red←neutral→blue (untuk positive/negative)
- Categorical: 6-color palette (untuk classes)

### Interaction
- Hover: show value, highlight element
- Click: toggle/select, immediate feedback
- Drag: continuous update, throttled to 60fps

---

## Accessibility

### Color Contrast
- Text: minimum 4.5:1 (AA), target 7:1 (AAA)
- UI elements: minimum 3:1
- Data viz: distinguishable without color (use shape/label too)

### Keyboard
- All interactive elements: tabbable
- Focus ring: 2px accent, offset 2px
- Logical tab order: top to bottom, left to right

### Screen Reader
- Canvas: aria-label describing current state
- Controls: labeled with `<label>` or `aria-label`
- Dynamic content: `aria-live="polite"` for updates
