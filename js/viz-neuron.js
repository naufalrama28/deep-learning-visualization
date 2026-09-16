// Modul Neuron & Perceptron: z = w1*x1 + w2*x2 + b, y = step(z)
function initVizNeuron(){
  var $ = function(id){return document.getElementById(id)};
  var c = $("neuron-canvas"), ctx = c.getContext("2d");
  function css(v,d){ var s=getComputedStyle(document.documentElement).getPropertyValue(v); return s&&s.trim()?s.trim():d; }
  function draw(){
    var x1=+$("neuron-x1").value, x2=+$("neuron-x2").value;
    var w1=+$("neuron-w1").value, w2=+$("neuron-w2").value, b=+$("neuron-b").value;
    $("neuron-w1-v").textContent=w1.toFixed(1); $("neuron-w2-v").textContent=w2.toFixed(1); $("neuron-b-v").textContent=b.toFixed(1);
    var z=w1*x1+w2*x2+b, y=z>0?1:0;
    // latar keputusan: petakan tiap piksel blok 8px
    var W=c.width,H=c.height,pad=34;
    ctx.clearRect(0,0,W,H);
    var step=8;
    for(var px=pad;px<W-8;px+=step){for(var py=8;py<H-pad;py+=step){
      var gx=(px-pad)/(W-pad-8), gy=1-(py-8)/(H-pad-8);
      var zz=w1*gx+w2*gy+b;
      ctx.fillStyle=zz>0?"rgba(79,70,229,.20)":"rgba(234,179,8,.20)";
      ctx.fillRect(px,py,step,step);
    }}
    // sumbu + garis keputusan w1x+w2y+b=0
    ctx.strokeStyle="#94a3b8";ctx.beginPath();ctx.moveTo(pad,8);ctx.lineTo(pad,H-pad);ctx.lineTo(W-8,H-pad);ctx.stroke();
    ctx.fillStyle=css("--muted","#666");ctx.font="11px sans-serif";
    ctx.fillText("x1→",W-40,H-10);ctx.fillText("x2",6,20);
    ctx.strokeStyle="#111";ctx.lineWidth=2.5;ctx.beginPath();
    var drew=false;
    // gambar garis: untuk x1 0..1 hitung x2 = -(w1x1+b)/w2
    for(var gx2=0;gx2<=1.001;gx2+=0.02){
      var gy2;
      if(Math.abs(w2)>0.05) gy2=-(w1*gx2+b)/w2;
      else continue;
      var X=pad+gx2*(W-pad-8), Y=8+(1-gy2)*(H-pad-8);
      if(gy2<-0.2||gy2>1.2) continue;
      if(!drew){ctx.moveTo(X,Y);drew=true}else ctx.lineTo(X,Y);
    }
    ctx.stroke();ctx.lineWidth=1;
    // titik input
    var IX=pad+x1*(W-pad-8), IY=8+(1-x2)*(H-pad-8);
    ctx.fillStyle=y?"#16a34a":"#dc2626";
    ctx.beginPath();ctx.arc(IX,IY,9,0,7);ctx.fill();
    ctx.fillStyle="#fff";ctx.font="bold 10px sans-serif";ctx.fillText("IN",IX-7,IY+3);
    // teks
    $("neuron-calc").innerHTML="z = "+w1.toFixed(1)+"×"+x1.toFixed(2)+" + "+w2.toFixed(1)+"×"+x2.toFixed(2)+" + ("+b.toFixed(1)+") = <b>"+z.toFixed(2)+"</b>\n"+
      "y = "+(y?"<b>1 (MENYALA 💡)</b>":"<b>0 (MATI)</b>")+" karena z "+(z>0?"> 0":"≤ 0");
    var lamp=$("neuron-lamp");
    lamp.textContent=y?"💡 MENYALA (output=1)":"⚫ MATI (output=0)";
    lamp.classList.toggle("on",!!y);
  }
  ["neuron-x1","neuron-x2","neuron-w1","neuron-w2","neuron-b"].forEach(function(id){$(id).addEventListener("input",draw)});
  $("neuron-and").onclick=function(){$("neuron-w1").value=1;$("neuron-w2").value=1;$("neuron-b").value=-1.2;$("neuron-x1").value=1;$("neuron-x2").value=1;draw()};
  $("neuron-or").onclick=function(){$("neuron-w1").value=1;$("neuron-w2").value=1;$("neuron-b").value=-0.5;$("neuron-x1").value=0;$("neuron-x2").value=1;draw()};
  $("neuron-reset").onclick=function(){$("neuron-w1").value=1;$("neuron-w2").value=1;$("neuron-b").value=-1.2;$("neuron-x1").value=0.7;$("neuron-x2").value=0.6;draw()};
  document.addEventListener("themechange",draw);
  draw();
}
