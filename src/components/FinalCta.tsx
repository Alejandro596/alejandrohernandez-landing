import WhatsAppCta from "./WhatsAppCta";
import { WA } from "@/lib/site";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden px-4 py-32 md:py-44">
      <div className="absolute inset-0 -z-10">
        <div
          data-orb
          className="orb left-1/2 top-1/2 h-[460px] w-[760px] -translate-x-1/2 -translate-y-1/2 bg-accent-deep/35"
        />
      </div>

      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span data-reveal className="eyebrow mb-7">
          Demo gratuita · 30 minutos · sin compromiso
        </span>
        <h2
          data-reveal
          className="display text-4xl font-semibold leading-[1.05] md:text-6xl"
        >
          Mira el sistema funcionando{" "}
          <span className="text-gradient">antes de invertir un peso.</span>
        </h2>
        <p data-reveal className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted">
          Agenda una demo en vivo: te mostramos un agente de IA atendiendo un negocio como
          el tuyo y resolvemos todas tus preguntas. Si no te convence, no pasa nada.
        </p>
        <div data-reveal className="mt-10">
          <WhatsAppCta href={WA.demo}>Agendar mi demo gratuita</WhatsAppCta>
        </div>
        <p data-reveal className="mt-5 text-xs text-ink-muted/70">
          Respondemos en menos de un minuto — obviamente.
        </p>
      </div>
    </section>
  );
}
