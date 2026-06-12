// {EMBED_VSL}: reemplazar por el embed real (cargar muteado, lazy)
export default function VslCard() {
  return (
    <div className="card overflow-hidden">
      <div className="relative flex aspect-video items-center justify-center bg-bg-raised">
        <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-white">
          Mira cómo funciona · 2 min
        </span>
        {/* Decorativo hasta que exista el VSL real: no es un control, no engaña al teclado */}
        <span
          aria-hidden
          className="btn-gold-green flex h-16 w-16 items-center justify-center rounded-full text-on-accent"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5.5v13l11-6.5-11-6.5Z" />
          </svg>
        </span>
      </div>
    </div>
  );
}
