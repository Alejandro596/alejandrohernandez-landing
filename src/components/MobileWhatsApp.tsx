import { WA } from "@/lib/site";
import { WhatsAppGlyph } from "./WhatsAppCta";

// Botón flotante solo en móvil: el CTA del nav queda en la esquina anti-pulgar
export default function MobileWhatsApp() {
  return (
    <a
      href={WA.demo}
      target="_blank"
      rel="noopener"
      aria-label="Escribirnos por WhatsApp"
      className="fixed bottom-5 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-[#0c1503] shadow-[0_4px_24px_rgba(0,0,0,0.35)] t-premium active:scale-95 md:hidden"
    >
      <WhatsAppGlyph size={26} />
    </a>
  );
}
