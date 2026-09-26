/* The tour's own harness. It exists because .tour-pop is now hidden until
   tourPlace() adds .is-placed, and if that class ever fails to land the tour
   becomes permanently invisible while every other check still passes — the
   scrim would darken the page and nothing would explain why. So: assert the
   card is genuinely VISIBLE and inside the viewport at every step, not merely
   present in the DOM.

   This does NOT seed dc-tour-seen, deliberately. Every other harness must,
   because the tour's scrim intercepts their clicks; this one is the tour. */
const { launch, serve } = require("../lib/browser");

let fails=0;
const ok=(c,m,d)=>{if(!c)fails++;console.log(`  ${c?"✓":"✗"} ${m}${d?"  — "+d:""}`);};

(async()=>{
 const site=await serve({gzip:false});
 const b=await launch();
 for(const vp of [{w:390,h:844,n:"390 phone"},{w:320,h:568,n:"320 phone"},{w:1280,h:900,n:"1280 desktop"}]){
   const ctx=await b.newContext({viewport:{width:vp.w,height:vp.h},reducedMotion:"reduce"});
   const pg=await ctx.newPage();
   const errs=[]; pg.on("pageerror",e=>errs.push(String(e)));
   await pg.goto(site.url+"/",{waitUntil:"domcontentloaded"});

   // first visit: the tour opens itself
   await pg.waitForSelector("#tourPop", { timeout: 4000 }).catch(()=>{});
   await pg.waitForTimeout(1200);

   const shown = async () => pg.evaluate(() => {
     const p = document.getElementById("tourPop");
     if (!p) return { there:false };
     const cs = getComputedStyle(p), r = p.getBoundingClientRect();
     return { there:true, vis:cs.visibility, disp:cs.display, placed:p.classList.contains("is-placed"),
              w:Math.round(r.width), h:Math.round(r.height),
              inView: r.top>=0 && r.left>=0 && r.right<=innerWidth+1 && r.bottom<=innerHeight+1,
              text:(p.innerText||"").trim().slice(0,40) };
   });

   let s = await shown();
   ok(s.there, `${vp.n}: tour opens on a first visit`);
   ok(s.vis==="visible", `${vp.n}: card is visible, not stranded hidden`, `visibility:${s.vis} is-placed:${s.placed}`);
   ok(s.inView, `${vp.n}: card sits inside the viewport`, `${s.w}x${s.h}`);
   ok(/step 1 of/i.test(s.text), `${vp.n}: first step renders`, s.text.split("\n")[0]);

   // step through every step; the card must stay visible and in view
   const total = await pg.evaluate(()=>{
     const m=(document.querySelector("#tourStep")||{}).textContent||"";
     return Number((m.match(/of (\d+)/)||[])[1]||0);
   });
   ok(total>=5, `${vp.n}: step count rendered from data`, `${total} steps`);
   let worst=null;
   for(let i=1;i<total;i++){
     await pg.click("#tourNext");
     await pg.waitForTimeout(350);
     const t=await shown();
     if(!t.there||t.vis!=="visible"||!t.inView) worst=`step ${i+1}: vis=${t.vis} inView=${t.inView}`;
   }
   ok(!worst, `${vp.n}: card stays visible and in view through every step`, worst||`${total} steps walked`);

   // Done closes it, and the class resets so the next open hides again
   await pg.click("#tourNext");
   await pg.waitForTimeout(300);
   const after=await pg.evaluate(()=>{
     const w=document.querySelector(".tour"), p=document.getElementById("tourPop");
     return { on:w&&w.classList.contains("is-on"),
              locked:document.body.classList.contains("tour-locked"),
              placed:p&&p.classList.contains("is-placed"),
              scrollable:getComputedStyle(document.body).overflow!=="hidden" };
   });
   ok(!after.on && !after.locked && after.scrollable, `${vp.n}: Done closes the tour and unlocks the page`);
   ok(!after.placed, `${vp.n}: is-placed resets, so the next open is hidden until placed`);
   ok(errs.length===0, `${vp.n}: no page errors`, errs[0]||"none");
   await ctx.close();
 }
 await b.close(); await site.close();
 console.log(fails?`\n${fails} FAILURE(S)`:`\ntour passes`);
 process.exitCode=fails?1:0;
})();
