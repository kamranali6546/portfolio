import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { PROJECTS } from '../constants';
import { Project } from '../types';

export const Projects: React.FC = () => {
  const [bgPos, setBgPos] = useState({ x: 0, y: 0 });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Horizontal Sticky Header Logic for Mobile
    const updateHeaderPosition = () => {
        if (!containerRef.current || !headerRef.current) return;
        
        // Only run on mobile
        if (window.innerWidth >= 768) {
            gsap.set(headerRef.current, { clearProps: "transform" });
            return;
        }

        const sectionRect = containerRef.current.getBoundingClientRect();
        let x = -sectionRect.left;

        if (x < 0) x = 0;
        
        // Header stays until section ends
        const headerWidth = headerRef.current.offsetWidth;
        const limit = sectionRect.width - headerWidth;
        
        if (x > limit) x = limit;

        gsap.set(headerRef.current, { x });
    };
    
    gsap.ticker.add(updateHeaderPosition);

    return () => {
        gsap.ticker.remove(updateHeaderPosition);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setBgPos({ x, y });

      if (titleRef.current) {
          gsap.to(titleRef.current, {
              x: x,
              y: y,
              duration: 1,
              ease: "power2.out"
          });
      }
  };

  return (
    <section 
        ref={containerRef}
        className="horizontal-panel min-w-screen h-screen flex-shrink-0 flex items-center relative overflow-hidden bg-transparent"
        onMouseMove={handleMouseMove}
    >
      {/* MOBILE STICKY HEADER */}
      <div 
        ref={headerRef}
        className="absolute top-0 left-0 w-screen z-50 md:hidden pointer-events-none"
      >
         <div className="bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md p-4 rounded-b-2xl border-b border-zinc-200 dark:border-zinc-800/50 shadow-2xl mx-4 mt-2 inline-block min-w-[200px]">
            <span className="text-cyan-600 dark:text-cyan-400 font-mono text-[10px] tracking-widest uppercase mb-1 block">Digital Showcase</span>
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white leading-none">
              Innovative Web Solutions
            </h2>
         </div>
      </div>

      <div className="flex h-full items-center px-4 md:px-24 gap-4 md:gap-24 relative z-10 pt-24 md:pt-0">
        
        {/* Title Block (Desktop Only) */}
        <div className="flex-shrink-0 w-[85vw] md:w-[30vw] h-[50vh] md:h-[60vh] flex flex-col justify-center border-l-4 border-cyan-500 pl-6 md:pl-8 hidden md:flex">
          <span className="text-cyan-600 dark:text-cyan-400 font-mono text-xs md:text-sm tracking-widest uppercase mb-4">Digital Showcase</span>
          <h2 ref={titleRef} className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-display font-bold text-zinc-900 dark:text-white leading-none transition-colors duration-500">
            Innovative<br/>Web<br/>Solutions
          </h2>
          <p className="mt-6 md:mt-8 text-zinc-600 dark:text-zinc-400 max-w-sm text-sm md:text-base transition-colors duration-500">
             A collection of high-performance web applications built for scale and user engagement.
          </p>
        </div>

        {/* Project Cards */}
        {PROJECTS.map((project: Project, index) => (
          <div key={project.id} className="group relative w-[85vw] md:w-[50vw] h-[55vh] md:h-[70vh] flex-shrink-0 overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-sm shadow-xl transition-all duration-500 hover:shadow-2xl">
             
            <div className="absolute top-4 left-4 z-20 flex gap-2">
                 <span className="px-3 py-1 bg-white/80 dark:bg-black/50 backdrop-blur text-[10px] md:text-xs font-mono text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/20">
                    0{index + 1}
                 </span>
                 <span className="px-3 py-1 bg-cyan-100/50 dark:bg-cyan-500/20 backdrop-blur text-[10px] md:text-xs font-mono text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30 uppercase">
                    {project.category}
                 </span>
            </div>

            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover opacity-90 dark:opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-black dark:via-black/50 dark:to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
              <h3 className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-display font-bold text-zinc-900 dark:text-white mb-2 md:mb-4 transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                {project.title}
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 max-w-lg text-xs md:text-base opacity-80 mb-4 md:mb-6 border-l border-zinc-400 dark:border-zinc-600 pl-4 hidden md:block">
                {project.description}
              </p>
              <p className="text-zinc-700 dark:text-zinc-300 max-w-lg text-xs opacity-80 mb-4 md:hidden line-clamp-2">
                {project.description}
              </p>
              {project.link && (
                 <a 
                   href={project.link} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-2 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-wider text-[10px] md:text-xs
                              transition-all duration-300 transform
                              hover:bg-cyan-600 dark:hover:bg-cyan-400 hover:scale-110 hover:shadow-[0_0_20px_rgba(8,145,178,0.6)] dark:hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]
                              active:scale-95"
                 >
                   View Live Site <span className="animate-pulse">↗</span>
                 </a>
              )}
            </div>
          </div>
        ))}
        
        {/* End Spacer */}
        <div className="w-[40vw] md:w-[20vw] flex items-center justify-center text-zinc-400 dark:text-zinc-800 font-display text-xl md:text-6xl font-bold opacity-30 pr-8 md:pr-12">
           More Coming Soon
        </div>
      </div>
    </section>
  );
};