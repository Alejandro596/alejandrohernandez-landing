# Design

## Theme

Claro, blanco, premium pero simple. Una sola idea por sección. Comunica "sistema serio que convierte", no showcase de diseño. El verde WhatsApp es el único color.

## Color Palette

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#ffffff` | Fondo de página |
| `--bg-raised` | `#f4f8f5` | Bandas de sección alternas |
| `--ink` | `#10160f` | Texto principal |
| `--ink-muted` | `#5c6b5e` | Texto secundario |
| `--accent` | `#25d366` | Verde WhatsApp: CTAs, acentos |
| `--accent-deep` | `#128c54` | Palabras clave en titulares (contraste AA sobre blanco) |
| `--on-accent` | `#06301a` | Texto sobre verde (nunca blanco: contraste) |
| `--hairline` | `rgba(13,26,16,0.1)` | Bordes |

## Typography

- **Archivo única familia** (variable `--font-archivo`), titulares `.display` con font-stretch 115%.
- Jerarquía por tamaño/peso. Sin texto degradado.

## Components

- **CTA único** (`SofiaCta`): pill verde WhatsApp con glifo de WhatsApp anidado; SIEMPRE el mismo destino `LINK_SOFIA` (chat de Sofía). No existen otros CTAs ni formularios.
- **Tarjetas** (`.card`): blanco, borde hairline, sombra suave, radio 1.25rem.
- **Mockup CRM** (`HowItWorks`): construido en CSS (pipeline + chat WhatsApp de Sofía). Reemplazable por captura real — marcador {MOCKUP_CRM}.
- **VSL**: placeholder en Hero — marcador {EMBED_VSL}, cargar muteado y lazy cuando exista.
- **Nav**: barra sticky blanca, nombre + botón "Habla con Sofía". Botón flotante de WhatsApp en móvil.

## Motion

- Lenis (scroll suave) + GSAP fades sutiles al entrar (opacity + 24px). Nada más pesado: ni 3D, ni parallax, ni blur.
- `prefers-reduced-motion`: todo visible, sin Lenis.

## Estructura (brief 2026-06-10)

Hero (+VSL) → Problema (3 stats) → Solución (3 bloques) → Cómo funciona (mockup + 3 pasos) → Comparación bot $30 vs sistema → CTA final → Footer mínimo.

## Anti-patterns prohibidos

Formularios, segundo camino de agendamiento, emojis por todos lados, imágenes stock de robots/call-center, degradados ruidosos, orbes, glassmorphism, eyebrows por sección, white-on-green (contraste).
