const PAINS = [
  {
    n: "01",
    title: "Te escriben a las 9 de la noche y respondes al otro día",
    body: "Para cuando contestas, esa persona ya le compró al que sí respondió. En WhatsApp el que llega primero se queda con la venta, así de simple.",
  },
  {
    n: "02",
    title: "Llevas años contestando lo mismo",
    body: "Que cuánto vale, que dónde están ubicados, que si hay disponibilidad. Casi todas las conversaciones son iguales y te comen el día entero.",
  },
  {
    n: "03",
    title: "Tienes página web, pero no te trae clientes",
    body: "Está bonita y ahí se queda. Una cosa es tener página y otra muy distinta es tener un sistema que captura interesados y los lleva hasta la compra.",
  },
  {
    n: "04",
    title: "Si tú no estás, no se vende",
    body: "Un viaje, una gripa, un día ocupado, y las ventas se frenan. Un negocio que depende de que estés pegado al celular no puede crecer.",
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
            <span className="text-ink-muted">¿Te suena alguna de estas?</span>
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
