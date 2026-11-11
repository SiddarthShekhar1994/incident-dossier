# Submit checklist

Round 1 and registration both close on **Sunday 2026-11-15 at 11:45 pm Pacific Time**. The plan is to finish everything below on Nov 14, so Nov 15 is only the submit button.

Read on 2026-11-10 in the built-in browser: the Devpost Overview, [Official Rules](https://ugreenhackathon.devpost.com/rules) and [Resources](https://ugreenhackathon.devpost.com/resources), the [Starter Kit](https://ai.ugreen.com/pages/hackathon-starter-kit) and UGREEN's [Technical FAQ](https://community.ugreen.com/nas/pagesD/circle/post?id=1591). The Rules prevail over the other pages (Rules section 11).

**The submission form was not seen.** It needs your Devpost login, and the built-in browser is signed out. The Rules say only "Complete and enter all of the required fields on the 'Enter a Submission' page". Section 3 therefore lists what the Rules and Overview require, plus the fields a standard Devpost project form has, each marked not seen.

## 1. Only you can settle these

| Item | Where it stands |
|---|---|
| AI tools wording in `references/disclosures.md` | Names Claude Code with Claude Opus 5.5 as the only AI tool, and says you wrote the idea and the original workflow and decided which changes to accept. Confirm both parts, and that no other AI tool or model was used anywhere, including for the idea, images or spelling. A change means rebuilding the ZIP (section 5) |
| Track | DESIGN decision 7 recommends Open Innovation. Your brief says Automate Your Workflow. All prizes are open to every track (Resources FAQ) |
| Your rewrite of the ten answers | The FAQ advises writing the PDF answers and the text description yourself. `PROPOSAL.md` has the facts to start from |
| Questions to UGREEN | Drafted in `dossier/NOTES.md`, not sent. On Nov 10 another participant asked the 0.7.6 question in the Technical FAQ comments, with no reply yet |
| Commit the ZIP to the public repo | Built at `dossier/dist/incident-dossier.zip`, not committed |

## 2. Before you open the form

| Check | Status on 2026-11-10 |
|---|---|
| You joined the hackathon ("Join Hackathon") with the Devpost account you will submit from. Registration closes with Round 1 | Not seen |
| You meet the eligibility rules: individual entrant, age of majority where you live, resident of a listed country (Rules section 3) | Yours to confirm |
| One Project per entrant: Dossier only. Packet stays parked and is not submitted (Rules, Multiple Submissions) | Decided 2026-11-06 |
| The PDF is built from your final text (section 4) | Waiting on your rewrite |
| The ZIP was rebuilt after the last package edit and checked (section 5) | Built and checked 2026-11-10 |

## 3. Form fields

| Field | Seen | What goes in it | Verify before submit |
|---|---|---|---|
| Project Proposal, PDF upload | Not seen. Required by the Rules and Overview | The PDF from section 4 | At most 1 MB. Ten answers in order, at most 500 words. The third-party block is in it |
| Pre-test Skill Package, ZIP upload | Not seen. Required by the Rules and Overview | `dossier/dist/incident-dossier.zip` | Rebuilt after the last package edit. Its SHA-256 matches the build output. At most 10 MB. Only `.md` files |
| Project name | Not seen | Dossier. The FAQ advises naming the project without AI | Same name as the PDF title |
| Elevator pitch or tagline | Not seen. Devpost usually caps it at 200 characters | One line in your words. Your answer 1 can serve | Same claims as the PDF, and none of the wording in section 7 |
| About the project, the text description | Not seen. The FAQ's advice about "your text description" suggests this field | Your own words | Same claims as the PDF. Nothing the PDF does not say |
| Built with | Not seen | For example Markdown, UGOS, Uliya, uliya-skill-kit and Claude Code | Matches the disclosure |
| Try it out links | Not seen. Round 1 needs no repository link | Leave empty unless you want judges to see the public repo | The repo also holds the parked Packet entry, which could read as a second Project |
| Video demo | Not seen. Round 1 needs no video | Leave empty | |
| Thumbnail or image gallery | Not seen | Optional. Only images you made, with no real footage, photos or personal data | An image made with AI goes in the disclosures |
| Track or category | Not seen | Your choice from section 1 | |
| Questions only this hackathon asks | Not seen | Answer each as asked. A team consent declaration or electronic signature is outside the word count | Nothing personal beyond what is asked |
| Team members | Not seen | You alone, as an individual entrant | Member names are outside the word count |
| Agreement to the Official Rules and Devpost Terms | Not seen. Devpost usually has a checkbox | Read both, then tick it yourself | Submitting is agreement to the Rules (Rules preamble) |
| Submit | Not seen | You press it. Drafts can be saved until the deadline (Rules section 5) | Section 8 first |

## 4. The PDF

Build it only after your rewrite.

1. Put your final answers into `dossier/docs/PROPOSAL.md`, under the same ten headings.
2. Recount from that final text. Expect a total of at most 500 and `no count problems`, which includes the one-sentence check on answer 1:

   ```powershell
   node dossier\tools\count-proposal.mjs dossier\docs\PROPOSAL.md
   ```

   It counts as a word processor does. If you want to be safe even with counters that split hyphenated words, keep the strict count under 500 too. The draft is at 493 and 525.
3. Check your text against section 7, and that answers 7 and 10 still hold the data flows and the open questions.
4. Lay out the PDF in this order: the title "Dossier (incident-dossier)", your name, the ten questions with your answers, then the third-party block from the end of `PROPOSAL.md`. Leave out the draft notes at the top of `PROPOSAL.md` and the instruction line under "Outside the word count".
5. Outside the 500 words: team consent declarations, member names, electronic signatures and third-party licence information (Rules). The Rules exclude these but ask for none by name. Put your name on the PDF, and add a declaration or signature only if the form asks. Data flows do count, so they stay in answer 7.
6. Export to PDF from your editor, or ask Claude to build it from `PROPOSAL.md`.
7. Open the PDF and check: at most 1 MB, text can be selected, English only, all ten answers in order, no personal data beyond your name, and no email address in its document properties.
8. If you edited text after the recount, count again from the PDF's own text.

## 5. The ZIP

Rebuild after any change under `dossier/incident-dossier/`, then run the three checks on the package from the repo root:

```powershell
py -I dossier\tools\build-zip.py dossier\incident-dossier dossier\dist\incident-dossier.zip
node "$env:USERPROFILE\.claude\skills\uliya-skill-kit\scripts\check-skill.mjs" dossier\incident-dossier
node dossier\tools\lint-package.mjs dossier\incident-dossier
node dossier\tools\check-dry-run.mjs dossier\incident-dossier dossier\docs\DRY-RUN.md
```

Expect `no zip problems`, `"status": "static-pass"` with 0 errors and 0 warnings, `no lint problems` and `no dry run problems`. Exit code 0 alone is not enough.

Then extract the ZIP into a new empty folder and check that copy:

```powershell
$x = Join-Path $env:TEMP ("dossier-zip-" + (Get-Date -Format yyyyMMddHHmmss)); New-Item -ItemType Directory $x | Out-Null
Expand-Archive -LiteralPath dossier\dist\incident-dossier.zip -DestinationPath $x
node "$env:USERPROFILE\.claude\skills\uliya-skill-kit\scripts\check-skill.mjs" "$x\incident-dossier"
```

On 2026-11-10 the ZIP was 34,015 bytes with 10 Markdown files and 91,175 bytes uncompressed, SHA-256 `cc1009e2b287e25254c53c7fe3466f0234060b84b20d4f4630c18ff4d23e740d`. Any package edit changes the hash. Each entry sits under `incident-dossier/` with forward slashes, and the same files always give the same ZIP.

## 6. Ship gate

From the `build-playbook` skill. Dossier is a Markdown-only package with no server, accounts, database, browser code or metered service, so most items do not apply.

| # | Item | Applies | Result on 2026-11-10 |
|---|---|---|---|
| 1 | No keys in shipped files | Yes: the ZIP | Pass. The extracted ZIP has no key or credential patterns. Its only email address is `claims@example.invalid` and its only phone number is the reserved 555-0100 |
| 2 | Environment variables per environment, `.env` ignored | No: no configuration, and no `.env` file was ever committed | Not applicable |
| 3 | Scan the full Git history for keys | Yes | Pass. No key patterns in any commit on any branch |
| 4 to 7 | Admin routes, authentication, per-object permissions, database rules | No: no server, accounts or database | Not applicable |
| 8 to 18 | Input checks, XSS, SQL, uploads, CSRF, CORS, HTTPS, headers, cookies, debug mode, production settings | No: no web app. The nearest risk, instructions hidden in photos or documents, is covered by the package's rule that such text is data (dry run case E17) | Not applicable |
| 19 to 22 | Rate limits, spend caps, bandwidth, runaway functions | No: Dossier calls no metered service. A cloud model is the owner's own Uliya setting | Not applicable |
| 23 | Accessibility of a website | No website | Not applicable |
| 24 | SMS consent | Dossier sends no messages | Not applicable |
| Extra | The ZIP holds only Markdown | Yes | Pass. The build refuses any other file, and lists 10 `.md` entries |
| Extra | Every commit uses the noreply address | Yes | Pass. Every author and committer is your GitHub noreply address, or GitHub's own `noreply@github.com` on merge commits |
| Extra | No local paths, brief or kit download committed | Yes | Pass, with a note. No Windows username, real home folder path, personal email address, kit file or brief content appears in any commit. `dossier/docs/MACHINE-SETUP.md`, from PR #3, names the brief's file and its generic Downloads location, and the old OneDrive project folder name |

To rerun item 3 and the extras after the last commit, from the repo root. Each should print nothing, except the second, which should show only noreply addresses. The brackets in the patterns stop them matching this file's own text:

```powershell
git log --all -p --format=%B | Select-String -CaseSensitive -Pattern 'AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9]{30,}|github[_]pat[_]|sk-[A-Za-z0-9_-]{20,}|xox[abprs]-[0-9A-Za-z]|AIza[0-9A-Za-z_-]{35}|-----BEGIN [A-Z ]*PRIVATE KEY-----'
git log --all --format='%ae %ce' | Sort-Object -Unique
git log --all -p --format=%B | Select-String -Pattern 'C:\\User[s]\\|/c/User[s]/|AppDat[a]\\|gmai[l]'
git log --all --name-only --format= | Sort-Object -Unique | Select-String -Pattern 'capability-catalog|check-skill|check-lib|_kit-download|uliya-skill-kit/'
```

## 7. Wording to keep out

From DESIGN section 3 and SkillHub Standards 2.2 and 2.4. Check the PDF, the tagline and the text description.

- "Nothing leaves the NAS", "no cloud calls" or a bare "no uploads". Use the data-flow wording of answer 7: Dossier calls no outside service, but Cloud model or Hybrid mode can send content to an outside AI provider, and UGREENlink or a bound chat app can carry results off the NAS.
- "Nothing on the market does this", or any superlative. Say "the tools I checked".
- "Claim-ready". Say "claim evidence folder".
- An expiry time worked out from a TTL. Expiry is written only as the NAS returns it.
- Any claim that Dossier views footage, confirms who someone is, or that a claim will succeed.
- Anything presented as an official UGREEN Skill.

## 8. Last pass before pressing submit

1. Check the time against 11:45 pm Pacific on Nov 15, in your own time zone.
2. Sign in to the Devpost account you registered with.
3. Attach the final PDF and the rebuilt ZIP. Compare the ZIP's SHA-256 with the build output.
4. Confirm the disclosure wording inside the ZIP is the version you approved.
5. Set the track.
6. Read every text field once more against section 7.
7. Confirm no personal data beyond your name is in the PDF, the ZIP or the text fields.
8. Tick the agreement, press Submit, then reopen the project page and check that it shows as submitted with both files attached. Download each file and open it.
9. After the deadline, change nothing in the Round 1 materials and delete nothing (Rules section 5).
