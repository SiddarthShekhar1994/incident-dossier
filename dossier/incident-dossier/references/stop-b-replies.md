# Stop B replies

What to do with the reply to M-20, M-14 or M-14b. One reply can hold several of these. Step numbers refer to SKILL.md.

## Which read a path means

A reply that says what a path is needs no question, and a reply to M-01b corrects the read M-01b named. A bare path answers the open request if exactly one is open: M-09 or M-10 for photos, M-20 item 7 for an archive folder, M-12, M-14 or M-14b for a claim document, M-30 or M-16 for a new root. Otherwise send M-33. If the 0.2 check shows a type that does not fit the open request, such as a file for a folder request, send M-33 too, except that a bare image file with M-09 or M-10 open goes to the one photo read. M-01b and M-33 do not use up the further stop.

A full path counts as a new root only if the reply says so, or M-30 or M-16 is open. In reply to M-14b, a path is never a new root.

## Reads started from a reply

These run after the first pass, so they affect only what the reply named, and they come back here. They never go on to step 5, and they never send M-20 again.

- **A photos folder that is empty:** send M-08.
- **A photos folder that cannot be listed:** send M-08d.
- **M-05d or M-05e:** a refusal leaves out only that folder's photos. A folder named in reply runs the 0.2 check and 4.1b.

Recompute the gap list, the order check and the Photo branch line after any new read.

## Replies to M-20

- **Stop:** send M-22 and end the run.
- **Photos to add:** above 25 added photos, send M-05g first. A refusal leaves them out and comes back here. Otherwise run 4.3 on each one.
- **Keep:** above 25 held events, send M-05f first. A refusal leaves them held and comes back here. A narrower window or a named camera at that question gets M-28, which counts as a refusal. Otherwise run steps 2 and 3 on the held events: 2.1 and 2.2 unless the user said skip identity, then 3.1 and 3.2. Send M-06 without the added line from M-20 item 7 for any new references.
- **Names and plates:** the most recent explicit answer stands across M-26 and the further stop. Include them only on a yes to including them. A reply that treats the two differently, with a yes to one or a no to only one, withholds both: send M-32. A no to both withholds them, with no message. A bare yes, here or to M-26, answers Build this and changes nothing about them. With no explicit answer in any reply, they stay withheld.
- **A camera event to compare against:** use it as the anchor only if this run returned it and it is in the dossier, after any keep in the same reply. Otherwise send M-34 and keep the current anchor.
- **A new folder name or root:** a name with no slash replaces the folder name. A full path starting with a slash is a new root, as above: run the 0.2 check on it. Anything else gets the first line of M-01b. Then run 5.2 again.
- **A photos folder:** send the 0.2 check, then 4.1b and 4.2, and 4.3 only on photos inside the window. Above 25 new photos inside the window, send M-05d first.
- **An archive folder:** send the 0.2 check, then 3.3.
- **A claim document:** send the 0.2 check, then 5.1.
- **One photo:** send the 0.2 check, then 4.2 and 4.3.
- **Use generic:** load that checklist.
- **Files to leave out:** drop them from the copy list.
- **A narrower window or a named camera:** send M-28.
- **Any other single file:** send M-27.
- **No clear yes or stop:** send M-26 and wait. A yes about names or plates alone is not a yes to build.

A wrong path in a reply gets M-01b.

**While M-30 is open, at this stop or the further stop:** leave out M-20 item 10. A full path is a new root, unless it is bare and another request is open, which gets M-33. A yes does not build. A reply with no new folder or root and no stop gets M-30 again. No further stop starts until a name passes 5.2. If M-30 opens at the further stop, then once a name passes 5.2, send M-26 with the new full path.

If the reply leaves nothing to build, do not build, at this stop or the further stop. If events are still held, send M-31 and wait: keep runs as above, and anything else sends M-22 and ends the run. At an M-31 reached from the further stop, any new files are shown in a following M-26, with no second stop. Otherwise send M-14 or M-14b and wait.

## Replies to M-14 and M-14b

If M-30 fired, send it in place of M-14 until a name passes 5.2, and then send M-14. M-14b never builds, so hold M-30 back until a read leads to M-20.

- **A path:** run the matching read above, and then the top of Stop B runs again.
- **Save the checklist, to M-14:** load the list M-14 names, if it is not already loaded, and go to step 7 with no copies.
- **Use generic, to M-14:** load that list and send M-14 again.
- **A new folder name or root, to M-14:** handle it as above, and send M-14 again.
- **Anything else, to M-14:** send M-22.
- **Anything else, to M-14b:** the run ends, as M-14b says.

## Further stop

Stop again, once, only if:

- a folder or a kept event turned up files the user has not seen
- a new read or a loaded checklist changed a status or the order check
- M-12 fired on a read from this reply and no list is loaded

A photo the user picked from the list needs no new stop, unless its description changes a status or the order check. Text asking for an action that first appears after the last stop is sent as M-20 item 3 before step 7, with no stop.

Repeat M-20 items 1, 2, 4, 8, 9 and 10 with the new values, plus item 3 for any new text, the use generic line from item 5 if M-12 fired, and M-06 without the added line from M-20 item 7 for any new references.

Then handle the reply. One reply can hold several of these:

- **Stop:** send M-22.
- **Picks from its list:** as for photos to add above.
- **A camera event to compare against:** as above.
- **Names and plates:** as above.
- **Files to leave out:** drop them from the copy list.
- **Use generic:** load that checklist. The changed statuses appear in the text shown at 7.5.
- **A new folder name with no slash:** it replaces the folder name. Run 5.2 again.
- **Keep:** if nothing else would be left to build, keep runs as at M-31 above. Otherwise send M-28, and leave those events out. Then send M-26, even if the reply also says yes.
- **A path:** it is not read. Send M-28. While M-30 is open, a full path is a new root instead.
- **A yes:** go to step 7, after any of the above, unless nothing is left to build or M-30 is open.

With no clear yes or stop, send M-26 and wait.
