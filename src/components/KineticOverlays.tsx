import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HERO_DATA,
  FOUNDATION_SENTENCE,
  LEDGER_METRICS,
  ARCHIVE_EXPERIENCES,
  SKILL_CATEGORIES,
  LEADERSHIP_PRINCIPLES,
  EDUCATION_TIMELINE,
  CONTACT_INFO,
  CHAPTERS,
} from '../data/portfolioData';
import {
  ArrowDown,
  Check,
  Copy,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Briefcase,
} from 'lucide-react';

interface KineticOverlaysProps {
  currentChapterIndex: number;
  scrollProgress: number;
}

export const KineticOverlays: React.FC<KineticOverlaysProps> = ({
  currentChapterIndex,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('exion');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<number>(0);
  const [selectedLeadership, setSelectedLeadership] = useState<number>(0);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const accent = CHAPTERS[currentChapterIndex]?.accentColor || '#D4794A';

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center p-6 md:p-12 overflow-hidden">
      <AnimatePresence mode="wait">
        {/* CHAPTER 0: THRESHOLD — HERO */}
        {currentChapterIndex === 0 && (
          <motion.div
            key="chapter-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl text-center pointer-events-auto"
          >
            {/* Metadata discipline: clean unboxed text */}
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
              <span className="flex items-center gap-1.5" style={{ color: accent }}>
                <MapPin className="h-3.5 w-3.5" />
                {HERO_DATA.location}
              </span>
              <span aria-hidden="true">·</span>
              <span>{HERO_DATA.origin}</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-300/90">{HERO_DATA.status}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
              {HERO_DATA.name.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </h1>

            <p className="mt-4 font-display text-xl sm:text-2xl text-slate-200 font-medium">
              {HERO_DATA.title}
            </p>

            <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-slate-400 leading-relaxed">
              {HERO_DATA.tagline}
            </p>

            {/* Tech corridor telemetry indicator */}
            <div className="mt-6 flex items-center justify-center gap-2 font-mono text-[11px] text-amber-500/80">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>Silicon Server Hall · Optical Fiber Conduits Online</span>
            </div>

            {/* Scroll affordance prompt */}
            <div className="mt-8 flex flex-col items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500">
              <span className="flex items-center gap-1.5">
                Scroll to walk through tech corridor
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown className="h-4 w-4 text-amber-500/80" />
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* CHAPTER 1: THE FOUNDATION — ONE SUSPENDED SLAB */}
        {currentChapterIndex === 1 && (
          <motion.div
            key="chapter-1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl text-center pointer-events-auto"
          >
            <div className="rounded-2xl border border-white/10 bg-[#0c0c12]/80 p-8 sm:p-12 backdrop-blur-md shadow-2xl">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-500 mb-1">
                02 · The Foundation
              </div>
              <div className="text-[11px] font-mono text-slate-400 mb-6">
                Spatial Effect: Suspended Silicon CPU Die · Etched Gold Logic Bus Traces
              </div>
              <blockquote className="font-display text-xl sm:text-2xl md:text-3xl font-semibold leading-snug tracking-tight text-white">
                "{FOUNDATION_SENTENCE}"
              </blockquote>
              <div className="mt-8 flex items-center justify-center gap-3 text-xs font-mono text-slate-400">
                <span>Architectural Scalability</span>
                <span aria-hidden="true">·</span>
                <span>Component Systems</span>
                <span aria-hidden="true">·</span>
                <span>AI Automation</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* CHAPTER 2: THE LEDGER — IMPACT METRICS */}
        {currentChapterIndex === 2 && (
          <motion.div
            key="chapter-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-5xl pointer-events-auto"
          >
            <div className="mb-6 text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-500">
                03 · The Ledger
              </span>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white">
                Empirical Engineering Impact
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Spatial Effect: Data operations observatory with benchmark telemetry towers & live level meters
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {LEDGER_METRICS.map((metric, idx) => (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="rounded-xl border border-white/10 bg-[#0b0b10]/85 p-5 backdrop-blur-md shadow-xl hover:border-amber-500/40 transition-colors"
                >
                  <div
                    className="font-mono text-3xl sm:text-4xl font-extrabold tabular-nums tracking-tight"
                    style={{ color: accent }}
                  >
                    {metric.value}
                  </div>
                  <div className="mt-1 font-display text-sm font-semibold text-white">
                    {metric.label}
                  </div>
                  <div className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {metric.subtext}
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/[0.06] text-[11px] text-slate-400 font-mono">
                    {metric.context}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CHAPTER 3: THE ARCHIVE — EXPERIENCE */}
        {currentChapterIndex === 3 && (
          <motion.div
            key="chapter-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-4xl pointer-events-auto"
          >
            <div className="mb-4 text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-500">
                04 · The Archive
              </span>
              <h2 className="mt-1 font-display text-2xl font-bold text-white">
                Production History & Architecture
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Spatial Effect: Modern collaborative tech company office & working engineering teams with terminal consoles
              </p>
            </div>

            {/* Interactive pillar selector */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {ARCHIVE_EXPERIENCES.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => setSelectedRole(exp.id)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-mono transition-all ${
                    selectedRole === exp.id
                      ? 'bg-amber-500/20 border border-amber-500 text-white'
                      : 'bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {exp.company}
                </button>
              ))}
            </div>

            {/* Active Role Card */}
            {(() => {
              const current =
                ARCHIVE_EXPERIENCES.find((e) => e.id === selectedRole) ||
                ARCHIVE_EXPERIENCES[0];
              return (
                <div className="rounded-2xl border border-white/10 bg-[#0c0c12]/90 p-6 backdrop-blur-md shadow-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/10 pb-4">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">
                        {current.role}
                      </h3>
                      <div className="mt-0.5 font-mono text-xs text-amber-400">
                        {current.company} · {current.location}
                      </div>
                    </div>
                    <div className="font-mono text-xs text-slate-400">
                      {current.period} ({current.duration})
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-300">
                    {current.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 pt-4 border-t border-white/[0.08] flex flex-wrap gap-1.5">
                    {current.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-white/[0.05] px-2 py-0.5 font-mono text-[11px] text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* CHAPTER 4: THE GRID — SKILLS */}
        {currentChapterIndex === 4 && (
          <motion.div
            key="chapter-4"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-4xl pointer-events-auto"
          >
            <div className="mb-4 text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-500">
                05 · The Grid
              </span>
              <h2 className="mt-1 font-display text-2xl font-bold text-white">
                Languages, Frameworks & System Architecture
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Spatial Effect: High-luminance circuit grid with central highlighted Languages & Frameworks processing nodes
              </p>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedSkillCategory(idx)}
                  className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-mono transition-all ${
                    selectedSkillCategory === idx
                      ? 'bg-amber-500/25 border border-amber-500 text-white shadow-lg shadow-amber-500/20'
                      : cat.isHighlighted
                      ? 'bg-amber-500/10 border border-amber-500/40 text-amber-200 hover:text-white hover:border-amber-400'
                      : 'bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.isHighlighted && <Sparkles className="h-3 w-3 text-amber-400" />}
                  <span>{cat.name}</span>
                  {cat.isHighlighted && (
                    <span className="ml-1 rounded bg-amber-500/30 px-1.5 py-0.2 text-[9px] font-bold text-amber-300">
                      CORE
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Skills Panel */}
            <div className="rounded-2xl border border-white/10 bg-[#0c0c12]/90 p-6 backdrop-blur-md shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="font-display font-semibold text-white flex items-center gap-2">
                  {SKILL_CATEGORIES[selectedSkillCategory].isHighlighted && (
                    <Sparkles className="h-4 w-4 text-amber-400" />
                  )}
                  {SKILL_CATEGORIES[selectedSkillCategory].name}
                </span>
                {SKILL_CATEGORIES[selectedSkillCategory].isHighlighted ? (
                  <span className="font-mono text-xs text-amber-400 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                    Highlighted Core Specialization
                  </span>
                ) : (
                  <span className="font-mono text-xs text-slate-400">
                    Production Stack
                  </span>
                )}
              </div>

              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SKILL_CATEGORIES[selectedSkillCategory].skills.map((skill) => (
                  <div
                    key={skill}
                    className={`flex items-center gap-2 rounded-lg border px-3.5 py-2.5 font-mono text-xs transition-colors ${
                      SKILL_CATEGORIES[selectedSkillCategory].isHighlighted
                        ? 'border-amber-500/40 bg-amber-500/[0.06] text-amber-100 hover:border-amber-400 hover:bg-amber-500/10'
                        : 'border-white/[0.07] bg-white/[0.02] text-slate-200 hover:border-amber-500/40 hover:bg-white/[0.05]'
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500/80" />
                    <span className="font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* CHAPTER 5: THE CIRCLE — LEADERSHIP */}
        {currentChapterIndex === 5 && (
          <motion.div
            key="chapter-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-4xl pointer-events-auto"
          >
            <div className="mb-4 text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-500">
                06 · The Circle
              </span>
              <h2 className="mt-1 font-display text-2xl font-bold text-white">
                Four Pillars of Engineering Leadership
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Spatial Effect: Executive leadership conference review with quantum gyroscope & orbiting guidance pods
              </p>
            </div>

            {/* Orbiting Pillar Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {LEADERSHIP_PRINCIPLES.map((principle, idx) => (
                <button
                  key={principle.pillar}
                  onClick={() => setSelectedLeadership(idx)}
                  className={`rounded-xl p-4 text-left border transition-all ${
                    selectedLeadership === idx
                      ? 'border-amber-500 bg-amber-500/15 text-white'
                      : 'border-white/10 bg-[#0b0b10]/80 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-display text-lg font-bold">
                    {principle.pillar}
                  </div>
                  <div className="font-mono text-xs text-amber-400/90 mt-0.5">
                    {principle.verb}
                  </div>
                </button>
              ))}
            </div>

            {/* Detail Box */}
            {(() => {
              const current = LEADERSHIP_PRINCIPLES[selectedLeadership];
              return (
                <div className="rounded-2xl border border-white/10 bg-[#0c0c12]/90 p-6 backdrop-blur-md shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-display text-lg font-bold text-white">
                      {current.pillar} — {current.subtitle}
                    </span>
                    <span className="font-mono text-xs text-amber-400">
                      {current.metrics}
                    </span>
                  </div>
                  <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                    {current.description}
                  </p>
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* CHAPTER 6: THE MARKER — EDUCATION */}
        {currentChapterIndex === 6 && (
          <motion.div
            key="chapter-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-3xl pointer-events-auto"
          >
            <div className="mb-6 text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-500">
                07 · The Marker
              </span>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white">
                Academic Foundation & Strategic Evolution
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Spatial Effect: University library study sanctuary with open computer science research books, brass lamps & optical timeline laser
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EDUCATION_TIMELINE.map((edu, idx) => (
                <div
                  key={edu.degree}
                  className="rounded-2xl border border-white/10 bg-[#0c0c12]/85 p-6 backdrop-blur-md shadow-xl"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-amber-400">
                    <span>{idx === 0 ? 'Foundation' : 'Executive Expansion'}</span>
                    <span className="text-white font-bold">{edu.year}</span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold text-white">
                    {edu.degree}
                  </h3>
                  <div className="mt-1 text-xs text-slate-300">
                    {edu.institution}
                  </div>
                  <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                    {edu.focus}
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/[0.08] text-[11px] font-mono text-amber-300/80">
                    {edu.highlight}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CHAPTER 7: THE EXIT — CONTACT */}
        {currentChapterIndex === 7 && (
          <motion.div
            key="chapter-7"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-2xl text-center pointer-events-auto"
          >
            <div className="rounded-3xl border border-white/15 bg-[#09090e]/90 p-8 sm:p-12 backdrop-blur-xl shadow-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-400">
                08 · The Exit
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Hyperlight Airlock & Convergence
              </h2>
              <p className="mx-auto mt-2 text-xs text-slate-400">
                Spatial Effect: Atmospheric fog thins while the holographic communications beacon activates
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm sm:text-base text-slate-300">
                Open to Senior / Lead Frontend roles with global teams. Relocation ready with employer sponsorship.
              </p>

              {/* Direct email display & tactile copy button */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-all hover:bg-amber-400 shadow-lg shadow-amber-500/20 whitespace-nowrap"
                >
                  <Mail className="h-4 w-4" />
                  <span>Send Direct Email</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-5 py-3 text-sm font-mono text-white transition-all hover:bg-white/[0.1] whitespace-nowrap"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>{CONTACT_INFO.email}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Contact meta indicators */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap justify-center items-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-amber-500" />
                  {CONTACT_INFO.phone}
                </span>
                <span aria-hidden="true">·</span>
                <span>{CONTACT_INFO.altPhone}</span>
                <span aria-hidden="true">·</span>
                <span>{CONTACT_INFO.location}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
