import React, { type ReactNode } from 'react';
import type { Palette, Project } from '../data/portfolio';

/**
 * Key art backdrop for project cards:
 * - Shows the showcase image in the upper portion, smoothly merging in the middle
 *   into the deep rich gradient background color of the card.
 * - The bottom half remains solid gradient background for crisp contrast with the text,
 *   genre, title, logline, badges, and CTA button.
 */
export function PosterBackdrop({
  palette,
  posterImage,
  children,
  className = '',
}: {
  palette: Palette;
  posterImage?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(110% 90% at 85% 15%, ${palette.via} 0%, transparent 60%),
          radial-gradient(90% 80% at 10% 90%, ${palette.from} 0%, transparent 75%),
          linear-gradient(180deg, ${palette.from} 0%, ${palette.via} 40%, ${palette.to} 100%)`,
      }}
    >
      {/* Upper Half: Showcase Screenshot merging into gradient in the middle */}
      {posterImage ? (
        <div className="absolute inset-x-0 top-0 h-[64%] z-0 overflow-hidden">
          <img
            src={posterImage}
            alt="Project Showcase"
            loading="lazy"
            decoding="async"
            width={600}
            height={400}
            className="h-full w-full object-cover object-top filter contrast-[1.05] brightness-[0.94] transition-transform duration-700 group-hover:scale-105"
          />

          {/* Smooth vertical fade: blends image directly into the card's background gradient */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0b0710] to-transparent pointer-events-none"
            style={{
              background: `linear-gradient(to top, ${palette.to} 0%, ${palette.to}ee 30%, ${palette.to}77 65%, transparent 100%)`,
            }}
          />

          {/* Accent light sweep in upper corner */}
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-35 blur-2xl pointer-events-none"
            style={{ background: palette.accent }}
          />
        </div>
      ) : (
        /* Fallback ambient lighting when no image */
        <>
          <div
            aria-hidden="true"
            className="absolute -right-1/4 -top-1/3 h-[140%] w-[70%] rotate-[18deg] opacity-35 blur-2xl"
            style={{ background: `linear-gradient(90deg, transparent, ${palette.accent}55, transparent)` }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.14] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_4px)]"
          />
        </>
      )}

      {/* Solid text backing shadow gradient at the bottom for crystal-clear readability */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[52%] pointer-events-none z-[1]"
        style={{
          background: `linear-gradient(to top, ${palette.to} 0%, ${palette.to}f0 60%, transparent 100%)`,
        }}
      />

      {children}
    </div>
  );
}

/** Motif illustrations for each Original, built from the project's own architecture and original imagery. */
export function ProjectArt({ project, className = '' }: { project: Project; className?: string }) {
  const a = project.palette.accent;

  // When an original showcase photo is present, render the merged showcase header
  if (project.posterImage) {
    return (
      <PosterBackdrop
        palette={project.palette}
        posterImage={project.posterImage}
        className={className}
      >
        {/* Subtle accent glow in top right corner */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-xl opacity-30 pointer-events-none"
          style={{ background: a }}
        />
      </PosterBackdrop>
    );
  }

  // Fallback architectural SVG graphics for projects without explicit showcase images
  return (
    <PosterBackdrop palette={project.palette} className={className}>
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-60"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`g-${project.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={a} stopOpacity="0.55" />
            <stop offset="100%" stopColor={a} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="290" cy="120" r="130" fill={`url(#g-${project.id})`} />

        {project.motif === 'shield' && (
          <g transform="translate(232 40)" fill="none" stroke={a} strokeOpacity="0.85">
            <path d="M58 0 L116 22 V78 C116 120 90 146 58 160 C26 146 0 120 0 78 V22 Z" strokeWidth="2" />
            <path
              d="M58 16 L102 33 V78 C102 111 82 132 58 144 C34 132 14 111 14 78 V33 Z"
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1="30"
                x2={i % 2 ? 72 : 86}
                y1={56 + i * 14}
                y2={56 + i * 14}
                strokeWidth="3"
                strokeLinecap="round"
                strokeOpacity={0.35 + i * 0.1}
              />
            ))}
            <path d="M40 124 l12 12 l26 -28" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}

        {project.motif === 'flow' && (
          <g fill="none" stroke={a}>
            <rect x="200" y="56" width="150" height="94" rx="12" strokeWidth="2" strokeOpacity="0.85" />
            <rect x="214" y="72" width="28" height="20" rx="4" strokeOpacity="0.7" />
            <line
              x1="214"
              x2="330"
              y1="124"
              y2="124"
              strokeWidth="3"
              strokeOpacity="0.4"
              strokeDasharray="18 8"
            />
          </g>
        )}

        {project.motif === 'tenants' && (
          <g fill="none" stroke={a}>
            {[0, 1, 2].map((r) =>
              [0, 1, 2, 3].map((c) => (
                <rect
                  key={`${r}-${c}`}
                  x={196 + c * 44}
                  y={50 + r * 44}
                  width="34"
                  height="34"
                  rx="7"
                  strokeWidth="1.6"
                  strokeOpacity={0.25 + ((r + c) % 3) * 0.25}
                  fill={(r + c) % 4 === 0 ? a : 'none'}
                  fillOpacity="0.25"
                />
              ))
            )}
          </g>
        )}
      </svg>
    </PosterBackdrop>
  );
}

/** Small platform monogram mark used in nav and cards. */
export function SeriesMark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className="font-display text-2xl font-bold tracking-wider text-[#ff3d5a]">
        KA
      </span>
      <span className="font-sans text-[0.62em] font-bold tracking-[0.36em] text-[#a7a6ad]">
        SERIES
      </span>
    </span>
  );
}
