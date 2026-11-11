# Dossier: Round 1 proposal draft

Draft of the ten answers for the Round 1 PDF. The facts are checked against the package. Rewrite the wording in your own words, then build the PDF from your text, as in [SUBMIT-CHECKLIST.md](SUBMIT-CHECKLIST.md).

Questions use the Official Rules' wording, which prevails over the Overview's phrasing of the same ten items. Only the answers count toward the 500 words. On 2026-11-10 this draft counts 496, or 527 if a counter splits hyphenated words such as `event-timeline`. Recount after any edit:

```text
node dossier/tools/count-proposal.mjs dossier/docs/PROPOSAL.md
```

## 1. One sentence: What does the Skill do?

Dossier reads a home incident's camera events, photos and policy on the NAS, then builds a claim evidence folder with a timeline and a checklist of what the claim needs.

## 2. Who is the target user and problem?

Adults with home cameras on a UGREEN NAS, after a car is hit or a break-in. Evidence is split across camera events, photos and a policy, while recordings can be overwritten and deadlines pass.

## 3. What is your proposed solution?

A Markdown Skill that checks what the NAS holds about one incident against the policy or a generic checklist, marking each item have, partial, missing, not looked for or not checked.

## 4. What is the Core User Flow?

The owner says: build a claim dossier for this incident. After a notice, Dossier asks for the incident, date, start, end and timezone, plus an optional camera location, photos folder and policy, and offers a default save folder. Once the owner confirms the window, it shows the gap list, any time disagreement and a plan. After a yes, the NAS normally asks to approve each write. Result: Built, Partial or Not built.

## 5. What substantive difference does your idea offer compared with existing tools or conventional AI solutions?

Of the tools I checked, UGREEN's Event query, Event evidence and Identity recognition Skills each do one camera task. Dossier joins events, photos and the policy into one gap list, and flags a damage photo stamped before the first related event.

## 6. Which UGREEN AI NAS capabilities will be used, and at which step in the workflow?

Start: file-workflow get-user-dir, ug-filesystem stat. Cameras: ug-surveillance cameras, event-timeline. Identity: identity-resolve, vehicle-plate-detail. Evidence: event-evidence. Photos: ug-photo search-picture, meta, vision-vlm, ug-filesystem find. Claim: ug-document qa, ug-filesystem ls. Build: ug-filesystem mkdir, cpmv, sha256sum, ug-knowledge save-text.

## 7. What was your technical approach? Describe the planned Skill workflow, supported NAS CLI capabilities, expert agent orchestration, required inputs, permissions, AI model choices, and data handling, as applicable

Flow, inputs, approvals: Q4. Actions: Q6. The parent Skill delegates through 19 instruction templates to security-monitor-agent, photo-agent, document-agent, file-agent and knowledge-agent. All five delegation states are handled; a failure stops only its branch. Strangers stay unknown, names and plates are withheld from labels and descriptions unless the owner agrees, copies are hash-checked, and evidence expiry is kept as returned. Model: the owner's Uliya setting, ideally Local model. Dossier calls no outside service, but under Cloud model or Hybrid mode content can reach an outside AI provider, and UGREENlink or a bound chat app can carry results off the NAS, so it asks the owner to check.

## 8. What is the current development status? Identify what was implemented already, not yet implemented, or is pending NAS validation if selected to be a Finalist

Implemented: the full package, ten Markdown files passing the kit 0.7.3 checker with no errors or warnings, plus a paper dry run. Not yet done: the synthetic test files, and a recheck on kit 0.7.6, which I could not get. Needs a NAS: every runtime behavior.

## 9. What is your final validation plan? Name two core test cases and one edge case to validate if selected as a Finalist

Test files go on the NAS first. Core 1, no cameras: a gap list and a built folder. Core 2, the driveway, needs a camera source. Edge: a damage photo stamped before the first Vehicle event, both times reported; without a camera, a photo showing a running clock that differs from its capture time.

## 10. Are there any known limitations of your Project? Describe current known limitations, technical risks, and any external dependencies

Open: whether event-evidence returns copyable files, whether the assigned NAS has cameras or sample events, and whether vision-vlm reads EXIF or only pixels. Kit 0.7.6 is unchecked. Risks: face recognition is high-risk, so identity can be skipped; a pre-installed Skill may catch the request. Camera steps need Surveillance Center.

## Outside the word count

Put your name on the PDF here, with any team consent declaration or electronic signature the form asks for. These and the third-party licence information below are outside the 500 words.

### Third-party components and licences

The Skill package bundles no third-party component, library or asset. It holds only Markdown written for this Skill.

Development tool: UGREEN's UGOS Skill Creation Tool, uliya-skill-kit 0.7.3, from the UGREEN Hackathon Starter Kit at https://ai.ugreen.com/pages/hackathon-starter-kit. The version is the one in the Starter Kit's download, `uliya-skill-kit-0.7.3-en.zip`. Licence: the kit holds no licence file and states no licence of its own. The Official Rules, section 4, say use of the developer tools "is subject to the license agreement related thereto", and the Starter Kit asks users of the tool to agree to its linked User Agreement, Privacy Policy and Skill Content Safety and Publishing Guidelines. The kit is not included in the package.

The NAS expert agents and models the Skill delegates to are UGREEN's, provided by the NAS. External services and data flows are in answer 7. AI tools used are listed in `references/disclosures.md` in the ZIP.
