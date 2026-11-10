# Run values

Each instruction in SKILL.md uses these slots. Each one is filled at run time from what the user typed and confirmed, or from the real result of an expert.

| Run value | What it holds | Comes from |
|---|---|---|
| `{description}` | The incident, in the user's words | The user |
| `{window_start}`, `{window_end}` | Date and time with offset, such as 2026-11-02T14:50:00-08:00. A window spanning a clock change keeps each end's own offset | The user, confirmed at M-01 |
| `{zone}` | Timezone name, such as America/Los_Angeles | The user, confirmed at M-01 |
| `{topic_scope}` | The words from the incident table: the topics, or with no topic filter | Step 1 table |
| `{camera_scope}` | The words all cameras, or only the cameras with these ids, followed by the ids | Step 1.1 |
| `{event_ids}` | Every event id to look up, as returned | Step 1.2 or 1.3 |
| `{event_id}` | One event id, as returned | Step 1.2 or 1.3 |
| `{plate_id}` | One plate id returned for that event | Step 1.2 or 2.1 |
| `{path_to_check}` | One path to confirm | The user, or a returned value |
| `{archive_dir}`, `{photos_dir}` | Real path of an archive folder or photos folder the user named | The check at step 0.2 |
| `{claim_doc}` | Real path of the claim document | The check at step 0.2 |
| `{photo_start}` | The local date of the day before `{window_start}`, as YYYY-MM-DD | M-01 |
| `{photo_scope}` | The words only under the folder followed by `{photos_dir}`, or in the Photos library | Step 0.2 |
| `{photo_paths}`, `{photo_path}` | Real paths of the photos found, or of one photo | Step 4.1 or 4.1b |
| `{dossier_root}` | Real path of the root, or the path as named if it does not exist yet | Step 0.1 or 0.2 |
| `{slug}`, `{date}` | Folder slug from the incident table, and the local date of `{window_start}` as YYYY-MM-DD | Step 1 table, M-01 |
| `{dossier_path}` | `{dossier_root}/{slug}_{date}`, or `{dossier_root}/` plus a folder name the user gave, with `_r2`, `_r3` and so on added if the name is taken | Step 5.2 |
| `{dossier_real_path}` | Real path of the new folder | Step 7.1 |
| `{source_path}` | Real path of one file to copy | Steps 3.2, 3.3, 4.1 or 4.1b |
| `{copy_path}` | Real path of that copy | Step 7.2 |
| `{timeline_text}`, `{checklist_text}` | The full text of each file | Steps 7.4 and 7.5 |

In messages and file lines, {start} is the local date and time, and {end} is the local time, with its date if it ends on a later date. M-01 is the exception, because it has {date}. If the window touches a clock change, each also carries its offset.
