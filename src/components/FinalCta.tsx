import SofiaCta from "./SofiaCta";

export default function FinalCta() {
  return (
    <section className="border-t border-hairline bg-bg-raised px-4 py-28 md:py-36">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 data-reveal className="display text-4xl font-semibold leading-[1.05] md:text-6xl">
          No nos creas. <span className="text-accent-deep">Pruébalo.</span>
        </h2>
        <p data-reveal className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted md:text-lg">
          Escríbele a Sofía. Te resuelve las dudas y te agenda la llamada, sin que un
          humano mueva un dedo. Así de bien funciona.
        </p>
        <div data-reveal className="mt-10">
          <SofiaCta />
        </div>
      </div>
    </section>
  );
}
