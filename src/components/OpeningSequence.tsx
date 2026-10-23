import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { profile } from '../data/portfolio';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { usePortrait } from '../hooks/usePortrait';
import { EASE, Magnetic } from './fx';
import { playCinematicChord } from '../utils/audio';

const TIMELINE = [
  { at: 300, beat: 1 },  // studio card
  { at: 1800, beat: 2 }, // name
  { at: 2600, beat: 3 }, // THE SERIES
  { at: 3300, beat: 4 }, // portrait
  { at: 4200, beat: 5 }, // role
  { at: 4900, beat: 6 }, // play button
];

interface OpeningSequenceProps {
  onPlaySeries: () => void;
  onSkipToMinimal: () => void;
}

export default function OpeningSequence({ onPlaySeries, onSkipToMinimal }: OpeningSequenceProps) {
  const reduced = useReducedMotion();
  const { src: portraitSrc } = usePortrait();
  const [beat, setBeat] = useState(reduced ? 6 : 0);

  useEffect(() => {
    if (reduced) return;
    const timers = TIMELINE.map(({ at, beat }) => window.setTimeout(() => setBeat(beat), at));
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleSkip();
      if (e.key === 'Enter') handlePlay();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onPlaySeries, onSkipToMinimal]);

  const handlePlay = () => {
    playCinematicChord(0.35);
    onPlaySeries();
  };

  const handleSkip = () => {
    onSkipToMinimal();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[120] overflow-hidden bg-black select-none"
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
      transition={{ duration: 0.9, ease: EASE }}
      role="dialog"
      aria-label="Opening titles"
    >
      {/* Letterbox bars */}
      <motion.div
        className="absolute inset-x-0 top-0 z-30 h-[7vh] bg-black"
        initial={{ y: 0 }}
        animate={{ y: beat >= 6 ? '-100%' : 0 }}
        transition={{ duration: 1.2, ease: EASE }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 z-30 h-[7vh] bg-black"
        initial={{ y: 0 }}
        animate={{ y: beat >= 6 ? '100%' : 0 }}
        transition={{ duration: 1.2, ease: EASE }}
      />

      {/* Projector flicker light */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(60% 50% at 50% 55%, rgba(15,92,74,0.28), rgba(229,19,43,0.15) 40%, transparent 70%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: beat >= 2 ? [0, 0.9, 0.5, 1] : 0 }}
        transition={{ duration: 1.4 }}
      />

      {/* Studio card */}
      <AnimatePresence>
        {beat === 1 && (
          <motion.div
            key="studio"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className="font-sans text-xs font-semibold text-[#a7a6ad] sm:text-sm tracking-[0.4em] uppercase"
              initial={{ letterSpacing: '0.2em', opacity: 0 }}
              animate={{ letterSpacing: '0.6em', opacity: 1 }}
              transition={{ duration: 1.6, ease: EASE }}
            >
              {profile.originalLabel}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portrait reveal */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-0 mx-auto flex h-[72vh] max-w-[900px] items-end justify-center"
        initial={{ opacity: 0, scale: 1.12, filter: 'blur(18px) brightness(0.3)' }}
        animate={beat >= 4 ? { opacity: 1, scale: 1, filter: 'blur(0px) brightness(1)' } : {}}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <img
          src={portraitSrc}
          alt={profile.portrait.alt}
          className="h-full w-auto max-w-none object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_60%,transparent_98%)] drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-[radial-gradient(70%_60%_at_50%_40%,transparent_30%,rgba(0,0,0,0.85)_100%)]"
      />

      {/* Main Title */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
        <motion.h1
          className="font-display leading-[0.82] text-[#f4f1ec] drop-shadow-[0_8px_40px_rgba(0,0,0,0.9)]"
          style={{ fontSize: 'clamp(4.8rem, 20vw, 15rem)' }}
          initial={{ opacity: 0, scale: 1.3, filter: 'blur(20px)', letterSpacing: '0.5em' }}
          animate={beat >= 2 ? { opacity: 1, scale: 1, filter: 'blur(0px)', letterSpacing: '0.04em', y: beat >= 4 ? '-28vh' : 0 } : {}}
          transition={{ duration: 1.3, ease: EASE }}
        >
          {profile.firstName}
        </motion.h1>

        <motion.p
          className="font-sans text-sm font-bold text-[#ff3d5a] [text-shadow:0_2px_20px_rgba(0,0,0,0.9)] sm:text-lg tracking-[0.7em]"
          initial={{ opacity: 0, letterSpacing: '1.4em' }}
          animate={beat >= 3 ? { opacity: 1, letterSpacing: '0.7em', y: beat >= 4 ? '-28vh' : 0 } : {}}
          transition={{ duration: 1.1, ease: EASE }}
        >
          {profile.seriesTag}
        </motion.p>
      </div>

      {/* Role + Play CTA */}
      <div className="absolute inset-x-0 bottom-[9vh] z-20 flex flex-col items-center gap-6 px-4 text-center">
        <motion.p
          className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f4f1ec]/90 sm:text-sm sm:tracking-[0.4em]"
          initial={{ opacity: 0, y: 14 }}
          animate={beat >= 5 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {profile.tagline.join('  •  ')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={beat >= 6 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Magnetic>
            <button
              type="button"
              onClick={handlePlay}
              tabIndex={beat >= 6 ? 0 : -1}
              className="group flex items-center gap-3 rounded-full bg-[#f4f1ec] px-9 py-3.5 font-sans text-base font-bold tracking-wide text-[#07070a] shadow-[0_0_60px_rgba(15,92,74,0.65)] transition hover:bg-white hover:scale-105 active:scale-95"
            >
              <span className="text-lg transition-transform group-hover:scale-125 text-[#ff3d5a]">▶</span>
              <span>PLAY THE SERIES</span>
            </button>
          </Magnetic>

          <button
            type="button"
            onClick={handleSkip}
            tabIndex={beat >= 6 ? 0 : -1}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-sans text-xs font-semibold tracking-wider text-[#f4f1ec] backdrop-blur-md transition hover:border-[#8FD9BE] hover:bg-white/10 hover:text-white"
          >
            <span>MINIMAL ONE-PAGE</span>
            <span className="text-[#8FD9BE]">→</span>
          </button>
        </motion.div>
      </div>

      {/* Skip Button at Top Right */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute right-4 top-[calc(7vh+12px)] z-40 rounded-full border border-white/20 bg-black/40 px-4 py-2 font-sans text-[11px] font-semibold tracking-[0.2em] text-[#a7a6ad] backdrop-blur transition hover:border-[#8FD9BE] hover:text-white"
      >
        SKIP INTRO → MINIMAL
      </button>
    </motion.div>
  );
}
