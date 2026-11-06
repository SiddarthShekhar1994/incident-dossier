# Messages

Send these by ID. Keep the wording, and fill each `{value}` with the real value. `{error}` is the error the expert reported. `{date kind and date}` names the date the validity rules use, such as issue date 2026-09-01, expiry date 2026-06-30 or file date 2026-11-05. Never add an identity number to a message. A file path is shown as it is.

## Intake and any step

| ID | When | Message |
|---|---|---|
| M101 | Start | I will search the folder you give me and read matching files, which may include IDs and transcripts. Nothing is copied or changed until you approve it. |
| M102 | Path check fails | I could not open {path}. It may not exist or you may not have access. Please give the correct path. |
| M103 | Wrong kind of path | {path} is a {folder or file}, and I need a {file or folder}. Please give the correct path. |
| M104 | Home folder offered | Your home folder is {path}. Use it as the documents root, or give me another path? A narrower folder gives more reliable results. |
| M105 | Home folder lookup fails | I could not look up your home folder. {error} Please type the path. |
| M106 | Slug empty | {application name} gives me no letters or digits for a folder name. Please give a short name. |
| M110 | Read step cancelled | {what I was doing} was cancelled, so I stopped {what depends on it}. This step changed nothing. Try again, or stop? |
| M111 | Approval pending | Waiting for your approval on the NAS: {write}. Nothing that depends on it will run until it finishes. |
| M112 | Value missing | I stopped because the last step did not return {value}. Nothing more was changed. |
| M113 | Expert question not answered | You did not answer, so I stopped {step}. {what stands} Try again, or stop? |

## Step 1

| ID | When | Message |
|---|---|---|
| M201 | Cannot read the requirements document | I could not read {requirements_path}. I stopped before searching anything. {error} |
| M202 | No items | I read {requirements_path} and found no required items. I stopped before searching anything. |
| M203 | Partly read | I could only read part of {requirements_path}, so this list may be incomplete. Please check it against the document when you review the list. |
| M204 | No usable deadline | The document gives: {printed text or "no deadline"}. What date will you submit by? I use it for age checks and the folder name. |
| M205 | Date declined | I need a date to check document age and name the folder, so I stopped. Nothing was changed. |
| M206 | Date not usable | {text} is not a full date. Please give the year, month and day. |
| M207 | List review | Here is what {requirements_path} asks for: {numbered items with count, format, limits, accepted alternatives and any condition on who must provide it, marked "sensitive" where it applies}. Yours to handle, not searched: {items}. Deadline: {deadline}. I have searched nothing yet. Cross out anything that does not apply, and tell me what is missing. If you will submit before the deadline, give me that date and I will measure age against it, except where the document names another date. Shall I search? |
| M208 | Measure date too late | {date} is after the deadline {deadline}, so I will measure against the deadline. |
| M209 | Nothing to search | No file items are left to search, so I stopped. Yours to handle: {items}. Nothing was changed. |

## Step 2

| ID | When | Message |
|---|---|---|
| M301 | Search has no results | {item}: no results. No pdf, doc, docx, txt, md, jpg, jpeg or png file under {documents_root} has a word in its name that starts with: {words}. {If any were discarded: I set aside {d} files found in earlier packets, the records folder or the recycle bin.} If the name runs words together, like MyResume, or the file has another name or type, give me the path, or leave it out? |
| M302 | All wrong kind | {item}: no match. I checked {n} files with these words in their names, and none looks like a {item}: {list}. If one of these is the right file, tell me which. If it is named differently, give me the path, or leave it out? |
| M303 | Search failed | {item}: I could not search {documents_root}, so I cannot say whether this file exists. {error} Try again, give me the path, or leave it out? |
| M304 | A search call returned as many results as its limit | {item}: the search returned {n} results, the same as the limit used, so the list may be incomplete. Give me a narrower folder or the file's path, or go on with what I found? |
| M305 | Every search finished, nothing found | I found none of the {n} required items under {documents_root}. If this is the wrong folder, give me the right one. If the files are named differently, give me their paths. Or tell me to stop. Nothing was changed. |
| M306 | Every search failed | I could not search {documents_root} for any of the {n} required items. {error} I stopped. Nothing was changed. Please check the folder, or tell me to try again. |
| M307 | Cannot read a file found | {path}: I found this file but could not read it. Use it anyway, give me another file, or leave it out? |
| M308 | Partly read | {path}: I could only read part of this file, so what I report may be wrong. Please check it. Use it anyway, or leave it out? |
| M309 | Cannot tell kind | {path}: I could not tell whether this is a {item}. Is it? Yes, no, or leave it out? |
| M310 | No clear date | {path}: I could not find a clear {date kind}. Please check it. Use it anyway, or leave it out? |
| M311 | Cannot get file date | {path}: I found this file but could not get its date. {error} Please check it. Use it anyway, or leave it out? |
| M312 | Cannot compare copies | I could not compare {path} with the other {item} files. {error} It may be a duplicate. |
| M313 | Date after the deadline | {path}: {date kind and date}, after the deadline {deadline}. The deadline may have passed, or the date may be wrong. Use this file, replace it, or leave it out? |
| M314 | Different recipient | {path}: this letter is addressed to {recipient}, not {program or organization, or the application name if the document names neither}. Use it anyway, or leave it out? |
| M315 | Essay or other item with a word limit | {path}: about {n} words against a limit of {limit}. This is an estimate, not a count. Please check it in your editor and tell me if it is within the limit. |
| M316 | Essay, no limit in the document | {path}: about {n} words. The document gives no word limit. This is an estimate, not a count. Is this the essay you want to send? Yes, replace it, or leave it out? |
| M317 | Essay may miss the prompt | {path}: this may not answer the prompt: "{essay prompt}". Use it anyway, replace it, or leave it out? |
| M318 | User says over the limit | {path}: not ready, because you said it is over the limit. Replace it, or leave it out? |
| M319 | Page or size check fails | I could not check the {page count or size} of {path}, and the limit is {limit}. Please check it. Use it anyway, or leave it out? |
| M320 | Over a limit, wrong format, or a limit that is not a number | {path}: {found, or the date read} against a limit of {limit, or the document's words}. Use it anyway, replace it, or leave it out? |
| M321 | Several valid | {item}: I found {V} valid files and need {R}. Which should I use? {numbered list with path and date} |
| M322 | Names differ | These documents show different names: {list}. Please check they are all yours. Tell me any that are not, and I will leave them out. |
| M323 | Stale | {item}: {V} of {R} valid. Newest: {path}, {date kind and date}. It is valid for submissions through {valid_through}, and I am measuring against {measure_date, or the deadline for an ID or a limit worded from it}. Use it anyway, replace it, or leave it out? |
| M324 | Short | {item}: I need {R} and found {V} valid, so I am {short} short. Found and not used: {list and reasons}. Give me the path, or leave it out? |
| M325 | Files left unchecked, V less than R | {item}: I checked the newest {k} of {total} files, so this needs your review. Give me the path or a narrower folder, or leave it out? |
| M326 | Ready | {item}: ready. {path}, {date kind and date, or "no date needed"}, name on it: {name, or "not stated"}. {If no rule applied: No validity rule applied.} {If a condition applies: Please check it meets this condition: {condition}.} Also found, not used: {list and reasons, or "none"}. {If capped: Checked the newest {k} of {total} files.} |

## Step 4

| ID | When | Message |
|---|---|---|
| M501 | Zero files to copy | No files are ready, so there is nothing to build: {items and reasons}. No folder was created. |
| M502 | Cannot check earlier packets | I could not read {path} to check for earlier packets. {error} Nothing was created. Try again, or stop? |
| M503 | Earlier packet exists | A packet for this application already exists at {path}. It may be incomplete. Stop, or build a new one at {new_path}? |
| M504 | Plan | I will create {packet_path}. I will copy: {source to destination list}. I will leave out: {items and reasons}. Originals stay where they are. Expect about {count} NAS approval prompts, roughly one per write. The exact number depends on the NAS. Approve this plan? |
| M505 | Stop or plan declined, before this build's folder exists | Stopped at your request. Nothing was created or copied. |
| M506 | Create cancelled | The folder step was cancelled. Nothing was copied. |
| M507 | Create failed, or folder not empty | I could not use {packet_path}: {error or list of what is there}. Nothing was copied. Build at {new_path} instead, give me another folder to build in, or stop? |
| M508 | Copy cancelled | Copy of {file} was cancelled. Earlier copies stay in {packet_path}. Continue without it, or stop? |
| M509 | Copy failed | Stopped at {file}: {error}. Copied: {list}. Not copied: {list}. Not attempted: {list}. Retry the rest, save a checklist marked incomplete, or stop? |
| M510 | No copies made | No files were copied, so I did not save a checklist. {packet_path} stays, with no files in it. Removing it is manual. |
| M511 | Listing failed | Copied according to the NAS, but I could not confirm it with a folder listing. I will mark {files} as "copy not confirmed" in the checklist. Please check {packet_path} yourself. |
| M512 | Copy not in folder | The NAS reported copying {file}, but it is not in {packet_path}. I am treating it as not copied. Try again, continue without it, or stop? |
| M513 | Different file with that name | {packet_path} already has a different file named {file}, so I did not count it as copied. Nothing was replaced. Build at {new_path} instead, continue without it, or stop? |
| M514 | Could not compare | I could not compare {file} with the copy already in {packet_path}. {error} I am treating it as not copied. Try again, continue without it, or stop? |
| M515 | Original gone | Original not found at {path}. The copy may have moved it. A copy is at {destination}. I stopped before saving the checklist. Please check, then tell me to continue or stop. |
| M516 | Cannot confirm original | I could not confirm the original at {path}. {error} Please check it is still there, then tell me to continue or stop. |
| M517 | Checklist text | Here is the checklist I will save in {packet_path}: {text}. Approve saving it? |
| M518 | Save declined, cancelled or failed | Checklist not saved. {error if any} The files are in {packet_path}. Your answers on flagged items exist only in this chat. Save again, or stop? |
| M519 | Save not confirmed | The NAS did not confirm saving the checklist in {packet_path}. It reported: {outputFile or "no file name"}. Please check that location. Save again, or stop? |
| M520 | Stop after the folder exists | Stopped at your request. {packet_path} stays, with: {files or "no files"}. No checklist was confirmed as saved. Removing this folder is manual. |
| M521 | Done | Packet folder built at {packet_path} with {X} of {Y} required items: {list}. Stale, missing, needs-confirmation or left out: {list}. Yours to handle: {items, or "none"}. Checklist saved as {outputFile}. Checked against the dates shown, so please confirm before submitting. The checklist holds private notes, so do not send it with the application. Removing this folder later is manual. |

M521 opens with "Copies not fully confirmed" if M511, M515 or M516 fired, otherwise with "Packet folder incomplete" if the checklist is marked incomplete, instead of "Packet folder built".
