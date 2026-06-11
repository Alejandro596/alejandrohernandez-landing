const BLOCKS = [
  {
    title: "Atiende y vende 24/7",
    body: "Responde en segundos a cualquier hora. Maneja objeciones y cierra como tu mejor asesora.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Hecho a la medida de tu negocio",
    body: "Entrenado con tu producto, tus precios y tu forma de vender. No suena a robot.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M11 5.5h7m-7 6.5h7m-7 6.5h7M5 4l1 1.5L8 4m-3 6.5 1 1.5 2-1.5M5 17l1 1.5L8 17"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "CRM donde ves todo",
    body: "Cada lead, cada etapa, cada conversación. Nada de cajas negras.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3.5" y="4.5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3.5 9.5h17m-11.5 0v10" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function Solution() {
  return (
    <section className="order-6 px-4 py-24 md:order-none md:py-32">
      <div className="mx-auto max-w-6xl">
        <h2
          data-reveal
          className="display mx-auto max-w-3xl text-center text-3xl font-semibold leading-tight md:mx-0 md:text-left md:text-5xl"
        >
          No es un chatbot.{" "}
          <span className="glow-green">Es un Sistema de Ventas Autónomo.</span>
        </h2>

        <div data-reveal-group className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {BLOCKS.map((b) => (
            <article key={b.title} className="card p-8 text-center md:text-left">
              <div className="flex items-center justify-center gap-3 md:justify-start">
                <span className="shrink-0 text-accent-deep">{b.icon}</span>
                <h3 className="display text-xl font-semibold">{b.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base">{b.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
