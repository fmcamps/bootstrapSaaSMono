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
- **Accion:** Ignorar — migrar a `@use`/`@forward` solo si se mantiene SCSS post-Tailwind

### Font Awesome 4.7.0 `slash-div` deprecation

- Usa `/` para division (deprecated en dart-sass 2.0)
- **Accion:** Reemplazar con iconos SVG (Heroicons/Lucide) al migrar a Tailwind

### Deprecaciones de `lighten()`/`darken()` en Bootstrap

- dart-sass recomienda `color.scale()` / `color.adjust()`
- **Accion:** Ignorar — son de Bootstrap core, no de nuestros parciales

### Hallazgos de code review SaaSMono (2026-03-08)

Encontrados durante la sincronizacion CSS a SaaSMono. Verificados contra SCSS fuente.

#### HIGH — ~~resueltos (2026-03-08)~~

| ID  | Archivo                     | Hallazgo                                                                                                                    | Fix aplicado                                                  |
| --- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| H-1 | `_tables.scss:57`           | `tr.text-warning > tr` — selector imposible (un `<tr>` no es hijo de otro `<tr>`)                                           | ~~Cambiado a `tr.text-warning > td`~~                         |
| H-2 | `_select2.scss:227,325,799` | `background-color: var(--dark-color)` en Select2 disabled. `--dark-color` es `#eee` (texto dark mode), no un color de fondo | ~~`light-dark(#e9ecef, #2d3238)` con fallback (3 ocurrencias)~~ |
| H-3 | `_modals.scss:36`           | `.modal-body` gradiente hardcodeado blanco `linear-gradient(#FFF, #e9e5e5)` sin variante dark                               | ~~`light-dark()` en gradiente con fallback~~                  |

#### MEDIUM — 3/4 resueltos, 1 diferido

| ID  | Archivo                                      | Hallazgo                                                       | Fix aplicado                                          |
| --- | -------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------- |
| M-1 | `_buttons.scss:41` + `_btn-extended.scss:10` | `.btn-orange` definido en 2 archivos — el primero es dead code | ~~Dead code eliminado de `_buttons.scss`~~            |
| M-2 | `_forms.scss:131`                            | `textarea { overflow-y: hidden; resize: none }` global         | **Diferido** — requiere coordinar con SaaSMono        |
| M-3 | `_scrollbars.scss:28`                        | `*:hover` scrollbar — selector universal en hover              | ~~Eliminado; webkit `:hover` pseudo cubre el caso~~   |
| M-4 | `_dropdowns.scss:18`                         | `light-dark(white, white)` — valores identicos                 | ~~Simplificado a `color: white`~~                     |
| M-5 | `_variables.scss:10`                         | `--dark-color: #eee` — nombre semanticamente confuso           | Pendiente — considerar rename futuro a `--text-dark-mode` |

#### LOW — 1/3 resuelto, 2 third-party sin accion

| ID  | Archivo                 | Hallazgo                                                                               | Estado                    |
| --- | ----------------------- | -------------------------------------------------------------------------------------- | ------------------------- |
| L-1 | `_responsive.scss:3-21` | 5 reglas `@viewport` deprecated (eliminadas de todos los browsers)                     | ~~Eliminadas~~            |
| L-2 | Select2 partials        | ~15 declaraciones IE legacy (`progid:DXImageTransform`, `filter: alpha`, `-ms-filter`) | Third-party — sin accion  |
| L-3 | Font Awesome            | `:-moz-focusring` (FF 87+ removed), `-ms-overflow-style`                               | Third-party — sin accion  |

## Aspiraciones

### Corto plazo

- [x] ~~Completar remocion de `!important` con testing visual~~ — 36 removidos en 3 rondas, 71 restantes (todos justificados)
- [x] ~~Actualizar browserslist~~ — `caniuse-lite` ya en version mas reciente (1.0.30001777)
- [x] ~~Documentar cada componente~~ — cubierto por el kitchen sink Astro en `site/`
- [x] ~~Migrar node-sass a dart-sass~~ — pipeline usa `sass` (dart-sass) nativo

### Mediano plazo

- [ ] Migrar Font Awesome 4.7.0 a iconos SVG (Heroicons/Lucide) — FA6 descartado, alinear con ecosistema Tailwind
- [x] ~~Consolidar fallbacks light-dark~~ — 64 fallbacks agregados, 2 bugs de sintaxis corregidos, IE removido de browserslist. Ver [light-dark-fallbacks.md](light-dark-fallbacks.md)
- [x] ~~Crear visual regression tests~~ — 48 baselines (12 paginas x desktop/mobile x light/dark) con Playwright + slash command `/test-visual` para inspeccion MCP

### Largo plazo

- [ ] Alinear con estrategia CSS de SaaSMono (PRD Frontend Stack Modernization §O3): SaaSMono migra BS4 → **Tailwind CSS** (no BS5). bootstrapSaaSMono evoluciona hacia design tokens puros + custom properties CSS nativos. BS5 descartado como destino — invertir en `light-dark()`, variables y partials FMC que sobrevivan la transicion a Tailwind
- [ ] Design tokens en formato estandar (Style Dictionary / W3C design tokens) — puente hacia `tailwind.config.js` theme. Ver [design-tokens.md](design-tokens.md)
- [x] ~~Storybook o catalogo visual de componentes~~ — reemplazado por kitchen sink Astro en `site/`
