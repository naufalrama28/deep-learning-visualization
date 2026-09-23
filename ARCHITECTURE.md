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

Semua state disimpan lokal per modul, tidak ada state global kecuali `AppState {theme, progress}` + `window.GLOBAL_SPEED` (kecepatan animasi).

## 3. Peta File → Konsep (nama ramah di website, istilah resmi di sini untuk developer)
| File | Konsep yang divisualkan | Teknik render |
|---|---|---|
| viz-neuron.js | otak mini: timbang petunjuk → YA/BELUM | Canvas daerah keputusan + lampu |
| viz-activation.js | 4 kepribadian (tegas/lembut/cuek/seimbang) | Canvas grafik + titik geser |
| viz-mlp.js | kerja tim berlapis 2-3-2-1 | SVG lingkaran + animasi aliran |
| viz-loss.js | skor meleset tebak angka vs tebak pilihan | Canvas kurva lembah + titik tebakan |
| viz-gradient.js | langkah belajar di lembah | Canvas lembah + bola + jejak |
| viz-backprop.js | evaluasi mundur 4 langkah | Kotak angka + langkah 1→4 |
| viz-overfit.js | kurang belajar vs pas vs menghafal | Canvas titik soal + garis cara belajar |
| viz-cnn.js | raba gambar 5×5 pakai bingkai 3×3 | Grid DOM klik + heatmap warna |
| viz-rnn.js | catatan untuk urutan kejadian | Chip langkah + grafik catatan |
| viz-attention.js | siapa mendengarkan siapa (per kata) | Heatmap persen + kalimat klik |
| viz-playground.js | latih jaringan sungguhan 2D | Canvas decision boundary (grid 44×44) + titik data |

## 4. Latihan nyata (modul tersulit) — Desain jujur
- Dataset dibangkitkan prosedural dengan `Math.random` (acak tiap klik "Dataset baru"): lingkaran, XOR, spiral, dua kelompok. ±180 titik.
- Model: jaringan `2 → h1 → h2 → 1` (hidden layer 0–8 neuron per lapis), aktivasi tanh/ReLU/sigmoid, output sigmoid.
- Training: SGD manual full-batch (seluruh data tiap epoch), forward + backward eksplisit di JS.
- Render: decision boundary grid 44×44 tiap selesai N epoch; grafik loss 200 titik terakhir.
- Kontrol: dataset, hidden layer 1–2, aktivasi, learning rate default **0.5** (teruji: konvergen mulus, stabil 3 seed, aman sampai 1.0), noise, tombol Latih/Stop/+50/Acak/Dataset-baru.

## 5. Tema & Gaya ("kertas warung": hangat, editorial, bukan ungu-generik)
CSS variables (terang):
```css
:root { --bg:#f6f1e7; --card:#fffdf7; --text:#26211a; --accent:#d9480f; --accent2:#0b7285; }
```
Gelap = versi hangat (`#171310`/`#221b14`, aksen amber + teal). Judul pakai serif
sistem (Georgia/Palatino) agar beda dari situs generik — tanpa webfont (tetap offline).
Latar pola titik halus via `radial-gradient`. Canvas membaca `getComputedStyle`
saat init + saat tema berubah (event `themechange`).

## 6. Penyimpanan Lokal (ganda, agar reset mandiri)
`localStorage["dlviz-progress"] = {neuron:true, ...}` (centang misi)
`localStorage["dlviz-xp"] = {xp, done:{}, quiz:{}}` (+100/misi, +25/kuis benar pertama)
`localStorage["dlviz-theme"] = "dark"|"light"`
Level Si Cerdas: Bibit(0) → Tunas(150) → Anak(400) → Remaja(700) → Dewasa(1100) → Master(1500).
Maskot = SVG robot yang tumbuh per level (antena → bola → senyum + pipi → bintang → toga wisuda).

## 7. Batasan & Utang Teknis yang Disadari
- Decision boundary resolusi rendah (grid 44×44, demi performa) — cukup untuk intuisi.
- Canvas butuh browser sungguhan (harness jsdom memakai mock 2D; visual piksel dicek manual).
- Upgrade masa depan: export PNG, mode buta-warna, TTS narasi.

## 8. Standar Bahasa (sinkron dengan AGENTS.md §5)
Istilah Inggris yang hidup dipakai langsung (loss, epoch, dataset…); yang dilarang
adalah terjemahan harfiah aneh (lihat BANNED di `tools/audit-bahasa.py`). Setiap istilah
resmi wajib ada artinya di kamus beranda dan/atau kotak istilah modulnya.
