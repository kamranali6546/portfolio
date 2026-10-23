import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useCursor } from "../../context/CursorContext";
import { Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";

interface HeaderProps {
  onNavigate?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { theme, toggleTheme } = useTheme();
  const { setCursorVariant } = useCursor();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Scroll progress percentage (0 - 100)
      if (totalScrollHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (currentScrollY / totalScrollHeight) * 100)));
      }

      // Hide on scroll down, show on scroll up (with 10px buffer)
      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 8) {
          setIsVisible(false);
        } else if (lastScrollY - currentScrollY > 8) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Expertise", href: "#expertise" },
    { label: "Experience", href: "#experience" },
    { label: "Engineering", href: "#engineering" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    if (onNavigate) {
      onNavigate(id);
    }
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-accent z-50 origin-left transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 backdrop-blur-md bg-canvas/85 border-b border-hairline ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Monogram brand */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, "#hero")}
            className="flex items-center gap-2.5 font-serif text-lg tracking-tight font-medium text-ink whitespace-nowrap shrink-0 group focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            onMouseEnter={() => setCursorVariant("link")}
            onMouseLeave={() => setCursorVariant("default")}
            aria-label="Kamran Ali homepage"
          >
            <span className="w-8 h-8 rounded-md bg-surface-subtle border border-hairline flex items-center justify-center font-mono text-xs font-semibold text-accent group-hover:border-accent transition-colors">
              KA
            </span>
            <span className="hidden sm:inline font-sans text-sm font-semibold tracking-normal text-ink">
              Kamran Ali
            </span>
          </a>

          {/* Zone 2: 4-5 single-line clean nav links */}
          <nav
            className="hidden md:flex items-center gap-8 text-sm font-medium text-muted"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                onMouseEnter={() => setCursorVariant("link")}
                onMouseLeave={() => setCursorVariant("default")}
                className="whitespace-nowrap shrink-0 hover:text-ink transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-accent hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Theme Toggle + Contact CTA */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
              className="p-2 rounded-md border border-hairline bg-surface-subtle/50 text-muted hover:text-ink hover:border-accent transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Sun className="w-4 h-4 text-brass" aria-hidden="true" />
              )}
            </button>

            {/* Primary Action Button */}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              onMouseEnter={() => setCursorVariant("link")}
              onMouseLeave={() => setCursorVariant("default")}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-md bg-accent text-white hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
              className="md:hidden p-2 rounded-md border border-hairline text-muted hover:text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Navigation */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-canvas/98 flex flex-col justify-between p-6 pt-24 md:hidden backdrop-blur-xl animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <nav className="flex flex-col gap-6">
            <span className="font-mono text-xs uppercase text-muted tracking-widest">
              Navigation
            </span>
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-serif text-3xl font-light text-ink hover:text-accent transition-colors flex items-center justify-between py-2 border-b border-hairline"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-muted">0{idx + 1}</span>
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-4 pt-6 border-t border-hairline">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="w-full py-3.5 px-4 text-center rounded-md bg-accent text-white font-medium text-sm"
            >
              Get in touch
            </a>
            <div className="flex items-center justify-between text-xs font-mono text-muted">
              <span>PKT / GET</span>
              <span>Available for relocation</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
