import { LINK_SOFIA } from "@/lib/site";
import { WhatsAppGlyph } from "./SofiaCta";

// CTA flotante en móvil: siempre a un toque de Sofía
export default function MobileWhatsApp() {
  return (
    <a
      href={LINK_SOFIA}
      target="_blank"
      rel="noopener"
      aria-label="Habla con Sofía por WhatsApp"
      className="fixed bottom-5 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-on-accent shadow-[0_0_26px_rgba(37,211,102,0.5)] t-premium active:scale-95 md:hidden"
    >
      <WhatsAppGlyph size={26} />
    </a>
  );
}
