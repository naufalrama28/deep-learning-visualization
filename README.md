# Deep Learning Visualization — Paham Cara Kerja AI Tanpa Pusing Rumus 🧠

Website interaktif **Bahasa Indonesia** untuk **semua orang** — termasuk yang bukan dari ilmu komputer.
Setiap konsep deep learning diajarkan dengan pola: **cerita sehari-hari dulu → mainkan gambarnya → rumus boleh diskip.**

🌐 **Coba langsung (online):** https://naufalrama28.github.io/deep-learning-visualization/

![Tanpa dependensi](https://img.shields.io/badge/dependensi-nol-brightgreen) ![Bahasa](https://img.shields.io/badge/bahasa-Indonesia-blue) ![Offline](https://img.shields.io/badge/offline-bisa-orange)

## ✨ Fitur
- **11 modul visual + 1 latihan nyata**: Otak Mini, Lampu Menyala, Kerja Tim Berlapis, Skor Meleset, Bola ke Lembah, Evaluasi Tim, Hafalan vs Paham, Mata Komputer, Daya Ingat, Rapat Kata, + **Latihan Nyata (latih AI sungguhan di browser)**
- **Cerita dulu, rumus belakangan**: tiap modul dibuka cerita 30 detik (pasar buah, ski, sinetron…), ditutup 1 kalimat kesimpulan. Hitungan disembunyikan di kotak lipat.
- **Semua bisa diutak-atik**: 60+ tombol geser/klik — seberapa penting petunjuk, standar kelulusan, panjang langkah, kacamata peraba, bentuk soal, susunan tim. Ada tombol Reset di tiap halaman.
- **Panduan 3 langkah** di tiap modul — pengunjung tidak pernah bingung "harus apa".
- **Kuis cerita** tiap modul + progress tersimpan otomatis + mode gelap/terang + responsif HP & laptop + 100% offline.

## 🚀 Cara Membuka (pilih 1)

**1. Versi online (paling mudah):**
Buka https://naufalrama28.github.io/deep-learning-visualization/ di Chrome/Edge/HP.

**2. Klik 2x dari folder:**
Buka folder ini → klik 2x `index.html`.

**3. Server lokal:**
```powershell
cd D:\Coding\deep-learning-visualization
python -m http.server 8000
# buka http://localhost:8000 di Chrome/Edge
```

## 🗺️ Mulai Belajar (8–15 mnt per modul)
- **Waktu sedikit?** Ikut **jalur super awam** (4 modul = 80% intuisi): Otak Mini → Seberapa Meleset? → Bola ke Lembah → Latihan Nyata.
- **Waktu banyak?** Ikuti urutan 1→12 di `LEARNING_PATH.md`.
- Tiap modul: baca cerita → ikuti 3 langkah main gambar → baca kesimpulan → jawab kuis → centang selesai.

## 📖 Kamus singkat (istilah → bahasa sehari-hari)
| Istilah | Artinya |
|---|---|
| Bobot | Seberapa penting sebuah petunjuk |
| Standar kelulusan (bias) | Ambang keputusan YA/BELUM |
| Skor meleset (loss) | Jarak tebakan dari jawaban (0 = tepat) |
| Panjang langkah (learning rate) | Seberapa besar tiap langkah belajar |
| Putaran latihan (epoch) | Satu putaran melihat semua contoh |
| Menghafal (overfitting) | Nilai latihan bagus, soal baru jeblok |

## 📁 Struktur
```
index.html                  # satu-satunya halaman (11 modul + latihan)
css/style.css               # tema terang/gelap, kartu cerita/panduan/kesimpulan
js/app.js                   # navigasi, progress, tema, kuis
js/lessons.js               # judul modul + bank kuis (sumber kebenaran konten)
js/viz-*.js                 # satu file = satu visual interaktif
PRD.md | ARCHITECTURE.md | LEARNING_PATH.md | AGENTS.md | DEPLOY.md
```

## ❓ FAQ
**Saya bukan anak komputer, bisa ikut?** Bisa — itu target utama. Tidak perlu matematika & coding; cukup bisa menggeser tombol.
**Perlu install / internet?** Versi online cukup browser. Versi folder 100% offline setelah didapat.
**Cocok untuk anak SMA / guru?** Ya — tiap modul ada cerita, panduan langkah, dan 1 kalimat kesimpulan yang bisa dikutip.
**Ada rumusnya?** Ada, tapi disembunyikan di kotak lipat "Penasaran hitungannya?" — dibuka hanya kalau sudah penasaran.
**Bisa rusak kalau salah pencet?** Tidak — tiap halaman ada tombol Reset.

Selamat mengutak-atik! 🎛️
