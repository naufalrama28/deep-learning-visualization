// Sumber kebenaran konten. Aturan: bahasa warung dulu, istilah teknis selalu ada terjemahannya.
var MODULES = [
  { id:"beranda", title:"Beranda & Peta Belajar", time:"5 mnt" },
  { id:"neuron", title:"Otak Mini (Neuron)", time:"10 mnt", goal:"Paham cara mesin menimbang petunjuk.", terms:["bobot = seberapa penting petunjuk","bias = standar kelulusan"] },
  { id:"aktivasi", title:"Kapan Lampu Menyala", time:"8 mnt", goal:"Kenapa mesin butuh 'kepribadian'.", terms:["Si Lembut (sigmoid)","Si Cuek (ReLU)","Si Tegas (step)"] },
  { id:"mlp", title:"Kerja Tim Berlapis", time:"10 mnt", goal:"Melihat tebakan mengalir lapis demi lapis.", terms:["tim depan/tengah/ketua (layer)","mengoper ringkasan"] },
  { id:"loss", title:"Seberapa Meleset?", time:"8 mnt", goal:"Skor meleset makin kecil makin bagus.", terms:["skor meleset (loss)","jawaban benar (target)"] },
  { id:"gradient", title:"Bola ke Lembah", time:"10 mnt", goal:"Langkah kecil vs nekat.", terms:["panjang langkah (learning rate)","kemiringan (gradien)"] },
  { id:"backprop", title:"Evaluasi Tim", time:"12 mnt", goal:"Bagi salah ke belakang dengan adil.", terms:["bagi-bagi salah (backward)","koreksi (update)"] },
  { id:"overfit", title:"Hafalan vs Paham", time:"10 mnt", goal:"Nilai ujian lebih penting dari latihan.", terms:["menghafal (overfitting)","paham (generalisasi)"] },
  { id:"cnn", title:"Mata Komputer", time:"12 mnt", goal:"Meraba foto pakai pola kecil.", terms:["bingkai peraba (filter)","peta temuan (feature map)","peta ringkas (pooling)"] },
  { id:"rnn", title:"Daya Ingat", time:"10 mnt", goal:"Catatan kecil untuk urutan.", terms:["urutan (sequence)","catatan (hidden state)"] },
  { id:"attention", title:"Rapat Kata", time:"12 mnt", goal:"Tiap kata memilih yang didengarkan.", terms:["perhatian (attention)","dibagi 100% (softmax)"] },
  { id:"playground", title:"Latihan Nyata", time:"20 mnt", goal:"Latih AI sungguhan di browser.", terms:["bentuk soal (dataset)","tim tengah (hidden)","batas warna (boundary)"] }
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
