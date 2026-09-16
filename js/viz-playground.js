// Playground klasifikasi 2D: MLP 2->h1->h2->1, SGD full-batch di browser
function initVizPlayground(){
  var $=function(id){return document.getElementById(id)};
  var c=$("pg-canvas"),ctx=c.getContext("2d");
  var lc=$("pg-loss"),lctx=lc.getContext("2d");
  var data=[],W=null,epoch=0,lossHist=[],timer=null;
  var N=180;
  function rnd(a,b){return a+Math.random()*(b-a)}
  function genData(){
    var kind=$("pg-data").value,noise=+$("pg-noise").value;
    data=[];
    if(kind==="circle"){
      for(var i=0;i<N;i++){
        var r=Math.random()<0.5?rnd(0,2):rnd(3,5.5),th=rnd(0,Math.PI*2);
        var x=Math.cos(th)*r+ rnd(-1,1)*noise*2, y=Math.sin(th)*r+rnd(-1,1)*noise*2;
        data.push({x:x,y:y,label:r<2.5?0:1});
      }
    }else if(kind==="xor"){
      for(var i2=0;i2<N;i2++){
        var x2=rnd(-5,5)+rnd(-1,1)*noise*2, y2=rnd(-5,5)+rnd(-1,1)*noise*2;
        data.push({x:x2,y:y2,label:((x2>0)^(y2>0))?1:0});
      }
    }else if(kind==="spiral"){
      for(var i3=0;i3<N;i3++){
        var cls=i3%2, t=(i3/N)*Math.PI*3.2 + (cls?Math.PI:0);
        var rr=t*0.9;
        var x3=Math.cos(t)*rr+rnd(-1,1)*noise*3, y3=Math.sin(t)*rr+rnd(-1,1)*noise*3;
        data.push({x:x3,y:y3,label:cls});
      }
    }else{
      for(var i4=0;i4<N;i4++){
        var cls2=i4%2, cx=cls2?2.5:-2.5, cy=cls2?2.5:-2.5;
        data.push({x:cx+rnd(-2.5,2.5)+rnd(-1,1)*noise*2,y:cy+rnd(-2.5,2.5)+rnd(-1,1)*noise*2,label:cls2});
      }
    }
  }
  function initW(){
    var h1=+$("pg-h1").value,h2=+$("pg-h2").value;
    function mat(r,cc){var m=[];for(var i=0;i<r;i++){var row=[];for(var j=0;j<cc;j++)row.push(rnd(-1,1)*Math.sqrt(2/Math.max(1,cc)));m.push(row)}return m}
    function vec(n){var v=[];for(var i=0;i<n;i++)v.push(0);return v}
    W={h1:h1,h2:h2,W1:h1?mat(h1,2):[],b1:h1?vec(h1):[],W2:(h1&&h2)?mat(h2,h1):[],b2:h2?vec(h2):[],
       W3:mat(1,h2?h2:(h1?h1:2)),b3:[0]};
    epoch=0;lossHist=[];
  }
  function actF(n,x){if(n==="tanh")return Math.tanh(x);if(n==="relu")return Math.max(0,x);return 1/(1+Math.exp(-x))}
  function actD(n,x,y){if(n==="tanh")return 1-y*y;if(n==="relu")return x>0?1:0;return y*(1-y)}
  function forward(px,py){
    var an=$("pg-act").value,cache={in:[px/6,py/6]};
    var h1=W.h1,h2=W.h2;
    var a=cache.in,z1=[],a1=[];
    if(h1){for(var i=0;i<h1;i++){var s=W.W1[i][0]*a[0]+W.W1[i][1]*a[1]+W.b1[i];z1.push(s);a1.push(actF(an,s))}cache.z1=z1;cache.a1=a1;a=a1}
    var z2=[],a2=[];
    if(h2){for(var j=0;j<h2;j++){var s2=W.b2[j];for(var k=0;k<h1;k++)s2+=W.W2[j][k]*a[k];z2.push(s2);a2.push(actF(an,s2))}cache.z2=z2;cache.a2=a2;a=a2}
    var s3=W.b3[0];for(var k2=0;k2<a.length;k2++)s3+=W.W3[0][k2]*a[k2];
    var out=1/(1+Math.exp(-s3));
    cache.a=a;cache.z3=s3;cache.out=out;return cache;
  }
  function trainEpochs(steps){
    var lr=+$("pg-lr").value,an=$("pg-act").value;
    for(var e=0;e<steps;e++){
      // akumulasi gradien
      var gW1=W.W1.map(function(r){return r.map(function(){return 0})}),gb1=W.b1.map(function(){return 0});
      var gW2=W.W2.map(function(r){return r.map(function(){return 0})}),gb2=W.b2.map(function(){return 0});
      var gW3=W.W3.map(function(r){return r.map(function(){return 0})}),gb3=[0];
      var loss=0,correct=0;
      for(var i=0;i<data.length;i++){
        var d=data[i],cc=forward(d.x,d.y);
        var y=d.label,p=Math.min(0.999,Math.max(0.001,cc.out));
        loss+=-(y*Math.log(p)+(1-y)*Math.log(1-p));
        if((p>0.5?1:0)===y)correct++;
        var dz3=(p-y)/data.length; // BCE+sigmoid
        for(var k=0;k<cc.a.length;k++)gW3[0][k]+=dz3*cc.a[k];
        gb3[0]+=dz3;
        // mundur ke a
        var da=cc.a.map(function(_,k2){return W.W3[0][k2]*dz3});
        if(W.h2){
          var dz2=[];
          for(var j=0;j<W.h2;j++){var dd=da[j]*actD(an,cc.z2[j],cc.a2[j]);dz2.push(dd);gb2[j]+=dd;
            for(var k3=0;k3<W.h1;k3++)gW2[j][k3]+=dd*cc.a1[k3]}
          var da1=[];for(var k4=0;k4<W.h1;k4++){var s=0;for(var j2=0;j2<W.h2;j2++)s+=W.W2[j2][k4]*dz2[j2];da1.push(s)}
          da=da1;
        }
        if(W.h1){
          var src=cc.a1,srcZ=cc.z1,off=0;
          // jika h2 ada, da sudah untuk layer1; jika tidak, da untuk layer1 langsung
          for(var j3=0;j3<W.h1;j3++){
            var dval=W.h2?da[j3]:(da[j3]*1);
            var dz1=dval*actD(an,srcZ[j3],src[j3]);
            gb1[j3]+=dz1;gW1[j3][0]+=dz1*cc.in[0];gW1[j3][1]+=dz1*cc.in[1];
          }
        }
      }
      // update
      function upd(M,G){for(var i=0;i<M.length;i++)for(var j=0;j<M[i].length;j++)M[i][j]-=lr*G[i][j]}
      function updv(V,G){for(var i=0;i<V.length;i++)V[i]-=lr*G[i]}
      upd(W.W1,gW1);updv(W.b1,gb1);upd(W.W2,gW2);updv(W.b2,gb2);upd(W.W3,gW3);updv(W.b3,gb3);
      epoch++;loss/=data.length;
      if(epoch%5===0||steps<=50)lossHist.push(loss);
      if(lossHist.length>200)lossHist.shift();
      var acc=correct/data.length;
      if(e===steps-1)$("pg-calc").textContent="Putaran "+epoch+" • Skor meleset "+loss.toFixed(4)+" (0 = sempurna) • Ketepatan "+(acc*100).toFixed(1)+"%"+(W.h1===0?"\n⚠️ Tim 0 = tanpa tim tengah, cuma garis lurus — mustahil untuk lingkaran/spiral! Tambah timnya.":"");
    }
    drawBoundary();drawLoss();
  }
  function drawBoundary(){
    var S=44,Wd=c.width,Hd=c.height;
    var img=ctx.createImageData(Wd,Hd);
    // evaluasi grid
    var grid=[];
    for(var gy=0;gy<S;gy++){grid.push([]);for(var gx=0;gx<S;gx++){
      var x=(gx/(S-1))*12-6, y=6-(gy/(S-1))*12;
      grid[gy].push(forward(x,y).out);
    }}
    for(var py=0;py<Hd;py++)for(var px=0;px<Wd;px++){
      var gx2=Math.floor(px/Wd*S),gy2=Math.floor(py/Hd*S);
      var v=grid[gy2][gx2],o=(py*Wd+px)*4;
      if(v>0.5){img.data[o]=190;img.data[o+1]=200;img.data[o+2]=255}else{img.data[o]=255;img.data[o+1]=220;img.data[o+2]=170}
      img.data[o+3]=255;
    }
    ctx.putImageData(img,0,0);
    function X(v){return (v+6)/12*Wd}function Y(v){return (6-v)/12*Hd}
    data.forEach(function(d){
      ctx.fillStyle=d.label?"#1d4ed8":"#ea580c";
      ctx.beginPath();ctx.arc(X(d.x),Y(d.y),4,0,7);ctx.fill();
      ctx.strokeStyle="#fff";ctx.stroke();
    });
  }
  function drawLoss(){
    var Wd=lc.width,Hd=lc.height;
    lctx.clearRect(0,0,Wd,Hd);
    if(lossHist.length<2)return;
    var mx=Math.max.apply(null,lossHist),mn=Math.min.apply(null,lossHist);
    if(mx===mn)mx=mn+1;
    lctx.strokeStyle="#4f46e5";lctx.lineWidth=2;lctx.beginPath();
    lossHist.forEach(function(L,i){
      var X=8+i/(199)* (Wd-16),Y=8+(1-(L-mn)/(mx-mn))*(Hd-16);
      if(i===0)lctx.moveTo(X,Y);else lctx.lineTo(X,Y);
    });
    lctx.stroke();lctx.lineWidth=1;
    lctx.fillStyle="#64748b";lctx.font="11px sans-serif";lctx.fillText("grafik skor meleset ("+lossHist.length+" titik)",10,14);
  }
  function stop(){if(timer){clearInterval(timer);timer=null;$("pg-train").textContent="▶ Latih"}}
  $("pg-train").onclick=function(){
    if(timer){stop();return}
    this.textContent="⏸ Pause";
    timer=setInterval(function(){trainEpochs(10)},120);
  };
  $("pg-stop").onclick=stop;
  $("pg-step").onclick=function(){stop();trainEpochs(50)};
  $("pg-reset").onclick=function(){stop();initW();drawBoundary();drawLoss();$("pg-calc").textContent="Putaran 0 • Cara menimbang diacak ulang. Klik Latih!"};
  $("pg-newdata").onclick=function(){stop();genData();initW();drawBoundary();drawLoss();$("pg-calc").textContent="Soal baru datang! Klik Latih."};
["pg-data","pg-noise"].forEach(function(id){$(id).addEventListener("change",function(){stop();genData();initW();drawBoundary();drawLoss();$("pg-calc").textContent="Bentuk soal diganti. Klik Latih."})});
  ["pg-h1","pg-h2","pg-act"].forEach(function(id){$(id).addEventListener("input",function(){
    $("pg-h1-v").textContent=$("pg-h1").value;$("pg-h2-v").textContent=$("pg-h2").value;
  });$(id).addEventListener("change",function(){stop();initW();drawBoundary();$("pg-calc").textContent="Susunan tim diganti. Klik Latih."})});
  $("pg-lr").addEventListener("input",function(){$("pg-lr-v").textContent=(+$("pg-lr").value).toFixed(2)});
  $("pg-noise").addEventListener("input",function(){$("pg-noise-v").textContent=(+$("pg-noise").value).toFixed(2)});
  document.addEventListener("themechange",function(){drawBoundary();drawLoss()});
  genData();initW();drawBoundary();drawLoss();
}
