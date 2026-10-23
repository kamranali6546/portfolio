import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { education, experience, profile, projects } from '../data/portfolio';
import { EASE, Magnetic, SectionHeading } from './fx';
import { FileText, Download } from 'lucide-react';

export default function ResumeSection({ onView }: { onView: () => void }) {
  return (
    <>
      <SectionHeading kicker="The screenplay" title="The Full Story" />
      <div className="px-4 sm:px-8 lg:px-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
        {/* Left Column: Screenplay Document Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.1, ease: EASE }}
          style={{ transformPerspective: 1600 }}
        >
          <CollapsibleSheet />
        </motion.div>

        {/* Right Sticky Sidebar */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-serif text-3xl italic leading-tight text-[#f4f1ec]">
            Every episode, on one page.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#a7a6ad] font-sans">
            Education, 4 progressive roles, 13 productions, verified metrics — view the complete
            production notes or take a copy with you.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <Magnetic className="w-full">
              <button
                type="button"
                onClick={onView}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#f4f1ec] px-6 text-[15px] font-bold text-[#07070a] transition hover:bg-white shadow-lg"
              >
                <FileText className="w-4 h-4 text-[#ff3d5a]" />
                <span>View Full Screenplay</span>
              </button>
            </Magnetic>

            <Magnetic className="w-full">
              <a
                href={profile.resumePdf}
                download="Kamran_Ali_CV.pdf"
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md px-6 text-[15px] font-semibold text-[#f4f1ec] bg-white/10 border border-white/20 transition hover:bg-white/20 backdrop-blur-md"
              >
                <Download className="w-4 h-4 text-[#8FD9BE]" />
                <span>Download Resume (PDF)</span>
              </a>
            </Magnetic>
          </div>

          <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-white/10 text-center">
            {[
              { v: '6+', k: 'Years' },
              { v: String(projects.length), k: 'Originals' },
              { v: '95%', k: 'Rating' },
            ].map((s) => (
              <div key={s.k} className="bg-[#0e0e13] px-2 py-4">
                <dd className="font-display text-3xl leading-none text-[#f4f1ec]">{s.v}</dd>
                <dt className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6d6c75] font-mono">
                  {s.k}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
}

function CollapsibleSheet() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div
        className={`overflow-hidden transition-[max-height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:max-h-none ${
          open ? 'max-h-[4000px]' : 'max-h-[580px]'
        }`}
      >
        <ResumeSheet />
      </div>
      {!open && (
        <div className="absolute inset-x-0 bottom-0 flex h-48 items-end justify-center rounded-b-2xl bg-gradient-to-t from-[#07070a] via-[#07070a]/85 to-transparent pb-4 md:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-full px-6 py-2.5 text-sm font-semibold text-[#f4f1ec] bg-white/10 border border-white/20 backdrop-blur-md"
          >
            Read the full screenplay ↓
          </button>
        </div>
      )}
    </div>
  );
}

function H({ children }: { children: string }) {
  return (
    <h4 className="mb-3 mt-7 border-b border-white/10 pb-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff3d5a] first:mt-0 font-mono">
      {children}
    </h4>
  );
}

export function ResumeSheet() {
  return (
    <article className="relative overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#121218,#0c0c11)] p-6 ring-1 ring-white/10 sm:p-10 shadow-2xl">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff3d5a]/70 to-transparent"
      />

      <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <p className="text-[10px] font-bold tracking-[0.34em] text-[#6d6c75] font-mono">STARRING</p>
          <h3 className="mt-1 font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[0.9] tracking-wide text-[#f4f1ec]">
            {profile.fullName}
          </h3>
          <p className="font-serif italic text-sm text-[#a7a6ad] mt-1">{profile.role}</p>
        </div>
        <div className="text-xs leading-relaxed text-[#a7a6ad] font-mono sm:text-right">
          <a href={`mailto:${profile.email}`} className="block hover:text-[#f4f1ec]">
            {profile.email}
          </a>
          <p className="text-[11px] text-[#8FD9BE]">
            +92 346 8051600 · WhatsApp: +995 568 772 744
          </p>
          <div className="mt-1 flex items-center gap-2 sm:justify-end">
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#8FD9BE]">
              LinkedIn ↗
            </a>
            <span>·</span>
            <a href={profile.links.whatsapp} target="_blank" rel="noreferrer" className="hover:text-[#8FD9BE]">
              WhatsApp ↗
            </a>
          </div>
        </div>
      </header>

      <div className="grid gap-x-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <H>Work Experience</H>
          {experience.map((x) => (
            <div key={x.company} className="mb-6">
              <div className="flex flex-wrap justify-between gap-x-3">
                <p className="text-sm font-semibold text-[#f4f1ec]">
                  {x.company} — <span className="font-normal text-[#8FD9BE]">{x.role}</span>
                </p>
                <p className="text-xs text-[#6d6c75] font-mono">{x.period}</p>
              </div>
              <p className="text-[11px] text-[#a7a6ad] font-mono mb-2">{x.place}</p>
              <ul className="mt-1 space-y-1.5">
                {x.points.map((p, idx) => (
                  <li key={idx} className="flex gap-2 text-xs leading-relaxed text-[#a7a6ad] font-sans">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#ff3d5a]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <H>Education</H>
          {education.map((e) => (
            <div key={e.school} className="mb-4">
              <div className="flex flex-wrap justify-between gap-x-3">
                <p className="text-sm font-semibold text-[#f4f1ec]">{e.school}, {e.place}</p>
                <p className="text-xs text-[#6d6c75] font-mono">{e.period}</p>
              </div>
              <p className="text-xs text-[#a7a6ad]">{e.degree}</p>
            </div>
          ))}
        </div>

        <div>
          <H>Key Productions</H>
          {projects.slice(0, 6).map((p) => (
            <div key={p.id} className="mb-3.5">
              <div className="flex flex-wrap justify-between gap-x-2">
                <p className="text-sm font-semibold text-[#f4f1ec]">{p.title}</p>
                <p className="text-xs text-[#6d6c75] font-mono">{p.year}</p>
              </div>
              <p className="text-xs text-[#8FD9BE] font-mono">{p.stack.slice(0, 3).join(', ')}</p>
            </div>
          ))}

          <H>Core Standards</H>
          <ul className="space-y-2 text-xs text-[#a7a6ad] font-sans">
            <li>· Server-Side Rendering (SSR) &amp; Edge Delivery</li>
            <li>· WCAG 2.2 AA Accessibility &amp; Keyboard Flow</li>
            <li>· Fluid Typography &amp; Zero Cumulative Layout Shift</li>
            <li>· AI-Assisted Architecture (Claude, Cursor, Copilot, Gemini)</li>
          </ul>
        </div>
      </div>
    </article>
  );
}
