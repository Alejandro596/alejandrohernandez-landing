"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { createFlight, type FlightPathPoint } from "./PlaneScene";
import SofiaCta from "@/components/SofiaCta";

const PlaneScene = dynamic(() => import("./PlaneScene"), { ssr: false });

// Cada pasada: el avión tumba la frase mala y las letras se rearman en la buena.
// `sub` aparece debajo de la buena y se va con ella (nunca queda flotando).
const PAIRS = [
  {
    bad: "Vender solo hasta las 5 PM",
    good: "Vendes 24/7",
    sub: "Atiende cada mensaje en segundos, también de noche y fines de semana.",
  },
  {
    bad: "Pagar 5 asesoras",
    good: "Vendes sin contratar a nadie",
    sub: "Hace el trabajo de varias asesoras, sin sumar nómina.",
  },
  {
    bad: "Dejar leads sin contestar",
    good: "Respondes en segundos",
    sub: "Nadie se queda esperando, nadie se va con la competencia.",
  },
  {
    bad: "No saber qué pasó con tus leads",
    good: "Lo ves todo en tu CRM",
    sub: "Un CRM hecho a la medida de tu negocio: cada lead, cada etapa, cada conversación.",
  },
];
// Tras el último par, la frase queda fija y aparece el CTA
const CLOSER = "Tu Sistema de Ventas Autónomo";

const HOLD = 2.4; // segundos de lectura entre fases
const FLIGHT = 5.4; // duración del recorrido completo (una sola curva)
const INK = "#f6fbf7"; // cierre
const BAD = "#ff2d12"; // lo malo: el rojo de la pauta sobre negro
const GOOD = "#8ce427"; // lo bueno: el verde LIMA de la pauta
const RUBBLE = "#8a2417"; // escombros: rojo apagado en el piso
// Glow GOTY: las frases buenas brillan con núcleo caliente de oro verde
const GLOW_GOOD =
  "0 0 5px rgba(240,255,200,0.7), 0 0 14px rgba(140,228,39,0.6), 0 0 46px rgba(140,228,39,0.3)";
const GLOW_INK = "0 0 24px rgba(246,251,247,0.35)";

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
    let pairIdx = 0;
    let currentText = PAIRS[0].bad;
    let tl: gsap.core.Timeline | null = null;
    let delayed: gsap.core.Tween | null = null;
    let killed = false;
    let sub: HTMLElement | null = null; // línea de apoyo bajo la frase buena
    let measuredBottom = 0; // borde inferior de la última frase medida

    // Mide dónde va cada letra de una frase (la plantilla está invisible pero ocupa layout)
    const measure = (text: string): Target[] => {
      buildTemplate(template, text);
      const sr = stage.getBoundingClientRect();
      measuredBottom = 0;
      return Array.from(template.querySelectorAll<HTMLElement>(".tch")).map((c) => {
        const r = c.getBoundingClientRect();
        measuredBottom = Math.max(measuredBottom, r.bottom - sr.top);
        return { glyph: c.textContent ?? "", x: r.left - sr.left, y: r.top - sr.top };
      });
    };

    // La línea de apoyo vive DENTRO de poolBox: cuando la frase se desliza en
    // bloque, ella se va montada.
    const showSub = (text: string) => {
      sub?.remove();
      const p = document.createElement("p");
      p.className =
        "absolute inset-x-0 mx-auto max-w-md px-6 text-center text-sm font-normal tracking-normal leading-relaxed [font-stretch:100%] md:max-w-lg md:text-base";
      p.style.color = "#b9cba9";
      p.style.top = `${measuredBottom + 16}px`;
      p.textContent = text;
      poolBox.appendChild(p);
      sub = p;
      gsap.fromTo(
        p,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 1.1 }
      );
    };

    // "Tumbar" la línea de apoyo: cae y se desvanece (para el cierre)
    const dropSub = () => {
      const el = sub;
      sub = null;
      if (el) {
        gsap.to(el, {
          y: "+=70",
          opacity: 0,
          rotation: 2.5,
          duration: 0.6,
          ease: "power1.in",
          onComplete: () => el.remove(),
        });
      }
    };

    // En móvil el glow de las letras es de UNA capa (las sombras multicapa
    // encarecen cada repintado de glifo)
    const glowFor = (color: string) => {
      const lite = window.innerWidth < 768;
      if (color === GOOD) return lite ? "0 0 10px rgba(140,228,39,0.5)" : GLOW_GOOD;
      if (color === INK) return lite ? "0 0 14px rgba(246,251,247,0.3)" : GLOW_INK;
      return "none";
    };

    const spawn = (t: Target, color: string): HTMLElement => {
      const s = document.createElement("span");
      s.className = "absolute left-0 top-0 inline-block will-change-transform";
      s.textContent = t.glyph;
      s.style.color = color;
      s.style.textShadow = glowFor(color);
      poolBox.appendChild(s);
      gsap.set(s, { x: t.x, y: t.y });
      return s;
    };

    const init = () => {
      if (killed) return;
      if (reduced) {
        // Sin animación: directo al cierre
        pool = measure(CLOSER).map((t) => spawn(t, INK));
        return;
      }
      pool = measure(currentText).map((t) => spawn(t, BAD));
      setCanvasOn(true);
      delayed = gsap.delayedCall(HOLD + 0.8, cycle);
      io.observe(section);
    };

    // Chispas que saltan del punto de impacto de cada letra (solo desktop:
    // los teléfonos no aguantan tanto efecto)
    const sparks = (x: number, y: number) => {
      if (window.innerWidth < 768) return;
      for (let i = 0; i < 3; i++) {
        const s = document.createElement("span");
        const c = i === 0 ? "#ff7a3c" : "#8ce427";
        s.className = "absolute left-0 top-0 h-[3px] w-[3px] rounded-full";
        s.style.background = c;
        s.style.boxShadow = `0 0 10px ${c}`;
        poolBox.appendChild(s);
        gsap.set(s, { x: x + 12, y: y + 14 });
        gsap.to(s, {
          x: `+=${gsap.utils.random(-60, 110)}`,
          y: `+=${gsap.utils.random(-80, 50)}`,
          opacity: 0,
          duration: gsap.utils.random(0.35, 0.65),
          ease: "power2.out",
          onComplete: () => s.remove(),
        });
      }
    };

    // Onda expansiva en el primer contacto del avión con la frase (solo desktop)
    const shockwave = (px: number) => {
      if (window.innerWidth < 768) return;
      const ring = document.createElement("span");
      ring.className = "pointer-events-none absolute rounded-full border-2";
      ring.style.borderColor = "rgba(140,228,39,0.8)";
      ring.style.boxShadow = "0 0 28px rgba(140,228,39,0.5), inset 0 0 18px rgba(140,228,39,0.3)";
      const cy = stage.clientHeight / 2;
      ring.style.left = `${px - 24}px`;
      ring.style.top = `${cy - 24}px`;
      ring.style.width = "48px";
      ring.style.height = "48px";
      stage.appendChild(ring);
      gsap.fromTo(
        ring,
        { scale: 0.25, opacity: 0.95 },
        { scale: 6, opacity: 0, duration: 0.8, ease: "power2.out", onComplete: () => ring.remove() }
      );
    };

    // Golpe a UNA letra: flash blanco-rojo, pop de escala, chispas y caída con
    // física. En móvil el flash de textShadow se omite: animar sombras de
    // texto en 20+ letras a la vez repinta todo por frame y tumba los FPS.
    const knock = (el: HTMLElement) => {
      const floorBase = stage.clientHeight;
      const lite = window.innerWidth < 768;
      if (lite) {
        // Versión SUAVE para móvil (misma idea, mínimo costo): la letra se
        // desploma directo al piso en UN solo tween de transforms, sin
        // lanzamiento, sin rebote, sin flashes — un tween por letra y ya.
        gsap.set(el, { color: RUBBLE });
        gsap.to(el, {
          y: floorBase - el.offsetHeight - 12 - Math.random() * 22,
          x: `+=${gsap.utils.random(8, 36)}`,
          rotation: gsap.utils.random(-32, 32),
          duration: 0.55,
          ease: "power2.in",
        });
        return;
      }
      sparks(Number(gsap.getProperty(el, "x")), Number(gsap.getProperty(el, "y")));
      const tlK = gsap.timeline();
      tlK.set(el, {
        color: "#ffffff",
        scale: 1.3,
        textShadow: "0 0 16px rgba(255,140,80,0.95), 0 0 44px rgba(255,45,18,0.55)",
      });
      tlK.to(el, {
        y: `-=${gsap.utils.random(20, 70)}`,
        x: `+=${gsap.utils.random(30, 110)}`,
        rotation: gsap.utils.random(-50, 60),
        color: RUBBLE,
        scale: 1,
        duration: 0.16,
        ease: "power2.out",
      });
      tlK.to(el, { textShadow: "0 0 0px rgba(255,45,18,0)", duration: 0.45 }, 0.12);
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

    // Sacudida de toda la sección en el choque. SOLO desktop: mover la sección
    // (que contiene el canvas + la capa con mix-blend-mode del grano) obliga a
    // re-mezclar todo por frame — eso era el "gran lag" de la explosión en móvil.
    const shake = () => {
      if (window.innerWidth < 768) return;
      const amp = 9;
      const pulses = 6;
      const tlS = gsap.timeline();
      for (let i = 0; i < pulses; i++) {
        const d = amp * (1 - i / pulses);
        tlS.to(section, {
          x: gsap.utils.random(-d, d),
          y: gsap.utils.random(-d / 2, d / 2),
          duration: 0.045,
        });
      }
      tlS.to(section, { x: 0, y: 0, duration: 0.08 });
    };

    // Las mismas letras vuelan a la frase nueva; el glifo cambia a mitad de giro
    const morph = (text: string, color: string, subText?: string) => {
      currentText = text;
      const targets = measure(text);
      if (subText) showSub(subText);
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
              el.style.textShadow = glowFor(color);
            }
          },
        });
      });

      // Sobran letras: los escombros sobrantes se CONSUMEN en el piso con un
      // destello y chispas (moverlos en otra dirección mientras el resto sube
      // se leía como un fallo)
      surplus.forEach((el, i) => {
        sparks(Number(gsap.getProperty(el, "x")), Number(gsap.getProperty(el, "y")));
        const tlB = gsap.timeline({ delay: i * 0.035 });
        tlB.to(el, {
          color: "#ffb277",
          textShadow: "0 0 14px rgba(255,150,80,0.85)",
          duration: 0.12,
        });
        tlB.to(el, {
          opacity: 0,
          scale: 0.3,
          y: "+=8",
          textShadow: "0 0 0px rgba(255,150,80,0)",
          duration: 0.38,
          ease: "power2.in",
          onComplete: () => el.remove(),
        });
      });

      pool = used;
    };

    // La frase sale ENTERA por la derecha como un solo bloque (se mueve el
    // contenedor, no cada letra — letras sueltas se "apachurraban") con un
    // desenfoque suave de movimiento
    const slideOut = (onDone?: () => void) => {
      const stageW = stage.clientWidth;
      const lite = window.innerWidth < 768; // móvil: sin blur animado (pintura por frame)
      const old = pool;
      const oldSub = sub;
      pool = [];
      sub = null;
      const tlO = gsap.timeline({
        onComplete: () => {
          old.forEach((el) => el.remove());
          oldSub?.remove();
          gsap.set(poolBox, { x: 0, filter: "none" });
          if (!killed) onDone?.();
        },
      });
      tlO.to(poolBox, { x: stageW * 1.1, duration: 0.8, ease: "power2.in" }, 0);
      if (!lite) tlO.to(poolBox, { filter: "blur(10px)", duration: 0.5, ease: "power1.in" }, 0.15);
    };

    // La frase mala siguiente entra por la izquierda, también como bloque
    const slideIn = (text: string, color = BAD) => {
      currentText = text;
      const lite = window.innerWidth < 768;
      const targets = measure(text);
      pool = targets.map((t) => spawn(t, color));
      const stageW = stage.clientWidth;
      gsap.set(poolBox, { x: -stageW * 1.1, ...(lite ? {} : { filter: "blur(10px)" }) });
      const tlI = gsap.timeline();
      tlI.to(poolBox, { x: 0, duration: 0.9, ease: "power2.out" }, 0);
      if (!lite) {
        tlI.to(poolBox, { filter: "blur(0px)", duration: 0.55, ease: "power1.out" }, 0.25);
        tlI.set(poolBox, { filter: "none" });
      }
    };

    // Cierre del round: la frase final respira y el bucle reinicia
    const finish = () => {
      if (killed) return;
      dropSub(); // la línea de apoyo se tumba antes del cierre
      morph(CLOSER, INK);
      delayed = gsap.delayedCall(HOLD * 2 + 2, () => {
        if (killed) return;
        pairIdx = 0;
        slideOut(() => {
          slideIn(PAIRS[0].bad);
          delayed = gsap.delayedCall(HOLD + 1.0, cycle);
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
      // El regreso va BIEN al fondo (z -14..-16) y la cola llega a x=-28
      // para que la desaceleración ocurra fuera de pantalla en ultrawide.
      const pts: FlightPathPoint[] = [
        { x: -9.5, y: -0.15, z: 0.6 },
        { x: -4.0, y: -0.06, z: 0.55 },
        { x: 1.6, y: 0.12, z: 0.45 },
        { x: mobile ? 3.4 : 6.4, y: 0.6, z: -0.4 },
        { x: 8.6 * m, y: 1.3, z: -1.8 },
        { x: 10.5 * m, y: 2.2, z: -7 },
        { x: 5.5, y: 2.6, z: -14 },
        { x: 0, y: 2.6, z: -15.5 },
        { x: -8, y: 2.6, z: -16 },
        { x: -28, y: 2.6, z: -16.2 },
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
              shockwave(nosePx);
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
              // lo bueno se va entero por la derecha y al terminar entra lo malo
              slideOut(() => {
                slideIn(PAIRS[pairIdx].bad);
                delayed = gsap.delayedCall(HOLD + 1.0, cycle);
              });
            });
          }
        },
      });

      tl.set(f, { rotX: 0.05, rotY: 0, rotZ: -0.06, scale: passScale, visible: true, flying: true, progress: 0 }, 0);
      // power2.out: el avión ENTRA a máxima velocidad (impulso tomado desde
      // antes de entrar al cuadro), revienta las letras en ~medio segundo y
      // va soltando velocidad en el giro y el regreso por el fondo
      tl.to(f, { progress: 1, duration: FLIGHT, ease: "power2.out", onUpdate: sweep }, 0);

      // Cara superior hacia la cámara durante el regreso (se lee como objeto 3D)
      tl.to(f, { rotX: -0.38, duration: 1.4, ease: "sine.inOut" }, 1.0);

      // Mientras vuelve por el fondo, las letras suben y se rearman en lo bueno
      tl.add(() => morph(pair.good, GOOD, pair.sub), 2.2);

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
      className="relative order-6 flex h-[58svh] min-h-[440px] items-center justify-center overflow-hidden bg-[#020402] md:order-none md:h-[88svh] md:min-h-[540px]"
      aria-label={`${CLOSER}: ${PAIRS.map((p) => p.good).join(", ")}`}
    >
      {/* Textura del escenario: luz de foco arriba, viñeta abajo y grano sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(115% 80% at 50% 35%, rgba(170,240,90,0.09), rgba(0,0,0,0) 58%), radial-gradient(150% 110% at 50% 115%, rgba(0,0,0,0.45), rgba(0,0,0,0) 62%)",
        }}
      />
      {/* Monograma de marca (referencia aprobada: swatch sobre negro del board
          de ChatGPT): A serif en half-drop + puntito intermedio, espaciado amplio */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.09]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cg fill='%23cdf59a'%3E%3Ctext x='37' y='48' font-family='Times New Roman,Georgia,serif' font-size='26' text-anchor='middle'%3EA%3C/text%3E%3Ctext x='112' y='123' font-family='Times New Roman,Georgia,serif' font-size='26' text-anchor='middle'%3EA%3C/text%3E%3Ccircle cx='112' cy='40' r='1.6'/%3E%3Ccircle cx='37' cy='115' r='1.6'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "150px 150px",
        }}
      />
      {/* Piso de grilla futurista: perspectiva tron (solo desktop) */}
      <div
        aria-hidden
        className="anim-grid-floor pointer-events-none absolute inset-x-[-20%] bottom-0 z-0 hidden h-[34%] origin-bottom opacity-[0.22] [transform:perspective(620px)_rotateX(56deg)] md:block"
        style={{
          backgroundImage:
            "linear-gradient(rgba(140,228,39,0.75) 1px, transparent 1px), linear-gradient(90deg, rgba(140,228,39,0.75) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 30%, transparent)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 30%, transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden opacity-[0.22] mix-blend-soft-light md:block"
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

      {/* Marca + badge de la pauta (la burbujita con el punto en línea) */}
      <div className="absolute inset-x-0 top-8 z-10 flex flex-col items-center gap-2.5 px-4 text-center">
        <span className="display text-sm font-semibold uppercase tracking-[0.32em] text-ink sm:text-base">
          Alejandro Hernández
        </span>
        <span className="flex items-center gap-2.5 rounded-full border border-hairline bg-[#0b0f09]/85 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#cfe9b8] shadow-[0_0_22px_rgba(140,228,39,0.18)] sm:text-[11px]">
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-bright opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-bright" />
          </span>
          <span className="sm:hidden">Automatización de WhatsApp</span>
          <span className="hidden sm:inline">Especialistas en automatización de WhatsApp</span>
        </span>
      </div>

      {/* CTA fijo: siempre visible en la sección */}
      <div className="absolute inset-x-0 bottom-[76px] z-30 flex justify-center sm:bottom-20">
        <SofiaCta />
      </div>

      <div className="absolute bottom-7 z-30 flex flex-col items-center gap-2 text-[#9fc783]" aria-hidden>
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
