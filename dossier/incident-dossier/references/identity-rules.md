# Identity rules

These rules apply to every identity and plate line, in chat and in saved files.

## Never guess

- Use a name only when the system marks the event known.
- Never infer identity from clothing, time, place, a similar person or the user's description.
- A name in the user's description stays in the description. It is never joined to an event.
- A stranger stays unknown. A near match in an explanation does not change that.
- A known match is still a machine match and can be wrong, so it is always written as not confirmed.
- A known match is never treated as another party in a claim. It only says who the NAS matched on camera.
- An answer from the user never supplies a person, a plate or an identity to an expert.

## Identity labels

| Label | When | Text |
|---|---|---|
| Known | The system marks it known | Names withheld: known person, not confirmed, for Human or HumanFace, known vehicle, not confirmed, for a Vehicle event, otherwise known, not confirmed. Names included: The NAS matched this to registered name {name}. Not confirmed. |
| Stranger | The system marks it stranger | unknown vehicle for a Vehicle event, unknown person for Human or HumanFace, otherwise no identity label |
| No identity data | A row came back for that id with no identity in it | no identity data |
| Not checked | Failed, cancelled, skipped, or no row for that id, including a call that returned no rows | identity not checked: {reason} |

Write an explanation only for a known identity, and only when names are included. Leave it out if it holds any person name other than the marked {name}. Never write one for anything else.

Reasons in identity and plate lines are fixed: lookup failed, identity lookup did not complete, cancelled by you, no row for this event, skipped by you, stopped by you. Never copy an expert's words into them, because a failure can carry a near match.

## Plate text

Plate lines appear on Vehicle events only.

| Case | Text |
|---|---|
| Nothing returned | no plate data returned. Plate recognition may be off or unavailable on this NAS |
| Returned, names and plates included | {plate}, from the NAS, not confirmed |
| Returned, withheld | plate returned, withheld |
| Lookup failed or skipped | plate not checked: {reason} |

On a Vehicle event, a plate the system marks stranger sets unknown vehicle and wins over the identity row, so no name is written, even with names included or with no identity row. A plate read from a photo is labelled read by the model, check the photo, and it is never sent to the surveillance expert. Do not say an image was unclear, because no step views footage.

## When names and plates are withheld

Names and plates are withheld unless the user says yes to including them at Stop B. They go together, so a reply that treats the two differently withholds both, and M-32 says so. A bare yes is a yes to build only, and it changes nothing about them. The most recent explicit answer stands across M-26 and the further stop.

A yes unlocks only the {name} and explanation of an event the system marks known, and plates.

Person names in a photo description are replaced with [name withheld] in every case, in chat and in files, because the model read them and nothing marked them known.

Failure reasons, warnings, reasons in M-05c or M-13 or on the Document read line, and topics as given get the same replacement for names and for plates, in every case, in chat and in files.

With names and plates withheld, any text taken from the user's description, in either file, and every photo description are also edited in the files: any plate becomes [plate withheld], and any person name in the user's description becomes [name withheld]. The plate text in a photo description stays in chat only.

File paths, camera names, returned references, contacts, required-item text and quoted clauses are written as they are, and can still hold a name or a plate. The headers of both files say so.

## Boundaries

Dossier asks for identity only on events in the user's window. It runs no face or plate search and creates no identities. Whether the NAS reads stored results or matches when asked is not known. Face recognition is switched on separately and may not be available in every region, so a missing result does not mean nobody was there.
