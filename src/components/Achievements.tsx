import React from 'react';
import { motion } from 'framer-motion';
import { EASE, SectionHeading, Tilt } from './fx';

function Laurel({ side }: { side: 'l' | 'r' }) {
  return (
    <svg
      viewBox="0 0 30 64"
      className={`h-14 w-auto text-[#d9b46a] ${side === 'r' ? '-scale-x-100' : ''}`}
      aria-hidden="true"
    >
      <path d="M26 62C10 52 4 36 8 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
      {[10, 18, 26, 34, 42, 50].map((y, i) => (
        <ellipse
          key={y}
          cx={i < 2 ? 9 : 8 + i * 1.6}
          cy={y}
          rx="5"
          ry="2.2"
          fill="currentColor"
          opacity="0.85"
          transform={`rotate(-40 ${8 + i * 1.6} ${y})`}
        />
      ))}
    </svg>
  );
}

const keyMoments = [
  {
    id: 'mobile-traffic',
    laurel: 'VERIFIED SURGE',
    title: '+80% Mobile Traffic',
    org: 'Gordian Solutions',
    detail: 'Responsive optimization across all screens, driving an 80% mobile traffic surge.',
  },
  {
    id: 'speed-lift',
    laurel: 'CORE WEB VITALS',
    title: '-45% Load Times',
    org: 'Gordian Solutions',
    detail: 'Caching and bundle optimizations reducing page load times by 45%.',
  },
  {
    id: 'bug-reduction',
    laurel: 'CODE RELIABILITY',
    title: '-90% Production Bugs',
    org: 'Exion Technologies',
    detail: 'Strict TypeScript contracts and code reviews eliminating 90% of defects.',
  },
  {
    id: 'client-satisfaction',
    laurel: 'CLIENT BENCHMARK',
    title: '95% Satisfaction',
    org: 'Gordian Solutions',
    detail: '5 years of React & Next.js engineering with a 95% client satisfaction rate.',
  },
  {
    id: 'organic-crawl',
    laurel: 'SEO ARCHITECTURE',
    title: '+60% Organic Crawl',
    org: 'MyChauffeur',
    detail: 'Next.js SSR migration with bilingual routing increasing organic traffic by 60%.',
  },
];

export default function Achievements() {
  return (
    <>
      <SectionHeading kicker="Awards season" title="Top Moments" />
      <div className="px-4 sm:px-8 lg:px-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 [perspective:1400px]">
        {keyMoments.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 50, rotateX: 18 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
          >
            <Tilt max={8} className="group h-full rounded-2xl">
              <article className="relative flex h-full min-h-[340px] flex-col items-center overflow-hidden rounded-2xl bg-[radial-gradient(120%_80%_at_50%_0%,#2a1f10,#0d0b08_60%,#07070a)] px-5 pb-6 pt-8 text-center ring-1 ring-[#d9b46a]/20 transition duration-500 group-hover:ring-[#d9b46a]/60 shadow-xl">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9b46a]/70 to-transparent"
                />
                <div
                  aria-hidden="true"
                  className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#d9b46a]/10 blur-3xl transition duration-700 group-hover:bg-[#d9b46a]/25"
                />

                {/* Golden Laurel Header */}
                <div className="relative flex items-center gap-1">
                  <Laurel side="l" />
                  <div className="px-1">
                    <p className="text-[9px] font-bold uppercase leading-tight tracking-[0.24em] text-[#d9b46a] font-mono">
                      {a.laurel}
                    </p>
                  </div>
                  <Laurel side="r" />
                </div>

                <h3 className="relative mt-6 font-display text-[2.1rem] leading-[0.92] tracking-wide text-[#f4f1ec]">
                  {a.title}
                </h3>
                <p className="relative mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d9b46a] font-mono">
                  {a.org}
                </p>
                <p className="relative mt-4 text-[13px] leading-relaxed text-[#f4f1ec]/70 font-sans">
                  {a.detail}
                </p>
              </article>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </>
  );
}
