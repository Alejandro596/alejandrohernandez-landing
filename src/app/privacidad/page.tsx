import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad — Alejandro Hernández",
  description:
    "Política de tratamiento de datos personales de Alejandro Hernández (Ley 1581 de 2012, Colombia).",
  robots: { index: false },
};

export default function Privacidad() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-20">
      <a href="/" className="text-sm text-accent hover:text-accent-bright">
        ← Volver al inicio
      </a>
      <h1 className="display mt-6 text-3xl font-semibold md:text-4xl">
        Política de privacidad
      </h1>
      <div className="mt-8 flex flex-col gap-5 text-sm leading-relaxed text-ink-muted">
        <p>
          En cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013 (régimen de
          protección de datos personales en Colombia), Alejandro Hernández informa cómo
          trata los datos personales de quienes se comunican a través de este sitio.
        </p>
        <h2 className="display text-lg font-semibold text-ink">Qué datos recogemos</h2>
        <p>
          Este sitio no tiene formularios ni instala rastreadores propios. Cuando decides
          escribirnos, la conversación ocurre en WhatsApp: recibimos tu número, tu nombre
          de perfil y los datos que tú mismo nos compartas (por ejemplo, el nombre de tu
          negocio o tu correo para agendar una reunión).
        </p>
        <h2 className="display text-lg font-semibold text-ink">Para qué los usamos</h2>
        <p>
          Para responder tu solicitud, agendar y recordarte la demo, enviarte la propuesta
          que pidas y hacer seguimiento comercial de tu propio requerimiento. No vendemos
          ni compartimos tus datos con terceros ajenos a la operación del servicio.
        </p>
        <h2 className="display text-lg font-semibold text-ink">Tus derechos</h2>
        <p>
          Puedes conocer, actualizar, rectificar o solicitar la eliminación de tus datos
          en cualquier momento escribiendo a{" "}
          <a href={`mailto:${SITE.email}`} className="text-accent hover:text-accent-bright">
            {SITE.email}
          </a>{" "}
          o por el mismo WhatsApp. Atenderemos tu solicitud en los plazos que establece la
          ley.
        </p>
        <p className="text-xs text-ink-muted/80">
          Responsable del tratamiento: Alejandro Hernández · Colombia ·{" "}
          {SITE.email}. Última actualización: junio de 2026.
        </p>
      </div>
    </main>
  );
}
