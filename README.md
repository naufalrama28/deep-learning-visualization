# Misi Si Cerdas — Rakit AI Warung dari Nol Total 🤖

Bantu **Sari** membangun **Si Cerdas**, AI warung pertamanya: memilih buah matang,
meramal stok, membaca foto struk, menjawab chat pelanggan. Kamu mulai dari **NOL besar** —
11 misi interaktif Bahasa Indonesia, tiap misi membuka 1 kemampuan + XP.

🌐 **Main langsung (online):** https://naufalrama28.github.io/deep-learning-visualization/

![Tanpa dependensi](https://img.shields.io/badge/dependensi-nol-brightgreen) ![Bahasa](https://img.shields.io/badge/bahasa-Indonesia-blue) ![Offline](https://img.shields.io/badge/offline-bisa-orange)

## ✨ Fitur
- **11 misi bersambung**: tiap misi dibuka kilasan misi lalu ("previously on…"), ditutup kemampuan baru. Cerita Sari terus jalan dari Misi 1 sampai 11.
- **Gamifikasi**: maskot Si Cerdas tumbuh (Bibit → Tunas → Anak → Remaja → Dewasa → Master), +100 XP per misi, +25 XP per jawaban kuis benar, 11 lencana kemampuan.
- **Pedagogi berlapis**: briefing → main 3 langkah → tantangan 30 detik (tebak dulu!) → **soal analis HOTS** + jawaban model → kesimpulan 1 kalimat → istilah resmi → kuis.
- **Istilah asli, bukan terjemahan aneh**: loss, epoch, dataset, filter, overfitting… dipakai wajar seperti dosen Indonesia, selalu ada artinya di kamus + kotak istilah.
- **Semua bisa diutak-atik**: 60+ kontrol + Reset per misi. Mode gelap/terang, responsif HP, 100% offline.

## 🚀 Cara Membuka
**Online:** buka link di atas di Chrome/Edge/HP.
**Folder:** klik 2x `index.html`, atau `python -m http.server 8000` → `http://localhost:8000`.

## 🗺️ Mulai Belajar
- **Waktu sedikit?** Jalur cepat (4 misi = 80% intuisi): Otak Mini → Cermin → Lembah → Ujian Kelulusan.
- **Lengkap?** Ikuti Misi 1→11 di `LEARNING_PATH.md` (8–15 mnt/misi).
- Aturan main tiap misi: baca kilasan → briefing → 3 langkah → tantangan → analis → kesimpulan → istilah → kuis → klaim XP.

## 📖 Kamus kilat (istilah asli + artinya)
neuron • perceptron • bobot (weight) • bias • loss • learning rate • epoch •
akurasi • overfitting • dataset • hidden layer • filter. Lengkap di beranda.

## 📁 Struktur
```
index.html                  # 11 misi (kilas/cerita/panduan/tantangan/analis/istilah/kuis)
css/style.css               # identitas "kertas warung" + mode gelap hangat
js/app.js                   # router, XP/level/maskot, kuis, tema, progress
js/lessons.js               # judul misi + bank kuis
js/viz-*.js                 # satu file = satu mesin visual interaktif
tools/audit-bahasa.py       # audit mutu otomatis (struktur + anti-coinage + ID + kuis)
PRD.md | ARCHITECTURE.md | LEARNING_PATH.md | AGENTS.md | DEPLOY.md
```

## ✅ Mutu terjaga otomatis
- `python tools/audit-bahasa.py` — struktur 11 misi, larangan terjemahan aneh, integritas ID & kuis.
- Harness jsdom (uji router, XP, maskot, semua visual, training 400 epoch): 41 cek, semua lolos.

## ❓ FAQ
**Bukan anak komputer, bisa?** Itu target utama — mulai dari nol total, tanpa matematika & coding.
**Istilah Inggrisnya tidak diterjemahkan?** Sengaja. Yang dipakai = istilah yang memang hidup (loss, epoch…). Artinya selalu ada di kamus/kotak istilah. Yang dilarang = terjemahan harfiah yang aneh.
**Bisa rusak kalau salah pencet?** Tidak — tiap misi ada Reset; progress & XP tersimpan di browser.
**Untuk guru?** Tiap misi ada soal analis + jawaban model — siap pakai untuk diskusi kelas.

Selamat merakit! 🎛️
