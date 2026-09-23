# LEARNING_PATH.md — 11 Misi Merakit Si Cerdas (Warung Sari)

> Kamu = insinyur magang Sari. Si Cerdas mulai dari NOL (Level 0 • Bibit).
> Tiap misi: **kilasan → briefing 30 detik → 3 langkah main → tantangan → soal analis → kesimpulan → istilah resmi → kuis → klaim XP.**
> Misi tuntas = +100 XP + 1 kemampuan terbuka. Kuis benar = +25 XP.
> Level: Bibit → Tunas → Anak → Remaja → Dewasa → Master.

## 🚀 Jalur cepat (4 misi = 80% intuisi)
1. Otak Mini → 4. Cermin → 5. Menuruni Lembah → 11. Ujian Kelulusan.

## Misi 1 — Otak Mini: pasang sel otak pertama (10 mnt)
- **Misi Sari:** warung kebanjiran semangka; Sari tak sempat mencicipi satu-satu.
- **Mainkan:** geser bobot → garis berputar; geser bias → garis bergeser; preset AND/OR.
- **Analis:** pintu gudang AND + sensor mati — siapa lolos? pelajaran redundansi.
- **Kesimpulan:** neuron menimbang petunjuk, totalnya menentukan YA/BELUM.
- **Istilah:** neuron, perceptron, weight (bobot), bias, decision boundary, gerbang AND/OR.
- **Kemampuan terbuka:** 🔓 Menimbang.

## Misi 2 — Lampu Keyakinan: beri perasaan bertingkat (8 mnt)
- **Misi Sari:** "hampir matang, cek besok" tak bisa diwakili YA/BELUM kaku.
- **Mainkan:** Si Cuek vs Si Lembut; cari titik "macet" di ujung sigmoid.
- **Analis:** alarm peringatan dini pilih siapa? kapan Si Tegas lebih tepat?
- **Kesimpulan:** tanpa aktivasi, mesin sedalam apa pun cuma garis lurus.
- **Istilah:** fungsi aktivasi, step/threshold, sigmoid, tanh, ReLU, gradien, saturasi.

## Misi 3 — Tim Peringkas: dari 1 otak ke jaringan (10 mnt)
- **Misi Sari:** 2 petunjuk tak cukup; warung butuh banyak ciri sekaligus.
- **Mainkan:** geser ciri → tebakan mengalir; acak 5× → keputusan goyang.
- **Analis:** 50 lapis tanpa aktivasi — kenapa uang komputasi terbuang?
- **Kesimpulan:** jaringan = estafet peringkas, makin lapis makin abstrak.
- **Istilah:** MLP, layer, hidden layer, forward pass, output.

## Misi 4 — Cermin: nilai kesalahan sendiri (8 mnt)
- **Misi Sari:** "tebakanmu bagus atau tidak?" — Si Cerdas terdiam.
- **Mainkan:** geser tebakan ke jawaban → loss turun; salah-tapi-pede dihukum berat.
- **Analis:** model A stabil vs model B kadang fatal — MSE pilih siapa? adilkah?
- **Kesimpulan:** belajar = mengecilkan loss terus-menerus.
- **Istilah:** loss, MSE, cross-entropy, target, prediksi.

## Misi 5 — Menuruni Lembah: seni memperbaiki diri (10 mnt)
- **Misi Sari:** "kamu tahu salah — cara membetulkannya bagaimana?"
- **Mainkan (wajib 3×):** langkah sedang → sampai; kecil → lama; raksasa → kabur. 💥
- **Analis:** prediksi akibat learning rate raksasa + taktik penyelamatan.
- **Kesimpulan:** intip kemiringan (gradien), melangkah turun sedikit-sedikit.
- **Istilah:** gradient descent, learning rate, gradien, divergen.

## Misi 6 — Evaluasi Adil: koreksi seluruh tim (12 mnt)
- **Misi Sari:** tim protes — yang disalahkan kok selalu ketua?
- **Mainkan:** 4 langkah × 2–3 putaran → loss mengecil; ubah input → pelaku berubah.
- **Analis:** contoh X membaik tapi Y memburuk — rusak atau normal?
- **Kesimpulan:** backprop = salahkan adil ke belakang, koreksi sedikit-sedikit.
- **Istilah:** backpropagation, backward pass, update, chain rule.

## Misi 7 — Jangan Menghafal: jebakan nilai sempurna (10 mnt)
- **Misi Sari:** nilai latihan 100, pelanggan baru kecewa — lulus latihan ≠ lulus hidup.
- **Mainkan:** derajat 1 → kaku; 3–4 → pas ✅; 9 → meliuk gila 🤯.
- **Analis:** tolak usul "tambah 200 lapis"; beri 3 obat + alasan.
- **Kesimpulan:** yang penting nilai di data yang belum pernah dilihat.
- **Istilah:** overfitting, underfitting, generalisasi, training/test data, derajat polinomial.

## Misi 8 — Mata: melihat foto struk (12 mnt)
- **Misi Sari:** berhenti menyuapi angka — Si Cerdas harus melihat sendiri.
- **Mainkan:** gambar X + filter tepi; gambar huruf T sendiri; bandingkan filter.
- **Analis:** foto miring 45° — filter tegak gagal? solusi dunia nyata?
- **Kesimpulan:** raba tiap sudut pola kecil, rangkum berlapis-lapis.
- **Istilah:** CNN, konvolusi, filter/kernel, feature map, max-pooling.

## Misi 9 — Ingatan: hidup dalam waktu (10 mnt)
- **Misi Sari:** kemarin sepi, hari ini ramai — besok stok apa? Foto tak menjawabnya.
- **Mainkan:** mainkan urutan; daya ingat 0 → amnesia; 9,9,9,0 → anjlok.
- **Analis:** ramal 365 hari dengan catatan kecil — 2 risiko + kapan cukup?
- **Kesimpulan:** mesin urutan = pembawa catatan yang diupdate tiap kejadian.
- **Istilah:** RNN, sequence, hidden state, LSTM.

## Misi 10 — Telinga: mendengar yang tepat (12 mnt)
- **Misi Sari:** chat pelanggan panjang — catatan kecil kebingungan.
- **Mainkan:** klik "ia" → siapa paling pekat? uji "bank" di dua kalimat.
- **Analis:** "harga tempe kemarin vs hari ini" — akibat salah dengar + cara menguji.
- **Kesimpulan:** attention = tiap kata memilih yang didengarkan.
- **Istilah:** attention, query/key/value, softmax, Transformer.

## Misi 11 — Ujian Kelulusan: latih AI sungguhan 🎮 (20 mnt)
- **Misi Sari:** semua keping di tangan — buktikan dengan melatih sendiri.
- **Misi 1:** XOR, hidden 4 → ~15 detik rapi. **Misi 2:** lingkaran, hidden 0 → GAGAL; 4 → BERHASIL.
- **Misi 3 (bos 🌀):** spiral 8+4; mentok ~65%? acak ulang (nasib init kadang apes).
- **Analis (ujian kelulusan):** spiral 100% latih / 70% uji — diagnosis + rencana + kapan berhenti.
- **Kesimpulan:** soal melengkung butuh hidden layer — garis lurus takkan cukup.
- **Istilah:** dataset, hidden neuron, decision boundary, epoch, akurasi.
- **Kemampuan terbuka:** 🔓 Kemandirian. Si Cerdas lulus — level Master di depan mata.

## Kuis Akhir (jawab dengan kata-katamu, lalu cek ke Sari)
1. Jelaskan ke Sari: apa yang dilakukan satu perceptron?
2. Kenapa 50 lapis tanpa aktivasi = buang uang?
3. Apa yang diperkecil saat training, dan bagaimana cara menurunkannya?
4. Bedakan menghafal vs paham — untuk mesin DAN untukmu.
5. Kenapa foto butuh filter, urutan butuh ingatan, chat butuh attention?
6. Kapan kamu berhenti melatih model? (Jawaban "saat latih 100%" = belum lulus!)
