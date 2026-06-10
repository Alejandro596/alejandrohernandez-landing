"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { createFlight } from "./PlaneScene";

const PlaneScene = dynamic(() => import("./PlaneScene"), { ssr: false });

// Frases del bucle: cambiar cuando esté el copy definitivo
const TEXTS = [
  "Tus ventas se duermen a las 5 PM.",
  "Sofía no duerme.",
  "Míralo tú mismo.",
];

const HOLD = 2.4; // segundos de lectura antes de cada pasada

export default function PlaneLoop() {
  const [canvasOn, setCanvasOn] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const h2ARef = useRef<HTMLHeadingElement>(null);
  const h2BRef = useRef<HTMLHeadingElement>(null);
  const flightRef = useRef(createFlight());

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // frase estática, sin avión ni bucle

    setCanvasOn(true);

    const section = sectionRef.current!;
    const layers = [h2ARef.current!, h2BRef.current!];
    let active = 0;
    let step = 0;
    let chars = buildText(layers[0], TEXTS[0]);
    let tl: gsap.core.Timeline | null = null;
    let delayed: gsap.core.Tween | null = null;
    let killed = false;

    const f = flightRef.current;

    // Las letras caen al piso de la sección y se quedan ahí.
    // Se fija el ancho de cada letra para poder cambiarle el glifo después sin reflow.
    const drop = (targets: HTMLElement[]) => {
      const sec = section.getBoundingClientRect();
      targets.forEach((el) => {
        const r = el.getBoundingClientRect();
        el.style.width = `${r.width}px`;
        el.style.textAlign = "center";
      });
      gsap.to(targets, {
        y: (_i: number, el: Element) =>
          sec.bottom - el.getBoundingClientRect().bottom - 16 - Math.random() * 40,
        x: () => gsap.utils.random(20, 240),
        rotation: () => gsap.utils.random(-130, 150),
        duration: 1.35,
        ease: "bounce.out",
        stagger: { each: 0.013, from: "start" },
      });
    };

    // LAS MISMAS letras caídas se levantan del piso, vuelan a la posición de la
    // frase nueva y cambian de glifo a mitad de vuelo (mientras rotan).
    const riseInto = (idx: number, fallen: HTMLElement[]): HTMLElement[] => {
      const targetLayer = layers[1 - active];
      const newChars = buildText(targetLayer, TEXTS[idx]);
      gsap.set(newChars, { opacity: 0 });

      const targets = newChars
        .map((c) => {
          const r = c.getBoundingClientRect();
          return { el: c, cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
        })
        .sort((a, b) => a.cy - b.cy || a.cx - b.cx);

      let floaters = fallen.map((el) => {
        const r = el.getBoundingClientRect();
        return { el, cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
      });

      // Si la frase nueva necesita más letras, se clonan del montón del piso
      while (floaters.length < targets.length) {
        const proto = floaters[Math.floor(Math.random() * floaters.length)].el;
        const clone = proto.cloneNode(true) as HTMLElement;
        proto.parentElement!.appendChild(clone);
        gsap.set(clone, { x: `+=${gsap.utils.random(-90, 90)}` });
        const r = clone.getBoundingClientRect();
        floaters.push({ el: clone, cx: r.left + r.width / 2, cy: r.top + r.height / 2 });
      }
      floaters = floaters.sort((a, b) => a.cx - b.cx);

      const used = floaters.slice(0, targets.length);
      const surplus = floaters.slice(targets.length);
      const sec = section.getBoundingClientRect();

      used.forEach((fl, i) => {
        const t = targets[i];
        const el = fl.el;
        const glyph = t.el.textContent ?? "";
        const curX = Number(gsap.getProperty(el, "x"));
        const curY = Number(gsap.getProperty(el, "y"));
        let swapped = false;
        gsap.to(el, {
          x: curX + (t.cx - fl.cx),
          y: curY + (t.cy - fl.cy),
          rotation: 0,
          duration: 1.25,
          delay: i * 0.016,
          ease: "power2.inOut",
          onUpdate() {
            if (!swapped && this.progress() > 0.5) {
              swapped = true;
              el.textContent = glyph;
            }
          },
        });
      });

      // Las letras que sobran salen volando por arriba
      surplus.forEach((fl, i) => {
        gsap.to(fl.el, {
          y: `-=${sec.height}`,
          rotation: "+=140",
          opacity: 0,
          duration: 1.0,
          delay: i * 0.02,
          ease: "power2.in",
        });
      });

      // Al aterrizar todas: se muestran las letras reales y se limpia la capa vieja
      gsap.delayedCall(1.3 + used.length * 0.016, () => {
        gsap.set(newChars, { opacity: 1 });
        layers[active].innerHTML = "";
      });

      return newChars;
    };

    const cycle = () => {
      if (killed) return;
      const mobile = window.innerWidth < 640;
      const passScale = mobile ? 0.6 : 1.15;
      const turnScale = mobile ? 0.45 : 0.85;
      const nextStep = (step + 1) % TEXTS.length;
      const oldChars = chars;
      let nextChars: HTMLElement[] = [];

      tl = gsap.timeline({
        onComplete: () => {
          const oldLayer = layers[active];
          active = 1 - active;
          step = nextStep;
          chars = nextChars;
          oldLayer.innerHTML = "";
          delayed = gsap.delayedCall(HOLD, cycle);
        },
      });

      // 1) Pasada frontal: cruza y tumba las letras
      tl.set(f, { x: -8, y: -0.15, z: 0.6, rotX: 0.05, rotY: 0, rotZ: -0.06, scale: passScale, visible: true, flying: true }, 0);
      tl.to(f, { x: 8, duration: 1.05, ease: "power1.in" }, 0);
      tl.to(f, { y: 0.22, rotZ: 0.1, duration: 1.05, ease: "sine.inOut" }, 0);
      tl.add(() => drop(oldChars), 0.45);

      // 2) Regreso lento por el fondo, con tiempo para la reconstrucción
      tl.set(f, { z: -4.2, x: 9.5, y: 1.4, rotY: Math.PI * 0.12, rotZ: 0.12, scale: turnScale }, 1.15);
      tl.to(f, { rotY: Math.PI * 0.85, rotZ: 0.5, duration: 0.6, ease: "power2.out" }, 1.15);
      tl.to(f, { rotY: Math.PI, rotZ: 0.18, duration: 0.6, ease: "sine.out" }, 1.75);
      tl.to(f, { x: -9.5, duration: 2.7, ease: "sine.inOut" }, 1.25);
      tl.to(f, { y: 0.8, duration: 1.35, ease: "sine.in" }, 1.25);
      tl.to(f, { y: 1.25, duration: 1.3, ease: "sine.out" }, 2.6);

      // 3) Mientras vuelve, las letras caídas se levantan y arman la frase nueva
      tl.add(() => {
        nextChars = riseInto(nextStep, oldChars);
      }, 1.9);

      tl.set(f, { visible: false, flying: false }, 4.0);
      tl.to({}, { duration: 0.1 }, 4.0);
    };

    delayed = gsap.delayedCall(HOLD + 0.8, cycle);

    // Pausar el bucle cuando la sección no está en pantalla
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tl?.resume();
          delayed?.resume();
        } else {
          tl?.pause();
          delayed?.pause();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(section);

    return () => {
      killed = true;
      io.disconnect();
      tl?.kill();
      delayed?.kill();
    };
  }, []);

  const h2Class =
    "display absolute inset-0 z-10 flex items-center justify-center px-6 text-center text-4xl font-semibold leading-[1.06] sm:text-6xl md:text-7xl";

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[88svh] min-h-[540px] items-center justify-center overflow-hidden border-b border-hairline"
      aria-label={TEXTS.join(" ")}
    >
      {canvasOn && (
        <div className="pointer-events-none absolute inset-0 z-20" aria-hidden>
          <PlaneScene flight={flightRef.current} />
        </div>
      )}

      {/* Dos capas de texto: la activa cae, la otra sube con la frase nueva */}
      <h2 ref={h2ARef} className={h2Class} suppressHydrationWarning />
      <noscript>
        <p className={h2Class}>{TEXTS[0]}</p>
      </noscript>
      <h2 ref={h2BRef} className={h2Class} aria-hidden />

      <div className="absolute bottom-7 z-30 flex flex-col items-center gap-2 text-ink-muted" aria-hidden>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-bounce" >
          <path d="M12 4v16m-6-6 6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}

function buildText(el: HTMLElement, text: string): HTMLElement[] {
  el.innerHTML = "";
  // Un único contenedor: el h2 es flex y se comería los espacios entre items
  const wrap = document.createElement("span");
  wrap.className = "block";
  const words = text.split(" ");
  words.forEach((word, wi) => {
    const w = document.createElement("span");
    w.className = "inline-block whitespace-nowrap";
    for (const ch of word) {
      const c = document.createElement("span");
      c.className = "ch inline-block will-change-transform";
      c.textContent = ch;
      w.appendChild(c);
    }
    wrap.appendChild(w);
    if (wi < words.length - 1) wrap.appendChild(document.createTextNode(" "));
  });
  el.appendChild(wrap);
  return Array.from(el.querySelectorAll<HTMLElement>(".ch"));
}
