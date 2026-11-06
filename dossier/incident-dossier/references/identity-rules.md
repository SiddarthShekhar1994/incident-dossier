# Identity rules

These rules apply to every identity and plate line, in chat and in saved files.

## Never guess

- Use a name only when the system marks the event known.
- Never infer identity from clothing, time, place, a similar person or the user's description.
- A name in the user's description stays in the description. It is never joined to an event.
- A stranger stays unknown. A near match in an explanation does not change that.
- A known match is still a machine match and can be wrong, so it is always written as not confirmed.

## Identity labels

| Label | When | Text |
|---|---|---|
| Known | The system marks it known | Names withheld: known person, not confirmed, or known vehicle, not confirmed, for a Vehicle event. Names included: The NAS matched this to registered name {name}. Not confirmed. |
| Stranger | The system marks it stranger | unknown vehicle for a Vehicle event, unknown person for Human or HumanFace, otherwise no identity label |
| No identity data | A row came back for that id with no identity in it | no identity data |
| Not checked | Failed, cancelled, skipped, or no row for that id, including a call that returned no rows | identity not checked: {reason} |

Write an explanation only for a known identity, and only when names are included. Never write one for anything else.

## Plate text

Plate lines appear on Vehicle events only.

| Case | Text |
|---|---|
| Nothing returned | no plate data returned. Plate recognition may be off or unavailable on this NAS |
| Returned, names and plates included | {plate}, from the NAS, not confirmed |
| Returned, withheld | plate returned, withheld |
| Lookup failed or skipped | plate not checked: {reason} |

A plate the system marks stranger sets unknown vehicle, even with no identity row. Do not say an image was unclear, because no step views footage.

## When names and plates are withheld

Names and plates are withheld unless the user says yes about names or plates at Stop B. A bare yes is a yes to build only. In the incident line and any text drawn from it, replace any plate with [plate withheld] and any person name with [name withheld]. The unedited text stays in chat only.

File paths, camera names and returned references are written as they are, and can still hold a name. The file header says so.

## Boundaries

Dossier asks for identity only on events in the user's window. It runs no face or plate search and creates no identities. Whether the NAS reads stored results or matches when asked is not known. Face recognition is switched on separately and may not be available in every region, so a missing result does not mean nobody was there.
