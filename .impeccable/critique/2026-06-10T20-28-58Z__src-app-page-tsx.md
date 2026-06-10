---
target: landing completa (src/app/page.tsx)
total_score: 27
p0_count: 0
p1_count: 2
timestamp: 2026-06-10T20-28-58Z
slug: src-app-page-tsx
---
# Critique — Landing Alejandro Hernández (src/app/page.tsx)

## Design Health Score: 27/40 (Acceptable→Good)

| # | Heurística | Score | Issue clave |
|---|---|---|---|
| 1 | Visibilidad de estado | 2 | CTAs no avisan que abren WhatsApp |
| 2 | Sistema–mundo real | 4 | Copy colombiano excelente; "embudo" y "CRM" son jerga |
| 3 | Control y libertad | 2 | Sin nav móvil; 8.800px sin CTA fijo ni atajos |
| 4 | Consistencia | 2 | 4 labels distintos de CTA para la misma acción |
| 5 | Prevención de errores | 3 | wa.me prellenado alineado al router del bot |
| 6 | Reconocimiento | 3 | Anchors ok desktop; móvil pierde el mapa |
| 7 | Flexibilidad | 3 | Doble camino en hero; desierto de CTAs en Problem (~3.000px) |
| 8 | Estética minimalista | 3 | Sobrio; Results denso, banda vacía Servicios→Proceso |
| 9 | Recuperación de errores | 2 | Hydration mismatch del script html.js |
| 10 | Ayuda | 3 | FAQ buena; sin ancla de precio (decisión de negocio: no publicar) |

## Anti-patterns: detector 0 hallazgos (verificado con control positivo). LLM: residuos de plantilla = iconos lineales en cuadritos accent/15, titular bicolor x7 secciones, cero imágenes/rostro.

## Evidencia técnica (B)
- Contraste: 0 fallos (mínimo real 6.12:1). Overflow móvil: 0. Touch <24px: 0. Consola: 0 errores. Peso: ~242KB total, ~146KB JS. Headings sin saltos. 0 elementos sin nombre accesible.
- Incidente operacional: `next build` recompilado con `next start` corriendo → chunks 500. Reiniciar server tras cada build.

## Priority Issues
- [P1] Cero prueba social verificable (casos anónimos, sin rostro, sin nombres) — la sección Results es el valle emocional justo donde debe construir confianza.
- [P1] Sin política de privacidad/Habeas Data (tráfico de Meta Ads, Ley 1581).
- [P2] Identidad WhatsApp invisible en CTAs (flecha genérica, sin glifo ni microcopy).
- [P2] Sin og:image (los links compartidos por WhatsApp salen pelados).
- [P2] Móvil: único CTA persistente arriba-derecha (zona anti-pulgar); desierto de CTAs en Problem.
- [P3] Hydration mismatch (script html.js); jerga "embudo"/"CRM"; .text-gradient nombre mentiroso; nav bg/95 transparenta titulares al scrollear; falta scroll-padding-top.

## Personas
- Jordan: "embudo", "CRM en tiempo real", duda si los 4 CTAs van a sitios distintos.
- Casey: CTA solo arriba-derecha; 3.000px sin acción; titulares transparentándose bajo el nav.
- Doña Marta (spa, Cali): sin precio ancla (decisión consciente del negocio), su sector citado sin nombre real, no hay con quién: ni foto, ni número visible.

## Preguntas
1. Si la marca es una persona, ¿por qué la página la esconde?
2. ¿Por qué la única evidencia del producto es una conversación inventada?
3. ¿"Embudo" es para la dueña del spa o para otros marketers?
