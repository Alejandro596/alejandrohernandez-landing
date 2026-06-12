const FAQS = [
  {
    q: "¿Y si no funciona en mi negocio?",
    a: "Sofía se entrena con tu producto, tus precios y tu forma de vender — no es una plantilla. Por eso la demo es en vivo y con tu caso: la pruebas, la estresas con preguntas reales, y si no te convence, no avanzas. Así de simple.",
  },
  {
    q: "¿Cuánto tarda en quedar listo?",
    a: "Menos de lo que crees: lo construimos nosotros de principio a fin y te vamos mostrando avances. En la llamada te damos la fecha exacta para tu caso, porque depende de tu catálogo y tu operación.",
  },
  {
    q: "¿Necesito saber de tecnología?",
    a: "Cero. Nosotros lo montamos, lo conectamos a tu WhatsApp y te entregamos tu CRM personalizado funcionando. Tu único trabajo es atender las citas que Sofía te agenda.",
  },
  {
    q: "¿Y si la IA dice algo que no debe?",
    a: "Sofía solo responde con la información que aprobamos contigo antes de salir en vivo, y cada conversación queda registrada en tu CRM para que lo compruebes cuando quieras. Además, un equipo la revisa y la afina cada mes.",
  },
];

export default function Faq() {
  return (
    <section className="order-[15] px-4 py-24 md:order-none md:py-32">
      <div className="mx-auto max-w-3xl">
        <h2
          data-reveal
          className="display mx-auto max-w-2xl text-center text-3xl font-semibold leading-tight md:mx-0 md:text-left md:text-5xl"
        >
          Lo que todos preguntan{" "}
          <span className="text-ink-muted">antes de empezar.</span>
        </h2>

        <div data-reveal-group className="mt-12 flex flex-col gap-3">
          {FAQS.map((f) => (
            <details key={f.q} className="card group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold [&::-webkit-details-marker]:hidden md:text-lg">
                {f.q}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                  className="shrink-0 text-accent-bright transition-transform duration-300 group-open:rotate-45"
                >
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
