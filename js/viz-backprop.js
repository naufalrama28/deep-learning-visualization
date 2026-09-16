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
    html+='<div class="bpbox">x1<br><b>'+s.x1.toFixed(2)+'</b>w1='+w1.toFixed(3)+'</div>';
    html+='<div class="bpbox">x2<br><b>'+s.x2.toFixed(2)+'</b>w2='+w2.toFixed(3)+'</div>';
    html+='<div class="bpbox">z<br><b>'+s.z.toFixed(3)+'</b>ŷ='+s.y.toFixed(3)+'</div>';
    html+='<div class="bpbox">loss<br><b>'+s.loss.toFixed(4)+'</b>err='+s.err.toFixed(3)+'</div>';
    $("bp-viz").innerHTML=html;
    var txt="";
    if(stepIdx===0)txt="1️⃣ FORWARD: z = "+w1.toFixed(2)+"×"+s.x1.toFixed(2)+" + "+w2.toFixed(2)+"×"+s.x2.toFixed(2)+" + "+b.toFixed(2)+" = "+s.z.toFixed(3)+"\nŷ = sigmoid(z) = "+s.y.toFixed(3)+" (target 1)";
    else if(stepIdx===1)txt="2️⃣ LOSS: L = ½(ŷ−t)² = ½("+s.y.toFixed(3)+"−1)² = "+s.loss.toFixed(4)+"\nerror = ŷ−t = "+s.err.toFixed(3)+" (negatif = tebakan kurang besar)";
    else if(stepIdx===2)txt="3️⃣ BACKWARD (bagi salah):\ngrad w1 = err×ŷ(1−ŷ)×x1 = "+s.dw1.toFixed(4)+"\ngrad w2 = "+s.dw2.toFixed(4)+", grad b = "+s.db.toFixed(4)+"\n→ w1 paling bersalah karena x1 besar!";
    else txt="4️⃣ UPDATE (lr="+lr.toFixed(2)+"):\nw1: "+w1.toFixed(3)+" − "+lr.toFixed(2)+"×("+s.dw1.toFixed(3)+") = "+(w1-lr*s.dw1).toFixed(3)+"\nw2: "+w2.toFixed(3)+" → "+(w2-lr*s.dw2).toFixed(3)+", b: "+b.toFixed(3)+" → "+(b-lr*s.db).toFixed(3)+"\nKlik Langkah → lagi untuk iterasi berikutnya!";
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
