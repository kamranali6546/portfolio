import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE, SectionHeading } from './fx';
import { skills as skillCategories } from '../content/skills';

const HUES = ['#8FD9BE', '#4cc9ff', '#ff3d5a', '#C9A56A', '#c084fc', '#38bdf8', '#a3e635', '#f472b6'];

export default function Skills() {
  const [active, setActive] = useState(0);
  const category = skillCategories[active];
  const hue = HUES[active % HUES.length];

  return (
    <>
      <SectionHeading
        kicker={`${skillCategories.length} Disciplines`}
        title="Technical Specifications"
        aside={
          <p className="max-w-xs text-sm text-[#a7a6ad] font-sans">
            Cast and technical specs from six years of production systems.
          </p>
        }
      />

      <div className="px-4 sm:px-8 lg:px-12 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12">
        {/* Category Selector Buttons */}
        <div className="rail flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible" role="tablist">
          {skillCategories.map((c, i) => {
            const isSel = i === active;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={isSel}
                type="button"
                onClick={() => setActive(i)}
                className={`relative flex items-center justify-between rounded-xl px-4 py-3 text-left transition focus:outline-none ${
                  isSel ? 'text-[#f4f1ec]' : 'text-[#a7a6ad] hover:text-[#f4f1ec]'
                }`}
              >
                {isSel && (
                  <motion.span
                    layoutId="skills-cat-bg"
                    className="absolute inset-0 rounded-xl bg-white/10 ring-1 ring-white/15 backdrop-blur-md"
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                )}
                <span className="relative flex items-center gap-3">
                  <span
                    className="h-2 w-2 rounded-full transition-transform"
                    style={{ background: isSel ? HUES[i % HUES.length] : '#6d6c75' }}
                  />
                  <span className="whitespace-nowrap text-sm font-semibold font-sans">{c.name}</span>
                </span>
                <span className="relative ml-2 font-mono text-[10px] text-[#6d6c75] hidden lg:inline">
                  {c.items.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skill Cards Grid */}
        <div className="min-h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={category.id}
              initial="hidden"
              animate="show"
              exit="exit"
              transition={{ staggerChildren: 0.05 }}
            >
              <motion.div
                className="mb-5 p-4 rounded-xl bg-[#0e0e13] border border-white/10"
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 }, exit: { opacity: 0 } }}
              >
                <span className="font-mono text-xs font-semibold text-[#8FD9BE] block mb-1">
                  How I apply this in production:
                </span>
                <p className="text-sm text-[#f4f1ec]/90 leading-relaxed font-sans">
                  {category.howIUseIt}
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {category.items.map((skillName) => (
                  <SkillCard key={skillName} name={skillName} hue={hue} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

function SkillCard({ name, hue }: { name: string; hue: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.button
      type="button"
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.94, filter: 'blur(6px)' },
        show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.55, ease: EASE } },
        exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
      }}
      whileHover={{ y: -5 }}
      className="group relative flex min-h-[120px] flex-col justify-between overflow-hidden rounded-xl bg-[#0e0e13] p-4 text-left ring-1 ring-white/10 transition-shadow duration-500 hover:ring-white/30 focus:outline-none"
      style={{ boxShadow: open ? `0 18px 50px -12px ${hue}55, 0 0 0 1px ${hue}66` : undefined }}
    >
      <div
        aria-hidden="true"
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition duration-500 group-hover:opacity-40"
        style={{ background: hue }}
      />

      <span
        className="relative flex h-10 w-10 items-center justify-center rounded-lg font-mono text-xs font-bold"
        style={{ background: `${hue}22`, color: hue, boxShadow: `inset 0 0 0 1px ${hue}55` }}
        aria-hidden="true"
      >
        {name.slice(0, 2).toUpperCase()}
      </span>

      <span className="relative mt-3 text-sm font-semibold text-[#f4f1ec] font-sans">
        {name}
      </span>
    </motion.button>
  );
}
