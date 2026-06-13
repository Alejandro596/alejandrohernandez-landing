"use client";

import { useEffect, useRef, useState } from "react";

/* Carrusel "coverflow" que reemplaza al VSL mientras el video real no está listo.
   3 demos en formato celular: dos conversaciones de WhatsApp (el bot vendiendo y
   haciendo seguimiento) y un CRM inventado. Tarjeta central nítida + laterales
   asomándose, flechas, puntos y autoavance (se pausa al pasar el mouse y respeta
   prefers-reduced-motion). Visible sin JS: renderiza la primera tarjeta al centro. */

type ChatMsg = { from: "user" | "sofia"; text: string };

const VENTA: ChatMsg[] = [
  { from: "user", text: "Vi el anuncio, ¿cuánto cuesta?" },
  { from: "sofia", text: "¡Hola! 😊 Está en $189.000 con envío gratis. ¿Te lo despacho hoy?" },
  { from: "user", text: "Sí, lo quiero" },
  { from: "sofia", text: "¡Listo! Pedido confirmado ✅ Llega mañana. ¿Pagas contra entrega?" },
  { from: "user", text: "Sí, contra entrega" },
  { from: "sofia", text: "Perfecto, quedó agendado. ¡Gracias por tu compra! 🎉" },
];

const SEGUIMIENTO: ChatMsg[] = [
  { from: "sofia", text: "Hola Laura 👋 Ayer preguntaste por el plan y no alcanzamos a cerrar. ¿Sigues interesada?" },
  { from: "user", text: "Sí, es que se me pasó" },
  { from: "sofia", text: "Tranquila 😊 Te aparté el cupo con 10% de descuento, válido hoy. ¿Lo activamos?" },
  { from: "user", text: "Listo, hagámoslo" },
  { from: "sofia", text: "¡Genial! Te paso el link de pago 🙌" },
];

type Lead = { name: string; stage: string; note: string; tone: "muted" | "accent" | "deep" | "won" };

const LEADS: Lead[] = [
  { name: "Camila R.", stage: "Nuevo", note: "Preguntó precios · 11:42 p. m.", tone: "muted" },
  { name: "Andrés T.", stage: "En chat", note: "Pidió fotos del producto", tone: "accent" },
  { name: "Diana V.", stage: "Agendado", note: "Demo · jueves 3:00 p. m.", tone: "deep" },
  { name: "Carlos G.", stage: "Vendido", note: "$189.000 · contra entrega", tone: "won" },
];

function Chat({ msgs }: { msgs: ChatMsg[] }) {
  return (
    <div className="flex h-full flex-col bg-[#091009]">
      <div className="flex items-center gap-2.5 border-b border-hairline bg-bg px-3.5 py-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-on-accent">
          S
        </span>
        <div>
          <p className="text-[11px] font-semibold leading-tight">Sofía · Asesora</p>
          <p className="text-[9px] leading-tight text-accent-deep">en línea</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-1.5 overflow-hidden p-3">
        {msgs.map((m, i) => (
          <div
            key={i}
            className={`max-w-[90%] rounded-xl px-2.5 py-1.5 text-[11px] leading-snug shadow-sm ${
              m.from === "sofia"
                ? "self-start rounded-bl-sm bg-[#1d2a20] text-ink"
                : "self-end rounded-br-sm bg-[#005c4b] text-ink"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function Crm() {
  const chip: Record<Lead["tone"], string> = {
    muted: "bg-ink-muted/15 text-ink-muted",
    accent: "bg-accent/15 text-accent-bright",
    deep: "bg-accent-deep/20 text-accent-deep",
    won: "bg-accent text-on-accent",
  };
  return (
    <div className="flex h-full flex-col bg-bg-raised">
      <div className="flex items-center gap-1.5 border-b border-hairline bg-bg px-3.5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[10px] font-medium text-ink-muted">Tu CRM · Hoy</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 px-3 pt-3">
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
      <div className="flex flex-1 flex-col gap-1.5 p-3">
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

const SLIDES = [
  { label: "Tu agente cerrando ventas", sub: "Atiende y vende sin que estés.", body: <Chat msgs={VENTA} /> },
  { label: "Tu agente haciendo seguimiento", sub: "Recupera a los que se enfrían.", body: <Chat msgs={SEGUIMIENTO} /> },
  { label: "Tu CRM personalizado", sub: "Cada lead, en un solo lugar.", body: <Crm /> },
];

export default function ShowcaseCarousel() {
  const [active, setActive] = useState(0);
  const paused = useRef(false);
  const n = SLIDES.length;

  const go = (dir: number) => setActive((a) => (a + dir + n) % n);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % n);
    }, 5000);
    return () => window.clearInterval(id);
  }, [n]);

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
      onMouseLeave={() => (paused.current = false)}
      onFocusCapture={() => (paused.current = true)}
      onBlurCapture={() => (paused.current = false)}
    >
      <div className="mb-5 text-center" aria-live="polite">
        <p className="display text-lg font-semibold leading-tight">{SLIDES[active].label}</p>
        <p className="mt-1 text-sm text-ink-muted">{SLIDES[active].sub}</p>
      </div>

      <div
        className="relative mx-auto h-[420px] w-full max-w-[420px] overflow-hidden sm:h-[440px]"
        style={{ perspective: "1200px" }}
        role="group"
        aria-roledescription="carrusel"
        aria-label="Demos del agente y el CRM"
      >
        {SLIDES.map((s, i) => {
          const rel = relOf(i);
          const isActive = rel === 0;
          return (
            <button
              key={i}
              type="button"
              aria-label={s.label}
              aria-current={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => !isActive && setActive(i)}
              className="card absolute left-1/2 top-1/2 h-[396px] w-[228px] cursor-pointer overflow-hidden p-0 text-left transition-all duration-500 ease-out sm:h-[412px]"
              style={styleFor(rel)}
            >
              {s.body}
            </button>
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
            onClick={() => setActive(i)}
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
