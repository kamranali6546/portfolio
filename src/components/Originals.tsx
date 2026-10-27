import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { profile, projects, type Project } from '../data/portfolio';
import { useDesktop, useReducedMotionPref } from '../hooks/useMedia';
import { RevealText } from './fx';
import ProjectCard from './ProjectCard';
import { RailButtons } from './Rail';

/**
 * ORIGINALS — Flagship showcase projects:
 * On desktop the section pins and scrolls sideways like a cinematic title sequence as the user scrolls vertically.
 * On touch / small screens / reduced motion it becomes a native swipe rail with RailButtons.
 */
export default function Originals({ onOpen }: { onOpen: (p: Project) => void }) {
  const desktop = useDesktop();
  const reduced = useReducedMotionPref();

  return desktop && !reduced ? <PinnedOriginals onOpen={onOpen} /> : <RailOriginals onOpen={onOpen} />;
}

function Intro() {
  return (
    <div className="flex w-[82vw] shrink-0 snap-start flex-col justify-center sm:w-[50vw] md:w-[38vw] lg:w-[34vw] pr-4 select-none">
      <p className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#ff3d5a]">
        <span className="h-px w-8 bg-[#ff3d5a]" /> {projects.length} Originals · {projects[0]?.year || '2026'}
      </p>
      <RevealText as="h2" text="ORIGINALS" className="font-display text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.85] text-[#f4f1ec]" />
      <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#a7a6ad]">
        Flagship client platforms engineered with React, Next.js, and TypeScript. Open any title for the full story.
      </p>
      <p className="mt-6 hidden text-xs tracking-[0.24em] text-[#6d6c75] lg:block">SCROLL TO BROWSE →</p>
    </div>
  );
}

function Outro() {
  return (
    <a
      href={profile.links.linkedin}
      target="_blank"
      rel="noreferrer"
      data-cursor="link"
      className="group flex aspect-[3/4] w-[70vw] shrink-0 snap-start flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/15 text-center transition hover:border-[#ff3d5a]/60 sm:w-[44vw] lg:aspect-auto lg:h-[66vh] lg:w-[24vw]"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 text-2xl text-[#f4f1ec] transition group-hover:scale-110 group-hover:border-[#ff3d5a] group-hover:text-[#ff3d5a]">↗</span>
      <span className="font-display text-3xl tracking-wide text-[#f4f1ec]">Connect on LinkedIn</span>
      <span className="text-xs text-[#a7a6ad]">linkedin.com/in/kamranali6546</span>
    </a>
  );
}

function PinnedOriginals({ onOpen }: { onOpen: (p: Project) => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const distMV = useMotionValue(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      const d = Math.max(0, track.current.scrollWidth - window.innerWidth);
      setDist(d);
      distMV.set(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [distMV]);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] });
  const raw = useTransform([scrollYProgress, distMV], ([p, d]: number[]) => -p * d);
  const x = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={wrap} style={{ height: `calc(100vh + ${dist}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(50%_60%_at_70%_50%,rgba(229,19,43,0.10),transparent_70%)]" />
        <motion.div ref={track} style={{ x }} className="gutter relative flex items-center gap-8 pr-[12vw]" data-cursor="drag">
          <Intro />
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={() => onOpen(p)} />
          ))}
          <Outro />
        </motion.div>
        <div className="gutter absolute inset-x-0 bottom-8 flex items-center gap-4">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#6d6c75]">ORIGINALS</span>
          <div className="h-[2px] flex-1 overflow-hidden rounded bg-white/10">
            <motion.div className="h-full origin-left bg-[#e5132b]" style={{ scaleX: bar }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function RailOriginals({ onOpen }: { onOpen: (p: Project) => void }) {
  const rail = useRef<HTMLDivElement>(null);

  return (
    <div className="relative py-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_70%_50%,rgba(229,19,43,0.08),transparent_70%)]"
      />
      <div className="group/rail relative">
        <div
          ref={rail}
          className="rail px-4 sm:px-8 lg:px-12 flex snap-x snap-mandatory items-center gap-6 sm:gap-8 overflow-x-auto py-6"
          data-cursor="drag"
        >
          <Intro />
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={() => onOpen(p)} />
          ))}
          <Outro />
        </div>
        <RailButtons rail={rail} />
      </div>
    </div>
  );
}
