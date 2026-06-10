import WhatsAppCta from "./WhatsAppCta";
import { WA } from "@/lib/site";

const PROOFS = [
  "Atiende 24/7, también festivos",
  "Responde en menos de un minuto",
  "Queda funcionando en días, no meses",
];

export default function Hero() {
  return (
    <section
      data-hero
      className="relative flex flex-col items-center justify-center px-4 pb-24 pt-28 md:min-h-[88vh] md:pb-28"
    >
      <span data-reveal className="eyebrow mb-7">
        Agentes de IA · Web · E-commerce
      </span>

      <h1
        data-reveal
        className="display max-w-5xl text-center text-[2.5rem] font-semibold leading-[1.02] sm:text-5xl md:text-7xl"
      >
        Tu negocio vendiendo
        <br />
        <span className="text-gradient">en automático.</span>
      </h1>

      <p
        data-reveal
        className="mt-7 max-w-xl text-center text-base leading-relaxed text-ink-muted md:text-lg"
      >
        Soy Alejandro Hernández. Monto agentes de inteligencia artificial en tu WhatsApp,
        páginas web y tiendas online. El sistema contesta, agenda y cierra; tú te dedicas a
        manejar tu negocio.
      </p>

      <div data-reveal className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <WhatsAppCta href={WA.demo}>Quiero ver una demo</WhatsAppCta>
        <a
          href="#servicios"
          className="rounded-full px-6 py-3 text-sm text-ink-muted t-premium hover:text-ink"
        >
          Primero quiero ver qué haces
        </a>
      </div>

      <div
        data-reveal
        className="mt-20 flex w-full max-w-3xl flex-col items-center justify-center gap-3 text-sm text-ink-muted sm:flex-row sm:gap-0 sm:divide-x sm:divide-white/15"
      >
        {PROOFS.map((p) => (
          <span key={p} className="px-6 text-center">
            {p}
          </span>
        ))}
      </div>
    </section>
  );
}
