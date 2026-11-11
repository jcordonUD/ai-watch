# AI Watch

A twice-weekly briefing on what changed at the main AI labs, in university AI policy and in Ethan Mollick's writing. One page, two tabs: the **Brief** (a four-minute read) and the **Board** (what changed and what stands, at a glance).

The page is served by GitHub Pages from this repository: https://jcordonud.github.io/ai-watch/

## How it updates

Every Monday and Thursday at 06:44 (Europe/Madrid) a scheduled Claude task clones this repository, researches the watchlist, adds one edition to `data.js`, checks it and pushes. It follows `RUNBOOK.md`.

The briefing is researched and written by Claude, an Anthropic model. It reports on Anthropic and on its competitors, so treat the magnitude scores as one editor's judgement and follow the links before relying on anything.

## What is in here

| File | What it is | Who changes it |
| --- | --- | --- |
| `index.html` | The page: both tabs, their design and their code | Only on request |
| `data.js` | The content: editions, items, board rows, dates. Its top comment is the editor's handbook | The scheduled task, twice a week |
| `RUNBOOK.md` | How an edition is made, and the watchlist | Juan Carlos, or Claude on request |
| `scripts/merge.js` | Adds one edition to `data.js` | Only on request |
| `scripts/validate.js` | Checks `data.js` before it is published | Only on request |

## How to change things

- **The watchlist, the tone, how items are chosen:** edit `RUNBOOK.md` here on GitHub (the pencil icon) and commit. It applies from the next run.
- **The design:** ask Claude to change `index.html` in a chat that has this repository attached. Keep the Board in blue and orange with text contrast of 7:1 or better.
- **A correction to an edition:** ask Claude, or edit `data.js` and run `node scripts/validate.js` before committing.
- **The days or the time, pausing or stopping:** these belong to the scheduled task in Claude ("AI Watch on GitHub"), not to this repository.
- **Undo a bad edition:** every edition is one commit. Reverting that commit on GitHub restores the previous page.
