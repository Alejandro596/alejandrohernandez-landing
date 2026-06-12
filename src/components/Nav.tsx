import { LINK_SOFIA } from "@/lib/site";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 order-1 border-b border-hairline bg-bg/95 md:order-none">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
        <a href="#" className="display py-1 text-base font-semibold tracking-tight text-ink">
          Alejandro Hernández
        </a>
        <a
          href={LINK_SOFIA}
          target="_blank"
          rel="noopener"
          className="btn-shine btn-gold-green rounded-full px-5 py-2.5 text-sm font-semibold text-on-accent t-premium"
        >
          Habla con Sofía
        </a>
      </nav>
    </header>
  );
}
