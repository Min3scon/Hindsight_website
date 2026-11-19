# Trusted Software / Digital-Asset Marketplaces for a New Solo Seller (late 2026): Comparison and Category Gap Analysis

*Method note (read first): Research date 2026-11-19. In this session, direct page fetches to every marketplace and forum host were blocked by the network policy: superhivemarket.com, fab.com, assetstore.unity.com, plugins.jetbrains.com, store.steampowered.com, steamdb.info, reddit.com, blenderartists.org, itch.io, blendernation.com, strayspark.studio, and beehiiv. So every figure below comes from search-engine result extracts of those pages, not from my own reading of the live page. Review counts and prices are snapshots that may be slightly stale. I could not get Reddit threads at all, so the seller anecdotes come from Blender Artists, Epic and Unity forums, and blogs. Steam and Sensor Tower revenue numbers are modeled estimates, and they often disagree by 2–3x.*

---

## Q1. Marketplace economics: revenue share, seller requirements, discovery for new sellers, and what a typical new seller earns

### Takeaway
On fees, the best deals for a solo seller in late 2026 are:
- **Atlassian Forge**: 0% fee up to $1M lifetime.
- **Shopify**: 0% up to $1M (from a third-party source).
- **Framer templates**: 100% to the creator.
- **Microsoft Store**: 0% if you use your own commerce, otherwise 15%.
- **Fab**: 88%.
- **JetBrains**: 85%.

On buyers' intent to purchase tools, the strongest are Superhive (Blender), the Unity Asset Store, Fab and Steam. They charge more (roughly 70–88% to the seller), and new sellers without an audience consistently report weak organic discovery. Sale events dominate revenue, and the Superhive creators who succeed usually have YouTube audiences.

### Cited Findings

**Fee and requirements comparison (as of the latest sources found)**

| Marketplace | Seller share | Key requirements / notes | Source |
|---|---|---|---|
| Superhive (ex-Blender Market) | "Up to 90%" with a paid creator subscription. A third-party review lists 70% Free / 80% Pro / 90% Ultimate (unverified). A forum user says ~30% goes to the platform unless you pay $200/month. | Add-ons must be GPL-compatible. Optional 12-month "Support Periods" launched in June 2026 | [Superhive pricing](https://superhivemarket.com/pricing); [digiliner review (unverified tiers)](https://digiliner.org/blender-market-review/); [Blender Artists thread p.21](https://blenderartists.org/t/superhive-changes/1634680?page=21) |
| Blender Extensions (extensions.blender.org) | No paid listings | Free and GPLv3+ only. Bundled assets must be CC0. No paywalls, keys or registration may block functionality. No purchase prompts in the Blender UI. Funding links are allowed in the listing description | [Extensions ToS](https://extensions.blender.org/terms-of-service/) |
| Gumroad | Direct sales: 10% + $0.50 (plus about 2.9% + $0.30 card processing). Discover marketplace sales: flat 30% | Some sources say the direct fee drops to 5% in any month above $20k (unverified) | [Vonza (Nov 2026)](https://vonza.com/blog/gumroad-fees); [Checkout Page](https://checkoutpage.com/blog/how-gumroad-pricing-works-and-a-cheaper-alternative) |
| Fab (Epic) | 88% (official) | Code plugins need a separate zip for each engine version. Fab recompiles every declared version, and one failure rejects the whole submission | [Epic Fab docs](https://dev.epicgames.com/documentation/en-us/fab/fab-documentation); [Epic forum](https://forums.unrealengine.com/t/same-plugin-for-multiple-ue-versions/2716394); [Pixelsdesign blog](https://www.pixelsdesign.it/blog/unreal-engine-plugin-multiple-engine-versions.html) |
| Unity Asset Store | 70% (long-standing 70/30). One third-party source cites Provider Agreement s.4.3, updated 13 Apr 2026 | Two-factor authentication is mandatory for payouts. Payouts in USD only, monthly via PayPal or quarterly by bank | [Unity payout docs](https://docs.unity3d.com/Manual/AssetStorePayouts.html); [knowyourcut (3rd-party)](https://knowyourcut.com/blog/unity-asset-store-fees-2026) |
| Godot Asset Store | No paid sales yet | Launched in beta in June 2025 with free assets only. It replaces the Asset Library, and paid assets are "on the roadmap" | [Game World Observer](https://gameworldobserver.com/2025/06/26/the-beta-version-of-the-asset-store-for-the-godot-engine-has-been-released); [GameFromScratch](https://gamefromscratch.com/the-godot-asset-store-is-live/) |
| itch.io | The creator chooses the platform share (default 10%, adjustable 0–100%) | Has a Tools category, including "top sellers tagged Godot" | [Generalist Programmer (3rd-party)](https://generalistprogrammer.com/tools/itchio-revenue-calculator); [itch.io Godot tools](https://itch.io/tools/top-sellers/tag-godot) |
| JetBrains Marketplace | 85% (15% commission). JetBrains may negotiate custom terms for high-revenue plugins | JetBrains handles licensing, invoicing, renewals, refunds and reseller sales. Reseller commission comes out of JetBrains' share | [JetBrains fees docs](https://plugins.jetbrains.com/docs/marketplace/revenue-sharing-and-fees.html); [Developer agreement](https://www.jetbrains.com.cn/en-us/legal/docs/plugins_site/developer-agreement/1.3/1.3.pdf) |
| Microsoft Store | 100% for non-game apps using their own commerce. Otherwise 15% for apps and 12% for games | Individual registration has been free since mid/Sept 2025 in about 200 markets, with no credit card needed | [MS Learn](https://learn.microsoft.com/en-us/windows/apps/publish/publish-your-app/why-distribute-through-store); [Windows Dev Blog](https://blogs.windows.com/windowsdeveloper/2025/09/10/free-developer-registration-for-individual-developers-on-microsoft-store/) |
| Steam (Software) | 70% (Valve 30%) | $100 Steam Direct fee per app, recouped after $1,000 adjusted gross revenue. Valve is "primarily accepting games"; non-game software is accepted only in listed categories | [Steamworks Steam Direct](https://partner.steamgames.com/steamdirect); [Immutable guide](https://www.immutable.com/guides/how-much-does-steam-take) |
| Mac App Store | 85% under the Small Business Program, which requires under $1M in proceeds the prior year and manual enrollment | | [Apple SBP](https://developer.apple.com/app-store/small-business-program/) |
| Setapp | 70% of membership revenue, split by usage (up to 90% with a +20% partner fee for subscribers you bring). Single-app sales: 85% of subscriptions, 75% of one-time purchases | You earn $0 in any period when no member opens your app | [Setapp docs](https://docs.setapp.com/docs/setapp-marketplace-overview) |
| Atlassian Marketplace | Forge apps: 0% fee on eligible earnings up to $1M lifetime (from 1 Jan 2026). After that, Forge pays 16% (Apr 2026) rising to 17% (Oct 2026). Connect apps pay 20% rising to 25% | Connect reaches full end-of-support in Q4 2026. Standard app review takes 10–15 business days | [Atlassian dev community](https://community.developer.atlassian.com/t/marketplace-revenue-share-updates-2026/91727); [Atlassian pricing docs](https://developer.atlassian.com/platform/marketplace/pricing-payment-and-billing/); [Isogun Labs](https://isogunlabs.com/blog/atlassian-marketplace-2026/) |
| Shopify App Store | 0% on the first $1M of lifetime gross app revenue (counted from 1 Jan 2025), then 15%, plus 2.9% processing | Third-party source only | [WeekOne Labs](https://weekonelabs.com/blog/shopify-app-revenue-benchmarks-2026) |
| Figma Community | 85% (15% fee). Minimum price $2. Payout about 30 days after purchase | Figma's help center has said "not approving new creators to sell paid files" (possibly outdated) | [Fast Company](https://www.fastcompany.com/90859042/figma-just-launched-an-app-store-for-designers); [Figma help](https://help.figma.com/hc/en-us/articles/12067637274519-About-selling-Community-resources) |
| Framer Marketplace | 100% of paid template revenue | Payout threshold of $200 (third-party source) | [Framer help](https://www.framer.com/help/articles/how-the-creator-program-works/); [FramerHub](https://framerhub.io/blog/framer-affiliate-program-guide) |
| Notion Marketplace | 8% + $0.40 per sale (official; third-party guides say 10%). Notion is the merchant of record | | [Notion help](https://www.notion.com/help/selling-on-marketplace) |

**Superhive (Blender), scale and typical earnings**
- In 2026 Superhive said 7,500 creators and 60,000+ products are on the platform, with nearly $50M paid out since 2014. — [Superhive blog](https://superhivemarket.com/posts/we-built-this-together-now-we-need-to-fix-it)
- Its market-statistics page lists about 73,366 products (undated). — [Superhive market stats](https://superhivemarket.com/market-stats)
- **Cyber Sale 2024:** GMV $713,399.73, creator earnings $540,903. Average earnings per creator fell to $375.11 from $523.41 the previous year, even though more creators were paid. — [Superhive Cyber Sale 2024 recap](https://superhivemarket.com/posts/blender-market-2024-cyber-sale-recap)
- **Winter Sale 2025:** 1,483 creators collected $354,858 during the 6-day sale, which averages about $239 per creator. Search extracts conflict on gross revenue. One gives about $474K GMV; another gives "gross revenue $94,855.99" with 23,786 paid products sold. The page may be dated early 2025. — [Superhive Winter Sale 2025 recap](https://superhivemarket.com/posts/winter-sale-2025-recap)
- Superhive's founder says creators are "squeezed between declining sales and an ever-increasing number of customers who expect ongoing updates and support." He blames the lifetime-updates assumption. — [Autotroph](https://autotroph.com/the-blender-creator-economy-is-breaking-lets-start-talking-about-it)
- **New policy, "Support Periods" (launched June 2026):** a 12-month window of updates and support. Renewal is discounted; FLIP Fluids prices it at 25% of the current price, and BlenderNation reported 50%. Superhive docs say it is opt-in per product; BlenderNation reported it as universal (conflict). — [Superhive creator FAQ](https://support.superhivemarket.com/article/331-support-period-faqs-creators); [FLIP Fluids FAQ](https://github.com/rlguy/Blender-FLIP-Fluids/wiki/Frequently-Asked-Questions); [BlenderNation](https://www.blendernation.com/2026/04/01/incoming-policy-changes-on-superhive/)
- On a forum, a creator says the most successful add-ons belong to creators "with YouTube channels that have a decent following." Without an audience, a tool might earn about $50 a month. — [Blender Artists, Superhive Changes p.21](https://blenderartists.org/t/superhive-changes/1634680?page=21)
- **History:** creators originally got 70%. In the first year (2014) creators were paid about $50k in total. November 2021 was the first $1M monthly payout, with 2,700 creators and 17,000 products. By 2022 two creators had passed $1M in lifetime earnings and one product had passed $1M. — [Superhive year in review (old)](https://superhivemarket.com/posts/blender-market-year-in-review); [Cyber Sale 2021](https://superhivemarket.com/posts/cyber-sale-2021-results); [2022 wrap-up](https://superhivemarket.com/posts/2022-wrap-up-and-cyber-results?page=2)
- **Blendkit** now accepts both free and paid add-ons packaged as Blender extensions. This is an alternative paid channel. — [Blendkit add-on upload beta](https://www.blendkit.com/add-ons-upload-beta/)

**Fab (Epic)**
- Fab's 2025 Year in Review reports creators earned over $24M. The catalog passed 420,000 live listings and 20,000 publishers. Event sales (Fab Friday, Spring Sale, Summer Sale) "performed exceptionally well." — [Unreal Engine: Fab 2025 Year in Review](https://www.unrealengine.com/news/fab-2025-year-in-review)
- A seller retrospective says event sales make up as much as 50% of monthly revenue on average, and flash sales another 25%. This is unverified. — [StraySpark retrospective](https://www.strayspark.studio/blog/fab-marketplace-12-month-retrospective-seller-2026)
- **Seller complaints:** sales fell compared with the old Unreal Marketplace, discovery is poor (an exact-name search returns unrelated listings pages deep), impulse purchases are down, and some sellers have left (thread about 600 days old). — [Epic forum "FAB is a disaster"](https://forums.unrealengine.com/t/fab-is-a-disaster-and-we-all-know-it/2424187)
- One seller says sales dropped to near zero after Fab launched and blames the removal of written Q&A and reviews. Search attribution for this one is uncertain. — [Substack post](https://experiencersinternational.substack.com/p/plugin-marketplace-my-complaints)
- **Revenue-share disputes:** some sellers say Epic paid 88%, not 100%, on December 2024 sales despite the promised 100% promotion. — [Epic forum](https://forums.unrealengine.com/t/so-what-happened-to-100-revenue-for-2024/2310907)
- **Tiered payout claim:** one third-party site says a tiered 70–80% payout replaced the flat 88% on 15 Sep 2026. Epic's own docs still say 88%, and I could not verify the claim. — [tech-insider](https://tech-insider.org/unity-asset-store-vs-fab-vs-cgtrader-2026/)
- **Operational friction:** one seller's listing was stuck in Draft for 49+ days, blocking a UE 5.7 update. — [Epic forum](https://forums.unrealengine.com/t/cant-update-product-since-october-49-days-without-fix-so-far/2675462)

**Unity Asset Store**
- Unity's FY2025 balance sheet shows publisher payables (money owed to Asset Store publishers) of about $431.5M, up from about $394.3M a year earlier. This is a liability figure, not an income measure. — [Unity Q4/FY2025 results](https://investors.unity.com/news/news-details/2026/Unity-Reports-Fourth-Quarter-and-Fiscal-Year-2025-Financial-Results/default.aspx)
- A third-party guide says Asset Store revenue is long-tailed and recommends pricing utility tools at $20–$50 ("under-pricing signals low quality"). — [Generalist Programmer](https://generalistprogrammer.com/tutorials/unity-asset-store-selling-guide-revenue)
- **Greater China delisting (anecdotal):** a forum post by a Greater China plugin creator says assets from Greater China publishers were to be removed on 31 March 2026. The creator says their product has "tens of thousands" of users. — [Unity Discussions](https://discussions.unity.com/t/a-notice-for-asset-store-assets-from-publishers-in-greater-china/1711108?page=9)

**JetBrains Marketplace**
- JetBrains reports 11,500+ plugins, 10,000+ plugin authors, and 3M+ monthly unique downloads of third-party plugins. — [JetBrains developers page](https://plugins.jetbrains.com/developers)
- Paid plugins started with 10 in June 2019 and reached 46 a year later. — [JetBrains blog 2020](https://blog.jetbrains.com/platform/2020/07/one-year-of-paid-plugins-on-the-marketplace/)
- A third-party scan counted 404 paid plugins (unverified). — [GitHub jetbrains-marketplace-scan](https://github.com/dhyabi2/jetbrains-marketplace-scan)

**Microsoft Store**
- Microsoft's blog quotes a developer whose daily installs grew 10x in a year, with a sixfold revenue increase for their flagship app. These are vendor-selected anecdotes. — [Windows Dev Blog](https://blogs.windows.com/windowsdeveloper/2025/09/10/free-developer-registration-for-individual-developers-on-microsoft-store/)
- A critical opinion piece says the Store is "failing indie developers": one game earned nothing over several years. — [Dreamsaga](https://dreamsaga.net/the-1-4-billion-user-paradox-why-the-microsoft-store-is-failing-indie-developers/)

**itch.io / Godot**
- A Godot plugin bundle sale had raised $132 from 6 contributors against a $250 goal. — [itch.io bundle](https://itch.io/s/102929/godot-gamedev-plugin-bundle-sale)
- A seller tutorial is titled "How To Make Your First $100 Selling Godot Plugins!" — [thunderplugins.itch.io](https://thunderplugins.itch.io/tutorial)

### Inferences
- **Typical no-audience earnings are low everywhere.** The clearest numbers are these: one forum creator's estimate of about $50/month for a Superhive add-on with no audience; an average of $239–$375 per creator across a whole flagship sale on Superhive; and about $132 for a Godot plugin bundle on itch.io. A new seller should plan around sale events, and should plan to build a small audience (YouTube demo videos) at the same time, not count on organic search.
- **Fab** is the largest pool ($24M paid in 2025), but it has 20,000+ publishers and 420k listings. The marketplace is event-driven and sellers complain about discovery. For an unknown seller its 88% share matters less than visibility.
- **Superhive's Support Periods** (June 2026) change the economics in favor of maintenance-heavy tools. A seller can now charge renewal fees (for example 25% of the price) for continued updates. Tools that need constant API-tracking now earn recurring revenue.
- **Atlassian Forge (0% to $1M) and the Microsoft Store (0% with own commerce)** have the best fees. But I found no evidence that new apps on either get meaningful organic discovery.
- **Godot has no paid official store yet.** When the Godot Asset Store turns on paid assets, early paid tools may get outsized visibility. This is a watch item, not a current opportunity.

### Gaps
- I found no Reddit seller posts with numbers; Reddit was unreachable and search returned none. I also found no new-seller earnings data for Unity, Fab code plugins, JetBrains, the Microsoft Store or Atlassian.
- Superhive's exact base commission without a subscription is not confirmed by an official page.
- Fab's alleged September 2026 tiered payout is unverified.
- I could not get the list of non-game software categories Steam accepts.
- Shopify's 0%-to-$1M term comes from a third-party source only.
- I could not confirm whether Figma is currently approving new paid sellers.

---

## Q2. Best-selling tool categories, top products (prices, review/sales counts), and unmet or outdated needs on the most promising marketplaces

### Takeaway
On every engine and DCC marketplace, workflow and editor tools that save time are the proven sellers. The clearest documented supply gaps in late 2026 come from platform breakage:
- **Blender 5.0** (released 2025-11-18) affected 116 add-ons, and about 30% of those were still partly broken several releases later. Grease Pencil v3 and slotted Actions are the hardest-hit areas.
- **Unity 6's URP Render Graph** obsoleted older renderer features. Compatibility Mode is being wound down.
- **Unreal 5.7/5.8** brought toolchain and versioning churn for Fab code plugins.

AI/MCP editor bridges are the hot 2025–2026 category, but they are already crowded with free open-source options.

### Cited Findings

**Blender / Superhive: top sellers and prices**
- A homepage snapshot from about 74 days ago listed "Top Selling Items this Week" as Auto-Rig Pro, Human Generator Ultimate and FLIP Fluids. — [Superhive homepage](https://superhivemarket.com/)
- **Auto-Rig Pro:** Lite $25, Full $50, 10-seat $162, 20-seat $227. 448 ratings, rated 5. — [Superhive Auto-Rig Pro](https://superhivemarket.com/products/auto-rig-pro)
- **FLIP Fluids:** $79 for one user, $149 for up to 6, $299 for up to 15. Described as "one of the best selling products on Superhive." — [Superhive FLIP Fluids](https://superhivemarket.com/products/flipfluids)
- **Hard Ops / BoxCutter bundle:** $38 on Superhive, or about $19 each on Gumroad. The vendor calls Hard Ops "the best-selling plugin for Blender." — [Superhive bundle](https://superhivemarket.com/products/hard-ops--boxcutter-ultimate-bundle); [HardOps page](https://superhivemarket.com/products/hardopsofficial); [StraySpark hard-surface list](https://www.strayspark.studio/blog/best-hard-surface-addons-blender-2026)
- Superhive storefront top sellers are currently dominated by asset libraries: car libraries, 3D scans and lighting packs (undated). — [Superhive products](https://superhivemarket.com/categories/products)
- An early (about 2015) Blender Market review said workflow and time-saving tools sold best, while Models had the most listings. This is old data. — [Superhive year in review](https://superhivemarket.com/posts/blender-market-year-in-review)
- No public per-product sales counts were found in the search extracts. Product pages show rating counts.

**Blender: breakage-driven gaps**
- A Blender devtalk survey found 116 add-ons affected by breaking Python API changes in 5.0, about 13% of those surveyed, with 43 marked broken. About 30% of affected add-ons stayed at least partly broken "a couple versions after" 5.0. About 40% of adaptation commits landed in non-major releases. "Broken" was detected with LLMs. — [devtalk survey](https://devtalk.blender.org/t/survery-of-impacted-addons-by-breaking-python-api-changes/46289)
- Before release, Blender's extensions team estimated that 123 of 612 hosted add-ons (about 20%) used API calls removed in 5.0. — [projects.blender.org #364](https://projects.blender.org/infrastructure/extensions-website/issues/364)
- The major 5.0 removals were `scene.node_tree` (the compositor change), the legacy Action API (replaced by layered/slotted Actions), and the move to the Grease Pencil v3 data model. Blender 5.1 then moved to Python 3.13. — [StraySpark 5.1 guide](https://www.strayspark.studio/blog/blender-5-1-addon-compatibility-python-313-guide); [Blender 5.0 Python API notes](https://developer.blender.org/docs/release_notes/5.0/python_api/)
- **Concrete failures:** a keyframe-rendering add-on (Loom) broke when the legacy Action API was removed. Other add-ons fail with `'BMLoopUV' object has no attribute 'select'`. — [blender-loom #124](https://github.com/p2or/blender-loom/issues/124); [Blender issue #150882](https://projects.blender.org/blender/blender/issues/150882)
- **Grease Pencil gap:** G-Mesh, a paid Superhive tool that turns Grease Pencil strokes into mesh, is "supported up to Blender 4.0" with "no plans for future updates." The old built-in GP-retopology contrib add-on is described as broken in newer builds. — [Superhive G-Mesh](https://superhivemarket.com/products/g-mesh/); [Blender Artists thread (old)](https://blenderartists.org/t/grease-pencil-retopo-button-missing/582917)
- The official Grease Pencil Tools add-on now has a GPv3 release line for Blender 4.3+. Pullusb's 1.8.5 was "the last release compatible with blender 4.2 and below." — [Extensions: Grease Pencil Tools versions](https://extensions.blender.org/add-ons/grease-pencil-tools/versions/); [Pullusb releases](https://github.com/Pullusb/greasepencil_tools/releases)
- Blender's current manual is labelled 5.2 LTS. — [Blender manual](https://docs.blender.org/manual/en/latest/advanced/extensions/licenses.html)

**Unity Asset Store: top tools and gaps**
- **Odin Inspector and Serializer:** about 782–792 ratings (4.7–5.0). List price $55, frequently discounted to $27.50 (50% sale on 2026-09-15). The Asset Store license is capped at $200K revenue or funding; above that a yearly subscription is required. Requires Unity 2022.3.19+. One review reports problems on macOS Tahoe. — [Asset Store reviews](https://assetstore.unity.com/packages/tools/utilities/odin-inspector-and-serializer-89041/reviews); [price tracker](https://asset-prices.xamin.it/asset/odin-inspector-and-serializer-89041); [Sirenix pricing](https://odininspector.com/pricing)
- **vHierarchy 2 (kubacho lab):** $35, 133 reviews, 1,028 favourites, v2.1.12 released Nov 4 2026. — [Asset Store vHierarchy 2](https://assetstore.unity.com/packages/tools/utilities/vhierarchy-2-253397)
- **vFolders 2:** $39, 87 reviews, 978 favourites. — [kubacho lab publisher page](https://assetstore-fallback.unity.com/publishers/80066)
- **Render Graph gap:** Unity staff said URP "Compatibility Mode was provided so asset providers have time to create RenderGraph versions of their assets." Unity expects to "wind down support over the lifetime of U6." — [Unity Discussions, Render Graph intro thread p.22](https://discussions.unity.com/t/introduction-of-render-graph-in-the-universal-render-pipeline-urp/930355?page=22)
- Examples of the gap:
  - A Subsurface Scattering URP asset doesn't work with Render Graph. — [Unity Discussions](https://discussions.unity.com/t/render-pipeline-compatibility-issue/1653873)
  - UImGui "will just not work if RenderGraph is not disabled." — [GitHub uimgui #74](https://github.com/psydack/uimgui/issues/74)
  - Unity's own URP Render Graph samples were reported broken on 6000.3.17f1. — [Unity Discussions](https://discussions.unity.com/t/unitys-urp-rendergraph-samples-are-broken-6000-3-17f1/1723307)
  - Upgrading from 6.2 to 6.3 broke URP for some users. — [Unity Discussions](https://discussions.unity.com/t/upgrading-from-6-2-to-6-3-breaking-urp/1710395)
  - Developers say they "don't understand Render Graph." — [Unity Discussions](https://discussions.unity.com/t/dont-understand-render-graph-unity-6/948783)
- A 2026 forum claim that Compatibility Mode was deprecated in 6.3 is unverified; it came from an AI answer a user quoted. — [Unity Discussions: Render Pipelines strategy for 2026](https://discussions.unity.com/t/render-pipelines-strategy-for-2026/1710004/print)

**Fab / Unreal: tools and gaps**
- A Fab tools/plugins listing (snapshot about 2 years old) showed Ultimate Engine CoPilot at 4.4 from 258 reviews and Black Eye Camera at 5.0 from 105 reviews. — [Fab UE tools channel](https://www.fab.com/channels/unreal-engine?listing_types=tool-and-plugin)
- **AI/MCP editor bridges are crowded.** Free, open-source options on Fab or GitHub include ChiR24 Unreal_mcp (UE 5.0–5.8), VibeUE (extends UE 5.8's native MCP server) and IvanMurzak Unreal-MCP. Paid or listed entries include Unreal-MCPython (4.0 from 4 ratings), Jutsu Unreal MCP (UE 5.5–5.8) and MCP Toolbox ("282 AI Agent Tools," UE 5.8 Windows). The Unity side also has free MCP bridges. — [ChiR24 GitHub](https://github.com/ChiR24/Unreal_mcp); [VibeUE](https://www.vibeue.com/); [IvanMurzak GitHub](https://github.com/IvanMurzak/Unreal-MCP); [Fab Unreal-MCPython](https://www.fab.com/listings/2ed4fd72-ed7d-447f-9305-1492cbd8e816); [Fab Jutsu](https://www.fab.com/listings/7af5d379-9f12-4396-960b-a9e6428b3a33?lang=en); [Fab MCP Toolbox](https://www.fab.com/listings/ea00b892-8a66-4fa7-9526-18963a87d7f6?lang=en); [andrew.ooo Unity MCP](https://andrew.ooo/posts/unity-mcp-ai-game-development-bridge/)
- **Version churn:**
  - UE 5.7 and 5.8 need a newer MSVC toolchain; older ones produce template errors. One failing version rejects the whole Fab submission. — [Pixelsdesign](https://www.pixelsdesign.it/blog/unreal-engine-plugin-multiple-engine-versions.html)
  - Plugins whose `.uplugin` EngineVersion doesn't match break projects. — [GamineAI help](https://gamineai.com/help/epic-fab-downloaded-plugin-uplugin-engineversion-mismatch-fix)
  - A 2026 vendor list highlights editor utilities and Blueprint-cleanup tooling as production needs. This is a vendor-authored editorial pick. — [StraySpark UE5 plugins 2026](https://www.strayspark.studio/blog/best-unreal-engine-5-plugins-production-2026)

**JetBrains: top paid / freemium plugins**
- **Rainbow Brackets:** about 25.1M downloads. Subscription is $15/year in year 1, $12 in year 2 and $9 after (or $1.50/month), with a 7-day trial. The JetBrains store lists $25/year, which conflicts. — [Rainbow Brackets pricing](https://plugins.jetbrains.com/plugin/10080-rainbow-brackets/pricing); [JetBrains store plugins](https://www.jetbrains.com/store/plugins/)
- **GitToolBox (freemium):** about 10.7M downloads. Listed at $4/user/month or $40/year; another listing shows $2 / $20. — [JetBrains store plugins](https://www.jetbrains.com/store/plugins/); [JetBrains search](https://plugins.jetbrains.com/search)
- JetBrains AI Assistant has about 256.8M downloads, which makes first-party AI the dominant plugin. — [JetBrains search](https://plugins.jetbrains.com/search)

**Steam (Software/Utilities) and creative tools: top items**
- **Wallpaper Engine:** estimated about $155.5M gross and about $45.9M net (Boxleiter-method estimate). — [Steam Revenue Calculator](https://steam-revenue-calculator.com/app/431960/wallpaper-engine)
- **Lossless Scaling ($6.99):** see Q3.
- **Aseprite (pixel-art editor):** Sensor Tower estimates $7.6M and 531k units; another calculator estimates $18.3M gross (a 2x conflict). — [Sensor Tower](https://app.sensortower.com/vgi/game/aseprite); [Steam Revenue Calculator](https://steam-revenue-calculator.com/app/431730/aseprite)
- **Pixel Composer (solo developer):** 272 Steam reviews, 82.4% positive, $14.99. — [SteamyData](https://steamydata.com/app/2299510/pixel-composer)

### Inferences
- **The most defensible gaps for a new entrant are breakage gaps, not new categories.** Blender 5.x and Unity 6 Render Graph both left buyers stranded: tools they own or need no longer work, and incumbents are slow (about 30% still partly broken; G-Mesh explicitly abandoned). These gaps are concrete and searchable ("GPv3," "Render Graph," "Blender 5"). A new seller can be the first maintained option without competing against a 448-rating incumbent.
- **AI/MCP editor bridges are a trap for paid sellers.** Several free, open-source, multi-version bridges already exist on Fab, GitHub and Unity.
- **Prices for editor and workflow tools cluster around $20–$55** (Unity: vHierarchy $35, vFolders $39, Odin $55; Blender: Hard Ops/BoxCutter $38, Auto-Rig Pro $25/$50). FLIP Fluids' $79+ is the high end for a simulation engine. JetBrains plugins sell as small subscriptions ($15–$40 per year).
- **Unity Greater China delisting:** if the March 2026 removal happened as described, popular tools may have left with orphaned buyers. This is worth checking on Unity forums before building a Unity product.

### Gaps
- I found no per-product sales counts for Superhive, Fab or Unity. Pages show rating or review counts only, and I couldn't load them directly.
- I could not see the per-category breakdown of the Blender 5.0 survey (animation vs. compositor vs. GP).
- I found no current Fab best-seller ranking for code plugins.
- I could not get Reddit request threads ("is there an add-on that…") for Blender, Unity or Unreal.
- I found no Microsoft Store category-level demand data.

---

## Q3. Breakthrough solo-developer (or tiny-team) successes, 2024–2026, with revenue estimates

### Takeaway
The biggest solo or tiny-team successes in this space are on Steam. They are PC utilities and "desktop-layer" apps priced at $5–$15 or free with DLC: Lossless Scaling, Wallpaper Engine, Desktop Mate and the Rusty's Retirement idle-desk trend. Their modeled revenue ranges from low millions to over $100M gross. On asset marketplaces, top add-ons and tools reach seven figures lifetime (two Blender Market creators had passed $1M by 2022). But developer-reported numbers for smaller creative tools are far more modest, for example Pixel Composer's $23k first year.

### Cited Findings
- **Lossless Scaling** (solo developer "THS"; Steam, Dec 2018; $6.99):
  - Estimates conflict. Steam Revenue Calculator gives about $7.56M gross and $2.23M net. VaporLens gives about 2.73M sales and $19.05M with 34,724 reviews (90.2% positive), updated 2026-03-09. — [Steam Revenue Calculator](https://steam-revenue-calculator.com/app/993090/lossless-scaling); [VaporLens](https://vaporlens.app/app/993090/lossless_scaling/stats/details)
  - Described as a solo developer "still in school." — [XDA hands-on](https://www.xda-developers.com/lossless-scaling-hands-on/); [Corsair explainer](https://www.corsair.com/us/en/explorer/gamer/gaming-pcs/lossless-scaling-everything-you-need-to-know/)
  - Frame generation (LSFG) arrived on 10 Jan 2024 and LSFG 3 on 10 Jan 2025. — [WindowsForum guide](https://windowsforum.com/news/lossless-scaling-2026-guide-lsfg-frame-gen-upscaling-without-gpu-lock-in.435159/)
  - **Competitive risk:** the Nvidia App now offers a similar feature for free. — [XDA](https://www.xda-developers.com/the-nvidia-app-offers-the-best-feature-of-lossless-scaling-for-free/)
  - Community members petitioned the solo developer for a roadmap and more updates. — [Steam discussion](https://steamcommunity.com/app/993090/discussions/0/569291508114728695/)
- **Wallpaper Engine:** about $155.5M gross estimated. — [Steam Revenue Calculator](https://steam-revenue-calculator.com/app/431960/wallpaper-engine)
- **Desktop Mate** (free base app, character DLC around $14.99):
  - 1.9M+ downloads as of March 2026. — [Steam announcements](https://steamcommunity.com/app/3301060/announcements/); [PR Times](https://prtimes.jp/main/html/rd/p/000000078.000045461.html); [Steam DLC](https://store.steampowered.com/app/3359730/Desktop_Mate__DLC/)
  - All-time peak of 23,388 concurrent users (Jan 2025), and about 3,727 average players over the last 30 days. — [SteamCharts](https://steamcharts.com/app/3301060)
  - Base-app reviews are "Mixed" (8.5k). — [GG.deals](https://gg.deals/application/desktop-mate/)
- **Rusty's Retirement** (idle game that sits at the bottom of the screen, tiny developer):
  - Estimates: AppMagic over $4.5M and 880K copies; steamdata.ai 543K copies and $2.8M; games-stats about $1.9M. — [AppMagic](https://appmagic.rocks/research/idle-steam-games-2026); [steamdata.ai](https://steamdata.ai/game/2666510/rusty-s-retirement); [games-stats](https://games-stats.com/steam/game/rustys-retirement/)
  - It spawned a subgenre that got its own Steam Fest. Its developer has made 2 games that sold 750,000 copies after learning to code 5 years earlier. — [GamesRadar](https://www.gamesradar.com/games/simulation/indie-dev-behind-quietly-massive-steam-trend-says-they-only-learned-to-code-5-years-ago-but-have-made-2-games-selling-750-000-copies-i-still-dont-believe-it-myself-sometimes/)
- **Bongo Cat (counter-example):**
  - The developer's own net figures were $2,000 (March 2025), $4,050 (April), $3,800 (May) and $2,800 (June), despite going viral. AppMagic's "$670K" estimate is more than 50x higher. — [WN Hub](https://wnhub.io/news/stores-and-publishing/item-48117); [GameSpot](https://www.gamespot.com/articles/viral-steam-hit-bongo-cat-doesnt-actually-make-any-money/1100-6532777/)
  - The game is used as a marketing tool for the team's next game. — [Dexerto](https://www.dexerto.com/gaming/one-of-steams-most-popular-games-is-actually-losing-the-devs-money-3220149/)
- **Pixel Composer** (solo developer, node-based pixel-art tool): 5,724 copies (4,053 Steam, 1,671 itch.io) and $23,464 revenue in its first year, per the developer (December 2023, older data). — [Patreon post](https://patreon.com/posts/lets-talk-pixel-94349109)
- **Blender add-ons:** by 2022, two Blender Market creators had passed $1M in lifetime earnings and one product had passed $1M in sales (older data). FLIP Fluids, Hard Ops/BoxCutter and Auto-Rig Pro are the widely cited all-time top sellers. — [Superhive 2022 wrap-up](https://superhivemarket.com/posts/2022-wrap-up-and-cyber-results?page=2); [FLIP Fluids](https://superhivemarket.com/products/flipfluids); [HardOps](https://superhivemarket.com/products/hardopsofficial)
- **Unity tools:** Odin (about 790 ratings, $55) and kubacho lab's vHierarchy 2 (133 reviews, $35) and vFolders 2 (87 reviews, $39) are evidence that focused editor QoL tools sell. The search results don't establish kubacho's team size. — [Odin reviews](https://assetstore.unity.com/packages/tools/utilities/odin-inspector-and-serializer-89041/reviews); [vHierarchy 2](https://assetstore.unity.com/packages/tools/utilities/vhierarchy-2-253397)

### Inferences
- **Steam utilities have the biggest upside.** The pattern behind them: one visible, demo-able effect on the user's own PC or games, a $5–$10 price, and organic word-of-mouth among gamers. But the payoff is hit-driven, as the gap between Bongo Cat and Rusty's Retirement shows, and a platform holder can commoditize the feature (Nvidia vs. Lossless Scaling).
- **Revenue estimates disagree by 2.5–50x.** Any business case should use the low estimate. Using the Steam Revenue Calculator's Boxleiter numbers, Lossless Scaling's roughly $2.2M net over about 8 years is a more realistic upside reference than VaporLens's $19M.
- **Asset-marketplace successes compound slowly.** Superhive's million-dollar creators built over years with YouTube audiences. A new seller should expect hundreds to low thousands of dollars in year 1 on marketplaces unless a breakage gap gives them sole-supplier status.

### Gaps
- I found no Steam review or revenue data for Desktop Mate DLC sales.
- I found no developer-confirmed revenue for Lossless Scaling, Wallpaper Engine, Odin or vHierarchy.
- I found no 2024–2026 Superhive creator case studies with numbers (the Superhive blog was not fetchable).
- I couldn't get Gamalytic or VG Insights pages; they weren't returned by search.

---

## Q4. Best marketplace + category combinations for a new entrant who codes well with AI but has no audience, ending in the Top 5 opportunities

### Takeaway
The best risk-adjusted bets fill a documented breakage or migration gap on a marketplace whose buyers already pay for tools:
- Blender 5.x / Grease Pencil v3 and slotted-Actions tooling on Superhive (also listed on Gumroad and Blendkit).
- Unity 6 Render Graph–native URP tooling on the Asset Store.
- Forge-native replacements for Atlassian Connect apps that reach end-of-support in Q4 2026.

The highest-variance upside is a focused, demo-able Windows utility on Steam. JetBrains has the best fit for recurring developer revenue with little paid competition.

### Cited Findings (evidence used for the ranking)
- About 30% of the Blender add-ons affected by 5.0 remained partly broken a couple of versions later, and 116 were affected. — [devtalk survey](https://devtalk.blender.org/t/survery-of-impacted-addons-by-breaking-python-api-changes/46289)
- G-Mesh (GP strokes to mesh) is stuck at Blender 4.0 with "no plans for future updates." — [Superhive G-Mesh](https://superhivemarket.com/products/g-mesh/)
- Superhive Support Periods allow paid renewals, for example 25% of the price per extra year. — [FLIP Fluids FAQ](https://github.com/rlguy/Blender-FLIP-Fluids/wiki/Frequently-Asked-Questions); [Superhive FAQ](https://support.superhivemarket.com/article/331-support-period-faqs-creators)
- Unity says Compatibility Mode exists so asset providers have time to ship Render Graph versions, and plans to wind it down over Unity 6's lifetime. — [Unity Discussions](https://discussions.unity.com/t/introduction-of-render-graph-in-the-universal-render-pipeline-urp/930355?page=22)
- Atlassian Connect reaches full end-of-support in Q4 2026. Forge apps pay 0% on up to $1M lifetime. — [Isogun Labs](https://isogunlabs.com/blog/atlassian-marketplace-2026/); [Atlassian dev community](https://community.developer.atlassian.com/t/marketplace-revenue-share-updates-2026/91727)
- JetBrains has about 11,500 plugins but only about 400 paid ones (third-party scan, unverified). Freemium leaders reach 10–25M downloads at $15–$40 per year. — [JetBrains developers](https://plugins.jetbrains.com/developers); [GitHub scan](https://github.com/dhyabi2/jetbrains-marketplace-scan); [Rainbow Brackets pricing](https://plugins.jetbrains.com/plugin/10080-rainbow-brackets/pricing)
- Steam utilities have produced modeled multi-million results (Lossless Scaling, Wallpaper Engine, Rusty's Retirement). The Steam Direct fee is $100, recoupable. — sources in Q3; [Steam Direct](https://partner.steamgames.com/steamdirect)

### Inferences

#### Top 5 marketplace + product opportunities

**1. Superhive (also Gumroad and Blendkit): a maintained Grease Pencil v3 "strokes to clean mesh / retopology guide" add-on for Blender 5.x**
- **Concept (original, not a G-Mesh clone):** convert GPv3 strokes into quad-dominant retopology patches or curve-guided surfaces, using GPv3's new data model. Add live re-projection onto a high-poly target, and versioned support for 5.0–5.2 LTS.
- **Demand evidence:**
  - The only dedicated paid tool (G-Mesh) stops at 4.0 with no update plans.
  - The legacy GP-retopo contrib add-on is reported broken.
  - GPv3 was one of the major breaking changes in 5.0, and about 30% of affected add-ons remain partly broken. — [G-Mesh](https://superhivemarket.com/products/g-mesh/); [devtalk survey](https://devtalk.blender.org/t/survery-of-impacted-addons-by-breaking-python-api-changes/46289); [StraySpark 5.1 guide](https://www.strayspark.studio/blog/blender-5-1-addon-compatibility-python-313-guide)
- **Competitors:**
  - G-Mesh (stale; price not captured).
  - RetopoFlow 4 (paid, general retopology for Blender 4.2+, not GP-driven; price and count not captured). — [Ranch Computing roundup](https://www.ranchcomputing.com/en/best-plugins-for-blender/)
  - Built-in BSurfaces (free).
  - Price anchors: Hard Ops/BoxCutter $38; Auto-Rig Pro $25/$50 (448 ratings).
- **Price point:** $19–$29, plus a 12-month Support Period renewal at about 25–50%.
- **Build difficulty:** medium. Pure Python/bpy plus GPv3 attribute APIs; MVP in 1–2 weeks. The hard part is robust quad topology.
- **Discovery risk:** a forum creator estimates about $50/month with no audience. Plan launch around the Superhive Cyber/Black Friday sale and record a 60-second demo video.

**2. Superhive / Gumroad: an animation utility pack built natively on Blender 5's layered/slotted Actions**
- **Concept:** tools for animators whose older action-management, NLA, keyframe-batch or render-selected-keyframe add-ons broke when the legacy Action API was removed. Examples: slot-aware action library and retargeting between slots, a batch keyframe operations panel, and render-selected-keys.
- **Demand evidence:**
  - The legacy Action API was removed in 5.0.
  - Specific add-ons broke on it (Loom's "Render Selected Keyframes").
  - 116 add-ons were affected and about 30% remain partly broken. — [blender-loom #124](https://github.com/p2or/blender-loom/issues/124); [devtalk survey](https://devtalk.blender.org/t/survery-of-impacted-addons-by-breaking-python-api-changes/46289); [Blender 5.0 Python API notes](https://developer.blender.org/docs/release_notes/5.0/python_api/)
- **Competitors:** I found no dedicated slotted-Actions paid tool (a gap; not verified exhaustively). Auto-Rig Pro ($25/$50, 448 ratings) covers rigging, not action management.
- **Price point:** $15–$25.
- **Build difficulty:** low to medium (Python/bpy; MVP in days to 2 weeks).
- **Discovery risk:** first identify exactly which popular animation add-ons are still broken. The survey's per-module table on devtalk is the place to check before building.

**3. Unity Asset Store: a Unity 6 Render Graph–native URP effects/renderer-features toolkit, or a Render Graph pass migration and debugging assistant**
- **Concept (original):** an editor tool that scans a project's `ScriptableRendererFeature` and `ScriptableRenderPass` classes. It flags legacy `Execute()`-only passes that fail with Compatibility Mode off, generates `RecordRenderGraph` scaffolding, and visualizes pass resource usage. An alternative concept is a set of Render Graph–native versions of effect types whose old assets broke, such as subsurface scattering and ImGui-style overlays.
- **Demand evidence:**
  - Unity explicitly tells users to wait for asset providers to ship Render Graph versions, and plans to wind down Compatibility Mode during Unity 6.
  - Specific assets are broken.
  - Unity's own samples were reported broken in 6000.3.17f1.
  - Developers say they "don't understand Render Graph." — [Unity Discussions p.22](https://discussions.unity.com/t/introduction-of-render-graph-in-the-universal-render-pipeline-urp/930355?page=22); [uimgui #74](https://github.com/psydack/uimgui/issues/74); [Unity Discussions](https://discussions.unity.com/t/unitys-urp-rendergraph-samples-are-broken-6000-3-17f1/1723307); [Unity Discussions](https://discussions.unity.com/t/dont-understand-render-graph-unity-6/948783)
- **Competitors:** I found no dedicated Render Graph migration tool (not verified exhaustively; a gap). Price anchors for editor tools: vHierarchy 2 $35 (133 reviews), vFolders 2 $39 (87 reviews), Odin $55 (about 790 ratings).
- **Price point:** $25–$45 (the third-party guidance for utility tools is $20–$50).
- **Build difficulty:** medium-high. It needs SRP/Render Graph expertise, and AI assistance helps with the C# boilerplate. MVP (scanner plus scaffold generator) in 2–3 weeks.
- **Risks:** Unity's 70% share, and no data on discovery for new publishers.

**4. Atlassian Marketplace (Forge): a Forge-native replacement for a narrow Jira or Confluence utility whose Connect-based incumbent has not migrated before Connect's Q4 2026 end-of-support**
- **Concept:** pick a single-purpose Connect app category (for example a field, report or macro utility) where the leading vendor hasn't announced Forge support. Ship a Forge-native ("Runs on Atlassian") version. The specific target must be confirmed by checking Marketplace listings for Connect-only apps.
- **Demand evidence:**
  - Connect enters full end-of-support in Q4 2026.
  - Forge apps keep 100% of revenue up to $1M lifetime, versus 75–80% for Connect.
  - Atlassian handles billing, which solves the buyer-trust problem for enterprises. — [Isogun Labs](https://isogunlabs.com/blog/atlassian-marketplace-2026/); [Atlassian dev community](https://community.developer.atlassian.com/t/marketplace-revenue-share-updates-2026/91727); [Atlassian pricing docs](https://developer.atlassian.com/platform/marketplace/pricing-payment-and-billing/)
- **Competitors:** not researched per category (a gap). Must be validated by listing review counts and install counts.
- **Price point:** per-user tiered monthly pricing (Atlassian standard), typically small per user, but enterprise seat counts multiply it. Specific price benchmarks were not captured.
- **Build difficulty:** medium. Forge is serverless JS/TS with an Atlassian-hosted runtime. MVP in 1–3 weeks, plus 10–15 business days of review.
- **Risks:** buyers in this domain are enterprises, not PC or 3D users. Discovery for new apps is undocumented.

**5. Steam (Software/Utilities), with a Microsoft Store mirror: a single-purpose, visually demo-able Windows utility for PC gamers or desktop users at $4.99–$9.99**
- **Concept direction (must be original):** follow the Lossless Scaling / Wallpaper Engine pattern. One effect that is instantly visible on the buyer's own PC or games, working across all games or the whole desktop, with no GPU vendor lock-in. Ideally it would have Workshop or community content (as Wallpaper Engine and Desktop Mate DLC do), or a passive "desktop layer" mode like the Rusty's Retirement trend. I did not find specific unmet-feature evidence. Validate demand with a Steam "coming soon" page and wishlists before building fully.
- **Demand evidence:**
  - Lossless Scaling: $7.6M–$19M gross estimated, 90%+ positive, solo developer.
  - Wallpaper Engine: about $155M gross estimated.
  - Desktop Mate: 1.9M downloads with paid DLC.
  - Rusty's Retirement: $1.9M–$4.5M estimated, and it spawned a Steam Fest subgenre. — sources in Q3
- **Competitors:** large for generic categories (wallpapers, scaling). The free Nvidia App now overlaps Lossless Scaling's main feature. — [XDA](https://www.xda-developers.com/the-nvidia-app-offers-the-best-feature-of-lossless-scaling-for-free/)
- **Price point:** $4.99–$9.99 (Lossless Scaling $6.99), or free base with paid DLC.
- **Build difficulty:** medium-high. Native Windows APIs, capture and overlay, and performance tuning. Steam's review gate means the software must fit an accepted non-game category. MVP in 2–4 weeks. Also list it free on the Microsoft Store and keep 100% through your own commerce, or pay 15% through Microsoft's.
- **Risks:** hit-driven, with outcomes ranging from Bongo Cat's roughly $2–4k/month to multi-million. Revenue estimates are unreliable.

**Honorable mentions / not recommended now**
- **JetBrains Marketplace:** a freemium plugin for an under-served framework or workflow. Good economics (85%, JetBrains handles licensing and renewals), low paid competition (about 400 paid plugins, unverified), and proven willingness to pay ($15–$40 per year subscriptions with 10–25M-download leaders). I found no specific unmet-need evidence, and JetBrains AI Assistant (256.8M downloads) dominates AI features. Difficulty medium (Kotlin, IntelliJ Platform SDK).
- **Fab code plugins:** 88% share, but 20k+ publishers, event-driven sales, discovery complaints and per-version compile gates. The MCP/AI-bridge niche is already full of free open-source tools. Only attractive if your edge is multi-version maintenance (UE 5.3–5.8) of a narrow editor utility.
- **Godot:** no paid official store yet. itch.io Godot tool sales look tiny ($132 bundle). Watch for paid assets launching on the Godot Asset Store, where being early may matter.
- **Figma, Framer, Notion templates:** fee-friendly (Framer 100%, Notion 8%+$0.40, Figma 85%), but these are design and template products rather than software tools. Figma may not be onboarding new paid sellers.

### Gaps
- I could not verify the competitor counts for opportunities 1–4 by browsing marketplace search results (hosts blocked). "No competitor found" means none appeared in search, not a confirmed absence.
- I found no Atlassian or Shopify new-app discovery or install data.
- I found no Steam wishlist-to-sales benchmarks for software (as opposed to games).
- I could not get the per-category breakdown of the Blender 5.0 survey, which is needed to pick the exact broken animation or compositor tools.
- Before building any of these, the next step is to manually check the live listing pages (Superhive search for "grease pencil," "action," "slot"; Asset Store search for "Render Graph"; Atlassian Marketplace filtered by Connect-only), which this session could not reach.
