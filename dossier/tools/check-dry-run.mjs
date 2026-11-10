// Checks docs/DRY-RUN.md against the package, so the dry run cannot drift from the Skill. Read-only.
// Usage: node dossier/tools/check-dry-run.mjs dossier/incident-dossier dossier/docs/DRY-RUN.md
import { readFileSync } from "node:fs";
import path from "node:path";

const [, , pkg, dryRunPath] = process.argv;
const skill = readFileSync(path.join(pkg, "SKILL.md"), "utf8");
const messages = readFileSync(path.join(pkg, "references", "messages.md"), "utf8");
const dry = readFileSync(dryRunPath, "utf8");
const problems = [];

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Turns text with {slots}, including nested ones, into a pattern where each slot matches anything.
// A slot that opens with "If " is a conditional part of a message, so it and the space before it may be absent.
const toPattern = (text) => {
  let out = "", depth = 0, literal = "";
  const chars = [...text];
  chars.forEach((c, i) => {
    if (c === "{") {
      if (depth === 0) {
        const conditional = chars.slice(i + 1, i + 4).join("") === "If ";
        if (conditional && literal.endsWith(" ")) {
          out += escape(literal.slice(0, -1)) + "(?: .*)?";
        } else {
          out += escape(literal) + ".*";
        }
        literal = "";
      }
      depth += 1;
    } else if (c === "}") {
      depth -= 1;
    } else if (depth === 0) {
      literal += c;
    }
  });
  return new RegExp(`^${out}${escape(literal)}$`);
};

// 1. Every delegation in the dry run matches a delegation in SKILL.md
const skillDelegates = skill.split(/\r?\n/).filter((l) => l.startsWith("`delegate --"));
const patterns = skillDelegates.map((l) => ({ line: l, re: toPattern(l) }));
const dryDelegates = dry.split(/\r?\n/).filter((l) => l.startsWith("`delegate --"));
const used = new Set();
for (const line of dryDelegates) {
  const hit = patterns.find((p) => p.re.test(line));
  if (!hit) problems.push(`delegation matches nothing in SKILL.md:\n  ${line.slice(0, 140)}`);
  else used.add(hit.line);
}
const notWalked = skillDelegates.filter((l) => !used.has(l));
console.log(`delegations in dry run ${dryDelegates.length}, forms in SKILL.md ${skillDelegates.length}, forms walked ${used.size}`);
for (const l of notWalked) console.log(`  not walked: ${l.slice(0, 110)}`);

// 2. Every message shown with its id matches its wording in messages.md
const rows = new Map([...messages.matchAll(/^\| (M-\d\d[a-z]?) \| .*? \| (.*) \|$/gm)].map((m) => [m[1], m[2]]));
const readback = messages.match(/\*\*M-01, read-back:\*\* (.*)$/m)[1];
rows.set("M-01", readback);
let checked = 0;
for (const m of dry.matchAll(/^\*\*(M-\d\d[a-z]?)(?:, [^:*]*)?:\*\* (.+)$/gm)) {
  const [, id, text] = m;
  if (!rows.has(id)) continue;
  checked += 1;
  if (!toPattern(rows.get(id)).test(text)) problems.push(`${id} differs from messages.md:\n  dry run:  ${text}\n  package:  ${rows.get(id)}`);
}
console.log(`messages checked ${checked}`);

// 3. Every line of the first message appears in the dry run
const m00 = messages.split("**M-00, first message:**")[1].split("If step 0.1")[0];
const dryQuotes = dry.split(/\r?\n/).filter((l) => l.startsWith("> "));
for (const line of m00.split(/\r?\n/).filter((l) => l.startsWith("> "))) {
  const re = toPattern(line);
  if (!dryQuotes.some((q) => re.test(q))) problems.push(`M-00 line not found:\n  ${line}`);
}

// 4. A name that must never reach a message or a file
const fenced = [...dry.matchAll(/```text\r?\n([\s\S]*?)```/g)].map((m) => m[1]).join("\n");
const quoted = dryQuotes.join("\n");
for (const [label, text] of [["a saved file", fenced], ["a message", quoted]]) {
  if (text.includes("Alex Testperson")) problems.push(`the stranger's near match or a withheld name appears in ${label}`);
}

console.log(problems.length ? `\nPROBLEMS (${problems.length}):\n- ${problems.join("\n- ")}` : "\nno dry run problems");
