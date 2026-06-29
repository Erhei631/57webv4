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
      loader.classList.add('done');
      go();
    }else{
      try{ sessionStorage.setItem('57b_loader_seen','1'); }catch(e){}
      document.body.classList.add('locked');
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

  /* ---------- nav scrolled state ---------- */
  var nav=document.querySelector('.nav');
  window.addEventListener('scroll',function(){
    if(nav) nav.classList.toggle('scrolled', window.scrollY>24);
  },{passive:true});

  /* ---------- scroll reveal ---------- */
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);} });
  },{threshold:.14,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el);});

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
  var menuItems=[].slice.call(document.querySelectorAll('.nav-item.has-menu'));
  menuItems.forEach(function(item){
    var link=item.querySelector(':scope > a');
    if(!link) return;
    link.addEventListener('click',function(e){
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
    if(e.target.closest && e.target.closest('.nav-item.has-menu')) return;
    menuItems.forEach(function(o){o.classList.remove('open');});
  });

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
