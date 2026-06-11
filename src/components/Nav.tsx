import { LINK_SOFIA } from "@/lib/site";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-accent shadow-[0_1px_0_rgba(0,0,0,0.08)]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
        <a href="#" className="display py-1 text-base font-semibold tracking-tight text-white">
          Alejandro Hernández
        </a>
        <a
          href={LINK_SOFIA}
          target="_blank"
          rel="noopener"
          className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-accent-deep t-premium hover:bg-[#f0fdf4]"
        >
          Habla con Sofía
        </a>
      </nav>
    </header>
  );
}
