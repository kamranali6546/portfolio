import React from 'react';
import { motion } from 'framer-motion';
import { education, experience, profile } from '../data/portfolio';
import { useAboutPortrait } from '../hooks/usePortrait';
import { EASE, SectionHeading, Tilt } from './fx';

export default function About() {
  const { src: portraitSrc } = useAboutPortrait();

  const facts = [
    {
      k: 'Education',
      v: `${education[0].degree}`,
      s: `${education[0].school} (${education[0].period})`,
    },
    {
      k: 'Current Role',
      v: `${experience[0].role}`,
      s: `${experience[0].company} · Georgia (${experience[0].period})`,
    },
    {
      k: 'Core Stack',
      v: 'React.js, Next.js & TypeScript',
      s: 'SSR, Edge Caching, WCAG AA',
    },
    {
      k: 'Availability',
      v: profile.location,
      s: 'Open to relocation & remote',
    },
  ];

  return (
    <>
      <SectionHeading kicker="The Pilot" title="About Kamran" />
      <div className="px-4 sm:px-8 lg:px-12 grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        {/* Left Column: Framed Movie Poster Portrait with 3D Tilt */}
        <motion.div
          className="mx-auto w-full max-w-md lg:max-w-none"
          initial={{ opacity: 0, scale: 0.88, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <Tilt max={5} className="rounded-2xl">
            <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_30%,#0F5C4A,#07070a_70%)]" />
              <div className="absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_28px)]" />

              <img
                src={portraitSrc}
                alt={profile.portrait.alt}
                loading="lazy"
                decoding="async"
                width={400}
                height={500}
                className="absolute bottom-0 left-1/2 h-[94%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom transition-transform duration-300 group-hover:scale-102"
              />

              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between z-10 pointer-events-none">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.3em] text-[#ff3d5a]">STARRING</p>
                  <p className="font-display text-3xl leading-none text-[#f4f1ec]">{profile.displayName}</p>
                </div>
                <span className="rounded border border-white/30 px-2 py-0.5 text-[10px] font-mono font-bold text-[#8FD9BE]">
                  S01–S05
                </span>
              </div>
            </div>
          </Tilt>
        </motion.div>

        {/* Right Column: Bio Narrative + Quick Key Facts */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#f4f1ec]/85 font-sans">
            <p className="font-serif italic text-xl sm:text-2xl text-white/95 border-l-2 border-[#8FD9BE] pl-4">
              &ldquo;{profile.quote}&rdquo;
            </p>
            <p>
              Hi, I&apos;m <strong>Kamran Ali</strong> — a Senior Frontend Developer with over six years of hands-on experience building fast, accessible, and scalable web applications across international companies.
            </p>
            <p className="text-sm sm:text-base text-[#a7a6ad]">
              From leading frontend initiatives at <strong>Gordian Solutions</strong> for five years with a 95% client satisfaction record, to engineering high-traffic client portals at <strong>Bring GmbH</strong> in Germany, and crafting 60fps motion experiences at <strong>Exion Technologies</strong> in Georgia.
            </p>
          </div>

          {/* Quick Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {facts.map((f, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors"
              >
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#8FD9BE]">
                  {f.k}
                </p>
                <p className="text-sm font-semibold text-[#f4f1ec] mt-0.5">{f.v}</p>
                <p className="text-xs text-[#a7a6ad] mt-0.5">{f.s}</p>
              </div>
            ))}
          </div>

          {/* Core Highlights */}
          <div className="pt-2">
            <p className="text-xs font-mono uppercase tracking-wider text-[#a7a6ad] mb-2.5">
              Engineering Disciplines
            </p>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-medium text-[#f4f1ec]/90"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
