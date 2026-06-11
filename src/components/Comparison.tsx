const ROWS = [
  { bot: "Tú lo configuras y te las arreglas", system: "Lo construimos a la medida de tu negocio" },
  { bot: "Responde preguntas frecuentes", system: "Entrenado para vender y cerrar" },
  { bot: "Suena a robot", system: "Suena humano, con tu forma de hablar" },
  { bot: "Caja negra", system: "CRM completo: ves cada lead" },
  { bot: "Lo dejan solo", system: "Un equipo optimizándolo cada mes" },
];

export default function Comparison() {
  return (
    <section className="order-[13] px-4 py-24 md:order-none md:py-32">
      <div className="mx-auto max-w-5xl">
        <h2
          data-reveal
          className="display mx-auto max-w-3xl text-center text-3xl font-semibold leading-tight md:mx-0 md:text-left md:text-5xl"
        >
          Ya viste los &ldquo;agentes de IA&rdquo; de 30 dólares.{" "}
          <span className="text-ink-muted">Por eso desconfías.</span>
        </h2>

        <div data-reveal-group className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-[1.25rem] border border-bad/25 bg-bg-raised p-7 md:p-8">
            <h3 className="display text-lg font-semibold text-ink-muted">Bot genérico de $30</h3>
            <ul className="mt-5 flex flex-col gap-4">
              {ROWS.map((r) => (
                <li key={r.bot} className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted">
                  <Cross />
                  {r.bot}
                </li>
              ))}
            </ul>
          </div>

          <div className="card border-2 border-accent p-7 shadow-[0_0_52px_-14px_rgba(140,228,39,0.5)] md:p-8">
            <h3 className="display text-lg font-semibold">Tu Sistema de Ventas</h3>
            <ul className="mt-5 flex flex-col gap-4">
              {ROWS.map((r) => (
                <li key={r.system} className="flex items-start gap-3 text-sm font-medium leading-relaxed">
                  <Check />
                  {r.system}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p data-reveal className="display mx-auto mt-14 max-w-2xl text-center text-xl font-semibold md:mx-0 md:text-left md:text-2xl">
          Es la diferencia entre alquilar un taladro…{" "}
          <span className="glow-green">y contratar al maestro que te construye la casa.</span>
        </p>
        <p data-reveal className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-ink-muted md:mx-0 md:text-left md:text-lg">
          No, no es lo más barato del mercado. Es lo único que de verdad te va a vender.
        </p>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-accent-deep" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
      <path d="m7.5 12.5 3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Cross() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-bad/80" aria-hidden>
      <path d="m8 8 8 8m0-8-8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}
