// Reveal on scroll
(function(){
  var els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('visible')});return;}
  var o=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('visible');o.unobserve(x.target);}})},{threshold:0.08});
  els.forEach(function(e){o.observe(e)});
})();
// Click-to-play video slots. Add data-src="/videos/hero.mp4" to a .video-slot to activate it.
document.querySelectorAll('.video-slot').forEach(function(slot){
  var src=slot.getAttribute('data-src');
  if(!src){slot.classList.add('soon');return;}
  slot.querySelector('button').addEventListener('click',function(){
    var v=document.createElement('video');
    v.src=src;v.controls=true;v.playsInline=true;v.preload='none';
    var p=slot.querySelector('img');if(p)v.poster=p.currentSrc||p.src;
    slot.innerHTML='';slot.appendChild(v);v.play();
  });
});
// Web3Forms lead forms (AJAX with normal POST fallback)
document.querySelectorAll('form.lead-form').forEach(function(f){
  f.addEventListener('submit',function(e){
    if(!window.fetch||!window.FormData)return; // fallback: normal POST
    e.preventDefault();
    var b=f.querySelector('button[type=submit]'),t=b.textContent;b.disabled=true;b.textContent='Sending...';
    fetch(f.action,{method:'POST',body:new FormData(f),headers:{'Accept':'application/json'}}).then(function(r){return r.json().then(function(d){return [r,d]})}).then(function(x){
      if(!x[0].ok||!x[1].success)throw 0;
      Array.prototype.forEach.call(f.children,function(c){if(!c.classList.contains('lead-success'))c.style.display='none'});
      f.querySelector('.lead-success').hidden=false;
    }).catch(function(){b.disabled=false;b.textContent='Something went wrong — please call us';setTimeout(function(){b.textContent=t},4000)});
  });
});

//CALC
(function(){var $=function(i){return document.getElementById(i)};if(!$('calc'))return;
var P=120,W=52/12;
function m(v){return '$'+Math.round(v).toLocaleString('en-US')}
function r1(v){return (Math.round(v*10)/10).toLocaleString('en-US')}
function go(){var H=parseFloat($('cH').value),C=parseFloat($('cC').value);if(!isFinite(C))C=500;
if(!isFinite(H)||H<=0){['oHm','oHy','oSm','oSy'].forEach(function(i){$(i).textContent='–'});$('oTalk').hidden=true;return}
if($('cPer').value==='week')H*=W;var n=1,h2=H/2;
var s=H*C-(h2*C+h2*n*P),e=H-h2;$('oHm').textContent=r1(e);$('oHy').textContent=r1(e*12);
if(s<=0){$('oSm').textContent='–';$('oSy').textContent='–';$('oTalk').hidden=false}else{$('oSm').textContent=m(s);$('oSy').textContent=m(s*12);$('oTalk').hidden=true}}
['cH','cPer','cC'].forEach(function(i){$(i).addEventListener('input',go);$(i).addEventListener('change',go)});go()})();

//VIDEO
(function(){var box=document.querySelector('.cv-box');if(!box)return;var bv=box.querySelector('video'),rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches,cur=null;
document.querySelectorAll('.crunch-video').forEach(function(w){var v=w.querySelector('video'),loaded=false;
function load(){if(loaded)return;loaded=true;[['srcWebm','video/webm'],['srcMp4','video/mp4']].forEach(function(p){var s=document.createElement('source');s.src=v.dataset[p[0]];s.type=p[1];v.appendChild(s)});v.load()}
w._v=v;w._loaded=function(){return loaded};
if(!rm){if('IntersectionObserver' in window){new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){load();v.play().catch(function(){})}else if(loaded){v.pause()}})},{threshold:.25}).observe(w)}else{load();v.play().catch(function(){})}}
w.querySelector('.cv-play').addEventListener('click',function(){cur=w;bv.src=this.dataset.full;bv.poster=v.poster;v.pause();box.hidden=false;document.body.style.overflow='hidden';bv.muted=false;bv.play().catch(function(){})})});
function close(){bv.pause();box.hidden=true;document.body.style.overflow='';if(cur&&!rm&&cur._loaded())cur._v.play().catch(function(){})}
box.querySelector('.cv-close').addEventListener('click',close);box.addEventListener('click',function(e){if(e.target===box)close()});document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!box.hidden)close()})})();

//REVIEWS
(function(){document.querySelectorAll('.rv-card').forEach(function(c){var t=c.querySelector('.rv-text'),b=c.querySelector('.rv-more');
function chk(){if(!c.classList.contains('open'))b.hidden=t.scrollHeight<=t.clientHeight+2}
chk();window.addEventListener('resize',chk);b.addEventListener('click',function(){var o=c.classList.toggle('open');b.textContent=o?'Show less':'Read more'})});
var g=document.getElementById('rvGrid'),s=document.getElementById('rvShow');if(g&&s)s.addEventListener('click',function(){g.classList.add('all');s.parentNode.removeChild(s);document.querySelectorAll('.rv-card').forEach(function(c){var t=c.querySelector('.rv-text'),b=c.querySelector('.rv-more');b.hidden=t.scrollHeight<=t.clientHeight+2})})})();
