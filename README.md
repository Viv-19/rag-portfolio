# Personal Portfolio — Vivesh Kumar Singh

A premium, agent-themed static portfolio showcasing projects and skills in AI Engineering and Backend Development.

## How to run locally

This site uses **ES modules** and **HTML partials** loaded via `fetch`. You need a local HTTP server (opening `index.html` directly in the browser will not load components).

**Option A — VS Code Live Server (recommended)**

1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
2. Right-click `index.html` → **Open with Live Server**.

**Option B — npx (no install)**

```bash
npx serve .
```

Then open the URL shown in the terminal (usually `http://localhost:3000`).

## Deploying

No build step is required. Upload the project root to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages). Ensure the site is served over HTTPS with correct paths to `css/`, `js/`, `components/`, and `assets/`.

## Features

- **Agentic UI**: Interactive portfolio agent that reveals sections as you scroll.
- **Glitch effects**: Dynamic name and tech-stack cycling in the hero.
- **Responsive design**: Optimized for desktop and mobile.
- **Modular codebase**: One file per section for easy edits and maintenance.

## Project structure

```
├── index.html              # Shell: mount points + script/css entry
├── components/             # HTML partials (one per UI section)
│   ├── navbar.html
│   ├── agent-status.html
│   ├── hero.html
│   ├── skills.html
│   ├── projects.html
│   ├── experience.html
│   └── contact.html
├── css/
│   ├── main.css            # Imports all stylesheets
│   ├── base/               # Variables, reset, utilities
│   ├── components/         # Styles per section
│   └── layout/             # Responsive breakpoints
├── js/
│   ├── main.js             # Bootstrap: load → init
│   ├── config/
│   │   ├── components.js   # Partial load order
│   │   └── content.js      # Copy, timings, agent messages
│   └── modules/
│       ├── componentLoader.js
│       ├── glitchEffects.js
│       └── portfolioAgent.js
└── assets/                 # Images, resume PDF, etc.
    └── hero_section_image.png   # Hero background (add your file here)
```

## Where to edit content

| What to change | File |
|----------------|------|
| Nav links, section markup | `components/*.html` |
| Hero name/tech cycles, agent status text | `js/config/content.js` |
| Colors, fonts, spacing | `css/base/variables.css` |
| Section-specific look | `css/components/<section>.css` |
| Load order of partials | `js/config/components.js` |
