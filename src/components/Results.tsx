import { WA } from "@/lib/site";
import WhatsAppCta from "./WhatsAppCta";

const SECTORS = [
  {
    sector: "Educación",
    result:
      "Un instituto atiende a cientos de aspirantes al tiempo: el agente responde dudas del programa, califica interesados y los asesores solo hablan con quien de verdad va a matricularse.",
  },
  {
    sector: "Salud y bienestar",
    result:
      "Centros de masajes y terapias agendan citas a domicilio en automático, con confirmación, recordatorios y reagendamiento sin intervención humana.",
  },
  {
    sector: "Venta de productos",
    result:
      "Marcas de consumo cierran pedidos por WhatsApp con el agente recomendando productos, validando cobertura de envío y registrando cada venta.",
  },
];

const METRICS = [
  { value: 10000, suffix: "+", label: "conversaciones gestionadas por nuestros agentes" },
  { value: 3, suffix: " líneas", label: "de negocio cubiertas: IA, web y e-commerce" },
  { value: 100, suffix: "%", label: "de los leads reciben respuesta y seguimiento" },
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
          <WhatsAppCta href={WA.demo}>Quiero esto en mi negocio</WhatsAppCta>
        </div>
      </div>
    </section>
  );
}
