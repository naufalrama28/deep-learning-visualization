// Overfitting: fit polinomial derajat d ke data ber-noise, lihat train vs test error
function initVizOverfit(){
  var $=function(id){return document.getElementById(id)};
  var c=$("over-canvas"),ctx=c.getContext("2d");
  var train=[],test=[];
  function trueF(x){return Math.sin(x*1.2)*1.5 + 0.2*x}
  function genData(){
    var n=+$("over-n").value, noise=+$("over-noise").value;
    train=[];
    for(var i=0;i<n;i++){var x=-3+6*i/(n-1)+(Math.random()-0.5)*0.3;var y=trueF(x)+(Math.random()*2-1)*noise*1.5;train.push({x:x,y:y})}
    test=[];
    for(var j=0;j<40;j++){var xt=-3+6*j/39;test.push({x:xt,y:trueF(xt)+(Math.random()*2-1)*noise*1.5})}
  }
  // selesaikan least squares: (XTX)coef = XTy via eliminasi Gauss
  function polyfit(pts,d){
    var m=d+1,A=[],Bv=[];
    for(var i=0;i<m;i++){A.push([]);for(var j=0;j<m;j++){var s=0;for(var k=0;k<pts.length;k++)s+=Math.pow(pts[k].x,i+j);A[i].push(s)}var s2=0;for(var k2=0;k2<pts.length;k2++)s2+=pts[k2].y*Math.pow(pts[k2].x,i);Bv.push(s2)}
    // gauss
    for(var col=0;col<m;col++){
      var piv=col;for(var r=col+1;r<m;r++)if(Math.abs(A[r][col])>Math.abs(A[piv][col]))piv=r;
      var tmp=A[col];A[col]=A[piv];A[piv]=tmp;var tb=Bv[col];Bv[col]=Bv[piv];Bv[piv]=tb;
      var div=A[col][col]||1e-9;
      for(var cc=col;cc<m;cc++)A[col][cc]/=div;Bv[col]/=div;
      for(var rr=0;rr<m;rr++){if(rr===col)continue;var f=A[rr][col];for(var cc2=col;cc2<m;cc2++)A[rr][cc2]-=f*A[col][cc2];Bv[rr]-=f*Bv[col]}
    }
    return Bv;
  }
  function peval(coef,x){var s=0;for(var i=0;i<coef.length;i++)s+=coef[i]*Math.pow(x,i);return s}
  function mse(pts,coef){var s=0;for(var i=0;i<pts.length;i++){var e=pts[i].y-peval(coef,pts[i].x);s+=e*e}return s/pts.length}
  function draw(){
    var d=+$("over-degree").value;
    $("over-degree-v").textContent=d;$("over-noise-v").textContent=(+$("over-noise").value).toFixed(2);$("over-n-v").textContent=$("over-n").value;
    if(!train.length)genData();
    var coef=polyfit(train,d);
    var tr=mse(train,coef),te=mse(test,coef);
    var W=c.width,H=c.height,pad=30;
    ctx.clearRect(0,0,W,H);
    function X(v){return pad+(v+3)/6*(W-pad-10)}
    function Y(v){return 10+(1-(v+4)/8)*(H-pad-10)}
    ctx.strokeStyle="#94a3b8";ctx.beginPath();ctx.moveTo(pad,10);ctx.lineTo(pad,H-pad);ctx.lineTo(W-10,H-pad);ctx.stroke();
    // kurva asli (putus-putus hijau)
    ctx.strokeStyle="#16a34a";ctx.setLineDash([5,4]);ctx.lineWidth=2;ctx.beginPath();
    for(var px=pad;px<=W-10;px+=3){var xv=-3+(px-pad)/(W-pad-10)*6;var py=Y(trueF(xv));if(px===pad)ctx.moveTo(px,py);else ctx.lineTo(px,py)}
    ctx.stroke();ctx.setLineDash([]);
    // kurva model
    ctx.strokeStyle=d>=7?"#dc2626":"#4f46e5";ctx.lineWidth=3;ctx.beginPath();
    for(var px2=pad;px2<=W-10;px2+=3){var xv2=-3+(px2-pad)/(W-pad-10)*6;var yv=peval(coef,xv2);yv=Math.max(-4,Math.min(4,yv));var py2=Y(yv);if(px2===pad)ctx.moveTo(px2,py2);else ctx.lineTo(px2,py2)}
    ctx.stroke();ctx.lineWidth=1;
    // titik latih (biru) & uji (abu, kecil)
    train.forEach(function(p){ctx.fillStyle="#4f46e5";ctx.beginPath();ctx.arc(X(p.x),Y(Math.max(-4,Math.min(4,p.y))),4,0,7);ctx.fill()});
    test.forEach(function(p){ctx.fillStyle="rgba(100,116,139,.55)";ctx.beginPath();ctx.arc(X(p.x),Y(Math.max(-4,Math.min(4,p.y))),2.5,0,7);ctx.fill()});
    var verdict=d<=1?"📉 KURANG BELAJAR <i>(underfitting)</i>: garisnya kaku lurus, soal gampang pun gagal.":d<=5?"✅ PAS: garis halus mengikuti pola, tidak menghafal coretan.":"📈 MENGHAFAL <i>(overfitting)</i>: garis meliuk gila mengejar tiap titik — termasuk yang salah!";
    $("over-calc").innerHTML="Derajat polinomial "+d+" → loss data latih <b>"+tr.toFixed(3)+"</b> vs loss data uji <b>"+te.toFixed(3)+"</b> (makin kecil makin bagus)\n"+verdict+"\nKeterangan gambar: hijau putus-putus = pola sebenarnya, biru = cara belajar mesin, titik biru = data latih, abu-abu = data uji baru";
  }
  ["over-degree","over-noise","over-n"].forEach(function(id){$(id).addEventListener("input",function(){if(id!=="over-degree")genData();draw()})});
  $("over-new").onclick=function(){genData();draw()};
  $("over-reset").onclick=function(){$("over-degree").value=3;$("over-noise").value=0.3;$("over-n").value=18;genData();draw()};
  document.addEventListener("themechange",draw);
  genData();draw();
}
