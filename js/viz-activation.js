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
    $("act-calc").innerHTML="f(<b>"+x.toFixed(1)+"</b>) = <b>"+(name==="step"?y:y.toFixed(3))+"</b>\nKemiringan (gradien) ≈ <b>"+g.toFixed(3)+"</b>"+
      (name==="sigmoid"&&Math.abs(x)>3?"\n⚠️ Jenuh (saturasi): ujung sigmoid datar → belajar lambat!":"")+
      (name==="relu"&&x<0?"\nReLU mati (gradien 0) untuk x negatif.":"");
  }
  $("act-fn").addEventListener("change",draw);
  $("act-x").addEventListener("input",draw);
  document.addEventListener("themechange",draw);
  draw();
}
