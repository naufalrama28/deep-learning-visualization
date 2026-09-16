# ARCHITECTURE.md — Arsitektur Teknis

## 1. Keputusan Besar
- **Statis 100%**: 1 file HTML + 1 CSS + N file JS biasa (non-module) agar bisa dibuka via `file://` tanpa CORS.
- **Tanpa dependensi**: tidak pakai React, D3, TensorFlow.js, Tailwind. Alasan: offline, ringan, mudah dibaca pemula.
- **SPA hash-router**: satu `index.html`, navigasi via `#neuron`, `#cnn`, dst. `app.js` show/hide `<section>`.
- **Canvas + SVG hybrid**: grafik garis & decision boundary → Canvas (cepat). Diagram jaringan → SVG/DOM (mudah animasi).

## 2. Alur Data Umum Tiap Visualisasi
```
[ Kontrol DOM: slider/button/select ]
        │ event input
        ▼
[ State JS: {w, b, lr, ...} ]
        │ hitung (forward/loss/grad)
        ▼
[ Render: canvas.draw / svg update + angka teks ]
```

Semua state disimpan lokal per modul, tidak ada state global kecuali `AppState {theme, progress, fontScale}`.

## 3. Peta File → Konsep
| File | Konsep yang divisualkan | Teknik render |
|---|---|---|
| viz-neuron.js | `y = aktivasi(w1x1+w2x2+b)` | SVG neuron + meter output |
| viz-activation.js | sigmoid/tanh/ReLU/softmax | Canvas grafik + titik geser |
| viz-mlp.js | forward pass 2-3-2-1 | SVG nodes + animasi aliran (stroke-dashoffset) |
| viz-loss.js | MSE & Cross-Entropy | Canvas kurva parabola + titik tebakan |
| viz-gradient.js | `w -= lr * grad` | Canvas lembah + bola + jejak |
| viz-backprop.js | chain rule langkah 1-4 | Tabel angka + panah mundur |
| viz-overfit.js | polinomial degree 1/3/9 | Canvas titik data + kurva fit |
| viz-cnn.js | konvolusi 3x3, ReLU, maxpool | Grid DOM (div) + heatmap warna |
| viz-rnn.js | hidden state `h_t = tanh(W h + U x)` | Timeline langkah + bar memori |
| viz-attention.js | `softmax(QK^T/√d)` | Matriks heatmap + kalimat |
| viz-playground.js | MLP 2D + SGD mini-batch | Canvas decision boundary (resolusi 40x40) + scatter |

## 4. Playground (modul tersulit) — Desain
- Dataset dibangkitkan prosedural (seed tetap agar reproducible): lingkaran, XOR, spiral, gaussian.
- Model: MLP `2 → h1 → h2 → 1` (h configurable 0-8 neuron), aktivasi tanh/ReLU/sigmoid, output sigmoid.
- Training: SGD manual, forward + backward penuh di JS, batch = seluruh data (sederhana, cepat untuk <400 titik).
- Render boundary: evaluasi grid 40×40 tiap 10 epoch (throttle) agar tidak lag.
- Kontrol: learning rate (0.001–1), epoch per klik, tombol Latih/Step/Reset, tambah noise.

## 5. Tema & Gaya
CSS variables:
```css
:root { --bg:#f6f7fb; --card:#fff; --text:#1a2233; --accent:#4f46e5; }
[data-theme="dark"] { --bg:#0f172a; --card:#1e293b; --text:#e2e8f0; }
```
Canvas membaca `getComputedStyle` saat init + saat tema berubah (event `themechange`).

## 6. Penyimpanan Lokal
`localStorage["dlviz-progress"] = {neuron:true, aktivasi:false, ...}`
`localStorage["dlviz-theme"] = "dark"|"light"`

## 7. Batasan & Utang Teknis yang Disadari
- Decision boundary resolusi rendah (demi performa) — cukup untuk intuisi.
- Tidak ada auto-test; verifikasi manual via checklist AGENTS.md.
- Upgrade masa depan: export PNG, mode buta-warna, TTS narasi.
