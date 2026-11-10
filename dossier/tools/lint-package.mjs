// Checks the things the kit's checker cannot see. Read-only. Not part of the Skill package.
// Usage: node dossier/tools/lint-package.mjs dossier/incident-dossier dossier/docs/DESIGN.md
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const [, , pkg, designPath] = process.argv;
const problems = [];
const note = (s) => problems.push(s);
const ID = "M-\\d\\d[a-z]?";

// 1. Package contents, including hidden files
const files = [];
const walk = (d) => {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else files.push(p);
  }
};
walk(pkg);
let total = 0;
for (const f of files) {
  const size = statSync(f).size;
  total += size;
  const rel = path.relative(pkg, f).replace(/\\/g, "/");
  console.log(`${String(size).padStart(7)}  ${rel}`);
  if (!rel.endsWith(".md")) note(`not markdown: ${rel}`);
  if (size > 1024 * 1024) note(`over 1 MB: ${rel}`);
  const buf = readFileSync(f);
  if (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) note(`BOM: ${rel}`);
  if (buf.includes(13)) note(`CR line ending: ${rel}`);
  if (buf.toString("utf8").includes("�")) note(`replacement character: ${rel}`);
}
console.log(`files ${files.length}, bytes ${total}`);

const skill = readFileSync(path.join(pkg, "SKILL.md"), "utf8");
const messages = readFileSync(path.join(pkg, "references", "messages.md"), "utf8");

// 2. Frontmatter and size
const fm = skill.match(/^---\r?\n([\s\S]*?)\r?\n---/);
const desc = fm[1].match(/^description: (.*)$/m)[1];
console.log(`description chars ${[...desc].length}`);
if ([...desc].length > 1024) note("description over 1024");
console.log(`SKILL.md lines ${skill.split(/\r?\n/).length}, words ${skill.split(/\s+/).length}`);

// 3. Delegate lines: the checker stops at the first apostrophe, so test the whole line
const runValues = readFileSync(path.join(pkg, "references", "run-values.md"), "utf8");
const definedSlots = new Set([...runValues.matchAll(/`\{([a-z_]+)\}`/g)].map((m) => m[1]));
const delegates = skill.split(/\r?\n/).map((l, i) => [l, i + 1]).filter(([l]) => l.includes("delegate --"));
const targets = {};
for (const [line, n] of delegates) {
  const m = line.match(/^`delegate --target ([a-z-]+) --instruction '(.*)'`$/);
  if (!m) { note(`line ${n}: delegate not alone on its line in the standard form`); continue; }
  targets[m[1]] = (targets[m[1]] ?? 0) + 1;
  const text = m[2];
  if (text.includes("'")) note(`line ${n}: apostrophe inside the instruction`);
  if (/;/.test(text)) note(`line ${n}: semicolon inside the instruction`);
  for (const s of text.matchAll(/\{([a-z_]+)\}/g)) {
    if (!definedSlots.has(s[1])) note(`line ${n}: run value {${s[1]}} is not defined in run-values.md`);
  }
  if (/\bthat (folder|file|path|document)\b|\bfrom before\b|\bprevious step\b|\bthe same (folder|file)\b|\bthose (events?|files?)\b(?! for)/i.test(text)) note(`line ${n}: vague reference in instruction`);
}
console.log(`delegate lines ${delegates.length}`, targets);

// 4. Every run value used anywhere is defined, and every defined one is used
const body = skill.slice(fm[0].length);
const steps = skill.split("# Orchestration")[1];
const usedInSteps = new Set([...steps.matchAll(/\{([a-z_]+)\}/g)].map((m) => m[1]));
for (const s of usedInSteps) {
  if (!definedSlots.has(s)) note(`step text uses {${s}} which is not defined`);
}
for (const s of definedSlots) {
  if (!usedInSteps.has(s)) note(`run value {${s}} is defined but never used`);
}

// 5. Message IDs both ways
const defined = new Set([
  ...[...messages.matchAll(new RegExp(`^\\| (${ID}) \\|`, "gm"))].map((m) => m[1]),
  ...[...messages.matchAll(new RegExp(`\\*\\*(${ID}),`, "g"))].map((m) => m[1]),
]);
// The Stop B replies moved to a reference, so messages sent from there count as sent.
const replies = readFileSync(path.join(pkg, "references", "stop-b-replies.md"), "utf8");
const referenced = new Set([...(body + replies).matchAll(new RegExp(`\\b${ID}\\b`, "g"))].map((m) => m[0]));
for (const m of referenced) if (!defined.has(m)) note(`SKILL.md references undefined ${m}`);
for (const m of defined) if (!referenced.has(m)) note(`${m} is defined but SKILL.md never sends it`);
console.log(`messages defined ${defined.size}, referenced ${referenced.size}`);
for (const m of messages.matchAll(new RegExp(`\\b${ID}\\b`, "g"))) {
  if (!defined.has(m[0])) note(`messages.md mentions undefined ${m[0]}`);
}

// 6. Links
for (const f of files.filter((f) => f.includes("references"))) {
  const rel = path.relative(pkg, f).replace(/\\/g, "/");
  if (!skill.includes(`](${rel})`)) note(`not linked from SKILL.md: ${rel}`);
}

// 7. Message wording against the design, to show any drift on purpose or by accident
if (designPath) {
  // Section 13 lists what Phase 3 restores, so its rows are not the design's wording.
  const design = readFileSync(designPath, "utf8").split("## 13.")[0];
  const rows = (t) => new Map([...t.matchAll(new RegExp(`^\\| (${ID}) \\| (.*?) \\| (.*) \\|$`, "gm"))].map((m) => [m[1], m[3]]));
  const a = rows(design), b = rows(messages);
  console.log("\nmessages that differ from the design:");
  for (const [id, text] of b) {
    if (a.has(id) && a.get(id) !== text) console.log(`  ${id}\n    design:  ${a.get(id)}\n    package: ${text}`);
    if (!a.has(id)) console.log(`  ${id}: only in the package`);
  }
}

console.log(problems.length ? `\nPROBLEMS (${problems.length}):\n- ${problems.join("\n- ")}` : "\nno lint problems");
