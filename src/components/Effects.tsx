"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { PRELOADER_MS } from "./Preloader";

gsap.registerPlugin(ScrollTrigger);

export default function Effects() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set("[data-reveal], [data-reveal-group] > *", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      });
      return;
    }

    const lenis = new Lenis({ lerp: 0.12 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Hero entra en cascada cuando el preloader levanta la cortina
      gsap.to("[data-hero] [data-reveal]", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        delay: (PRELOADER_MS - 500) / 1000,
      });

      // Reveals individuales al hacer scroll
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.closest("[data-hero]")) return;
        gsap.to(el, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      // Grupos con stagger
      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        gsap.to(group.children, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 82%", once: true },
        });
      });

      // Contadores de métricas
      gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
        const target = parseFloat(el.dataset.counter ?? "0");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString("es-CO");
          },
        });
      });

      // Parallax sutil de orbes ambientales
      gsap.utils.toArray<HTMLElement>("[data-orb]").forEach((orb, i) => {
        gsap.to(orb, {
          yPercent: i % 2 === 0 ? 22 : -18,
          ease: "none",
          scrollTrigger: {
            trigger: orb.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      // Si se llega con ancla (#servicios, #faq…), completar lo que ya quedó arriba
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
