# Technical Debt & Aspiraciones

Registro de deuda tecnica conocida y mejoras aspiracionales para el design system.

## Deuda tecnica activa

### `!important` excesivos

- **Estado:** Parcialmente mitigado (3 removidos en marzo 2026)
- **Pendiente:** ~108 instancias restantes en 19 archivos
- **Quick wins:** ~15-16 removibles sin riesgo en buttons, navbar, forms, cards, modals, typography
- **Requiere testing:** ~20-25 en tables, alerts, pagination
- **Justificados:** ~40-50 en DataTables, Select2, DateRangePicker (overrides de plugins)
- Ver [important-audit.md](important-audit.md) para detalle por archivo

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

- [ ] Completar remocion de `!important` con testing visual (quick wins restantes)
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
