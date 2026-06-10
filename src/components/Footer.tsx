import { SITE, WA } from "@/lib/site";
import PlaneMark from "./PlaneMark";

export default function Footer() {
  return (
    <footer className="border-t border-hairline px-4 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <span className="display flex items-center gap-2 text-lg font-semibold">
            <PlaneMark size={20} withTrail={false} />
            SKYMENT<span className="text-accent-bright">.</span>
          </span>
          <p className="text-xs text-ink-muted">
            Agentes de IA, desarrollo web y e-commerce · Colombia
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm text-ink-muted">
          <a href={WA.demo} target="_blank" rel="noopener" className="py-2 t-premium hover:text-ink">
            WhatsApp
          </a>
          <a href={`mailto:${SITE.email}`} className="py-2 t-premium hover:text-ink">
            Correo
          </a>
        </div>

        <p className="text-xs text-ink-muted/80">
          © {new Date().getFullYear()} Skyment. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
