# PRD — Website Visualisasi Deep Learning untuk Pemula

**Nama Proyek:** Deep Learning Visualization (DL-Viz)
**Lokasi:** `D:\Coding\deep-learning-visualization`
**Live:** https://naufalrama28.github.io/deep-learning-visualization/
**Versi:** 1.1.0 (edisi bahasa super awam)
**Tanggal:** 16 Sep 2026
**Bahasa:** Bahasa Indonesia (istilah Inggris selalu diterjemahkan saat pertama muncul)
**Target:** Orang awam/non-komputer, pelajar SMA-kuliah, guru, otodidak

## 1. Latar Belakang & Masalah
Kebanyakan materi deep learning berupa rumus (∑, ∂, matriks) tanpa gambaran intuitif. Pemula kesulitan membayangkan:
- Bagaimana mesin menimbang petunjuk lalu memutuskan (bobot, bias, aktivasi)?
- Bagaimana tebakan diukur lalu diperbaiki berulang (skor meleset, langkah belajar, evaluasi mundur)?
- Bagaimana komputer "melihat" gambar, "mengingat" urutan, "memilih" kata yang didengarkan?

## 2. Tujuan Produk
Membuat website edukasi interaktif yang:
1. **Bercerita dulu:** tiap konsep dibuka analogi 30 detik dari kehidupan sehari-hari.
2. **Tergambar:** setiap konsep ada visual SVG/Canvas yang dimainkan lewat 3 langkah panduan.
3. **Tanpa paksaan rumus:** hitungan disembunyikan di kotak lipat; pemahaman tidak bergantung padanya.
4. **Jelas & lengkap:** 11 modul + 1 latihan nyata, tiap modul ditutup 1 kalimat kesimpulan.
5. **Bisa diatur/diubah:** semua visual punya slider, tombol, input yang mengubah hasil real-time + tombol Reset.
6. **Contoh + konfigurasi bebas:** ada preset contoh + mode bebas + latihan melatih jaringan sungguhan.

Standar bahasa (wajib): Indonesia dulu, istilah Inggris di kurung saat pertama muncul
(bobot, standar kelulusan, skor meleset, panjang langkah, putaran latihan, ketepatan,
menghafal/kurang belajar, kacamata peraba, peta temuan, catatan, perhatian).
Detail di `AGENTS.md` §5 + kamus di `README.md`.

## 3. Pengguna
| Persona | Kebutuhan |
|---|---|
| Andi (SMA, bukan anak komputer) | Cerita + geser tombol, langsung paham tanpa rumus & coding |
| Sari (mahasiswa non-informatika) | Intuisi + istilah terjemahan + 1 kalimat kesimpulan untuk tugas |
| Budi (otodidak ngoding) | Latihan nyata untuk coba susunan tim & panjang langkah |

Prinsip: **tidak perlu install, tidak perlu coding untuk mulai.** Cukup buka `index.html`.

## 4. Ruang Lingkup (Scope)
### In-Scope v1.1
- 11 modul belajar + 1 latihan nyata (lihat LEARNING_PATH.md)
- Setiap modul: Cerita 30 detik → Panduan main gambar 3 langkah → Visual interaktif → Kotak hitungan lipat (opsional) → 1 kalimat kesimpulan → Kuis cerita → Istilah kunci terjemahan
- Latihan nyata (bentuk soal lingkaran, silang, spiral, dua kelompok) dengan jaringan yang dilatih di browser
- 100% statis: HTML + CSS + Vanilla JS, tanpa build, tanpa npm, bisa offline
- Responsif (HP & laptop), dark/light mode, Bahasa Indonesia, kecepatan animasi bisa diatur
- Progress belajar tersimpan di localStorage

### Out-of-Scope v1.0
- Backend, login, database
- Training model besar / GPU / Python
- Video / audio narasi

## 5. Persyaratan Fungsional
- FR1: Navigasi sidebar + routing hash (`#neuron`, `#cnn`, dst) + tombol next/prev
- FR2: Setiap visual merespon <100ms setelah slider diubah + tombol Reset per modul
- FR3: Latihan nyata: user bisa pilih bentuk soal, panjang langkah, susunan tim, gaya tim, lalu tekan Latih/Stop/+50/Acak/Soal baru dan melihat batas warna + grafik skor meleset live
- FR4: Mode terang/gelap + kecepatan animasi bisa diatur
- FR5: Kuis cek-paham per modul (pilihan ganda bahasa cerita, feedback langsung, tanpa nilai server)

## 6. Persyaratan Non-Fungsional
- NFR1: Buka dengan double-click `index.html` tanpa server (fallback) — disarankan via Live Server / `npx serve`
- NFR2: Total < 2MB, load < 2 detik di laptop standar
- NFR3: Aksesibilitas: label pada semua kontrol, kontras cukup, bisa keyboard (tab)
- NFR4: Kode mudah dibaca pemula: komentar Indonesia, fungsi kecil, file per topik

## 7. Struktur Modul (ringkas — nama ramah di website, istilah resmi di kurung)
1. Beranda & Peta Belajar (+ kamus 1 menit, jalur super awam)
2. Otak Mini — neuron (menimbang petunjuk, standar kelulusan)
3. Kapan Lampu Menyala — aktivasi (Si Tegas/Lembut/Cuek/Seimbang)
4. Kerja Tim Berlapis — jaringan (mengoper ringkasan)
5. Seberapa Meleset? — skor meleset (tebakan vs jawaban)
6. Bola ke Lembah — langkah belajar (panjang langkah kecil vs nekat)
7. Evaluasi Tim — backprop (bagi salah ke belakang, 4 langkah)
8. Hafalan vs Paham — overfitting (soal latihan vs soal ujian)
9. Mata Komputer — CNN (kacamata peraba, peta temuan, hasil remasan)
10. Daya Ingat — RNN (catatan untuk urutan; LSTM = penghapus selektif)
11. Rapat Kata — attention/Transformer (tiap kata memilih yang didengarkan)
12. Latihan Nyata — latih jaringan sungguhan (lingkaran, silang, spiral)

Detail kurikulum: lihat `LEARNING_PATH.md`.

## 8. Kriteria Keberhasilan
- [ ] Semua 11 visual + latihan nyata berjalan tanpa error di Chrome & Edge terbaru
- [ ] Orang non-komputer bisa menjawab 80% kuis setelah mengikuti panduan 3 langkah (uji manual 3 orang)
- [ ] Tidak ada istilah Inggris yang muncul tanpa terjemahan di teks utama (hitungan boleh, karena di kotak lipat)
- [ ] File bisa dibuka via `file://` maupun `http://localhost` maupun Pages
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
