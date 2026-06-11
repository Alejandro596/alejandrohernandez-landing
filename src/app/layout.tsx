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
  title: "Alejandro Hernández — Sistemas de ventas que no duermen",
  description:
    "Tus ventas no pueden cerrar a las 5 PM. Instalamos un sistema de IA que atiende, vende y agenda por WhatsApp las 24 horas, y te muestra cada conversación en tu CRM. Habla con Sofía y mira la demo en vivo.",
  keywords: [
    "agentes de IA",
    "bot de WhatsApp",
    "desarrollo web",
    "e-commerce",
    "automatización",
    "Colombia",
  ],
  openGraph: {
    title: "Alejandro Hernández — Tus ventas no pueden seguir cerrando a las 5 PM",
    description:
      "Un sistema que atiende, vende y agenda por WhatsApp las 24 horas. Habla con Sofía: demo en vivo.",
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
    <html lang="es" className={`${archivo.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Marca el arranque de JS antes del primer paint: sin JS nada queda oculto */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
