import type Lenis from "lenis";

// Punto de encuentro entre Effects (dueño de Lenis) y el intro (que pausa el scroll)
export const scrollState: { lenis: Lenis | null } = { lenis: null };
