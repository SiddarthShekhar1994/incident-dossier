# File formats

This page defines two kinds of text file. Packet recognizes each one by its first line, not its file name, because the NAS decides the final name. Keep these files short, and keep the first and last lines exactly as shown. A last line that is missing means the file was cut off.

## Checklist

One checklist file is saved in each packet folder.

```text
Packet checklist v1
Application: {application name}
Deadline: {YYYY-MM-DD}
Measure date: {YYYY-MM-DD}
Submission method: {method, or "Not stated in the requirements document"}
Records folder: {real path, or the path given if the folder does not exist yet}
Consistency: {ran: compared K facts against N of M records, or not run: reason}
Build: {complete, or incomplete: reason}

## Items
{n} | {kind} | {status, or "left out: reason" such as "left out: struck by you", plus "accepted by user", "no validity rule applied", "not copied" or "copy not confirmed" if so} | {packet path, or blank} | {source real path, or blank} | {date read, or blank}

## Not files, yours to handle
{item}

## Contradictions and answers
{fact} | {new value} | {record file} {fact ID} | "{quoted line}" | {keep, fixed or leave out} | {reason}

## Changed since
{fact} | {old value} | {new value} | {record file} {fact ID}

## Facts read
{fact lines, or "none found", or "not extracted: reason"}

Checked against the dates shown. Confirm before submitting.
End of checklist
```

Write one item row per file on the copy list, and a file serving two items gets a row under each. An item with no file on the copy list gets one row with a blank packet path, showing its newest file and date read if a file was found.

## Record

A record is one Markdown file per past submission, kept in the records folder. It can also be written by hand in this format.

```text
Packet record v1
Application: {application name}
Slug: {slug}
Submitted: {YYYY-MM-DD}
Packet: {packet folder name}
Submission method: {method, or "Not stated in the requirements document"}

## Files sent
{path relative to the packet folder} | {item kind}

## Facts read from the packet documents
F01 | gpa | | 3.8 | transcript_2026-09.pdf
F02 | employment.start | Brightwell Labs Ltd, Research Intern | 2025-06-02 | resume.pdf
(or "none found", or "not extracted: reason")

## Accepted differences
Accepted: {record file} F07 | new value kept | {reason, or "none given"}

End of record
```

Each fact line has an ID, the fact, what it is about, the value and the file it was read from. The sample lines are made up.

## Facts

Use these fact names:

`gpa`, `enrollment.start`, `enrollment.end`, `employment.start`, `employment.end`, `employment.role`, `activity`, `hours`, `essay.claim`

These facts normally change over time: `gpa`, `hours`, `employment.role`, `employment.end`, `enrollment.end`.
