import React, { useLayoutEffect, useRef } from 'react';
import { EXPERIENCE, EDUCATION } from '../constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Experience: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        // Entrance animations for items
        const items = gsap.utils.toArray('.timeline-item');
        items.forEach((item: any) => {
            gsap.from(item, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Parallax Title
        if (titleRef.current) {
            gsap.to(titleRef.current, {
                y: 100,
                ease: "none",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        }

        // Parallax Line (moves slightly faster than scroll)
        if (lineRef.current) {
            gsap.to(lineRef.current, {
                y: 50,
                ease: "none",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        }

    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="w-full relative bg-transparent py-20 md:py-32 z-20 border-t border-b border-zinc-200 dark:border-zinc-900 overflow-hidden">
      
      <div ref={lineRef} className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-300 dark:via-zinc-800 to-transparent -translate-x-1/2 hidden md:block z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-24 relative z-10">
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 tracking-widest uppercase mb-2 md:mb-4 block">Professional Journey</span>
          <h2 ref={titleRef} className="text-4xl md:text-7xl font-display font-bold text-zinc-900 dark:text-white relative inline-block transition-colors duration-500">
            Experience
            <span className="absolute -top-6 -right-6 md:-top-10 md:-right-10 text-6xl md:text-9xl text-zinc-200 dark:text-zinc-800 opacity-20 pointer-events-none hidden md:block select-none transition-colors duration-500">EXP</span>
          </h2>
        </div>

        <div className="space-y-12 md:space-y-24">
          {EXPERIENCE.map((exp, index) => (
            <div key={exp.id} className={`timeline-item flex flex-col md:flex-row items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} gap-6 md:gap-16`}>
              
              {/* Text Side */}
              <div className={`w-full md:w-1/2 text-center flex flex-col items-center ${index % 2 === 1 ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
                  <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-1 transition-colors duration-500">{exp.company}</h3>
                  <div className="flex flex-wrap items-center gap-2 mb-4 justify-center md:justify-start">
                     <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono font-bold uppercase text-xs md:text-sm tracking-wider">{exp.role}</span>
                     <span className="text-zinc-400 hidden md:inline">|</span>
                     <span className="text-zinc-500 text-xs md:text-sm block w-full md:w-auto">{exp.location}</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 max-w-sm leading-relaxed text-sm md:text-base px-2 md:px-0 transition-colors duration-500">
                    {exp.desc}
                  </p>
              </div>

              {/* Center Dot */}
              <div className="relative z-10 flex-shrink-0 order-first md:order-none mb-4 md:mb-0">
                <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-white dark:bg-black border-4 border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.6)] z-20 relative"></div>
                <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-50"></div>
              </div>

              {/* Date Side */}
              <div className={`w-full md:w-1/2 text-center flex flex-col items-center ${index % 2 === 1 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
                  <span className="text-4xl md:text-7xl font-display font-bold text-zinc-200 dark:text-zinc-800 opacity-60 transition-colors duration-500">
                    {exp.period.split(' ')[2] || exp.period.split(' ')[1]}
                  </span>
                  <span className="text-cyan-600/80 dark:text-cyan-500/80 font-mono text-xs md:text-sm uppercase tracking-widest mt-2">{exp.period}</span>
              </div>
            </div>
          ))}

          {/* Education Block */}
          <div className="timeline-item flex flex-col items-center pt-8 md:pt-12 border-t border-zinc-200 dark:border-zinc-900 md:border-none mt-12 md:mt-0">
             <div className="relative z-10 w-3 h-3 md:w-4 md:h-4 rounded-full bg-zinc-300 dark:bg-zinc-700 mb-6 md:mb-8 hidden md:block"></div>
             <h3 className="text-2xl font-bold text-zinc-900 dark:text-white text-center mb-6 transition-colors duration-500">Education</h3>
             {EDUCATION.map((edu, idx) => (
                <div key={idx} className="text-center p-6 border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/30 rounded-lg backdrop-blur-sm w-full max-w-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-300 shadow-sm">
                   <h4 className="text-zinc-900 dark:text-white font-bold text-lg">{edu.school}</h4>
                   <p className="text-cyan-600 dark:text-cyan-400 text-sm mb-2">{edu.degree}</p>
                   <p className="text-zinc-500 text-xs font-mono">{edu.period} • {edu.grade}</p>
                </div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
};