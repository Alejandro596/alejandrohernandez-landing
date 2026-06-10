import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-hairline px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span className="display text-lg font-semibold">Alejandro Hernández</span>
          <p className="text-xs text-ink-muted">Sistemas de ventas que no duermen.</p>
        </div>

        <div className="flex items-center gap-6 text-xs text-ink-muted">
          <a href={`mailto:${SITE.email}`} className="py-2 t-premium hover:text-ink">
            Correo
          </a>
          <a href="/privacidad" className="py-2 t-premium hover:text-ink">
            Privacidad
          </a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
