# Kirana Rakshak · iQOO Hackathon 2026

Team HoloTrio. An offline AI guard for Indian kirana stores, built on the iQOO 15.

## Folder map

```
IQOO Research/
├── README.md                  ← you are here
├── index.html                 forwards to frontend/ (so the site root works)
├── frontend/                  showcase website (scroll-driven 3D iQOO 15)
│   ├── index.html
│   ├── css/  js/  assets/
│   └── IMPLEMENTATION_PLAN.md
├── prototype/
│   └── kirana_rakshak_ui.html the app UI (runs inside the website's phone)
├── docs/
│   ├── 01_pitch/              master.md, Kirana_Rakshak.md, feature.md,
│   │                          PHASE_1_SUBMISSION_PORTAL.md, problem-statement.txt
│   ├── 02_research/           workspace audit, capability map, hackathon research,
│   │                          market analysis, opportunity gaps, sources,
│   │                          shopkeeper UX research, iQOO 15 hardware dossier
│   ├── 03_design/             design.md (design system)
│   └── 04_engineering/        TECHNICAL_SPEC_AND_ROADMAP.md
└── assets/
    ├── iqoo.jpg               portal problem-statement screenshot
    └── logos/                 logo concepts (PNG)
```

## Run the website

From this folder:

```
python -m http.server 5173
```

Then open:
- Website: http://localhost:5173/frontend/
- App UI on its own: http://localhost:5173/prototype/kirana_rakshak_ui.html

Serve the whole folder (not `frontend/` alone), the website loads the app from `../prototype/`.
