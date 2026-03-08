# Changelog

Historial de cambios relevantes al design system.

## 2026-03-08 — Fase 0 Tailwind CSS v4 (Paso 0a: coexistencia)

### Instalacion y configuracion

- Instalado Tailwind CSS v4.2.1 + `@tailwindcss/vite` v4.2.1 en `site/`
- Configuracion: `@import "tailwindcss" prefix(tw)` con `@theme { --spacing: 0.25rem; }`
- Plugin Vite integrado en `site/astro.config.mjs`
- Importado en `site/src/layouts/Base.astro` (coexiste con `fmcamps.css`)

### Migracion additive-first (tw:* junto a BS4)

- 12 paginas + 4 componentes Astro con clases `tw:*` agregadas junto a BS4
- Utilities migradas: spacing (mb-3→tw:mb-4, p-3→tw:p-4), display (d-flex→tw:flex), text (text-center→tw:text-center), sizing (h-100→tw:h-full), position, border, margin-auto
- Clases de componente BS4 preservadas: btn-*, card-*, table-*, alert-*, modal-*, nav-*, badge-*, form-control, row/col-*
- Mapping completo documentado en `docs/refactoring/tailwind-class-mapping.md`

### Archivos de referencia creados

- `site/src/styles/tailwind.css` — entry point Tailwind con prefix
- `site/src/styles/fmcamps-custom.css` — design tokens + clases custom extraidas (referencia para Fase B, no importado aun)

### Bug fix durante quality review

- `tokens.astro:64-65`: referencia a `var(--dark-color)` (eliminado en M-5) corregida a `var(--text-dark-mode)`

### Correccion del PRD (v1.1 → v1.2)

- §4.13 Spacing: corregida tabla — BS4 niveles 3/4/5 NO son 1:1 con Tailwind (escala no-lineal vs lineal). `mb-3→tw:mb-4`, `mb-4→tw:mb-6`, `mb-5→tw:mb-12`
- §11.3 Matriz: spacing reclasificado de "Trivial (1:1)" a "Baja (no-lineal)"
- §14.1 Gate: dividido en 14.1a (coexistencia ✅) y 14.1b (Tailwind-only, pendiente)
- Agregada §15 "Lecciones Aprendidas — Fase 0" con 6 hallazgos

### Verificacion

- 48/48 visual regression tests pasan (0 diferencias visuales)
- Baselines actualizadas con `npm run test-visual-update`

---

## 2026-03-08 — Code review findings (7 bugs SCSS)

### Correccion de hallazgos

- Corregidos 7 bugs encontrados durante sincronizacion CSS a SaaSMono
- 3 HIGH: selector imposible tr>tr, var(--dark-color) mal usado en Select2 disabled, gradiente modal sin dark
- 3 MEDIUM: btn-orange dead code, *:hover scrollbar, light-dark(white,white) redundante
- 1 LOW: 5 reglas @viewport deprecated eliminadas
- Verificado con 48 visual regression tests (0 regresiones)
- Documentacion alineada con estrategia Tailwind CSS (7 docs actualizados)

---

## 2026-03-08 — Consolidacion fallbacks light-dark()

### Auditoria y correccion

- Auditadas 89 instancias de `light-dark()` en 20 archivos SCSS
- Agregados 64 fallbacks estaticos faltantes (valor light antes de cada `light-dark()`)
- Corregidos 2 bugs de sintaxis: `_typography.scss` (coma faltante), `_dropdowns.scss` (argumento vacio)
- Archivos modificados: 15 parciales SCSS
- Verificado con 48 visual regression tests: 0 regresiones

### Actualizacion .browserslistrc

- Removido IE 10/11 del browserslist (CSS custom properties no soportadas en IE)
- Nuevo minimo: Chrome 60+, Firefox 60+, Edge 79+, Safari 12+
- Decision documentada en `docs/technical-debt/light-dark-fallbacks.md`

---

## 2026-03-08 — Limpieza !important (ronda 3)

### Remocion con testing visual (Playwright)

- Removidos 9 `!important` en 3 archivos: `_buttons` (3), `_tables` (5), `_list-group` (1)
- Verificado con 48 visual regression tests (12 paginas x desktop/mobile x light/dark)
- Resultado: 0 regresiones visuales
- Total removidos en 3 rondas: 36 (3 + 24 + 9)
- Total restante: 71 instancias, todas justificadas (37 third-party, 10 dark-theme, 9 layout, 6 utilities, 7 specificity, 2 dynamic)

### Font Awesome en kitchen sink

- Agregados archivos de fuente Font Awesome 4.7.0 a `site/public/fonts/`
- Resuelto: iconos FA ahora renderizan correctamente en todas las paginas
- Actualizados 10 baselines de visual regression (buttons, dark-theme, feedback)

---

## 2026-03-08 — Limpieza !important (ronda 2)

### Remocion automatizada con Playwright

- Removidos 24 `!important` innecesarios en 8 archivos
- Archivos: `_buttons`, `_btn-extended`, `_alerts`, `_navtabs`, `_typography`, `_links`, `_dropdowns`, `_body`
- Testing visual antes/despues via Playwright MCP en kitchen sink Astro
- Resultado: 0 regresiones visuales detectadas (pixel-perfect)

---

## 2026-03-07 — Kitchen Sink Astro

### Migracion Hugo → Astro

- Eliminado sitio Hugo heredado (333 archivos: layouts, content, data, assets)
- Eliminadas dependencias `hugo-bin` y `vnu-jar` del package.json
- Creado sitio Astro v5 en `site/` como playground visual zero-JS del design system
- 12 paginas: tokens, buttons, forms, tables, cards, modals, alerts, navigation, feedback, media, dark-theme, home
- Componentes reutilizables: Base.astro (layout), Section.astro, ThemeToggle.astro, CodeExample.astro
- CSS pre-compilado cargado via `<link>` desde `site/public/css/`
- Comandos: `npm run site-dev` (puerto 4321), `npm run site-build`, `npm run site-preview`
- PRD completo en `docs/refactoring/PRD-astro-kitchen-sink.md`

---

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
