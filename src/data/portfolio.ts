/**
 * Central Portfolio Series Data for Kamran Ali
 * Cinema / Streaming Series format based on Sushmita's Portfolio_series architecture.
 * Strictly adheres to verified resume facts from Section 5.
 */

export type Palette = { from: string; via: string; to: string; accent: string };

export const crimson: Palette = { from: '#2a0610', via: '#7a0f24', to: '#0b0710', accent: '#ff3d5a' };
export const ocean: Palette = { from: '#051829', via: '#0c3559', to: '#050c18', accent: '#4cc9ff' };
export const jade: Palette = { from: '#041f17', via: '#0c4735', to: '#030f0c', accent: '#8FD9BE' };
export const amber: Palette = { from: '#261604', via: '#593409', to: '#120b02', accent: '#C9A56A' };
export const violet: Palette = { from: '#1a082b', via: '#3e1366', to: '#0a0312', accent: '#c084fc' };

export const profile = {
  fullName: 'Kamran Ali',
  displayName: 'Kamran Ali',
  firstName: 'KAMRAN',
  seriesTag: 'THE SERIES',
  originalLabel: 'A KAMRAN ALI ORIGINAL SERIES',
  role: 'Senior Frontend Developer',
  tagline: ['Senior Frontend Developer', 'React & Next.js Architect', 'UI Engineering'],
  intro:
    'Senior Frontend Developer with 6+ years building high-performance React & Next.js web systems. +60% organic traffic, -45% load times, and 90% bug reduction.',
  quote:
    'Building scalable web applications where architecture, speed, and clean design meet.',
  location: 'Pakistan / Georgia (open to relocation & remote)',
  email: 'kamranali6546@gmail.com',
  phones: ['+92 346 8051600', '+995 568 772 744'],
  primaryPhone: '+92 346 8051600',
  whatsappNumber: '+995 568 772 744',
  links: {
    linkedin: 'https://www.linkedin.com/in/kamranali6546',
    whatsapp: 'https://wa.me/995568772744',
  },
  resumePdf: '/Kamran_Ali_CV.pdf',
  portrait: {
    src: '/assets/banner-portrait.webp',
    bannerSrc: '/assets/banner-portrait.webp',
    aboutSrc: '/assets/about-portrait.webp',
    srcSet: '/assets/portrait-420.webp 420w, /assets/portrait-720.webp 720w, /assets/portrait-1100.webp 1100w',
    alt: 'Portrait of Kamran Ali',
  },
  backdrop: '',
  interests: ['React & Next.js', 'SSR & Edge Caching', 'TypeScript Systems', '60fps Motion UI'],
};

export const education = [
  {
    school: 'Lahore Garrison University',
    place: 'Pakistan',
    degree: 'Bachelor of Computer Science',
    period: '2015 – 2019',
    score: 'Computer Science Major',
  },
];

export const experience = [
  {
    company: 'Exion Technologies',
    role: 'Sr. Software Engineer',
    place: 'Georgia',
    period: 'Jan 2026 – Sep 2026',
    points: [
      'Engineered interactive 60fps interfaces with Framer Motion & GSAP.',
      'Led structured code reviews, eliminating 90% of production defects.',
    ],
  },
  {
    company: 'Gordian Solutions',
    role: 'Sr. Frontend Developer',
    place: 'Pakistan',
    period: 'Feb 2020 – Jul 2025',
    points: [
      'Led React & Next.js development with 95% client satisfaction rating.',
      'Cut page load times by 45% and drove an 80% mobile traffic surge.',
    ],
  },
  {
    company: 'Bring GmbH',
    role: 'Sr. Frontend Developer',
    place: 'Germany (Remote)',
    period: 'Feb 2022 – Jul 2024',
    points: [
      'Built customer portals with Next.js SSR, code-splitting, and caching.',
      'Delivered 25% speed lift and WCAG AA accessibility compliance.',
    ],
  },
  {
    company: 'TekX Solutions',
    role: 'Frontend Developer',
    place: 'Pakistan',
    period: 'Aug 2019 – Jan 2021',
    points: [
      'Developed dynamic mobile-first websites, boosting engagement by 35%.',
      'Improved design handoff and UX, increasing client retention by 25%.',
    ],
  },
];

export type Episode = {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
};

export type Season = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  episodes: Episode[];
};

export const seasons: Season[] = [
  {
    number: 1,
    title: 'The Foundation',
    period: '2019 – 2021',
    synopsis: 'TekX Solutions: mobile-responsive web development and client growth.',
    episodes: [
      {
        code: 'S01 E01',
        title: 'Mobile-First Web',
        description: 'Dynamic responsive websites with +35% user engagement.',
        tags: ['Responsive', 'JavaScript', '+35% Engagement'],
        runtime: 'TekX Solutions',
        palette: ocean,
      },
      {
        code: 'S01 E02',
        title: 'Client Retention',
        description: 'UI/UX refinements driving +25% client retention.',
        tags: ['UI/UX', '+25% Retention'],
        runtime: 'TekX Solutions',
        palette: amber,
      },
      {
        code: 'S01 E03',
        title: 'Performance',
        description: 'Modern frontend toolchains delivering 20% faster load times.',
        tags: ['Performance', '-20% Load'],
        runtime: 'TekX Solutions',
        palette: jade,
      },
    ],
  },
  {
    number: 2,
    title: 'Enterprise Architecture',
    period: '2020 – 2025',
    synopsis: 'Gordian Solutions: 5 years leading React & Next.js frontend systems.',
    episodes: [
      {
        code: 'S02 E01',
        title: 'Client Satisfaction',
        description: 'React & Next.js delivery achieving 95% client satisfaction.',
        tags: ['React', 'Next.js', '95% CSAT'],
        runtime: 'Gordian Solutions',
        palette: jade,
      },
      {
        code: 'S02 E02',
        title: 'Team Leadership',
        description: 'Cross-functional engineering coordination lifting efficiency by 30%.',
        tags: ['Leadership', '+30% Efficiency'],
        runtime: 'Gordian Solutions',
        palette: violet,
      },
      {
        code: 'S02 E03',
        title: 'Mobile Traffic Surge',
        description: 'Responsive architecture overhaul yielding +80% mobile traffic.',
        tags: ['Mobile +80%', 'Responsive'],
        runtime: 'Gordian Solutions',
        palette: ocean,
      },
      {
        code: 'S02 E04',
        title: 'Speed & SEO',
        description: '45% load time reduction and 25% improvement in organic SEO.',
        tags: ['-45% Load', 'SEO +25%'],
        runtime: 'Gordian Solutions',
        palette: crimson,
      },
    ],
  },
  {
    number: 3,
    title: 'European Portals',
    period: '2022 – 2024',
    synopsis: 'Bring GmbH: German customer portals and internal operations consoles.',
    episodes: [
      {
        code: 'S03 E01',
        title: 'Operations Dashboards',
        description: 'Next.js portals with high-throughput admin controls.',
        tags: ['Next.js', 'Dashboards'],
        runtime: 'Bring GmbH',
        palette: ocean,
      },
      {
        code: 'S03 E02',
        title: 'Edge Caching',
        description: 'Route-level code splitting and caching for 25% faster load.',
        tags: ['+25% Speed', 'Caching'],
        runtime: 'Bring GmbH',
        palette: amber,
      },
      {
        code: 'S03 E03',
        title: 'SSR & Accessibility',
        description: 'Search engine indexation and WCAG AA compliance.',
        tags: ['SSR', 'WCAG AA'],
        runtime: 'Bring GmbH',
        palette: jade,
      },
    ],
  },
  {
    number: 4,
    title: 'Motion & Reliability',
    period: '2026',
    synopsis: 'Exion Technologies: motion engineering and strict reliability.',
    episodes: [
      {
        code: 'S04 E01',
        title: '60fps Motion UI',
        description: 'Hardware-accelerated scroll choreography with GSAP & Framer Motion.',
        tags: ['GSAP', 'Framer Motion'],
        runtime: 'Exion Technologies',
        palette: violet,
      },
      {
        code: 'S04 E02',
        title: 'Defect Reduction',
        description: 'TypeScript strict boundaries and peer reviews eliminating 90% of bugs.',
        tags: ['-90% Defects', 'Code Reviews'],
        runtime: 'Exion Technologies',
        palette: crimson,
      },
    ],
  },
  {
    number: 5,
    title: 'AI Workflows',
    period: 'Now Streaming',
    synopsis: 'Modern engineering workflows with AI-accelerated delivery.',
    episodes: [
      {
        code: 'S05 E01',
        title: 'AI Acceleration',
        description: 'Claude, Cursor, Copilot, v0, Gemini, and ChatGPT integrated in production.',
        tags: ['AI Workflows', 'Next.js'],
        runtime: 'In Production',
        palette: jade,
      },
    ],
  },
];

export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  year: string;
  genre: string;
  logline: string;
  url: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  palette: Palette;
  motif: 'shield' | 'flow' | 'tenants';
  tier: 1 | 2;
  diagramType?: 'csr-vs-ssr' | 'payment-flow' | 'portal-architecture';
  posterImage?: string;
};

export const projects: Project[] = [
  {
    id: 'mychauffeur',
    title: 'MyChauffeur',
    year: '2023',
    genre: 'Full-Stack • SSR • Mobility',
    logline: 'Global luxury chauffeur booking platform with bilingual subpath routing & VIP concierge.',
    url: 'https://mychauffeur.com/en',
    tier: 1,
    posterImage: '/assets/projects/MyChauffeur_Luxury_Chauffeur_Showcase_ef8f687c.webp',
    stack: ['Next.js', 'SSR', 'Bilingual', 'GTM', 'WebP'],
    build: [
      'Migrated legacy React SPA to Next.js SSR, increasing organic search traffic by 60%.',
      'Engineered bilingual routing (/en & /de) with synchronized canonical metadata.',
      'Constructed booking funnel, mobile app install flow, and direct WhatsApp dispatch.',
    ],
    features: [
      'Bilingual subpath routing (/en and /de)',
      'SSR for 100% search crawl indexation',
      'Dynamic booking engine & WhatsApp concierge',
    ],
    metrics: [
      { value: '+60%', label: 'organic search traffic' },
      { value: '100%', label: 'crawl indexation' },
      { value: '<1.2s', label: 'Largest Contentful Paint' },
    ],
    palette: { from: '#1a110a', via: '#382212', to: '#080503', accent: '#D4AF37' },
    motif: 'flow',
    diagramType: 'csr-vs-ssr',
  },
  {
    id: 'comfy',
    title: 'Comfy Drive',
    year: '2025',
    genre: 'Fintech • Multi-Portal • Fleet',
    logline: 'Enterprise car rental platform with dual Stripe + Saudi Mada payment infrastructure in KSA.',
    url: 'https://www.comfydrive.com/en',
    tier: 1,
    posterImage: '/assets/projects/Comfy_Car_Rental_Platform_Showcase_3a7e98fe.webp',
    stack: ['Next.js', 'Stripe', 'Mada', 'AWS CloudFront', 'RBAC'],
    build: [
      'Engineered dual-gateway payments for international cards (Stripe) and domestic Saudi network (Mada).',
      'Developed 3 authenticated portals: Admin, Fleet Partner, and Corporate Booking.',
      'Configured AWS CloudFront CDN for sub-50ms fleet asset delivery.',
    ],
    features: [
      'Dual payment rails (Stripe + Saudi Mada)',
      'Admin, Fleet & Corporate partner portals',
      'Sub-50ms edge media response time',
    ],
    metrics: [
      { value: '3', label: 'enterprise panels' },
      { value: '2', label: 'payment rails' },
      { value: '99.9%', label: 'checkout uptime' },
    ],
    palette: { from: '#240608', via: '#4d0c11', to: '#0d0203', accent: '#FF2A3B' },
    motif: 'tenants',
    diagramType: 'payment-flow',
  },
  {
    id: 'yelo-plus',
    title: 'Yelo Limousine',
    year: '2024',
    genre: 'Enterprise • Bilingual Chauffeur',
    logline: 'Premium chauffeur & corporate travel platform with Arabic/English luxury fleet booking.',
    url: 'https://iyeloplus.com/en',
    tier: 1,
    posterImage: '/assets/projects/Yelo_Limousine_Premium_Travel_Showcase_6ce10405.webp',
    stack: ['Next.js', 'Bilingual LTR/RTL', 'Booking Flows', 'Corporate Accounts'],
    build: [
      'Constructed bilingual executive booking platform for airport, intercity, and event transport.',
      'Engineered corporate business accounts portal with consolidated invoicing.',
    ],
    features: [
      'Airport, intercity, and hourly booking tiers',
      'Corporate accounts with billing audit logs',
      'Bilingual Arabic (RTL) & English (LTR)',
    ],
    metrics: [
      { value: '4', label: 'booking tiers' },
      { value: 'Bilingual', label: 'Arabic & English' },
    ],
    palette: { from: '#1a0d24', via: '#381652', to: '#0a0410', accent: '#FFB800' },
    motif: 'shield',
    diagramType: 'portal-architecture',
  },
  {
    id: 'gordian-solutions',
    title: 'Gordian Solutions',
    year: '2020',
    genre: 'Agency • GSAP Motion • Web & Mobile',
    logline: 'Modern agency web & mobile development platform delivering +80% mobile traffic surge.',
    url: 'https://www.gordiansol.com',
    tier: 1,
    posterImage: '/assets/projects/Gordian_Solutions_Tech_Showcase_d6b60ae7.webp',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Responsive'],
    build: [
      'Led frontend architecture over 5 years, achieving 95% client satisfaction rating.',
      'Re-engineered responsive layouts, driving an 80% mobile traffic surge and 45% faster load speeds.',
    ],
    features: [
      'GSAP scroll-triggered interactions',
      '80% mobile traffic increase',
      '45% reduction in page load times',
    ],
    metrics: [
      { value: '95%', label: 'satisfaction rate' },
      { value: '+80%', label: 'mobile traffic surge' },
      { value: '-45%', label: 'page load duration' },
    ],
    palette: { from: '#061628', via: '#0c3559', to: '#030b14', accent: '#00C896' },
    motif: 'flow',
  },
  {
    id: 'business-class-for-less',
    title: 'BusinessClassForLess',
    year: '2021',
    genre: 'Travel • Flight Booking • Luxury',
    logline: 'Luxury flight booking platform with dynamic multi-city airline routing matrix.',
    url: 'https://businessclassforless.com',
    tier: 1,
    posterImage: '/assets/projects/Business_class_for_Less_3a5acbe5.webp',
    stack: ['Multi-City Flight Search', 'Lead Generation', 'UI/UX Design', 'GTM'],
    build: [
      'Designed and developed end-to-end frontend by Kamran Ali with dynamic multi-city flight search and cabin class selector.',
      'Integrated high-conversion quote lead-capture funnel and Trustindex verified reviews.',
    ],
    features: [
      'Designed & developed by Kamran Ali',
      'Multi-city flight search matrix & passenger counters',
      'High-conversion quote request flow & Trustindex reviews',
    ],
    metrics: [
      { value: '100%', label: 'custom design & development' },
      { value: 'Multi-City', label: 'flight routing matrix' },
    ],
    palette: { from: '#1a0c1f', via: '#381647', to: '#0d0412', accent: '#D4AF37' },
    motif: 'flow',
  },
  {
    id: 'tsa-bildung',
    title: 'TSA Bildung',
    year: '2024',
    genre: 'Education • Local SEO • DE/EN',
    logline: 'Modern German education portal with certified professional courses & curriculum management.',
    url: 'https://www.tsa-bildung.de',
    tier: 1,
    posterImage: '/assets/projects/TSA_Bildung_Platform_Showcase_c04db1b0.webp',
    stack: ['Next.js', 'DE / EN', 'Local SEO', 'GTM', 'WhatsApp'],
    build: [
      'Developed German and English course catalogue with categorized curriculum navigation.',
      'Generated programmatic local SEO landing pages across key German metropolitan districts.',
    ],
    features: [
      'Bilingual DE / EN course catalogue',
      'Berlin district programmatic SEO pages',
      'Direct WhatsApp advisory integration',
    ],
    metrics: [
      { value: 'Top', label: 'local Berlin SEO ranking' },
      { value: '2', label: 'languages (DE / EN)' },
    ],
    palette: { from: '#06132b', via: '#0c2d66', to: '#030a17', accent: '#2563EB' },
    motif: 'flow',
  },
  {
    id: 'exion-technologies',
    title: 'Exion Technologies',
    year: '2026',
    genre: 'Agency • Motion UI • High Performance',
    logline: 'Modern web development digital solutions agency with cutting-edge tech stack.',
    url: 'https://www.exiontechnologies.eu',
    tier: 1,
    posterImage: '/assets/projects/Exion_Technologies_2697eb83.webp',
    stack: ['Next.js', 'GSAP', 'Framer Motion', 'Tailwind CSS'],
    build: [
      'Built custom procedural engine preloader transitioning smoothly into interactive hero.',
      'Instituted code reviews that contributed to a 90% reduction in production bugs.',
    ],
    features: [
      'Interactive procedural preloader',
      'Hardware-accelerated 60fps animations',
      '90% production bug reduction',
    ],
    metrics: [
      { value: '90%', label: 'defect reduction' },
      { value: '60fps', label: 'smooth animation' },
    ],
    palette: { from: '#071829', via: '#0a325c', to: '#030c14', accent: '#00A3FF' },
    motif: 'shield',
  },
  {
    id: 'firangi',
    title: 'Firangi',
    year: '2023',
    genre: 'E-Commerce • Next.js • Grocery',
    logline: 'Modern fresh grocery e-commerce experience delivered right to doorsteps across Germany.',
    url: 'https://www.firangi.de/en',
    tier: 2,
    posterImage: '/assets/projects/Firangi_Fresh_Grocery_Experience_832fa02d.webp',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    build: ['Bilingual storefront with canonical URLs and Search Console verification.'],
    features: ['Bilingual grocery catalogue', 'Fast checkout'],
    metrics: [{ value: '2', label: 'languages' }],
    palette: { from: '#062413', via: '#0c4a27', to: '#021208', accent: '#16A34A' },
    motif: 'flow',
  },
  {
    id: 'samosa-factory',
    title: 'Samosa Factory',
    year: '2022',
    genre: 'Storefront • Food Delivery • Modern Web',
    logline: 'Traditional taste with modern web experience for authentic artisanal samosas across Germany.',
    url: 'https://www.samosafactory.de',
    tier: 2,
    posterImage: '/assets/projects/Samosa_Factory_Responsive_Website_Showcase_b8935a23.webp',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    build: ['Cookie consent banner, event quote form, AWS S3 hosted promo video.'],
    features: ['Event quote form', 'AWS S3 hosting'],
    metrics: [{ value: '100%', label: 'responsive' }],
    palette: { from: '#2b0c0a', via: '#571612', to: '#140403', accent: '#DC2626' },
    motif: 'flow',
  },
  {
    id: 'sufi-travel-com',
    title: 'Sufi Travel & Tours (.com)',
    year: '2020',
    genre: 'Booking Engine • Flight Search',
    logline: 'Stress-free travel booking platform for worldwide flights, tours, and curated Umrah planning.',
    url: 'https://www.sufitravelandtours.com',
    tier: 2,
    posterImage: '/assets/projects/Sufi_Travels_Com_7e1e0e3e.webp',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    build: ['Flight search with passenger counts, airline filters, and callback form.'],
    features: ['Flight filter matrix', 'Callback request funnel'],
    metrics: [{ value: 'Multi-Filter', label: 'airline & stop filters' }],
    palette: { from: '#2e1204', via: '#5c2408', to: '#140702', accent: '#EA580C' },
    motif: 'flow',
  },
  {
    id: 'sufi-uk',
    title: 'Sufi Travel & Tours (.co.uk)',
    year: '2021',
    genre: 'Travel • Flights & Holidays • UK',
    logline: 'Unbeatable flight deals, hassle-free booking, and UK customer support with Trustpilot excellence.',
    url: 'https://www.sufitravelandtours.co.uk',
    tier: 2,
    posterImage: '/assets/projects/Sufi_Travels_Co_Uk_91eda216.webp',
    stack: ['Next.js', 'Flights', 'Hotels', 'Umrah'],
    build: ['Engineered structured SEO titles and page taxonomy across travel verticals.'],
    features: ['Flights, hotels & car hire hub', 'Umrah packages taxonomy'],
    metrics: [{ value: '4', label: 'travel service verticals' }],
    palette: { from: '#2e1405', via: '#612a0b', to: '#140802', accent: '#F97316' },
    motif: 'shield',
  },
  {
    id: 'rah-consultants',
    title: 'Rah Consultants',
    year: '2026',
    genre: 'Education Agency • Study Abroad',
    logline: 'Empowering global education and visa consulting to make students study abroad dream a reality.',
    url: 'https://rahconsultants.pk',
    tier: 2,
    posterImage: '/assets/projects/RAH_Consultants_Study_Abroad_Showcase_7e1b738a.webp',
    stack: ['React', 'Responsive Design', 'Brand Identity'],
    build: ['Professional portal for international university student admissions.'],
    features: ['University program guides', 'Inquiry lead capture'],
    metrics: [{ value: 'Global', label: 'education programs' }],
    palette: { from: '#062114', via: '#0c3d25', to: '#020f08', accent: '#84CC16' },
    motif: 'flow',
  },
  {
    id: 'tekx-solutions',
    title: 'TekX Solutions',
    year: '2019',
    genre: 'Agency • Design & Engineering',
    logline: 'Breathing tech into ideas — software design and engineering partner accelerating digital growth.',
    url: 'https://tekxsolutions.com',
    tier: 2,
    posterImage: '/assets/projects/Tekx_Solutions_b61672e4.webp',
    stack: ['JavaScript', 'Modern UI', 'Case Studies'],
    build: ['Agency website featuring client product showcases and case studies.'],
    features: ['Client product showcases', 'Interactive case studies'],
    metrics: [{ value: '3+', label: 'industry verticals' }],
    palette: { from: '#1e0836', via: '#46137d', to: '#0d0317', accent: '#9333EA' },
    motif: 'shield',
  },
  {
    id: 'qowboy-security',
    title: 'QowBoy Security',
    year: '2023',
    genre: 'Services • Security Guard Academy',
    logline: 'Top-rated security guard courses, close protection, and certified nationwide security services in Germany.',
    url: 'https://www.qowboysecurity.de',
    tier: 2,
    posterImage: '/assets/projects/Qowboys_Security_1aedfe5d.webp',
    stack: ['Consultation Forms', 'Course Selector', 'Click-to-Call'],
    build: ['Consultation forms with service selector and course inquiry pages.'],
    features: ['Service inquiry form', 'Mobile direct calling'],
    metrics: [{ value: 'Instant', label: 'click-to-call connect' }],
    palette: { from: '#261b07', via: '#4d370e', to: '#120d03', accent: '#EAB308' },
    motif: 'shield',
  },
  {
    id: 'bring-express',
    title: 'Bring Express',
    year: '2023',
    genre: 'Logistics • Courier Portal • Jobs',
    logline: 'Driver recruitment and logistics dispatch portal for DHL, Amazon, and courier partners in Germany.',
    url: 'https://www.bring-express.de',
    tier: 2,
    posterImage: '/assets/projects/Bring_Express_5e536fff.webp',
    stack: ['Next.js', 'SSR', 'Job Search Flow', 'German Market'],
    build: ['Bilingual job application funnel and interactive courier vacancy filters.'],
    features: ['Driver recruitment funnel', 'Job search matrix'],
    metrics: [{ value: '100%', label: 'responsive' }],
    palette: { from: '#1f0d2b', via: '#421a5c', to: '#0e0514', accent: '#A855F7' },
    motif: 'flow',
  },
  {
    id: 'spice-junction',
    title: 'Spice Junction',
    year: '2022',
    genre: 'Storefront • Retail & Wholesale',
    logline: 'A taste of India closer to home — one-stop Indian grocery, food kiosk, and mithai store in Berlin.',
    url: 'https://spicejunction.de',
    tier: 2,
    posterImage: '/assets/projects/Spice_Junction_UI_Showcase_67a78d6e.webp',
    stack: ['Storefront', 'Retail & Wholesale', 'Local Schema'],
    build: ['Dual retail and wholesale storefront with local-business schema.'],
    features: ['Retail & bulk ordering', 'Local business address schema'],
    metrics: [{ value: 'B2B & B2C', label: 'dual storefront' }],
    palette: { from: '#2e0817', via: '#5c102e', to: '#14030a', accent: '#E11D48' },
    motif: 'flow',
  },
];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };

export const topPicks: TopPick[] = [
  { label: 'Client Trust', title: '95% Satisfaction', detail: 'Consistently achieved at Gordian Solutions', palette: jade },
  { label: 'Mobile Impact', title: '+80% Traffic', detail: 'Surge following complete responsive overhaul', palette: ocean },
  { label: 'Speed Benchmark', title: '-45% Page Load', detail: 'Achieved via caching and bundle optimization', palette: crimson },
  { label: 'Reliability Metric', title: '-90% Bugs', detail: 'Production bug reduction via strict code reviews', palette: violet },
  { label: 'SEO Triumph', title: '+60% Organic Crawl', detail: 'Next.js SSR migration on MyChauffeur', palette: amber },
  { label: 'Fintech Rail', title: 'Dual Payment Gateway', detail: 'Stripe + Saudi Mada on Comfy Car Rental', palette: jade },
  { label: 'Motion Craft', title: 'GSAP & Framer Motion', detail: '60fps scroll choreography at Exion Technologies', palette: violet },
  { label: 'Experience Depth', title: '6+ Years', detail: 'Enterprise React & Next.js engineering', palette: ocean },
  { label: 'Team Leadership', title: '+30% Efficiency', detail: 'Cross-functional engineering coordination', palette: amber },
  { label: 'AI Innovation', title: 'Modern AI Workflows', detail: 'Cursor, Claude, Copilot, Gemini & v0', palette: crimson },
];

export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const introSlides: IntroSlide[] = [
  {
    kicker: 'Education',
    title: 'B.S. · Computer Science',
    lines: ['Lahore Garrison University', '2015 – 2019'],
    chips: ['Computer Science', 'Frontend Architecture'],
  },
  {
    kicker: 'Engineering Depth',
    title: '6+ Years in Production',
    lines: ['Enterprise React.js, Next.js, and TypeScript', 'Server-Side Rendering, Caching & Performance'],
    chips: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP'],
  },
  {
    kicker: 'Track Record',
    title: '4 Progressive Roles',
    lines: [
      'Exion Technologies · Sr. Software Engineer (Georgia)',
      'Gordian Solutions · Sr. Frontend Developer (Pakistan)',
      'Bring GmbH · Sr. Frontend Developer (Germany, Remote)',
      'TekX Solutions · Frontend Developer (Pakistan)',
    ],
  },
  {
    kicker: 'Key Originals',
    title: 'High-Impact Platforms',
    lines: [
      'MyChauffeur — Next.js SSR migration (+60% organic traffic)',
      'Comfy — Stripe & Saudi Mada dual-payment gateways',
      'Yelo Plus — Bilingual chauffeur platform with corporate accounts',
      'TSA Bildung — DE/EN course catalogue with programmatic local SEO',
    ],
  },
  {
    kicker: 'Verified Impact',
    title: 'Measurable Outcomes',
    lines: [
      '80% mobile traffic increase · 45% faster page load times',
      '90% reduction in production bugs · 95% client satisfaction rate',
    ],
  },
  {
    kicker: 'Next-Gen Horizon',
    title: 'AI-Assisted Delivery',
    lines: ['Claude, Cursor, Copilot, v0, Gemini, ChatGPT', 'Faster delivery with every line explained and owned.'],
  },
];

export type ProfileId = 'kamran' | 'recruiter' | 'developer' | 'creative';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  blurb: string;
  color: string;
  order: SectionId[];
}[] = [
  {
    id: 'kamran',
    name: 'Kamran Ali',
    blurb: 'The full series, in order',
    color: '#8FD9BE',
    order: ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'],
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Resume, achievements & skills first',
    color: '#4cc9ff',
    order: ['story', 'moments', 'skills', 'originals', 'about', 'journey', 'picks'],
  },
  {
    id: 'developer',
    name: 'Developer',
    blurb: 'Projects, architecture & stack first',
    color: '#8FD9BE',
    order: ['originals', 'skills', 'journey', 'moments', 'about', 'picks', 'story'],
  },
  {
    id: 'creative',
    name: 'Creative / Founder',
    blurb: 'The story arc, ROI & highlights first',
    color: '#C9A56A',
    order: ['journey', 'picks', 'originals', 'moments', 'about', 'skills', 'story'],
  },
];

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Kamran', meta: 'The Pilot • Foundations & Architecture', palette: violet },
  journey: { nav: 'Seasons', card: 'The Journey', meta: `${seasons.length} Seasons • ${seasons.reduce((n, s) => n + s.episodes.length, 0)} Episodes`, palette: amber },
  originals: { nav: 'Originals', card: 'My Projects', meta: `${projects.length} Originals • Production Systems`, palette: crimson },
  picks: { nav: 'Top Picks', card: 'Top Picks', meta: 'Top 10 from the resume', palette: jade },
  skills: { nav: 'Cast & Skills', card: 'Technical Specs', meta: '8 Core Disciplines', palette: ocean },
  moments: { nav: 'Moments', card: 'Key Achievements', meta: 'Verified Metrics & Outcomes', palette: crimson },
  story: { nav: 'Script / Resume', card: 'The Full Story', meta: 'Resume • View & download', palette: violet },
};
