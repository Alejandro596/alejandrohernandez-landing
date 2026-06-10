const STEPS = [
  {
    n: "1",
    title: "Tu cliente escribe",
    body: "A cualquier hora, desde tu anuncio o tu WhatsApp.",
  },
  {
    n: "2",
    title: "Sofía atiende y vende",
    body: "Responde, resuelve dudas y avanza la venta.",
  },
  {
    n: "3",
    title: "Tú lo ves todo",
    body: "Cada conversación queda registrada en tu CRM.",
  },
];

const PIPELINE = [
  {
    stage: "Nuevos",
    count: 8,
    leads: [
      { name: "Camila R.", note: "Preguntó precios · 11:42 p. m." },
      { name: "Jorge M.", note: "Vio el anuncio · 1:15 a. m." },
    ],
  },
  {
    stage: "En conversación",
    count: 5,
    leads: [
      { name: "Laura P.", note: "Resolviendo objeción" },
      { name: "Andrés T.", note: "Pidió fotos del producto" },
    ],
  },
  {
    stage: "Agendados",
    count: 3,
    leads: [
      { name: "Diana V.", note: "Demo · jueves 3:00 p. m." },
      { name: "Carlos G.", note: "Llamada · viernes 10:00 a. m." },
    ],
  },
];

const CHAT = [
  { from: "user", text: "Hola, ¿todavía están disponibles? Lo necesito ya", time: "1:58 a. m." },
  { from: "sofia", text: "¡Hola! Sí, claro 😊 Con gusto te ayudo a realizar tu pedido ahora. ¿Me confirmas tu nombre y ciudad?", time: "1:58 a. m." },
  { from: "user", text: "Carlos, de Medellín", time: "1:59 a. m." },
  { from: "sofia", text: "Perfecto Carlos. Tenemos envío a Medellín mañana mismo. ¿Te agendo y te llamo a las 10:00 a. m. para confirmar los detalles?", time: "1:59 a. m." },
  { from: "user", text: "Listo, a las 10 me sirve ✅", time: "2:01 a. m." },
];

export default function HowItWorks() {
  return (
    <section className="border-y border-hairline bg-bg-raised px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <h2
          data-reveal
          className="display max-w-3xl text-3xl font-semibold leading-tight md:text-5xl"
        >
          Mira tu operación funcionando,{" "}
          <span className="text-accent-deep">incluso a las 2 de la mañana.</span>
        </h2>

        {/* {MOCKUP_CRM}: mockup construido en CSS — reemplazable por captura real del CRM */}
        <div data-reveal className="card mt-14 overflow-hidden">
          <div className="flex items-center gap-1.5 border-b border-hairline bg-bg px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs font-medium text-ink-muted">
              CRM · Panel de ventas — 2:01 a. m.
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Pipeline del CRM */}
            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-3 lg:col-span-3 lg:border-r lg:border-hairline">
              {PIPELINE.map((col) => (
                <div key={col.stage} className="rounded-xl bg-bg-raised p-3">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-semibold text-ink">{col.stage}</span>
                    <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-semibold text-accent-deep">
                      {col.count}
                    </span>
                  </div>
                  <div className="mt-2.5 flex flex-col gap-2">
                    {col.leads.map((l) => (
                      <div key={l.name} className="rounded-lg border border-hairline bg-bg p-2.5">
                        <p className="text-xs font-semibold">{l.name}</p>
                        <p className="mt-0.5 text-[11px] text-ink-muted">{l.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat de WhatsApp con Sofía vendiendo */}
            <div className="flex flex-col bg-[#e9f5ec] lg:col-span-2">
              <div className="flex items-center gap-2.5 border-b border-black/5 bg-bg px-4 py-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-on-accent">
                  S
                </span>
                <div>
                  <p className="text-xs font-semibold">Sofía · Asesora</p>
                  <p className="text-[10px] text-accent-deep">en línea</p>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-end gap-2 p-4">
                {CHAT.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[88%] rounded-xl px-3 py-2 text-[12px] leading-relaxed shadow-sm ${
                      m.from === "sofia"
                        ? "self-start rounded-bl-sm bg-white text-ink"
                        : "self-end rounded-br-sm bg-[#d9fdd3] text-ink"
                    }`}
                  >
                    {m.text}
                    <span className="ml-2 align-bottom text-[9px] text-ink-muted">{m.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ol data-reveal-group className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="flex items-start gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-bold text-on-accent">
                {s.n}
              </span>
              <div>
                <h3 className="display text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
