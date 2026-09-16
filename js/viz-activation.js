// Grafik fungsi aktivasi + titik geser + kemiringan (gradien)
function initVizActivation(){
  var $=function(id){return document.getElementById(id)};
  var c=$("act-canvas"),ctx=c.getContext("2d");
  function fn(name,x){
    if(name==="sigmoid")return 1/(1+Math.exp(-x));
    if(name==="tanh")return Math.tanh(x);
    if(name==="relu")return Math.max(0,x);
    return x>0?1:0; // step
  }
  function draw(){
    var name=$("act-fn").value, x=+$("act-x").value;
    $("act-x-v").textContent=x.toFixed(1);
    var W=c.width,H=c.height,pad=30;
    ctx.clearRect(0,0,W,H);
    var dark=document.documentElement.getAttribute("data-theme")==="dark";
    ctx.strokeStyle=dark?"#334155":"#cbd5e1";
    // sumbu
    var y0r = name==="relu"?5:(name==="step"?1.2:2.2); // rentang y atas
    var y1r = name==="relu"?-1:(name==="step"?-0.2:-2.2);
    function X(v){return pad+(v+5)/10*(W-pad-10)}
    function Y(v){return 10+(y0r-v)/(y0r-y1r)*(H-pad-10)}
    ctx.beginPath();ctx.moveTo(pad,Y(0));ctx.lineTo(W-10,Y(0));ctx.stroke();
    ctx.beginPath();ctx.moveTo(X(0),10);ctx.lineTo(X(0),H-pad);ctx.stroke();
    // kurva
    ctx.strokeStyle="#4f46e5";ctx.lineWidth=3;ctx.beginPath();
    for(var px=pad;px<=W-10;px+=2){
      var xv=(px-pad)/(W-pad-10)*10-5, yv=fn(name,xv);
      if(name==="relu") yv=Math.min(yv,5);
      var py=Y(yv);
      if(px===pad)ctx.moveTo(px,py);else ctx.lineTo(px,py);
    }
    ctx.stroke();ctx.lineWidth=1;
    // titik
    var y=fn(name,x);
    ctx.fillStyle="#06b6d4";ctx.beginPath();ctx.arc(X(x),Y(Math.min(y,5)),8,0,7);ctx.fill();
    ctx.fillStyle="#fff";ctx.font="bold 9px sans-serif";ctx.fillText("x",X(x)-3,Y(Math.min(y,5))+3);
    // gradien numerik
    var e=0.01, g=(fn(name,x+e)-fn(name,x-e))/(2*e);
    if(name==="step") g=0;
    // teks hasil: kalimat biasa dulu, angka belakangan
    var nama = name==="sigmoid"?"Si Lembut":name==="tanh"?"Si Seimbang":name==="relu"?"Si Cuek":"Si Tegas";
    var arti = name==="step" ? (y?"kata "+nama+": YA!":"kata "+nama+": TIDAK.")
      : "kata "+nama+": keyakinan "+(y>1?(y).toFixed(1):(y*100).toFixed(0)+"%");
    var miring = name==="step" ? "Si Tegas tidak punya kemiringan (langsung lompat)."
      : "Di titik ini garisnya "+(Math.abs(g)<0.1?"hampir datar (susah berubah)":"cukup miring ("+g.toFixed(2)+") — masih gampang berubah")+".";
    $("act-calc").innerHTML="Sinyal masuk <b>"+x.toFixed(1)+"</b> → "+arti+"\n"+miring+
      (name==="sigmoid"&&Math.abs(x)>3?"\n⚠️ Kalau sinyalnya terlalu ekstrem, Si Lembut jadi macet (datar total) → belajarnya lambat. Makanya jangan sampai ke ujung!":"")+
      (name==="relu"&&x<0?"\nSi Cuek mendiamkan semua sinyal negatif (keluar 0 terus).":"");
  }
  $("act-fn").addEventListener("change",draw);
  $("act-x").addEventListener("input",draw);
  document.addEventListener("themechange",draw);
  draw();
}
