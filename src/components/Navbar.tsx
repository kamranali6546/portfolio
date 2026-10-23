import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { EASE } from './fx';
import { Menu, X } from 'lucide-react';
import type { ProfileId, SectionId } from '../data/portfolio';
import PWAInstallButton from './PWAInstallButton';

/**
 * Clean & Minimal Fixed Header:
 *
 * - Stays solidly fixed at the very top of the viewport after scrolling (`top-0`, full width, high-blur glass).
 * - Left: "KA" Monogram + "Kamran Ali"
 * - Center: 4 core, essential destinations:
 *   - Overview (Billboard)
 *   - Originals (Flagship Works)
 *   - Experience (Career Seasons)
 *   - About (The Pilot & Bio)
 * - Right: Single primary action: "Let's Talk" (smooth scrolls to contact / email / WhatsApp)
 */
export default function Navbar({
  order,
  profileId,
  onSwitch,
  onSwitchToMinimal,
}: {
  order?: SectionId[];
  profileId?: ProfileId;
  onSwitch?: (id: ProfileId) => void;
  onSwitchToMinimal?: () => void;
} = {}) {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [active, setActive] = useState<string>('top');

  useMotionValueEvent(scrollY, 'change', (y) => {
    setSolid(y > 20);
  });

  const sections = [
    { id: 'top', label: 'Overview' },
    { id: 'originals', label: 'Originals' },
    { id: 'journey', label: 'Experience' },
    { id: 'about', label: 'About' },
  ];

  useEffect(() => {
    const ids = ['top', 'originals', 'journey', 'about', 'contact'];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -45% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const { scrollTo } = useSmoothScroll();

  const go = (id: string) => {
    setMobileNav(false);
    scrollTo(id === 'top' ? '#top' : `#${id}`);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] select-none transition-all duration-300 ${
        solid
          ? 'bg-[#07070a]/90 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.7)] py-2.5'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Monogram Logo & Name */}
          <button
            type="button"
            onClick={() => go('top')}
            className="flex items-center gap-2.5 focus:outline-none group shrink-0"
            aria-label="Back to top"
          >
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-white/10 border border-white/20 text-[#ff3d5a] font-display text-sm font-bold group-hover:bg-[#ff3d5a] group-hover:text-white transition-all shadow-sm">
              KA
            </div>
            <span className="font-semibold text-sm tracking-tight text-white/95">
              Kamran Ali
            </span>
          </button>

          {/* Center: Essential 4 Section Links with glass pill background */}
          <nav
            className={`hidden md:flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-300 ${
              solid
                ? 'bg-white/[0.05] border border-white/10'
                : 'bg-black/40 backdrop-blur-md border border-white/10'
            }`}
          >
            {sections.map((s) => {
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => go(s.id)}
                  className={`relative px-3.5 py-1 rounded-full text-xs transition-colors whitespace-nowrap focus:outline-none ${
                    isActive ? 'text-white font-medium' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="fixed-nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.15] border border-white/20 shadow-sm"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{s.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: PWA Install, Primary Contact Button & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <PWAInstallButton className="hidden sm:inline-flex" />
            <button
              type="button"
              onClick={() => go('contact')}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#ff3d5a] hover:bg-[#ff526d] text-white font-medium text-xs shadow-md transition-all focus:outline-none"
            >
              Let&apos;s Talk
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              type="button"
              className="p-1.5 rounded-full md:hidden text-white/80 hover:text-white focus:outline-none bg-white/5 border border-white/10"
              aria-label={mobileNav ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileNav((v) => !v)}
            >
              {mobileNav ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu */}
        <AnimatePresence>
          {mobileNav && (
            <motion.div
              aria-label="Mobile Navigation"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="mt-3 overflow-hidden rounded-2xl border border-white/15 bg-[#07070a]/95 backdrop-blur-2xl p-3 shadow-2xl md:hidden"
            >
              <div className="space-y-1">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => go(s.id)}
                    className={`block w-full py-2.5 px-3 rounded-xl text-left text-xs font-medium transition ${
                      active === s.id
                        ? 'bg-[#ff3d5a]/15 text-[#ff3d5a] font-semibold border border-[#ff3d5a]/25'
                        : 'text-white/80 hover:bg-white/[0.06]'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => go('contact')}
                  className="block w-full py-2.5 px-3 rounded-xl text-left text-xs font-semibold text-[#ff3d5a] hover:bg-white/[0.06] transition"
                >
                  Contact
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
