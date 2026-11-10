# Dossier format

Layouts for the two text files. Both use labelled lines only, with no tables, rules or backticks. Keep the first and last lines exactly as shown, so a cut-off file can be spotted.

Write only what the run gathered. A section with nothing in it uses the wording given below.

## TIMELINE.md

```text
Dossier timeline v1
Incident: {description}
Window: {start} to {end}, {zone}
Cameras searched: {all cameras, or only the cameras with these ids, followed by the ids, or none, the search did not complete}
Camera branch: {found N events, or found N events, not checked: stopped by you, or empty. This does not show that nothing happened, or no {topics} events, and {n} other events left out by you, or no {topics} events, and the wider check not checked: reason, or not checked: reason}
Photo branch: {found N photos, or found N photos, kept M, the rest not in this dossier, or found N photos, kept M, the rest not described: stopped by you, or empty. Photos still on a phone are not on the NAS, or not checked: reason}
Possibly incomplete: {yes: reason, or not cut off at the result limit. This does not show that every event was detected, or not applicable: the event search did not complete}
Names and plates: {included at your request, or withheld from identity labels, plate lines, the incident line and descriptions. File paths, camera names, references and quoted clauses are written as returned and may hold a name or a plate}
References below may stop working. Treat them as private. Remove them before sharing this file.

Order check
{Order disagreement lines, or the None found line from the gap rules, or Order check not run: reason}
{Shown time lines, if any}

Entries in time order

Entry {n}
Time: {time with offset}. As given: {raw value}
Source: camera event {event id}
Camera: {name, or camera id as returned, or camera not named}
Topic: {topic, adding: outside the chosen topics, if so}
Identity: {identity label text}
Explanation, as returned: {known identity with names included only}
Plate: {plate text. Write this line for Vehicle events only}
Evidence {type}: {reference or path as returned}. Expiry: {as returned, or expiry not stated}{, event id not confirmed, if so}
Evidence: {none returned, or not checked: reason}
Copied to: {path in this folder, or not copied: reason, for an evidence file in the copy list}
SHA-256: {if an evidence file was copied, one of the three forms below}

Entry {n}
Time: {time with offset, marked offset assumed if so}
Source: {photo, or video}, {inside window, or outside window, added by you}
File: {path in this folder, or not copied: reason}
Original: {source path}
SHA-256: {one of the three forms below. Leave this line out if not copied}
Description, read by the model: {text, or not checked: reason, or not described: video}

Entry {n}
Time: {as returned, or not stated}
Source: archived recording, given by you
File: {path in this folder, or not copied: reason}
Original: {source path}
SHA-256: {one of the three forms below. Leave this line out if not copied}

Undated photos
{For each kept photo with no capture time: path. File: copy path, or not copied: reason. SHA-256: one of the three forms below, if copied. Description, read by the model: text. Then, if any were not kept: {n} other undated photos were not added. Or None, if none was found}

End of timeline
```

The three SHA-256 forms:

```text
SHA-256: {hash}. Matched the source at this run. Use it to check for later changes. Not proof of authenticity.
SHA-256: source {hash}, copy {hash}. Copy does not match its source. Do not rely on this copy.
SHA-256: not checked: {reason}. This copy was not verified. Do not rely on it until you check it.
```

Rules:

- [Run values](run-values.md) says what {start} and {end} hold in the Window line.
- Put entries in time order, comparing times as moments and writing each with its own offset. A time with no offset is read as local to the run's zone and marked offset assumed. An entry with no usable time goes last, marked time not stated.
- A photo gets an entry only if it is in the copy list at the build, including one whose copy was cancelled or failed, or that M-29 kept out, which reads `File: not copied: same name as another file in the plan`. A photo the user left out, or never added, has no entry and no order line. Events refused at M-05b get entries with the fixed reason stopped by you.
- Write one Evidence line per item returned. Use the other Evidence line only when there are no items, or the call did not complete.
- In the camera line, N counts camera event entries, and archived recordings are not events. In the photo line, N counts the hits kept after the drops in 4.1 or 4.1b, plus any single photo read from a reply. If every hit had a path and all were dropped, write the empty form. Write found N photos when all N are in this dossier. Otherwise use a form with kept M, where M counts photo entries and kept undated photos. Use the stopped by you form whenever M-05d was refused. Recompute this line after any read started from a reply.
- Order lines use the wording in [gap rules](gap-rules.md). Label a plate read from a photo as the identity rules say.

## CLAIM-CHECKLIST.md

```text
Dossier checklist v1
Organizing aid made with AI. Not legal or insurance advice. No promise that a claim will succeed. Check every deadline and requirement against your document and your carrier.
Source: {document path, or generic checklist name, or no requirements list in this run}
Document read: {whole document, or partly: reason, or could not read: reason, or not applicable}
Nearest deadline: {date and clause, or another form from the gap rules}
Names and plates: {included at your request, or withheld from status lines, identity results and text taken from your description. File paths, camera names, references, contacts, required items and quoted clauses are written as returned and may hold a name or a plate}

Item {n}: {required item}
Status: {status from gap rules}
Evidence: {real items, or none}
To close this: {exact thing that would satisfy it}
Deadline: {date with what it counts from, or no fixed date in this clause, or not known, check your policy}
Who to notify: {contact as returned, or not stated}
Source clause, as returned, check against the document: {quote, or generic checklist name}

Gathered item {n}: {item, used only when there is no requirements list}
Evidence: {what}

End of checklist
```

With no requirements list, write these gathered items, leaving out any that do not apply:

- **Camera events:** how many, the window, the cameras searched, and each event id with its time.
- **Photos:** how many were kept, and each kept file with its capture time.
- **Evidence in this folder:** each file copied with a matching hash.
- **Evidence not in this folder:** each event with only a reference, and what would close it: archive the recording from Surveillance Center before the reference stops working, if your account allows it.
- **Plate data:** each Vehicle event with no plate data, and its clip reference if there is one. Report only what was returned, with no ranking of clips.
- **Not checked:** anything that failed or was cancelled, with its reason.

In every run, any copy whose hash did not match or could not be checked is listed as an item named Do not rely on.

Word every match as appears to match. Do not state that footage shows anything, because no step views it.
