import React, { useRef, useState, useEffect } from "react";
import { projects, Project } from "../../content/projects";
import { ProjectCard } from "./ProjectCard";
import { CaseStudyModal } from "../case-studies/CaseStudyModal";
import { Tier2Drawer } from "../case-studies/Tier2Drawer";
import { useCursor } from "../../context/CursorContext";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";

export const WorkGallery: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { setCursorVariant, setCursorText } = useCursor();

  // Filter only published projects!
  const publishedProjects = projects.filter((p) => p.published);

  // Extract distinct categories
  const categories = ["All", ...Array.from(new Set(publishedProjects.map((p) => p.category)))];

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);
  const [activeTier2, setActiveTier2] = useState<Project | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const filteredProjects =
    activeCategory === "All"
      ? publishedProjects
      : publishedProjects.filter((p) => p.category === activeCategory);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll > 0) {
      setScrollProgress((el.scrollLeft / maxScroll) * 100);
    }
  };

  const scrollByAmount = (offset: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollBy({ left: offset, behavior: "smooth" });
  };

  const handleOpenProject = (project: Project) => {
    if (project.tier === 1) {
      setActiveCaseStudy(project);
      window.history.pushState(null, "", `#work-${project.slug}`);
    } else {
      setActiveTier2(project);
    }
  };

  const handleSelectCaseStudyBySlug = (slug: string) => {
    const p = publishedProjects.find((item) => item.slug === slug);
    if (p) {
      setActiveCaseStudy(p);
      window.history.pushState(null, "", `#work-${slug}`);
    }
  };

  const handleCloseCaseStudy = () => {
    setActiveCaseStudy(null);
    window.history.pushState(null, "", "#work");
  };

  // Check URL hash for direct deep linking (#work-[slug])
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#work-")) {
      const slug = hash.replace("#work-", "");
      const found = publishedProjects.find((p) => p.slug === slug);
      if (found) {
        if (found.tier === 1) setActiveCaseStudy(found);
        else setActiveTier2(found);
      }
    }
  }, []);

  return (
    <section
      id="work"
      aria-label="Selected Engineering Work"
      className="py-20 lg:py-28 border-b border-hairline relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-accent font-semibold tracking-wider">
            04 / SELECTED WORK
          </span>
          <span className="h-[1px] w-12 bg-hairline" aria-hidden="true" />
          <span className="text-xs font-mono text-muted uppercase tracking-widest">
            Production Implementations
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
          <div className="max-w-2xl">
            <h2 className="heading-section text-ink">
              The centerpiece.
            </h2>
            <p className="text-muted text-sm sm:text-base mt-2">
              Architectural deep dives and live platforms. Showing the engineering decisions,
              rendering strategies, and performance impact behind each project.
            </p>
          </div>

          {/* Desktop Navigation Arrows */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByAmount(-420)}
              aria-label="Scroll projects left"
              className="p-2.5 rounded-md border border-hairline bg-surface text-muted hover:text-ink hover:border-accent transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(420)}
              aria-label="Scroll projects right"
              className="p-2.5 rounded-md border border-hairline bg-surface text-muted hover:text-ink hover:border-accent transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Category Filter Tabs (Accessible Toggle Group) */}
        <div
          role="group"
          aria-label="Filter projects by category"
          className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                  isActive
                    ? "bg-accent text-white shadow-xs"
                    : "bg-surface border border-hairline text-muted hover:text-ink hover:border-accent/40"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gallery Scroll Track */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onMouseEnter={() => {
            setCursorVariant("drag");
            setCursorText("Scroll");
          }}
          onMouseLeave={() => {
            setCursorVariant("default");
            setCursorText(null);
          }}
          className="flex items-stretch gap-6 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-8 pt-2 scroll-smooth snap-x snap-mandatory lg:snap-none"
          tabIndex={0}
          role="region"
          aria-label="Scrollable project cards"
        >
          {filteredProjects.map((project) => (
            <div key={project.slug} className="snap-start">
              <ProjectCard project={project} onOpenCaseStudy={handleOpenProject} />
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Footer Indicators */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted">
            {filteredProjects.length} projects displayed
          </span>
          <span className="text-muted/40" aria-hidden="true">
            ·
          </span>
          <span className="hidden sm:inline font-mono text-xs text-muted">
            Use mouse wheel, drag, or arrow keys to navigate
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-32 sm:w-48 h-1 bg-surface-subtle border border-hairline rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-100 ease-out"
            style={{ width: `${Math.max(10, scrollProgress)}%` }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Tier 1 Full Case Study Modal */}
      {activeCaseStudy && (
        <CaseStudyModal
          project={activeCaseStudy}
          onClose={handleCloseCaseStudy}
          onSelectProject={handleSelectCaseStudyBySlug}
        />
      )}

      {/* Tier 2 Drawer */}
      {activeTier2 && (
        <Tier2Drawer project={activeTier2} onClose={() => setActiveTier2(null)} />
      )}
    </section>
  );
};
