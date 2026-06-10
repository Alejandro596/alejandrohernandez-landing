const PAINS = [
  {
    n: "01",
    title: "Respondes tarde y el cliente compra en otro lado",
    body: "En WhatsApp, el negocio que contesta primero se queda con la venta. Cada hora sin responder es dinero que se va a tu competencia.",
  },
  {
    n: "02",
    title: "Tu equipo repite las mismas respuestas todo el día",
    body: "Precios, horarios, ubicación, disponibilidad… el 80% de las conversaciones son idénticas y consumen el tiempo que deberías invertir en cerrar.",
  },
  {
    n: "03",
    title: "Tu web es una tarjeta de presentación, no una máquina de ventas",
    body: "Tener página no es lo mismo que tener un sistema que captura leads, los califica y los lleva hasta la compra.",
  },
  {
    n: "04",
    title: "Si tú no estás, el negocio no vende",
    body: "Las ventas dependen de que estés pegado al celular. Eso no escala, no descansa y no se puede delegar… hasta ahora.",
  },
];

export default function Problem() {
  return (
    <section className="relative px-4 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span data-reveal className="eyebrow mb-6">
            El problema
          </span>
          <h2
            data-reveal
            className="display text-3xl font-semibold leading-tight md:text-5xl"
          >
            Tu negocio pierde ventas todos los días.{" "}
            <span className="text-ink-muted">Y casi nunca te das cuenta.</span>
          </h2>
        </div>

        <div data-reveal-group className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          {PAINS.map((p) => (
            <article key={p.n} className="bezel">
              <div className="bezel-core p-8 md:p-10">
                <span className="display text-sm font-medium text-accent-bright">{p.n}</span>
                <h3 className="display mt-4 text-xl font-semibold leading-snug md:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
