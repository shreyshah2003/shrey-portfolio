import * as THREE from './vendor/three.module.js';
import { RoomEnvironment } from './vendor/RoomEnvironment.js';

// An original desktop signal processor: machined enclosure, printed circuitry,
// copper contacts and a hinged glass lid. Its motion is driven only by scroll.
export function createEngine(canvas) {
  const mobile = matchMedia('(max-width:800px)').matches;
  const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true, powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.25 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34,1,.1,50);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room,.035);
  scene.environment = environment.texture;
  room.dispose(); pmrem.dispose();
  const assembly = new THREE.Group(); scene.add(assembly);
  const physical = p => new THREE.MeshPhysicalMaterial(p);
  const graphite = physical({color:0x151b26,metalness:.65,roughness:.3,clearcoat:.35});
  const ceramic = physical({color:0xd8ded9,metalness:.2,roughness:.34,clearcoat:.4});
  const cobalt = physical({color:0x153bff,metalness:.6,roughness:.19,clearcoat:1,clearcoatRoughness:.12});
  const copper = physical({color:0xd89a64,metalness:1,roughness:.27});
  const titanium = physical({color:0xc3ced3,metalness:1,roughness:.23});
  const rubber = physical({color:0x15191f,roughness:.85});
  const glass = physical({color:0xe0f0ff,metalness:0,roughness:.08,transmission:0,thickness:.09,ior:1.45,clearcoat:1,transparent:true,opacity:.12,depthWrite:false});
  const signal = physical({color:0xffa16a,emissive:0xff783c,emissiveIntensity:.4,roughness:.3});
  function rounded(w,d,h,r=.12) {
    const s=new THREE.Shape(),x=-w/2,y=-d/2;
    s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);
    s.lineTo(x+w,y+d-r);s.quadraticCurveTo(x+w,y+d,x+w-r,y+d);
    s.lineTo(x+r,y+d);s.quadraticCurveTo(x,y+d,x,y+d-r);
    s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);
    const g=new THREE.ExtrudeGeometry(s,{depth:h,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:Math.min(.035,h*.2),bevelThickness:Math.min(.025,h*.2),curveSegments:10});
    g.translate(0,0,-h/2);g.rotateX(-Math.PI/2);return g;
  }
  function mesh(g,m,parent=assembly,x=0,y=0,z=0){const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
  function plate(w,d,h,r,m,parent=assembly,x=0,y=0,z=0){return mesh(rounded(w,d,h,r),m,parent,x,y,z);}
  // Feet, cooling fins and the lower shell keep the sculpture physically grounded.
  for(const x of [-1.13,1.13])for(const z of [-.96,.96])mesh(new THREE.CylinderGeometry(.16,.17,.14,24),rubber,assembly,x,.08,z);
  plate(2.95,2.65,.24,.22,graphite,assembly,0,.28);
  plate(2.85,2.55,.055,.2,titanium,assembly,0,.44);
  plate(2.78,2.48,.16,.16,cobalt,assembly,0,.54);
  for(let i=0;i<13;i++)plate(.045,2.15,.13,.015,graphite,assembly,-1.15+i*.19,.235);
  plate(2.57,2.27,.08,.12,ceramic,assembly,0,.67);

  // Printed traces and labels are generated locally, with no raster downloads.
  const circuit=document.createElement('canvas');circuit.width=1024;circuit.height=1024;
  const ctx=circuit.getContext('2d');ctx.clearRect(0,0,1024,1024);
  ctx.strokeStyle='#9a7352';ctx.lineWidth=2.3;ctx.lineCap='round';
  for(let side=0;side<4;side++){
    ctx.save();ctx.translate(512,512);ctx.rotate(side*Math.PI/2);
    for(let i=0;i<9;i++){
      const x=-125+i*31,turn=220+(i%3)*31,end=330+(i%2)*50;
      ctx.beginPath();ctx.moveTo(x,145);ctx.lineTo(x,turn);ctx.lineTo(x+(i-4)*14,turn+40);ctx.lineTo(x+(i-4)*14,end);ctx.stroke();
      ctx.beginPath();ctx.arc(x+(i-4)*14,end,5,0,Math.PI*2);ctx.stroke();
    }ctx.restore();
  }
  ctx.fillStyle='#465053';ctx.font='16px monospace';ctx.fillText('SHREY / FIELD UNIT 01',58,72);ctx.fillText('SIGNAL → CONTEXT → DECISION',58,967);
  ctx.font='12px monospace';ctx.fillText('HUMAN JUDGMENT REQUIRED',58,1000);
  const circuitTexture=new THREE.CanvasTexture(circuit);circuitTexture.colorSpace=THREE.SRGBColorSpace;circuitTexture.anisotropy=4;
  const traces=mesh(new THREE.PlaneGeometry(2.51,2.21),new THREE.MeshStandardMaterial({map:circuitTexture,transparent:true,roughness:.5,metalness:.35,depthWrite:false}),assembly,0,.733);
  traces.rotation.x=-Math.PI/2;traces.castShadow=false;
  const core=new THREE.Group();assembly.add(core);core.position.y=.74;
  plate(1.08,1.08,.1,.06,graphite,core,0,.02);
  plate(.94,.94,.04,.055,copper,core,0,.09);
  plate(.84,.84,.16,.07,cobalt,core,0,.19);
  const cap=plate(.72,.72,.025,.06,physical({color:0x3559fb,metalness:.85,roughness:.11,clearcoat:1}),core,0,.285);
  // Etched symbol on the chip's polished cap.
  const mark=document.createElement('canvas');mark.width=512;mark.height=512;const mc=mark.getContext('2d');
  mc.strokeStyle='#e3e9ff';mc.lineWidth=7;mc.beginPath();mc.moveTo(148,150);mc.lineTo(90,256);mc.lineTo(148,362);mc.moveTo(364,150);mc.lineTo(422,256);mc.lineTo(364,362);mc.moveTo(290,130);mc.lineTo(222,382);mc.stroke();
  const mt=new THREE.CanvasTexture(mark);mt.colorSpace=THREE.SRGBColorSpace;
  const sign=mesh(new THREE.PlaneGeometry(.56,.56),new THREE.MeshBasicMaterial({map:mt,transparent:true,depthWrite:false}),core,0,.31);sign.rotation.x=-Math.PI/2;sign.castShadow=false;
  const pinGeometry=new THREE.BoxGeometry(.055,.055,.18);const pins=new THREE.InstancedMesh(pinGeometry,copper,40);core.add(pins);const dummy=new THREE.Object3D();
  for(let side=0;side<4;side++)for(let i=0;i<10;i++){const angle=side*Math.PI/2;dummy.position.set(Math.sin(angle)*.59+Math.cos(angle)*(-.4+i*.089),.03,Math.cos(angle)*.59-Math.sin(angle)*(-.4+i*.089));dummy.rotation.y=angle;dummy.updateMatrix();pins.setMatrixAt(side*10+i,dummy.matrix);}pins.castShadow=true;
  // Capacitors, connectors, screws and PCB edge contacts.
  for(let side of [-1,1])for(let i=0;i<5;i++){mesh(new THREE.BoxGeometry(.14,.1,.075),graphite,assembly,side*1.06,.79,-.55+i*.22);mesh(new THREE.BoxGeometry(.15,.025,.025),copper,assembly,side*1.06,.845,-.55+i*.22);}
  for(const x of [-1.13,1.13])for(const z of [-.96,.96]){mesh(new THREE.CylinderGeometry(.065,.065,.12,24),titanium,assembly,x,.73,z);const slot=mesh(new THREE.BoxGeometry(.066,.004,.012),graphite,assembly,x,.792,z);slot.rotation.y=.4;}
  for(let i=0;i<9;i++)mesh(new THREE.BoxGeometry(.09,.018,.2),copper,assembly,-.56+i*.14,.72,1.08);
  // A braided signal line connects input and processor; it never floats free.
  const route=new THREE.CatmullRomCurve3([new THREE.Vector3(-1.18,.78,.72),new THREE.Vector3(-.9,1.12,.67),new THREE.Vector3(-.65,1.05,.35),new THREE.Vector3(-.5,.86,.3)]);
  mesh(new THREE.TubeGeometry(route,40,.035,10,false),copper);
  const dataPoints=[];for(let i=0;i<4;i++)dataPoints.push(mesh(new THREE.SphereGeometry(.048,12,8),signal));

  // Glass enclosure with a real rear hinge: scroll exposes the circuitry.
  const lid=new THREE.Group();lid.position.set(0,.72,-1.17);assembly.add(lid);
  const lidBody=new THREE.Group();lidBody.position.z=1.17;lid.add(lidBody);
  plate(2.67,2.37,.07,.15,glass,lidBody,0,.08);
  for(const x of [-1.32,1.32])plate(.045,2.3,.075,.02,titanium,lidBody,x,.08);
  for(const z of [-1.16,1.16])plate(2.62,.045,.075,.02,titanium,lidBody,0,.08,z);
  for(const x of [-.9,.9]){const hinge=mesh(new THREE.CylinderGeometry(.085,.085,.36,24),titanium,assembly,x,.73,-1.17);hinge.rotation.z=Math.PI/2;}
  const status=mesh(new THREE.BoxGeometry(.48,.028,.025),signal,assembly,0,.5,1.332);
  const floor=mesh(new THREE.PlaneGeometry(200,200),new THREE.ShadowMaterial({color:0x02040c,opacity:.36}),scene,0,-.008);floor.rotation.x=-Math.PI/2;floor.castShadow=false;
  // Broad studio sources keep bevels legible and glass edges quiet.
  scene.add(new THREE.HemisphereLight(0xe6edff,0x1a2347,1.4));
  const key=new THREE.DirectionalLight(0xfff1de,5);key.position.set(-3,6,4);key.castShadow=true;key.shadow.mapSize.set(mobile?512:1024,mobile?512:1024);key.shadow.camera.left=-4;key.shadow.camera.right=4;key.shadow.camera.top=4;key.shadow.camera.bottom=-4;key.shadow.normalBias=.025;key.shadow.bias=-.0002;scene.add(key);
  const rim=new THREE.DirectionalLight(0x819dff,3.5);rim.position.set(3,2,-3);scene.add(rim);
  const fill=new THREE.DirectionalLight(0xffffff,1.2);fill.position.set(0,4,-2);scene.add(fill);
  let lastP=0,lastPointer={x:0,y:0};
  function render(p,pointer={x:0,y:0}) {
    lastP=p;lastPointer=pointer;
    const open=THREE.MathUtils.smoothstep(p,.12,.72);
    lid.rotation.x=-open*1.42;
    const rotate=THREE.MathUtils.smoothstep(p,.18,1);
    assembly.rotation.y=-.25+rotate*.38+pointer.x*.055;
    const angle=.75-rotate*.35;
    camera.position.set(Math.sin(angle)*6.8,5.1-rotate*.65+pointer.y*.12,Math.cos(angle)*6.8);
    camera.lookAt(0,.8+open*.2,0);
    signal.emissiveIntensity=.2+THREE.MathUtils.smoothstep(p,.35,.85)*1.3;
    dataPoints.forEach((dot,i)=>dot.position.copy(route.getPoint((p*1.8+i*.25)%1)));
    renderer.render(scene,camera);
    canvas.dataset.scene='ready';canvas.dataset.phase=p.toFixed(3);
  }
  function resize(){const r=canvas.getBoundingClientRect();renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.zoom=Math.min(.88,camera.aspect*.95);camera.updateProjectionMatrix();render(lastP,lastPointer);}
  resize();
  return {render,resize,dispose(){renderer.dispose();environment.dispose();scene.traverse(o=>{o.geometry?.dispose();});},renderer};
}
