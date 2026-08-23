import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Briefcase, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Quote, 
  GraduationCap,
  Users2,
  Languages,
  Award,
  Sparkles,
  Zap
} from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { experience, testimonials, profile } = usePortfolio();

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-14">
      {/* Section Header */}
      <div className="pb-6 border-b border-neutral-800">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
          <Briefcase className="w-4 h-4" />
          <span>Career Trajectory</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-100 tracking-tight mt-1.5">
          Engineering Leadership & Experience
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
          4+ years architecting high-performance enterprise frontends, leading cross-functional engineering pods, and shipping high-conversion applications.
        </p>
      </div>

      {/* Main Timeline Grid with Animated Cable Accent */}
      <div className="relative space-y-8 pl-4 sm:pl-8 border-l-2 border-indigo-500/30">
        {(experience || []).map((exp, idx) => (
          <div
            key={exp.id}
            className="group relative p-6 sm:p-7 rounded-3xl bg-neutral-900/80 border border-neutral-800/90 hover:border-indigo-500/50 transition-all duration-300 flex flex-col gap-4 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-1"
          >
            {/* Timeline Pulsing Beacon Dot */}
            <div className="absolute -left-[25px] sm:-left-[41px] top-8 w-4 h-4 rounded-full bg-indigo-600 border-4 border-neutral-950 shadow-md shadow-indigo-500/50 group-hover:scale-125 transition-transform" />

            {/* Top Row: Role, Company, Period */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-base sm:text-xl font-bold text-neutral-100 group-hover:text-indigo-300 transition-colors">
                    {exp.role}
                  </h3>
                  {exp.badge && (
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40">
                      {exp.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-indigo-300 font-medium mt-1">
                  <span className="font-semibold text-neutral-200">{exp.company}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-neutral-400">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{exp.location}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 bg-neutral-950 px-3.5 py-1.5 rounded-xl border border-neutral-800 self-start sm:self-auto">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>{exp.period}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {exp.description}
            </p>

            {/* Achievements Bullet List */}
            <div className="space-y-2 pt-1">
              <h4 className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Key Deliverables & Verified Impact:</span>
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                {(exp.achievements || []).map((ach, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-neutral-300 leading-relaxed">{ach}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-800/80">
              {(exp.techStack || []).map(tech => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-neutral-950 text-neutral-300 border border-neutral-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Leadership & Collaboration Grid */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
          <Users2 className="w-4 h-4" />
          <span>Engineering Leadership & Culture</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(profile?.leadership || []).map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800/80 space-y-1.5 hover:border-neutral-700 transition-colors">
              <h4 className="text-xs font-bold text-neutral-200">{item.title}</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education & Languages Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Education */}
        <div className="p-6 rounded-3xl bg-neutral-900/70 border border-neutral-800 space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Background</span>
          </div>
          <div className="space-y-4">
            {(profile?.education || []).map((edu, idx) => (
              <div key={idx} className="space-y-1 border-l-2 border-indigo-500/40 pl-3.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-neutral-100">{edu.degree}</h4>
                  <span className="text-xs font-mono text-neutral-400">{edu.year}</span>
                </div>
                <p className="text-xs text-neutral-400">{edu.institution}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Languages & Work Permit */}
        <div className="p-6 rounded-3xl bg-neutral-900/70 border border-neutral-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Languages className="w-4 h-4" />
              <span>Languages & Mobility</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(profile?.languages || []).map((lang, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800/80">
                  <div className="text-xs font-bold text-neutral-200">{lang.name}</div>
                  <div className="text-[11px] text-indigo-400 font-mono">{lang.level}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-neutral-300">
            <div className="font-semibold text-indigo-300">Global Relocation</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">{profile.relocationStatus}</div>
          </div>
        </div>
      </div>

      {/* Peer & Executive Testimonials Strip */}
      <div className="space-y-4 pt-6">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
          <Quote className="w-4 h-4" />
          <span>Peer Endorsements</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(testimonials || []).map(t => (
            <div
              key={t.id}
              className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 flex flex-col justify-between gap-4 hover:border-indigo-500/40 transition-all hover:scale-[1.02]"
            >
              <p className="text-xs text-neutral-300 italic leading-relaxed">
                "{t.quote}"
              </p>

              <div className="pt-3 border-t border-neutral-800/80">
                <h4 className="text-xs font-bold text-neutral-200">{t.name}</h4>
                <p className="text-[11px] text-indigo-300">{t.role} • {t.company}</p>
                <p className="text-[10px] text-neutral-500 mt-0.5">{t.relation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
