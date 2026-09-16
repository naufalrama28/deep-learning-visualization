// CNN: input 5x5 klik, filter 3x3, feature map + ReLU + maxpool
function initVizCnn(){
  var $=function(id){return document.getElementById(id)};
  var input=[],FILTERS={
    edge:[[-1,-1,-1],[-1,8,-1],[-1,-1,-1]],
    blur:[[1/9,1/9,1/9],[1/9,1/9,1/9],[1/9,1/9,1/9]],
    sharpen:[[0,-1,0],[-1,5,-1],[0,-1,0]],
    vert:[[-1,0,1],[-2,0,2],[-1,0,1]]
  };
  var PATTERNS={
    x:[1,0,0,0,1, 0,1,0,1,0, 0,0,1,0,0, 0,1,0,1,0, 1,0,0,0,1],
    o:[1,1,1,1,1, 1,0,0,0,1, 1,0,0,0,1, 1,0,0,0,1, 1,1,1,1,1],
    line:[0,0,1,0,0, 0,0,1,0,0, 0,0,1,0,0, 0,0,1,0,0, 0,0,1,0,0],
    random:null
  };
  function setPattern(n){
    if(n==="random"){input=[];for(var i=0;i<25;i++)input.push(Math.random()>0.5?1:0)}
    else input=PATTERNS[n].slice();
  }
  function color(v,mn,mx){
    // heatmap: negatif merah, positif biru
    var t=mx===mn?0.5:(v-mn)/(mx-mn);
    var a=Math.round(20+t*200);
    if(v<0)return "rgba(239,68,68,"+(0.15+Math.min(0.85,Math.abs(v)/(Math.abs(mn||1))))+")";
    return "rgba(79,70,229,"+(0.12+t*0.75)+")";
  }
  function draw(){
    var fk=$("cnn-filter").value, F=FILTERS[fk];
    // konvolusi valid 5x5 * 3x3 -> 3x3 + ReLU
    var out=[];
    for(var i=0;i<3;i++){out.push([]);for(var j=0;j<3;j++){
      var s=0;for(var a=0;a<3;a++)for(var b=0;b<3;b++)s+=input[(i+a)*5+(j+b)]*F[a][b];
      out[i].push(Math.max(0,s));
    }}
    var flat=out.flat(),mn=Math.min.apply(null,flat),mx=Math.max.apply(null,flat);
    // render input
    var din=$("cnn-in");din.innerHTML="";din.className="grid5";
    input.forEach(function(v,idx){
      var d=document.createElement("div");d.className="cell";
      d.style.background=v?"#1e293b":"#f1f5f9";d.style.color=v?"#fff":"#94a3b8";d.textContent=v;
      d.title="Klik untuk ubah piksel "+idx;
      d.onclick=function(){input[idx]=input[idx]?0:1;draw()};
      din.appendChild(d);
    });
    // render out
    var dout=$("cnn-out");dout.innerHTML="";dout.className="grid3cnn";
    var mxo=0;
    out.forEach(function(row){row.forEach(function(v){
      var d=document.createElement("div");d.className="cell";d.style.background=color(v,mn,mx);d.textContent=(+v).toFixed(1);d.style.cursor="default";
      dout.appendChild(d);
    })});
    // maxpool 2x2 stride1 dari 3x3 -> 2x2
    var pool=[];
    for(var pi=0;pi<2;pi++){pool.push([]);for(var pj=0;pj<2;pj++){
      pool[pi].push(Math.max(out[pi][pj],out[pi][pj+1],out[pi+1][pj],out[pi+1][pj+1]));
    }}
    var dpool=$("cnn-pool");dpool.innerHTML="";dpool.className="grid2";
    var pflat=pool.flat(),pmn=Math.min.apply(null,pflat),pmx=Math.max.apply(null,pflat);
    pool.forEach(function(row){row.forEach(function(v){
      var d=document.createElement("div");d.className="cell";d.style.background=color(v,pmn,pmx);d.textContent=(+v).toFixed(1);d.style.cursor="default";
      dpool.appendChild(d);
    })});
    $("cnn-calc").innerHTML="Filter <b>"+fk+"</b> = ["+F.map(function(r){return r.map(function(v){return (+v).toFixed(1)}).join(",")}).join(" | ")+"]\nTiap sel = jumlah(piksel × filter) lalu ReLU(negatif→0).\nMax = "+mx.toFixed(2)+". Coba ganti pola/filter & klik piksel!";
  }
  $("cnn-pattern").addEventListener("change",function(){setPattern(this.value);draw()});
  $("cnn-filter").addEventListener("change",draw);
  $("cnn-reset").onclick=function(){$("cnn-pattern").value="x";$("cnn-filter").value="edge";setPattern("x");draw()};
  setPattern("x");draw();
}
