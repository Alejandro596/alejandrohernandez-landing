"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import PlaneMark from "./PlaneMark";

// Duración total del preloader; Effects.tsx la usa para sincronizar la entrada del hero
export const PRELOADER_MS = 2100;

export default function Preloader() {
  const overlay = useRef<HTMLDivElement>(null);
  const plane = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.to(overlay.current, {
        autoAlpha: 0,
        duration: 0.4,
        delay: 0.3,
        onComplete: () => setGone(true),
      });
      return;
    }

    const tl = gsap.timeline({ onComplete: () => setGone(true) });

    tl.fromTo(
      plane.current,
      { x: -60, y: 60, opacity: 0, rotate: -8 },
      { x: 0, y: 0, opacity: 1, rotate: 0, duration: 0.7, ease: "power3.out" }
    )
      .fromTo(
        word.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.35"
      )
      // pequeño vuelo en el sitio, como flotando
      .to(plane.current, {
        y: -6,
        duration: 0.45,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
      })
      // despega hacia arriba a la derecha
      .to(plane.current, {
        x: "55vw",
        y: "-55vh",
        rotate: 10,
        scale: 0.6,
        opacity: 0,
        duration: 0.65,
        ease: "power2.in",
      })
      .to(word.current, { opacity: 0, y: -14, duration: 0.3 }, "<")
      // la cortina sube
      .to(overlay.current, {
        yPercent: -100,
        duration: 0.7,
        ease: "power4.inOut",
      });

    return () => {
      tl.kill();
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={overlay}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-bg"
      aria-hidden
    >
      <div ref={plane}>
        <PlaneMark size={84} />
      </div>
      <div ref={word} className="mt-6 flex flex-col items-center gap-2">
        <span className="display text-xl font-semibold tracking-tight">
          SKYMENT<span className="text-accent-bright">.</span>
        </span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-ink-muted">
          Marketing digital
        </span>
      </div>
    </div>
  );
}
