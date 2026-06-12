import { HERO_STATS } from "@/lib/site";

// Franja de prueba en números bajo el hero (referencia: josehuila).
// Solo aparece cuando HERO_STATS tiene cifras reales.
export default function HeroStats() {
  if (HERO_STATS.length === 0) return null;
  return (
    <div
      data-reveal
      className="mt-8 inline-flex divide-x divide-hairline rounded-2xl border border-hairline bg-[#0b0f09]/80 shadow-[0_0_28px_rgba(140,228,39,0.12)]"
    >
      {HERO_STATS.map((s) => (
        <div key={s.label} className="px-7 py-4 text-center md:px-9">
          <p className="display glow-green text-2xl font-bold md:text-3xl">{s.value}</p>
          <p className="mt-1 text-xs text-ink-muted md:text-sm">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
