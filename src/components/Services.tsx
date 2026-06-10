import WhatsAppCta from "./WhatsAppCta";
import { WA } from "@/lib/site";

const CHAT_DEMO = [
  { from: "user", text: "Hola, ¿tienen disponibilidad esta semana?" },
  { from: "bot", text: "¡Hola! Claro que sí 😊 Tengo mañana a las 10:00 a. m. o el jueves a las 3:00 p. m. ¿Cuál te queda mejor?" },
  { from: "user", text: "El jueves a las 3 está perfecto" },
  { from: "bot", text: "Listo, quedó agendada tu cita para el jueves a las 3:00 p. m. ✅ Un día antes te envío un recordatorio." },
];

export default function Services() {
  return (
    <section id="servicios" className="relative px-4 py-28 md:py-36">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div data-orb className="orb right-[-10%] top-[15%] h-[420px] w-[420px] bg-accent-deep/25" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span data-reveal className="eyebrow mb-6">
            Lo que instalamos
          </span>
          <h2 data-reveal className="display text-3xl font-semibold leading-tight md:text-5xl">
            Un sistema completo de ventas,{" "}
            <span className="text-gradient">no piezas sueltas.</span>
          </h2>
        </div>

        <div data-reveal-group className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-12">
          {/* Agente IA — pieza central */}
          <article className="bezel md:col-span-7 md:row-span-2">
            <div className="bezel-core flex h-full flex-col p-8 md:p-10">
              <IconSpark />
              <h3 className="display mt-6 text-2xl font-semibold md:text-3xl">
                Agentes de IA para WhatsApp
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
                Un asesor virtual con tu tono y tu conocimiento del negocio que responde al
                instante, califica cada lead, agenda citas y demos directamente en tu
                calendario, envía recordatorios y hace seguimiento a quien no contestó.
                Funciona de día, de noche y los festivos.
              </p>

              {/* Mini demo de conversación */}
              <div className="mt-8 flex flex-1 flex-col justify-end gap-2.5">
                {CHAT_DEMO.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
                      m.from === "bot"
                        ? "self-start rounded-bl-md bg-white/6 text-ink"
                        : "self-end rounded-br-md bg-accent/25 text-ink"
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <WhatsAppCta href={WA.ia} variant="ghost">
                  Quiero mi agente de IA
                </WhatsAppCta>
              </div>
            </div>
          </article>

          {/* Desarrollo web */}
          <article className="bezel md:col-span-5">
            <div className="bezel-core flex h-full flex-col p-8 md:p-10">
              <IconLayout />
              <h3 className="display mt-6 text-xl font-semibold md:text-2xl">Desarrollo web</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Páginas rápidas, hermosas y pensadas para convertir: cada sección guía al
                visitante hacia una sola acción — contactarte.
              </p>
              <a
                href={WA.web}
                target="_blank"
                rel="noopener"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-bright t-premium hover:gap-3"
              >
                Quiero mi página web
                <Arrow />
              </a>
            </div>
          </article>

          {/* E-commerce */}
          <article className="bezel md:col-span-5">
            <div className="bezel-core flex h-full flex-col p-8 md:p-10">
              <IconBag />
              <h3 className="display mt-6 text-xl font-semibold md:text-2xl">E-commerce</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Tiendas online listas para vender: catálogo, pagos y logística — integradas
                con tu agente de IA para recuperar carritos y cerrar por WhatsApp.
              </p>
              <a
                href={WA.ecommerce}
                target="_blank"
                rel="noopener"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-bright t-premium hover:gap-3"
              >
                Quiero mi tienda online
                <Arrow />
              </a>
            </div>
          </article>

          {/* Automatización */}
          <article className="bezel md:col-span-12">
            <div className="bezel-core flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center md:p-10">
              <div className="max-w-xl">
                <h3 className="display text-xl font-semibold md:text-2xl">
                  Automatización y seguimiento
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Nada se queda en el aire: seguimiento automático a leads fríos,
                  recordatorios de cita, notificaciones a tu equipo y todos los datos de tus
                  conversaciones organizados para decidir con números, no con intuición.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Seguimiento 1h · 24h · 48h", "Recordatorios de cita", "CRM en tiempo real"].map(
                  (t) => (
                    <span
                      key={t}
                      className="glass rounded-full px-4 py-2 text-xs text-ink-muted"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSpark() {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent-bright">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 3v4m0 10v4M3 12h4m10 0h4M5.6 5.6l2.8 2.8m7.2 7.2 2.8 2.8m0-12.8-2.8 2.8M8.4 15.6l-2.8 2.8"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function IconLayout() {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent-bright">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.25" />
        <path d="M3.5 9.5h17M9.5 9.5v10" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    </span>
  );
}

function IconBag() {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent-bright">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5.5 8.5h13l-1 11h-11l-1-11Zm3.5 0V7a3 3 0 0 1 6 0v1.5"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
