# Moving to another machine

How to carry this project and its Claude setup from one Windows machine to another. Every command is PowerShell. Run them one at a time, in order.

GitHub carries the project itself. Four things are not in git and have to be copied by hand:

| What | Where it lives | Why it matters |
|---|---|---|
| Claude skills | `%USERPROFILE%\.claude\skills` | Holds `uliya-skill-kit`, which the checker needs, and `build-playbook`, which the global instructions require |
| Global instructions | `%USERPROFILE%\.claude\CLAUDE.md` | Tells Claude to load `build-playbook` first |
| Project memory | `%USERPROFILE%\.claude\projects\<project folder>\memory` | What Claude remembers about this project between sessions |
| The project brief | `%USERPROFILE%\Downloads\claude-code-prompt-dossier.md` | The phase plan. It is private, so it stays out of the repo |

Two more are optional:

- `%USERPROFILE%\.claude\settings.json` holds your plugin list and app settings, with no machine paths. Copy it to keep the same plugins.
- `%USERPROFILE%\.claude-mem` holds the claude-mem history and to-do lists. It is close to 1 GB, and every open item is also in `dossier/NOTES.md`, so you can skip it.

Never copy `%USERPROFILE%\.claude\.credentials.json`. It is your login token. Sign in fresh on the new machine.

The steps below move these through a `claude-transfer` folder in OneDrive. If the new machine does not sync the same OneDrive account, use a USB drive instead. Replace `$env:OneDrive\claude-transfer` with the drive's path, such as `E:\claude-transfer`, in every command.

## 1. On the old machine

Close the Claude app first, so nothing is writing to these folders. Then check that nothing in the project is uncommitted or unpushed. Expect no file list, and a branch line with no "ahead" count.

```powershell
git -C "$env:OneDrive\Desktop\Projects\Ugreen Hackathon" status --short --branch
```

Make the transfer folder:

```powershell
New-Item -ItemType Directory -Force "$env:OneDrive\claude-transfer"
```

Copy the skills. Linked skill folders are copied as real folders. The `synced` folder is left out, because the app syncs it again by itself.

```powershell
robocopy "$env:USERPROFILE\.claude\skills" "$env:OneDrive\claude-transfer\skills" /E /XD synced
```

Copy the global instructions:

```powershell
Copy-Item "$env:USERPROFILE\.claude\CLAUDE.md" "$env:OneDrive\claude-transfer\"
```

Copy the project memory. The folder name is built from the project path, so this finds it:

```powershell
robocopy "$((Get-ChildItem "$env:USERPROFILE\.claude\projects" -Directory -Filter '*Ugreen-Hackathon').FullName)\memory" "$env:OneDrive\claude-transfer\memory" /E
```

Copy the brief:

```powershell
Copy-Item "$env:USERPROFILE\Downloads\claude-code-prompt-dossier.md" "$env:OneDrive\claude-transfer\"
```

Optional, to keep the same plugins:

```powershell
Copy-Item "$env:USERPROFILE\.claude\settings.json" "$env:OneDrive\claude-transfer\"
```

Optional, close to 1 GB:

```powershell
robocopy "$env:USERPROFILE\.claude-mem" "$env:OneDrive\claude-transfer\claude-mem" /E
```

`robocopy` reports exit code 1 when it copied files. That is success, not an error.

Wait until the OneDrive icon in the taskbar shows the folder is up to date before you go to the new machine.

## 2. On the new machine: install the tools

```powershell
winget install --id Git.Git -e
```

```powershell
winget install --id GitHub.cli -e
```

```powershell
winget install --id OpenJS.NodeJS.LTS -e
```

```powershell
winget install --id Python.Python.3.14 -e
```

```powershell
winget install --id Anthropic.Claude -e
```

Close PowerShell and open a new window, so it picks up the new programs. Then check each one is found:

```powershell
git --version; gh --version; node --version; py --version
```

## 3. Sign in to GitHub and clone

This opens a browser to sign in:

```powershell
gh auth login --hostname github.com --git-protocol https --web
```

Let git use that sign-in:

```powershell
gh auth setup-git
```

Clone outside OneDrive. Two machines syncing the same `.git` folder through OneDrive can corrupt it.

```powershell
New-Item -ItemType Directory -Force C:\Projects
```

```powershell
gh repo clone SiddarthShekhar1994/incident-dossier C:\Projects\incident-dossier
```

Set the commit identity for this repo. The email is the GitHub noreply address, so no personal email reaches a public commit.

```powershell
git -C C:\Projects\incident-dossier config user.name "Siddarth Shekhar"
```

```powershell
git -C C:\Projects\incident-dossier config user.email "70031863+SiddarthShekhar1994@users.noreply.github.com"
```

Switch to the branch you are working on. Until PR #3 is merged, that is `dossier-phase-3`:

```powershell
git -C C:\Projects\incident-dossier switch dossier-phase-3
```

After it is merged, use `main` and pull instead:

```powershell
git -C C:\Projects\incident-dossier switch main
```

```powershell
git -C C:\Projects\incident-dossier pull
```

## 4. Restore the Claude files

Make sure the Claude app is closed.

```powershell
robocopy "$env:OneDrive\claude-transfer\skills" "$env:USERPROFILE\.claude\skills" /E
```

```powershell
Copy-Item "$env:OneDrive\claude-transfer\CLAUDE.md" "$env:USERPROFILE\.claude\CLAUDE.md"
```

The memory folder name comes from the new project path. For `C:\Projects\incident-dossier` it is `C--Projects-incident-dossier`:

```powershell
robocopy "$env:OneDrive\claude-transfer\memory" "$env:USERPROFILE\.claude\projects\C--Projects-incident-dossier\memory" /E
```

```powershell
Copy-Item "$env:OneDrive\claude-transfer\claude-code-prompt-dossier.md" "$env:USERPROFILE\Downloads\"
```

If you copied them:

```powershell
Copy-Item "$env:OneDrive\claude-transfer\settings.json" "$env:USERPROFILE\.claude\settings.json"
```

```powershell
robocopy "$env:OneDrive\claude-transfer\claude-mem" "$env:USERPROFILE\.claude-mem" /E
```

## 5. Check it works

```powershell
cd C:\Projects\incident-dossier
```

Expect `"status": "static-pass"` with 0 errors and 0 warnings:

```powershell
node "$env:USERPROFILE\.claude\skills\uliya-skill-kit\scripts\check-skill.mjs" dossier\incident-dossier
```

Expect `no lint problems`:

```powershell
node dossier\tools\lint-package.mjs dossier\incident-dossier
```

Expect `no dry run problems`:

```powershell
node dossier\tools\check-dry-run.mjs dossier\incident-dossier dossier\docs\DRY-RUN.md
```

Then open the Claude app, sign in, go to the Code tab, and open the folder `C:\Projects\incident-dossier`. In the first session, ask Claude what it remembers about this project. If it knows about Dossier, the memory landed in the right place. If it does not, list the project folders and move the memory files into the one whose name ends in `incident-dossier`:

```powershell
Get-ChildItem "$env:USERPROFILE\.claude\projects" -Directory | Select-Object Name
```

If you did not copy `settings.json`, reinstall your plugins in the app.

## 6. Clean up

Once everything works, delete the transfer folder. It holds your private memory and brief, and OneDrive keeps it on every synced device.

```powershell
Remove-Item -Recurse -Force "$env:OneDrive\claude-transfer"
```

## Things to know

- If the new machine syncs the same OneDrive, the old project folder under `OneDrive\Desktop\Projects` appears there too. Leave it alone and work only in `C:\Projects\incident-dossier`. Stop working in the old folder on the old machine as well.
- A Claude conversation does not move between machines. A new session picks up from the memory files, `dossier/NOTES.md` and `dossier/docs/DESIGN.md`.
- Claude runs in the cloud, so a faster GPU or more RAM does not speed up Claude. It helps local tools, browser previews and making test files.
