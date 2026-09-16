// MLP 2-3-2-1 dengan forward pass + SVG animasi aliran
function initVizMlp(){
  var $=function(id){return document.getElementById(id)};
  var svg=$("mlp-svg");
  var NS="http://www.w3.org/2000/svg";
  // bobot acak kecil
  var W=[];
  function randW(r,c){var m=[];for(var i=0;i<r;i++){var row=[];for(var j=0;j<c;j++)row.push((Math.random()*2-1).toFixed(2)*1);m.push(row)}return m}
  function resetW(){W=[randW(3,2),randW(2,3),randW(1,2)];}
  resetW();
  var B=[[0.1,-0.1,0],[0.1,-0.1],[0.2]];
  var layers=[2,3,2,1];
  var xs=[60,190,320,420], yc=170, gap=[120,80,90,0];
  function act(name,x){if(name==="sigmoid")return 1/(1+Math.exp(-x));if(name==="tanh")return Math.tanh(x);return Math.max(0,x)}
  function forward(i1,i2,name){
    var a0=[i1,i2],z1=[],a1=[],z2=[],a2=[],z3,a3;
    for(var i=0;i<3;i++){var s=W[0][i][0]*a0[0]+W[0][i][1]*a0[1]+B[0][i];z1.push(s);a1.push(act(name,s))}
    for(var j=0;j<2;j++){var s2=W[1][j][0]*a1[0]+W[1][j][1]*a1[1]+W[1][j][2]*a1[2]+B[1][j];z2.push(s2);a2.push(act(name,s2))}
    var s3=W[2][0][0]*a2[0]+W[2][0][1]*a2[1]+B[2][0];z3=s3;a3=1/(1+Math.exp(-s3));
    return {a0:a0,a1:a1,a2:a2,a3:a3,z1:z1,z2:z2,z3:z3};
  }
  function pos(li,ni,n){return {x:xs[li],y:yc-(n-1)*gap[li]/2+ni*gap[li]}}
  function draw(){
    var i1=+$("mlp-i1").value,i2=+$("mlp-i2").value,name=$("mlp-act").value,anim=$("mlp-anim").checked;
    $("mlp-i1-v").textContent=i1.toFixed(2);$("mlp-i2-v").textContent=i2.toFixed(2);
    var f=forward(i1,i2,name);
    var acts=[f.a0,f.a1,f.a2,[f.a3]];
    svg.innerHTML="";
    // garis
    var Ws=[W[0],W[1],W[2]];
    for(var l=0;l<3;l++){
      var nA=layers[l],nB=layers[l+1];
      // W[l] bentuk [nB x nA]
      for(var a=0;a<nA;a++)for(var b2=0;b2<nB;b2++){
        var w=Ws[l][b2][a];
        var p1=pos(l,a,nA),p2=pos(l+1,b2,nB);
        var line=document.createElementNS(NS,"line");
        line.setAttribute("x1",p1.x);line.setAttribute("y1",p1.y);
        line.setAttribute("x2",p2.x);line.setAttribute("y2",p2.y);
        line.setAttribute("stroke",w>=0?"#4f46e5":"#ef4444");
        line.setAttribute("stroke-width",Math.min(1+Math.abs(w)*3,7));
        line.setAttribute("opacity",0.35+Math.min(Math.abs(w)/2,0.6));
        if(anim){line.setAttribute("stroke-dasharray","6 6");line.innerHTML='<animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite"/>';}
        svg.appendChild(line);
      }
    }
    // label lingkaran: bahasa sendiri yang konsisten (C=ciri masuk, A–E=tim, ★=keputusan)
    var labels=[["C1","C2"],["A","B","C"],["D","E"],["★"]];
    for(var l2=0;l2<4;l2++){
      for(var n=0;n<layers[l2];n++){
        var p=pos(l2,n,layers[l2]),v=acts[l2][n];
        var g=document.createElementNS(NS,"g");
        var circle=document.createElementNS(NS,"circle");
        circle.setAttribute("cx",p.x);circle.setAttribute("cy",p.y);circle.setAttribute("r",24);
        circle.setAttribute("fill",l2===3?(v>0.5?"#16a34a":"#334155"):"#fff");
        circle.setAttribute("stroke","#4f46e5");circle.setAttribute("stroke-width",2);
        g.appendChild(circle);
        var t=document.createElementNS(NS,"text");
        t.setAttribute("x",p.x);t.setAttribute("y",p.y-2);t.setAttribute("text-anchor","middle");t.setAttribute("font-size","11");t.setAttribute("font-weight","bold");
        t.setAttribute("fill",l2===3?"#fff":"#1a2233");
        t.textContent=v.toFixed(2);g.appendChild(t);
        var t2=document.createElementNS(NS,"text");
        t2.setAttribute("x",p.x);t2.setAttribute("y",p.y+34);t2.setAttribute("text-anchor","middle");t2.setAttribute("font-size","10");t2.setAttribute("fill","#64748b");
        t2.textContent=labels[l2][n];g.appendChild(t2);
        svg.appendChild(g);
      }
    }
    $("mlp-calc").innerHTML="Ciri terlihat ["+i1.toFixed(2)+", "+i2.toFixed(2)+"] → ringkasan tim depan ["+f.a1.map(function(v){return v.toFixed(2)}).join(", ")+
      "] → ringkasan tim tengah ["+f.a2.map(function(v){return v.toFixed(2)}).join(", ")+"] → <b>keputusan "+f.a3.toFixed(3)+"</b> ("+(f.a3>0.5?"di atas 0,5 = YA":"di bawah 0,5 = BELUM")+")";
  }
  ["mlp-i1","mlp-i2","mlp-act","mlp-anim"].forEach(function(id){$(id).addEventListener("input",draw);$(id).addEventListener("change",draw)});
  $("mlp-random").onclick=function(){resetW();draw()};
  $("mlp-reset").onclick=function(){$("mlp-i1").value=0.8;$("mlp-i2").value=0.3;$("mlp-act").value="relu";resetW();B=[[0.1,-0.1,0],[0.1,-0.1],[0.2]];draw()};
  draw();
}
