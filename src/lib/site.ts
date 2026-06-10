export const SITE = {
  name: "Skyment",
  tagline: "Agentes de IA, desarrollo web y e-commerce",
  email: "skymentmarketingdigital@gmail.com",
  whatsappNumber: "573244536348",
} as const;

// Los textos prellenados coinciden con las frases que el router del agente
// de WhatsApp reconoce para enrutar cada línea de negocio (ia | web).
export const WA = {
  demo: waLink("Hola, quiero agendar una demo con Skyment"),
  ia: waLink("Hola, quiero información sobre el bot de WhatsApp"),
  web: waLink("Hola, quiero información sobre páginas web"),
  ecommerce: waLink("Hola! Me interesa una tienda online"),
} as const;

function waLink(text: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
