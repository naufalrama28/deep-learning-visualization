# LEARNING_PATH.md — Jalur Belajar Lengkap (Pemula → Paham Intuisi)

> Cara pakai: ikuti urutan 1→12. Tiap modul 10–15 menit: baca analogi → geser slider → jawab kuis → klik "Tandai selesai".

## Modul 1 — Beranda & Peta Belajar
- **Tujuan:** tahu peta 11 konsep + cara pakai website.
- **Analogi:** peta wisata — kamu tahu dulu mau ke mana.
- **Eksperimen:** klik tiap kartu modul, lihat estimasi waktu.

## Modul 2 — Neuron & Perceptron ⭐ mulai di sini jika nol
- **Analogi:** neuron = keran + timbangan. Input = air masuk, bobot = seberapa dibuka keran, bias = dorongan awal, aktivasi = lampu on/off.
- **Rumus:** `z = w₁x₁ + w₂x₂ + b`, `y = 1 jika z>0 else 0`
- **Coba:** geser `w1`, `w2`, `b`. Amati garis batas keputusan berputar/bergeser.
- **Contoh preset:** GERBANG AND, OR.
- **Istilah:** bobot (weight), bias, weighted sum, threshold.

## Modul 3 — Fungsi Aktivasi
- **Analogi:** aktivasi = aturan "kapan lampu menyala" — tegas (step), lembut (sigmoid), cuek-negatif (ReLU).
- **Coba:** geser titik input `x`, ganti fungsi, lihat kemiringan (gradien).
- **Kenapa penting:** tanpa aktivasi non-linear, jaringan dalam = cuma garis lurus.
- **Istilah:** sigmoid, tanh, ReLU, softmax, gradien, saturasi.

## Modul 4 — Jaringan MLP & Forward Pass
- **Analogi:** estafet — tiap lapisan mengoper "ringkasan" ke lapisan berikut.
- **Coba:** ubah input, lihat angka mengalir lapis demi lapis + animasi.
- **Istilah:** layer, hidden layer, forward propagation.

## Modul 5 — Loss Function (Fungsi Rugi)
- **Analogi:** papan dart — loss = jarak dari bullseye.
- **Rumus:** MSE `L=(y−ŷ)²`, Cross-Entropy `L=−[y log ŷ + (1−y)log(1−ŷ)]`
- **Coba:** geser tebakan model, lihat loss membesar/mengecil.
- **Istilah:** target, prediksi, MSE, cross-entropy.

## Modul 6 — Gradient Descent
- **Analogi:** bola menggelinding ke lembah dalam kabut — hanya bisa rasakan kemiringan di kaki.
- **Rumus:** `w_baru = w_lama − lr × gradien`
- **Coba:** ubah learning rate kecil/besar, lihat bola meluncur pelan vs mental.
- **Istilah:** gradien, learning rate, epoch, overshoot, divergen.

## Modul 7 — Backpropagation
- **Analogi:** evaluasi tim — siapa paling bersalah atas kekalahan? Kesalahan dibagi ke belakang.
- **Coba:** tekan Langkah 1→4, lihat error mengalir mundur & bobot dikoreksi.
- **Istilah:** chain rule, backward pass, update.

## Modul 8 — Overfitting & Regularisasi
- **Analogi:** siswa menghafal soal vs paham konsep. Hafal = nilai latihan 100, ujian anjlok.
- **Coba:** naikkan "kerumitan model" (degree), lihat kurva meliuk menghafal noise.
- **Istilah:** overfitting, underfitting, generalisasi, train/test split.

## Modul 9 — CNN (Mata Komputer)
- **Analogi:** senter + stensil — filter menggeser dan bertanya "ada garis di sini?".
- **Coba:** pilih filter (tepi, blur, custom), ubah gambar input 5×5, lihat feature map + pooling.
- **Istilah:** konvolusi, kernel/filter, stride, pooling, feature map.

## Modul 10 — RNN / LSTM (Ingatan Urutan)
- **Analogi:** papan tulis kecil yang dibawa tiap langkah — ingat ringkasan masa lalu.
- **Rumus:** `h_t = tanh(W·h_{t-1} + U·x_t)`
- **Coba:** tekan Next Step, lihat memori berubah saat urutan angka/kata masuk.
- **Istilah:** sequence, hidden state, memori jangka pendek.

## Modul 11 — Transformer & Attention
- **Analogi:** rapat — tiap kata bertanya "saya harus dengarkan siapa?".
- **Rumus:** `Attention = softmax(QKᵀ/√d)·V`
- **Coba:** klik kata, lihat bobot perhatian ke kata lain menyala.
- **Istilah:** query/key/value, attention weight, softmax.

## Modul 12 — Playground Klasifikasi 2D 🎮
- **Misi:** latih jaringan sungguhan di browser. Pilih dataset (lingkaran/XOR/spiral), atur hidden layer & learning rate, tekan Latih.
- **Target paham:** kenapa hidden layer + aktivasi non-linear bisa selesaikan data melengkung; kenapa learning rate terlalu besar gagal.
- **Tantangan:** (1) Selesaikan XOR dengan 4 hidden neuron. (2) Selesaikan spiral dengan 8 neuron + tanh. (3) Buat overfitting dengan noise tinggi.

## Kuis Akhir (cek diri, jawab jujur)
1. Apa beda bobot dan bias?
2. Kenapa butuh ReLU/sigmoid?
3. Apa yang diminimalkan loss?
4. Apa yang dilakukan gradient descent dalam 1 kalimat?
5. Kenapa CNN cocok untuk gambar?
