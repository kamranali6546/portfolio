import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { sound } from '../utils/audio';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  FileText, 
  Mail, 
  MapPin, 
  Phone,
  Globe2,
  Briefcase,
  GraduationCap,
  Sparkles
} from 'lucide-react';

export const ResumeModal: React.FC = () => {
  const { isResumeOpen, setIsResumeOpen, profile, experience, skills, showToast } = usePortfolio();
  const [copiedMd, setCopiedMd] = useState(false);

  if (!isResumeOpen) return null;

  const handlePrint = () => {
    sound.playClick(800);
    window.print();
  };

  const generateMarkdownResume = () => {
    const bioText = Array.isArray(profile?.bio) ? profile.bio.join('\n\n') : '';
    const leadershipText = (profile?.leadership || []).map(l => `- **${l.title}:** ${l.desc}`).join('\n');
    const educationText = (profile?.education || []).map(e => `- **${e.degree}** (${e.year}) — ${e.institution}`).join('\n');
    const languagesText = (profile?.languages || []).map(lang => `- **${lang.name}:** ${lang.level}`).join('\n');
    const expText = (experience || []).map(exp => `### ${exp.role} | ${exp.company}
*${exp.period} | ${exp.location}*
${exp.description}

Key Milestones:
${(exp.achievements || []).map(a => `- ${a}`).join('\n')}

Tech Stack: ${(exp.techStack || []).join(', ')}
`).join('\n\n');

    return `# ${profile.name}
**${profile.title} · ${profile.subtitle}**
${profile.location} | ${profile.phone} | ${profile.email} | GitHub: ${profile.github} | LinkedIn: ${profile.linkedin}
*${profile.relocationStatus}*

---

## PROFESSIONAL SUMMARY
${bioText}

---

## KEY ACHIEVEMENTS
- Cut production bugs by 90% by championing a rigorous peer code-review culture across engineering teams.
- Sustained a 95% client satisfaction rate while architecting and leading core product interfaces for a 4+ year enterprise engagement.
- Drove an 80% increase in mobile traffic through systematic responsive redesign across an entire product suite.
- Improved page load times by up to 45% and lifted SEO rankings by 25% through architecture-level performance optimization.

---

## CORE EXPERTISE
- **Core Languages:** JavaScript (ES6+), TypeScript, HTML5, CSS3
- **Frameworks & Runtime:** React.js, Next.js (App Router & RSC), Node.js, Express.js
- **Frontend Architecture:** Micro-frontends, Monorepos (Turborepo/Nx), Component-Driven Design, Design Systems, Atomic Design, Domain-Driven Structuring
- **State & Data Layer:** Redux Toolkit, Zustand, Context API, TanStack Query, REST APIs, GraphQL
- **UI Systems & Styling:** Tailwind CSS, CSS Modules, Styled-Components, Sass, Material-UI, Shadcn UI, Radix UI, Storybook
- **Motion & Graphics:** GSAP, Framer Motion, AOS, Canvas, SVG Animation
- **Testing & Quality:** Jest, React Testing Library, Cypress, Playwright, ESLint, Prettier
- **Performance & Accessibility:** Core Web Vitals, Lighthouse, Code-Splitting, Lazy Loading, WCAG/ARIA Compliance
- **AI & LLM Integration:** Vercel AI SDK, LangChain, RAG Pipelines, Prompt Engineering, AI-Assisted Development (Claude, Cursor, Antigravity, GitHub Copilot, v0, Gemini, ChatGPT)
- **Tooling & Build Systems:** Vite, Webpack, pnpm/npm/yarn, Figma, Adobe XD
- **DevOps & Cloud:** Git, GitHub Actions, CI/CD, Vercel, Firebase, AWS (S3/CloudFront/Amplify), Heroku, Docker
- **Delivery & Leadership:** Agile/Scrum, Project Management, Jira, Cross-Functional Collaboration, Mentorship

---

## PROFESSIONAL EXPERIENCE
${expText}

---

## LEADERSHIP & COLLABORATION
${leadershipText}

---

## EDUCATION
${educationText}

---

## LANGUAGES
${languagesText}
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdownResume());
    setCopiedMd(true);
    sound.playClick(850);
    showToast('Copied full markdown resume to clipboard!', 'success');
    setTimeout(() => setCopiedMd(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none overflow-y-auto">
      <div className="w-full max-w-4xl rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden flex flex-col my-6 max-h-[92vh]">
        {/* Header Bar */}
        <div className="p-4 border-b border-neutral-800 bg-neutral-950/90 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold text-neutral-100">{profile.name} — Resume (CV)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
            >
              {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedMd ? 'Copied MD' : 'Copy Markdown'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={() => { sound.playClick(600); setIsResumeOpen(false); }}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Canvas */}
        <div className="p-8 sm:p-12 overflow-y-auto bg-neutral-950 text-neutral-200 space-y-7 font-sans print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b border-neutral-800 print:border-neutral-300 pb-5 space-y-1.5">
            <h1 className="text-3xl font-extrabold text-neutral-100 print:text-black tracking-tight uppercase">
              {profile.name}
            </h1>
            <p className="text-sm font-bold text-indigo-400 print:text-indigo-900 font-mono">
              {profile.title} · <span className="text-neutral-300 print:text-neutral-700 font-normal">{profile.subtitle}</span>
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 print:text-neutral-700 pt-1">
              <span>{profile.location}</span>
              <span>•</span>
              <span>{profile.phone}</span>
              <span>•</span>
              <span>{profile.email}</span>
              <span>•</span>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-indigo-400 print:text-indigo-800 hover:underline">LinkedIn</a>
              <span>•</span>
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-indigo-400 print:text-indigo-800 hover:underline">GitHub</a>
            </div>
            <p className="text-[11px] font-mono text-emerald-400 print:text-emerald-800 pt-0.5">
              {profile.relocationStatus}
            </p>
          </div>

          {/* Professional Summary */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold text-indigo-400 print:text-indigo-900 uppercase tracking-wider">
              Professional Summary
            </h2>
            <p className="text-xs leading-relaxed text-neutral-300 print:text-neutral-800">
              {Array.isArray(profile?.bio) ? profile.bio.join(' ') : ''}
            </p>
          </div>

          {/* Key Achievements */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold text-indigo-400 print:text-indigo-900 uppercase tracking-wider">
              Key Achievements
            </h2>
            <ul className="list-disc list-inside space-y-1 text-xs text-neutral-300 print:text-neutral-800">
              <li>Cut production bugs by <strong>90%</strong> by championing a rigorous peer code-review culture across engineering teams.</li>
              <li>Sustained a <strong>95%</strong> client satisfaction rate while architecting and leading core product interfaces for a 4+ year enterprise engagement.</li>
              <li>Drove an <strong>80%</strong> increase in mobile traffic through systematic responsive redesign across an entire product suite.</li>
              <li>Improved page load times by up to <strong>45%</strong> and lifted SEO rankings by <strong>25%</strong> through architecture-level performance optimization.</li>
            </ul>
          </div>

          {/* Core Expertise Matrix */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-indigo-400 print:text-indigo-900 uppercase tracking-wider">
              Core Expertise
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-neutral-900/60 print:bg-neutral-100 border border-neutral-800 print:border-neutral-300">
                <span className="font-bold text-neutral-200 print:text-neutral-900">Core Languages: </span>
                <span className="text-neutral-400 print:text-neutral-700">JavaScript (ES6+), TypeScript, HTML5, CSS3</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-900/60 print:bg-neutral-100 border border-neutral-800 print:border-neutral-300">
                <span className="font-bold text-neutral-200 print:text-neutral-900">Frameworks & Runtime: </span>
                <span className="text-neutral-400 print:text-neutral-700">React.js, Next.js (App Router & RSC), Node.js, Express.js</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-900/60 print:bg-neutral-100 border border-neutral-800 print:border-neutral-300">
                <span className="font-bold text-neutral-200 print:text-neutral-900">Frontend Architecture: </span>
                <span className="text-neutral-400 print:text-neutral-700">Micro-frontends, Monorepos (Turborepo/Nx), Component-Driven Design, Design Systems, Atomic Design</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-900/60 print:bg-neutral-100 border border-neutral-800 print:border-neutral-300">
                <span className="font-bold text-neutral-200 print:text-neutral-900">State & Data Layer: </span>
                <span className="text-neutral-400 print:text-neutral-700">Redux Toolkit, Zustand, Context API, TanStack Query, REST APIs, GraphQL</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-900/60 print:bg-neutral-100 border border-neutral-800 print:border-neutral-300">
                <span className="font-bold text-neutral-200 print:text-neutral-900">UI Systems & Motion: </span>
                <span className="text-neutral-400 print:text-neutral-700">Tailwind CSS, Shadcn UI, Radix UI, Material-UI, Storybook, GSAP, Framer Motion, Canvas</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-900/60 print:bg-neutral-100 border border-neutral-800 print:border-neutral-300">
                <span className="font-bold text-neutral-200 print:text-neutral-900">AI & LLM Integration: </span>
                <span className="text-neutral-400 print:text-neutral-700">Vercel AI SDK, LangChain, RAG Pipelines, Prompt Engineering, Claude, Cursor, Copilot, v0, Gemini</span>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="space-y-6">
            <h2 className="text-xs font-bold text-indigo-400 print:text-indigo-900 uppercase tracking-wider">
              Professional Experience
            </h2>
            {(experience || []).map(exp => (
              <div key={exp.id} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-bold">
                  <span className="text-neutral-100 print:text-black">{exp.role} | <span className="text-indigo-300 print:text-indigo-800">{exp.company}</span></span>
                  <span className="font-mono text-neutral-400 print:text-neutral-600 text-[11px]">{exp.period}</span>
                </div>
                <p className="text-[11px] text-neutral-400 print:text-neutral-600 italic">
                  {exp.location}
                </p>
                <p className="text-xs text-neutral-300 print:text-neutral-800 leading-relaxed">
                  {exp.description}
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs text-neutral-400 print:text-neutral-700">
                  {(exp.achievements || []).map((ach, i) => (
                    <li key={i}>{ach}</li>
                  ))}
                </ul>
                <div className="text-[10px] font-mono text-neutral-500 print:text-neutral-600 pt-0.5">
                  Tech Stack: {(exp.techStack || []).join(', ')}
                </div>
              </div>
            ))}
          </div>

          {/* Leadership & Collaboration */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-indigo-400 print:text-indigo-900 uppercase tracking-wider">
              Leadership & Collaboration
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {(profile?.leadership || []).map((l, i) => (
                <div key={i} className="p-2 rounded bg-neutral-900/40 print:bg-neutral-100 border border-neutral-800/80 print:border-neutral-300">
                  <span className="font-bold text-neutral-200 print:text-neutral-900">{l.title}: </span>
                  <span className="text-neutral-400 print:text-neutral-700">{l.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Languages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-800 print:border-neutral-300 text-xs">
            <div>
              <h3 className="font-bold text-indigo-400 print:text-indigo-900 uppercase tracking-wider mb-1">Education</h3>
              {(profile?.education || []).map((edu, idx) => (
                <div key={idx} className="mb-1">
                  <div className="font-bold text-neutral-200 print:text-black">{edu.degree} ({edu.year})</div>
                  <div className="text-neutral-400 print:text-neutral-700">{edu.institution}</div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-bold text-indigo-400 print:text-indigo-900 uppercase tracking-wider mb-1">Languages</h3>
              <div className="space-y-0.5">
                {(profile?.languages || []).map((l, idx) => (
                  <div key={idx} className="text-neutral-300 print:text-neutral-800">
                    <strong>{l.name}:</strong> {l.level}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
