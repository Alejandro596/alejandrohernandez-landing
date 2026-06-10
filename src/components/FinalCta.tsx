import WhatsAppCta from "./WhatsAppCta";
import { WA } from "@/lib/site";

export default function FinalCta() {
  return (
    <section className="relative px-4 py-32 md:py-44">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p data-reveal className="mb-7 text-sm text-ink-muted">
          Demo gratuita de 30 minutos, sin compromiso
        </p>
        <h2
          data-reveal
          className="display text-4xl font-semibold leading-[1.05] md:text-6xl"
        >
          Mira el sistema funcionando{" "}
          <span className="text-accent">antes de invertir un peso.</span>
        </h2>
        <p data-reveal className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted">
          En 30 minutos te mostramos un agente de IA atendiendo un negocio como el tuyo y
          resolvemos tus preguntas. Si no te convence, quedamos como amigos.
        </p>
        <div data-reveal className="mt-10">
          <WhatsAppCta href={WA.demo}>Agendar mi demo gratis</WhatsAppCta>
        </div>
        <p data-reveal className="mt-5 text-xs text-ink-muted">
          Se abre tu WhatsApp y te responde nuestro propio agente en segundos. Para eso es, pruébalo.
        </p>
      </div>
    </section>
  );
}
