"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { scrollState } from "@/lib/scroll";
import { createFlight } from "./PlaneScene";

const PlaneScene = dynamic(() => import("./PlaneScene"), { ssr: false });

// Placeholders: cambiar cuando esté el copy definitivo del intro
const TEXTS = [
  "Tus ventas se duermen a las 5 PM.",
  "Sofía no duerme.",
  "Míralo tú mismo.",
];

export default function ScrollIntro() {
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const flightRef = useRef(createFlight());
  const stepRef = useRef(0);
  const phaseRef = useRef<"idle" | "playing" | "done">("idle");
  const charsRef = useRef<HTMLElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const skipRef = useRef<() => void>(() => {});
  const subTweensRef = useRef<gsap.core.Tween[]>([]);
  const cooldownRef = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || window.scrollY > 4) {
      setDone(true);
      return;
    }

    const html = document.documentElement;
    html.style.overflow = "hidden";
    const stopLenis = () => scrollState.lenis?.stop();
    stopLenis();
    // Lenis puede montarse después que el intro: reintentar un momento
    const lenisRetry = setInterval(stopLenis, 200);
    setTimeout(() => clearInterval(lenisRetry), 2000);

    const textEl = textRef.current!;
    charsRef.current = buildText(textEl, TEXTS[0]);
    cooldownRef.current = performance.now() + 500;

    const finish = () => {
      if (phaseRef.current === "done") return;
      phaseRef.current = "done";
      clearInterval(lenisRetry);
      html.style.overflow = "";
      scrollState.lenis?.start();
      window.scrollTo(0, 0);
      setDone(true);
    };

    const explode = (chars: HTMLElement[]) => {
      const tween = gsap.to(chars, {
        x: () => gsap.utils.random(30, 420),
        y: () => gsap.utils.random(-300, 260),
        rotation: () => gsap.utils.random(-170, 210),
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: { each: 0.012, from: "start" },
      });
      tween.timeScale(tlRef.current?.timeScale() ?? 1);
      subTweensRef.current.push(tween);
    };

    const rebuild = (idx: number) => {
      const chars = buildText(textEl, TEXTS[idx]);
      charsRef.current = chars;
      const tween = gsap.fromTo(
        chars,
        {
          x: () => gsap.utils.random(-90, 90),
          y: () => gsap.utils.random(-70, 70),
          rotation: () => gsap.utils.random(-45, 45),
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: { each: 0.02, from: "random" },
        }
      );
      tween.timeScale(tlRef.current?.timeScale() ?? 1);
      subTweensRef.current.push(tween);
    };

    const play = () => {
      const step = stepRef.current;
      const f = flightRef.current;
      const isLast = step === TEXTS.length - 1;
      const mobile = window.innerWidth < 640;
      const passScale = mobile ? 0.6 : 1.15;
      const turnScale = mobile ? 0.45 : 0.85;
      phaseRef.current = "playing";
      subTweensRef.current = [];

      const tl = gsap.timeline({
        onComplete: () => {
          if (isLast) {
            finish();
            return;
          }
          phaseRef.current = "idle";
          cooldownRef.current = performance.now() + 650;
        },
      });
      tlRef.current = tl;

      // 1) Pase frontal: el avión cruza y destruye el texto
      tl.set(f, { x: -7.5, y: -0.15, z: 0.6, rotX: 0.05, rotY: 0, rotZ: -0.06, scale: passScale, visible: true, idle: false }, 0);
      tl.to(f, { x: 7.5, duration: 1.0, ease: "power1.in" }, 0);
      tl.to(f, { y: 0.25, rotZ: 0.1, duration: 1.0, ease: "sine.inOut" }, 0);
      tl.add(() => explode(charsRef.current), 0.42);

      if (!isLast) {
        // 2) Vuelta por el fondo (se le ve girar al fondo, derecha → izquierda)
        tl.set(f, { z: -4.2, x: 9, y: 1.35, rotY: Math.PI * 0.12, rotZ: 0.12, scale: turnScale }, 1.05);
        tl.to(f, { rotY: Math.PI * 0.85, rotZ: 0.5, duration: 0.5, ease: "power2.out" }, 1.05);
        tl.to(f, { rotY: Math.PI, rotZ: 0.16, duration: 0.5, ease: "sine.out" }, 1.55);
        tl.to(f, { x: -9, duration: 1.55, ease: "sine.inOut" }, 1.12);
        tl.to(f, { y: 0.7, duration: 0.8, ease: "sine.in" }, 1.12);
        tl.to(f, { y: 1.05, duration: 0.75, ease: "sine.out" }, 1.92);
        // 3) Mientras gira atrás, el texto nuevo se reconstruye
        tl.add(() => rebuild(step + 1), 1.3);
        tl.add(() => {
          stepRef.current = step + 1;
        }, 2.45);
        tl.set(f, { visible: false }, 2.67);
        tl.to({}, { duration: 0.1 }, 2.67); // colchón final del timeline
      } else {
        // Final: el avión se eleva y la cortina libera la página
        tl.to(f, { x: 4.5, y: 4.4, z: 2, rotZ: 0.55, scale: 0.8, duration: 0.55, ease: "power2.in" }, 0.95);
        tl.set(f, { visible: false }, 1.55);
        tl.to(overlayRef.current, { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, 1.25);
      }
    };

    const accelerate = () => {
      const tl = tlRef.current;
      if (!tl) return;
      const next = Math.min(3, tl.timeScale() + 0.6);
      tl.timeScale(next);
      subTweensRef.current.forEach((t) => t.timeScale(next));
    };

    const intent = () => {
      if (phaseRef.current === "playing") {
        accelerate();
      } else if (phaseRef.current === "idle" && performance.now() > cooldownRef.current) {
        play();
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (phaseRef.current === "done") return;
      e.preventDefault();
      if (e.deltaY > 8) intent();
    };
    const onKey = (e: KeyboardEvent) => {
      if (phaseRef.current === "done") return;
      if (e.key === "Escape") {
        skip();
        return;
      }
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        intent();
      }
    };
    let touchY = 0;
    let gestureUsed = false;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
      gestureUsed = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (phaseRef.current === "done" || gestureUsed) return;
      if (touchY - e.touches[0].clientY > 34) {
        gestureUsed = true;
        intent();
      }
    };

    const skip = () => {
      tlRef.current?.kill();
      subTweensRef.current.forEach((t) => t.kill());
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.35, onComplete: finish });
    };
    skipRef.current = skip;

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      clearInterval(lenisRetry);
      html.style.overflow = "";
      scrollState.lenis?.start();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="intro-overlay fixed inset-0 z-[70] flex-col items-center justify-center bg-bg"
      style={{ touchAction: "none" }}
    >
      <div className="absolute inset-0 z-20" aria-hidden>
        <PlaneScene flight={flightRef.current} />
      </div>

      <span className="display absolute left-5 top-5 z-30 text-sm font-semibold tracking-tight md:left-8 md:top-7">
        Alejandro Hernández
      </span>

      <button
        onClick={() => skipRef.current()}
        className="absolute right-5 top-5 z-30 rounded-full border border-hairline px-4 py-2 text-xs font-medium text-ink-muted t-premium hover:text-ink md:right-8 md:top-7"
      >
        Saltar intro
      </button>

      <h2
        ref={textRef}
        className="display relative z-10 max-w-5xl px-6 text-center text-4xl font-semibold leading-[1.06] sm:text-6xl md:text-7xl"
      />

      <div className="absolute bottom-8 z-30 flex flex-col items-center gap-2 text-ink-muted">
        <span className="text-xs font-medium uppercase tracking-[0.18em]">Desliza</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-bounce" aria-hidden>
          <path d="M12 4v16m-6-6 6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function buildText(el: HTMLElement, text: string): HTMLElement[] {
  el.innerHTML = "";
  const frag = document.createDocumentFragment();
  const words = text.split(" ");
  words.forEach((word, wi) => {
    const w = document.createElement("span");
    w.className = "inline-block whitespace-nowrap";
    for (const ch of word) {
      const c = document.createElement("span");
      c.className = "inline-block will-change-transform";
      c.textContent = ch;
      w.appendChild(c);
    }
    frag.appendChild(w);
    if (wi < words.length - 1) frag.appendChild(document.createTextNode(" "));
  });
  el.appendChild(frag);
  return Array.from(el.querySelectorAll<HTMLElement>("span > span"));
}
