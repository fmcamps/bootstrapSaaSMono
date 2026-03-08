# Technical Debt & Aspiraciones

Registro de deuda tecnica conocida y mejoras aspiracionales para el design system.

## Deuda tecnica activa

### `!important` excesivos

- **Estado:** 27 removidos (3 en ronda 1 + 24 en ronda 2 con testing visual via Playwright)
- **Pendiente:** 80 instancias restantes en 13 archivos
- **Justificados (third-party):** 37 en DataTables (15), Select2 (18), DateRangePicker (4)
- **Justificados (dark theme):** 10 en `_dark-theme.scss` (overrides de light mode)
- **Justificados (layout):** 9 en `_body.scss` (3), `_responsive.scss` (6)
- **Utilities (patron Bootstrap):** 6 en `_utilities.scss`
- **Otros:** 18 en tables (6), toasts (4), forms (3), buttons (3), cards (1), list-group (1)

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

- [x] ~~Completar remocion de `!important` con testing visual~~ — 24 quick wins removidos, 80 restantes justificados
- [ ] Actualizar browserslist (`npx update-browserslist-db@latest`)
- [x] ~~Documentar cada componente~~ — cubierto por el kitchen sink Astro en `site/`

### Mediano plazo

- [ ] Migrar Font Awesome 4.7.0 a Font Awesome 6 (o a iconos SVG)
- [ ] Consolidar fallbacks light-dark: eliminar fallbacks estaticos cuando browsers legacy dejen de ser necesarios
- [ ] Crear visual regression tests (screenshots antes/despues de cambios)

### Largo plazo

- [ ] Evaluar migracion a Bootstrap 5 (elimina jQuery, usa `@use`, CSS custom properties nativo)
- [ ] Design tokens en formato estandar (Style Dictionary / W3C design tokens)
- [x] ~~Storybook o catalogo visual de componentes~~ — reemplazado por kitchen sink Astro en `site/`
