# Why Moving Day (and not the report's #1 pick)

The research report ranked a **Blender Grease Pencil → mesh add-on** for Superhive first, with a rule: *before writing code, check for a maintained paid competitor; if one exists, pivot.*

That check failed the idea:

- **Pencil Mesh** (Superhive, **$6**) already converts Grease Pencil v3 strokes to mesh on Blender 4.3–5.2: ribbons, pressure width, fills with holes.
- **Grease Mesh** (free, extensions.blender.org) does the same job.
- Blender 5.3's built-in convert makes wire-only output, but a $24 add-on can't beat a $6 one plus a free one.

The strongest remaining idea from the research was the PC migration tool (report rank #6). The report scored it low only because it can't be run in this Linux machine, and that turned out to be solvable:

| | Evidence |
|---|---|
| **Fresh gap** | Microsoft removed Windows 11's local PC-to-PC migration in the October 2026 update (KB5127648). PCWorld, Betanews, Windows Latest, Windows Report and ElevenForum all covered it. The replacement, Windows Backup, uses OneDrive (5 GB free) and doesn't move apps. |
| **Timing** | Holiday PC buying season, plus Windows 10 holdouts (~28% of PCs in mid-2026) moving to new hardware. |
| **People already pay** | PCmover Express $29.95 (no apps), PCmover Professional $59.95, EaseUS Todo PCTrans paid tiers. |
| **Trusted store** | Microsoft Store: free for individuals since Sept 2025, Microsoft signs the app (no SmartScreen warning), 250M monthly users, takes a 15% cut. |
| **Buildable here** | Electron runs headless in this container. The copy engine, the box format and the UI are all tested here. Only the thin Windows layer (winget, netsh, registry) needs a check on a real PC. |
| **Low risk by design** | Copy-only. Never overwrites or deletes on the new PC. Every file is SHA-256 verified. |

Price: **$14.99 one-time**, half of PCmover Express, and it also reinstalls apps.

Sources: [PCWorld](https://www.pcworld.com/article/3279037/microsoft-kills-built-in-pc-to-pc-transfers-in-windows-11.html) · [Windows Latest](https://windowslatest.com/2026/11/02/microsoft-doesnt-care-if-you-hate-onedrive-kills-windows-11s-best-local-way-to-move-to-a-new-pc-and-only-gives-you-5gb-free) · [Betanews](https://betanews.com/article/microsoft-removes-pc-to-pc-file-transfer-windows-11/) · [ElevenForum thread](https://www.elevenforum.com/t/microsoft-kills-built-in-pc-to-pc-transfers-in-windows-11.50774/) · [Microsoft Store free registration](https://blogs.windows.com/windowsdeveloper/2025/09/10/free-developer-registration-for-individual-developers-on-microsoft-store/) · [Pencil Mesh on Superhive](https://superhivemarket.com/products/pencil-mesh) · [Grease Mesh](https://extensions.blender.org/add-ons/grease-mesh/)
