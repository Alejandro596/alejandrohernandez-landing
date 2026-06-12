import SofiaCta from "./SofiaCta";
import VslCard from "./VslCard";

export default function Hero() {
  return (
    <section data-hero className="ambient-green relative order-2 px-4 pb-14 pt-14 md:order-none md:pb-28 md:pt-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-10">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <span data-reveal className="eyebrow mb-6">
            Para negocios que invierten en pauta y venden por WhatsApp
          </span>

          <h1
            data-reveal
            className="display text-[2.6rem] font-semibold leading-[1.04] sm:text-5xl md:text-6xl"
          >
            Tus ventas no pueden seguir cerrando{" "}
            <span className="glow-green">a las 5 PM.</span>
          </h1>

          <p data-reveal className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted md:text-lg">
            Mientras tu equipo descansa, tus clientes siguen escribiendo —y le terminan
            comprando a quien sí les responde. Instalamos un sistema que atiende, vende y
            agenda por WhatsApp las 24 horas, y te muestra cada conversación en tu CRM.
          </p>

          {/* En móvil el video vive aquí: entre el copy y el CTA */}
          <div data-reveal className="mt-8 w-full md:hidden">
            <VslCard />
          </div>

          <div data-reveal className="mt-8 md:mt-9">
            <SofiaCta />
          </div>
          <p data-reveal className="mt-4 text-sm text-ink-muted">
            Es una demo en vivo. Ella misma te agenda la llamada.
          </p>
        </div>

        {/* En móvil el video vive en su propia sección justo después del copy */}
        <div data-reveal className="hidden md:block">
          <VslCard />
        </div>
      </div>
    </section>
  );
}
