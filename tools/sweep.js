#!/usr/bin/env node
/* Read every programme's official page and keep the lines that matter.

     node tools/sweep.js --trigger          run it on GitHub now and wait (≈4 min)
     node tools/sweep.js --out sweep        run it here (needs open internet)
     node tools/sweep.js --out sweep --only chevening,fulbright

   You rarely run this by hand. .github/workflows/recheck.yml runs it on the
   1st and 15th of every month and pushes the result to the `recheck` branch,
   where tools/recheck.js picks it up by itself. --trigger is for when you
   want a fresh one now: it starts that workflow and waits for it to finish.

   This sandbox cannot reach most sites (its proxy refuses them), which is
   why the reading happens on GitHub's runners. Each page is fetched directly
   first; pages that are bot-walled, script-rendered, PDFs or nearly empty go
   through the r.jina.ai reader, two at a time and paced, because the reader
   limits requests per IP and answers a burst with HTTP 429. */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { load } = require("./lib/data");
const { fetchPage, viaReader, signals } = require("./lib/page");

const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf(n); return i === -1 ? null : args[i + 1]; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function pool(list, n, fn) {
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(n, list.length) }, async () => { while (i < list.length) await fn(list[i++]); }));
}

async function sweep(outDir, only) {
  const { items } = load();
  const list = items.filter((i) => i.url && (!only || only.includes(i.id)));
  const pages = {};
  const t0 = Date.now();

  await pool(list, 12, async (i) => { pages[i.id] = await fetchPage(i.url); });
  const offline = list.filter((i) => pages[i.id].status === 0).length;
  if (list.length > 10 && offline / list.length > 0.8) {
    console.error(`✗ ${offline} of ${list.length} pages could not be reached at all. This machine has no open internet`);
    console.error("  (the Claude sandbox's proxy refuses most sites). Run it on GitHub instead: node tools/sweep.js --trigger");
    process.exit(2);
  }

  // The reader pass: paced, two at a time, with one retry after a rate limit.
  const slow = list.filter((i) => pages[i.id].needsReader && pages[i.id].status !== 404 && pages[i.id].status !== 410);
  const budget = t0 + 11 * 60 * 1000;
  await pool(slow, 2, async (i) => {
    if (Date.now() > budget) return;
    for (let attempt = 0; attempt < 2; attempt++) {
      await sleep(3500);
      try {
        const r = await viaReader(i.url);
        if (r.limited) { await sleep(20000); continue; }
        const p = pages[i.id];
        if (r.text.length > p.text.length) { p.text = r.text; p.src = "reader"; p.chars = r.text.replace(/\s+/g, " ").length; }
      } catch (e) { /* keep the direct read */ }
      break;
    }
  });

  const out = { when: new Date().toISOString(), total: list.length, pages: {} };
  for (const i of list) {
    const p = pages[i.id];
    const lines = signals(p.text);
    out.pages[i.id] = {
      url: i.url, status: p.status, final: p.final, src: p.src, chars: p.chars, title: p.title,
      error: p.error || undefined, readable: p.chars >= 400 && !(p.blocked && p.src === "html"), lines
    };
  }
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "latest.json"), JSON.stringify(out, null, 1) + "\n");

  const v = Object.values(out.pages);
  const dead = v.filter((p) => p.status === 404 || p.status === 410).length;
  console.log(`✓ swept ${v.length} official pages in ${Math.round((Date.now() - t0) / 1000)}s: ${v.filter((p) => p.readable).length} readable, ` +
    `${v.filter((p) => !p.readable).length} unreadable, ${dead} dead → ${path.join(outDir, "latest.json")}`);
}

/* Start the workflow on GitHub and wait for it. Uses the `gh` client this
   environment provides; anywhere else, any gh that is logged in works. */
async function trigger() {
  const remote = execFileSync("git", ["remote", "get-url", "origin"], { encoding: "utf8" }).trim();
  const m = remote.match(/([^/:]+)\/([^/]+?)(?:\.git)?$/);
  if (!m) { console.error(`✗ cannot read owner/repo from ${remote}`); process.exit(1); }
  const repo = `${m[1]}/${m[2]}`;
  const gh = (a) => execFileSync("gh", a, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  let started = Date.now() - 5000, sha = null;
  try {
    gh(["api", "-X", "POST", `repos/${repo}/actions/workflows/recheck.yml/dispatches`, "-f", "ref=main"]);
    console.log(`… started the recheck workflow on ${repo}; waiting for it (usually 3 to 6 minutes)`);
  } catch (e) {
    // Not registered: the file is not on the default branch. Fall back to the
    // run that the last publish to main started, if there is one.
    sha = execFileSync("git", ["rev-parse", "origin/main"], { encoding: "utf8" }).trim();
    started = 0;
    console.log("… GitHub will not start this workflow by hand until it is on the repository's default branch");
    console.log(`  (Settings → General → Default branch → main). Waiting instead for the sweep that publishing ${sha.slice(0, 7)} started.`);
  }
  const runsUrl = sha ? `repos/${repo}/actions/runs?head_sha=${sha}&per_page=20` : `repos/${repo}/actions/workflows/recheck.yml/runs?per_page=5`;
  for (let n = 0; n < 80; n++) {
    await sleep(15000);
    let run;
    try { run = JSON.parse(gh(["api", runsUrl])).workflow_runs.find((r) => r.path.endsWith("recheck.yml") && Date.parse(r.created_at) >= started); } catch (e) { continue; }
    if (!run && sha && n > 3) { console.error("✗ publishing that commit did not start a sweep (it changed no data or tools). Push a data change to main, or make main the default branch."); process.exit(1); }
    if (run && run.status === "completed") {
      if (run.conclusion !== "success") { console.error(`✗ the run ended "${run.conclusion}": ${run.html_url}`); process.exit(1); }
      console.log(`✓ sweep finished (${run.html_url}). Next: node tools/recheck.js`);
      return;
    }
  }
  console.error("✗ gave up waiting after 20 minutes; check the Actions tab");
  process.exit(1);
}

if (args.includes("--trigger")) trigger();
else sweep(opt("--out") || path.join(__dirname, ".sweep"), opt("--only") ? opt("--only").split(",") : null);
