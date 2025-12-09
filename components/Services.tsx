import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SERVICES } from '../constants';
import { Service } from '../types';

export const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgTextRef = useRef<HTMLSpanElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Parallax State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 1. Staggered Entrance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              cardsRef.current,
              { y: 100, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out',
                overwrite: 'auto',
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // 2. Horizontal Sticky Header Logic
    const updateHeaderPosition = () => {
        if (!containerRef.current || !headerRef.current) return;
        
        const sectionRect = containerRef.current.getBoundingClientRect();
        
        // Calculate how far the section has moved left
        let x = -sectionRect.left;

        // Clamp values
        if (x < 0) x = 0;
        
        // Limit
        const headerWidth = headerRef.current.offsetWidth;
        const limit = sectionRect.width - headerWidth;
        
        if (x > limit) x = limit;

        gsap.set(headerRef.current, { x });
    };
    
    gsap.ticker.add(updateHeaderPosition);

    return () => {
        observer.disconnect();
        gsap.ticker.remove(updateHeaderPosition);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 50;
      const y = (e.clientY / window.innerHeight - 0.5) * 50;
      setMousePos({ x, y });

      if (bgTextRef.current) {
          gsap.to(bgTextRef.current, {
              x: x * -1, // Invert for depth
              y: y * -1,
              duration: 1,
              ease: "power2.out"
          });
      }
  };

  return (
    <section 
        ref={containerRef} 
        onMouseMove={handleMouseMove}
        className="horizontal-panel h-screen flex-shrink-0 flex items-center relative border-r border-zinc-200 dark:border-zinc-900/50 md:w-screen overflow-hidden bg-transparent"
    >
      {/* HEADER for Mobile & Desktop (Sticky) */}
      <div 
        ref={headerRef}
        className="absolute top-0 left-0 w-screen z-50 pointer-events-none md:hidden"
      >
         <div className="bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md p-4 rounded-b-2xl border-b border-zinc-200 dark:border-zinc-800/50 shadow-2xl mx-4 mt-2 inline-block min-w-[200px]">
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-2">What I Do</h2>
            <div className="h-1 w-12 bg-fuchsia-600 dark:bg-fuchsia-500 mb-2"></div>
            <p className="text-zinc-600 dark:text-zinc-400 text-xs">Scroll right to explore services →</p>
         </div>
      </div>

      <div className="flex h-full w-max md:w-full md:block pointer-events-none z-10">
          
          {/* Mobile Flow Container */}
          <div className="flex md:hidden h-full items-center px-4 gap-6 pointer-events-auto pt-24">
             {SERVICES.map((service: Service, index) => (
                <div key={service.id} className="w-[85vw] h-[50vh] flex-shrink-0">
                     <ServiceCard 
                        service={service} 
                        index={index} 
                        ref={(el) => { cardsRef.current[index] = el }}
                        isMobile={true}
                    />
                </div>
             ))}
             {/* Spacer for end of scroll */}
             <div className="w-8"></div>
          </div>

          {/* Desktop Grid Container */}
          <div className="hidden md:flex container mx-auto px-6 h-full flex-col justify-center relative z-10 pointer-events-auto">
            <div className="mb-8 md:mb-12 relative">
                <span 
                    ref={bgTextRef}
                    className="text-9xl font-display font-bold text-zinc-100 dark:text-zinc-900 absolute top-20 right-20 pointer-events-none select-none -z-10 opacity-100 transition-colors duration-500"
                >
                    WHAT
                </span>
                <h2 className="text-6xl font-display font-bold text-zinc-900 dark:text-white mb-6 transition-colors duration-500">What I Do</h2>
                <div className="h-1 w-20 bg-fuchsia-600 dark:bg-fuchsia-500"></div>
            </div>
            
            <div className="grid grid-cols-4 gap-6">
                {SERVICES.map((service: Service, index) => (
                    <ServiceCard 
                        key={service.id} 
                        service={service} 
                        index={index} 
                        ref={(el) => { cardsRef.current[index] = el }}
                        isMobile={false}
                    />
                ))}
            </div>
          </div>
      </div>
    </section>
  );
};

const ServiceCard = React.forwardRef<HTMLDivElement, { service: Service; index: number; isMobile: boolean }>(({ service, index, isMobile }, ref) => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMobile) return; 

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        setRotation({ x: rotateX, y: rotateY });
        setGlowPos({
            x: (x / rect.width) * 100,
            y: (y / rect.height) * 100
        });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    return (
        <div 
            ref={ref}
            className="group relative perspective-1000 h-full w-full"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div 
                className="relative h-full p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md flex flex-col justify-center transition-transform duration-100 ease-linear shadow-lg dark:shadow-xl overflow-hidden rounded-sm"
                style={{
                    transform: isMobile ? 'none' : `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)`,
                    transformStyle: 'preserve-3d'
                }}
            >
                <div 
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
                    style={{
                        background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(34, 211, 238, 0.4), transparent 60%)`
                    }}
                />

                <div className="mb-4 md:mb-6 text-cyan-600 dark:text-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity transform translate-z-10 group-hover:translate-z-20 duration-300">
                    <div className="w-10 h-10 border border-current flex items-center justify-center rounded-full text-base font-medium">
                        0{index + 1}
                    </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white mb-3 uppercase tracking-wide group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors transform translate-z-0 group-hover:translate-z-10 duration-300">
                    {service.title}
                </h3>
                
                <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed transform translate-z-0 group-hover:translate-z-5 duration-300">
                    {service.desc}
                </p>

                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 group-hover:w-full transition-all duration-500 ease-out" />
            </div>
        </div>
    );
});