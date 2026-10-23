import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../data/portfolio';
import { EASE, Tilt } from './fx';
import { ProjectArt } from './Poster';

export default function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const accent = project.palette.accent;
  const isDarkAccent = ['#D4AF37', '#FFB800', '#00C896', '#C9A56A', '#EAB308', '#84CC16'].includes(accent);

  return (
    <motion.article
      className="w-[84vw] shrink-0 snap-start sm:w-[62vw] lg:w-[46vw] xl:w-[42vw] select-none"
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px -10% 0px 0px' }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: EASE }}
    >
      <Tilt max={5} className="group rounded-2xl">
        <div
          role="button"
          tabIndex={0}
          data-cursor="view"
          onClick={onOpen}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpen();
            }
          }}
          aria-label={`Open details for ${project.title}`}
          style={{
            borderColor: `${accent}30`,
          }}
          className="focus-ring relative aspect-[4/5] overflow-hidden rounded-2xl border transition duration-500 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] cursor-pointer sm:aspect-[16/12] lg:aspect-auto lg:h-[66vh]"
        >
          {/* Card Hover Border Glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
            style={{
              boxShadow: `inset 0 0 0 1.5px ${accent}90, 0 0 40px -10px ${accent}40`,
            }}
          />

          {/* Background Art & Merged Image */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-cine)] group-hover:scale-[1.05]">
              <ProjectArt project={project} />
            </div>
          </div>

          {/* Top Left: Monogram and Original badge with matched accent */}
          <div className="absolute left-5 top-5 flex items-center gap-2 sm:left-7 sm:top-7 z-20 pointer-events-none">
            <span
              className="font-display text-xl leading-none font-bold"
              style={{ color: accent }}
            >
              KA
            </span>
            <span className="text-[10px] font-bold tracking-[0.34em] text-[#f4f1ec]/90">
              ORIGINAL
            </span>
          </div>

          {/* Top Right: Year tag styled with brand border */}
          <span
            className="absolute right-5 top-5 rounded border px-2 py-0.5 text-[10px] font-mono font-bold text-[#f4f1ec] backdrop-blur-md sm:right-7 sm:top-7 z-20 pointer-events-none"
            style={{
              borderColor: `${accent}50`,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          >
            {project.year}
          </span>

          {/* Bottom Card Content */}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 [transform:translateZ(40px)] z-20 pointer-events-none">
            {/* Genre with accent highlight */}
            <p
              className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em]"
              style={{ color: accent }}
            >
              {project.genre}
            </p>

            {/* Title */}
            <h3
              className="font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.88] tracking-wide text-[#f4f1ec] drop-shadow-md"
            >
              {project.title}
            </h3>

            {/* Logline */}
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[#f4f1ec]/85 sm:text-[15px] drop-shadow-sm">
              {project.logline}
            </p>

            {/* Tech Stack Pills */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-[#f4f1ec]/95 backdrop-blur-md border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Call To Action Buttons (Pointer events enabled for interactive targets) */}
            <div className="mt-5 flex flex-wrap items-center gap-3 pointer-events-auto">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen();
                }}
                className="flex min-h-11 items-center gap-2 rounded-md px-5 text-sm font-bold transition shadow-lg hover:scale-105 active:scale-95 focus:outline-none"
                style={{
                  backgroundColor: accent,
                  color: isDarkAccent ? '#0a0a0f' : '#ffffff',
                }}
              >
                ▶ View Project Details
              </button>

              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  onClick={(e) => e.stopPropagation()}
                  className="flex min-h-11 items-center gap-2 rounded-md border border-white/25 bg-black/60 px-4 text-sm font-semibold text-[#f4f1ec] backdrop-blur transition hover:border-white hover:bg-black/80"
                >
                  Live Site ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </Tilt>
    </motion.article>
  );
}
