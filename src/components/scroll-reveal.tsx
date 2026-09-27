"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = ComponentPropsWithoutRef<"div"> & {
  variant?: "block" | "project" | "timeline" | "stagger";
};

/** A local animation boundary; its content is still rendered by the server. */
export function ScrollReveal({ children, variant = "block", ...props }: Props) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const root = container.current;
    if (!root) return;

    const played = new WeakSet<HTMLElement>();
    const media = gsap.matchMedia();

    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
      mobile: "(max-width: 48rem)",
      screen: "screen",
    }, (context) => {
      if (!context.conditions?.motion || !context.conditions.screen) return;

      const mobile = context.conditions.mobile;
      const select = gsap.utils.selector(root);
      const targets = variant === "timeline"
        ? gsap.utils.toArray<HTMLElement>(".timeline > li", root)
        : [root];

      targets.forEach((target) => {
        // Preserve already-read content when returning via an anchor or history.
        if (played.has(target)) return;
        if (window.scrollY > 0 && target.getBoundingClientRect().top < window.innerHeight * 0.85) {
          played.add(target);
          return;
        }

        const timeline = gsap.timeline({
          defaults: {
            duration: mobile ? 0.4 : 0.6,
            ease: "power3.out",
            // Nothing is moved or hidden while waiting below the viewport.
            immediateRender: false,
            clearProps: "transform",
          },
          scrollTrigger: {
            trigger: target,
            start: "top 85%",
            end: "bottom top",
            once: true,
            onEnter: () => { played.add(target); },
            onLeave: (trigger) => { trigger.animation?.progress(1); },
          },
        });

        if (variant === "stagger" && !mobile) {
          timeline.from(select("[data-reveal-item]"), { y: 16, stagger: 0.07 });
        } else {
          timeline.from(target, { y: mobile ? 10 : variant === "project" ? 24 : 18 });
        }

        if (variant === "project") {
          // Only the aria-hidden cover receives decorative scaling.
          timeline
            .from(select(".project-wordmark"), { scale: mobile ? 0.99 : 0.98 }, 0)
            .from(select(".project-cover-rule"), {
              scaleX: 0,
              transformOrigin: "left center",
              clearProps: "transform,transformOrigin",
              duration: mobile ? 0.3 : 0.45,
            }, mobile ? 0.05 : 0.12);
        }
      });
    }, container);

    // Native details change the positions of the sections below each project.
    const refresh = () => ScrollTrigger.refresh();
    if (variant === "project") root.addEventListener("toggle", refresh, true);

    return () => {
      root.removeEventListener("toggle", refresh, true);
      media.revert();
    };
  }, { scope: container, dependencies: [variant], revertOnUpdate: true });

  return <div ref={container} {...props}>{children}</div>;
}
