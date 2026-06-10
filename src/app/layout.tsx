import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

// Una sola familia con contraste por peso y anchura: voz sobria, sin monocultura de IA
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skyment-landing.vercel.app"),
  title: "Skyment — Agentes de IA, desarrollo web y e-commerce",
  description:
    "Instalamos el sistema que atiende, agenda y vende por ti: agentes de IA en WhatsApp, páginas web que convierten y tiendas online listas para escalar. Agenda una demo gratuita.",
  keywords: [
    "agentes de IA",
    "bot de WhatsApp",
    "desarrollo web",
    "e-commerce",
    "automatización",
    "Colombia",
  ],
  openGraph: {
    title: "Skyment — Tu negocio vendiendo en automático",
    description:
      "Agentes de IA en WhatsApp, páginas web y tiendas online que convierten conversaciones en clientes. Demo gratuita en vivo.",
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${archivo.variable} h-full antialiased`}>
      <head>
        {/* Marca el arranque de JS antes del primer paint: sin JS nada queda oculto */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="grain min-h-full flex flex-col">{children}</body>
    </html>
  );
}
