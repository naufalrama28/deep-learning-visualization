// RNN: h_t = tanh(W*h + U*x), mainkan urutan langkah demi langkah
function initVizRnn(){
  var $=function(id){return document.getElementById(id)};
  var c=$("rnn-canvas"),ctx=c.getContext("2d");
  var idx=0,hist=[],U=0.9;
  function parseSeq(){
    return $("rnn-seq").value.split(",").map(function(s){return parseFloat(s.trim())}).filter(function(v){return !isNaN(v)});
  }
  function drawTrack(){
    var seq=parseSeq(),W=+$("rnn-w").value;
    $("rnn-w-v").textContent=W.toFixed(2);
    var box=$("rnn-track");box.innerHTML="";
    seq.forEach(function(v,i){
      var d=document.createElement("div");d.className="step-chip"+(i<idx?" active":"");
      d.textContent="Ke-"+(i+1)+": masuk "+v+(i<hist.length?" → catatan "+hist[i].toFixed(2):"");
      box.appendChild(d);
    });
    // grafik h
    var Wd=c.width,H=c.height,pad=24;
    ctx.clearRect(0,0,Wd,H);
    ctx.strokeStyle="#94a3b8";ctx.beginPath();ctx.moveTo(pad,10);ctx.lineTo(pad,H-pad);ctx.lineTo(Wd-8,H-pad);ctx.stroke();
    ctx.strokeStyle="#e5e7eb";ctx.beginPath();var mid=10+(1-(0+1)/2)*(H-pad-10);ctx.moveTo(pad,mid);ctx.lineTo(Wd-8,mid);ctx.stroke();
    if(hist.length){
      ctx.strokeStyle="#4f46e5";ctx.lineWidth=3;ctx.beginPath();
      hist.forEach(function(h,i){
        var X=pad+(seq.length<=1?0.5:i/(seq.length-1))*(Wd-pad-8);
        var Y=10+(1-(h+1)/2)*(H-pad-10);
        if(i===0)ctx.moveTo(X,Y);else ctx.lineTo(X,Y);
      });
      ctx.stroke();ctx.lineWidth=1;
      hist.forEach(function(h,i){
        var X=pad+(seq.length<=1?0.5:i/(seq.length-1))*(Wd-pad-8);
        var Y=10+(1-(h+1)/2)*(H-pad-10);
        ctx.fillStyle="#06b6d4";ctx.beginPath();ctx.arc(X,Y,6,0,7);ctx.fill();
      });
    }
    var last=hist.length?hist[hist.length-1]:0;
    $("rnn-calc").innerHTML="Kejadian "+idx+" dari "+seq.length+" • isi catatan sekarang <b>"+last.toFixed(3)+"</b>\nDaya ingat "+W.toFixed(2)+" → "+(W<0.4?"pelupa: tiap kejadian baru, yang lama langsung hilang":W<0.95?"seimbang: ingat secukupnya, update secukupnya":"kuat: ingat lama, tapi awas nilainya jadi tidak karuan")+"\nCara update-nya (boleh diskip): catatan_baru = tanh("+W.toFixed(2)+" × catatan_lama + 0,9 × kejadian).";
  }
  function stepOnce(){
    var seq=parseSeq(),W=+$("rnn-w").value;
    if(idx>=seq.length)return false;
    var hprev=hist.length?hist[hist.length-1]:0;
    var h=Math.tanh(W*hprev+U*(seq[idx]/10));
    hist.push(h);idx++;drawTrack();return true;
  }
  var timer=null;
  $("rnn-step").onclick=function(){if(timer){clearInterval(timer);timer=null;$("rnn-play").textContent="▶ Mainkan urutan"}stepOnce()};
  $("rnn-play").onclick=function(){
    if(timer){clearInterval(timer);timer=null;this.textContent="▶ Mainkan urutan";return}
    this.textContent="⏸ Pause";
    var self=this;
    var sp=(window.GLOBAL_SPEED||1);
    timer=setInterval(function(){if(!stepOnce()){clearInterval(timer);timer=null;self.textContent="▶ Mainkan urutan"}},600/sp);
  };
  $("rnn-reset").onclick=function(){idx=0;hist=[];if(timer){clearInterval(timer);timer=null;$("rnn-play").textContent="▶ Mainkan urutan"}drawTrack()};
  $("rnn-seq").addEventListener("change",function(){idx=0;hist=[];drawTrack()});
  $("rnn-w").addEventListener("input",function(){idx=0;hist=[];drawTrack()});
  document.addEventListener("themechange",drawTrack);
  drawTrack();
}
