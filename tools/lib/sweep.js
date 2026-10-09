/* The latest sweep of official pages, and the baseline it is compared with.

   - The SWEEP is written by tools/sweep.js, normally on GitHub Actions
     (.github/workflows/recheck.yml) because this sandbox cannot reach most
     sites. The workflow pushes it to the `recheck` branch; latestSweep()
     fetches that branch, so any session gets it with no copying.
   - The BASELINE, tools/snapshots.json, holds each entry's signal lines as
     they were when someone last verified the entry (tools/stamp.js writes
     it). An entry whose page still matches its verified baseline needs no
     work this month; one whose page moved is shown as a diff.

   pageState(id) → "dead" | "unreadable" | "changed" | "same" | "new"
     dead        the official URL answers 404 or 410
     unreadable  bot wall, geo-block or empty after the reader fallback
     changed     signal lines differ from the baseline
     same        identical to the baseline
     new         readable, but no baseline yet */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { diff } = require("./page");
const { ROOT } = require("./data");

const SNAP = path.join(ROOT, "tools", "snapshots.json");

function git(args, timeout = 25000) {
  return execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], timeout, maxBuffer: 64 * 1024 * 1024 });
}

/* From a file (--sweep path), else from origin/recheck after a quick fetch.
   A failed fetch falls back to the copy already in the local repo. */
function latestSweep(file) {
  if (file) return JSON.parse(fs.readFileSync(path.resolve(file), "utf8"));
  try { git(["fetch", "-q", "origin", "+recheck:refs/remotes/origin/recheck"]); } catch (e) { /* offline: use what we have */ }
  try { return JSON.parse(git(["show", "origin/recheck:latest.json"])); } catch (e) { return null; }
}

const loadSnapshots = () => (fs.existsSync(SNAP) ? JSON.parse(fs.readFileSync(SNAP, "utf8")) : {});
function saveSnapshots(s) {
  const sorted = {};
  Object.keys(s).sort().forEach((k) => (sorted[k] = s[k]));
  fs.writeFileSync(SNAP, JSON.stringify(sorted, null, 1) + "\n");
}

function makeState(sweep, snaps) {
  return function pageState(item) {
    const p = sweep && sweep.pages && sweep.pages[item.id];
    if (!p) return { state: "none" };
    if (p.status === 404 || p.status === 410) return { state: "dead", page: p };
    if (!p.readable) return { state: "unreadable", page: p };
    const base = snaps[item.id];
    if (!base || base.url !== item.url) return { state: "new", page: p, base };
    const d = diff(base.lines, p.lines);
    return { state: d.added.length || d.removed.length ? "changed" : "same", page: p, base, diff: d };
  };
}

module.exports = { SNAP, latestSweep, loadSnapshots, saveSnapshots, makeState };
