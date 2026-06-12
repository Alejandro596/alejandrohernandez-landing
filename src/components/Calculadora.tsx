"use client";

import { useState } from "react";
import SofiaCta from "./SofiaCta";

const fmt = (n: number) => "$" + Math.round(n).toLocaleString("es-CO");

// La calculadora de plata quemada: convierte el dolor abstracto del Problema
// en EL número del visitante. Supuestos conservadores y declarados abajo.
export default function Calculadora() {
  const [msgs, setMsgs] = useState(200);
  const [ticket, setTicket] = useState(300000);

  // 35% de mensajes fuera de horario × 60% que no esperan × 20% de cierre
  const ventasPerdidas = msgs * 0.35 * 0.6 * 0.2;
  const plata = ventasPerdidas * ticket;

  return (
    <div data-reveal className="card mt-16 p-7 md:p-10">
      <h3 className="display text-center text-2xl font-semibold md:text-left md:text-3xl">
        ¿Cuánta se te está quemando a ti?
      </h3>
      <p className="mt-2 text-center text-sm text-ink-muted md:text-left md:text-base">
        Mueve las barras y míralo con tus propios números.
      </p>

      <div className="mt-9 grid gap-9 md:grid-cols-2 md:gap-10">
        <label className="block">
          <span className="flex items-baseline justify-between gap-4 text-sm text-ink-muted">
            <span>Mensajes de clientes al mes</span>
            <strong className="display text-lg text-ink">{msgs}</strong>
          </span>
          <input
            type="range"
            min={30}
            max={2000}
            step={10}
            value={msgs}
            onChange={(e) => setMsgs(+e.target.value)}
            className="mt-3 w-full accent-[#8ce427]"
            aria-label="Mensajes de clientes al mes"
          />
        </label>
        <label className="block">
          <span className="flex items-baseline justify-between gap-4 text-sm text-ink-muted">
            <span>Lo que te deja una venta</span>
            <strong className="display text-lg text-ink">{fmt(ticket)}</strong>
          </span>
          <input
            type="range"
            min={50000}
            max={5000000}
            step={50000}
            value={ticket}
            onChange={(e) => setTicket(+e.target.value)}
            className="mt-3 w-full accent-[#8ce427]"
            aria-label="Valor promedio de una venta en pesos"
          />
        </label>
      </div>

      <p className="mt-10 text-center text-base text-ink-muted md:text-lg">
        Cada mes estás dejando sobre la mesa…
      </p>
      <p className="display mt-2 text-center text-5xl font-bold md:text-6xl" aria-live="polite">
        <span className="glow-red">{fmt(plata)}</span>
      </p>
      <p className="mx-auto mt-5 max-w-xl text-center text-xs leading-relaxed text-ink-muted">
        Cálculo conservador: 35% de los mensajes llegan fuera de horario, 6 de cada 10 no
        esperan respuesta, y cierras solo el 20% de los que sí atiendes a tiempo.
      </p>

      <div className="mt-9 flex flex-col items-center gap-3">
        <SofiaCta />
        <p className="text-xs text-ink-muted">Se abre tu WhatsApp · te responde en segundos</p>
      </div>
    </div>
  );
}
