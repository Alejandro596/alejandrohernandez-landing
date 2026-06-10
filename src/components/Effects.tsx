"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// Scroll suave (Lenis) + fades sutiles al entrar (GSAP). Nada más pesado.
export default function Effects() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set("[data-reveal], [data-reveal-group] > *", { opacity: 1, y: 0 });
      return;
    }

    const lenis = new Lenis({ lerp: 0.12, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.to("[data-hero] [data-reveal]", {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.closest("[data-hero]")) return;
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        gsap.to(group.children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 82%", once: true },
        });
      });

      // Deep links con ancla: completar lo que quedó arriba del scroll
      ScrollTrigger.refresh();
      ScrollTrigger.getAll().forEach((st) => {
        if (!st.vars.scrub && st.progress > 0) {
          (st.animation as gsap.core.Tween | undefined)?.progress(1);
        }
      });
    });

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return null;
}
