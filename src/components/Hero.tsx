import SofiaCta from "./SofiaCta";

export default function Hero() {
  return (
    <section data-hero className="relative px-4 pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-10">
        <div className="flex flex-col items-start">
          <span data-reveal className="eyebrow mb-6">
            Para empresas que venden por WhatsApp
          </span>

          <h1
            data-reveal
            className="display text-[2.6rem] font-semibold leading-[1.04] sm:text-5xl md:text-6xl"
          >
            Tus ventas no pueden seguir cerrando{" "}
            <span className="text-accent-deep">a las 5 PM.</span>
          </h1>

          <p data-reveal className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted md:text-lg">
            Mientras tu equipo descansa, tus clientes siguen escribiendo. Un sistema que
            atiende, vende y agenda por WhatsApp las 24 horas, y te muestra cada
            conversación.
          </p>

          <div data-reveal className="mt-9">
            <SofiaCta />
          </div>
          <p data-reveal className="mt-4 text-sm text-ink-muted">
            Es una demo en vivo. Ella misma te agenda la llamada.
          </p>
        </div>

        {/* {EMBED_VSL}: reemplazar este bloque por el embed real (cargar muteado, lazy) */}
        <div data-reveal className="card overflow-hidden">
          <div className="relative flex aspect-video items-center justify-center bg-bg-raised">
            <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-white">
              Mira cómo funciona · 2 min
            </span>
            <button
              aria-label="Reproducir video"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-on-accent t-premium hover:scale-105"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5.5v13l11-6.5-11-6.5Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
