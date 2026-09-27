"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function HeroMotion({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Never introduce motion after a reduced-motion visit or a restored scroll.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.scrollY > 0) return;

    const media = gsap.matchMedia();
    let hasPlayed = false;

    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (hasPlayed) return;
      hasPlayed = true;

      const mobile = window.matchMedia("(max-width: 48rem)").matches;

      // Transform only: text and links remain readable even if animation stops.
      gsap.timeline({ defaults: {
        duration: mobile ? 0.3 : 0.45,
        ease: "power3.out",
        clearProps: "transform",
      } })
        .from("[data-hero-title]", { y: mobile ? 6 : 12 })
        .from("[data-hero-description]", { y: mobile ? 6 : 12 }, mobile ? 0.04 : 0.08);
    }, container);

    return () => media.revert();
  }, { scope: container });

  return <div ref={container}>{children}</div>;
}
