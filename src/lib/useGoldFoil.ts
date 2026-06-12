"use client";

import { useEffect, useState } from "react";

// Cada botón genera SU propia lámina de oro verde al montar: ángulo de luz y
// tonos aleatorios dentro de la familia lima de la pauta. Se aplica después de
// la hidratación (estado inicial null) para no romper el SSR.
function randomFoil(): string {
  const r = (a: number, b: number) => a + Math.random() * (b - a);
  // mitad de las veces la luz entra por la derecha (270° ± 20) pa variar
  const base = Math.random() < 0.5 ? 90 : 270;
  const angle = Math.round(base + r(-20, 20));
  const hLight = Math.round(r(74, 90));
  const hMid = Math.round(r(86, 98));
  const hDeep = Math.round(r(94, 104));
  const stop1 = Math.round(r(22, 36));
  const stop2 = Math.round(r(58, 74));
  return `linear-gradient(${angle}deg,
    hsl(${hLight} 100% ${Math.round(r(76, 84))}%) 0%,
    hsl(${hMid} 86% ${Math.round(r(56, 64))}%) ${stop1}%,
    hsl(${hMid + 2} 84% 45%) ${stop2}%,
    hsl(${hDeep} 88% ${Math.round(r(29, 36))}%) 100%)`;
}

export function useGoldFoil(): React.CSSProperties | undefined {
  const [style, setStyle] = useState<React.CSSProperties | undefined>(undefined);
  useEffect(() => {
    setStyle({ backgroundImage: randomFoil() });
  }, []);
  return style;
}
