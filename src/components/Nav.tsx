import { LINK_SOFIA } from "@/lib/site";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-bg/95">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
        <a href="#" className="display py-1 text-base font-semibold tracking-tight text-ink">
          Alejandro Hernández
        </a>
        <a
          href={LINK_SOFIA}
          target="_blank"
          rel="noopener"
          className="rounded-full bg-gradient-to-b from-[#9bec33] to-[#52b50d] px-5 py-2.5 text-sm font-semibold text-on-accent shadow-[0_0_18px_rgba(140,228,39,0.4)] t-premium hover:shadow-[0_0_30px_rgba(140,228,39,0.6)] hover:brightness-110"
        >
          Habla con Sofía
        </a>
      </nav>
    </header>
  );
}
