/* Renders the three script-face strings against the SUBSET file and compares
   each one's painted width to the same string in the full original. A missing
   glyph shows as a tofu box or a fallback-font substitution, both of which
   change the measured width; identical widths mean the subset draws the same
   letterforms. Cheaper and far more reliable than looking at a screenshot. */
const { launch, serve } = require("../lib/browser");
const fs=require("fs"),path=require("path");
const ROOT=path.join(__dirname,"..","..");
const os=require("os");
/* The three strings set in the script face, read from source rather than
   restated here, so rewording one is tested rather than silently skipped.
   The same three regexes live in tools/check.js and tools/make-fonts.js. */
const html=fs.readFileSync(path.join(ROOT,"index.html"),"utf8"), app=fs.readFileSync(path.join(ROOT,"assets/app.js"),"utf8");
const grab=(src,re)=>{const m=src.match(re); if(!m) throw new Error("font.js could not find a script-face string: "+re); return m[1];};
const STR=[grab(html,/<span class="brand-text"[^>]*>[^<]*<em>([^<]+)<\/em>/), grab(html,/<p class="foot-sign">([^<]+)<\/p>/), grab(app,/<p class="salutation">([^<]+)<\/p>/)];
const b64=(p)=>fs.readFileSync(p).toString("base64");

(async()=>{
 const page=`<!DOCTYPE html><meta charset="utf-8"><style>
 @font-face{font-family:"sub";src:url(data:font/woff2;base64,${b64(path.join(ROOT,"assets/fonts/petit-formal-script.woff2"))})format("woff2");font-display:block}
 @font-face{font-family:"full";src:url(data:font/woff2;base64,${b64(path.join(ROOT,"tools/fonts/petit-formal-script.full.woff2"))})format("woff2");font-display:block}
 span{font-size:40px;white-space:pre}
 .s{font-family:"sub"} .f{font-family:"full"} .none{font-family:"NoSuchFont",cursive}
 </style><body>${STR.map((s,i)=>
   `<div><span class="s" id="s${i}">${s}</span></div><div><span class="f" id="f${i}">${s}</span></div><div><span class="none" id="n${i}">${s}</span></div>`).join("")}`;
 const tmp=path.join(os.tmpdir(),"dc-font-check.html");
 fs.writeFileSync(tmp,page);
 const br=await launch();
 const pg=await (await br.newContext()).newPage();
 await pg.goto("file://"+tmp); await pg.waitForTimeout(800);
 let bad=0;
 for(let i=0;i<STR.length;i++){
   const r=await pg.evaluate((i)=>{
     const w=(id)=>document.getElementById(id).getBoundingClientRect().width;
     return {s:w("s"+i),f:w("f"+i),n:w("n"+i)};
   },i);
   const same=Math.abs(r.s-r.f)<0.6;
   const notFallback=Math.abs(r.s-r.n)>2;
   if(!same||!notFallback) bad++;
   console.log(`  ${same&&notFallback?"✓":"✗"} "${STR[i].slice(0,34)}"  subset ${r.s.toFixed(1)}px  full ${r.f.toFixed(1)}px  fallback ${r.n.toFixed(1)}px`);
 }
 await br.close(); fs.unlinkSync(tmp);
 console.log(bad?`\n${bad} string(s) render differently from the original`:`\nsubset renders identically to the full font`);
 process.exitCode=bad?1:0;
})();
