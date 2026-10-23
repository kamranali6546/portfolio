# Architectural Decisions (DECISIONS.md)

This log documents key architectural, engineering, and design decisions made for the personal portfolio of **Kamran Ali, Senior Frontend Developer**.

---

### 1. Honesty Rules & Source of Truth Discipline
- **Strict Data Grounding**: Only verified factual claims from the resume are used. No metrics, clients, awards, or certifications were fabricated.
- **Dynamic Computed Counters**: Rather than hardcoding project counters, numbers are derived at runtime via `projects.length`.
- **Todos Resolved**:
  - `business-class-for-less`: Confirmed designed and developed by Kamran Ali, published as Tier 1 with custom flight search matrix and quote funnel.
  - Contact Details: WhatsApp (`+995 568 772 744`) and Primary Phone (`+92 346 8051600`) integrated with direct action links.
  - Profile Image & Zero-AI Enforcement:
    - All synthetic AI-generated images and mock headshots permanently removed.
    - Added dedicated `usePortrait` reactive hook and `/api/upload-portrait` dev-server endpoint writing directly to disk (`public/assets/portrait*`).
    - Added interactive `PortraitUploader` (drag & drop or 1-click select) right on Hero, About, and Navbar profile switcher so Kamran's exact provided image (`kamran-portrait.png`) is rendered everywhere.
    - Theme-Matched Background: Built Python processor `scripts/process-portrait-theme.py` to seamlessly replace the light circular background with the website's dark cinematic obsidian `#07070a` and forest emerald `#0F5C4A` lighting, eliminating white corner borders and blending 100% naturally into the dark Netflix series UI while preserving every pixel of Kamran's real face, hair, and suit.
    - Auto-Processing Endpoint: `/api/upload-portrait` automatically runs the theme processor on newly uploaded photos.
  - Minimal Content Across Every Section:
    - Hero: Short, punchy 2-line intro and clean metadata pills.
    - About: 1-line architectural quote, compact 4-item fact sheet, and focused pillars.
    - Seasons: All episode descriptions trimmed to 1 concise sentence highlighting verified metrics (+35% engagement, +80% mobile traffic, -45% load time, -90% defects).
    - Originals: Punchy loglines with technical architecture diagrams (no AI slop posters).
    - Top Picks: Ultra-crisp 10 resume highlights.
    - Skills & Moments: Minimal 1-sentence explanations.
- **Simplified Illustration Disclaimers**: Technical diagrams carry explicit `"SIMPLIFIED ILLUSTRATION"` badges.

---

### 2. Design System & Palette Mathematics
- **Color Palettes**:
  - **Light Theme**: Canvas `#F7F4EE` (warm ivory), Text `#14171A` (rich ink), Hairlines `#E2DDD3`, Accent `#0F5C4A` (deep forest emerald), Secondary `#B08D57` (muted brass).
  - **Dark Theme**: Canvas `#0E1113` (charcoal), Text `#EDE9E0` (ivory), Hairlines `#23292E`, Accent `#8FD9BE` (mint), Secondary `#C9A56A` (brass).
- **Contrast & WCAG 2.2 AA**: All primary and secondary text pairs exceed 4.5:1 (normal text) and 3:1 (large text / UI controls). Dark mode applies optical compensation (`letter-spacing: +0.01em`).
- **Zero-Pill Discipline**: Metadata is rendered as clean unboxed text separated by typographic slashes (`/`) and middots (`·`). Interactive filters utilize subtle segmented tabs instead of candy badges.

---

### 3. Motion & Interaction Budget
- **Prefers-Reduced-Motion**: Fully respected via CSS media queries and the `useReducedMotion` hook. Animations collapse to instant or subtle opacity settles.
- **Intro Monogram**: Renders the "KA" vector stroke under 1.2s, skippable with `Esc` or button, and triggers only once per browser session via `sessionStorage`.
- **Signature Component Visual**: Pure lightweight SVG with compositor-only CSS transforms (`translate3d`), gentle pointer parallax on desktop, and automatic pausing via `IntersectionObserver` when off-screen.
- **3D Card Tilting**: Capped at 3.5 degrees with fine-pointer detection (`pointer: fine`), completely disabled on touch devices to eliminate scroll interference.

---

### 5. Streaming Series Architecture (Sushmita Dasari Portfolio_series Model)
- **Cinema Opening Sequence**: Faithful recreation of the cinematic letterbox sequence featuring the studio card `"A KAMRAN ALI ORIGINAL SERIES"`, projector flicker lights, high-contrast title typography (`"KAMRAN: THE SERIES"`), and Kamran's portrait reveal with magnetic `▶ PLAY` and `SKIP INTRO`.
- **"Who's Watching?" Profile Selector**: Provides role-based customized section ordering:
  - *Kamran Ali*: Full chronological series (About, Seasons, Originals, Top Picks, Skills, Moments, Story).
  - *Recruiter*: Screenplay, achievements, skills, and originals first.
  - *Developer*: Originals, architecture, skills, and seasons first.
  - *Creative / Founder*: Career arc, top picks, and case studies first.
- **Episode & Season Narrative Structure**: Organizes Kamran's verified career history into 5 distinct seasons with episode runtime codes (`S01 E01` through `S05 E01`), tags, and metrics.
- **Netflix Originals Showcase & Diagrams**:
  - Pure horizontal track architecture: Removed vertical scroll-pinning (`calc(100vh + dist)`). Originals now only scrolls horizontally when the user explicitly scrolls horizontally (horizontal wheel, trackpad swipe, mouse drag, or arrow controls). Normal vertical page scroll passes through without interruption.
  - Interactive navigation: Desktop floating chevron controls (`‹` and `›`), grab-and-drag cursor interaction with drag-threshold click protection, and an active horizontal progress indicator.
  - Deep-dive `ProjectModal` featuring verified technical work, callouts, and interactive animated SVG architecture diagrams (*CSR vs SSR Crawl Ingestion*, *Stripe & Mada Dual Payment Routing*, and *Multi-Portal Relations*).
- **Top 10 Numbered Cards & Golden Laurel Awards**: Giant outline numbering (`1..10`) for resume benchmarks and gold laurel wreath badges for certified achievements.
- **Interactive Audio**: Embedded Web Audio API synthesizer generates the signature cinematic bass chord without external audio files or network requests.

