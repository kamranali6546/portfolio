import React from "react";
import { profile } from "../../content/profile";
import { useMagnetic } from "../../hooks/useMagnetic";
import { useCursor } from "../../context/CursorContext";
import { HeroVisual } from "./HeroVisual";
import { ArrowDown, Mail, MapPin } from "lucide-react";

export const Hero: React.FC = () => {
  const { setCursorVariant } = useCursor();
  const workBtn = useMagnetic<HTMLAnchorElement>({ radius: 80, strength: 0.22 });
  const contactBtn = useMagnetic<HTMLAnchorElement>({ radius: 80, strength: 0.22 });

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-hairline overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Status Line (Zero-pill clean metadata with typographic separator) */}
            <div className="flex items-center gap-2 text-xs font-mono text-muted tracking-wide">
              <span className="flex items-center gap-1.5 text-accent font-medium">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Pakistan / Georgia</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>Open to relocation</span>
            </div>

            {/* Headline with line mask reveal styling */}
            <div className="overflow-hidden">
              <h1 className="display-hero text-ink">
                Kamran Ali
              </h1>
            </div>

            {/* Role line */}
            <p className="font-serif text-2xl sm:text-3xl text-muted font-normal italic">
              {profile.title}
            </p>

            {/* Positioning statement */}
            <p className="max-w-xl text-base sm:text-lg text-muted leading-relaxed">
              Architecting high-performance web applications and scalable enterprise design systems
              with React, Next.js, and TypeScript. Pioneering AI-assisted engineering workflows to
              deliver production software with uncompromising speed and measurable depth.
            </p>

            {/* CTAs with magnetic hover */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                ref={workBtn.ref}
                href="#work"
                style={{
                  transform: `translate3d(${workBtn.position.x}px, ${workBtn.position.y}px, 0)`,
                }}
                onMouseEnter={() => setCursorVariant("link")}
                onMouseLeave={() => setCursorVariant("default")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-accent text-white font-medium text-sm hover:opacity-95 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <span>View selected work</span>
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                ref={contactBtn.ref}
                href="#contact"
                style={{
                  transform: `translate3d(${contactBtn.position.x}px, ${contactBtn.position.y}px, 0)`,
                }}
                onMouseEnter={() => setCursorVariant("link")}
                onMouseLeave={() => setCursorVariant("default")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md border border-hairline bg-surface/60 hover:bg-surface text-ink font-medium text-sm hover:border-accent transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <Mail className="w-4 h-4 text-muted" aria-hidden="true" />
                <span>Get in touch</span>
              </a>
            </div>

            {/* Technical Anchor Notes */}
            <div className="pt-4 flex items-center gap-3 text-xs font-mono text-muted/80">
              <span>Next.js App Router</span>
              <span aria-hidden="true">/</span>
              <span>SSR &amp; Edge Delivery</span>
              <span aria-hidden="true">/</span>
              <span>TypeScript Strict</span>
            </div>
          </div>

          {/* Right Column: Signature Visual Component Tree */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
};
