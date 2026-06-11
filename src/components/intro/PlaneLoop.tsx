"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { createFlight, type FlightPathPoint } from "./PlaneScene";
import SofiaCta from "@/components/SofiaCta";

const PlaneScene = dynamic(() => import("./PlaneScene"), { ssr: false });

// Cada pasada: el avión tumba la frase mala y las letras se rearman en la buena
const PAIRS = [
  { bad: "Vender solo hasta las 5 PM", good: "Vendes 24/7" },
  { bad: "Pagar 5 asesoras", good: "Vendes sin contratar a nadie" },
  { bad: "Dejar leads sin contestar", good: "Respondes en segundos" },
  { bad: "No saber qué pasó con tus leads", good: "Lo ves todo en tu CRM" },
];
// Tras el último par, la frase queda fija y aparece el CTA
const CLOSER = "Tu Sistema de Ventas Autónomo";

const HOLD = 2.4; // segundos de lectura entre fases
const FLIGHT = 5.8; // duración del recorrido completo (una sola curva)
const INK = "#f6fbf7"; // cierre
const BAD = "#ff6b5b"; // lo malo, en rojo
const GOOD = "#25d366"; // lo bueno, en el verde de la marca
const RUBBLE = "#8e4a40"; // escombros: rojo apagado en el piso

type Target = { glyph: string; x: number; y: number };

export default function PlaneLoop() {
  const [canvasOn, setCanvasOn] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const templateRef = useRef<HTMLHeadingElement>(null);
  const poolBoxRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const flightRef = useRef(createFlight());

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current!;
    const stage = stageRef.current!;
    const template = templateRef.current!;
    const poolBox = poolBoxRef.current!;
    const cta = ctaRef.current!;

    let pool: HTMLElement[] = [];
    let pairIdx = 0;
    let currentText = PAIRS[0].bad;
    let tl: gsap.core.Timeline | null = null;
    let delayed: gsap.core.Tween | null = null;
    let killed = false;

    // Mide dónde va cada letra de una frase (la plantilla está invisible pero ocupa layout)
    const measure = (text: string): Target[] => {
      buildTemplate(template, text);
      const sr = stage.getBoundingClientRect();
      return Array.from(template.querySelectorAll<HTMLElement>(".tch")).map((c) => {
        const r = c.getBoundingClientRect();
        return { glyph: c.textContent ?? "", x: r.left - sr.left, y: r.top - sr.top };
      });
    };

    const spawn = (t: Target, color: string): HTMLElement => {
      const s = document.createElement("span");
      s.className = "absolute left-0 top-0 inline-block will-change-transform";
      s.textContent = t.glyph;
      s.style.color = color;
      poolBox.appendChild(s);
      gsap.set(s, { x: t.x, y: t.y });
      return s;
    };

    const init = () => {
      if (killed) return;
      gsap.set(cta, { autoAlpha: 0, y: 16 });
      if (reduced) {
        // Sin animación: directo al cierre con su CTA
        pool = measure(CLOSER).map((t) => spawn(t, INK));
        gsap.set(cta, { autoAlpha: 1, y: 0 });
        return;
      }
      pool = measure(currentText).map((t) => spawn(t, BAD));
      setCanvasOn(true);
      delayed = gsap.delayedCall(HOLD + 0.8, cycle);
      io.observe(section);
    };

    // Golpe a UNA letra: la nariz la lanza en el sentido del vuelo y cae con física
    const knock = (el: HTMLElement) => {
      const floorBase = stage.clientHeight;
      const tlK = gsap.timeline();
      tlK.to(el, {
        y: `-=${gsap.utils.random(20, 70)}`,
        x: `+=${gsap.utils.random(30, 110)}`,
        rotation: gsap.utils.random(-50, 60),
        color: RUBBLE,
        duration: 0.16,
        ease: "power2.out",
      });
      tlK.to(
        el,
        {
          y: floorBase - el.offsetHeight - 10 - Math.random() * 34,
          x: `+=${gsap.utils.random(-20, 90)}`,
          rotation: gsap.utils.random(-75, 85),
          duration: 1.15,
          ease: "bounce.out",
        },
        0.15
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

    // Las mismas letras vuelan a la frase nueva; el glifo cambia a mitad de giro
    const morph = (text: string, color: string) => {
      currentText = text;
      const targets = measure(text);
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
          color,
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

      // Sobran letras: los escombros se hunden por DEBAJO del borde, sin
      // cruzar la zona visible (salir por arriba se notaba y se veía mal)
      surplus.forEach((el, i) => {
        gsap.to(el, {
          y: stageH + 80,
          x: `+=${gsap.utils.random(30, 140)}`,
          rotation: `+=${gsap.utils.random(-40, 80)}`,
          duration: 0.9,
          delay: i * 0.02,
          ease: "power1.in",
          onComplete: () => el.remove(),
        });
      });

      pool = used;
    };

    // La frase buena NO se destruye: sale completa por la derecha
    const slideOut = () => {
      const stageW = stage.clientWidth;
      const old = pool;
      pool = [];
      old.forEach((el, i) => {
        gsap.to(el, {
          x: `+=${stageW * 1.15 + Math.random() * 120}`,
          duration: 0.9,
          delay: i * 0.014,
          ease: "power2.in",
          onComplete: () => el.remove(),
        });
      });
    };

    // La frase mala siguiente entra por la izquierda, lista para el avión
    const slideIn = (text: string) => {
      currentText = text;
      const targets = measure(text);
      const stageW = stage.clientWidth;
      pool = targets.map((t, i) => {
        const s = spawn(t, BAD);
        gsap.set(s, { x: t.x - stageW * 1.15 - Math.random() * 120, y: t.y });
        gsap.to(s, { x: t.x, duration: 1.0, delay: i * 0.014, ease: "power2.out" });
        return s;
      });
    };

    // Cierre del round: la frase final respira con su CTA y el bucle reinicia
    const finish = () => {
      if (killed) return;
      morph(CLOSER, INK);
      gsap.to(cta, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 1.4 });
      delayed = gsap.delayedCall(HOLD * 2 + 2, () => {
        if (killed) return;
        gsap.to(cta, { autoAlpha: 0, y: 16, duration: 0.5, ease: "power1.in" });
        pairIdx = 0;
        slideOut();
        delayed = gsap.delayedCall(0.45, () => {
          if (killed) return;
          slideIn(PAIRS[0].bad);
          delayed = gsap.delayedCall(HOLD + 1.1, cycle);
        });
      });
    };

    const cycle = () => {
      if (killed) return;
      const mobile = window.innerWidth < 640;
      const m = mobile ? 0.45 : 1; // compresión horizontal de la curva en pantallas angostas
      const passScale = mobile ? 0.6 : 1.15;
      const f = flightRef.current;
      const pair = PAIRS[pairIdx];

      // Recorrido COMPLETO en una sola curva 3D: entra, cruza la frase, gira
      // amplio por la derecha y regresa por el fondo hasta salir. GSAP solo
      // empuja `progress`; la orientación la da la tangente de la curva.
      // z monótona tras el cruce: el avión nunca regresa hacia la cámara.
      // La cola llega a x=-26 para que la desaceleración del ease ocurra
      // FUERA de pantalla incluso en monitores ultrawide.
      const pts: FlightPathPoint[] = [
        { x: -9.5, y: -0.15, z: 0.6 },
        { x: -4.0, y: -0.06, z: 0.55 },
        { x: 1.6, y: 0.12, z: 0.45 },
        { x: mobile ? 3.4 : 6.4, y: 0.6, z: -0.4 },
        { x: 8.6 * m, y: 1.3, z: -1.6 },
        { x: 10.5 * m, y: 2.0, z: -5.5 },
        { x: 5.5, y: 2.1, z: -10 },
        { x: 0, y: 2.1, z: -11.5 },
        { x: -8, y: 2.1, z: -12 },
        { x: -26, y: 2.1, z: -12.2 },
      ];
      f.path = pts;
      f.pathVersion += 1;
      f.progress = 0;

      // Barrido de colisión: en cada frame se proyecta la NARIZ del avión a
      // píxeles de pantalla y se tumba toda letra que ya haya tocado. Las
      // letras caen una a una según el avión las alcanza, no en bloque.
      const lens: number[] = [0];
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        lens.push(lens[i - 1] + Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z));
      }
      const total = lens[lens.length - 1];
      const sampleXZ = (u: number) => {
        const s = u * total;
        for (let i = 1; i < lens.length; i++) {
          if (s <= lens[i]) {
            const fr = (s - lens[i - 1]) / (lens[i] - lens[i - 1] || 1);
            return {
              x: pts[i - 1].x + fr * (pts[i].x - pts[i - 1].x),
              z: pts[i - 1].z + fr * (pts[i].z - pts[i - 1].z),
            };
          }
        }
        return { x: pts[pts.length - 1].x, z: pts[pts.length - 1].z };
      };

      const knocked = new Set<HTMLElement>();
      let shaken = false;
      const sweep = () => {
        if (killed || f.progress <= 0 || f.progress > 0.5) return;
        const { x, z } = sampleXZ(f.progress);
        const stageW = stage.clientWidth;
        const stageH = stage.clientHeight;
        // El cruce frontal ocurre con z>0; al pasar a z<0 ya va de salida:
        // cualquier letra que quede en pie cae ahí mismo (red de seguridad)
        if (z <= 0) {
          if (knocked.size < pool.length && f.progress > 0.1) {
            pool.forEach((el) => {
              if (!knocked.has(el)) {
                knocked.add(el);
                knock(el);
              }
            });
          }
          return;
        }
        // Proyección 3D→px: cámara en z=8, fov vertical 42°
        const halfWorld = Math.tan((21 * Math.PI) / 180) * (8 - z) * (stageW / stageH);
        const noseWorld = x + 1.05 * passScale;
        const nosePx = stageW / 2 + (noseWorld / halfWorld) * (stageW / 2);
        pool.forEach((el) => {
          if (knocked.has(el)) return;
          const lx = Number(gsap.getProperty(el, "x")) + el.offsetWidth * 0.5;
          if (lx <= nosePx) {
            if (!shaken) {
              shaken = true;
              shake();
            }
            knocked.add(el);
            knock(el);
          }
        });
      };

      tl = gsap.timeline({
        onComplete: () => {
          if (killed) return;
          if (pairIdx >= PAIRS.length - 1) {
            delayed = gsap.delayedCall(HOLD + 0.4, finish);
          } else {
            delayed = gsap.delayedCall(HOLD, () => {
              if (killed) return;
              pairIdx += 1;
              slideOut(); // lo bueno se va entero por la derecha
              delayed = gsap.delayedCall(0.45, () => {
                if (killed) return;
                slideIn(PAIRS[pairIdx].bad); // lo malo nuevo entra por la izquierda
                delayed = gsap.delayedCall(HOLD + 1.1, cycle);
              });
            });
          }
        },
      });

      tl.set(f, { rotX: 0.05, rotY: 0, rotZ: -0.06, scale: passScale, visible: true, flying: true, progress: 0 }, 0);
      tl.to(f, { progress: 1, duration: FLIGHT, ease: "power1.inOut", onUpdate: sweep }, 0);

      // Cara superior hacia la cámara durante el regreso (se lee como objeto 3D)
      tl.to(f, { rotX: -0.38, duration: 1.6, ease: "sine.inOut" }, 2.3);

      // Mientras vuelve por el fondo, las letras suben y se rearman en lo bueno
      tl.add(() => morph(pair.good, GOOD), 3.4);

      tl.set(f, { visible: false, flying: false }, FLIGHT);
      tl.to({}, { duration: 0.05 }, FLIGHT);
    };

    // Reacomodo instantáneo si cambia el tamaño entre ciclos
    let resizeT: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(() => {
        if (killed || (tl && tl.isActive())) return;
        const targets = measure(currentText);
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
      className="relative flex h-[88svh] min-h-[540px] items-center justify-center overflow-hidden border-b border-hairline bg-[#0b4a2c]"
      aria-label={`${CLOSER}: ${PAIRS.map((p) => p.good).join(", ")}`}
    >
      {/* Textura del escenario: luz de foco arriba, viñeta abajo y grano sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(115% 80% at 50% 35%, rgba(220,255,233,0.08), rgba(0,0,0,0) 58%), radial-gradient(150% 110% at 50% 115%, rgba(0,0,0,0.38), rgba(0,0,0,0) 62%)",
        }}
      />
      {/* Monograma de marca (referencia aprobada: swatch sobre negro del board
          de ChatGPT): A serif en half-drop + puntito intermedio, espaciado amplio */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.09]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cg fill='%23cfe9d8'%3E%3Ctext x='37' y='48' font-family='Times New Roman,Georgia,serif' font-size='26' text-anchor='middle'%3EA%3C/text%3E%3Ctext x='112' y='123' font-family='Times New Roman,Georgia,serif' font-size='26' text-anchor='middle'%3EA%3C/text%3E%3Ccircle cx='112' cy='40' r='1.6'/%3E%3Ccircle cx='37' cy='115' r='1.6'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "150px 150px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.22] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

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
        <p className={`absolute inset-0 z-10 flex items-center justify-center px-6 text-center text-[#f6fbf7] ${typeClass}`}>
          {CLOSER}
        </p>
      </noscript>

      {/* Texto pequeño fijo: el avión no lo toca */}
      <p className="absolute inset-x-0 top-[calc(50%+92px)] z-10 mx-auto max-w-md px-6 text-center text-sm leading-relaxed text-[#cfe5d6] sm:top-[calc(50%+128px)] md:top-[calc(50%+150px)] md:text-base">
        Un sistema de IA que atiende, vende y agenda por WhatsApp, las 24 horas.
      </p>

      {/* CTA del cierre: aparece cuando la frase final queda fija */}
      <div ref={ctaRef} className="invisible absolute inset-x-0 bottom-[76px] z-30 flex justify-center opacity-0 sm:bottom-20">
        <SofiaCta />
      </div>

      <div className="absolute bottom-7 z-30 flex flex-col items-center gap-2 text-[#9fc7ad]" aria-hidden>
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
