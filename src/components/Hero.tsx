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
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-20"
    >
      {/* Fondo ambiental */}
      <div className="absolute inset-0 -z-10">
        <div
          data-orb
          className="orb left-1/2 top-[-12%] h-[480px] w-[720px] -translate-x-1/2 bg-accent-deep/40"
        />
        <div data-orb className="orb bottom-[-18%] left-[-8%] h-[380px] w-[380px] bg-accent/20" />
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 75% 60% at 50% 38%, black, transparent)",
          }}
        />
      </div>

      <span data-reveal className="eyebrow mb-7">
        Agencia de IA · Web · E-commerce
      </span>

      <h1
        data-reveal
        className="display max-w-5xl text-center text-[2.5rem] font-semibold leading-[1.02] sm:text-5xl md:text-7xl lg:text-[5.4rem]"
      >
        Tu negocio vendiendo
        <br />
        <span className="text-gradient">en automático.</span>
      </h1>

      <p
        data-reveal
        className="mt-7 max-w-xl text-center text-base leading-relaxed text-ink-muted md:text-lg"
      >
        Montamos agentes de inteligencia artificial en tu WhatsApp, páginas web y tiendas
        online. El sistema contesta, agenda y cierra. Tú te dedicas a manejar tu negocio,
        no a responder el celular.
      </p>

      <div data-reveal className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <WhatsAppCta href={WA.demo}>Quiero ver una demo</WhatsAppCta>
        <a
          href="#servicios"
          className="rounded-full px-6 py-3 text-sm text-ink-muted t-premium hover:text-ink"
        >
          Primero quiero ver qué hacen
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
