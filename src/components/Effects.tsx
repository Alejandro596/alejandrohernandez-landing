"use client";

import { useEffect } from "react";

// Reveals con IntersectionObserver + transiciones CSS. Cero librerías.
export default function Effects() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal], [data-reveal-group]");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("rv-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("rv-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
