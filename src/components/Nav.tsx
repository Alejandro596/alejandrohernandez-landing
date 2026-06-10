"use client";

import { useState } from "react";
import { WA } from "@/lib/site";
import PlaneMark from "./PlaneMark";

const LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#resultados", label: "Resultados" },
  { href: "#faq", label: "Preguntas" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4">
        <nav className="glass mt-5 flex w-full max-w-3xl items-center justify-between rounded-full py-2 pl-6 pr-2 backdrop-blur-2xl">
          <a href="#" className="display flex items-center gap-2 text-[15px] tracking-tight font-semibold">
            <PlaneMark size={18} withTrail={false} />
            SKYMENT<span className="text-accent-bright">.</span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[13px] text-ink-muted t-premium hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={WA.demo}
              target="_blank"
              rel="noopener"
              className="hidden rounded-full bg-accent px-5 py-2.5 text-[13px] font-semibold text-[#0c1503] t-premium hover:bg-accent-bright md:block"
            >
              Agendar demo
            </a>
            <button
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setOpen(!open)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/5 md:hidden"
            >
              <span
                className={`absolute h-px w-4 bg-ink t-premium ${
                  open ? "rotate-45" : "-translate-y-1"
                }`}
              />
              <span
                className={`absolute h-px w-4 bg-ink t-premium ${
                  open ? "-rotate-45" : "translate-y-1"
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Overlay móvil */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-bg/90 backdrop-blur-3xl t-premium md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {LINKS.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
            className={`display text-3xl font-medium t-premium ${
              open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {l.label}
          </a>
        ))}
        <a
          href={WA.demo}
          target="_blank"
          rel="noopener"
          onClick={() => setOpen(false)}
          style={{ transitionDelay: open ? "360ms" : "0ms" }}
          className={`rounded-full bg-accent px-8 py-3.5 font-semibold text-[#0c1503] t-premium ${
            open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Agendar demo gratuita
        </a>
      </div>
    </>
  );
}
