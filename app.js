/* ── MENSAJES ── */
let MSGS = [
  "EN QUE SI DEJAMOS A DIOS ENTRAR EN MEDIO DE TODO ESTO, NADA NI NADIE PODRÁ SEPARARNOS.",
  "TE VOY A SER SINCERO, NO QUIERO DEJARTE IR, NO QUIERO DARME LA VUELTA Y FINGIR QUE NO ME DUELE",
  "LO QUE QUIERO ES TODO LO CONTRARIO, BUSCARTE Y ABRAZARTE FUERTE",
  "Y MIRARTE A LOS OJOS Y DECIRTE CUÁNTO TE AMO, POR QUÉ LA VERDAD ES ESA.",
  "YO QUIERO LUCHAR POR LO NUESTRO, QUIERO INTENTAR UNA Y UNA VEZ MÁS",
  "PORQUE EL AMOR VERDADERO NO SE RINDE, SE LEVANTA, NO HUYE, LUCHA. Y YO ELIJO LUCHAR POR TÍ"
];

/* 20 COLORES MARCO */
const MARCOS = [
  {c:'#111111',n:'Negro'},{c:'#ffffff',n:'Blanco'},{c:'#1e3a5f',n:'Azul marino'},
  {c:'#6b2d52',n:'Ciruela'},{c:'#c0304a',n:'Rojo'},{c:'#1a3a1a',n:'Verde bosque'},
  {c:'#8b6914',n:'Dorado'},{c:'#2d2d4a',n:'Índigo'},{c:'#5c2d0a',n:'Terracota'},
  {c:'#3a0a0a',n:'Vino'},{c:'#d4a373',n:'Beige'},{c:'#7b2c3f',n:'Borgoña'},
  {c:'#2a5f5f',n:'Teal'},{c:'#9c6e4d',n:'Café'},{c:'#4a6b5d',n:'Verde salvia'},
  {c:'#b76e79',n:'Rosa viejo'},{c:'#6c4f3c',n:'Marrón'},{c:'#3a6b4b',n:'Esmeralda'},
  {c:'#8b3a3a',n:'Ladrillo'},{c:'#2c4c6b',n:'Acero'},
  /* 10 nuevos */
  {c:'#e91e8c',n:'Fucsia'},{c:'#ff6b35',n:'Naranja'},{c:'#7c3aed',n:'Violeta'},
  {c:'#0ea5e9',n:'Celeste'},{c:'#10b981',n:'Jade'},{c:'#f59e0b',n:'Ámbar'},
  {c:'#ec4899',n:'Rosa hot'},{c:'#14b8a6',n:'Turquesa'},{c:'#6366f1',n:'Índigo vivo'},
  {c:'#84cc16',n:'Lima'}
];

/* 20 COLORES FONDO */
const FONDOS = [
  {c:'#ffffff',n:'Blanco'},{c:'#111111',n:'Negro'},{c:'#f5e6c8',n:'Crema'},
  {c:'#fde8ec',n:'Rosa'},{c:'#dce8f5',n:'Celeste'},{c:'#d4ecd4',n:'Menta'},
  {c:'#fef4d0',n:'Amarillo'},{c:'#f0e0f0',n:'Lila'},{c:'#e8e0d4',n:'Arena'},
  {c:'#dcdcf5',n:'Lavanda'},
  /* 10 nuevos */
  {c:'#fff0f5',n:'Rosa pálido'},{c:'#f0fff4',n:'Verde agua'},{c:'#fffbeb',n:'Mantequilla'},
  {c:'#fdf2f8',n:'Malva'},{c:'#ecfdf5',n:'Menta clara'},{c:'#eff6ff',n:'Azul hielo'},
  {c:'#fef9c3',n:'Vainilla'},{c:'#fce7f3',n:'Chicle'},{c:'#f1f5f9',n:'Gris perla'},
  {c:'#1e1b2e',n:'Noche'}
];

/* 12 COLORES TEXTO */
const TEXTOS = [
  {c:'#111111',n:'Negro'},{c:'#ffffff',n:'Blanco'},{c:'#1e3a5f',n:'Azul'},
  {c:'#c0304a',n:'Rojo'},{c:'#8b6914',n:'Dorado'},{c:'#6b2d52',n:'Ciruela'},
  {c:'#c8922a',n:'Ámbar'},{c:'#f5e6c8',n:'Crema'},
  /* 4 nuevos */
  {c:'#e91e8c',n:'Fucsia'},{c:'#7c3aed',n:'Violeta'},{c:'#10b981',n:'Jade'},
  {c:'#0ea5e9',n:'Celeste'}
];

/* ESTADO */
let imgSrc = null, layout = 'top', selMsg = 0;
let marco = MARCOS[0], fondo = FONDOS[0], texto = TEXTOS[0];
let fontFam = 'Montserrat', fontGen = 'sans-serif', fontWt = 900;
let textAlign = 'center';
let marcoSize = 16, fotoSize = 50, fontSize = 50;
let subtitulo = '';
let editIdx = -1;

/* ── LISTA DE MENSAJES ── */
function buildMsgList() {
  const el = document.getElementById('msgList');
  el.innerHTML = '';
  MSGS.forEach((m, i) => {
    const d = document.createElement('div');
    d.className = 'msg-item' + (i === selMsg ? ' active' : '');
    d.innerHTML = `
      <span class="mi-sel">${i === selMsg ? '✓' : ''}</span>
      <span class="mi-text">${m.length > 60 ? m.slice(0,57)+'…' : m}</span>
      <span class="mi-edit" title="Editar" onclick="startEdit(event,${i})">✏️</span>
      <span class="mi-del" title="Eliminar" onclick="delMsg(event,${i})">🗑</span>`;
    d.onclick = (e) => {
      if (e.target.classList.contains('mi-edit') || e.target.classList.contains('mi-del')) return;
      selMsg = i; buildMsgList(); render();
    };
    el.appendChild(d);
  });
}
function startAdd() { editIdx=-1; document.getElementById('msgTA').value=''; document.getElementById('msgEditor').classList.add('open'); document.getElementById('msgTA').focus(); }
function startEdit(e,i) { e.stopPropagation(); editIdx=i; document.getElementById('msgTA').value=MSGS[i]; document.getElementById('msgEditor').classList.add('open'); document.getElementById('msgTA').focus(); }
function cancelEdit() { document.getElementById('msgEditor').classList.remove('open'); editIdx=-1; }
function saveEdit() {
  const v = document.getElementById('msgTA').value.trim().toUpperCase();
  if (!v) return;
  if (editIdx===-1) { MSGS.push(v); selMsg=MSGS.length-1; }
  else { MSGS[editIdx]=v; }
  document.getElementById('msgEditor').classList.remove('open'); editIdx=-1; buildMsgList(); render();
}
function delMsg(e,i) { e.stopPropagation(); if(MSGS.length<=1) return; MSGS.splice(i,1); if(selMsg>=MSGS.length) selMsg=MSGS.length-1; buildMsgList(); render(); }

/* ── PALETAS ── */
function isLight(h) {
  if(!h) return true;
  const r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);
  return (r*299+g*587+b*114)/1000>140;
}
function buildPal(id, items, getActive, onSel, colClass='pal5') {
  const el = document.getElementById(id);
  el.innerHTML=''; el.className=colClass;
  items.forEach(p => {
    const s = document.createElement('div');
    s.className = 'sw'+(p===getActive()?' sel':'');
    s.style.background = p.c;
    s.style.color = isLight(p.c)?'#222':'#fff';
    if(p.c==='#ffffff') s.style.border='1.5px solid #ccc';
    s.title=p.n;
    if(p===getActive()) s.textContent='✓';
    s.onclick=()=>{
      document.querySelectorAll('#'+id+' .sw').forEach(x=>{x.classList.remove('sel');x.textContent='';if(x.style.backgroundColor==='rgb(255, 255, 255)')x.style.border='1.5px solid #ccc';});
      s.classList.add('sel'); s.textContent='✓'; onSel(p); render();
    };
    el.appendChild(s);
  });
}
function buildTxtPal() {
  const el=document.getElementById('palTexto'); el.innerHTML='';
  TEXTOS.forEach(p=>{
    const ch=document.createElement('div');
    ch.className='tcc'+(p===texto?' sel':'');
    ch.innerHTML=`<span class="tcd" style="background:${p.c};"></span>${p.n}`;
    ch.onclick=()=>{ document.querySelectorAll('#palTexto .tcc').forEach(x=>x.classList.remove('sel')); ch.classList.add('sel'); texto=p; render(); };
    el.appendChild(ch);
  });
}
function initAlignToggle() {
  document.querySelectorAll('.align-opt').forEach(opt=>{
    opt.onclick=()=>{
      document.querySelectorAll('.align-opt').forEach(o=>o.classList.remove('sel','active'));
      opt.classList.add('sel','active'); textAlign=opt.getAttribute('data-align'); render();
    };
  });
}

/* ── SLIDERS ── */
function initSliders() {
  // Marco size
  document.getElementById('marcoSizeSlider').addEventListener('input', e=>{
    marcoSize=parseInt(e.target.value);
    document.getElementById('marcoSizeValue').textContent=marcoSize+'px';
    render();
  });
  // Foto size
  document.getElementById('fotoSizeSlider').addEventListener('input', e=>{
    fotoSize=parseInt(e.target.value);
    const labels=['Muy pequeña','Pequeña','Med-pequeña','Mediana','Med-grande','Grande','Muy grande','Extra grande','Máxima'];
    document.getElementById('fotoSizeValue').textContent=labels[Math.min(Math.floor(fotoSize/12.5),8)];
    render();
  });
  // Texto size
  document.getElementById('fontSizeSlider').addEventListener('input', e=>{
    fontSize=parseInt(e.target.value);
    document.getElementById('fontSizeValue').textContent=fontSize+'%';
    render();
  });
  // Subtítulo
  document.getElementById('subtituloInput').addEventListener('input', e=>{
    subtitulo=e.target.value.toUpperCase();
    render();
  });
}

/* ── FUENTE / LAYOUT ── */
function setFont(el,fam,gen,wt){ document.querySelectorAll('.fo').forEach(x=>x.classList.remove('active')); el.classList.add('active'); fontFam=fam; fontGen=gen; fontWt=wt; render(); }
function setLayout(el,l){ document.querySelectorAll('.lo').forEach(x=>x.classList.remove('active')); el.classList.add('active'); layout=l; render(); }

/* ── UPLOAD ── */
function onUpzClick(e){ if(e.target.classList.contains('upz-chg')) return; document.getElementById('fi').click(); }
function resetImg(e){ e.stopPropagation(); imgSrc=null; const z=document.getElementById('upz'); z.classList.remove('has'); z.innerHTML=`<div class="upz-ico">🖼️</div><div class="upz-lbl"><strong>Clic para subir</strong><br>JPG · PNG · WEBP</div><div class="upz-chg" onclick="resetImg(event)">✕ Cambiar</div>`; document.getElementById('fi').value=''; render(); }
document.getElementById('fi').addEventListener('change', e=>{
  const f=e.target.files[0]; if(!f) return;
  const r=new FileReader();
  r.onload=ev=>{ imgSrc=ev.target.result; const z=document.getElementById('upz'); z.classList.add('has'); z.innerHTML=`<img src="${imgSrc}" alt=""><div class="upz-chg" onclick="resetImg(event)">✕ Cambiar</div>`; render(); };
  r.readAsDataURL(f);
});

/* ── RENDER ── */
function render() {
  const W=460;
  const isLR=layout==='left'||layout==='right';
  const fotoFactor=fotoSize/100;
  const photoPadding=Math.floor(6+(1-fotoFactor)*34);
  const photoHeight=Math.floor(100+fotoFactor*120);
  const photoWidthPercent=30+fotoFactor*25;
  const photoPaddingLR=Math.floor(8+(1-fotoFactor)*25);
  const textPadding=Math.floor(16+(1-fotoFactor)*12);

  // Tamaño de texto: base según layout, escalado por slider (60%–160%)
  const fontScale=0.6+(fontSize/100)*1.0;
  const baseSz=isLR?13:14.5;
  const tsz=(baseSz*fontScale).toFixed(1);
  const subSz=((baseSz*fontScale)*0.68).toFixed(1);

  const tc=texto.c;
  const msg=MSGS[selMsg]||'';
  const alignClass=textAlign==='left'?(isLR?'ctxtlr-left':'ctxt-left'):(isLR?'ctxtlr':'ctxt');
  const fstyle=`font-family:'${fontFam}',${fontGen};font-size:${tsz}px;color:${tc};font-weight:${fontWt};line-height:1.45;letter-spacing:.5px;`;
  const sstyle=`font-family:'${fontFam}',${fontGen};font-size:${subSz}px;color:${tc};font-weight:${fontWt>=700?400:fontWt};line-height:1.4;letter-spacing:.8px;opacity:.75;margin-top:8px;`;

  const subBlock=subtitulo?`<div class="${alignClass}" style="${sstyle}">${subtitulo}</div>`:'';
  const photoContent=imgSrc?`<img src="${imgSrc}" alt="foto">`:`<div class="ni"></div>`;

  let innerHTML='';
  if(!isLR){
    const photoBlock=`<div class="cptb" style="padding:${photoPadding}px;"><div class="img-frame" style="height:${photoHeight}px;">${photoContent}</div></div>`;
    const textBlock=`<div class="cth" style="background:${fondo.c};padding:${textPadding}px 20px;"><div class="${alignClass}" style="${fstyle}">${msg}</div>${subBlock}</div>`;
    innerHTML=layout==='top'?textBlock+photoBlock:photoBlock+textBlock;
  } else {
    const photoBlock=`<div class="cplr" style="width:${photoWidthPercent}%;padding:${photoPaddingLR}px;"><div class="img-frame" style="aspect-ratio:1/0.9;">${photoContent}</div></div>`;
    const textBlock=`<div class="cthlr" style="background:${fondo.c};padding:${textPadding}px 16px;"><div class="${alignClass}" style="${fstyle}">${msg}</div>${subBlock}</div>`;
    innerHTML=`<div class="cbody">${layout==='left'?photoBlock+textBlock:textBlock+photoBlock}</div>`;
  }

  document.getElementById('cardWrap').innerHTML=`
    <div class="card-outer" style="border-color:${marco.c};border-width:${marcoSize}px;border-style:solid;">
      <div class="card-inner" style="background:${fondo.c};width:${W}px;">${innerHTML}</div>
    </div>`;
}

/* ── DOWNLOAD ── */
function download(){
  const cardElement=document.querySelector('#cardWrap .card-outer');
  if(!cardElement||typeof html2canvas==='undefined') return;
  const btn=document.querySelector('.btn-dl');
  btn.textContent='⏳ Exportando…'; btn.disabled=true;
  html2canvas(cardElement,{scale:3,useCORS:true,allowTaint:true,backgroundColor:null,logging:false}).then(c=>{
    const a=document.createElement('a'); a.download='tarjeta-blue-princess.png'; a.href=c.toDataURL('image/png'); a.click();
    btn.textContent='⬇ Descargar PNG'; btn.disabled=false;
  }).catch(()=>{btn.textContent='⬇ Descargar PNG'; btn.disabled=false;});
}

/* ── INIT ── */
buildMsgList();
buildPal('palMarco', MARCOS, ()=>marco, p=>{marco=p;}, 'pal20');
buildPal('palFondo', FONDOS, ()=>fondo, p=>{fondo=p;}, 'pal20');
buildTxtPal();
initAlignToggle();
initSliders();
render();
