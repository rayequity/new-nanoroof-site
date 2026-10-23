
(function(){
var $=function(id){return document.getElementById(id);};
var qa=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- FAQ content ---------- */
var FAQ={
 cost:['How much does it cost?','It depends on your roof\u2019s size, pitch, condition and local labor. Your dealer confirms the price after the free assessment. Repairs found at the assessment are priced separately.'],
 leak:['Will it stop my roof from leaking?','No. Most roof leaks come from flashings around chimneys, skylights and walls, not from the shingles. Your dealer repairs those first during the tune-up, and the assessment will point them out.'],
 new:["Can I treat a new roof?", "A dealer can check your roof and tell you when it makes sense."],
 old:['My roof is over 20 years old. Is it too late?','Not always. It depends on condition rather than age: granule loss, brittleness and the decking underneath. The assessment answers it for your roof.'],
 'qualify-who':['Who decides whether my roof qualifies?','The certified dealer, at the roof-life assessment, based on the shingles, the decking and the flashings. You get the reason in writing either way.'],






 color:["Can NANOROOF restore roof color?", "Ask your dealer for approved color options and a sample on your roof."],
 colorhoa:['Do I need HOA approval for a roof color?','Often, yes. Many communities approve roof colors, so check your HOA rules before choosing. A shade close to your current roof is usually the easiest to get approved.'],
 trap:["What is the SPS System?", "A water-based silicone that penetrates and bonds inside asphalt shingles and adds a surface layer."],
 rejuv:['How is this different from a rejuvenator or other soak-in treatment?','Rejuvenators and other penetrating treatments, including nano-silica products, soak into the asphalt but leave no protective layer on top of the granules. NANOROOF penetrates and bonds inside the shingle and also forms a bonded layer on top, encapsulating it.'],
 sealer:["How is it different from a roof coating or a rejuvenator?", "NANOROOF penetrates and bonds inside asphalt shingles and adds a surface layer."],
 how:['What is NANOROOF made of?','NANOROOF is a water-based silicone elastomer made with proprietary nano-chemistry, designed for asphalt shingles. It\u2019s applied by spray.'],
 w2:['What does \u201cuseful life\u201d mean?','The period during which the shingles can reasonably be expected to protect the roof structure underneath.'],
 w3:['Does my shingle manufacturer\u2019s warranty matter?','The NANOROOF warranty stays valid even if your shingle manufacturer\u2019s warranty has expired or can\u2019t be transferred.'],
 w4:['What isn\u2019t covered?','Acts of God and natural disasters, roof leaks, structural failures, failures of earlier coatings, unforeseen environmental conditions, and damage from faulty application or inadequate repairs.'],
 insure:['Will my insurance company accept a preserved roof?','Each insurer sets its own rules on roof age and condition, so we can\u2019t promise how yours will treat it. Your Roof Record gives an inspector the photos, readings and warranty from the job.'],
 day:['What happens on the day?','The crew washes and preps the roof, checks shingle moisture, sprays the treatment, leaves a test sample and records the readings. No tear-off.'],
 temp:["Can NANOROOF be applied in winter?", "Spray-applied; it isn’t applied in cold weather."],
 buy:['Can I buy NANOROOF and apply it myself?','No. NANOROOF products are professional-grade and sold only to trained, certified NANOROOF Certified Dealers, not to homeowners or at retail. The result depends on the whole protocol: the assessment, repairs, soft wash, baseline readings, metered application and registration. Only a certified dealer can register the job, and the warranty depends on that registration.'],
 tune1:['What does a tune-up include?','Flashings inspected and repaired, gutters cleared, damaged shingles replaced, loose shingles secured, penetrations repaired, attic ventilation checked, valleys cleared, eaves and soffits inspected, branches trimmed and drainage checked.'],
 tune2:['How often should I get a tune-up?','At least once a year, after severe weather, and before selling your home.'],
 tune3:['Can a tune-up prevent leaks?','It reduces the risk by repairing flashings, securing loose shingles and fixing weak spots before water finds them.']
};
qa('[data-faq]').forEach(function(box){
  box.innerHTML=box.getAttribute('data-faq').split(',').map(function(k){var f=FAQ[k];return f?'<details><summary>'+f[0]+'</summary><p>'+f[1]+'</p></details>':'';}).join('');
});

function initCycle(S){ if(!document.getElementById('ring'+S)) return;
/* ---------- failure cycle ---------- */
  var STAGES = [
    {t:['UV'], title:'UV exposure', cut:false,
     body:'Sunlight hits the asphalt wherever the granule layer has thinned. Granules are the shingle\u2019s sunscreen; every one lost lets more UV through.',
     fix:''},
    {t:['Photo-oxidation','+ volatilization'], title:'Photo-oxidation and volatilization', cut:true,
     body:'UV oxidizes the asphalt binder, and heat drives off its lighter oils. The asphalt slowly loses the compounds that keep it supple.',
     fix:'SPS encapsulates: a water-based silicone that penetrates and bonds inside asphalt shingles and adds a surface layer.'},
    {t:['Brittleness'], title:'Brittleness', cut:false,
     body:'With its oils gone and its binder oxidized, the asphalt hardens. A brittle shingle can\u2019t flex the way a new one does.',
     fix:''},
    {t:['Thermal-cycling','cracks'], title:'Thermal-cycling cracks', cut:false,
     body:'A roof heats and cools every day. Brittle asphalt can\u2019t keep up with that movement, so it develops surface cracks.',
     fix:'Slowed rather than stopped: fewer stages feeding brittleness means less cracking. The silicone layer is flexible, so it isn\u2019t a rigid film that cracks with the shingle.'},
    {t:['Moisture','entry'], title:'Moisture entry', cut:true,
     body:'Water gets into the cracks and the open surface. In cold climates, freeze-thaw widens the cracks each winter.',
     fix:'The bonded silicone layer on top adds water protection over the shingle and its surface cracks.'},
    {t:['Biological','growth'], title:'Biological growth', cut:false,
     body:'Algae, moss and lichen take hold where the surface stays damp. They hold water against the shingle and work granules loose.',
     fix:''},
    {t:['Granule','loss'], title:'Granule loss', cut:true,
     body:'Granules loosen and wash into the gutters. Bare asphalt is now open to the sun, and the loop starts again, faster.',
     fix:'Encapsulating the shingle holds the remaining granules in place, which is what keeps the next turn of the loop from starting.'}
  ];
  var cx=280, cy=280, R=200, NR=58, n=STAGES.length, cur=0;
  var NS='http://www.w3.org/2000/svg';
  var ang=function(i){ return -Math.PI/2 + i*2*Math.PI/n; };
  var pos=function(i){ return [cx+R*Math.cos(ang(i)), cy+R*Math.sin(ang(i))]; };
  var arcs=$('arcs'+S), nodes=$('nodes'+S);
  for (var i=0;i<n;i++){
    var off=(NR+8)/R, a1=ang(i)+off, a2=ang(i+1)-off-0.02;
    var p1=[cx+R*Math.cos(a1),cy+R*Math.sin(a1)], p2=[cx+R*Math.cos(a2),cy+R*Math.sin(a2)];
    var path=document.createElementNS(NS,'path');
    path.setAttribute('d','M'+p1[0]+' '+p1[1]+' A'+R+' '+R+' 0 0 1 '+p2[0]+' '+p2[1]);
    path.setAttribute('class','arc'); path.setAttribute('marker-end','url(#ah'+S+')');
    arcs.appendChild(path);
  }
  STAGES.forEach(function(s,i){
    var p=pos(i), g=document.createElementNS(NS,'g');
    g.setAttribute('class','node'+(s.cut?' cut':'')); g.setAttribute('tabindex','0'); g.setAttribute('role','button');
    g.setAttribute('aria-label','Stage '+(i+1)+': '+s.title+(s.cut?'. NANOROOF works against this stage.':''));
    var c=document.createElementNS(NS,'circle'); c.setAttribute('cx',p[0]); c.setAttribute('cy',p[1]); c.setAttribute('r',NR); g.appendChild(c);
    var num=document.createElementNS(NS,'text'); num.setAttribute('class','num'); num.setAttribute('x',p[0]); num.setAttribute('text-anchor','middle');
    num.setAttribute('y', p[1] - (s.t.length>1?16:8)); num.textContent=(i+1); g.appendChild(num);
    s.t.forEach(function(line,k){
      var t=document.createElementNS(NS,'text'); t.setAttribute('class','t'); t.setAttribute('x',p[0]); t.setAttribute('text-anchor','middle');
      t.setAttribute('y', p[1] + (s.t.length>1? (k===0?4:20) : 12)); t.textContent=line; g.appendChild(t);
    });
    g.addEventListener('click',function(){ show(i); });
    g.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); show(i);} });
    nodes.appendChild(g);
  });
  function show(i){
    cur=(i+n)%n; var s=STAGES[cur];
    Array.prototype.forEach.call(nodes.children,function(g,k){ g.classList.toggle('on',k===cur); g.setAttribute('aria-pressed',k===cur?'true':'false'); });
    $('dStep'+S).textContent='Stage '+(cur+1)+' of '+n+(cur===n-1?' \u2192 back to stage 1':'');
    $('dTitle'+S).textContent=s.title; var di=$('dImg'+S); di.className='dimg gi-'+(4+cur); di.setAttribute('aria-label','Illustration: '+s.title.toLowerCase()+' on an asphalt shingle roof');
    $('dBody'+S).textContent=s.body;
    $('dFixHead'+S).textContent= !s.fix ? '' : s.cut ? 'Where NANOROOF interrupts it' : 'What NANOROOF does here';
    $('dFix'+S).textContent=s.fix;
  }
  $('prev'+S).addEventListener('click',function(){ show(cur-1); });
  $('next'+S).addEventListener('click',function(){ show(cur+1); });
  show(0);

  
}
initCycle('-home'); initCycle('-how');

/* ---------- mega menu ---------- */
var trigs=qa('.mtrig'), panels=qa('.mpanel');
function closeMenus(){trigs.forEach(function(t){t.setAttribute('aria-expanded','false');});panels.forEach(function(p){p.classList.remove('open');});}
trigs.forEach(function(t){
  t.addEventListener('click',function(e){e.stopPropagation();var open=t.getAttribute('aria-expanded')==='true';closeMenus();
    if(!open){t.setAttribute('aria-expanded','true');$(t.getAttribute('aria-controls')).classList.add('open');}});
});
document.addEventListener('click',function(e){if(!e.target.closest('.mpanel')) closeMenus();});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeMenus();closeDrawer();}});

/* ---------- drawer ---------- */
var drawer=$('drawer'), burger=$('burger');
function openDrawer(){drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');burger.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';drawer.querySelector('.x').focus();}
function closeDrawer(){if(!drawer.classList.contains('open'))return;drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');burger.setAttribute('aria-expanded','false');document.body.style.overflow='';}
burger.addEventListener('click',openDrawer);
qa('[data-close]',drawer).forEach(function(b){b.addEventListener('click',closeDrawer);});
qa('.dgroup>button',drawer).forEach(function(b){b.addEventListener('click',function(){var ul=b.nextElementSibling,o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',o?'false':'true');ul.classList.toggle('open',!o);});});


/* ---------- sustainability calculator ---------- */
var sq=document.getElementById('susSq');
if(sq){ var upd=function(){ var s=parseFloat(sq.value); if(!s||s<500) s=500; if(s>20000) s=20000;
  var lo=s*2/2000, hi=s*5/2000, f=0.19+0.04;
  var r1=function(x){return x.toFixed(1)};
  document.getElementById('susT').textContent=r1(lo)+' to '+r1(hi)+' tons';
  document.getElementById('susC').textContent=r1(lo*f)+' to '+r1(hi*f)+' t'; };
  sq.addEventListener('input',upd); upd(); }


/* ---------- audience bar ---------- */
var AUD={homeowners:'Homeowner',contractors:'Contractor','referral-partners':'Contractor',architects:'Architect or engineer','property-owners':'Property manager',commercial:'Commercial owner'};
function setAud(slug){ var lab=document.getElementById('audLabel'); if(!lab) return;
  var a=AUD[slug]; if(a){ window.__aud=a; } lab.textContent=window.__aud||'Homeowner';
  qa('.aud-panel a').forEach(function(x){ x.setAttribute('aria-current', x.getAttribute('data-aud')===slug?'true':'false'); });
  var d=document.getElementById('audMenu'); if(d) d.removeAttribute('open'); }
document.addEventListener('click',function(e){ var d=document.getElementById('audMenu'); if(d&&d.open&&!e.target.closest('#audMenu')) d.removeAttribute('open'); });
/* ---------- walk your roof ---------- */
var wd=document.getElementById('walkData');
if(wd){ var W=JSON.parse(wd.textContent), pins=qa('#home-check .pin'), wc=0;
  var VL={good:'good',fix:'fix',no:'no'};
  function wshow(i){ wc=(i+W.length)%W.length; var s=W[wc];
    pins.forEach(function(p,k){ p.classList.toggle('on',k===wc); p.setAttribute('aria-pressed',k===wc?'true':'false'); });
    $('wkStep').textContent='Point '+(wc+1)+' of '+W.length; $('wkTitle').textContent=s.t; $('wkBody').textContent=s.b;
    var v=$('wkVerdict'); v.textContent=s.v; v.className='walk-verdict '+(VL[s.k]||'fix'); }
  pins.forEach(function(p,k){ p.addEventListener('click',function(){ wshow(k); }); });
  $('wkPrev').addEventListener('click',function(){ wshow(wc-1); }); $('wkNext').addEventListener('click',function(){ wshow(wc+1); });
  wshow(0); }


/* ---------- autoplay muted loops when visible ---------- */
(function(){ var vids=qa('#home-ways video'); if(!vids.length) return;
  vids.forEach(function(v){ v.muted=true; v.setAttribute('muted',''); });
  var play=function(v){ var p=v.play(); if(p&&p.catch) p.catch(function(){}); };
  if('IntersectionObserver' in window){ var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting) play(e.target); else e.target.pause(); }); },{threshold:.25}); vids.forEach(function(v){ io.observe(v); }); }
  else vids.forEach(play);
  if(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches){ vids.forEach(function(v){ v.removeAttribute('autoplay'); v.pause(); v.controls=true; }); }
})();


/* ---------- roof color visualizer ---------- */
qa('[data-viz]').forEach(function(v){
  var imgs=v.querySelectorAll('.viz-img'), btns=v.querySelectorAll('.viz-sw button'), lab=v.querySelector('.vl');
  btns.forEach(function(b){ b.addEventListener('click',function(){
    var k=b.getAttribute('data-k');
    btns.forEach(function(x){ x.setAttribute('aria-checked', x===b?'true':'false'); });
    imgs.forEach(function(im){ im.classList.toggle('on', im.getAttribute('data-k')===k); });
    lab.textContent = k==='faded' ? 'Faded roof, before' : b.getAttribute('data-name')+', restored';
  }); });
});


/* ---------- roof system diagram ---------- */
var rsd=document.getElementById('rsData');
if(rsd){ var RS=JSON.parse(rsd.textContent), rpins=qa('.rs-pin'), rc=0;
  function rshow(i){ rc=(i+RS.length)%RS.length; var s=RS[rc];
    rpins.forEach(function(p,k){ p.classList.toggle('on',k===rc); p.setAttribute('aria-pressed',k===rc?'true':'false'); });
    $('rsStep').textContent='Point '+(rc+1)+' of '+RS.length+' \u00b7 '+s.tag; $('rsTitle').textContent=s.t;
    $('rsRole').innerHTML=s.r; $('rsCheck').innerHTML=s.c; var v=$('rsVerdict'); v.innerHTML=s.v; v.className='rs-verdict '+s.k; }
  rpins.forEach(function(p,k){ p.addEventListener('click',function(){ rshow(k); }); p.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); rshow(k);} }); });
  $('rsPrev').addEventListener('click',function(){ rshow(rc-1); }); $('rsNext').addEventListener('click',function(){ rshow(rc+1); });
  rshow(0); }

/* ---------- router ---------- */
var pages=qa('.page');
var GROUP={qualify:'app',colors:'app',cleaning:'app','tune-up':'app',commercial:'app','property-owners':'app',sps:'prod',products:'prod',architects:'pro',contractors:'pro','referral-partners':'pro','repair-products':'prod','cleaning-products':'prod','technical-data':'prod',silicone:'how',polyurea:'how',science:'how','how-it-works':'how','roof-system':'how',assessment:'how',preservation:'how','care-plan':'how',moisture:'cmp','field-data':'cmp',faq:'cmp',estimate:'cmp'};
function route(){
  var slug=window.__SLUG||'home', sub=(location.hash||'').replace(/^#/,'')||null;
  var target=document.querySelector('[data-page="'+slug+'"]')||document.querySelector('[data-page="404"]');
  if(!target){closeMenus();closeDrawer();return;}
  pages.forEach(function(p){p.classList.toggle('on',p===target);});
  document.title=target.getAttribute('data-title')||'NANOROOF';
  closeMenus(); closeDrawer(); setAud(slug);
  qa('.mlink').forEach(function(a){a.toggleAttribute('aria-current',a.getAttribute('data-route')===slug);if(a.getAttribute('data-route')===slug)a.setAttribute('aria-current','page');});
  trigs.forEach(function(t){t.classList.toggle('cur',GROUP[slug]===t.getAttribute('data-group'));});
  var el=sub?document.getElementById(slug+'-'+sub):null;
  if(el){setTimeout(function(){el.scrollIntoView({behavior:reduce?'auto':'smooth'});},30);}
  else{window.scrollTo({top:0,left:0,behavior:'instant'}); var h1=target.querySelector('h1'); if(h1){h1.setAttribute('tabindex','-1');h1.focus({preventScroll:true});}}
}
window.addEventListener('hashchange',route);
route();
})();

var qa=function(s,r){return [].slice.call((r||document).querySelectorAll(s));};
/* ---------- internal page system: facts, hero images, on-this-page, related ---------- */
(function(){
var T={ 'how-it-works':['Why shingles fail','The seven-stage aging loop'],'silicone':['Why silicone','The chemistry behind the SPS System'],'repair-products':['Roof repair products','Caulk and liquid flashing'],'cleaning-products':['Cleaning products','Roof cleaner'],'technical-data':['Technical data','Properties and data sheets'],'science':['The science','Silicone for shingles'],'granule-loss':['Granule loss','Granules in the gutters'],'algae-streaks':['Algae and moss','Dark streaks and green growth'],'curling-cracking':['Curling and cracking','Dried-out shingles'],'roof-leaks':['Roof leaks','A repair problem first'],'roof-system':['The roof as a system','Why every job checks the whole roof'],
 'qualify':['Does my roof qualify?','Who it\u2019s for, and who it isn\u2019t'],'products':['Products','The SPS System and repair products'],'assessment':['Roof-life assessment','Free, written, with photos'],
 'tune-up':['10-point tune-up','Small problems, fixed early'],'cleaning':['Roof cleaning','Low-pressure soft wash'],'preservation':['NANOROOF preservation','The application protocol, step by step'],
 'care-plan':['Care Plan','Check-ups and your Roof Record'],'sps':['The SPS System','What the letters mean'],'colors':['Roof colors','Ask for approved color options'],
 'property-owners':['Portfolios and HOAs','Portfolios, HOAs and multifamily'],
 'faq':['FAQ','Straight answers'],'learn':['Guides','Plain answers for homeowners'],'moisture':['The moisture myth','The SPS System'],'field-data':['Field Data','Condition, measured'],
 'about':['About NANOROOF','Who we are and what we believe'],'sustainability':['Sustainability','A roof kept is a roof not landfilled'],
 'contact':['Contact','Reach the right person'],'contractors':['Become a dealer','Become a NANOROOF Certified Dealer'],
 'referral-partners':['Referral partners','For agents and inspectors'],'homeowners':['For homeowners','Preservation, explained'],'architects':['For architects','Spec-ready documentation'] };
var F={ 'how-it-works':['7-stage aging loop','Bonds inside, encapsulates'],'silicone':['Named in 1904','Water-based and recoatable'],
 'repair-products':['Professional-grade','Used in every tune-up','Damp and cold tolerant caulk'],'cleaning-products':['Professional-grade','Roof cleaning','Clean before every treatment'],'technical-data':['Professional-grade','Repair and cleaning products','Data sheets on request'],'science':['Silicone for shingles','Residential asphalt shingles','One chemistry per roof'],'granule-loss':['UV loosens granules','Early loss is treatable','Free assessment'],'algae-streaks':['Soft wash, not pressure','Granules stay on'],'curling-cracking':['Catch it early','Secured in the tune-up','Checked for flexibility'],'roof-leaks':['Most start at flashings','Repaired first','Then decide'],'roof-system':['8 parts of the roof checked','Repairs before treatment','An honest no when it won\u2019t work'],'qualify':['Free assessment','A written yes or no','Repairs priced separately'],
 'products':['Professional-grade','Sold only to certified dealers','The SPS System'],'assessment':['Free','25-point inspection scored out of 250','Written report with photos'],
 'tune-up':['10 points','Before every treatment','Recoat timing is set at the Care-Plan inspection'],'cleaning':['Low-pressure soft wash','roof cleaner','Landscaping protected'],
 'preservation':['6 steps','Applied to the existing roof','Every step on record'],'care-plan':['Scheduled check-ups','Readings compared to day one','The Care-Plan only adds coverage'],
 'sps':['Professional-grade','Dealer-applied','Registered warranty'],'colors':['Ask for approved color options','Restores faded roofs','See a sample on your roof'],
 'property-owners':['Multifamily, HOAs, portfolios','Roof Cost Savings Report','One program, many buildings'],
 'moisture':['The SPS System','Water-based silicone','Dealer-applied'],'field-data':['Recorded on every job','Measured: being built','Underwritable: the goal'],
 'about':['NANO Products, LLC dba NANOROOF','West Palm Beach, Florida','Independent dealer network'],
 'sustainability':['Preserve what still works','Shingles kept out of landfill','Residential asphalt shingles'],
 'contractors':['Certification program','Residential asphalt shingles','Colors to offer'],'referral-partners':['Agents, inspectors, adjusters','Free assessment for clients','Simple referrals'],
 'homeowners':['Plain answers','Questions to ask any roofer','Free assessment'],'architects':['Spec-ready material data','Submittals on request','Quality control you can specify'] };
var R={ 'how-it-works':['roof-system','silicone','qualify'],'silicone':['science','sps'],'repair-products':['tune-up','technical-data','roof-system'],'cleaning-products':['cleaning','technical-data','sps'],'technical-data':['products','architects','sps'],'science':['silicone','how-it-works'],'granule-loss':['how-it-works','assessment'],'algae-streaks':['cleaning','cleaning-products'],'curling-cracking':['tune-up','roof-system'],'roof-leaks':['tune-up','repair-products','roof-system'],'roof-system':['assessment','tune-up','qualify'],'qualify':['assessment','roof-system'],
 'products':['technical-data','repair-products','cleaning-products'],'assessment':['roof-system','tune-up'],'tune-up':['assessment','cleaning','care-plan'],'cleaning':['tune-up','preservation','colors'],
 'preservation':['cleaning','care-plan'],'care-plan':['field-data','tune-up'],'sps':['silicone','products','preservation'],'colors':['preservation','cleaning'],
 'property-owners':['field-data'],'faq':['learn','moisture'],
 'learn':['how-it-works','moisture','roof-system'],'moisture':['silicone','roof-system','how-it-works'],'field-data':['care-plan','roof-system'],
 'about':['sustainability','field-data','contractors'],'sustainability':['about','how-it-works','field-data'],'contact':['faq'],
 'referral-partners':['contractors','homeowners'],'homeowners':['qualify','faq'],'architects':['products','field-data'] };
var IMG={'science':'gi-drop','contact':'gi-15','about':'gi-17', 'roof-system':'gi-rs','products':'gi-mac','faq':'gi-c0','learn':'gi-mac','moisture':'gi-mac','field-data':'gi-mm','contact':'gi-nb','cleaning':'gi-cb' };
function build(){
  qa('.page[data-page]').forEach(function(pg){
    var k=pg.getAttribute('data-page'); if(k==='home'||!T[k]) return;
    var ph=pg.querySelector('.phero');
    if(ph&&IMG[k]){ var old=ph.querySelector('.phimg');
      if(old){ old.className=old.className.replace(/gi-[a-z0-9]+/,IMG[k]); }
      else{ var w=ph.querySelector('.wrap'); if(w&&!w.classList.contains('phgrid')){ var t=document.createElement('div'); t.className='phtext'; while(w.firstChild) t.appendChild(w.firstChild); w.appendChild(t); w.classList.add('phgrid'); var im=document.createElement('div'); im.className='phimg '+IMG[k]; im.setAttribute('role','img'); im.setAttribute('aria-label','Illustration'); im.innerHTML='<span class="gen-tag">Illustration</span>'; w.appendChild(im);} } }
    if(ph&&F[k]&&!ph.querySelector('.phfacts')){ var lead=ph.querySelector('.lead'); var f=document.createElement('ul'); f.className='phfacts'; f.innerHTML=F[k].map(function(x){return '<li>'+x+'</li>';}).join(''); if(lead) lead.insertAdjacentElement('afterend',f); }
    // on-this-page
    var secs=[].slice.call(pg.querySelectorAll(':scope > section:not(.phero)')).filter(function(s){return s.querySelector('h2')&&!s.classList.contains('next');});
    if(secs.length>=4&&!pg.querySelector('.otp')&&!pg.querySelector('.subnav')){
      var nav=document.createElement('nav'); nav.className='otp'; nav.setAttribute('aria-label','On this page'); var inner='<div class="wrap"><span class="otp-k">On this page</span>';
      secs.forEach(function(s,i){ if(!s.id) s.id=k+'-s'+i; var h=s.querySelector('h2').textContent.replace(/\s+/g,' ').trim(); if(h.length>34) h=h.slice(0,32).replace(/\s+\S*$/,'')+'\u2026'; inner+='<a href="#/'+k+'" data-t="'+s.id+'">'+h+'</a>'; });
      nav.innerHTML=inner+'</div>'; if(ph) ph.insertAdjacentElement('afterend',nav);
      nav.addEventListener('click',function(e){ var a=e.target.closest('a[data-t]'); if(!a) return; e.preventDefault(); var t=document.getElementById(a.getAttribute('data-t')); if(t){ var y=t.getBoundingClientRect().top+scrollY-130; scrollTo({top:y,behavior:'smooth'});} });
    }
    // related
    if(R[k]&&!pg.querySelector('.related')){
      var rel=document.createElement('section'); var nx0=pg.querySelector(':scope > section.next, :scope > .next'); var prev=nx0?nx0.previousElementSibling:pg.lastElementChild; rel.className='section related '+(prev&&prev.classList.contains('m-lab')?'m-steel':'m-lab');
      rel.innerHTML='<div class="wrap"><div class="section-head"><h2>Keep exploring</h2></div><div class="rel-grid">'+R[k].map(function(s){ var t=T[s]||[s,'']; return '<a class="rel-card" href="#/'+s+'"><b>'+t[0]+'</b><span>'+t[1]+'</span><i aria-hidden="true">\u2192</i></a>'; }).join('')+'</div></div>';
      var nx=pg.querySelector(':scope > section.next, :scope > .next'); if(nx) nx.insertAdjacentElement('beforebegin',rel); else pg.appendChild(rel);
    }
  });
}
build();
/* active state for on-this-page */
window.addEventListener('scroll',function(){ var pg=document.querySelector('.page.on'); if(!pg) return; var nav=pg.querySelector('.otp'); if(!nav) return; var cur=null;
  nav.querySelectorAll('a[data-t]').forEach(function(a){ var t=document.getElementById(a.getAttribute('data-t')); if(t&&t.getBoundingClientRect().top<180) cur=a; });
  nav.querySelectorAll('a').forEach(function(a){ a.classList.toggle('on',a===cur); }); },{passive:true});
})();
/* before/after slider */
qa('[data-ba]').forEach(function(b){ var r=b.querySelector('input'),top=b.querySelector('.ba-top'),ln=b.querySelector('.ba-line');
  function u(){ var v=r.value; top.style.clipPath='inset(0 0 0 '+v+'%)'; ln.style.left=v+'%'; } r.addEventListener('input',u); u(); });
/* FAQ search */
(function(){ var q=document.getElementById('faqq'); if(!q) return; var pg=q.closest('.page');
  function run(){ var s=q.value.trim().toLowerCase(), n=0, tot=0;
    pg.querySelectorAll('.faq details').forEach(function(d){ tot++; var hit=!s||d.textContent.toLowerCase().indexOf(s)>-1; d.hidden=!hit; if(hit) n++; if(s&&hit) d.open=true; if(!s) d.open=false; });
    pg.querySelectorAll('.faq').forEach(function(f){ var sec=f.closest('section'); var any=[].some.call(f.querySelectorAll('details'),function(d){return !d.hidden;}); if(sec&&!sec.classList.contains('faq-search-wrap')){ var h=f.previousElementSibling; } f.style.display=any?'':'none'; var h2=f.parentElement.querySelector('h2'); });
    pg.querySelector('.faq-count').textContent=s?(n+' of '+tot+' questions match'):''; }
  q.addEventListener('input',run); })();
/* Learn filters */
(function(){ var box=document.querySelector('.learn-filter'); if(!box) return; var pg=box.closest('.page'); var arts=[].slice.call(pg.querySelectorAll('.article'));
  var cats=[]; arts.forEach(function(a){ var p=a.querySelector('.pill'); var c=p?p.textContent.trim():'Other'; a.setAttribute('data-c',c); if(cats.indexOf(c)<0) cats.push(c); });
  cats.forEach(function(c){ var b=document.createElement('button'); b.type='button'; b.textContent=c; b.setAttribute('data-f',c); box.appendChild(b); });
  box.addEventListener('click',function(e){ var b=e.target.closest('button'); if(!b) return; box.querySelectorAll('button').forEach(function(x){ x.classList.toggle('on',x===b); x.setAttribute('aria-pressed',x===b?'true':'false'); });
    var f=b.getAttribute('data-f'); arts.forEach(function(a){ a.hidden=!(f==='all'||a.getAttribute('data-c')===f); }); }); })();
/* ---------- conversion tracking (dataLayer; connect GA4/GTM later) ---------- */
window.dataLayer=window.dataLayer||[];
function track(ev,p){ try{ window.dataLayer.push(Object.assign({event:ev,page:(window.__SLUG||'home')},p||{})); }catch(e){} }
window.nrTrack=track;
track('page_view');
document.addEventListener('click',function(e){ var a=e.target.closest('a,button'); if(!a) return; var h=a.getAttribute('href')||'';
  if(h.indexOf('tel:')===0) track('call_click');
  else if(h.indexOf('mailto:')===0) track('email_click');
  else if(a.classList.contains('btn')) track('cta_click',{label:(a.textContent||'').trim().slice(0,60),target:h});
},true);
(function(){ var q=document.getElementById('faqq'); if(q){ var t; q.addEventListener('input',function(){ clearTimeout(t); t=setTimeout(function(){ if(q.value.trim()) track('faq_search'); },900); }); } })();

/* ---------- social profiles: fill in the URLs; empty = icon shown, no link ---------- */
(function(){ var SOCIAL={facebook:'',linkedin:'',instagram:'',youtube:''};
  qa('a[data-social]').forEach(function(a){ var u=SOCIAL[a.getAttribute('data-social')];
    if(u){ a.href=u; a.target='_blank'; a.rel='noopener'; } else { a.hidden=true; } }); })();
/* roof material calculator (dealer page) */
qa('[data-rcalc]').forEach(function(c){ var sec=c.closest('section'), r=c.querySelector('input'), o=function(k){return sec.querySelector('[data-o="'+k+'"]');}, fmt=function(n){return n.toLocaleString('en-US');};
  function upd(){ var sq=+r.value, area=sq*100, gal=area/160*1.10; o('sq').textContent=sq; o('area').textContent=fmt(area)+' sq ft'; o('gal').textContent='\u2248 '+Math.round(gal)+' gal'; }
  r.addEventListener('input',upd); r.addEventListener('change',function(){ track('dealer_calc',{squares:+r.value}); }); upd(); });
;

(function(){
  var SKIP={SCRIPT:1,STYLE:1,TEXTAREA:1,OPTION:1,TITLE:1,SELECT:1,INPUT:1,NOSCRIPT:1};
  var RE=/NANOROOF(?:\u2122)?/g;
  function make(){var s=document.createElement('span');s.className='nr';s.setAttribute('aria-label','NANOROOF');
    s.innerHTML='<span class="nn" aria-hidden="true">NANO</span><span aria-hidden="true">ROOF</span><sup aria-hidden="true">\u2122</sup>';return s;}
  function brandify(root){
    if(!root) return;
    if(root.nodeType===3){ fix(root); return; }
    if(root.nodeType!==1 || SKIP[root.tagName] || root.closest && root.closest('svg,.nr')) return;
    var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
      var p=n.parentNode; if(!p||SKIP[p.nodeName]) return NodeFilter.FILTER_REJECT;
      if(p.closest && p.closest('svg,.nr')) return NodeFilter.FILTER_REJECT;
      return n.nodeValue.indexOf('NANOROOF')>-1?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP;}});
    var list=[],n; while((n=w.nextNode())) list.push(n);
    list.forEach(fix);
  }
  function fix(t){
    var p=t.parentNode; if(!p||SKIP[p.nodeName]||(p.closest&&p.closest('svg,.nr'))) return;
    var v=t.nodeValue; if(v.indexOf('NANOROOF')<0) return;
    var frag=document.createDocumentFragment(),last=0; RE.lastIndex=0; var m;
    while((m=RE.exec(v))){ if(m.index>last) frag.appendChild(document.createTextNode(v.slice(last,m.index))); frag.appendChild(make()); last=m.index+m[0].length; }
    if(last<v.length) frag.appendChild(document.createTextNode(v.slice(last)));
    p.replaceChild(frag,t);
  }
  brandify(document.body);
  new MutationObserver(function(muts){ muts.forEach(function(mu){
    if(mu.type==='characterData') brandify(mu.target);
    else mu.addedNodes.forEach(function(nd){ brandify(nd); });
  }); }).observe(document.body,{childList:true,subtree:true,characterData:true});
})();

;/* ---- multi-page: real URLs for any remaining #/ links ---- */
(function(){function to(h){var p=h.replace(/^#\/?/,'').split('/');var s=p[0];if(!s)return'/';return'/'+s+'/'+(p[1]?'#'+p[1]:'');}
function fix(root){[].forEach.call((root||document).querySelectorAll('a[href^="#/"]'),function(a){a.setAttribute('href',to(a.getAttribute('href')));});}
fix();document.addEventListener('click',function(e){if(e.defaultPrevented)return;var a=e.target.closest&&e.target.closest('a[href^="#/"]');if(!a)return;e.preventDefault();location.href=to(a.getAttribute('href'));});
new MutationObserver(function(m){m.forEach(function(r){[].forEach.call(r.addedNodes,function(n){if(n.nodeType===1)fix(n);});});}).observe(document.body,{childList:true,subtree:true});})();
