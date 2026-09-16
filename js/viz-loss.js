// Loss: MSE vs Cross-Entropy, geser tebakan
function initVizLoss(){
  var $=function(id){return document.getElementById(id)};
  var c=$("loss-canvas"),ctx=c.getContext("2d");
  function loss(fn,t,p){
    if(fn==="mse")return Math.pow(t-p,2);
    p=Math.min(0.999,Math.max(0.001,p));
    return -(t*Math.log(p)+(1-t)*Math.log(1-p));
  }
  function draw(){
    var fn=$("loss-fn").value,t=+$("loss-target").value,p=+$("loss-pred").value;
    $("loss-pred-v").textContent=p.toFixed(2);
    var L=loss(fn,t,p);
    var W=c.width,H=c.height,pad=34;
    ctx.clearRect(0,0,W,H);
    var maxL=fn==="mse"?1:4;
    function X(v){return pad+v*(W-pad-10)}
    function Y(v){return 10+(1-Math.min(v,maxL)/maxL)*(H-pad-10)}
    ctx.strokeStyle="#94a3b8";
    ctx.beginPath();ctx.moveTo(pad,10);ctx.lineTo(pad,H-pad);ctx.lineTo(W-10,H-pad);ctx.stroke();
    ctx.fillStyle="#64748b";ctx.font="11px sans-serif";
    ctx.fillText("tebakan ŷ →",W-110,H-10);ctx.fillText("loss",6,20);
    // kurva
    ctx.strokeStyle="#4f46e5";ctx.lineWidth=3;ctx.beginPath();
    for(var px=pad;px<=W-10;px+=2){
      var pv=(px-pad)/(W-pad-10);pv=Math.min(0.99,Math.max(0.01,pv));
      var lv=loss(fn,t,pv);
      var py=Y(lv);
      if(px===pad)ctx.moveTo(px,py);else ctx.lineTo(px,py);
    }
    ctx.stroke();ctx.lineWidth=1;
    // target garis
    ctx.strokeStyle="#16a34a";ctx.setLineDash([5,4]);
    ctx.beginPath();ctx.moveTo(X(t),10);ctx.lineTo(X(t),H-pad);ctx.stroke();ctx.setLineDash([]);
    ctx.fillStyle="#16a34a";ctx.fillText("target",X(t)-16,14);
    // titik tebakan
    ctx.fillStyle="#dc2626";ctx.beginPath();ctx.arc(X(p),Y(L),8,0,7);ctx.fill();
    ctx.fillStyle="#fff";ctx.font="bold 9px sans-serif";ctx.fillText("mu",X(p)-7,Y(L)+3);
    $("loss-calc").innerHTML=(L<0.1?"🎉 <b>Hampir tepat!</b> Tebakan "+p.toFixed(2)+" dekat dengan jawaban "+t.toFixed(2)+".":L<1?"😐 <b>Lumayan.</b> Tebakan "+p.toFixed(2)+", jawaban "+t.toFixed(2)+" — geser lebih dekat!":"❌ <b>Masih jauh.</b> Tebakan "+p.toFixed(2)+" vs jawaban "+t.toFixed(2)+" — geser ke "+t.toFixed(2)+"!")+
      "\nSkor meleset = <b>"+L.toFixed(3)+"</b> (0 = sempurna)";
  }
  $("loss-fn").addEventListener("change",draw);
  ["loss-target","loss-pred"].forEach(function(id){$(id).addEventListener("input",draw)});
  document.addEventListener("themechange",draw);
  draw();
}
