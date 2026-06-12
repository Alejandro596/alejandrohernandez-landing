export const SITE = {
  name: "Alejandro Hernández",
  tagline: "Sistemas de ventas que no duermen",
  email: "skymentmarketingdigital@gmail.com",
  whatsappNumber: "573015355027",
} as const;

// Meta Pixel (Administrador de eventos -> Orígenes de datos -> ID del píxel).
// Vacío = el pixel no carga. Pegar el ID aquí y redesplegar.
export const META_PIXEL_ID = "1328657068988798";

// Verificación de dominio de Meta (Business Manager -> Seguridad de la marca
// -> Dominios -> alejandroohernandez.com -> verificación por metaetiqueta).
export const META_DOMAIN_VERIFICATION = "uu4nvcqqe679bey4rib19cy7hgnux1";

// CTA único de toda la página: el chat de Sofía (agente IA en WhatsApp).
// El texto prellenado cae en la línea "ia" del router del bot de n8n → Sofía.
export const LINK_SOFIA = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
  "Hola Sofía, quiero ver la demo"
)}`;

// Franja de stats del hero (estilo josehuila: valor en oro verde + label).
// VACÍO = no se muestra. Poner SOLO números reales del negocio.
export const HERO_STATS: { value: string; label: string }[] = [];
