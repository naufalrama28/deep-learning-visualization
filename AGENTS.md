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
├── tools/
│   └── audit-bahasa.py   # audit mutu: struktur misi + anti-coinage + ID + kuis
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
Setiap modul WAJIB punya pola berurutan (verifikasi via `tools/audit-bahasa.py`):
1. **Kilasan** (`.card.kilas` — 1-2 kalimat "previously on", menyambung misi lalu)
2. **Cerita 30 detik** (`.card.story` — tokoh Sari/warung, tanpa istilah teknis baru)
3. **Panduan main gambar** (`.card.guide` — 3 langkah bernomor: geser apa → lihat apa)
4. **Tantangan 30 detik** (`.card.tantangan` — tebak-dulu: prediksi + petunjuk, tanpa bocorkan jawaban)
5. **Kontrol + visual** (label jelas; teks hasil: kalimat biasa dulu, angka belakangan)
6. **Soal analis** (`.card.analis` — 1 skenario aplikatif HOTS + `<details>` jawaban model)
7. **Hitungan lipat** (`<details class="hitung">` — rumus + istilah resmi BOLEH di sini)
8. **Kesimpulan 1 kalimat** (`.card.kesimpulan` — awalan "Ingat 1 kalimat:")
9. **Kotak istilah** (`.card.istilah` — WAJIB 1 per modul, chip "Indonesia = **Inggris**")
10. **Kuis cerita** (2-3 soal di `QUIZZES`: `{q, opts[], answer, fb}` — answer wajib indeks valid)

Aturan bahasa (dilarang dilanggar):
- **Istilah Inggris yang sudah hidup dipakai langsung, jangan diterjemahkan aneh-aneh.**
  Contoh benar: loss, epoch, dataset, filter, overfitting, hidden layer, learning rate.
  Contoh salah (DILARANG, ditolak audit): hasil remasan, kacamata peraba, kemelesetan.
- Setiap istilah resmi wajib ada artinya di kamus beranda dan/atau kotak istilah modulnya.
- Teks hasil visual: kalimat biasa dulu, angka belakangan.
- Kamus baku padanan yang BOLEH dipakai (jangan bikin sendiri):

| Tulis ini | Jangan tulis ini |
|---|---|
| bobot (weight) | w saja tanpa penjelasan |
| bias (nilai awal/ambang) | standar kelulusan sebagai istilah utama |
| loss (skor meleset) | loss tanpa arti / "kemelesetan" |
| learning rate (panjang langkah) | lr saja |
| epoch (satu putaran) | epoch saja |
| akurasi (ketepatan) | accuracy saja |
| data latih / data uji | train/test/soal saja |
| derajat polinomial | degree saja |
| feature map (peta temuan) | feature map tanpa arti |
| hasil pooling | remasan / pooling tanpa arti |
| hidden state (catatan) | hidden state tanpa arti |
| query/key/value | Q/K saja tanpa kepanjangan |
| keputusan YA / BELUM | output 1/0, kelas 1/0 |

## 6. Checklist Sebelum Selesai
- [ ] Buka via `file://` dan `http://localhost:8000`, tidak ada error console
- [ ] Semua slider merespon <100ms; tiap modul ada tombol Reset/preset
- [ ] Dark/light mode tidak merusak keterbacaan canvas (gambar ulang jika perlu)
- [ ] Kuis bisa dijawab dan memberi feedback (+XP benar pertama)
- [ ] Progress + XP tersimpan (refresh tidak hilang); Reset menghapus keduanya
- [ ] Audit bahasa: jalankan `python tools/audit-bahasa.py` (harus LOLOS). Pengecualian sah: kamus, `.card.istilah`, `<details class="hitung">`, dan pola "Indonesia (Inggris)"
- [ ] Uji interaksi lolos: router 12 rute, XP/maskot, semua visual + training playground
