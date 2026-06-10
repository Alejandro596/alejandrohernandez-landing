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

export default function Results() {
  return (
    <section id="resultados" className="relative px-4 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <h2
          data-reveal
          className="display max-w-2xl text-3xl font-semibold leading-tight md:text-5xl"
        >
          Sistemas que ya están vendiendo{" "}
          <span className="text-gradient">mientras sus dueños duermen.</span>
        </h2>

        <div data-reveal-group className="mt-14">
          {SECTORS.map((c) => (
            <article
              key={c.sector}
              className="grid grid-cols-1 gap-3 border-t border-hairline py-8 md:grid-cols-12 md:gap-8 md:py-10"
            >
              <h3 className="display text-base font-semibold text-accent md:col-span-3">
                {c.sector}
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-ink-muted md:col-span-9 md:text-base">
                {c.result}
              </p>
            </article>
          ))}
        </div>

        <p
          data-reveal
          className="display mt-16 max-w-3xl text-2xl font-semibold leading-snug md:text-3xl"
        >
          Más de <span className="text-accent">10.000</span> conversaciones reales han pasado por
          mis agentes.{" "}
          <span className="text-ink-muted">Cada una contestada al momento.</span>
        </p>

        <div data-reveal className="mt-12">
          <WhatsAppCta href={WA.demo}>Quiero esto para mi negocio</WhatsAppCta>
        </div>
      </div>
    </section>
  );
}
