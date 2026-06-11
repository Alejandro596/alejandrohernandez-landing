# Design

## Theme

Dark-tech de pauta (rediseño 2026-06-11, referencias test1-4.png del usuario): fondo casi
negro con tinte verde, verde neón protagonista, glow en textos clave. Comunica "sistema
serio que convierte" con la misma estética de las piezas de publicidad de Meta Ads.
Codificación narrativa: ROJO = el problema / lo malo · VERDE = la solución / lo bueno
(igual que la animación del avión).

## Color Palette

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#000000` | Fondo de página (negro puro, como la pauta) |
| `--bg-raised` | `#0c130d` | Bandas de sección alternas |
| `--surface` | `#0e150f` | Tarjetas |
| `--ink` | `#f2f7f2` | Texto principal (blanco) |
| `--ink-muted` | `#a3b8a6` | Texto secundario |
| `--accent` | `#6ec817` | Verde LIMA de la pauta: CTAs (gradiente #9bec33→#52b50d) |
| `--accent-bright` | `#8ce427` | Verde neón: glow, hovers |
| `--accent-deep` | `#48a808` | Verde luminoso para texto sobre fondos oscuros |
| `--on-accent` | `#06301a` | Texto sobre verde (nunca blanco) |
| `--bad` | `#e81000` (bright #ff2d12) | Rojo del problema: stats, columna del bot genérico |
| `--hairline` | `rgba(141,235,170,0.16)` | Bordes (verdosos) |

## Typography

- **Archivo única familia** (variable `--font-archivo`), titulares `.display` con font-stretch 115%.
- Palabras clave de titulares: `.glow-green` (verde neón + text-shadow doble capa) o
  `.glow-red` para el dolor. El glow ES parte del sistema (pedido explícito del usuario,
  reemplaza al viejo veto de efectos).

## Components

- **CTA único** (`SofiaCta`): pill verde con glow exterior verde + lift al hover; glifo de
  WhatsApp anidado. SIEMPRE a `LINK_SOFIA`.
- **Tarjetas** (`.card`): superficie #0e150f, borde hairline verdoso, sombra negra profunda.
- **Mockup CRM** (`HowItWorks`): ventana dark; chat de WhatsApp en DARK MODE (burbujas
  #1d2a20 recibidas / #005c4b enviadas, texto blanco).
- **Comparación**: panel malo con borde `--bad`/25 y cruces rojas; panel bueno con borde
  accent + aura de glow verde.
- **Nav**: barra dark sticky (bg/95) con hairline; botón verde con glow.
- **Auras**: `.ambient-green` (radiales suaves de verde) en Hero y CTA final.

## Motion

- Lenis + GSAP reveals (expo.out); chat del mockup burbuja a burbuja ([data-chat]).
- Sección del avión: ver memoria/PlaneLoop (curva 3D, destrucción por contacto, glow en
  frases buenas y cierre).
- `prefers-reduced-motion`: todo visible, sin Lenis.

## Estructura (brief 2026-06-10)

Avión (bucle) → Hero (+VSL) → Problema (rojo) → Solución → Cómo funciona (mockup) →
Comparación → CTA final → Footer mínimo.

## Anti-patterns prohibidos

Formularios, segundo camino de agendamiento, emojis fuera del chat simulado, stock de
robots, eyebrows por sección, white-on-green en CTAs. (El glow y las auras verdes están
PERMITIDOS desde el rediseño 2026-06-11 — son el lenguaje de la pauta.)
