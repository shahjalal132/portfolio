"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import projectsData from "@/data/projects.json";

const projects = projectsData.projects;

export function ProjectGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const previousRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const cardRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;

    void (async () => {
      const { default: gsap } = await import("gsap");

      if (cancelled || !galleryRef.current) return;

      const gallery = galleryRef.current;
      const cards = cardRefs.current.filter(
        (card): card is HTMLLIElement => card !== null,
      );
      const total = cards.length;
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      let current = 0;
      let pointerStart: number | null = null;

      const updateCards = (immediate = false) => {
        const galleryWidth = gallery.getBoundingClientRect().width;
        const gap =
          galleryWidth < 640
            ? galleryWidth * 0.62
            : Math.min(330, galleryWidth * 0.32);

        cards.forEach((card, cardIndex) => {
          let offset = cardIndex - current;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const distance = Math.abs(offset);
          const isActive = offset === 0;
          const isVisible = distance <= 3;

          card.setAttribute("aria-hidden", String(!isActive));
          if (isActive) card.removeAttribute("inert");
          else card.setAttribute("inert", "");

          gsap.to(card, {
            xPercent: -50,
            yPercent: -50,
            x: offset * gap,
            y: distance * 18,
            scale: Math.max(0.74, 1 - distance * 0.09),
            rotationY: offset * -5,
            opacity: isVisible ? Math.max(0.18, 1 - distance * 0.24) : 0,
            filter: distance > 1 ? `blur(${distance - 1}px)` : "blur(0px)",
            zIndex: total - distance,
            duration: immediate || reducedMotion ? 0 : 0.75,
            ease: "power3.inOut",
            overwrite: true,
          });
        });

        setActiveIndex(current);
      };

      const move = (direction: number) => {
        current = gsap.utils.wrap(0, total, current + direction);
        updateCards();
      };

      const goPrevious = () => move(-1);
      const goNext = () => move(1);
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goPrevious();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          goNext();
        }
      };
      const handlePointerDown = (event: PointerEvent) => {
        pointerStart = event.clientX;
      };
      const handlePointerUp = (event: PointerEvent) => {
        if (pointerStart === null) return;
        const distance = event.clientX - pointerStart;
        pointerStart = null;
        if (Math.abs(distance) < 45) return;
        move(distance < 0 ? 1 : -1);
      };
      const handlePointerCancel = () => {
        pointerStart = null;
      };

      const autoAdvance = gsap.delayedCall(4.5, function rotate() {
        move(1);
        autoAdvance.restart(true);
      });
      if (reducedMotion) autoAdvance.pause();

      const pauseAutoAdvance = () => autoAdvance.pause();
      const resumeAutoAdvance = () => {
        if (!reducedMotion) autoAdvance.restart(true);
      };
      const handleResize = () => updateCards(true);

      previousRef.current?.addEventListener("click", goPrevious);
      nextRef.current?.addEventListener("click", goNext);
      gallery.addEventListener("keydown", handleKeyDown);
      gallery.addEventListener("pointerdown", handlePointerDown);
      gallery.addEventListener("pointerup", handlePointerUp);
      gallery.addEventListener("pointercancel", handlePointerCancel);
      gallery.addEventListener("pointerenter", pauseAutoAdvance);
      gallery.addEventListener("pointerleave", resumeAutoAdvance);
      gallery.addEventListener("focusin", pauseAutoAdvance);
      gallery.addEventListener("focusout", resumeAutoAdvance);
      window.addEventListener("resize", handleResize);

      updateCards(true);

      dispose = () => {
        previousRef.current?.removeEventListener("click", goPrevious);
        nextRef.current?.removeEventListener("click", goNext);
        gallery.removeEventListener("keydown", handleKeyDown);
        gallery.removeEventListener("pointerdown", handlePointerDown);
        gallery.removeEventListener("pointerup", handlePointerUp);
        gallery.removeEventListener("pointercancel", handlePointerCancel);
        gallery.removeEventListener("pointerenter", pauseAutoAdvance);
        gallery.removeEventListener("pointerleave", resumeAutoAdvance);
        gallery.removeEventListener("focusin", pauseAutoAdvance);
        gallery.removeEventListener("focusout", resumeAutoAdvance);
        window.removeEventListener("resize", handleResize);
        autoAdvance.kill();
        gsap.killTweensOf(cards);
      };
    })();

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <section id="gallery" className="overflow-hidden border-y border-border">
      <div className="mx-auto max-w-[1180px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Project archive
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Project Gallery
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Browse a growing collection of web applications, integrations,
              e-commerce systems, and automation projects.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="mr-2 font-mono text-sm text-subtle" aria-hidden>
              {String(activeIndex + 1).padStart(2, "0")} / {projects.length}
            </span>
            <button
              ref={previousRef}
              type="button"
              aria-label="Previous project"
              className="gallery-control inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground"
            >
              <ArrowLeft size={19} aria-hidden="true" />
            </button>
            <button
              ref={nextRef}
              type="button"
              aria-label="Next project"
              className="gallery-control inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white"
            >
              <ArrowRight size={19} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={galleryRef}
          className="project-gallery-stage relative mt-8 h-[430px] touch-pan-y outline-none sm:h-[460px]"
          role="region"
          aria-roledescription="carousel"
          aria-label="Project gallery"
          tabIndex={0}
        >
          <p className="sr-only" aria-live="polite">
            Project {activeIndex + 1} of {projects.length}:{" "}
            {projects[activeIndex].name}
          </p>

          <ul className="absolute inset-0 m-0 list-none p-0">
            {projects.map((project, index) => (
              <li
                key={project.id}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className="gallery-project-card absolute top-1/2 left-1/2 h-[350px] w-[min(82vw,360px)] opacity-0"
                aria-label={`${index + 1} of ${projects.length}`}
              >
                <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-background p-6 shadow-[0_24px_70px_rgba(15,23,42,0.14)]">
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                      {project.code}
                    </p>
                    <span className="shrink-0 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs font-semibold text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col">
                    <h3 className="mt-3 line-clamp-2 text-xl font-semibold tracking-tight">
                      {project.name}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">
                      {project.summary}
                    </p>

                    <a
                      href={project.links.live}
                      onClick={(event) => {
                        if (project.links.live === "#") event.preventDefault();
                      }}
                      className="mt-auto inline-flex items-center gap-2 pt-5 font-semibold text-accent"
                    >
                      Live preview
                      <ExternalLink size={16} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
