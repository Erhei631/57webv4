/* 57Blocks × j-vers — interactions */
(function(){
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- loader: count 00 -> 100, then reveal hero ---------- */
  var loader = document.getElementById('loader');
  var lc = loader && loader.querySelector('.lc');
  var hero = document.querySelector('.hero');
  function go(){
    if(hero) hero.classList.add('go');
    document.body.classList.remove('locked');
  }
  if(loader && lc){
    var seen;
    try{ seen = sessionStorage.getItem('57b_loader_seen'); }catch(e){ seen = null; }
    if(seen){
      loader.style.transition='none';
      loader.style.display='none';
      loader.classList.add('done');
      go();
    }else{
      try{ sessionStorage.setItem('57b_loader_seen','1'); }catch(e){}
      /* do NOT lock scrolling — the loader is a pointer-events:none overlay
         that slides away on its own, so the page can scroll immediately */
      if(reduce){
        lc.textContent='100';
        setTimeout(function(){loader.classList.add('done');go();},300);
      }else{
        var n=0;
        var iv=setInterval(function(){
          n += Math.max(1, Math.round((100-n)/7));
          if(n>=100){n=100;clearInterval(iv);
            setTimeout(function(){loader.classList.add('done');go();},480);
          }
          lc.textContent = n<10 ? '0'+n : ''+n;
        },42);
      }
    }
  }else{ go(); }

  /* ---------- nav scrolled state (hysteresis + rAF, flicker-proof) ---------- */
  var nav=document.querySelector('.nav');
  (function(){
    if(!nav) return;
    var on=false, ticking=false;
    function apply(){
      var y=window.scrollY;
      /* two thresholds so a scroll position resting near the trigger can't
         rapidly toggle the blurred bg on/off (the cause of the flicker) */
      if(!on && y>60){ on=true; nav.classList.add('scrolled'); }
      else if(on && y<20){ on=false; nav.classList.remove('scrolled'); }
      ticking=false;
    }
    window.addEventListener('scroll',function(){
      if(ticking) return;
      ticking=true; requestAnimationFrame(apply);
    },{passive:true});
    apply();
  })();

  /* ---------- scroll reveal ---------- */
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);} });
  },{threshold:.14,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el);});

  /* ---------- marquee: enter view, pause briefly, then start ---------- */
  document.querySelectorAll('.marquee-band').forEach(function(band){
    var mq=band.querySelector('.marquee');
    if(!mq) return;
    var mio=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting){
          setTimeout(function(){ mq.classList.add('marquee--run'); }, 700);
          mio.unobserve(e.target);
        }
      });
    },{threshold:.35});
    mio.observe(band);
  });

  /* ---------- count-up stats ---------- */
  function animateCount(el){
    var raw=el.getAttribute('data-count');
    var target=parseFloat(raw);
    var prefix=el.getAttribute('data-prefix')||'';
    var suffix=el.getAttribute('data-suffix')||'';
    var dec=(raw.indexOf('.')>-1)?1:0;
    if(reduce){el.textContent=prefix+raw+suffix;return;}
    var start=performance.now(), dur=1500;
    function tick(now){
      var p=Math.min(1,(now-start)/dur);
      var e=1-Math.pow(1-p,3);
      var v=(target*e).toFixed(dec);
      el.textContent=prefix+v+suffix;
      if(p<1) requestAnimationFrame(tick);
      else el.textContent=prefix+raw+suffix;
    }
    requestAnimationFrame(tick);
  }
  var cio=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){animateCount(e.target);cio.unobserve(e.target);} });
  },{threshold:.6});
  document.querySelectorAll('[data-count]').forEach(function(el){cio.observe(el);});

  /* ---------- engine accordion ---------- */
  document.querySelectorAll('.acc-item').forEach(function(item,i){
    var head=item.querySelector('.acc-head');
    var body=item.querySelector('.acc-body');
    if(!head||!body) return;
    function set(open){
      item.classList.toggle('open',open);
      body.style.maxHeight = open ? (body.scrollHeight+'px') : '0px';
    }
    head.addEventListener('click',function(){ set(!item.classList.contains('open')); });
    if(i===0) requestAnimationFrame(function(){set(true);});
    window.addEventListener('resize',function(){ if(item.classList.contains('open')) body.style.maxHeight=body.scrollHeight+'px'; });
  });

  /* ---------- dropdown parents are triggers, not links ---------- */
  var isMobile=function(){return window.matchMedia('(max-width:1024px)').matches;};
  var menuItems=[].slice.call(document.querySelectorAll('.nav-item.has-menu'));
  menuItems.forEach(function(item){
    var link=item.querySelector(':scope > a');
    if(!link) return;
    link.addEventListener('click',function(e){
      /* mobile: parent links expand the accordion, never navigate */
      if(isMobile()){
        e.preventDefault();
        e.stopImmediatePropagation();
        item.classList.toggle('open');
        return;
      }
      var href=link.getAttribute('href')||'';
      /* real page links navigate reliably; in-page anchors just toggle the menu */
      if(href && href.indexOf('#')===-1){ e.preventDefault(); window.location.href=href; return; }
      e.preventDefault();
      e.stopImmediatePropagation();
      var wasOpen=item.classList.contains('open');
      menuItems.forEach(function(o){o.classList.remove('open');});
      if(!wasOpen) item.classList.add('open');
    });
  });
  document.addEventListener('click',function(e){
    if(isMobile()) return;
    if(e.target.closest && e.target.closest('.nav-item.has-menu')) return;
    menuItems.forEach(function(o){o.classList.remove('open');});
  });

  /* ---------- mobile hamburger drawer ---------- */
  (function(){
    var burger=document.querySelector('.nav-burger');
    var links=document.querySelector('.nav-links');
    if(!burger||!nav||!links) return;
    /* clone the top-bar CTA into the bottom of the drawer */
    var cta=document.querySelector('.nav-right .btn:not(.brand)');
    if(cta && !links.querySelector('.nav-cta-m')){
      var m=cta.cloneNode(true);
      m.classList.add('nav-cta-m');
      links.appendChild(m);
    }
    function close(){nav.classList.remove('nav-open');burger.setAttribute('aria-expanded','false');document.body.classList.remove('nav-locked');}
    burger.addEventListener('click',function(){
      var open=!nav.classList.contains('nav-open');
      nav.classList.toggle('nav-open',open);
      burger.setAttribute('aria-expanded',open?'true':'false');
      document.body.classList.toggle('nav-locked',open);
    });
    /* close when a real link is tapped */
    links.addEventListener('click',function(e){
      var a=e.target.closest('a');
      if(!a) return;
      if(a.parentElement && a.parentElement.classList.contains('nav-item') && a.parentElement.classList.contains('has-menu')) return;
      close();
    });
    window.addEventListener('resize',function(){ if(!isMobile()) close(); });
  })();

  /* ---------- smooth anchor scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var id=a.getAttribute('href');
      if(id.length<2) return;
      var t=document.querySelector(id);
      if(t){e.preventDefault();window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-80,behavior:reduce?'auto':'smooth'});}
    });
  });
})();
