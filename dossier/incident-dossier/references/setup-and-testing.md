# Setup and testing

## What the NAS needs

Dossier still runs if any of these is missing, and it says what it could not check.

| Needed | What it gives Dossier | What you see without it |
|---|---|---|
| Surveillance Center installed, with a camera on the same network as the NAS | Camera events and evidence | M-02 or M-04 |
| A model enabled in Model Manager and authorized for Surveillance Center, with detection turned on for each camera | Events from local AI detection | M-03 |
| Face recognition turned on and authorized, where your region allows it | Known and stranger results | No identity data |
| Plate data, if your NAS provides it | Plate results | No plate data returned |
| Photos on the NAS, not only on your phone | The photo branch | M-08 or M-09 |
| Your policy or lease saved on the NAS | The requirements list | M-11, then a generic checklist |
| An account that may use Surveillance Center and archive recordings | Evidence and archived clips | M-04 or M-07b |

Model Manager's Smart Commands setting controls which NAS apps Uliya can use. If a branch fails for no clear reason, check it there. Whether it affects these experts has not been tested.

## Things to check first

- **Model setting:** in Uliya, Local model keeps processing on the NAS by default. See [disclosures](disclosures.md) for what Cloud model and Hybrid mode mean.
- **Your cameras:** UGREEN asks camera owners to have authority over the camera, keep it clear of other people's private spaces, avoid public areas such as streets and neighbors' yards, and have any consent needed from people recorded.
- **Who can read the folder:** that depends on the permissions of the folder you choose. Prefer a personal folder.
- **Indexing:** Intelligent Learning in Model Manager may index and summarize documents saved on the NAS, including these files. Exclusion paths are listed under Universal Search, but UGREEN does not say whether they also stop Intelligent Learning.

## Install

Follow the instructions UGREEN gives Finalists for the assigned NAS. This Skill is not listed on SkillHub.

## Remove

Remove the Skill the same way it was installed. The folders it built stay where they are, because they are yours. Delete them yourself if you want them gone. Its checks read the NAS and change nothing, and it writes only the one folder you approved for each run, plus the dossier root if that did not exist yet. Delete an empty root yourself if you want it gone.

## Test it

Nothing here has run on a NAS yet. Say: build a claim dossier for this incident. If a first-party Skill answers instead, say the name, incident-dossier.

Place these first, using made-up content only:

- A folder with three photos: one of damage taken before the first camera event you expect, one with a running clock showing the wrong time, and one taken after your window
- The fictional policy below, saved as a Markdown file
- A camera on the NAS network, for the camera tests only. No Skill action can create events, so a test without one takes the no-cameras path

Fictional policy to save:

```text
Testville Fictional Mutual. Fictional document for software testing.

Duties after a loss

4.1 Notice. You must give us written notice of a loss within 30 days of the date of loss. Send notice to Claims, Testville Fictional Mutual, 555-0100, claims@example.invalid.

4.2 To file a claim you must provide:
a. a signed claim form TF-100
b. photographs of the damage
c. the date, time and location of the loss
d. the name and contact details of any other party, and the plate of any other vehicle, if known
e. any video or other recording of the incident
```

| Test | Setup | Expected |
|---|---|---|
| No cameras | Photos and policy, no camera | M-02, then a gap list. Order check not run: no camera events. The running clock note still appears. Built |
| Driveway | Photos, policy, a camera with events in your window | Events, identity and evidence, then a gap list |
| Times disagree | The damage photo above, with a Vehicle event later in the window | Order disagreement with both times, and neither picked |
| Cancel | Cancel the folder prompt, then in another run cancel one copy | M-15 and Not built, then M-17 and Partial |
| Nothing found | No cameras, no photos, no policy | M-14, and no folder unless you ask |

## Versions

Built against uliya-skill-kit 0.7.3 and capability catalog 2.0.0, and checked with that kit's checker. UGREEN's Technical FAQ refers to kit 0.7.6, which has not been checked against this Skill.
