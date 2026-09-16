# PRD — Website Visualisasi Deep Learning untuk Pemula

**Nama Proyek:** Deep Learning Visualization (DL-Viz)
**Lokasi:** `D:\Coding\deep-learning-visualization`
**Versi:** 1.0.0
**Tanggal:** 16 Sep 2026
**Bahasa:** Bahasa Indonesia
**Target:** Pemula / awam, pelajar SMA-kuliah, guru, otodidak

## 1. Latar Belakang & Masalah
Kebanyakan materi deep learning berupa rumus (∑, ∂, matriks) tanpa gambaran intuitif. Pemula kesulitan membayangkan:
- Apa itu neuron, bobot, bias, aktivasi?
- Bagaimana data mengalir (forward) dan belajar (backward)?
- Apa itu loss, gradient descent, overfitting?
- Bagaimana CNN "melihat" gambar? Bagaimana Transformer "memperhatikan" kata?

## 2. Tujuan Produk
Membuat website edukasi interaktif yang:
1. **Tergambar:** setiap konsep ada visual SVG/Canvas animasi.
2. **Logis:** alur belajar berurutan dari neuron → jaringan → training → arsitektur modern.
3. **Intuitif:** analogi sehari-hari (keran air, lampu, resep masakan, tebak-tebakan).
4. **Jelas & lengkap:** 11 modul mencakup 90% konsep inti deep learning pemula.
5. **Bisa diatur/diubah:** semua visual punya slider, tombol, input yang mengubah hasil real-time.
6. **Contoh + konfigurasi bebas:** ada preset contoh + mode bebas + playground klasifikasi 2D.

## 3. Pengguna
| Persona | Kebutuhan |
|---|---|
| Andi (SMA, awam coding) | Klik-klik, geser slider, langsung paham tanpa rumus berat |
| Sari (mahasiswa non-informatika) | Butuh intuisi + istilah + contoh untuk tugas |
| Budi (otodidak ngoding) | Butuh playground untuk coba arsitektur & hyperparameter |

Prinsip: **tidak perlu install, tidak perlu coding untuk mulai.** Cukup buka `index.html`.

## 4. Ruang Lingkup (Scope)
### In-Scope v1.0
- 11 modul belajar (lihat LEARNING_PATH.md)
- Setiap modul: Penjelasan 3 level (Analogi → Cara kerja → Intuisi matematis ringan), Visual interaktif, Kontrol, Contoh preset, Mini-kuis refleksi, Istilah kunci
- Playground klasifikasi 2D (dataset lingkaran, spiral, XOR, gaussian) dengan MLP yang bisa dilatih di browser
- 100% statis: HTML + CSS + Vanilla JS, tanpa build, tanpa npm, bisa offline
- Responsif (HP & laptop), dark/light mode, Bahasa Indonesia
- Progress belajar tersimpan di localStorage

### Out-of-Scope v1.0
- Backend, login, database
- Training model besar / GPU / Python
- Video / audio narasi

## 5. Persyaratan Fungsional
- FR1: Navigasi sidebar + routing hash (`#neuron`, `#aktivasi`, dst) + tombol next/prev
- FR2: Setiap visual merespon <100ms setelah slider diubah
- FR3: Playground: user bisa pilih dataset, learning rate, hidden layer, aktivasi, lalu tekan Latih/Reset/Step dan melihat loss turun + decision boundary live
- FR4: Mode terang/gelap + ukuran teks + kecepatan animasi bisa diatur
- FR5: Kuis cek-paham per modul (pilihan ganda, feedback langsung, tanpa nilai server)
- FR6: Tombol "Salin konfigurasi" (JSON) dan "Muat ulang contoh"

## 6. Persyaratan Non-Fungsional
- NFR1: Buka dengan double-click `index.html` tanpa server (fallback) — disarankan via Live Server / `npx serve`
- NFR2: Total < 2MB, load < 2 detik di laptop standar
- NFR3: Aksesibilitas: label pada semua kontrol, kontras cukup, bisa keyboard (tab)
- NFR4: Kode mudah dibaca pemula: komentar Indonesia, fungsi kecil, file per topik

## 7. Struktur Modul (ringkas)
1. Beranda & Peta Belajar
2. Neuron & Perceptron (`z = w·x + b`, threshold)
3. Fungsi Aktivasi (sigmoid, tanh, ReLU, softmax — grafik interaktif)
4. Jaringan MLP & Forward Pass (aliran data animasi)
5. Loss Function (MSE, Cross-Entropy — titik tebakan vs target)
6. Gradient Descent (bola menggelinding di lembah loss)
7. Backpropagation (aliran error mundur, update bobot)
8. Overfitting & Regularisasi (polinomial vs generalisasi)
9. CNN (konvolusi, filter, pooling — editor matriks 5x5)
10. RNN/LSTM (memori sekuens, prediksi kata/angka)
11. Transformer & Attention (bobot perhatian antar kata)
12. Playground Klasifikasi 2D (mini TensorFlow Playground)

Detail kurikulum: lihat `LEARNING_PATH.md`.

## 8. Kriteria Keberhasilan
- [ ] Semua 11 visual berjalan tanpa error di Chrome & Edge terbaru
- [ ] User awam bisa menjawab 80% kuis setelah mencoba slider (uji manual 3 orang)
- [ ] File bisa dibuka via `file://` maupun `http://localhost`
- [ ] Tidak ada dependensi eksternal wajib (CDN opsional = nol)

## 9. Risiko & Mitigasi
| Risiko | Mitigasi |
|---|---|
| JS terlalu berat | Vanilla + Canvas, tanpa library |
| User bingung rumus | Rumus selalu disertai slider + analogi |
| Tidak bisa buka karena CORS/module | Pakai `<script>` biasa, bukan ES module |

## 10. Tahapan Pengerjaan
1. Dokumen (PRD, Arsitektur, AGENTS, Learning Path) ✅ tahap ini
2. Kerangka (index.html + style.css + app.js)
3. Visual inti (neuron → backprop)
4. Visual lanjutan (overfit → playground)
5. Verifikasi buka lokal + checklist PRD
