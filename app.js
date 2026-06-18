/* ══════════════════════════════════════
   GENERADOR DE TARJETAS — app.js v3.0
══════════════════════════════════════ */

/* ── DATOS ── */
let MSGS = [
  "EN QUE SI DEJAMOS A DIOS ENTRAR EN MEDIO DE TODO ESTO, NADA NI NADIE PODRÁ SEPARARNOS.",
  "TE VOY A SER SINCERO, NO QUIERO DEJARTE IR, NO QUIERO DARME LA VUELTA Y FINGIR QUE NO ME DUELE",
  "LO QUE QUIERO ES TODO LO CONTRARIO, BUSCARTE Y ABRAZARTE FUERTE",
  "Y MIRARTE A LOS OJOS Y DECIRTE CUÁNTO TE AMO, POR QUÉ LA VERDAD ES ESA.",
  "YO QUIERO LUCHAR POR LO NUESTRO, QUIERO INTENTAR UNA Y UNA VEZ MÁS",
  "PORQUE EL AMOR VERDADERO NO SE RINDE, SE LEVANTA, NO HUYE, LUCHA. Y YO ELIJO LUCHAR POR TÍ"
];

const MARCOS = [
  {c:'#111111',n:'Negro'},{c:'#ffffff',n:'Blanco'},{c:'#1e3a5f',n:'Azul marino'},
  {c:'#6b2d52',n:'Ciruela'},{c:'#c0304a',n:'Rojo'},{c:'#1a3a1a',n:'Verde bosque'},
  {c:'#8b6914',n:'Dorado'},{c:'#2d2d4a',n:'Índigo'},{c:'#5c2d0a',n:'Terracota'},
  {c:'#3a0a0a',n:'Vino'},{c:'#d4a373',n:'Beige'},{c:'#7b2c3f',n:'Borgoña'},
  {c:'#2a5f5f',n:'Teal'},{c:'#9c6e4d',n:'Café'},{c:'#4a6b5d',n:'Verde salvia'},
  {c:'#b76e79',n:'Rosa viejo'},{c:'#6c4f3c',n:'Marrón'},{c:'#3a6b4b',n:'Esmeralda'},
  {c:'#8b3a3a',n:'Ladrillo'},{c:'#2c4c6b',n:'Acero'},
  {c:'#e91e8c',n:'Fucsia'},{c:'#ff6b35',n:'Naranja'},{c:'#7c3aed',n:'Violeta'},
  {c:'#0ea5e9',n:'Celeste'},{c:'#10b981',n:'Jade'},{c:'#f59e0b',n:'Ámbar'},
  {c:'#ec4899',n:'Rosa hot'},{c:'#14b8a6',n:'Turquesa'},{c:'#6366f1',n:'Índigo vivo'},
  {c:'#84cc16',n:'Lima'}
];
const FONDOS = [
  {c:'#ffffff',n:'Blanco'},{c:'#111111',n:'Negro'},{c:'#f5e6c8',n:'Crema'},
  {c:'#fde8ec',n:'Rosa'},{c:'#dce8f5',n:'Celeste'},{c:'#d4ecd4',n:'Menta'},
  {c:'#fef4d0',n:'Amarillo'},{c:'#f0e0f0',n:'Lila'},{c:'#e8e0d4',n:'Arena'},
  {c:'#dcdcf5',n:'Lavanda'},{c:'#fff0f5',n:'Rosa pálido'},{c:'#f0fff4',n:'Verde agua'},
  {c:'#fffbeb',n:'Mantequilla'},{c:'#fdf2f8',n:'Malva'},{c:'#ecfdf5',n:'Menta clara'},
  {c:'#eff6ff',n:'Azul hielo'},{c:'#fef9c3',n:'Vainilla'},{c:'#fce7f3',n:'Chicle'},
  {c:'#f1f5f9',n:'Gris perla'},{c:'#1e1b2e',n:'Noche'}
];
const TEXTOS = [
  {c:'#111111',n:'Negro'},{c:'#ffffff',n:'Blanco'},{c:'#1e3a5f',n:'Azul'},
  {c:'#c0304a',n:'Rojo'},{c:'#8b6914',n:'Dorado'},{c:'#6b2d52',n:'Ciruela'},
  {c:'#c8922a',n:'Ámbar'},{c:'#f5e6c8',n:'Crema'},
  {c:'#e91e8c',n:'Fucsia'},{c:'#7c3aed',n:'Violeta'},{c:'#10b981',n:'Jade'},
  {c:'#0ea5e9',n:'Celeste'}
];

const PATRONES = [
  {id:'none',n:'Ninguno'},
  {id:'dots',n:'Lunares'},
  {id:'stripes',n:'Rayas'},
  {id:'diagonal',n:'Diagonal'},
  {id:'grid',n:'Cuadrícula'},
  {id:'hearts',n:'Corazones'},
  {id:'grad-pink',n:'Degradado rosa'},
  {id:'grad-blue',n:'Degradado azul'},
  {id:'grad-gold',n:'Degradado dorado'},
  {id:'grad-purple',n:'Degradado lila'},
];

const MARCOS_DECO = [
  {id:'none',n:'Sin decoración'},
  {id:'hearts',n:'❤ Corazones'},
  {id:'stars',n:'★ Estrellas'},
  {id:'flowers',n:'✿ Flores'},
  {id:'dots-deco',n:'• Puntos'},
];

const STICKERS = ['❤️','💕','✨','🌸','⭐','🎀','💫','🌹','💝','🦋','🌺','💐','🎊','🎉','💖','🌙','🔥','💎','🌈','🎵'];

/* ── ESTADO ── */
let imgSrc = null, layout = 'top', selMsg = 0;
let marco = MARCOS[0], fondo = FONDOS[0], texto = TEXTOS[0];
let fontFam = 'Montserrat', fontGen = 'sans-serif', fontWt = 900;
let textAlign = 'center';
let marcoSize = 16, fotoSize = 50, fontSize = 50;
let subtitulo = '';
let patron = 'none';
let marcoDeco = 'none';
let darkMode = false;
let editIdx = -1;
let cardHistory = JSON.parse(localStorage.getItem('cardHistory')||'[]');
let placedStickers = []; // [{emoji, x, y, id}]
let cardWidth = 460;      // ancho tarjeta
let photoFit = 'cover';   // 'cover' o 'contain'
let photoZoom = 100;      // zoom % de la foto (100 = normal)
let photoX = 50;          // posición horizontal % (50 = centro)
let photoY = 50;          // posición vertical % (50 = centro)
let dragSticker = null;

/* ── MENSAJES ── */
function buildMsgList() {
  const el = document.getElementById('msgList'); el.innerHTML='';
  MSGS.forEach((m,i)=>{
    const d=document.createElement('div');
    d.className='msg-item'+(i===selMsg?' active':'');
    d.innerHTML=`<span class="mi-sel">${i===selMsg?'✓':''}</span><span class="mi-text">${m.length>60?m.slice(0,57)+'…':m}</span><span class="mi-edit" onclick="startEdit(event,${i})">✏️</span><span class="mi-del" onclick="delMsg(event,${i})">🗑</span>`;
    d.onclick=(e)=>{ if(e.target.classList.contains('mi-edit')||e.target.classList.contains('mi-del')) return; selMsg=i; buildMsgList(); render(); };
    el.appendChild(d);
  });
}
function startAdd(){ editIdx=-1; document.getElementById('msgTA').value=''; document.getElementById('msgEditor').classList.add('open'); document.getElementById('msgTA').focus(); }
function startEdit(e,i){ e.stopPropagation(); editIdx=i; document.getElementById('msgTA').value=MSGS[i]; document.getElementById('msgEditor').classList.add('open'); document.getElementById('msgTA').focus(); }
function cancelEdit(){ document.getElementById('msgEditor').classList.remove('open'); editIdx=-1; }
function saveEdit(){
  const v=document.getElementById('msgTA').value.trim().toUpperCase(); if(!v) return;
  if(editIdx===-1){MSGS.push(v);selMsg=MSGS.length-1;}else{MSGS[editIdx]=v;}
  document.getElementById('msgEditor').classList.remove('open'); editIdx=-1; buildMsgList(); render();
}
function delMsg(e,i){ e.stopPropagation(); if(MSGS.length<=1) return; MSGS.splice(i,1); if(selMsg>=MSGS.length) selMsg=MSGS.length-1; buildMsgList(); render(); }

/* ── PALETAS ── */
function isLight(h){ if(!h) return true; const r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16); return (r*299+g*587+b*114)/1000>140; }

function buildPal(id,items,getActive,onSel,colClass='pal5'){
  const el=document.getElementById(id); el.innerHTML=''; el.className=colClass;
  items.forEach(p=>{
    const s=document.createElement('div');
    s.className='sw'+(p===getActive()?' sel':'');
    s.style.background=p.c; s.style.color=isLight(p.c)?'#222':'#fff';
    if(p.c==='#ffffff') s.style.border='1.5px solid #ccc';
    s.title=p.n; if(p===getActive()) s.textContent='✓';
    s.onclick=()=>{ document.querySelectorAll('#'+id+' .sw').forEach(x=>{x.classList.remove('sel');x.textContent='';if(x.style.backgroundColor==='rgb(255, 255, 255)')x.style.border='1.5px solid #ccc';}); s.classList.add('sel'); s.textContent='✓'; onSel(p); render(); };
    el.appendChild(s);
  });
}
function buildTxtPal(){
  const el=document.getElementById('palTexto'); el.innerHTML='';
  TEXTOS.forEach(p=>{ const ch=document.createElement('div'); ch.className='tcc'+(p===texto?' sel':''); ch.innerHTML=`<span class="tcd" style="background:${p.c};"></span>${p.n}`; ch.onclick=()=>{ document.querySelectorAll('#palTexto .tcc').forEach(x=>x.classList.remove('sel')); ch.classList.add('sel'); texto=p; render(); }; el.appendChild(ch); });
}
function initAlignToggle(){
  document.querySelectorAll('.align-opt').forEach(opt=>{ opt.onclick=()=>{ document.querySelectorAll('.align-opt').forEach(o=>o.classList.remove('sel','active')); opt.classList.add('sel','active'); textAlign=opt.getAttribute('data-align'); render(); }; });
}

/* ── PATRONES ── */
function buildPatrones(){
  const el=document.getElementById('patronRow'); el.innerHTML='';
  PATRONES.forEach(p=>{
    const b=document.createElement('div'); b.className='pat-opt'+(patron===p.id?' active':''); b.textContent=p.n; b.title=p.n;
    b.onclick=()=>{ document.querySelectorAll('.pat-opt').forEach(x=>x.classList.remove('active')); b.classList.add('active'); patron=p.id; render(); };
    el.appendChild(b);
  });
}

function getPatternCSS(id, bg){
  const c = marco.c;
  const light = isLight(bg);
  const lineC = light ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)';
  switch(id){
    case 'dots': return `radial-gradient(${lineC} 1.5px, transparent 1.5px) 0 0 / 18px 18px`;
    case 'stripes': return `repeating-linear-gradient(0deg, ${lineC} 0px, ${lineC} 1px, transparent 1px, transparent 16px)`;
    case 'diagonal': return `repeating-linear-gradient(45deg, ${lineC} 0px, ${lineC} 1px, transparent 1px, transparent 14px)`;
    case 'grid': return `linear-gradient(${lineC} 1px, transparent 1px) 0 0 / 18px 18px, linear-gradient(90deg, ${lineC} 1px, transparent 1px) 0 0 / 18px 18px`;
    case 'hearts': return null; // SVG inline
    case 'grad-pink': return `linear-gradient(135deg, #fde8ec 0%, #f0e0f0 100%)`;
    case 'grad-blue': return `linear-gradient(135deg, #dce8f5 0%, #dcdcf5 100%)`;
    case 'grad-gold': return `linear-gradient(135deg, #fef4d0 0%, #f5e6c8 100%)`;
    case 'grad-purple': return `linear-gradient(135deg, #f0e0f0 0%, #dcdcf5 100%)`;
    default: return null;
  }
}

/* ── MARCOS DECO ── */
function buildMarcosDeco(){
  const el=document.getElementById('marcoDecoRow'); el.innerHTML='';
  MARCOS_DECO.forEach(p=>{
    const b=document.createElement('div'); b.className='pat-opt'+(marcoDeco===p.id?' active':''); b.textContent=p.n;
    b.onclick=()=>{ document.querySelectorAll('#marcoDecoRow .pat-opt').forEach(x=>x.classList.remove('active')); b.classList.add('active'); marcoDeco=p.id; render(); };
    el.appendChild(b);
  });
}

function getDecoOverlay(id, w, h, color){
  // Esta función ya no se usa — la decoración se aplica via applyDecoToMarco()
  return '';
}

function applyDecoToMarco(){
  const cardOuter = document.querySelector('#cardWrap .card-outer');
  if(!cardOuter) return;
  const prev = cardOuter.querySelector('.marco-deco');
  if(prev) prev.remove();
  if(marcoDeco === 'none') return;

  const emojis = {hearts:'❤',stars:'★',flowers:'✿','dots-deco':'•'};
  const em = emojis[marcoDeco] || '';
  const sz = Math.max(10, Math.min(marcoSize - 2, 22));
  const step = sz + 6;

  // Usar offsetWidth/offsetHeight — no se ven afectados por transform:scale del preview
  const W = cardOuter.offsetWidth;
  const H = cardOuter.offsetHeight;

  const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('class','marco-deco');
  svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
  svg.style.cssText=`position:absolute;top:0;left:0;width:${W}px;height:${H}px;pointer-events:none;z-index:10;overflow:hidden;`;

  const light = isLight(marco.c);
  const symColor = light ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.9)';

  function addSym(x, y){
    const t = document.createElementNS('http://www.w3.org/2000/svg','text');
    t.setAttribute('x', x);
    t.setAttribute('y', y);
    t.setAttribute('text-anchor','middle');
    t.setAttribute('dominant-baseline','central');
    t.setAttribute('font-size', sz);
    t.setAttribute('fill', symColor);
    t.textContent = em;
    svg.appendChild(t);
  }

  const m = marcoSize / 2;
  for(let x = step; x < W - step/2; x += step) addSym(x, m);
  for(let x = step; x < W - step/2; x += step) addSym(x, H - m);
  for(let y = step; y < H - step/2; y += step) addSym(m, y);
  for(let y = step; y < H - step/2; y += step) addSym(W - m, y);

  cardOuter.style.position = 'relative';
  cardOuter.appendChild(svg);
}

/* ── STICKERS ── */
function buildStickers(){
  const el=document.getElementById('stickerRow'); el.innerHTML='';
  STICKERS.forEach(em=>{
    const b=document.createElement('div'); b.className='sticker-btn'; b.textContent=em;
    b.onclick=()=>addSticker(em);
    el.appendChild(b);
  });
}

function addSticker(em){
  const id=Date.now();
  placedStickers.push({emoji:em, x:180, y:80, id});
  renderStickersUI();
}

function renderStickersUI(){
  const wrap=document.getElementById('cardWrap');
  // Remove old sticker layer
  const old=wrap.querySelector('.sticker-layer');
  if(old) old.remove();
  if(!placedStickers.length) return;

  const layer=document.createElement('div');
  layer.className='sticker-layer';
  layer.style.cssText='position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:20;';

  placedStickers.forEach(sk=>{
    const s=document.createElement('div');
    s.className='placed-sticker';
    s.textContent=sk.emoji;
    s.style.cssText=`position:absolute;left:${sk.x}px;top:${sk.y}px;font-size:28px;cursor:move;user-select:none;pointer-events:all;transform:translate(-50%,-50%);`;
    s.title='Arrastrar · Doble clic para borrar';

    // Drag
    let dragging=false, ox=0, oy=0;
    s.addEventListener('mousedown',e=>{ dragging=true; const r=wrap.getBoundingClientRect(); ox=e.clientX-r.left-sk.x; oy=e.clientY-r.top-sk.y; e.preventDefault(); });
    s.addEventListener('touchstart',e=>{ dragging=true; const r=wrap.getBoundingClientRect(); const t=e.touches[0]; ox=t.clientX-r.left-sk.x; oy=t.clientY-r.top-sk.y; e.preventDefault(); },{passive:false});
    document.addEventListener('mousemove',e=>{ if(!dragging) return; const r=wrap.getBoundingClientRect(); sk.x=e.clientX-r.left-ox; sk.y=e.clientY-r.top-oy; s.style.left=sk.x+'px'; s.style.top=sk.y+'px'; });
    document.addEventListener('touchmove',e=>{ if(!dragging) return; const r=wrap.getBoundingClientRect(); const t=e.touches[0]; sk.x=t.clientX-r.left-ox; sk.y=t.clientY-r.top-oy; s.style.left=sk.x+'px'; s.style.top=sk.y+'px'; },{passive:false});
    document.addEventListener('mouseup',()=>{ dragging=false; });
    document.addEventListener('touchend',()=>{ dragging=false; });
    s.addEventListener('dblclick',()=>{ placedStickers=placedStickers.filter(x=>x.id!==sk.id); renderStickersUI(); });

    layer.appendChild(s);
  });

  const cardOuter=wrap.querySelector('.card-outer');
  if(cardOuter){ cardOuter.style.position='relative'; cardOuter.appendChild(layer); }
}

function clearStickers(){ placedStickers=[]; renderStickersUI(); }

/* ── SLIDERS ── */
function initSliders(){
  document.getElementById('marcoSizeSlider').addEventListener('input',e=>{ marcoSize=parseInt(e.target.value); document.getElementById('marcoSizeValue').textContent=marcoSize+'px'; render(); });
  document.getElementById('fotoSizeSlider').addEventListener('input',e=>{ fotoSize=parseInt(e.target.value); const labels=['Muy pequeña','Pequeña','Med-pequeña','Mediana','Med-grande','Grande','Muy grande','Extra grande','Máxima']; document.getElementById('fotoSizeValue').textContent=labels[Math.min(Math.floor(fotoSize/12.5),8)]; render(); });
  document.getElementById('fontSizeSlider').addEventListener('input',e=>{ fontSize=parseInt(e.target.value); document.getElementById('fontSizeValue').textContent=fontSize+'%'; render(); });
  document.getElementById('subtituloInput').addEventListener('input',e=>{ subtitulo=e.target.value.toUpperCase(); render(); });

  // Tamaño tarjeta
  document.getElementById('cardWidthSlider').addEventListener('input',e=>{
    cardWidth=parseInt(e.target.value);
    document.getElementById('cardWidthValue').textContent=cardWidth+'px';
    render();
  });

  // Controles foto
  document.getElementById('photoFitBtn').addEventListener('click',()=>{
    photoFit = photoFit==='cover' ? 'contain' : 'cover';
    document.getElementById('photoFitBtn').textContent = photoFit==='cover' ? '✂️ Recortar (cover)' : '🖼 Completa (contain)';
    render();
  });
  document.getElementById('photoZoomSlider').addEventListener('input',e=>{
    photoZoom=parseInt(e.target.value);
    document.getElementById('photoZoomValue').textContent=photoZoom+'%';
    render();
  });
  document.getElementById('photoXSlider').addEventListener('input',e=>{
    photoX=parseInt(e.target.value);
    render();
  });
  document.getElementById('photoYSlider').addEventListener('input',e=>{
    photoY=parseInt(e.target.value);
    render();
  });
}

/* ── FUENTE / LAYOUT ── */
function setFont(el,fam,gen,wt){ document.querySelectorAll('.fo').forEach(x=>x.classList.remove('active')); el.classList.add('active'); fontFam=fam; fontGen=gen; fontWt=wt; render(); }
function setLayout(el,l){ document.querySelectorAll('.lo').forEach(x=>x.classList.remove('active')); el.classList.add('active'); layout=l; render(); }

/* ── UPLOAD ── */
function onUpzClick(e){ if(e.target.classList.contains('upz-chg')) return; document.getElementById('fi').click(); }
function resetImg(e){ e.stopPropagation(); imgSrc=null; const z=document.getElementById('upz'); z.classList.remove('has'); z.innerHTML=`<div class="upz-ico">🖼️</div><div class="upz-lbl"><strong>Clic para subir</strong><br>JPG · PNG · WEBP</div><div class="upz-chg" onclick="resetImg(event)">✕ Cambiar</div>`; document.getElementById('fi').value=''; render(); }
document.getElementById('fi').addEventListener('change',e=>{ const f=e.target.files[0]; if(!f) return; const r=new FileReader(); r.onload=ev=>{ imgSrc=ev.target.result; const z=document.getElementById('upz'); z.classList.add('has'); z.innerHTML=`<img src="${imgSrc}" alt=""><div class="upz-chg" onclick="resetImg(event)">✕ Cambiar</div>`; render(); }; r.readAsDataURL(f); });

/* ── MODO OSCURO ── */
function toggleDark(){
  darkMode=!darkMode;
  document.body.classList.toggle('dark', darkMode);
  document.getElementById('darkBtn').textContent=darkMode?'☀️ Modo claro':'🌙 Modo oscuro';
}

/* ── HISTORIAL ── */
function saveToHistory(){
  const snap={ msg:MSGS[selMsg], subtitulo, marco:marco.c, fondo:fondo.c, texto:texto.c, fontFam, layout, marcoSize, fotoSize, fontSize, patron, marcoDeco, ts:Date.now() };
  cardHistory.unshift(snap);
  if(cardHistory.length>12) cardHistory=cardHistory.slice(0,12);
  localStorage.setItem('cardHistory',JSON.stringify(cardHistory));
  buildHistory();
  showToast('💾 Tarjeta guardada en historial');
}
function buildHistory(){
  const el=document.getElementById('historyList'); if(!el) return;
  el.innerHTML='';
  if(!cardHistory.length){ el.innerHTML='<div style="font-size:10px;color:#aaa;padding:6px;">Sin tarjetas guardadas</div>'; return; }
  cardHistory.forEach((s,i)=>{
    const d=document.createElement('div'); d.className='hist-item';
    const date=new Date(s.ts).toLocaleTimeString('es',{hour:'2-digit',minute:'2-digit'});
    d.innerHTML=`<span class="hist-swatch" style="background:${s.marco};border:2px solid ${s.fondo};"></span><span class="hist-text">${s.msg.slice(0,30)}…</span><span class="hist-time">${date}</span><span class="hist-del" onclick="delHistory(event,${i})">✕</span>`;
    d.onclick=(e)=>{ if(e.target.classList.contains('hist-del')) return; loadSnap(s); };
    el.appendChild(d);
  });
}
function delHistory(e,i){ e.stopPropagation(); cardHistory.splice(i,1); localStorage.setItem('cardHistory',JSON.stringify(cardHistory)); buildHistory(); }
function loadSnap(s){
  // Restaurar estado
  marco=MARCOS.find(x=>x.c===s.marco)||MARCOS[0];
  fondo=FONDOS.find(x=>x.c===s.fondo)||FONDOS[0];
  texto=TEXTOS.find(x=>x.c===s.texto)||TEXTOS[0];
  fontFam=s.fontFam; marcoSize=s.marcoSize; fotoSize=s.fotoSize; fontSize=s.fontSize;
  patron=s.patron||'none'; marcoDeco=s.marcoDeco||'none'; subtitulo=s.subtitulo||'';
  layout=s.layout;
  document.getElementById('subtituloInput').value=subtitulo;
  document.getElementById('marcoSizeSlider').value=marcoSize;
  document.getElementById('marcoSizeValue').textContent=marcoSize+'px';
  document.getElementById('fotoSizeSlider').value=fotoSize;
  document.getElementById('fontSizeSlider').value=fontSize;
  document.getElementById('fontSizeValue').textContent=fontSize+'%';
  buildPal('palMarco',MARCOS,()=>marco,p=>{marco=p;},'pal20');
  buildPal('palFondo',FONDOS,()=>fondo,p=>{fondo=p;},'pal20');
  buildTxtPal(); buildPatrones(); buildMarcosDeco();
  render();
  showToast('📂 Tarjeta restaurada');
}

/* ── TOAST ── */
function showToast(msg){ const t=document.getElementById('toast'); t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2500); }

/* ── WHATSAPP ── */
function shareWhatsApp(){
  const cardElement=document.querySelector('#cardWrap .card-outer');
  if(!cardElement||typeof html2canvas==='undefined') return;
  showToast('📸 Preparando imagen…');
  html2canvas(cardElement,{scale:2,useCORS:true,allowTaint:true,backgroundColor:null,logging:false}).then(c=>{
    c.toBlob(blob=>{
      if(navigator.share && navigator.canShare && navigator.canShare({files:[new File([blob],'tarjeta.png',{type:'image/png'})]})){
        navigator.share({ files:[new File([blob],'tarjeta.png',{type:'image/png'})], title:'Mi tarjeta', text:'Mira esta tarjeta que hice ❤️' }).catch(()=>{});
      } else {
        // Fallback: abrir WhatsApp web
        const url=encodeURIComponent('Mira esta tarjeta que hice con el Generador de Tarjetas ❤️');
        window.open(`https://wa.me/?text=${url}`,'_blank');
        showToast('💡 Descarga la imagen y adjúntala en WhatsApp');
      }
    },'image/png');
  });
}

/* ── RENDER ── */
function render(){
  const W=cardWidth;
  const isLR=layout==='left'||layout==='right';
  const fotoFactor=fotoSize/100;
  const photoPadding=Math.floor(6+(1-fotoFactor)*34);
  const photoHeight=Math.floor(100+fotoFactor*120);
  const photoWidthPx=Math.floor(W*(0.30+fotoFactor*0.25));
  const photoPaddingLR=Math.floor(8+(1-fotoFactor)*25);
  const textPadding=Math.floor(16+(1-fotoFactor)*12);
  const fontScale=0.6+(fontSize/100)*1.0;
  const baseSz=isLR?13:14.5;
  const tsz=(baseSz*fontScale).toFixed(1);
  const subSz=((baseSz*fontScale)*0.68).toFixed(1);
  const tc=texto.c;
  const msg=MSGS[selMsg]||'';
  const ta=textAlign==='left'?'left':'center';
  const fstyle=`font-family:'${fontFam}',${fontGen};font-size:${tsz}px;color:${tc};font-weight:${fontWt};line-height:1.45;letter-spacing:0;text-transform:uppercase;text-align:${ta};word-break:break-word;white-space:normal;overflow-wrap:break-word;display:block;width:100%;box-sizing:border-box;`;
  const sstyle=`font-family:'${fontFam}',${fontGen};font-size:${subSz}px;color:${tc};font-weight:${fontWt>=700?400:fontWt};line-height:1.4;letter-spacing:0;text-transform:uppercase;text-align:${ta};opacity:.75;margin-top:8px;word-break:break-word;white-space:normal;overflow-wrap:break-word;display:block;width:100%;box-sizing:border-box;`;
  const subBlock=subtitulo?`<div style="${sstyle}">${subtitulo}</div>`:'';

  // Foto compatible con html2canvas (sin object-fit ni transform)
  let photoInner='';
  if(imgSrc){
    const zs=photoZoom/100;
    const ml=(photoX-50)*0.5;
    const mt=(photoY-50)*0.5;
    photoInner=`<div style="width:100%;height:100%;overflow:hidden;position:relative;"><img src="${imgSrc}" alt="" style="position:absolute;width:${100*zs}%;height:${100*zs}%;left:${photoX*(1-zs)}%;top:${photoY*(1-zs)}%;"></div>`;
  } else {
    photoInner=`<div style="width:100%;height:100%;background:#e8e0d4;text-align:center;padding-top:30px;font-size:32px;color:#aaa;">&#9633;</div>`;
  }

  // Fondo / patron
  let bgStyle=`background:${fondo.c};`;
  const patCSS=getPatternCSS(patron,fondo.c);
  if(patCSS&&patron.startsWith('grad-')){bgStyle=`background:${patCSS};`;}
  else if(patCSS){bgStyle=`background-color:${fondo.c};background-image:${patCSS};`;}

  let innerHTML='';
  if(!isLR){
    const photoBlock=`<div style="padding:${photoPadding}px;box-sizing:border-box;width:${W}px;${bgStyle}"><div style="width:100%;height:${photoHeight}px;border-radius:6px;overflow:hidden;background:#e8e0d4;">${photoInner}</div></div>`;
    const textBlock=`<div style="${bgStyle}padding:${textPadding}px 20px;box-sizing:border-box;width:${W}px;"><div style="${fstyle}">${msg}</div>${subBlock}</div>`;
    innerHTML=layout==='top'?textBlock+photoBlock:photoBlock+textBlock;
  } else {
    const textWidthPx=W-photoWidthPx;
    const photoCell=`<div style="display:table-cell;width:${photoWidthPx}px;vertical-align:middle;padding:${photoPaddingLR}px;box-sizing:border-box;"><div style="width:100%;height:${Math.floor(photoWidthPx*0.85)}px;border-radius:6px;overflow:hidden;background:#e8e0d4;">${photoInner}</div></div>`;
    const textCell=`<div style="${bgStyle}display:table-cell;width:${textWidthPx}px;vertical-align:middle;padding:${textPadding}px 16px;box-sizing:border-box;"><div style="${fstyle}">${msg}</div>${subBlock}</div>`;
    innerHTML=`<div style="display:table;width:${W}px;table-layout:fixed;${bgStyle}">${layout==='left'?photoCell+textCell:textCell+photoCell}</div>`;
  }

  document.getElementById('cardWrap').innerHTML=`
    <div class="card-outer" style="position:relative;border-color:${marco.c};border-width:${marcoSize}px;border-style:solid;display:inline-block;">
      <div style="width:${W}px;overflow:hidden;${bgStyle}">${innerHTML}</div>
    </div>`;

  renderStickersUI();
  // Aplicar decoración sobre el marco (necesita que el DOM esté listo)
  setTimeout(applyDecoToMarco, 10);
}

/* ── DOWNLOAD ── */
function download(){
  const cardElement=document.querySelector('#cardWrap .card-outer');
  if(!cardElement||typeof html2canvas==='undefined') return;
  const btn=document.querySelector('.btn-dl');
  btn.textContent='⏳ Exportando…'; btn.disabled=true;

  html2canvas(cardElement,{scale:3,useCORS:true,allowTaint:true,backgroundColor:null,logging:false}).then(canvas=>{
    canvas.toBlob(async blob=>{
      const file = new File([blob], 'tarjeta-blue-princess.png', {type:'image/png'});

      // Móvil: intentar compartir/guardar en galería con Web Share API
      if(navigator.share && navigator.canShare && navigator.canShare({files:[file]})){
        try{
          await navigator.share({
            files:[file],
            title:'Mi tarjeta',
            text:'Tarjeta creada con Generador de Tarjetas ❤️'
          });
          showToast('✅ Imagen guardada / compartida');
        } catch(e){
          // Usuario canceló el share — igual ofrecer descarga normal
          if(e.name !== 'AbortError') fallbackDownload(canvas);
        }
      } else {
        // Desktop o navegador sin soporte: descarga directa
        fallbackDownload(canvas);
      }
      btn.textContent='⬇ Descargar PNG'; btn.disabled=false;
    }, 'image/png');
  }).catch(()=>{ btn.textContent='⬇ Descargar PNG'; btn.disabled=false; });
}

function fallbackDownload(canvas){
  const a=document.createElement('a');
  a.download='tarjeta-blue-princess.png';
  a.href=canvas.toDataURL('image/png');
  a.click();
  showToast('📥 Imagen descargada');
}


/* ── ACORDEÓN ── */
function toggleAcc(btn){
  const body = btn.nextElementSibling;
  const isOpen = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  btn.classList.toggle('active', !isOpen);
}

/* ── INIT ── */
buildMsgList();
buildPal('palMarco',MARCOS,()=>marco,p=>{marco=p;},'pal20');
buildPal('palFondo',FONDOS,()=>fondo,p=>{fondo=p;},'pal20');
buildTxtPal();
initAlignToggle();
buildPatrones();
buildMarcosDeco();
buildStickers();
buildHistory();
initSliders();
render();

/* ── TABS ── */
function switchTab(btn, tabId) {
  // Deactivate all tabs and panels
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  // Activate selected
  btn.classList.add('active');
  const panel = document.getElementById('panel-' + tabId);
  if (panel) {
    panel.classList.add('active');
    // Scroll panel to top on tab switch
    document.querySelector('.tab-panels').scrollTop = 0;
  }
}
