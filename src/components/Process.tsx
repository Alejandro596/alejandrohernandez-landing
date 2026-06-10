const STEPS = [
  {
    n: "01",
    title: "Demo en vivo",
    body: "Agendas 30 minutos y ves un agente de IA funcionando con un caso como el tuyo. Sin presentaciones eternas: el sistema se vende solo.",
  },
  {
    n: "02",
    title: "Diseño a tu medida",
    body: "Entrenamos el agente con tu información, tu tono y tus reglas de negocio. Si incluye web o tienda, la diseñamos para convertir.",
  },
  {
    n: "03",
    title: "Lanzamiento en días",
    body: "Conectamos todo a tu WhatsApp, tu calendario y tu web. Empiezas a atender en automático en días, no en meses.",
  },
  {
    n: "04",
    title: "Optimización continua",
    body: "Monitoreamos las conversaciones reales y afinamos el sistema cada semana para que cierre cada vez más.",
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
              De la demo al sistema funcionando,{" "}
              <span className="text-ink-muted">sin fricción.</span>
            </h2>
          </div>
          <p data-reveal className="max-w-xs text-sm leading-relaxed text-ink-muted">
            Primero lo ves funcionando, después decides. La demo es gratuita y sin
            compromiso.
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
