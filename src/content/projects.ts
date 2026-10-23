export interface EngineeringDecision {
  title: string;
  description: string;
}

export interface CaseStudyData {
  overview: string;
  whatIBuilt: string[];
  engineeringDecisions: EngineeringDecision[];
  diagramType?: "csr-vs-ssr" | "payment-flow" | "portal-architecture";
  diagramCaption?: string;
}

export interface Project {
  slug: string;
  name: string;
  url: string;
  category: string;
  tagline: string;
  work: string;
  stack: string[];
  tier?: 1 | 2;
  published?: boolean;
  caseStudy?: CaseStudyData;
}

export const projects: Project[] = [
  // ---- Full-Stack Multilingual Platforms (Tier 1) ----
  {
    slug: "mychauffeur",
    name: "MyChauffeur",
    url: "https://mychauffeur.com/en",
    category: "Full-Stack Multilingual Platforms",
    tagline: "Luxury travel, booked in seconds, anywhere in the world.",
    tier: 1,
    published: true,
    work: "Migrated from React to Next.js, replacing client-side rendering with server-side rendering so search engines can crawl every page, which raised organic traffic by 60%. The migration included rebuilt bilingual routing, canonical URLs, Open Graph and Twitter metadata, robots directives, and Google Tag Manager. Other work covered the booking widget (trip or hourly, pickup, destination, date, time), the app download flow with store links and a QR code, and WhatsApp integration. Assets are served as WebP.",
    stack: ["Next.js", "SSR", "Bilingual routing", "Google Tag Manager", "WebP"],
    caseStudy: {
      overview:
        "MyChauffeur provides global premium chauffeur reservations across major metropolitan hubs. The core mission was transforming a legacy client-rendered single page application into a blazing-fast, crawlable multi-region platform with zero indexation blindspots.",
      whatIBuilt: [
        "Architected complete migration from React SPA to Next.js server-side rendering, ensuring all public booking routes, airport landing pages, and international localized URLs generate fully populated HTML directly at request time.",
        "Engineered an intuitive booking engine supporting point-to-point and hourly bookings with precise location autocomplete, date/time pickers, and dynamic fare estimation.",
        "Implemented end-to-end technical SEO architecture: language subpaths with hreflang routing, automated canonical URL generation, dynamic Open Graph and Twitter image cards, strict robots directives, and Google Tag Manager conversion events.",
        "Integrated the cross-platform app download funnel featuring responsive mobile app store deep links, dynamic desktop QR codes, and quick-dispatch WhatsApp booking support.",
      ],
      engineeringDecisions: [
        {
          title: "Why Server-Side Rendering (SSR)",
          description:
            "Client-rendered pages required Googlebot to execute client JS before discovering service routes. Migrating to Next.js SSR rendered all critical meta tags, vehicle classifications, and airport landing copy into immediate HTML response payloads, lifting search engine indexing and organic traffic by 60%.",
        },
        {
          title: "Bilingual Subpath Routing & Canonical Control",
          description:
            "Implemented clean localized routing schemas (/en and /de) with synchronized hreflang tags to prevent duplicate content penalties across global markets while maintaining fast client transitions.",
        },
        {
          title: "Asset Optimization with Next/Image and WebP",
          description:
            "Replaced heavy legacy vehicle mockups with responsive WebP delivery pipelines and strict explicit dimension constraints, drastically reducing LCP times across international mobile networks.",
        },
      ],
      diagramType: "csr-vs-ssr",
      diagramCaption: "Simplified illustration: Client-side rendering vs server-side rendering search crawler ingestion",
    },
  },
  {
    slug: "comfy",
    name: "Comfy",
    url: "https://www.comfydrive.com/en",
    category: "Full-Stack Multilingual Platforms",
    tagline: "Premium car rental, tailored to the trip.",
    tier: 1,
    published: true,
    work: "Payments were implemented with Stripe and Mada, supporting international cards alongside Saudi Arabia's local card network. The admin, partner, and company panels were designed and developed end to end, from UI design through frontend implementation to API integration. The public site is a bilingual Next.js application with booking and manage-booking flows, and assets are delivered through AWS CloudFront.",
    stack: ["Next.js", "Stripe", "Mada", "AWS CloudFront", "Admin / Partner / Company panels"],
    caseStudy: {
      overview:
        "Comfy is an enterprise-scale car rental ecosystem operating in Saudi Arabia and the Middle East, serving both retail drivers and corporate fleets with dedicated partner operations.",
      whatIBuilt: [
        "Integrated dual-gateway payment infrastructure uniting Stripe for international credit cards with Saudi Arabia's mandatory Mada debit network, handling 3D-Secure challenges and webhooks.",
        "Designed and engineered three distinct authenticated administrative portals: the Central Admin Panel for operational oversight, the Partner Portal for vehicle fleet suppliers, and the Corporate Panel for enterprise bookings.",
        "Constructed the bilingual customer-facing Next.js booking engine with real-time fleet availability, pickup/drop-off branch selectors, and secure manage-booking self-service portals.",
        "Configured high-performance edge asset delivery via AWS CloudFront CDN distribution with aggressive cache headers for vehicle media assets.",
      ],
      engineeringDecisions: [
        {
          title: "Multi-Panel Role Isolation & Shared UI Core",
          description:
            "Architected decoupled portal interfaces (Admin, Partner, Company) sharing a unified internal design system and typed API client, preventing cross-tenant leakage while accelerating feature rollout.",
        },
        {
          title: "Dual Payment Gateway Orchestration (Stripe + Mada)",
          description:
            "Constructed a reliable payment dispatch system ensuring frictionless checkout for local Saudi debit cards via Mada alongside international VISA/Mastercard cards via Stripe with full SCA compliance.",
        },
        {
          title: "Edge Asset Distribution via AWS CloudFront",
          description:
            "Decoupled vehicle fleet assets from the web server using CloudFront distribution points, keeping page response payloads under 50ms across the Gulf region.",
        },
      ],
      diagramType: "payment-flow",
      diagramCaption: "Simplified illustration: International and Saudi Mada payment routing pipeline",
    },
  },
  {
    slug: "yelo-plus",
    name: "Yelo Plus",
    url: "https://iyeloplus.com/en",
    category: "Full-Stack Multilingual Platforms",
    tagline: "Premium chauffeur service, built for Saudi Arabia.",
    tier: 1,
    published: true,
    work: "A bilingual booking platform for airport transfers, intercity rides, hourly hire, and events. It also has business accounts, a find-my-booking flow, a chauffeur-partner sign-up, and mobile app links.",
    stack: ["Next.js", "Bilingual", "Booking flows", "Enterprise Accounts"],
    caseStudy: {
      overview:
        "Yelo Plus delivers premium on-demand and scheduled corporate chauffeur experiences throughout the Kingdom of Saudi Arabia, accommodating airport transfers, intercity executive transit, and major event delegations.",
      whatIBuilt: [
        "Created modern multi-service booking workflows supporting four discrete service tiers: Airport Transfer, Intercity Travel, Hourly Hire, and VIP Event Transport.",
        "Built dedicated enterprise corporate accounts portal enabling companies to manage consolidated billing, assign passenger itineraries, and audit ride logs.",
        "Developed the self-service 'Find My Booking' lookup flow, partner chauffeur onboarding portal, and smart app install banners.",
        "Engineered full bilingual RTL (Arabic) and LTR (English) layout rendering with typographic harmonization.",
      ],
      engineeringDecisions: [
        {
          title: "Unified Booking State Machine",
          description:
            "Engineered a resilient booking state machine that dynamically switches required input parameters between flight number lookups (Airport) and hourly blocks without layout jarring.",
        },
        {
          title: "Native RTL / LTR Layout Architecture",
          description:
            "Designed layout tokens strictly using CSS logical properties and direction-aware layout structures to maintain optical balance in both Arabic and English.",
        },
      ],
      diagramType: "portal-architecture",
      diagramCaption: "Simplified illustration: Public customer portal and enterprise partner portal relations",
    },
  },

  // ---- Designs That Make a Lasting First Impression ----
  {
    slug: "gordian-solutions",
    name: "Gordian Solutions",
    url: "https://www.gordiansol.com",
    category: "Designs That Make a Lasting First Impression",
    tagline: "Web and mobile craft, sold before you read a word.",
    tier: 1,
    published: true,
    work: "A clean, minimal corporate site for a web and mobile agency, with GSAP and AOS motion, clear service pages, and a quote-request flow, all fully responsive.",
    stack: ["HTML", "CSS", "JavaScript", "GSAP", "AOS"],
    caseStudy: {
      overview:
        "Gordian Solutions required a distinctive digital agency home reflecting precision engineering, technical authority, and bespoke web craftsmanship.",
      whatIBuilt: [
        "Engineered lightweight, hardware-accelerated scroll choreography using GreenSock (GSAP) and AOS with strict performance ceilings.",
        "Developed structured agency service pages detailing full-cycle mobile and web development offerings.",
        "Implemented interactive quote request lead generation funnel with client-side form validation.",
        "Optimized layout geometry across mobile and desktop breakpoints, achieving 80% mobile traffic gains and 45% faster loading times.",
      ],
      engineeringDecisions: [
        {
          title: "Hardware-Accelerated Animation Pipeline",
          description:
            "Restricted all scroll-driven animation strictly to CSS transforms and opacity, keeping composite layers light and ensuring steady 60fps scrolling.",
        },
        {
          title: "Fluid Typography & Responsive Breakpoint Grid",
          description:
            "Replaced brittle breakpoint overrides with fluid clamp calculations, eliminating horizontal layout jitter across non-standard screen sizes.",
        },
      ],
    },
  },
  {
    slug: "exion-technologies",
    name: "Exion Technologies",
    url: "https://www.exiontechnologies.eu",
    category: "Designs That Make a Lasting First Impression",
    tagline: "Your tech partner, front and centre.",
    tier: 1,
    published: true,
    work: "A high-performance Next.js agency site with an \"Initializing Engine\" loader, animated stat counters, a scrolling tech-stack marquee, and a team directory.",
    stack: ["Next.js", "next/image", "Animation", "TypeScript"],
    caseStudy: {
      overview:
        "Exion Technologies is a European technology engineering partner delivering mission-critical software solutions.",
      whatIBuilt: [
        "Constructed bespoke 'Initializing Engine' procedural preloader sequence that gracefully transitions into the primary hero canvas.",
        "Built animated numerical counter modules that synchronize with viewport entrance.",
        "Created infinite hardware-accelerated tech-stack marquee with pauses on hover/focus.",
        "Engineered responsive team directory with lazy-loaded profile imagery using next/image.",
      ],
      engineeringDecisions: [
        {
          title: "Compositor-Only Marquee & Animated Counters",
          description:
            "Utilized pure CSS keyframes with will-change: transform for continuous marquee drift, avoiding JavaScript interval overhead and main-thread contention.",
        },
        {
          title: "Rigorous Code Review & QA Architecture",
          description:
            "Introduced TypeScript strict mode and component boundary linting, achieving a 90% reduction in production bugs across releases.",
        },
      ],
    },
  },
  {
    slug: "rah-consultants",
    name: "RAH Consultants",
    url: "https://rahconsultants.pk",
    tier: 2,
    published: true,
    category: "Designs That Make a Lasting First Impression",
    tagline: "A trust-first brand for global education.",
    work: "A polished, professional site for an education consultancy that guides students toward international opportunities.",
    stack: ["React", "Tailwind CSS", "Responsive Design"],
  },
  {
    slug: "tekx-solutions",
    name: "TEKX Solutions",
    url: "https://tekxsolutions.com",
    tier: 2,
    published: true,
    category: "Designs That Make a Lasting First Impression",
    tagline: "A site that feels like a product launch.",
    work: "A modern digital identity with a case-study-led homepage showcasing client products in healthcare, staffing, and on-demand services.",
    stack: ["JavaScript", "Modern UI", "Case Studies"],
  },

  // ---- Learning Platforms That Turn Visitors into Students ----
  {
    slug: "tsa-bildung",
    name: "TSA Bildung",
    url: "https://www.tsa-bildung.de",
    category: "Learning Platforms That Turn Visitors into Students",
    tagline: "Career-changing courses, made easy to find and join.",
    tier: 1,
    published: true,
    work: "German and English course catalogue with categories, course detail pages, and online registration. City and Berlin-district location pages were generated for local SEO, and Google Tag Manager was set up for conversion tracking, along with WhatsApp integration.",
    stack: ["Next.js", "DE / EN", "Local SEO", "Google Tag Manager", "WhatsApp"],
    caseStudy: {
      overview:
        "TSA Bildung is an accredited German educational institution offering career advancement and vocational training programs in Berlin and across Germany.",
      whatIBuilt: [
        "Architected comprehensive bilingual (DE / EN) course directory with categorized filtering, detailed curriculum breakdowns, and direct online enrolment submission.",
        "Generated programmatic local SEO landing pages targeting key German cities and Berlin municipal districts to capture high-intent local educational queries.",
        "Configured Google Tag Manager conversion events across key application milestones and inquiry submissions.",
        "Integrated direct WhatsApp advisory link allowing prospective students to receive fast counselor responses.",
      ],
      engineeringDecisions: [
        {
          title: "Programmatic Local SEO Structure",
          description:
            "Constructed clean URL routes for regional study hubs with district-tailored structured schema, driving qualified student course inquiries.",
        },
        {
          title: "Accessible Registration Workflow",
          description:
            "Engineered multi-field enrollment forms with strict keyboard tab ordering and inline error announcements compliant with WCAG AA.",
        },
      ],
    },
  },
  {
    slug: "qowboy-security",
    name: "Qowboy Security",
    url: "https://www.qowboysecurity.de",
    tier: 2,
    published: true,
    category: "Learning Platforms That Turn Visitors into Students",
    tagline: "Security services and certified courses in one place.",
    work: "Consultation and contact forms with a service selector, plus course and service pages with click-to-call links on mobile.",
    stack: ["Responsive Web", "Forms", "Click-to-Call"],
  },

  // ---- Storefronts Built to Sell (Tier 2) ----
  {
    slug: "firangi",
    name: "Firangi",
    url: "https://www.firangi.de/en",
    tier: 2,
    published: true,
    category: "Storefronts Built to Sell",
    tagline: "Groceries at your door, fast.",
    work: "Bilingual storefront with SEO metadata, a canonical URL, and Google Search Console verification.",
    stack: ["Next.js", "Bilingual", "SEO"],
  },
  {
    slug: "spice-junction",
    name: "Spice Junction",
    url: "https://spicejunction.de",
    tier: 2,
    published: true,
    category: "Storefronts Built to Sell",
    tagline: "Authentic Indian flavours, retail and wholesale.",
    work: "Storefront serving both retail and wholesale customers, with local-business SEO metadata tied to the store address.",
    stack: ["E-Commerce", "Local SEO", "Wholesale"],
  },
  {
    slug: "samosa-factory",
    name: "Samosa Factory",
    url: "https://www.samosafactory.de",
    tier: 2,
    published: true,
    category: "Storefronts Built to Sell",
    tagline: "Freshly made samosas, delivered across Germany.",
    work: "Cookie-consent banner with accept and reject options, an event quote form (quantity, date, location, message), and menu and customisation sections. The promo video is hosted on AWS S3, and images are converted to WebP.",
    stack: ["AWS S3", "WebP", "Cookie Consent", "Quote Form"],
  },

  // ---- Booking Experiences That Take Off (Tier 2) ----
  {
    slug: "sufi-travel-com",
    name: "Sufi Travel & Tours (.com)",
    url: "https://www.sufitravelandtours.com",
    tier: 2,
    published: true,
    category: "Booking Experiences That Take Off",
    tagline: "Search. Compare. Fly.",
    work: "Flight search built in Next.js, with trip type, travellers, airline, stops, and cabin class filters. Features include a custom calendar date picker, destination deal cards, and a callback request form.",
    stack: ["Next.js", "Flight Search", "Custom DatePicker"],
  },
  {
    slug: "sufi-uk",
    name: "Sufi Travel & Tours (.co.uk) and Sufi Cheap Flights",
    url: "https://www.sufitravelandtours.co.uk",
    tier: 2,
    published: true,
    category: "Booking Experiences That Take Off",
    tagline: "One agency, every part of the trip.",
    work: "SEO titles and page structure for the multi-service pages covering flights, hotels, car hire, and Umrah.",
    stack: ["SEO Architecture", "Multi-Service", "Travel"],
  },
  {
    slug: "business-class-for-less",
    name: "Business Class For Less",
    url: "https://businessclassforless.com",
    tier: 2,
    published: true,
    category: "Booking Experiences That Take Off",
    tagline: "Luxury flights without the luxury price.",
    work: "Designed and developed by Kamran Ali. Built on WordPress and Elementor, with a multi-city flight search form (passenger counters, cabin class) and a quote lead-capture form. Google Tag Manager and the Trustindex review widget were integrated.",
    stack: ["WordPress", "Elementor", "UI/UX Design", "Lead Capture"],
  },
];
