"use client";

import { LINK_SOFIA } from "@/lib/site";
import { useGoldFoil } from "@/lib/useGoldFoil";
import { WhatsAppGlyph } from "./SofiaCta";

// CTA flotante en móvil: siempre a un toque de Sofía
export default function MobileWhatsApp() {
  const foil = useGoldFoil();
  return (
    <a
      href={LINK_SOFIA}
      target="_blank"
      rel="noopener"
      style={foil}
      aria-label="Habla con Sofía por WhatsApp"
      className="btn-gold-green fixed bottom-5 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full text-on-accent t-premium active:scale-95 md:hidden"
    >
      <WhatsAppGlyph size={26} />
    </a>
  );
}
