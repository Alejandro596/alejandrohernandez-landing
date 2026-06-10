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
const INK = "#10160f";
const RUBBLE = "#b8c4b0";

type Target = { glyph: string; x: number; y: number };

export default function PlaneLoop() {
  const [canvasOn, setCanvasOn] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const templateRef = useRef<HTMLHeadingElement>(null);
  const poolBoxRef = useRef<HTMLDivElement>(null);
  const flightRef = useRef(createFlight());

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current!;
    const stage = stageRef.current!;
    const template = templateRef.current!;
    const poolBox = poolBoxRef.current!;

    let pool: HTMLElement[] = [];
    let step = 0;
    let tl: gsap.core.Timeline | null = null;
    let delayed: gsap.core.Tween | null = null;
    let killed = false;

    // Mide dónde va cada letra de una frase (la plantilla está invisible pero ocupa layout)
    const measure = (idx: number): Target[] => {
      buildTemplate(template, TEXTS[idx]);
      const sr = stage.getBoundingClientRect();
      return Array.from(template.querySelectorAll<HTMLElement>(".tch")).map((c) => {
        const r = c.getBoundingClientRect();
        return { glyph: c.textContent ?? "", x: r.left - sr.left, y: r.top - sr.top };
      });
    };

    const spawn = (t: Target): HTMLElement => {
      const s = document.createElement("span");
      s.className = "absolute left-0 top-0 inline-block will-change-transform";
      s.textContent = t.glyph;
      s.style.color = INK;
      poolBox.appendChild(s);
      gsap.set(s, { x: t.x, y: t.y });
      return s;
    };

    const init = () => {
      if (killed) return;
      const targets = measure(step);
      pool = targets.map(spawn);
      if (reduced) return; // frase estática, sin avión ni bucle
      setCanvasOn(true);
      delayed = gsap.delayedCall(HOLD + 0.8, cycle);
      io.observe(section);
    };

    // Caen al piso del stage y se quedan ahí, atenuadas
    const drop = () => {
      const floorBase = stage.clientHeight;
      gsap.to(pool, {
        y: (_i: number, el: HTMLElement) =>
          floorBase - el.offsetHeight - 10 - Math.random() * 34,
        x: () => `+=${gsap.utils.random(-30, 150)}`,
        rotation: () => gsap.utils.random(-75, 85),
        color: RUBBLE,
        duration: 1.35,
        ease: "bounce.out",
        stagger: { each: 0.013, from: "start" },
      });
    };

    // Las mismas letras del piso vuelan a la frase nueva; el glifo cambia a mitad de giro
    const rise = (idx: number) => {
      const targets = measure(idx);
      const stageH = stage.clientHeight;
      const stageW = stage.clientWidth;

      let floaters = [...pool].sort(
        (a, b) => Number(gsap.getProperty(a, "x")) - Number(gsap.getProperty(b, "x"))
      );

      // Faltan letras: emergen desde abajo del borde, entre el montón
      while (floaters.length < targets.length) {
        const s = document.createElement("span");
        s.className = "absolute left-0 top-0 inline-block will-change-transform";
        s.textContent = "a";
        s.style.color = RUBBLE;
        poolBox.appendChild(s);
        gsap.set(s, {
          x: gsap.utils.random(stageW * 0.1, stageW * 0.85),
          y: stageH + 40,
          rotation: gsap.utils.random(-70, 70),
        });
        floaters.push(s);
      }
      floaters = floaters.sort(
        (a, b) => Number(gsap.getProperty(a, "x")) - Number(gsap.getProperty(b, "x"))
      );

      const used = floaters.slice(0, targets.length);
      const surplus = floaters.slice(targets.length);

      used.forEach((el, i) => {
        const t = targets[i];
        let swapped = false;
        gsap.to(el, {
          x: t.x,
          y: t.y,
          rotation: 0,
          color: INK,
          duration: 1.3,
          delay: i * 0.014,
          ease: "power2.inOut",
          onUpdate() {
            if (!swapped && this.progress() > 0.5) {
              swapped = true;
              el.textContent = t.glyph;
            }
          },
        });
      });

      // Sobran letras: salen volando por arriba, SIN desvanecerse
      surplus.forEach((el, i) => {
        gsap.to(el, {
          y: -120 - Math.random() * 120,
          x: `+=${gsap.utils.random(-40, 180)}`,
          rotation: `+=${gsap.utils.random(60, 200)}`,
          duration: 1.05,
          delay: i * 0.02,
          ease: "power2.in",
          onComplete: () => el.remove(),
        });
      });

      pool = used;
    };

    const cycle = () => {
      if (killed) return;
      const mobile = window.innerWidth < 640;
      const m = mobile ? 0.45 : 1; // compresión horizontal de la curva en pantallas angostas
      const passScale = mobile ? 0.6 : 1.15;
      const turnScale = mobile ? 0.45 : 0.85;
      const nextStep = (step + 1) % TEXTS.length;
      const f = flightRef.current;

      tl = gsap.timeline({
        onComplete: () => {
          step = nextStep;
          delayed = gsap.delayedCall(HOLD, cycle);
        },
      });

      // 1) Pasada frontal: cruza y tumba las letras
      tl.set(f, { x: -9.5, y: -0.15, z: 0.6, rotX: 0.05, rotY: 0, rotZ: -0.06, scale: passScale, visible: true, flying: true }, 0);
      tl.to(f, { x: mobile ? 2.4 : 5.2, duration: 1.05, ease: "power1.in" }, 0);
      tl.to(f, { y: 0.15, duration: 1.05, ease: "sine.inOut" }, 0);
      tl.add(drop, 0.45);

      // 2) Curva en U continua y visible: trepa por la derecha, se ladea,
      //    se hunde en profundidad girando y cruza el fondo ya volteado
      tl.to(f, { x: 7.8 * m, duration: 0.55, ease: "sine.out" }, 1.05);
      tl.to(f, { x: 6.2 * m, duration: 0.45, ease: "sine.in" }, 1.6);
      tl.to(f, { y: 2.1, duration: 1.0, ease: "sine.out" }, 1.05);
      tl.to(f, { z: -2.6, duration: 1.0, ease: "sine.inOut" }, 1.05);
      tl.to(f, { rotY: Math.PI * 0.6, duration: 1.0, ease: "power1.inOut" }, 1.05);
      tl.to(f, { rotZ: 0.6, duration: 0.8, ease: "sine.inOut" }, 1.1);
      tl.to(f, { scale: turnScale, duration: 1.0, ease: "sine.inOut" }, 1.05);

      tl.to(f, { x: -15, duration: 2.65, ease: "sine.inOut" }, 2.05);
      tl.to(f, { z: -4.4, duration: 1.2, ease: "sine.inOut" }, 2.05);
      tl.to(f, { rotY: Math.PI, duration: 0.8, ease: "sine.out" }, 2.05);
      tl.to(f, { rotZ: 0.14, duration: 1.0, ease: "sine.inOut" }, 2.3);
      tl.to(f, { y: 1.0, duration: 1.6, ease: "sine.inOut" }, 2.05);
      tl.to(f, { y: 1.3, duration: 1.0, ease: "sine.out" }, 3.65);

      // 3) Mientras vuelve por el fondo, las letras suben y se rearman
      tl.add(() => rise(nextStep), 2.0);

      tl.set(f, { visible: false, flying: false }, 4.75);
      tl.to({}, { duration: 0.05 }, 4.75);
    };

    // Reacomodo instantáneo si cambia el tamaño entre ciclos
    let resizeT: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(() => {
        if (killed || (tl && tl.isActive())) return;
        const targets = measure(step);
        pool.forEach((el, i) => {
          const t = targets[i];
          if (t) gsap.set(el, { x: t.x, y: t.y, rotation: 0 });
        });
      }, 250);
    };
    window.addEventListener("resize", onResize);

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

    // Medir solo cuando la fuente ya cargó (si no, las letras quedan corridas)
    document.fonts.ready.then(init);

    return () => {
      killed = true;
      clearTimeout(resizeT);
      window.removeEventListener("resize", onResize);
      io.disconnect();
      tl?.kill();
      delayed?.kill();
      poolBox.innerHTML = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const typeClass =
    "display text-4xl font-semibold leading-[1.06] sm:text-6xl md:text-7xl";

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

      <div ref={stageRef} className="absolute inset-0 z-10" aria-hidden>
        {/* Plantilla invisible: define dónde va cada letra */}
        <h2
          ref={templateRef}
          className={`invisible absolute inset-0 flex items-center justify-center px-6 text-center ${typeClass}`}
        />
        {/* Pool de letras permanentes: caen, suben y se transforman, nunca se borran */}
        <div ref={poolBoxRef} className={`absolute inset-0 ${typeClass}`} />
      </div>

      <noscript>
        <p className={`absolute inset-0 z-10 flex items-center justify-center px-6 text-center ${typeClass}`}>
          {TEXTS[0]}
        </p>
      </noscript>

      {/* Texto pequeño fijo: el avión no lo toca */}
      <p className="absolute inset-x-0 top-[calc(50%+92px)] z-10 mx-auto max-w-md px-6 text-center text-sm leading-relaxed text-ink-muted sm:top-[calc(50%+128px)] md:top-[calc(50%+150px)] md:text-base">
        Un sistema de IA que atiende, vende y agenda por WhatsApp, las 24 horas.
      </p>

      <div className="absolute bottom-7 z-30 flex flex-col items-center gap-2 text-ink-muted" aria-hidden>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-bounce">
          <path d="M12 4v16m-6-6 6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}

function buildTemplate(el: HTMLElement, text: string) {
  el.innerHTML = "";
  const wrap = document.createElement("span");
  wrap.className = "block";
  const words = text.split(" ");
  words.forEach((word, wi) => {
    const w = document.createElement("span");
    w.className = "inline-block whitespace-nowrap";
    for (const ch of word) {
      const c = document.createElement("span");
      c.className = "tch inline-block";
      c.textContent = ch;
      w.appendChild(c);
    }
    wrap.appendChild(w);
    if (wi < words.length - 1) wrap.appendChild(document.createTextNode(" "));
  });
  el.appendChild(wrap);
}
