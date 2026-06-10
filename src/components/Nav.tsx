import { WA } from "@/lib/site";

const LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#resultados", label: "Resultados" },
  { href: "#faq", label: "Preguntas" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-bg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
        <a href="#" className="display py-1 text-base font-semibold tracking-tight">
          Alejandro Hernández
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="py-2 text-sm text-ink-muted t-premium hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href={WA.demo}
          target="_blank"
          rel="noopener"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-[#0c1503] t-premium hover:bg-accent-bright"
        >
          Escríbenos
        </a>
      </nav>
    </header>
  );
}
