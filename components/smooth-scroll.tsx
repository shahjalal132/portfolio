"use client";

import { useEffect, useRef, type ReactNode } from "react";

type SmoothScrollProps = {
  children: ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }, { ScrollSmoother }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("gsap/ScrollSmoother"),
        ]);

      if (cancelled || !wrapperRef.current || !contentRef.current) return;

      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      const media = gsap.matchMedia();

      media.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const smoother = ScrollSmoother.create({
            wrapper: wrapperRef.current!,
            content: contentRef.current!,
            smooth: 1.15,
            effects: true,
            normalizeScroll: true,
          });

          const handleAnchorClick = (event: MouseEvent) => {
            const target = event.target;
            if (!(target instanceof Element)) return;

            const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
            const hash = anchor?.getAttribute("href");
            if (!hash || hash === "#") return;

            const section = document.querySelector(hash);
            if (!section) return;

            event.preventDefault();
            smoother.scrollTo(
              Math.max(0, smoother.offset(section, "top top") - 72),
              true,
            );
            window.history.replaceState(null, "", hash);
          };

          const buttonCleanups = Array.from(
            document.querySelectorAll<HTMLElement>("[data-gsap-button]"),
            (button) => {
              const icon = button.querySelector<SVGElement>("svg");
              const timeline = gsap.timeline({ paused: true }).to(
                button,
                {
                  y: -3,
                  scale: 1.045,
                  duration: 0.75,
                  ease: "elastic.out(1, 0.35)",
                  easeReverse: "power2.out",
                },
                0,
              );

              if (icon) {
                timeline.to(
                  icon,
                  {
                    x: 3,
                    scale: 1.08,
                    duration: 0.65,
                    ease: "elastic.out(1, 0.35)",
                    easeReverse: "power2.out",
                  },
                  0,
                );
              }

              const play = () => timeline.timeScale(1).play();
              const reverse = () => timeline.timeScale(2.4).reverse();

              button.addEventListener("pointerenter", play);
              button.addEventListener("pointerleave", reverse);
              button.addEventListener("focus", play);
              button.addEventListener("blur", reverse);

              return () => {
                button.removeEventListener("pointerenter", play);
                button.removeEventListener("pointerleave", reverse);
                button.removeEventListener("focus", play);
                button.removeEventListener("blur", reverse);
                timeline.kill();
              };
            },
          );

          document.addEventListener("click", handleAnchorClick);

          return () => {
            document.removeEventListener("click", handleAnchorClick);
            buttonCleanups.forEach((cleanup) => cleanup());
            smoother.kill();
          };
        },
      );

      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const sections = gsap.utils.toArray<HTMLElement>(
            "[data-gsap-pinned-section]",
          );

          sections.forEach((section) => {
            const panels = Array.from(
              section.querySelectorAll<HTMLElement>("[data-gsap-panel]"),
            );

            panels.forEach((panel, index) => {
              gsap.set(panel, {
                zIndex: index + 1,
                transformOrigin: "center top",
              });

              if (index === panels.length - 1) return;

              ScrollTrigger.create({
                trigger: panel,
                start: "top top+=104",
                endTrigger: section,
                end: "bottom bottom-=72",
                pin: true,
                pinSpacing: false,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              });

              gsap.to(panel, {
                scale: 0.94,
                filter: "blur(2px)",
                ease: "none",
                scrollTrigger: {
                  trigger: panels[index + 1],
                  start: "top bottom-=160",
                  end: "top top+=136",
                  scrub: true,
                },
              });
            });
          });

          ScrollTrigger.refresh();
        },
      );

      dispose = () => media.revert();
    })();

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef} className="pt-18">
        {children}
      </div>
    </div>
  );
}
