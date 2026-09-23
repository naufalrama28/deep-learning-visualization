# MASTER PROMPT — Neural Lab: Deep Learning Interaktif (Fresh Start Total)

## INSTRUKSI UTAMA

**HAPUS SEMUA FILE YANG ADA.** Mulai dari nol total. Jangan pertahankan apapun dari versi sebelumnya — tidak ada konten, tidak ada struktur, tidak ada kode, tidak ada desain. Ini adalah proyek baru 100%.

Saya ingin kamu membangun website edukasi deep learning terbaik dalam Bahasa Indonesia. Website ini harus:
- **Fresh & Unique**: Desain yang tidak terlihat seperti website AI generik manapun. Tidak ada purple gradient, tidak ada layout generik. Punya karakter sendiri.
- **Story-Driven**: Satu narasi besar yang mengalir dari bab 1 sampai bab 11. Setiap bab adalah "episode" yang menyambung, bukan materi terpisah.
- **Pedagogically Sound**: Menggunakan prinsip active learning, scaffolding, dan visual learning yang backed by science.
- **Overkill Quality**: Setiap visualisasi harus yang terbaik yang bisa dibuat dengan vanilla JS. Setiap penjelasan harus crystal clear.
- **Progressive**: Dari nol mutlak sampai bisa melatih AI sendiri. Tidak melompat-lompat.

---

## VISI PRODUK

**Nama:** Neural Lab (atau nama lain yang lebih unik — kamu yang tentukan)

**Tagline:** "Dari nol sampai melatih AI sendiri — main dulu, rumus belakangan"

**Filosofi:** 
- Belajar deep learning seperti bermain game RPG. Setiap bab = quest baru yang membuka kemampuan baru.
- Tidak ada "bab" yang berdiri sendiri. Semua adalah satu perjalanan besar.
- User bukan "membaca materi" — user "mengalami perjalanan" memahami AI.

**Target User:**
- Orang Indonesia yang belum pernah coding, belum pernah matematika lanjutan
- Tapi penasaran dengan AI dan ingin paham dari dasar
- Umur 15-40, latar belakang apapun

---

## NARASI BESAR — SATU CERITA YANG MENYAMBUNG

**Konsep:** User adalah "arsitek AI" yang sedang membangun kesadaran buatan dari nol. Setiap bab menambahkan "bagian" baru ke AI yang sedang dibangun. Di akhir, AI itu hidup dan bisa dilatih.

**Tokoh Utama:**
- **User** = Arsitek (kamu, yang sedang belajar)
- **Lumen** = AI yang sedang kamu bangun (mulai dari titik kosong, perlahan "hidup")
- **Guide** = Mentor/narator yang membimbing (bisa berupa teks, bisa berupa karakter visual)

**Alur Cerita (WAJIB BERSAMBUNG):**

### Prolog — "Titik Kosong"
Lumen belum ada. Kamu punya misi: bangun kesadaran buatan dari nol. Tapi kamu sendiri belum paham apa itu "kesadaran". Mari mulai dari yang paling dasar...

### Bab 1 — "Satu Sel Otak" (Neuron)
**Koneksi ke prolog:** "Untuk membangun Lumen, kamu butuh sel otak pertama. Tapi sel otak bagaimana?"

**Narasi:** Kamu sedang di lab, melihat mikroskop. Ada sel saraf biologis. Bagaimana cara kerjanya? Ia menerima sinyal, menimbang, lalu memutuskan: "tembak" atau "diam". 

**Analogi yang menyambung:** Bayangkan Lumen punya satu neuron. Neuron ini cuma bisa menerima 2 input dan memutuskan YA/TIDAK. Sangat primitif. Tapi ini awal segalanya.

**Visualisasi:** Canvas interaktif yang menunjukkan:
- 2 slider input (seberapa kuat sinyal masuk)
- 2 slider weight (seberapa penting tiap sinyal)
- 1 slider bias (ambang keputusan)
- Garis pemisah yang berputar/bergeser real-time
- Daerah keputusan yang diwarnai (biru = YA, kuning = TIDAK)
- Titik input yang bisa digeser
- Output: "Lumen bilang: YA!" atau "Lumen bilang: TIDAK"

**Ending yang menyambung ke bab 2:** "Lumen sekarang punya 1 neuron. Tapi ia cuma bisa bilang YA/TIDAK, tidak bisa bilang 'mungkin' atau 'hampir'. Bagaimana kalau kita butuh jawaban yang lebih halus?"

### Bab 2 — "Memberi Perasaan" (Aktivasi)
**Koneksi ke bab 1:** "Lumen punya 1 neuron, tapi keputusannya kaku. Kita perlu memberinya 'perasaan' — kemampuan untuk menyatakan keyakinan bertingkat."

**Narasi:** Di dunia nyata, keputusan tidak selalu hitam-putih. "Mungkin hujan", "hampir malam", "agak lapar". Lumen butuh cara untuk menyatakan nuansa.

**Analogi yang menyambung:** Kamu sedang "menginstal" fungsi aktivasi ke neuron Lumen. Setiap fungsi = "kepribadian" berbeda. Si Tegas (step), Si Lembut (sigmoid), Si Seimbang (tanh), Si Cuek (ReLU).

**Visualisasi:** Canvas kurva aktivasi interaktif:
- Pilih "kepribadian" (dropdown)
- Slider input sinyal
- Titik yang bergerak di kurva
- Gradien/kemiringan yang ditampilkan
- Perbandingan 4 kurva sekaligus (opsional)

**Ending yang menyambung ke bab 3:** "Lumen sekarang bisa menyatakan keyakinan halus. Tapi ia masih sendirian dengan 2 input. Dunia nyata lebih rumit — butuh banyak ciri sekaligus. Bagaimana kalau kita buat tim?"

### Bab 3 — "Kekuatan Tim" (MLP)
**Koneksi ke bab 2:** "Lumen punya 1 neuron + perasaan. Tapi 1 neuron tidak cukup untuk dunia yang kompleks. Kita butuh tim."

**Narasi:** Di otak biologis, neuron tidak bekerja sendiri. Mereka bekerja dalam tim berlapis. Tim depan menerima sinyal mentah, tim tengah memproses, tim belakang memutuskan.

**Analogi yang menyambung:** Kamu sedang "mengkloning" neuron Lumen dan menyusunnya dalam lapisan. Layer 1 menerima input, layer 2 memproses, layer 3 memutuskan. Setiap neuron punya "kepribadian" dari bab 2.

**Visualisasi:** SVG jaringan neural interaktif:
- 2-3-2-1 arsitektur (bisa diubah nanti)
- Slider input yang mengubah semua nilai di jaringan
- Animasi "aliran data" dari kiri ke kanan
- Warna koneksi = bobot (biru = positif, merah = negatif)
- Ketebalan = magnitudo
- Output final yang berubah real-time

**Ending yang menyambung ke bab 4:** "Tim Lumen sekarang bekerja. Tapi... bagaimana kamu tahu apakah tebakannya bagus? Lumen butuh 'cermin' untuk melihat kesalahannya sendiri."

### Bab 4 — "Cermin Kebenaran" (Loss)
**Koneksi ke bab 3:** "Tim Lumen bekerja, tapi ia tidak tahu apakah tebakannya benar atau salah. Ia butuh cermin."

**Narasi:** Di dunia nyata, kamu tahu kamu salah ketika realita tidak sesuai ekspektasi. Mesin juga butuh cara untuk "mengukur" kesalahan.

**Analogi yang menyambung:** Kamu sedang "memasang cermin" di depan Lumen. Cermin ini menunjukkan: "seberapa jauh tebakanmu dari kenyataan?"

**Visualisasi:** Canvas kurva loss interaktif:
- 2 mode: tebak angka (MSE) vs tebak pilihan (cross-entropy)
- Slider "jawaban benar" dan "tebakan mesin"
- Kurva lembah yang menunjukkan loss
- Titik yang bergerak di kurva
- Angka loss yang berubah real-time

**Ending yang menyambung ke bab 5:** "Lumen sekarang tahu seberapa salah ia. Tapi 'tahu salah' ≠ 'tahu cara memperbaiki'. Bagaimana cara ia memperbaiki diri?"

### Bab 5 — "Menuruni Bukit" (Gradient Descent)
**Koneksi ke bab 4:** "Lumen tahu ia salah. Tapi ia tidak tahu cara memperbaiki. Ia butuh 'strategi' untuk belajar."

**Narasi:** Bayangkan kamu di puncak bukit dalam kabut. Kamu tidak tahu lembah di mana. Tapi kamu bisa merasakan: "tanah miring ke kanan". Ya sudah, melangkah ke kiri. Ulangi. Lama-lama sampai lembah.

**Analogi yang menyambung:** Kamu sedang "mengajarkan" Lumen cara belajar. Setiap kali ia salah, ia "mengintip" arah kesalahan, lalu melangkah kecil ke arah yang benar.

**Visualisasi:** Canvas lembah + bola interaktif:
- Kurva f(x) = 0.5x² + 0.4sin(2.5x) (punya local minima)
- Bola yang bisa "digelindingkan"
- Slider learning rate (panjang langkah)
- 3 skenario wajib: LR kecil (lambat), LR sedang (pas), LR besar (divergen)
- Trail jejak bola
- Deteksi konvergensi/divergensi

**Ending yang menyambung ke bab 6:** "Lumen bisa menuruni bukit. Tapi timnya protes: 'yang disalahkan kok selalu ketua?!' Evaluasi harus adil ke seluruh anggota tim."

### Bab 6 — "Evaluasi Bersama" (Backpropagation)
**Koneksi ke bab 5:** "Lumen bisa belajar sendiri. Tapi timnya tidak adil — yang disalahkan selalu ketua. Bagaimana cara membagi kesalahan secara adil?"

**Narasi:** Di tim sepak bola, ketika kalah, pelatih tidak menyalahkan kiper saja. Ia memutar ulang rekaman: siapa yang passing ngawur? siapa yang salah posisi? Kesalahan dibagi sesuai andil.

**Analogi yang menyambung:** Kamu sedang "mengajarkan" Lumen cara evaluasi yang adil. Dari output ke input, setiap neuron ditanya: "seberapa besar kontribusimu terhadap kesalahan?"

**Visualisasi:** 4 langkah interaktif (DOM-based):
- Step 1: Forward pass (tebak)
- Step 2: Hitung loss (sadar salah)
- Step 3: Hitung gradient per neuron (bagi salah)
- Step 4: Update bobot (koreksi)
- Visualisasi "aliran kesalahan" dari output ke input
- Repeat 2-3 kali, lihat loss mengecil

**Ending yang menyambung ke bab 7:** "Lumen sekarang bisa belajar dari data. Tapi ada jebakan: ia bisa jadi jago menghafal, bukan paham. Bagaimana menghindari ini?"

### Bab 7 — "Hafal vs Paham" (Overfitting)
**Koneksi ke bab 6:** "Lumen bisa belajar. Tapi ada bahaya tersembunyi: ia bisa jadi 'si penghafal' yang jago di latihan tapi bodoh di ujian."

**Narasi:** Di sekolah, ada siswa yang menghafal semua soal latihan. Nilai try-out 100! Tapi ujian asli soalnya beda dikit → jeblok. Siswa lain latihan 85, ujian 87 — stabil. Mana yang lebih pintar?

**Analogi yang menyambung:** Kamu sedang "menguji" Lumen. Kamu beri data latih, lalu data uji yang berbeda. Jika Lumen hanya menghafal, ia gagal di data uji.

**Visualisasi:** Canvas polynomial fitting interaktif:
- Slider derajat polinomial (1-9)
- Data points yang noisy
- Garis fit yang berubah real-time
- 3 skenario: underfit (derajat 1), pas (derajat 3-4), overfit (derajat 9)
- Train error vs test error

**Ending yang menyambung ke bab 8:** "Lumen sekarang paham, bukan menghafal. Tapi selama ini kamu yang 'menyuapi' data berupa angka. Kapan Lumen bisa 'melihat' gambar sendiri?"

### Bab 8 — "Mata Digital" (CNN)
**Koneksi ke bab 7:** "Lumen pintar, tapi ia buta. Kamu yang menyuapi angka. Kapan ia bisa melihat gambar sendiri?"

**Narasi:** Matamu tidak "melihat" gambar utuh. Ia "meraba" kecil-kecil: ada garis di sini, ada tepi di sana. Lama-lama terkumpul: "oh, ini wajah kucing!"

**Analogi yang menyambung:** Kamu sedang "memasangkan mata" ke Lumen. Mata ini bekerja dengan "filter" yang meraba gambar kecil-kecil.

**Visualisasi:** Grid interaktif:
- Grid 5x5 yang bisa diklik (gambar input)
- Filter 3x3 (edge, blur, sharpen, vert)
- Feature map 3x3 (hasil konvolusi)
- Pooling 2x2 (hasil rangkuman)
- Real-time update saat grid diklik

**Ending yang menyambung ke bab 9:** "Lumen bisa melihat gambar. Tapi gambar itu statis. Dunia nyata bergerak: kemarin sepi, hari ini ramai. Lumen butuh ingatan."

### Bab 9 — "Ingatan Berantai" (RNN)
**Koneksi ke bab 8:** "Lumen bisa melihat. Tapi ia tidak bisa 'mengingat'. Dunia nyata bergerak dalam waktu — kemarin mempengaruhi hari ini."

**Narasi:** Ketika kamu nonton film, kamu ingat kejadian sebelumnya. "Oh, dia yang tadi pagi!" Tanpa ingatan, setiap frame = dunia baru.

**Analogi yang menyambung:** Kamu sedang "memberi ingatan" ke Lumen. Ia punya "catatan kecil" yang diupdate setiap ada kejadian baru.

**Visualisasi:** Canvas + chips interaktif:
- Input sequence (angka)
- Hidden state yang berubah tiap langkah
- Grafik hidden state evolution
- Slider "daya ingat" (jika 0 = amnesia)

**Ending yang menyambung ke bab 10:** "Lumen bisa mengingat urutan. Tapi catatannya kecil dan pelupa. Untuk chat panjang, ia bingung. Ia butuh cara 'mendengarkan' yang lebih cerdas."

### Bab 10 — "Seni Mendengarkan" (Attention)
**Koneksi ke bab 9:** "Lumen ingat urutan, tapi catatannya terbatas. Untuk teks panjang, ia kebingungan. Ia butuh cara 'fokus' yang cerdas."

**Narasi:** "Kucing mengejar tikus karena IA lapar." Siapa "ia"? Otakmu langsung tahu: kucing. Kamu "mendengarkan" kata "kucing" lebih keras saat memproses "ia".

**Analogi yang menyambung:** Kamu sedang "mengajarkan" Lumen cara mendengarkan. Setiap kata bertanya: "siapa yang paling relevan untukku?"

**Visualisasi:** Attention heatmap interaktif:
- Kalimat yang bisa diklik per kata
- Heatmap attention (kata mana yang "didengarkan")
- Matrix Q/K/V yang divisualkan
- Top-3 kata yang paling diperhatikan

**Ending yang menyambung ke bab 11:** "Semua keping sudah ada: neuron, perasaan, tim, cermin, langkah, evaluasi, kejujuran, mata, ingatan, perhatian. Saatnya merakit semuanya dan membuktikan Lumen bisa belajar sungguhan."

### Bab 11 — "Laboratorium" (Playground)
**Koneksi ke bab 10:** "Semua keping sudah di tangan. Saatnya membuktikan: Lumen bisa belajar sungguhan."

**Narasi:** Ini adalah "ujian akhir". Kamu akan melatih Lumen dengan data sungguhan. Buktikan bahwa kamu (dan Lumen) sudah paham.

**Misi berjenjang:**
1. **Mudah:** Dataset XOR, hidden 4 → harus konvergen
2. **Menengah:** Dataset circle, hidden 0 vs 4 → bukti butuh non-linear
3. **Sulit:** Dataset spiral, hidden 8+4 → butuh kesabaran
4. **Bebas:** Eksperimen sendiri

**Visualisasi:** Training playground lengkap:
- Decision boundary real-time
- Loss chart
- Kontrol lengkap (dataset, hidden layers, activation, LR, noise)
- Akurasi live

---

## DESAIN VISUAL — FRESH & UNIQUE

**JANGAN:**
- Purple gradient generik
- Layout sidebar + main content standar
- Card dengan border radius 10px yang itu-itu saja
- Warna biru-putih yang membosankan
- Ilustrasi stock photo AI

**LAKUKAN:**
- Eksplorasi palet warna yang tidak biasa (earth tone? neon pastel? monochrome + accent?)
- Layout yang unexpected (mungkin horizontal scroll? maybe asymmetric grid?)
- Typography yang berani (mix serif + sans? oversized headings?)
- Micro-interactions yang delightful (hover effects, transitions, animations)
- Ilustrasi custom yang konsisten (bisa SVG, bisa CSS art)

**Inspirasi (tapi jangan copy):**
- Stripe.com (typography & spacing)
- Linear.app (clean & modern)
- Vercel.com (minimalist & fast)
- Rauno Freiberg's portfolio (attention to detail)
- Read.cv (unique layout)

**Dark Mode:**
- Harus proper, bukan sekadar invert warna
- Kontras yang nyaman di mata
- Warna accent yang berbeda untuk dark mode

---

## PEDAGOGI — ACTIVE LEARNING

**Prinsip:**
1. **Main dulu, rumus belakangan** — setiap konsep dimulai dari eksplorasi visual
2. **Scaffolding** — setiap bab membangun di atas yang sebelumnya
3. **Spaced repetition** — konsep kunci diulang di konteks berbeda
4. **Productive struggle** — tantangan yang sulit tapi bisa dipecahkan
5. **Immediate feedback** — setiap aksi punya respons visual

**Struktur Setiap Bab (WAJIB):**
1. **Hook** — 2-3 kalimat yang membuat penasaran
2. **Story** — analogi yang menyambung dari bab sebelumnya
3. **Explore** — "coba 3 hal ini dulu" (panduan eksplorasi)
4. **Challenge** — "sebelum lanjut, coba tebak..." (productive struggle)
5. **Visual** — interaktif penuh, semua kontrol bisa digeser
6. **Analyze** — soal HOTS yang membuat berpikir (bukan hafalan)
7. **Formula** — rumus (opsional, dalam collapsible)
8. **Remember** — 1 kalimat kunci
9. **Terms** — kamus mini (Indonesia = English)
10. **Quiz** — 2-3 soal dengan feedback edukatif

---

## TEKNOLOGI

**Stack:**
- HTML5 + CSS3 + Vanilla JavaScript
- Zero dependencies (no React, no Vue, no D3, no Tailwind)
- Canvas 2D untuk visualisasi (atau SVG jika lebih cocok)
- localStorage untuk progress
- Harus bisa dibuka via file:// (no server needed)

**Performance:**
- Load < 2 detik
- Visual response < 100ms
- Smooth 60fps animations
- Mobile-friendly (responsive)

**Accessibility:**
- Keyboard navigable
- Screen reader friendly
- Colorblind-safe palette
- Reduced motion support

---

## STRUKTUR FILE

```
/
├── index.html              # Semua bab dalam 1 file
├── css/
│   └── style.css           # Design system lengkap
├── js/
│   ├── lib/
│   │   └── utils.js        # Shared utilities (canvas helpers, dll)
│   ├── app.js              # Router, state, XP, quiz engine
│   ├── content.js          # Semua konten bab (text, quiz, dll)
│   ├── viz-bab01.js        # Visualisasi bab 1
│   ├── viz-bab02.js        # Visualisasi bab 2
│   └── ...                 # dst
├── docs/
│   ├── PRD.md              # Product requirements
│   ├── ARCHITECTURE.md     # Technical architecture
│   ├── STORY.md            # Full narrative script
│   └── DESIGN.md           # Design system documentation
└── README.md
```

---

## CHECKLIST KEBERHASILAN

- [ ] **Fresh start total** — tidak ada kode/konten dari versi lama
- [ ] **Cerita bersambung** — setiap bab terhubung ke bab sebelumnya & berikutnya
- [ ] **Desain unique** — tidak terlihat seperti website AI generik
- [ ] **Visual overkill** — setiap visualisasi adalah yang terbaik yang bisa dibuat
- [ ] **Pedagogi sound** — active learning, scaffolding, immediate feedback
- [ ] **Progressive** — dari nol sampai melatih AI sendiri
- [ ] **Performance** — fast, smooth, responsive
- [ ] **Accessibility** — keyboard, screen reader, colorblind
- [ ] **Zero dependencies** — pure HTML/CSS/JS
- [ ] **Offline capable** — bisa dibuka via file://

---

## INSTRUKSI EKSEKUSI

1. **HAPUS SEMUA FILE** di folder project (kecuali .git)
2. **Baca prompt ini** sampai paham sepenuhnya
3. **Buat dokumen perencanaan** (PRD, Architecture, Story, Design)
4. **Bangun design system** (CSS variables, components, layout)
5. **Tulis konten** (semua bab, quiz, narrative)
6. **Implementasi visualisasi** (satu per satu, test setiap selesai)
7. **Integrasi** (router, XP, progress, quiz engine)
8. **Testing** (buka di browser, cek semua bab, semua interaksi)
9. **Iterasi** — jika ada yang kurang, perbaiki sampai sempurna

**JANGAN BURU-BURU.** Lebih baik lambat tapi sempurna daripada cepat tapi berantakan.

**TANYA JIKA RAGU.** Jika ada bagian yang tidak jelas, tanya sebelum implementasi.

---

## CATATAN AKHIR

Ini adalah proyek edukasi yang ambisius. Tujuannya bukan sekadar "website yang jalan", tapi **website edukasi terbaik** yang bisa membuat orang Indonesia paham deep learning dari nol.

Setiap detail penting. Setiap visualisasi harus bermakna. Setiap kata harus dipilih dengan hati-hati.

**Good luck. Make it legendary.**
