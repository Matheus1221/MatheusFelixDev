"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

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

        const animate = (split?: SplitText) => {
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
            onComplete: () => split?.revert(),
          }).addLabel("enter", 0);

          if (variant === "stagger" && !mobile) {
            timeline.from(select("[data-reveal-item]"), { y: 16, stagger: { amount: 0.18 } }, "enter");
          } else {
            timeline.from(target, { y: mobile ? 10 : variant === "project" ? 24 : 18 }, "enter");
          }

          if (split) {
            // Mask only the decorative duplicate; the real project title stays visible.
            timeline.addLabel("cover", mobile ? 0.04 : 0.06)
              .from(split.lines, {
                yPercent: mobile ? 30 : 100,
                duration: mobile ? 0.3 : 0.55,
                stagger: { amount: mobile ? 0.04 : 0.1 },
              }, "cover")
              .from(select(".project-cover-rule"), {
                scaleX: 0,
                transformOrigin: "left center",
                clearProps: "transform,transformOrigin",
                duration: mobile ? 0.3 : 0.45,
              }, "cover+=0.04");
          }

          return timeline;
        };

        const wordmark = variant === "project"
          ? target.querySelector<HTMLElement>(".project-wordmark")
          : null;

        if (wordmark) {
          SplitText.create(wordmark, {
            type: "lines",
            mask: "lines",
            linesClass: "project-title-line",
            tag: "span",
            aria: "none", // The parent cover already has aria-hidden="true".
            autoSplit: true,
            onSplit: animate,
          });
        } else {
          animate();
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
