# PRD — Website Visualisasi Deep Learning untuk Pemula

**Nama Proyek:** Misi Si Cerdas (DL-Viz)
**Lokasi:** `D:\Coding\deep-learning-visualization`
**Live:** https://naufalrama28.github.io/deep-learning-visualization/
**Versi:** 2.0.0 (rework: narasi Sari + XP + analis HOTS + istilah wajar)
**Tanggal:** 23 Sep 2026
**Bahasa:** Indonesia + istilah Inggris yang hidup (loss, epoch, dataset…), tanpa terjemahan aneh
**Target:** Orang awam total yang ingin jadi master — pelajar, guru, otodidak

## 1. Latar Belakang & Masalah
Kebanyakan materi deep learning berupa rumus (∑, ∂, matriks) tanpa gambaran intuitif. Pemula kesulitan membayangkan:
- Bagaimana mesin menimbang petunjuk lalu memutuskan (bobot, bias, aktivasi)?
- Bagaimana tebakan diukur lalu diperbaiki berulang (skor meleset, langkah belajar, evaluasi mundur)?
- Bagaimana komputer "melihat" gambar, "mengingat" urutan, "memilih" kata yang didengarkan?

## 2. Tujuan Produk
Membuat website edukasi interaktif yang:
1. **Bercerita bersambung:** Sari + Si Cerdas, 11 misi berantai; tiap misi dibuka kilasan misi lalu.
2. **Tergambar:** setiap konsep ada visual SVG/Canvas yang dimainkan lewat 3 langkah + tantangan tebak-dulu.
3. **Melatih nalar:** tiap misi ada soal analis HOTS aplikatif + jawaban model (bukan sekadar ingatan).
4. **Jujur beristilah:** istilah hidup dipakai langsung (loss, epoch…), selalu ada artinya di kamus/kotak istilah.
5. **Memotivasi:** XP (+100 misi, +25 kuis), 6 level maskot Si Cerdas, 11 lencana kemampuan.
6. **Bisa diatur/diubah:** semua visual real-time + Reset; latihan nyata melatih jaringan sungguhan.

Standar bahasa (wajib): Indonesia dulu, istilah Inggris di kurung saat pertama muncul
(bobot, standar kelulusan, skor meleset, panjang langkah, putaran latihan, ketepatan,
menghafal/kurang belajar, bingkai peraba, peta temuan, peta ringkas, catatan, perhatian).
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
- Setiap misi: Kilasan → Cerita Sari 30 detik → Panduan 3 langkah → Tantangan tebak-dulu → Visual interaktif → Soal analis HOTS + jawaban model → Hitungan lipat (opsional) → Kesimpulan 1 kalimat → Kotak istilah resmi → Kuis (+XP)
- Latihan nyata (bentuk soal lingkaran, silang, spiral, dua kelompok) dengan jaringan yang dilatih di browser
- 100% statis: HTML + CSS + Vanilla JS, tanpa build, tanpa npm, bisa offline
- Responsif (HP & laptop), dark/light mode, Bahasa Indonesia, kecepatan animasi bisa diatur
- Progress belajar tersimpan di localStorage

### Out-of-Scope v1.0
- Backend, login, database
- Training model besar / GPU / Python
- Video / audio narasi

## 5. Persyaratan Fungsional
- FR1: Navigasi sidebar berkelompok + routing hash + tombol kembali/lanjut otomatis
- FR2: Setiap visual merespon <100ms + tombol Reset per misi
- FR3: Latihan nyata: dataset, learning rate (default 0.5 — teruji konvergen), hidden layer, aktivasi; Latih/Stop/+50/Acak/Dataset-baru; boundary + grafik loss live
- FR4: Mode terang/gelap + kecepatan animasi; hormat prefers-reduced-motion
- FR5: Kuis (+25 XP jawaban benar pertama) + soal analis HOTS + jawaban model per misi
- FR6: XP/level/maskot/11 lencana tersimpan (localStorage ganda: progress + xp); Reset menghapus semua

## 6. Persyaratan Non-Fungsional
- NFR1: Buka dengan double-click `index.html` tanpa server (fallback) — disarankan via Live Server / `npx serve`
- NFR2: Total < 2MB, load < 2 detik di laptop standar
- NFR3: Aksesibilitas: label pada semua kontrol, kontras cukup, bisa keyboard (tab)
- NFR4: Kode mudah dibaca pemula: komentar Indonesia, fungsi kecil, file per topik

## 7. Struktur Modul (ringkas — nama ramah di website, istilah resmi di kurung)
1. Beranda & Peta Belajar (+ kamus 1 menit, jalur super awam)
2. Misi 1 Otak Mini — perceptron (bobot, bias, decision boundary)
3. Misi 2 Lampu Keyakinan — aktivasi (step, sigmoid, tanh, ReLU)
4. Misi 3 Tim Peringkas — MLP (hidden layer, forward pass)
5. Misi 4 Cermin — loss (MSE, cross-entropy, target, prediksi)
6. Misi 5 Menuruni Lembah — gradient descent (learning rate, divergen)
7. Misi 6 Evaluasi Adil — backprop (backward pass, chain rule, 4 langkah)
8. Misi 7 Jangan Menghafal — overfitting (data latih vs data uji)
9. Misi 8 Mata — CNN (filter, feature map, pooling)
10. Misi 9 Ingatan — RNN (hidden state; LSTM)
11. Misi 10 Telinga — attention/Transformer (query/key/value)
12. Misi 11 Ujian Kelulusan — latih jaringan sungguhan (dataset, epoch, akurasi)

Detail kurikulum: lihat `LEARNING_PATH.md`.

## 8. Kriteria Keberhasilan
- [ ] 41 cek otomatis lolos (router, XP/maskot, semua visual, training 400 epoch konvergen)
- [ ] `python tools/audit-bahasa.py` LOLOS (tanpa coinage aneh, struktur 11 misi utuh)
- [ ] Orang non-komputer menjawab 80% kuis + 60% soal analis setelah mengikuti misi (uji 3 orang)
- [ ] File dibuka via `file://`, `localhost`, maupun Pages tanpa error
- [ ] Nol dependensi eksternal (CDN = nol; font sistem saja)

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
