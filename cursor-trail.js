// A screen-aligned field of open rings, activated by pointer movement.
// The normal OS pointer remains precise; this layer never receives input.
(() => {
  const surface=document.createElement('canvas');surface.className='dot-trail';surface.setAttribute('aria-hidden','true');document.body.append(surface);
  const ctx=surface.getContext('2d');if(!ctx)return;
  const fine=matchMedia('(hover:hover) and (pointer:fine)'),reduce=matchMedia('(prefers-reduced-motion:reduce)');
  const toggle=document.querySelector('#trail-toggle');
  let allowed=true;try{allowed=localStorage.getItem('shrey-trail')!=='off';}catch{}
  let points=[],raf=0,width=0,height=0,lastPoint=null,dark=false;
  function enabled(){return fine.matches&&!reduce.matches&&allowed;}
  function clear(){points=[];lastPoint=null;cancelAnimationFrame(raf);raf=0;ctx.clearRect(0,0,width,height);surface.dataset.active='false';}
  function resize(){const d=Math.min(devicePixelRatio,1.5);width=innerWidth;height=innerHeight;surface.width=Math.round(width*d);surface.height=Math.round(height*d);ctx.setTransform(d,0,0,d,0,0);clear();}
  function paint(now){
    raf=0;ctx.clearRect(0,0,width,height);points=points.filter(p=>now-p.t<1050);
    if(!points.length||!enabled()||document.hidden){surface.dataset.active='false';return;}
    let minX=width,maxX=0,minY=height,maxY=0;
    points.forEach(p=>{minX=Math.min(minX,p.x-75);maxX=Math.max(maxX,p.x+75);minY=Math.min(minY,p.y-75);maxY=Math.max(maxY,p.y+75);});
    const step=10;let count=0;
    for(let y=Math.max(0,Math.floor(minY/step)*step);y<Math.min(height,maxY);y+=step){
      for(let x=Math.max(0,Math.floor(minX/step)*step);x<Math.min(width,maxX);x+=step){
        let energy=0;
        for(const p of points){const dx=x-p.x,dy=y-p.y,d2=dx*dx+dy*dy;if(d2>5625)continue;const age=1-(now-p.t)/1050;energy=Math.max(energy,Math.pow(1-d2/5625,2)*age);}
        if(energy<.045)continue;
        const hot=energy>.34;ctx.strokeStyle=hot?`rgba(${dark?'255,116,53':'225,85,32'},${Math.min(.88,energy*1.25)})`:`rgba(${dark?'187,193,201':'83,91,106'},${energy*.8})`;
        ctx.lineWidth=hot?1.05:.65;ctx.beginPath();ctx.arc(x,y,.45+Math.pow(energy,.65)*2.05,0,Math.PI*2);ctx.stroke();count++;
      }
    }
    surface.dataset.active='true';surface.dataset.rings=String(count);raf=requestAnimationFrame(paint);
  }
  document.addEventListener('pointermove',e=>{
    if(!enabled()||e.pointerType==='touch')return;
    if(e.target.closest('button,a,input,textarea,select,[role="tab"],dialog')){lastPoint=null;return;}
    const now=performance.now();dark=!!e.target.closest('.anatomy,.desk,.memoir-art');
    if(lastPoint){const distance=Math.hypot(e.clientX-lastPoint.x,e.clientY-lastPoint.y),steps=Math.min(8,Math.ceil(distance/18));for(let i=1;i<steps;i++)points.push({x:lastPoint.x+(e.clientX-lastPoint.x)*i/steps,y:lastPoint.y+(e.clientY-lastPoint.y)*i/steps,t:now-steps+i});}
    points.push({x:e.clientX,y:e.clientY,t:now});points=points.slice(-40);lastPoint={x:e.clientX,y:e.clientY};if(!raf)raf=requestAnimationFrame(paint);
  },{passive:true});
  function sync(){if(toggle){toggle.hidden=!fine.matches||reduce.matches;toggle.textContent=allowed?'Cursor trail: on':'Cursor trail: off';toggle.setAttribute('aria-pressed',String(allowed));}if(!enabled())clear();}
  toggle?.addEventListener('click',()=>{allowed=!allowed;try{localStorage.setItem('shrey-trail',allowed?'on':'off');}catch{}clear();sync();});
  document.addEventListener('pointerleave',clear);document.addEventListener('visibilitychange',()=>{if(document.hidden)clear();});addEventListener('blur',clear);addEventListener('resize',resize);reduce.addEventListener('change',sync);fine.addEventListener('change',sync);resize();sync();
})();
