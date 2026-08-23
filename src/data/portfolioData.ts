import { 
  PortfolioProfile, 
  ProjectItem, 
  SkillItem, 
  ExperienceItem, 
  TestimonialItem 
} from '../types/portfolio';

export const initialProfile: PortfolioProfile = {
  name: 'Kamran Ali',
  title: 'Senior Frontend Developer',
  subtitle: 'Frontend Architecture & AI-Augmented Engineering',
  headline: 'Architecting high-performance, large-scale web applications with React.js, Next.js, and TypeScript, converged with applied AI innovation.',
  email: 'kamranali6546@gmail.com',
  phone: '+995 568 772 744',
  location: 'Tbilisi, Georgia',
  relocationStatus: 'Open to relocation · Requires employer-sponsored work permit',
  availability: 'Available for full-time & consulting',
  yearsExperience: 6,
  github: 'https://github.com/kamranali6546',
  linkedin: 'https://www.linkedin.com/in/kamran-ali-b9a7183b0/',
  twitter: 'https://twitter.com/kamranali',
  discord: 'kamranali#0001',
  bio: [
    'Senior Frontend Developer with 6+ years of experience architecting high-performance, large-scale web applications — from component-driven frontend architecture and micro-frontend strategies to scalable enterprise design systems — using React.js, Next.js, and TypeScript.',
    'My focus is now shifting toward the convergence of frontend architecture and artificial intelligence, building AI-assisted development workflows and intelligent, adaptive interfaces that define the next generation of digital products.',
    'Seeking a Senior/Lead role where deep architectural expertise meets applied AI innovation to design and ship high-conversion, future-ready experiences at scale.'
  ],
  stats: [
    { label: 'Bug Reduction', value: '90%', desc: 'Championed peer code-review culture' },
    { label: 'Client Satisfaction', value: '95%', desc: 'Sustained across 4+ yr enterprise engagement' },
    { label: 'Mobile Traffic Growth', value: '+80%', desc: 'Through systematic responsive redesigns' },
    { label: 'Load Time Optimization', value: '-45%', desc: 'Architecture-level performance & +25% SEO' }
  ],
  education: [
    {
      degree: 'Master of Business Administration (MBA)',
      year: '2026',
      institution: 'Georgian National University SEU'
    },
    {
      degree: 'Bachelor of Computer Science',
      year: '2019',
      institution: 'Lahore Garrison University, Pakistan'
    }
  ],
  leadership: [
    {
      title: 'Team Leadership',
      desc: 'Led cross-functional pods of frontend, backend, and design engineers across multi-year enterprise engagements'
    },
    {
      title: 'Mentorship',
      desc: 'Guided junior developers through code review, pairing, and architecture walkthroughs to raise team-wide code quality'
    },
    {
      title: 'Stakeholder Communication',
      desc: 'Partnered directly with clients and product owners to translate business goals into technical roadmaps'
    },
    {
      title: 'Process & Delivery',
      desc: 'Drove Agile/Scrum ceremonies and sprint planning to keep distributed, remote-first teams aligned and on schedule'
    }
  ],
  languages: [
    { name: 'English', level: 'Proficient' },
    { name: 'Urdu', level: 'Native' }
  ]
};

export const initialProjects: ProjectItem[] = [
  {
    id: 'comfy-car-rental',
    title: 'Comfy – Car Rental Platform',
    tagline: 'Next.js bilingual (EN/AR) luxury car rental platform across KSA',
    description: 'Developed a Next.js bilingual platform (EN/AR) for luxury car rentals across the Kingdom of Saudi Arabia (KSA). Delivered seamless booking flows, loyalty/rewards programs, and comprehensive insurance integrations. Optimized performance (Core Web Vitals) and accessibility, ensuring a mobile-first, SEO-optimized high-conversion booking engine.',
    category: 'react_nextjs',
    tags: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'Bilingual (i18n EN/AR)', 'Core Web Vitals', 'SSR/ISR'],
    metrics: [
      { label: 'Period', value: 'May 2024 - Jul 2025' },
      { label: 'Markets', value: 'KSA Nationwide' },
      { label: 'Localization', value: 'Bilingual EN/AR' }
    ],
    architectureHighlights: [
      'Engineered localized bidirectional (RTL/LTR) architecture for seamless Arabic and English browsing',
      'Integrated multi-tiered loyalty reward systems, dynamic pricing, and comprehensive vehicle insurance checkout options',
      'Optimized Core Web Vitals to achieve sub-second LCP and 100/100 Mobile SEO rating',
      'Built reactive multi-step vehicle booking funnel with optimistic inventory reservation'
    ],
    githubUrl: 'https://github.com/kamranali6546/comfy-car-rental',
    liveUrl: 'https://comfy.sa',
    featured: true,
    interactiveDemoType: 'latency_sim',
    codeSnippet: `// Comfy Bilingual Localization & Booking State Engine
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BookingState {
  locale: 'en' | 'ar';
  direction: 'ltr' | 'rtl';
  selectedVehicleId: string | null;
  insuranceTier: 'basic' | 'premium' | 'zero_deductible';
  loyaltyPointsApplied: number;
  setLocale: (locale: 'en' | 'ar') => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      locale: 'ar',
      direction: 'rtl',
      selectedVehicleId: null,
      insuranceTier: 'premium',
      loyaltyPointsApplied: 0,
      setLocale: (locale) => set({
        locale,
        direction: locale === 'ar' ? 'rtl' : 'ltr'
      })
    }),
    { name: 'comfy-booking-storage' }
  )
);`
  },
  {
    id: 'movers-reports',
    title: 'Movers Reports – Directory & Cost Insights',
    tagline: 'US-focused moving resource with real-time DOT SAFER carrier verification',
    description: 'Developed the web platform for MoversReport.com, a comprehensive U.S.-focused moving resource. The platform offers real-time integration with DOT\'s SAFER registry for carrier verification, delivers moving company reviews, cost estimation tools, and nationwide service coverage. Features include multi-factor company ratings, fraud alerts, and a dynamic cost calculator for full-service moves.',
    category: 'frontend_arch',
    tags: ['React.js', 'Next.js', 'TypeScript', 'DOT SAFER API', 'Dynamic Cost Engine', 'Interactive Maps', 'Tailwind CSS'],
    metrics: [
      { label: 'Period', value: 'Nov 2023 - Sep 2024' },
      { label: 'Integration', value: 'US DOT SAFER' },
      { label: 'Coverage', value: 'US Nationwide' }
    ],
    architectureHighlights: [
      'Integrated real-time US Department of Transportation (DOT) SAFER registry lookup for instant federal carrier verification',
      'Engineered dynamic moving cost estimation algorithm analyzing route distance, cubic feet, and seasonal freight indexes',
      'Implemented multi-factor carrier rating algorithms and automated fraud detection warnings',
      'Architected high-throughput search interface with instant state-level and city-level indexing'
    ],
    githubUrl: 'https://github.com/kamranali6546/movers-reports',
    liveUrl: 'https://moversreport.com',
    featured: true,
    interactiveDemoType: 'code_diff',
    codeSnippet: `// Real-Time DOT SAFER Verification Ingestion
export async function verifyCarrierDOT(dotNumber: string) {
  const endpoint = \`https://api.moversreport.com/v1/dot-verify/\${dotNumber}\`;
  const response = await fetch(endpoint, {
    headers: { 'X-Engine-Agent': 'MoversReport-Verification/2.0' },
    next: { revalidate: 3600 }
  });
  
  if (!response.ok) throw new Error('Carrier registry lookup failed');
  const carrier = await response.json();
  
  return {
    isAuthorized: carrier.operatingStatus === 'AUTHORIZED_FOR_HIRE',
    safetyRating: carrier.safetyRating, // e.g. Satisfactory
    fleetSize: carrier.totalPowerUnits,
    insuranceActive: carrier.bipdInsuranceOnHand > 750000
  };
}`
  },
  {
    id: 'yelo-limousine',
    title: 'Yelo Limousine – Global Chauffeur Booking',
    tagline: 'Global chauffeur booking platform with responsive design & scalable architecture',
    description: 'Developed a global chauffeur booking platform with React.js. Emphasized responsive design, SEO, and scalable architecture, while ensuring seamless booking experiences for international executive travel, airport transfers, and hourly limousine hire.',
    category: 'react_nextjs',
    tags: ['React.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'Booking Engine', 'SEO Optimization'],
    metrics: [
      { label: 'Period', value: 'Feb 2023 - Jul 2024' },
      { label: 'Role', value: 'Chauffeur Platform' },
      { label: 'Scale', value: 'Global Fleet' }
    ],
    architectureHighlights: [
      'Engineered responsive luxury fleet selection interface with instant quotes and vehicle specification modals',
      'Integrated airport flight number auto-tracking and dynamic pickup buffer recalculations',
      'Optimized component rendering cycles with React.memo and lightweight state management',
      'Structured semantic schema.org structured data for global airport transfer search ranking'
    ],
    githubUrl: 'https://github.com/kamranali6546/yelo-limousine',
    liveUrl: 'https://yelolimousine.com',
    featured: true,
    interactiveDemoType: 'component_preview',
    codeSnippet: `// Yelo Fleet & Route Pricing Dispatcher
export function calculateExecutiveQuote(distanceKm: number, vehicleClass: string, isAirportPickup: boolean) {
  const baseRates: Record<string, { base: number; perKm: number; airportFee: number }> = {
    first_class: { base: 120, perKm: 4.5, airportFee: 35 },
    business_sedan: { base: 75, perKm: 3.2, airportFee: 25 },
    executive_van: { base: 95, perKm: 3.8, airportFee: 30 }
  };
  const rate = baseRates[vehicleClass] || baseRates.business_sedan;
  const quote = rate.base + (distanceKm * rate.perKm) + (isAirportPickup ? rate.airportFee : 0);
  return Math.round(quote);
}`
  },
  {
    id: 'tsa-bildung',
    title: 'TSA Bildung – Online & In-Person Training Academy',
    tagline: 'Berlin-based digital academy for state-certified, AI-assisted vocational training',
    description: 'Built the digital platform for TSA Bildung, a Berlin-based academy delivering state-certified, AI-assisted vocational training in security, logistics, healthcare, and technology. Implemented a multilingual, responsive design with structured course listings, interactive enrollment CTAs, and optimized SEO to reach a broader audience.',
    category: 'ai_augmented',
    tags: ['Next.js', 'React.js', 'AI-Assisted Learning', 'Multilingual', 'German Vocational Standards', 'Tailwind CSS'],
    metrics: [
      { label: 'Period', value: 'Mar 2024 - May 2024' },
      { label: 'Location', value: 'Berlin, Germany' },
      { label: 'Courses', value: 'Multi-Industry' }
    ],
    architectureHighlights: [
      'Developed structured course hierarchy covering state-certified vocational qualifications across 4 key industries',
      'Integrated AI-assisted learning consultation and interactive course finder tool',
      'Implemented multilingual support with German-first compliance and accessibility',
      'Built high-conversion inquiry funnel and automated appointment scheduling'
    ],
    githubUrl: 'https://github.com/kamranali6546/tsa-bildung',
    liveUrl: 'https://tsa-bildung.de',
    featured: true,
    interactiveDemoType: 'ai_query',
    codeSnippet: `// Course Finder & Qualification Matcher
export interface CourseCategory {
  id: 'security' | 'logistics' | 'healthcare' | 'tech';
  certification: string;
  durationWeeks: number;
}

export function matchApplicantProgram(priorExperienceYears: number, targetField: string) {
  return {
    recommendedPath: targetField === 'security' ? '§34a GewO Sachkunde' : 'Logistics Master Class',
    fundingEligible: true, // Bildungsgutschein / Jobcenter approved
    estCompletion: '12 Weeks'
  };
}`
  },
  {
    id: 'mychauffeur-gmbh',
    title: 'MyChauffeur GmbH – Global Chauffeur Services',
    tagline: 'Premium global limousine & chauffeur booking platform serving international clients',
    description: 'Built and scaled a premium limousine & chauffeur booking platform serving global clients. Implemented multi-vehicle class booking flows (airport transfers, hourly bookings, luxury buses, corporate events), SSR with Next.js, and integrated responsive design for web + mobile.',
    category: 'react_nextjs',
    tags: ['Next.js (SSR)', 'React.js', 'TypeScript', 'Google Maps API', 'Stripe Billing', 'Tailwind CSS'],
    metrics: [
      { label: 'Period', value: 'Oct 2021 - Jun 2023' },
      { label: 'Scale', value: 'Global Multi-City' },
      { label: 'Bookings', value: 'Multi-Vehicle Class' }
    ],
    architectureHighlights: [
      'Implemented multi-vehicle booking flows for airport, hourly, executive bus, and bespoke event packages',
      'Server-side rendering (SSR) in Next.js for high-speed dynamic pricing calculations across international currencies',
      'Integrated interactive route mapping, waypoint insertion, and live chauffeur dispatch tracking',
      'Designed frictionless checkout flow with secure tokenized enterprise payment processing'
    ],
    githubUrl: 'https://github.com/kamranali6546/mychauffeur-global',
    liveUrl: 'https://mychauffeur.com',
    featured: true,
    interactiveDemoType: 'component_preview',
    codeSnippet: `// Multi-Vehicle Dispatch Booking Matrix
export type ChauffeurServiceType = 'airport_transfer' | 'hourly_hire' | 'event_delegation';

export interface BookingPayload {
  serviceType: ChauffeurServiceType;
  pickupTime: string;
  vehicleTier: 'Business Class' | 'First Class' | 'Business Van' | 'Luxury Minibus';
  flightTrackingNumber?: string;
  passengers: number;
  luggageCount: number;
}`
  },
  {
    id: 'qowboy-security',
    title: 'Qowboy Security – Security Services',
    tagline: 'Corporate digital platform for German VIP protection & event security provider',
    description: 'Developed the responsive corporate website for Qowboy Security GmbH, a German provider of VIP protection, event security, construction site safety, and security guard training services. Designed a clean, professional UI with service overviews, training course details, and consultation CTAs to increase lead generation.',
    category: 'design_systems',
    tags: ['React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Lead Generation', 'German Enterprise UI'],
    metrics: [
      { label: 'Period', value: 'Oct 2023 - Dec 2023' },
      { label: 'Location', value: 'Germany' },
      { label: 'Services', value: 'VIP & Commercial' }
    ],
    architectureHighlights: [
      'Crafted high-contrast, authoritative corporate design language reflecting tactical security standards',
      'Implemented interactive security requirement calculator and instant quote dispatch for events',
      'Structured comprehensive security academy curriculum section for industry certification candidates',
      'Optimized asset pipeline achieving 98+ Lighthouse scores across all desktop and mobile views'
    ],
    githubUrl: 'https://github.com/kamranali6546/qowboy-security',
    liveUrl: 'https://qowboy-security.de',
    featured: false,
    interactiveDemoType: 'code_diff',
    codeSnippet: `// Security Service Ingestion & Lead Routing
export function routeSecurityInquiry(serviceType: 'vip_guard' | 'event_patrol' | 'site_security') {
  return {
    priority: serviceType === 'vip_guard' ? 'URGENT_DISPATCH' : 'STANDARD_AUDIT',
    assignedRegionalOffice: 'Berlin-HQ',
    responseSLA: 'Within 2 Hours'
  };
}`
  },
  {
    id: 'firangi-grocery',
    title: 'Firangi – Grocery Platform',
    tagline: 'Responsive food ordering web application with React.js and Next.js',
    description: 'Designed and developed a responsive food ordering web application with React.js and Next.js. Focused on smooth UI/UX, optimized API handling, and implemented scalable component architecture with instant cart mutations and category browsing.',
    category: 'react_nextjs',
    tags: ['React.js', 'Next.js', 'Redux Toolkit', 'REST API', 'Cart Optimization', 'Tailwind CSS'],
    metrics: [
      { label: 'Period', value: 'Aug 2022 - Sep 2023' },
      { label: 'Type', value: 'Grocery E-Commerce' },
      { label: 'Architecture', value: 'Optimized API' }
    ],
    architectureHighlights: [
      'Built scalable React component architecture with instant optimistic cart operations',
      'Optimized catalog API payloads with infinite scrolling and client-side memory caching',
      'Designed responsive mobile-first navigation with quick-add quantity selectors and dietary filters',
      'Engineered smooth checkout flow with delivery time-slot scheduling'
    ],
    githubUrl: 'https://github.com/kamranali6546/firangi-grocery',
    liveUrl: 'https://firangi.example.com',
    featured: false,
    interactiveDemoType: 'component_preview',
    codeSnippet: `// Cart Slicing with Optimistic UI updates
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem { id: string; name: string; price: number; quantity: number; }

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] as CartItem[], subtotal: 0 },
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) existing.quantity += action.payload.quantity;
      else state.items.push(action.payload);
      state.subtotal = state.items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    }
  }
});`
  },
  {
    id: 'izmir-chauffeurs',
    title: 'Izmir Chauffeurs – Luxury Transfer & Private Tours',
    tagline: 'Premium transfer & private tour landing page in Izmir, Turkey',
    description: 'Developed the luxury chauffeur services landing page for Izmir Chauffeurs, the leading premium transfer service in Izmir, Turkey. Built with Next.js + React, the site offers seamless booking for airport transfers, private tours, and event transport, with a focus on fleet presentation, reliability, and elegance. Optimized for performance, SEO, and responsive design.',
    category: 'react_nextjs',
    tags: ['Next.js', 'React.js', 'Tailwind CSS', 'Fleet Presentation', 'SEO & Speed', 'Tour Booking'],
    metrics: [
      { label: 'Period', value: 'Mar 2023 - Apr 2023' },
      { label: 'Region', value: 'Izmir, Turkey' },
      { label: 'Focus', value: 'Luxury Tours & VIP' }
    ],
    architectureHighlights: [
      'Crafted elegant, dark-mode luxury vehicle showcase with 360-degree interior highlights',
      'Built bespoke private tour itinerary booking tool covering Aegean historical landmarks',
      'Optimized multi-language SEO parameters targeting international tourist searches',
      'Delivered 100/100 Core Web Vitals performance with zero layout shift'
    ],
    githubUrl: 'https://github.com/kamranali6546/izmir-chauffeurs',
    liveUrl: 'https://izmirchauffeurs.com',
    featured: false,
    interactiveDemoType: 'latency_sim',
    codeSnippet: `// Private Tour Route & Itinerary Builder
export const IZMIR_VIP_TOURS = [
  { id: 'ephesus-heritage', title: 'Ephesus & House of Virgin Mary', durationHours: 8, basePriceEUR: 280 },
  { id: 'cesme-alacati', title: 'Çeşme & Alaçatı Coastal Tour', durationHours: 6, basePriceEUR: 220 },
  { id: 'pergamum-acropolis', title: 'Ancient Pergamum Day Expedition', durationHours: 9, basePriceEUR: 320 }
];`
  },
  {
    id: 'tekx-solutions',
    title: 'TEKX Solutions – Corporate Website & Digital Identity',
    tagline: 'UK-based software engineering and product design company corporate platform',
    description: 'Designed and developed the corporate website for TEKX Solutions, a UK-based software engineering and product design company with global presence. Built using Next.js + React, featuring responsive layouts, SEO optimization, and high-performance rendering. Delivered a modern, professional digital identity that highlights TEKX’s services, case studies, and client partnerships.',
    category: 'frontend_arch',
    tags: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'Corporate Identity', 'Case Studies'],
    metrics: [
      { label: 'Period', value: 'Jun 2022 - Aug 2022' },
      { label: 'Client', value: 'TEKX Solutions UK' },
      { label: 'Impact', value: '+35% Inquiries' }
    ],
    architectureHighlights: [
      'Architected modular case study showcase system with dynamic tech-stack filtering',
      'Created bespoke interactive UI micro-animations showcasing digital engineering capabilities',
      'Integrated automated contact inquiry pipeline with client CRM endpoints',
      'Executed responsive layouts validated across 15+ screen viewport dimensions'
    ],
    githubUrl: 'https://github.com/kamranali6546/tekx-solutions-corporate',
    liveUrl: 'https://tekxsolutions.com',
    featured: false,
    interactiveDemoType: 'code_diff',
    codeSnippet: `// Case Study Dynamic Filtering Engine
export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  stack: string[];
}

export function filterCaseStudies(studies: CaseStudy[], activeStack: string) {
  if (!activeStack || activeStack === 'All') return studies;
  return studies.filter(s => s.stack.includes(activeStack));
}`
  },
  {
    id: 'samosa-factory',
    title: 'Samosa Factory – Restaurant Landing Page',
    tagline: 'Authentic dining & nationwide fresh catering delivery from Berlin',
    description: 'Samosa Factory offers a wide variety of authentic and customizable samosas, freshly prepared daily with local ingredients. They provide nationwide delivery from Berlin, emphasize hygiene and eco-friendly packaging, and cater to events with personalized orders. Built with interactive menu selectors and custom ordering flows.',
    category: 'design_systems',
    tags: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Berlin Catering', 'Menu Selector', 'Eco Packaging'],
    metrics: [
      { label: 'Period', value: 'Apr 2022 - Jul 2022' },
      { label: 'Location', value: 'Berlin, Germany' },
      { label: 'Coverage', value: 'Nationwide Delivery' }
    ],
    architectureHighlights: [
      'Engineered interactive custom samosa box builder with real-time dietary badges (vegan, halal, gluten-free)',
      'Built nationwide cold-chain delivery checkout calendar with cutoff time enforcement',
      'Implemented custom event catering quote calculator for corporate gatherings',
      'High-performance image asset pipeline showcasing food photography without bandwidth bloat'
    ],
    githubUrl: 'https://github.com/kamranali6546/samosa-factory',
    liveUrl: 'https://samosafactory.de',
    featured: false,
    interactiveDemoType: 'component_preview',
    codeSnippet: `// Samosa Custom Box Configurator
export interface SamosaVariety { id: string; name: string; isVegan: boolean; isSpicy: boolean; }

export function calculateBoxPrice(boxSize: 6 | 12 | 24, selections: SamosaVariety[]) {
  const priceMatrix = { 6: 14.99, 12: 26.99, 24: 49.99 };
  return {
    total: priceMatrix[boxSize],
    itemCount: selections.length,
    isComplete: selections.length === boxSize
  };
}`
  },
  {
    id: 'business-class-for-less',
    title: 'Business Class For Less – Airline Booking',
    tagline: 'High-conversion flight search & discounted business class reservation platform',
    description: 'Built a responsive booking platform for searching discounted premium and business class flight tickets. Implemented advanced search filters, multi-city routing, optimized for SEO, and improved customer conversion through performance tuning.',
    category: 'react_nextjs',
    tags: ['React.js', 'TypeScript', 'Flight Search Engine', 'Multi-City Routing', 'SEO Conversion', 'Redux'],
    metrics: [
      { label: 'Period', value: 'Dec 2021 - Jun 2022' },
      { label: 'Focus', value: 'Business Airline Fare' },
      { label: 'Outcome', value: '+30% Conversion' }
    ],
    architectureHighlights: [
      'Built high-speed flight search matrix supporting multi-city, open-jaw, and flexible calendar search',
      'Engineered real-time fare alert subscription system and instant seat class upgrade previews',
      'Optimized flight search API response parsing with debounced autocomplete and state caching',
      'Implemented responsive checkout funnel reducing user abandonment across mobile devices'
    ],
    githubUrl: 'https://github.com/kamranali6546/business-class-for-less',
    liveUrl: 'https://businessclassforless.com',
    featured: false,
    interactiveDemoType: 'latency_sim',
    codeSnippet: `// Airline Fare Search Query Aggregator
export interface FlightSearchParams {
  originAirport: string;
  destinationAirport: string;
  departureDate: string;
  returnDate?: string;
  cabinClass: 'business' | 'first';
  directFlightsOnly: boolean;
}

export function formatFlightQuery(params: FlightSearchParams): URLSearchParams {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined) query.set(key, String(val));
  });
  return query;
}`
  },
  {
    id: 'sufi-travel-tours',
    title: 'Sufi Travel & Tours – Lightweight Flight Search',
    tagline: 'Lightweight flight search platform with high-performance responsive UIs',
    description: 'Created a lightweight flight search platform. Delivered responsive UIs with API integration, fast departure/arrival airport autocomplete, and improved page performance across low-bandwidth connections.',
    category: 'react_nextjs',
    tags: ['React.js', 'REST API', 'Airport Autocomplete', 'Fast Load Times', 'CSS Grid'],
    metrics: [
      { label: 'Period', value: 'Aug 2021 - Dec 2021' },
      { label: 'Type', value: 'Travel Booking' },
      { label: 'Performance', value: 'Fast Low-Bandwidth' }
    ],
    architectureHighlights: [
      'Engineered ultra-lightweight client bundle tailored for seamless usage over mobile network connections',
      'Implemented fast local caching for global IATA airport code lookup',
      'Structured clean itinerary review components with baggage allowance and layover indicators',
      'Integrated WhatsApp & direct agency agent instant dispatch CTAs'
    ],
    githubUrl: 'https://github.com/kamranali6546/sufi-travel-tours',
    liveUrl: 'https://sufitravels.example.com',
    featured: false,
    interactiveDemoType: 'latency_sim',
    codeSnippet: `// IATA Airport Quick Search
const IATA_DB = [
  { code: 'TBS', city: 'Tbilisi', country: 'Georgia' },
  { code: 'DXB', city: 'Dubai', country: 'UAE' },
  { code: 'LHR', city: 'London Heathrow', country: 'UK' },
  { code: 'JFK', city: 'New York JFK', country: 'USA' }
];

export function searchAirport(query: string) {
  const q = query.toLowerCase();
  return IATA_DB.filter(a => a.code.toLowerCase().includes(q) || a.city.toLowerCase().includes(q));
}`
  },
  {
    id: 'washbutler-detailing',
    title: 'WashButler — On-Demand Car Wash & Detailing',
    tagline: 'Eco-friendly doorstep car wash & detailing service booking platform',
    description: 'Built the official website for an eco-friendly, doorstep car wash & detailing service. Delivered mobile-first pages and clear booking CTAs so users can book without moving their car. Focused on performance, accessibility, and SEO to convert visitors into bookings.',
    category: 'design_systems',
    tags: ['React.js', 'Tailwind CSS', 'Mobile-First', 'Doorstep Booking', 'Eco Detailing', 'SEO'],
    metrics: [
      { label: 'Period', value: 'Jun 2021 - Sep 2021' },
      { label: 'Service', value: 'On-Demand Doorstep' },
      { label: 'Design', value: 'Mobile-First UI' }
    ],
    architectureHighlights: [
      'Engineered streamlined 3-step mobile booking flow (Vehicle Type → Detailing Package → Location & Slot)',
      'Integrated GPS location pin drops for precise driveway and parking bay service dispatch',
      'Highlighted eco-friendly waterless technology and zero-spill environmental safety credentials',
      'Achieved instantaneous mobile page load times with asset pre-compression'
    ],
    githubUrl: 'https://github.com/kamranali6546/washbutler',
    liveUrl: 'https://washbutler.example.com',
    featured: false,
    interactiveDemoType: 'component_preview',
    codeSnippet: `// WashButler Package Selector
export interface DetailingPackage { id: string; name: string; price: number; durationMin: number; }

export const WASH_PACKAGES: DetailingPackage[] = [
  { id: 'express', name: 'Eco Exterior Shine', price: 29, durationMin: 35 },
  { id: 'full-detail', name: 'Signature Deep Clean & Interior', price: 79, durationMin: 75 },
  { id: 'ceramic-shield', name: 'Ceramic Coating & Paint Shield', price: 149, durationMin: 120 }
];`
  },
  {
    id: 'bring-express-recruitment',
    title: 'Bring Express GmbH – Logistics Recruitment Portal',
    tagline: 'Job posting and recruitment portal focused on transport staff and logistics drivers',
    description: 'Developed a job posting and recruitment portal focused on drivers and transport staff. Built with React.js + Material-UI, featuring responsive layouts, job listing components, and secure application flows. Improved site performance and accessibility to support high-volume traffic from applicants.',
    category: 'frontend_arch',
    tags: ['React.js', 'Material-UI', 'Recruitment Portal', 'Logistics Staffing', 'Resume Upload', 'Accessibility'],
    metrics: [
      { label: 'Period', value: 'Nov 2020 - Feb 2021' },
      { label: 'Industry', value: 'Logistics Staffing' },
      { label: 'Scale', value: 'High Applicant Volume' }
    ],
    architectureHighlights: [
      'Built multi-step applicant intake flow supporting resume upload, driving license verification, and work permits',
      'Integrated administrative applicant filtering dashboard with status tracking (Applied, Interview, Hired)',
      'Optimized responsive layouts with Material-UI components and custom accessibility styling',
      'Ensured GDPR-compliant encrypted document uploads and applicant data handling'
    ],
    githubUrl: 'https://github.com/kamranali6546/bring-express-portal',
    liveUrl: 'https://bring-express.de',
    featured: false,
    interactiveDemoType: 'code_diff',
    codeSnippet: `// Driver Job Application Validation Pipeline
export interface ApplicantData {
  fullName: string;
  email: string;
  licenseClass: 'B' | 'C1' | 'C' | 'CE';
  hasAdrCertificate: boolean;
  yearsExperience: number;
}

export function validateDriverCandidate(data: ApplicantData): boolean {
  return Boolean(data.fullName && data.email && data.licenseClass && data.yearsExperience >= 1);
}`
  },
  {
    id: 'gordian-solutions-corporate',
    title: 'Gordian Solutions – Corporate Website',
    tagline: 'High-performance corporate website engineered with HTML, GSAP and AOS animations',
    description: 'Designed and developed the main company website using modern web architecture, GSAP timelines, and AOS scroll transitions, focusing on performance, corporate branding, and mobile responsiveness across all devices.',
    category: 'frontend_arch',
    tags: ['JavaScript (ES6+)', 'GSAP Animations', 'AOS Transitions', 'Responsive Design', 'HTML5 & CSS3'],
    metrics: [
      { label: 'Period', value: 'Apr 2020 - Aug 2020' },
      { label: 'Company', value: 'Gordian Solutions' },
      { label: 'Tech', value: 'GSAP & AOS' }
    ],
    architectureHighlights: [
      'Created custom GSAP timeline animations for hero text reveals and interactive service cards',
      'Engineered smooth scrolling behaviors synchronized with AOS scroll trigger markers',
      'Enforced semantic HTML structure for optimal accessibility and search engine visibility',
      'Delivered clean cross-browser layout consistency across all legacy and modern browsers'
    ],
    githubUrl: 'https://github.com/kamranali6546/gordian-solutions-website',
    liveUrl: 'https://gordiansolutions.example.com',
    featured: false,
    interactiveDemoType: 'code_diff',
    codeSnippet: `// GSAP Reveal Timeline & Scroll Choreography
export function initCorporateAnimations() {
  const elements = document.querySelectorAll('.fade-slide-up');
  elements.forEach((el, index) => {
    el.style.animationDelay = \`\${index * 0.15}s\`;
    el.classList.add('is-revealed');
  });
}`
  },
  {
    id: 'koenigs-partner',
    title: 'Koenigs Partner – Professional Corporate Platform',
    tagline: 'Corporate business website with modern UI and performance optimization',
    description: 'Delivered a professional corporate site with modern UI and performance optimization, presenting consulting services, executive partners, and client case studies with clean typography and fast page loads.',
    category: 'design_systems',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Corporate Branding', 'Performance Tuning'],
    metrics: [
      { label: 'Period', value: 'Feb 2020 - Mar 2020' },
      { label: 'Type', value: 'Corporate Consulting' },
      { label: 'Focus', value: 'Speed & Elegance' }
    ],
    architectureHighlights: [
      'Designed bespoke minimalist typography scale reflecting elite German consulting identity',
      'Optimized CSS and JavaScript asset payloads for instant zero-lag page navigation',
      'Built responsive partner biography cards and corporate contact inquiry form',
      'Ensured full cross-browser compliance across Edge, Chrome, Safari, and Firefox'
    ],
    githubUrl: 'https://github.com/kamranali6546/koenigs-partner',
    liveUrl: 'https://koenigspartner.example.com',
    featured: false,
    interactiveDemoType: 'component_preview',
    codeSnippet: `// Corporate Partner Directory Registry
export const PARTNERS_REGISTRY = [
  { name: 'Dr. Michael Koenig', role: 'Managing Partner', practice: 'Enterprise Restructuring' },
  { name: 'Sarah Lindemann', role: 'Senior Partner', practice: 'Digital Transformation & Governance' }
];`
  }
];

export const initialSkills: SkillItem[] = [
  // Core Languages & Frameworks
  {
    name: 'React.js',
    category: 'Core Languages & Frameworks',
    level: 98,
    years: 6,
    featured: true,
    iconName: 'Code',
    description: 'React, React Server Components (RSC), Custom Hooks, Suspense, Error Boundaries, Concurrent Mode, Virtual DOM internals.',
    tags: ['React', 'RSC', 'Hooks', 'Concurrent Mode', 'Context API']
  },
  {
    name: 'Next.js',
    category: 'Core Languages & Frameworks',
    level: 95,
    years: 5,
    featured: true,
    iconName: 'Globe',
    description: 'Next.js App Router, SSR, SSG, ISR, Edge Functions, Image/Font Optimization, Route Handlers, Turbopack.',
    tags: ['App Router', 'SSR / SSG', 'ISR', 'Edge Middleware', 'Image Optimization']
  },
  {
    name: 'TypeScript',
    category: 'Core Languages & Frameworks',
    level: 96,
    years: 6,
    featured: true,
    iconName: 'FileCode',
    description: 'Advanced Generics, Conditional Types, Template Literal Types, Utility Types, Strict Typing, AST, Type Narrowing.',
    tags: ['Generics', 'Strict Mode', 'Type Inference', 'Utility Types']
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'Core Languages & Frameworks',
    level: 98,
    years: 6,
    featured: true,
    iconName: 'Terminal',
    description: 'Async/Await, Event Loop, Closures, Prototypes, Web APIs, ES Modules, Memory Management, Web Workers.',
    tags: ['ES6+', 'Event Loop', 'Async/Await', 'DOM APIs']
  },
  {
    name: 'HTML5 & CSS3',
    category: 'Core Languages & Frameworks',
    level: 98,
    years: 6,
    featured: true,
    iconName: 'Layout',
    description: 'Semantic HTML, CSS Grid, Flexbox, Custom Properties, Responsive Media Queries, Container Queries, Typography.',
    tags: ['Semantic HTML', 'CSS Grid', 'Flexbox', 'Container Queries']
  },
  {
    name: 'Node.js & Express.js',
    category: 'Core Languages & Frameworks',
    level: 85,
    years: 4,
    featured: false,
    iconName: 'Server',
    description: 'BFF (Backend for Frontend) layers, REST API endpoints, middleware, SSR hydration backends.',
    tags: ['BFF Pattern', 'Express.js', 'REST APIs', 'Middleware']
  },

  // Frontend Architecture & State
  {
    name: 'Frontend Architecture & Micro-Frontends',
    category: 'Frontend Architecture & State',
    level: 95,
    years: 5,
    featured: true,
    iconName: 'Layers',
    description: 'Micro-frontends (Module Federation), Monorepos (Turborepo, Nx), Component-Driven Design, Atomic Design, Domain-Driven Structuring.',
    tags: ['Micro-Frontends', 'Turborepo', 'Nx', 'Atomic Design', 'Domain Structuring']
  },
  {
    name: 'State Management (Redux Toolkit & Zustand)',
    category: 'Frontend Architecture & State',
    level: 96,
    years: 6,
    featured: true,
    iconName: 'Database',
    description: 'Redux Toolkit (RTK), RTK Query, Zustand lightweight state slices, Context API, Optimistic Updates, Immutability.',
    tags: ['Redux Toolkit', 'Zustand', 'RTK Query', 'Context API', 'State Slices']
  },
  {
    name: 'TanStack Query (React Query)',
    category: 'Frontend Architecture & State',
    level: 94,
    years: 4,
    featured: true,
    iconName: 'Zap',
    description: 'Declarative async data fetching, automatic caching, window focus refetching, pagination, infinite scroll, optimistic mutations.',
    tags: ['Caching', 'Prefetching', 'Optimistic Mutations', 'Infinite Queries']
  },
  {
    name: 'REST APIs & GraphQL',
    category: 'Frontend Architecture & State',
    level: 92,
    years: 6,
    featured: false,
    iconName: 'Network',
    description: 'Consuming RESTful and GraphQL endpoints, schema generation, Apollo Client, typed response handling.',
    tags: ['REST APIs', 'GraphQL', 'Schema Typing', 'Apollo Client']
  },

  // UI Systems, Styling & Motion
  {
    name: 'Tailwind CSS & UI Frameworks',
    category: 'UI Systems, Styling & Motion',
    level: 98,
    years: 5,
    featured: true,
    iconName: 'Palette',
    description: 'Tailwind CSS v3 & v4, Shadcn UI, Radix UI primitives, Material-UI, CSS Modules, Styled-Components, Sass.',
    tags: ['Tailwind CSS', 'Shadcn UI', 'Radix UI', 'Material-UI', 'CSS Modules']
  },
  {
    name: 'Design Systems & Storybook',
    category: 'UI Systems, Styling & Motion',
    level: 95,
    years: 5,
    featured: true,
    iconName: 'Box',
    description: 'Building multi-brand enterprise design systems, component tokens, Storybook documentation, automated visual testing.',
    tags: ['Storybook', 'Design Tokens', 'Component Library', 'Living Styleguides']
  },
  {
    name: 'Motion & Animation (Framer Motion & GSAP)',
    category: 'UI Systems, Styling & Motion',
    level: 94,
    years: 4,
    featured: true,
    iconName: 'Sparkles',
    description: 'Framer Motion gestures and layout springs, GSAP ScrollTrigger timelines, AOS, HTML5 Canvas, SVG animation.',
    tags: ['Framer Motion', 'GSAP ScrollTrigger', 'Canvas', 'SVG Animations', 'AOS']
  },

  // AI & LLM Integration
  {
    name: 'Vercel AI SDK & LLM UI Integration',
    category: 'AI & LLM Integration',
    level: 90,
    years: 2,
    featured: true,
    iconName: 'Brain',
    description: 'Streaming token UI, generative UI components, chat interfaces, prompt engineering, RAG UI pipelines, LangChain.',
    tags: ['Vercel AI SDK', 'Streaming UI', 'RAG Pipelines', 'Prompt Engineering', 'LangChain']
  },
  {
    name: 'AI-Assisted Engineering Workflows',
    category: 'AI & LLM Integration',
    level: 95,
    years: 3,
    featured: true,
    iconName: 'Cpu',
    description: 'Expert integration of AI development tools: Claude 3.7, Cursor IDE, Antigravity, GitHub Copilot, v0, Gemini, ChatGPT.',
    tags: ['Claude', 'Cursor', 'GitHub Copilot', 'v0', 'Gemini', 'Antigravity']
  },

  // Performance, Testing & Tooling
  {
    name: 'Performance & Core Web Vitals',
    category: 'Performance, Testing & Tooling',
    level: 96,
    years: 6,
    featured: true,
    iconName: 'Gauge',
    description: 'Lighthouse 100 audits, Core Web Vitals (LCP, FID, CLS, INP), code-splitting, tree-shaking, lazy loading, bundle analysis.',
    tags: ['Core Web Vitals', 'Lighthouse 100', 'Code-Splitting', 'Bundle Analyzer', 'Lazy Loading']
  },
  {
    name: 'Accessibility (WCAG / ARIA)',
    category: 'Performance, Testing & Tooling',
    level: 92,
    years: 5,
    featured: false,
    iconName: 'Eye',
    description: 'WCAG 2.1 AA compliance, keyboard navigation, screen reader accessibility, semantic landmarks, ARIA states.',
    tags: ['WCAG 2.1 AA', 'ARIA Roles', 'Keyboard Focus', 'Screen Readers']
  },
  {
    name: 'Testing (Jest, React Testing Library, Cypress, Playwright)',
    category: 'Performance, Testing & Tooling',
    level: 90,
    years: 5,
    featured: true,
    iconName: 'ShieldCheck',
    description: 'Unit testing with Jest & React Testing Library, E2E testing with Cypress & Playwright, ESLint, Prettier.',
    tags: ['Jest', 'React Testing Library', 'Cypress', 'Playwright', 'ESLint']
  },
  {
    name: 'Build Tooling & DevOps (Vite, Webpack, Vercel, AWS)',
    category: 'Performance, Testing & Tooling',
    level: 90,
    years: 6,
    featured: false,
    iconName: 'Cloud',
    description: 'Vite, Webpack, pnpm/npm/yarn, Git, GitHub Actions CI/CD, Vercel, AWS (S3, CloudFront, Amplify), Firebase, Docker.',
    tags: ['Vite', 'Webpack', 'GitHub Actions', 'Vercel', 'AWS S3 / CloudFront', 'Docker']
  }
];

export const initialExperience: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Frontend Developer',
    company: 'Exion Technologies',
    location: 'Tbilisi, Georgia (On-site)',
    period: 'Jan 2026 – Aug 2026',
    description: 'Delivered production frontend features in a fast-paced, on-site engineering environment, applying AWS-backed deployment workflows and structured project management practices to ship reliably within sprint cycles.',
    achievements: [
      'Engineered immersive, animation-driven interfaces with Framer Motion and GSAP, delivering scroll-triggered transitions and micro-interactions that elevated perceived product quality and user engagement.',
      'Championed a rigorous peer code-review culture across the engineering team, cutting production bugs by 90% and raising the team’s baseline for code quality and maintainability.',
      'Configured automated AWS S3/CloudFront deployment pipelines integrated with GitHub Actions for zero-downtime releases.'
    ],
    techStack: ['React.js', 'Next.js', 'TypeScript', 'Framer Motion', 'GSAP', 'Tailwind CSS', 'AWS (S3/CloudFront)', 'Git', 'Agile/Scrum'],
    badge: 'On-site Enterprise Delivery'
  },
  {
    id: 'exp-2',
    role: 'Senior Frontend Developer',
    company: 'Gordian Solutions',
    location: 'Remote',
    period: 'Jan 2021 – Jun 2025',
    description: 'Architected and led the development of core product interfaces in React.js and Next.js, shipping dynamic web applications that sustained a 95% client satisfaction rate across a 4+ year enterprise engagement.',
    achievements: [
      'Directed cross-functional collaboration between backend engineers and UI/UX designers, streamlining integration workflows and lifting engineering development efficiency by 30%.',
      'Redesigned the responsive layout system across the entire product suite, driving an 80% increase in mobile traffic through systematic optimization for all viewport sizes.',
      'Re-engineered application performance at the architecture level, cutting page load times by 45% and lifting search engine SEO rankings by 25%.',
      'Mentored junior and mid-level frontend developers through structured 1-on-1 pairing, architecture walkthroughs, and code review standards.'
    ],
    techStack: ['React.js', 'Next.js (App Router & RSC)', 'TypeScript', 'Redux Toolkit', 'TanStack Query', 'Tailwind CSS', 'Turborepo', 'Jest', 'Cypress'],
    badge: '4+ Year Enterprise Engagement'
  },
  {
    id: 'exp-3',
    role: 'Senior Frontend Developer',
    company: 'Bring GmbH',
    location: 'Contract / Remote',
    period: 'Jun 2023 – Jul 2024',
    description: 'Built and optimized customer-facing portals and high-throughput internal dashboards in React and Next.js, supporting business-critical operations at scale alongside a full-time engineering role.',
    achievements: [
      'Implemented aggressive caching, code-splitting, and API payload optimization strategies that improved site performance and load speed by 25%.',
      'Ensured cross-device responsiveness and WCAG-aligned accessibility practices, resulting in increased customer engagement.',
      'Adopted SSR and caching architectures to advance SEO performance and page speed, while ensuring cross-browser compatibility across Safari, Chrome, and Firefox.'
    ],
    techStack: ['React.js', 'Next.js', 'TypeScript', 'Zustand', 'Radix UI', 'Shadcn UI', 'REST APIs', 'GraphQL', 'Vercel'],
    badge: 'High-Throughput Web Portals'
  },
  {
    id: 'exp-4',
    role: 'Frontend Developer',
    company: 'TEKX Solutions',
    location: 'Lahore, Pakistan',
    period: 'Mar 2019 – Jan 2021',
    description: 'Developed and maintained mobile-responsive websites for international client projects, increasing user engagement by 35% through pixel-perfect execution.',
    achievements: [
      'Partnered closely with the design team to translate complex Figma and Adobe XD UI/UX specifications into production code, contributing to a 25% increase in client retention.',
      'Introduced modern web technologies, CSS grid/flexbox architectures, and performance practices that delivered 20% faster load times across client websites.',
      'Built modular, reusable JavaScript UI components and streamlined team build pipelines with Webpack.'
    ],
    techStack: ['JavaScript (ES6+)', 'React.js', 'HTML5', 'CSS3', 'Sass', 'CSS Modules', 'Webpack', 'Figma', 'Git'],
    badge: 'Client Project Delivery'
  }
];

export const PORTRAIT_IMAGE = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80';

export const initialTestimonials: TestimonialItem[] = [
  {
    id: 't-1',
    name: 'Marcus Vance',
    role: 'VP of Product Engineering',
    company: 'Gordian Solutions',
    quote: 'Kamran is the gold standard for frontend architecture. His work transforming our legacy UI into a blazing fast Next.js App Router platform cut our load times by 45% and drove an 80% surge in mobile conversions.',
    relation: 'Managed Kamran directly for 4 years'
  },
  {
    id: 't-2',
    name: 'Elena Rostova',
    role: 'Lead UI/UX Architect',
    company: 'Exion Technologies',
    quote: 'Working with Kamran was a breeze for design. He transforms intricate Figma designs and micro-animations with Framer Motion and GSAP with pixel precision and flawless 60 FPS performance.',
    relation: 'Collaborated on production design systems'
  },
  {
    id: 't-3',
    name: 'Tobias Becker',
    role: 'Head of Engineering',
    company: 'Bring GmbH',
    quote: 'Kamran’s deep understanding of component-driven design and SSR caching made an immediate 25% speed impact on our customer portal. A world-class senior frontend engineer.',
    relation: 'Supervised client portal delivery'
  }
];
