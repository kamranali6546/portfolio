import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { sound } from '../utils/audio';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  Calendar, 
  Github, 
  Linkedin, 
  Twitter, 
  MessageSquare, 
  Phone,
  MapPin,
  Globe2,
  CheckCircle2
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { profile, showToast } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Senior / Lead Frontend Engineering Role / Consultation',
    message: ''
  });

  const [isCopiedEmail, setIsCopiedEmail] = useState(false);
  const [isCopiedPhone, setIsCopiedPhone] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string>('Tomorrow 2:00 PM GET');
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setIsCopiedEmail(true);
    sound.playClick(850);
    showToast(`Copied ${profile.email} to clipboard`, 'success');
    setTimeout(() => setIsCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profile.phone);
    setIsCopiedPhone(true);
    sound.playClick(850);
    showToast(`Copied ${profile.phone} to clipboard`, 'success');
    setTimeout(() => setIsCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('Please fill out all contact fields', 'warning');
      return;
    }

    sound.playSuccess();
    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Hi Kamran,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
    )}`;

    window.location.href = mailtoUrl;
    showToast('Opening your email client to send message to Kamran...', 'success');
  };

  const handleScheduleSlot = () => {
    sound.playSuccess();
    setIsBookingConfirmed(true);
    showToast(`Discovery call requested for ${selectedSlot}. Kamran will confirm shortly!`, 'success');
  };

  const availableSlots = [
    'Tomorrow 2:00 PM GET',
    'Wednesday 11:00 AM GET',
    'Thursday 4:00 PM GET',
    'Friday 1:30 PM GET'
  ];

  return (
    <section id="contact" className="py-16 px-4 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="pb-4 border-b border-neutral-800">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
          <Mail className="w-4 h-4" />
          <span>Get In Touch</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-100 tracking-tight mt-1">
          Let's Build High-Impact Frontend Experiences
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
          Whether you're looking for a Senior Frontend Developer, a Frontend Architect, or an expert to spearhead AI-augmented React/Next.js interfaces, let's connect.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Message Form (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-100 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              <span>Send Direct Message</span>
            </h3>
            <span className="text-[10px] font-mono text-emerald-400">Response within 24 hours</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-neutral-950 text-neutral-200 text-xs px-3.5 py-2.5 rounded-xl border border-neutral-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">Your Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sarah@company.com"
                  className="w-full bg-neutral-950 text-neutral-200 text-xs px-3.5 py-2.5 rounded-xl border border-neutral-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-neutral-950 text-neutral-200 text-xs px-3.5 py-2.5 rounded-xl border border-neutral-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300">Role or Project Scope</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your frontend architecture requirements, Next.js tech stack, or hiring opportunity..."
                className="w-full bg-neutral-950 text-neutral-200 text-xs p-3.5 rounded-xl border border-neutral-800 focus:border-indigo-500 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>

        {/* Right Column: Direct Channels & Discovery Scheduler (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Coordinates Card */}
          <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-4">
            <h3 className="text-xs font-bold text-neutral-200 uppercase tracking-wider">Direct Coordinates</h3>

            {/* Email */}
            <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-xs font-mono text-neutral-200 truncate">{profile.email}</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition-colors shrink-0"
              >
                {isCopiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Phone */}
            <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-xs font-mono text-neutral-200 truncate">{profile.phone}</span>
              </div>
              <button
                onClick={handleCopyPhone}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition-colors shrink-0"
              >
                {isCopiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Location & Relocation */}
            <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1 text-xs">
              <div className="flex items-center gap-2 text-neutral-200">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-semibold">{profile.location}</span>
              </div>
              <p className="text-[11px] text-neutral-400 flex items-center gap-1.5 pt-1">
                <Globe2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{profile.relocationStatus}</span>
              </p>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 flex flex-col items-center gap-1.5 text-xs text-neutral-300 transition-colors"
              >
                <Github className="w-4 h-4 text-neutral-400" />
                <span className="text-[11px] font-medium">GitHub</span>
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 flex flex-col items-center gap-1.5 text-xs text-neutral-300 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-indigo-400" />
                <span className="text-[11px] font-medium">LinkedIn</span>
              </a>

              <a
                href={profile.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 flex flex-col items-center gap-1.5 text-xs text-neutral-300 transition-colors"
              >
                <Twitter className="w-4 h-4 text-cyan-400" />
                <span className="text-[11px] font-medium">X (Twitter)</span>
              </a>
            </div>
          </div>

          {/* Discovery Call Slot Reservation */}
          <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>30-Min Frontend Discovery Call</span>
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">Slots Open</span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Select a convenient time window for a 1-on-1 technical discussion on frontend architecture, team leadership, or role scope.
            </p>

            <div className="space-y-2">
              {availableSlots.map(slot => (
                <button
                  key={slot}
                  onClick={() => {
                    sound.playClick(650);
                    setSelectedSlot(slot);
                    setIsBookingConfirmed(false);
                  }}
                  className={`w-full p-2.5 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between ${
                    selectedSlot === slot
                      ? 'bg-indigo-950/60 border-indigo-500/60 text-indigo-200 ring-1 ring-indigo-500/30'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <span>{slot}</span>
                  {selectedSlot === slot && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                </button>
              ))}
            </div>

            <button
              onClick={handleScheduleSlot}
              className="w-full py-2.5 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>{isBookingConfirmed ? 'Slot Requested ✓' : 'Reserve Selected Slot'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Strip */}
      <footer className="pt-10 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-neutral-500">
        <div>
          © {new Date().getFullYear()} {profile.name} — Senior Frontend Developer
        </div>
        <div className="flex items-center gap-4">
          <span>React & Next.js</span>
          <span>•</span>
          <span>TypeScript & Tailwind CSS</span>
          <span>•</span>
          <span>Tbilisi, Georgia</span>
        </div>
      </footer>
    </section>
  );
};
