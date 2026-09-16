// Backprop 4 langkah: 2 input -> 1 neuron sigmoid, target 1
function initVizBackprop(){
  var $=function(id){return document.getElementById(id)};
  var w1=0.5,w2=-0.3,b=0.1,stepIdx=0;
  function sig(x){return 1/(1+Math.exp(-x))}
  function snapshot(){
    var x1=+$("bp-x1").value,x2=+$("bp-x2").value;
    var z=w1*x1+w2*x2+b,y=sig(z),t=1;
    var loss=0.5*Math.pow(y-t,2),err=y-t;
    var d_w1=err*y*(1-y)*x1, d_w2=err*y*(1-y)*x2, d_b=err*y*(1-y);
    return {x1:x1,x2:x2,z:z,y:y,t:t,loss:loss,err:err,dw1:d_w1,dw2:d_w2,db:d_b};
  }
  function draw(){
    var lr=+$("bp-lr").value;
    $("bp-x1-v").textContent=(+$("bp-x1").value).toFixed(2);
    $("bp-x2-v").textContent=(+$("bp-x2").value).toFixed(2);
    $("bp-lr-v").textContent=lr.toFixed(2);
    var s=snapshot();
    document.querySelectorAll("#bp-steps li").forEach(function(li){
      li.classList.toggle("active",+li.getAttribute("data-s")===stepIdx);
    });
    var html="";
    html+='<div class="bpbox">Petunjuk 1: '+s.x1.toFixed(2)+'<br><b>pentingnya '+w1.toFixed(3)+'</b></div>';
    html+='<div class="bpbox">Petunjuk 2: '+s.x2.toFixed(2)+'<br><b>pentingnya '+w2.toFixed(3)+'</b></div>';
    html+='<div class="bpbox">Tebakan: <b>'+s.y.toFixed(3)+'</b><br>(maunya 1)</div>';
    html+='<div class="bpbox">Meleset: <b>'+s.loss.toFixed(4)+'</b><br>selisih '+s.err.toFixed(3)+'</div>';
    $("bp-viz").innerHTML=html;
    var txt="";
    if(stepIdx===0)txt="1️⃣ MENEBASK: dengan cara main sekarang, tim menebak "+s.y.toFixed(3)+" (maunya 1).\n(Rincian boleh diskip: "+w1.toFixed(2)+"×"+s.x1.toFixed(2)+" + "+w2.toFixed(2)+"×"+s.x2.toFixed(2)+" + "+b.toFixed(2)+" = "+s.z.toFixed(3)+")";
    else if(stepIdx===1)txt="2️⃣ SADAR SALAH: tebakan "+s.y.toFixed(3)+" vs jawaban 1 → meleset "+s.loss.toFixed(4)+".\nSelisihnya "+s.err.toFixed(3)+" (minus = tebakan kurang besar, harus naik).";
    else if(stepIdx===2)txt="3️⃣ BAGI-BAGI SALAH:\n• Petunjuk 1 menanggung "+s.dw1.toFixed(3)+" (paling besar — dia pegang bola lama!)\n• Petunjuk 2 menanggung "+s.dw2.toFixed(3)+"\n• Standar menanggung "+s.db.toFixed(3);
    else txt="4️⃣ KOREKSI (kegalakan "+lr.toFixed(2)+"):\n• Cara petunjuk 1: "+w1.toFixed(3)+" → "+(w1-lr*s.dw1).toFixed(3)+"\n• Cara petunjuk 2: "+w2.toFixed(3)+" → "+(w2-lr*s.dw2).toFixed(3)+"\nKlik Langkah → lagi: tebakan berikutnya pasti lebih dekat ke 1!";
    $("bp-calc").textContent=txt;
  }
  $("bp-next").onclick=function(){
    if(stepIdx===3){var s=snapshot(),lr=+$("bp-lr").value;w1-=lr*s.dw1;w2-=lr*s.dw2;b-=lr*s.db;stepIdx=0;}
    else stepIdx++;
    draw();
  };
  $("bp-prev").onclick=function(){stepIdx=(stepIdx+3)%4;draw()};
  $("bp-reset").onclick=function(){w1=0.5;w2=-0.3;b=0.1;stepIdx=0;draw()};
  ["bp-x1","bp-x2","bp-lr"].forEach(function(id){$(id).addEventListener("input",draw)});
  draw();
}
