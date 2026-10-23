import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { profile, type ProfileId } from '../data/portfolio';
import { useFinePointer } from '../hooks/useMedia';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { EASE, Magnetic, Particles } from './fx';
import { SeriesMark } from './Poster';
import { playCinematicChord } from '../utils/audio';

type MV = ReturnType<typeof useTransform<number, number>>;

function FloatChip({
  text,
  sub,
  pos,
  depth,
  index,
  mx,
  my,
}: {
  text: string;
  sub: string;
  pos: string;
  depth: number;
  index: number;
  mx: MV;
  my: MV;
}) {
  const x = useTransform(mx, (n: number) => n * depth);
  const y = useTransform(my, (n: number) => n * depth);

  return (
    <motion.div
      className={`glass absolute hidden rounded-xl px-4 py-2.5 md:block ${pos} z-20 shadow-2xl`}
      style={{ x, y }}
      initial={{ opacity: 0, filter: 'blur(6px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.9, delay: 1.2 + index * 0.18, ease: EASE }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
      >
        <p className="text-sm font-semibold text-[#f4f1ec]">{text}</p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#a7a6ad]">{sub}</p>
      </motion.div>
    </motion.div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE } },
};

export default function Hero({
  onPlay,
  onResume,
  profileId,
}: {
  onPlay: () => void;
  onResume: () => void;
  profileId: ProfileId;
}) {
  const ref = useRef<HTMLElement>(null);
  const fine = useFinePointer();
  const { scrollTo } = useSmoothScroll();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const imgRotY = useSpring(useTransform(mx, [-1, 1], [-8, 8]), { stiffness: 120, damping: 20 });
  const imgRotX = useSpring(useTransform(my, [-1, 1], [6, -6]), { stiffness: 120, damping: 20 });
  const imgShiftX = useSpring(useTransform(mx, [-1, 1], [-18, 18]), { stiffness: 100, damping: 22 });
  const chipX = useSpring(useTransform(mx, [-1, 1], [-12, 12]), { stiffness: 140, damping: 18 });
  const chipY = useSpring(useTransform(my, [-1, 1], [-12, 12]), { stiffness: 140, damping: 18 });
  const glowX = useSpring(useTransform(mx, [-1, 1], [-40, 40]), { stiffness: 60, damping: 30 });

  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 600], [0, 80]);
  const textY = useTransform(scrollY, [0, 600], [0, -60]);
  const imgScale = useTransform(scrollY, [0, 600], [1, 0.94]);
  const fade = useTransform(scrollY, [0, 450], [1, 0.1]);
  const blackout = useTransform(scrollY, [200, 650], [0, 0.85]);

  const meta = ['99% Match', '2026', 'TV-MA', '6+ Seasons', 'Ultra HD 4K', '5.1 Surround'];

  const floating = [
    { text: 'Sr. Software Engineer', sub: 'Exion Technologies · Georgia', pos: 'left-[0%] top-[30%]', depth: 1 },
    { text: '95% Satisfaction', sub: 'Gordian Solutions · 5 Yrs', pos: 'right-[-2%] top-[18%]', depth: -1 },
    { text: 'React · Next.js · TypeScript', sub: 'Architecture & SSR', pos: 'right-[2%] bottom-[24%]', depth: 0.6 },
  ];

  const handlePlay = () => {
    playCinematicChord(0.35);
    onPlay();
  };

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-[#07070a]"
      onPointerMove={(e) => {
        if (!fine) return;
        mx.set((e.clientX / window.innerWidth) * 2 - 1);
        my.set((e.clientY / window.innerHeight) * 2 - 1);
      }}
    >
      {/* Ambient gradient mesh */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(15,92,74,0.35),transparent_70%)]" />

      {/* Atmospheric lighting */}
      <motion.div aria-hidden="true" className="absolute inset-0 z-[1]" style={{ x: glowX }}>
        <div className="absolute right-[-10%] top-[-10%] h-[90vh] w-[80vw] rounded-full bg-[radial-gradient(closest-side,rgba(15,92,74,0.45),rgba(229,19,43,0.12)_55%,transparent)] blur-2xl lg:right-[-4%] lg:w-[60vw]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[70vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(229,19,43,0.22),transparent)] blur-2xl" />
      </motion.div>

      {/* Dust particles */}
      <Particles count={42} color="143,217,190" className="z-[2]" />

      {/* Light streaks */}
      <div aria-hidden="true" className="absolute inset-0 z-[2] overflow-hidden">
        <span className="light-streak left-[40%] top-[22%] w-[50vw]" style={{ animationDelay: '1.2s' }} />
        <span className="light-streak left-[30%] top-[64%] w-[40vw]" style={{ animationDelay: '3.6s' }} />
        <span className="light-streak left-[55%] top-[44%] w-[30vw]" style={{ animationDelay: '5.2s' }} />
      </div>

      {/* Portrait of Kamran Ali */}
      <motion.div
        className="absolute inset-x-0 top-12 z-[3] flex h-[64svh] items-end justify-center sm:h-[70svh] lg:bottom-0 lg:left-auto lg:right-[3vw] lg:top-20 lg:h-auto lg:w-[54vw] xl:right-[6vw] xl:w-[48vw]"
        style={{ y: imgY, scale: imgScale, opacity: fade }}
      >
        <motion.div
          className="relative h-full w-full lg:h-[86vh]"
          style={{ rotateY: imgRotY, rotateX: imgRotX, x: imgShiftX, transformPerspective: 1200 }}
          initial={{ clipPath: 'inset(100% -30% -10% -30%)', opacity: 0 }}
          animate={{ clipPath: 'inset(-30% -30% -10% -30%)', opacity: 1 }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.1 }}
        >
          {/* Rim light ring */}
          <div
            aria-hidden="true"
            className="absolute bottom-[8%] left-1/2 h-[78%] w-[78%] -translate-x-1/2 rounded-full border border-[#8FD9BE]/25 shadow-[0_0_120px_rgba(15,92,74,0.45),inset_0_0_80px_rgba(229,19,43,0.2)]"
          />

          {/* Portrait Photo (Older Original Portrait for Banner) */}
          <img
            src="/assets/banner-portrait.webp"
            alt={profile.portrait.alt}
            fetchPriority="high"
            decoding="async"
            width={600}
            height={800}
            className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] [mask-image:linear-gradient(to_bottom,black_62%,transparent_97%)]"
          />

          {/* Emerald & crimson rim light screen */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_30%,rgba(143,217,190,0.2),transparent_70%)] mix-blend-screen"
          />

          {/* Floating UI Chips */}
          {floating.map((f, i) => (
            <FloatChip key={f.text} {...f} index={i} mx={chipX} my={chipY} />
          ))}
        </motion.div>
      </motion.div>

      {/* Readability gradients */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[40svh] z-[4] h-[36svh] bg-gradient-to-b from-transparent via-[#07070a]/75 to-[#07070a] lg:hidden"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[4] hidden bg-[linear-gradient(90deg,var(--color-ink)_0%,rgba(7,7,10,0.75)_34%,transparent_60%)] lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-[4] h-48 bg-gradient-to-t from-[#07070a] to-transparent"
      />

      {/* Copy */}
      <motion.div
        className="gutter relative z-[5] flex min-h-[100svh] flex-col justify-end pb-16 pt-[54svh] sm:pb-20 lg:max-w-[54vw] lg:justify-center lg:pb-0 lg:pt-24"
        style={{ y: textY, opacity: fade }}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="mb-3 text-lg">
          <SeriesMark />
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display leading-[0.82] tracking-[0.02em] text-[#f4f1ec]"
          style={{ fontSize: 'clamp(4.2rem, 12vw, 11rem)' }}
        >
          <span className="shimmer-text">{profile.firstName}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-1 font-sans text-sm font-bold tracking-[0.62em] text-[#ff3d5a] sm:text-base uppercase"
        >
          {profile.seriesTag}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] font-medium text-[#a7a6ad]"
        >
          <span className="rounded border border-white/25 px-1.5 py-px text-[10px] font-bold tracking-wider text-[#f4f1ec] bg-white/5">
            AI·ML
          </span>
          {meta.map((m, i) => (
            <span key={m} className="flex items-center gap-3">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-[#6d6c75]" />}
              <span className={i === 0 ? 'text-[#8FD9BE] font-semibold' : ''}>{m}</span>
            </span>
          ))}
        </motion.div>

        <motion.p
          variants={item}
          className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f4f1ec]/90 sm:text-xs sm:tracking-[0.34em]"
        >
          {profile.tagline.join(' • ')}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#f4f1ec]/85 sm:text-base font-sans"
        >
          {profile.intro}
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
          <Magnetic>
            <button
              type="button"
              data-cursor="play"
              onClick={handlePlay}
              className="flex min-h-12 items-center gap-3 rounded-md bg-[#f4f1ec] px-6 py-3 text-[15px] font-bold text-[#07070a] transition hover:bg-white sm:px-8 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              <span className="text-lg text-[#ff3d5a]">▶</span> Play Intro
            </button>
          </Magnetic>

          <Magnetic>
            {profileId === 'recruiter' ? (
              <button
                type="button"
                onClick={onResume}
                className="glass flex min-h-12 items-center gap-3 rounded-md px-6 py-3 text-[15px] font-semibold text-[#f4f1ec] transition hover:bg-white/15 sm:px-8"
              >
                <span className="text-lg">⤓</span> View Resume
              </button>
            ) : (
              <button
                type="button"
                onClick={() => scrollTo('#originals')}
                className="glass flex min-h-12 items-center gap-3 rounded-md px-6 py-3 text-[15px] font-semibold text-[#f4f1ec] transition hover:bg-white/15 sm:px-8"
              >
                <span className="text-xl leading-none">＋</span> My Work
              </button>
            )}
          </Magnetic>

          <button
            type="button"
            onClick={() => scrollTo('#about')}
            aria-label="More info"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-lg text-[#f4f1ec] transition hover:border-[#f4f1ec] hover:bg-white/10"
          >
            ⓘ
          </button>
        </motion.div>
      </motion.div>

      {/* Blackout overlay on scroll */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[6] bg-[#07070a]"
        style={{ opacity: blackout }}
      />
    </section>
  );
}
