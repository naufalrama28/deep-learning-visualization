# PRD — Neural Lab: Deep Learning Interaktif

**Versi:** 3.0.0 (rework total — fresh start)
**Tanggal:** 23 September 2026
**Status:** Development
**Stack:** HTML5 + CSS3 + Vanilla JS (zero dependencies, zero build)
**Live:** https://naufalrama28.github.io/deep-learning-visualization/

---

## 1. Visi Produk

**Satu kalimat:** Website edukasi deep learning terbaik dalam Bahasa Indonesia — dari nol mutlak sampai bisa melatih AI sendiri — dengan visualisasi interaktif berkualitas tinggi yang membuat konsep abstrak menjadi terasa nyata.

**Mengapa ini ada:**
- Materi deep learning mayoritas dalam bahasa Inggris, penuh rumus, tanpa visual intuitif
- Pemula Indonesia tidak punya jalur belajar yang terstruktur, bertahap, dan menyenangkan
- Website belajar yang ada要么 terlalu akademis (rumus duluan)要么 terlalu dangkal (tidak sampai ke konsep inti)

**Prinsip desain:**
1. **Main dulu, rumus belakangan** — setiap konsep dimulai dari eksplorasi visual, bukan definisi
2. **Cerita menyambung** — 12 bab yang saling terkait lewat narasi dan konsep
3. **Jujur beristilah** — istilah Inggris yang hidup dipakai langsung, tidak diterjemahkan aneh
4. **Overkill di visual** — setiap visualisasi harus yang terbaik yang bisa dibuat dengan vanilla JS
5. **HOTS, bukan hafalan** — setiap bab melatih nalar analitis, bukan ingatan

---

## 2. Target Pengguna

| Persona | Latar Belakang | Kebutuhan |
|---------|---------------|-----------|
| **Rina** (17, SMA) | Belum pernah coding, takut matematika | Cerita + visual yang membuat "oh ternyata begitu!" |
| **Dimas** (21, mahasiswa non-IT) | Bisa Excel, pernah dengar "AI" dari berita | Jalur terstruktur yang tidak melompat-lompat |
| **Pak Hadi** (40, guru SMA) | Ingin mengajar AI di kelasnya | Materi + soal analitis siap pakai |
| **Putri** (25, otodidak) | Bisa Python dasar, ingin paham deep learning | Playground + penjelasan yang mendalam |

**Prinsip:** Tidak perlu install, tidak perlu coding, tidak perlu matematika lanjutan. Cukup buka browser.

---

## 3. Struktur Konten — 12 Bab

Setiap bab mengikuti pola pedagogis yang sama:

```
1. Kilasan      → 2 kalimat menyambung dari bab sebelumnya
2. Cerita       → Analogi sehari-hari (tokoh Sari & warung)
3. Panduan      → 3 langkah eksplorasi visual (nomor)
4. Tantangan    → Tebak-dulu sebelum tahu jawaban
5. Visual       → Interaktif penuh, semua kontrol bisa digeser
6. Analis       → Soal HOTS aplikatif + jawaban model
7. Hitungan     → Rumus (opsional, dalam collapsible)
8. Kesimpulan   → 1 kalimat yang bisa diingat
9. Istilah      → Kamus mini: Indonesia = English
10. Kuis        → 2-3 soal pilihan ganda + feedback edukatif
```

### Peta Bab

| # | Judul | Konsep Inti | Visualisasi Kunci |
|---|-------|-------------|-------------------|
| 0 | Peta Perjalanan | Orientasi, motivasi, roadmap | Peta visual interaktif |
| 1 | Satu Otak Kecil | Neuron, weight, bias, decision boundary | Canvas: daerah keputusan + garis pemisah |
| 2 | Memberi Perasaan | Fungsi aktivasi (step, sigmoid, tanh, ReLU) | Canvas: kurva + titik interaktif |
| 3 | Kekuatan Tim | MLP, layer, forward pass | SVG: jaringan dengan animasi aliran |
| 4 | Cermin Kebenaran | Loss (MSE, cross-entropy) | Canvas: kurva lembah + titik |
| 5 | Menuruni Bukit | Gradient descent, learning rate | Canvas: lembah + bola + jejak |
| 6 | Evaluasi Bersama | Backpropagation, chain rule | DOM: 4 langkah interaktif |
| 7 | Hafal vs Paham | Overfitting, underfitting, regularisasi | Canvas: polinomial + data |
| 8 | Mata Digital | CNN, konvolusi, filter, pooling | Grid: klik gambar + heatmap |
| 9 | Ingatan Berantai | RNN, hidden state, LSTM | Canvas: grafik state + chip |
| 10 | Seni Mendengarkan | Attention, Q/K/V, Transformer | Grid: heatmap attention |
| 11 | Laboratorium | Training playground, eksperimen bebas | Canvas: decision boundary + loss chart |

---

## 4. Persyaratan Fungsional

### F1: Navigasi & Routing
- Sidebar dengan daftar 12 bab, dikelompokkan (Dasar → Belajar → Indra → Praktik)
- Hash-based routing (#bab1, #bab2, dst.)
- Tombol "Bab Sebelumnya" / "Bab Berikutnya" di setiap halaman
- Progress indicator: bab mana yang sudah selesai

### F2: Sistem Gamifikasi
- XP: +100 per bab selesai, +25 per kuis benar pertama kali
- Level: 6 tingkat dengan nama dan threshold
- Maskot: SVG yang berevolusi per level
- Badge/lencana: 12 kemampuan yang terbuka

### F3: Visualisasi Interaktif
- Setiap bab punya visualisasi yang merespon <100ms
- Semua kontrol punya label yang jelas
- Tombol Reset di setiap visualisasi
- Animasi smooth, menghormati prefers-reduced-motion
- Canvas/SVG redraw saat tema berubah

### F4: Kuis & Soal Analitis
- 2-3 soal pilihan ganda per bab
- Feedback edukatif (bukan sekadar "benar/salah")
- Soal analis HOTS dengan jawaban model (collapsible)
- Jawaban diacak (tidak selalu di posisi yang sama)

### F5: Mode & Aksesibilitas
- Dark/light mode (toggle + simpan preferensi)
- Kecepatan animasi global (0.5x, 1x, 1.5x, 2x)
- Semua `<input>` punya `<label>`
- Keyboard navigable (tab order)
- Kontras WCAG AA minimum

### F6: Penyimpanan
- localStorage untuk: progress, XP, tema, preferensi
- Tombol "Reset Semua" yang menghapus semua data
- Data tetap ada setelah refresh

---

## 5. Persyaratan Non-Fungsional

| Aspek | Target |
|-------|--------|
| Performance | Load <2s, visual <100ms response |
| Size | Total <2MB (tanpa dependensi) |
| Offline | Bisa dibuka via file:// tanpa server |
| Responsive | Mobile (320px) → Desktop (1920px) |
| Browser | Chrome, Firefox, Edge, Safari (latest 2) |
| Code quality | Komentar Indonesia, fungsi kecil, file per bab |
| Accessibility | WCAG 2.1 AA minimum |

---

## 6. Desain Visual

### Filosofi: "Neural Canvas"
Clean, modern, scientific feel. Tidak generik (bukan purple-gradient AI slop). Punya karakter.

### Palet Warna
- **Light mode:** Background `#fafbfc`, card `#ffffff`, text `#1a1a2e`, accent `#2563eb`, accent2 `#059669`
- **Dark mode:** Background `#0d1117`, card `#161b22`, text `#e6edf3`, accent `#58a6ff`, accent2 `#3fb950`
- **Data viz:** Palette 6 warna yang distinguishable (termasuk colorblind-safe)

### Typography
- Body: system-ui, -apple-system, sans-serif (14-16px)
- Headings: same family, bold, tight tracking
- Code/numbers: ui-monospace, monospace
- Fluid sizing dengan clamp()

### Komponen
- Cards: border tipis, border-radius 12px, shadow halus
- Buttons: rounded, hover state jelas, primary/secondary/ghost
- Sliders: custom styled, thumb besar (touch-friendly)
- Canvas: border tipis, rounded, responsive max-width

---

## 7. Arsitektur Teknis

```
index.html          ← Struktur HTML semua 12 bab
css/
  style.css         ← Design system lengkap (variables, components, layout)
js/
  lib/
    canvas-utils.js ← Shared: axes, grid, coord mapping, theme colors
  app.js            ← Router, state, XP, quiz engine, theme
  lessons.js        ← Data: metadata bab + bank kuis
  viz-bab01.js      ← Modul 1: Neuron
  viz-bab02.js      ← Modul 2: Aktivasi
  ...
  viz-bab11.js      ← Modul 11: Playground
```

### Konvensi
- Setiap viz-babXX.js mengekspos `initVizBabXX()` global
- State lokal per modul (closure), tidak bocor ke global
- Canvas redraw via `themechange` event
- `window.GLOBAL_SPEED` untuk kontrol kecepatan animasi

---

## 8. Kriteria Keberhasilan

- [ ] 12 bab lengkap dengan semua visualisasi interaktif
- [ ] Setiap bab: 10 komponen pedagogis (kilas → kuis)
- [ ] Dark/light mode sempurna di semua visualisasi
- [ ] Responsif 320px → 1920px
- [ ] Zero console errors di semua browser modern
- [ ] Training playground konvergen di 4 dataset
- [ ] Soal analis HOTS di setiap bab
- [ ] Kuis bisa dijawab, feedback edukatif, XP tersimpan

---

## 9. Risiko & Mitigasi

| Risiko | Mitigasi |
|--------|----------|
| Canvas lambat di mobile | Grid resolusi adaptif, requestAnimationFrame |
| User bosan di tengah | Cerita menyambung, XP, variasi visual |
| Istilah membingungkan | Kamus di setiap bab + kamus global di beranda |
| Playground tidak konvergen | Xavier init, LR default teruji, 3 seed diverifikasi |
| Browser lama | Progressive enhancement, fallback graceful |
