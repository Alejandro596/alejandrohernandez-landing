"use client";

import { useEffect, useRef, useState } from "react";

import { scrollState } from "@/lib/scroll";

/* Carrusel "coverflow" que reemplaza al VSL mientras el video real no está listo.
   3 demos en formato celular: dos conversaciones de WhatsApp (el agente vendiendo y
   haciendo seguimiento) y un CRM inventado. Tarjeta central nítida + laterales
   asomándose, flechas, puntos y autoavance (se pausa al pasar el mouse y se detiene
   cuando el visitante toca/arrastra para leer). Las conversaciones se pueden
   desplazar con scroll dentro de la tarjeta, como un chat real. Visible sin JS. */

type ChatMsg = { from: "user" | "sofia"; text: string; time: string };

const VENTA: ChatMsg[] = [
  { from: "user", text: "Hola, vi el anuncio en Instagram. ¿Todavía tienen el combo disponible?", time: "11:58 p. m." },
  { from: "sofia", text: "¡Hola! 😊 Sí, claro, lo tenemos disponible y con envío gratis a todo el país. ¿Para qué ciudad sería?", time: "11:58 p. m." },
  { from: "user", text: "Para Bogotá", time: "11:59 p. m." },
  { from: "sofia", text: "¡Perfecto! A Bogotá te llega en 1 o 2 días hábiles. El combo está en $189.000, pago contra entrega. ¿Te lo despacho?", time: "11:59 p. m." },
  { from: "user", text: "Sí, lo quiero", time: "12:01 a. m." },
  { from: "sofia", text: "¡Genial! Para agendar el envío, ¿me confirmas tu nombre completo, dirección y un teléfono?", time: "12:01 a. m." },
  { from: "user", text: "Carlos Gómez, Calle 134 #18-40, apto 502. Cel 311 555 0192", time: "12:03 a. m." },
  { from: "sofia", text: "¡Listo, Carlos! ✅ Pedido confirmado: Combo x1 — $189.000, contra entrega. Dirección: Calle 134 #18-40, apto 502. Llega entre mañana y pasado.", time: "12:03 a. m." },
  { from: "sofia", text: "Te escribo apenas salga a reparto 🚚", time: "12:03 a. m." },
  { from: "user", text: "Listo, muchas gracias 🙌", time: "12:04 a. m." },
  { from: "sofia", text: "¡Con gusto! Cualquier cosa me escribes por aquí 😊", time: "12:04 a. m." },
];

const SEGUIMIENTO: ChatMsg[] = [
  { from: "sofia", text: "Hola Laura 👋 Soy Sofía. Ayer preguntaste por el plan pero no alcanzamos a terminar. ¿Te quedó alguna duda?", time: "9:12 a. m." },
  { from: "user", text: "Hola, sí, es que se me pasó responder 🙈", time: "9:40 a. m." },
  { from: "sofia", text: "Tranquila, sé que el día se llena 😊 ¿Te cuento rápido cómo quedaría?", time: "9:40 a. m." },
  { from: "user", text: "Dale", time: "9:41 a. m." },
  { from: "sofia", text: "El plan completo te queda en $250.000/mes, sin cláusula de permanencia. Y si lo activas hoy, te dejo el primer mes con 10% de descuento.", time: "9:41 a. m." },
  { from: "user", text: "Mmm me interesa, pero ¿incluye soporte?", time: "9:43 a. m." },
  { from: "sofia", text: "¡Sí! Soporte por WhatsApp todos los días y ajustes cada mes. ¿Lo activamos con el descuento antes de que se venza hoy?", time: "9:44 a. m." },
  { from: "user", text: "Listo, hagámoslo", time: "9:46 a. m." },
  { from: "sofia", text: "¡Excelente decisión, Laura! 🙌 Te mando el link de pago y quedamos andando hoy mismo.", time: "9:46 a. m." },
];

type Lead = { name: string; stage: string; note: string; tone: "muted" | "accent" | "deep" | "won" };

const LEADS: Lead[] = [
  { name: "Camila R.", stage: "Nuevo", note: "Preguntó precios · 11:42 p. m.", tone: "muted" },
  { name: "Andrés T.", stage: "En chat", note: "Pidió fotos del producto", tone: "accent" },
  { name: "Diana V.", stage: "Agendado", note: "Demo · jueves 3:00 p. m.", tone: "deep" },
  { name: "Carlos G.", stage: "Vendido", note: "$189.000 · contra entrega", tone: "won" },
  { name: "Laura P.", stage: "Vendido", note: "Plan mensual · 10% dto.", tone: "won" },
  { name: "Jorge M.", stage: "Nuevo", note: "Vio el anuncio · 1:15 a. m.", tone: "muted" },
];

function ChatHeader() {
  return (
    <div className="flex shrink-0 items-center gap-2.5 border-b border-hairline bg-bg px-3.5 py-2.5">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-on-accent">
        S
      </span>
      <div>
        <p className="text-[11px] font-semibold leading-tight">Sofía · Asesora</p>
        <p className="text-[9px] leading-tight text-accent-deep">en línea</p>
      </div>
    </div>
  );
}

function ChatMessages({ msgs }: { msgs: ChatMsg[] }) {
  return (
    <div className="flex flex-col gap-1.5 p-3">
      {msgs.map((m, i) => (
        <div
          key={i}
          className={`max-w-[90%] shrink-0 rounded-xl px-2.5 py-1.5 text-[11px] leading-snug shadow-sm ${
            m.from === "sofia"
              ? "self-start rounded-bl-sm bg-[#1d2a20] text-ink"
              : "self-end rounded-br-sm bg-[#005c4b] text-ink"
          }`}
        >
          {m.text}
          <span className="ml-2 align-bottom text-[8px] text-ink/50">{m.time}</span>
        </div>
      ))}
    </div>
  );
}

function CrmHeader() {
  return (
    <div className="flex shrink-0 items-center gap-1.5 border-b border-hairline bg-bg px-3.5 py-2.5">
      <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
      <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
      <span className="h-2 w-2 rounded-full bg-[#28c840]" />
      <span className="ml-2 text-[10px] font-medium text-ink-muted">Tu CRM · Hoy</span>
    </div>
  );
}

function CrmContent() {
  const chip: Record<Lead["tone"], string> = {
    muted: "bg-ink-muted/15 text-ink-muted",
    accent: "bg-accent/15 text-accent-bright",
    deep: "bg-accent-deep/20 text-accent-deep",
    won: "bg-accent text-on-accent",
  };
  return (
    <div className="p-3">
      <div className="grid grid-cols-3 gap-1.5 pb-3">
        {[
          { k: "Leads", v: "24" },
          { k: "Agendados", v: "6" },
          { k: "Ventas", v: "9" },
        ].map((s) => (
          <div key={s.k} className="rounded-lg border border-hairline bg-bg px-2 py-1.5 text-center">
            <p className="text-base font-bold leading-none text-accent-bright">{s.v}</p>
            <p className="mt-1 text-[9px] uppercase tracking-wide text-ink-muted">{s.k}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1.5">
        {LEADS.map((l) => (
          <div key={l.name} className="rounded-lg border border-hairline bg-bg p-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-semibold">{l.name}</p>
              <span className={`rounded-full px-1.5 py-0.5 text-[8.5px] font-bold ${chip[l.tone]}`}>
                {l.stage}
              </span>
            </div>
            <p className="mt-0.5 text-[9.5px] text-ink-muted">{l.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

type Slide = {
  label: string;
  sub: string;
  kind: "chat" | "crm";
  msgs?: ChatMsg[];
};

const SLIDES: Slide[] = [
  { label: "Tu agente cerrando ventas", sub: "Atiende y vende sin que estés.", kind: "chat", msgs: VENTA },
  { label: "Tu agente haciendo seguimiento", sub: "Recupera a los que se enfrían.", kind: "chat", msgs: SEGUIMIENTO },
  { label: "Tu CRM personalizado", sub: "Cada lead, en un solo lugar.", kind: "crm" },
];

export default function ShowcaseCarousel() {
  const [active, setActive] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hideHint, setHideHint] = useState(false);
  const paused = useRef(false);
  const scrollers = useRef<(HTMLDivElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef(0);
  const n = SLIDES.length;

  // Mueve el scroll interno de la tarjeta activa según cuánto se ha desplazado la
  // sección en la pantalla: la conversación "avanza" con el scroll de la página.
  const drive = () => {
    const stage = stageRef.current;
    const sc = scrollers.current[activeRef.current];
    if (!stage || !sc || stage.offsetParent === null) return;
    const rect = stage.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
    const max = Math.max(0, sc.scrollHeight - sc.clientHeight);
    sc.scrollTop = progress * max;
  };

  const go = (dir: number) => {
    setStopped(true);
    setActive((a) => (a + dir + n) % n);
  };

  // Autoavance: se detiene en cuanto el visitante interactúa (para que pueda leer/scrollear).
  useEffect(() => {
    if (stopped) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % n);
    }, 6000);
    return () => window.clearInterval(id);
  }, [n, stopped]);

  // En PC (mouse), al pasar por encima del chat la rueda mueve solo la conversación.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Indica si la tarjeta activa todavía tiene conversación por debajo (para la flechita).
  const refreshHint = (i: number, el: HTMLDivElement) => {
    if (i !== activeRef.current) return;
    const max = el.scrollHeight - el.clientHeight;
    setHideHint(max <= 8 || el.scrollTop >= max - 24);
  };

  // PC: la rueda sobre el chat mueve la conversación y frena la página (Lenis).
  // Al llegar a un extremo deja pasar el scroll para no atrapar al visitante.
  useEffect(() => {
    if (!isDesktop) return;
    const cleanups: Array<() => void> = [];
    scrollers.current.forEach((el, i) => {
      if (!el) return;
      const onWheel = (e: WheelEvent) => {
        if (i !== activeRef.current) return;
        const max = el.scrollHeight - el.clientHeight;
        if (max <= 0) return;
        const atTop = el.scrollTop <= 0;
        const atBottom = el.scrollTop >= max - 1;
        if ((e.deltaY > 0 && atBottom) || (e.deltaY < 0 && atTop)) return;
        e.preventDefault();
        e.stopPropagation();
        el.scrollTop = Math.max(0, Math.min(max, el.scrollTop + e.deltaY));
        refreshHint(i, el);
      };
      el.addEventListener("wheel", onWheel, { passive: false });
      cleanups.push(() => el.removeEventListener("wheel", onWheel));
    });
    return () => cleanups.forEach((c) => c());
  }, [isDesktop]);

  // Al cambiar de tarjeta, la nueva activa toma la posición que corresponde al scroll actual.
  useEffect(() => {
    activeRef.current = active;
    drive();
    const el = scrollers.current[active];
    if (el) refreshHint(active, el);
  }, [active]);

  // El scroll de la página mueve la conversación. Se engancha a Lenis si está, y al
  // scroll nativo como respaldo; rAF para no recalcular de más.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        drive();
      });
    };
    const lenis = scrollState.lenis;
    lenis?.on("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    drive();
    return () => {
      lenis?.off("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const relOf = (i: number) => {
    let d = i - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  const styleFor = (rel: number): React.CSSProperties => {
    if (rel === 0) {
      return { transform: "translate(-50%,-50%) scale(1)", opacity: 1, zIndex: 30 };
    }
    if (Math.abs(rel) === 1) {
      const dir = rel < 0 ? -1 : 1;
      return {
        transform: `translate(-50%,-50%) translateX(${dir * 64}%) scale(0.8) rotateY(${dir * -16}deg)`,
        opacity: 0.45,
        zIndex: 20,
        filter: "brightness(0.65)",
      };
    }
    return { transform: "translate(-50%,-50%) scale(0.6)", opacity: 0, zIndex: 10 };
  };

  return (
    <div
      className="w-full"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => {
        paused.current = false;
        // Salvaguarda: si el mouse sale del carrusel, Lenis siempre vuelve a andar.
        if (isDesktop) scrollState.lenis?.start();
      }}
      onFocusCapture={() => (paused.current = true)}
      onBlurCapture={() => (paused.current = false)}
      onPointerDown={() => setStopped(true)}
    >
      <div className="mb-5 text-center" aria-live="polite">
        <p className="display text-lg font-semibold leading-tight">{SLIDES[active].label}</p>
        <p className="mt-1 text-sm text-ink-muted">{SLIDES[active].sub}</p>
      </div>

      <div
        ref={stageRef}
        className="relative mx-auto h-[440px] w-full max-w-[420px] overflow-hidden sm:h-[460px]"
        style={{ perspective: "1200px" }}
        role="group"
        aria-roledescription="carrusel"
        aria-label="Demos del agente y el CRM"
      >
        {SLIDES.map((s, i) => {
          const rel = relOf(i);
          const isActive = rel === 0;
          return (
            <div
              key={i}
              role="group"
              aria-label={s.label}
              aria-hidden={!isActive}
              onClick={() => !isActive && (setStopped(true), setActive(i))}
              className={`card absolute left-1/2 top-1/2 flex h-[416px] w-[228px] flex-col overflow-hidden p-0 text-left transition-all duration-500 ease-out sm:h-[436px] ${
                isActive ? "" : "cursor-pointer"
              }`}
              style={styleFor(rel)}
            >
              {s.kind === "chat" ? <ChatHeader /> : <CrmHeader />}
              <div
                ref={(el) => {
                  scrollers.current[i] = el;
                }}
                onScroll={(e) => refreshHint(i, e.currentTarget)}
                onMouseEnter={() => {
                  if (isActive && isDesktop) scrollState.lenis?.stop();
                }}
                onMouseLeave={() => {
                  if (isDesktop) scrollState.lenis?.start();
                }}
                className={`chat-scroll flex-1 overflow-y-auto overscroll-contain ${
                  s.kind === "chat" ? "bg-[#091009]" : "bg-bg-raised"
                }`}
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {s.kind === "chat" ? <ChatMessages msgs={s.msgs!} /> : <CrmContent />}
              </div>

              {isActive && (
                <div
                  className="scroll-hint pointer-events-none absolute inset-x-0 bottom-2 flex justify-center"
                  data-hidden={hideHint || undefined}
                >
                  <span className="flex items-center gap-1 rounded-full border border-hairline bg-bg/85 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-accent-bright backdrop-blur">
                    {isDesktop ? "Pasa el mouse y desliza" : "Desliza"}
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </div>
              )}
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Anterior"
          className="absolute left-1 top-1/2 z-40 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-bg/80 text-ink backdrop-blur transition hover:border-accent hover:text-accent-bright"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Siguiente"
          className="absolute right-1 top-1/2 z-40 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-bg/80 text-ink backdrop-blur transition hover:border-accent hover:text-accent-bright"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <p className="mt-5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-bright">
        Tu sistema en acción
      </p>

      <div className="mt-4 flex items-center justify-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setStopped(true);
              setActive(i);
            }}
            aria-label={`Ver: ${s.label}`}
            aria-current={i === active}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-6 bg-accent" : "w-2 bg-ink-muted/40 hover:bg-ink-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
