/* Hero aura — fading colour trail that follows the cursor (heavier at the head),
   drifts on its own when idle. Colour flows + each blob morphs via CSS. */
(function(){
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var auras = [].slice.call(document.querySelectorAll('.aura'));
  if(!auras.length) return;

  auras.forEach(function(aura){
    var nodes = [].slice.call(aura.querySelectorAll('.trail-node'));
    if(!nodes.length) return;

    var r = aura.getBoundingClientRect();
    function measure(){ r = aura.getBoundingClientRect(); }
    addEventListener('resize', measure, {passive:true});

    var t = Math.random()*10;
    var pts = nodes.map(function(){ return {x:r.width*0.5, y:r.height*0.42}; });
    function place(n,p){ n.style.transform = 'translate('+p.x+'px,'+p.y+'px)'; }
    if(reduce){ pts.forEach(function(p,i){ place(nodes[i],p); }); return; }

    (function loop(){
      t += 0.006;
      var tx = r.width*(0.5 + 0.24*Math.cos(t));
      var ty = r.height*(0.42 + 0.26*Math.sin(t*1.3));
      pts[0].x += (tx - pts[0].x)*0.04; pts[0].y += (ty - pts[0].y)*0.04;
      place(nodes[0], pts[0]);
      for(var i=1;i<pts.length;i++){
        pts[i].x += (pts[i-1].x - pts[i].x)*0.28;
        pts[i].y += (pts[i-1].y - pts[i].y)*0.28;
        place(nodes[i], pts[i]);
      }
      requestAnimationFrame(loop);
    })();
  });
})();
