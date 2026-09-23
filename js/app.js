// Router hash, tema, progress, XP Si Cerdas, maskot, kuis, kartu beranda.
(function(){
  var TITLES = {
    beranda:["Beranda","Markas Sari: peta 11 misi merakit Si Cerdas."],
    neuron:["Misi 1 — Otak Mini","Pasang satu sel otak penimbang untuk Sari."],
    aktivasi:["Misi 2 — Lampu Keyakinan","Beri Si Cerdas perasaan bertingkat."],
    mlp:["Misi 3 — Tim Peringkas","Bentuk tim berlapis yang mengoper ringkasan."],
    loss:["Misi 4 — Cermin","Beri Si Cerdas cermin penilai kesalahan."],
    gradient:["Misi 5 — Menuruni Lembah","Ajari Si Cerdas memperbaiki diri selangkah demi selangkah."],
    backprop:["Misi 6 — Evaluasi Adil","Bagi kesalahan ke seluruh tim dengan adil."],
    overfit:["Misi 7 — Jujur, Jangan Menghafal","Bedakan paham vs hafal sebelum Sari rugi."],
    cnn:["Misi 8 — Mata","Beri Si Cerdas mata untuk melihat foto."],
    rnn:["Misi 9 — Ingatan","Beri Si Cerdas ingatan untuk urutan waktu."],
    attention:["Misi 10 — Telinga","Ajari Si Cerdas mendengarkan kata yang tepat."],
    playground:["Misi 11 — Ujian Kelulusan","Rakit semua keping, latih AI sungguhan!"]
  };
  var VIZ_INIT = {
    neuron:"initVizNeuron", aktivasi:"initVizActivation", mlp:"initVizMlp",
    loss:"initVizLoss", gradient:"initVizGradient", backprop:"initVizBackprop",
    overfit:"initVizOverfit", cnn:"initVizCnn", rnn:"initVizRnn",
    attention:"initVizAttention", playground:"initVizPlayground"
  };
  var MODS = ["neuron","aktivasi","mlp","loss","gradient","backprop","overfit","cnn","rnn","attention","playground"];
  var ORDER = ["beranda"].concat(MODS);
  // XP & level Si Cerdas: misi tuntas +100, jawaban kuis benar pertama +25
  var LEVELS = [
    {xp:0, nama:"Bibit"}, {xp:150, nama:"Tunas"}, {xp:400, nama:"Anak"},
    {xp:700, nama:"Remaja"}, {xp:1100, nama:"Dewasa"}, {xp:1500, nama:"Master"}
  ];
  var ABIL = {
    neuron:"Menimbang", aktivasi:"Keyakinan", mlp:"Kerja tim", loss:"Cermin",
    gradient:"Langkah", backprop:"Evaluasi", overfit:"Kejujuran", cnn:"Mata",
    rnn:"Ingatan", attention:"Telinga", playground:"Kemandirian"
  };
  var done = {};

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
    var fn = VIZ_INIT[route];
    if(fn && !done[route] && typeof window[fn]==="function"){
      try{ window[fn](); done[route]=true; }
      catch(e){ console.error("Gagal init "+route, e); }
    }
    window.dispatchEvent(new Event("resize"));
    window.scrollTo(0,0);
  }

  // ---- Progress misi (localStorage) ----
  function loadProgress(){
    try{ return JSON.parse(localStorage.getItem("dlviz-progress")||"{}"); }catch(e){ return {}; }
  }
  function saveProgress(p){ localStorage.setItem("dlviz-progress", JSON.stringify(p)); renderAll(); }

  // ---- XP Si Cerdas (localStorage terpisah agar reset mandiri) ----
  function loadXP(){
    try{ return JSON.parse(localStorage.getItem("dlviz-xp")||'{"xp":0,"done":{},"quiz":{}}'); }
    catch(e){ return {xp:0,done:{},quiz:{}}; }
  }
  function saveXP(s){ localStorage.setItem("dlviz-xp", JSON.stringify(s)); renderAll(); }
  function addXP(n){
    var s = loadXP(); s.xp += n;
    var lv = levelFor(s.xp);
    saveXP(s);
    return lv;
  }
  function levelFor(xp){
    var lv = 0;
    for(var i=0;i<LEVELS.length;i++) if(xp>=LEVELS[i].xp) lv=i;
    return lv;
  }

  // ---- Maskot SVG: robot yang tumbuh tiap level ----
  function mascotSVG(lv){
    var faces = ["#9aa3b2","#69b36c","#2fa39a","#4f8fe8","#9a6fe8","#f2b01e"];
    var c = faces[Math.min(lv,5)];
    var eye = lv===0
      ? '<line x1="22" y1="30" x2="30" y2="30" stroke="#fff" stroke-width="3" stroke-linecap="round"/><line x1="42" y1="30" x2="50" y2="30" stroke="#fff" stroke-width="3" stroke-linecap="round"/>'
      : '<circle cx="26" cy="30" r="4" fill="#fff"/><circle cx="46" cy="30" r="4" fill="#fff"/><circle cx="27" cy="31" r="1.6" fill="#222"/><circle cx="47" cy="31" r="1.6" fill="#222"/>';
    var mouth = lv===0 ? '<line x1="28" y1="44" x2="44" y2="44" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>'
      : '<path d="M27 42 Q36 '+(44+Math.min(lv,5))+ ' 45 42" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
    var cheeks = lv>=3 ? '<circle cx="20" cy="38" r="3" fill="#ffffff" opacity=".45"/><circle cx="52" cy="38" r="3" fill="#ffffff" opacity=".45"/>' : '';
    var antenna = lv>=1 ? '<line x1="36" y1="12" x2="36" y2="4" stroke="'+c+'" stroke-width="3" stroke-linecap="round"/>' : '';
    var ball = lv>=2 ? '<circle cx="36" cy="4" r="3.4" fill="'+c+'"/>' : '';
    var star = lv>=4 ? '<text x="36" y="24" text-anchor="middle" font-size="9">⭐</text>' : '';
    var cap = lv>=5 ? '<rect x="20" y="8" width="32" height="7" rx="2" fill="#26211a"/><rect x="34" y="2" width="4" height="7" fill="#26211a"/><circle cx="36" cy="11" r="2" fill="#e8890c"/>' : '';
    return '<svg viewBox="0 0 72 60" aria-hidden="true">'
      + antenna + ball
      + '<rect x="12" y="12" width="48" height="40" rx="12" fill="'+c+'"/>'
      + '<rect x="12" y="12" width="48" height="40" rx="12" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="2"/>'
      + eye + cheeks + mouth + star + cap + '</svg>';
  }

  function renderAll(){
    renderProgress(); renderXP();
  }
  function renderProgress(){
    var p = loadProgress();
    var n = MODS.filter(function(m){return p[m]}).length;
    var pct = Math.round(n/MODS.length*100);
    document.getElementById("progress-fill").style.width = pct+"%";
    document.getElementById("progress-text").textContent = pct+"% ("+n+"/"+MODS.length+" misi)";
    document.querySelectorAll(".done-btn").forEach(function(b){
      var m = b.getAttribute("data-mod");
      if(b.dataset.xpInit!=="1"){ b.dataset.xpInit="1"; }
      b.innerHTML = p[m] ? "✓ Misi tuntas! (+100 XP)" : "✓ Tandai tuntas (+100 XP)";
      b.classList.toggle("primary", !!p[m]);
    });
    document.querySelectorAll("#nav a[data-route]").forEach(function(a){
      var r = a.getAttribute("data-route");
      var t = a.textContent.replace(/^✓ /,"");
      a.textContent = (p[r] ? "✓ " : "") + t;
    });
  }
  function renderXP(){
    var s = loadXP(), lv = levelFor(s.xp);
    var next = lv+1<LEVELS.length ? LEVELS[lv+1].xp : null;
    document.getElementById("level-name").textContent = "Level "+lv+" • "+LEVELS[lv].nama;
    var pct = next===null ? 100 : Math.min(100, Math.round((s.xp-LEVELS[lv].xp)/(next-LEVELS[lv].xp)*100));
    document.getElementById("xp-fill").style.width = pct+"%";
    document.getElementById("xp-text").textContent = s.xp+" XP" + (next===null ? " • MAX!" : " • "+(next-s.xp)+" lagi naik");
    document.getElementById("mascot").innerHTML = mascotSVG(lv);
    var open = MODS.filter(function(m){return loadProgress()[m]}).length;
    document.getElementById("abilities-count").textContent = open+"/"+MODS.length+" kemampuan";
    document.getElementById("abilities").innerHTML = MODS.map(function(m){
      var has = !!loadProgress()[m];
      return '<span class="abil'+(has?" open":"")+'" title="'+(has?"Terbuka":"Terkunci — tuntaskan misinya")+'">'+(has?"✓ ":"🔒 ")+ABIL[m]+'</span>';
    }).join("");
  }

  // ---- Kuis + XP jawaban benar pertama ----
  function renderQuizzes(){
    document.querySelectorAll(".quiz[data-quiz]").forEach(function(box){
      var key = box.getAttribute("data-quiz");
      var list = (window.QUIZZES||{})[key]||[];
      var html = "<h3>🧪 Kuis cek-paham ("+list.length+" soal, +25 XP per jawaban benar)</h3>";
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
            var ok = chosen===item.answer;
            if(!ok) btn.classList.add("wrong");
            var fb = qdiv.querySelector(".fb");
            if(ok){
              var s = loadXP(), k = key+":"+qi;
              if(!s.quiz[k]){ s.quiz[k]=true; s.xp+=25; saveXP(s); fb.innerHTML = '✅ Benar! <span class="xp-got">+25 XP</span> ' + item.fb; }
              else fb.textContent = "✅ Benar! " + item.fb;
            } else {
              fb.textContent = "❌ Belum tepat. " + item.fb;
            }
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
      return '<div class="mini-card"><b>'+m.title+'</b><span class="tiny">⏱ '+m.time+' • '+m.goal+'</span><a class="btn small" href="#'+m.id+'">Buka misi →</a></div>';
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
    renderHome(); renderQuizzes(); renderAll();
    applyTheme(localStorage.getItem("dlviz-theme")||"light");
    document.getElementById("theme-btn").onclick = function(){
      var cur = document.documentElement.getAttribute("data-theme");
      applyTheme(cur==="dark"?"light":"dark");
    };
    document.getElementById("reset-progress").onclick = function(){
      if(confirm("Ulangi dari awal? Centang misi, XP Si Cerdas, dan jawaban kuis akan dihapus.")){
        localStorage.removeItem("dlviz-progress"); localStorage.removeItem("dlviz-xp"); location.reload();
      }
    };
    document.querySelectorAll(".done-btn").forEach(function(b){
      b.onclick = function(){
        var p = loadProgress(), s = loadXP(), m = b.getAttribute("data-mod");
        if(p[m]){ delete p[m]; if(s.done[m]){ delete s.done[m]; s.xp = Math.max(0, s.xp-100); } }
        else { p[m]=true; if(!s.done[m]){ s.done[m]=true; s.xp+=100; } }
        localStorage.setItem("dlviz-progress", JSON.stringify(p));
        localStorage.setItem("dlviz-xp", JSON.stringify(s));
        renderAll();
      };
    });
    document.getElementById("menu-btn").onclick = function(){
      document.getElementById("sidebar").classList.toggle("open");
    };
    // Tombol "← Sebelumnya" otomatis sesuai urutan misi
    document.querySelectorAll(".nav-foot").forEach(function(f){
      var sec = f.closest ? f.closest(".page") : null;
      if(!sec) return;
      var i = ORDER.indexOf(sec.id.replace("sec-",""));
      if(i > 0 && !f.querySelector(".prev-btn")){
        var a = document.createElement("a");
        a.className = "btn ghost prev-btn"; a.href = "#" + ORDER[i-1]; a.textContent = "← Sebelumnya";
        f.insertBefore(a, f.firstChild);
      }
    });
    var sp = document.getElementById("global-speed");
    if(sp) sp.oninput = function(){ window.GLOBAL_SPEED = parseFloat(sp.value); };
    window.GLOBAL_SPEED = 1;
    window.addEventListener("hashchange", function(){ show(currentRoute()); });
    show(currentRoute());
  });
})();
