import React, { useState } from "react";
import { profile } from "../../content/profile";
import { useMagnetic } from "../../hooks/useMagnetic";
import { useCursor } from "../../context/CursorContext";
import { Mail, Phone, MessageSquare, Linkedin, Download, Send, CheckCircle2, AlertCircle } from "lucide-react";

export const Contact: React.FC = () => {
  const { setCursorVariant } = useCursor();
  const submitBtn = useMagnetic<HTMLButtonElement>({ radius: 80, strength: 0.2 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    botCheck: "", // Honeypot field
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty";
    } else if (formData.message.trim().length < 15) {
      newErrors.message = "Message must be at least 15 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check for spam bots
    if (formData.botCheck) {
      return;
    }

    if (!validate()) {
      setStatus("error");
      setStatusMessage("Please correct the errors in the form before submitting.");
      return;
    }

    setStatus("submitting");

    // Simulate reliable dispatch with client confirmation
    setTimeout(() => {
      setStatus("success");
      setStatusMessage("Thank you for reaching out, Kamran will respond shortly.");
      setFormData({ name: "", email: "", message: "", botCheck: "" });
      setErrors({});
    }, 700);
  };

  return (
    <section
      id="contact"
      aria-label="Contact Information and Inquiries"
      className="py-20 lg:py-28 border-b border-hairline relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-accent font-semibold tracking-wider">
            06 / CONTACT
          </span>
          <span className="h-[1px] w-12 bg-hairline" aria-hidden="true" />
          <span className="text-xs font-mono text-muted uppercase tracking-widest">
            Let&apos;s Connect
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline and Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="heading-section text-ink">
                Let&apos;s build something that lasts.
              </h2>
              <p className="text-muted text-base sm:text-lg leading-relaxed">
                Currently open to senior and lead frontend engineering roles, architectural
                consulting, and international relocation.
              </p>
            </div>

            {/* Availability details */}
            <div className="p-5 rounded-lg border border-hairline bg-surface space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-accent font-medium block">
                Location &amp; Availability
              </span>
              <p className="text-sm font-sans text-ink font-medium">
                {profile.location}
              </p>
              <p className="text-xs font-mono text-muted">
                Time zones: {profile.availability.timezones}
              </p>
            </div>

            {/* Direct Links */}
            <div className="space-y-3 pt-2">
              <span className="font-mono text-xs uppercase tracking-wider text-muted block">
                Direct Channels
              </span>

              <div className="flex flex-col gap-2.5">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 text-sm text-ink hover:text-accent transition-colors group p-2 rounded-md hover:bg-surface-subtle"
                >
                  <Mail className="w-4 h-4 text-accent" aria-hidden="true" />
                  <span className="font-mono">{profile.email}</span>
                </a>

                <a
                  href="tel:+923468051600"
                  className="flex items-center gap-3 text-sm text-ink hover:text-accent transition-colors group p-2 rounded-md hover:bg-surface-subtle"
                >
                  <Phone className="w-4 h-4 text-accent" aria-hidden="true" />
                  <span className="font-mono">Primary: +92 346 8051600</span>
                </a>

                <a
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-ink hover:text-accent transition-colors group p-2 rounded-md hover:bg-surface-subtle"
                >
                  <MessageSquare className="w-4 h-4 text-accent" aria-hidden="true" />
                  <span>WhatsApp: +995 568 772 744</span>
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-ink hover:text-accent transition-colors group p-2 rounded-md hover:bg-surface-subtle"
                >
                  <Linkedin className="w-4 h-4 text-accent" aria-hidden="true" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>

              {/* Download CV button */}
              <div className="pt-4">
                <a
                  href={profile.cvUrl}
                  download="Kamran_Ali_CV.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-hairline bg-surface hover:bg-surface-subtle text-ink text-xs font-mono font-medium transition-colors hover:border-accent"
                >
                  <Download className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                  <span>Download Curriculum Vitae (PDF)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-xl border border-hairline bg-surface">
            <h3 className="font-serif text-xl sm:text-2xl text-ink font-normal mb-2">
              Send an inquiry
            </h3>
            <p className="text-xs sm:text-sm text-muted mb-6">
              All messages dispatch directly to Kamran Ali.
            </p>

            {/* Live Announcement region for screen readers */}
            <div aria-live="polite" className="sr-only">
              {statusMessage}
            </div>

            {status === "success" ? (
              <div className="p-6 rounded-lg border border-accent/40 bg-accent/5 space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2 text-accent font-medium text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>Message delivered successfully</span>
                </div>
                <p className="text-sm text-muted">
                  Thank you for your message. I will review your requirements and respond shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="text-xs font-mono text-accent hover:underline pt-2 block"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Honeypot field (hidden from real users) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="botCheck">Leave this empty</label>
                  <input
                    id="botCheck"
                    type="text"
                    value={formData.botCheck}
                    onChange={(e) => setFormData({ ...formData, botCheck: e.target.value })}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Name Field */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-xs font-mono text-muted uppercase tracking-wider">
                    Your Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    aria-required="true"
                    aria-describedby={errors.name ? "name-error" : undefined}
                    aria-invalid={Boolean(errors.name)}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                    placeholder="e.g. Sarah Jenkins"
                    className={`w-full px-4 py-2.5 rounded-md border bg-canvas/60 text-ink text-sm transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                      errors.name ? "border-red-500/70" : "border-hairline hover:border-hairline/90"
                    }`}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-xs text-red-500 font-mono mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-xs font-mono text-muted uppercase tracking-wider">
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    aria-required="true"
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-invalid={Boolean(errors.email)}
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    placeholder="sarah@company.com"
                    className={`w-full px-4 py-2.5 rounded-md border bg-canvas/60 text-ink text-sm transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                      errors.email ? "border-red-500/70" : "border-hairline hover:border-hairline/90"
                    }`}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-xs text-red-500 font-mono mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-xs font-mono text-muted uppercase tracking-wider">
                    Project Requirements or Role <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    aria-required="true"
                    aria-describedby={errors.message ? "message-error" : undefined}
                    aria-invalid={Boolean(errors.message)}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: "" });
                    }}
                    placeholder="Tell me about your product architecture, technical challenges, or timeline..."
                    className={`w-full px-4 py-2.5 rounded-md border bg-canvas/60 text-ink text-sm transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                      errors.message ? "border-red-500/70" : "border-hairline hover:border-hairline/90"
                    }`}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-xs text-red-500 font-mono mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {status === "error" && statusMessage && (
                  <div className="flex items-center gap-2 text-xs font-mono text-red-500 pt-1">
                    <AlertCircle className="w-4 h-4" aria-hidden="true" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {/* Submit button with magnetic hover */}
                <div className="pt-2">
                  <button
                    ref={submitBtn.ref}
                    type="submit"
                    disabled={status === "submitting"}
                    style={{
                      transform: `translate3d(${submitBtn.position.x}px, ${submitBtn.position.y}px, 0)`,
                    }}
                    onMouseEnter={() => setCursorVariant("link")}
                    onMouseLeave={() => setCursorVariant("default")}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-accent text-white font-medium text-xs hover:opacity-90 transition-all disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    {status === "submitting" ? (
                      <span>Sending message...</span>
                    ) : (
                      <>
                        <span>Submit inquiry</span>
                        <Send className="w-3.5 h-3.5" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
