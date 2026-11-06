// Checks the things the kit's checker cannot see. Read-only.
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const [, , pkg, designPath] = process.argv;
const problems = [];
const note = (s) => problems.push(s);

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
  if (buf.toString("utf8").includes("�")) note(`replacement character: ${rel}`);
}
console.log(`files ${files.length}, bytes ${total}`);

const skill = readFileSync(path.join(pkg, "SKILL.md"), "utf8");
const messages = readFileSync(path.join(pkg, "references", "messages.md"), "utf8");

// 2. Frontmatter
const fm = skill.match(/^---\r?\n([\s\S]*?)\r?\n---/);
const desc = fm[1].match(/^description: (.*)$/m)[1];
console.log(`description chars ${[...desc].length}`);
if ([...desc].length > 1024) note("description over 1024");
console.log(`SKILL.md lines ${skill.split(/\r?\n/).length}`);

// 3. Delegate lines: the checker stops at the first apostrophe, so test the whole line
const definedSlots = new Set([...skill.split("# Generation-time capability evidence")[0].matchAll(/`\{([a-z_]+)\}`/g)].map((m) => m[1]));
const delegates = skill.split(/\r?\n/).map((l, i) => [l, i + 1]).filter(([l]) => l.includes("delegate --"));
const targets = {};
for (const [line, n] of delegates) {
  const m = line.match(/^`delegate --target ([a-z-]+) --instruction '(.*)'`$/);
  if (!m) { note(`line ${n}: delegate not alone on its line in the standard form`); continue; }
  targets[m[1]] = (targets[m[1]] ?? 0) + 1;
  const text = m[2];
  if (text.includes("'")) note(`line ${n}: apostrophe inside the instruction`);
  for (const s of text.matchAll(/\{([a-z_]+)\}/g)) {
    if (!definedSlots.has(s[1])) note(`line ${n}: run value {${s[1]}} is not defined under Required input`);
  }
  if (/\bthat (folder|file|path|document)\b|\bfrom before\b|\bprevious step\b|\bthe same (folder|file)\b/i.test(text)) note(`line ${n}: vague reference in instruction`);
}
console.log(`delegate lines ${delegates.length}`, targets);

// 4. Every run value used anywhere is defined, and every defined one is used
const body = skill.slice(fm[0].length);
const usedInSteps = new Set([...skill.split("# Orchestration")[1].matchAll(/\{([a-z_]+)\}/g)].map((m) => m[1]));
for (const s of usedInSteps) {
  if (!definedSlots.has(s) && !["n", "item_slug", "k"].includes(s)) note(`step text uses {${s}} which is not defined`);
}
for (const s of definedSlots) {
  if (!usedInSteps.has(s) && s !== "application_name") note(`run value {${s}} is defined but never used in the steps`);
}

// 5. Message IDs both ways
const defined = new Set([...messages.matchAll(/^\| (M\d+) \|/gm)].map((m) => m[1]));
const referenced = new Set([...body.matchAll(/\bM\d{3}\b/g)].map((m) => m[0]));
for (const m of referenced) if (!defined.has(m)) note(`SKILL.md references undefined ${m}`);
for (const m of defined) if (!referenced.has(m)) note(`${m} is defined but SKILL.md never sends it`);
console.log(`messages defined ${defined.size}, referenced ${referenced.size}`);

// 6. Links
for (const f of files.filter((f) => f.includes("references"))) {
  const rel = path.relative(pkg, f).replace(/\\/g, "/");
  if (!skill.includes(`](${rel})`)) note(`not linked from SKILL.md: ${rel}`);
}

// 7. Message wording against the design, to show any drift on purpose or by accident
if (designPath) {
  const design = readFileSync(designPath, "utf8");
  const rows = (t) => new Map([...t.matchAll(/^\| (M\d+) \| (.*?) \| (.*) \|$/gm)].map((m) => [m[1], m[3]]));
  const a = rows(design), b = rows(messages);
  console.log("\nmessages that differ from docs/DESIGN.md:");
  for (const [id, text] of b) {
    if (a.has(id) && a.get(id) !== text) console.log(`  ${id}\n    design:  ${a.get(id)}\n    package: ${text}`);
  }
}

console.log(problems.length ? `\nPROBLEMS (${problems.length}):\n- ${problems.join("\n- ")}` : "\nno lint problems");
