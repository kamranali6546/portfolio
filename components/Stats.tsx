import React, { useLayoutEffect, useRef } from 'react';
import { STATS } from '../constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Stats: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Count up animation
            gsap.from(".stat-value", {
                innerText: 0,
                duration: 2,
                snap: { innerText: 1 },
                stagger: 0.2,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 70%"
                }
            });

            // Parallax Effect
            gsap.to(containerRef.current, {
                y: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });

        }, ref);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={ref} className="w-full relative bg-transparent py-20 md:py-32 z-20 border-t border-b border-zinc-200 dark:border-zinc-900 overflow-hidden">
             
             {/* Background Glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-cyan-100/40 dark:bg-cyan-900/10 blur-[100px] pointer-events-none z-0"></div>

            <div className="container mx-auto px-6 relative z-10" ref={containerRef}>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-12 text-center">
                    {STATS.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center group">
                            <span className="text-6xl md:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-800 transition-transform duration-500 group-hover:scale-110">
                                <span className="stat-value">{stat.value}</span>+
                            </span>
                            <span className="text-cyan-600 dark:text-cyan-400 font-mono mt-2 md:mt-4 uppercase tracking-widest text-xs md:text-sm relative">
                                <span className="absolute -left-4 top-1/2 w-2 h-px bg-cyan-600/50 dark:bg-cyan-400/50 hidden md:block"></span>
                                {stat.label}
                                <span className="absolute -right-4 top-1/2 w-2 h-px bg-cyan-600/50 dark:bg-cyan-400/50 hidden md:block"></span>
                            </span>
                        </div>
                    ))}
                 </div>
            </div>
        </section>
    );
};