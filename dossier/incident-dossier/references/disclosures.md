# Disclosures

## Third-party components

This package bundles none. It holds only Markdown written for this Skill.

It was built with the UGOS Skill Creation Tool, uliya-skill-kit 0.7.3, from the UGREEN Hackathon Starter Kit: https://ai.ugreen.com/pages/hackathon-starter-kit. The tool is not included in this package. It states no licence of its own, and it was used under the hackathon's terms for its developer tools.

The NAS experts this Skill delegates to, and the models they use, are UGREEN's and are provided by the NAS.

## Principal functionality developed for this hackathon

All of the package: the workflow that joins camera events, identity results, evidence, photos and a claim document into one gap list, the order check between photo and camera times, the rules for strangers and plates, the file formats, the messages and the generic checklists.

## AI tools used

Claude Code, using the Claude Opus 5.5 model, was used to research the rules and the capability catalog, review the workflow, draft and revise SKILL.md and these references, run the kit checker, and write the test spec and the dry run. Some workflow changes came from those reviews. It also drafts proposal answers for the entrant to rewrite.

The entrant wrote the idea and the original workflow in the project brief, and decided which changes to accept.

## External services and data flows

This Skill calls no outside service and adds no upload step. All of its work is done by NAS experts through delegation.

UGREEN says processing runs on the NAS by default, and that vision tools stay on the NAS even when a cloud model is selected. If the owner chose Cloud model or Hybrid mode in Uliya, what the Skill handles, such as descriptions, names, policy clauses and possibly documents, can be sent to an outside AI provider. If the owner reaches Uliya through UGREENlink or a bound chat app, results also travel that route. The Skill cannot check or change these settings, so its first message asks the owner to.

## Risks and boundaries

- The Skill reads camera events, identity results and photos, which can hold other people's details. It asks first and keeps to one incident. Camera and identity reads stay inside one window. Photos are searched from the day before onward, or across a folder the owner names, their capture times are read, and only those inside the window are described unless the owner adds others. It withholds names and plates from its files unless the owner says yes. File paths, camera names, references, contacts and quoted clauses are written as returned, so they can still hold a name or a plate, and the file headers say so.
- Identity results can involve face recognition, which is a high-risk area. The Skill asks for identity only on events in the window, runs no face or plate search, creates no identities and never names a stranger. A known match is written as not confirmed, because it can be wrong.
- The owner stays responsible for having the right to record and share footage.
- The checklist is an organizing aid, not legal or insurance advice, and it does not promise that a claim will succeed.
