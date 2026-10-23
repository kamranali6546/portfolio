# Kamran Ali – Senior Frontend Developer Portfolio

A production-grade, editorial portfolio for **Kamran Ali**, Senior Frontend Developer with over 6 years of experience architecting high-performance web applications, enterprise design systems, and AI-assisted workflows.

---

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Runs the Vite development server with hot module reload on `http://localhost:3000`.

### Type Check & Build
```bash
npm run lint
npm run build
```

---

## 📦 Project Architecture

```
├── .github/workflows/ci.yml    # CI test and lint pipeline
├── public/                     # Static assets (fonts, icons, CV PDF)
│   └── work/                   # Device mockups & screenshot captures
├── scripts/
│   └── capture.ts              # Playwright automated screenshot script
├── src/
│   ├── components/
│   │   ├── case-studies/       # Tier 1 modal and Tier 2 drawer + diagrams
│   │   │   └── diagrams/       # CSR vs SSR, Payment flow, Portal architecture
│   │   ├── common/             # Custom cursor, TODO review drawer
│   │   ├── intro/              # Monogram stroke SVG preloader
│   │   ├── layout/             # Slim 3-zone Header, Editorial Footer
│   │   └── sections/           # Hero, Numbers, About, Expertise, Experience, Work, Principles, Contact
│   ├── content/                # Typed content sources (profile, skills, experience, projects, principles)
│   ├── context/                # Theme and custom cursor providers
│   ├── hooks/                  # useMagnetic, useReducedMotion, useScrollReveal
│   ├── lib/                    # cn utility (clsx + tailwind-merge)
│   ├── App.tsx                 # Root application composition
│   ├── index.css               # Design tokens, fluid type scale, film grain
│   └── main.tsx                # Client DOM mount
├── DECISIONS.md                # Architectural log and rationale
└── README.md                   # Setup documentation
```

---

## 🛠️ How to Add or Update a Project

1. Open `src/content/projects.ts`.
2. Add a new object adhering to the `Project` interface:
```typescript
{
  slug: "new-platform",
  name: "New Platform",
  url: "https://example.com",
  category: "Full-Stack Multilingual Platforms",
  tagline: "High-performance enterprise portal.",
  tier: 1, // 1 for full case study, 2 for detail drawer
  published: true, // Only published: true projects will render
  work: "Detailed description of technical contributions...",
  stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  caseStudy: {
    overview: "Three sentence system overview...",
    whatIBuilt: ["Technical detail 1", "Technical detail 2"],
    engineeringDecisions: [
      { title: "Decision 1", description: "Why we made this architectural choice..." }
    ],
    diagramType: "csr-vs-ssr" // Optional simplified diagram
  }
}
```
3. Live stat counters across the portfolio automatically update to reflect the new project count.

---

## 📋 Open Action Items (TODOs for Kamran)

### High Priority
- **Phone Number Confirmation**: Confirm whether `+995 568 772 744` or `+92 346 9723869` is the primary public / WhatsApp contact number in `src/content/profile.ts`.
- **CV PDF Upload**: Place the final formatted PDF into `public/Kamran_Ali_CV.pdf`.

### Medium Priority
- **Experience Dates Reconciliation**: Verify start and end dates in `src/content/experience.ts` against LinkedIn profile.
- **Business Class For Less**: Validate exact frontend code ownership before setting `published: true` in `src/content/projects.ts`.
