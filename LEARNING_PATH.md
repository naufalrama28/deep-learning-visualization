# LEARNING_PATH.md — Kurikulum Neural Lab v3

> **Filosofi:** Belajar deep learning seperti membangun rumah. Pondasi dulu (bab 1-2), 
> lalu dinding (bab 3-6), atap (bab 7), baru interior spesial (bab 8-10). 
> Terakhir, kamu renovasi sendiri (bab 11).

---

## Peta Perjalanan

```
                    ┌─────────────────────────────────────┐
                    │         BAB 0: Peta Perjalanan       │
                    │   "Kenapa aku di sini? Apa yang      │
                    │    akan kupelajari?"                 │
                    └──────────────┬──────────────────────┘
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        │     FASE 1: PONDASI     │                          │
        │  "Cara mesin berpikir"  │                          │
        ├─────────────────────────┤                          │
        │  Bab 1 → Satu Otak Kecil│  (neuron, weight, bias) │
        │  Bab 2 → Memberi        │  (aktivasi, non-linear) │
        │         Perasaan                                    │
        └──────────────┬──────────┘                          │
                       │                                     │
        ┌──────────────┼──────────────────────┐             │
        │   FASE 2: BELAJAR                   │             │
        │   "Cara mesin memperbaiki diri"      │             │
        ├──────────────────────────────────────┤             │
        │  Bab 3 → Kekuatan Tim    (MLP)      │             │
        │  Bab 4 → Cermin Kebenaran (loss)     │             │
        │  Bab 5 → Menuruni Bukit  (gradient)  │             │
        │  Bab 6 → Evaluasi Bersama (backprop) │             │
        │  Bab 7 → Hafal vs Paham  (overfit)   │             │
        └──────────────┬───────────────────────┘             │
                       │                                     │
        ┌──────────────┼───────────────────────┐            │
        │   FASE 3: INDRA KHUSUS               │            │
        │   "Mesin untuk dunia nyata"           │            │
        ├───────────────────────────────────────┤            │
        │  Bab 8 → Mata Digital      (CNN)     │            │
        │  Bab 9 → Ingatan Berantai  (RNN)     │            │
        │  Bab 10 → Seni Mendengarkan (Attn)   │            │
        └──────────────┬────────────────────────┘            │
                       │                                     │
        ┌──────────────┼───────────────────────┐            │
        │   FASE 4: PEMBUKTIAN                 │            │
        ├───────────────────────────────────────┤            │
        │  Bab 11 → Laboratorium    (playground)│            │
        └───────────────────────────────────────┘            │
```

---

## Detail Per Bab

### Bab 0 — Peta Perjalanan (Beranda)
**Tujuan:** Orientasi. User tahu apa yang akan dipelajari dan kenapa.
**Koneksi:** Ini titik awal. Semua bab berikutnya menjawab pertanyaan yang muncul di sini.

**Komponen:**
- Hero: "Dari nol sampai melatih AI sendiri"
- Peta visual interaktif (bisa klik tiap bab)
- Kamus istilah global
- Jalur cepat (4 bab = 80% intuisi)
- Jalur lengkap (semua 11 bab)

---

### Bab 1 — Satu Otak Kecil (Neuron)
**Tujuan:** Paham konsep neuron: menimbang petunjuk → keputusan.
**Misi Sari:** Semangka datang ratusan. Sari butuh cara cepat pilih yang matang tanpa mencicipi satu-satu.

**Konsep yang dibangun:**
- Input (petunjuk): bunyi tok-tok, garis kulit
- Weight (bobot): seberapa penting tiap petunjuk
- Bias (ambang): standar kelulusan
- Decision boundary: garis pemisah "matang" vs "mentah"
- Step function: YA atau TIDAK, tidak ada tengah-tengah

**Visualisasi:** Canvas dengan heatmap daerah keputusan + garis pemisah yang bisa diputar/geser.

**Koneksi ke Bab 2:** "Neuron kita kaku — cuma bisa YA/TIDAK. Bagaimana kalau Sari butuh 'hampir matang, cek besok'?"

---

### Bab 2 — Memberi Perasaan (Fungsi Aktivasi)
**Tujuan:** Paham kenapa mesin butuh non-linearitas dan jenis-jenis aktivasi.
**Misi Sari:** Pelanggan tanya "kira-kira matang nggak?" — Sari butuh jawaban bertingkat, bukan ya/tidak kaku.

**Konsep yang dibangun:**
- Step → terlalu kaku
- Sigmoid → halus 0-1, tapi saturasi di ujung
- Tanh → simetris -1 sampai 1
- ReLU → sederhana, populer, tidak saturasi di positif
- Gradien = kemiringan = kemampuan belajar

**Visualisasi:** Canvas kurva aktivasi + titik interaktif yang menunjukkan gradien.

**Koneksi ke Bab 3:** "Satu neuron cuma bisa garis lurus. Bagaimana kalau dunia tidak linear? Butuh tim!"

---

### Bab 3 — Kekuatan Tim (MLP / Deep Network)
**Tujuan:** Paham arsitektur jaringan: input → hidden layers → output, forward pass.
**Misi Sari:** Warung berkembang. Satu orang tidak cukup — butuh tim yang tiap orangnya menangani ciri berbeda.

**Konsep yang dibangun:**
- Layer (lapisan): input, hidden, output
- Neuron per layer: masing-masing menimbang ciri berbeda
- Forward pass: informasi mengalir kiri ke kanan
- Universal approximation: tim kecil bisa aproksimasi fungsi apapun (intuisi)
- Tanpa aktivasi = sia-sia (50 lapis linear = 1 lapis linear)

**Visualisasi:** SVG jaringan dengan animasi aliran data, warna koneksi = bobot.

**Koneksi ke Bab 4:** "Tim sudah bisa menebak. Tapi... tebakan itu bagus atau jelek? Tim butuh cermin."

---

### Bab 4 — Cermin Kebenaran (Loss Function)
**Tujuan:** Paham cara mengukur kesalahan: MSE untuk regresi, cross-entropy untuk klasifikasi.
**Misi Sari:** Si Cerdas mulai menebak-nebak. Sari butuh cara objektif menilai: "seberapa meleset tebakanmu?"

**Konsep yang dibangun:**
- Loss = skor meleset (0 = sempurna, makin besar makin buruk)
- MSE: kuadrat selisih — menghukum kesalahan besar
- Cross-entropy: −[y·log(ŷ) + (1-y)·log(1-ŷ)] — menghukum kepercayaan yang salah
- Mengapa CE lebih baik untuk klasifikasi (gradien tidak vanish saat salah total)

**Visualisasi:** Canvas kurva lembah loss + titik interaktif.

**Koneksi ke Bab 5:** "Sekarang Si Cerdas tahu seberapa salah. Tapi... cara memperbaikinya bagaimana? Like a ball rolling downhill."

---

### Bab 5 — Menuruni Bukit (Gradient Descent)
**Tujuan:** Paham cara optimasi: hitung gradien, melangkah ke arah turun.
**Misi Sari:** Si Cerdas tahu ia salah. Tapi "tahu salah" ≠ "tahu cara memperbaiki". Butuh strategi melangkah.

**Konsep yang dibangun:**
- Gradien = kemiringan = arah paling curam naik
- Melangkah ke arah berlawanan = turun
- Learning rate: panjang langkah (terlalu kecil = lama, terlalu besar = mental)
- Konvergensi vs divergensi
- Local minima vs global minima

**Visualisasi:** Canvas lembah 2D + bola + trail. 3 skenario wajib: LR kecil, sedang, besar.

**Koneksi ke Bab 6:** "Bola sudah bisa turun. Tapi tim punya banyak anggota — siapa yang harus berubah? Butuh evaluasi yang adil."

---

### Bab 6 — Evaluasi Bersama (Backpropagation)
**Tujuan:** Paham backprop: hitung kontribusi tiap neuron terhadap kesalahan, koreksi proporsional.
**Misi Sari:** Tim protes: "Kenapa yang disalahkan selalu ketua?" Evaluasi harus adil — tiap anggota dikoreksi sesuai andilnya.

**Konsep yang dibangun:**
- Chain rule (intuisi): "seberapa salah hasil kalau cara-ku digeser dikit?"
- 4 langkah: forward → loss → gradient → update
- Gradient flow: dari output ke input, tiap neuron mendapat porsi yang tepat
- Satu contoh bisa memperbaiki satu hal tapi merusak hal lain → butuh banyak contoh

**Visualisasi:** DOM 4 langkah interaktif + visualisasi gradient flow.

**Koneksi ke Bab 7:** "Si Cerdas sekarang bisa belajar dari data. Tapi ada jebakan: ia bisa jadi jago menghafal, bukan paham."

---

### Bab 7 — Hafal vs Paham (Overfitting & Regularization)
**Tujuan:** Paham overfitting, underfitting, dan cara mencegah.
**Misi Sari:** Nilai latihan Si Cerdas sempurna! Tapi pelanggan baru kecewa berat. Lulus latihan ≠ lulus kehidupan.

**Konsep yang dibangun:**
- Training data vs test data
- Underfit: terlalu sederhana, tidak menangkap pola
- Overfit: terlalu rumit, menghafal noise
- Sweet spot: kompleksitas yang pas
- Obat: lebih banyak data, model lebih sederhana, early stopping

**Visualisasi:** Canvas polynomial fitting dengan derajat 1-9, data noisy.

**Koneksi ke Bab 8:** "Dasar sudah kuat. Sekarang saatnya memberi Si Cerdas indra khusus — mulai dari mata."

---

### Bab 8 — Mata Digital (CNN)
**Tujuan:** Paham konvolusi: filter meraba gambar, feature map menyimpan temuan.
**Misi Sari:** Selama ini Sari yang menyuapi angka ke Si Cerdas. "Kapan kamu bisa melihat foto sendiri?"

**Konsep yang dibangun:**
- Filter/kernel: pola kecil 3×3 yang meraba gambar
- Feature map: hasil konvolusi — peta temuan
- ReLU setelah konvolusi: buang negatif, simpan positif
- Max pooling: rangkum区域, ambil yang paling kuat
- Stack berlapis: garis → bentuk → objek

**Visualisasi:** Grid 5×5 yang bisa diklik + filter selector + heatmap feature map + pooling.

**Koneksi ke Bab 9:** "CNN jago melihat foto — tapi foto itu statis. Dunia nyata bergerak: kemarin sepi, hari ini ramai. Butuh ingatan."

---

### Bab 9 — Ingatan Berantai (RNN/LSTM)
**Tujuan:** Paham RNN: hidden state sebagai catatan yang diupdate tiap langkah waktu.
**Misi Sari:** Warung hidup dalam waktu. Stok kemarin mempengaruhi hari ini. Foto tidak bisa menangkap waktu.

**Konsep yang dibangun:**
- Sequential data: urutan matters
- Hidden state: catatan kecil yang diupdate tiap langkah
- h_t = tanh(W·h_{t-1} + U·x_t)
- Vanishing gradient: catatan lama memudar
- LSTM (intuisi): gerbang yang memilih apa disimpan/dilupakan

**Visualisasi:** Canvas grafik hidden state evolution + sequence chips.

**Koneksi ke Bab 10:** "Catatan kecil RNN punya batas. Untuk chat panjang pelanggan, Si Cerdas butuh cara mendengarkan yang lebih cerdas."

---

### Bab 10 — Seni Mendengarkan (Attention/Transformer)
**Tujuan:** Paham self-attention: tiap kata memilih siapa yang didengarkan.
**Misi Sari:** Pelanggan chat: "Kucing mengejar tikus karena ia lapar." Siapa "ia"? Catatan kecil RNN bingung. Attention tidak.

**Konsep yang dibangun:**
- Self-attention: tiap token bertanya "siapa yang relevan?"
- Query, Key, Value: penanya, yang dinilai, isi yang dikirim
- Softmax: perhatian dibagi 100%
- Transformer: banyak "rapat" attention sekaligus, paralel
- Positional encoding: urutan matters (intuisi)

**Visualisasi:** Heatmap attention matrix + clickable words.

**Koneksi ke Bab 11:** "Semua keping sudah di tangan. Saatnya membuktikan: latih AI sungguhan dengan tanganmu sendiri."

---

### Bab 11 — Laboratorium (Training Playground)
**Tujuan:** Semua konsep digabung. Latih neural network sungguhan di browser.
**Misi Sari:** Ujian kelulusan. Buktikan Si Cerdas (dan kamu) siap.

**Misi berjenjang:**
1. **Mudah:** Dataset XOR, hidden 4 → harus konvergen
2. **Menengah:** Dataset circle, hidden 0 vs 4 → bukti butuh non-linear
3. **Sulit:** Dataset spiral, hidden 8+4 → butuh kesabaran + tuning
4. **Bebas:** Eksperimen sendiri

**Visualisasi:** Canvas decision boundary real-time + loss chart + kontrol lengkap.

---

## Sistem Gamifikasi

### XP & Level
| Level | Nama | XP Required | Maskot |
|-------|------|-------------|--------|
| 0 | Bibit | 0 | Robot kecil, antena pendek |
| 1 | Tunas | 150 | Antena lebih panjang, bola di ujung |
| 2 | Anak | 400 | Senyum, pipi merah |
| 3 | Remaja | 700 | Bintang di dada |
| 4 | Dewasa | 1100 | Toga wisuda |
| 5 | Master | 1500 | Mahkota + aura |

### XP Sources
- Selesaikan bab: +100 XP
- Kuis benar pertama kali: +25 XP per soal
- Total maksimal: 12×100 + 24×25 = 1800 XP

### Badge / Kemampuan
Tiap bab selesai = 1 kemampuan terbuka:
1. 🔓 Menimbang (bab 1)
2. 🔓 Merasakan (bab 2)
3. 🔓 Bekerja Tim (bab 3)
4. 🔓 Berkaca (bab 4)
5. 🔓 Melangkah (bab 5)
6. 🔓 Evaluasi (bab 6)
7. 🔓 Jujur (bab 7)
8. 🔓 Melihat (bab 8)
9. 🔓 Mengingat (bab 9)
10. 🔓 Mendengar (bab 10)
11. 🔓 Melatih (bab 11)

---

## Standar Bahasa

### Prinsip
- Bahasa Indonesia sebagai bahasa utama
- Istilah Inggris yang sudah hidup dipakai langsung (tidak diterjemahkan)
- Setiap istilah baru diperkenalkan dengan konteks yang jelas

### Kamus Istilah (wajib ada di beranda + kotak istilah per bab)

| Tulis ini | Jangan tulis ini |
|-----------|-----------------|
| bobot (weight) | "w" saja tanpa penjelasan |
| bias | "standar kelulusan" sebagai istilah utama |
| loss | "kemelesetan" atau terjemahan aneh |
| learning rate | "lr" saja tanpa arti |
| epoch | "putaran" saja tanpa istilah asli |
| akurasi | "accuracy" saja |
| data latih / data uji | "train/test" saja |
| hidden layer | "lapisan tersembunyi" (terlalu formal) |
| filter | "penyaring" atau "bingkai peraba" |
| feature map | "peta ciri" (bisa, tapi feature map lebih umum) |
| overfitting | "terlalu menghafal" |

### Aturan Penulisan
1. Istilah Inggris pertama kali muncul: `istilah (English term)`
2. Selanjutnya: cukup `istilah` saja
3. Rumus: selalu dalam collapsible `<details>`, bukan di teks utama
4. Teks hasil visual: kalimat biasa dulu, angka belakangan
