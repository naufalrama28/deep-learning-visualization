// Router hash, tema, progress, kuis, kartu beranda. Komentar: Bahasa Indonesia.
(function(){
  var TITLES = {
    beranda:["Beranda","Pilih modul di kiri, geser semua slider, jangan takut salah."],
    neuron:["1️⃣ Neuron & Perceptron","Keran + timbangan: atur bobot & bias, lihat garis keputusan."],
    aktivasi:["2️⃣ Fungsi Aktivasi","Kapan lampu menyala? Bandingkan sigmoid, tanh, ReLU."],
    mlp:["3️⃣ Jaringan & Forward Pass","Lihat angka mengalir lapis demi lapis."],
    loss:["4️⃣ Loss Function","Seberapa meleset tebakanmu? Geser dan lihat."],
    gradient:["5️⃣ Gradient Descent","Jadi bola ski: pilih langkah, meluncur ke lembah."],
    backprop:["6️⃣ Backpropagation","Bagi-bagi kesalahan ke belakang, 4 langkah."],
    overfit:["7️⃣ Overfitting","Hafalan vs paham: atur kerumitan model."],
    cnn:["8️⃣ CNN & Konvolusi","Geser filter di atas gambar, lihat feature map."],
    rnn:["9️⃣ RNN & Memori","Bawa papan tulis ingatan menyusuri urutan."],
    attention:["🔟 Attention & Transformer","Klik kata, lihat siapa diperhatikan siapa."],
    playground:["🎮 Playground 2D","Latih jaringan sungguhan di browser. Buktikan sendiri!"]
  };
  // Fungsi init tiap visual didaftarkan di sini (didefinisikan di viz-*.js)
  var VIZ_INIT = {
    neuron:"initVizNeuron", aktivasi:"initVizActivation", mlp:"initVizMlp",
    loss:"initVizLoss", gradient:"initVizGradient", backprop:"initVizBackprop",
    overfit:"initVizOverfit", cnn:"initVizCnn", rnn:"initVizRnn",
    attention:"initVizAttention", playground:"initVizPlayground"
  };
  var done = {}; // modul yg pernah di-init agar tidak dobel listener
  var MODS = ["neuron","aktivasi","mlp","loss","gradient","backprop","overfit","cnn","rnn","attention","playground"];

  function currentRoute(){
    var h = (location.hash||"#beranda").replace("#","");
    return TITLES[h]?h:"beranda";
  }
  function show(route){
    document.querySelectorAll(".page").forEach(function(s){s.classList.add("hidden")});
    var sec = document.getElementById("sec-"+route);
    if(sec) sec.classList.remove("hidden");
    document.querySelectorAll("#nav a").forEach(function(a){
      a.classList.toggle("active", a.getAttribute("data-route")===route);
    });
    document.getElementById("page-title").textContent = TITLES[route][0];
    document.getElementById("page-sub").textContent = TITLES[route][1];
    document.getElementById("sidebar").classList.remove("open");
    // Jalankan visualisasi modul saat pertama dibuka
    var fn = VIZ_INIT[route];
    if(fn && !done[route] && typeof window[fn]==="function"){
      try{ window[fn](); done[route]=true; }
      catch(e){ console.error("Gagal init "+route, e); }
    }
    // gambar ulang canvas saat pindah (agar tajam setelah hidden)
    window.dispatchEvent(new Event("resize"));
    window.scrollTo(0,0);
  }

  // ---- Progress (localStorage) ----
  function loadProgress(){
    try{ return JSON.parse(localStorage.getItem("dlviz-progress")||"{}"); }catch(e){ return {}; }
  }
  function saveProgress(p){ localStorage.setItem("dlviz-progress", JSON.stringify(p)); renderProgress(); }
  function renderProgress(){
    var p = loadProgress();
    var n = MODS.filter(function(m){return p[m]}).length;
    var pct = Math.round(n/MODS.length*100);
    document.getElementById("progress-fill").style.width = pct+"%";
    document.getElementById("progress-text").textContent = pct+"% ("+n+"/"+MODS.length+")";
    document.querySelectorAll(".done-btn").forEach(function(b){
      var m = b.getAttribute("data-mod");
      b.textContent = p[m] ? "✓ Selesai! (klik untuk batal)" : "✓ Tandai selesai";
      b.classList.toggle("primary", !!p[m]);
    });
    document.querySelectorAll("#nav a[data-route]").forEach(function(a){
      var r = a.getAttribute("data-route");
      if(p[r] && !a.textContent.includes("✓")) a.textContent = "✓ "+a.textContent;
    });
  }

  // ---- Kuis generik dari QUIZZES ----
  function renderQuizzes(){
    document.querySelectorAll(".quiz[data-quiz]").forEach(function(box){
      var key = box.getAttribute("data-quiz");
      var list = (window.QUIZZES||{})[key]||[];
      var html = "<h3>🧪 Kuis cek-paham ("+list.length+" soal)</h3>";
      list.forEach(function(item,i){
        html += '<div class="q" data-q="'+i+'"><p>'+(i+1)+'. '+item.q+'</p>';
        item.opts.forEach(function(op,j){
          html += '<button data-opt="'+j+'">'+String.fromCharCode(65+j)+'. '+op+'</button>';
        });
        html += '<div class="fb"></div></div>';
      });
      box.innerHTML = html;
      box.querySelectorAll(".q").forEach(function(qdiv){
        var qi = +qdiv.getAttribute("data-q");
        var item = list[qi];
        qdiv.querySelectorAll("button").forEach(function(btn){
          btn.onclick = function(){
            var chosen = +btn.getAttribute("data-opt");
            qdiv.querySelectorAll("button").forEach(function(b2){
              b2.classList.remove("correct","wrong");
              if(+b2.getAttribute("data-opt")===item.answer) b2.classList.add("correct");
            });
            if(chosen!==item.answer) btn.classList.add("wrong");
            qdiv.querySelector(".fb").textContent = (chosen===item.answer?"✅ Benar! ":"❌ Belum tepat. ") + item.fb;
          };
        });
      });
    });
  }

  // ---- Kartu beranda ----
  function renderHome(){
    var wrap = document.getElementById("home-cards");
    if(!wrap || typeof MODULES==="undefined") return;
    wrap.innerHTML = MODULES.filter(function(m){return m.id!=="beranda"}).map(function(m){
      return '<div class="mini-card"><b>'+m.title+'</b><span class="tiny">⏱ '+m.time+' • '+m.goal+'</span><br><a class="btn small" style="margin-top:8px" href="#'+m.id+'">Buka →</a></div>';
    }).join("");
  }

  // ---- Tema ----
  function applyTheme(t){
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("dlviz-theme", t);
    document.getElementById("theme-btn").textContent = t==="dark"?"☀️ Mode Terang":"🌙 Mode Gelap";
    window.dispatchEvent(new Event("themechange"));
  }

  window.addEventListener("DOMContentLoaded", function(){
    renderHome(); renderQuizzes(); renderProgress();
    applyTheme(localStorage.getItem("dlviz-theme")||"light");
    document.getElementById("theme-btn").onclick = function(){
      var cur = document.documentElement.getAttribute("data-theme");
      applyTheme(cur==="dark"?"light":"dark");
    };
    document.getElementById("reset-progress").onclick = function(){
      if(confirm("Hapus semua centang progress?")){ localStorage.removeItem("dlviz-progress"); location.reload(); }
    };
    document.querySelectorAll(".done-btn").forEach(function(b){
      b.onclick = function(){
        var p = loadProgress(); var m = b.getAttribute("data-mod");
        p[m]=!p[m]; saveProgress(p);
      };
    });
    document.getElementById("menu-btn").onclick = function(){
      document.getElementById("sidebar").classList.toggle("open");
    };
    var sp = document.getElementById("global-speed");
    if(sp) sp.oninput = function(){ window.GLOBAL_SPEED = parseFloat(sp.value); };
    window.GLOBAL_SPEED = 1;
    window.addEventListener("hashchange", function(){ show(currentRoute()); });
    show(currentRoute());
  });
})();
