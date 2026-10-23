import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function createResume() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 format
  const { width, height } = page.getSize();

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Colors
  const darkInk = rgb(0.08, 0.09, 0.11);
  const crimson = rgb(0.88, 0.12, 0.22);
  const forest = rgb(0.06, 0.36, 0.29);
  const muted = rgb(0.42, 0.44, 0.48);
  const borderGrey = rgb(0.85, 0.85, 0.88);

  let y = height - 45;

  // Header
  page.drawText('KAMRAN ALI', {
    x: 45,
    y,
    size: 24,
    font: fontBold,
    color: darkInk,
  });

  page.drawText('SENIOR FRONTEND DEVELOPER & UI ARCHITECT', {
    x: 45,
    y: y - 16,
    size: 10,
    font: fontBold,
    color: crimson,
  });

  // Contact line
  const contactText = 'Email: kamranali6546@gmail.com   |   Primary Phone: +92 346 8051600   |   WhatsApp: +995 568 772 744';
  page.drawText(contactText, {
    x: 45,
    y: y - 32,
    size: 8.5,
    font: fontRegular,
    color: muted,
  });

  const locationText = 'Location: Pakistan / Georgia (Open to Relocation & Remote)   |   LinkedIn: linkedin.com/in/kamran-ali-b9a7183b0';
  page.drawText(locationText, {
    x: 45,
    y: y - 44,
    size: 8.5,
    font: fontRegular,
    color: muted,
  });

  // Divider
  page.drawLine({
    start: { x: 45, y: y - 54 },
    end: { x: width - 45, y: y - 54 },
    thickness: 1,
    color: borderGrey,
  });

  y -= 70;

  // Section: Executive Summary
  function drawSectionHeader(title) {
    page.drawText(title.toUpperCase(), {
      x: 45,
      y,
      size: 10,
      font: fontBold,
      color: forest,
    });
    page.drawLine({
      start: { x: 45, y: y - 4 },
      end: { x: width - 45, y: y - 4 },
      thickness: 0.75,
      color: forest,
    });
    y -= 16;
  }

  drawSectionHeader('Executive Summary');
  const summaryLines = [
    'Senior Frontend Developer with over 6 years of experience architecting high-performance web applications and scalable',
    'enterprise design systems using React.js, Next.js, and TypeScript. Pioneering modern frontend architecture, SSR crawl indexation,',
    'micro-interactions, and AI-assisted engineering workflows. Track record includes +60% organic traffic gains, 95% client satisfaction,',
    'and 90% production bug reduction across international teams in Georgia, Germany (remote), and Pakistan.'
  ];
  for (const line of summaryLines) {
    page.drawText(line, { x: 45, y, size: 8.5, font: fontRegular, color: darkInk });
    y -= 12;
  }
  y -= 8;

  // Section: Core Competencies
  drawSectionHeader('Technical Skills & Architecture');
  const skillLines = [
    '• Languages & Frameworks: React, Next.js (App & Pages Router), TypeScript, JavaScript (ES6+), HTML5, CSS3 / Tailwind CSS v4',
    '• Architecture & Animation: Server-Side Rendering (SSR), Framer Motion, GSAP, Responsive Layouts, Design Systems, WCAG 2.2 AA',
    '• Performance & Tools: Code-splitting, Web Vitals, Edge Caching, Webpack/Vite, Git/GitHub, REST & GraphQL APIs, Stripe & Mada',
    '• AI & Modern Engineering: Cursor, Claude, GitHub Copilot, Gemini, Automated Refactoring, Next-gen AI interfaces'
  ];
  for (const line of skillLines) {
    page.drawText(line, { x: 45, y, size: 8.5, font: fontRegular, color: darkInk });
    y -= 12;
  }
  y -= 8;

  // Section: Professional Experience
  drawSectionHeader('Professional Experience');

  const jobs = [
    {
      company: 'Exion Technologies',
      role: 'Sr. Software Engineer',
      period: 'Jan 2026 – Sep 2026',
      place: 'Georgia',
      bullets: [
        'Built highly interactive, animation-rich UI using Framer Motion and GSAP (page transitions, scroll triggers, micro-interactions).',
        'Participated in regular code reviews, contributing to a 90% reduction in production bugs and elevating team-wide code quality.',
      ],
    },
    {
      company: 'Gordian Solutions',
      role: 'Sr. Frontend Developer',
      period: 'Feb 2020 – Jul 2025',
      place: 'Pakistan',
      bullets: [
        'Spearheaded enterprise web applications using ReactJS and Next.js, achieving a 95% client satisfaction rate across deliveries.',
        'Led cross-functional frontend teams, partnering with backend architects and designers to increase development efficiency by 30%.',
        'Implemented responsive, mobile-first layouts, driving an 80% increase in mobile engagement and user retention.',
        'Optimized core Web Vitals and asset pipelines, reducing page load times by 45% and elevating organic SEO rankings by 25%.',
      ],
    },
    {
      company: 'Bring GmbH',
      role: 'Sr. Frontend Developer (Remote Contract)',
      period: 'Feb 2022 – Jul 2024',
      place: 'Germany (Remote)',
      bullets: [
        'Architected customer-facing portals and internal enterprise dashboards with React and Next.js server-side rendering.',
        'Improved site performance and loading speed by 25% through caching strategies, code-splitting, and API payload optimization.',
        'Ensured cross-browser compatibility and strict WCAG 2.2 AA accessibility alignment across international user bases.',
      ],
    },
    {
      company: 'TekX Solutions',
      role: 'Frontend Developer',
      period: 'Aug 2019 – Jan 2021',
      place: 'Pakistan',
      bullets: [
        'Developed and maintained dynamic, mobile-responsive web applications, increasing user engagement by 35% for client projects.',
        'Collaborated with design leads on UI/UX iterations, resulting in a 25% boost in client retention and 20% faster load performance.',
      ],
    },
  ];

  for (const job of jobs) {
    page.drawText(`${job.company} — ${job.role}`, {
      x: 45,
      y,
      size: 9.5,
      font: fontBold,
      color: darkInk,
    });
    page.drawText(`${job.period} | ${job.place}`, {
      x: width - 200,
      y,
      size: 8.5,
      font: fontOblique,
      color: muted,
    });
    y -= 12;

    for (const b of job.bullets) {
      page.drawText(`• ${b}`, {
        x: 52,
        y,
        size: 8.2,
        font: fontRegular,
        color: darkInk,
      });
      y -= 11;
    }
    y -= 4;
  }
  y -= 4;

  // Section: Featured Key Productions
  drawSectionHeader('Selected Featured Projects');
  const projs = [
    {
      name: 'MyChauffeur (Next.js SSR / Bilingual)',
      detail: 'Migrated legacy SPA to Next.js SSR. +60% organic traffic, 100% crawl indexation, bilingual /en & /de routing.',
    },
    {
      name: 'Comfy Car Rental (Fintech & Multi-Portal)',
      detail: 'Dual payment gateway (Stripe + Saudi Mada). 3 authenticated enterprise portals (Admin, Fleet, Corporate).',
    },
    {
      name: 'Business Class For Less (Designed & Developed by Kamran Ali)',
      detail: 'Luxury travel booking platform with interactive multi-city flight search form, passenger counters, and lead generation.',
    },
    {
      name: 'TSA Bildung & Qowboy Security (Enterprise & Services)',
      detail: 'Multi-category educational and security platforms with localized structured schemas and instant dispatch flows.',
    },
  ];

  for (const p of projs) {
    page.drawText(`• ${p.name}: `, {
      x: 45,
      y,
      size: 8.5,
      font: fontBold,
      color: darkInk,
    });
    const prefixWidth = fontBold.widthOfTextAtSize(`• ${p.name}: `, 8.5);
    page.drawText(p.detail, {
      x: 45 + prefixWidth,
      y,
      size: 8.2,
      font: fontRegular,
      color: darkInk,
    });
    y -= 12;
  }
  y -= 6;

  // Section: Education
  drawSectionHeader('Education');
  page.drawText('Bachelor of Computer Science (BSCS) — Lahore Garrison University', {
    x: 45,
    y,
    size: 9,
    font: fontBold,
    color: darkInk,
  });
  page.drawText('2015 – 2019 | Pakistan', {
    x: width - 150,
    y,
    size: 8.5,
    font: fontOblique,
    color: muted,
  });

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.resolve('public/Kamran_Ali_CV.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Generated resume PDF at ${outputPath} (${pdfBytes.length} bytes)`);
}

createResume().catch(console.error);
