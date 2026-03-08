# Changelog

Historial de cambios relevantes al design system.

## 2026-03-07 — Migracion app1.css + Mejoras

### Migracion SCSS
- Migrados ~3889 lineas de `app1.css` a 31 parciales SCSS en `scss/fmcamps/`
- Reduccion de app1.css residual a ~242 lineas (solo reglas app-specific)
- Organizacion por dominio: base, components, branding, third-party, layout, app, theme

### Migracion dart-sass
- Reemplazado `node-sass` por `sass` (dart-sass) en el pipeline CSS
- Eliminada restriccion de Node 18 LTS — ahora compatible con cualquier version
- Simplificadas 3 interpolaciones de CSS vars en `_datatables.scss`

### Limpieza vendor prefixes
- Eliminados 20 vendor prefixes manuales redundantes (autoprefixer los reintroduce)
- Archivos afectados: `_gradients`, `_dark-theme`, `_dropdowns`, `_daterangepicker`, `_modals`

### Limpieza !important
- Removidos 3 `!important` innecesarios (`.accept-button` font-size/border-radius, `.h6` font-weight)
- Identificados ~15 quick wins adicionales pendientes de testing visual
