const STEPS = [
  {
    n: "01",
    title: "Hablamos 30 minutos",
    body: "Una videollamada corta. Me cuentas cómo vendes hoy y te muestro un agente funcionando en vivo, con un caso parecido al tuyo.",
  },
  {
    n: "02",
    title: "Lo armo a tu medida",
    body: "Entreno el agente con tu información, tus precios y tu forma de hablar. Tú lo revisas y lo ajustamos hasta que suene a ti.",
  },
  {
    n: "03",
    title: "Lo conecto y arranca",
    body: "Tu WhatsApp de siempre, tu calendario, tu página. En cuestión de días ya está atendiendo gente real.",
  },
  {
    n: "04",
    title: "Lo sigo puliendo",
    body: "Leo las conversaciones reales y voy ajustando. Si el agente pierde una venta que pudo cerrar, lo corrijo.",
  },
];

export default function Process() {
  return (
    <section id="proceso" className="relative border-y border-hairline bg-bg-raised/40 px-4 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
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

        <ol data-reveal-group className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.n} className="border-t-2 border-accent/60 pt-5">
              <span className="display text-sm font-medium text-accent">{s.n}</span>
              <h3 className="display mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-ink-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
