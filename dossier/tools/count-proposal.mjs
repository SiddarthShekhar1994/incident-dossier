// Counts the words in the ten Round 1 answers. Read-only. Not part of the Skill package.
// Usage: node dossier/tools/count-proposal.mjs dossier/docs/PROPOSAL.md
//
// An answer is the text under a heading "## N. question" for N = 1 to 10, up to the next heading.
// Headings, questions and everything outside the ten answers are not counted.
// A word is a run of non-space characters holding a letter or digit, as word processors count.
// The strict count also splits on hyphens and slashes, as some online counters do.
import { readFileSync } from "node:fs";

const [, , file] = process.argv;
if (!file) {
  console.error("usage: node dossier/tools/count-proposal.mjs <proposal.md>");
  process.exit(2);
}
const LIMIT = 500;
const problems = [];
const note = (s) => problems.push(s);

const answers = [];
let current = null;
let fence = false;
for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
  if (/^\s*(```|~~~)/.test(line)) fence = !fence;
  const heading = !fence && line.match(/^(#{1,6})\s+(.*)$/);
  if (heading) {
    const num = heading[1].length === 2 && heading[2].match(/^(\d+)\.\s/);
    current = num ? { n: Number(num[1]), lines: [] } : null;
    if (current) answers.push(current);
    continue;
  }
  if (current) current.lines.push(line);
}

const order = answers.map((a) => a.n).join(",");
if (order !== "1,2,3,4,5,6,7,8,9,10") note(`answers found in this order: ${order || "none"}, expected 1 to 10`);

const hasWord = (t) => /[\p{L}\p{N}]/u.test(t);
let total = 0;
let strictTotal = 0;
for (const a of answers) {
  // Leading list markers such as "1." or "-" are layout, not words.
  const text = a.lines.map((l) => l.replace(/^\s*(?:>\s*)*(?:[-*+]|\d+[.)])\s+/, "")).join("\n");
  const tokens = text.split(/\s+/).filter(hasWord);
  const strict = tokens.flatMap((t) => t.split(/[-/‐-―]+/)).filter(hasWord).length;
  total += tokens.length;
  strictTotal += strict;
  console.log(`answer ${String(a.n).padStart(2)}: ${String(tokens.length).padStart(3)} words (strict ${strict})`);
  if (!tokens.length) note(`answer ${a.n} is empty`);
  if (a.n === 1) {
    const sentences = (text.trim().match(/[.!?]+(?=\s|$)/g) || []).length;
    if (sentences !== 1) note(`answer 1 has ${sentences} sentences, and the question asks for one`);
  }
}
console.log(`total: ${total} of ${LIMIT} (strict ${strictTotal})`);
if (total > LIMIT) note(`over the limit by ${total - LIMIT} words`);
if (strictTotal > LIMIT) console.log(`note: the strict count is over ${LIMIT}, so a counter that splits hyphens would reject it`);

console.log(problems.length ? `\nPROBLEMS (${problems.length}):\n- ${problems.join("\n- ")}` : "\nno count problems");
process.exit(problems.length ? 1 : 0);
