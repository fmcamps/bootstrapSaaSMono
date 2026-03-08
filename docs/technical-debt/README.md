# Technical Debt & Aspiraciones

Registro de deuda tecnica conocida y mejoras aspiracionales para el design system.

## Deuda tecnica activa

### `!important` excesivos

- **Estado:** 36 removidos (3 en ronda 1 + 24 en ronda 2 + 9 en ronda 3 con testing visual via Playwright)
- **Pendiente:** 71 instancias restantes en 13 archivos
- **Justificados (third-party):** 37 en DataTables (15), Select2 (18), DateRangePicker (4)
- **Justificados (dark theme):** 10 en `_dark-theme.scss` (overrides de light mode)
- **Justificados (layout):** 9 en `_body.scss` (3), `_responsive.scss` (6)
- **Utilities (patron Bootstrap):** 6 en `_utilities.scss`
- **Justificados (specificity):** 7 en forms (3, override :focus), cards (1, override :last-child), toasts (2, override badge variants), toast container (1, override inline JS)
- **Ronda 3 removidos:** 9 en buttons (3), tables (5), list-group (1) — verificado con 48 visual tests

### Bootstrap 4.6.2 `@import` deprecation

- dart-sass marca `@import` como deprecated (371 warnings)
- Migrar a `@use`/`@forward` requiere refactorizar Bootstrap 4 entero
- **Accion:** Ignorar hasta migrar a Bootstrap 5+

### Font Awesome 4.7.0 `slash-div` deprecation

- Usa `/` para division (deprecated en dart-sass 2.0)
- **Accion:** Migrar a Font Awesome 6 o reemplazar con iconos custom

### Deprecaciones de `lighten()`/`darken()` en Bootstrap

- dart-sass recomienda `color.scale()` / `color.adjust()`
- **Accion:** Ignorar — son de Bootstrap core, no de nuestros parciales

## Aspiraciones

### Corto plazo

- [x] ~~Completar remocion de `!important` con testing visual~~ — 36 removidos en 3 rondas, 71 restantes (todos justificados)
- [x] ~~Actualizar browserslist~~ — `caniuse-lite` ya en version mas reciente (1.0.30001777)
- [x] ~~Documentar cada componente~~ — cubierto por el kitchen sink Astro en `site/`

### Mediano plazo

- [ ] Migrar Font Awesome 4.7.0 a Font Awesome 6 (o a iconos SVG)
- [ ] Consolidar fallbacks light-dark: eliminar fallbacks estaticos cuando browsers legacy dejen de ser necesarios
- [x] ~~Crear visual regression tests~~ — 48 baselines (12 paginas x desktop/mobile x light/dark) con Playwright + slash command `/test-visual` para inspeccion MCP

### Largo plazo

- [ ] Evaluar migracion a Bootstrap 5 (elimina jQuery, usa `@use`, CSS custom properties nativo)
- [ ] Design tokens en formato estandar (Style Dictionary / W3C design tokens)
- [x] ~~Storybook o catalogo visual de componentes~~ — reemplazado por kitchen sink Astro en `site/`
