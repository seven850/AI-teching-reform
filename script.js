  // 滚动显现
  const io = new IntersectionObserver(es=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('vis'); io.unobserve(e.target);} });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Lightbox
  const lb=document.getElementById('lightbox'),
        lbImg=lb.querySelector('img'),
        lbCap=lb.querySelector('.lb-cap');
  function openLB(src,cap){
    lbImg.src=src; lbCap.textContent=cap||'';
    lb.classList.add('show'); document.body.style.overflow='hidden';
  }
  function closeLB(){ lb.classList.remove('show'); document.body.style.overflow=''; }
  document.querySelectorAll('.figure img, .shot').forEach(el=>{
    el.addEventListener('click',()=>{
      const img = el.tagName==='IMG' ? el : el.querySelector('img');
      const cap = el.dataset.cap || img.dataset.cap || img.alt;
      openLB(img.src, cap);
    });
  });
  lb.querySelector('.lb-close').addEventListener('click',closeLB);
  lb.addEventListener('click',e=>{ if(e.target===lb) closeLB(); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeLB(); });

  // 回到顶部
  const bt=document.querySelector('.backtop');
  window.addEventListener('scroll',()=>{
    bt.classList.toggle('show', window.scrollY>600);
    // 导航高亮
    let cur='';
    document.querySelectorAll('section[id]').forEach(s=>{
      if(window.scrollY >= s.offsetTop-120) cur=s.id;
    });
    document.querySelectorAll('.nav-inner a').forEach(a=>{
      a.classList.toggle('active', a.getAttribute('href')==='#'+cur);
    });
  });
  bt.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
