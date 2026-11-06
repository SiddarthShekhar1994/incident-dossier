# Dossier notes

Running list of anything in the kit or rules that was unclear, broken or contradictory, and what was done about it. Dossier only. The `NOTES.md` one folder up belongs to Packet.

Everything read on 2026-11-06. Devpost blocks the fetch tool, so its pages were read in the built-in browser.

## Kit

| Issue | Evidence | What we do |
|---|---|---|
| **Kit 0.7.3 is out of date.** UGREEN says 0.7.6 restores the Chinese text in the English catalog and adds sample outputs, and that it is distributed through SkillHub. Your brief and the Starter Kit both link 0.7.3 | [Technical FAQ, Nov 5](https://community.ugreen.com/nas/pagesD/circle/post?id=1591), Q1. Fresh download of the 0.7.3 link is byte-identical to the installed copy (SHA-256 `CF557E5A022E4297892F39768132855154232EFDEDEB726B2845450CCD70E1B3`, 26 files). Anonymous SkillHub searches for `uliya`, `uliya-skill-kit`, `UGOS Skill` and `create a uliya skill` give 0 results | Design works from 0.7.3 plus the FAQ. When 0.7.6 is here: recheck all actions, `event-evidence`'s return, `cameras` status labels and the monitor boundary, then retest every form below. Restored fields may need translating. If it is not here by Nov 10, stay on 0.7.3 and say so in Q8 and Q10 |
| English catalog text is damaged. `returnSummary` survives in fragments, and every action has unknown permissions, prerequisites, error codes and output status | `data/capability-catalog.json` | Rely only on what survives, and require labelled values in each delegation |
| Brief says `event-evidence` returns references with a TTL. The catalog does not say so | `returnSummary` survives only as a fragment. "TTL" appears only as the input `ttl-sec`. "reference" and "expire" have 0 hits | Write expiry only as returned |
| The kit's template headings and evidence form fail its own checker | Tested today with a throwaway package: `CAPABILITY_EVIDENCE_MISSING`, `SKILL_REQUIRED_SECTION_MISSING` | Use the forms in DESIGN section 11 |
| Exit code 0 does not mean clean. Several other checker traps | Packet's `NOTES.md` table, lines 11 to 25, proven on 0.7.3. A throwaway package with the design's fixed wording gave `static-pass` with 0 warnings | Stop only at `static-pass` with 0 warnings. Follow that table. Retest on 0.7.6 |
| The checker never validates action parameters | From the catalog, `check-lib.mjs` reads only the version, CLI names and agents. It checks delegate lines, evidence lines, references, security patterns and format, never an action name or parameter | The brief's "drop update mode if it adds warnings" test would not catch its real problem. Parameters are checked against the catalog by hand |
| The kit has no feasibility tool | Its reference files only say to consult the catalog | Answered from the catalog and references, with independent reviewers |
| `save-text` append | No append parameter. `echo` has a `write-mode`, with different approval and no verified field | Update mode dropped, as agreed with your Phase 2 go |
| UGREEN says Skills can call other Skills. The kit allows only `delegate`, and the checker has no rule either way | Technical FAQ Q3. Kit `SKILL.md` line 29. A reviewer's throwaway package with such a line still gave `static-pass` with 0 warnings | Use `delegate` only |

## Rules and sources

| Issue | Evidence | What we do |
|---|---|---|
| **One Project per entrant** | [Official Rules](https://ugreenhackathon.devpost.com/rules), Multiple Submissions | Dossier and Packet cannot both go in. You chose Dossier on 2026-11-06. Packet is parked as the fallback and will not be submitted alongside it |
| **Round 2 cameras.** No source says the assigned NAS has cameras or sample events. A camera must be on the NAS's own network to be added. No catalog action creates events. Judges test in the assigned environment and data is reset | Rules section 4. [Surveillance Center FAQ](https://support.ugnas.com/knowledgecenter/detail/article/en-US/879) Q4. All 8 `ug-surveillance` actions are read. Does not affect Round 1 scoring (Rules section 6) | Question 1 below. Case B is a full test case. State the dependency in Q8 and Q10. No simulated camera unless UGREEN agrees in writing |
| Publishing Guidelines bind entrants. They ask for notice and consent for camera and photo access, and flag biometric identification as high risk | [Starter Kit](https://ai.ugreen.com/pages/hackathon-starter-kit) sections 1 and 8. [SkillHub Standards](https://api.ugnas.com/api/system/v1/ua/agreement/page?agreementCode=skillhub-publish-audit-spec&acceptLanguage=en-US) 4.3, 4.4, 9.3, 10.1 | M-00 notice. Identity lookups can be skipped. Asks for identity only on events in the window. Runs no `faces` or `vehicle-plates` search and creates no identities. Whether identity-resolve reads stored results or matches at call time is unknown. Disclose risks and boundaries in Phase 3. 9.3 also asks developers to hold any needed qualifications or authorization, and says such Skills may face stricter review or no listing. Added to question 6 |
| Standards 7.1 strictly prohibits others' personal information or private data in packages, examples, logs or generated content | Same page. Whether it reaches an owner's own file is unclear | DESIGN decision 4. Question 6 below |
| Owner undertakings: authority over the camera, a location clear of others' private spaces, a view that avoids public areas such as streets and neighbors' yards, and consent from people recorded | [Monitoring Center notice](https://ai.ugreen.com/pages/data-processing-instructions-for-monitoring-center-functions) section 8 | One line in M-00. The Skill makes no claim that footage is lawful or admissible. Setup docs mention this, because driveway and porch cameras are the main case |
| Detection is opt-in, face recognition depends on region, unlabelled faces and plates are kept one month, AI search covers 15 days, recordings can be overwritten | Same notice. [Surveillance Center guide](https://support.ugnas.com/knowledgecenter/detail/article/en-US/866). Whether `event-timeline` depends on the 15-day index is unknown | M-02 and M-03 never say nothing happened. Case A's 15-day mark would be 2026-11-17 |
| UGREEN's own pages conflict on plates and packages. Its Surveillance Center FAQ says vehicle recognition is not yet supported and its AI does not currently provide package events. Its notice lists license plate recognition and package detection. Its guide lists package detection | Surveillance Center FAQ Q11, Q12, against the notice and guide | Expected Case A result has no plate. Do not rest the pitch on plates or packages. Question 3 below |
| "No uploads", "nothing leaves the NAS" | UGREEN says processing runs on the NAS by default and vision tools stay local even with a cloud model selected, and that a Skill cannot reach external APIs (Technical FAQ Q5, Q14). The model receives the vision tool's result (Q5). Choosing a cloud model forwards input such as text, images or files ([Uliya Privacy Policy](https://ai.ugreen.com/pages/uliya-privacy-policy) 5.2). Hybrid mode lets the system pick the model ([Uliya guide](https://support.ugnas.com/knowledgecenter/detail/article/en-US/850)), so it can do the same. Whether other Skill results go too is question 5. UGREENlink (policy 7.2, notice section 3) and bound chat apps (Uliya guide) are further routes | Wording in M-00. `qa` and `save-text` are not in Q5's on-device list, so they go on the NAS test list |
| Devpost and the Technical FAQ differ on outside services. Devpost: a Skill may send data to cloud AI services Uliya supports, should test with synthetic or anonymized data, must not send real personal or confidential data or sensitive NAS files to external services, and must identify data flows in the Proposal. Technical FAQ Q14: a Skill cannot reach external APIs or third-party AI services | [Devpost Resources](https://ugreenhackathon.devpost.com/resources). Technical FAQ Q14 | Test with synthetic data only. Treat the cloud model as a user setting, not a Skill call. Name it as a data flow in Q7. Added to question 5 |
| UGREEN's pages differ on the cloud route: the Uliya Privacy Policy relays through UGREEN servers, the Model Manager notice says requests go directly to the provider | Policy 2.1.2 and 6.2. [Model Manager notice](https://ai.ugreen.com/pages/notice-on-model-manager) 2.5 and 4.1 | M-00 names no route |
| "Nothing on the market does this" | Unsourced. SkillHub 2.2 bars superlatives. First-party [Event evidence](https://skills.ugreen.com/us/skills/140), Event query and Identity recognition ship pre-installed and do single jobs. A reviewer found adjacent products (Frigate, Milestone XProtect, Protex AI), not tested | Phase 4 names what was checked and says "the tools I checked" |
| First-party Skills may catch the trigger | [SkillHub help](https://skills.ugreen.com/us/helper?doc=report-process): official Skills are pre-installed. Technical FAQ Q3: the LLM picks | Description leads with the joined result and a phrase like "build a claim dossier". First item on the NAS test list |
| Starter Kit says on no result, say so and stop. Brief says continue | Kit template and error reference narrow it to stopping dependent work | Stop that branch, substitute nothing, continue independent branches. Keep the words "no results" in SKILL.md |
| Starter Kit recommends a README, but the checker and Rules do not allow one | Packet `NOTES.md` line 13 | Use `references/setup-and-testing.md` |
| Testing dates differ: Rules say Nov 22 to 28, the Community FAQ says Nov 22 to 30 | [Start Here FAQ](https://community.ugreen.com/nas/pagesD/circle/post?id=1581) says the Rules prevail | Plan for Nov 22 to 28 |
| Devpost forum threads have 0 replies. UGREEN answers in its Community | Forum read today | Treat Technical FAQ answers as UGREEN's stated behavior, not NAS results |

## Phase 2

- **The package is camera-only for now.** It says so plainly in its description and Goal, and promises no photos or claim documents. Step numbers skip on purpose, so they stay stable when steps 4, 5 and 6 arrive. DESIGN section 13 lists exactly what Phase 3 restores.
- **The kit's "Skill is complete" upload line is withheld.** The kit says not to show it for a partly finished Skill.
- **The brief's section names fail the checker,** so the package uses `# Generation-time capability evidence`, `# Orchestration` and the backticked arrow form. It also adds `references/messages.md`, beyond the two references the brief names, to keep SKILL.md readable.
- **Kit version.** Built and checked on 0.7.3. On Nov 6 the Starter Kit still links 0.7.3 and the installed copy still has 26 files. Retest when 0.7.6 is here.
- **Local lint.** `dossier/tools/lint-package.mjs` checks what the checker cannot see: apostrophes inside instructions, undefined run values, unused messages, line endings, BOMs and links. Run it with the package path and `dossier/docs/DESIGN.md`. It is not part of the ZIP.
- **Review.** One independent reviewer walked the package and found 29 defects, all accepted, including a bare yes writing names and plates into files and nothing stopping a write into an existing folder. The fixes were then checked with the checker, the lint and a comparison against the reviewer's trial copy. They did not get a second independent review.
- **Size to watch.** SKILL.md is about 4,450 words, and Phase 3 adds steps 4, 5 and 6. The stranger read in Phase 3 should look for what can move to references. Decision rules stay in SKILL.md until a NAS shows that references are read at runtime.

## To carry into later phases

**Phase 2 and 3**

- Add `references/setup-and-testing.md`: prerequisites (Surveillance Center, Model Manager authorization, per-camera detection, face authorization, Smart Commands, photos on the NAS), what each missing one looks like, what a tester must place, removal, kit and catalog versions, and the owner undertakings. Install: follow UGREEN's Finalist instructions. No source I found says how an unlisted Skill is installed. SkillHub's publish page points to official Uliya release notes, which I could not locate. SkillHub's token route is for listed Skills.
- Setup docs: Intelligent Learning may index saved files ([Model Manager notice](https://ai.ugreen.com/pages/notice-on-model-manager) 1.2). Not tested on a NAS. The notice lists exclusion paths under Universal Search (5.1(4)) and does not say whether they also stop Intelligent Learning.
- Disclosure wording. The brief's planned sentence will not hold: Claude drafted and reworked the workflow in reviews, and drafts the proposal answers. Name the model. Use "the entrant" in the package. Only you can confirm you wrote the idea. Recheck on Nov 14.
- `claim-checklists.md`: landlord and police lists are general and location-dependent.
- Description: one short clause on what is read and that it writes one chosen folder. The kit wants it index-like, and SkillHub 4.3 wants permissions disclosed.

**Phase 4**

- The brief ends at `PROPOSAL.md`. The Rules require a PDF, and the Overview caps it at 1 MB. After your rewrite: build the PDF, then recount the ten answers from the final text.
- Q6 names which capabilities at which step. Q7 also asks for the workflow and supported NAS CLI capabilities, plus orchestration, inputs, permissions, model choices and data handling. So actions belong in both. To save words, name each action once and point to it from the other answer.
- Outside the word count: team consent declarations, member names, electronic signatures and third-party license information. Data flows count.
- Q10 update: per-copy approval and `save-text` on an existing name are now answered by UGREEN. Still open: `event-evidence` paths, cameras in the test environment, EXIF versus pixels.
- Third-party block: the kit, its version and source. The kit has no licence file.
- The Devpost FAQ mentions a text description, which suggests a form field. Its advice is to write that and the PDF answers yourself. I have not seen the form, because it needs your login.

## Open items for review

- Reviewer detail, including 22 tested delegation forms, is in the local Claude Code workflow journal for run `wf_ff99bed5-766`. Use it as the starting wording for Phase 2.
- Synthetic test files are not built. This is tracked separately: invitations arrive Nov 21.

## Questions worth sending UGREEN

Not sent. Sending is your call. Routes: nas-support@ugreen.com, a support ticket, or the comments on the Technical FAQ, which invites questions.

1. Will the assigned NAS have Surveillance Center, cameras or sample events, for Finalists and for judges? If not, may a Finalist use a simulated ONVIF or RTSP source on the NAS?
2. Where do I get uliya-skill-kit 0.7.6? It does not show in SkillHub search, and the Starter Kit still links 0.7.3.
3. Are face and plate recognition and package events available on the assigned unit?
4. What does `event-evidence` return, and does `export_request` create a file or need approval? Can file-agent read a camera's video storage folder?
5. Which model does `ug-document qa` use, and does a Skill's output reach a selected cloud model? The Devpost FAQ says a Skill may send data to Uliya-supported cloud services, while Technical FAQ Q14 says a Skill cannot reach third-party AI services. Which applies?
6. Does SkillHub 7.1 cover a file a Skill writes to the owner's own NAS, with names or plates the owner asked to include? Does 9.3 apply to a Skill that only requests identity results for events, and is any authorization needed?
7. How do test files reach the assigned NAS, does data stay for judges, and how is an unlisted Skill installed?
8. How does a delegation resume after `waiting_approval`, do run values survive a parent stop, and are linked references read at runtime?

## Machine

- Kit installed at `~\.claude\skills\uliya-skill-kit`.
- `py` reports Python 3.14.0, not 3.13 as the brief says. Node is v26.8.2.
- PowerShell 5.1 traps from Packet still apply: `Set-Content -Encoding utf8` adds a BOM, and `Compress-Archive` writes backslashes. Write package files with the file tools and build the ZIP with Python `zipfile`.
- The project is in OneDrive. List hidden files before checking or zipping.
