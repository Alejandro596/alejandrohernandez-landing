"use client";

import { useEffect, useState } from "react";

// La hora REAL del visitante, clavada en la sección del CRM: vuelve personal
// el "¿quién está respondiendo tus mensajes ahora mismo?". Solo renderiza
// después de montar (la hora del servidor no es la del visitante).
export default function LiveClock() {
  const [hora, setHora] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setHora(
        new Date().toLocaleTimeString("es-CO", { hour: "numeric", minute: "2-digit" })
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!hora) return null;

  return (
    <p className="mt-8 text-center text-base text-ink-muted md:text-lg">
      Ahora mismo son las <span className="display font-semibold text-ink">{hora}</span> —
      ¿quién está respondiendo tus mensajes?
    </p>
  );
}
