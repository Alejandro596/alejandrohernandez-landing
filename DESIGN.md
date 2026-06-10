# Design

## Theme

Oscuro grafito con tinte verde. No es negro OLED ni modo oscuro genérico: es la versión digital del negro de las piezas publicitarias de Skyment, aclarado para que las superficies tengan cuerpo. Una sola fuente de luz: el verde de marca.

## Color Palette

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#272e1e` | Fondo de página (oliva grafito claro) |
| `--bg-raised` | `#2e3624` | Bandas de sección |
| `--surface` | `#333c28` | Tarjetas y paneles |
| `--ink` | `#f4f7ee` | Texto principal |
| `--ink-muted` | `#b6c0ab` | Texto secundario |
| `--accent` | `#8bc921` | Verde de marca: CTAs, palabras clave, avión |
| `--accent-bright` | `#a8e63d` | Hover de CTAs, detalles |
| `--accent-deep` | `#5d8e13` | Pliegues del avión, sombras de acento |
| `--hairline` | `rgba(255,255,255,0.1)` | Bordes |

Texto sobre verde: siempre `#0c1503` (oscuro), nunca blanco. El verde acentúa; no tapiza secciones enteras.

## Typography

- **Display**: Space Grotesk (variable `--font-space-grotesk`), tracking -0.03em, pesos 500-700. Titulares grandes, wordmark SKYMENT.
- **Texto**: Plus Jakarta Sans (variable `--font-jakarta`), pesos 400-600.
- Jerarquía por tamaño y peso, no por color ni efectos. Sin texto degradado (prohibido).

## Components

- **CTA primario** (`WhatsAppCta`): pill verde sólido, texto oscuro semibold, icono de flecha en círculo `bg-black/15` anidado a la derecha. Sin glow ni sombras de color.
- **Tarjetas** (`.bezel`): panel plano `--surface`, borde 1px `--hairline`, radio 1.25rem. Sin doble bisel, sin glassmorphism, sin nesting.
- **Avión de papel** (`PlaneMark`): SVG de marca con estela de guiones; aparece en nav, footer, favicon y preloader. Es el único elemento "ilustrado" del sitio.
- **Preloader**: cortina `--bg`, avión despega hacia arriba-derecha, sincronizado con la entrada del hero vía `PRELOADER_MS`.
- **Nav**: pill flotante con `backdrop-blur` (único uso permitido de blur), separada del borde superior.

## Motion

- GSAP + ScrollTrigger + Lenis. Reveals: fade + subida de 28px, `power3.out`, una vez. Sin blur en las entradas.
- Contadores animados solo en métricas reales.
- `prefers-reduced-motion`: todo visible de inmediato, preloader se desvanece.
- Easing global: `cubic-bezier(0.32, 0.72, 0, 1)` en hovers.

## Layout

- Contenedor `max-w-6xl`, secciones `py-28 md:py-36`.
- Grillas asimétricas donde aporte (servicios); romper la monotonía de tarjetas idénticas.
- Mobile-first colapsa a una columna con `px-4`; hero usa `min-h-[100dvh]`.

## Anti-patterns (prohibidos en este proyecto)

Orbes de neón, glassmorphism decorativo, texto degradado, eyebrow uppercase sobre cada sección, marcadores 01/02/03 como relleno, grillas de tarjetas clonadas, glow en botones, reveals con blur, sombras de color.
