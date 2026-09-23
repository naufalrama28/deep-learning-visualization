# Neural Lab — Product Requirements Document

## Visi Produk

**Neural Lab** adalah website edukasi deep learning interaktif dalam Bahasa Indonesia yang membawa pengguna dari nol mutlak sampai bisa melatih AI sendiri melalui perjalanan naratif yang immersive.

**Tagline:** "Bangun kesadaran buatan dari nol — main dulu, rumus belakangan"

## Filosofi

1. **Journey, Not Lecture** — User bukan "membaca materi", user "mengalami perjalanan" membangun AI
2. **Story-Driven** — Satu narasi besar yang mengalir, setiap bab adalah episode yang menyambung
3. **Active Learning** — Main dulu, eksplorasi dulu, rumus belakangan
4. **Progressive Mastery** — Dari titik kosong sampai AI yang bisa belajar sendiri
5. **Overkill Quality** — Setiap visualisasi adalah yang terbaik yang bisa dibuat

## Target User

**Persona Utama:**
- **Rina (17, SMA)** — Belum pernah coding, takut matematika, tapi penasaran dengan AI
- **Dimas (21, mahasiswa non-IT)** — Bisa Excel, pernah dengar "AI" dari berita, ingin paham dari dasar
- **Pak Hadi (40, guru SMA)** — Ingin mengajar AI di kelasnya, butuh materi + soal yang siap pakai
- **Putri (25, otodidak)** — Bisa Python dasar, ingin paham deep learning secara mendalam

**Karakteristik:**
- Bahasa Indonesia sebagai bahasa utama
- Belum pernah coding atau matematika lanjutan
- Ingin paham AI dari dasar, bukan sekadar pakai
- Butuh visualisasi yang membuat konsep abstrak menjadi nyata

## Struktur Konten

### Narasi Besar: "Membangun Lumen"

User adalah **arsitek AI** yang sedang membangun kesadaran buatan bernama **Lumen**. Setiap bab menambahkan "bagian" baru ke Lumen:

- **Prolog** — Lumen belum ada, kamu punya misi
- **Bab 1-2** — Otak dasar (neuron + aktivasi)
- **Bab 3-6** — Cara belajar (MLP, loss, gradient, backprop)
- **Bab 7** — Kebijaksanaan (overfitting)
- **Bab 8-10** — Indra khusus (mata, ingatan, perhatian)
- **Bab 11** — Pembuktian (training playground)

### 11 Bab + Prolog

| # | Judul | Konsep | Visualisasi Kunci |
|---|-------|--------|-------------------|
| 0 | Prolog | Orientasi | Peta perjalanan interaktif |
| 1 | Satu Sel Otak | Neuron, weight, bias | Canvas: decision boundary |
| 2 | Memberi Perasaan | Fungsi aktivasi | Canvas: kurva interaktif |
| 3 | Kekuatan Tim | MLP, forward pass | SVG: jaringan animasi |
| 4 | Cermin Kebenaran | Loss function | Canvas: lembah loss |
| 5 | Menuruni Bukit | Gradient descent | Canvas: bola + trail |
| 6 | Evaluasi Bersama | Backpropagation | DOM: 4 langkah |
| 7 | Hafal vs Paham | Overfitting | Canvas: polynomial fit |
| 8 | Mata Digital | CNN, konvolusi | Grid: klik interaktif |
| 9 | Ingatan Berantai | RNN, hidden state | Canvas: state evolution |
| 10 | Seni Mendengarkan | Attention, Q/K/V | Grid: heatmap |
| 11 | Laboratorium | Training playground | Canvas: boundary + loss |

## Persyaratan Fungsional

### F1: Navigasi & Routing
- Hash-based routing (#bab1, #bab2, dst.)
- Progress tracking per bab
- Tombol "bab sebelumnya/berikutnya"
- Sidebar navigation dengan grouping

### F2: Sistem Gamifikasi
- XP: +100 per bab selesai, +25 per kuis benar
- Level: 6 tingkat (Bibit → Master)
- Avatar: evolusi visual per level
- Badge: 11 kemampuan yang terbuka

### F3: Visualisasi Interaktif
- Response time < 100ms
- Semua kontrol punya label jelas
- Tombol Reset di setiap visualisasi
- Smooth animations (60fps)
- Theme-aware (redraw saat ganti tema)

### F4: Kuis & Soal Analitis
- 2-3 soal per bab
- Feedback edukatif (bukan sekadar benar/salah)
- Soal HOTS (Higher Order Thinking Skills)
- Jawaban diacak posisinya

### F5: Mode & Aksesibilitas
- Dark/light mode (toggle + simpan)
- Kecepatan animasi global (0.5x - 2x)
- Keyboard navigable
- Screen reader friendly
- Colorblind-safe palette
- Reduced motion support

### F6: Penyimpanan
- localStorage untuk progress, XP, tema
- Tombol "Reset Semua"
- Data persisten setelah refresh

## Persyaratan Non-Fungsional

### Performance
- Load time < 2 detik
- Visual response < 100ms
- Smooth 60fps animations
- Total size < 2MB

### Compatibility
- Browser: Chrome, Firefox, Edge, Safari (latest 2)
- Responsive: 320px - 1920px
- Offline capable (bisa dibuka via file://)

### Accessibility
- WCAG 2.1 AA minimum
- Keyboard navigable
- Screen reader friendly
- Colorblind-safe palette
- Reduced motion support

## Teknologi

**Stack:**
- HTML5 + CSS3 + Vanilla JavaScript
- Zero dependencies (no React, no Vue, no D3, no Tailwind, no CDN)
- Canvas 2D untuk visualisasi
- SVG untuk diagram
- localStorage untuk state

**Performance:**
- RequestAnimationFrame untuk animasi
- HiDPI canvas support
- Throttled resize events
- Lazy init visualisasi

## Kriteria Keberhasilan

- [ ] Fresh start total — tidak ada kode/konten dari versi lama
- [ ] Cerita bersambung — setiap bab terhubung naratif
- [ ] Desain unique — tidak terlihat seperti website AI generik
- [ ] Visual overkill — setiap visualisasi adalah yang terbaik
- [ ] Pedagogi sound — active learning, scaffolding, feedback
- [ ] Progressive — dari nol sampai melatih AI sendiri
- [ ] Performance — fast, smooth, responsive
- [ ] Accessibility — keyboard, screen reader, colorblind
- [ ] Zero dependencies — pure HTML/CSS/JS
- [ ] Offline capable — bisa dibuka via file://

## Risiko & Mitigasi

| Risiko | Mitigasi |
|--------|----------|
| Canvas lambat di mobile | Grid resolusi adaptif, throttling |
| User bosan di tengah | Cerita menyambung, XP, variasi visual |
| Istilah membingungkan | Kamus per bab + kamus global |
| Playground tidak konvergen | Xavier init, LR default teruji |
| Browser lama | Progressive enhancement |

## Timeline

**Phase 1: Foundation** (Week 1)
- Dokumen perencanaan (PRD, Architecture, Story, Design)
- Design system (CSS variables, components)
- Base HTML structure
- Router & state management

**Phase 2: Core Content** (Week 2-3)
- Bab 1-3 (neuron, aktivasi, MLP)
- Bab 4-6 (loss, gradient, backprop)
- Visualisasi inti

**Phase 3: Advanced Content** (Week 4)
- Bab 7-10 (overfit, CNN, RNN, attention)
- Visualisasi lanjutan

**Phase 4: Polish** (Week 5)
- Bab 11 (playground)
- Testing & debugging
- Performance optimization
- Accessibility audit

## Catatan Penting

**JANGAN:**
- Terburu-buru — lebih baik lambat tapi sempurna
- Copy-paste dari versi lama — ini fresh start total
- Kompromi di kualitas visual — setiap visualisasi harus overkill
- Lupakan narasi — setiap bab harus menyambung

**LAKUKAN:**
- Eksplorasi desain yang unique
- Test setiap visualisasi secara manual
- Iterate sampai sempurna
- Dokumentasi yang jelas

---

**Versi:** 1.0.0
**Tanggal:** 2026
**Status:** Planning
