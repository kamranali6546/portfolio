import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { seasons } from '../data/portfolio';
import { EASE, SectionHeading } from './fx';
import EpisodeCard from './EpisodeCard';
import { RailButtons } from './Rail';

export default function Seasons() {
  // Season 2 is active by default as requested
  const [active, setActive] = useState(() => {
    const s2Index = seasons.findIndex((s) => s.number === 2);
    return s2Index !== -1 ? s2Index : 1;
  });
  const season = seasons[active];
  const rail = useRef<HTMLDivElement>(null);

  return (
    <>
      <SectionHeading
        kicker={`${seasons.length} Seasons`}
        title="The Journey"
        aside={
          <p className="max-w-xs text-sm text-[#a7a6ad] font-sans">
            Every career arc from the resume told as a season — select one to inspect its episodes and impact.
          </p>
        }
      />

      {/* Season Selector Tabs */}
      <div className="rail px-4 sm:px-8 lg:px-12 mb-8 flex gap-2 overflow-x-auto" role="tablist" aria-label="Seasons">
        {seasons.map((s, i) => (
          <button
            key={s.number}
            role="tab"
            aria-selected={i === active}
            type="button"
            onClick={() => {
              setActive(i);
              rail.current?.scrollTo({ left: 0, behavior: 'smooth' });
            }}
            className={`relative shrink-0 rounded-full px-5 py-2.5 text-left transition focus:outline-none ${
              i === active ? 'text-[#07070a]' : 'text-[#a7a6ad] hover:text-[#f4f1ec]'
            }`}
          >
            {i === active && (
              <motion.span
                layoutId="season-pill"
                className="absolute inset-0 rounded-full bg-[#f4f1ec]"
                transition={{ duration: 0.5, ease: EASE }}
              />
            )}
            <span className="relative block text-[10px] font-bold tracking-[0.24em] font-mono">
              SEASON {String(s.number).padStart(2, '0')}
            </span>
            <span className="relative block whitespace-nowrap text-sm font-semibold">
              {s.title}
            </span>
          </button>
        ))}
      </div>

      {/* Season Content & Rail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={season.number}
          initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className="px-4 sm:px-8 lg:px-12 mb-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="font-display text-4xl tracking-wide text-[#f4f1ec] sm:text-5xl">
              <span className="text-outline mr-3">S{String(season.number).padStart(2, '0')}</span>
              {season.title}
            </h3>
            <span className="text-sm text-[#a7a6ad] font-mono">
              {season.period} · {season.episodes.length} {season.episodes.length === 1 ? 'Episode' : 'Episodes'}
            </span>
          </div>

          <p className="px-4 sm:px-8 lg:px-12 max-w-3xl text-[15px] leading-relaxed text-[#f4f1ec]/80 font-sans">
            {season.synopsis}
          </p>

          <div className="group/rail relative">
            <div
              ref={rail}
              className="rail px-4 sm:px-8 lg:px-12 flex snap-x snap-mandatory gap-4 overflow-x-auto py-8 [perspective:1200px]"
            >
              {season.episodes.map((e, i) => (
                <EpisodeCard key={e.code} episode={e} index={i} />
              ))}
            </div>
            <RailButtons rail={rail} />
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
