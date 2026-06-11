const STATS = [
  {
    big: "3 a 4 de cada 10",
    text: "mensajes entran cuando tu equipo ya se fue.",
  },
  {
    big: "Los pagaste con pauta.",
    text: "La mayoría no espera: le compra a quien le responda primero.",
  },
  {
    big: "Y hoy ni siquiera sabes",
    text: "cuántos se te perdieron.",
  },
];

export default function Problem() {
  return (
    <section className="order-7 bg-bg-raised px-4 py-24 md:order-none md:py-32">
      <div className="mx-auto max-w-6xl">
        <h2
          data-reveal
          className="display mx-auto max-w-2xl text-center text-3xl font-semibold leading-tight md:mx-0 md:text-left md:text-5xl"
        >
          Pagas por cada lead.{" "}
          <span className="text-ink-muted">Pero no estás ahí para todos.</span>
        </h2>

        <div data-reveal-group className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {STATS.map((s) => (
            <div key={s.big} className="border-t-2 border-bad/70 pt-5 text-center md:text-left">
              <p className="display text-2xl font-semibold leading-snug md:text-3xl">{s.big}</p>
              <p className="mt-2 text-base leading-relaxed text-ink-muted">{s.text}</p>
            </div>
          ))}
        </div>

        <p data-reveal className="display mx-auto mt-16 max-w-2xl text-center text-xl font-semibold md:mx-0 md:text-left md:text-2xl">
          Eso no es un gasto de marketing.{" "}
          <span className="glow-red">Es plata quemada todos los días.</span>
        </p>
      </div>
    </section>
  );
}
