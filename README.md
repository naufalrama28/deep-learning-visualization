# Neural Lab — Belajar Deep Learning dari Nol

Website edukasi deep learning interaktif dalam Bahasa Indonesia. 12 bab bertahap — dari neuron tunggal sampai melatih AI sendiri di browser. Zero dependencies, zero install, 100% offline.

**Live:** https://naufalrama28.github.io/deep-learning-visualization/

## Fitur

- **12 bab bersambung** — setiap bab membangun di atas yang sebelumnya, cerita menyambung
- **Visualisasi interaktif** — geser slider, lihat konsep abstrak menjadi nyata
- **Pedagogi berlapis** — cerita → eksplorasi → tantangan → soal analitis → kesimpulan
- **Gamifikasi** — XP, level, maskot yang berevolusi, 11 lencana kemampuan
- **Dark/light mode** — clean design di kedua mode
- **Soal HOTS** — setiap bab punya soal analitis aplikatif + jawaban model
- **100% offline** — tanpa CDN, tanpa framework, tanpa build step

## Quick Start

```bash
# Cara termudah: klik 2x index.html
# Atau via server:
python -m http.server 8000
# Buka http://localhost:8000
```

## Kurikulum

| # | Bab | Konsep |
|---|-----|--------|
| 0 | Peta Perjalanan | Orientasi & roadmap |
| 1 | Satu Otak Kecil | Neuron, weight, bias |
| 2 | Memberi Perasaan | Fungsi aktivasi |
| 3 | Kekuatan Tim | MLP, forward pass |
| 4 | Cermin Kebenaran | Loss function |
| 5 | Menuruni Bukit | Gradient descent |
| 6 | Evaluasi Bersama | Backpropagation |
| 7 | Hafal vs Paham | Overfitting |
| 8 | Mata Digital | CNN |
| 9 | Ingatan Berantai | RNN/LSTM |
| 10 | Seni Mendengarkan | Attention/Transformer |
| 11 | Laboratorium | Training playground |

**Jalur cepat (4 bab = 80% intuisi):** Bab 1 → 4 → 5 → 11

## Struktur

```
index.html          # 12 bab, struktur HTML lengkap
css/style.css       # Design system (variables, components, layout)
js/lib/             # Shared utilities (canvas helpers)
js/app.js           # Router, state, XP, quiz engine
js/lessons.js       # Konten: metadata + bank kuis
js/viz-bab*.js      # Satu file = satu visualisasi interaktif
tools/audit.py      # Audit mutu otomatis
```

## Dokumentasi

- [PRD.md](PRD.md) — Product requirements
- [ARCHITECTURE.md](ARCHITECTURE.md) — Arsitektur teknis
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — Visual language & components
- [LEARNING_PATH.md](LEARNING_PATH.md) — Kurikulum lengkap
- [AGENTS.md](AGENTS.md) — Panduan kontributor/AI agent
- [DEPLOY.md](DEPLOY.md) — Cara deploy ke hosting

## Tech Stack

- HTML5 + CSS3 + Vanilla JavaScript
- Zero dependencies (no React, no D3, no Tailwind, no CDN)
- Canvas 2D + SVG untuk visualisasi
- localStorage untuk progress
- ~1500 baris total (compact & readable)

## License

Educational project. Free to use and learn from.
