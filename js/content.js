/**
 * content.js — All content for Neural Lab
 * Module metadata and quiz bank with Lumen narrative
 */

// Module metadata
var MODULES = [
  { id: 'bab01', title: 'Satu Sel Otak', time: '10 mnt', goal: 'Pasang neuron pertama yang bisa menimbang petunjuk', terms: ['neuron', 'perceptron', 'weight', 'bias', 'decision boundary'] },
  { id: 'bab02', title: 'Memberi Perasaan', time: '8 mnt', goal: 'Beri Lumen kemampuan menyatakan keyakinan bertingkat', terms: ['fungsi aktivasi', 'sigmoid', 'tanh', 'ReLU', 'gradien'] },
  { id: 'bab03', title: 'Kekuatan Tim', time: '10 mnt', goal: 'Rakit tim neuron berlapis yang bisa menangani banyak ciri', terms: ['MLP', 'hidden layer', 'forward pass', 'layer'] },
  { id: 'bab04', title: 'Cermin Kebenaran', time: '8 mnt', goal: 'Berikan Lumen cermin untuk menilai tebakannya sendiri', terms: ['loss', 'MSE', 'cross-entropy', 'target', 'prediksi'] },
  { id: 'bab05', title: 'Menuruni Bukit', time: '10 mnt', goal: 'Ajari Lumen seni memperbaiki diri selangkah demi selangkah', terms: ['gradient descent', 'learning rate', 'gradien', 'konvergensi'] },
  { id: 'bab06', title: 'Evaluasi Bersama', time: '12 mnt', goal: 'Bagi kesalahan secara adil ke seluruh anggota tim', terms: ['backpropagation', 'chain rule', 'backward pass', 'update'] },
  { id: 'bab07', title: 'Hafal vs Paham', time: '10 mnt', goal: 'Hindari jebakan menghafal data latih', terms: ['overfitting', 'underfitting', 'generalisasi', 'training data', 'test data'] },
  { id: 'bab08', title: 'Mata Digital', time: '12 mnt', goal: 'Beri Lumen kemampuan melihat gambar', terms: ['CNN', 'konvolusi', 'filter', 'feature map', 'pooling'] },
  { id: 'bab09', title: 'Ingatan Berantai', time: '10 mnt', goal: 'Beri Lumen kemampuan mengingat urutan', terms: ['RNN', 'hidden state', 'sequence', 'LSTM'] },
  { id: 'bab10', title: 'Seni Mendengarkan', time: '12 mnt', goal: 'Ajari Lumen memilih informasi yang relevan', terms: ['attention', 'query', 'key', 'value', 'Transformer'] },
  { id: 'bab11', title: 'Laboratorium', time: '20 mnt', goal: 'Latih AI sungguhan dengan tanganmu sendiri', terms: ['dataset', 'epoch', 'akurasi', 'decision boundary'] }
];

// Quiz bank with varied answer positions
var QUIZZES = {
  bab01: [
    {
      q: 'Lumen punya 1 neuron dengan 2 input. Apa yang TIDAK bisa dilakukannya?',
      opts: [
        'Membedakan data yang butuh garis lengkung (seperti lingkaran)',
        'Membedakan buah matang dari mentah berdasarkan 2 ciri',
        'Membuat keputusan YA atau TIDAK',
        'Menimbang 2 petunjuk dengan bobot berbeda'
      ],
      answer: 0,
      fb: 'Neuron tunggal hanya bisa menarik garis lurus. Data yang butuh batas lengkung (seperti lingkaran di tengah) tidak bisa dipisahkan.'
    },
    {
      q: 'Ketika kamu menaikkan bias, apa yang terjadi pada garis pemisah?',
      opts: [
        'Garis berputar menjadi lebih miring',
        'Garis menghilang',
        'Garis bergeser sehingga lebih banyak area yang dikatakan "YA"',
        'Tidak ada perubahan'
      ],
      answer: 2,
      fb: 'Bias yang lebih tinggi = standar lebih longgar = lebih mudah bilang YA. Garis bergeser, bukan berputar.'
    },
    {
      q: 'Bobot (weight) dalam neuron menentukan...',
      opts: [
        'Jumlah neuron yang aktif',
        'Seberapa penting tiap petunjuk dalam keputusan',
        'Kecepatan neuron memproses informasi',
        'Warna output neuron'
      ],
      answer: 1,
      fb: 'Bobot = seberapa penting. Bobot besar = petunjuk sangat didengar. Bobot kecil = petunjuk diabaikan.'
    }
  ],
  bab02: [
    {
      q: 'Kenapa sigmoid "mulai ditinggalkan" di jaringan dalam?',
      opts: [
        'Sigmoid tidak bisa menghasilkan angka',
        'Sigmoid terlalu cepat',
        'Sigmoid hanya bekerja untuk gambar',
        'Di ujung kurva, gradiennya nyaris nol sehingga mesin berhenti belajar (vanishing gradient)'
      ],
      answer: 3,
      fb: 'Saat input sangat besar atau sangat negatif, kurva sigmoid datar → gradien ≈ 0 → bobot tidak terupdate → mesin berhenti belajar.'
    },
    {
      q: 'Apa yang terjadi jika semua neuron menggunakan fungsi linear (bukan aktivasi non-linear)?',
      opts: [
        'Jaringan menjadi lebih cepat',
        'Jaringan sedalam apapun hanya bisa menghasilkan garis lurus — tidak lebih pintar dari 1 neuron',
        'Jaringan bisa mengenali gambar lebih baik',
        'Tidak ada efek'
      ],
      answer: 1,
      fb: 'Tumpukan fungsi linear tetap linear (seperti 50 fotokopi dari fotokopi). Non-linearitas dari aktivasi itulah yang memberi kekuatan.'
    }
  ],
  bab03: [
    {
      q: 'Jaringan 2→3→2→1 berarti...',
      opts: [
        '2 output, 3 input, dan 2 lapis tersembunyi',
        'Total 8 neuron yang semuanya sama',
        'Jaringan dengan 4 lapis input',
        '2 input, 3 neuron di lapis tersembunyi pertama, 2 di lapis kedua, 1 output'
      ],
      answer: 3,
      fb: 'Notasi 2→3→2→1 menunjukkan jumlah neuron per lapis dari kiri (input) ke kanan (output).'
    },
    {
      q: 'Sari menambah 50 lapis TAPI lupa memasang aktivasi. Apa yang terjadi?',
      opts: [
        'Jaringan menjadi 50× lebih pintar',
        'Jaringan error karena terlalu dalam',
        'Jaringan tidak lebih pintar dari 1 lapis — tumpukan linear tetap linear',
        'Jaringan hanya bisa memproses angka negatif'
      ],
      answer: 2,
      fb: 'Tanpa aktivasi non-linear, 50 lapis perkalian matriks = 1 perkalian matriks besar. Buang komputasi, tidak tambah kemampuan.'
    }
  ],
  bab04: [
    {
      q: 'Model A selalu meleset 0.1. Model B biasanya tepat tapi kadang meleset 2.0. MSE memilih siapa?',
      opts: [
        'Model B — karena rata-rata lebih baik',
        'Model A — karena MSE menghukum kesalahan besar (kuadrat!) sangat berat',
        'Keduanya sama',
        'Tidak bisa ditentukan'
      ],
      answer: 1,
      fb: 'MSE = rata-rata kuadrat selisih. 2.0² = 4.0 (sangat besar), sedangkan 0.1² = 0.01 (sangat kecil). MSE sangat tidak mentolerir kesalahan besar.'
    },
    {
      q: 'Kenapa cross-entropy lebih cocok dari MSE untuk klasifikasi (YA/TIDAK)?',
      opts: [
        'Cross-entropy lebih mudah dihitung',
        'MSE tidak bisa dipakai untuk angka',
        'Cross-entropy menghukum kepercayaan yang salah total jauh lebih berat, dan gradiennya tidak vanish saat salah',
        'Tidak ada perbedaan'
      ],
      answer: 2,
      fb: 'Saat jawaban benar = 1 tapi prediksi = 0.01, cross-entropy = -log(0.01) ≈ 4.6 (hukuman besar!). MSE hanya (1-0.01)² ≈ 0.98. Cross-entropy lebih "galak" di kesalahan besar.'
    }
  ],
  bab05: [
    {
      q: 'Learning rate terlalu besar menyebabkan...',
      opts: [
        'Bola berhenti terlalu awal',
        'Belajar lebih cepat dan selalu sampai ke minimum',
        'Bola "mental" melewati lembah dan bisa kabur jauh (divergen)',
        'Tidak ada efek'
      ],
      answer: 2,
      fb: 'Langkah terlalu besar → overshoot → malah naik ke sisi lain → makin besar → kabur. Ini disebut divergensi.'
    },
    {
      q: 'Learning rate terlalu kecil menyebabkan...',
      opts: [
        'Belajar sangat lambat, butuh waktu sangat lama untuk sampai ke minimum',
        'Bola kabur menjauh',
        'Bola langsung ke minimum global',
        'Gradien menjadi nol'
      ],
      answer: 0,
      fb: 'Langkah terlalu kecil = aman tapi lambat. Seperti semut berjalan ke lembah — sampai, tapi butuh waktu sangat lama.'
    },
    {
      q: 'Apa itu "local minimum" dan kenapa itu masalah?',
      opts: [
        'Minimum yang selalu lebih baik dari global minimum',
        'Titik tertinggi di permukaan',
        'Ketika gradien terlalu besar',
        'Lembah kecil di samping lembah utama — bola bisa terjebak di sana dan tidak mencapai titik terendah'
      ],
      answer: 3,
      fb: 'Local minimum = lembah kecil yang bukan terdalam. Bola bisa terjebak di sana karena di sekelilingnya semua naik. Di dunia nyata, ini berarti model tidak mencapai performa terbaik.'
    }
  ],
  bab06: [
    {
      q: 'Setelah dikoreksi, contoh X membaik TAPI contoh Y memburuk. Apakah ini normal?',
      opts: [
        'Tidak normal — pasti ada bug',
        'Normal — koreksi dari satu contoh bisa merugikan contoh lain. Yang dioptimasi adalah rata-rata banyak contoh',
        'Arti model sudah sempurna',
        'Arti learning rate terlalu kecil'
      ],
      answer: 1,
      fb: 'Ini normal dan expected. Itulah kenapa kita latih dengan banyak contoh sekaligus (batch) — koreksi rata-rata menguntungkan mayoritas.'
    },
    {
      q: 'Chain rule dalam backpropagation berfungsi untuk...',
      opts: [
        'Menjumlahkan semua bobot',
        'Menghitung learning rate',
        'Menghitung seberapa besar kontribusi tiap neuron terhadap kesalahan total',
        'Menentukan jumlah lapis'
      ],
      answer: 2,
      fb: 'Chain rule = aturan rantai. Dari output ke input, kita hitung "seberapa salah hasil kalau cara-ku digeser dikit?" — itulah kontribusi masing-masing.'
    }
  ],
  bab07: [
    {
      q: 'Si Cerdas hafal 30 struk dan gagal di pelanggan baru. Sari mengusulkan tambah 200 lapis. Setuju?',
      opts: [
        'Setuju — lebih dalam = lebih pintar',
        'Tidak peduli jumlah lapis',
        'Tambah 200 lapis lalu hapus data latih',
        'Tidak — makin rumit makin jago menghafal. Yang dibutuhkan justru model lebih sederhana atau data lebih banyak'
      ],
      answer: 3,
      fb: 'Overfitting diobati dengan: (1) data lebih banyak, (2) model lebih sederhana, (3) early stopping. Menambah lapis = menambah kapasitas menghafal = memperburuk overfitting.'
    },
    {
      q: 'Apa tanda bahwa model mengalami overfitting?',
      opts: [
        'Akurasi data latih dan data uji sama-sama rendah',
        'Akurasi data latih tinggi tapi akurasi data uji jauh lebih rendah',
        'Loss tidak pernah turun',
        'Akurasi data latih dan data uji sama-sama tinggi'
      ],
      answer: 1,
      fb: 'Overfitting = hafal data latih tapi gagal di data baru. Ciri khas: train accuracy >> test accuracy. Underfitting = keduanya rendah.'
    }
  ],
  bab08: [
    {
      q: 'Foto struk miring 45°. Apakah filter pencari garis tegak masih menemukannya?',
      opts: [
        'Ya, filter otomatis menyesuaikan sudut',
        'Filter tidak terpengaruh oleh rotasi',
        'Foto tidak bisa miring',
        'Tidak optimal — filter hanya cocok pada orientasi yang dilatih. Solusi: augmentasi (latih dengan foto diputar/digeser)'
      ],
      answer: 3,
      fb: 'Filter belajar pola pada orientasi tertentu. Foto miring = pola bergeser. Solusi nyata: augmentasi data (putar, geser, zoom foto saat latihan) agar model robust.'
    },
    {
      q: 'Apa fungsi max-pooling dalam CNN?',
      opts: [
        'Merangkum wilayah: ambil nilai terbesar tiap blok, sehingga gambar mengecil tapi intinya tetap',
        'Menambah detail pada gambar',
        'Mengubah warna gambar',
        'Memperbesar gambar'
      ],
      answer: 0,
      fb: 'Max-pooling = "siapa yang paling kuat di wilayah ini?". Ambil yang terbesar, buang yang lain. Gambar mengecil, tapi fitur penting tetap terwakili.'
    }
  ],
  bab09: [
    {
      q: 'Sari ingin meramal stok dari 365 hari data menggunakan RNN sederhana. Apa risiko utamanya?',
      opts: [
        'RNN tidak bisa memproses angka',
        'Informasi lama memudar (vanishing gradient) dan satu kejadian ekstrem bisa menimpa segalanya',
        '365 hari terlalu sedikit data',
        'Tidak ada risiko'
      ],
      answer: 1,
      fb: 'RNN sederhana punya catatan kecil yang mudah "lupa" (info lama memudar) dan mudah "kaget" (satu kejadian baru menimpa catatan). Untuk ketergantungan jauh, butuh LSTM atau attention.'
    },
    {
      q: 'Apa perbedaan utama LSTM dari RNN biasa?',
      opts: [
        'LSTM lebih cepat dihitung',
        'LSTM tidak punya hidden state',
        'LSTM hanya bekerja untuk gambar',
        'LSTM punya gerbang selektif: memilih apa yang dilupakan, disimpan, dan dikeluarkan — sehingga bisa mengingat lebih lama'
      ],
      answer: 3,
      fb: 'LSTM = RNN + 3 gerbang (forget, input, output). Gerbang ini memilih secara selektif: "lupakan yang tidak penting, simpan yang penting, keluarkan yang relevan." Ini membuatnya bisa mengingat ketergantungan jauh.'
    }
  ],
  bab10: [
    {
      q: 'Dalam "Kucing mengejar tikus karena ia lapar", kata "ia" seharusnya paling memperhatikan kata...',
      opts: [
        '"Tikus" — karena tikus yang dikejar',
        '"Kucing" — karena kucing yang lapar, bukan tikus',
        '"Karena" — karena itu kata penghubung',
        '"Mengejar" — karena itu kata kerja'
      ],
      answer: 1,
      fb: 'Attention mechanism belajar bahwa "ia" merujuk ke "Kucing" (subjek) karena konteks "lapar" lebih cocok untuk pelaku. Inilah kekuatan attention: resolve referensi secara kontekstual.'
    },
    {
      q: 'Apa yang dilakukan softmax dalam attention?',
      opts: [
        'Mengubah skor mentah menjadi persen yang totalnya 100% — perhatian dibagi-bagi, tidak bisa ke semua penuh',
        'Menghapus kata yang tidak penting',
        'Mengalikan semua bobot',
        'Menjumlahkan semua vektor'
      ],
      answer: 0,
      fb: 'Softmax: eksponensiasi lalu normalisasi sehingga total = 1 (100%). Hasilnya = distribusi perhatian. Kata yang paling relevan mendapat porsi terbesar.'
    }
  ],
  bab11: [
    {
      q: 'Dataset spiral: 100% di data latih tapi 70% di data uji. Diagnosisnya?',
      opts: [
        'Underfitting — model terlalu sederhana',
        'Model sudah sempurna',
        'Overfitting — model menghafal data latih tapi gagal generalisasi. Obat: sederhanakan model, tambah data, atau early stopping',
        'Learning rate terlalu kecil'
      ],
      answer: 2,
      fb: 'Train 100% + test 70% = overfitting klasik. Model menghafal pola spesifik data latih termasuk noise-nya, sehingga gagal di data baru yang belum dilihat.'
    },
    {
      q: 'Kenapa dataset lingkaran TIDAK BISA dipisah dengan hidden layer 0 (tanpa lapis tersembunyi)?',
      opts: [
        'Karena lingkaran bukan data yang valid',
        'Karena learning rate tidak cocok',
        'Karena aktivasi yang salah',
        'Karena batas keputusan tanpa hidden layer hanya garis lurus, sedangkan lingkaran butuh batas lengkung'
      ],
      answer: 3,
      fb: 'Tanpa hidden layer (+ aktivasi non-linear), jaringan hanya bisa menarik garis lurus. Lingkaran butuh batas lengkung → butuh minimal 1 hidden layer.'
    }
  ]
};
