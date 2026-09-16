// Gradient descent: bola di lembah f(x)=0.5x^2+0.4 sin(2.5x)
function initVizGradient(){
  var $=function(id){return document.getElementById(id)};
  var c=$("grad-canvas"),ctx=c.getContext("2d");
  var w=3.2,trail=[],timer=null;
  function f(x){return 0.5*x*x+0.4*Math.sin(2.5*x)}
  function g(x){return x+Math.cos(2.5*x)}
  function draw(){
    var W=c.width,H=c.height,pad=24;
    ctx.clearRect(0,0,W,H);
    var xmin=-4.5,xmax=4.5,ymin=-1,ymax=9;
    function X(v){return pad+(v-xmin)/(xmax-xmin)*(W-pad-8)}
    function Y(v){return 8+(1-(v-ymin)/(ymax-ymin))*(H-pad-8)}
    // kurva
    ctx.strokeStyle="#4f46e5";ctx.lineWidth=3;ctx.beginPath();
    for(var px=pad;px<=W-8;px+=2){var xv=xmin+(px-pad)/(W-pad-8)*(xmax-xmin);var py=Y(f(xv));if(px===pad)ctx.moveTo(px,py);else ctx.lineTo(px,py)}
    ctx.stroke();ctx.lineWidth=1;
    // jejak
    ctx.fillStyle="rgba(6,182,212,.5)";
    trail.forEach(function(t){ctx.beginPath();ctx.arc(X(t.x),Y(f(t.x)),3,0,7);ctx.fill()});
    // bola
    ctx.fillStyle="#dc2626";ctx.beginPath();ctx.arc(X(w),Y(f(w)),10,0,7);ctx.fill();
    ctx.fillStyle="#fff";ctx.font="bold 10px sans-serif";ctx.fillText("●",X(w)-4,Y(f(w))+3);
    var lr=+$("grad-lr").value;
    $("grad-lr-v").textContent=lr.toFixed(2);
    $("grad-calc").innerHTML="⛷️ Bola di posisi <b>"+w.toFixed(2)+"</b>, ketinggian (melesetnya) <b>"+f(w).toFixed(2)+"</b>.\nTanah di kaki miring "+(g(w)>0.15?"ke kanan ↗ → melangkah <b>kiri</b>":g(w)<-0.15?"ke kiri ↖ → melangkah <b>kanan</b>":"hampir datar 😌 (hampir sampai!)")+", sejauh <b>"+Math.abs(lr*g(w)).toFixed(3)+"</b>.\nDetail angka (boleh diskip): kemiringan = "+g(w).toFixed(3)+", langkah = −"+lr.toFixed(2)+" × "+g(w).toFixed(3);
  }
  function step(){
    var lr=+$("grad-lr").value;
    trail.push({x:w});if(trail.length>60)trail.shift();
    w=w-lr*g(w);
    if(!isFinite(w)||Math.abs(w)>8){stop();$("grad-calc").innerHTML+="\n💥 DIVERGEN! Learning rate kebesaran. Klik Reset lalu coba lr kecil.";}
    draw();
  }
  function stop(){if(timer){clearInterval(timer);timer=null;$("grad-run").textContent="▶ Jalankan"}}
  $("grad-step").onclick=function(){stop();step()};
  $("grad-run").onclick=function(){
    if(timer){stop();return}
    $("grad-run").textContent="⏸ Pause";
    timer=setInterval(function(){var s=window.GLOBAL_SPEED||1;step();if(Math.abs(g(w))<0.01){stop();$("grad-calc").innerHTML+="\n✅ Sampai lembah! Gradien ≈ 0."}},300/s);
  };
  $("grad-reset").onclick=function(){stop();w=+$("grad-start").value;trail=[];draw()};
  $("grad-start").addEventListener("input",function(){w=+$("grad-start").value;trail=[];draw()});
  $("grad-lr").addEventListener("input",draw);
  document.addEventListener("themechange",draw);
  w=+$("grad-start").value;draw();
}
