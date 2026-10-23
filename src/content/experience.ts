export interface ExperienceItem {
  id: string;
  company: string;
  location: string;
  title: string;
  start: string; // YYYY-MM
  end: string; // YYYY-MM
  formattedPeriod: string;
  bullets: string[];
  hasOverlap?: boolean;
  overlapNote?: string;
}

// Authoritative employment tenure aligned with finalized resume & LinkedIn profile.
export const experience: ExperienceItem[] = [
  {
    id: "exion-technologies",
    company: "Exion Technologies",
    location: "Georgia",
    title: "Sr. Software Engineer",
    start: "2026-01",
    end: "2026-09",
    formattedPeriod: "Jan 2026 – Sep 2026",
    bullets: [
      "Built highly interactive, animation-rich UI using Framer Motion and GSAP (page transitions, scroll triggers, micro-interactions).",
      "Participated in regular code reviews, leading to a 90% reduction in production bugs and increasing overall code quality.",
    ],
  },
  {
    id: "gordian-solutions",
    company: "Gordian Solutions",
    location: "Pakistan",
    title: "Sr. Frontend Developer",
    start: "2020-02",
    end: "2025-07",
    formattedPeriod: "Feb 2020 – Jul 2025",
    hasOverlap: true,
    overlapNote: "Overlapped with remote contract at Bring GmbH & TekX transition",
    bullets: [
      "Spearheaded the development of user interfaces using ReactJS and Next.js, delivering dynamic web applications with a 95% user satisfaction rate based on client feedback.",
      "Led cross-functional teams, collaborating with backend developers and designers to ensure smooth integration, improving development efficiency by 30% through better coordination.",
      "Implemented responsive web designs, increasing mobile traffic by 80% after optimizing for all screen sizes.",
      "Enhanced application performance, reducing page load times by 45% through performance optimizations, resulting in a 25% improvement in SEO rankings.",
    ],
  },
  {
    id: "bring-gmbh",
    company: "Bring GmbH",
    location: "Germany (Remote)",
    title: "Sr. Frontend Developer",
    start: "2022-02",
    end: "2024-07",
    formattedPeriod: "Feb 2022 – Jul 2024",
    hasOverlap: true,
    overlapNote: "Concurrent with Gordian Solutions projects",
    bullets: [
      "Built and optimized customer-facing portals and internal dashboards with React and Next.js.",
      "Improved site performance and loading speed by 25% through caching strategies, code-splitting, and API optimization.",
      "Ensured cross-device responsiveness, resulting in increased customer engagement.",
      "Adopted SSR and caching strategies for SEO and speed; ensured cross-browser compatibility and WCAG alignment.",
    ],
  },
  {
    id: "tekx-solutions",
    company: "TekX Solutions",
    location: "Pakistan",
    title: "Frontend Developer",
    start: "2019-08",
    end: "2021-01",
    formattedPeriod: "Aug 2019 – Jan 2021",
    hasOverlap: true,
    overlapNote: "Transition into Gordian Solutions role in 2020",
    bullets: [
      "Developed and maintained dynamic, mobile-responsive websites, increasing user engagement by 35% for client projects.",
      "Worked closely with the design team to implement UI/UX improvements, leading to a 25% increase in client retention due to better user experiences.",
      "Implemented modern web technologies, which helped clients' websites achieve a 20% faster load time.",
    ],
  },
];
