# Dossier format

Layouts for the two text files. Both use labelled lines only, with no tables, rules or backticks. Keep the first and last lines exactly as shown, so a cut-off file can be spotted.

Write only what the run gathered. A section with nothing in it uses the wording given below.

## TIMELINE.md

```text
Dossier timeline v1
Incident: {description}
Window: {start} to {end}, {zone}
Cameras searched: {all cameras, or only the cameras with these ids, followed by the ids}
Camera branch: {found N events, or empty. This does not show that nothing happened, or no {topics} events, and {n} other events left out by you, or no {topics} events, and the wider check not checked: reason, or not checked: reason}
Photo branch: not read in this run
Possibly incomplete: {yes: reason, or not cut off at the result limit. This does not show that every event was detected}
Names and plates: {included at your request, or withheld from identity labels, plate lines and the incident line. File paths, camera names and references are written as returned and may hold a name}
References below may stop working. Treat them as private. Remove them before sharing this file.

Order check
Order check not run: no photos were read

Entries in time order

Entry {n}
Time: {time with offset}. As given: {raw value}
Source: camera event {event id}
Camera: {name, or camera id as returned, or camera not named}
Topic: {topic, adding: outside the chosen topics, if so}
Identity: {identity label text}
Explanation, as returned: {known identity with names included only}
Plate: {plate text. Write this line for Vehicle events only}
Evidence {type}: {reference or path as returned}. Expiry: {as returned, or expiry not stated}
Evidence: {none returned, or not checked: reason}
Copied to: {path in this folder, if an evidence file was copied}
SHA-256: {if an evidence file was copied, one of the three forms below}

Entry {n}
Time: {as returned, or not stated}
Source: archived recording, given by you
File: {path in this folder, or not copied: reason}
Original: {source path}
SHA-256: {one of the three forms below}

End of timeline
```

The three SHA-256 forms:

```text
SHA-256: {hash}. Matched the source at this run. Use it to check for later changes. Not proof of authenticity.
SHA-256: source {hash}, copy {hash}. Copy does not match its source. Do not rely on this copy.
SHA-256: not checked: {reason}. This copy was not verified. Do not rely on it until you check it.
```

Rules:

- Put entries in time order, using the run's offset. A time with no offset is read as local to the run's zone and marked offset assumed. An entry with no usable time goes last, marked time not stated.
- Write one Evidence line per item returned. Use the other Evidence line only when there are no items, or the call did not complete.
- N counts the camera event entries written. Archived recordings are not events.

## CLAIM-CHECKLIST.md

```text
Dossier checklist v1
Organizing aid made with AI. Not legal or insurance advice. No promise that a claim will succeed. Check every deadline and requirement against your document and your carrier.
Source: no requirements list in this run
Document read: not applicable
Nearest deadline: not looked for in this run. Your policy or lease may set one

Gathered item {n}: {item}
Evidence: {what}

End of checklist
```

Write these gathered items, leaving out any that do not apply:

- **Camera events:** how many, the window, the cameras searched, and each event id with its time.
- **Evidence in this folder:** each file copied with a matching hash.
- **Do not rely on:** each copy in this folder whose hash did not match or could not be checked.
- **Evidence not in this folder:** each event with only a reference, and what would close it: archive the recording from Surveillance Center before the reference stops working, if your account allows it.
- **Plate data:** each Vehicle event with no plate data, and its clip reference if there is one. Report only what was returned, with no ranking of clips.
- **Not checked:** anything that failed or was cancelled, with its reason.

Word every match as appears to match. Do not state that footage shows anything, because no step views it.
