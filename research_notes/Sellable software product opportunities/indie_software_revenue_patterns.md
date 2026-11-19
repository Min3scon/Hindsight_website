# Revenue Patterns of Solo-Built Software Products (2024-2026)

> **How this was researched:** WebFetch could not reach any external host in this session (extensionpay.com, dev.to and trustmrr.com all failed DNS resolution because of the session's network allowlist). The session's web-search budget also ran out after the user added the marketplace-only constraint (see section 6), so marketplaces like Superhive, Fab, Unity Asset Store, JetBrains, Atlassian, Steam and itch.io could not be researched. So every finding below comes from web-search result summaries, not from reading the full pages. Each number is cited to the URL the search engine named, but it should be checked on the primary page before anyone relies on it in a decision.
>
> **Verification labels used throughout:**
> - **[VERIFIED]**: the revenue comes through a payment-provider API (TrustMRR, Scoutr), or a journalist checked documents.
> - **[SELF-REPORTED]**: a founder posted it (Indie Hackers, X, newsletter).
> - **[ESTIMATE]**: a third party modeled or guessed it (blogs, benchmark sites).
> - **[OLDER]**: the data is from before 2024.

---

## 1. What are the documented revenue figures for solo-made software products?

### Takeaway
There is real money in solo software, but it is extremely concentrated. Across roughly 9,000 TrustMRR startups whose revenue was checked through their payment provider, 54% make $0/month and only about 12% clear $1,000/month. The documented winners cluster in a few shapes:
- **Workflow browser extensions** sitting on top of a high-traffic host (Gmail, ChatGPT, X, Poshmark): $3.7K to $130K/month.
- **Native Mac apps sold with a perpetual license**: $6K to $30K+/month, with TypingMind (now a web app with team plans) at $130K to $210K/month.
- **Developer boilerplates**: these peaked at more than $100K/month, but have since collapsed for the category leader.
- **Templates**: most earn little. A few top Framer sellers make $13K to $24K/month.

### Cited Findings

**Aggregate / verified-revenue directories**
- TrustMRR, a directory of startups whose revenue is verified through Stripe and other providers, reported a daily snapshot of **$1,987,809,971 verified revenue across 70M transactions** [VERIFIED aggregate] — [TrustMRR stats](https://trustmrr.com/stats)
- Scoutr analysed **8,817 indie startups on TrustMRR**, with revenue read from Stripe, RevenueCat, Polar and Paddle (snapshot August 2026) [VERIFIED]:
  - **54% make exactly $0/month.**
  - **Only 12.1% clear $1,000/month.**
  - The SaaS subset does slightly worse: 56% at $0, 11.8% above $1K/month.
  - Scoutr says the product category changes the odds more than whether the product uses AI.
  - Source: [Scoutr indie startup revenue report](https://www.scoutr.dev/blog/indie-startup-revenue-report)
- Scoutr's companion "mortality" report on the same sample [VERIFIED]:
  - **23.3% never took a single payment.**
  - **30.7% took payments and no longer do.**
  - 4,054 were earning at snapshot time.
  - Source: [Scoutr startup mortality report](https://www.scoutr.dev/blog/startup-mortality-report)
- A further "TrustMRR census" of 10,150 products appeared in one search summary, but the search did not name which site published it, so treat it as unverified:
  - 58.4% had zero MRR.
  - Only 26.1% had zero MRR, zero 30-day revenue *and* zero lifetime revenue. This means many products earn one-time revenue that MRR does not capture.
  - 67.8% had under $1,000 lifetime revenue; 0.9% had crossed $1M lifetime.
  - Surfaced alongside: [TechStartups](https://techstartups.com/2026/09/28/what-percentage-of-indie-hacker-products-make-100k-in-arr/), [Scoutr](https://www.scoutr.dev/blog/indie-startup-revenue-report)
- The widely repeated "54% make $0" figure first came from Scraping Fish's 2022 analysis of 937 Stripe-verified Indie Hackers products [OLDER]. It happens to match the 2026 TrustMRR figure. — [Scoutr summary / search results](https://www.scoutr.dev/blog/indie-startup-revenue-report)
- Marc Lou's TrustMRR founder page shows **20 startups, $3,312,485 total verified revenue** [VERIFIED] — [TrustMRR founder page](https://trustmrr.com/founder/marclou)
- Marc Lou self-reported **$1,032,000 total 2025 income across ~15 income streams, "20% less than 2024"** in his January 2026 newsletter, as summarized by a third party [SELF-REPORTED] — [DEV Community summary](https://dev.to/promptway/he-built-an-app-in-24-hours-and-made-20378-the-next-day-heres-the-part-nobody-screenshots-5gep)

**Browser extensions**
- **GMass** (send email campaigns from inside Gmail):
  - About **$130K/month** per ExtensionPay's list — [ExtensionPay](https://extensionpay.com/articles/browser-extensions-make-money)
  - $115K/month in a January 2019 founder interview [OLDER, SELF-REPORTED] — [Chrome Goldmine](https://chromegoldmine.com/blog/profitable-chrome-extension-niches/)
  - About $5.4M/year in later business profiles [ESTIMATE] — [StealWhatWorks](https://stealwhatworks.com/blogs/news/browser-extensions-over-10k-month-now)
- **Closet Tools** (automates Poshmark reseller tasks; solo founder): **about $42K/month**, and about $38K/month on the Indie Hackers podcast in December 2020 [OLDER, SELF-REPORTED] — [ExtensionPay](https://extensionpay.com/articles/browser-extensions-make-money); [microsaasbytes](https://microsaasbytes.substack.com/p/chrome-extension-products)
- **CSS Scan** (CSS inspector for developers, sold as a **one-time purchase**): reported as ">$100K". Sources disagree on whether that is monthly or lifetime; lifetime is more plausible [OLDER, SELF-REPORTED] — [ExtensionPay](https://extensionpay.com/articles/browser-extensions-make-money)
- **GoFullPage** (full-page screenshots):
  - About **$10K/month** after adding premium features.
  - It had already grown organically to **4M users and 53K reviews** before it started charging.
  - Last figure is from 2021 [OLDER].
  - Source: [ExtensionPay](https://extensionpay.com/articles/browser-extensions-make-money)
- **Night Eye** (dark mode) about $3.1K/month; **BlackMagic.so** (Twitter/X CRM) about $2.5K/month [OLDER, SELF-REPORTED] — [ExtensionPay](https://extensionpay.com/articles/browser-extensions-make-money)
- **Superpower ChatGPT** (Saeed Ezzati):
  - Built in a weekend for himself.
  - Now at **"5-figure MRR," still run solo.**
  - Over 420K downloads and 150K weekly active users.
  - Revenue comes from the paid tier plus newsletter sponsorships.
  - [SELF-REPORTED, 2024-25] — [Indie Hackers](https://www.indiehackers.com/post/tech/building-a-free-chrome-extension-in-3-days-and-turning-it-into-a-5-figure-mrr-ecosystem-3rIbjigZxiFsrgqJjJYp)
- **Easy Folders** (Edmund Yong; organizes ChatGPT/Claude chats into folders):
  - **$3,700+ MRR and $42,000+ lifetime revenue within 6 months of launch.**
  - Priced at **$9/month**; the free tier allows up to 5 folders.
  - [SELF-REPORTED, 2025] — [small-start.com case write-up](https://small-start.com/en/cases/global-6-months-post-launch-my-chrome-extension-has-h/); [Practical Ecommerce](https://www.practicalecommerce.com/chrome-extensions-for-chatgpt-claude-gemini)
- **SuperX** (X/Twitter creator tool) disclosed **about $23K MRR after six months**. **Launch Fast** is listed at about $30K MRR. StealWhatWorks notes that fresh founder-confirmed numbers are lacking for both [SELF-REPORTED / ESTIMATE, 2026] — [StealWhatWorks Chrome extensions >$10K](https://stealwhatworks.com/blogs/news/chrome-extensions-over-10k-month-now)
- **Surfe** (LinkedIn-to-CRM extension) at about $15M ARR and **Foreplay** at seven-figure ARR are founder-confirmed. Both are teams, not solo, but they show the ceiling for workflow extensions — [StealWhatWorks browser extensions >$10K](https://stealwhatworks.com/blogs/news/browser-extensions-over-10k-month-now)
- Counterexamples at the bottom of the range:
  - **TimeYourWeb**: built in 2 weeks; after 10 years it has **20,000 users, 10 paying customers, $60 MRR** [SELF-REPORTED] — [Indie Hackers](https://www.indiehackers.com/post/i-built-a-chrome-extension-in-2-weeks-10-years-later-20-000-users-10-paying-customers-60-mrr-YaK5THoaKqXgTlgBjHgO)
  - A developer running **5 extensions on ExtensionPay reports about $180/month combined** after about 6 months [SELF-REPORTED, 2026] — [DEV Community](https://dev.to/_350df62777eb55e1/real-numbers-freemium-chrome-extension-monetization-after-6-months-5hga)
- ExtensionPay (a Stripe-based payments library for extensions) says it has helped developers earn **over $500K** in total — [Chromium extensions group](https://groups.google.com/a/chromium.org/g/chromium-extensions/c/MK4KIe8Ywcc)

**Mac / desktop apps**
- **BoltAI** (Daniel Nguyen, native macOS AI client):
  - Revenue: averaged **about $15K/month** with 7,000 customers 18 months after launch; reported "up to $30K/month" — [Indie Hackers ($15K/mo)](https://www.indiehackers.com/post/how-going-viral-on-x-helped-this-solopreneur-reach-15k-mo-with-his-native-ai-apps-ZBbFBKrpwqZQkQsy7Bcs); [Indie Hackers ($30K/mo perpetual)](https://www.indiehackers.com/post/cRvgt7fySrr3M76MSVas)
  - Pricing model: mainly **one-time / perpetual license with limited updates** [SELF-REPORTED]
  - Prices quoted range from about $69 to $199; the team license is $99/seat with 1 year of updates — [BoltAI pricing](https://boltai.com/pricing); [Starter Story](https://www.starterstory.com/bolt-ai-breakdown)
  - Distribution: going viral on X.
- **TypingMind** (Tony Dinh; started solo, hired a dev and a designer in 2025):
  - Nov 2024: **$1M revenue over the trailing 12 months, about half from one-time (lifetime) licenses.**
  - Apr 2025: "$148K revenue last month, all-time high."
  - Oct 2025: **about $130K to $160K/month**, with the B2B Team plan now more than half of revenue.
  - Dec 2025: **best month, $210K+.**
  - All figures [SELF-REPORTED] — [Tony Dinh on X](https://x.com/tdinh_me/status/1908345028327727335); [imademoneywithai summary](https://imademoneywithai.com/blog/how-much-does-typingmind-make/); [IndieMakerList](https://indiemakerlist.com/revenue/typingmind/)
  - The March 2023 launch reportedly brought in about $10K to $22K in the first week, mostly from lifetime licenses [OLDER] — [startupfounderstories](https://startupfounderstories.com/stories/tony-dinh-typingmind-22k-7-days)
- **Screen Studio** (Adam Pietrasiak, Mac screen recorder):
  - Sold a perpetual license at **$89/device through Lemon Squeezy**, with 1 year of updates.
  - **400 licenses in the first month**; at one point earned more than $3,000/day.
  - An unverified claim of about $200K/month exists.
  - In Oct 2025 it **removed its non-subscription license options** for new buyers (it had a $229 lifetime option).
  - Sources: [openaitoolshub](https://www.openaitoolshub.org/ai-product-research/screen-studio); [AlternativeTo](https://alternativeto.net/news/2025/10/screen-studio-has-removed-their-non-subscription-licensing-options-for-new-customers)
- **Cooldock** (Mac dock utility): **about $6,348 over 30 days at a one-time $15 price**, with no recurring revenue [likely VERIFIED via TrustMRR data, 2026] — [StealWhatWorks](https://stealwhatworks.com/blogs/news/mac-apps-making-real-money-now)
- Older Mac data points:
  - **MacWhisper** about $100K total revenue.
  - **Xnapper** (screenshot beautifier) about $6K/month.
  - **PDF Pals** about $2K/month (AI wrapper with a lifetime license).
  - [OLDER / undated, SELF-REPORTED] — [Startups.email](https://startupsemail.substack.com/p/100000-revenue-with-a-simple-mac)
  - Cindori: $300K cumulative revenue (2021) [OLDER] — [StealWhatWorks](https://stealwhatworks.com/blogs/news/mac-apps-making-real-money-now)

**Boilerplates / starter kits**
- **ShipFast** (Marc Lou, Next.js boilerplate):
  - Lifetime: **$1M+ by end of 2024**, about $1.3M+ all-time — [Dupple review](https://dupple.com/reviews/shipfast)
  - Peak: about **$125K to $133K/month** — [The Builder OS](https://thebuilderos.beehiiv.com/p/marc-lou-crosses-133kmo-simple-nextjs-boilerplate)
  - Decline: sources disagree. One says **about $20K MRR by Dec 2025**, "declined as the Next.js boilerplate market saturated" — [startupfounderstories](https://startupfounderstories.com/stories/marc-lou-shipfast-250k-5-months). Another says it fell to **about $2K/month** — [High Signal](https://www.highsignal.io/boilerplate-revenue-crash/); [aiidelist](https://aiidelist.com/blog/shipfast-revenue-collapse-marc-lou-2026)
- Competitor pricing (no revenue data found): **supastarter** €349 / €799 / €1,499 one-time; **Makerkit** about $299 to $349 lifetime — [mohsindev369 comparison](https://www.mohsindev369.dev/blog/nextjs-saas-boilerplate-comparison-2026); [Makerkit](https://makerkit.dev/)
- A developer who cloned the ShipFast model wrote about "failing spectacularly" — [LukCode](https://www.lukcode.com/blog/how-i-copied-shipfast-boilerplate-and-failed-spectacularly)

**Templates (Notion / Framer) and design plugins**
- Notion templates on Gumroad (modeled from listed prices and visible sales counters, not seller-reported) [ESTIMATE]:
  - **Median lifetime revenue under $520; top 10% above $7,560.**
  - Platform-wide, the **top 1% of Gumroad products capture 77.3% of tracked revenue**, and the top 10% capture 93.8%.
  - Source: [InsightRaider](https://insightraider.com/en/answers/how-much-can-you-make-selling-notion-templates-on-gumroad)
- Thomas Frank: about **$1M in Notion template revenue in 2022** from two templates priced $49 to $179. Business Insider checked the documents, but this creator already had a large YouTube audience [OLDER, VERIFIED] — [search summary of InsightRaider / BI](https://insightraider.com/en/answers/how-much-can-you-make-selling-notion-templates-on-gumroad)
- **Framer Marketplace**:
  - Framer reports **$6.5M paid to creators in 2025**.
  - Creators keep 100% of paid template sales on the marketplace.
  - One creator reported $16.4K (Feb 2025) to $21.7K (Jun 2025) per month; another hit $13,294 in a month; a new seller made **$135 in 38 days**.
  - Creators report the shelf is now "a lot more crowded."
  - Sources: [Framer creators](https://framer.com/creators); [Framer help: Creator Program](https://www.framer.com/help/articles/how-the-creator-program-works/)
- **Figma plugins**: a 2026 blog estimates paid plugins with 500+ installs earn a median of about $200 to $800/month, with top ones at $500 to $5,000/month [ESTIMATE]. One case sold 390+ copies of a $49 plugin-plus-course [OLDER] — [JakeInsight](https://jakeinsight.com/side-income/2026-03-12-create-and-sell-figma-plugins-as-a-developer/); [Prototypr](https://blog.prototypr.io/how-i-made-over-33-000-on-the-figma-plugin-without-writing-a-single-line-of-code-9a5ca50f2cc8?gi=cd27bb9578bb)

**Other formats**
- **Shopify apps**:
  - Middle band of about $2K to $20K MRR; the median paying app is "probably under $1K MRR" [ESTIMATE] — [Taylor Sicard](https://taylorsicard.com/blog/shopify-partner-earnings-benchmarks-2026); [GapQuery](https://www.gapquery.com/blog/how-much-do-shopify-apps-make)
  - Shopify's official terms: **developers keep 100% of the first $1M lifetime gross app revenue** (counted from Jan 1, 2025) and 85% after that — [Shopify.dev revenue share](https://shopify.dev/docs/apps/launch/distribution/revenue-share)
- **VS Code extensions**: indie prices are $9 to $19 one-time or $4 to $8/month. Income of $300 to $4,000/month applies only to the "small share" solving real problems; sponsorships bring $500 to $2,000/month for popular extensions [ESTIMATE] — [JakeInsight](https://jakeinsight.com/side-income/2026-03-25-create-and-sell-vs-code-extensions/); [markaicode](https://markaicode.com/sell-vs-code-extensions-2025/)
- **Discord bots**: premium tiers cost $3 to $10/month per user or $5 to $20/month per server. A forum poster with about 75 servers estimated $50 to $200/month. Top bots in economy, music and AI categories reportedly reach five to six figures/month [ESTIMATE / anecdote] — [discordforge](https://discordforge.org/blog/how-to-monetize-discord-bot-2026); [Latenode community](https://community.latenode.com/t/how-to-monetize-my-discord-bot-and-earn-revenue/29042)
- **Mobile apps (context)**: RevenueCat's 2025 report covers 75,000+ apps and more than $10B revenue; **half of all apps earn under $50/month** — [Subscription Insider on RevenueCat SOSA 2025](https://subscriptioninsider.com/article-type/news/revenuecats-state-of-subscription-apps-2025-report-ais-dominance-retention-challenges-and-the-shift-away-from-pure-subscriptions); [TechRepublic](https://www.techrepublic.com/article/news-apps-revenue-developers/)

### Inferences
- Solo products with the best documented revenue in 2024-2026 attach to a **workflow people already spend hours in every day**: ChatGPT/Claude chat management, X/LinkedIn posting, Gmail outreach, reseller listing automation, screen recording. That is where existing traffic and urgency translate into willingness to pay.
- **AI-adjacent "power-user client" products** monetized fast with lifetime licenses among tech-savvy buyers (TypingMind, BoltAI, Easy Folders, Superpower ChatGPT). The two largest (TypingMind, Screen Studio) later moved toward subscriptions or team plans to keep revenue going.
- Boilerplate revenue depended heavily on the founder's audience (Marc Lou's X following) and appears to have collapsed as the category got crowded and AI coding agents made "starter code" less valuable. Treat boilerplates as a **declining category** for a newcomer with no audience.
- Template marketplaces have the most extreme power law: the median is a few hundred dollars lifetime.

### Gaps
- No per-category breakdown from TrustMRR/Scoutr was retrievable. Scoutr ranks categories by share earning $1K+/month, but the numbers were not visible in search snippets.
- No reliable revenue data was found for:
  - CLI tools (paid CLIs are rare and undocumented).
  - Alfred workflows.
  - Raycast extensions (no paid channel exists).
  - Notion Marketplace sales specifically.
- The search found no Lemon Squeezy or Gumroad creator revenue distribution reports for 2025-2026.
- Many headline extension figures (GMass, Closet Tools, CSS Scan, GoFullPage) are from 2019-2021 and have not been re-verified.

---

## 2. Which product formats have the shortest time-to-first-dollar for an unknown solo builder with no audience?

### Takeaway
The fastest documented first dollar comes from formats where the buyer searches a marketplace and can pay inside the product. The best example is a **freemium Chrome extension with an in-extension paywall**: first paid users have been reported within 1 day of publishing, and Easy Folders reached $3.7K MRR in 6 months. **Template marketplaces** are next fastest. However:
- Chrome Web Store discovery for a new listing is "essentially zero" until reviews build up.
- The median extension has about 13 users.

So speed depends on picking a niche where people are *searching* for the tool. Boilerplates, micro-SaaS and desktop apps documented as fast successes (ShipFast, TypingMind, BoltAI, Screen Studio) mostly relied on an X audience or a viral launch.

### Cited Findings
- **Chrome Web Store user distribution** (the two counts below come from different samples and conflict, so the store's size is uncertain):
  - **86.3% of extensions have under 1,000 users**; only 337 (0.24%) exceed 1M users. Store size is cited as 137,345 in one place and about 111,933 in another — [electroiq / nichecheck via search](https://nichecheck.com/blog/browser-extension-market); [aboutchromebooks](https://www.aboutchromebooks.com/chrome-extension-ecosystem/)
  - An October 2026 sample of 2,947 listings found the **median extension has 13 users**, only about 9% reach 1,000 users, and the top 1% hold about 80.5% of all users — [DEV Community (ExtensionBooster)](https://dev.to/extensionbooster/chrome-extension-usage-statistics-the-median-is-13-users-2689)
- First-sale anecdotes:
  - **NoTab** extension got its **first paying user one day after publishing** on the Chrome Web Store [SELF-REPORTED, anecdote] — [DEV Community](https://dev.to/_af1eb8cb8faab148e10b3c/how-i-built-a-chrome-extension-in-3-days-and-got-paying-users-the-day-after-launch-47o0)
  - An Indie Hackers founder two days after launch: "the Chrome Web Store listing is new, so discoverability there is essentially zero until reviews and ratings build up." They skipped a waitlist and beta testers — [Indie Hackers](https://www.indiehackers.com/post/two-days-after-launch-almost-no-one-has-shown-up-heres-the-full-picture-2ac9d5a5f5)
  - A first Chrome extension launched on Product Hunt got **4 upvotes** — [Indie Hackers](https://www.indiehackers.com/post/shipped-my-first-chrome-extension-launched-on-product-hunt-2-days-ago-got-4-upvotes-heres-what-i-learned-b08dc828a2)
  - An email-rewriting extension promoted for weeks on Reddit and X with "almost no installs" eventually got a stranger to buy a lifetime plan (via an aggregator; unverified) — [holo.stream](https://holo.stream/item/2026-10-03/f298950fcab1/)
- **Freemium extension conversion benchmarks** (sources vary):
  - 0.5% to 2% typical — [Kromio](https://kromio.ai/learn/monetize-chrome-extension)
  - 1% to 5% — [Chrome Goldmine](https://chromegoldmine.com/blog/chrome-extension-monetization/)
  - **2% to 4% average across 7 paid extensions**, with **reverse trials lifting conversion about 60%** compared with no trial [SELF-REPORTED] — [DEV Community](https://dev.to/ktg0215/monetizing-chrome-extensions-with-freemium-real-numbers-from-7-paid-extensions-5cj)
- Fast-revenue cases tied to building quickly:
  - Superpower ChatGPT: built in a weekend → 5-figure MRR — [Indie Hackers](https://www.indiehackers.com/post/tech/building-a-free-chrome-extension-in-3-days-and-turning-it-into-a-5-figure-mrr-ecosystem-3rIbjigZxiFsrgqJjJYp)
  - Easy Folders: **$42K lifetime in 6 months** — [small-start.com](https://small-start.com/en/cases/global-6-months-post-launch-my-chrome-extension-has-h/)
  - SuperX: **$23K MRR at 6 months** — [StealWhatWorks](https://stealwhatworks.com/blogs/news/chrome-extensions-over-10k-month-now)
- Fast launches that relied on an audience:
  - BoltAI's growth is credited to **going viral on X** — [Indie Hackers](https://www.indiehackers.com/post/how-going-viral-on-x-helped-this-solopreneur-reach-15k-mo-with-his-native-ai-apps-ZBbFBKrpwqZQkQsy7Bcs)
  - Tony Dinh grew from 100 to 180K+ X followers before and during TypingMind — [Supabird](https://supabird.io/articles/from-100-to-180k-followers-tony-dinh-s-twitter-x-growth-tactics-that-still-work-in-2026)
  - Analyses attribute ShipFast's growth to Marc Lou's marketing and X presence — [High Signal](https://www.highsignal.io/how-marc-lou-makes-millions-from-great-marketing/); [Indie Hackers](https://www.indiehackers.com/post/marc-louvion-s-unconventional-approach-to-marketing-that-grew-ship-fast-to-43k-monthly-revenue-in-2-months-6163fb113f)
  - Screen Studio sold 400 licenses in its first month — [openaitoolshub](https://www.openaitoolshub.org/ai-product-research/screen-studio)
- Template sellers with no audience:
  - A new Framer seller made **$135 in 38 days** — [Framer creators page / search](https://framer.com/creators)
  - "How I made $250 selling Notion templates" is typical of low-end outcomes — [The Mindful Planner](https://themindfulplanner.substack.com/p/how-i-made-250-selling-notion-templates)
- **Microsoft Store** (Windows):
  - Since **Sept 2025, registration is free for individual developers** in about 200 markets, and non-game apps can use their own payments and keep 100% of revenue.
  - Microsoft claims 250M+ monthly users.
  - Testimonials (not audited): one publisher saw daily installs grow 10x; **backiee** saw daily active users rise from 10K to 40K and revenue grow 6x.
  - Source: [Windows Developer Blog](https://blogs.windows.com/windowsdeveloper/2025/09/10/free-developer-registration-for-individual-developers-on-microsoft-store/)

### Inferences
- **The fastest realistic path to a first dollar with no audience:** a Chrome extension (or Edge/Firefox port) that:
  - targets a query people already type into the Chrome Web Store (e.g., "ChatGPT folders," "export ChatGPT," "LinkedIn post formatter");
  - is free to install, has a hard but fair limit, and uses a reverse trial;
  - charges $5 to $9/month or $29 to $49 lifetime.

  At a 2% to 4% conversion rate, the first sale needs roughly 25 to 50 active users. That is plausible within days to weeks if the niche has search volume, and impossible if it does not.
- Templates (Framer/Notion) are the fastest to *build*, but because the market is so crowded, sales for a no-name seller are typically tens to hundreds of dollars in the first month.
- Desktop utilities and micro-SaaS can earn quickly *only* with a launch event (an X thread going viral, a Product Hunt top 5, a Hacker News front page, an r/macapps post). With no audience, that is a lottery rather than a plan.
- The Microsoft Store is an underused discovery channel for Windows utilities (free listing, keep 100% with your own payment processor). However, the revenue evidence is limited to Microsoft's own testimonials.

### Gaps
- No dataset was found measuring median days-to-first-sale by format. All first-sale evidence is anecdotal.
- No reliable data was found on Gumroad Discover's share of sales for software or templates from new sellers.

---

## 3. Which formats rely on a marketplace with built-in discovery, and which need outside marketing?

### Takeaway
Marketplaces with **both discovery and a payment path** are the Chrome Web Store (with third-party payments), the Shopify App Store, the Framer Marketplace, Gumroad Discover, the Mac App Store and the Microsoft Store. VS Code Marketplace, Raycast Store and Obsidian community plugins provide discovery but **no native payments**, and their users expect free tools. They work as top-of-funnel channels feeding a license-key sale, which converts poorly. Boilerplates, micro-SaaS and directly sold Mac apps have no marketplace discovery and depend on X, Reddit, Product Hunt or SEO.

### Cited Findings
- **Chrome Web Store**:
  - Huge discovery, but Google discontinued its native payments in 2021, so developers must use ExtensionPay, Stripe, Lemon Squeezy and similar — [MicroGaps](https://www.microgaps.com/gaps/chrome-extension-monetization-sdk-gap)
  - ExtensionPay's fee is reported both as 0% up to $1,500/month then 2%, and as a flat 5% plus Stripe (sources conflict) — [MicroGaps](https://www.microgaps.com/gaps/chrome-extension-monetization-sdk-gap); [konabayev](https://konabayev.com/blog/extension-monetization-statistics-2026/)
- **Shopify App Store**: discovery through merchant search; **100% of the first $1M lifetime revenue goes to the developer, then 85%**. Only revenue earned since Jan 1, 2025 counts toward the $1M — [Shopify.dev](https://shopify.dev/docs/apps/launch/distribution/revenue-share)
- **VS Code Marketplace**: **no paid listings or built-in payment processing** (the only options are Free and Free Trial). The common pattern is a free core extension in the Marketplace with a license key sold through Gumroad, Paddle or similar — [DodoPayments](https://dodopayments.com/blogs/sell-vscode-extensions); [JakeInsight](https://jakeinsight.com/side-income/2026-03-25-create-and-sell-vs-code-extensions/)
- **Raycast Store**: all Store extensions are free to install and the extensions repo is MIT-licensed. Raycast earns money from its own Pro subscription ($8/month billed annually). **No paid-extension mechanism was found** — [Raycast blog: Introducing Pro](https://raycast.com/blog/introducing-raycast-pro); [unsubbed](https://unsubbed.pages.dev/tools/raycast-extensions/)
- **Obsidian community plugins**:
  - The directory FAQ defines **Free / Optional payment / Paid** labels, and payment is handled by the developer — [Obsidian docs FAQ](https://docs.obsidian.md/community-directory/faq); [Obsidian forum](https://forum.obsidian.md/t/paid-plugin-market-and-how-to-solve-unmaintained-plugins/109137)
  - A blog claims the source code must stay public on GitHub, which weakens license-key enforcement (not checked against the official policy) — [devtake](https://devtake.pages.dev/article/obsidian-plugin-marketplace-future)
  - One developer shipped a paid plugin with a one-time Pro license verified offline (Ed25519 signature) — [Indie Hackers](https://www.indiehackers.com/post/i-shipped-a-paid-obsidian-plugin-with-no-server-no-subscription-and-offline-licensing-0a87e1f23c)
- **Figma Community**: sources conflict on whether Figma takes 15% or nothing. A 2025 forum thread suggests native paid publishing is limited to accepted publishers — [Kelviq](https://www.kelviq.com/blog/figma-plugin-monetization/); [Figma forum](https://forum.figma.com/ask-the-community-7/can-plugins-still-use-figma-native-payments-monetization-54336)
- **Framer Marketplace**: built-in discovery; creators keep 100% of template sales; 50% commission on referrals — [Framer help](https://www.framer.com/help/articles/how-the-creator-program-works/); [AlternativeTo](https://alternativeto.net/news/2025/3/framer-launches-a-new-dashboard-for-framer-creators-to-track-earnings-and-insights)
- **Gumroad**: **10% + $0.50 on direct sales; 30% on Discover sales**. It has been the merchant of record (handles sales tax/VAT) since Jan 1, 2025 — [checkoutpage](https://checkoutpage.com/blog/gumroad-fees); [Dodo Payments](https://dodopayments.com/blogs/gumroad-fees-explained)
- **Lemon Squeezy** was acquired by Stripe in 2024; one comparison suggests its roadmap has slowed (single secondhand claim) — [hackceleration](https://hackceleration.com/labs/switch/gumroad)
- **Microsoft Store**: free individual registration; keep 100% when using your own payments for non-game apps; 250M+ monthly users (Microsoft's claim) — [Windows Developer Blog](https://blogs.windows.com/windowsdeveloper/2025/09/10/free-developer-registration-for-individual-developers-on-microsoft-store/)
- **Mac App Store vs direct**:
  - Much of the indie Mac market sells outside the Mac App Store (Paddle, Lemon Squeezy, Gumroad), so public data is thin — [StealWhatWorks](https://stealwhatworks.com/blogs/news/mac-apps-making-real-money-now)
  - Screen Studio sold directly through Lemon Squeezy — [openaitoolshub](https://www.openaitoolshub.org/ai-product-research/screen-studio)
  - Setapp pays developers based on user activity — [Wikipedia: Setapp](https://en.wikipedia.org/wiki/Setapp)
- **Discord**: an official App Subscriptions system exists. The platform fee is reported as 10% in one source and 15%/30% in another (conflict) — [space-node](https://space-node.net/blog/discord-bot-monetisation-guide-2026); [Monaco CPA](https://www.monacocpa.cpa/post/discord-server-income-taxes-subscriptions)
- **AppSumo** (lifetime-deal marketplace) brings a burst of buyers but takes typically 50% (older figure) — [Wikipedia: AppSumo](https://en.wikipedia.org/wiki/AppSumo)

### Inferences
- Discovery and payment combined:

  | Strength | Channels |
  |---|---|
  | Strongest | Shopify App Store (merchants expect to pay; 0% fee); Chrome Web Store (huge reach; payments are DIY but easy) |
  | Moderate | Framer Marketplace; Microsoft Store; Gumroad Discover (30% fee) |
  | Weak | VS Code; Raycast; Obsidian; Figma (users expect free) |
- For a builder with no audience, the store's search box effectively *is* the marketing. The niche must be chosen by store search demand, not by the builder's own interests.

### Gaps
- No Raycast, Obsidian or VS Code download-to-paid conversion data was found.
- No data was found on the Notion Template Marketplace's built-in discovery performance.
- No current Mac App Store indie revenue data was found.

---

## 4. Which pricing models work best for solo software in 2026?

### Takeaway
The evidence supports a **hybrid**: a lifetime or perpetual license at launch (it converts tech-savvy, subscription-weary buyers quickly), plus a subscription for ongoing costs (AI, sync) and team plans. Typical price points:
- **Extensions:** $5 to $9/month, or $29 to $49 lifetime.
- **Mac utilities:** $15 to $99 one-time.
- **Boilerplates:** $199 to $349 one-time.

Two of the most successful solo products started one-time and later moved weight to subscriptions: TypingMind (team plan now more than 50% of revenue) and Screen Studio (dropped one-time licenses in Oct 2025). This is the clearest counter-signal to "one-time only."

### Cited Findings
- **RevenueCat State of Subscription Apps 2025**:
  - **35% of apps now mix subscriptions with consumables or lifetime purchases**, and the share is growing.
  - Coverage reports that hybrid apps see stronger revenue and retention.
  - Source: [Subscription Insider](https://subscriptioninsider.com/article-type/news/revenuecats-state-of-subscription-apps-2025-report-ais-dominance-retention-challenges-and-the-shift-away-from-pure-subscriptions); [RevenueCat launch post](https://www.revenuecat.com/blog/company/the-state-of-subscription-apps-2025-launch)
- **TypingMind**: about half of revenue came from one-time licenses in Nov 2024; by Oct 2025 the Team subscription was more than half — [imademoneywithai](https://imademoneywithai.com/blog/how-much-does-typingmind-make/)
- **BoltAI**: perpetual license with limited updates; users keep the last version after updates lapse; about $15K to $30K/month — [BoltAI pricing](https://boltai.com/pricing); [Indie Hackers](https://www.indiehackers.com/post/cRvgt7fySrr3M76MSVas)
- **Screen Studio**: $89 perpetual license per device, then **removed non-subscription options for new customers in Oct 2025** — [AlternativeTo](https://alternativeto.net/news/2025/10/screen-studio-has-removed-their-non-subscription-licensing-options-for-new-customers)
- **Cooldock**: $15 one-time; about $6.3K in 30 days — [StealWhatWorks](https://stealwhatworks.com/blogs/news/mac-apps-making-real-money-now)
- **Mac menu-bar utility pricing**: IndieBar and Notch Revenue at $19.99 one-time; Orbl Premium one-time; TokenBar at $5/month or $15 lifetime — [productdirs](https://productdirs.com/projects/indiebar-revenue-tracker); [Orbl](https://www.orbl.app/blog/best-mrr-menu-bar-apps)
- **Easy Folders**: $9/month subscription; $3.7K MRR — [small-start.com](https://small-start.com/en/cases/global-6-months-post-launch-my-chrome-extension-has-h/)
- **VS Code extensions**: $9 to $19 one-time or $4 to $8/month is standard — [JakeInsight](https://jakeinsight.com/side-income/2026-03-25-create-and-sell-vs-code-extensions/)
- **Boilerplates**: supastarter €349 to €1,499 one-time; Makerkit about $299 to $349 lifetime — [mohsindev369](https://www.mohsindev369.dev/blog/nextjs-saas-boilerplate-comparison-2026)
- **Consumer subscription fatigue** (general consumers, mostly streaming, not software):
  - Deloitte 2025: 47% of consumers feel they overpay for streaming — [Adapty](https://adapty.io/glossary/subscription-fatigue/)
  - Recurly 2025: **71% cite price increases** as the top reason they leave — [DiJulius Group](https://thedijuliusgroup.com/022526-subscription-fatigue-customer-churn-broken-promises/)
- An unverified secondary claim says RevenueCat found **lifetime value per user 4 to 5x higher for recurring than one-time models** — [appopportunity](https://appopportunity.com/blog/indie-app-revenue-models-2026)
- **Lifetime deals** (AppSumo):
  - One founder made **$50K from a first AppSumo campaign** and used it as runway — [SaaS Club](https://saasclub.io/playbooks/george-georgiadis-lifetime-deals-framework/)
  - The cost that "kills solo LTD campaigns is the hours, not the economics" — [Favors.dev](https://favors.dev/blog/appsumo-lifetime-deals-worth-it)
  - Buyers complain when features later move behind "Pro" tiers — [Trustpilot](https://se.trustpilot.com/review/appsumo.com)
- **Discord bots**: $3 to $10/month per user; $5 to $20/month per server — [discordforge](https://discordforge.org/blog/how-to-monetize-discord-bot-2026)

### Inferences
- For a product with **no server costs** (a local desktop utility, a client-side extension), a one-time license of **$15 to $49** works well. It suits buyers who resist subscriptions, has no churn to manage, and is cheap to support. Charge for major-version upgrades or "1 year of updates."
- For anything with **variable costs** (an AI API, sync, scraping), use a subscription or a "bring your own key" design. Otherwise lifetime buyers become a liability, which is the AppSumo failure pattern.
- Evidence that "subscription fatigue" creates demand specifically for one-time *software* is anecdotal; the survey data is about streaming. The strongest real-world signal is that lifetime licenses drove early sales for TypingMind, BoltAI and Screen Studio.
- "Pay what you want" pricing: **no 2024-2026 revenue evidence found** (see Gaps).

### Gaps
- No primary data was found comparing conversion of one-time and subscription pricing for desktop or extension software.
- No 2024-2026 data was found on pay-what-you-want results for software.
- The full RevenueCat report could not be retrieved, so its hybrid-model figures are second-hand.

---

## 5. What are the common failure patterns?

### Takeaway
The dominant failure is **no distribution, not bad code**:
- 54% of verified indie startups earn $0, and 23% never take a single payment.
- The median Chrome extension has 13 users.
- Template marketplaces are extreme power laws.

Secondary failures:
- **Category saturation** (boilerplates, Framer templates).
- **Platform risk** (Manifest V3 broke ad blockers and privacy tools; Chrome Web Store payments ended in 2021; host sites change their pages and break extensions).
- **Support and cost burden from lifetime deals.**
- **Churn**: 31% of startups took payments and then stopped.

### Cited Findings
- **No demand or no distribution**:
  - 54% at $0/month; 23.3% never took a payment; 30.7% took payments then stopped — [Scoutr report](https://www.scoutr.dev/blog/indie-startup-revenue-report); [Scoutr mortality](https://www.scoutr.dev/blog/startup-mortality-report)
  - Median Chrome extension: 13 users — [DEV Community](https://dev.to/extensionbooster/chrome-extension-usage-statistics-the-median-is-13-users-2689)
  - TimeYourWeb: 20K users but only $60 MRR, so free users ≠ revenue — [Indie Hackers](https://www.indiehackers.com/post/i-built-a-chrome-extension-in-2-weeks-10-years-later-20-000-users-10-paying-customers-60-mrr-YaK5THoaKqXgTlgBjHgO)
  - 5 extensions earning $180/month combined — [DEV Community](https://dev.to/_350df62777eb55e1/real-numbers-freemium-chrome-extension-monetization-after-6-months-5hga)
  - Product Hunt launch with 4 upvotes — [Indie Hackers](https://www.indiehackers.com/post/shipped-my-first-chrome-extension-launched-on-product-hunt-2-days-ago-got-4-upvotes-heres-what-i-learned-b08dc828a2)
- **Saturation**:
  - ShipFast fell from about $125K/month to about $2K to $20K/month as "the Next.js boilerplate market saturated"; the market is "flooded with boilerplates for every major tech stack" — [High Signal](https://www.highsignal.io/boilerplate-revenue-crash/); [startupfounderstories](https://startupfounderstories.com/stories/marc-lou-shipfast-250k-5-months)
  - A ShipFast clone "failed spectacularly" — [LukCode](https://www.lukcode.com/blog/how-i-copied-shipfast-boilerplate-and-failed-spectacularly)
  - Framer creators report sales redistributing away from big names and a "more crowded" shelf — [Framer community / search](https://framer.com/creators)
- **Manifest V3** (Chrome's 2024-25 extension platform overhaul):
  - Fails to preserve extensions that need to block web requests (cookie managers, authentication tools, some blockers) — [Springer 2026](https://link.springer.com/article/10.1007/s42979-026-05362-1)
  - Some developers chose Firefox-only or shut down — [SciTePress 2025](https://www.scitepress.org/Papers/2025/136690/136690.pdf)
  - uBlock Origin (about 40M Chrome users at peak) cannot be rebuilt in full — [iplocation](https://www.iplocation.net/blog/how-manifest-v3-is-reshaping-the-browser-extension-ecosystem-in-2026)
  - **No hard revenue-impact data exists** — [arXiv MV3 privacy vs profit](https://arxiv.org/pdf/2503.01000)
- **Platform payments removed**: Chrome Web Store payments ended in 2021 — [MicroGaps](https://www.microgaps.com/gaps/chrome-extension-monetization-sdk-gap)
- **Ownership-transfer and malware ecosystem**:
  - Buyers reportedly offer about **$0.20 per user** for extensions, often to exploit those users — [ExtensionBooster](https://extensionbooster.net/blog/chrome-extension-ownership-transfer-sell-extension-security-guide/)
  - Socket tied 19 extensions to wallet-drainer code, mostly through acquisitions — [Socket](https://www.socket.dev/blog/chrome-edge-extension-wallet-drainer)
  - The Chrome Web Store has offered Verified CRX Uploads since May 2025 — [ExtensionBooster](https://extensionbooster.net/blog/chrome-extension-ownership-transfer-sell-extension-security-guide/)
  - Implication: selling a small extension is mostly a low-value, reputationally risky exit.
- **Lifetime-deal support burden**: support tickets "answered in weeks, not hours"; LTD buyers' usage keeps costing money long after the cash is spent — [f3fundit](https://f3fundit.com/appsumo-lifetime-deals-worth-it-or-revenue-killer/); [SaaS Club](https://saasclub.io/playbooks/george-georgiadis-lifetime-deals-framework/)
- **Shopify apps**: "MRR is not profit," since support, agency and ad costs cut into margins — [AdsX](https://adsx.com/blog/how-much-shopify-app-developers-make)
- **Low willingness to pay in developer marketplaces**: "most solo VS Code extensions won't make significant direct revenue" — [solodevstack](https://solodevstack.com/blog/how-to-build-vscode-extension-solo-developer); [Indie Hackers: Have you paid for a VSCode extension?](https://www.indiehackers.com/post/have-you-paid-for-a-vscode-extension-4b84a5e762)

### Inferences
- **Extensions that depend on a host site's page structure** (ChatGPT, X, LinkedIn) carry two risks:
  - Breakage whenever the host redesigns, which creates support burden.
  - The host shipping the feature natively, which wipes out demand (e.g., chat folders/projects).

  Mitigate by supporting several hosts (ChatGPT + Claude + Gemini) and keeping the product small enough to fix quickly.
- "Built for indie hackers" products (boilerplates, MRR trackers, launch tools) face crowded markets and audiences who are themselves builders. Products aimed at *non-developer professionals* with clear return on investment (resellers, recruiters, salespeople, creators) show stronger, longer-lasting revenue (GMass, Closet Tools, SuperX).

### Gaps
- No quantified data was found on support hours per format.
- No quantified revenue loss from MV3 for paid indie extensions.
- No data on refund rates by format.

---

## 6. Under the user's new hard constraint (sell only through an established marketplace with native payments and discovery), which formats qualify, and what seller revenue evidence exists?

> The coordinator added this constraint after sections 1-5 were researched. The web search budget for this session (shared across agents) ran out right after it arrived, so **no new searches could be run** on Superhive/Blender Market, Fab, Unity Asset Store, JetBrains Marketplace, Atlassian Marketplace, Steam (software), itch.io or Webflow. Everything below is re-weighted from evidence already gathered. Marketplaces with no gathered evidence are listed in the Gaps sub-section and are **not** treated as proven.

### Takeaway
Of the formats with real revenue evidence, only some are sold *inside* a trusted marketplace's own checkout:
- Shopify App Store
- Microsoft Store
- Mac App Store
- Framer Marketplace
- Gumroad (Discover)
- Discord App Subscriptions
- AppSumo
- Figma Community (only partly; paid publishing appears limited)

The highest-revenue solo format found in sections 1-5, Chrome extensions, **fails the strict constraint**: the Chrome Web Store has had no native payments since 2021. The same goes for VS Code, Raycast, Obsidian, boilerplates and directly sold Mac apps.

Ranking marketplace-native formats by documented willingness to pay gives two top choices:
1. **Shopify App Store apps:** merchants pay monthly; 0% fee on the first $1M.
2. **Windows/Mac desktop utilities on the Microsoft Store or Mac App Store:** one-time paid listings; the Microsoft Store has been free to join since Sept 2025.

Framer templates and Gumroad Discover come next. They are faster to build but are extreme power laws.

### Cited Findings

**Formats that satisfy the constraint (native checkout + discovery), with the seller evidence gathered**

- **Shopify App Store: satisfies.**
  - **Developers keep 100% of the first $1M lifetime gross app revenue, then 85%.** Only revenue earned from Jan 1, 2025 counts toward the threshold — [Shopify.dev](https://shopify.dev/docs/apps/launch/distribution/revenue-share)
  - Seller revenue estimates: a "solid middle band" of $2K to $20K MRR; the median paying app is probably under $1K MRR [ESTIMATE] — [Taylor Sicard](https://taylorsicard.com/blog/shopify-partner-earnings-benchmarks-2026); [GapQuery](https://www.gapquery.com/blog/how-much-do-shopify-apps-make)
  - Support, agency and ad costs cut into margins — [AdsX](https://adsx.com/blog/how-much-shopify-app-developers-make)
- **Microsoft Store (Windows apps): satisfies.**
  - **Free registration for individual developers since Sept 2025**, in about 200 markets.
  - Non-game apps may also use their own payment system and keep 100%.
  - Microsoft claims 250M+ monthly users.
  - Microsoft-selected testimonials: one publisher saw 10x daily installs; **backiee** saw daily active users go from 10K to 40K and revenue grow 6x.
  - Source: [Windows Developer Blog](https://blogs.windows.com/windowsdeveloper/2025/09/10/free-developer-registration-for-individual-developers-on-microsoft-store/)
  - One article reports a 95% developer share for direct-link downloads and 85% for in-Store discovery (unconfirmed, inconsistently worded) — [Appetiser](https://appetiser.com.au/blog/microsoft-store-revenue-now-gives-developers-a-95-cut-on-one-condition/)
  - A critical blog argues the Store fails indie developers; its evidence is a game, not a utility — [Dreamsaga](https://dreamsaga.net/the-1-4-billion-user-paradox-why-the-microsoft-store-is-failing-indie-developers/)
- **Mac App Store: satisfies.**
  - Apple's commission is cited at 15% to 30% — [Froxi](https://froxi.ai/blog/how-much-money-do-indie-apps-actually-make-in-2026); [AppOpportunity](https://appopportunity.com/blog/indie-app-revenue-models-2026)
  - Public data for indie Mac revenue is thin, partly because much of the market sells outside the Mac App Store — [StealWhatWorks](https://stealwhatworks.com/blogs/news/mac-apps-making-real-money-now)
  - Mac utility revenue figures that show demand for the *category* (most were sold directly, not through the App Store):
    - Cooldock about $6.3K/30 days at $15 one-time — [StealWhatWorks](https://stealwhatworks.com/blogs/news/mac-apps-making-real-money-now)
    - Xnapper about $6K/month; MacWhisper about $100K total — [Startups.email](https://startupsemail.substack.com/p/100000-revenue-with-a-simple-mac)
    - BoltAI $15K to $30K/month — [Indie Hackers](https://www.indiehackers.com/post/how-going-viral-on-x-helped-this-solopreneur-reach-15k-mo-with-his-native-ai-apps-ZBbFBKrpwqZQkQsy7Bcs)
- **Setapp (Mac subscription bundle): satisfies** as a marketplace, but pays developers by user activity rather than per sale — [Wikipedia: Setapp](https://en.wikipedia.org/wiki/Setapp)
- **Framer Marketplace (website templates): satisfies.**
  - **$6.5M paid to creators in 2025**; creators keep 100% of marketplace template sales.
  - Top creators reported $13.3K to $21.7K/month in 2025; a new seller made $135 in 38 days.
  - Creators report a more crowded shelf.
  - Source: [Framer creators](https://framer.com/creators); [Framer help](https://www.framer.com/help/articles/how-the-creator-program-works/)
- **Gumroad (Discover): satisfies.**
  - **30% fee on Discover-originated sales**; 10% + $0.50 on direct sales; merchant of record since Jan 1, 2025 — [checkoutpage](https://checkoutpage.com/blog/gumroad-fees); [Dodo Payments](https://dodopayments.com/blogs/gumroad-fees-explained)
  - Seller outcomes: Notion templates have a modeled **median under $520 lifetime**, top 10% above $7,560; the top 1% of products take 77.3% of revenue [ESTIMATE] — [InsightRaider](https://insightraider.com/en/answers/how-much-can-you-make-selling-notion-templates-on-gumroad)
- **Discord App Subscriptions (premium bots): satisfies.**
  - The fee is reported as 10% or as 15%/30% (sources conflict).
  - Typical premium pricing is $3 to $10/month; a small bot earns about $50 to $200/month.
  - Source: [space-node](https://space-node.net/blog/discord-bot-monetisation-guide-2026); [Monaco CPA](https://www.monacocpa.cpa/post/discord-server-income-taxes-subscriptions); [Latenode](https://community.latenode.com/t/how-to-monetize-my-discord-bot-and-earn-revenue/29042)
- **AppSumo (lifetime-deal marketplace): satisfies.**
  - The cut is typically 50% (older figure) — [Wikipedia: AppSumo](https://en.wikipedia.org/wiki/AppSumo)
  - One founder made $50K from a first campaign — [SaaS Club](https://saasclub.io/playbooks/george-georgiadis-lifetime-deals-framework/)
  - Support burden is heavy — [Favors.dev](https://favors.dev/blog/appsumo-lifetime-deals-worth-it)
- **Figma Community (paid plugins): only partly satisfies.**
  - Native paid publishing appears limited to accepted publishers (2025 forum thread) — [Figma forum](https://forum.figma.com/ask-the-community-7/can-plugins-still-use-figma-native-payments-monetization-54336)
  - The fee is cited as 15% or as nothing (conflict) — [Kelviq](https://www.kelviq.com/blog/figma-plugin-monetization/)
  - Estimated median for paid plugins is $200 to $800/month — [JakeInsight](https://jakeinsight.com/side-income/2026-03-12-create-and-sell-figma-plugins-as-a-developer/)

**Formats that fail the strict constraint**
- **Chrome Web Store extensions: no native payments since 2021.** Sellers use ExtensionPay, Stripe or Lemon Squeezy checkouts — [MicroGaps](https://www.microgaps.com/gaps/chrome-extension-monetization-sdk-gap)
- **VS Code Marketplace: no paid listings or payment processing** — [DodoPayments](https://dodopayments.com/blogs/sell-vscode-extensions)
- **Raycast Store: all extensions are free**; no paid channel found — [unsubbed](https://unsubbed.pages.dev/tools/raycast-extensions/)
- **Obsidian community directory: payment is handled by the developer**, not the directory — [Obsidian forum](https://forum.obsidian.md/t/paid-plugin-market-and-how-to-solve-unmaintained-plugins/109137)
- **Boilerplates, micro-SaaS on the builder's own domain, and directly sold Mac apps** (ShipFast, TypingMind, BoltAI, Screen Studio through Lemon Squeezy) are sold on personal sites — [openaitoolshub](https://www.openaitoolshub.org/ai-product-research/screen-studio); [Dupple](https://dupple.com/reviews/shipfast)

### Inferences
- **A hybrid "partial" option:** list a free extension or plugin in the Chrome Web Store, VS Code Marketplace or Obsidian directory for discovery, and sell the Pro license key as a **Gumroad product**. The buyer then pays inside an established marketplace's checkout (Gumroad is merchant of record) rather than an unknown site, and the free listing provides discovery. Whether this satisfies the user's constraint is their call; it should be presented as "partial."
- Moving from "highest documented solo revenue" to "marketplace-native" means giving up the best-evidenced format (Chrome extensions) in exchange for:
  - **Shopify**: the strongest willingness to pay, but slower to build and the heaviest support burden.
  - **Microsoft Store / Mac App Store**: one-time paid desktop utilities. The revenue evidence comes mostly from Mac apps sold *outside* the store, so store-specific revenue is unproven.
- The Microsoft Store change (free listing; keep 100% with your own payments, or use Store payments) makes Windows utilities the **cheapest marketplace-native test** for a solo builder. A paid listing can be live within days, and app-store-style discovery exists. The caveat is that store revenue evidence is limited to Microsoft's own testimonials.

### Gaps
- **Not researched (search budget exhausted).** These marketplaces have native paid listings according to general background knowledge, but **no revenue data, fee terms or seller cases were gathered in this session.** Each needs a follow-up search before the final report relies on it:
  - Superhive (formerly Blender Market): Blender add-ons.
  - Fab (Epic's Unreal/asset marketplace).
  - Unity Asset Store: editor tools and extensions.
  - JetBrains Marketplace: paid IDE plugins with JetBrains-handled licensing.
  - Atlassian Marketplace: Jira/Confluence apps. Search results surfaced a StealWhatWorks article titled "Which Atlassian apps are making real money now?", but its content was not retrieved: [link](https://stealwhatworks.com/blogs/news/atlassian-apps-making-real-money-now).
  - Steam software/utilities (non-game tools on Steam).
  - itch.io: tools and assets.
  - Webflow template marketplace.
  - Notion's own Template Marketplace (paid templates).

  Background knowledge, **not verified this session**, suggests these follow-ups are worth prioritizing: Steam has notable solo-built PC utilities (e.g., Lossless Scaling); Unity Asset Store and Fab editor tools are a known niche for solo developers; JetBrains Marketplace and Atlassian Marketplace serve B2B buyers who pay for plugins.
- No Mac App Store-specific or Microsoft Store-specific revenue figures were found for solo utility developers.

---

## 7. What this means for picking a product

### Takeaway
Two scenarios:
- **Without the marketplace constraint**, the evidence favors a freemium Chrome/Edge extension attached to a high-traffic AI or professional web app ($5 to $9/month or $29 to $49 lifetime), with a one-time desktop utility second.
- **With the user's hard constraint** (sale through an established marketplace's native checkout), the best-supported choices are:
  1. A **narrow-pain Shopify app**: strongest willingness to pay, 0% fee up to $1M, but slower and support-heavy.
  2. A **small paid Windows utility on the Microsoft Store**, optionally also on the Mac App Store: free to list, can ship in days, one-time $5 to $30; store-specific revenue unproven.
  3. A **Framer template** or a **Gumroad Discover product**: fastest to build, extreme power law.

A Chrome extension can only partly qualify, through a Gumroad-sold license.

**Constraint flag key:**
- **✅** sold inside a marketplace's native checkout with discovery.
- **◐** partial (discovery in a store, payment through Gumroad or limited native payments).
- **❌** requires the builder's own site or checkout.

### Ranked product formats

**(a) Speed to first sale with no audience** (fastest first; directional, based on anecdotes)

| # | Format | Constraint | Evidence |
|---|---|---|---|
| 1 | Chrome extension, freemium + paywall | ❌ (◐ if license sold via Gumroad) | First paid user in 1 day reported; Easy Folders $42K in 6 months; but median extension has 13 users |
| 2 | Framer template | ✅ | Built in days; new seller $135 in 38 days |
| 3 | Gumroad Discover digital product (templates, code assets) | ✅ | Discover gives exposure at a 30% fee; median low |
| 4 | Windows utility, paid on Microsoft Store | ✅ | Free listing since Sept 2025; store discovery; thin revenue proof |
| 5 | Mac utility on Mac App Store | ✅ | Store discovery; 15% to 30% cut; category demand proven mostly off-store |
| 6 | Mac utility sold direct | ❌ | Needs a launch moment (Screen Studio: 400 licenses in month one) |
| 7 | Shopify app | ✅ | App Store search plus merchants who expect to pay; build and review take weeks |
| 8 | Discord premium app | ✅ | Bot-list and directory discovery; very low revenue per user |
| 9 | VS Code / Obsidian / Raycast / Figma plugin | ❌ / ◐ (Figma limited; others via Gumroad license) | Users expect free |
| 10 | Micro-SaaS on own domain | ❌ | Slowest first dollar without marketing |
| 11 | Boilerplate | ❌ | Needs an audience; saturated |

**(b) Revenue ceiling** (highest first; documented solo or near-solo cases)

| # | Format | Constraint | Evidence |
|---|---|---|---|
| 1 | Micro-SaaS / B2B with team plans | ❌ | TypingMind $130K to $210K/month |
| 2 | Workflow Chrome extensions | ❌/◐ | GMass about $130K/month [OLDER]; Closet Tools $42K/month [OLDER]; SuperX $23K MRR |
| 3 | Native Mac pro tools sold direct | ❌ | BoltAI $15K to $30K/month; Screen Studio unverified about $200K/month |
| 4 | Shopify apps | ✅ | $2K to $20K MRR middle band; median under $1K [ESTIMATE] |
| 5 | Boilerplates | ❌ | Peak $125K/month, now $2K to $20K/month |
| 6 | Framer templates | ✅ | Top creators $13K to $22K/month; platform $6.5M paid in 2025 |
| 7 | Mac App Store / Microsoft Store utilities | ✅ | No store-specific solo figures found; Cooldock-type utilities make about $6K/month off-store |
| 8 | Gumroad Discover templates | ✅ | Notion median under $520 lifetime |
| 9 | Figma plugins | ◐ | $200 to $800/month median for paid plugins [ESTIMATE] |
| 10 | VS Code / Obsidian plugins | ❌ | $300 to $4,000/month for the few that earn |
| 11 | Discord bots | ✅ | $50 to $250/month typical |

**(c) Support burden** (lowest first)

| # | Format | Constraint |
|---|---|---|
| 1 | Framer / Gumroad templates | ✅ |
| 2 | One-time desktop utility, offline, no backend (Microsoft Store / Mac App Store) | ✅ |
| 3 | Boilerplate | ❌ |
| 4 | Client-side Chrome extension | ❌/◐ |
| 5 | VS Code / Obsidian plugin | ❌ |
| 6 | Extension or app with backend or AI costs | varies |
| 7 | Discord bot | ✅ |
| 8 | Micro-SaaS | ❌ |
| 9 | Shopify app | ✅ |
| 10 | Lifetime deals with server costs (AppSumo) | ✅ |

### Top 5 niches with the strongest revenue evidence that a new entrant could still compete in, re-ranked for the marketplace constraint

1. **Narrow-pain Shopify apps** (✅): one job that merchants search the App Store for, such as a storefront fix, an admin bulk action, or an AI-assisted product-content helper.
   - **Evidence:** $2K to $20K MRR middle band [ESTIMATE]; 0% revenue share on the first $1M [OFFICIAL]; merchants are a proven buyer group.
   - **Trade-off:** weeks to launch (app review) and the heaviest support burden.
2. **Paid Windows desktop utilities on the Microsoft Store** (✅): screen capture and annotation, a "BYOK" AI desktop client, a clipboard or window manager, local transcription.
   - **Evidence of category demand:** Mac analogs make $6K to $30K/month (Cooldock, Xnapper, BoltAI, MacWhisper, Screen Studio).
   - **Evidence for the store itself:** free registration since Sept 2025; backiee revenue grew 6x [testimonial].
   - **Why it may be competable:** Windows equivalents of popular Mac utilities appear less crowded. This is an inference, not data.
3. **Paid Mac utilities on the Mac App Store** (✅): same categories as #2.
   - **Evidence:** strong category demand (above), but most documented winners sold direct. Store-specific economics (15% to 30% cut, review) are unproven for these niches.
4. **Niche Framer website templates** (✅): for example, templates for specific professions or for SaaS/AI-product landing pages.
   - **Evidence:** $6.5M paid to creators in 2025; top sellers $13K to $22K/month.
   - **Risk:** crowded shelf; new sellers start at tens to hundreds of dollars.
5. **AI-chat power-user extension (multi-LLM folders/export/prompt library) with the Pro license sold on Gumroad** (◐: discovery in the Chrome Web Store, payment in Gumroad's checkout).
   - **Evidence:** Easy Folders $3.7K MRR / $42K in 6 months; Superpower ChatGPT 5-figure MRR, solo.
   - **Caveat:** only meets the constraint if the user accepts Gumroad checkout plus Chrome Web Store discovery as "marketplace."

**Promising but unresearched marketplace-native options (follow-up needed before choosing):**
- JetBrains Marketplace paid plugins
- Atlassian Marketplace apps
- Unity Asset Store / Fab editor tools
- Superhive Blender add-ons
- Steam-sold PC utilities

All have native paid listings and built-in discovery, but **no revenue evidence was gathered in this session** (see section 6 Gaps).

**De-prioritized, with evidence:**
- **Next.js / SaaS boilerplates** (❌; collapsing category).
- **Generic Notion templates** (✅ but median under $520 lifetime).
- **Raycast extensions** (❌, no paid channel).
- **VS Code / Obsidian plugins** (❌ natively).
- **Discord bots** (✅ but $50 to $250/month typical).
- **Lifetime deals with ongoing server costs** (✅ on AppSumo, but support burden).

### Inferences
- **Selection rule under the constraint:** pick a niche where:
  - a search in the *target marketplace* (Shopify App Store, Microsoft Store, Mac App Store, Framer Marketplace) already returns **paid** incumbents with many reviews (proof that people pay);
  - the top results have weak ratings, stale updates, or support only one platform (the gap);
  - the buyer is a non-developer professional or merchant saving time or money.
- For speed within days to weeks under the constraint, the realistic options are a Microsoft Store (and/or Mac App Store) paid utility or a Framer template. A Shopify app has better evidence of willingness to pay, but it is a multi-week effort.

### Gaps
- The rankings for speed-to-first-sale and support burden are synthesized from anecdotes and format traits; no dataset measures them directly.
- Several of the strongest extension revenue figures are 2019-2021 and should be re-checked before anyone commits to them.
- All findings came through search-result summaries, because full-page fetching was blocked in this session. Verify key numbers on the primary pages, especially Scoutr/TrustMRR, Easy Folders, SuperX, Cooldock, Framer payouts and the Microsoft Store terms.
- No new research was possible on the marketplaces the user's constraint emphasises (Superhive, Fab, Unity, JetBrains, Atlassian, Steam, itch.io, Webflow), because the search budget was exhausted.
