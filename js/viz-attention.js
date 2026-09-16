// Attention: klik kata (query), lihat bobot ke semua kata (keys)
function initVizAttention(){
  var $=function(id){return document.getElementById(id)};
  var SENT=[
    "Kucing mengejar tikus karena ia lapar".split(" "),
    "Saya menabung di bank sungai".split(" "),
    "Dia memberi buku itu kepadanya".split(" ")
  ];
  // skor mentah didaktik untuk kalimat 0 (ia -> Kucing kuat), sisanya dihitung pseudo-embedding
  var RAW0=[
    [5,1,1,0,0,0],
    [1,5,2,0,0,0],
    [1,2,5,1,0,0],
    [0,0,1,5,1,1],
    [2,0,1,2,5,1],
    [3,0,1,1,1,5]
  ];
  function hashVec(w){
    var h=0;for(var i=0;i<w.length;i++)h=(h*31+w.charCodeAt(i))>>>0;
    var v=[];for(var k=0;k<4;k++){h=(h*1103515245+12345)>>>0;v.push(((h/4294967295)-0.5)*2)}
    return v;
  }
  function dot(a,b){var s=0;for(var i=0;i<a.length;i++)s+=a[i]*b[i];return s}
  function softmax(arr){var m=Math.max.apply(null,arr);var e=arr.map(function(v){return Math.exp(v-m)});var s=e.reduce(function(a,b){return a+b},0);return e.map(function(v){return v/s})}
  var sel=0,q=4;
  function scores(si){
    var words=SENT[si];
    if(si===0)return RAW0.map(function(r){return r.map(function(v){return v/2})});
    var E=words.map(hashVec);
    return E.map(function(qv){return E.map(function(kv){return dot(qv,kv)/2})});
  }
  function draw(){
    var si=+$("att-sent").value,words=SENT[si],S=scores(si);
    var W=S.map(softmax); // baris = query
    // kata klik
    var box=$("att-words");box.innerHTML="";
    words.forEach(function(w,i){
      var d=document.createElement("button");d.className="word"+(i===q?" active":"");d.textContent=w;
      d.onclick=function(){q=i;draw()};
      box.appendChild(d);
    });
    // matriks
    var m=$("att-matrix");m.innerHTML="";
    var n=words.length;
    m.style.gridTemplateColumns="90px repeat("+n+",1fr)";
    // header
    var corner=document.createElement("div");corner.className="att-cell";corner.textContent="Q ↓ K →";m.appendChild(corner);
    words.forEach(function(w){var d=document.createElement("div");d.className="att-cell";d.style.fontWeight="700";d.textContent=w;m.appendChild(d)});
    W.forEach(function(row,i){
      var lab=document.createElement("div");lab.className="att-cell";lab.style.fontWeight=i===q?"800":"400";
      lab.style.outline=i===q?"2px solid #4f46e5":"none";lab.textContent=words[i];m.appendChild(lab);
      row.forEach(function(p,j){
        var d=document.createElement("div");d.className="att-cell";
        d.style.background="rgba(79,70,229,"+(0.05+p*0.9)+")";
        d.style.fontWeight=(i===q&&p>0.25)?"800":"400";
        d.textContent=(p*100).toFixed(0)+"%";
        d.title=words[i]+" memperhatikan "+words[j]+" sebesar "+(p*100).toFixed(1)+"%";
        m.appendChild(d);
      });
    });
    // atur grid rows
    m.querySelectorAll(".att-cell").forEach(function(){});
    m.style.display="grid";
    var top=words.map(function(w,j){return {w:w,p:W[q][j]}}).sort(function(a,b){return b.p-a.p}).slice(0,3);
    $("att-calc").innerHTML="Query = <b>“"+words[q]+"”</b> paling memperhatikan:\n"+top.map(function(t,i){return (i+1)+". "+t.w+" ("+(t.p*100).toFixed(1)+"%)"}).join("\n")+
      "\nTotal satu baris selalu 100% (softmax).";
  }
  $("att-sent").addEventListener("change",function(){var len=SENT[+$("att-sent").value].length;q=Math.min(4,len-1);draw()});
  draw();
}
