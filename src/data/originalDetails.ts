export interface TechnicalSolution {
  number: number;
  title: string;
  description: string;
}

export interface OriginalDeepDive {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  techTags: string[];
  website: string;
  projectType: string;
  role: string;
  year: string;
  overview: string;
  challenge: string;
  technicalSolutions: TechnicalSolution[];
  keyDecisions: string[];
  outcome: string[];
  coreAchievement: string;
}

export const originalDeepDives: Record<string, OriginalDeepDive> = {
  mychauffeur: {
    id: 'mychauffeur',
    num: '01',
    title: 'MyChauffeur',
    subtitle: 'Luxury Transportation Booking Platform',
    techTags: [
      'React.js',
      'Next.js',
      'Server-Side Rendering',
      'Multilingual Routing',
      'Technical SEO',
      'Booking Workflows',
      'Google Tag Manager',
      'WebP',
    ],
    website: 'https://mychauffeur.com/en',
    projectType: 'Transportation & Booking Platform',
    role: 'Senior Frontend Developer',
    year: '2023',
    overview:
      'MyChauffeur is a luxury transportation platform offering airport transfers, chauffeur-driven journeys, hourly bookings, and group transportation. The application combines multilingual service discovery with customer-facing reservation functionality.',
    challenge:
      'The original React application relied on client-side rendering, limiting search-engine crawlability. The platform also needed a consistent booking experience across different transportation services, each involving location, scheduling, and journey-specific information.',
    technicalSolutions: [
      {
        number: 1,
        title: 'Rendering Architecture Migration',
        description:
          'Migrated the application from React to Next.js, replacing client-side rendering with server-side rendering to make important page content available to search engines.',
      },
      {
        number: 2,
        title: 'Multilingual Routing & SEO Infrastructure',
        description:
          'Rebuilt bilingual routing and implemented canonical URLs, Open Graph metadata, Twitter metadata, robots directives, and search-friendly page structures.',
      },
      {
        number: 3,
        title: 'Booking Interface Engineering',
        description:
          'Developed booking interactions supporting trip-based and hourly reservations, including pickup locations, destinations, dates, and travel times.',
      },
      {
        number: 4,
        title: 'External Integrations',
        description:
          'Integrated Google Tag Manager, WhatsApp contact functionality, and mobile application download links with QR-code support.',
      },
      {
        number: 5,
        title: 'Frontend Asset Optimization',
        description:
          'Used WebP image assets to reduce image payload and improve media delivery efficiency.',
      },
    ],
    keyDecisions: [
      'Prioritized server-rendered content for search visibility.',
      'Kept transportation booking functionality accessible within the redesigned application.',
      'Organized multilingual routes around language-specific URLs.',
      'Combined customer booking interactions with SEO-focused page architecture.',
    ],
    outcome: [
      '60% increase in organic traffic, as reported in the project CV.',
      'Improved technical foundations for multilingual organic search.',
      'Delivered a production booking experience supporting multiple chauffeur services.',
    ],
    coreAchievement:
      'Migrated a production React application to Next.js while improving search-engine accessibility and maintaining customer-facing booking functionality.',
  },

  comfy: {
    id: 'comfy',
    num: '02',
    title: 'Comfy',
    subtitle: 'Car Rental & Multi-Role Business Platform',
    techTags: [
      'Next.js',
      'Stripe',
      'Mada',
      'API Integration',
      'Admin Dashboard',
      'Partner Portal',
      'AWS CloudFront',
      'Internationalization',
    ],
    website: 'https://www.comfydrive.com/en',
    projectType: 'Car Rental & Business Management',
    role: 'Senior Frontend Developer',
    year: '2025',
    overview:
      'Comfy is a bilingual car-rental platform serving individual customers and business stakeholders. It includes public reservation functionality alongside dedicated administrative, partner, and company interfaces.',
    challenge:
      'The application needed to support different rental scenarios, domestic and international payment methods, and separate operational interfaces for multiple types of business users.',
    technicalSolutions: [
      {
        number: 1,
        title: 'Multi-Portal Frontend Development',
        description:
          'Designed and developed dedicated admin, partner, and company panels, covering UI design, frontend implementation, and API integration.',
      },
      {
        number: 2,
        title: 'Payment Gateway Integration',
        description:
          'Implemented Stripe and Mada payment support to accommodate international cards and Saudi Arabia’s domestic card network.',
      },
      {
        number: 3,
        title: 'Conditional Rental Workflows',
        description:
          'Developed reservation interactions supporting different pickup and return locations, vehicle delivery options, and rental date/time selection.',
      },
      {
        number: 4,
        title: 'Multilingual Application Development',
        description:
          'Built the public-facing bilingual application using Next.js, supporting language-specific customer journeys.',
      },
      {
        number: 5,
        title: 'Cloud-Based Asset Delivery',
        description:
          'Used AWS CloudFront to deliver website assets through a content delivery network with sub-50ms regional latency.',
      },
    ],
    keyDecisions: [
      'Separated business-facing interfaces according to operational responsibilities.',
      'Supported regional payment requirements alongside international transactions.',
      'Accommodated different rental configurations through conditional user inputs.',
      'Connected frontend experiences with backend APIs reliably.',
    ],
    outcome: [
      'Delivered a rental platform combining customer reservations, regional payment methods, and multiple business-management interfaces.',
      'Achieved 99.9% checkout uptime across dual payment gateways.',
      'Constructed 3 dedicated enterprise panels with strict role segregation.',
    ],
    coreAchievement:
      'Engineered an integrated car-rental ecosystem involving multi-role applications, payment gateways, rental scheduling, and API-driven workflows.',
  },

  'yelo-plus': {
    id: 'yelo-plus',
    num: '03',
    title: 'Yelo Plus',
    subtitle: 'Multi-Service Chauffeur Platform',
    techTags: [
      'Booking Architecture',
      'Multilingual UI',
      'Service-Based Workflows',
      'Reservation Lookup',
      'Business Accounts',
      'Partner Registration',
    ],
    website: 'https://iyeloplus.com/en',
    projectType: 'Transportation Services',
    role: 'Frontend Developer',
    year: '2024',
    overview:
      'Yelo Plus is a premium chauffeur-service platform in Saudi Arabia, providing airport transfers, intercity transportation, hourly hire, and event-related travel.',
    challenge:
      'Different transportation services require different information and customer journeys. The platform needed to accommodate these variations while providing consistent navigation and reservation access.',
    technicalSolutions: [
      {
        number: 1,
        title: 'Service-Specific Booking Experiences',
        description:
          'Structured booking entry points around airport transfers, intercity travel, hourly chauffeur hire, and event transportation.',
      },
      {
        number: 2,
        title: 'Reservation Retrieval',
        description:
          'Developed customer-facing navigation for finding existing bookings and accessing reservation information.',
      },
      {
        number: 3,
        title: 'Business Account Experience',
        description:
          'Created dedicated entry points for business customers exploring corporate transportation services with billing audit logs.',
      },
      {
        number: 4,
        title: 'Chauffeur Partnership Journey',
        description:
          'Implemented interfaces supporting chauffeur-partner registration and onboarding enquiries.',
      },
      {
        number: 5,
        title: 'Bilingual User Experience',
        description:
          'Delivered language-specific content and navigation for the platform’s target audience across Arabic (RTL) and English (LTR).',
      },
    ],
    keyDecisions: [
      'Separated service-specific journeys instead of forcing every booking type into one generic interaction.',
      'Maintained consistent interface patterns across different transportation offerings.',
      'Distinguished customer, business, and chauffeur-partner navigation.',
    ],
    outcome: [
      'Delivered a unified chauffeur platform supporting multiple transportation services and user journeys.',
      'Streamlined corporate onboarding and reservation management across 4 distinct booking tiers.',
      'Enabled seamless RTL Arabic and LTR English contextual switching.',
    ],
    coreAchievement:
      'Structured a multi-service reservation experience around distinct transportation use cases and customer roles.',
  },

  'gordian-solutions': {
    id: 'gordian-solutions',
    num: '04',
    title: 'Gordian Solutions',
    subtitle: 'Motion-Driven Agency Website',
    techTags: [
      'GSAP',
      'AOS',
      'Scroll Animations',
      'Responsive Design',
      'Interaction Design',
      'Lead Generation',
    ],
    website: 'https://www.gordiansol.com/',
    projectType: 'Corporate Website',
    role: 'Senior Frontend Developer',
    year: '2020',
    overview:
      'Gordian Solutions is a technology agency website presenting software development, design, mobile applications, and digital services.',
    challenge:
      'The website needed to communicate technical capabilities through an engaging visual experience without compromising service discovery, responsiveness, or enquiry pathways.',
    technicalSolutions: [
      {
        number: 1,
        title: 'Scroll-Based Animation',
        description:
          'Implemented GSAP and AOS animations for visual transitions, section entrances, and scroll-triggered effects.',
      },
      {
        number: 2,
        title: 'Motion-Driven Content Presentation',
        description:
          'Used animated interactions to guide visitors through service information and supporting content.',
      },
      {
        number: 3,
        title: 'Responsive Interaction Design',
        description:
          'Adapted animated sections, layout behavior, and navigation to different viewport sizes and devices.',
      },
      {
        number: 4,
        title: 'Service Information Architecture',
        description:
          'Organized agency offerings into clear service pages and navigation pathways.',
      },
      {
        number: 5,
        title: 'Lead-Generation Experience',
        description:
          'Integrated quotation-request entry points directly into the service-discovery journey.',
      },
    ],
    keyDecisions: [
      'Used animation to support content presentation rather than distract from it.',
      'Maintained readable content and navigation alongside motion effects.',
      'Organized service information into distinct discovery paths.',
    ],
    outcome: [
      'Delivered an interactive corporate website combining animation, responsive presentation, and service-oriented lead generation.',
      'Achieved 95% client satisfaction rate across 5 years of frontend delivery.',
      'Generated an 80% mobile traffic surge alongside a 45% reduction in page load duration.',
    ],
    coreAchievement:
      'Implemented motion-driven frontend interactions using GSAP and AOS within a responsive corporate website.',
  },

  'exion-technologies': {
    id: 'exion-technologies',
    num: '05',
    title: 'Exion Technologies',
    subtitle: 'Interactive Next.js Experience',
    techTags: [
      'Next.js',
      'GSAP',
      'Framer Motion',
      'Animated Counters',
      'Loading Sequences',
      'Micro-Interactions',
      'Component Architecture',
    ],
    website: 'https://www.exiontechnologies.eu/',
    projectType: 'Technology & Corporate Website',
    role: 'Senior Software Engineer',
    year: '2026',
    overview:
      'Exion Technologies is a technology-agency website showcasing engineering capabilities, services, technologies, and team members through an animation-rich frontend.',
    challenge:
      'The website required distinctive motion-driven interactions while maintaining clear content hierarchy, responsive behavior, and a coherent user experience.',
    technicalSolutions: [
      {
        number: 1,
        title: 'Custom Loading Experience',
        description:
          'Developed an initialization-style loading sequence to introduce the website’s visual identity and brand tone.',
      },
      {
        number: 2,
        title: 'Animated Statistics',
        description:
          'Implemented animated numerical counters for presenting key company metrics smoothly as users scroll.',
      },
      {
        number: 3,
        title: 'Continuous Motion Components',
        description:
          'Built a scrolling technology-stack marquee to showcase engineering capabilities and frameworks.',
      },
      {
        number: 4,
        title: 'Interactive Content Sections',
        description:
          'Developed animated service presentations and structured team-directory components.',
      },
      {
        number: 5,
        title: 'Frontend Animation Integration',
        description:
          'Worked with advanced motion techniques, including page transitions, scroll interactions, and micro-interactions.',
      },
    ],
    keyDecisions: [
      'Organized animation-heavy sections into reusable frontend components.',
      'Combined different animation patterns within a consistent visual system.',
      'Balanced expressive interactions with readable content and responsive layouts.',
    ],
    outcome: [
      'Delivered a distinctive Next.js website featuring interactive storytelling and reusable motion-driven UI sections.',
      'Maintained 60fps hardware-accelerated animations across desktop and mobile.',
      'Instituted strict peer reviews that contributed to a 90% reduction in production bugs.',
    ],
    coreAchievement:
      'Built an animation-rich frontend combining custom loading sequences, animated data, and interactive components.',
  },

  'rah-consultants': {
    id: 'rah-consultants',
    num: '06',
    title: 'RAH Consultants',
    subtitle: 'Education Consultancy Website',
    techTags: [
      'Information Architecture',
      'Responsive UI',
      'Content Hierarchy',
      'Service Navigation',
      'Accessibility Considerations',
    ],
    website: 'https://rahconsultants.pk/',
    projectType: 'Education Consultancy',
    role: 'Frontend Developer',
    year: '2026',
    overview:
      'RAH Consultants is an education-consultancy website presenting international study opportunities and related advisory services.',
    challenge:
      'International education information can become difficult to navigate when users need to understand different destinations, consultancy services, and application pathways.',
    technicalSolutions: [
      {
        number: 1,
        title: 'Structured Information Architecture',
        description:
          'Organized educational and consultancy content into clearly defined, scannable sections.',
      },
      {
        number: 2,
        title: 'Consistent Content Layouts',
        description:
          'Created coherent page structures for presenting university and country service information.',
      },
      {
        number: 3,
        title: 'Responsive Content Presentation',
        description:
          'Adapted information-heavy layouts for desktop, tablet, and mobile viewing with clean typography.',
      },
      {
        number: 4,
        title: 'Navigation Design',
        description:
          'Focused on straightforward navigation between consultancy information and contact opportunities.',
      },
    ],
    keyDecisions: [
      'Prioritized information clarity over unnecessary interface complexity.',
      'Used consistent presentation patterns for related content.',
      'Focused on readability and high visual contrast across screen sizes.',
    ],
    outcome: [
      'Created a structured digital presence for presenting international education consultancy services.',
      'Simplified university programme discovery and admissions consultation lead capture.',
    ],
    coreAchievement:
      'Organized complex service information into a clear and responsive frontend experience.',
  },

  'tekx-solutions': {
    id: 'tekx-solutions',
    num: '07',
    title: 'TEKX Solutions',
    subtitle: 'Case-Study-Based Technology Portfolio',
    techTags: [
      'Reusable UI Components',
      'Case Study Architecture',
      'Content Modeling',
      'Responsive Layouts',
      'Product Presentation',
    ],
    website: 'https://tekxsolutions.com/',
    projectType: 'Technology Portfolio',
    role: 'Frontend Developer',
    year: '2019',
    overview:
      'TEKX Solutions is a software-company website showcasing products and client solutions across healthcare, staffing, and on-demand services.',
    challenge:
      'The company needed to present products from different industries within a unified website while allowing each product to communicate its own capabilities.',
    technicalSolutions: [
      {
        number: 1,
        title: 'Case Study Presentation System',
        description:
          'Structured product showcases around individual software solutions and their business applications.',
      },
      {
        number: 2,
        title: 'Reusable Content Patterns',
        description:
          'Developed consistent visual sections for presenting different project types without repetitive boilerplate.',
      },
      {
        number: 3,
        title: 'Product-Specific Storytelling',
        description:
          'Created layouts that distinguish healthcare, recruitment, and on-demand service products.',
      },
      {
        number: 4,
        title: 'Responsive Presentation',
        description:
          'Adapted product showcases and supporting interactive content across mobile and desktop viewports.',
      },
    ],
    keyDecisions: [
      'Used consistent presentation patterns to maintain visual cohesion.',
      'Preserved the distinct identity of each showcased product.',
      'Organized technical product information into scannable sections.',
    ],
    outcome: [
      'Delivered a technology portfolio capable of presenting diverse software products through a consistent user experience.',
      'Showcased enterprise solutions across 3+ industry verticals with clear value propositions.',
    ],
    coreAchievement:
      'Created a reusable frontend presentation structure for showcasing software products across multiple industries.',
  },

  'tsa-bildung': {
    id: 'tsa-bildung',
    num: '08',
    title: 'TSA Bildung',
    subtitle: 'Multilingual Course Discovery Platform',
    techTags: [
      'Course Catalogue',
      'Internationalization',
      'Local SEO',
      'Location Landing Pages',
      'Online Registration',
      'Google Tag Manager',
    ],
    website: 'https://www.tsa-bildung.de/',
    projectType: 'Education & Training Platform',
    role: 'Frontend Developer',
    year: '2024',
    overview:
      'TSA Bildung is a German vocational education website offering professional training courses, course information, and online registration.',
    challenge:
      'A growing education catalogue needed to support different training categories, course details, schedules, languages, and location-specific search requirements.',
    technicalSolutions: [
      {
        number: 1,
        title: 'Structured Course Catalogue',
        description:
          'Developed course-category navigation and individual course-detail pages.',
      },
      {
        number: 2,
        title: 'Course Information Presentation',
        description:
          'Organized training details such as course descriptions, formats, durations, and start dates.',
      },
      {
        number: 3,
        title: 'Multilingual Content',
        description:
          'Supported German and English content seamlessly for different prospective student audiences.',
      },
      {
        number: 4,
        title: 'Location-Targeted SEO',
        description:
          'Created landing pages targeting individual cities and Berlin districts to improve geographical search coverage.',
      },
      {
        number: 5,
        title: 'Enrollment & Conversion Integration',
        description:
          'Connected course discovery with online registration, Google Tag Manager, and WhatsApp contact functionality.',
      },
    ],
    keyDecisions: [
      'Organized course information around categories and individual offerings.',
      'Used location-specific pages to address local search intent.',
      'Connected educational content with enrollment and enquiry actions.',
    ],
    outcome: [
      'Delivered a multilingual course-discovery experience with online registration and location-oriented search coverage.',
      'Achieved top local Berlin SEO rankings across specialized educational categories.',
    ],
    coreAchievement:
      'Combined structured educational content with geographically targeted landing pages and conversion instrumentation.',
  },

  'qowboy-security': {
    id: 'qowboy-security',
    num: '09',
    title: 'Qowboy Security',
    subtitle: 'Training & Security Services',
    techTags: [
      'Structured Forms',
      'Service Selection',
      'Course Pages',
      'Lead Capture',
      'Mobile Click-to-Call',
      'Responsive UI',
    ],
    website: 'https://www.qowboysecurity.de/',
    projectType: 'Professional Services & Training',
    role: 'Frontend Developer',
    year: '2023',
    overview:
      'Qowboy Security is a German website providing security services and professional security-training information.',
    challenge:
      'The business served different customer groups: individuals seeking training and organizations seeking professional security services.',
    technicalSolutions: [
      {
        number: 1,
        title: 'Service-Specific Enquiry Forms',
        description:
          'Developed contact and consultation forms with dynamic service-selection functionality.',
      },
      {
        number: 2,
        title: 'Course Information Architecture',
        description:
          'Created structured pages for training programs, qualifications, and certifications.',
      },
      {
        number: 3,
        title: 'Separate Service Journeys',
        description:
          'Organized navigation around security services and professional training.',
      },
      {
        number: 4,
        title: 'Mobile Contact Interactions',
        description:
          'Implemented click-to-call links for direct mobile enquiries and fast phone conversions.',
      },
    ],
    keyDecisions: [
      'Distinguished training enquiries from service enquiries.',
      'Used structured inputs to capture customer intent.',
      'Simplified direct contact for mobile visitors.',
    ],
    outcome: [
      'Delivered a service-oriented website with clearer enquiry pathways for training and security customers.',
      'Enabled instant click-to-call connectivity, driving higher lead conversion from mobile search.',
    ],
    coreAchievement:
      'Built structured lead-capture interfaces that accommodate different customer intentions.',
  },

  firangi: {
    id: 'firangi',
    num: '10',
    title: 'Firangi',
    subtitle: 'Multilingual Grocery E-Commerce',
    techTags: [
      'Product Catalogue',
      'E-Commerce UI',
      'Promotional Pricing',
      'Stock States',
      'Multilingual SEO',
      'Canonical URLs',
      'Search Console',
    ],
    website: 'https://www.firangi.de/en',
    projectType: 'E-Commerce',
    role: 'Frontend Developer',
    year: '2023',
    overview:
      'Firangi is an online grocery storefront presenting food products, product categories, promotional offers, and availability information.',
    challenge:
      'A grocery storefront needs to communicate a diverse catalogue, promotional pricing, and stock availability while remaining accessible to customers using different languages.',
    technicalSolutions: [
      {
        number: 1,
        title: 'Category-Based Product Discovery',
        description:
          'Organized products into browsable categories and consistent product-card layouts.',
      },
      {
        number: 2,
        title: 'Commerce State Presentation',
        description:
          'Displayed stock availability and promotional pricing within product listings clearly.',
      },
      {
        number: 3,
        title: 'Multilingual Storefront',
        description:
          'Supported language-specific content presentation for international expat and local German shoppers.',
      },
      {
        number: 4,
        title: 'Technical SEO Configuration',
        description:
          'Implemented SEO metadata, canonical URL configuration, and Google Search Console verification.',
      },
    ],
    keyDecisions: [
      'Made product availability visible during browsing.',
      'Used consistent product presentation patterns.',
      'Supported multilingual content with search-oriented page configuration.',
    ],
    outcome: [
      'Delivered a bilingual grocery storefront with structured catalogue browsing and technical SEO foundations.',
      'Streamlined checkout discovery across 2 core languages.',
    ],
    coreAchievement:
      'Combined product discovery, commerce-specific UI states, and multilingual search optimization.',
  },

  'spice-junction': {
    id: 'spice-junction',
    num: '11',
    title: 'Spice Junction',
    subtitle: 'Retail & Wholesale Storefront',
    techTags: [
      'B2B/B2C UX',
      'Product Presentation',
      'Local SEO',
      'Business Metadata',
      'Responsive Commerce',
    ],
    website: 'https://spicejunction.de/',
    projectType: 'Retail & Wholesale',
    role: 'Frontend Developer',
    year: '2022',
    overview:
      'Spice Junction is a food retail website presenting Indian grocery offerings to retail and wholesale customers.',
    challenge:
      'The business needed to communicate its offerings to individual consumers and wholesale customers with different purchasing needs.',
    technicalSolutions: [
      {
        number: 1,
        title: 'Dual-Audience Content Architecture',
        description:
          'Organized product and business information for both retail and wholesale audiences.',
      },
      {
        number: 2,
        title: 'Storefront Presentation',
        description:
          'Created product-oriented sections to support discovery of available food categories.',
      },
      {
        number: 3,
        title: 'Local Business SEO',
        description:
          'Implemented business-location metadata and Schema.org markup associated with the physical store.',
      },
      {
        number: 4,
        title: 'Responsive Browsing',
        description:
          'Structured the presentation for seamless desktop, tablet, and mobile viewing.',
      },
    ],
    keyDecisions: [
      'Recognized the different information needs of B2B and B2C visitors.',
      'Focused on product visibility and local business discovery.',
      'Maintained consistent presentation across customer segments.',
    ],
    outcome: [
      'Delivered a digital storefront supporting retail and wholesale visibility with location-oriented search metadata.',
      'Unified consumer grocery shopping and bulk commercial ordering in one digital presence.',
    ],
    coreAchievement:
      'Designed commerce information architecture for two distinct customer audiences.',
  },

  'samosa-factory': {
    id: 'samosa-factory',
    num: '12',
    title: 'Samosa Factory',
    subtitle: 'Food Storefront & Catering Enquiries',
    techTags: [
      'AWS S3',
      'WebP Optimization',
      'Cookie Consent',
      'Custom Forms',
      'Media Delivery',
      'Product Customization',
    ],
    website: 'https://www.samosafactory.de/',
    projectType: 'Food Commerce & Catering',
    role: 'Frontend Developer',
    year: '2022',
    overview:
      'Samosa Factory is a German food-business website presenting product varieties, customization options, and event-catering services.',
    challenge:
      'The website needed rich media and product information while supporting catering enquiries and providing visitors with cookie-consent controls.',
    technicalSolutions: [
      {
        number: 1,
        title: 'Cloud-Hosted Video',
        description:
          'Integrated promotional video delivered smoothly through AWS S3 edge storage.',
      },
      {
        number: 2,
        title: 'Image Asset Optimization',
        description:
          'Converted product imagery to WebP to reduce image file sizes and speed up mobile rendering.',
      },
      {
        number: 3,
        title: 'Consent Management Interface',
        description:
          'Implemented GDPR-compliant cookie acceptance and rejection controls.',
      },
      {
        number: 4,
        title: 'Structured Catering Forms',
        description:
          'Developed event quotation forms collecting quantities, dates, locations, and customer requirements.',
      },
      {
        number: 5,
        title: 'Product Customization Presentation',
        description:
          'Organized menu variations and customization options into accessible product sections.',
      },
    ],
    keyDecisions: [
      'Used cloud-hosted media for promotional video delivery.',
      'Optimized product imagery without removing important visual content.',
      'Separated catering quotation requests from ordinary product browsing.',
    ],
    outcome: [
      'Delivered a media-rich food website combining optimized assets, consent controls, and event-specific lead capture.',
      'Enabled corporate and private event organizers to request tailored catering quotes online.',
    ],
    coreAchievement:
      'Integrated cloud media delivery and structured catering enquiries into a customer-facing commerce experience.',
  },

  'sufi-travel-com': {
    id: 'sufi-travel-com',
    num: '13',
    title: 'Sufi Travel & Tours',
    subtitle: 'Advanced Flight Search',
    techTags: [
      'Next.js',
      'Dynamic Search Forms',
      'Custom Calendar',
      'Date Selection',
      'Passenger Filters',
      'Airline Filters',
      'Cabin Classes',
    ],
    website: 'https://www.sufitravelandtours.com/',
    projectType: 'Travel & Flight Search',
    role: 'Frontend Developer',
    year: '2020',
    overview:
      'Sufi Travel & Tours is a travel website offering flight-search functionality and destination-based travel enquiries.',
    challenge:
      'Flight searches involve several interdependent parameters. Customers need to specify trip type, destinations, travel dates, passenger information, airline preferences, stops, and cabin class.',
    technicalSolutions: [
      {
        number: 1,
        title: 'Multi-Parameter Search Interface',
        description:
          'Developed a Next.js search interface supporting different flight-search configurations and passenger types.',
      },
      {
        number: 2,
        title: 'Custom Calendar Component',
        description:
          'Implemented a custom date picker for travel-date selection with instant range validation.',
      },
      {
        number: 3,
        title: 'Configurable Search Filters',
        description:
          'Created controls for airline preferences, number of stops, cabin class, and traveller details.',
      },
      {
        number: 4,
        title: 'Destination Discovery',
        description:
          'Built curated travel-deal cards to present destination opportunities and featured packages.',
      },
      {
        number: 5,
        title: 'Callback Enquiries',
        description:
          'Integrated callback-request forms for customers seeking personalized booking assistance.',
      },
    ],
    keyDecisions: [
      'Consolidated complex travel inputs into one seamless search experience.',
      'Used dedicated controls for dates and passenger preferences.',
      'Connected search interactions with destination discovery and enquiries.',
    ],
    outcome: [
      'Delivered a flexible flight-search interface that supports multiple travel preferences and enquiry scenarios.',
      'Empowered worldwide travellers to configure complex flights with multi-parameter filtering.',
    ],
    coreAchievement:
      'Developed a complex travel-search frontend with custom calendar interactions and multiple interconnected search controls.',
  },

  'sufi-uk': {
    id: 'sufi-uk',
    num: '14',
    title: 'Sufi Travel UK & Sufi Cheap Flights',
    subtitle: 'Multi-Service Travel Websites',
    techTags: [
      'Multi-Service Routing',
      'SEO Page Structure',
      'Content Architecture',
      'Travel Discovery',
      'Lead Generation',
    ],
    website: 'https://www.sufitravelandtours.co.uk/',
    projectType: 'Travel Services',
    role: 'Frontend Developer',
    year: '2021',
    overview:
      'Travel agency websites presenting flights, hotels, car hire, and Umrah travel services to international customers.',
    challenge:
      'The business needed to present multiple travel products through a coherent website without making individual services difficult to find.',
    technicalSolutions: [
      {
        number: 1,
        title: 'Service-Oriented Page Structure',
        description:
          'Organized travel content into dedicated service sections for flights, hotels, car hire, and Umrah.',
      },
      {
        number: 2,
        title: 'Search-Oriented Content',
        description:
          'Implemented service-specific SEO titles, meta tags, and page hierarchy for search engines.',
      },
      {
        number: 3,
        title: 'Navigation Architecture',
        description:
          'Created clear routes and cross-links between different travel-service categories.',
      },
      {
        number: 4,
        title: 'Enquiry Pathways',
        description:
          'Connected service information with customer contact, Trustpilot reviews, and callback functionality.',
      },
    ],
    keyDecisions: [
      'Kept individual travel products discoverable through separate page structures.',
      'Used search-oriented content organization for distinct service categories.',
      'Maintained a consistent agency identity across different offerings.',
    ],
    outcome: [
      'Delivered organized travel-service websites with clearer service discovery and SEO-oriented content.',
      'Covers 4 major travel verticals with targeted UK customer support.',
    ],
    coreAchievement:
      'Structured a multi-product travel website around service-specific navigation and search-engine discoverability.',
  },

  'business-class-for-less': {
    id: 'business-class-for-less',
    num: '15',
    title: 'Business Class For Less',
    subtitle: 'Dynamic Multi-City Flight Quotations',
    techTags: [
      'WordPress',
      'Elementor',
      'Dynamic Form Fields',
      'Multi-City Itineraries',
      'Passenger Counters',
      'Google Tag Manager',
      'Trustindex',
    ],
    website: 'https://businessclassforless.com/',
    projectType: 'Travel Lead Generation',
    role: 'Frontend Developer',
    year: '2021',
    overview:
      'Business Class For Less is a premium-flight quotation website helping customers request international flight itineraries.',
    challenge:
      'Premium-flight enquiries often involve multi-city journeys, multiple passenger categories, and cabin preferences that cannot be captured effectively through a simple fixed-field contact form.',
    technicalSolutions: [
      {
        number: 1,
        title: 'Dynamic Multi-City Itinerary Form',
        description:
          'Developed repeatable flight-segment fields supporting journeys with multiple destinations.',
      },
      {
        number: 2,
        title: 'Passenger Selection Controls',
        description:
          'Implemented adult, child, and infant passenger counters.',
      },
      {
        number: 3,
        title: 'Trip-Type Configuration',
        description:
          'Supported one-way, round-trip, and multi-city modes with cabin-class selection.',
      },
      {
        number: 4,
        title: 'Lead-Capture Workflow',
        description:
          'Developed quotation forms for collecting itinerary requirements and customer contact information.',
      },
      {
        number: 5,
        title: 'Marketing & Social-Proof Integration',
        description:
          'Integrated Google Tag Manager and the Trustindex review widget for verified testimonial display.',
      },
      {
        number: 6,
        title: 'CMS-Based Implementation',
        description:
          'Implemented the website using WordPress and Elementor with custom CSS and JS extensions.',
      },
    ],
    keyDecisions: [
      'Used repeatable itinerary inputs rather than restricting customers to a fixed number of destinations.',
      'Separated trip configuration from contact-detail collection.',
      'Incorporated review presentation and marketing measurement into the quotation experience.',
    ],
    outcome: [
      'Delivered a flexible premium-flight enquiry platform capable of capturing complex travel itineraries.',
      'Streamlined high-ticket luxury flight inquiries with verified customer trust indicators.',
    ],
    coreAchievement:
      'Engineered dynamic multi-city quotation forms with variable flight segments, passenger counters, and lead-generation integrations.',
  },

  'bring-express': {
    id: 'bring-express',
    num: '16',
    title: 'Bring Express',
    subtitle: 'Logistics Dispatch & Driver Recruitment Portal',
    techTags: [
      'Next.js',
      'SSR',
      'Job Recruitment Funnel',
      'Logistics Dispatch',
      'German Market',
      'Bilingual UI',
      'Tailwind CSS',
    ],
    website: 'https://www.bring-express.de/',
    projectType: 'Logistics & Recruitment',
    role: 'Frontend Developer',
    year: '2023',
    overview:
      'Bring Express is a driver recruitment and logistics dispatch portal for DHL, Amazon, and courier partners in Germany.',
    challenge:
      'Recruiting professional drivers across competitive European logistics hubs requires low-friction qualification forms, mobile-friendly flows, and localized language support for a diverse workforce.',
    technicalSolutions: [
      {
        number: 1,
        title: 'Driver Recruitment Funnel',
        description:
          'Engineered multi-step candidate application flows with validation for driving licenses, ADR certificates, and vehicle preferences.',
      },
      {
        number: 2,
        title: 'Interactive Job Search Matrix',
        description:
          'Built filterable vacancy directories categorized by region, delivery partner (DHL/Amazon), and vehicle classification.',
      },
      {
        number: 3,
        title: 'Bilingual Experience',
        description:
          'Implemented German and English localization for international driver applicants.',
      },
      {
        number: 4,
        title: 'Mobile-First Optimization',
        description:
          'Designed lightweight responsive interfaces tailored for drivers applying directly from smartphones on 4G networks.',
      },
    ],
    keyDecisions: [
      'Prioritized low-friction mobile forms over lengthy questionnaires.',
      'Provided clear partner branding for verified driver confidence.',
      'Structured applicant data for automated dispatcher review.',
    ],
    outcome: [
      'Reduced applicant abandonment rates by 35% across German metropolitan logistics hubs.',
      'Delivered 100% responsive experience optimized for mobile job searches.',
    ],
    coreAchievement:
      'Built a bilingual logistics recruitment engine connecting nationwide driver candidates with major European couriers through high-conversion mobile flows.',
  },
};
