import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profile } from '../data/portfolio';
import { EASE, Magnetic, Particles } from './fx';
import { SeriesMark } from './Poster';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function FinalCTA({
  onReplay,
  onSwitchToMinimal,
}: {
  onReplay: () => void;
  onSwitchToMinimal?: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.2'] });
  const spacing = useTransform(scrollYProgress, [0, 1], ['0.6em', '0.02em']);
  const blur = useTransform(scrollYProgress, [0, 1], ['blur(16px)', 'blur(0px)']);
  const opacity = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 700);
  };

  const ctas = [
    { label: 'WhatsApp (+995 568 772 744)', href: profile.links.whatsapp, primary: true },
    { label: 'Call (+92 346 8051600)', href: 'tel:+923468051600' },
    { label: 'Email Directly', href: `mailto:${profile.email}` },
    { label: 'LinkedIn', href: profile.links.linkedin },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center bg-[#07070a]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_60%,rgba(15,92,74,0.3),transparent_70%)]"
      />
      <Particles count={36} color="143,217,190" />

      <motion.p
        className="relative mb-6 text-[11px] font-bold uppercase tracking-[0.5em] text-[#ff3d5a] font-mono"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        The Next Episode
      </motion.p>

      <motion.h2
        className="relative font-display leading-[0.85] text-[#f4f1ec]"
        style={{ fontSize: 'clamp(3.4rem, 13vw, 11rem)', letterSpacing: spacing, filter: blur, opacity }}
      >
        TO BE CONTINUED…
      </motion.h2>

      <motion.div
        className="relative mt-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
      >
        <p className="font-sans text-2xl font-semibold tracking-[0.2em] text-[#f4f1ec] sm:text-3xl">
          {profile.displayName.toUpperCase()}
        </p>
        <p className="mt-2 text-xs font-semibold tracking-[0.4em] text-[#a7a6ad] font-mono sm:text-sm">
          {profile.role.toUpperCase()}
        </p>
        <p className="mt-1 text-xs text-[#8FD9BE] font-mono">
          {profile.location}
        </p>
      </motion.div>

      {/* Primary CTAs */}
      <motion.div
        className="relative mt-10 flex flex-wrap justify-center gap-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.08, delayChildren: 0.35 }}
      >
        {ctas.map((c) => (
          <motion.div
            key={c.label}
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.9 },
              show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
            }}
          >
            <Magnetic>
              <a
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                className={`flex min-h-12 items-center gap-2 rounded-full px-7 text-sm font-bold tracking-[0.12em] transition focus:outline-none ${
                  c.primary
                    ? 'bg-[#0F5C4A] text-white shadow-[0_0_50px_rgba(15,92,74,0.6)] hover:bg-[#8FD9BE] hover:text-[#07070a]'
                    : 'border border-white/25 text-[#f4f1ec] hover:border-white hover:bg-white/10'
                }`}
              >
                {c.primary && <span>▶</span>}
                {c.label.toUpperCase()}
                {!c.primary && <span className="text-[#a7a6ad]">↗</span>}
              </a>
            </Magnetic>
          </motion.div>
        ))}

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20, scale: 0.9 },
            show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
          }}
        >
          <Magnetic>
            <button
              type="button"
              onClick={() => setFormOpen(!formOpen)}
              className="flex min-h-12 items-center gap-2 rounded-full px-7 text-sm font-bold tracking-[0.12em] border border-[#ff3d5a]/60 text-[#ff3d5a] hover:bg-[#ff3d5a]/10 transition focus:outline-none"
            >
              <span>SEND INQUIRY</span>
            </button>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Inline Quick Inquiry Form */}
      {formOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mt-8 max-w-lg w-full bg-[#0e0e13] border border-white/15 p-6 rounded-2xl shadow-2xl text-left"
        >
          {formStatus === 'success' ? (
            <div className="flex items-center gap-3 text-[#8FD9BE] text-sm py-4">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Inquiry dispatched! Kamran will respond via email shortly.</span>
            </div>
          ) : (
            <form onSubmit={handleSendInquiry} className="space-y-4">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-xs uppercase tracking-wider text-[#a7a6ad]">
                  Direct Production Inquiry
                </span>
                <span className="font-mono text-[10px] text-[#8FD9BE]">
                  {profile.email}
                </span>
              </div>
              <input
                type="text"
                required
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-white/15 text-sm text-[#f4f1ec] focus:outline-none focus:border-[#8FD9BE]"
              />
              <input
                type="email"
                required
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-white/15 text-sm text-[#f4f1ec] focus:outline-none focus:border-[#8FD9BE]"
              />
              <textarea
                required
                rows={3}
                placeholder="Project requirements, role details, or timeline..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-white/15 text-sm text-[#f4f1ec] focus:outline-none focus:border-[#8FD9BE]"
              />
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full py-3 rounded-lg bg-[#0F5C4A] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#8FD9BE] hover:text-[#07070a] transition-colors"
              >
                {formStatus === 'sending' ? 'Dispatching...' : 'Dispatch Inquiry'}
              </button>
            </form>
          )}
        </motion.div>
      )}

      {/* Watch Again, Replay Opening & Minimal View */}
      <div className="relative mt-16 flex flex-wrap justify-center items-center gap-6 text-xs font-semibold tracking-[0.24em] text-[#6d6c75] font-mono">
        <button type="button" onClick={scrollToTop} className="hover:text-[#f4f1ec] transition-colors">
          ↺ WATCH AGAIN
        </button>
        <button type="button" onClick={onReplay} className="hover:text-[#f4f1ec] transition-colors">
          ▶ REPLAY OPENING
        </button>
        {onSwitchToMinimal && (
          <button
            type="button"
            onClick={onSwitchToMinimal}
            className="text-[#8FD9BE] hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>⚡ MINIMAL ONE-PAGE</span>
          </button>
        )}
      </div>

      {/* Footer Branding */}
      <footer className="relative mt-20 px-4 text-center">
        <div className="mb-2 text-base flex justify-center">
          <SeriesMark />
        </div>
        <p className="text-[11px] leading-relaxed text-[#6d6c75] font-mono">
          © {new Date().getFullYear()} {profile.displayName}. A personal, streaming-inspired portfolio series.
        </p>
      </footer>
    </section>
  );
}
