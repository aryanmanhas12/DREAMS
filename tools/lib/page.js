/* Read one official page and keep only the lines that matter to an entry.

   A monthly recheck used to mean reading 190 pages by eye. Most of them had
   not changed. This module turns a page into a short list of "signal" lines
   (anything that states a deadline, an amount or who may apply), so that a
   later sweep can say "this page is the same as when you verified the entry"
   and only the pages that moved need a human.

   fetchPage(url)  → { status, final, src, blocked, chars, title, text, error }
   signals(text)   → the signal lines, in page order
   diff(a, b)      → { added, removed } between two signal lists

   Plain Node 18+, no dependencies: it runs on a GitHub Actions runner, where
   the internet is open, and anywhere else that can reach the sites. */

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36";
const BLOCK = /Just a moment|Attention Required|Access Denied|Client Challenge|Request unsuccessful|Incapsula|enable JavaScript and cookies|Human Verification|Security Check|Vercel Security Checkpoint|RateLimitTriggeredError/i;

const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—", rsquo: "’", lsquo: "‘",
  rdquo: "”", ldquo: "“", hellip: "…", eacute: "é", egrave: "è", uuml: "ü", ouml: "ö", auml: "ä", euro: "€", pound: "£",
  rupee: "₹", middot: "·", bull: "•", copy: "©", reg: "®", deg: "°", times: "×", shy: "" };
function decode(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === "#") { const n = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10); return n ? String.fromCodePoint(n) : ""; }
    return ENT[e.toLowerCase()] !== undefined ? ENT[e.toLowerCase()] : m;
  });
}

function htmlToText(html) {
  let t = html.replace(/<(script|style|noscript|svg|template|head)\b[\s\S]*?<\/\1>/gi, " ");
  t = t.replace(/<(br|p|li|h[1-6]|div|tr|td|th|dt|dd|section|article|option|header|footer|table|ul|ol|blockquote)\b[^>]*>/gi, "\n");
  return decode(t.replace(/<[^>]+>/g, " "));
}

async function get(url, headers, ms) {
  const res = await fetch(url, { headers, redirect: "follow", signal: AbortSignal.timeout(ms) });
  const type = res.headers.get("content-type") || "";
  const body = /pdf|octet-stream|image\//i.test(type) ? "" : await res.text();
  return { status: res.status, final: res.url, type, body };
}

/* Through r.jina.ai, which renders JavaScript pages and reads PDFs. It limits
   requests per IP, so callers pace it (see tools/sweep.js). */
async function viaReader(url, ms = 40000) {
  const r = await get("https://r.jina.ai/" + url, { "X-Return-Format": "text", "X-Timeout": "30" }, ms);
  if (r.status === 429 || /RateLimitTriggeredError/.test(r.body.slice(0, 400))) return { limited: true, text: "" };
  return { limited: false, text: r.status === 200 && !BLOCK.test(r.body.slice(0, 3000)) ? r.body : "" };
}

async function fetchPage(url, { reader = false } = {}) {
  const out = { status: 0, final: url, src: "html", blocked: false, chars: 0, title: "", text: "", error: "" };
  try {
    const r = await get(url, { "user-agent": UA, "accept-language": "en-GB,en;q=0.9", accept: "text/html,application/xhtml+xml,*/*" }, 20000);
    out.status = r.status; out.final = r.final;
    const m = r.body.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    if (m) out.title = decode(m[1]).replace(/\s+/g, " ").trim().slice(0, 100);
    out.blocked = BLOCK.test(r.body.slice(0, 8000)) || ((r.status === 403 || r.status === 429 || r.status === 503) && r.body.length < 20000);
    if (!out.blocked && r.body) out.text = htmlToText(r.body);
    if (/pdf/i.test(r.type) || /\.pdf($|\?)/i.test(url)) out.src = "pdf";
  } catch (e) { out.error = e.name === "TimeoutError" ? "timeout" : (e.cause && e.cause.code) || e.message; }
  out.chars = out.text.replace(/\s+/g, " ").length;
  out.needsReader = out.src === "pdf" || out.blocked || out.chars < 1500;
  if (reader && out.needsReader) {
    try {
      const j = await viaReader(url);
      out.limited = j.limited;
      if (j.text.length > out.text.length) { out.text = j.text; out.src = "reader"; out.chars = j.text.replace(/\s+/g, " ").length; }
    } catch (e) { /* keep what the direct read gave */ }
  }
  return out;
}

/* ── which lines are signal ──
   A line counts if it states a date together with application language
   ("closes 15 January 2027"), names a deadline outright, states an amount,
   or says who may apply. News headlines with a year in them ("INSA fellows
   2026") carry no application language and stay out, which keeps busy
   homepages from looking changed every month. */
const MON = "(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|sept?(?:ember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)";
const DATE = new RegExp(`\\b20[2-3]\\d\\b|\\b\\d{1,2}(?:st|nd|rd|th)?\\s+${MON}\\b|\\b${MON}\\.?\\s+\\d{1,2}\\b|\\b\\d{1,2}[./-]\\d{1,2}[./-]20\\d{2}\\b`, "i");
const APP = /deadline|clos(?:e|es|ed|ing)\b|last date|apply|applica|admission|intake|registr|submi|call for|nominat|\bopens?\b|\bopened\b|round|cycle|starts?\b|start date|interview|selection|results?\b|exam(?:ination)?s?\b|due\b|until\b|cohort|session/i;
const HARD = /deadline|last date|closing date|applications? (?:are |is )?(?:now )?(?:open|closed)|call (?:is )?(?:open|closed)/i;
const MONEY = /(?:stipend|allowance|salary|tuition|fees?\b|waiver|per month|a month|monthly|per year|a year|annual|grant of|loan|scholarship (?:of|worth|amount))/i;
const AMOUNT = /(?:€|£|\$|₹|¥|EUR|USD|GBP|CHF|AUD|NZD|CAD|SGD|HK\$|NT\$|INR|Rs\.?|lakh|crore)\s?\d|\d[\d,.]*\s?(?:€|EUR|USD|GBP|CHF|AUD|lakh|crore)/i;
const ELIG = /MBBS|M\.B\.B\.S|MBChB|medical (?:degree|graduates?|students?|doctors?)|bachelor of medicine|eligib|who can apply|nationals? of|citizens? of|age limit|years of age|years old|under (?:the age of )?\d\d|not (?:be )?eligible/i;
const NOISE = /©|copyright|all rights reserved|cookie|privacy (?:policy|notice)|last (?:updated|modified)|page updated|visitors?\s*:|skip to (?:main )?content|subscribe to|sign up for (?:our )?newsletter/i;

function signals(text, max = 40) {
  const seen = new Set(), out = [];
  for (const raw of String(text || "").split("\n")) {
    const l = raw.replace(/\s+/g, " ").trim();
    if (l.length < 15 || l.length > 420 || NOISE.test(l)) continue;
    const keep = (DATE.test(l) && APP.test(l)) || HARD.test(l) || (MONEY.test(l) && AMOUNT.test(l)) || ELIG.test(l);
    if (!keep) continue;
    const k = norm(l);
    if (seen.has(k)) continue;
    seen.add(k); out.push(l.slice(0, 300));
    if (out.length >= max) break;
  }
  return out;
}

const norm = (l) => l.toLowerCase().replace(/[\s ]+/g, " ").replace(/[.,;:!·•\s]+$/, "").trim();
const hasDates = (lines) => lines.some((l) => DATE.test(l) && (APP.test(l) || HARD.test(l)));

function diff(before, after) {
  const a = new Set((before || []).map(norm)), b = new Set((after || []).map(norm));
  return {
    added: (after || []).filter((l) => !a.has(norm(l))),
    removed: (before || []).filter((l) => !b.has(norm(l)))
  };
}

module.exports = { fetchPage, viaReader, signals, diff, norm, hasDates, htmlToText };
