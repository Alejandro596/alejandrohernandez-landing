"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { createFlight } from "./PlaneScene";

gsap.registerPlugin(MotionPathPlugin);

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

    // El impacto primero las lanza (golpe seco), luego caen con física
    const drop = () => {
      const floorBase = stage.clientHeight;
      const tlD = gsap.timeline();
      tlD.to(pool, {
        y: () => `-=${gsap.utils.random(16, 60)}`,
        x: () => `+=${gsap.utils.random(12, 70)}`,
        rotation: () => gsap.utils.random(-35, 40),
        color: RUBBLE,
        duration: 0.18,
        ease: "power2.out",
        stagger: { each: 0.013, from: "start" },
      });
      tlD.to(
        pool,
        {
          y: (_i: number, el: HTMLElement) =>
            floorBase - el.offsetHeight - 10 - Math.random() * 34,
          x: () => `+=${gsap.utils.random(-25, 100)}`,
          rotation: () => gsap.utils.random(-75, 85),
          duration: 1.25,
          ease: "bounce.out",
          stagger: { each: 0.013, from: "start" },
        },
        0.17
      );
    };

    // Sacudida de toda la sección en el choque
    const shake = () => {
      const amp = window.innerWidth < 640 ? 5 : 9;
      const tlS = gsap.timeline();
      for (let i = 0; i < 6; i++) {
        const d = amp * (1 - i / 6);
        tlS.to(section, {
          x: gsap.utils.random(-d, d),
          y: gsap.utils.random(-d / 2, d / 2),
          duration: 0.045,
        });
      }
      tlS.to(section, { x: 0, y: 0, duration: 0.08 });
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
      const nextStep = (step + 1) % TEXTS.length;
      const f = flightRef.current;

      tl = gsap.timeline({
        onComplete: () => {
          step = nextStep;
          delayed = gsap.delayedCall(HOLD, cycle);
        },
      });

      // 1) Pasada frontal (la de siempre): cruza rápido y tumba las letras
      tl.set(f, { x: -9.5, y: -0.15, z: 0.6, rotX: 0.05, rotY: 0, rotZ: -0.06, scale: passScale, visible: true, flying: true }, 0);
      tl.to(f, { x: mobile ? 2.4 : 5.2, duration: 1.05, ease: "power1.in" }, 0);
      tl.to(f, { y: 0.15, duration: 1.05, ease: "sine.inOut" }, 0);
      tl.add(() => {
        drop();
        shake();
      }, 0.45);
      // El avión también acusa el golpe
      tl.to(f, { rotZ: 0.24, y: "+=0.12", duration: 0.12, ease: "power2.out" }, 0.45);
      tl.to(f, { rotZ: 0.04, duration: 0.35, ease: "sine.out" }, 0.58);

      // 2) Retorno: UNA SOLA curva continua (sin frenadas) que arranca donde
      //    terminó la pasada, trepa por la derecha, se hunde y cruza el fondo
      tl.to(f, {
        motionPath: {
          path: [
            { x: 8.6 * m, y: 1.3, z: -1.6 },
            { x: 10.5 * m, y: 2.0, z: -5.5 },
            { x: 5.5, y: 2.1, z: -10 },
            { x: 0, y: 2.1, z: -11.5 },
            { x: -7, y: 2.1, z: -12 },
            { x: -17, y: 2.1, z: -12 },
          ],
          curviness: 0.9,
        },
        duration: 3.5,
        ease: "none",
      }, 1.08);

      // 3) Mientras vuelve por el fondo, las letras suben y se rearman
      tl.add(() => rise(nextStep), 2.0);

      tl.set(f, { visible: false, flying: false }, 4.6);
      tl.to({}, { duration: 0.05 }, 4.6);
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
