# Gap rules

Step 6 uses only results already held. It sends no delegation and views no footage. The result is a comparison made by the assistant, not a finding by the NAS or a legal opinion.

## Status per required item

| Status | Meaning |
|---|---|
| Have | A real file in the folder that matches its source hash and answers the item, or the user's input or a returned field that states the item. A copy that fails its hash does not count. Before copies, a photo whose description appears to match counts as draft Have only |
| Partial | Only a reference, a description lacking the detail, a camera event not viewed, a partly read document, a plate returned but withheld, or an item only part of which is stated by the user's input or a returned field. Also a file found but not in this folder, with the reason: copy cancelled or failed, hash not matched, or left out by you |
| Missing | The branch ran and found nothing |
| Not looked for | No step searches for this kind of item, such as a form or a police report. Write: You supply this |
| Not checked | The branch failed, was cancelled, or was skipped by the user |

Recompute statuses after the copies, from real results. If only part of the document was read, no status can be better than Partial.

## What can answer each kind of item

| Kind of item | What can answer it |
|---|---|
| Photographs of the damage or the scene | Photos in the plan, then copied. Have needs a description that appears to match the item. Otherwise it is Partial |
| Video or another recording | Clips and recordings in the folder: evidence files, archived recordings and videos the user added. A snapshot or a reference alone is Partial. A search that completed with no events, and no such file, is Missing. If the event search or the wider check failed or was cancelled, and no such file is in the folder, it is Not checked, with that reason |
| Date and time | The confirmed window, and event and capture times |
| Location or street address | Camera names and the user's description. A street address is not searched for, so it is at most Partial: You supply the street address |
| Another party, or the plate of another vehicle | Plate results. An identity result never fills this role: a known match may be listed only as on camera in the window, not stated to be the other party, and it never raises the status above Partial. With Vehicle events and no plate data, it is Partial and lists the clips, not viewed. If a search completed with no camera events, it is Missing. If the event search or the wider check failed or was cancelled, it is Not checked, with that reason. With identity skipped, it is Not checked, and it still lists the clips, not viewed |
| Forms, written notices, police report numbers, receipts, estimates, policy numbers and contacts | Nothing searches for these: Not looked for |

Word every match as appears to match. Report only what was returned, and do not rank clips. Write gaps like this:

```text
No plate id or number returned for any Vehicle event. Vehicle events with clips, not viewed: {event id} at {time}, {event id} at {time}. Watch these.
```

Do not say an image was unclear, or that a clip shows anything, because no step views footage.

## Order check

1. Compare times as moments, and write each with its own offset. A time with no offset is read as local to the run's zone and marked offset assumed. If it falls inside an hour the clock change repeats, use the offset the user gave, or otherwise the earlier one. A photo with no capture time is listed as undated and left out. A photo the user left out at Stop B is left out too.
2. The anchor is the earliest event with the main topic from the step 1 table, or the event the user names at Stop B.
3. An order disagreement is a photo with Damage visible: yes whose capture time is more than 2 minutes before the anchor. Two minutes is this Skill's chosen tolerance.
4. A separate note, not an order disagreement, is a running clock in a photo that differs from its capture time by more than 2 minutes. This one needs no camera. Printed times, such as on a receipt, are listed with no flag.
5. With no anchor, write Order check not run, with the reason, such as no camera events, or the event search did not complete. Never write that there is no disagreement.
6. With an anchor but no photo that has both a capture time and a description, and none taken before the anchor described and then left out, write Order check not run, with the reason, such as no photos found, or the photo branch not checked.

Report both times and pick neither. Use this wording. When two files in the plan share a name, write the full path in place of `{file}`.

```text
Order disagreement: {file} has capture time {time}{, offset assumed}, and shows damage. Event {event id} on {camera}, {the first {main topic} event, or the event you named}, says {time}. Difference {difference}. Both are kept. I did not pick one. Either clock may be off.
Shown time differs, read by the model: {file} has capture time {time}{, offset assumed}. A running clock in the photo reads {clock}. Difference {difference}. Both are kept.
```

If nothing fires and at least one photo was compared, write one of these. Add the second sentence of the first form only if it applies. Count kept photos and videos with no description as not described.

```text
None found among the photos described. {n} photos taken before the anchor were not described, so this check did not cover them.
None found among the photos kept. {n} photos taken before the anchor were left out by you, so this check did not cover them.
None found among the photos described and kept. {n} taken before the anchor were not described, and {m} were left out by you, so this check did not cover them.
```

Use the second form when a photo taken before the anchor was described and then left out, even if it was the only photo. Use the third when both counts apply.

## Deadlines

Quote the clause. Give a date only when the clause states its start, such as within 30 days of the date of loss, and say what it counts from. Otherwise write: no fixed date in this clause. For a generic checklist write: not known, check your policy.

The nearest deadline is the earliest date given. With no date from a document, write none found. With no document read, write: not looked for in this run. Your policy or lease may set one. If the document could not be read, write: could not read the document. If only part was read, write the date with: earliest in the part read, the rest was not read. With no date in that part, write: none found in the part read, the rest was not read.
