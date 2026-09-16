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

## 8. Standar Bahasa (sinkron dengan AGENTS.md §5)
Kode boleh pakai singkatan (`w`, `lr`, `h`), tapi **teks yang tampil ke user wajib bahasa sehari-hari** (lihat kamus baku di AGENTS.md). Rumus + istilah resmi hanya di `<details class="hitung">`.

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
| viz-cnn.js | raba gambar 5×5 pakai kacamata 3×3 | Grid DOM klik + heatmap warna |
| viz-rnn.js | catatan untuk urutan kejadian | Chip langkah + grafik catatan |
| viz-attention.js | siapa mendengarkan siapa (per kata) | Heatmap persen + kalimat klik |
| viz-playground.js | latih jaringan sungguhan 2D | Canvas batas warna (grid 44×44) + titik soal |

## 4. Latihan nyata (modul tersulit) — Desain jujur
- Bentuk soal dibangkitkan prosedural dengan `Math.random` (acak tiap klik "Soal baru"): lingkaran, silang, spiral, dua kelompok. ±180 titik.
- Model: jaringan `2 → tim1 → tim2 → 1` (tim 0–8 orang per lapis), gaya tim tanh/ReLU/sigmoid, keputusan akhir sigmoid.
- Training: SGD manual full-batch (seluruh soal tiap putaran; sederhana & cepat untuk <400 titik), forward + backward ditulis eksplisit di JS.
- Render batas warna: evaluasi grid 44×44 tiap selesai N putaran; grafik skor meleset max 200 titik terakhir.
- Kontrol: bentuk soal, tim lapis 1–2, gaya tim, keberanian belajar (0.01–1), soal berantakan (noise), tombol Latih/Stop/+50/Acak/Soal baru.

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
