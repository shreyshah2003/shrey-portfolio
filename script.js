(()=>{
 const header=document.querySelector('.site-header'),menu=document.querySelector('.menu-toggle'),mobile=document.querySelector('.mobile-nav'),progress=document.querySelector('.page-progress');
 let open=false;
 const setMenu=(val)=>{open=val;header.classList.toggle('site-header--menu',val);menu.classList.toggle('menu-toggle--open',val);mobile.classList.toggle('mobile-nav--open',val);menu.setAttribute('aria-expanded',String(val));menu.setAttribute('aria-label',val?'Close navigation menu':'Open navigation menu');mobile.setAttribute('aria-hidden',String(!val));mobile.querySelectorAll('a').forEach(a=>{a.tabIndex=val?0:-1;})};
 menu.addEventListener('click',()=>setMenu(!open));mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});setMenu(false);
 function onScroll(){const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);progress.style.transform='scaleX('+(scrollY/max)+')';header.classList.toggle('site-header--scrolled',scrollY>35);const a=document.querySelector('#about').getBoundingClientRect(),c=document.querySelector('#contact').getBoundingClientRect();header.classList.toggle('site-header--light',a.top<=45&&c.top>45&&!open)}
 addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);onScroll();
 if('IntersectionObserver' in window){document.documentElement.classList.add('motion-ready');let obs=new IntersectionObserver(es=>{for(let e of es)if(e.isIntersecting){e.target.classList.add('is-visible');obs.unobserve(e.target)}},{threshold:.13,rootMargin:'0px 0px -20px 0px'});document.querySelectorAll('[data-reveal]').forEach(x=>obs.observe(x))}
})();
