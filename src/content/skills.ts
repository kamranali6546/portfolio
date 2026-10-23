export interface SkillCategory {
  id: string;
  name: string;
  items: string[];
  howIUseIt: string;
}

export const skills: SkillCategory[] = [
  {
    id: "core-languages",
    name: "Core Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
    howIUseIt:
      "Strict typing with TypeScript, semantic HTML5 landmarks, and modern CSS layouts.",
  },
  {
    id: "frameworks",
    name: "Frameworks & Libraries",
    items: ["React.js", "Next.js", "Node.js", "ExpressJS"],
    howIUseIt:
      "Next.js SSR architecture, performant React component systems, and Node APIs.",
  },
  {
    id: "state-data",
    name: "State & Data",
    items: ["Redux Toolkit", "Zustand", "Context API", "TanStack Query", "REST APIs"],
    howIUseIt:
      "Normalized client-side state caching and responsive API query synchronization.",
  },
  {
    id: "styling-ui",
    name: "Styling & Design Systems",
    items: ["Tailwind CSS", "CSS Modules", "Styled-Components", "Shadcn UI", "Radix UI"],
    howIUseIt:
      "Unified design systems, responsive typography, and accessible UI primitives.",
  },
  {
    id: "graphics-motion",
    name: "Motion & Interaction",
    items: ["GSAP", "Framer Motion", "SVG Animation", "Canvas"],
    howIUseIt:
      "Hardware-accelerated 60fps page transitions and scroll-triggered choreography.",
  },
  {
    id: "tools-build",
    name: "Build & Toolchains",
    items: ["Vite", "Webpack", "pnpm / npm", "Figma", "Git"],
    howIUseIt:
      "Optimized build pipelines, bundle splitting, and pixel-exact design translation.",
  },
  {
    id: "ai-assisted",
    name: "AI-Assisted Workflows",
    items: ["Claude", "Cursor", "Copilot", "v0", "Gemini", "ChatGPT"],
    howIUseIt:
      "Modern AI workflows accelerating development with full architectural ownership.",
  },
  {
    id: "devops-cloud",
    name: "Cloud & Deployment",
    items: ["Vercel", "AWS S3 / CloudFront", "Docker", "CI/CD"],
    howIUseIt:
      "Edge caching, CDN asset distribution, and automated deployment pipelines.",
  },
];
