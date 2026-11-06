# Notes

Running list of anything in the kit or rules that was unclear, broken or contradictory, and what was done about it. Updated each phase.

## Kit: template and docs against its own checker

All tested by running the kit's checker on throwaway packages in the session scratchpad. Line numbers are in `check-lib.mjs` unless stated.

| Issue | Evidence | What we do |
|---|---|---|
| Template heading `# Capability evidence` with `- cli -> agent` fails | `CAPABILITY_EVIDENCE_MISSING`, lines 553 and 560. The kit's `SKILL.md` line 27 and template lines 14 and 16 both specify the failing form | Use `# Generation-time capability evidence` and ``- `cli` → `agent` `` with the Unicode arrow and backticks. No text after the agent |
| Template heading `# Expert orchestration` fails | `SKILL_REQUIRED_SECTION_MISSING`, line 389 | Use `# Orchestration` |
| Starter Kit recommends a root `README.md`; the checker rejects it | `RESOURCE_UNSUPPORTED`, lines 318-330. The rules also allow only SKILL.md and references | No README. Install, removal and test docs go in `references/setup-and-testing.md` |
| Exit code 0 does not mean clean | `check-skill.mjs` returns 0 for `static-pass-needs-target-validation`, which means warnings remain | Phase 2 stops only at status `static-pass` with 0 warnings |
| Any line containing `delegate --` is parsed as a real command | Line 496. Quoting the delegate rule in prose gives errors | State the rule in words |
| Delegate checks read SKILL.md only | Lines 538 and 655. A bad delegate in a reference passes | Keep every delegate line and the five state names in SKILL.md |
| Negated safety wording trips the checker | "Never bypass approval" gives `SECURITY_GATEWAY_BYPASS`, line 45 | Use positive wording: "The NAS approval flow applies to every write." |
| Prose words trip the file-access check | "cat word", "cp a", "rm old" (line 42). `/volume1`, `/mnt`, `/share` at the start of a line or after a space or quote (line 44). In backticks those paths pass. Both apply to references too (line 629) | Write "read the raw text". No sample NAS paths outside delegate lines |
| Other trigger words | "expert id", "request id" (line 626). "TODO" or "TBD" even in a rule (line 395). A `bash` fence (line 41) | Avoid them. Use plain or `text` fences |
| `<...>` in an instruction gives a warning | `DELEGATE_DYNAMIC_VALUE_UNRESOLVED`, line 50 | Use `{name}` slots, and define them under Required input as run values. The checker simply does not look at `{}`, so the written substitution rule does the real work |
| A ` --word` inside an instruction is an error | `DELEGATE_FORMAT_INVALID`, line 507 | Ask in words, never with flags |
| Shell characters in an instruction are an error | `DELEGATE_FORMAT_INVALID`, line 501: a pipe, `<` or `>` with a space on each side, two pipes, `&&`, `$(`, or a pair of backticks | Describe formats in words. Put literal markers such as "Packet record v1" in double quotes, which pass |
| An apostrophe inside an instruction passes the checker but would end the quoted string | Lines 506 and 524-525. `'Read Sam's file.'` gets `static-pass` but fails in a real shell | No apostrophes in the fixed wording of an instruction (write "do not"). Write apostrophes in inserted values as `'"'"'` |
| Exact phrases are required in SKILL.md | "no results" or "empty result" (line 52, tested at line 545). "real ... result" on one line, at most 40 characters apart (line 542). "when" in the description (line 46). A phrase only in a reference still warns | Use those words literally, in SKILL.md |
| Link targets must be exact | Target `references/name.md`, with an optional `#anchor` (line 450). Link text is free. `./references/name.md` or a bare path gives `RESOURCE_UNREFERENCED` | Use `[name](references/name.md)` |

## Kit: other

- The English catalog has words stripped out by translation (for example "Read NAS filefiledirectory"). Action names, parameters, enums and examples survive. `returnSummary` is partly damaged. We rely only on what survives.
- Every action marks `permissions`, `prerequisites` and `errorCodes` as `knowledgeStatus: unknown`, and `outputStatus` as unknown. The design treats all of it as unverified.
- `tag-add` has no name parameter, and its example passes the name in `tag-id`. `tag-add-file` uses `tag-id` with an id. Left to file-agent, with one delegation for all tag steps.
- The reference files are one or two short paragraphs each. The real contract lives in `check-lib.mjs` and the catalog.
- The checker's Chinese-language diagnostic text appears even in the English kit. Codes are English strings fixed in `check-lib.mjs` for kit 0.7.3. No kit file promises they stay the same in later versions.
- The checker validates a folder only, not a ZIP.
- The kit has no feasibility tool. Its feasibility question tells the assistant to check the idea against the catalog, which we did with independent reviewers.

## Rules and sources

- **Automated fetch blocked.** Devpost returns 403 to the fetch tool. All pages were read in the built-in browser instead.
- **Technical Quality wording differs.** The Overview page asks for repeat-use cases, managed versions, and docs for install, setup, removal and testing. The Official Rules' wording is narrower. The rules say they prevail. Plan: `references/setup-and-testing.md` covers install, setup, removal and testing, and states the kit and catalog versions.
- **The 1 MB PDF limit** appears on the Overview page, not in the Official Rules. The PDF is not written yet, and it must stay under 1 MB.
- **ZIP layout is not stated.** No source says whether SKILL.md sits at the ZIP root or inside the folder. The Starter Kit talks of generating the skill folder and the checker requires folder name = skill name, so the plan is to zip the folder. Worth asking UGREEN.
- **Personal data in the package.** The brief's disclosure names Sid. The package must not contain personal data, so the package will say "the entrant", and the name goes on the form and the PDF.
- **AI disclosure must list every AI tool and use.** The brief's planned sentence ("Sid wrote the idea, the workflow design and the proposal answers") stops being accurate after this review reworked the workflow. Reword it in Phase 3 and re-check in Phase 4.
- **FAQ advice on AI.** It recommends, without requiring, skipping AI for the project name, the text description, the PDF answers and the core idea.
- **SkillHub standards apply to the Skill's wording.** No superlatives or "official" claims (2.2), description must match behavior (2.4), minimum scope with notice and consent for personal data (10.1), not directed at minors (10.2), stricter review for automated recruitment or credit decisions (9.3). Packet helps only the applicant and makes no decision about any person.
- **Competitor claim is unsourced.** The brief says none of the existing tools work on a private archive. No phase researches this. Phase 4 should name the tools actually checked and say "the tools I checked".

## Phase 2

- **The package is build-only for now.** It has no mode input, step 3, log mode, `ug-filemgr` line, disclosures or setup docs. To keep it from promising what it cannot do yet, six messages leave out sentences about log mode and the consistency check, and step 4.7 writes `Consistency: not run`. `docs/DESIGN.md` section 9 lists exactly what to restore.
- **Step numbers skip from 2 to 4 on purpose,** so references stay stable when step 3 arrives.
- **The kit's "Skill is complete" upload line is withheld.** The kit says not to show it for a partly finished Skill.
- **Local lint.** The checker cannot see apostrophes inside instructions, undefined run values or unreachable messages. `tools/lint-package.mjs` checks those, plus BOMs, file types and links. Run it with the package path and `docs/DESIGN.md`. It is not part of the ZIP.

To handle in Phase 3, from choices made in Phase 2:

- M507 lets the user build in another folder when the documents root cannot be written. Log mode looks under `_packets` in the root, so it must also accept a packet folder path from the user.
- A file copied from a partly filled item (V above 0 and below R) must count as a ready document for steps 3.1 to 3.5, or it goes into the packet unchecked.
- Step 2.5's zero-files stop must also skip step 3.

## Machine

- Skills directory: `~\.claude\skills`. Kit installed at `uliya-skill-kit`. The zip and extracted copy are in `_kit-download`.
- `py` reports Python 3.14.0, not 3.13. Node is v26.8.2.
- Windows PowerShell 5.1 traps: `Set-Content -Encoding utf8` writes a BOM, which breaks the frontmatter match. `Compress-Archive` writes backslashes in ZIP entries (tested), and a Linux extractor may read those as one long file name. Plan: write package files with the file tools, build the ZIP with Python `zipfile` and forward slashes, then extract it and rerun the checker.
- The project is in OneDrive. List hidden files before checking or zipping, because a stray `desktop.ini` is an error.

## Questions worth sending UGREEN

Technical support: `nas-support@ugreen.com` (from the Resources page). These are not sent. Sending is your call.

1. Where do the models behind `ug-document` and `ug-knowledge` run, and can a Skill tell or require local-only?
2. Which formats do `qa` and `extract` read (`.md`, `.txt`, `.docx`, images, scanned PDF)?
3. What does `save-text` do on an existing file name, and does it keep `filename-hint` exactly?
4. Does each `cpmv` need its own approval, and how does a delegation resume after `waiting_approval`?
5. Does the ZIP hold the skill folder, or SKILL.md at its root?
6. Can a Finalist change the package between Nov 22 and Nov 30 after finding a problem on the testing day?
