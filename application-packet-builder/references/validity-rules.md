# Validity rules

Read this before step 2.1. Steps 2.1 to 2.5 all use it. Experts return facts, and these rules decide the status of each item.

To change a default, edit this file and the list in step 2.5 of SKILL.md, build a new version of the package and upload it. A limit stated in the requirements document always wins for any item, so most changes are not needed. A limit that is not a number, such as "current academic year", is needs-confirmation. Words that only restate a default, such as an ID valid through the deadline, are not a separate limit, so the default applies.

## Measuring age

Packet has no clock, so age is measured against a date from the application:

- `{deadline}`: the date settled at step 1.2.
- `{measure_date}`: the deadline, or an earlier date the user gave at step 1.3.

Valid-through = document date + limit. A file is valid if its valid-through date is on or after `{measure_date}`. The boundary date counts as valid. Months are calendar months, and if that month has no such day, use its last day. If the requirements document names the date to measure from, such as "within 6 months of the deadline", use that date for that item instead of `{measure_date}`.

For an ID, the expiry date is compared with `{deadline}`, never `{measure_date}`. If the requirements document says how long an ID must stay valid after the deadline, the expiry must be on or after the deadline plus that limit. Before that, it is stale, and its valid-through date is the expiry less that limit.

## Rules by kind

| Kind | Search words | Date used | Default limit | Otherwise |
|---|---|---|---|---|
| Transcript | transcript, academic, grade | Issue date printed | 6 months | Earlier: stale. None or ambiguous: needs-confirmation |
| ID | id, passport, licence, license, identity | Expiry printed, against the deadline | Not expired | Before the deadline: stale. None or month-only: needs-confirmation |
| Resume | resume, résumé, cv | File modified date, labelled as a file date | 90 days | Earlier: stale, worded with its valid-through date. No file date: needs-confirmation |
| Recommendation letter | letter, recommendation, reference | Date printed | 12 months | Earlier: stale. Undated, or addressed to someone other than the program or organization returned at step 1.1, or the application name if none was returned: needs-confirmation |
| Essay | essay, statement | Word estimate | The limit in the requirements document | Always needs-confirmation until the user says yes |
| Anything else | Words from the requirements document, without small words such as "of" or format names such as "PDF" | Date printed, if the document sets a limit | None | With a limit: same as Transcript. With no limit: ready once its kind is confirmed, with the note "no validity rule applied". A word limit is handled as for Essay |

A file date is used only for a resume. For other kinds it only sets the order in which files are checked.

An item with accepted alternatives counts any of them toward the number required. Each file gets the row for the kind it is.

## Other cases that need confirmation

- A printed or modified document date after the deadline, or the date used for that kind missing its day or year. This does not apply to an ID expiry: an expiry on or after the deadline is valid.
- A wrong format, a file over a page or size limit, or any limit that could not be checked.
- Any file with a word limit in the requirements document, until the user says it is within the limit.

## Choosing per kind

Drop wrong-kind files first. Then count:

- V: valid files
- S: stale files
- U: unsure files, meaning cannot tell, unreadable, partly read, unchecked, or any file this page calls needs-confirmation
- R: the number required, or 1 if the requirements document states no number. M207 shows this count, so the user can correct it

| Case | Status |
|---|---|
| V greater than R | needs-confirmation, and the user picks |
| V equal to R | ready, with the others named in a note |
| V less than R, and the search failed or reached its limit | needs-confirmation |
| V less than R, and U above 0 | needs-confirmation |
| V less than R, and S above 0 | stale, "V of R valid", showing the newest date |
| Otherwise | missing, stating how many short |

Where V is above 0 and below R, copy the V valid files and list them in the plan, unless the user says to leave out the whole item. The item keeps its status, and the checklist gets one item row per file.

## The user's answers

Each answer applies only to the file and question asked:

- A yes at M309 confirms the kind, and the file then gets its date rule. Saying a dropped file is the right kind counts the same way.
- Any other use-anyway yes clears that one problem. The file is valid once no problem is left.
- Going on at M304 removes only the row about the search limit.
- A pick at M321 makes the picked files the valid ones, and the others go in a note.
- Leave it out applies to the file the message names or to what is short, and never drops a valid file of that item unless the user says to leave out the whole item.
- At M301 to M303 and M323 to M325, leave it out also ends the questions on that item. The item keeps its status and is listed as left out.

Then apply the table again, and the item takes the status it gives, unless it was left out at one of those item messages. An item still below R follows the rule above. An accepted file is recorded in the checklist as "accepted by user", with its original status. A file the user changes or replaces goes back through steps 2.2 to 2.5.
