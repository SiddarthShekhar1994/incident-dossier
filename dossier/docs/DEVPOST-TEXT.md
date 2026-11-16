# Dossier: Devpost submission text

Written by Claude on 2026-11-15 at the entrant's request, and disclosed in `references/disclosures.md`. Every claim here is also in the proposal PDF, so the form and the PDF cannot disagree. Read it against [SUBMIT-CHECKLIST.md](SUBMIT-CHECKLIST.md) section 7 before pasting.

## Project name

Dossier

## Elevator pitch

Paste as plain text. It is 166 characters, under Devpost's usual 200.

```text
Reads a home incident's camera events, photos and policy on a UGREEN NAS, then builds a claim evidence folder with a timeline and a checklist of what the claim needs.
```

## About the project

Paste everything inside the block. Devpost's project story field takes Markdown.

```markdown
## What it does

After a car is hit or a home is broken into, the evidence is split across camera events, photos and a policy, while recordings can be overwritten and deadlines pass. Dossier is a Markdown Skill for the UGREEN AI NAS that reads what the NAS holds about one incident, then builds a claim evidence folder with a timeline and a checklist of what the claim needs. It checks that evidence against the policy, or a generic checklist, and marks each item have, partial, missing, not looked for or not checked.

## How it works

The owner says: build a claim dossier for this incident. After a notice, Dossier asks for the incident, date, start, end and timezone, plus an optional camera location, photos folder and policy, and offers a default save folder. Once the owner confirms the window, it shows the gap list, any time disagreement and a plan. After a yes, the NAS normally asks to approve each write. The run ends as Built, Partial or Not built.

The Skill delegates through 19 instruction templates to five NAS expert agents: security-monitor-agent, photo-agent, document-agent, file-agent and knowledge-agent. All five delegation states are handled, and a failure stops only its own branch.

## Privacy and data handling

Strangers stay unknown, and names and plates are withheld from labels and descriptions unless the owner agrees. Copies are hash-checked, and evidence expiry is kept as returned. The model is the owner's Uliya setting, ideally Local model. Dossier calls no outside service, but under Cloud model or Hybrid mode content can reach an outside AI provider, and UGREENlink or a bound chat app can carry results off the NAS, so it asks the owner to check.

## What's different

Of the tools I checked, UGREEN's Event query, Event evidence and Identity recognition Skills each do one camera task. Dossier joins events, photos and the policy into one gap list, and flags a damage photo stamped before the first related event.

## Status

The full package is ten Markdown files that pass the kit 0.7.3 checker with no errors or warnings, plus a paper dry run. The synthetic test files and a recheck on kit 0.7.6 are not done yet, and every runtime behavior still needs a NAS.

## What's next

If Dossier is selected as a Finalist, the test files go on the NAS first. The core cases are a run with no cameras, which should give a gap list and a built folder, and the driveway case, which needs a camera source. The edge case is a damage photo stamped before the first Vehicle event, with both times reported. Open questions: whether event-evidence returns copyable files, whether the assigned NAS has cameras or sample events, and whether vision-vlm reads EXIF or only pixels. Camera steps need Surveillance Center.
```

## Built with

Markdown, UGOS, Uliya, uliya-skill-kit, Claude Code
