"use client";

import { useEffect } from "react";
import { META_PIXEL_ID } from "@/lib/site";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

// Meta Pixel: PageView al cargar + evento Lead en cada clic hacia el chat de
// Sofía (wa.me). Con esto las campañas de Meta optimizan hacia la gente que
// de verdad escribe. No renderiza nada y no hace nada si falta el ID.
export default function MetaPixel() {
  useEffect(() => {
    if (!META_PIXEL_ID || window.fbq) return;

    // bootstrap oficial de fbevents
    const fbq: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      push?: unknown;
      loaded?: boolean;
      version?: string;
    } = function (...args: unknown[]) {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue!.push(args);
      }
    };
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = fbq;

    const s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);

    window.fbq("init", META_PIXEL_ID);
    window.fbq("track", "PageView");

    // Lead: cualquier clic que abra el WhatsApp de Sofía
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a[href*='wa.me']");
      if (a) window.fbq?.("track", "Lead");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
