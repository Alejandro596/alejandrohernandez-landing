"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "¿Necesito saber de tecnología?",
    a: "No. Nosotros instalamos, configuramos y mantenemos todo. Tú solo apruebas cómo habla el agente y recibes los clientes listos en tu WhatsApp y tu calendario.",
  },
  {
    q: "¿El agente suena robótico?",
    a: "No. Lo entrenamos con tu tono, tus productos y tus reglas de negocio. Conversa de forma natural, maneja objeciones y, cuando un caso lo requiere, te lo pasa a ti o a tu equipo.",
  },
  {
    q: "¿En cuánto tiempo está funcionando?",
    a: "En días. El agente de IA suele estar en producción la primera semana; una web o tienda online completa toma un poco más según el alcance.",
  },
  {
    q: "¿Qué pasa si el cliente pregunta algo que el agente no sabe?",
    a: "El agente reconoce sus límites: nunca inventa. Escala la conversación a un humano y te notifica al instante para que nadie quede sin respuesta.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Depende del alcance de tu proyecto. En la demo gratuita revisamos tu caso, te mostramos el sistema funcionando y te damos una propuesta clara, sin letra pequeña ni permanencias.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-hairline px-4 py-28 md:py-36">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <span data-reveal className="eyebrow mb-6">
            Preguntas frecuentes
          </span>
          <h2 data-reveal className="display text-3xl font-semibold leading-tight md:text-4xl">
            Lo que todo el mundo pregunta{" "}
            <span className="text-ink-muted">antes de empezar.</span>
          </h2>
          <p data-reveal className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
            ¿Tienes otra duda? Escríbenos por WhatsApp y te responde un humano — o nuestro
            agente, y no vas a notar la diferencia.
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
