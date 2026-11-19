# Developer Tool Pain Points: Recurring Unsolved Problems a Solo Builder Could Sell Into (Nov 2026)

> **Method and limitations (read first).** I researched this on 2026-11-19. Direct page fetches of news.ycombinator.com, reddit and vendor sites (for example yaak.app) were **blocked by the session's network policy**, and the shared web-search budget ran out partway through. So:
> (a) HN and Reddit evidence comes from search-result snippets and secondary write-ups, **without vote or comment counts**.
> (b) The hardest demand numbers come from the **GitHub REST search API**. Every "N 👍 / Nc" figure below is the issue's thumbs-up count and comment count, retrieved 2026-11-19. Star counts come from GitHub repo search on the same date.
> (c) Several pricing figures come from third-party blogs, and I flag those where sources conflict.
> Topics I could not research before the budget ran out: logging and observability cost, feature-flag pricing (LaunchDarkly and others), flaky-test tooling prices, and the revenue or pricing of TablePlus, Tower, Kaleidoscope, Dash and Raycast. See the Gaps sections.

## Key Question 1: What do "Ask HN: What tool do you wish existed?", "What are you paying for?" and "most annoying dev problem" threads from 2025-2026 reveal?

### Takeaway
The 2025-2026 HN wish threads exist but their snippets are diffuse: CI test selection, code-reading aids, personal planners. The clearest *revealed* wish list is GitHub's most-reacted issues of 2026, and it is dominated by AI coding agents: usage limits, multi-account switching, cross-agent config (AGENTS.md), Linux desktop builds, and destructive-action safety. Supply-chain compromises (axios, litellm) are the other big cluster. On "what are you paying for", developers name $20/mo AI coding subscriptions, JetBrains IDEs, and hosting (Cloudflare, Hetzner, DigitalOcean).

### Cited Findings
**HN threads found (2025-2026). Vote and comment counts were unavailable because HN was blocked.**
- "Ask HN: What developer tool do you wish existed in 2026?" Snippet wishes included: an LLM in CI that reviews a change and proposes which test suites should block the merge (rather than selecting tests by file path); a hex editor with fuzzy, field-level header search (ImHex may partly do this); a lightweight "peek definition" tool for following jumps through kernel source; and a "Jarvis"-like work planner — [HN 46345827](https://news.ycombinator.com/item?id=46345827)
- Other wish threads: "Ask HN: What do you still do manually in 2026 that should be automated?" — [HN 48045237](https://news.ycombinator.com/item?id=48045237); "Ask HN: What is some software that you wish existed?" — [HN 49259602](https://news.ycombinator.com/item?id=49259602); "Ask HN: What do you wish existed? (October 2025)" — [HN 45500937](https://news.ycombinator.com/item?id=45500937); "Ask HN: What dev tools do you rely on that nobody talks about?" — [HN 47602040](https://news.ycombinator.com/item?id=47602040); "Ask HN: Do people actually pay for small web tools?" (2025) — [HN 44019193](https://news.ycombinator.com/item?id=44019193)
- What developers say they pay for, from 2025-2026 HN comments as summarized by search:
  - $20 AI subscriptions, e.g. "All on the $20 subscription. Then use Conductor for worktrees w/ Claude/Codex…", and a switch to Claude Code at the end of 2025 — [HN 48413629](https://news.ycombinator.com/item?id=48413629)
  - JetBrains IDEs ("I pay for IntelliJ IDEA despite there's free community version") and ReSharper — [HN 37529880](https://news.ycombinator.com/item?id=37529880) (**flag: 2023 thread**)
  - Cloudflare DNS/R2/Workers, DigitalOcean, Hetzner and similar hosting
- Side-project revenue threads: "Ask HN: Those making $500/month on side projects in 2025" (8th annual edition) — [HN 46307973](https://news.ycombinator.com/item?id=46307973); a 2026 edition also exists — [HN 49417766](https://news.ycombinator.com/item?id=49417766). The 2025 snippets showed few developer tools clearly above $500/mo. Earlier years included an ngrok-like tunneling tool and a mock-API tool making $500-1,000/mo from donations — [HN 42373343 (2024)](https://news.ycombinator.com/item?id=42373343)

**GitHub's most-reacted issues created in 2026 (a revealed wish list):**
- "Please Do Not Vibe Fuck Up This Software", rsync: **2,172 👍 / 347c**, 2026-05-30 — [rsync #929](https://github.com/RsyncProject/rsync/issues/929)
- "Claude Code is unusable for complex engineering tasks with the Feb updates": **2,072 👍 / 583c** — [claude-code #42796](https://github.com/anthropics/claude-code/issues/42796)
- "No right to relicense this project", chardet: 1,464 👍 / 245c, 2026-03 (an AI-rewrite and relicensing dispute) — [chardet #327](https://github.com/chardet/chardet/issues/327)
- Multi-account switching in the Claude Desktop app: **1,069 👍 / 247c** — [claude-code #18435](https://github.com/anthropics/claude-code/issues/18435). The same ask for the mobile app: 779 👍 — [#36151](https://github.com/anthropics/claude-code/issues/36151). Multiple accounts for the same connector: 483 👍 / 319c — [#27302](https://github.com/anthropics/claude-code/issues/27302)
- "Codex desktop app for Linux": 953 👍 — [codex #11023](https://github.com/openai/codex/issues/11023). Official Claude Desktop for Linux: 498 👍 — [claude-code #65697](https://github.com/anthropics/claude-code/issues/65697)
- Usage limits:
  - "Instantly hitting usage limits with Max subscription": 697 👍 / **1,499c** — [claude-code #16157](https://github.com/anthropics/claude-code/issues/16157)
  - "Max plan session limits exhausted abnormally fast since March 23, 2026": 476 👍 / 879c — [#38335](https://github.com/anthropics/claude-code/issues/38335)
  - Codex "rate-limit cost per token jumped ~10-20x since June 16": 364 👍 — [codex #28879](https://github.com/openai/codex/issues/28879)
- Supply-chain incidents:
  - "CRITICAL: Malicious litellm_init.pth in litellm 1.82.8 — credential stealer": 798 👍 / 487c, 2026-03-24 — [litellm #24512](https://github.com/BerriAI/litellm/issues/24512)
  - "axios@1.14.1 and axios@0.30.4 are compromised": 701 👍 / 317c, 2026-03-31 — [axios #10604](https://github.com/axios/axios/issues/10604), plus the post-mortem: 594 👍 — [axios #10636](https://github.com/axios/axios/issues/10636)
- Agent safety: "Told to reboot a server, it destroyed systemd, destroyed containers, ran random scripts, cost me $10,000+": 548 👍 / 440c, 2026-11-03 — [codex #59060](https://github.com/openai/codex/issues/59060)
- Agent config fragmentation: "Feature Request: Support AGENTS.md": **5,194 👍 / 409c** (created Aug 2025) — [claude-code #6235](https://github.com/anthropics/claude-code/issues/6235). Follow-up "Support for AGENTS.md and .agents/skills/, the community has been asking since August 2025": 484 👍 — [#31005](https://github.com/anthropics/claude-code/issues/31005)
- Resource waste: "Codex SQLite feedback logs can write ~640 TB/year and rapidly consume SSD endurance": 451 👍 — [codex #28224](https://github.com/openai/codex/issues/28224)
- Visibility: "VSCode Extension: Display context usage percentage in UI": 150 👍 — [claude-code #18456](https://github.com/anthropics/claude-code/issues/18456)

### Inferences
- In 2026 the developer "wish list" has moved from classic dev tooling toward **managing AI coding agents**: their cost and limits, their accounts, their config, their safety, and their side effects. These are new problems, with vendors moving fast but incompletely, so small third-party tools can fill gaps. The platform risk is high, though: vendors can close a gap with one release.
- Many of the highest-reacted 2026 asks are things vendors may ship natively (Linux builds, AGENTS.md, account switching). A solo builder should favor **cross-vendor** problems that no single vendor is incentivized to solve. Examples: one safety layer or usage view spanning Claude Code, Codex, Cursor and OpenCode.

### Gaps
- Upvote and comment counts for the HN threads, and full top-comment lists, are unavailable because news.ycombinator.com and the HN Algolia API were blocked in this session.
- I could not search Reddit (r/webdev, r/ExperiencedDevs, r/selfhosted) wish threads directly. Only secondary mentions appear below.
- I found no reliable 2025-2026 "what dev tools are you paying for" thread with per-tool counts.

## Key Question 2: Which popular open-source projects have long-standing, highly upvoted feature requests that maintainers haven't built (an opening for a paid add-on or alternative)?

### Takeaway
Several very popular self-hosting and CI projects have had 300-1,500 👍 requests open for 3-6 years: Uptime Kuma's API, remote probes and user management; GitHub Actions' allow-failure, early-exit and multi-choice inputs; uv's task runner and upgrade command; Nginx Proxy Manager's backups and Fail2Ban; Dependabot's manual trigger and config validation. For a solo builder, the most actionable are gaps that a **companion tool** can fill without forking: monitors-as-code and remote probes for Uptime Kuma, backup UIs for self-hosted PaaS, and workflow helpers for GitHub Actions.

### Cited Findings
**Uptime Kuma (94,613★):**
- "API functionality": **711 👍 / 84c**, open since 2021-07 — [uptime-kuma #118](https://github.com/louislam/uptime-kuma/issues/118)
- "Remote Executors" (probes from other locations): **415 👍** — [#84](https://github.com/louislam/uptime-kuma/issues/84)
- "Allow basic User management": 346 👍 — [#128](https://github.com/louislam/uptime-kuma/issues/128)
- Configurable heartbeat range (7 to 365 days): 303 👍 / 96c — [#1888](https://github.com/louislam/uptime-kuma/issues/1888)
- Postgres support: 186 👍 — [#959](https://github.com/louislam/uptime-kuma/issues/959)
- OpenID/SAML: 183 👍 — [#553](https://github.com/louislam/uptime-kuma/issues/553)
- Show upcoming maintenance on status pages: 107 👍 — [#2389](https://github.com/louislam/uptime-kuma/issues/2389)
- "Configure monitors using config file": 91 👍 — [#1354](https://github.com/louislam/uptime-kuma/issues/1354)
- Star count from GitHub search: [louislam/uptime-kuma](https://github.com/louislam/uptime-kuma)

**GitHub Actions runner:**
- "Please support something like 'allow-failure' for a given job": **1,468 👍 / 188c**, open since 2020 — [actions/runner #2347](https://github.com/actions/runner/issues/2347)
- "Support 'multi-choice' input type for manual workflows": 1,096 👍 / 378c — [#2076](https://github.com/actions/runner/issues/2076)
- "Command to early-exit the job and set check conclusion": 930 👍 — [#662](https://github.com/actions/runner/issues/662)
- Pre and post steps in composite actions: 387 👍 — [#1478](https://github.com/actions/runner/issues/1478)
- Signed commits by actions@github.com: 350 👍 — [#667](https://github.com/actions/runner/issues/667)
- Runner prioritization: 229 👍 — [#1665](https://github.com/actions/runner/issues/1665)
- Scheduled cron not triggering on a self-hosted runner (2026-01): 20 👍 / 28c — [#4210](https://github.com/actions/runner/issues/4210)

**Dependabot:**
- PNPM v11 support: **360 👍**, 2026-04 — [dependabot-core #14794](https://github.com/dependabot/dependabot-core/issues/14794)
- mise support: 247 👍, 2025-05 — [#12320](https://github.com/dependabot/dependabot-core/issues/12320)
- "Manually trigger an update for a specific dependency": 203 👍 — [#2980](https://github.com/dependabot/dependabot-core/issues/2980)
- "Validate Dependabot config before it lands on main": 143 👍 — [#4605](https://github.com/dependabot/dependabot-core/issues/4605)
- Multiple schedules per ecosystem: 142 👍 — [#1778](https://github.com/dependabot/dependabot-core/issues/1778)
- apt/apk packages in Dockerfiles: 118 👍 — [#2129](https://github.com/dependabot/dependabot-core/issues/2129)

**uv (Astral):**
- `uv run` as a task runner: **721 👍 / 258c** — [uv #5903](https://github.com/astral-sh/uv/issues/5903)
- `uv upgrade`: 537 👍 — [#6794](https://github.com/astral-sh/uv/issues/6794)
- `upgrade --all`: 538 👍 — [#1419](https://github.com/astral-sh/uv/issues/1419)
- `uv shell`: 419 👍 — [#1910](https://github.com/astral-sh/uv/issues/1910)
- `uv bundle` (PyInstaller-style single executable): 291 👍 — [#5802](https://github.com/astral-sh/uv/issues/5802)

**VS Code** (mostly UI asks a third party can't fill, except via extensions):
- Workbench font/size: **3,803 👍**, open since 2015 — [vscode #519](https://github.com/microsoft/vscode/issues/519)
- Mouse shortcuts: 1,937 👍 — [#3130](https://github.com/microsoft/vscode/issues/3130)
- Project-wide JS/TS errors, not just open files: 1,511 👍 — [#13953](https://github.com/microsoft/vscode/issues/13953)
- Settings-file inheritance: 1,373 👍 — [#15909](https://github.com/microsoft/vscode/issues/15909)
- "Weekly updates are too frequent": 198 👍, 2026-04 — [#309223](https://github.com/microsoft/vscode/issues/309223)
- BYOK/custom models for inline completions: 225 👍, 2026-05 — [#318545](https://github.com/microsoft/vscode/issues/318545)

**Sentry:**
- "Add ability to ignore in specific environment": 280 👍, open since 2019 — [sentry #12341](https://github.com/getsentry/sentry/issues/12341)
- Google Chat notifications: 175 👍 — [#49542](https://github.com/getsentry/sentry/issues/49542)
- Manually add tags: 100 👍 — [#5572](https://github.com/getsentry/sentry/issues/5572)
- Gitea/Gogs plugin: 59 👍 — [#15738](https://github.com/getsentry/sentry/issues/15738)
- Per-DSN transaction rate limit: 45 👍 — [#62608](https://github.com/getsentry/sentry/issues/62608)
- Heroku log drain: 43 👍 — [#91727](https://github.com/getsentry/sentry/issues/91727)

**Nginx Proxy Manager:**
- Proxy mail server: 150 👍 — [NPM #1110](https://github.com/NginxProxyManager/nginx-proxy-manager/issues/1110)
- Dark mode: 136 👍 — [#707](https://github.com/NginxProxyManager/nginx-proxy-manager/issues/707)
- "Backup from WebGui": **127 👍**, open since 2019 — [#168](https://github.com/NginxProxyManager/nginx-proxy-manager/issues/168)
- Fail2Ban: 108 👍 — [#39](https://github.com/NginxProxyManager/nginx-proxy-manager/issues/39)
- LDAP: 73 👍 — [#159](https://github.com/NginxProxyManager/nginx-proxy-manager/issues/159)
- Load balancing: 70 👍 — [#156](https://github.com/NginxProxyManager/nginx-proxy-manager/issues/156)

**Self-hosted PaaS (Coolify 66,228★, Dokploy 38,603★):**
- Coolify "Backup Manager in the UI": 24 👍 / 60c — [coolify #2389](https://github.com/coollabsio/coolify/issues/2389)
- Coolify "Integrated backups for Git based Docker Composes": 47c, 2025-12 — [#7528](https://github.com/coollabsio/coolify/issues/7528)
- Coolify "Do not share all environment variables across all containers": 24c, 2025-12 — [#7655](https://github.com/coollabsio/coolify/issues/7655)
- Dokploy caddy support: 71 👍 — [dokploy #1246](https://github.com/Dokploy/dokploy/issues/1246)
- Dokploy preview deployments for Compose: 53 👍 — [#2028](https://github.com/Dokploy/dokploy/issues/2028)
- Dokploy pre/post deploy commands: 43 👍 — [#110](https://github.com/Dokploy/dokploy/issues/110)
- Star counts: [coollabsio/coolify](https://github.com/coollabsio/coolify), [Dokploy/dokploy](https://github.com/Dokploy/dokploy)

**Portainer and Docker 29 breakage:**
- "Failed Loading Environment": **304 👍 / 439c**, 2025-11 — [portainer #12925](https://github.com/portainer/portainer/issues/12925)
- "Portainer and Docker 29": 41 👍 — [#12934](https://github.com/portainer/portainer/issues/12934)
- Monitoring and alerting: 33 👍, open since 2017 — [#943](https://github.com/portainer/portainer/issues/943)

**Others:**
- Umami "External auth/OIDC": 154 👍 — [umami #3163](https://github.com/umami-software/umami/issues/3163)
- Umami aggregated multi-site dashboard: 12 👍 — [#3362](https://github.com/umami-software/umami/issues/3362)
- Bruno plugins/extensions: 49 👍 — [bruno #1529](https://github.com/usebruno/bruno/issues/1529)
- Bruno vim mode: 42 👍 — [#2373](https://github.com/usebruno/bruno/issues/2373)
- Bruno Socket.IO: 37 👍 — [#5887](https://github.com/usebruno/bruno/issues/5887)
- Bruno HAR import: 29 👍 — [#1636](https://github.com/usebruno/bruno/issues/1636)
- Bruno MCP: 27 👍 — [#4806](https://github.com/usebruno/bruno/issues/4806)
- Playwright "Built-in Method to Mask Sensitive Input in Test Reports": 17 👍, 2026-01 — [playwright #38673](https://github.com/microsoft/playwright/issues/38673)
- Next.js "RSC and CDN interaction makes next.js inefficient for highload projects": 116 👍 — [next.js #65335](https://github.com/vercel/next.js/issues/65335)

### Inferences
- **Uptime Kuma** is the strongest "companion product" target. It has a huge install base (94.6k★) and core asks that have been open for 5+ years: API, remote probes, config-as-code. A paid hosted multi-region probe network that reports into a user's self-hosted Kuma, or a GitOps monitors-as-code CLI, sells to an audience that has already shown it cares.
- **Backups for self-hosted stacks** (Coolify, Dokploy, NPM, plain Docker Compose) recur across projects. That matters because 2025-2026 has seen developers moving from Vercel to VPS + Coolify/Dokploy (see KQ3).
- The GitHub Actions gaps (allow-failure, early-exit, multi-choice inputs) can't be fixed by a third party inside GitHub's runner. They can be partly worked around with reusable actions, a workflow linter or preprocessor, or local runners. That is a thinner product and depends on GitHub's platform.
- Several of these, like uv's upgrade and VS Code UI items, belong in core and are likely to ship eventually, so they are poor bets.

### Gaps
- I couldn't check maintainers' stated reasons for declining (for example, whether Uptime Kuma has "won't do" positions or a roadmap) because issue bodies and pages couldn't be fetched. Only metadata was retrieved via the API.
- I couldn't retrieve top-voted renovatebot, Plausible or PostHog requests because API access to some repos was restricted.

## Key Question 3: What do developers complain about with expensive or degraded SaaS dev tools, and where do they ask for cheaper, self-hosted or offline alternatives?

### Takeaway
2025-2026 brought several "trigger events" that pushed developers to look for alternatives:
- Postman limited its Free plan to **one user** on 2026-03-01 and made existing free teams read-only.
- SendGrid retired its free plan (May 2025).
- UptimeRobot forced legacy $8/mo users onto $19-34/mo plans (2025).
- GitHub announced a $0.002/min fee for **self-hosted** runners (Dec 2025), then postponed it after backlash.
- Docker Desktop and OrbStack charge per seat for commercial use.
Open-source and self-hosted alternatives (Bruno, Yaak, Uptime Kuma, Bugsink, GlitchTip, Coolify, Dokploy, useSend) collect the migrating users.

### Cited Findings
**Postman:**
- Since 2026-03-01 the Free plan is limited to one user and "can't create a team". Postman's docs are quoted: "Previously, Free plans could create a team and invite up to three users… With the new plans, the Free plan is limited to one user." Existing free teams went read-only except for one admin — [Apidog: Postman pricing 2026](https://apidog.com/blog/postman-free-vs-paid-comparison/); [DEV: "Postman Ends Free Team Plans in March 2026"](https://dev.to/auden/postman-ends-free-team-plans-in-march-2026-here-is-the-free-alternative-i-switched-to-118p); [agentdeals: Postman free tier 2026](https://agentdeals.dev/vendor/postman)
- New tiers: Solo $9/mo (annual, 1 user), Team $19/user/mo annual ($23 monthly), Enterprise ~$49/user/mo. Sources conflict on Free collection-run limits ("unlimited" vs "25/month") — [Apidog](https://apidog.com/blog/postman-free-vs-paid-comparison/); [Apidog old vs new pricing](https://apidog.com/blog/postman-old-pricing-vs-new-pricing/)
- Postman workspaces live in Postman's cloud and need an account; collections and environments require sign-in — [Apidog: offline Postman alternatives](https://apidog.com/blog/offline-postman-alternatives/); [Scalar: Postman alternatives](https://scalar.com/alternatives/postman)
- Bruno (offline, plain-text files, no account, "no cloud sync planned") and Yaak (offline, no account) are the most-recommended replacements — [tech-insider: Postman alternatives 2026](https://tech-insider.org/postman-alternatives-bruno-insomnia-yaak-hoppscotch-2026/); [Qodex](https://qodex.ai/blog/postman-alternatives)

**GitHub Actions:**
- On 2025-12-16 GitHub announced hosted-runner price cuts (effective 2026-01-01) bundled with a new $0.002/min "Actions cloud platform" charge on **self-hosted** runner minutes in private repos from 2026-03-01 — [DevClass](https://www.devclass.com/development/2025/12/17/github-to-charge-for-self-hosted-runners-from-march-2026/1734518); [The Register](https://www.theregister.com/2025/12/17/github_charge_dev_own_hardware/?td=rt-3a)
- Backlash ("self-hosted runner tax"; objections to paying per minute for hardware you own) led GitHub to postpone within about a day "to take time to re-evaluate our approach". As of October 2026 it was still not charged; it was postponed, not cancelled, and has no new date — [samexpert](https://samexpert.com/github-actions-pricing-backlash-2026/); [tenki.cloud](https://tenki.cloud/blog/github-actions-runner-pricing-2026); [community discussion #182089 "Per minute charges for self hosted runners? Wtf?"](https://github.com/orgs/community/discussions/182089)
- Some articles (e.g. Techzine) still describe the March 2026 fee as going ahead; these predate the reversal — [Techzine](https://www.techzine.eu/news/devops/137396/github-bends-to-criticism-and-delays-paid-self-hosting-of-runners/)

**Transactional email (SendGrid):**
- Twilio SendGrid retired its free Email API and free Marketing Campaigns plans effective 2025-05-27 with a 60-day grace period. The replacement is a 60-day trial, then Email API from $19.95/mo. One source dates the change to 2024 instead, a conflict — [Dreamlit: SendGrid alternatives (updated Oct 2026)](https://dreamlit.ai/blog/best-sendgrid-alternatives); [thefrontkit](https://thefrontkit.com/blogs/sendgrid-alternatives-2026)
- r/webdev thread: "Affordable or free alternatives to SendGrid now…" — [r/webdev mirror](https://r.enesgenc.dev/r/webdev/comments/1lgzmbm/affordable_or_free_alternatives_to_sendgrid_now)
- Alternatives cited: Brevo (300/day free), Mailgun (100/day free), Resend (100/day free), SMTP2GO, Amazon SES; Postmark has no free plan — [Dreamlit](https://dreamlit.ai/blog/best-sendgrid-alternatives)
- Open-source "useSend" (Resend/SendGrid/Postmark alternative) has 4,818★ — [usesend/useSend](https://github.com/usesend/useSend)

**Uptime monitoring (UptimeRobot):**
- A July 2025 r/selfhosted thread described a long-time $8/mo customer being pushed to a $34/mo Team plan or a reduced $19/mo Solo plan. Annual plans reportedly went from $88 to $348. This is via a competitor blog and a secondary write-up; I could not verify it against UptimeRobot directly — [Hyperping: UptimeRobot reviews](https://hyperping.com/blog/uptimerobot-reviews); [Dev|Journal: alternatives after 2025 price surge](https://earezki.com/ai-news/2026-03-01-uptimerobot-alternatives-who-survived-the-2025-price-hike/)
- Alternatives and prices cited (all from aggregators, unverified): Better Stack free tier (10 monitors), StatusCake ~$20/mo, Uptime.com from $7/mo, Site24x7 $9/mo, OwlPulse "flat $9/mo unlimited monitors incl. SMS", Uptime Kuma free self-hosted — [Dev|Journal](https://earezki.com/ai-news/2026-03-01-uptimerobot-alternatives-who-survived-the-2025-price-hike/); [G2 UptimeRobot pricing](https://www.g2.com/products/uptimerobot/pricing)

**Docker Desktop and OrbStack:**
- Docker Desktop is free for individuals and businesses under 250 employees and under $10M revenue. Larger companies need Docker Business at ~$21/user/mo — [pkgpulse 2026](https://www.pkgpulse.com/blog/podman-vs-docker-desktop-vs-orbstack-container-tools-macos-2026); [dupple](https://dupple.com/learn/best-free-docker-desktop-alternatives)
- OrbStack: free for personal use; Pro $8/user/mo ($96/yr) for commercial use, listed as current Oct 2026. One Bytebase article claims it is free for commercial use, which contradicts this — [toolradar OrbStack pricing](https://toolradar.com/tools/orbstack/pricing); [Bytebase](https://www.bytebase.com/blog/top-docker-desktop-alternatives/)
- Red Hat Podman Desktop build went GA on 2026-01-29 under a Red Hat Desktop subscription — [tech-insider: Docker alternatives 2026](https://tech-insider.org/docker-alternatives-podman-orbstack-rancher-colima-2026/)

**Error tracking (Sentry):**
- Bugsink (self-hosted Sentry-SDK-compatible error tracker) claims Sentry Team pricing at 50M events/mo is ~$6,441 vs Bugsink's $1,288 (vendor claim). Bugsink hosted tiers: 600K events $50, 3M $158, 15M $568, 50M $1,288. Self-hosted is free under PolyForm Shield. Some sources cite lower entry tiers, a conflict — [Bugsink: new hosted pricing](https://www.bugsink.com/blog/new-hosted-pricing/); [Bugsink: Sentry pricing explained](https://www.bugsink.com/blog/sentry-pricing-explained/); [Bugsink: cut Sentry costs 80%](https://www.bugsink.com/cut-sentry-costs-by-80-pct)
- GlitchTip: from $15/mo for 100K events, or free self-hosted — [freetier.co bugsink vs sentry](https://freetier.co/compare/bugsink-vs-sentry); [DEV: Sentry alternatives for indie hackers 2026](https://dev.to/devtoolpicks/best-sentry-alternatives-for-indie-hackers-in-2026-honest-picks-5gi1)
- Bugsink repo has 2,196★ — [bugsink/bugsink](https://github.com/bugsink/bugsink)

**Hosting (Vercel → VPS):**
- Anecdotes include a $500 surprise Vercel bill and a $3,200 bill after a traffic spike. One author estimates Hetzner (~$4) + Coolify Cloud ($5) vs ~$200/mo for Vercel Pro seats plus usage. These are weak, blog-level sources and not dated 2026 — [DEV: Coolify deployment arbitrage](https://dev.to/_aparna_pradhan_/coolify-the-deployment-arbitrage-reclaiming-startup-runway-from-vercel-3be9); [DEV: start with Vercel, scale to VPS](https://dev.to/sst21/start-with-vercel-scale-to-vps-the-smart-developers-path-245l)
- Self-hosted PaaS adoption: Coolify 66.2k★, Dokploy 38.6k★, Kamal 14.7k★ — [Coolify](https://github.com/coollabsio/coolify); [Dokploy](https://github.com/Dokploy/dokploy); [Kamal](https://github.com/basecamp/kamal)

**Supply-chain security SaaS prices (relevant to KQ5):**
- Socket: Team $25/dev/mo, Business $50/dev/mo (min 20 devs). The free plan's dependency cap rose from 1,000 to 10,000 in July 2026, and "Socket Firewall" is free — [toolradar Socket pricing](https://toolradar.com/tools/socket-dev/pricing); [usagepricing: Socket free tier change 2026-07-29](https://usagepricing.com/blueprint/activity/socket-2026-07-29-free-tier-dependency-limit); [Socket pricing page](https://socket.dev/pricing)
- Aikido: Basic ~$300-350/mo and Pro ~$600-700/mo (10 users included). Sources conflict — [CodeAnt: Aikido pricing](https://www.codeant.ai/blogs/aikido-security-pricing); [Aikido vs Socket](https://www.aikido.dev/comparison/socket-alternative)

### Inferences
- The pattern is **free-tier contraction plus per-seat pricing hitting teams of 2-10**. Postman's change is the clearest. Those are exactly the teams a solo builder can sell to with self-serve checkout, a one-time or cheap annual license, and no SOC2.
- Each trigger event already has strong OSS replacements (Bruno/Yaak, Uptime Kuma, GlitchTip/Bugsink, Coolify/Dokploy), so a new "cheaper clone" is a hard sell. Better openings are **migration tools and companion products** for those OSS tools: importers, backup and restore, multi-region probes, team sync, alert routing.
- The GitHub self-hosted-runner fee was only postponed, so CI-cost visibility remains a live anxiety. That favors small cost-analytics or "minutes-saving" tools for Actions.

### Gaps
- I could not research logging-cost (Datadog, Better Stack Logs, Axiom), feature-flag pricing (LaunchDarkly, PostHog, Unleash Cloud) or Netlify pricing complaints before the search budget ran out. Unleash (14.3k★) and Flagsmith (7.5k★) exist as OSS options — [Unleash](https://github.com/Unleash/unleash); [Flagsmith](https://github.com/Flagsmith/flagsmith).
- I found no primary UptimeRobot announcement and no direct Reddit thread data with vote counts.
- Vercel 2026 pricing-page changes were not verified.

## Key Question 4: Which small dev tools have proven indie revenue, and what do they charge?

### Takeaway
Hard revenue data for indie dev tools is scarce. The best-documented case in this research is **Yaak**, an MIT-licensed API client that charges for commercial use ($79/yr individual, $149/user/yr business). Its founder reported roughly **$1.9k-5k MRR** (sources conflict) and over $25k total revenue after adding the license in 2025. The common indie model is **open-source or free for personal use, paid for work use** (Yaak, OrbStack $8/user/mo, Bruno Pro $6/Ultimate $11, Bugsink hosted from $50/mo, GlitchTip from $15/mo).

### Cited Findings
- **Yaak:** the founder launched a commercial-use license at $160 MRR. The 2025 year-in-review reports MRR at **$1,900** and **total revenue past $25,000**, a "10x growth" year. The 2026 goal is $10k/mo, and because licenses are annual, cash revenue runs about 3x MRR. A separate Yaak post says ~**$5k MRR** from commercial licenses. The two figures conflict; the later post is probably more recent, but this is unconfirmed — [Yaak: 2025 Year in Review](https://yaak.app/blog/2025-review); [Yaak: 2025 User Survey and the Future of Yaak](https://yaak.app/blog/future-of-yaak)
- Yaak pricing: free for personal use; "a license is only required when using Yaak at work": $79/yr individual, $149/user/yr business. Building from source stays free — [tech-insider: Postman alternatives](https://tech-insider.org/postman-alternatives-bruno-insomnia-yaak-hoppscotch-2026/); [Scalar](https://scalar.com/alternatives/postman)
- Yaak repo: 19,519★ — [mountain-loop/yaak](https://github.com/mountain-loop/yaak)
- **Bruno:** free client; Pro $6 and Ultimate $11 per user per month (annual). Pro adds in-app Git integration. 48,449★ — [tech-insider](https://tech-insider.org/postman-alternatives-bruno-insomnia-yaak-hoppscotch-2026/); [G2 Bruno pricing](https://www.g2.com/products/bruno-bruno/pricing); [usebruno/bruno](https://github.com/usebruno/bruno)
- **OrbStack** (Docker Desktop alternative, macOS): free personal; Pro $8/user/mo ($96/yr) commercial — [toolradar](https://toolradar.com/tools/orbstack/pricing)
- **Bugsink** (solo-founder-style self-hosted Sentry alternative): self-host free under PolyForm Shield; hosted from $50/mo for 600K events; optional self-host support ~$15/user/mo (one source) — [Bugsink hosted pricing](https://www.bugsink.com/blog/new-hosted-pricing/); [DEV Sentry alternatives](https://dev.to/devtoolpicks/best-sentry-alternatives-for-indie-hackers-in-2026-honest-picks-5gi1)
- **GlitchTip:** hosted from $15/mo (100K events) — [freetier.co](https://freetier.co/compare/bugsink-vs-sentry)
- An Indie Hackers post titled "Turning a developer tool into a $50k MRR lifestyle business" exists; I could not read its details — [Indie Hackers](https://www.indiehackers.com/post/tech/turning-a-developer-tool-into-a-50k-mrr-lifestyle-business-9GL6b2gcc31LXjx7g3yC)
- A self-reported survey of 861 indie makers puts the median for developer tools at $22K/mo, but n=27 for that category. **Weak**: self-reported, small sample, and likely survivorship bias — [Indie Maker List: State of Indie Makers 2026](https://indiemakerlist.com/report/2026/)
- Side-project threads show dev tools at the $500-1,000/mo donation scale (e.g. a mock-API tool, 2024) — [HN 42373343](https://news.ycombinator.com/item?id=42373343)
- Star counts of OSS tools that indicate demand (no revenue data):
  - ccusage, a Claude Code usage analyzer: **19,498★**, created 2025-05 — [ccusage/ccusage](https://github.com/ccusage/ccusage)
  - claude-swap, a multi-account switcher with "automatic rate-limit rotation, usage dashboard": **4,808★**, created 2026-01 — [realiti4/claude-swap](https://github.com/realiti4/claude-swap)
  - cc-account-switcher: 452★ — [ming86/cc-account-switcher](https://github.com/ming86/cc-account-switcher)
  - A tray app for Claude usage and account switching: 85★, created 2026-09 — [SnlperStripes/claude-account-switcher](https://github.com/SnlperStripes/claude-account-switcher)
  - dotenvx 5,883★, Infisical 30,600★, gitleaks 31,173★ — [dotenvx](https://github.com/dotenvx/dotenvx); [Infisical](https://github.com/Infisical/infisical); [gitleaks](https://github.com/gitleaks/gitleaks)

### Inferences
- Yaak shows that a solo-built desktop dev tool with an OSS core can reach thousands in MRR within about a year by **charging only for work use**. It also shows the ceiling: a year in, it is still small (low thousands MRR) despite 19.5k stars. Stars convert to revenue at a low rate.
- The pricing band that works for indie dev tools is roughly **$6-15/user/mo or $79-149/yr per seat**, or **$15-50/mo** for hosted observability. A new product should anchor there.
- AI-agent tooling (ccusage, claude-swap) has OSS star velocity far above classic dev tools: about 19.5k★ in roughly 18 months. Nobody has demonstrated paid conversion yet. That is an opportunity, and it is also evidence that developers expect these tools to be free.

### Gaps
- I found no verified revenue or current pricing for TablePlus, Tower, Kaleidoscope, Dash, Raycast Pro, Plausible or Umami Cloud in this session (search budget exhausted). The report writer should not cite figures for these from these notes.
- I couldn't fetch Yaak's blog directly to settle which MRR figure is current. Both figures come from search snippets of yaak.app.

## Key Question 5: Which problems are getting WORSE in 2026?

### Takeaway
Four problems clearly worsened in 2026, each with strong evidence:
1. **Self-propagating npm/PyPI supply-chain worms.** Shai-Hulud-family waves hit in May, June and August 2026; ChainDrop compromised 444+ packages in under four hours, and axios and litellm were also compromised.
2. **Secrets leakage, amplified by AI.** 28.65M new secrets were found on public GitHub in 2025 (+34%), and AI-assisted commits leak at about 2x the baseline rate.
3. **AI-slop PRs flooding maintainers.** Maintainers estimate about 25% of PRs are junk, rising to 31% on large projects.
4. **AI coding agents taking destructive actions and burning opaque usage limits.**
Demand for **install cooldowns** ("minimumReleaseAge") has spread across npm, bun and VS Code extensions.

### Cited Findings
**Supply-chain worms (2026):**
- **ChainDrop (2026-08-04):** began with a compromised maintainer account for keyv (~127M weekly downloads). StepSecurity counts 444 packages and 2,212 versions in under 4 hours. Aikido counts 444 packages / 1,381 versions (a conflict on version count). Microsoft says over 400 packages; the worm injects a preinstall hook and republishes — [Microsoft Security Blog](https://www.microsoft.com/en-us/security/blog/2026/08/04/chaindrop-supply-chain-compromise-anatomy-self-propagating-worm/); [StepSecurity](https://www.stepsecurity.io/blog/chaindrop-npm-worm); [Datadog Security Labs](https://securitylabs.datadoghq.com/articles/npm-worm-compromises-popular-npm-packages/); [Aikido](https://www.aikido.dev/blog/keyv-and-friends-compromised-in-npm-supply-chain-attack); [Singapore CSA advisory AD-2026-009](https://www.csa.gov.sg/alerts-and-advisories/advisories/ad-2026-009/)
- **Mini Shai-Hulud / TanStack (disclosed 2026-05-12):** attributed to TeamPCP. Hit TanStack, Mistral AI, UiPath and 160+ npm and PyPI packages, including a destructive daemon that could wipe home directories — [Orca Security](https://orca.security/resources/blog/tanstack-npm-supply-chain-worm/)
- **Red Hat npm packages (June 2026):** 96 versions across 32 packages — [Cybersecurity Dive](https://www.cybersecuritydive.com/news/dozens-red-hat-npm-packages-supply-chain-attack/821723/)
- **"Miasma" binding.gyp wave (2026-06-03):** 57 packages. The payload hid in binding.gyp, which runs at install without any package.json script change — [Snyk](https://snyk.io/blog/node-gyp-supply-chain-compromise-self-propagating-npm-worm-binding-gyp/); [StepSecurity](https://www.stepsecurity.io/blog/binding-gyp-npm-supply-chain-attack-spreads-like-worm)
- Socket's pricing page banner, seen 2026-11: "Shai-Hulud Strikes Again: 834 Packages Compromised" — [socket.dev/pricing](https://socket.dev/pricing)
- axios compromised (2026-03-31), 701 👍 issue plus 594 👍 post-mortem; litellm PyPI credential stealer (2026-03-24), 798 👍 — [axios #10604](https://github.com/axios/axios/issues/10604); [axios #10636](https://github.com/axios/axios/issues/10636); [litellm #24512](https://github.com/BerriAI/litellm/issues/24512)

**Demand for install cooldowns and supply-chain controls (GitHub reactions):**
- VS Code "Security: minimumReleaseAge setting for mitigating supply chain attacks on extensions": **333 👍**, 2026-05, closed — [vscode #316867](https://github.com/microsoft/vscode/issues/316867)
- bun "Add support to minimumReleaseAge": **313 👍**, 2025-09 — [bun #22679](https://github.com/oven-sh/bun/issues/22679)
- npm "(FR): Implement 'minimumReleaseAge' as a security feature (like pnpm added recently)": 181 👍, 2025-09, closed (resolution not verified) — [npm/cli #8570](https://github.com/npm/cli/issues/8570)
- npm "Support trustPolicy to reject packages with provenance downgrade at install time": 62 👍, 2026-04 — [npm/cli #9242](https://github.com/npm/cli/issues/9242)
- npm "Allow publishing initial version with OIDC": 103 👍, 2025-09 — [npm/cli #8544](https://github.com/npm/cli/issues/8544)
- "`pnpm audit` fails with 410: npm registry has retired legacy audit endpoints": **270 👍**, 2026-04 — [pnpm #11265](https://github.com/pnpm/pnpm/issues/11265)
- npm "Revert policy on unrecognized keys in .npmrc": 256 👍, 2026-06 — [npm/cli #9699](https://github.com/npm/cli/issues/9699)

**Secrets leakage (GitGuardian State of Secrets Sprawl 2026, published 2026-03-17):**
- 28.65M new hardcoded secrets in public GitHub commits in 2025, +34% year over year, "the largest single-year jump"
- 1,275,105 leaked AI-service secrets, +81%; 8 of the 10 fastest-growing leaked-secret categories are AI-related
- AI-assisted commits leak secrets at ~3.2% vs a ~1.6% baseline (one outlet says 1.5%)
- 64% of credentials confirmed valid in 2022 were still unrevoked in 2026
- Sources: [GitGuardian blog](https://blog.gitguardian.com/the-state-of-secrets-sprawl-2026/); [The Hacker News](https://thehackernews.com/2026/03/the-state-of-secrets-sprawl-2026-9.html); [SC World](https://www.scworld.com/news/ai-coding-assistants-twice-as-likely-to-leak-secrets-as-overall-leaks-rise-34); [Help Net Security](https://www.helpnetsecurity.com/2026/03/27/gitguardian-exposed-credentials-risk-report/)
- Caveat: commentators note the elevated rate reflects human choices (time pressure, bypassed warnings), not autonomous AI behavior — [passwork summary](https://passwork.pro/blog/the-state-of-secrets-sprawl-in-2026/)

**AI-slop PRs overwhelming OSS maintainers:**
- A Linux Foundation survey found maintainers estimate about 25% of incoming PRs are low-quality AI output, rising to 31% on larger projects — [The Register, 2026-10-21](https://www.theregister.com/ai-and-ml/2026/10/21/ai-cuts-coding-time-but-its-also-filling-open-sources-inbox-with-crap/5304389)
- An arXiv study of maintainer-identified slop PRs shows volume rising from mid-2025 and peaking in May 2026. Most are closed without a stated reason — [arXiv 2611.15159](https://arxiv.org/html/2611.15159)
- Godot maintainers call triage "draining and demoralizing". Rémi Verschelde said AI-based slop detection would be "horribly ironic" but "We might have to do this eventually if some good solutions emerge" — [Game Developer](https://www.gamedeveloper.com/programming/godot-co-founder-says-ai-slop-pull-requests-have-become-overwhelming)
- GitHub has considered a "kill switch" to disable or restrict PRs (Feb 2026, under evaluation) — [The Register, 2026-02-03](https://www.theregister.com/2026/02/03/github_kill_switch_pull_requests_ai/?td=rt-4a)
- rsync issue "Please Do Not Vibe Fuck Up This Software": 2,172 👍, the most-reacted issue created in 2026 — [rsync #929](https://github.com/RsyncProject/rsync/issues/929)
- I found no named, released product purpose-built to filter AI-slop PRs — [paperclipped analysis](https://www.paperclipped.de/en/blog/github-ai-slop-pull-requests-open-source)

**AI coding agents doing destructive things:**
- PocketOS (April 2026): a Cursor agent deleted the production DB and its backup volume in one Railway API call, using an unrelated CLI token it found in a file — [DEV: 9 seconds](https://dev.to/rills_stephen/9-seconds-an-ai-coding-agent-deleted-a-production-database-2lhg); [penligent](https://www.penligent.ai/hackinglabs/ai-agent-deleted-a-production-database-the-real-failure-was-access-control/)
- DataTalks.Club (Feb 2026): a Claude Code `terraform destroy` erased 1,943,200 rows — [bestagent.dev](https://bestagent.dev/ai-coding-agent-destructive-actions-2026/)
- One tally counts 10+ AI-agent database deletions across six tools in about 16 months. The root causes are broad credentials and no gate on destructive actions; natural-language "rules" did not hold — [Medium tally](https://medium.com/@chenyuan19920509/ten-ai-agents-destroyed-production-data-not-one-vendor-published-a-postmortem-8907211a68d2); [bex.co](https://bex.co/blog/2026/07/11/vibe-coding-incident-guardrails)
- Codex issue "…destroyed systemd, destroyed containers… cost me $10,000+": 548 👍, 2026-11-03 — [codex #59060](https://github.com/openai/codex/issues/59060)
- Existing guardrail tools: Destructive Command Guard (a PreToolUse hook blocking rm -rf, git reset --hard, force-push, DROP TABLE); roboticforce/agent-guardrails (Terraform, DB, k8s and cloud policies); SigmaShake (a "deterministic local gate… across every agent") — [rohitraj comparison 2026](https://rohitraj.tech/notes/ai-agent-command-guardrails-2026); [roboticforce/agent-guardrails](https://github.com/roboticforce/agent-guardrails); [SigmaShake](https://sigmashake.com/stop-rm-rf)

**AI agent usage limits, accounts and costs:**
- See the KQ1 issue counts: #16157 (697 👍 / 1,499c), #38335 (476 👍 / 879c), Codex #28879 (364 👍), account switching #18435 (1,069 👍)
- "HERMES.md in git commit messages causes requests to route to extra usage billing instead of plan quota": 213 👍 — [claude-code #53262](https://github.com/anthropics/claude-code/issues/53262)
- "Weekly Usage Limits Making Claude Subscriptions Unusable": 115 👍, 2025-10 — [claude-code #9424](https://github.com/anthropics/claude-code/issues/9424)
- Codex "usage-limit exhausted while linked dashboard shows available quota": 20 👍, 2026-07 — [codex #31001](https://github.com/openai/codex/issues/31001)

**CI:**
- A 2026 HN wish was LLM-based CI test selection rather than path-based selection — [HN 46345827](https://news.ycombinator.com/item?id=46345827)
- GitHub Actions allow-failure, early-exit and multi-choice gaps remain open (KQ2)
- Flaky-test tooling showed little GitHub-issue-level signal. The top "flaky tests" issues since 2025 have ≤5 👍, e.g. a Playwright JUnit reporter flaky annotation request — [playwright #35592](https://github.com/microsoft/playwright/issues/35592)

### Inferences
- Supply-chain risk is the most clearly **worsening and monetizable** pain. Worms recur every one to three months. Developers keep requesting the same mitigation (delay new versions, block install-time code, detect provenance downgrade) in every package manager and in VS Code extensions. Yet incumbents price per developer ($25-50/dev/mo, Aikido $300+/mo), above what solo devs and 2-5 person teams want to pay. pnpm has a native cooldown and Socket Firewall is free, so differentiation must come from **breadth** (one policy across npm, pnpm, bun, pip/uv, VS Code/Cursor/Open VSX extensions and GitHub Actions), **local-first, no-account** operation, and **CI enforcement**.
- AI-agent safety and visibility is the fastest-growing new category. It has many free OSS hook tools and no clear paid leader. Incidents are expensive ($10k+, lost databases), which supports willingness to pay among small agencies and startups. Individual hobbyists will expect it free.
- AI-slop PR triage is acute pain, but buyers (OSS maintainers) have little money and GitHub is working on native controls. That makes it a weak commercial bet unless sold to companies with public repos or as an add-on to inner-source review.
- The AI-assisted secrets-leak rate (2x baseline) points to a pre-commit or agent-hook secret guard as a feature of an agent-safety product rather than a standalone product, given gitleaks (31k★) is free and GitGuardian exists.

### Gaps
- I could not research flaky-test tool pricing (Trunk, BuildPulse, Datadog CI Visibility) or general CI-cost survey data; the search budget was exhausted.
- I could not verify whether npm shipped minimumReleaseAge after #8570 was closed, or whether VS Code shipped the extension cooldown after #316867 was closed. Both are closed but I didn't verify the resolution.
- Pricing for Destructive Command Guard and SigmaShake (paid or free) is unknown.

## Top 5 candidate product ideas from this angle

### Takeaway
The best solo-builder bets combine (a) a pain that is worsening in 2026 with hard GitHub-reaction evidence, (b) incumbents priced per developer for enterprises, or only free OSS with no polish, and (c) something buildable in days to weeks with no infrastructure or compliance burden. Ranked by that combination:
1. Cross-ecosystem dependency cooldown and install firewall
2. Cross-agent AI coding safety layer
3. Uptime Kuma companion (monitors-as-code plus remote probes)
4. Backup and restore manager for self-hosted Docker/Coolify/Dokploy stacks
5. AI coding usage and limits cockpit (highest demand signal, weakest payment evidence)

### Cited Findings
These ideas rest on findings already cited in KQ1-KQ5; the key evidence is repeated per idea below with its source links.

**1. "Cooldown" — cross-ecosystem dependency quarantine and install firewall (CLI + GitHub Action + VS Code extension)**
- **Problem:** worms republish popular packages and run at install, via preinstall hooks or binding.gyp. Teams want to (a) refuse versions younger than N days, (b) block install-time code execution except for an allowlist, and (c) flag provenance downgrades. They want this in every tool they use, including editor extensions.
- **Evidence strength: STRONG.**
  - 2026 incidents: ChainDrop (444+ packages), Mini Shai-Hulud (160+), Miasma, axios, litellm — [Microsoft](https://www.microsoft.com/en-us/security/blog/2026/08/04/chaindrop-supply-chain-compromise-anatomy-self-propagating-worm/); [Orca](https://orca.security/resources/blog/tanstack-npm-supply-chain-worm/); [axios #10604](https://github.com/axios/axios/issues/10604); [litellm #24512](https://github.com/BerriAI/litellm/issues/24512)
  - Cooldown requests: VS Code extension cooldown 333 👍, bun 313 👍, npm 181 👍, npm provenance-downgrade policy 62 👍, pnpm audit endpoint retired 270 👍 — [vscode #316867](https://github.com/microsoft/vscode/issues/316867); [bun #22679](https://github.com/oven-sh/bun/issues/22679); [npm/cli #8570](https://github.com/npm/cli/issues/8570); [npm/cli #9242](https://github.com/npm/cli/issues/9242); [pnpm #11265](https://github.com/pnpm/pnpm/issues/11265)
- **Competitors and prices:**
  - Socket: Team $25/dev/mo, Business $50/dev/mo (min 20); free tier 10k deps; free Socket Firewall — [toolradar](https://toolradar.com/tools/socket-dev/pricing); [usagepricing](https://usagepricing.com/blueprint/activity/socket-2026-07-29-free-tier-dependency-limit)
  - Aikido: ~$300-700/mo — [CodeAnt](https://www.codeant.ai/blogs/aikido-security-pricing)
  - StepSecurity (pricing not verified)
  - pnpm's native minimumReleaseAge (free)
- **Differentiated angle:** one local-first config file (`cooldown.toml`) enforced uniformly across npm, pnpm, bun, yarn, pip/uv and **VS Code/Cursor/Open VSX extensions**, plus a GitHub Action that fails PRs adding too-new or script-running deps. No account and no code upload. Priced for solo devs and small teams, e.g. ~$49-99/yr per developer or ~$15-29/mo per org. "Worm-day" alert emails make good marketing moments, since worms recur every one to three months.
- **Build difficulty:** low-to-medium. Registry metadata (publish times, provenance attestations) is public. A local registry proxy or lockfile scanner plus extension-manifest checks is a 1-3 week build. The risks are package managers shipping native cooldowns and Socket's free firewall. The moat is multi-ecosystem coverage, especially editor extensions, plus CI policy.

**2. "Agent seatbelt" — cross-agent safety layer for AI coding agents (Claude Code, Codex, Cursor, OpenCode, Gemini/Antigravity CLIs)**
- **Problem:** agents run destructive commands (rm -rf, terraform destroy, DROP, force-push, cloud API deletes) using broad credentials they find in the repo. AI-assisted commits leak secrets at 2x the baseline. Natural-language rules don't hold.
- **Evidence strength: STRONG and worsening.**
  - Incidents: PocketOS (Apr 2026), DataTalks.Club 1.94M rows (Feb 2026), Codex "$10,000+" issue at 548 👍 (Nov 2026) — [DEV](https://dev.to/rills_stephen/9-seconds-an-ai-coding-agent-deleted-a-production-database-2lhg); [bestagent.dev](https://bestagent.dev/ai-coding-agent-destructive-actions-2026/); [codex #59060](https://github.com/openai/codex/issues/59060)
  - GitGuardian: AI-assisted commits leak secrets at 3.2% vs 1.6% — [GitGuardian](https://blog.gitguardian.com/the-state-of-secrets-sprawl-2026/)
- **Competitors:** OSS hook tools Destructive Command Guard and roboticforce/agent-guardrails; SigmaShake (pricing unknown); gitleaks (free) for secrets — [rohitraj comparison](https://rohitraj.tech/notes/ai-agent-command-guardrails-2026); [agent-guardrails](https://github.com/roboticforce/agent-guardrails); [SigmaShake](https://sigmashake.com/stop-rm-rf)
- **Differentiated angle:**
  - One installer that wires PreToolUse-style hooks into *every* agent the developer has.
  - Curated, auto-updating policy packs (Terraform, Prisma/Drizzle migrations, kubectl, Railway/Fly/Vercel/AWS CLIs, git).
  - A **credential-exposure audit**: it finds long-lived tokens in the repo or home directory that an agent could use.
  - A secret scrubber on agent-generated commits.
  - A local audit log of every blocked or approved action.
  - Sold as a team license to agencies and startups, e.g. $10-20/dev/mo or $99/yr solo, with a free OSS core.
- **Build difficulty:** low-to-medium. Hook APIs exist in the major agents. The work is policy curation and cross-agent installers. The risk is agent vendors improving built-in permission models.

**3. "Kuma Probes" — monitors-as-code and multi-region remote probes for self-hosted Uptime Kuma, or a flat-price uptime micro-SaaS**
- **Problem:** Uptime Kuma users want an API, remote executors (checks from other locations), config-file monitors and longer history. These have been open for 4-5 years. Meanwhile UptimeRobot pushed legacy users from $8 to $19-34/mo.
- **Evidence strength: MEDIUM-STRONG.** Uptime Kuma has 94.6k★; API 711 👍, remote executors 415 👍, config file 91 👍, heartbeat range 303 👍 — [#118](https://github.com/louislam/uptime-kuma/issues/118); [#84](https://github.com/louislam/uptime-kuma/issues/84); [#1354](https://github.com/louislam/uptime-kuma/issues/1354); [#1888](https://github.com/louislam/uptime-kuma/issues/1888). UptimeRobot 2025 price changes come via secondary sources — [Hyperping](https://hyperping.com/blog/uptimerobot-reviews); [Dev|Journal](https://earezki.com/ai-news/2026-03-01-uptimerobot-alternatives-who-survived-the-2025-price-hike/)
- **Competitors:** UptimeRobot $19/$34/mo; Better Stack (free 10 monitors); StatusCake ~$20; Uptime.com from $7; Site24x7 $9; OwlPulse $9 flat; Hyperping (pricing not verified); Uptime Kuma itself (free). All from aggregators.
- **Differentiated angle:** don't compete with Kuma; **augment** it. A tiny agent or hosted probe network (3-10 regions on cheap VPSes) pushes results into the user's own Kuma or exposes a Kuma-compatible push endpoint. Add a `kuma.yaml` GitOps sync CLI (monitors-as-code with diff and apply) and a long-retention SLA report export. Price: $5-15/mo. Alternatively, a standalone flat-price uptime and status-page SaaS for indie hackers.
- **Build difficulty:** medium. The probe network requires running a few VPSes (small infrastructure, but ongoing ops). The GitOps CLI alone is low difficulty but depends on Kuma's socket API stability. The market is crowded at the low end.

**4. "Compose Backup" — encrypted, tested backups and one-click restore for self-hosted Docker Compose / Coolify / Dokploy / NPM stacks**
- **Problem:** developers moving off Vercel to VPS + Coolify/Dokploy lack integrated, verified backups of volumes, databases and proxy config, and restore testing.
- **Evidence strength: MEDIUM.**
  - Coolify backup manager (60c) and git-compose backups (47c, Dec 2025); NPM "Backup from WebGui" 127 👍 (open since 2019); Portainer/Docker 29 breakage (304 👍 / 439c) shows fragility — [coolify #2389](https://github.com/coollabsio/coolify/issues/2389); [coolify #7528](https://github.com/coollabsio/coolify/issues/7528); [NPM #168](https://github.com/NginxProxyManager/nginx-proxy-manager/issues/168); [portainer #12925](https://github.com/portainer/portainer/issues/12925)
  - Adoption base: Coolify 66k★, Dokploy 38.6k★ — [Coolify](https://github.com/coollabsio/coolify); [Dokploy](https://github.com/Dokploy/dokploy)
- **Competitors:** restic/Borg/Duplicati (free, DIY); Coolify's built-in DB backups. I didn't verify pricing for hosted backup SaaS (e.g. SimpleBackups); see Gaps.
- **Differentiated angle:** a single binary or container that auto-discovers Compose projects and their volumes and databases. It runs app-consistent dumps (Postgres, MySQL, Redis, SQLite) to the user's S3/B2/R2, **runs automated restore drills** into a scratch container, and reports. Sold as $49-99 one-time per server, or $5-9/mo with a hosted dashboard.
- **Build difficulty:** low-to-medium. It wraps restic and DB dump tools. The value is discovery, restore testing and UX. The risk is that Coolify or Dokploy ship native backup UIs.

**5. AI coding "limits cockpit" — menubar/tray app showing real-time usage, limits and cost across Claude Code, Codex, Cursor and OpenCode, with profile switching**
- **Problem:** subscription users hit opaque usage limits and want to see consumption and switch between personal and work profiles.
- **Evidence strength: STRONG demand, WEAK proof of payment.**
  - Limits issues: 697 👍 / 1,499c, 476 👍 / 879c, Codex 364 👍 — [claude-code #16157](https://github.com/anthropics/claude-code/issues/16157); [#38335](https://github.com/anthropics/claude-code/issues/38335); [codex #28879](https://github.com/openai/codex/issues/28879)
  - Multi-account requests: 1,069 👍, 779 👍, 483 👍 — [#18435](https://github.com/anthropics/claude-code/issues/18435); [#36151](https://github.com/anthropics/claude-code/issues/36151); [#27302](https://github.com/anthropics/claude-code/issues/27302)
  - OSS traction: ccusage 19.5k★, claude-swap 4.8k★ — [ccusage](https://github.com/ccusage/ccusage); [claude-swap](https://github.com/realiti4/claude-swap)
- **Competitors:** ccusage (free OSS), claude-swap (free OSS), cc-account-switcher, various tray apps (free); vendors' own usage dashboards.
- **Differentiated angle:** a polished native macOS/Windows/Linux tray app with forecasts ("you'll hit your 5-hour limit in about 40 min at this rate"), per-project cost attribution for client billing (useful to freelancers and agencies), and team roll-ups. Priced at about $20-30 one-time or a few dollars a month.
- **Build difficulty:** low. It parses local session logs and vendor endpoints.
- **Material risks:**
  - Vendors can ship this natively.
  - Free OSS sets the price expectation at $0.
  - **Automatic rotation across multiple subscription accounts to dodge rate limits may violate provider terms.** A seller should stick to visibility and attribution.

### Inferences
- **Recommended priority for a days-to-weeks build:**
  - #1 (Cooldown) and #2 (Agent seatbelt) have the best mix of worsening pain, buyer budgets (security spend), and low infrastructure needs. Both can ship as an OSS core with a paid tier or team license.
  - #4 is the safest "boring" product.
  - #3 is crowded.
  - #5 has the most demand signal but the weakest monetization and the highest platform risk.
- **Honorable mentions (weaker on evidence or monetization):**
  - Postman-team refugee tooling: Postman-to-Bruno/Yaak migration plus git-based team sharing. The trigger event is strong ([Apidog](https://apidog.com/blog/postman-free-vs-paid-comparison/)), but Bruno and Yaak already cover most of it.
  - GitHub Actions gap-filler and CI-cost analyzer: 1,468, 1,096 and 930 👍 asks, plus anxiety over the postponed runner fee ([actions/runner #2347](https://github.com/actions/runner/issues/2347); [tenki](https://tenki.cloud/blog/github-actions-runner-pricing-2026)). Platform-dependent.
  - AI-slop PR triage bot: acute pain ([The Register](https://www.theregister.com/ai-and-ml/2026/10/21/ai-cuts-coding-time-but-its-also-filling-open-sources-inbox-with-crap/5304389)), but maintainers have little budget and GitHub is building native controls.
  - Cross-agent config sync (AGENTS.md / CLAUDE.md / Cursor rules / skills): 5,194 👍 ([claude-code #6235](https://github.com/anthropics/claude-code/issues/6235)), but likely solved natively and low willingness to pay.

### Gaps
- No direct willingness-to-pay evidence (pricing-page conversions, revenue) exists for any AI-agent safety or usage tool; all examples found are free OSS.
- I didn't verify competitor pricing for StepSecurity, SigmaShake, Destructive Command Guard, Hyperping or SimpleBackups.
- Reddit and HN qualitative validation for ideas #1, #2 and #4 (e.g. "I would pay for X" comments) could not be gathered because those sites were blocked and the search budget ran out. The report writer should treat WTP for these as inferred from incumbent pricing, not observed.
