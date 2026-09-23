// Sumber kebenaran konten. Aturan: bahasa warung dulu, istilah teknis selalu ada terjemahannya.
var MODULES = [
  { id:"beranda", title:"Markas Sari", time:"5 mnt" },
  { id:"neuron", title:"Misi 1 — Otak Mini", time:"10 mnt", goal:"Pasang sel otak penimbang (neuron, perceptron).", terms:["neuron","perceptron","bobot (weight)","bias"] },
  { id:"aktivasi", title:"Misi 2 — Lampu Keyakinan", time:"8 mnt", goal:"Beri perasaan bertingkat (aktivasi).", terms:["fungsi aktivasi","step","sigmoid","tanh","ReLU","gradien","saturasi"] },
  { id:"mlp", title:"Misi 3 — Tim Peringkas", time:"10 mnt", goal:"Bentuk tim berlapis (MLP).", terms:["MLP","layer","hidden layer","forward pass","output"] },
  { id:"loss", title:"Misi 4 — Cermin", time:"8 mnt", goal:"Nilai kesalahan dengan loss.", terms:["loss","MSE","cross-entropy","target","prediksi"] },
  { id:"gradient", title:"Misi 5 — Menuruni Lembah", time:"10 mnt", goal:"Belajar selangkah demi selangkah.", terms:["gradient descent","learning rate","gradien","divergen"] },
  { id:"backprop", title:"Misi 6 — Evaluasi Adil", time:"12 mnt", goal:"Koreksi seluruh tim (backprop).", terms:["backpropagation","backward pass","update","chain rule"] },
  { id:"overfit", title:"Misi 7 — Jangan Menghafal", time:"10 mnt", goal:"Bedakan paham vs hafal.", terms:["overfitting","underfitting","generalisasi","data latih","data uji"] },
  { id:"cnn", title:"Misi 8 — Mata", time:"12 mnt", goal:"Melihat foto dengan filter (CNN).", terms:["CNN","konvolusi","filter","feature map","pooling"] },
  { id:"rnn", title:"Misi 9 — Ingatan", time:"10 mnt", goal:"Mengingat urutan (RNN).", terms:["RNN","sequence","hidden state","LSTM"] },
  { id:"attention", title:"Misi 10 — Telinga", time:"12 mnt", goal:"Mendengar kata yang tepat (attention).", terms:["attention","query","key","value","softmax","Transformer"] },
  { id:"playground", title:"Misi 11 — Ujian Kelulusan", time:"20 mnt", goal:"Latih AI sungguhan (dataset, epoch).", terms:["dataset","hidden neuron","decision boundary","epoch","akurasi"] }
];

// Bank kuis: bahasa cerita, tanpa jargon tanpa terjemahan.
var QUIZZES = {
  neuron: [
    { q:"Di pasar buah, ada petunjuk 'bunyi tok-tok' dan 'garis kulit'. Apa gunanya 'seberapa penting' (bobot)?", opts:["Menentukan petunjuk mana yang lebih didengar","Menghitung jumlah buah","Menyalakan lampu pasar"], answer:0, fb:"Makin penting = makin keras didengar mesin." },
    { q:"'Standar kelulusan' diperketat. Apa yang terjadi?", opts:["Mesin jadi pelit bilang YA, garisnya bergeser","Mesin rusak","Buahnya hilang"], answer:0, fb:"Standar = ambang. Ketat = susah lolos." },
    { q:"Aturan 'harus dua-duanya ada' itu contoh ...", opts:["Semangka matang = bunyi OKE dan garis OKE","Cukup salah satu","Tidak perlu petunjuk"], answer:0, fb:"Dua-duanya wajib ada — kalau satu hilang, keputusannya BELUM." }
  ],
  aktivasi: [
    { q:"Kenapa mesin butuh 'kepribadian' seperti Si Cuek/Si Lembut?", opts:["Biar bisa paham hal melengkung, bukan cuma garis lurus","Biar warnanya bagus","Biar koding pendek"], answer:0, fb:"Tanpa ini, 100 lapis pun cuma garis lurus." },
    { q:"Si Cuek (ReLU) itu orang yang ...", opts:["Mendiamkan yang jelek, meneruskan yang bagus","Selalu bilang ya","Selalu tidur"], answer:0, fb:"Negatif → diam (0), positif → terus." }
  ],
  mlp: [
    { q:"Tim berlapis bekerja seperti ...", opts:["Estafet: tiap tim mengoper ringkasan ke tim berikut","Semua kerja sendiri-sendiri","Ketua kerja, sisanya nonton"], answer:0, fb:"Depan lihat ciri, tengah simpulkan, ketua putuskan." },
    { q:"Garis tebal antar lingkaran artinya ...", opts:["Pengaruhnya kuat (sangat didengar)","Kabelnya rusak","Lingkarannya rusak"], answer:0, fb:"Biru = mendukung, merah = menolak." }
  ],
  loss: [
    { q:"Skor meleset (loss) = 0 artinya ...", opts:["Tepat! Tebakan sama dengan jawaban","Mesin rusak","Soal hilang"], answer:0, fb:"Tugas mesin: bikin skor ini sekecil mungkin." },
    { q:"Main tebak pilihan: kapan hukumannya paling berat?", opts:["Saat salah tapi pede banget","Saat salah dikit","Saat benar"], answer:0, fb:"Makanya mesin belajar tidak asal pede." }
  ],
  gradient: [
    { q:"Main ski dalam kabut: kamu ...", opts:["Rasakan miringnya tanah, melangkah ke arah turun","Tutup mata dan lompat jauh","Diam saja menunggu"], answer:0, fb:"Itulah belajar: intip kemiringan, langkah turun." },
    { q:"Langkah super besar (nekat) akibatnya ...", opts:["Bola mental-mental, bisa kabur dari lembah","Pasti langsung sampai","Tidak ada efek"], answer:0, fb:"Coba di gambar: geser langkah ke besar lalu Jalankan!" },
    { q:"Langkah super kecil akibatnya ...", opts:["Aman tapi lamaaa banget sampainya","Langsung sampai","Bola terbang"], answer:0, fb:"Hati-hati itu bagus, tapi jangan terlalu takut." }
  ],
  backprop: [
    { q:"Tim kalah. Evaluasi yang adil itu ...", opts:["Kesalahan dibagi ke belakang sesuai andil masing-masing","Salahkan kiper saja","Bubarkan tim"], answer:0, fb:"Yang pegang bola lama tanggung jawab besar." },
    { q:"Setelah tahu bagian salah masing-masing, lalu ...", opts:["Tiap anggota dikoreksi sedikit ke arah benar","Dibiarkan saja","Diacak total"], answer:0, fb:"Koreksi kecil tiap putaran = belajar." }
  ],
  overfit: [
    { q:"Si Penghafal vs Si Paham: siapa menang di ujian asli?", opts:["Si Paham (stabil di soal baru)","Si Penghafal (hafal 100 soal)","Seri"], answer:0, fb:"Latihan 100 tapi ujian jeblok = menghafal." },
    { q:"Cara agar mesin tidak jadi penghafal?", opts:["Soal lebih banyak / cara lebih sederhana","Cara makin rumit","Soal makin berantakan"], answer:0, fb:"Sederhana tapi paham > rumit tapi hafal." }
  ],
  cnn: [
    { q:"Komputer 'melihat' foto dengan cara ...", opts:["Menggeser bingkai kecil ke tiap sudut, mencatat ada pola apa","Menelan fotonya langsung","Menebak acak"], answer:0, fb:"Geser → catat → rangkum. Ulangi berlapis." },
    { q:"'Meremas' gambar (pooling) gunanya ...", opts:["Gambar mengecil tapi intinya tetap awet","Gambar jadi besar","Gambar diacak"], answer:0, fb:"Ambil yang terbesar tiap kotak kecil." }
  ],
  rnn: [
    { q:"Catatan kecil untuk sinetron gunanya ...", opts:["Mengingat ringkasan episode lalu saat nonton episode baru","Mencatat harga tiket","Tidak ada guna"], answer:0, fb:"Tiap kejadian = ingatan lama + kejadian baru." },
    { q:"Daya ingat = 0 artinya ...", opts:["Amnesia total, tiap kejadian langsung lupa","Ingatan super kuat","Catatan terbakar"], answer:0, fb:"Geser ke 0 dan mainkan: garisnya datar!" }
  ],
  attention: [
    { q:"'Kucing mengejar tikus karena IA lapar.' Kata 'ia' paling mendengarkan ...", opts:["Kucing","Tikus","Karena"], answer:0, fb:"Klik 'ia' di gambar dan lihat yang paling pekat!" },
    { q:"Perhatian tiap baris totalnya ...", opts:["Selalu 100% (dibagi-bagi)","Bisa 500%","Nol"], answer:0, fb:"Perhatian itu terbatas, harus dibagi." }
  ],
  playground: [
    { q:"Soal lingkaran gagal terus dengan tim 0. Artinya ...", opts:["Garis lurus tak bisa memisahkan lingkaran, butuh tim tengah","Soalnya rusak","Tombol Latih rusak"], answer:0, fb:"Buktikan: naikkan tim jadi 4 lalu latih → berhasil!" },
    { q:"Bos spiral akhirnya selesai kalau ...", opts:["Tim cukup banyak (8+4) + sabar melatih","Tim dikosongkan","Belajar 1 detik"], answer:0, fb:"Soal sulit butuh tim besar + latihan lama." }
  ]
};
