// Builds the Round 1 proposal PDF from PROPOSAL.md with Microsoft Edge, then checks it. Not part of the Skill package.
// Usage: node dossier/tools/build-pdf.mjs dossier/docs/PROPOSAL.md dossier/dist/Dossier-proposal.pdf "Your Name"
//
// The PDF holds, in order: the title, your name, the ten questions with their answers, then the
// third-party block. It leaves out the draft notes above answer 1 and the instruction paragraph
// under "Outside the word count". Recount with count-proposal.mjs before building.
// After building it checks: at most 1 MB (decimal, the stricter reading), text that can be selected,
// and no email address in the document properties. If a check fails, an earlier PDF stays as it was.
import { readFileSync, writeFileSync, mkdtempSync, rmSync, existsSync, copyFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";

const [, , src, out, name] = process.argv;
if (!src || !out || !name || !name.trim()) {
  console.error('usage: node dossier/tools/build-pdf.mjs <PROPOSAL.md> <out.pdf> "<your name>"');
  process.exit(2);
}
const MAX_BYTES = 1_000_000;
const TITLE = "Dossier (incident-dossier)";
const SUBTITLE = "UGREEN Hackathon 2026, Round 1 project proposal";
const fail = (msg) => {
  console.log(`\nPROBLEMS:\n- ${msg}`);
  process.exit(1);
};

const edge = [process.env["ProgramFiles(x86)"], process.env.ProgramFiles]
  .filter(Boolean)
  .map((p) => join(p, "Microsoft", "Edge", "Application", "msedge.exe"))
  .find((p) => existsSync(p));
if (!edge) fail("Microsoft Edge was not found");

const lines = readFileSync(src, "utf8").replace(/^﻿/, "").split(/\r?\n/);
const first = lines.findIndex((l) => /^## 1\.\s/.test(l));
const outside = lines.findIndex((l) => /^## Outside the word count\s*$/.test(l));
const third = lines.findIndex((l, i) => outside >= 0 && i > outside && /^### /.test(l));
if (first < 0) fail('no "## 1." heading');
if (outside < first) fail('no "## Outside the word count" heading after the answers');
if (third < 0) fail('no "###" third-party heading under "Outside the word count"');

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// Keeps hyphenated names such as ug-filesystem on one line. Only text outside tags and links changes.
const keepHyphenated = (html) => {
  let inLink = false;
  return html
    .split(/(<[^>]+>)/)
    .map((part) => {
      if (part.startsWith("<")) {
        if (/^<a\b/i.test(part)) inLink = true;
        else if (/^<\/a>/i.test(part)) inLink = false;
        return part;
      }
      return inLink ? part : part.replace(/[\p{L}\p{N}][\p{L}\p{N}._]*(?:-[\p{L}\p{N}._]+)+/gu, '<span class="nw">$&</span>');
    })
    .join("");
};
const inline = (text) =>
  keepHyphenated(text
    .split(/(`[^`]+`)/)
    .map((part) => {
      if (/^`[^`]+`$/.test(part)) return `<code>${esc(part.slice(1, -1))}</code>`;
      let s = esc(part);
      s = s.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2">$1</a>');
      s = s.replace(/(^|[\s(])(https?:\/\/[^\s<)]*[^\s<).,;:])/g, '$1<a href="$2">$2</a>');
      s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
      s = s.replace(/(^|[^*\w])\*([^*\s][^*]*)\*(?![*\w])/g, "$1<em>$2</em>");
      return s;
    })
    .join(""));

// Paragraphs, simple lists and code blocks. Lines of one paragraph are joined with a space.
function blocks(chunk) {
  const html = [];
  let para = [];
  let list = null;
  let fence = null;
  const flushPara = () => {
    if (para.length) html.push(`<p>${inline(para.join(" "))}</p>`);
    para = [];
  };
  const flushList = () => {
    if (list) html.push(`<${list.tag}>${list.items.map((i) => `<li>${inline(i)}</li>`).join("")}</${list.tag}>`);
    list = null;
  };
  for (const raw of chunk) {
    const line = raw.replace(/\s+$/, "");
    if (fence) {
      if (/^\s*(```|~~~)/.test(line)) {
        html.push(`<pre>${esc(fence.join("\n"))}</pre>`);
        fence = null;
      } else fence.push(raw);
      continue;
    }
    if (/^\s*(```|~~~)/.test(line)) {
      flushPara();
      flushList();
      fence = [];
      continue;
    }
    if (!line.trim()) {
      flushPara();
      flushList();
      continue;
    }
    const li = line.match(/^\s*(?:([-*+])|(\d+)[.)])\s+(.*)$/);
    if (li) {
      flushPara();
      const tag = li[1] ? "ul" : "ol";
      if (!list || list.tag !== tag) {
        flushList();
        list = { tag, items: [] };
      }
      list.items.push(li[3]);
      continue;
    }
    if (list && /^\s{2,}\S/.test(raw)) {
      list.items[list.items.length - 1] += " " + line.trim();
      continue;
    }
    flushList();
    para.push(line.trim());
  }
  if (fence) fail("a code block is not closed");
  flushPara();
  flushList();
  return html.join("\n");
}

// The ten answers: each "## N. question" heading and the text under it, up to "Outside the word count".
const qs = [];
for (const line of lines.slice(first, outside)) {
  const h = line.match(/^## (\d+)\.\s+(.*)$/);
  if (h) {
    qs.push({ n: Number(h[1]), q: h[2].trim(), body: [] });
    continue;
  }
  if (/^#{1,6}\s/.test(line)) fail(`a heading between the answers: ${line}`);
  qs[qs.length - 1].body.push(line);
}
const order = qs.map((q) => q.n).join(",");
if (order !== "1,2,3,4,5,6,7,8,9,10") fail(`answers found in this order: ${order}, expected 1 to 10`);
for (const q of qs) if (!q.body.some((l) => /[\p{L}\p{N}]/u.test(l))) fail(`answer ${q.n} is empty`);

// The third-party block: from the first "###" heading under "Outside the word count" to the end.
// The instruction paragraph between that heading and the "###" heading is left out.
const thirdHtml = [];
let chunk = [];
const flushChunk = () => {
  if (chunk.length) thirdHtml.push(blocks(chunk));
  chunk = [];
};
for (const line of lines.slice(third)) {
  const h = line.match(/^#{2,6}\s+(.*)$/);
  if (h) {
    flushChunk();
    thirdHtml.push(`<h2>${inline(h[1].trim())}</h2>`);
    continue;
  }
  chunk.push(line);
}
flushChunk();

const doc = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(TITLE)}</title>
<style>
@page { size: Letter; margin: 0.7in 0.8in; }
* { box-sizing: border-box; }
body { margin: 0; color: #1b1b1b; font: 10.5pt/1.45 "Segoe UI", Calibri, Arial, sans-serif; }
header { border-bottom: 1.25pt solid #1b1b1b; padding-bottom: 7pt; margin-bottom: 6pt; }
h1 { margin: 0; font-size: 19pt; line-height: 1.2; }
header p { margin: 3pt 0 0; }
.name { font-size: 11.5pt; font-weight: 600; }
.sub { font-size: 9.5pt; color: #555; }
section { break-inside: avoid; }
h2 { display: grid; grid-template-columns: 1.8em 1fr; margin: 11pt 0 3pt; font-size: 10.5pt; line-height: 1.35; break-after: avoid; }
section.q > :not(h2) { margin-left: 1.8em; }
p, li { margin: 0 0 5pt; orphans: 3; widows: 3; }
ul, ol { margin: 0 0 5pt; padding-left: 1.4em; }
code, pre { font-family: Consolas, "Cascadia Mono", monospace; font-size: 0.92em; }
.nw, code { white-space: nowrap; }
pre { white-space: pre-wrap; margin: 0 0 5pt; }
a { color: inherit; text-decoration: none; }
.third { margin-top: 16pt; padding-top: 8pt; border-top: 0.75pt solid #9a9a9a; font-size: 9pt; color: #333; break-inside: auto; }
.third h2 { display: block; font-size: 9.5pt; margin: 0 0 3pt; }
</style>
</head>
<body>
<header>
<h1>${esc(TITLE)}</h1>
<p class="name">${esc(name.trim())}</p>
<p class="sub">${esc(SUBTITLE)}</p>
</header>
${qs.map((q) => `<section class="q">\n<h2><span>${q.n}.</span><span>${inline(q.q)}</span></h2>\n${blocks(q.body)}\n</section>`).join("\n")}
<section class="third">
${thirdHtml.join("\n")}
</section>
</body>
</html>
`;

const tmp = mkdtempSync(join(tmpdir(), "dossier-pdf-"));
const cleanup = () => {
  try {
    rmSync(tmp, { recursive: true, force: true });
  } catch {}
};
const page = join(tmp, "proposal.html");
const tmpPdf = join(tmp, "proposal.pdf");
writeFileSync(page, doc, "utf8");
try {
  execFileSync(
    edge,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-extensions",
      "--disable-sync",
      "--no-pdf-header-footer",
      "--print-to-pdf-no-header",
      `--user-data-dir=${join(tmp, "profile")}`,
      `--print-to-pdf=${tmpPdf}`,
      pathToFileURL(page).href,
    ],
    { stdio: "pipe", timeout: 120_000 },
  );
} catch (e) {
  cleanup();
  fail(`Edge did not finish: ${String(e.message).split("\n")[0]}`);
}
if (!existsSync(tmpPdf)) {
  cleanup();
  fail("Edge wrote no PDF");
}

const bytes = readFileSync(tmpPdf);
const raw = bytes.toString("latin1");
const pages = (raw.match(/\/Type\s*\/Page(?![s\w])/g) || []).length;
const textFonts = (raw.match(/\/ToUnicode/g) || []).length;
const decodeHex = (hex) => {
  const b = Buffer.from(hex, "hex");
  if (b[0] === 0xfe && b[1] === 0xff) {
    let s = "";
    for (let i = 2; i + 1 < b.length; i += 2) s += String.fromCharCode((b[i] << 8) | b[i + 1]);
    return s;
  }
  return b.toString("latin1");
};
const meta = {};
for (const key of ["Title", "Author", "Subject", "Keywords", "Creator", "Producer"]) {
  const lit = raw.match(new RegExp(`/${key}\\s*\\(((?:\\\\.|[^\\\\)])*)\\)`));
  const hex = raw.match(new RegExp(`/${key}\\s*<([0-9A-Fa-f\\s]+)>`));
  if (lit) meta[key] = lit[1].replace(/\\(.)/g, "$1");
  else if (hex) meta[key] = decodeHex(hex[1].replace(/\s/g, ""));
}
const xmp = raw.match(/<x:xmpmeta[\s\S]*?<\/x:xmpmeta>/);
const emailRe = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;

const problems = [];
if (bytes.length > MAX_BYTES) problems.push(`the PDF is ${bytes.length} bytes, over ${MAX_BYTES}`);
if (!pages) problems.push("the PDF has no pages");
if (!textFonts) problems.push("the PDF has no selectable text");
for (const [k, v] of Object.entries(meta)) if (emailRe.test(v)) problems.push(`an email address in the ${k} property`);
if (xmp && emailRe.test(xmp[0])) problems.push("an email address in the XMP metadata");
if (problems.length) {
  cleanup();
  fail(problems.join("\n- "));
}

copyFileSync(tmpPdf, resolve(out));
cleanup();
console.log(`pdf      ${resolve(out)}`);
console.log(`bytes    ${bytes.length} (limit ${MAX_BYTES})`);
console.log(`pages    ${pages}`);
console.log(`answers  ${qs.length}, then the third-party block`);
for (const [k, v] of Object.entries(meta)) console.log(`${k.toLowerCase().padEnd(8)} ${v}`);
console.log("\nno pdf problems");
