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
  meta: {
    name: "AI Watch",
    owner: "Juan Carlos",
    cadence: "Mondays and Thursdays",
    updated: "2026-11-11",
    next: "2026-11-12",
    disclosure: "Researched and written by Claude, an Anthropic model, running on a schedule. It reports on Anthropic and on its competitors, so treat the magnitude scores as one editor's judgement and follow the links before you rely on anything.",
    scale: [
      { mag: 5, label: "Changes what you or your students can do this week" },
      { mag: 4, label: "Changes how you should plan this term" },
      { mag: 3, label: "Worth knowing and worth sharing" },
      { mag: 2, label: "A note for the record" },
      { mag: 1, label: "Watch item or unconfirmed" }
    ],
    links: { brief: "https://jcordonud.github.io/ai-watch/", hub: "https://jcordonud.github.io/ai-watch/" }
  },

  groups: [
    { id: "us", name: "US labs", range: "Frontier Range", lx: 0.115, ly: 0.58 },
    { id: "cn", name: "Chinese labs", range: "Eastern Range", lx: 0.875, ly: 0.53 },
    { id: "policy", name: "Universities and rules", range: "The Commons", lx: 0.56, ly: 0.975 },
    { id: "voices", name: "Voices", range: "Lookout" },
    { id: "else", name: "Elsewhere", range: "Outliers" }
  ],

  actors: [
    { id: "anthropic", name: "Anthropic", group: "us", x: 0.17, y: 0.33 },
    { id: "openai", name: "OpenAI", group: "us", x: 0.30, y: 0.19 },
    { id: "google", name: "Google", group: "us", x: 0.37, y: 0.41 },
    { id: "deepseek", name: "DeepSeek", group: "cn", x: 0.68, y: 0.22 },
    { id: "moonshot", name: "Moonshot (Kimi)", group: "cn", x: 0.83, y: 0.34 },
    { id: "alibaba", name: "Alibaba (Qwen)", group: "cn", x: 0.70, y: 0.43 },
    { id: "zhipu", name: "Zhipu (GLM)", group: "cn", x: 0.87, y: 0.16 },
    { id: "mit", name: "MIT", group: "policy", x: 0.26, y: 0.75 },
    { id: "universities", name: "Universities", group: "policy", x: 0.45, y: 0.84 },
    { id: "eu", name: "EU AI Act", group: "policy", x: 0.63, y: 0.72 },
    { id: "spain", name: "Spain (CRUE)", group: "policy", x: 0.79, y: 0.80 },
    { id: "mollick", name: "Ethan Mollick", group: "voices", x: 0.52, y: 0.56 },
    { id: "elsewhere", name: "Elsewhere", group: "else", x: 0.50, y: 0.11 }
  ],

  board: [
    { actor: "anthropic", section: "models", state: "Claude Fable 5.2", since: "2026-11-09", open: "Closed", note: "Mythos 5.2 only for verified organisations", item: "261109-anthropic-1", changed: "2026-11-11" },
    { actor: "openai", section: "models", state: "GPT-6 Astra (flagship), GPT-6.1 Sol (workhorse)", since: "2026-09-29", open: "Closed", note: "GPT-6.1 Terra, cheaper and faster, since 26 Oct", item: "260929-openai-1", changed: "2026-11-11" },
    { actor: "google", section: "models", state: "Gemini 4 Carbon", since: "2026-11-10", open: "Closed", note: "Introductory API price ends 30 Nov", item: "261110-google-1", changed: "2026-11-11" },
    { actor: "deepseek", section: "models", state: "DeepSeek V4.1 Flash, V4 Pro", since: "2026-09-10", open: "Open weights, MIT licence", note: "Flash updated 17 Oct; V4.1 Pro named, no date", item: "261017-deepseek-1", changed: "2026-11-11" },
    { actor: "moonshot", section: "models", state: "Kimi K3.1 Pro", since: "2026-10-23", open: "Open weights, own licence", note: "Weights published early November", item: "261102-moonshot-1", changed: "2026-11-11" },
    { actor: "alibaba", section: "models", state: "Qwen3.8-Max", since: "2026-08-03", open: "Partly open, own licence", note: "Qwen 4 announced as coming, no date", item: "261021-alibaba-1", changed: "2026-11-11" },
    { actor: "zhipu", section: "models", state: "GLM-5.3", since: "2026-08-14", open: "Open weights, own licence", note: "GLM-6.0 named as next generation", item: "260814-zhipu-1", changed: "2026-11-11" },

    { actor: "mit", section: "rules", state: "No Institute-wide rule. Every subject is urged to post its own AI policy, chosen from a four-option menu", since: "2026-09-03", note: "Instructors asked to disclose their own AI use", item: "260813-mit-1", changed: "2026-11-11" },
    { actor: "eu", section: "rules", state: "AI that grades, admits or proctors is high-risk. Obligations start 2 Dec 2027", since: "2026-07-27", note: "Literacy and transparency duties already apply", item: "260727-eu-1", changed: "2026-11-11" },
    { actor: "spain", section: "rules", state: "CRUE white paper on AI in preparation", since: "2026-09-28", note: "First phase due by the end of 2026", item: "260928-spain-1", changed: "2026-11-11" },
    { actor: "universities", section: "rules", state: "47% of students say their university gives enough AI guidance (36% in 2024)", since: "2026-11-10", note: "AIinHE.org 2026 survey", item: "261110-universities-1", changed: "2026-11-11" },

    { actor: "mollick", section: "voices", state: "Fable 5.2 and Jagged AGI", since: "2026-11-09", note: "Book Co-Existence out since 20 Oct", item: "261109-mollick-1", changed: "2026-11-11" }
  ],

  dates: [
    { date: "2026-11-19", what: "Gemini 3.6 Flash is retired. Code that calls it stops working", actor: "google", url: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions" },
    { date: "2026-11-30", what: "Last day of introductory API pricing for Gemini 4 Carbon", actor: "google", url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/" },
    { date: "2026-12-31", what: "CRUE white paper on AI: first phase expected by year end", actor: "spain", url: "https://www.infobae.com/espana/agencias/2026/09/28/las-universidades-se-unen-para-crear-el-primer-libro-blanco-sobre-ia-que-pueda-orientarlas/" },
    { date: "2027-12-02", what: "EU AI Act: obligations for high-risk AI in education begin", actor: "eu", url: "https://www.technology.org/2026/10/13/eu-ai-act-deadlines-after-the-digital-omnibus-what-applies-from-december-2026-to-august-2028/" }
  ],

  editions: [
    {
      id: "2026-11-11",
      number: 1,
      label: "Edition 1: baseline and this week",
      headline: "Two new frontier models in two days, and a guidance gap with a number on it",
      lede: "Anthropic shipped Claude Fable 5.2 on Monday and Google opened Gemini 4 Carbon to everyone on Tuesday. In the same week two separate surveys landed on the same figure: fewer than half of students say anyone has shown them how to use AI. This first edition also carries the baseline you need to read the next ones.",
      takeaways: [
        { title: "The frontier moved twice in 48 hours", text: "Fable 5.2 arrived on 9 November and Gemini 4 Carbon on 10 November. Whatever you concluded last month about what AI can do in your subject is out of date." },
        { title: "The guidance gap is now measured", text: "An OpenAI report and the AIinHE survey both put the share of students who have been shown how to use AI at 47%. They measure different populations, so the coincidence is a signal, not a proof." },
        { title: "Open weights are closing in", text: "Kimi K3.1 Pro can now be downloaded, and one index places it close to closed frontier models. That widens the options for work with data that cannot leave the institution." }
      ],
      classroom: [
        "Run one of your own problem sets through a current frontier model before the next assessment cycle. MIT's committee found that AI can now give credible answers to almost any written undergraduate assignment, proofs included.",
        "Post an explicit AI policy, with its reason, on each syllabus. MIT's four-option menu is a ready template.",
        "Try the rule used in MIT's introductory physics course: students cite AI as a collaborator on each problem set and say what it did.",
        "If you use AI for content, grading or feedback, tell your students how and why."
      ]
    }
  ],

  items: [
    {
      id: "261109-anthropic-1", date: "2026-11-09", edition: "2026-11-11", actor: "anthropic", kind: "release", mag: 5, baseline: false,
      title: "Claude Fable 5.2 and Claude Mythos 5.2 released",
      summary: "Anthropic released Claude Fable 5.2 and presents it as its most capable model for hard technical work in coding, finance and the sciences. Mythos 5.2 offers the same capabilities only to organisations verified through Anthropic's programmes. Both have a 1M-token context window and up to 128k output tokens.",
      why: "A new ceiling for long, multi-step work such as full problem sets, code projects and literature synthesis. Any judgement formed before 9 November about what AI can do in your subject needs a retest.",
      confidence: "primary",
      verify: "Anthropic's announcement and the Claude Platform release notes entry for 9 November 2026.",
      sources: [
        { label: "Anthropic announcement", url: "https://www.anthropic.com/claude-fable-and-mythos-5-2" },
        { label: "Claude Platform release notes", url: "https://platform.claude.com/docs/en/release-notes/overview" }
      ]
    },
    {
      id: "261110-anthropic-2", date: "2026-11-10", edition: "2026-11-11", actor: "anthropic", kind: "business", mag: 3, baseline: false,
      title: "Anthropic starts the roadshow for its stock market listing",
      summary: "Anthropic announced the start of the investor roadshow for its proposed initial public offering of Class A common stock. The S-1 registration statement was filed with the US regulator on 26 October.",
      why: "A listed AI lab has to publish audited figures. Expect more public evidence on what frontier AI costs to run, which bears on how long cheap access for education can last.",
      confidence: "primary",
      sources: [
        { label: "Anthropic: roadshow launch", url: "https://www.anthropic.com/news/roadshow-launch" },
        { label: "Anthropic: S-1 filing", url: "https://www.anthropic.com/news/s1-sec" }
      ]
    },
    {
      id: "261110-anthropic-3", date: "2026-11-10", edition: "2026-11-11", actor: "anthropic", kind: "product", mag: 2, baseline: false,
      title: "Claude Whiteboards and Sheets enter beta; Dashboards becomes Claude Data",
      summary: "Trade press reports that Anthropic launched shared whiteboards and spreadsheets inside Claude on paid plans on 10 November, and made its dashboards product generally available under the name Claude Data.",
      why: "Assistants are turning into shared workspaces that a team and the AI edit together. That is how group coursework will increasingly be produced.",
      confidence: "reported",
      verify: "Anthropic release notes at support.claude.com, entry for 10 November 2026.",
      sources: [
        { label: "Unite.AI report", url: "https://www.unite.ai/anthropic-launches-claude-whiteboards-and-sheets-in-beta/" },
        { label: "Claude release notes", url: "https://support.claude.com/en/articles/12138966-release-notes" }
      ]
    },
    {
      id: "261110-openai-1", date: "2026-11-10", edition: "2026-11-11", actor: "openai", kind: "research", mag: 3, baseline: false,
      title: "OpenAI report: 79% of students use AI for coursework, 47% were shown how",
      summary: "OpenAI published lessons from its education partnerships in Europe, the Middle East and Africa, naming Estonia, Slovakia, Greece and Italy. It cites ThinkYoung research in which 79% of surveyed students said they use AI for homework or assignments while 47% said they had been shown how.",
      why: "It is a vendor's report, so read it as advocacy as well as evidence. The useful part is the framing: access is no longer the bottleneck, guidance is. Check the survey sample before quoting it for universities.",
      confidence: "primary",
      verify: "The ThinkYoung study linked from the report: sample size, countries and age range.",
      sources: [
        { label: "OpenAI: Closing the AI guidance gap in education", url: "https://openai.com/index/closing-ai-guidance-gap-education/" }
      ]
    },
    {
      id: "261105-openai-2", date: "2026-11-05", edition: "2026-11-11", actor: "openai", kind: "release", mag: 2, baseline: false,
      title: "GPT-6 Cyber released through a controlled security programme",
      summary: "OpenAI introduced GPT-6 Cyber, a model for cybersecurity work that is available through a controlled access programme, not to all users.",
      why: "All three large US labs now keep their strongest security capability behind a verification gate. Restricted tiers are becoming normal, which matters for research groups that will need to apply for access.",
      confidence: "headline",
      verify: "The OpenAI post dated 5 November 2026.",
      sources: [
        { label: "OpenAI news index", url: "https://openai.com/news/" },
        { label: "AI Newsflash, 2 to 8 November", url: "https://aiforbusinessowners.substack.com/p/ai-newsflash-november-2-to-8-2026" }
      ]
    },
    {
      id: "261104-openai-3", date: "2026-11-04", edition: "2026-11-11", actor: "openai", kind: "product", mag: 2, baseline: false,
      title: "Images 2.6 adds animated GIFs and faster generation",
      summary: "OpenAI's Images 2.6 brings faster image generation, GIF creation, more precise editing and new API controls across ChatGPT, Codex and the API.",
      why: "Animated diagrams from a sentence are now routine. Useful for teaching material, and one more format in which student work can be machine-made.",
      confidence: "primary",
      sources: [
        { label: "OpenAI release index", url: "https://openai.com/research/index/release/" }
      ]
    },
    {
      id: "261104-openai-4", date: "2026-11-04", edition: "2026-11-11", actor: "openai", kind: "business", mag: 1, baseline: false,
      title: "OpenAI to acquire Pierre Computer Company",
      summary: "OpenAI announced an agreement to acquire Pierre Computer Company. A newsletter summary links the deal to OpenAI's coding products.",
      why: "Logged for completeness. No effect on teaching.",
      confidence: "headline",
      sources: [
        { label: "OpenAI news index", url: "https://openai.com/news/" }
      ]
    },
    {
      id: "260929-openai-1", date: "2026-09-29", edition: "2026-11-11", actor: "openai", kind: "release", mag: 4, baseline: true,
      title: "Baseline: GPT-6.1 Sol and Terra are OpenAI's working models",
      summary: "GPT-6.1 Sol launched on 29 September at DevDay. OpenAI says it nearly matches its flagship, GPT-6 Astra, on agentic coding, computer use and professional work at one fifth of Astra's token price. A cheaper and faster GPT-6.1 Terra followed on 26 October. Press reports say a planned GPT-6.1 Astra was held back after safety concerns in internal testing.",
      why: "This is the OpenAI model most students on a paid or Edu plan are using this term. Near-flagship quality at a fifth of the price is the trend to plan around.",
      confidence: "reported",
      sources: [
        { label: "TechCrunch, 29 Sep 2026", url: "https://techcrunch.com/2026/09/29/openai-launches-gpt-6-1-sol-says-it-nearly-matches-gpt-6-astra-and-costs-less/" },
        { label: "Wikipedia: GPT-6.1", url: "https://en.wikipedia.org/wiki/GPT-6.1" }
      ]
    },
    {
      id: "261110-google-1", date: "2026-11-10", edition: "2026-11-11", actor: "google", kind: "release", mag: 5, baseline: false,
      title: "Gemini 4 Carbon is available to everyone",
      summary: "Google opened its strongest model, Gemini 4 Carbon, to developers, enterprises, scientists and consumers. The API costs 2 dollars per million input tokens and 10 per million output tokens during an introductory period that reports say ends on 30 November, after which the price doubles. Google AI Ultra subscribers get it in the Gemini app, AI Mode in Search and Antigravity. Scientists and researchers can apply for six months of free access to Argon and Carbon.",
      why: "Two points for a university. The free programme for researchers is worth an application. And Google aims Carbon at long engineering and scientific tasks, the same ground as Fable 5.2, so there are again three labs at the front.",
      confidence: "primary",
      verify: "Price after 30 November: the Gemini API pricing page.",
      sources: [
        { label: "Google: Gemini 4 Carbon is now available", url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/" },
        { label: "Google Antigravity blog", url: "https://antigravity.google/blog/gemini-4-carbon-in-google-antigravity/" },
        { label: "AI Weekly summary", url: "https://aiweekly.co/alerts/google-launches-gemini-4-carbon-with-cyber-coding-claims" }
      ]
    },
    {
      id: "261105-google-2", date: "2026-11-05", edition: "2026-11-11", actor: "google", kind: "release", mag: 1, baseline: false,
      title: "Gemini Omni 1.2 Flash released; Gemini 3.6 Flash retires on 19 November",
      summary: "Google's model lifecycle page lists Gemini Omni 1.2 Flash as released on 5 November and sets 19 November as the retirement date for Gemini 3.6 Flash, with Gemini 3.8 Flash as its replacement.",
      why: "It only matters if you or your students have code that calls the old model: it will stop working on 19 November.",
      confidence: "primary",
      sources: [
        { label: "Google Cloud: model versions and lifecycle", url: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions" }
      ]
    },
    {
      id: "261102-moonshot-1", date: "2026-11-02", edition: "2026-11-11", actor: "moonshot", kind: "release", mag: 4, baseline: false,
      title: "Kimi K3.1 Pro: open weights close to the closed frontier",
      summary: "Moonshot AI released Kimi K3.1 Pro on 23 October and published the full weights on Hugging Face in early November under its own licence. Sources differ on the exact day, between 2 and 6 November. It has a 1M-token context. One comparison site reports that Artificial Analysis scored it above Gemini 4 Argon and GPT-6.1 Sol and one point behind Claude Sonnet 5.5.",
      why: "A downloadable model near frontier quality changes the options for work with data that cannot leave the institution. Two cautions: the licence is custom, so read it before any institutional use, and the model has trillions of parameters, so running it needs serious hardware.",
      confidence: "reported",
      verify: "Model card and licence at huggingface.co/moonshotai; score at artificialanalysis.ai.",
      sources: [
        { label: "GEO Toolbox: Chinese AI models compared", url: "https://geotoolbox.ai/blog/chinese-ai-models-compared" },
        { label: "Morph: best open source LLMs", url: "https://www.morphllm.com/best-open-source-llm" }
      ]
    },
    {
      id: "261017-deepseek-1", date: "2026-10-17", edition: "2026-11-11", actor: "deepseek", kind: "release", mag: 3, baseline: true,
      title: "Baseline: DeepSeek V4.1 Flash is the low-cost default",
      summary: "DeepSeek released V4.1 Flash on 10 September with open weights under the MIT licence and updated it on 17 October. Listed API prices are about 0.15 dollars per million input tokens off-peak. DeepSeek has named a V4.1 Pro without giving a date.",
      why: "The cheapest capable model sets the floor for what any student can reach for free or nearly free. Assume every student has this level of help available.",
      confidence: "reported",
      verify: "DeepSeek API change log at api-docs.deepseek.com/updates.",
      sources: [
        { label: "Toloka: Chinese AI models explained", url: "https://toloka.ai/blog/deepseek-and-chinese-ai-models-explained/" },
        { label: "CellCog: V4.1 Flash release record", url: "https://cellcog.ai/blog/deepseek-v4-1-flash-release-date/" }
      ]
    },
    {
      id: "261021-alibaba-1", date: "2026-10-21", edition: "2026-11-11", actor: "alibaba", kind: "watch", mag: 1, baseline: true,
      title: "Watch: Qwen 4 is still unreleased",
      summary: "Alibaba has said Qwen 4 is in training and coming very soon. As of late October there was no release date. Qwen3.8-Max, released on 3 August, remains its top model.",
      why: "Probably the next large open-weight release from China. Nothing to do until it ships.",
      confidence: "reported",
      sources: [
        { label: "Yotta Labs: Chinese LLMs compared", url: "https://www.yottalabs.ai/post/best-chinese-llm-models-2026-deepseek-qwen-glm-kimi-compared" },
        { label: "Wikipedia: Qwen", url: "https://en.wikipedia.org/wiki/Qwen" }
      ]
    },
    {
      id: "260814-zhipu-1", date: "2026-08-14", edition: "2026-11-11", actor: "zhipu", kind: "release", mag: 2, baseline: true,
      title: "Baseline: GLM-5.3 from Zhipu",
      summary: "Zhipu, which trades internationally as Z.ai, released GLM-5.3 on 14 August with open weights. In September the US institute CAISI reportedly rated it the most advanced open-weight model in cybersecurity.",
      why: "It completes the set of four Chinese model families to know: DeepSeek, Qwen, Kimi and GLM.",
      confidence: "reported",
      sources: [
        { label: "Wikipedia: Z.ai", url: "https://en.wikipedia.org/wiki/Z.ai" }
      ]
    },
    {
      id: "260813-mit-1", date: "2026-08-13", edition: "2026-11-11", actor: "mit", kind: "policy", mag: 4, baseline: true,
      title: "Baseline: MIT's AI committee report and its four-option policy menu",
      summary: "MIT's Ad Hoc Committee on AI Use in Teaching, Learning, and Research Training published its final report on 13 August. It sets no single Institute-wide rule. It recommends that every subject post a clear AI policy with a rationale, offers a menu of four standard policies for instructors to choose from, and asks instructors to be open about their own AI use in content, grading or feedback. The guidance for the autumn term, dated 3 September, confirms there is no Institute-wide requirement.",
      why: "The most useful single document for a faculty that is discussing AI rules. The menu avoids both a blanket ban and a blanket permission, and it adapts easily to a syllabus.",
      confidence: "primary",
      verify: "The full report (PDF) and the MIT Faculty Governance guidance page.",
      sources: [
        { label: "MIT Faculty Governance: teaching guidance, Fall 2026", url: "https://facultygovernance.mit.edu/teaching-guidance-fall-2026-semester-september-3-2026" },
        { label: "Committee final report (PDF)", url: "https://bpb-us-e1.wpmucdn.com/sites.mit.edu/dist/d/2418/files/2026/09/AI-Committee-Final-Report-Aug-13.pdf" },
        { label: "Inside Higher Ed, 28 Aug 2026", url: "https://www.insidehighered.com/news/tech-innovation/artificial-intelligence/2026/08/28/mit-ai-report-calls-alternative-grading" }
      ]
    },
    {
      id: "261008-mit-2", date: "2026-10-08", edition: "2026-11-11", actor: "mit", kind: "policy", mag: 3, baseline: true,
      title: "How MIT instructors are applying the report, course by course",
      summary: "The Tech, MIT's student newspaper, surveyed instructors after the report. Its examples include a differential equations course with a fairly liberal policy and an introductory physics course that requires students to cite any AI use as a collaborator, with a short description, on each problem set.",
      why: "Concrete wording from maths and physics courses that can be borrowed. The cite-AI-as-collaborator rule is cheap to adopt and makes use visible without policing it.",
      confidence: "reported",
      sources: [
        { label: "The Tech, 8 Oct 2026", url: "https://thetech.com/2026/10/08/faculty-ad-hoc-ai" }
      ]
    },
    {
      id: "261110-universities-1", date: "2026-11-10", edition: "2026-11-11", actor: "universities", kind: "research", mag: 3, baseline: false,
      title: "Survey: guidance is improving, but most students still lack it",
      summary: "New findings from the AIinHE.org project show that most university students now use AI, and that many limit their use. Among those who use it, 67% gave worries about accuracy as a reason for holding back. The share who say their university gives them sufficient guidance rose from 36% in 2024 to 47% in 2026.",
      why: "Students are more sceptical than the usual story suggests, and they want direction. A clear course policy answers a demand that already exists.",
      confidence: "reported",
      verify: "The AIinHE.org 2026 report itself, for sample and method.",
      sources: [
        { label: "Phys.org, 10 Nov 2026", url: "https://phys.org/news/2026-11-university-students-ai-doesnt.html" }
      ]
    },
    {
      id: "261109-universities-2", date: "2026-11-09", edition: "2026-11-11", actor: "universities", kind: "research", mag: 3, baseline: false,
      title: "Analysis: university AI policies are often vague or buried",
      summary: "An article in The Conversation reviews recent evidence. In a UNESCO survey across 90 countries, fewer than one in five universities had a formal AI policy a year ago. A study of 39 Australian universities found wide variation, rules often placed in misconduct policies and not in assessment design, and only seven with a documented coordinating body. It also notes that universities are moving away from AI detectors because they are not reliable.",
      why: "A checklist of what to avoid: vague principles, reliance on detectors, and rules filed under misconduct when they belong in assessment design.",
      confidence: "reported",
      sources: [
        { label: "The Conversation, 9 Nov 2026", url: "https://theconversation.com/ai-use-is-now-universal-in-higher-education-why-are-universities-failing-to-adapt-294137" }
      ]
    },
    {
      id: "261109-universities-3", date: "2026-11-09", edition: "2026-11-11", actor: "universities", kind: "policy", mag: 2, baseline: false,
      title: "Mexico: 14 of 22 universities have an AI policy, 3 passed it through a governing body",
      summary: "The first Campus index of university governance in Mexico assessed 22 institutions. Fourteen have an AI policy, but only three had it approved by a collegiate body. Fifteen have updated their academic integrity rules to cover AI.",
      why: "The same pattern as elsewhere: practice runs ahead of formal governance. Having a policy and having it approved are different things.",
      confidence: "reported",
      sources: [
        { label: "Suplemento Campus, Nov 2026", url: "https://suplementocampus.com/resultados-icgu-2026-gobernanza-inteligencia-artificial-universidades/" }
      ]
    },
    {
      id: "261103-universities-4", date: "2026-11-03", edition: "2026-11-11", actor: "universities", kind: "policy", mag: 2, baseline: false,
      title: "US universities are writing AI fundamentals into required curricula",
      summary: "A digest of recent coverage notes that Ohio State has an institution-wide strategy for every student to learn to use AI within their discipline, that Purdue has added AI competence to its core learning outcomes, and that Agnes Scott College has put AI literacy into compulsory first-year teaching.",
      why: "The question is moving from whether to allow AI in a course to what every graduate must know about it.",
      confidence: "reported",
      verify: "The original article that the digest summarises, and each university's own announcement.",
      sources: [
        { label: "Universo Abierto, 3 Nov 2026", url: "https://universoabierto.org/2026/11/03/las-universidades-incorporan-los-fundamentos-de-la-inteligencia-artificial-a-sus-planes-de-estudios-obligatorios/" }
      ]
    },
    {
      id: "260727-eu-1", date: "2026-07-27", edition: "2026-11-11", actor: "eu", kind: "policy", mag: 4, baseline: true,
      title: "Baseline: EU AI Act rules for high-risk AI in education now start on 2 December 2027",
      summary: "The Digital Omnibus on AI, Regulation (EU) 2026/1744, has been in force since 27 July 2026. It moves the obligations for stand-alone high-risk systems, which include AI used to evaluate learning outcomes, screen applicants or monitor exams, from 2 August 2026 to 2 December 2027. Prohibited practices, AI literacy, general-purpose model rules and the Article 50 transparency duties were not postponed.",
      why: "If your university uses or buys AI that grades, admits or proctors, the compliance clock now runs to December 2027. The delay is time to prepare, not an exemption.",
      confidence: "reported",
      verify: "Regulation (EU) 2026/1744 on EUR-Lex and the European Commission's AI Act timeline.",
      sources: [
        { label: "Technology.org, 13 Oct 2026", url: "https://www.technology.org/2026/10/13/eu-ai-act-deadlines-after-the-digital-omnibus-what-applies-from-december-2026-to-august-2028/" },
        { label: "UNIwise: the AI Act and assessment", url: "https://uniwise.eu/resources/blog/the-eu-ai-act-and-assessment-december-2027-is-not-a-snooze-button" }
      ]
    },
    {
      id: "260928-spain-1", date: "2026-09-28", edition: "2026-11-11", actor: "spain", kind: "policy", mag: 3, baseline: true,
      title: "Baseline: CRUE is drafting a white paper on AI for Spanish universities",
      summary: "The Spanish rectors' conference, CRUE, is preparing a white paper on AI in the university. According to the EFE agency, the first phase is due by the end of the year as a guidance document that will be kept up to date, and it starts from an inventory of the tools universities use. A separate CYD Foundation report says 64% of Spanish universities name assessment as their most urgent teaching priority and 80% see a need to change curricula.",
      why: "This will be the reference document for Spanish universities, and its first phase is weeks away. Positions a faculty prepares now can feed into the local response.",
      confidence: "reported",
      verify: "CRUE's own announcement and the CYD report.",
      sources: [
        { label: "EFE via Infobae, 28 Sep 2026", url: "https://www.infobae.com/espana/agencias/2026/09/28/las-universidades-se-unen-para-crear-el-primer-libro-blanco-sobre-ia-que-pueda-orientarlas/" }
      ]
    },
    {
      id: "261109-mollick-1", date: "2026-11-09", edition: "2026-11-11", actor: "mollick", kind: "essay", mag: 4, baseline: false,
      title: "Mollick on Fable 5.2: 'jagged AGI'",
      summary: "Ethan Mollick tested Fable 5.2 on a set of one-shot projects, among them a research paper, a rebuilt literature course, a business plan and programming a small keyboard into a games console. His verdict: it works like a capable expert across most computer-based tasks, but unevenly. Output was often correct yet bloated or dull, including a 182-page paper, and the model could not tell when its own work was not good enough.",
      why: "The clearest statement this week of what stays human: setting direction, judging quality and editing. That is also a fair description of what assessment should now test.",
      confidence: "primary",
      sources: [
        { label: "One Useful Thing, 9 Nov 2026", url: "https://www.oneusefulthing.org/p/fable-52-and-jagged-agi" }
      ]
    },
    {
      id: "261020-mollick-2", date: "2026-10-20", edition: "2026-11-11", actor: "mollick", kind: "essay", mag: 2, baseline: true,
      title: "Baseline: Mollick's book Co-Existence and '30 Months on the Exponential'",
      summary: "Mollick's new book, Co-Existence, came out on 20 October, together with a post that charts what has changed in the 30 months since his previous book.",
      why: "A quick way to catch up on the whole period in charts.",
      confidence: "primary",
      sources: [
        { label: "One Useful Thing: archive", url: "https://www.oneusefulthing.org/archive" }
      ]
    },
    {
      id: "261110-elsewhere-1", date: "2026-11-10", edition: "2026-11-11", actor: "elsewhere", kind: "release", mag: 2, baseline: false,
      title: "Meta's Muse Ember 1.0 appears on release trackers",
      summary: "A model release tracker lists Muse Ember 1.0 from Meta with a release date of 10 November.",
      why: "Outside the core watchlist. Logged so that it is not missed; not yet checked against a Meta announcement.",
      confidence: "headline",
      verify: "Meta's AI blog.",
      sources: [
        { label: "LLM Gateway release timeline", url: "https://llmgateway.io/timeline" }
      ]
    }
  ]
};
