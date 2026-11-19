# Creator, Gamer and Community Tools: Unmet Needs Where a Small Paid Tool Could Sell (streamers, video creators, Discord owners/mods, modders, Steam players, small game devs)

Research date: 2026-11-19. Method note for the report writer: web search worked, but direct page fetching was blocked for most domains in this session (reddit.com, obsproject.com, docs.discord.com, gamalytic.com, lumiastream.com all failed). So upvote counts and full Reddit thread text could not be collected, and some figures come from search-result snippets of the cited pages. The session's shared web-search budget also ran out before the Godot tool-gap, Steam Direct fee, itch.io, save-backup and controller-remapping queries could run. Those items are listed under Gaps. Many sources in this space are vendor or competitor blogs; they are flagged where relevant.

**Late constraint from the user (via coordinator):** the product must be sold through an established, trusted marketplace with built-in payments (Steam, Unity Asset Store, Fab, Superhive/Blender Market, itch.io, Discord App Directory premium, Elgato Marketplace, etc.), not a personal website. The Top 5 at the end is ranked with that filter.

---

## Q1. What do streamers repeatedly ask for (overlays, alerts, chat tools, multistreaming, clip automation, VOD-to-shorts, scene automation, stream health), what paid products exist, and what are the complaints?

### Takeaway
Three 2025-2026 platform changes create the clearest openings. First, Twitch's 100-hour cap on Highlights/Uploads (from April 2025) plus short VOD expiry pushes streamers to archive and repurpose their own footage. Second, Twitch's dual-format (horizontal + vertical) streaming is built on the free Aitum Vertical OBS plugin, so 9:16 layouts and alerts are newly needed. Third, Kick's tool ecosystem lags Twitch's. The core alert/chatbot/overlay layer is saturated with free tools (StreamElements, Streamlabs free tier, Mix It Up, Streamer.bot). AI VOD-to-shorts SaaS is crowded and its per-minute pricing punishes long streams.

### Cited Findings
**Platform changes creating demand**
- Twitch put a combined 100-hour storage limit on Highlights and Uploads, unpublished items included, enforced from April 19, 2025. Channels over the limit "will risk having their Highlights and Uploads automatically deleted, starting with Highlights with the least views." Past Broadcasts (VODs) and Clips are exempt from the cap. — [Tubefilter, Feb 20 2025](https://www.tubefilter.com/2025/02/20/twitch-highlights-100-hours-limit/amp/); [AlternativeTo](https://alternativeto.net/news/2025/2/twitch-introduces-100-hour-storage-limit-for-highlights-and-uploads-starting-april-2025); [Shacknews](https://shacknews.com/article/143161/twitch-100-hour-storage-highlights-uploads)
- Twitch pushed the deadline back to May 2025 (headline only; the exact new date was not confirmed). — [Shacknews](https://shacknews.com/article/143893/twitch-vod-limit-deadline-extended)
- Past broadcasts still expire: 60 days for Partners/Turbo/Prime, 14 days for Affiliates, 7 days for everyone else. Twitch has no bulk download, so each video is downloaded by hand via the three-dot menu. — [Tubefilter](https://www.tubefilter.com/?p=184931) / [Lindsey Gamble](https://www.lindseygamble.com/blog/twitch-implements-100-hour-storage-limit-for-highlights-and-uploads) (snippets from the search summary)
- Gaming press framed it as "a really sad day for speedrunning" (speedrunners depend on archived highlights). — [GamesRadar](https://www.gamesradar.com/games/a-really-sad-day-for-speedrunning-the-worlds-fastest-gamers-brace-for-brace-for-a-new-twitch-storage-limit-on-all-highlights-and-uploads); [HotHardware: "Game Streamers Aren't Pleased"](https://hothardware.com/news/twitch-reveals-new-storage-limits)
- **Dual-format streaming:** at TwitchCon Rotterdam (May 31, 2025), Twitch announced that streamers using Enhanced Broadcasting can send a horizontal and a vertical layout at once, and that it was partnering with Aitum Vertical for OBS support. — [Twitch blog, May 31 2025](https://blog.twitch.tv/en/2025/05/31/ten-years-of-twitchcon-here-s-what-we-announced-in-rotterdam); [Tubefilter, Jun 2 2025](https://www.tubefilter.com/2025/06/02/twitchcon-twitch-vertical-live-streaming-announcement)
- The dual-format alpha started in August 2025. At TwitchCon San Diego (Oct 17, 2025), Twitch said the beta would expand to Streamlabs, Streamrun and StreamElements, with a waitlist. — [Twitch blog, Oct 17 2025](https://blog.twitch.tv/2025/10/17/ten-years-of-twitchcon-here-s-what-we-announced-in-san-diego); [Streaming Media](https://www.streamingmedia.com/Articles/News/Online-Video-News/Twitchs-Dual-Layout-Streaming-Technical-Innovation-or-Industry-Revolution-170053.aspx)
- Twitch also announced "AI clips" at TwitchCon 2025, so the platform now competes with third-party clip tools. — [AOL/news: "Twitch unveils its next era: dual-format streaming, AI clips, and new sponsorship tools"](https://www.aol.com/news/twitch-unveils-dual-221316637.html)
- One Spanish-language article dates the dual-format general rollout to a May 2026 TwitchCon Europe. This conflicts with the 2025 coverage and is unverified. — [wwwhatsnew](https://wwwhatsnew.com/?p=493044)

**OBS ecosystem**
- Aitum Vertical is free, runs on Windows and Mac, and requires OBS 29+. — [MakeUseOf](https://www.makeuseof.com/how-to-make-tiktoks-shorts-reels-in-obs-studio/)
- A 1-star review on the OBS forum complains about an in-OBS promotional banner: "30% OFF THE APP - USE CODE 'LOVE'". Aitum upsells a paid app, and users dislike ads inside OBS. — [OBS forum reviews (1-star filter)](https://obsproject.com/forum/resources/aitum-vertical.1715/reviews?rating=1)
- Aitum Multistream is marketed as "Stop paying hefty bills and start using Aitum Multistream!", i.e. a free alternative to paid multistream services. — [OBS forum resource](https://obsproject.com/forum/resources/music-on-stream.1991/)
- OBS Studio 32.0 (September 2025) added a basic built-in plugin manager. — [AlternativeTo OBS news](https://alternativeto.net/software/open-broadcaster-software/news)
- Elgato "Marketplace Connect for OBS" installs Elgato Marketplace scene collections into OBS. It needs OBS 30+ and Windows 11, and only scene collections are listed. — [Elgato help](https://help.elgato.com/hc/en-us/articles/32936167852049-Marketplace-Connect-for-OBS-Setup-Guide)
- Some OBS plugins monetize through Patreon. StreamFX "moved to a paid-only plugin," with binaries and source only for Patreon supporters. StreamUP says it is "free and always will be" but gives Patreon members "access to all products" and supporter-only themes. — [OBS forum StreamFX](https://obsproject.com/forum/resources/streamfx-for-obs-studio.578); [StreamUP release notes](https://newreleases.io/project/github/StreamUPTips/obs-streamup/release/v2.1.0)
- Poltergeist (an OBS plugin) has a paid "Broadcast Suite" tier. It added native follow and channel-point alerts on Twitch and Kick "with no external chat bot required" and a Chatbot Builder "for all Broadcast Suite users on Kick". Price not found. — [OBS forum Poltergeist update](https://obsproject.com/forum/resources/poltergeist-remote-control-overlay-mod-tools.2319/update/8120/)

**Paid suites, prices and complaints**
- Streamlabs Ultra is listed at $27/month and Ultra+ at $79 (GetApp). An older guide said $19.99/month or $149/year; the price is inconsistent across sources. — [GetApp](https://www.getapp.com/website-ecommerce-software/a/streamlabs/); [Streamlabs Ultra vs Prime](https://streamlabs.com/ar-sa/content-hub/post/what-is-streamlabs-ultra-vs-prime)
- Streamlabs complaints: a Dec 2025 Capterra review warns to be "extremely cautious of getting unauthorized billing". A Trustpilot reviewer paying $27/month says streams "crash halfway through" and calls it a waste of money. A G2 reviewer says many advanced features require a subscription that is "costly for streamers on a budget". Multistreaming costs extra. — [Capterra](https://www.capterra.com/p/228751/Streamlabs/reviews); [Trustpilot](https://ie.trustpilot.com/review/streamlabs.com); [G2](https://www.g2.com/survey_responses/streamlabs-review-4222669)
- Lumia Stream's pricing page shows a $59.99/year plan marked "most popular" (auto-renewing). SourceForge lists $4.99/month plus a free version. — [Lumia pricing](https://lumiastream.com/pricing); [SourceForge](https://www.sourceforge.net/software/product/Lumia-Stream)
- Mix It Up says it is "100% free. No subscriptions, no paywalls, no premium tiers" and runs on Windows 10/11 only. A third-party comparison says it supports Twitch, YouTube and Trovo but not Kick. — [Mix It Up](https://dev.site.mixitupapp.com/); [StreamChatAI comparison](https://streamchatai.com/alternatives/mixitup-alternative)

**Kick**
- A 2026 guide says Kick's bot ecosystem is roughly "three years behind" Twitch's, with integrations that "feel bolted on as an afterthought". It also says Nightbot has "no Kick support and none announced". (The guide is written by a vendor.) — [StreamChatAI best Kick bots](https://streamchatai.com/blog/best-kick-bots-2025-complete-guide)
- Streamlabs supports Kick (overlays, follow/tip alerts, Cloudbot) and StreamElements added Kick support. KickBot claims "150,000+ Kick streamers" (vendor claim). — [Streamlabs Kick](https://streamlabs.com/platforms/kick); [KickBot](https://www.kickbot.com)

**VOD-to-shorts / clipping**
- Opus Clip Pro is about $49/month for 250 input minutes (roughly 4 hours). Per-minute pricing makes a 3-hour Twitch stream far more expensive to process than a 10-minute YouTube video. Ssemble charges per video, $7.50 to $30/month. (Vendor/affiliate comparisons.) — [autoclip.dev true cost](https://autoclip.dev/blog/ai-clipping-tools-true-cost-per-clip-2026); [Ssemble guide](https://www.ssemble.com/blog/how-to-clip-twitch-streams-2026)
- Eklipse connects to Twitch, processes VODs automatically and returns 10-20 timestamped highlights. It cites 4.2/5 on Trustpilot from 900+ reviews (2026, self-reported). — [Eklipse blog](https://blog.eklipse.gg/tools/twitch-clip-generator.html)
- The field is crowded: Eklipse, StreamLadder, Opus Clip, Munch, Vidyo, Vizard, Ssemble, AutoClipsAI, ClipBuddy, StreamYard's clip maker, FrostyTools. — [StreamYard](https://streamyard.com/blog/stream-highlights-generator); [FrostyTools](https://frostytools.com/blog/how-to-turn-twitch-vods-into-clips-without-editing/); [Vizard](https://vizard.ai/id/tools/turn-twitch-stream-to-youtube-shorts)

**Stream health monitoring**
- Free OBS tools already cover local alerts: the Dropped Frame Alarm Lua script (sound plus graph), "Online Status" (an on-screen source that appears when frames drop), Stream Health Monitor dock (over OBS WebSocket, with a "fix-it assistant"), Stream Health HUD, and Framed (beta, Twitch only). — [Dropped Frame Alarm](https://obsproject.com/forum/resources/dropped-frame-alarm.675/); [Online Status](https://obsproject.com/forum/resources/online-status-%E2%80%93-automatic-dropped-recovered-frames-overlay.2211/); [Stream Health Monitor](https://obsproject.com/forum/resources/stream-health-monitor-dock-fix-it-assistant.2358/reviews); [Stream Health HUD](https://obsproject.com/forum/resources/stream-health-hud.2286/); [Framed](https://www.github.com/Framed-App/framed)
- An OBS forum thread titled "Alerts When Streaming Fails" asks for remote alerts. The search found no tool that notifies moderators or a phone when the stream drops. — [OBS forum thread](https://obsproject.com/forum/threads/alerts-when-streaming-fails.145425)

**VTubers (adjacent)**
- VTube Studio averaged 10,016 Steam users in April 2025, up from 7,548 in April 2024, with a peak of 21,472 concurrent users on Feb 14, 2025. It is free, with an optional watermark-removal DLC, so Steam DLC works as the paywall. Warudo stays free for indie VTubers. — [Vice](https://www.vice.com/en/article/are-more-people-becoming-vtubers-steams-stats-suggest-so/); [SteamDB VTube Studio](https://steamdb.info/app/1325860/charts); [Warudo on Steam](https://store.steampowered.com/app/2079120)

### Inferences
- Free tools have commoditized the core alert/chatbot/overlay layer (Mix It Up, StreamElements, Streamlabs free, Aitum). Paid wedges are workflow pain created by platform changes: archiving, dual-format layouts, Kick parity, and remote monitoring.
- Per-minute pricing for cloud AI clipping is a documented pain for long-form streamers. A local, GPU-based, one-time-purchase clipper sold on Steam would avoid it and would carry no per-user cloud cost for the builder.
- Twitch's native AI clips and its dual-format partnerships with Streamlabs and StreamElements threaten generic clip tools and generic vertical layouts. Niche, local-first or archive-focused tools are safer.
- VTube Studio's free app with paid watermark-removal DLC shows that streamer tools can sell on Steam.

### Gaps
- No Reddit r/obs, r/Twitch or r/streaming thread titles or upvote counts were collected (Reddit fetch blocked; searches returned no r/obs wish-list threads).
- Prices not found for Streamer.bot, Own3d, Nerd or Die, Aitum's paid app, Poltergeist Broadcast Suite, Eklipse or StreamLadder.
- No revenue data was found for any streamer tool vendor.

---

## Q2. What do Discord server owners pay for (premium bots, verification, anti-raid, onboarding, monetization), and where are the gaps or backlash?

### Takeaway
Owners pay $3-12 per server per month for leveling, tickets and moderation. MEE6's per-server paywalling (about $11.95/month) drew sustained backlash, but the replacement market is already crowded with cheap or free bots (Carl-bot, Lurkr, Arcane, PeakBot, Tickets v2 at $2.99). The fresher pain in 2025-2026 is security: compromised accounts posting scam images, hijacked moderator accounts, and malicious bots. Discord now requires paid bot features to be purchasable through its Premium Apps system, so the App Directory store is the sanctioned sales channel.

### Cited Findings
**Pricing and backlash**
- MEE6 Premium is about $11.95/month per server; annual figures conflict ($49.99 vs $89.90). A lifetime "all servers" tier costs $499.95. Leveling past level 5 and longer mute timers are paywalled, and a 2024 welcome-message paywall plus a price increase reportedly pushed communities to migrate. (Most of this comes from competitor PeakBot's blog.) — [PeakBot: why is MEE6 so expensive](https://peakbot.pro/blog/why-is-mee6-so-expensive-2026); [PeakBot pricing comparison](https://peakbot.pro/blog/discord-bot-pricing-comparison-2026)
- "All the premium MEE6 features were once completely free"; users leave because "basic and core useful features are locked behind a paywall." — [Medium/Netcord "Why People Hate MEE6?"](https://medium.com/netcord/why-people-hate-mee6-better-alternatives-733fae94217e) (date not visible)
- A weak source reports that a MEE6 add-on pricing change could push a lifetime plan to about $1,000 and was temporarily reverted after complaints. Unverified. — [lilys.ai note](https://lilys.ai/en/notes/telegram-20260128/1000-dollar-discord-bot)
- Alternatives and prices: Carl-bot premium about $5-8/month, PeakBot Pro about $8.25/month flat, and Lurkr leveling with no paywall. Arcane gates voice XP. Ree6 is open-source and self-hostable. — [PeakBot MEE6 alternatives](https://peakbot.pro/blog/mee6-alternatives-2026); [PeakBot Lurkr vs Arcane](https://peakbot.pro/blog/lurkr-vs-arcane-discord-leveling-bot-2026)
- Ticket bots: Ticket Tool premium is $8/month per server (or $66/year on its website). Tickets v2 costs $2.99/month. Tickety's custom-bot add-on is $2.49/month or $19.99/year. Ticket King prices dynamically by server size. — [Ticket Tool FAQ](https://docs.tickettool.xyz/general/faqs); [PeakBot Ticket Tool vs Tickets v2](https://peakbot.pro/blog/ticket-tool-vs-tickets-v2); [Tickety premium](https://tickety.top/docs/premium); [Ticket King pricing](https://ticketking.xyz/docs/premium/plans-and-pricing)

**Discord's monetization platform**
- Premium Apps lets bots and Activities sell user or server subscriptions and one-time purchases, with store pages in the App Directory and on app profiles, deep links to SKUs, and a "Premium Apps Growth Tier". It launched in the US and expanded to the UK and Europe. — [Discord dev support: Premium Apps](https://support-dev.discord.com/hc/en-us/articles/23810643331735); [Game Developer](https://gamedeveloper.com/business/discord-will-let-developers-monetize-their-apps); [Mava guide](https://www.mava.app/blog/a-guide-to-discord-premium-apps-and-setting-up-your-discord-store)
- A 2025 Monetization Requirements policy says developers offering paid features must support purchase through Premium Apps. — [Discord dev support article 23810643331735](https://support-dev.discord.com/hc/en-us/articles/23810643331735) (per search summary)
- An app becomes eligible for payout after its first $100 (Discord docs, as cited by a secondary blog). Official examples include a "$3.99/month per user" subscription. The revenue share could not be confirmed: one source says 30% to Discord, and a 90/10 figure appears to be outdated or about other products. — [Discord app monetization docs](https://docs.discord.com/developers/platform/app-monetization); [Dodo Payments](https://dodopayments.com/blogs/monetize-discord-bot)
- Developer anecdote: bots charge "$2 to $10 per month" for extra features. One dev with about 100 servers made $30-40/month from sponsored commands. — [Latenode community](https://community.latenode.com/t/how-to-monetize-my-discord-bot-and-earn-revenue/29042)

**Paid-community gating (Discord owners selling access)**
- Whop charges 2.7% + 30¢. Some sources report an extra 3% on sales that use Discord access automation; whether that still applies is disputed. LaunchPass is reported at $29/month + 3.5% (sources conflict). — [SchoolMaker Whop pricing](https://www.schoolmaker.com/blog/whop-pricing); [Mava paid Discord community](https://mava.app/blog/how-to-create-a-paid-discord-community); [CreatorEconomyTools LaunchPass](https://creatoreconomytools.com/tool/launchpass)

**Security and scam pain (2025-2026)**
- Hijacked accounts spread fake MrBeast giveaways and crypto-casino promotions. Attackers prefer established profiles because they already have friends and server memberships. RaidProtect reports "tens of thousands of compromised accounts" in 2026 scam campaigns. — [Bitdefender](https://www.bitdefender.com/en-us/blog/hotforsecurity/hackers-are-using-stolen-discord-accounts-to-spread-fake-mrbeast-giveaways); [Cyber Daily AU](https://www.cyberdaily.au/security/13878-bro-a-wave-of-discord-account-takeovers-is-spreading-a-mrbeast-crypto-scam)
- June 2025: attackers hijacked moderator accounts on popular servers and added malicious bots for phishing. "Discord has yet to implement robust protections like forced 2FA for moderators or real-time alerts for suspicious behavior." — [GamingHQ, Jun 2 2025](https://gaminghq.eu/2025/06/02/new-discord-exploit-targets-communities-through-moderator-access-and-malicious-bots)
- Check Point (June 2025): a campaign hijacked expired invite links and compromised more than 1,300 users in 8 countries. — [SecureBlink](https://www.secureblink.com/threat-feeds/discord-malware-hijacks-expired-invite-links-to-steal-crypto-wallets-in-2025)
- A stolen bot token (Double Counter) was reportedly used to push spam invites into about 50 large communities; data tied to about 28M accounts was reportedly exposed. Date unclear. — [Cybernews](https://cybernews.com/security/discord-user-data-breach/)
- Existing anti-scam bots scan images for fake Nitro and promotions (AntiScamBot, CommunityOne). Community threads ask how to "Stop Crypto Scam Images in Discord." — [CommunityOne forum](https://communityone.io/ar/servers/943932308283588628/discord-builders-hub/forum/block-crypto-scam-images-discord/); [CommunityOne anti-scam](https://communityone.io/en/servers/943932308283588628/discord-builders-hub/forum/stop-crypto-scams-discord-bot/)

**Age verification (2025-2026)**
- Discord added UK Online Safety Act age assurance (face estimation or ID) in July 2025. Unverified users see age-restricted server content blurred. Persona was used in a UK experiment. An October 2025 breach may have leaked about 70,000 age-verification ID photos (K-ID said it was not involved). A February 2026 report says users must complete a face or ID scan or be restricted. — [Discord safety](https://discord.com/safety/adapting-discord-for-the-uk-online-safety-act); [PC Gamer](https://www.pcgamer.com/hardware/gaming-mice/age-verification-checks-are-now-in-force-in-the-uk-because-of-the-online-safety-act-but-with-the-discord-fallout-it-seems-like-one-bad-idea-after-another); [PinkNews, Feb 10 2026](https://www.thepinknews.com/2026/02/10/discord-users-face-id-scans/)
- One marketing-style page claims admins can auto-block unverified users through a "Workflow automation studio". Unverified. — [UBOS](https://ubos.tech/?p=60931)

### Inferences
- Leveling, ticket and general-purpose moderation bots are a race to the bottom ($2.99-8/month, with many free options). A new MEE6 clone is a poor bet.
- Security and anti-scam tooling (compromised-account detection, mod-permission hardening, cross-channel image spam) is the better wedge: the pain is acute, recurring in 2025-2026 news, and Discord's native protections are reportedly lacking.
- Because Discord requires Premium Apps for paid features, the App Directory store is both mandatory and the built-in discovery and payments channel, which fits the user's marketplace constraint.

### Gaps
- The exact Premium Apps revenue share, and whether it changed in 2025-2026, could not be confirmed because docs.discord.com was unreachable.
- No prices found for Carl-bot (official), Wick, Double Counter or RaidProtect.
- No r/discordapp or r/Discord_Bots thread titles or upvote counts were collected.

---

## Q3. What do Steam/PC gamers and modders want and pay for (mod managers, save backup/sync, library management, performance overlays, controller remapping)?

### Takeaway
Steam shoppers will pay $5-7 for a single utility that solves a felt PC problem, with very large results: Lossless Scaling and Wallpaper Engine have millions of owners. Desktop-resident "while you work" apps also sell well (Rusty's Retirement). Free-to-play with item drops did not pay (Bongo Cat). On modding, Nexus Mods killed its cross-platform app in January 2026, leaving Linux, Steam Deck and Steam Machine modders on workarounds, but modders expect mod managers to be free.

### Cited Findings
- **Lossless Scaling:** $6.99 on Steam, with an estimated 2,000,000-5,000,000 owners on SteamSpy (owner estimates, not sales). Windows Central calls it a "$7 app" that adds upscaling and multi-frame generation "on any GPU with any game". Press says it "really exploded in popularity". A SteamDB snapshot shows it at #254 in top sellers with an 87.67% rating. — [SteamSpy](https://steamspy.com/dev/THS); [Windows Central](https://www.windowscentral.com/gaming/pc-gaming/best-non-game-steam-apps); [SteamDB Software tag](https://steamdb.info/tag/8013)
- **Wallpaper Engine** ($4.99): estimates conflict, from about 30.4M copies and $117M gross (GameSensor) to about 50.15M copies and $250M (VaporLens). Its concurrent peak was 150,375 (Aug 30, 2023). It has been described as "one of the 10 biggest games on Steam". — [GameSensor](https://gamesensor.info/app/431960); [VaporLens](https://vaporlens.app/app/431960/wallpaper_engine/stats/details); [Mein-MMO](https://mein-mmo.de/en/why-the-german-wallpaper-engine-for-4-e-is-one-of-the-10-biggest-games-on-steam,857028/)
- **Rusty's Retirement** (an idle farm on the bottom of the desktop): 200,000 copies in under 3 weeks after its April 2024 launch, and about 330,000 by August 2024 per GameDiscoverCo. It holds 97% positive across 14,721 reviews. The solo developer "only learned to code 5 years ago" and has sold 750,000 copies across 2 games. (2024 data, older than the requested window.) — [GameDiscoverCo](https://newsletter.gamediscover.co/p/how-rustys-retirement-idle-farmed); [GamesRadar](https://www.gamesradar.com/games/simulation/indie-dev-behind-quietly-massive-steam-trend-says-they-only-learned-to-code-5-years-ago-but-have-made-2-games-selling-750-000-copies-i-still-dont-believe-it-myself-sometimes); [Automaton](https://automaton-media.com/articles/newsjp/rustys-retirement-20240828-308175/)
- **Bongo Cat** (free, Steam item drops) topped SteamDB's 2025 top-rated software list (95.54%, March 2025). Net revenue was only about $2,000-4,050/month (Mar-Jun 2025). The developer says "Financially, we're in the red" and estimates about half of active sessions are bots farming items. — [PC Gamer](https://www.pcgamer.com/gaming-industry/game-development/top-10-steam-game-bongo-cat-is-actually-losing-us-money-says-dev-which-is-fine-because-its-been-great-for-business-before-we-knocked-on-50-doors-now-they-are-coming-to-us); [WN Hub](https://wnhub.io/news/stores-and-publishing/item-48117); [SteamDB 2025 software](https://steamdb.info/stats/gameratings/2025/?tagid=8013)
- **Nexus Mods App discontinued (January 2026):** Nexus "stopped development" to focus on the Windows-only Vortex, saying "We were competing with ourselves". There is no automatic migration path, and Vortex SteamOS support is "in the works". — [PC Gamer](https://www.pcgamer.com/games/nexus-mods-kills-its-multiplatform-mod-manager-in-favour-of-its-windows-only-vortex-app-we-were-competing-with-ourselves-instead-of-solving-the-actual-problems/); [Nexus FAQ](https://help.nexusmods.com/article/164-discontinuing-the-nexus-mods-app-faq); [GamingOnLinux](https://gamingonlinux.com/2026/01/nexus-mods-retire-their-in-development-cross-platform-app-to-focus-back-on-vortex)
- GamingOnLinux commenters call Vortex "a buggy and overcomplicated mess" and the app's loss "a big blow for the Linux modding scene". Mod Organizer 2 runs under Wine/Proton, and Limo is a native Linux alternative. — [GamingOnLinux comments](https://www.gamingonlinux.com/2026/01/nexus-mods-retire-their-in-development-cross-platform-app-to-focus-back-on-vortex/page=2)
- **Linux/SteamOS base:** Linux passed 5% of the Steam survey in March 2026 (an all-time high) and was 4.01% in July 2026. SteamOS Holo is 22.24% of Linux users and CachyOS 14.31%. The Steam Machine has been released, and it and the Steam Frame run SteamOS. Survey figures are erratic. — [GamingOnLinux Apr 2026](https://www.gamingonlinux.com/2026/04/linux-smashes-past-5-percent-on-the-steam-survey-for-the-first-time/page=6); [GamingOnLinux Jul 2026](https://www.gamingonlinux.com/2026/08/linux-back-over-4-percent-in-the-july-2026-steam-survey/page=1/); [GamingOnLinux Jun 2026](https://gamingonlinux.com/2026/07/steam-survey-june-2026-shows-linux-dip-to-3-69-percent)
- **Library managers:** Playnite is free and open-source with 44 library integrations. GOG Galaxy 2.0 got an update on Dec 2, 2025, and GOG became independent in December 2025, but many Galaxy integrations are unmaintained (per Playnite's docs, a competitor source). — [tech-insider](https://tech-insider.org/gog-galaxy-vs-playnite-2026/); [Playnite docs](https://api.playnite.link/docs/manual/gettingStarted/comparisonWithOtherSoftware.html)

### Inferences
- Steam is a proven storefront for $5-7 PC utilities that fix a gamer pain (frame generation, wallpapers). A rough calculation for Lossless Scaling: 2-5M owners × $6.99 gives about $14-35M gross at list price. After discounts, regional pricing, refunds and Valve's cut, a 30-50% net (per the [impress.games heuristic](https://impress.games/blog/calculate-estimate-steam-game-sales-revenue-profit)) would be roughly $4-17M. This is an order-of-magnitude inference, not a reported figure.
- Desktop-resident "ambient" apps sell on Steam when paid up front (Rusty's Retirement) but not as free-to-play with item drops (Bongo Cat).
- The Linux/SteamOS modding gap is real, but mod managers are expected to be free, they are complex, and they depend on Nexus/Thunderstore APIs and terms. Poor fit for a quick paid build.

### Gaps
- Not researched before the search budget ran out: save-game backup/sync demand (e.g., Ludusavi, non-Steam-Cloud games on Steam Deck), performance overlays (including Steam's own overlay changes), controller remapping (reWASD pricing) and r/pcgaming, r/Steam, r/SteamDeck, r/skyrimmods threads.
- No authoritative sales numbers for Lossless Scaling; Gamalytic was unreachable.

---

## Q4. What do small indie devs (Unity/Godot/Unreal) buy in the tools category, and what tool gaps do they report?

### Takeaway
Editor extensions are a proven paid category on the Unity Asset Store: Odin Inspector has 12,382 favorites at a $55 list price. Fab pays sellers 88% and is the most generous engine marketplace. Godot's official Asset Store is live, but paid sales are not yet enabled. Indie Steam-marketing and wishlist analytics is a hot pain (20K+ games released in 2025), but it is already crowded with new SaaS tools, mostly sold from personal websites.

### Cited Findings
- Odin Inspector and Serializer is listed at $27.50 (discounted from $55) with 12,382 favorites. It uses a one-time licence for smaller teams and an Enterprise licence above a revenue threshold. Reddit opinion is split between "must-buy" and "unjustified" pricing. — [Unity Asset Store: Odin](https://assetstore.unity.com/packages/tools/utilities/odin-inspector-and-serializer-89041); [Odin reviews](https://assetstore.unity.com/packages/tools/utilities/odin-inspector-and-serializer-89041/reviews)
- Unity keeps a dedicated "Best-selling tools" page (13,000+ top-rated assets) and a "Tools for experts" page. — [Unity best-selling tools](https://assetstore.unity.com/best-selling-tools); [Tools for experts](https://assetstore.unity.com/tools-for-experts)
- One blog claims editor tools are the highest-earning Asset Store category, with top sellers making "tens of thousands of dollars per month". Low reliability (promotional blog, no named examples). — [generalistprogrammer](https://generalistprogrammer.com/tutorials/unity-asset-store-selling-guide-revenue)
- Unity Asset Store split is 70/30, with no publishing fee (secondary source). Fab pays creators 88%; it paid 100% from its October 2024 launch to the end of 2024. One seller's 2026 retrospective says some fees come out before the 88/12 split. — [tech-insider comparison](https://tech-insider.org/unity-asset-store-vs-fab-vs-cgtrader-2026/); [Epic Fab docs](https://dev.epicgames.com/documentation/fab/fab-documentation); [Game Developer](https://www.gamedeveloper.com/marketing/epic-to-unify-content-marketplaces-and-offer-creators-88-percent-revenue-cut); [StraySpark retrospective](https://www.strayspark.studio/blog/fab-marketplace-12-month-retrospective-seller-2026)
- The Godot Foundation launched the Godot Asset Store to replace the Asset Library. "Once we are happy with the new platform, we'll start rolling out paid assets," and it will be fully integrated in Godot 4.7. A later report says direct sales are not yet permitted. — [Godot blog](https://godotengine.org/article/introducing-the-godot-asset-store/); [PocketGamer.biz](https://www.pocketgamer.biz/game-engine-godot-rolls-out-asset-store-in-early-beta); [80.lv](https://80.lv/articles/godot-is-launching-a-new-asset-store-to-replace-the-old-asset-library)
- Steam discovery pressure: more than 20K games launched in 2025 vs 9,654 in 2020. TikTok's organic reach collapsed in early 2025. Valve raised the "Popular Upcoming" threshold from about 7,000 to 100,000 wishlists. — [Outlook Respawn](https://respawn.outlookindia.com/gaming/gaming-originals/the-indie-game-discovery-problem-is-getting-worse); [games.gg](https://games.gg/news/steam-popular-upcoming-indie-personal-calendar/)
- Crowded marketing-tool field: Steam Wishlist Pulse (Product Hunt), MarketYourIndie, Wish-Graph (early access), Glitch's AI marketing agent, and a 2026 list of 18 free Steam-page audit tools. — [Product Hunt](https://www.producthunt.com/products/steam-wishlist-pulse/reviews?page=2); [Indie Hackers MarketYourIndie](https://www.indiehackers.com/product/marketyourindie); [gamineai list](https://gamineai.com/blog/top-18-free-steam-page-conversion-auditing-tools-indie-devs-2026-q3-capsule-trailer-wishlist-page-visit-funnel-coverage)

### Inferences
- Editor productivity and workflow tools on Unity (70%) or Fab (88%) fit the marketplace constraint and a solo builder with an AI coding agent. Discovery is built in, and buyers already pay $20-60 one-time.
- Godot's paid store is a future first-mover opportunity. Building Godot addons now and listing them free or on itch.io until paid assets open could establish ranking early. This is a speculative timing bet.
- Steam marketing analytics is in demand but crowded and sold as website SaaS, which conflicts with the marketplace constraint.

### Gaps
- No specific r/gamedev, r/godot or r/Unity3D "tool I wish existed" threads were collected (Reddit blocked; search budget exhausted before the Godot query ran).
- No itch.io tools-category sales data, and no Unity Asset Store top-tools ranking with sales figures.

---

## Q5. Which of these markets have built-in marketplaces or discovery with payments?

### Takeaway
Six relevant channels have built-in payments: Steam (software and DLC), the Discord App Directory with Premium Apps (now mandatory for paid bot features), the Elgato Marketplace (Stream Deck plugins, OBS scene collections, overlays; 70% to makers), the Unity Asset Store (70%), Fab (88%) and Superhive/itch.io (not researched here). The OBS forum and the Godot Asset Store currently have no payments.

### Cited Findings
- **Elgato Marketplace:** makers keep 70% of each sale (70/30), paid out through Stripe Connect; paid products cannot be listed from unsupported countries. Launched October 2023 and replaced the old Stream Deck store; plugin updates now go only through the Marketplace. Marketplace Connect installs scene collections directly into OBS. — [Elgato docs: revenue share](https://docs.elgato.com/monetization/revenue-share); [Elgato FAQ](https://marketplace.elgato.com/learn/announcements/stream-deck-marketplace-questions-answered); [BusinessWire, Oct 2023](https://businesswire.com/news/home/20231012717904/en/5535176/Elgato-Launches-Digital-Creator-Marketplace); [Elgato help](https://help.elgato.com/hc/en-us/articles/32936167852049-Marketplace-Connect-for-OBS-Setup-Guide)
- **Discord App Directory and Premium Apps:** subscriptions, one-time purchases and store pages, with the 2025 requirement that paid features support Premium Apps purchase. — [Discord dev support](https://support-dev.discord.com/hc/en-us/articles/23810643331735)
- **Steam:** has "Software" and "Utilities" tags with top sellers such as Wallpaper Engine, Lossless Scaling and VTube Studio (free plus DLC). — [SteamDB Software tag](https://steamdb.info/tag/8013); [SteamDB Utilities](https://steamdb.info/tag/87); [Tom's Guide](https://www.tomsguide.com/gaming/pc-gaming/im-a-pc-gamer-and-i-wish-i-knew-about-these-5-steam-apps-to-boost-my-gaming-setup)
- **Unity Asset Store:** 70/30. **Fab:** 88/12. **Godot Asset Store:** free only for now. — see Q4 citations.
- **OBS:** the forum hosts free plugins, and OBS 32 added a plugin manager. No OBS payment system was found; paid OBS plugins use Patreon (StreamFX, StreamUP). — [AlternativeTo](https://alternativeto.net/software/open-broadcaster-software/news); [OBS forum StreamFX](https://obsproject.com/forum/resources/streamfx-for-obs-studio.578)

### Inferences
- For streamer tools, the Elgato Marketplace is the best fit for the marketplace constraint. A Stream Deck plugin can wrap OBS WebSocket automation, and scene collections and overlays install into OBS through Marketplace Connect.
- Steam suits standalone Windows (and SteamOS) desktop utilities.
- The Discord App Directory store suits bots, and Discord policy now requires it.

### Gaps
- Not verified this session: Steam Direct's $100 fee and non-game software rules, itch.io's default revenue share, Superhive (Blender Market) terms, and the Discord Premium Apps fee percentage.

---

## Top 5 candidate product ideas from this angle (filtered for the marketplace-only constraint)

### 1. "VOD Vault": local-first stream archiver and long-stream highlight finder
- **Marketplace:** Steam (Software category). One-time price around $9.99-19.99, or a free base with paid DLC, VTube Studio-style.
- **Problem:** Twitch VODs expire in 7, 14 or 60 days. Highlights and Uploads are capped at 100 hours (enforced from April-May 2025, least-viewed deleted first), and there is no bulk download. Cloud AI clippers charge per input minute, which punishes 3-6 hour streams (Opus Clip Pro: $49 for 250 minutes).
- **Evidence strength:** Strong for the pain (platform policy, wide press coverage, speedrunner backlash). Strong for willingness to pay for clipping (many paid tools; Eklipse has 900+ Trustpilot reviews). Medium for willingness to pay for archiving specifically.
- **Competitors and prices:** Opus Clip ($49/month), Ssemble ($7.50-30/month), Eklipse and StreamLadder (prices not found), Vizard, Munch, and Twitch's own AI clips (announced Oct 2025).
- **Differentiated angle:** Runs on the streamer's GPU with no per-minute cost. It works from local OBS recordings rather than scraping Twitch, which avoids ToS gray areas. It logs live chat through official chat/EventSub while streaming to detect hype spikes, transcribes locally with Whisper, cuts 9:16 shorts with face/cam crop, and keeps a searchable archive. Twitch removing content is the hook for the store page.
- **Build difficulty:** Medium. Needs ffmpeg, local Whisper, chat-spike plus audio-energy heuristics, a simple editor UI and a Steamworks build. An MVP (record-folder watcher, chat log, transcript search, auto-cut top N moments) is feasible in 2-3 weeks.

### 2. Discord "Compromised-Account and Scam-Image Shield" bot
- **Marketplace:** Discord App Directory with Premium Apps server subscription, around $2.99-4.99 per server per month (in line with Ticket Tool at $8 and Tickets v2 at $2.99). Premium Apps is mandatory for paid bot features anyway.
- **Problem:** Waves of hijacked accounts post crypto, MrBeast and fake-Nitro scam images across every channel. Moderator accounts are hijacked to add malicious bots, and Discord reportedly lacks forced moderator 2FA and real-time alerts.
- **Evidence strength:** Medium-strong. Recurring 2025-2026 incidents (Bitdefender, Check Point June 2025, GamingHQ June 2025), RaidProtect's "tens of thousands" of compromised accounts in 2026, and community threads asking to "stop crypto scam images".
- **Competitors:** AntiScamBot, CommunityOne anti-scam, Wick, RaidProtect, Double Counter (prices not found), and Discord's free AutoMod.
- **Differentiated angle:** Narrow and fast. It detects the same image or link posted across 3 or more channels within seconds, uses perceptual hashes of known scam templates plus OCR for "gift/airdrop/$" text, auto-timeouts and purges across all channels, and DMs the user a "you've been hacked" recovery guide. It adds a mod-permission audit (who can add bots or manage webhooks), new-bot-added alerts and a one-click lockdown, with a free tier for small servers.
- **Build difficulty:** Low-medium. The bot runs on discord.js or discord.py with an image-hash library and OCR. Main costs are hosting and image processing at scale. An MVP takes about 1-2 weeks.

### 3. Stream watchdog / "mod pager" Stream Deck plugin with an OBS companion
- **Marketplace:** Elgato Marketplace, 70% to the maker. Paid Stream Deck plugin around $4.99-9.99 one-time.
- **Problem:** Existing free OBS tools alert only locally (sound or on-screen). Nothing found notifies moderators or the streamer's phone when the stream drops, the bitrate tanks, the mic is muted, or the scene is stuck on "BRB". OBS forum threads ask for remote alerts when streaming fails.
- **Evidence strength:** Medium-weak. The local-tool proliferation shows the need, but no remote-alert product or volume data was found.
- **Competitors:** Free local tools (Dropped Frame Alarm, Online Status, Stream Health Monitor dock, Stream Health HUD, Framed beta), plus Streamlabs and StreamElements dashboards.
- **Differentiated angle:** A Stream Deck key shows live health color. Over OBS WebSocket it watches dropped frames, the encoder, audio silence on the mic and how long a scene has been on, and posts to a Discord mod channel webhook or phone push. It can also auto-switch to a "technical difficulties" scene and back.
- **Build difficulty:** Low. The Stream Deck SDK (Node/JS) plus OBS WebSocket plus a Discord webhook makes an MVP in days. Caveat: the market is small and it is easy to clone.

### 4. Dual-format (vertical + horizontal) overlay and alert kit
- **Marketplace:** Elgato Marketplace (scene collections install into OBS through Marketplace Connect). A Gumroad mirror is not allowed under the constraint, so Elgato only.
- **Problem:** Twitch's dual-format streaming (alpha August 2025, beta expanding since October 2025) runs through Aitum Vertical in OBS. Streamers need 9:16-safe layouts, alerts, chat boxes and camera frames that work in both canvases at once.
- **Evidence strength:** Medium. The platform shift is confirmed, but no direct requests or volume data were collected.
- **Competitors:** The free Aitum Vertical plugin, Streamlabs, StreamElements and Streamrun (Twitch beta partners), and Own3d and Nerd or Die overlay shops (prices not found).
- **Differentiated angle:** Paired 16:9 + 9:16 scene collections tuned for Twitch dual-format and Aitum Vertical, with alert and chat widgets that respect mobile UI safe zones.
- **Build difficulty:** Low technically. The heavier work is design, so success depends on the art and on Elgato Marketplace ranking. Risk: the platform partners may bundle free equivalents.

### 5. Editor productivity tool for Unity or Unreal, with Godot when paid assets open
- **Marketplace:** Fab (88%) and/or the Unity Asset Store (70%). The Godot Asset Store is the next channel once it enables paid assets.
- **Problem:** Indie devs buy editor extensions to save time (Odin Inspector: 12,382 favorites, $55 list). Specific unmet gaps were not collected in this pass, which is the weak link.
- **Evidence strength:** Medium for the category (willingness to pay is proven by best-selling-tools pages and Odin's traction); weak for any specific problem.
- **Competitors:** Odin ($55 list), plus thousands of tools on Unity's best-selling tools list.
- **Differentiated angle:** Pick a narrow, frequent workflow annoyance (to be validated in r/Unity3D, r/unrealengine and r/godot) and ship engine-native. A Godot port is the low-cost first-mover play when paid listings arrive.
- **Build difficulty:** Low-medium for editor scripts. An AI coding agent is well suited to C# editor tooling and Unreal editor Python.

**Dropped or deprioritized under the marketplace constraint:**
- Kick multi-platform chatbot/alerts (would need website SaaS billing; KickBot, Streamlabs and StreamElements already cover Kick).
- Steam wishlist analytics (crowded and website-sold).
- A Linux/SteamOS mod manager (real gap after Nexus dropped its app in January 2026, but hard to build and expected free).
- MEE6-style leveling or ticket bots (saturated at $2.99-8/month).
- A free-to-play desktop pet with Steam item drops (Bongo Cat was unprofitable).
