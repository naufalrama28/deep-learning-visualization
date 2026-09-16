# AGENTS.md — Panduan untuk AI Agent / Kontributor

Dokumen ini menjelaskan cara kerja di repo ini agar agen AI maupun manusia konsisten.

## 1. Cara Menjalankan
Tidak perlu build / npm. Pilih salah satu:

**Cara termudah (cukup klik):**
Klik 2x `index.html` → terbuka di browser.

**Cara disarankan (agar 100% fitur jalan):**
```powershell
# dari folder proyek
python -m http.server 8000
# lalu buka http://localhost:8000
```
Atau dengan Node:
```powershell
npx serve .
```

Tidak ada perintah test otomatis. Verifikasi = buka browser, klik semua modul, geser semua slider.

## 2. Struktur Proyek
```
D:\Coding\deep-learning-visualization\
├── index.html          # satu-satunya halaman, semua modul di dalamnya
├── css/
│   └── style.css       # tema terang/gelap, layout, kartu, slider
├── js/
│   ├── app.js          # router hash, sidebar, progress, tema, kuis
│   ├── lessons.js      # teks materi per modul (sumber kebenaran konten)
│   ├── viz-neuron.js      # Modul 2: neuron & perceptron
│   ├── viz-activation.js  # Modul 3: grafik aktivasi
│   ├── viz-mlp.js         # Modul 4: forward pass MLP
│   ├── viz-loss.js        # Modul 5: loss function
│   ├── viz-gradient.js    # Modul 6: gradient descent
│   ├── viz-backprop.js    # Modul 7: backprop langkah-demi-langkah
│   ├── viz-overfit.js     # Modul 8: overfitting
│   ├── viz-cnn.js         # Modul 9: konvolusi & pooling
│   ├── viz-rnn.js         # Modul 10: RNN/LSTM
│   ├── viz-attention.js   # Modul 11: attention transformer
│   └── viz-playground.js  # Modul 12: playground klasifikasi 2D
├── PRD.md
├── ARCHITECTURE.md
├── LEARNING_PATH.md
├── AGENTS.md
└── README.md
```

## 3. Konvensi Kode
- Bahasa komentar & UI: **Bahasa Indonesia**.
- Vanilla JS saja. Dilarang menambah framework/CDN tanpa izin user.
- Satu file `viz-*.js` mengekspos satu fungsi global `initVizNama()` yang dipanggil `app.js` saat modul dibuka.
- Setiap visual harus punya fungsi `reset` / preset contoh.
- ID elemen HTML diawali nama modul, mis. `neuron-w1`, `cnn-in`, `pg-train`.
- CSS: gunakan variabel `--bg`, `--card`, dll agar dark mode otomatis. Jangan hardcode warna kecuali untuk visualisasi data.
- Aksesibilitas: setiap `<input type="range">` wajib punya `<label>`.

## 4. Cara Menambah Modul Baru
1. Tambah entri di `js/lessons.js` (judul, tujuan, istilah).
2. Tambah `<section id="...">` di `index.html`.
3. Buat `js/viz-namabaru.js` dengan `function initVizNamabaru(){...}`.
4. Daftarkan di `js/app.js` pada objek `VIZ_INIT`.
5. Tambah link sidebar + rute hash.
6. Update `LEARNING_PATH.md` + `README.md`.

## 5. Aturan Konten Edukasi (wajib — inilah yang bikin project ini di atas rata-rata)
Setiap modul WAJIB punya pola berurutan:
1. **Cerita 30 detik** (`.card.story` — kehidupan sehari-hari, tanpa istilah teknis)
2. **Panduan main gambar** (`.card.guide` — 3 langkah bernomor: geser apa → lihat apa)
3. **Kontrol + visual** (label berbahasa sehari-hari; teks hasil: kalimat biasa dulu, angka belakangan)
4. **Hitungan lipat** (`<details class="hitung">` — rumus + istilah resmi BOLEH hanya di sini)
5. **Kesimpulan 1 kalimat** (`.card.kesimpulan` — awalan "Ingat 1 kalimat:")
6. **Kuis cerita** (2-3 soal di `QUIZZES`, situasi sehari-hari + feedback tanpa jargon)

Aturan bahasa (dilarang dilanggar):
- Teks utama (cerita/panduan/label/hasil/kuis): **dilarang ada istilah Inggris tanpa terjemahan.** Pengecualian: nama tombol teknis boleh jika label Indonesianya duluan.
- Istilah resmi diperkenalkan HANYA lewat 3 cara (tidak boleh di tempat lain):
  1. di kurung saat pertama muncul ("standar kelulusan (bias)"),
  2. di kotak hitungan lipat (`<details class="hitung">`),
  3. di kotak istilah terlihat (`.card.istilah` — WAJIB ada 1 per modul, pola: "Indonesia = **Inggris**" per chip).
- Pakai kamus baku ini secara konsisten (jangan bikin padanan baru sendiri):

| Tulis ini | Jangan tulis ini |
|---|---|
| seberapa penting (bobot) | weight / w saja |
| standar kelulusan (bias) | bias saja / threshold |
| skor meleset (loss) | loss / MSE / cross-entropy di teks utama |
| panjang langkah (learning rate) | lr / learning rate saja |
| putaran latihan (epoch) | epoch saja |
| ketepatan (akurasi) | accuracy |
| tim depan/tengah (lapisan) | layer / hidden layer saja |
| bingkai peraba (filter) | filter / kernel / konvolusi di teks utama |
| peta temuan (feature map) | feature map saja |
| peta ringkas (pooling) | pooling / max-pooling saja |
| catatan (hidden state) | hidden state saja |
| perhatian (attention) | attention / query / key saja |
| soal latihan / soal ujian | train / test / dataset di teks utama |
| kurang belajar / menghafal | underfit / overfit saja |
| kemiringan | gradien saja |
| keputusan YA / BELUM | output 1/0, kelas 1/0 |

## 6. Checklist Sebelum Selesai
- [ ] Buka via `file://` dan `http://localhost:8000`, tidak ada error console
- [ ] Semua slider merespon <100ms; tiap modul ada tombol Reset/preset
- [ ] Dark/light mode tidak merusak keterbacaan canvas (gambar ulang jika perlu)
- [ ] Kuis bisa dijawab dan memberi feedback
- [ ] Progress tersimpan (refresh tidak hilang centang)
- [ ] Audit bahasa: jalankan `python tools/audit-bahasa.py` (harus LOLOS). Pengecualian sah: kamus, `.card.istilah`, `<details class="hitung">`, dan pola "Indonesia (Inggris)"
