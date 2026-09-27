# Kirana Rakshak · Showcase Website — Implementation Plan

Goal: a scroll-driven "Prototype URL" site for the iQOO Hackathon 2026 Phase 1 portal that
proves **why this idea only works on an iQOO 15**, using the *real* app prototype
(`../prototype/kirana_rakshak_ui.html`) running live inside a 3D iQOO 15 that rotates as you scroll.

## 1. Core idea

| Decision | Choice | Why |
|---|---|---|
| Phone model | Pure CSS‑3D iQOO 15 (stacked metal slices for real thickness, front glass, back "Monster Halo" camera island, side rails) | Crisp at any DPI, zero asset download, and the screen can be a **live, clickable HTML app** (a WebGL texture cannot) |
| Phone screen | `<iframe src="../prototype/kirana_rakshak_ui.html#home">` with injected CSS that strips the prototype's own chassis | Always shows the latest app build — Antigravity's edits appear automatically, no copy step |
| App control | Same-origin bridge calls the prototype's own functions (`switchScreen`, `simulateNfcCheckIn`, `triggerIrBlasterManual`, `triggerExpiredItemScan`, `replayVoiceBroadcast`) | Each scroll chapter drives the real app flow, not a screenshot |
| Scroll engine | GSAP 3 + ScrollTrigger (scrubbed, fully tied to scroll %), Lenis smooth scroll | Industry standard for scroll-mapped timelines |
| Background | Three.js particle field (6k points) that morphs per chapter: cloud → NPU grid → halo ring → India-wide scatter | "Neural" atmosphere without competing with the phone |
| Theme | App tokens (Electric Lime `#D4F639`, Obsidian `#151618`, Eggshell `#F4F4F0`) + iQOO racing orange `#FF5722` | **Lime = Kirana Rakshak software, Orange = iQOO 15 hardware** — a colour legend used everywhere |
| Type | Anton (display), Plus Jakarta Sans (app font, body), JetBrains Mono (spec chips) | Matches the portal's condensed headings + the app's own font |

## 2. Scroll story (phone pose + live app screen per chapter)

| # | Chapter | Phone pose | Live app action | iQOO hardware called out |
|---|---|---|---|---|
| 0 | Hero — "The iQOO 15 that guards every kirana" | centre-right, tilted, floating | Home (2 giant buttons) | — |
| 1 | The 5 leaks (₹16k–31k/month) | pushed right, turned away | Home | — |
| 2 | Meet the hardware | spins 180° to the back | — | 50MP UW 119°, 3× periscope telemacro, Color Spectrum sensor, halo |
| 3 | Vendor arrives — 1‑tap NFC + NavIC | front, lean left | `simulateNfcCheckIn()` → vendor scan | NFC, NavIC L5, Color Spectrum, Hexagon NPU |
| 4 | Short delivery caught (₹56) | front, lean right | Vendor bill → mismatch | 50MP UW, OCR on NPU |
| 5 | Cold chain — IR blaster | tips back to reveal top rail, IR beam to freezer | `triggerIrBlasterManual()` | IR blaster |
| 6 | Expired sale blocked | centre, whole 3D phone rumbles | Sell → `triggerExpiredItemScan()` | X‑axis linear motor, 3× telemacro |
| 7 | Hindi voice + soundbox | tips forward, sound rings from bottom speaker | Assistant → `replayVoiceBroadcast()` | Mics, stereo speakers, NPU |
| 8 | Vault + stock | front | Stock screen, ultrasonic scan glow | 3D ultrasonic fingerprint, 7000 mAh |
| 9 | Office Kit green light | shrinks beside laptop mock (customer bill + Excel) | Stock | Office Kit, USB‑C DP |
| — | Hardware matrix (bento, filter by tier) | phone hidden | — | all 12 primitives |
| — | Zero-cloud pipeline + Airplane‑mode toggle | hidden | — | model zoo |
| — | Judging pillars → our evidence | hidden | — | — |
| — | **Try it live** | centre, drag to rotate, screen clickable | Full prototype, quick-jump buttons | — |

Speech from the prototype's soundbox is muted during scroll (a nav toggle enables it).

## 3. Files

```
frontend/
  index.html          markup for all chapters
  css/style.css       tokens, layout, 3D phone, chapter styles, responsive
  js/phone.js         builds the 3D phone DOM + iframe bridge (inject CSS, call app fns, mute)
  js/particles.js     Three.js background (ES module)
  js/main.js          Lenis + GSAP ScrollTrigger timeline, counters, bento filter, airplane toggle, drag-rotate
```

## 4. Running / deploying

The bridge needs same-origin, so serve the **repo root** (not `file://`):

```
npx serve .           # or: python -m http.server 5173
open http://localhost:3000/frontend/
```

Deploy: push repo to GitHub Pages / Vercel with root = repo root; Prototype URL = `<host>/frontend/`.
Under `file://` the site still renders; screen switching falls back to reloading the iframe with a hash.

## 5. Quality bar
- 60fps: only transforms/opacity animate; slices are static layers; particles on one draw call.
- Responsive: ≥1100px side-by-side; <900px phone pinned top, chapter cards below with blur panel.
- `prefers-reduced-motion`: no scrub smoothing, no float, particles static.
- Honest claims: judging score labelled *self-assessed*; loss numbers labelled *estimates* from our field research.
