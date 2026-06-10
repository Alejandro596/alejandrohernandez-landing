# Skyment Landing

Landing page comercial de **Skyment** (agentes de IA en WhatsApp, desarrollo web y e-commerce), orientada a captar clientes de alto valor y cerrarlos vía demo agendada por WhatsApp.

## Stack

- **Next.js 16** (App Router, 100% estático — listo para Vercel)
- **Tailwind CSS v4**
- **GSAP + ScrollTrigger** (reveals, contadores, parallax) + **Lenis** (scroll suave)
- Tipografías: Space Grotesk (display) + Plus Jakarta Sans (texto)

## Desarrollo

```bash
npm run dev    # http://localhost:3000
npm run build  # build de producción
```

## Estructura

- `src/lib/site.ts` — **datos de contacto y links de WhatsApp**. Los textos prellenados coinciden con las frases que el router del bot de n8n reconoce (`ia` / `web` / tienda online), así cada CTA cae en el agente correcto.
- `src/components/` — una sección por archivo (Hero, Problem, Services, Process, Results, Faq, FinalCta…).
- `src/components/Effects.tsx` — toda la animación (Lenis + GSAP). Respeta `prefers-reduced-motion` y la página es 100% visible sin JavaScript.

## Cosas editables a futuro

- Métricas de la sección Resultados (`Results.tsx`): hoy usa cifras conservadoras editables.
- `metadataBase` en `layout.tsx`: cambiar cuando exista el dominio definitivo.
- Agregar OG image (`opengraph-image.png` en `src/app/`).
