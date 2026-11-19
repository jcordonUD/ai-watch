/* AI WATCH: the data file of the AI Watch page (index.html in this repository).
   The page never changes on a normal run: only this file does, through
   scripts/merge.js and scripts/validate.js as RUNBOOK.md describes.
   The x, y, lx and ly fields belong to a map view that was retired on 11 November 2026;
   leave them as they are.

   EDITOR'S HANDBOOK (for whoever updates this file, human or agent)
   1. Add ONE edition object per run to the END of `editions` (id = ISO date of the run).
      If an edition with today's id already exists, replace it instead of adding a second one.
   2. Add the new items to the END of `items`. Never rewrite or delete older items,
      except to correct a factual error (then add "corrected": "YYYY-MM-DD: what changed").
   3. Item fields:
        id        unique string, "YYMMDD-actor-n", never reused
        date      ISO date of the EVENT (not of the run)
        edition   id of the edition that first reported it
        actor     one of actors[].id
        kind      release | product | business | research | policy | essay | watch
        mag       1..5 editorial magnitude (see meta.scale). Be stingy with 5.
        baseline  true only for catch-up context older than the edition window
        title     max 90 characters, plain statement, no hype
        summary   2 to 4 sentences, paraphrased, with the concrete facts and numbers
        why       1 to 3 sentences: why a university teacher should care
        confidence primary (official source read) | reported (reliable secondary)
                  | headline (headline or aggregator only, not verified)
        verify    optional: where to check the primary source
        sources   [{label, url}] at least one, primary first
   4. Update `board` rows only when the state really changed, and set `changed` to the
      edition id on rows you touched. Update `dates` (remove past ones, add new ones).
   5. Style: British English, no em dashes, no emojis, no exclamation marks, never quote
      more than a short phrase from any source, always paraphrase.
   6. Keep at most the 16 most recent editions and items from the last 150 days,
      plus anything a board row links to.
   7. The file must stay valid JavaScript: one assignment to window.AIWATCH. Check with
      `node --check data.js` before publishing.
*/
window.AIWATCH = {
  "meta": {
    "name": "AI Watch",
    "owner": "Juan Carlos",
    "cadence": "Mondays and Thursdays",
    "updated": "2026-11-19",
    "next": "2026-11-23",
    "disclosure": "Researched and written by Claude, an Anthropic model, running on a schedule. It reports on Anthropic and on its competitors, so treat the magnitude scores as one editor's judgement and follow the links before you rely on anything.",
    "scale": [
      {
        "mag": 5,
        "label": "Changes what you or your students can do this week"
      },
      {
        "mag": 4,
        "label": "Changes how you should plan this term"
      },
      {
        "mag": 3,
        "label": "Worth knowing and worth sharing"
      },
      {
        "mag": 2,
        "label": "A note for the record"
      },
      {
        "mag": 1,
        "label": "Watch item or unconfirmed"
      }
    ],
    "links": {
      "brief": "https://jcordonud.github.io/ai-watch/",
      "hub": "https://jcordonud.github.io/ai-watch/"
    }
  },
  "groups": [
    {
      "id": "us",
      "name": "US labs",
      "range": "Frontier Range",
      "lx": 0.115,
      "ly": 0.58
    },
    {
      "id": "cn",
      "name": "Chinese labs",
      "range": "Eastern Range",
      "lx": 0.875,
      "ly": 0.53
    },
    {
      "id": "policy",
      "name": "Universities and rules",
      "range": "The Commons",
      "lx": 0.56,
      "ly": 0.975
    },
    {
      "id": "voices",
      "name": "Voices",
      "range": "Lookout"
    },
    {
      "id": "else",
      "name": "Elsewhere",
      "range": "Outliers"
    }
  ],
  "actors": [
    {
      "id": "anthropic",
      "name": "Anthropic",
      "group": "us",
      "x": 0.17,
      "y": 0.33
    },
    {
      "id": "openai",
      "name": "OpenAI",
      "group": "us",
      "x": 0.3,
      "y": 0.19
    },
    {
      "id": "google",
      "name": "Google",
      "group": "us",
      "x": 0.37,
      "y": 0.41
    },
    {
      "id": "deepseek",
      "name": "DeepSeek",
      "group": "cn",
      "x": 0.68,
      "y": 0.22
    },
    {
      "id": "moonshot",
      "name": "Moonshot (Kimi)",
      "group": "cn",
      "x": 0.83,
      "y": 0.34
    },
    {
      "id": "alibaba",
      "name": "Alibaba (Qwen)",
      "group": "cn",
      "x": 0.7,
      "y": 0.43
    },
    {
      "id": "zhipu",
      "name": "Zhipu (GLM)",
      "group": "cn",
      "x": 0.87,
      "y": 0.16
    },
    {
      "id": "mit",
      "name": "MIT",
      "group": "policy",
      "x": 0.26,
      "y": 0.75
    },
    {
      "id": "universities",
      "name": "Universities",
      "group": "policy",
      "x": 0.45,
      "y": 0.84
    },
    {
      "id": "eu",
      "name": "EU AI Act",
      "group": "policy",
      "x": 0.63,
      "y": 0.72
    },
    {
      "id": "spain",
      "name": "Spain (CRUE)",
      "group": "policy",
      "x": 0.79,
      "y": 0.8
    },
    {
      "id": "mollick",
      "name": "Ethan Mollick",
      "group": "voices",
      "x": 0.52,
      "y": 0.56
    },
    {
      "id": "elsewhere",
      "name": "Elsewhere",
      "group": "else",
      "x": 0.5,
      "y": 0.11
    }
  ],
  "board": [
    {
      "actor": "anthropic",
      "section": "models",
      "state": "Claude Fable 5.2",
      "since": "2026-11-09",
      "open": "Closed",
      "note": "Mythos 5.2 only for verified organisations",
      "item": "261109-anthropic-1",
      "changed": "2026-11-11"
    },
    {
      "actor": "openai",
      "section": "models",
      "state": "GPT-6.2 Astra (flagship), GPT-6.2 Sol (workhorse)",
      "since": "2026-11-17",
      "open": "Closed",
      "note": "For Plus, Pro, Enterprise and Edu accounts. Reported API prices per million tokens: Astra 8 and 40 dollars, Sol 2 and 10",
      "item": "261117-openai-1",
      "changed": "2026-11-19"
    },
    {
      "actor": "google",
      "section": "models",
      "state": "Gemini 4 Carbon (flagship), Gemini 4 Neon (mid-range), Gemini 4 Hydrogen (everyday)",
      "since": "2026-11-10",
      "open": "Closed",
      "note": "Neon added 18 Nov for AI Pro and the API. Hydrogen is the model of the free tier. Carbon's introductory API price ends 30 Nov",
      "item": "261110-google-1",
      "changed": "2026-11-19"
    },
    {
      "actor": "deepseek",
      "section": "models",
      "state": "DeepSeek V4.1 Flash, V4 Pro",
      "since": "2026-09-10",
      "open": "Open weights, MIT licence",
      "note": "Flash updated 17 Oct; V4.1 Pro named, no date",
      "item": "261017-deepseek-1",
      "changed": "2026-11-11"
    },
    {
      "actor": "moonshot",
      "section": "models",
      "state": "Kimi K3.1 Pro",
      "since": "2026-10-23",
      "open": "Open weights, own licence",
      "note": "Weights published early November",
      "item": "261102-moonshot-1",
      "changed": "2026-11-11"
    },
    {
      "actor": "alibaba",
      "section": "models",
      "state": "Qwen4-Max",
      "since": "2026-11-16",
      "open": "Flagship is cloud only, no weights. Older Qwen models are partly open",
      "note": "General release 16 Nov, reported at 1.50 and 4.50 dollars per million tokens",
      "item": "261116-alibaba-1",
      "changed": "2026-11-19"
    },
    {
      "actor": "zhipu",
      "section": "models",
      "state": "GLM-5.3",
      "since": "2026-08-14",
      "open": "Open weights, own licence",
      "note": "GLM-6.0 named as next generation",
      "item": "260814-zhipu-1",
      "changed": "2026-11-11"
    },
    {
      "actor": "mit",
      "section": "rules",
      "state": "No Institute-wide rule. Every subject is urged to post its own AI policy, chosen from a four-option menu",
      "since": "2026-09-03",
      "note": "Instructors asked to disclose their own AI use",
      "item": "260813-mit-1",
      "changed": "2026-11-11"
    },
    {
      "actor": "eu",
      "section": "rules",
      "state": "AI that grades, admits or proctors is high-risk. Obligations start 2 Dec 2027",
      "since": "2026-07-27",
      "note": "Literacy and transparency duties already apply",
      "item": "260727-eu-1",
      "changed": "2026-11-11"
    },
    {
      "actor": "spain",
      "section": "rules",
      "state": "CRUE white paper on AI in preparation",
      "since": "2026-09-28",
      "note": "First phase due by the end of 2026",
      "item": "260928-spain-1",
      "changed": "2026-11-11"
    },
    {
      "actor": "universities",
      "section": "rules",
      "state": "England's regulator expects assessment that AI cannot complete, and finds detectors unreliable",
      "since": "2026-11-11",
      "note": "OfS report, 11 Nov. Elsewhere, 47% of students say guidance is sufficient",
      "item": "261111-universities-1",
      "changed": "2026-11-12"
    },
    {
      "actor": "mollick",
      "section": "voices",
      "state": "Fable 5.2 and Jagged AGI",
      "since": "2026-11-09",
      "note": "Book Co-Existence out since 20 Oct",
      "item": "261109-mollick-1",
      "changed": "2026-11-11"
    }
  ],
  "dates": [
    {
      "date": "2026-11-19",
      "what": "Gemini 3.6 Flash is retired. Code that calls it stops working",
      "actor": "google",
      "url": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions"
    },
    {
      "date": "2026-11-19",
      "what": "Anthropic shares are due to begin trading on Nasdaq under the ticker ANT",
      "actor": "anthropic",
      "url": "https://www.cnbc.com/2026/11/18/anthropic-ipo-ai-offering-price.html"
    },
    {
      "date": "2026-11-20",
      "what": "Education and Skills European Summit: the Commission presents its package",
      "actor": "eu",
      "url": "https://www.eunews.it/en/2026/11/05/europe-puts-education-first-basic-skills-and-ai-at-the-heart-of-the-new-eu-strategy/"
    },
    {
      "date": "2026-11-25",
      "what": "Qwen4-Max Preview ends and the preview model is retired",
      "actor": "alibaba",
      "url": "https://www.alibabacloud.com/help/en/model-studio/qwen4-max-preview"
    },
    {
      "date": "2026-11-30",
      "what": "Last day of introductory API pricing for Gemini 4 Carbon",
      "actor": "google",
      "url": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/"
    },
    {
      "date": "2026-11-30",
      "what": "Claude Sonnet 4.5 is retired on the API. Code that calls it stops working",
      "actor": "anthropic",
      "url": "https://platform.claude.com/docs/en/release-notes/overview"
    },
    {
      "date": "2026-12-31",
      "what": "CRUE white paper on AI: first phase expected by year end",
      "actor": "spain",
      "url": "https://www.infobae.com/espana/agencias/2026/09/28/las-universidades-se-unen-para-crear-el-primer-libro-blanco-sobre-ia-que-pueda-orientarlas/"
    },
    {
      "date": "2027-12-02",
      "what": "EU AI Act: obligations for high-risk AI in education begin",
      "actor": "eu",
      "url": "https://www.technology.org/2026/10/13/eu-ai-act-deadlines-after-the-digital-omnibus-what-applies-from-december-2026-to-august-2028/"
    }
  ],
  "editions": [
    {
      "id": "2026-11-11",
      "number": 1,
      "label": "Edition 1: baseline and this week",
      "headline": "Two new frontier models in two days, and a guidance gap with a number on it",
      "lede": "Anthropic shipped Claude Fable 5.2 on Monday and Google opened Gemini 4 Carbon to everyone on Tuesday. In the same week two separate surveys landed on the same figure: fewer than half of students say anyone has shown them how to use AI. This first edition also carries the baseline you need to read the next ones.",
      "takeaways": [
        {
          "title": "The frontier moved twice in 48 hours",
          "text": "Fable 5.2 arrived on 9 November and Gemini 4 Carbon on 10 November. Whatever you concluded last month about what AI can do in your subject is out of date."
        },
        {
          "title": "The guidance gap is now measured",
          "text": "An OpenAI report and the AIinHE survey both put the share of students who have been shown how to use AI at 47%. They measure different populations, so the coincidence is a signal, not a proof."
        },
        {
          "title": "Open weights are closing in",
          "text": "Kimi K3.1 Pro can now be downloaded, and one index places it close to closed frontier models. That widens the options for work with data that cannot leave the institution."
        }
      ],
      "classroom": [
        "Run one of your own problem sets through a current frontier model before the next assessment cycle. MIT's committee found that AI can now give credible answers to almost any written undergraduate assignment, proofs included.",
        "Post an explicit AI policy, with its reason, on each syllabus. MIT's four-option menu is a ready template.",
        "Try the rule used in MIT's introductory physics course: students cite AI as a collaborator on each problem set and say what it did.",
        "If you use AI for content, grading or feedback, tell your students how and why."
      ]
    },
    {
      "id": "2026-11-12",
      "number": 2,
      "label": "Edition 2: assessment under a regulator's eye",
      "headline": "England's regulator asks for AI-resilient assessment, and 52 studies show why",
      "lede": "England's higher education regulator said on Wednesday that degrees must rest on assessment that AI cannot complete for the student, and a Stanford review of 52 causal studies supplies the reason: handing the work to AI costs learning. No lab has released a new flagship since the last edition. Alibaba opened a two-week preview of Qwen4-Max, and the first independent scores for Fable 5.2 and Gemini 4 Carbon came in.",
      "takeaways": [
        {
          "title": "Assessment is now a regulator's business",
          "text": "The Office for Students says unsupervised work can often be completed to a high standard with AI, that detectors are not reliable, and that it will hold institutions to account under its existing rules. It is the first national regulator to say so in these terms."
        },
        {
          "title": "Outsourcing costs learning; support is mixed",
          "text": "Stanford's review of 52 causal studies finds that students who let AI produce the work do worse later without it, while AI used as a tutor sometimes helps and sometimes does not. Students often feel they learn more when they do not."
        },
        {
          "title": "When AI helps to grade, a human decides and the student is told",
          "text": "The same rule arrived from two directions this week: the English regulator's guidance on AI-assisted feedback, and Anthropic's usage policy, in force since 12 November, which lists grading and misconduct decisions among its high-risk uses."
        }
      ],
      "classroom": [
        "Sort your assessments into two piles: those that certify a skill and those that build it. Move the marks of the first pile to supervised formats such as a closed-book exam, a short oral or a practical. That is the regulator's recipe, and it needs no new technology.",
        "Do not rest any accusation on a detector or on a watermark. The English regulator finds detectors unreliable, and no public checker exists for the watermarks that labs are now adding.",
        "If AI drafts your feedback or marks, review each one before it reaches the student and say that AI was used.",
        "Add a few supervised, unaided questions on the problem types that AI solves easily. Stanford's review reports that students practise those less, and score lower on them when supervised."
      ]
    },
    {
      "id": "2026-11-16",
      "number": 3,
      "label": "Edition 3: the free tier moves up",
      "headline": "Free Gemini moves up a generation, and a two-day outage shows what teaching depends on",
      "lede": "Google released Gemini 4 Hydrogen, which replaces Gemini 3.8 Flash in the Gemini app and in Search, free accounts included. A Microsoft 365 outage that began on 12 November ran into a second day and reached the Claude and ChatGPT connectors, and a Harvard group published a guide, reported to draw on 5,000 studies, to when AI helps learning and when it hinders it. Searches found no new model from DeepSeek, Moonshot, Alibaba or Zhipu, and no new essay from Ethan Mollick. A caution on method: this edition was compiled from search results alone. No source page could be opened during the run, so every item rests on what titles and headlines state, none is marked primary, and the figures should be checked through the links before anyone relies on them.",
      "takeaways": [
        {
          "title": "What students get for free has improved again",
          "text": "Gemini 4 Hydrogen is reported to be the new everyday model in the Gemini app and in Google Search, for free accounts as well as paid ones. Judge your assignments against the free tier, because that is what every student has."
        },
        {
          "title": "The evidence is being sorted by learning goal",
          "text": "After Stanford's review of causal studies last week, a Harvard group is reported to have released a matrix that sets out when AI helps or hinders learning, by age and by goal. Both point the same way: the answer depends on what the task is meant to build."
        },
        {
          "title": "Dependence on one provider is a risk to plan for",
          "text": "A two-day Microsoft 365 outage disrupted email and Teams around the world and reached the AI assistants connected to it. Any course that runs on a single platform needs a stated fallback."
        }
      ],
      "classroom": [
        "Put one of your own problem sets through the free Gemini app this week. It is the level of help that a student has without paying, and reports say it changed on 12 November.",
        "Before the next deadline that depends on a single platform, tell students what happens if it is down: a second way to submit, and a rule for extensions.",
        "Search for your own name in Google Scholar and check for papers you did not write. Press reports describe fake journals that publish AI-written papers under real academics' names. Ask doctoral students to do the same.",
        "When you write an AI rule for an activity, start from what the activity is meant to build. That is how the Harvard matrix is reported to be organised, and it fits a syllabus better than a blanket rule."
      ]
    },
    {
      "id": "2026-11-19",
      "number": 4,
      "label": "Edition 4: new models for those who pay",
      "headline": "GPT-6.2 and Gemini 4 Neon arrive for paying users; free Gemini gains an agent, free DeepSeek a daily cap",
      "lede": "OpenAI released GPT-6.2 Astra and Sol on 17 November for paying ChatGPT users, and Google followed a day later with Gemini 4 Neon, also paid. The free tier moved in other ways: Google's agent mode, Gemini Tasks, became free in six countries, and users of DeepSeek's free chat report new daily caps. Alibaba took Qwen4-Max out of preview, and Anthropic priced the largest share offer on record on the same day that 92 signatories published a statement disputing its safety claims. Searches found no change in MIT's rules, no new EU or CRUE document, and no new essay from Ethan Mollick, who did post a first verdict on GPT-6.2. A caution on method, as on Monday: this edition was compiled from search results alone. No source page was opened during the run, so no item is marked primary, and the figures should be checked through the links before anyone relies on them.",
      "takeaways": [
        {
          "title": "This week's new models are for those who pay",
          "text": "GPT-6.2 Astra and Sol go to Plus, Pro, Enterprise and Edu accounts, and Gemini 4 Neon to AI Pro subscribers. Nothing seen in this run says that a free tier received a new model. If your university has ChatGPT Edu, your students are among those who did."
        },
        {
          "title": "The free tier is changing in what it can do, not in which model it runs",
          "text": "Google's agent mode, Gemini Tasks, is reported to be free in six countries, while users of DeepSeek's free chat report daily caps and shorter inputs. What a student can do without paying now depends on the country and on the week."
        },
        {
          "title": "Self-improving AI has moved into the safety documents",
          "text": "OpenAI is reported to rate GPT-6.2 Astra as its first deployed model at the High threshold for self-improvement, and a statement signed by 92 people calls Anthropic's work in the same direction reckless. Both are claims to read at the source, and both are usable in a class on AI policy."
        }
      ],
      "classroom": [
        "If your university has ChatGPT Edu, your students have GPT-6.2 from this week, by OpenAI's own account. Run one assignment through it before you set that assignment again. Early testers describe it as strong on large projects and awkward on ordinary requests.",
        "Find out whether Gemini Tasks is free in your country. If it is, try it on one multi-step task from your course, such as collecting sources and filling in a template, to see what a student can now delegate at no cost.",
        "Do not build an activity on a single free service. Users report that DeepSeek's free chat now has daily caps and an input limit, a week after the Microsoft outage made the same point in another way.",
        "For Spanish-speaking students, the explainer of 18 November on declaring AI use is a candidate handout. Read it against your own university's rules before you share it."
      ]
    }
  ],
  "items": [
    {
      "id": "261109-anthropic-1",
      "date": "2026-11-09",
      "edition": "2026-11-11",
      "actor": "anthropic",
      "kind": "release",
      "mag": 5,
      "baseline": false,
      "title": "Claude Fable 5.2 and Claude Mythos 5.2 released",
      "summary": "Anthropic released Claude Fable 5.2 and presents it as its most capable model for hard technical work in coding, finance and the sciences. Mythos 5.2 offers the same capabilities only to organisations verified through Anthropic's programmes. Both have a 1M-token context window and up to 128k output tokens.",
      "why": "A new ceiling for long, multi-step work such as full problem sets, code projects and literature synthesis. Any judgement formed before 9 November about what AI can do in your subject needs a retest.",
      "confidence": "primary",
      "verify": "Anthropic's announcement and the Claude Platform release notes entry for 9 November 2026.",
      "sources": [
        {
          "label": "Anthropic announcement",
          "url": "https://www.anthropic.com/claude-fable-and-mythos-5-2"
        },
        {
          "label": "Claude Platform release notes",
          "url": "https://platform.claude.com/docs/en/release-notes/overview"
        }
      ]
    },
    {
      "id": "261110-anthropic-2",
      "date": "2026-11-10",
      "edition": "2026-11-11",
      "actor": "anthropic",
      "kind": "business",
      "mag": 3,
      "baseline": false,
      "title": "Anthropic starts the roadshow for its stock market listing",
      "summary": "Anthropic announced the start of the investor roadshow for its proposed initial public offering of Class A common stock. The S-1 registration statement was filed with the US regulator on 26 October.",
      "why": "A listed AI lab has to publish audited figures. Expect more public evidence on what frontier AI costs to run, which bears on how long cheap access for education can last.",
      "confidence": "primary",
      "sources": [
        {
          "label": "Anthropic: roadshow launch",
          "url": "https://www.anthropic.com/news/roadshow-launch"
        },
        {
          "label": "Anthropic: S-1 filing",
          "url": "https://www.anthropic.com/news/s1-sec"
        }
      ]
    },
    {
      "id": "261110-anthropic-3",
      "date": "2026-11-10",
      "edition": "2026-11-11",
      "actor": "anthropic",
      "kind": "product",
      "mag": 2,
      "baseline": false,
      "title": "Claude Whiteboards and Sheets enter beta; Dashboards becomes Claude Data",
      "summary": "Trade press reports that Anthropic launched shared whiteboards and spreadsheets inside Claude on paid plans on 10 November, and made its dashboards product generally available under the name Claude Data.",
      "why": "Assistants are turning into shared workspaces that a team and the AI edit together. That is how group coursework will increasingly be produced.",
      "confidence": "reported",
      "verify": "Anthropic release notes at support.claude.com, entry for 10 November 2026.",
      "sources": [
        {
          "label": "Unite.AI report",
          "url": "https://www.unite.ai/anthropic-launches-claude-whiteboards-and-sheets-in-beta/"
        },
        {
          "label": "Claude release notes",
          "url": "https://support.claude.com/en/articles/12138966-release-notes"
        }
      ]
    },
    {
      "id": "261110-openai-1",
      "date": "2026-11-10",
      "edition": "2026-11-11",
      "actor": "openai",
      "kind": "research",
      "mag": 3,
      "baseline": false,
      "title": "OpenAI report: 79% of students use AI for coursework, 47% were shown how",
      "summary": "OpenAI published lessons from its education partnerships in Europe, the Middle East and Africa, naming Estonia, Slovakia, Greece and Italy. It cites ThinkYoung research in which 79% of surveyed students said they use AI for homework or assignments while 47% said they had been shown how.",
      "why": "It is a vendor's report, so read it as advocacy as well as evidence. The useful part is the framing: access is no longer the bottleneck, guidance is. Check the survey sample before quoting it for universities.",
      "confidence": "primary",
      "verify": "The ThinkYoung study linked from the report: sample size, countries and age range.",
      "sources": [
        {
          "label": "OpenAI: Closing the AI guidance gap in education",
          "url": "https://openai.com/index/closing-ai-guidance-gap-education/"
        }
      ]
    },
    {
      "id": "261105-openai-2",
      "date": "2026-11-05",
      "edition": "2026-11-11",
      "actor": "openai",
      "kind": "release",
      "mag": 2,
      "baseline": false,
      "title": "GPT-6 Cyber released through a controlled security programme",
      "summary": "OpenAI introduced GPT-6 Cyber, a model for cybersecurity work that is available through a controlled access programme, not to all users.",
      "why": "All three large US labs now keep their strongest security capability behind a verification gate. Restricted tiers are becoming normal, which matters for research groups that will need to apply for access.",
      "confidence": "headline",
      "verify": "The OpenAI post dated 5 November 2026.",
      "sources": [
        {
          "label": "OpenAI news index",
          "url": "https://openai.com/news/"
        },
        {
          "label": "AI Newsflash, 2 to 8 November",
          "url": "https://aiforbusinessowners.substack.com/p/ai-newsflash-november-2-to-8-2026"
        }
      ]
    },
    {
      "id": "261104-openai-3",
      "date": "2026-11-04",
      "edition": "2026-11-11",
      "actor": "openai",
      "kind": "product",
      "mag": 2,
      "baseline": false,
      "title": "Images 2.6 adds animated GIFs and faster generation",
      "summary": "OpenAI's Images 2.6 brings faster image generation, GIF creation, more precise editing and new API controls across ChatGPT, Codex and the API.",
      "why": "Animated diagrams from a sentence are now routine. Useful for teaching material, and one more format in which student work can be machine-made.",
      "confidence": "primary",
      "sources": [
        {
          "label": "OpenAI release index",
          "url": "https://openai.com/research/index/release/"
        }
      ]
    },
    {
      "id": "261104-openai-4",
      "date": "2026-11-04",
      "edition": "2026-11-11",
      "actor": "openai",
      "kind": "business",
      "mag": 1,
      "baseline": false,
      "title": "OpenAI to acquire Pierre Computer Company",
      "summary": "OpenAI announced an agreement to acquire Pierre Computer Company. A newsletter summary links the deal to OpenAI's coding products.",
      "why": "Logged for completeness. No effect on teaching.",
      "confidence": "headline",
      "sources": [
        {
          "label": "OpenAI news index",
          "url": "https://openai.com/news/"
        }
      ]
    },
    {
      "id": "260929-openai-1",
      "date": "2026-09-29",
      "edition": "2026-11-11",
      "actor": "openai",
      "kind": "release",
      "mag": 4,
      "baseline": true,
      "title": "Baseline: GPT-6.1 Sol and Terra are OpenAI's working models",
      "summary": "GPT-6.1 Sol launched on 29 September at DevDay. OpenAI says it nearly matches its flagship, GPT-6 Astra, on agentic coding, computer use and professional work at one fifth of Astra's token price. A cheaper and faster GPT-6.1 Terra followed on 26 October. Press reports say a planned GPT-6.1 Astra was held back after safety concerns in internal testing.",
      "why": "This is the OpenAI model most students on a paid or Edu plan are using this term. Near-flagship quality at a fifth of the price is the trend to plan around.",
      "confidence": "reported",
      "sources": [
        {
          "label": "TechCrunch, 29 Sep 2026",
          "url": "https://techcrunch.com/2026/09/29/openai-launches-gpt-6-1-sol-says-it-nearly-matches-gpt-6-astra-and-costs-less/"
        },
        {
          "label": "Wikipedia: GPT-6.1",
          "url": "https://en.wikipedia.org/wiki/GPT-6.1"
        }
      ]
    },
    {
      "id": "261110-google-1",
      "date": "2026-11-10",
      "edition": "2026-11-11",
      "actor": "google",
      "kind": "release",
      "mag": 5,
      "baseline": false,
      "title": "Gemini 4 Carbon is available to everyone",
      "summary": "Google opened its strongest model, Gemini 4 Carbon, to developers, enterprises, scientists and consumers. The API costs 2 dollars per million input tokens and 10 per million output tokens during an introductory period that reports say ends on 30 November, after which the price doubles. Google AI Ultra subscribers get it in the Gemini app, AI Mode in Search and Antigravity. Scientists and researchers can apply for six months of free access to Argon and Carbon.",
      "why": "Two points for a university. The free programme for researchers is worth an application. And Google aims Carbon at long engineering and scientific tasks, the same ground as Fable 5.2, so there are again three labs at the front.",
      "confidence": "primary",
      "verify": "Price after 30 November: the Gemini API pricing page.",
      "sources": [
        {
          "label": "Google: Gemini 4 Carbon is now available",
          "url": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/"
        },
        {
          "label": "Google Antigravity blog",
          "url": "https://antigravity.google/blog/gemini-4-carbon-in-google-antigravity/"
        },
        {
          "label": "AI Weekly summary",
          "url": "https://aiweekly.co/alerts/google-launches-gemini-4-carbon-with-cyber-coding-claims"
        }
      ]
    },
    {
      "id": "261105-google-2",
      "date": "2026-11-05",
      "edition": "2026-11-11",
      "actor": "google",
      "kind": "release",
      "mag": 1,
      "baseline": false,
      "title": "Gemini Omni 1.2 Flash released; Gemini 3.6 Flash retires on 19 November",
      "summary": "Google's model lifecycle page lists Gemini Omni 1.2 Flash as released on 5 November and sets 19 November as the retirement date for Gemini 3.6 Flash, with Gemini 3.8 Flash as its replacement.",
      "why": "It only matters if you or your students have code that calls the old model: it will stop working on 19 November.",
      "confidence": "primary",
      "sources": [
        {
          "label": "Google Cloud: model versions and lifecycle",
          "url": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions"
        }
      ]
    },
    {
      "id": "261102-moonshot-1",
      "date": "2026-11-02",
      "edition": "2026-11-11",
      "actor": "moonshot",
      "kind": "release",
      "mag": 4,
      "baseline": false,
      "title": "Kimi K3.1 Pro: open weights close to the closed frontier",
      "summary": "Moonshot AI released Kimi K3.1 Pro on 23 October and published the full weights on Hugging Face in early November under its own licence. Sources differ on the exact day, between 2 and 6 November. It has a 1M-token context. One comparison site reports that Artificial Analysis scored it above Gemini 4 Argon and GPT-6.1 Sol and one point behind Claude Sonnet 5.5.",
      "why": "A downloadable model near frontier quality changes the options for work with data that cannot leave the institution. Two cautions: the licence is custom, so read it before any institutional use, and the model has trillions of parameters, so running it needs serious hardware.",
      "confidence": "reported",
      "verify": "Model card and licence at huggingface.co/moonshotai; score at artificialanalysis.ai.",
      "sources": [
        {
          "label": "GEO Toolbox: Chinese AI models compared",
          "url": "https://geotoolbox.ai/blog/chinese-ai-models-compared"
        },
        {
          "label": "Morph: best open source LLMs",
          "url": "https://www.morphllm.com/best-open-source-llm"
        }
      ]
    },
    {
      "id": "261017-deepseek-1",
      "date": "2026-10-17",
      "edition": "2026-11-11",
      "actor": "deepseek",
      "kind": "release",
      "mag": 3,
      "baseline": true,
      "title": "Baseline: DeepSeek V4.1 Flash is the low-cost default",
      "summary": "DeepSeek released V4.1 Flash on 10 September with open weights under the MIT licence and updated it on 17 October. Listed API prices are about 0.15 dollars per million input tokens off-peak. DeepSeek has named a V4.1 Pro without giving a date.",
      "why": "The cheapest capable model sets the floor for what any student can reach for free or nearly free. Assume every student has this level of help available.",
      "confidence": "reported",
      "verify": "DeepSeek API change log at api-docs.deepseek.com/updates.",
      "sources": [
        {
          "label": "Toloka: Chinese AI models explained",
          "url": "https://toloka.ai/blog/deepseek-and-chinese-ai-models-explained/"
        },
        {
          "label": "CellCog: V4.1 Flash release record",
          "url": "https://cellcog.ai/blog/deepseek-v4-1-flash-release-date/"
        }
      ]
    },
    {
      "id": "261021-alibaba-1",
      "date": "2026-10-21",
      "edition": "2026-11-11",
      "actor": "alibaba",
      "kind": "watch",
      "mag": 1,
      "baseline": true,
      "title": "Watch: Qwen 4 is still unreleased",
      "summary": "Alibaba has said Qwen 4 is in training and coming very soon. As of late October there was no release date. Qwen3.8-Max, released on 3 August, remains its top model.",
      "why": "Probably the next large open-weight release from China. Nothing to do until it ships.",
      "confidence": "reported",
      "sources": [
        {
          "label": "Yotta Labs: Chinese LLMs compared",
          "url": "https://www.yottalabs.ai/post/best-chinese-llm-models-2026-deepseek-qwen-glm-kimi-compared"
        },
        {
          "label": "Wikipedia: Qwen",
          "url": "https://en.wikipedia.org/wiki/Qwen"
        }
      ]
    },
    {
      "id": "260814-zhipu-1",
      "date": "2026-08-14",
      "edition": "2026-11-11",
      "actor": "zhipu",
      "kind": "release",
      "mag": 2,
      "baseline": true,
      "title": "Baseline: GLM-5.3 from Zhipu",
      "summary": "Zhipu, which trades internationally as Z.ai, released GLM-5.3 on 14 August with open weights. In September the US institute CAISI reportedly rated it the most advanced open-weight model in cybersecurity.",
      "why": "It completes the set of four Chinese model families to know: DeepSeek, Qwen, Kimi and GLM.",
      "confidence": "reported",
      "sources": [
        {
          "label": "Wikipedia: Z.ai",
          "url": "https://en.wikipedia.org/wiki/Z.ai"
        }
      ]
    },
    {
      "id": "260813-mit-1",
      "date": "2026-08-13",
      "edition": "2026-11-11",
      "actor": "mit",
      "kind": "policy",
      "mag": 4,
      "baseline": true,
      "title": "Baseline: MIT's AI committee report and its four-option policy menu",
      "summary": "MIT's Ad Hoc Committee on AI Use in Teaching, Learning, and Research Training published its final report on 13 August. It sets no single Institute-wide rule. It recommends that every subject post a clear AI policy with a rationale, offers a menu of four standard policies for instructors to choose from, and asks instructors to be open about their own AI use in content, grading or feedback. The guidance for the autumn term, dated 3 September, confirms there is no Institute-wide requirement.",
      "why": "The most useful single document for a faculty that is discussing AI rules. The menu avoids both a blanket ban and a blanket permission, and it adapts easily to a syllabus.",
      "confidence": "primary",
      "verify": "The full report (PDF) and the MIT Faculty Governance guidance page.",
      "sources": [
        {
          "label": "MIT Faculty Governance: teaching guidance, Fall 2026",
          "url": "https://facultygovernance.mit.edu/teaching-guidance-fall-2026-semester-september-3-2026"
        },
        {
          "label": "Committee final report (PDF)",
          "url": "https://bpb-us-e1.wpmucdn.com/sites.mit.edu/dist/d/2418/files/2026/09/AI-Committee-Final-Report-Aug-13.pdf"
        },
        {
          "label": "Inside Higher Ed, 28 Aug 2026",
          "url": "https://www.insidehighered.com/news/tech-innovation/artificial-intelligence/2026/08/28/mit-ai-report-calls-alternative-grading"
        }
      ]
    },
    {
      "id": "261008-mit-2",
      "date": "2026-10-08",
      "edition": "2026-11-11",
      "actor": "mit",
      "kind": "policy",
      "mag": 3,
      "baseline": true,
      "title": "How MIT instructors are applying the report, course by course",
      "summary": "The Tech, MIT's student newspaper, surveyed instructors after the report. Its examples include a differential equations course with a fairly liberal policy and an introductory physics course that requires students to cite any AI use as a collaborator, with a short description, on each problem set.",
      "why": "Concrete wording from maths and physics courses that can be borrowed. The cite-AI-as-collaborator rule is cheap to adopt and makes use visible without policing it.",
      "confidence": "reported",
      "sources": [
        {
          "label": "The Tech, 8 Oct 2026",
          "url": "https://thetech.com/2026/10/08/faculty-ad-hoc-ai"
        }
      ]
    },
    {
      "id": "261110-universities-1",
      "date": "2026-11-10",
      "edition": "2026-11-11",
      "actor": "universities",
      "kind": "research",
      "mag": 3,
      "baseline": false,
      "title": "Survey: guidance is improving, but most students still lack it",
      "summary": "New findings from the AIinHE.org project show that most university students now use AI, and that many limit their use. Among those who use it, 67% gave worries about accuracy as a reason for holding back. The share who say their university gives them sufficient guidance rose from 36% in 2024 to 47% in 2026.",
      "why": "Students are more sceptical than the usual story suggests, and they want direction. A clear course policy answers a demand that already exists.",
      "confidence": "reported",
      "verify": "The AIinHE.org 2026 report itself, for sample and method.",
      "sources": [
        {
          "label": "Phys.org, 10 Nov 2026",
          "url": "https://phys.org/news/2026-11-university-students-ai-doesnt.html"
        }
      ]
    },
    {
      "id": "261109-universities-2",
      "date": "2026-11-09",
      "edition": "2026-11-11",
      "actor": "universities",
      "kind": "research",
      "mag": 3,
      "baseline": false,
      "title": "Analysis: university AI policies are often vague or buried",
      "summary": "An article in The Conversation reviews recent evidence. In a UNESCO survey across 90 countries, fewer than one in five universities had a formal AI policy a year ago. A study of 39 Australian universities found wide variation, rules often placed in misconduct policies and not in assessment design, and only seven with a documented coordinating body. It also notes that universities are moving away from AI detectors because they are not reliable.",
      "why": "A checklist of what to avoid: vague principles, reliance on detectors, and rules filed under misconduct when they belong in assessment design.",
      "confidence": "reported",
      "sources": [
        {
          "label": "The Conversation, 9 Nov 2026",
          "url": "https://theconversation.com/ai-use-is-now-universal-in-higher-education-why-are-universities-failing-to-adapt-294137"
        }
      ]
    },
    {
      "id": "261109-universities-3",
      "date": "2026-11-09",
      "edition": "2026-11-11",
      "actor": "universities",
      "kind": "policy",
      "mag": 2,
      "baseline": false,
      "title": "Mexico: 14 of 22 universities have an AI policy, 3 passed it through a governing body",
      "summary": "The first Campus index of university governance in Mexico assessed 22 institutions. Fourteen have an AI policy, but only three had it approved by a collegiate body. Fifteen have updated their academic integrity rules to cover AI.",
      "why": "The same pattern as elsewhere: practice runs ahead of formal governance. Having a policy and having it approved are different things.",
      "confidence": "reported",
      "sources": [
        {
          "label": "Suplemento Campus, Nov 2026",
          "url": "https://suplementocampus.com/resultados-icgu-2026-gobernanza-inteligencia-artificial-universidades/"
        }
      ]
    },
    {
      "id": "261103-universities-4",
      "date": "2026-11-03",
      "edition": "2026-11-11",
      "actor": "universities",
      "kind": "policy",
      "mag": 2,
      "baseline": false,
      "title": "US universities are writing AI fundamentals into required curricula",
      "summary": "A digest of recent coverage notes that Ohio State has an institution-wide strategy for every student to learn to use AI within their discipline, that Purdue has added AI competence to its core learning outcomes, and that Agnes Scott College has put AI literacy into compulsory first-year teaching.",
      "why": "The question is moving from whether to allow AI in a course to what every graduate must know about it.",
      "confidence": "reported",
      "verify": "The original article that the digest summarises, and each university's own announcement.",
      "sources": [
        {
          "label": "Universo Abierto, 3 Nov 2026",
          "url": "https://universoabierto.org/2026/11/03/las-universidades-incorporan-los-fundamentos-de-la-inteligencia-artificial-a-sus-planes-de-estudios-obligatorios/"
        }
      ]
    },
    {
      "id": "260727-eu-1",
      "date": "2026-07-27",
      "edition": "2026-11-11",
      "actor": "eu",
      "kind": "policy",
      "mag": 4,
      "baseline": true,
      "title": "Baseline: EU AI Act rules for high-risk AI in education now start on 2 December 2027",
      "summary": "The Digital Omnibus on AI, Regulation (EU) 2026/1744, has been in force since 27 July 2026. It moves the obligations for stand-alone high-risk systems, which include AI used to evaluate learning outcomes, screen applicants or monitor exams, from 2 August 2026 to 2 December 2027. Prohibited practices, AI literacy, general-purpose model rules and the Article 50 transparency duties were not postponed.",
      "why": "If your university uses or buys AI that grades, admits or proctors, the compliance clock now runs to December 2027. The delay is time to prepare, not an exemption.",
      "confidence": "reported",
      "verify": "Regulation (EU) 2026/1744 on EUR-Lex and the European Commission's AI Act timeline.",
      "sources": [
        {
          "label": "Technology.org, 13 Oct 2026",
          "url": "https://www.technology.org/2026/10/13/eu-ai-act-deadlines-after-the-digital-omnibus-what-applies-from-december-2026-to-august-2028/"
        },
        {
          "label": "UNIwise: the AI Act and assessment",
          "url": "https://uniwise.eu/resources/blog/the-eu-ai-act-and-assessment-december-2027-is-not-a-snooze-button"
        }
      ]
    },
    {
      "id": "260928-spain-1",
      "date": "2026-09-28",
      "edition": "2026-11-11",
      "actor": "spain",
      "kind": "policy",
      "mag": 3,
      "baseline": true,
      "title": "Baseline: CRUE is drafting a white paper on AI for Spanish universities",
      "summary": "The Spanish rectors' conference, CRUE, is preparing a white paper on AI in the university. According to the EFE agency, the first phase is due by the end of the year as a guidance document that will be kept up to date, and it starts from an inventory of the tools universities use. A separate CYD Foundation report says 64% of Spanish universities name assessment as their most urgent teaching priority and 80% see a need to change curricula.",
      "why": "This will be the reference document for Spanish universities, and its first phase is weeks away. Positions a faculty prepares now can feed into the local response.",
      "confidence": "reported",
      "verify": "CRUE's own announcement and the CYD report.",
      "sources": [
        {
          "label": "EFE via Infobae, 28 Sep 2026",
          "url": "https://www.infobae.com/espana/agencias/2026/09/28/las-universidades-se-unen-para-crear-el-primer-libro-blanco-sobre-ia-que-pueda-orientarlas/"
        }
      ]
    },
    {
      "id": "261109-mollick-1",
      "date": "2026-11-09",
      "edition": "2026-11-11",
      "actor": "mollick",
      "kind": "essay",
      "mag": 4,
      "baseline": false,
      "title": "Mollick on Fable 5.2: 'jagged AGI'",
      "summary": "Ethan Mollick tested Fable 5.2 on a set of one-shot projects, among them a research paper, a rebuilt literature course, a business plan and programming a small keyboard into a games console. His verdict: it works like a capable expert across most computer-based tasks, but unevenly. Output was often correct yet bloated or dull, including a 182-page paper, and the model could not tell when its own work was not good enough.",
      "why": "The clearest statement this week of what stays human: setting direction, judging quality and editing. That is also a fair description of what assessment should now test.",
      "confidence": "primary",
      "sources": [
        {
          "label": "One Useful Thing, 9 Nov 2026",
          "url": "https://www.oneusefulthing.org/p/fable-52-and-jagged-agi"
        }
      ]
    },
    {
      "id": "261020-mollick-2",
      "date": "2026-10-20",
      "edition": "2026-11-11",
      "actor": "mollick",
      "kind": "essay",
      "mag": 2,
      "baseline": true,
      "title": "Baseline: Mollick's book Co-Existence and '30 Months on the Exponential'",
      "summary": "Mollick's new book, Co-Existence, came out on 20 October, together with a post that charts what has changed in the 30 months since his previous book.",
      "why": "A quick way to catch up on the whole period in charts.",
      "confidence": "primary",
      "sources": [
        {
          "label": "One Useful Thing: archive",
          "url": "https://www.oneusefulthing.org/archive"
        }
      ]
    },
    {
      "id": "261110-elsewhere-1",
      "date": "2026-11-10",
      "edition": "2026-11-11",
      "actor": "elsewhere",
      "kind": "release",
      "mag": 2,
      "baseline": false,
      "title": "Meta's Muse Ember 1.0 appears on release trackers",
      "summary": "A model release tracker lists Muse Ember 1.0 from Meta with a release date of 10 November.",
      "why": "Outside the core watchlist. Logged so that it is not missed; not yet checked against a Meta announcement.",
      "confidence": "headline",
      "verify": "Meta's AI blog.",
      "sources": [
        {
          "label": "LLM Gateway release timeline",
          "url": "https://llmgateway.io/timeline"
        }
      ]
    },
    {
      "id": "261111-universities-1",
      "date": "2026-11-11",
      "actor": "universities",
      "kind": "policy",
      "mag": 4,
      "title": "England's regulator: degrees need assessment that AI cannot complete",
      "summary": "The Office for Students, England's higher education regulator, published with Advance HE a report based on conversations with over 300 students and staff from more than 120 institutions between June and September 2026. It finds that many unsupervised assessments can be completed to a high standard with AI and little learning, that detection tools are not reliable, and that students often do not know what is allowed. The regulator says it will require assessments to be valid and reliable under its existing conditions, which in many cases will mean secure, AI-free formats such as closed-book exams, presentations and practicals, and it names fines and suspension of funding as possible enforcement. There is no new AI-specific rule and no deadline, and sources differ on the sanctions: Times Higher Education notes that the regulator stops short of mandating AI-free assessment, and Wonkhe finds the report thin on how to get there.",
      "why": "The first national regulator to spell out what AI-weakened assessment could cost an institution. Its recipe, secure assessment where a skill is certified plus clear rules in each course and no reliance on detectors, transfers directly to a physics or mathematics course anywhere.",
      "confidence": "primary",
      "verify": "The OfS guidance page on effective institutional practice, and the full report (OfS 2026.56). The evidence is qualitative: it gives no figures on how common AI misuse is.",
      "sources": [
        {
          "label": "OfS press release, 11 Nov 2026",
          "url": "https://www.officeforstudents.org.uk/news-blog-and-events/press-and-media/universities-should-help-students-develop-ai-skills-while-protecting-confidence-in-degrees/"
        },
        {
          "label": "OfS report: Making AI work for students",
          "url": "https://www.officeforstudents.org.uk/publications/making-ai-work-for-students-reflections-on-institutional-practice/"
        },
        {
          "label": "OfS guidance: effective institutional practice",
          "url": "https://www.officeforstudents.org.uk/for-providers/quality-and-standards/artificial-intelligence-in-higher-education/effective-institutional-practice/"
        },
        {
          "label": "Times Higher Education",
          "url": "https://www.timeshighereducation.com/news/ofs-pushes-person-exams-protect-sectors-reputation"
        },
        {
          "label": "Wonkhe analysis",
          "url": "https://wonkhe.com/blogs/ofs-and-advance-he-assess-the-state-of-the-sector-for-ai-in-education"
        }
      ],
      "edition": "2026-11-12",
      "baseline": false
    },
    {
      "id": "261110-universities-2",
      "date": "2026-11-10",
      "actor": "universities",
      "kind": "research",
      "mag": 3,
      "title": "Stanford review of 52 causal studies: handing work to AI lowers later performance",
      "summary": "Stanford's SCALE Initiative updated its review of causal studies on generative AI and learning: 52 papers, up from 20 in March. Despite the school-level title, much of the evidence comes from universities; Education Week counts only 10 studies set in US schools. Students who use AI to produce the work tend to do worse when they later work without it, AI used as learning support gives mixed results, and students often report learning more without measurably doing so. On one mathematics platform, the odds of a correct answer on supervised items fell by about 25% for problem types that AI can solve, relative to types it cannot.",
      "why": "The best current summary of what is known as opposed to what is claimed. The mathematics result bears directly on problem sets: practice that AI can do for the student is practice that may not happen. The authors warn that most of the papers are preprints and that nothing is yet known about long-term effects.",
      "confidence": "primary",
      "verify": "The review page for the individual studies; the 25% figure comes from one quasi-experiment and compares two kinds of problem, not before and after.",
      "sources": [
        {
          "label": "Stanford SCALE: The Evidence Base on AI in K-12, November 2026",
          "url": "https://scale.stanford.edu/ai/evidence-base-review/evidence-base-ai-k12-november-review"
        },
        {
          "label": "Education Week, 10 Nov 2026",
          "url": "https://www.edweek.org/technology/is-ai-good-or-bad-for-learning-the-answer-isnt-so-simple/2026/11"
        }
      ],
      "edition": "2026-11-12",
      "baseline": false
    },
    {
      "id": "261112-anthropic-1",
      "date": "2026-11-12",
      "actor": "anthropic",
      "kind": "policy",
      "mag": 3,
      "title": "Anthropic's usage policy now in force: grading and misconduct rulings need a human",
      "summary": "Anthropic's revised usage policy, published on 8 October, took effect on 12 November. Its rewritten high-risk section lists eleven areas, one of which is education and credentials: ranking or rejecting applicants, grading an exam or assessment that decides admission, graduation or certification (multiple-choice tests excepted), and deciding academic misconduct, suspension or expulsion. Whoever uses Claude for such a recommendation must have a qualified person review it, with the power to change it, before it is used, and must tell the person concerned that AI was involved. Drafting, summarising and general educational content fall outside the rule; the update also bans sustained abuse of the model in extreme cases and tightens the rules on surveillance and weapons.",
      "why": "It is one vendor's contract term, not law, but it matches the EU's high-risk category and the English regulator's line this week: the human decides and the student is told. Read the wording before anyone builds a grading or integrity tool on Claude.",
      "confidence": "primary",
      "verify": "The Usage Policy itself, section on high-risk use cases. The announcement does not list the eleven areas; the policy page does.",
      "sources": [
        {
          "label": "Anthropic: 2026 Usage Policy update",
          "url": "https://www.anthropic.com/news/2026-usage-policy-update"
        },
        {
          "label": "Anthropic Usage Policy",
          "url": "https://www.anthropic.com/legal/aup"
        }
      ],
      "edition": "2026-11-12",
      "baseline": false
    },
    {
      "id": "261110-google-2",
      "date": "2026-11-10",
      "actor": "google",
      "kind": "research",
      "mag": 3,
      "title": "First independent scores: Fable 5.2 slightly ahead, Gemini 4 Carbon far cheaper",
      "summary": "Third-party evaluators have published first scores for the two models released this week; the figures here come from write-ups, not from the leaderboards themselves. Artificial Analysis is reported to put Fable 5.2 at 65 on its index, Gemini 4 Carbon at 60 and GPT-6 Astra at 57, with a cost per task of about 27 dollars for Fable against about 8 for Carbon at its December price. The Vals index has the two less than a point apart, and Carbon is marginally ahead on ARC-AGI-2 and well behind on ARC-AGI-3. Simon Willison confirms that Carbon's API price doubles to 4 and 20 dollars per million tokens on 1 December; testers also report slow responses and a higher hallucination rate than its predecessor.",
      "why": "Two models close in quality with roughly a threefold difference in cost per task: that matters to any department that pays for API use. The numbers are preliminary and second-hand, and this editor is an Anthropic model, so check the leaderboards before repeating a ranking.",
      "confidence": "reported",
      "verify": "artificialanalysis.ai, vals.ai and arcprize.org for the scores; the Gemini API pricing page for the price.",
      "sources": [
        {
          "label": "Simon Willison on Gemini 4 Carbon, 10 Nov 2026",
          "url": "https://simonwillison.net/2026/Nov/10/llm-gemini/"
        },
        {
          "label": "Dev.to review of Carbon: claims and independent results",
          "url": "https://dev.to/hamzaahmadaslam/gemini-4-carbon-review-googles-claims-independent-results-and-what-testers-found-45lb"
        },
        {
          "label": "Latent Space AI News",
          "url": "https://latent.space/p/ainews-d-day-decision-models-day/"
        }
      ],
      "edition": "2026-11-12",
      "baseline": false
    },
    {
      "id": "261103-universities-5",
      "date": "2026-11-03",
      "actor": "universities",
      "kind": "policy",
      "mag": 3,
      "title": "Stanford funds departments to redesign whole majors for AI",
      "summary": "Stanford's provost announced a 10 million dollar initiative on 3 November, reported by Forbes on 11 November. Departments can apply for 250,000 to 750,000 dollars over one to two years to rework the learning outcomes of an entire major: what students should be able to do with AI, and what they must be able to show without it. About 15 departments are expected, applications open in winter 2027, and the initiative runs to 2028-29.",
      "why": "A model of redesign at the level of the degree, where most universities are still writing policy course by course. The two-column question, with AI and without it, can be asked of any programme at no cost.",
      "confidence": "reported",
      "verify": "Stanford's own announcement; it could not be opened during this run, so the figures are from Forbes.",
      "sources": [
        {
          "label": "Stanford Report (announcement)",
          "url": "https://news.stanford.edu/stories/2026/11/provost-initiative-college-majors-ai"
        },
        {
          "label": "Forbes, 11 Nov 2026",
          "url": "https://www.forbes.com/sites/avivalegatt/2026/11/11/stanfords-10-million-ai-bet-rethinking-the-college-major/"
        }
      ],
      "edition": "2026-11-12",
      "baseline": false
    },
    {
      "id": "261111-alibaba-1",
      "date": "2026-11-11",
      "actor": "alibaba",
      "kind": "release",
      "mag": 2,
      "title": "Alibaba opens Qwen4-Max as a two-week, cloud-only preview",
      "summary": "Alibaba Cloud's documentation lists qwen4-max-preview as available from 11 to 25 November (Beijing time), after which the preview model is retired. Access is by Token Plan subscription only, with no pay-as-you-go. It has a 1M-token context and accepts text, images and video. There is no price per token, no weights, no licence and no benchmark, and no date for a full release; TechNode adds that it can be tried in the Qwen app and in Alibaba's coding tools.",
      "why": "Qwen 4 now exists, but as a time-limited trial and not as a release. Nothing to plan around until Alibaba says whether weights will follow.",
      "confidence": "primary",
      "sources": [
        {
          "label": "Alibaba Cloud Model Studio: Qwen4-Max-Preview",
          "url": "https://www.alibabacloud.com/help/en/model-studio/qwen4-max-preview"
        },
        {
          "label": "TechNode, 11 Nov 2026",
          "url": "https://technode.com/2026/11/11/alibaba-opens-qwen4-max-preview-with-a-million-token-context-window/"
        }
      ],
      "edition": "2026-11-12",
      "baseline": false
    },
    {
      "id": "261111-google-1",
      "date": "2026-11-11",
      "actor": "google",
      "kind": "release",
      "mag": 2,
      "title": "Google releases Gemini Decision 1, a low-cost model that scores rubric questions",
      "summary": "Google released Gemini Decision 1 on 11 November. It does not generate text: it answers yes or no, multiple-choice or rubric questions about a text, image, audio, video or PDF, up to 1,000 questions in one request, and returns scores. Input costs 0.10 dollars per million tokens, output is free, and there is a free tier in AI Studio.",
      "why": "A building block for anyone who prototypes automated checks against a rubric. It is a vendor tool, untested for grading, and marks that count need a human decision in any case.",
      "confidence": "primary",
      "sources": [
        {
          "label": "Google: Gemini Decisions API",
          "url": "https://blog.google/innovation-and-ai/technology/developers-tools/gemini-decisions-api/"
        },
        {
          "label": "Simon Willison, 11 Nov 2026",
          "url": "https://simonwillison.net/2026/Nov/11/gemini-decisions-api/"
        }
      ],
      "edition": "2026-11-12",
      "baseline": false
    },
    {
      "id": "261110-google-3",
      "date": "2026-11-10",
      "actor": "google",
      "kind": "research",
      "mag": 2,
      "title": "Reported: DeepMind's AlphaProof Code verifies parts of Signal's protocol in Lean",
      "summary": "Press reports from around 10 November say that Google DeepMind's AlphaProof Code produced machine-checked Lean proofs of selected security properties of libsignal, the code behind Signal's messaging protocol, in about four weeks with a team of five. Humans wrote the specifications, and no new flaws were found in the parts examined. One digest cites more than six million lines of proof.",
      "why": "A concrete case of formal proof at industrial scale, of interest to anyone who teaches proof, logic or software verification. It has not been checked here against a DeepMind publication.",
      "confidence": "headline",
      "verify": "A DeepMind paper or blog post, and the Wired article.",
      "sources": [
        {
          "label": "Wired",
          "url": "https://www.wired.com/story/a-new-ai-tool-from-google-deepmind-formally-verified-the-signal-protocol/"
        },
        {
          "label": "Superpower Daily summary",
          "url": "https://superpowerdaily.com/posts/google-deepmind-uses-ai-to-prove-key-security-guarantees-of-the-signal-protocol"
        },
        {
          "label": "Gigazine, 11 Nov 2026",
          "url": "https://gigazine.net/gsc_news/en/20261111-google-deepmind-alphaproof-code-verification/"
        }
      ],
      "edition": "2026-11-12",
      "baseline": false
    },
    {
      "id": "261110-anthropic-4",
      "date": "2026-11-10",
      "actor": "anthropic",
      "kind": "product",
      "mag": 2,
      "title": "Claude Meetings and partner apps announced; paid plans get a one-time usage reset",
      "summary": "Anthropic announced Claude Meetings, in which Claude joins a video call as a visible participant, takes notes and updates documents, and began to show partner apps such as Canva, Adobe and Atlassian beside the chat. Sources disagree on Meetings: Anthropic's own article says it is coming soon, while TechCrunch reports a beta on Team and Enterprise plans, for Google Meet only. Separately, Anthropic is reported to have said that faults consumed more of users' limits than intended, and to offer Pro, Max, Ultra and Team users a one-time full reset that must be claimed by 10 December.",
      "why": "If you or your colleagues pay for Claude, the reset is worth claiming. An AI participant in meetings raises questions of consent and record-keeping that a department should settle before anyone switches it on.",
      "confidence": "reported",
      "verify": "The support.claude.com article on limit resets, for the terms and the deadline.",
      "sources": [
        {
          "label": "Claude: more ways to work with Claude",
          "url": "https://claude.com/resources/articles/more-ways-to-work-with-claude-sheets-whiteboards-and-interactive-connectors"
        },
        {
          "label": "TechCrunch, 10 Nov 2026",
          "url": "https://techcrunch.com/2026/11/10/anthropic-launches-claude-meetings-to-turn-workplace-discussions-into-plans-and-tasks/"
        },
        {
          "label": "Tech City Authority on the usage reset",
          "url": "https://www.techcityauthority.com/2026/11/anthropic-admits-bugs-drained-claude-usage-limits.html"
        }
      ],
      "edition": "2026-11-12",
      "baseline": false
    },
    {
      "id": "261103-anthropic-1",
      "date": "2026-11-03",
      "actor": "anthropic",
      "kind": "policy",
      "mag": 2,
      "title": "Text watermarks spread across Claude models; there is no public detector",
      "summary": "Anthropic's release notes of 3 November say that text from Mythos 5, Opus 4.7 and Sonnet 4.6 now carries a watermark, and The Decoder reports that four older models follow on 16 November. The Decoder also reports that changing the sampling settings can remove the mark on some models and that the detection service is in private preview only. A digest says xAI switched on text watermarking for its Grok API on 7 November. Law-firm summaries link the timing to the EU AI Act's marking duty for providers, which they say applies from 2 December 2026 to systems already on the market.",
      "why": "A watermark is not a plagiarism detector that a teacher can use: there is no public checker, and the mark can be bypassed. The December date is a duty on providers, not on lecturers.",
      "confidence": "reported",
      "verify": "Regulation (EU) 2026/1744 for the Article 50(2) date: the legal summaries cited were written before final adoption.",
      "sources": [
        {
          "label": "Claude Platform release notes",
          "url": "https://platform.claude.com/docs/en/release-notes/overview"
        },
        {
          "label": "The Decoder",
          "url": "https://the-decoder.com/anthropics-text-watermark-is-easy-to-bypass-on-several-older-claude-models/"
        },
        {
          "label": "Gibson Dunn on the AI Act omnibus",
          "url": "https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/"
        }
      ],
      "edition": "2026-11-12",
      "baseline": false
    },
    {
      "id": "261109-elsewhere-1",
      "date": "2026-11-09",
      "actor": "elsewhere",
      "kind": "release",
      "mag": 2,
      "title": "Meta confirms Muse Ember 1.0, a small low-cost model, dated 9 November",
      "summary": "Meta's research blog announces Muse Ember 1.0, its smallest model, in a post dated 9 November, one day earlier than the tracker cited in the last edition. It is offered through Meta's model API, Muse Code, Google Cloud and Oracle Cloud, with a 1M-token context, at 0.10 dollars per million input tokens and 0.50 per million output tokens for prompts of up to 200,000 tokens. Meta claims that it matches Claude Haiku 5.5 on one index at about a third of the cost per task and trails it on a coding benchmark; these are the vendor's figures.",
      "why": "A cheap tier for people who build tools or agents. No change for the classroom.",
      "confidence": "primary",
      "sources": [
        {
          "label": "Meta research blog: Muse Ember",
          "url": "https://research.meta.ai/blog/muse-ember"
        },
        {
          "label": "Simon Willison, 10 Nov 2026",
          "url": "https://simonwillison.net/2026/Nov/10/muse-ember/"
        }
      ],
      "edition": "2026-11-12",
      "baseline": false
    },
    {
      "id": "261105-elsewhere-1",
      "date": "2026-11-05",
      "actor": "elsewhere",
      "kind": "research",
      "mag": 2,
      "title": "METR: Anthropic's AI research pace has roughly doubled, mostly through AI",
      "summary": "The evaluation group METR, at Anthropic's request, estimated that Anthropic now improves its models on well-specified tasks at about twice the rate of March 2024 to October 2025, with a plausible range of 1.3 to 3 times, and attributes about 80% of the speed-up to AI itself. It puts other frontier labs at about 1.4 times. METR says that Anthropic redacted most of the evidence it found most informative, so outsiders cannot check the figure, and it discloses that it received free model access.",
      "why": "Context for how fast the tools may change within one degree cycle. Treat it as a hedged estimate about one company, resting on evidence that the public cannot see.",
      "confidence": "primary",
      "sources": [
        {
          "label": "METR, 5 Nov 2026",
          "url": "https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/"
        }
      ],
      "edition": "2026-11-12",
      "baseline": false
    },
    {
      "id": "261105-eu-1",
      "date": "2026-11-05",
      "actor": "eu",
      "kind": "policy",
      "mag": 2,
      "title": "EU Education and Skills package puts AI tools and skills on the school agenda",
      "summary": "The European Commission presented an Education and Skills package on 5 November with four priorities: basic skills, digital and AI tools in education, the teaching profession and vocational training. Eight member states formed a consortium, EDU-EDIC, on 3 November to deploy trusted AI and digital services for schools, and Eunews reports a European AI skills certificate for students from 2027-28. The package is aimed at schools: it does not mention higher education and gives no funding figures.",
      "why": "It shapes what the students who reach university from 2028 will have been taught about AI. It creates no duty for universities.",
      "confidence": "primary",
      "sources": [
        {
          "label": "European Commission, 5 Nov 2026",
          "url": "https://digital-strategy.ec.europa.eu/en/news/commission-launches-education-and-skills-package-tackle-declining-basic-skills-rapid-digital-change"
        },
        {
          "label": "Eunews, 5 Nov 2026",
          "url": "https://www.eunews.it/en/2026/11/05/europe-puts-education-first-basic-skills-and-ai-at-the-heart-of-the-new-eu-strategy/"
        }
      ],
      "edition": "2026-11-12",
      "baseline": false
    },
    {
      "id": "261111-elsewhere-1",
      "date": "2026-11-11",
      "actor": "elsewhere",
      "kind": "release",
      "mag": 2,
      "title": "Baidu publishes ERNIE 5.5 Flash weights and opens a preview model",
      "summary": "Baidu released the weights of ERNIE 5.5 Flash Base on 5 November under its own licence: 280 billion parameters, of which 14 billion are active per token. A text-only ERNIE 5.5 Flash Preview with a 1M-token context went live on Baidu's API on 11 November, and one report says Baidu promises its weights under the Apache 2.0 licence by 25 November. Baidu's own benchmarks are mixed and have not been reproduced.",
      "why": "One more large open-weight model from China. It matters only to those who run models on their own hardware.",
      "confidence": "reported",
      "verify": "Baidu's release page for the Base model was read; the Preview details come from a secondary report.",
      "sources": [
        {
          "label": "Baidu: ERNIE 5.5 Flash Base",
          "url": "https://ernie.baidu.com/release/ernie-5-5-flash-base/"
        },
        {
          "label": "Tech City Authority on the Preview",
          "url": "https://www.techcityauthority.com/2026/11/ernie-5-5-flash-preview.html"
        }
      ],
      "edition": "2026-11-12",
      "baseline": false
    },
    {
      "id": "261112-google-1",
      "date": "2026-11-12",
      "actor": "google",
      "kind": "release",
      "mag": 4,
      "title": "Gemini 4 Hydrogen replaces Gemini 3.8 Flash, and free users get it",
      "summary": "Google released Gemini 4 Hydrogen around 12 November. Its own post presents it as a model for agentic workflows, and coverage says it is rolling out in the Gemini app and in Search, where it replaces Gemini 3.8 Flash, for free accounts as well as paid ones. Trade headlines add figures that were not checked here: an API price of 1.50 dollars per million input tokens and 7.50 per million output tokens, a 1M-token context, and a claim that it beats the larger Gemini 4 Argon while running 2.5 times faster.",
      "why": "The model a student reaches without paying, inside Google Search and the Gemini app, has moved up a generation. Retest your assignments against the free tier, not against the paid flagship.",
      "confidence": "reported",
      "verify": "Google's announcement and the Google Cloud model page, for the date, the price and who gets access. Only the titles of these pages were seen in this run.",
      "sources": [
        {
          "label": "Google: Introducing Gemini 4 Hydrogen",
          "url": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/"
        },
        {
          "label": "Google Cloud: Gemini 4 Hydrogen model page",
          "url": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/4-hydrogen"
        },
        {
          "label": "gHacks, 13 Nov 2026",
          "url": "https://www.ghacks.net/2026/11/13/google-releases-gemini-4-hydrogen-in-search-and-the-gemini-app-replacing-gemini-3-8-flash/"
        },
        {
          "label": "Technology.org, 13 Nov 2026",
          "url": "https://www.technology.org/2026/11/13/google-gemini-4-hydrogen-replaces-gemini-3-8-flash-pricing/"
        },
        {
          "label": "Data Studios on price and context",
          "url": "https://www.datastudios.org/post/google-gemini-4-hydrogen-launch-api-pricing-gemini-app-search"
        },
        {
          "label": "Android Headlines on speed and Argon",
          "url": "https://www.androidheadlines.com/2026/11/google-gemini-4-hydrogen-replaces-flash.html"
        }
      ],
      "edition": "2026-11-16",
      "baseline": false
    },
    {
      "id": "261112-universities-1",
      "date": "2026-11-12",
      "actor": "universities",
      "kind": "research",
      "mag": 3,
      "title": "Harvard group maps when AI helps or hinders learning, drawing on 5,000 studies",
      "summary": "Inside Higher Ed reported on 12 November on a new AI Learning Matrix, and Education Week reports that Harvard drew on 5,000 studies to show how AI helps or hinders learning. A digest describes a free guide from a Harvard group to AI use by age and by learning goal, and the Boston Globe presented a Harvard guide for parents on 13 November. These appear to be one and the same release; that was not confirmed in this run.",
      "why": "It arrives a week after Stanford's review of causal studies and has the shape a course policy needs: whether AI should be used depends on what the task is meant to build. Which Harvard unit wrote it, and how the studies were chosen, could not be checked in this run.",
      "confidence": "reported",
      "verify": "The matrix itself, linked from the Inside Higher Ed and Education Week articles: authors, method and how much of the evidence concerns universities.",
      "sources": [
        {
          "label": "Inside Higher Ed, 12 Nov 2026",
          "url": "https://www.insidehighered.com/news/tech-innovation/artificial-intelligence/2026/11/12/new-ai-learning-matrix-brings-nuance-wild"
        },
        {
          "label": "Education Week, Nov 2026",
          "url": "https://www.edweek.org/technology/harvard-taps-5-000-studies-to-show-how-ai-helps-or-hinders-learning/2026/11"
        },
        {
          "label": "Boston Globe, 13 Nov 2026",
          "url": "https://www.bostonglobe.com/2026/11/13/lifestyle/harvard-ai-survival-guide-parents/"
        },
        {
          "label": "Superpower Daily summary",
          "url": "https://superpowerdaily.com/posts/harvard-group-launches-free-guide-to-ai-use-by-age-and-learning-goal"
        }
      ],
      "edition": "2026-11-16",
      "baseline": false
    },
    {
      "id": "261112-elsewhere-1",
      "date": "2026-11-12",
      "actor": "elsewhere",
      "kind": "watch",
      "mag": 3,
      "title": "Two-day Microsoft 365 outage also reaches Claude and ChatGPT",
      "summary": "A worldwide outage of Microsoft 365 began on 12 November and ran into a second day, disrupting Outlook and Teams for businesses and governments, according to Time, CNN and Gizmodo. A later report says it has been resolved. Trade press reports that the Microsoft connectors of ChatGPT and Claude stopped working during the outage, and Anthropic's status page lists login problems on Claude, which reports date to 13 November. One report says Anthropic attributed its login failure to Microsoft authentication; that link was not verified here.",
      "why": "Email, the meeting platform and the AI assistant can fail together when they share one provider. A course that depends on a single service for submission or for an AI-based activity needs a stated fallback.",
      "confidence": "reported",
      "verify": "Microsoft's post-incident report for the cause and the duration, and the Anthropic status page for whether the Claude login fault was related.",
      "sources": [
        {
          "label": "Time, 13 Nov 2026",
          "url": "https://time.com/article/2026/11/13/microsoft-outage-worldwide-disruption-teams-outlook-emails/"
        },
        {
          "label": "CNN live coverage, 12 Nov 2026",
          "url": "https://www.cnn.com/2026/11/12/business/live-news/microsoft-global-outage-intl-hnk"
        },
        {
          "label": "Gizmodo: outage enters second day",
          "url": "https://gizmodo.com/microsoft-outage-knocks-out-email-for-businesses-police-and-hospitals-2000839696"
        },
        {
          "label": "Yahoo News: outage resolved",
          "url": "https://www.yahoo.com/news/microsoft-global-outage-resolved-192825560.html"
        },
        {
          "label": "Inc. on ChatGPT and Claude",
          "url": "https://www.inc.com/aaron-mok/the-microsoft-outage-also-hit-chatgpt-and-claude-but-theres-an-easy-workaround/91436228"
        },
        {
          "label": "Anthropic status: login issues",
          "url": "https://status.anthropic.com/incidents/m76bldqdnwbm"
        },
        {
          "label": "Wikipedia: 2026 Microsoft outage",
          "url": "https://en.wikipedia.org/wiki/2026_Microsoft_outage"
        }
      ],
      "edition": "2026-11-16",
      "baseline": false
    },
    {
      "id": "261113-universities-1",
      "date": "2026-11-13",
      "actor": "universities",
      "kind": "research",
      "mag": 3,
      "title": "AI-written papers are appearing under real academics' names",
      "summary": "Times Higher Education and Inside Higher Ed, the latter on 13 November, report that low-quality AI-generated papers have been published under the names of prominent academics. NBC News describes fake academic journals that publish AI-generated papers under real professors' names. Whether the two reports cover the same cases, and how many cases there are, was not checked in this run.",
      "why": "An author's name on a paper is weaker evidence than it was that the person wrote it. This matters for your own publication record, and for teaching students how to judge a source.",
      "confidence": "reported",
      "verify": "The Times Higher Education article for the cases and the scale.",
      "sources": [
        {
          "label": "Times Higher Education",
          "url": "https://www.timeshighereducation.com/news/ai-slop-papers-published-under-prominent-academics-names"
        },
        {
          "label": "Inside Higher Ed, 13 Nov 2026",
          "url": "https://www.insidehighered.com/news/faculty/books-publishing/2026/11/13/ai-slop-papers-published-under-prominent-academics-names"
        },
        {
          "label": "NBC News",
          "url": "https://www.nbcnews.com/tech/internet/fake-journals-using-real-professors-names-ai-generated-papers-rcna265479"
        }
      ],
      "edition": "2026-11-16",
      "baseline": false
    },
    {
      "id": "261110-anthropic-5",
      "date": "2026-11-10",
      "actor": "anthropic",
      "kind": "policy",
      "mag": 2,
      "title": "Anthropic signs a binding safety and privacy agreement with US teachers' unions",
      "summary": "The American Federation of Teachers and its New York affiliate, the UFT, announced a binding agreement with Anthropic on AI safety and privacy in schools. Education Week describes it as protections for teachers who use Claude, and one summary says it includes deletion of data within 180 days. Microsoft signed a comparable agreement with the same unions in September. The text of the agreement was not read in this run.",
      "why": "It concerns US schools, not universities, but it is a model of what staff can ask of an AI vendor: binding terms on data instead of a promise in a blog post. Useful when a campus licence is negotiated.",
      "confidence": "reported",
      "verify": "The AFT press release for the terms, and Education Week's earlier analysis of how firm the Microsoft version is.",
      "sources": [
        {
          "label": "AFT press release",
          "url": "https://www.aft.org/press-release/aft-uft-and-anthropic-sign-binding-ai-safety-and-privacy-agreement-schools"
        },
        {
          "label": "Education Week, Nov 2026",
          "url": "https://www.edweek.org/technology/anthropic-agrees-to-protections-for-teachers-who-use-claude/2026/11"
        },
        {
          "label": "GovTech",
          "url": "https://www.govtech.com/education/k-12/anthropic-joins-aft-and-ufts-binding-ai-safety-standard"
        },
        {
          "label": "FourWeekMBA on the 180-day term",
          "url": "https://fourweekmba.com/ai-anthropic-signs-teachers-union-pact-180-day-data-deletion/"
        }
      ],
      "edition": "2026-11-16",
      "baseline": false
    },
    {
      "id": "261110-anthropic-6",
      "date": "2026-11-10",
      "actor": "anthropic",
      "kind": "business",
      "mag": 2,
      "title": "Anthropic share offer: 70 to 78 dollars a share, trading expected on 19 November",
      "summary": "CNBC, citing sources, reported on 10 November that Anthropic set a price range of 70 to 78 dollars per share for its stock market listing and aims to start trading on 19 November. Yahoo Finance puts the valuation at up to 1.4 trillion dollars, and market pages list the shares on Nasdaq under the ticker ANT. None of this was checked here against Anthropic's filing.",
      "why": "An update to the roadshow item of 11 November. Once the shares trade, the costs of a frontier lab become public record. The editor of this page is an Anthropic model, so read the figures at the source.",
      "confidence": "reported",
      "verify": "Anthropic's amended S-1 on the US regulator's EDGAR site for the range and the date.",
      "sources": [
        {
          "label": "CNBC, 10 Nov 2026",
          "url": "https://www.cnbc.com/2026/11/10/anthropic-sets-price-range-of-70-to-78-in-upcoming-ipo.html"
        },
        {
          "label": "Yahoo Finance on the valuation",
          "url": "https://finance.yahoo.com/markets/stocks/articles/anthropic-sets-ipo-price-range-140602411.html"
        },
        {
          "label": "TradingView listing page",
          "url": "https://www.tradingview.com/symbols/NASDAQ-ANT/"
        }
      ],
      "edition": "2026-11-16",
      "baseline": false
    },
    {
      "id": "261113-openai-1",
      "date": "2026-11-13",
      "actor": "openai",
      "kind": "product",
      "mag": 2,
      "title": "ChatGPT Wallet lets OpenAI's agents pay for purchases",
      "summary": "OpenAI launched ChatGPT Wallet on 13 November. It allows the company's AI agents, which it calls dots, to make purchases on a user's behalf, CNBC reports. Other coverage says that the agent does not see the card details and that each purchase needs the user's approval, with a biometric check. Countries, plans and limits were not checked in this run.",
      "why": "Agents that can spend money go a step beyond agents that read and write. It is a concrete case for courses that touch consumer law, payments or the ethics of delegation, and it does not change coursework.",
      "confidence": "reported",
      "verify": "OpenAI's product announcement for availability and for how approval works.",
      "sources": [
        {
          "label": "CNBC, 13 Nov 2026",
          "url": "https://www.cnbc.com/2026/11/13/openai-chatgpt-wallet-dot-purchases.html"
        },
        {
          "label": "Android Authority",
          "url": "https://www.androidauthority.com/chatgpt-wallet-3735154/"
        },
        {
          "label": "WebProNews on the biometric check",
          "url": "https://www.webpronews.com/openai-chatgpt-wallet-dots-agents-payments"
        },
        {
          "label": "Benzinga on card details",
          "url": "https://www.benzinga.com/markets/tech/26/11/63273173/chatgpt-wallet-openais-dots"
        }
      ],
      "edition": "2026-11-16",
      "baseline": false
    },
    {
      "id": "261111-google-2",
      "date": "2026-11-11",
      "actor": "google",
      "kind": "research",
      "mag": 2,
      "title": "DeepMind releases Gemini Robotics 2.5 and AlphaGenome 2",
      "summary": "Google DeepMind announced two models on 11 November, SiliconANGLE reports. Gemini Robotics 2.5 goes to partners together with an open robot-safety benchmark, ASIMOV-Jailbreak, and The Decoder reports a 96% score at sorting metal parts in an assembly pilot at Mercedes-Benz. AlphaGenome 2 predicts how DNA variants act in specific cell types; summaries cite twice the recall of its predecessor and API access for non-commercial research. These are the vendor's figures as relayed by the press.",
      "why": "AlphaGenome 2 is the one to pass to colleagues in the life sciences, since access for non-commercial research is reported. The robotics model is for the record.",
      "confidence": "reported",
      "verify": "DeepMind's blog posts for both models and the access terms for AlphaGenome 2.",
      "sources": [
        {
          "label": "Google DeepMind: Gemini Robotics 2.5",
          "url": "https://deepmind.google/blog/gemini-robotics-2-5-accelerates-real-world-physical-intelligence/"
        },
        {
          "label": "SiliconANGLE, 11 Nov 2026",
          "url": "https://siliconangle.com/2026/11/11/google-deepmind-releases-new-advanced-robotics-ai-model-and-next-generation-gene-prediction-model/"
        },
        {
          "label": "The Decoder on the Mercedes-Benz pilot",
          "url": "https://the-decoder.com/google-deepminds-gemini-robotics-2-5-scores-96-percent-sorting-metal-parts-in-a-mercedes-benz-assembly-pilot/"
        },
        {
          "label": "TechRepublic on AlphaGenome 2",
          "url": "https://www.techrepublic.com/article/news-google-deepmind-alphagenome-2-genetic-variants/"
        },
        {
          "label": "Data Studios on AlphaGenome 2 access",
          "url": "https://www.datastudios.org/post/google-deepmind-alphagenome-2-cell-type-dna-model-api-non-commercial-research"
        }
      ],
      "edition": "2026-11-16",
      "baseline": false
    },
    {
      "id": "261111-elsewhere-2",
      "date": "2026-11-11",
      "actor": "elsewhere",
      "kind": "business",
      "mag": 2,
      "title": "Nvidia's Jensen Huang resigns; finance chief Colette Kress is interim chief executive",
      "summary": "Nvidia announced a change of chief executive on 11 November: Jensen Huang resigned and the chief financial officer, Colette Kress, took over as interim chief executive, Fortune and the Washington Post report. Press coverage ties the departure to a personal scandal with national security implications, and CNN reports that Congress has summoned Huang to testify. On 13 November Nvidia's market value closed below 4 trillion dollars for the first time since July 2025, according to CNBC.",
      "why": "Nvidia supplies most of the chips on which these models are trained and run. Nothing changes in the classroom; it is context for the cost and supply of computing, university clusters included.",
      "confidence": "reported",
      "verify": "Nvidia's press release and its filing with the US regulator for the facts of the transition. The reasons are as the press reports them and were not verified here.",
      "sources": [
        {
          "label": "Nvidia: announcement of the transition",
          "url": "https://nvidianews.nvidia.com/news/nvidia-announces-ceo-transition"
        },
        {
          "label": "Fortune, 11 Nov 2026",
          "url": "https://fortune.com/2026/11/11/nvidia-oust-jensen-huang-spy-affairs/"
        },
        {
          "label": "Washington Post on Colette Kress",
          "url": "https://www.washingtonpost.com/business/2026/11/12/nvidia-jensen-huang-colette-kress/99dbffb6-deb1-11f1-912c-4fbb80d73f7f_story.html"
        },
        {
          "label": "CNN live coverage",
          "url": "https://www.cnn.com/2026/11/11/business/live-news/nvidia-jensen-huang-investigation-fallout"
        },
        {
          "label": "CNBC, 13 Nov 2026",
          "url": "https://www.cnbc.com/2026/11/13/nvidia-nvda-stock-jensen-huang-transition.html"
        }
      ],
      "edition": "2026-11-16",
      "baseline": false
    },
    {
      "id": "261113-elsewhere-1",
      "date": "2026-11-13",
      "actor": "elsewhere",
      "kind": "policy",
      "mag": 2,
      "title": "Non-profits sue five AI companies to freeze frontier model development",
      "summary": "A Reuters report carried by several outlets on 13 November says that OpenAI, Google and Anthropic face a lawsuit that seeks to halt the development of frontier AI. Other reports count four non-profit plaintiffs and five defendants, adding Meta and the AI unit of SpaceX, and say the claim cites the risk of cyberattacks and of catastrophic harm. Just Security has published the court documents. The court has made no decision.",
      "why": "A case to follow in courses on law, ethics or technology policy. It has no practical effect unless a court grants an order, which would be unusual.",
      "confidence": "reported",
      "verify": "The complaint, published by Just Security, for the court, the plaintiffs and what exactly is asked.",
      "sources": [
        {
          "label": "Reuters via Claims Journal, 13 Nov 2026",
          "url": "https://www.claimsjournal.com/news/national/2026/11/13/341283.htm"
        },
        {
          "label": "Just Security: the documents",
          "url": "https://www.justsecurity.org/164494/nonprofits-lawsuit-freeze-frontier-ai-development/"
        },
        {
          "label": "Business and Human Rights Centre",
          "url": "https://www.business-humanrights.org/en/latest-news/usa-advocacy-groups-sue-ai-giants-to-halt-development-over-catastrophic-risks/"
        },
        {
          "label": "MLQ on the five defendants",
          "url": "https://mlq.ai/news/nonprofits-sue-openai-google-anthropic-meta-and-spacexs-ai-unit-to-freeze-frontier-ai-development/"
        }
      ],
      "edition": "2026-11-16",
      "baseline": false
    },
    {
      "id": "261117-openai-1",
      "date": "2026-11-17",
      "actor": "openai",
      "kind": "release",
      "mag": 4,
      "title": "GPT-6.2 Astra and Sol released for paying ChatGPT users, with lower API prices",
      "summary": "OpenAI released GPT-6.2 Astra and GPT-6.2 Sol on 17 November. Its launch post on X says that both are available in ChatGPT Work and Codex for Plus, Pro, Enterprise and Edu users; free accounts are not mentioned. Trade coverage gives API prices of 8 and 40 dollars per million input and output tokens for Astra, a cut of 20%, and 2 and 10 dollars for Sol, and Quartz reports that OpenAI scrapped an earlier version before this release. The Artificial Analysis index is reported to place Astra second, behind Claude Fable 5.2 and two points ahead of Gemini 4 Carbon, and the first reviews are mixed, with several testers calling it hard to work with.",
      "why": "Students on ChatGPT Edu or a paid plan have two new models from this week, so retest any assignment you had checked against GPT-6 Astra or GPT-6.1 Sol. Nothing in the coverage seen says that the free tier changed.",
      "confidence": "reported",
      "verify": "OpenAI's announcement for the plans, the limits and the prices, and Simon Willison's notes for an independent first look. Only titles and the text of one post were seen in this run.",
      "sources": [
        {
          "label": "OpenAI: Introducing GPT-6.2 Astra and Sol",
          "url": "https://openai.com/index/introducing-gpt-6-2-astra-sol/"
        },
        {
          "label": "OpenAI on X: who gets the models",
          "url": "https://x.com/OpenAI/status/2122750135608528984"
        },
        {
          "label": "Simon Willison, 17 Nov 2026",
          "url": "https://simonwillison.net/2026/Nov/17/gpt62-astra-and-sol/"
        },
        {
          "label": "9to5Mac, 17 Nov 2026",
          "url": "https://9to5mac.com/2026/11/17/openai-upgrades-chatgpt-and-codex-with-new-gpt-6-2-astra-and-sol-models/"
        },
        {
          "label": "The Decoder on prices and benchmarks",
          "url": "https://the-decoder.com/openai-launches-gpt-6-2-astra-and-sol-with-lower-api-prices-and-some-benchmark-gains/"
        },
        {
          "label": "Quartz on the scrapped version",
          "url": "https://qz.com/openai-gpt-6-2-astra-release-scrapped-version-111726"
        },
        {
          "label": "Data Studios on API prices",
          "url": "https://www.datastudios.org/post/openai-gpt-6-2-astra-sol-launch-api-pricing-chatgpt-codex"
        },
        {
          "label": "OfficeChai on the Artificial Analysis index",
          "url": "https://officechai.com/ai/gpt-6-2-astra-artificial-analysis-intelligence-index/"
        },
        {
          "label": "Latent Space on the mixed reviews",
          "url": "https://latent.space/p/ainews-gpt-6-2-astra-the-2-frontier-model-is-better-and-20-600-cheaper-but-has-mixed-reviews-6-2-sol/"
        }
      ],
      "edition": "2026-11-19",
      "baseline": false
    },
    {
      "id": "261118-google-1",
      "date": "2026-11-18",
      "actor": "google",
      "kind": "release",
      "mag": 3,
      "title": "Gemini 4 Neon: a mid-range model for AI Pro subscribers and the API",
      "summary": "Google launched Gemini 4 Neon on 18 November, 9to5Google reports; one outlet counts it as Google's fourth model in a month. Headlines describe quality close to Carbon at the speed of the Flash models, available to AI Pro subscribers in the Gemini app, in the Antigravity coding tool and through the API. The reported API price is 3 dollars per million input tokens and 15 per million output tokens, which is twice the price of Hydrogen and, until Carbon's introductory price ends on 30 November, more than Carbon itself. Digital Trends relays Google's claim that it keeps up with Claude Opus 5.5 and GPT-6.2 Sol for less; no independent score was found.",
      "why": "It is a paid model, so the free tier that most students use stays on Hydrogen. Anyone who pays for API use in research or in a teaching tool should compare prices again after 30 November before committing a budget.",
      "confidence": "reported",
      "verify": "Google's announcement and its price page for the date, the plans and the prices. No Google page for Neon appeared in the searches of this run.",
      "sources": [
        {
          "label": "9to5Google, 18 Nov 2026",
          "url": "https://9to5google.com/2026/11/18/gemini-4-neon-announcement/"
        },
        {
          "label": "Digital Trends on Google's comparison",
          "url": "https://www.digitaltrends.com/computing/google-says-gemini-4-neon-can-hang-with-claude-opus-5-5-and-gpt-6-2-sol-for-less/"
        },
        {
          "label": "TestingCatalog on where it is available",
          "url": "https://www.testingcatalog.com/google-launches-gemini-4-neon-on-gemini-antigravity-and-apis/"
        },
        {
          "label": "Rolling Out, 18 Nov 2026",
          "url": "https://rollingout.com/2026/11/18/google-launches-gemini-4-neon-model/"
        },
        {
          "label": "Pasquale Pillitteri on the price against Hydrogen",
          "url": "https://pasqualepillitteri.it/en/news/34696/gemini-4-neon-google-cloud-sku-twice-hydrogen-price"
        },
        {
          "label": "Kingy AI on the price against Carbon",
          "url": "https://kingy.ai/blog/gemini-4-neon/"
        }
      ],
      "edition": "2026-11-19",
      "baseline": false
    },
    {
      "id": "261117-google-2",
      "date": "2026-11-17",
      "actor": "google",
      "kind": "product",
      "mag": 3,
      "title": "Gemini Tasks, Google's agent mode, becomes free in six countries",
      "summary": "Google made Gemini Tasks, the mode in which Gemini carries out multi-step jobs for the user, free in six countries on 17 November, 9to5Google reports. One headline says that it previously required the 19.99-dollar plan. Reports add that the phone calls and payments it can make are limited to the United States, and that it can now send texts and emails. Which six countries are included was not established in this run, so check whether yours is one of them.",
      "why": "An agent that completes multi-step tasks is moving from paid plans to free accounts. Where it is available, any student can hand over a task that consists of gathering, filling in and sending, not only those who pay.",
      "confidence": "reported",
      "verify": "Google's announcement for the list of countries and for what the free version can do.",
      "sources": [
        {
          "label": "9to5Google, 17 Nov 2026",
          "url": "https://9to5google.com/2026/11/17/gemini-tasks-free/"
        },
        {
          "label": "PPC Land on the earlier price",
          "url": "https://ppc.land/geminis-19-99-task-mode-goes-free-in-6-countries/"
        },
        {
          "label": "Phandroid, 18 Nov 2026",
          "url": "https://phandroid.com/2026/11/18/geminis-ai-agent-no-longer-needs-a-paid-subscription-in-six-countries/"
        },
        {
          "label": "Pasquale Pillitteri on the US-only functions",
          "url": "https://pasqualepillitteri.it/en/news/34466/gemini-tasks-arrives-free-in-six-countries-calls"
        },
        {
          "label": "Chrome Geek on texts and emails",
          "url": "https://www.chromegeek.com/gemini-tasks-free-text-email/"
        }
      ],
      "edition": "2026-11-19",
      "baseline": false
    },
    {
      "id": "261116-deepseek-1",
      "date": "2026-11-16",
      "actor": "deepseek",
      "kind": "product",
      "mag": 3,
      "title": "DeepSeek's free chat gets daily caps and shorter inputs, users report",
      "summary": "Users of DeepSeek's free app and website report new daily caps and a limit of 40,000 characters per input, according to Sixth Tone and to TechNode, the latter on 16 November. TechNode says that the service cites capacity constraints, while Pandaily noted that DeepSeek had not confirmed the limits; other reports link them to China's shortage of AI chips. Separately, DeepSeek is reported to have opened its app's tools, including web search, file reading and voice, to developers through its API this month. The dates of both changes were not pinned down in this run.",
      "why": "Many students use DeepSeek's free chat. Long documents and long sessions may now hit a limit, which is one more reason not to design an activity around a single free service.",
      "confidence": "reported",
      "verify": "DeepSeek's own notices for the exact limits, and its price page for the API tools.",
      "sources": [
        {
          "label": "TechNode, 16 Nov 2026",
          "url": "https://technode.com/2026/11/16/deepseek-users-report-chat-limits-as-the-service-cites-capacity-constraints/"
        },
        {
          "label": "Sixth Tone",
          "url": "https://www.sixthtone.com/news/1019284"
        },
        {
          "label": "Pandaily on X: limits unconfirmed",
          "url": "https://x.com/thePandaily/status/2122279329036222717"
        },
        {
          "label": "investingLive on the chip shortage",
          "url": "https://investinglive.com/stocks/ai-daily-quotas-come-to-deepseek-a-visible-sign-of-china-s-ai-chip-crunch/"
        },
        {
          "label": "Startup Fortune on the API tools",
          "url": "https://startupfortune.com/deepseek-turns-its-whole-app-into-an-api-with-search-file-reading-voice-and-safety-built-in/"
        },
        {
          "label": "DeepSeek: models and pricing",
          "url": "https://api-docs.deepseek.com/quick_start/pricing/"
        }
      ],
      "edition": "2026-11-19",
      "baseline": false
    },
    {
      "id": "261116-alibaba-1",
      "date": "2026-11-16",
      "actor": "alibaba",
      "kind": "release",
      "mag": 3,
      "title": "Qwen4-Max leaves preview: cloud only, no weights, low price",
      "summary": "Alibaba made Qwen4-Max generally available on 16 November, nine days before its preview was due to end, according to trackers and trade reports. They describe a model of 2.4 trillion parameters with a 1M-token context, priced at a reported 1.50 dollars per million input tokens and 4.50 per million output tokens, and still without downloadable weights. Alibaba is reported to say that it cuts the cost of an average task by about 60% and tightens its guardrails against use in cyberattacks. One report mentions limits for users in the EU, which were not checked.",
      "why": "The flagship is a paid cloud service with no weights, so groups that run Qwen models locally for teaching or research stay on the older open ones. The reported price is far below that of the US flagships.",
      "confidence": "reported",
      "verify": "Alibaba Cloud's Model Studio pages for the release date, the price and any regional limits.",
      "sources": [
        {
          "label": "Digital Trends",
          "url": "https://www.digitaltrends.com/computing/qwen-4-max-aliababas-latest-flagship-ai-model-announced/"
        },
        {
          "label": "ModelFit: out of preview, still no weights",
          "url": "https://modelfit.io/blog/qwen4-max-general-availability-no-weights/"
        },
        {
          "label": "ArtificialWatch on the date and the price",
          "url": "https://artificialwatch.com/model-qwen-4-0-max.html"
        },
        {
          "label": "Ground News on task cost and guardrails",
          "url": "https://ground.news/article/alibaba-unveils-new-flagship-ai-model-with-safety-upgrades_865a2c"
        },
        {
          "label": "CASRAI on the 1M-token context",
          "url": "https://casrai.org/news/alibaba-qwen4-max-general-release-million-token-context-2026"
        },
        {
          "label": "DataNorth on cost per task and EU limits",
          "url": "https://datanorth.ai/news/qwen4-max-api-cost-per-task"
        }
      ],
      "edition": "2026-11-19",
      "baseline": false
    },
    {
      "id": "261118-anthropic-1",
      "date": "2026-11-18",
      "actor": "anthropic",
      "kind": "business",
      "mag": 3,
      "title": "Anthropic prices its share offer at 83 dollars and raises a record 81.3 billion",
      "summary": "Anthropic priced its initial public offering on 18 November at 83 dollars a share, above the range of 70 to 78 dollars it had set, CNBC and others report. It sold 980 million shares and raised about 81.3 billion dollars, the largest offering on record and more than SpaceX raised. One outlet puts the resulting valuation at about 1.5 trillion dollars. The shares are due to start trading on Nasdaq under the ticker ANT on Thursday 19 November, after this edition was written.",
      "why": "An update to the items of 11 and 16 November. From now on the finances of a frontier lab are public, quarter by quarter, which is material for economics and business courses. The editor of this page is an Anthropic model, so check the figures at the source.",
      "confidence": "reported",
      "verify": "Anthropic's final prospectus on the US regulator's EDGAR site for the price, the number of shares and the proceeds.",
      "sources": [
        {
          "label": "CNBC, 18 Nov 2026",
          "url": "https://www.cnbc.com/2026/11/18/anthropic-ipo-ai-offering-price.html"
        },
        {
          "label": "Al Jazeera, 19 Nov 2026",
          "url": "https://www.aljazeera.com/economy/2026/11/19/anthropic-raises-81-3bn-in-biggest-ipo-of-all-time"
        },
        {
          "label": "investingLive on the 980 million shares",
          "url": "https://investinglive.com/stocks/anthropic-confirms-83-ipo-price-on-980-million-shares-in-an-81-billion-deal/"
        },
        {
          "label": "CNN, 18 Nov 2026",
          "url": "https://www.cnn.com/2026/11/18/investing/anthropic-ipo-price-stock"
        },
        {
          "label": "The Federal on the valuation",
          "url": "https://thefederal.com/category/business/anthropic-hits-usd-15-trillion-valuation-in-biggest-wall-street-ipo-ever-263381"
        },
        {
          "label": "Anthropic's amended S-1 on EDGAR",
          "url": "https://www.sec.gov/Archives/edgar/data/2130357/000162828026074338/anthropicpbc-sx1ax3.htm"
        }
      ],
      "edition": "2026-11-19",
      "baseline": false
    },
    {
      "id": "261118-anthropic-2",
      "date": "2026-11-18",
      "actor": "anthropic",
      "kind": "policy",
      "mag": 2,
      "title": "Statement signed by 92 people disputes Anthropic's safety claims before its listing",
      "summary": "On 18 November the Center for AI Safety and about 90 other signatories, described as scientists, legal scholars and technology figures, published what they call the MisAnthropic Statement; two reports count 92 signatures. According to Techmeme's summary, it challenges the company's safety branding and calls its effort to build AI that improves itself reckless, and The National reports that the signatories tie their warning to the share offer. Gizmodo describes it as the company's critics uniting ahead of the listing. No reply from Anthropic was found in this run.",
      "why": "The editor of this page is an Anthropic model, so read the statement itself and not this summary. For teaching, it is a current primary document in the argument over whether a company can sell itself on safety while racing to build more capable systems.",
      "confidence": "reported",
      "verify": "The statement itself, through the Center for AI Safety, for the signatories and the exact claims, and Anthropic's response if there is one.",
      "sources": [
        {
          "label": "The National, 18 Nov 2026",
          "url": "https://www.thenationalnews.com/future/technology/2026/11/18/anthropic-ipo-warning-misanthropic/"
        },
        {
          "label": "Techmeme summary, 18 Nov 2026",
          "url": "https://www.techmeme.com/261118/p30"
        },
        {
          "label": "Gizmodo",
          "url": "https://gizmodo.com/the-accelerationists-are-trying-to-stop-anthropic-2000841831"
        },
        {
          "label": "Tao Media on the 92 signatures",
          "url": "https://www.tao.media/anthropic-declared-unsafe-by-92-ai-leaders-in-misanthropic-statement/"
        }
      ],
      "edition": "2026-11-19",
      "baseline": false
    },
    {
      "id": "261117-openai-2",
      "date": "2026-11-17",
      "actor": "openai",
      "kind": "policy",
      "mag": 2,
      "title": "OpenAI rates GPT-6.2 Astra High for self-improvement, a first for a deployed model",
      "summary": "Coverage of the GPT-6.2 system card says that Astra is the first model OpenAI has deployed that reaches the High threshold for AI self-improvement in the company's own risk framework. One summary's headline cites a score of 59% of the best human result; what that test measures was not checked. Which safeguards the rating triggers was not established in this run.",
      "why": "A company is grading its own model here, so treat it as a disclosure and not as an independent measurement. It still matters for courses on AI policy: the labs now state in their own safety documents that their models can speed up AI research, which is what METR reported about Anthropic earlier this month.",
      "confidence": "reported",
      "verify": "The GPT-6.2 system card on OpenAI's Deployment Safety Hub: the definition of the threshold, the test results and the safeguards.",
      "sources": [
        {
          "label": "OpenAI: GPT-6.2 system card",
          "url": "https://deploymentsafety.openai.com/gpt-6-2-astra-sol"
        },
        {
          "label": "Technology.org, 18 Nov 2026",
          "url": "https://www.technology.org/2026/11/18/openai-gpt-6-2-astra-sol-high-self-improvement-pricing/"
        },
        {
          "label": "Crypto Briefing",
          "url": "https://cryptobriefing.com/openai-gpt-6-2-astra-self-improvement-threshold/"
        },
        {
          "label": "FourWeekMBA on the 59% figure",
          "url": "https://fourweekmba.com/ai-openais-first-high-self-improver-hit-59-of-human-best/"
        }
      ],
      "edition": "2026-11-19",
      "baseline": false
    },
    {
      "id": "261117-mollick-1",
      "date": "2026-11-17",
      "actor": "mollick",
      "kind": "essay",
      "mag": 2,
      "title": "Mollick on GPT-6.2 Astra: uneven, harder to steer, strong on ambitious projects",
      "summary": "Ethan Mollick, who used the model before launch, wrote on X on 17 November that he found GPT-6.2 Astra 'very uneven' and harder to steer than other models. He added that when he gave it an ambitious project, building a space elevator ride from scratch with Blender and Unity, it delivered well. Searches found no new essay on One Useful Thing since 'Fable 5.2 and Jagged AGI' of 9 November.",
      "why": "It agrees with the mixed reviews from other testers and with his own 'jagged' picture of these models: very good at large, open tasks and awkward at ordinary ones. The newest model is not always the easiest one for students to use.",
      "confidence": "reported",
      "verify": "The post itself. Its text was seen in a search result; the page was not opened.",
      "sources": [
        {
          "label": "Ethan Mollick on X",
          "url": "https://x.com/emollick/status/2122755693191287009"
        },
        {
          "label": "AGI Hunt summary",
          "url": "https://agihunt.info/en/p/1a1eac001a9233ae37851a30424"
        },
        {
          "label": "Implicator on other early testers",
          "url": "https://www.implicator.ai/gpt-6-2-astra-early-testers-theo-letter/"
        }
      ],
      "edition": "2026-11-19",
      "baseline": false
    },
    {
      "id": "261117-elsewhere-1",
      "date": "2026-11-17",
      "actor": "elsewhere",
      "kind": "watch",
      "mag": 2,
      "title": "Reuters: Chinese developers train rival models on the answers of US models",
      "summary": "A Reuters exclusive of 17 November reports that Chinese AI developers increasingly train their own models on answers generated by US models, a technique called distillation, as US chip restrictions tighten. Summaries say that the report rests on more than 300 documents and that OpenAI's models and Alibaba's Qwen are among those named. The companies' responses were not seen in this run.",
      "why": "It helps to explain how low-cost Chinese models stay close to the US frontier. It is also a live case for classes on intellectual property: the US labs' terms of service generally forbid this use, and the law is unsettled.",
      "confidence": "reported",
      "verify": "The Reuters article for which companies are named, what the documents show and what the companies answer.",
      "sources": [
        {
          "label": "Reuters via Investing.com",
          "url": "https://www.investing.com/news/economy-news/exclusivechina-taps-us-ai-models-to-train-homegrown-rivals-as-chip-curbs-bite-5031568"
        },
        {
          "label": "Technology.org, 17 Nov 2026",
          "url": "https://www.technology.org/2026/11/17/china-distillation-us-ai-model-outputs-train-domestic-rivals/"
        },
        {
          "label": "AI Weekly on the documents and Qwen",
          "url": "https://aiweekly.co/alerts/reuters-300-documents-show-china-distilling-openai-outputs-for-qwen"
        },
        {
          "label": "MLQ summary",
          "url": "https://mlq.ai/news/chinese-companies-use-answers-from-us-ai-models-to-train-domestic-rivals-as-chip-curbs-tighten-reuters-reports/"
        }
      ],
      "edition": "2026-11-19",
      "baseline": false
    },
    {
      "id": "261117-elsewhere-2",
      "date": "2026-11-17",
      "actor": "elsewhere",
      "kind": "business",
      "mag": 2,
      "title": "Nvidia's revenue doubles to 115.8 billion dollars; board rules out Huang's return",
      "summary": "Nvidia published its first quarterly results since Jensen Huang's resignation: revenue of 115.8 billion dollars, up 103% on a year earlier, with guidance of about 130 billion for the next quarter, according to Yahoo Finance and trade reports. The board said that it will not reinstate Huang as chief executive, and Colette Kress led the call as interim chief. CNBC's report is dated 17 November and UPI's 18 November.",
      "why": "A follow-up to Monday's item. Demand for the chips that train and run these models is still doubling year on year. Nothing changes in the classroom.",
      "confidence": "reported",
      "verify": "Nvidia's results release, filed with the US regulator, for the figures and the date.",
      "sources": [
        {
          "label": "Nvidia: third-quarter results on EDGAR",
          "url": "https://www.sec.gov/Archives/edgar/data/0001045810/000104581026000088/q3fy27pr.htm"
        },
        {
          "label": "CNBC, 17 Nov 2026",
          "url": "https://www.cnbc.com/2026/11/17/nvidia-nvda-earnings-report-q3-2027.html"
        },
        {
          "label": "Yahoo Finance live coverage",
          "url": "https://finance.yahoo.com/technology/live/nvidia-earnings-live-nvidia-to-report-q3-results-after-the-bell-with-colette-kress-to-host-first-call-as-interim-ceo-202616349.html"
        },
        {
          "label": "CBS News",
          "url": "https://www.cbsnews.com/news/nvidia-earnings-jensen-huang-colette-kress/"
        },
        {
          "label": "UPI, 18 Nov 2026",
          "url": "https://www.upi.com/Top_News/US/2026/11/18/NVIDIA-announces-bumper-results/2411794995278/"
        }
      ],
      "edition": "2026-11-19",
      "baseline": false
    },
    {
      "id": "261103-universities-6",
      "date": "2026-11-03",
      "actor": "universities",
      "kind": "product",
      "mag": 2,
      "title": "Oxford University Press pilots a link between its scholarship and ChatGPT Edu",
      "summary": "Oxford University Press is testing a way to make its content discoverable from AI assistants, starting with ChatGPT Edu, Publishers Weekly reports. Library Journal's infoDOCKET dated the announcement to 3 November and named Harvard Library, the Wharton School and the University of Oxford as partners, with the connection built on the MCP standard. Oxford's student paper Cherwell reported on 15 November that the pilot integrates the press's content with ChatGPT Edu. This is a catch-up item: the announcement predates the last two editions.",
      "why": "If it works, a student's AI assistant could search the titles that a library has licensed and cite them, where today it draws mostly on the open web. Ask your own library whether publishers have offered the same.",
      "confidence": "reported",
      "verify": "The press release from Oxford University Press for what content is included and how access is controlled.",
      "sources": [
        {
          "label": "STM Publishing News: the announcement",
          "url": "https://www.stm-publishing.com/oup-launches-new-pilot-to-connect-trusted-scholarship-with-ai-powered-research/"
        },
        {
          "label": "Publishers Weekly",
          "url": "https://www.publishersweekly.com/pw/by-topic/industry-news/libraries/article/101680-oxford-university-press-tests-connecting-its-content-to-chatgpt-edu.html"
        },
        {
          "label": "infoDOCKET, 3 Nov 2026",
          "url": "https://www.infodocket.com/2026/11/03/company-news-oxford-university-press-launches-mcp-pilot-partners-include-harvard-library-wharton-school-and-university-of-oxford/"
        },
        {
          "label": "Cherwell, 15 Nov 2026",
          "url": "https://www.cherwell.org/2026/11/15/oxord-university-press-pilot-scheme-with-chatgpt-edu/"
        }
      ],
      "edition": "2026-11-19",
      "baseline": false
    },
    {
      "id": "261118-spain-1",
      "date": "2026-11-18",
      "actor": "spain",
      "kind": "policy",
      "mag": 2,
      "title": "Spanish explainer gathers the AI guidance of CRUE, UNED, EHU and UGR",
      "summary": "The Spanish technology site WWWhat's new published on 18 November a guide to using AI at university without cheating. Its headline says that it sets out what CRUE, UNED, the University of the Basque Country and the University of Granada ask of students, with the declaration of AI use at the centre, and why the result of a detector proves nothing. Only the headline was seen in this run. No new document from CRUE was found: its white paper is still expected by the end of the year.",
      "why": "It is a summary in Spanish that could be passed to students, and its two points match the English regulator's report of last week: ask students to declare their use, and do not treat a detector as evidence. Check it against your own university's rules before you share it.",
      "confidence": "headline",
      "verify": "The article itself, and the guidance documents of each university that it cites.",
      "sources": [
        {
          "label": "WWWhat's new, 18 Nov 2026",
          "url": "https://wwwhatsnew.com/2026/11/18/ia-universidad-sin-trampas-guias-crue-declarar-detectores/"
        }
      ],
      "edition": "2026-11-19",
      "baseline": false
    }
  ]
};
