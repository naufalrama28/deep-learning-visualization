// Sumber kebenaran konten: judul, tujuan, istilah, dan bank kuis tiap modul.
// Bahasa: Indonesia. Setiap istilah Inggris wajib ada terjemahannya.
var MODULES = [
  { id:"beranda", title:"Beranda & Peta Belajar", time:"5 mnt" },
  { id:"neuron", title:"Neuron & Perceptron", time:"12 mnt", goal:"Memahami w, b, dan garis keputusan.", terms:["bobot (weight)","bias","weighted sum","threshold (ambang)"] },
  { id:"aktivasi", title:"Fungsi Aktivasi", time:"10 mnt", goal:"Kenapa butuh non-linearitas.", terms:["sigmoid","tanh","ReLU","softmax","gradien","saturasi"] },
  { id:"mlp", title:"MLP & Forward Pass", time:"12 mnt", goal:"Melihat data mengalir lapis demi lapis.", terms:["layer (lapisan)","hidden layer","forward propagation"] },
  { id:"loss", title:"Loss Function", time:"10 mnt", goal:"Mengukur seberapa meleset tebakan.", terms:["target","prediksi","MSE","cross-entropy"] },
  { id:"gradient", title:"Gradient Descent", time:"12 mnt", goal:"Intuisi lr dan langkah ke lembah.", terms:["gradien","learning rate","epoch","overshoot","divergen"] },
  { id:"backprop", title:"Backpropagation", time:"15 mnt", goal:"Alur error mundur + update bobot.", terms:["chain rule","backward pass","update"] },
  { id:"overfit", title:"Overfitting", time:"12 mnt", goal:"Bedakan hafal vs paham.", terms:["overfitting","underfitting","generalisasi","train/test"] },
  { id:"cnn", title:"CNN & Konvolusi", time:"15 mnt", goal:"Filter + pooling pada gambar.", terms:["konvolusi","kernel/filter","stride","pooling","feature map"] },
  { id:"rnn", title:"RNN & Memori", time:"12 mnt", goal:"Hidden state untuk urutan.", terms:["sequence (urutan)","hidden state","memori"] },
  { id:"attention", title:"Attention & Transformer", time:"15 mnt", goal:"Bobot perhatian antar kata.", terms:["query/key/value","attention weight","softmax"] },
  { id:"playground", title:"Playground 2D", time:"20 mnt", goal:"Latih MLP sungguhan di browser.", terms:["dataset","hidden neuron","decision boundary","akurasi"] }
];

// Bank kuis: jawaban benar ditandai answer (index), plus feedback.
var QUIZZES = {
  neuron: [
    { q:"Apa peran bobot (w)?", opts:["Menentukan pentingnya tiap input","Jumlah data latih","Kecepatan internet"], answer:0, fb:"Bobot besar = input itu sangat berpengaruh ke output." },
    { q:"Apa yang terjadi jika bias (b) diperbesar?", opts:["Garis keputusan bergeser, neuron lebih mudah menyala","Bobot jadi nol","Input hilang"], answer:0, fb:"Bias = dorongan awal / standar kelulusan." },
    { q:"Gerbang AND menyala jika...", opts:["Kedua input 1","Salah satu input 1","Semua input 0"], answer:0, fb:"AND butuh dua-duanya. OR cukup salah satu." }
  ],
  aktivasi: [
    { q:"Kenapa butuh aktivasi non-linear seperti ReLU?", opts:["Agar jaringan bisa belajar pola melengkung, bukan cuma garis lurus","Agar koding lebih pendek","Agar warna bagus"], answer:0, fb:"Tanpa non-linear, 100 layer = 1 layer linear." },
    { q:"ReLU melakukan apa?", opts:["Negatif → 0, positif → terus","Semua jadi 1","Membalik tanda"], answer:0, fb:"max(0,x). Sederhana tapi powerful." }
  ],
  mlp: [
    { q:"Forward pass itu...", opts:["Aliran data dari input → hidden → output","Aliran error mundur","Menghapus data"], answer:0, fb:"Forward = menebak. Backward = mengoreksi." },
    { q:"Garis tebal antar neuron artinya...", opts:["Bobot besar (pengaruh kuat)","Kabel rusak","Neuron mati"], answer:0, fb:"Biru = positif, merah = negatif." }
  ],
  loss: [
    { q:"Loss kecil artinya...", opts:["Tebakan dekat target","Model rusak","Data habis"], answer:0, fb:"Tugas training = meminimalkan loss." },
    { q:"Cross-entropy menghukum paling keras saat...", opts:["Salah tapi sangat pede (mis. target 1, tebak 0.01)","Salah dikit","Benar"], answer:0, fb:"Makanya cocok untuk klasifikasi." }
  ],
  gradient: [
    { q:"Rumus 1 langkah gradient descent?", opts:["w −= lr × gradien","w += data","w = 0"], answer:0, fb:"Melangkah berlawanan arah kemiringan." },
    { q:"Learning rate terlalu besar berakibat...", opts:["Mental-mental / divergen (loss meledak)","Pasti lebih cepat konvergen","Tidak ada efek"], answer:0, fb:"Coba lr=0.95 di visual dan lihat bolanya!" },
    { q:"Gradien = ...", opts:["Kemiringan kurva loss di titik itu","Jumlah layer","Ukuran gambar"], answer:0, fb:"Kemiringan + → melangkah kiri." }
  ],
  backprop: [
    { q:"Backprop mengalirkan apa dan ke mana?", opts:["Error dari output mundur ke tiap bobot","Data dari input maju","Listrik ke GPU"], answer:0, fb:"Backward = bagi-bagi kesalahan." },
    { q:"Bobot dengan input besar saat error...", opts:["Dapat koreksi besar (tanggung jawab besar)","Tidak dikoreksi","Dihapus"], answer:0, fb:"gradien = error × input." }
  ],
  overfit: [
    { q:"Ciri overfitting?", opts:["Loss latih kecil, loss uji besar","Keduanya besar","Keduanya kecil"], answer:0, fb:"Hafal latihan, gagal di soal baru." },
    { q:"Obat overfitting?", opts:["Data lebih banyak / model lebih sederhana","Model lebih rumit","Noise lebih banyak"], answer:0, fb:"Sederhana tapi paham > rumit tapi hafal." }
  ],
  cnn: [
    { q:"Filter/konvolusi bertugas...", opts:["Mendeteksi pola lokal (tepi, garis) di tiap posisi","Menghapus gambar","Menambah noise"], answer:0, fb:"Geser jendela 3×3 ke seluruh gambar." },
    { q:"Max-pooling 2×2 melakukan...", opts:["Ambil nilai terbesar tiap kotak → gambar mengecil, inti tetap","Memperbesar gambar 2x","Mengacak piksel"], answer:0, fb:"Meremas tapi mempertahankan sinyal terkuat." }
  ],
  rnn: [
    { q:"Hidden state (h) adalah...", opts:["Ingatan ringkas dari masa lalu urutan","Jumlah neuron","Ukuran font"], answer:0, fb:"Dibawa tiap langkah: h = tanh(W·h + U·x)." },
    { q:"W (kekuatan ingatan) terlalu kecil → ...", opts:["Model pelupa (ingatan hilang tiap langkah)","Model meledak","Tidak ada efek"], answer:0, fb:"Geser W ke 0 dan lihat jejak memorinya datar." }
  ],
  attention: [
    { q:"Attention weight besar artinya...", opts:["Kata itu sangat diperhatikan untuk memahami kata lain","Kata dihapus","Kata dicetak tebal"], answer:0, fb:"Pekat = penting. Total tiap baris = 100%." },
    { q:"Rumus attention?", opts:["softmax(QKᵀ/√d)·V","w·x+b saja","acak"], answer:0, fb:"Kemiripan query-key diubah jadi peluang." }
  ],
  playground: [
    { q:"Data lingkaran/spiral butuh apa agar selesai?", opts:["Hidden layer + aktivasi non-linear","Learning rate 0 saja","Tanpa hidden layer"], answer:0, fb:"Garis lurus tak bisa memisahkan lingkaran!" },
    { q:"Hidden neuron 0 artinya model...", opts:["Cuma garis lurus (linear)","Sangat pintar","Rusak total"], answer:0, fb:"Coba h1=0 lalu latih — loss mentok." }
  ]
};
