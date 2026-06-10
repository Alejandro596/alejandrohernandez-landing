"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "¿Necesito saber de tecnología?",
    a: "Para nada. Nosotros montamos todo y lo dejamos andando. Tú solo nos dices cómo quieres que hable el agente y revisas que te guste. Los clientes te llegan a tu WhatsApp y a tu calendario como siempre.",
  },
  {
    q: "¿El agente suena robótico?",
    a: "Esa es la pregunta que más nos hacen, y la respuesta corta es no. Lo entrenamos con tu forma de hablar y tus productos. De hecho, a la mayoría de los clientes nadie les ha preguntado si es un bot.",
  },
  {
    q: "¿En cuánto tiempo está funcionando?",
    a: "El agente de IA suele quedar la primera semana. Una página o tienda completa tarda un poco más, depende de qué tan grande sea el proyecto.",
  },
  {
    q: "¿Y si le preguntan algo que no sabe?",
    a: "No inventa. Si no sabe algo, lo dice, te pasa la conversación y te avisa al momento. Preferimos que conteste un humano a que el agente diga cualquier cosa.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Depende de lo que necesites, por eso no ponemos un precio fijo aquí. En la demo revisamos tu caso y te damos una propuesta concreta. Sin permanencias ni letra pequeña.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-hairline px-4 py-28 md:py-36">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 data-reveal className="display text-3xl font-semibold leading-tight md:text-4xl">
            Lo que todo el mundo pregunta{" "}
            <span className="text-ink-muted">antes de empezar.</span>
          </h2>
          <p data-reveal className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
            ¿Tienes otra duda? Escríbenos por WhatsApp. Te responde nuestro propio agente
            y, si hace falta, una persona del equipo.
          </p>
        </div>

        <div data-reveal-group className="flex flex-col gap-3 md:col-span-7">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="glass overflow-hidden rounded-3xl">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left"
                >
                  <span className="display text-base font-medium md:text-lg">{f.q}</span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/6 t-premium ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  className="grid t-premium"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-7 pb-6 text-sm leading-relaxed text-ink-muted">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
