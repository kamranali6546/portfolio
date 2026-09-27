export interface MetricItem {
  id: string;
  value: string;
  numericTarget: number;
  unit: string;
  label: string;
  subtext: string;
  context: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  highlights: string[];
  technologies: string[];
}

export interface SkillCategory {
  name: string;
  isHighlighted?: boolean;
  isAiFocus?: boolean;
  skills: string[];
}

export interface LeadershipPrinciple {
  pillar: string;
  verb: string;
  subtitle: string;
  description: string;
  metrics: string;
}

export interface EducationMilestone {
  degree: string;
  institution: string;
  year: string;
  focus: string;
  highlight: string;
}

export interface ChapterInfo {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  scrollRange: [number, number]; // [start, end] from 0 to 1
  accentColor: string;
  secondaryAccent: string;
  backgroundImage: string;
  spatialDescription: string;
}

export const CHAPTERS: ChapterInfo[] = [
  {
    id: 'threshold',
    number: '01',
    title: 'Threshold',
    subtitle: 'Server Hall & Tech Airlock',
    scrollRange: [0, 0.12],
    accentColor: '#D4794A', // Warm terracotta amber
    secondaryAccent: '#8C3D1B',
    backgroundImage: '/src/assets/images/bg_server_corridor_1790503966471.jpg',
    spatialDescription: 'Server blade corridor with fiber conduits and atmospheric status LEDs',
  },
  {
    id: 'foundation',
    number: '02',
    title: 'The Foundation',
    subtitle: 'Silicon Wafer & CPU Die',
    scrollRange: [0.12, 0.25],
    accentColor: '#DB6B3E', // Warm copper
    secondaryAccent: '#9A411B',
    backgroundImage: '/src/assets/images/bg_silicon_processor_1790503978294.jpg',
    spatialDescription: 'Suspended monolithic silicon CPU die with etched gold logic bus traces',
  },
  {
    id: 'ledger',
    number: '03',
    title: 'The Ledger',
    subtitle: 'Metrics & Data Observatory',
    scrollRange: [0.25, 0.40],
    accentColor: '#E05D34', // Radiant ember
    secondaryAccent: '#A33315',
    backgroundImage: '/src/assets/images/bg_metrics_observatory_1790506155187.jpg',
    spatialDescription: 'Modern data operations observatory with live benchmark telemetry columns',
  },
  {
    id: 'archive',
    number: '04',
    title: 'The Archive',
    subtitle: 'Tech Company & Engineering Teams',
    scrollRange: [0.40, 0.56],
    accentColor: '#E3532C', // Warm vermilion
    secondaryAccent: '#AA290F',
    backgroundImage: '/src/assets/images/bg_tech_office_team_1790506095726.jpg',
    spatialDescription: 'Collaborative modern tech company office with engineering teams and terminal consoles',
  },
  {
    id: 'grid',
    number: '05',
    title: 'The Grid',
    subtitle: 'Developer Workspace & Stack Matrix',
    scrollRange: [0.56, 0.70],
    accentColor: '#E8422B', // Incandescent red-amber
    secondaryAccent: '#B2200A',
    backgroundImage: '/src/assets/images/bg_developer_workspace_1790506144191.jpg',
    spatialDescription: 'Cutting-edge engineer workstation displaying React & TypeScript code with PCB floor grid',
  },
  {
    id: 'circle',
    number: '06',
    title: 'The Circle',
    subtitle: 'Executive Leadership & Mentorship',
    scrollRange: [0.70, 0.82],
    accentColor: '#DE3F33', // Crimson coral
    secondaryAccent: '#9E1C12',
    backgroundImage: '/src/assets/images/bg_leadership_standup_1790506132904.jpg',
    spatialDescription: 'Executive conference room with architectural whiteboard review and quantum gyroscope',
  },
  {
    id: 'marker',
    number: '07',
    title: 'The Marker',
    subtitle: 'Academic Library & Study Sanctuary',
    scrollRange: [0.82, 0.92],
    accentColor: '#D13B3B', // Deep ruby
    secondaryAccent: '#8B1414',
    backgroundImage: '/src/assets/images/bg_education_library_1790506106671.jpg',
    spatialDescription: 'University library sanctuary with open research books, brass lamps, and laser timeline',
  },
  {
    id: 'exit',
    number: '08',
    title: 'The Exit',
    subtitle: 'Hyperlight Airlock & Global Dialogue',
    scrollRange: [0.92, 1.0],
    accentColor: '#FF6B4A', // Luminous aperture
    secondaryAccent: '#C9401C',
    backgroundImage: '/src/assets/images/bg_hyperlight_aperture_1790504009615.jpg',
    spatialDescription: 'Atmospheric light aperture flooding through geometric doorway with communications beacon',
  },
];

export const HERO_DATA = {
  name: 'Kamran Ali',
  title: 'Senior Frontend Developer',
  location: 'Tbilisi, Georgia',
  origin: 'Islamabad, Pakistan',
  status: 'Open to Senior / Lead roles · Requires employer-sponsored work permit',
  tagline: 'Architecting high-performance web systems and AI-augmented frontend workflows',
};

export const FOUNDATION_SENTENCE =
  '6+ years architecting large-scale apps in React, Next.js, TypeScript — now moving into AI-augmented frontend engineering.';

export const LEDGER_METRICS: MetricItem[] = [
  {
    id: 'bugs',
    value: '-90%',
    numericTarget: 90,
    unit: '%',
    label: 'Fewer Bugs',
    subtext: 'Cut production bugs across engineering teams',
    context: 'Championed rigorous peer code-review standards and automated test gates at Exion & Gordian.',
  },
  {
    id: 'satisfaction',
    value: '95%',
    numericTarget: 95,
    unit: '%',
    label: 'Client Satisfaction',
    subtext: 'Sustained over 4+ year enterprise engagement',
    context: 'Architected mission-critical product interfaces with uncompromising uptime and performance.',
  },
  {
    id: 'mobile',
    value: '+80%',
    numericTarget: 80,
    unit: '%',
    label: 'Mobile Traffic',
    subtext: 'Drove systematic responsive re-architecture',
    context: 'Redesigned core layout systems across the product suite for fluid sub-second mobile rendering.',
  },
  {
    id: 'speed',
    value: '-45%',
    numericTarget: 45,
    unit: '%',
    label: 'Faster Loads',
    subtext: 'Architecture-level performance engineering',
    context: 'Implemented micro-frontends, granular code splitting, and SSR caching, lifting SEO rankings 25%.',
  },
];

export const ARCHIVE_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exion',
    company: 'Exion Technologies',
    role: 'Frontend Developer',
    period: 'Jan 2026 – Aug 2026',
    duration: '8 mos',
    location: 'On-site Engineering Pod',
    highlights: [
      'Delivered production frontend features in a fast-paced environment applying AWS-backed deployment workflows and structured sprint management.',
      'Engineered immersive, animation-driven interfaces with Framer Motion and GSAP, delivering scroll-triggered transitions and micro-interactions.',
      'Championed a rigorous peer code-review culture across the team, cutting production bugs by 90% and elevating codebase maintainability.',
    ],
    technologies: ['React.js', 'Next.js', 'TypeScript', 'GSAP', 'Framer Motion', 'AWS S3/CloudFront', 'Jest'],
  },
  {
    id: 'gordian',
    company: 'Gordian Solutions',
    role: 'Senior Frontend Developer',
    period: 'Jan 2021 – Jun 2025',
    duration: '4 yrs 6 mos',
    location: 'Remote / Distributed',
    highlights: [
      'Architected and led development of core product interfaces in React.js and Next.js, shipping dynamic applications sustaining a 95% client satisfaction rate.',
      'Directed cross-functional collaboration between backend engineers and designers, streamlining integration workflows and lifting development efficiency by 30%.',
      'Redesigned the responsive layout system across the product suite, driving an 80% increase in mobile traffic through systematic viewport optimization.',
      'Re-engineered application performance at architecture level, cutting page load times by 45% and improving SEO rankings by 25%.',
    ],
    technologies: ['React.js', 'Next.js (App Router)', 'TypeScript', 'Redux Toolkit', 'Zustand', 'TanStack Query', 'Tailwind CSS'],
  },
  {
    id: 'bring',
    company: 'Bring GmbH',
    role: 'Senior Frontend Developer',
    period: 'Jun 2023 – Jul 2024',
    duration: '1 yr 2 mos',
    location: 'Remote Engineering',
    highlights: [
      'Built and optimized customer-facing portals and internal dashboards in React and Next.js, supporting business-critical operations at scale.',
      'Implemented caching, code-splitting, and API optimization strategies that improved site performance and load speed by 25%.',
      'Adopted SSR and caching architectures to advance SEO performance and page speed, ensuring consistent cross-browser fidelity.',
    ],
    technologies: ['Next.js (RSC)', 'TypeScript', 'GraphQL', 'Tailwind CSS', 'Docker', 'Vercel'],
  },
  {
    id: 'tekx',
    company: 'TEKX Solutions',
    role: 'Frontend Developer',
    period: 'Mar 2019 – Jan 2021',
    duration: '1 yr 11 mos',
    location: 'Client Project Pod',
    highlights: [
      'Developed and maintained responsive web applications for enterprise client projects, increasing user engagement by 35%.',
      'Partnered closely with design team to translate UI/UX improvements into production, contributing to a 25% increase in client retention.',
      'Introduced modern web technologies and performance practices that delivered 20% faster load times across client platforms.',
    ],
    technologies: ['JavaScript (ES6+)', 'React.js', 'HTML5/CSS3', 'Webpack', 'Sass', 'REST APIs'],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Languages & Frameworks',
    isHighlighted: true,
    skills: [
      'JavaScript (ES6+)',
      'TypeScript',
      'React.js',
      'Next.js (App Router & RSC)',
      'Node.js',
      'Express.js',
      'HTML5 / CSS3',
    ],
  },
  {
    name: 'Architecture & State',
    skills: [
      'Micro-frontends',
      'Monorepos (Turborepo/Nx)',
      'Design Systems',
      'Atomic Design',
      'Redux Toolkit',
      'Zustand',
      'TanStack Query',
      'REST & GraphQL',
    ],
  },
  {
    name: 'UI, Styling & Motion',
    skills: [
      'Tailwind CSS',
      'Shadcn UI',
      'Radix UI',
      'Framer Motion',
      'GSAP',
      'Styled-Components',
      'Sass',
      'Storybook',
      'SVG Animation',
    ],
  },
  {
    name: 'Quality, Tooling & DevOps',
    skills: [
      'Jest & RTL',
      'Cypress',
      'Playwright',
      'Core Web Vitals',
      'Lighthouse',
      'Vite & Webpack',
      'GitHub Actions (CI/CD)',
      'AWS (S3/CloudFront/Amplify)',
      'Docker',
    ],
  },
  {
    name: 'AI & LLM Integration',
    skills: [
      'Vercel AI SDK',
      'Prompt Engineering',
      'Claude',
      'Cursor',
      'Antigravity',
      'Copilot',
      'Gemini 2.5 / 3.0',
    ],
  },
];

export const LEADERSHIP_PRINCIPLES: LeadershipPrinciple[] = [
  {
    pillar: 'Lead',
    verb: 'Direct',
    subtitle: 'Cross-functional Pods',
    description: 'Led cross-functional pods of frontend, backend, and design engineers on multi-year enterprise projects.',
    metrics: 'Aligned 15+ engineers across sprints',
  },
  {
    pillar: 'Mentor',
    verb: 'Elevate',
    subtitle: 'Architecture Walkthroughs',
    description: 'Guided junior developers via code review, pairing, and architecture walkthroughs to raise team-wide baseline.',
    metrics: '90% reduction in review rework',
  },
  {
    pillar: 'Communicate',
    verb: 'Translate',
    subtitle: 'Technical Roadmaps',
    description: 'Partnered with clients and product owners to translate complex business objectives into achievable engineering roadmaps.',
    metrics: '95% client satisfaction rating',
  },
  {
    pillar: 'Deliver',
    verb: 'Execute',
    subtitle: 'Agile & Predictable Cadence',
    description: 'Drove Agile/Scrum ceremonies and sprint planning to keep remote-first distributed teams aligned on high-impact milestones.',
    metrics: '30% lift in delivery efficiency',
  },
];

export const EDUCATION_TIMELINE: EducationMilestone[] = [
  {
    degree: 'BS Computer Science',
    institution: 'Lahore Garrison University',
    year: '2019',
    focus: 'Core computing, algorithms, distributed systems, and software engineering.',
    highlight: 'Foundation in algorithmic performance and architecture.',
  },
  {
    degree: 'Master of Business Administration (MBA)',
    institution: 'Georgian National University SEU',
    year: '2026',
    focus: 'Strategic management, product economics, enterprise leadership, and organizational scaling.',
    highlight: 'Bridging deep engineering architecture with executive business strategy.',
  },
];

export const CONTACT_INFO = {
  email: 'kamranali6546@gmail.com',
  phone: '+995 568 772 744',
  altPhone: '+92 346 9723869',
  location: 'Tbilisi, Georgia',
  relocationStatus: 'Open to relocation · Requires employer-sponsored work permit',
  targetRoles: 'Senior Frontend Developer / Lead Frontend Architect',
  linkedin: 'https://linkedin.com/in/kamranali-dev',
  github: 'https://github.com/kamranali',
};
