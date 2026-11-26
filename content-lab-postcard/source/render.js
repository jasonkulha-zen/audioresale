const {chromium}=require('playwright');const path=require('path');
(async()=>{const out=process.argv[2];const b=await chromium.launch();
const p=await b.newPage({viewport:{width:840,height:1200},deviceScaleFactor:3.125});
await p.goto('file://'+path.resolve(__dirname,'card.html'));await p.evaluate(()=>document.fonts.ready);
const over=await p.evaluate(()=>[...document.querySelectorAll('.copy,.col,.book,.foot,.eyebrow,h1,h2,li')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.className||e.tagName));
console.log('overflow:',over);
for(const id of ['front','frontp','back','frontb','backb']){await p.locator('#'+id).screenshot({path:`${out}/${id}.png`});}
await p.evaluate(()=>document.body.classList.add('guides'));
for(const id of ['front','frontp','back','frontb','backb']){await p.locator('#'+id).screenshot({path:`${out}/${id}-guides.png`});}
await b.close()})();
