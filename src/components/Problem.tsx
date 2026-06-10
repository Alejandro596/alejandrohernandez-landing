const PAINS = [
  {
    title: "Te escriben a las 9 de la noche y respondes al otro día",
    body: "Para cuando contestas, esa persona ya le compró al que sí respondió. En WhatsApp el que llega primero se queda con la venta, así de simple.",
  },
  {
    title: "Llevas años contestando lo mismo",
    body: "Que cuánto vale, que dónde están ubicados, que si hay disponibilidad. Casi todas las conversaciones son iguales y te comen el día entero.",
  },
  {
    title: "Tienes página web, pero no te trae clientes",
    body: "Está bonita y ahí se queda. Una cosa es tener página y otra muy distinta es tener un sistema que captura interesados y los lleva hasta la compra.",
  },
  {
    title: "Si tú no estás, no se vende",
    body: "Un viaje, una gripa, un día ocupado, y las ventas se frenan. Un negocio que depende de que estés pegado al celular no puede crecer.",
  },
];

export default function Problem() {
  return (
    <section className="relative px-4 py-28 md:py-36">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <h2
              data-reveal
              className="display text-3xl font-semibold leading-tight md:text-5xl"
            >
              Tu negocio pierde ventas todos los días.{" "}
              <span className="text-ink-muted">¿Te suena alguna de estas?</span>
            </h2>
          </div>
        </div>

        <div data-reveal-group className="md:col-span-7">
          {PAINS.map((p) => (
            <article key={p.title} className="border-t border-hairline py-8 first:border-t-0 first:pt-0 md:py-10">
              <h3 className="display text-xl font-semibold leading-snug md:text-2xl">
                {p.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted md:text-base">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
