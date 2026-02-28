---
name: playwright-cli-dogfood
description: Systematically explore and test a web application with playwright-cli to find bugs, UX issues, and other problems. Use when asked to "dogfood", "QA", "exploratory test", "find issues", "bug hunt", "test this app/site/platform", or review the quality of a web application. Produces a structured report with full reproduction evidence — step-by-step screenshots, repro videos, and detailed repro steps for every issue.
allowed-tools: Bash(playwright-cli:*)
---

# Dogfood (playwright-cli)

Systematically explore a web application with **playwright-cli**, find issues, and produce a report with full reproduction evidence for every finding.

## Setup

Always ask the user to confirm the setup before staring.

| Parameter | Default | Example override |
|-----------|---------|------------------|
| **Run mode** | `headed` | , `headless` |
| **Target URL** | `saucedemo.com` | `saucedemo.com`, `http://localhost:3000` |
| **Session name** | Slugified domain (e.g. `saucedemo.com` → `saucedemo-com`) | Use `-s=my-session` for named session |
| **Output directory** | `./dogfood-output/` | `Output directory: /tmp/qa` |
| **Scope** | Full app | `Focus on the billing page` |
| **Test Evidence** | screenshot, snapshot | `video` |

**saucedemo login:** Refer to [references/.env](.agents/skills/playwright-cli-dogfood/references/login-instructions.md).

**When no page or feature is specified:** If the request is broad (e.g. "dogfood saucedemo") and does not mention a specific page or feature, **present scope options** from [references/scope-options.md](.agents/skills/playwright-cli-dogfood/references/scope-options.md) so the session can be more targeted. If they already specified a page or feature in the request, skip presenting options and use their scope unless it's unclear.

Use **playwright-cli** for all browser automation. Element refs from `playwright-cli snapshot` are like `e1`, `e15` — use them without the `@` prefix in commands (e.g. `playwright-cli click e3`).

## Workflow

```
1. Initialize    Set up session, output dirs, report file
2. Authenticate  Sign in if needed, save state
3. Orient        Navigate to starting point, take initial snapshot
4. Explore       Systematically visit pages and test features
5. Document      Screenshot + record each issue as found
6. Wrap up       Update summary counts, close session
```

### 1. Initialize

```bash
mkdir -p {OUTPUT_DIR}/screenshots {OUTPUT_DIR}/videos
```

Copy the report template into the output directory and fill in the header fields:

```bash
cp .agents/skills/playwright-cli-dogfood/templates/dogfood-report-template.md {OUTPUT_DIR}/report.md
```

Start a named session and open the target URL:

```bash
playwright-cli -s={SESSION} open {TARGET_URL} --headed
```

Wait for the page to settle (e.g. take a snapshot to confirm load):

```bash
playwright-cli -s={SESSION} snapshot
```

### 2. Authenticate

If the app requires login:

```bash
playwright-cli -s={SESSION} snapshot
# Identify login form refs from snapshot output (e.g. e1=email, e2=password, e3=submit)
playwright-cli -s={SESSION} fill e1 "{EMAIL}"
playwright-cli -s={SESSION} fill e2 "{PASSWORD}"
playwright-cli -s={SESSION} click e3
playwright-cli -s={SESSION} snapshot
```

For OTP/email codes: ask the user, wait for their response, then enter the code.

After successful login, save state for potential reuse:

```bash
playwright-cli -s={SESSION} state-save {OUTPUT_DIR}/auth-state.json
```

### 3. Orient

Take an initial screenshot and snapshot to understand the app structure:

```bash
playwright-cli -s={SESSION} screenshot --filename={OUTPUT_DIR}/screenshots/initial.png
playwright-cli -s={SESSION} snapshot
```

Identify the main navigation elements and map out the sections to visit.

### 4. Explore

Read [references/issue-taxonomy.md](.agents/skills/playwright-cli-dogfood/references/issue-taxonomy.md) for the full list of what to look for and the exploration checklist. If the user chose a **targeted scope**, prioritize that area first; then expand only if time allows.

**Exercise all controls by default.** Do not skip interactive elements to "save time" or complete a single happy path. For every page or flow in scope, interact with every control that a user would use before moving on.

**Strategy — work through the app systematically:**

- Start from the main navigation. Visit each top-level section.
- Within each section, test interactive elements: click buttons, fill forms, open dropdowns/modals.
- Check edge cases: empty states, error handling, boundary inputs.
- Try realistic end-to-end workflows (create, edit, delete flows).
- Check the browser console for errors periodically.

**At each page:**

```bash
playwright-cli -s={SESSION} snapshot
playwright-cli -s={SESSION} screenshot --filename={OUTPUT_DIR}/screenshots/{page-name}.png
playwright-cli -s={SESSION} console
```

**Track checks that pass.** As you explore, mentally note (or jot) actions/pages/features that you exercised and that behaved correctly with no errors. You will add these as a list at the end of the report (see Wrap up). No screenshots or evidence needed — the list gives a full picture of what was covered.

Use your judgment on how deep to go. Spend more time on core features and less on peripheral pages. If you find a cluster of issues in one area, investigate deeper.

### 5. Document Issues (Repro-First)

Steps 4 and 5 happen together — explore and document in a single pass. When you find an issue, stop exploring and document it immediately before moving on. Do not explore the whole app first and document later.

Every issue must be reproducible. When you find something wrong, do not just note it — prove it with evidence. The goal is that someone reading the report can see exactly what happened and replay it.

**Choose the right level of evidence for the issue:**

#### Interactive / behavioral issues (functional, ux, console errors on action)

These require user interaction to reproduce — use full repro with video and step-by-step screenshots:

1. **Start a repro video** _before_ reproducing:

```bash
playwright-cli -s={SESSION} video-start
```

2. **Walk through the steps at human pace.** Pause 1–2 seconds between actions so the video is watchable. Take a screenshot at each step:

```bash
playwright-cli -s={SESSION} screenshot --filename={OUTPUT_DIR}/screenshots/issue-{NNN}-step-1.png
sleep 1
# Perform action (click, fill, etc.)
playwright-cli -s={SESSION} click e5
sleep 1
playwright-cli -s={SESSION} screenshot --filename={OUTPUT_DIR}/screenshots/issue-{NNN}-step-2.png
sleep 1
# ... continue until the issue manifests
```

3. **Capture the broken state.** Pause so the viewer can see it, then take a final screenshot:

```bash
sleep 2
playwright-cli -s={SESSION} screenshot --filename={OUTPUT_DIR}/screenshots/issue-{NNN}-result.png
```

4. **Stop the video:**

```bash
playwright-cli -s={SESSION} video-stop {OUTPUT_DIR}/videos/issue-{NNN}-repro.webm
```

5. **Capture the page snapshot** (for the state where the issue is visible) and include it in the report inside a collapsible toggle so it doesn’t take up space:

```bash
playwright-cli -s={SESSION} snapshot
```

In the report, paste the snapshot output inside a `<details>` block with a short summary, e.g.:

````markdown
<details>
<summary>Page snapshot (DOM/accessibility tree)</summary>

```
{paste snapshot output here}
```

</details>
````

6. Write numbered repro steps in the report, each referencing its screenshot.

#### Static / visible-on-load issues (typos, placeholder text, clipped text, misalignment, console errors on load)

These are visible without interaction — a single screenshot is sufficient. No video, no multi-step repro:

```bash
playwright-cli -s={SESSION} screenshot --filename={OUTPUT_DIR}/screenshots/issue-{NNN}.png
playwright-cli -s={SESSION} snapshot
```

Write a brief description and reference the screenshot in the report. Set **Repro Video** to `N/A`. Include the snapshot in the report inside a collapsible `<details>` block (same format as for interactive issues).

---

**For all issues:**

1. **Append to the report immediately.** Do not batch issues for later. Write each one as you find it so nothing is lost if the session is interrupted.
2. **Include the page snapshot** in a collapsible toggle so readers can expand it without cluttering the report. Use `<details>` and `<summary>Page snapshot (DOM/accessibility tree)</summary>`, then a fenced code block with the snapshot output.
3. **Increment the issue counter** (ISSUE-001, ISSUE-002, …).

### 6. Wrap Up

Aim to find **5–10 well-documented issues**, then wrap up. Depth of evidence matters more than total count — 5 issues with full repro beats 20 with vague descriptions.

After exploring:

1. Re-read the report and update the summary severity counts so they match the actual issues. Every `### ISSUE-` block must be reflected in the totals.
2. **Fill in "Checks with no issues".** At the end of the report, under the "Checks with no issues" section, add a bullet list of what you verified that had no error (e.g. "Homepage loads and main nav is visible", "Rewards catalog loads and filters work", "Checkout flow completes without console errors"). One short line per check; no screenshots or evidence. This gives the reader a full picture of the dogfooding activity.
3. Close the session:

```bash
playwright-cli -s={SESSION} close
```

3. Tell the user the report is ready and summarize findings: total issues, breakdown by severity, and the most critical items.

## Guidance

- **Repro is everything.** Every issue needs proof — but match the evidence to the issue. Interactive bugs need video and step-by-step screenshots. Static bugs (typos, placeholder text, visual glitches visible on load) only need a single screenshot.
- **Don't record video for static issues.** A typo or clipped text doesn't benefit from a video. Save video for issues that involve user interaction, timing, or state changes.
- **For interactive issues, screenshot each step.** Capture the before, the action, and the after — so someone can see the full sequence.
- **Write repro steps that map to screenshots.** Each numbered step in the report should reference its corresponding screenshot. A reader should be able to follow the steps visually without touching a browser.
- **Exercise every control in scope.** By default, use every filter, sort, search, and form field (basically any interactive control) on the pages you cover. Do not skip controls to finish the journey faster. If something feels off when you use a control, investigate.
- **Write findings incrementally.** Append each issue to the report as you discover it. If the session is interrupted, findings are preserved. Never batch all issues for the end.
- **Never delete output files.** Do not `rm` screenshots, videos, or the report mid-session. Do not close the session and restart. Work forward, not backward.
- **Never read the target app's source code.** You are testing as a user, not auditing code. Do not read HTML, JS, or config files of the app under test. All findings must come from what you observe in the browser.
- **Check the console.** Many issues are invisible in the UI but show up as JS errors or failed requests (`playwright-cli console`).
- **Test like a user, not a robot.** Try common workflows end-to-end. Click things a real user would click. Enter realistic data.
- **Type like a human when recording.** When filling form fields during video recording, use `playwright-cli type "text"` for character-by-character input where it helps; use `fill` when speed matters outside of video.
- **Pace repro videos for humans.** Add `sleep 1` between actions and `sleep 2` before the final result screenshot. Videos should be watchable at 1x speed.
- **Element refs.** Use refs from the latest `playwright-cli snapshot` (e.g. `e1`, `e2`). After navigation or DOM changes, run `snapshot` again to get fresh refs.

## References

| Reference | When to Read |
|-----------|--------------|
| [references/issue-taxonomy.md](references/issue-taxonomy.md) | Start of session — calibrate what to look for, severity levels, exploration checklist |
| [references/scope-options.md](references/scope-options.md) | When scope is unspecified — show options so the user can pick a targeted area (page/feature) |

## Templates

| Template | Purpose |
|----------|---------|
| [templates/dogfood-report-template.md](.agents/skills/playwright-cli-dogfood/templates/dogfood-report-template.md) | Copy into output directory as the report file |

## playwright-cli commands used

- **Session:** `playwright-cli -s={SESSION} open`, `close`, `snapshot`, `goto {URL}`
- **Interaction:** `click eN`, `fill eN "text"`, `type "text"`, `press Enter`, `hover eN`, `check` / `uncheck eN`
- **Capture:** `screenshot --filename=path`, `video-start`, `video-stop path.webm`
- **State:** `state-save path.json`, `state-load path.json`
- **DevTools:** `console`, `network`
- **Navigation:** `goto https://...`, `go-back`, `reload`

See the [playwright-cli skill](.agents/skills/playwright-cli/SKILL.md) for the full command reference.