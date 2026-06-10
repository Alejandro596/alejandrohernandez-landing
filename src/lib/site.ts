export const SITE = {
  name: "Alejandro Hernández",
  tagline: "Sistemas de ventas que no duermen",
  email: "skymentmarketingdigital@gmail.com",
  whatsappNumber: "573244536348",
} as const;

// CTA único de toda la página: el chat de Sofía (agente IA en WhatsApp).
// El texto prellenado cae en la línea "ia" del router del bot de n8n → Sofía.
export const LINK_SOFIA = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
  "Hola Sofía, quiero ver la demo"
)}`;
