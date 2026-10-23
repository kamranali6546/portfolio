export interface PrincipleItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  technicalDetails: string;
  evidence: string;
  svgIcon: "performance" | "ssr" | "seo" | "a11y" | "responsive" | "architecture";
}

export const engineeringPrinciples: PrincipleItem[] = [
  {
    id: "performance-budgets",
    number: "01",
    title: "Performance Budgets & Core Web Vitals",
    summary:
      "Every millisecond in latency directly damages organic conversion. Optimizations must be engineered at the foundation rather than patched as afterthoughts.",
    technicalDetails:
      "Enforcing strict bundle budgets (<150KB initial client JS), WebP/AVIF automated image generation with explicit dimension reservations to eliminate Cumulative Layout Shift (CLS < 0.05), and compositor-only CSS animation.",
    evidence: "Achieved 45% faster page load times and 25% SEO ranking improvement at Gordian Solutions.",
    svgIcon: "performance",
  },
  {
    id: "ssr-caching",
    number: "02",
    title: "Server-Side Rendering & Caching Strategy",
    summary:
      "Search bots and human visitors deserve immediately rendered HTML documents, while edge CDN caches eliminate redundant origin computation.",
    technicalDetails:
      "Migrating heavy client-side applications to Next.js SSR, distributing static and media assets via AWS CloudFront with immutable caching headers, and orchestrating incremental cache revalidation.",
    evidence: "Migrated MyChauffeur to Next.js SSR, lifting organic crawl indexation and traffic by 60%.",
    svgIcon: "ssr",
  },
  {
    id: "bilingual-seo",
    number: "03",
    title: "Bilingual Routing & Semantic SEO Metadata",
    summary:
      "Global platforms need flawless international indexation without duplicate-content penalties or linguistic routing collisions.",
    technicalDetails:
      "Structured localized subpath routing (/en, /de, /ar), dynamic hreflang alternate headers, self-referencing canonical URLs, automated Open Graph and Twitter summary cards, and robots directives.",
    evidence: "Implemented across MyChauffeur, Comfy, TSA Bildung, and Firangi international portals.",
    svgIcon: "seo",
  },
  {
    id: "accessibility",
    number: "04",
    title: "Accessibility (WCAG 2.2 AA) by Default",
    summary:
      "Inclusive engineering is a baseline standard. Semantic landmarks and clear keyboard flow guarantee access for every user.",
    technicalDetails:
      "Logical focus management with visible focus-visible rings (never removed), ARIA live regions for dynamic announcements, form field aria-describedby associations, and strict 4.5:1 / 3:1 contrast ratios.",
    evidence: "Adopted throughout Bring GmbH portal development and enterprise booking flows.",
    svgIcon: "a11y",
  },
  {
    id: "responsive-systems",
    number: "05",
    title: "Responsive Systems & Fluid Scale",
    summary:
      "Layouts should adapt naturally to viewport geometry without brittle breakpoint cascades or device-specific hacks.",
    technicalDetails:
      "Fluid type hierarchies powered by mathematical clamp() functions, CSS grid and subgrid structures, touch targets guaranteed at >= 44px, and scroll-snapping on mobile screens.",
    evidence: "Mobile traffic increased by 80% at Gordian Solutions following complete responsive re-architecture.",
    svgIcon: "responsive",
  },
  {
    id: "reusable-architecture",
    number: "06",
    title: "Modular Component Architecture",
    summary:
      "Maintainable software demands unambiguous component boundaries, typed props contracts, and single-responsibility isolation.",
    technicalDetails:
      "Decoupling presentational UI from data fetching and state machines, shared design system tokens with Tailwind CSS, and strict TypeScript types across client and API boundaries.",
    evidence: "Led cross-functional teams to a 90% reduction in production bugs and 30% coordination efficiency gain.",
    svgIcon: "architecture",
  },
];
