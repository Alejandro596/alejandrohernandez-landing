import { WA } from "@/lib/site";
import WhatsAppCta from "./WhatsAppCta";

const SECTORS = [
  {
    sector: "Educación",
    result:
      "Un instituto recibe cientos de mensajes de aspirantes cada semana. El agente responde las dudas del programa y los asesores solo hablan con quien de verdad quiere matricularse. Antes se les perdían mensajes; ya no.",
  },
  {
    sector: "Salud y bienestar",
    result:
      "Un centro de masajes a domicilio agenda sus citas solo: el agente confirma la hora, manda el recordatorio y si el cliente no puede, le reagenda. La dueña dejó de cuadrar citas a mano.",
  },
  {
    sector: "Venta de productos",
    result:
      "Una marca que vende por WhatsApp dejó al agente recomendando el producto, confirmando si hay envío a tu ciudad y tomando el pedido. Los vendedores entran solo cuando hace falta.",
  },
];

const METRICS = [
  { value: 10000, suffix: "+", label: "conversaciones que han pasado por nuestros agentes" },
  { value: 7, suffix: " días", label: "o menos para tener tu sistema andando" },
  { value: 100, suffix: "%", label: "de los mensajes contestados. Nadie queda en visto" },
];

export default function Results() {
  return (
    <section id="resultados" className="relative px-4 py-28 md:py-36">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div data-orb className="orb left-[-12%] top-[30%] h-[400px] w-[400px] bg-accent/15" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span data-reveal className="eyebrow mb-6">
            Resultados reales
          </span>
          <h2 data-reveal className="display text-3xl font-semibold leading-tight md:text-5xl">
            Sistemas que ya están vendiendo{" "}
            <span className="text-gradient">mientras sus dueños duermen.</span>
          </h2>
        </div>

        <div data-reveal-group className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {SECTORS.map((c) => (
            <article key={c.sector} className="bezel">
              <div className="bezel-core flex h-full flex-col p-8">
                <span className="eyebrow">{c.sector}</span>
                <p className="mt-5 text-sm leading-relaxed text-ink-muted">{c.result}</p>
              </div>
            </article>
          ))}
        </div>

        <div
          data-reveal
          className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline sm:grid-cols-3"
        >
          {METRICS.map((m) => (
            <div key={m.label} className="flex flex-col gap-1.5 bg-bg-raised/80 px-8 py-8">
              <span className="display text-4xl font-semibold text-ink">
                <span data-counter={m.value}>0</span>
                <span className="text-accent-bright">{m.suffix}</span>
              </span>
              <span className="text-xs leading-relaxed text-ink-muted">{m.label}</span>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-14 flex justify-center">
          <WhatsAppCta href={WA.demo}>Quiero esto para mi negocio</WhatsAppCta>
        </div>
      </div>
    </section>
  );
}
