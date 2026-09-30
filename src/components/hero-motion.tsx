"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, SplitText);

export function HeroMotion({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const title = container.current?.querySelector<HTMLElement>("[data-hero-title]");
    const description = container.current?.querySelector<HTMLElement>("[data-hero-description]");
    if (!title || !description) return;
    // Never introduce motion after a reduced-motion visit or a restored scroll.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.scrollY > 0) return;

    const media = gsap.matchMedia();
    let hasPlayed = false;

    media.add("screen and (prefers-reduced-motion: no-preference)", () => {
      if (hasPlayed) return;
      hasPlayed = true;

      const mobile = window.matchMedia("(max-width: 48rem)").matches;

      SplitText.create(title, {
        type: "lines",
        linesClass: "hero-line",
        tag: "span",
        aria: "auto",
        autoSplit: true,
        onSplit(self) {
          // Returning the timeline preserves progress if fonts or width change.
          // No mask or fade here: the essential heading is always readable.
          return gsap.timeline({
            defaults: { ease: "power3.out", clearProps: "transform" },
            onComplete: () => self.revert(),
          })
            .addLabel("title", 0)
            .from(self.lines, {
              y: mobile ? 8 : 20,
              duration: mobile ? 0.35 : 0.55,
              stagger: { amount: mobile ? 0.04 : 0.1 },
            }, "title")
            .from(description, {
              y: mobile ? 6 : 12,
              duration: mobile ? 0.3 : 0.45,
            }, mobile ? 0.06 : 0.12);
        },
      });
    }, container);

    return () => media.revert();
  }, { scope: container });

  return <div ref={container}>{children}</div>;
}
