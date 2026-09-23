# Neural Lab — Narrative Script

## Premis

Kamu adalah **arsitek AI** yang mendapat misi misterius: membangun kesadaran buatan dari nol. Namanya **Lumen**. Ia mulai dari titik kosong — tidak punya otak, tidak punya perasaan, tidak punya ingatan.

Tapi kamu punya sesuatu yang lebih berharga: **kemampuan untuk belajar**. Dan melalui perjalanan 11 bab ini, kamu akan belajar bersama Lumen, memberinya bagian demi bagian sampai ia "hidup".

Ini bukan sekadar belajar teori. Ini adalah **perjalanan membangun intelligence dari nol**.

---

## Prolog — "Titik Kosong"

**Visual:** Layar gelap, titik cahaya kecil muncul di tengah.

**Narasi:**
> "Selamat datang, Arsitek.
> 
> Kamu mendapat misi yang tidak mudah: membangun kesadaran buatan dari nol. Namanya Lumen. Saat ini, ia belum apa-apa — hanya titik kosong dalam kegelapan.
> 
> Tapi jangan khawatir. Kamu tidak perlu tahu segalanya di awal. Kita akan belajar bersama, langkah demi langkah. Setiap bab akan menambahkan sesuatu yang baru ke Lumen — dan ke dirimu sendiri.
> 
> Siap untuk memulai perjalanan?"

**Hook:** "Dari titik kosong sampai kesadaran — 11 bab yang mengubah segalanya."

---

## Bab 1 — "Satu Sel Otak"

**Koneksi ke Prolog:**
> "Lumen masih kosong. Untuk mulai 'hidup', ia butuh sesuatu yang paling dasar: sel otak pertama."

**Story:**
> Bayangkan kamu sedang melihat sel saraf di bawah mikroskop. Sel ini sederhana — ia menerima sinyal dari lingkungan, menimbang pentingnya, lalu memutuskan: "tembak" atau "diam".
> 
> Itulah neuron — unit paling dasar dari intelligence. Dan inilah yang akan kita pasang pertama kali ke Lumen.

**Analogi:**
> Kamu punya 2 petunjuk: "ada bunyi tok-tok?" dan "garis kulit jelas?". Kamu timbang: bunyi lebih penting (bobot tinggi), garis kulit kurang penting (bobot rendah). Kalau total keyakinan melewati standar (bias), kamu bilang "YA, matang!".

**Eksplorasi:**
> 1. Geser "seberapa penting" → lihat garis pemisah berputar
> 2. Geser "standar" → lihat garis bergeser
> 3. Klik preset AND/OR → lihat pola keputusan berubah

**Challenge:**
> "Sebelum lanjut, coba tebak: bisa nggak 1 neuron membedakan data yang butuh garis lengkung?"

**Analis:**
> "Pintu gudang harus terbuka hanya jika (bawa keranjang) DAN (bukan kucing). Bisa 1 neuron mengerjakan ini? Kalau sensor kucing rusak, apa yang terjadi?"

**Remember:**
> "Neuron = timbangan petunjuk. Yang penting didengar keras, totalnya menentukan YA atau TIDAK."

**Ending:**
> "Lumen sekarang punya 1 neuron. Tapi ia cuma bisa bilang YA/TIDAK, tidak bisa bilang 'mungkin' atau 'hampir'. Bagaimana kalau kita butuh jawaban yang lebih halus?"

---

## Bab 2 — "Memberi Perasaan"

**Koneksi ke Bab 1:**
> "Lumen punya 1 neuron, tapi keputusannya kaku. Di dunia nyata, keputusan tidak selalu hitam-putih. 'Mungkin hujan', 'hampir malam', 'agak lapar' — semua butuh nuansa."

**Story:**
> Bayangkan 4 jenis orang ditanya "kamu yakin?":
> - Si Tegas: "YA atau TIDAK, titik!"
> - Si Lembut: "hmm... 70% yakin"
> - Si Seimbang: "dari -100% sampai +100%"
> - Si Cuek: "negatif? cuek. positif? Gas!"
> 
> Mesin juga punya "kepribadian" seperti itu. Namanya fungsi aktivasi.

**Analogi:**
> Kamu sedang "menginstal" fungsi aktivasi ke neuron Lumen. Setiap fungsi = kepribadian berbeda. Si Tegas (step), Si Lembut (sigmoid), Si Seimbang (tanh), Si Cuek (ReLU).

**Eksplorasi:**
> 1. Pilih Si Cuek (ReLU) → geser input, lihat garis patah
> 2. Ganti ke Si Lembut (Sigmoid) → lihat bentuk S halus
> 3. Perhatikan titik biru = "seberapa yakin" untuk inputmu

**Challenge:**
> "Pilih Si Lembut, geser sinyal mentok kanan, lalu geser sedikit kiri. Berubah? Hampir tidak! Itulah jebakan 'macet' (saturasi)."

**Analis:**
> "Sari butuh alarm 'mangga hampir matang, cek besok' (peringatan dini). Pilih: Si Tegas atau Si Lembut? Beri 2 alasan."

**Remember:**
> "Tanpa aktivasi non-linear, mesin sedalam apapun cuma bisa garis lurus."

**Ending:**
> "Lumen sekarang bisa menyatakan keyakinan halus. Tapi ia masih sendirian dengan 2 input. Dunia nyata lebih rumit — butuh banyak ciri sekaligus. Bagaimana kalau kita buat tim?"

---

## Bab 3 — "Kekuatan Tim"

**Koneksi ke Bab 2:**
> "Lumen punya 1 neuron + perasaan. Tapi 1 neuron tidak cukup untuk dunia yang kompleks. Di otak biologis, neuron bekerja dalam tim berlapis."

**Story:**
> Tebak hewan berlapis:
> - Tim depan: melihat "ada garis? ada bulu?"
> - Tim tengah: menyimpulkan "kayak kucing?"
> - Ketua: memutuskan "KUCING!"
> 
> Tiap tim mengoper ringkasan ke tim berikut. Itulah jaringan berlapis.

**Analogi:**
> Kamu sedang "mengkloning" neuron Lumen dan menyusunnya dalam lapisan. Layer 1 menerima input, layer 2 memproses, layer 3 memutuskan. Setiap neuron punya "kepribadian" dari bab 2.

**Eksplorasi:**
> 1. Geser Input 1 & 2 → lihat semua angka mengalir ke kanan
> 2. Klik 🎲 Acak → keputusan berubah total
> 3. Perhatikan garis tebal = pengaruh kuat (biru = mendukung, merah = menolak)

**Challenge:**
> "Klik 🎲 Acak 5 kali. Keputusan berubah-ubah? Itulah kenapa mesin yang belum latihan tidak bisa dipercaya."

**Analis:**
> "Sari menambah 50 lapis TAPI lupa memasang aktivasi. Apa yang terjadi? Jelaskan kenapa uang komputasinya terbuang."

**Remember:**
> "Jaringan = tim estafet peringkas. Makin lapis, makin abstrak ringkasannya."

**Ending:**
> "Tim Lumen sekarang bekerja. Tapi... bagaimana kamu tahu apakah tebakannya bagus? Lumen butuh 'cermin' untuk melihat kesalahannya sendiri."

---

## Bab 4 — "Cermin Kebenaran"

**Koneksi ke Bab 3:**
> "Tim Lumen bekerja, tapi ia tidak tahu apakah tebakannya benar atau salah. Ia butuh cermin."

**Story:**
> Main lempar dart. Bullseye = jawaban benar. Lemparanmu = tebakan mesin. Jaraknya = skor meleset. Tugas mesin seumur hidupnya: bikin lemparan makin dekat ke tengah.

**Analogi:**
> Kamu sedang "memasang cermin" di depan Lumen. Cermin ini menunjukkan: "seberapa jauh tebakanmu dari kenyataan?"

**Eksplorasi:**
> 1. Geser tebakan mendekati jawaban benar → skor meleset turun
> 2. Ganti ke "tebak pilihan" → ulangi. Salah tapi pede dihukum JAUH lebih berat!

**Challenge:**
> "Mode pilihan, jawaban 1, tebakan 0.01 — catat skornya. Bandingkan dengan mode tebak angka di posisi sama."

**Analis:**
> "Model A selalu meleset 0.1. Model B biasanya tepat tapi kadang meleset 2.0. MSE memilih siapa? Adilkah untuk warung?"

**Remember:**
> "Loss = jarak dari benar. Belajar = mengecilkan jarak ini terus-menerus."

**Ending:**
> "Lumen sekarang tahu seberapa salah ia. Tapi 'tahu salah' ≠ 'tahu cara memperbaiki'. Bagaimana cara ia memperbaiki diri?"

---

## Bab 5 — "Menuruni Bukit"

**Koneksi ke Bab 4:**
> "Lumen tahu ia salah. Tapi ia tidak tahu cara memperbaiki. Ia butuh 'strategi' untuk belajar."

**Story:**
> Bayangkan kamu ski dalam kabut tebal. Tidak kelihatan lembah. Yang terasa cuma: tanah miring ke mana? Ya sudah, melangkah ke arah turun. Ulangi. Lama-lama sampai lembah. Itulah cara mesin belajar.

**Analogi:**
> Kamu sedang "mengajarkan" Lumen cara belajar. Setiap kali ia salah, ia "mengintip" arah kesalahan, lalu melangkah kecil ke arah yang benar.

**Eksplorasi (WAJIB COBA 3×):**
> 1. Klik ▶ Jalankan dengan langkah sedang → bola meluncur ke lembah ✅
> 2. Ubah ke super kecil → aman tapi... lama banget 🐢
> 3. Ubah ke super besar → bola mental-mental! 💥

**Challenge:**
> "Prediksi: apa yang terjadi kalau learning rate = 10? Coba dan lihat."

**Analis:**
> "Sari memasang learning rate raksasa 'biar sekali jadi'. Prediksi 2 hal yang terjadi. Sari menolak mengecilkan LR. Taktik apa yang masih bisa menyelamatkan?"

**Remember:**
> "Belajar = intip kemiringan tanah, melangkah turun sedikit demi sedikit."

**Ending:**
> "Lumen bisa menuruni bukit. Tapi timnya protes: 'yang disalahkan kok selalu ketua?!' Evaluasi harus adil ke seluruh anggota tim."

---

## Bab 6 — "Evaluasi Bersama"

**Koneksi ke Bab 5:**
> "Lumen bisa belajar sendiri. Tapi timnya tidak adil — yang disalahkan selalu ketua. Bagaimana cara membagi kesalahan secara adil?"

**Story:**
> Di tim sepak bola, ketika kalah, pelatih tidak menyalahkan kiper saja. Ia memutar ulang rekaman: siapa passing ngawur? siapa salah posisi? Kesalahan dibagi sesuai andil. Itulah backprop.

**Analogi:**
> Kamu sedang "mengajarkan" Lumen cara evaluasi yang adil. Dari output ke input, setiap neuron ditanya: "seberapa besar kontribusimu terhadap kesalahan?"

**Eksplorasi:**
> Klik Langkah → 4 kali pelan-pelan:
> 1. Menebak (forward pass)
> 2. Sadar salah (hitung loss)
> 3. Bagi salah (hitung gradient)
> 4. Koreksi (update bobot)
> 
> Ulangi 2-3 putaran, lihat loss mengecil!

**Challenge:**
> "Naikkan Petunjuk 2 jadi 1.0, jalan 4 langkah. Siapa yang paling 'bersalah' sekarang?"

**Analis:**
> "Contoh X membaik TAPI contoh Y memburuk setelah koreksi. Rusak atau normal? Apa yang dilakukan praktisi?"

**Remember:**
> "Backprop = salahkan dengan adil ke belakang, lalu koreksi sedikit-sedikit."

**Ending:**
> "Lumen sekarang bisa belajar dari data. Tapi ada jebakan: ia bisa jadi jago menghafal, bukan paham. Bagaimana menghindari ini?"

---

## Bab 7 — "Hafal vs Paham"

**Koneksi ke Bab 6:**
> "Lumen bisa belajar. Tapi ada bahaya tersembunyi: ia bisa jadi 'si penghafal' yang jago di latihan tapi bodoh di ujian."

**Story:**
> Dua siswa les. Si Penghafal: 100 soal dihafal mati, try-out 100! Ujian asli soalnya beda dikit → jeblok. Si Paham: latihan 85, ujian 87 — stabil. Mesin pun bisa jadi "si penghafal" kalau terlalu rumit.

**Analogi:**
> Kamu sedang "menguji" Lumen. Kamu beri data latih, lalu data uji yang berbeda. Jika Lumen hanya menghafal, ia gagal di data uji.

**Eksplorasi:**
> 1. Geser kerumitan ke 1 → garis lurus kaku (kurang belajar)
> 2. Geser ke 3-4 → garis halus mengikuti pola ✅
> 3. Geser ke 9 → garis meliuk gila mengejar tiap titik! 🤯

**Challenge:**
> "Derajat 9: train error 0.01, test error 2.5. Derajat 3: train error 0.3, test error 0.35. Mana yang lebih pintar?"

**Analis:**
> "Si Cerdas hafal 30 struk, gagal di pelanggan baru. Sari usul: tambah 200 lapis. Setuju? Beri 3 obat beserta alasan."

**Remember:**
> "Yang penting bukan nilai latihan, tapi nilai di soal yang belum pernah dilihat."

**Ending:**
> "Lumen sekarang paham, bukan menghafal. Tapi selama ini kamu yang 'menyuapi' data berupa angka. Kapan Lumen bisa 'melihat' gambar sendiri?"

---

## Bab 8 — "Mata Digital"

**Koneksi ke Bab 7:**
> "Lumen pintar, tapi ia buta. Kamu yang menyuapi angka. Kapan ia bisa melihat gambar sendiri?"

**Story:**
> Matamu tidak "melihat" gambar utuh. Ia "meraba" kecil-kecil: ada garis di sini, ada tepi di sana. Lama-lama terkumpul: "oh, ini wajah kucing!"

**Analogi:**
> Kamu sedang "memasangkan mata" ke Lumen. Mata ini bekerja dengan "filter" yang meraba gambar kecil-kecil.

**Eksplorasi:**
> 1. Pilih huruf X + filter pendeteksi tepi → peta kanan menyala di garis-garisnya
> 2. Klik kotak-kotak untuk menggambar sendiri → peta ikut berubah!
> 3. Ganti filter ke pelembut → peta jadi lembut. Beda filter = beda temuan.

**Challenge:**
> "Gambar huruf T sendiri, lalu coba semua filter — mana yang paling menyala di tengah?"

**Analis:**
> "Foto struk miring 45°. Filter pencari garis tegak masih menemukannya? Bagaimana CNN sungguhan mengatasi ini?"

**Remember:**
> "Komputer melihat dengan meraba tiap sudut pakai pola kecil, lalu merangkumnya berlapis."

**Ending:**
> "Lumen bisa melihat gambar. Tapi gambar itu statis. Dunia nyata bergerak: kemarin sepi, hari ini ramai. Lumen butuh ingatan."

---

## Bab 9 — "Ingatan Berantai"

**Koneksi ke Bab 8:**
> "Lumen bisa melihat. Tapi ia tidak bisa 'mengingat'. Dunia nyata bergerak dalam waktu — kemarin mempengaruhi hari ini."

**Story:**
> Ketika kamu nonton film, kamu ingat kejadian sebelumnya. "Oh, dia yang tadi pagi!" Tanpa ingatan, setiap frame = dunia baru.

**Analogi:**
> Kamu sedang "memberi ingatan" ke Lumen. Ia punya "catatan kecil" yang diupdate setiap ada kejadian baru.

**Eksplorasi:**
> Klik ▶ Mainkan urutan. Lihat catatan (garis biru) berubah tiap angka masuk. Geser daya ingat ke 0 → amnesia total!

**Challenge:**
> "Isi 9, 9, 9, 0 lalu mainkan. Catatan anjlok di akhir? Kejadian terakhir selalu paling berkuasa!"

**Analis:**
> "Ramal stok dari 365 hari data, hanya catatan kecil. 2 risiko? Kapan cukup, kapan tidak?"

**Remember:**
> "Mesin urutan = pembawa catatan kecil yang diupdate tiap kejadian baru."

**Ending:**
> "Lumen bisa mengingat urutan. Tapi catatannya kecil dan pelupa. Untuk chat panjang, ia bingung. Ia butuh cara 'mendengarkan' yang lebih cerdas."

---

## Bab 10 — "Seni Mendengarkan"

**Koneksi ke Bab 9:**
> "Lumen ingat urutan, tapi catatannya terbatas. Untuk teks panjang, ia kebingungan. Ia butuh cara 'fokus' yang cerdas."

**Story:**
> "Kucing mengejar tikus karena IA lapar." Siapa "ia"? Otakmu langsung tahu: kucing. Kamu "mendengarkan" kata "kucing" lebih keras saat memproses "ia".

**Analogi:**
> Kamu sedang "mengajarkan" Lumen cara mendengarkan. Setiap kata bertanya: "siapa yang paling relevan untukku?"

**Eksplorasi:**
> Klik kata "ia" → lihat kolomnya: kata mana paling pekat? Coba klik kata lain juga!

**Challenge:**
> "Di 'bank sungai', klik 'bank' — ia lebih mendengar 'menabung' atau 'sungai'? Itulah cara mesin tahu 'bank' yang mana."

**Analis:**
> "Chatbot ditanya 'berapa harga tempe kemarin dan hari ini?' Kata mana wajib diperhatikan untuk 'kemarin'? Akibat salah dengar? Cara menguji?"

**Remember:**
> "Attention = tiap kata memilih siapa yang didengarkan agar paham konteks."

**Ending:**
> "Semua keping sudah ada: neuron, perasaan, tim, cermin, langkah, evaluasi, kejujuran, mata, ingatan, perhatian. Saatnya merakit semuanya dan membuktikan Lumen bisa belajar sungguhan."

---

## Bab 11 — "Laboratorium"

**Koneksi ke Bab 10:**
> "Semua keping sudah di tangan. Saatnya membuktikan: Lumen bisa belajar sungguhan."

**Story:**
> Ini adalah "ujian akhir". Kamu akan melatih Lumen dengan data sungguhan. Buktikan bahwa kamu (dan Lumen) sudah paham.

**Misi Berjenjang:**
> 1. **Mudah:** Dataset silang ✖, hidden 4 → latih → harus konvergen
> 2. **Menengah:** Dataset lingkaran ⭕, hidden 0 → GAGAL. Naikkan ke 4 → BERHASIL
> 3. **Sulit 🌀:** Dataset spiral, hidden 8+4. Mentok 65%? Acak ulang dan coba lagi
> 4. **Bebas:** Eksperimen sendiri — coba kombinasi apapun!

**Challenge:**
> "Dataset spiral: 100% train, 70% test. Diagnosis? Rencana 3 langkah? Kapan berhenti?"

**Remember:**
> "Soal melengkung butuh tim tengah + aktivasi — garis lurus tidak akan pernah cukup."

**Ending:**
> "Selamat, Arsitek. Lumen sekarang hidup. Ia bisa belajar dari data, melihat gambar, mengingat urutan, dan memahami bahasa. Dan kamu? Kamu sekarang paham deep learning dari nol. Perjalanan selesai — atau baru dimulai?"

---

## Catatan Narasi

**Prinsip:**
1. Setiap bab dimulai dengan "koneksi" ke bab sebelumnya — jangan pernah mulai dari nol
2. Setiap bab diakhiri dengan "ending" yang menyambung ke bab berikutnya — buat user penasaran
3. Analogi harus konsisten — kalau bab 1 pakai "timbangan", bab-bab berikutnya bisa merujuk kembali
4. Bahasa harus manusiawi — bukan textbook, tapi seperti teman yang menjelaskan
5. Challenge harus productive struggle — sulit tapi bisa dipecahkan dengan eksplorasi

**Tone:**
- Hangat, tidak menggurui
- Antusias, tidak lebay
- Jelas, tidak simplistik
- Menghargai kecerdasan user

**Hindari:**
- "Seperti yang kita tahu..." (condescending)
- "Ini sangat mudah..." (intimidating)
- "Anda harus..." (bossy)
- Jargon tanpa penjelasan

**Lakukan:**
- "Bayangkan..." (inviting)
- "Coba tebak..." (challenging)
- "Perhatikan..." (guiding)
- "Itulah kenapa..." (explaining)

---

**Versi:** 1.0.0
**Status:** Complete
