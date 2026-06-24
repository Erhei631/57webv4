/* j-vers-style paint-trail cursor — blue-violet smear that wanders when idle */
(function(){
  'use strict';
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if(matchMedia('(pointer: coarse)').matches) return;

  var c=document.createElement('canvas');c.id='trail';
  document.body.appendChild(c);
  var ctx=c.getContext('2d'),W=0,H=0,dpr=Math.min(2,window.devicePixelRatio||1);
  function size(){W=c.width=innerWidth*dpr;H=c.height=innerHeight*dpr;c.style.width=innerWidth+'px';c.style.height=innerHeight+'px';}
  size();addEventListener('resize',size,{passive:true});

  var x=innerWidth/2*dpr,y=innerHeight/2*dpr,tx=x,ty=y,last=performance.now(),idle=0;
  addEventListener('pointermove',function(e){tx=e.clientX*dpr;ty=e.clientY*dpr;last=performance.now();},{passive:true});

  function frame(now){
    // fade the existing trail (paint slowly dries)
    ctx.globalCompositeOperation='destination-out';
    ctx.fillStyle='rgba(0,0,0,0.09)';
    ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='source-over';

    // when the pointer rests, the trail comes alive and wanders
    if(now-last>1100){idle+=0.045;
      tx=(innerWidth/2+Math.cos(idle)*150*(1+Math.sin(idle*0.5)*0.4))*dpr;
      ty=(innerHeight/2+Math.sin(idle*1.3)*120)*dpr;
    }
    x+=(tx-x)*0.17;y+=(ty-y)*0.17;

    var r=15*dpr;
    var g=ctx.createRadialGradient(x,y,0,x,y,r);
    g.addColorStop(0,'rgba(124,92,255,0.92)');
    g.addColorStop(0.5,'rgba(106,77,255,0.55)');
    g.addColorStop(1,'rgba(166,107,255,0)');
    ctx.fillStyle=g;
    ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
