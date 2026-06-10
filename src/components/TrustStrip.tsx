const ITEMS = [
  "Agentes IA en WhatsApp",
  "Páginas web que convierten",
  "Tiendas online",
  "Agendamiento automático",
  "Seguimiento de leads",
  "CRM y automatización",
  "Recordatorios inteligentes",
  "Atención 24/7",
];

export default function TrustStrip() {
  return (
    <section className="border-y border-hairline bg-bg-raised/50 py-5" aria-hidden>
      <div
        className="overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {ITEMS.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="display mx-7 flex items-center gap-7 whitespace-nowrap text-sm font-medium uppercase tracking-[0.18em] text-ink-muted/70"
                >
                  {item}
                  <svg width="7" height="7" viewBox="0 0 8 8" className="text-accent-bright" aria-hidden>
                    <circle cx="4" cy="4" r="3" fill="currentColor" />
                  </svg>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
