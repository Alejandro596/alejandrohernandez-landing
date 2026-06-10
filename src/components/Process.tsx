const STEPS = [
  {
    n: "01",
    title: "Hablamos 30 minutos",
    body: "Una videollamada corta. Nos cuentas cómo vendes hoy y te mostramos un agente funcionando en vivo, con un caso parecido al tuyo.",
  },
  {
    n: "02",
    title: "Lo armamos a tu medida",
    body: "Entrenamos el agente con tu información, tus precios y tu forma de hablar. Tú lo revisas y lo ajustamos hasta que suene a ti.",
  },
  {
    n: "03",
    title: "Lo conectamos y arranca",
    body: "Tu WhatsApp de siempre, tu calendario, tu página. En cuestión de días ya está atendiendo gente real.",
  },
  {
    n: "04",
    title: "Lo seguimos puliendo",
    body: "Leemos las conversaciones reales y vamos ajustando. Si el agente pierde una venta que pudo cerrar, lo corregimos.",
  },
];

export default function Process() {
  return (
    <section id="proceso" className="relative border-y border-hairline bg-bg-raised/40 px-4 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span data-reveal className="eyebrow mb-6">
              Cómo trabajamos
            </span>
            <h2 data-reveal className="display text-3xl font-semibold leading-tight md:text-5xl">
              De la primera llamada al sistema funcionando,{" "}
              <span className="text-ink-muted">sin enredos.</span>
            </h2>
          </div>
          <p data-reveal className="max-w-xs text-sm leading-relaxed text-ink-muted">
            Primero lo ves funcionando y después decides. Así de simple. La demo no cuesta
            nada.
          </p>
        </div>

        <ol data-reveal-group className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.n} className="relative">
              <div className="glass h-full rounded-3xl p-7">
                <div className="flex items-center justify-between">
                  <span className="display text-sm font-medium text-accent-bright">{s.n}</span>
                  {i < STEPS.length - 1 && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="hidden text-ink-muted/40 md:block"
                      aria-hidden
                    >
                      <path
                        d="M5 12h14m-6-6 6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <h3 className="display mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-ink-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
