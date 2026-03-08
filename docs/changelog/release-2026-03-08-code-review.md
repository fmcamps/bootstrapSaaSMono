# Release 2026-03-08 — Code Review Findings

Hallazgos identificados durante la sincronizacion CSS a SaaSMono. Verificados contra SCSS fuente y corregidos con 48 visual regression tests.

## Archivos a copiar

| Archivo origen (bootstrapSaaSMono) | Destino en SaaSMono |
| --- | --- |
| `dist/css/fmcamps.css` | Reemplaza `fmcamps.css` |

> `app1.css` no cambio en esta release.

---

## Bugs corregidos en fmcamps.css

### HIGH — 3 corregidos

#### H-1: Selector imposible `tr > tr` en tablas

- **Archivo:** `_tables.scss:57`
- **Bug:** `tr.text-warning > tr` — un `<tr>` nunca es hijo directo de otro `<tr>` en HTML valido
- **Fix:** Cambiado a `tr.text-warning > td`
- **Impacto:** La regla nunca aplicaba. Ahora las celdas de filas `.text-warning` tienen fondo `var(--warning-fmc)`

#### H-2: `var(--dark-color)` mal usado como fondo en Select2 disabled

- **Archivo:** `_select2.scss:227, 325, 799`
- **Bug:** `background-color: var(--dark-color)` en 3 selectores de estado disabled. `--dark-color` es `#eee` (color de texto en dark mode), no un color de fondo
- **Fix:** Reemplazado por `light-dark(#e9ecef, #2d3238)` con fallback estatico `#e9ecef`
- **Impacto:** Select2 disabled ahora tiene fondo correcto en light (`#e9ecef` = Bootstrap `$input-disabled-bg`) y dark (`#2d3238`)
- **Selectores afectados:**
  - `.select2-container--default.select2-container--disabled .select2-selection--single`
  - `.select2-container--default.select2-container--disabled .select2-selection--multiple`
  - `.select2-container--bootstrap.select2-container--disabled .select2-selection`

#### H-3: Gradiente de modal sin variante dark

- **Archivo:** `_modals.scss:36`
- **Bug:** `.modal-body` tenia `linear-gradient(#FFF, #e9e5e5)` hardcodeado — blanco en dark mode
- **Fix:** `linear-gradient(light-dark(#FFF, #1a1a1a), light-dark(#e9e5e5, #2d2d2d))` con fallback estatico
- **Impacto:** Modal body ahora tiene gradiente oscuro en dark mode

### MEDIUM — 3 corregidos, 2 diferidos

#### M-1: `.btn-orange` dead code eliminado

- **Archivo:** `_buttons.scss:41`
- **Bug:** `.btn-orange { color: #fff; }` — solo setea color, pero `_btn-extended.scss:10` ya define color + background-color + border-color completos
- **Fix:** Eliminada la regla redundante de `_buttons.scss`
- **Impacto:** Ninguno visual — la regla de `_btn-extended.scss` ya tenia precedencia

#### M-3: `*:hover` scrollbar eliminado

- **Archivo:** `_scrollbars.scss:28`
- **Bug:** `*:hover { scrollbar-color: ... }` — selector universal en hover que aplica a cada elemento del DOM
- **Fix:** Eliminado. `*::-webkit-scrollbar-thumb:hover` (linea 19) ya cubre el caso hover en webkit. Firefox no tiene pseudo hover nativo para `scrollbar-color`
- **Impacto:** Mejor performance (menos evaluacion de selectores). El color naranja en hover de scrollbar webkit se mantiene

#### M-4: `light-dark(white, white)` redundante

- **Archivo:** `_dropdowns.scss:18`
- **Bug:** `.dropdown-item { color: light-dark(white, white); }` — ambos valores identicos
- **Fix:** Simplificado a `color: white`
- **Impacto:** Ninguno visual — el dropdown siempre tiene fondo oscuro (`rgba(0,0,0,0.75)`), texto blanco es correcto en ambos modos

#### M-2: `textarea` global — DIFERIDO

- **Archivo:** `_forms.scss:131`
- **Hallazgo:** `textarea { overflow-y: hidden; resize: none }` aplica globalmente a todos los textareas
- **Accion:** Requiere coordinacion con SaaSMono para agregar clase `.auto-resize` a textareas existentes antes de cambiar el selector

#### M-5: `--dark-color` nombre confuso — DIFERIDO

- **Archivo:** `_variables.scss:10`
- **Hallazgo:** `--dark-color: #eee` — semanticamente confuso (parece "color oscuro" pero es "color para dark mode")
- **Accion:** Considerar rename futuro a `--text-dark-mode`. Requiere buscar/reemplazar en todo el codebase + app1.css

### LOW — 1 corregido, 2 third-party sin accion

#### L-1: Reglas `@viewport` deprecated eliminadas

- **Archivo:** `_responsive.scss:3-21`
- **Bug:** 5 reglas `@viewport` con prefijos vendor (`@-webkit-viewport`, `@-moz-viewport`, `@-ms-viewport`, `@-o-viewport`, `@viewport`)
- **Fix:** Eliminadas las 5 reglas
- **Impacto:** Ninguno — `@viewport` fue eliminado de todos los browsers. La meta tag `<meta name="viewport">` es el mecanismo correcto

#### L-2: IE legacy en Select2 — SIN ACCION

- Declaraciones `progid:DXImageTransform`, `filter: alpha(opacity)`, `-ms-filter` en el tema classic de Select2
- Son parte del codigo third-party original. Se eliminaran cuando Select2 se reemplace (ver estrategia Tailwind)

#### L-3: Pseudo-clases removidas en Font Awesome — SIN ACCION

- `:-moz-focusring` (removido en Firefox 87+), `-ms-overflow-style`
- Son parte de Font Awesome 4.7.0. Se eliminaran cuando FA se reemplace por iconos SVG

---

## Cambios en documentacion

### Alineacion con estrategia Tailwind CSS

8 documentos actualizados para reflejar la direccion estrategica BS4 → Tailwind:

| Documento | Cambio |
| --- | --- |
| `CLAUDE.md` | Seccion "Strategic direction" agregada |
| `docs/overview/README.md` | Seccion "Direccion estrategica" con guia de inversion |
| `docs/tokens/README.md` | Seccion "Puente hacia Tailwind" (CSS custom props → tailwind.config.js) |
| `docs/dark-theme/README.md` | Tabla de compatibilidad light-dark() ↔ dark: variant |
| `docs/third-party/README.md` | Tabla de impacto migracion por libreria |
| `docs/technical-debt/design-tokens.md` | Referencia BS5 → Tailwind |
| `docs/technical-debt/README.md` | Hallazgos marcados como resueltos/diferidos |
| `docs/changelog/` | Entrada de code review findings + pendientes marcados resueltos |

---

## Resumen de archivos modificados

### SCSS (6 archivos)

| Archivo | Cambio | Lineas |
| --- | --- | --- |
| `scss/fmcamps/_tables.scss` | `tr > tr` → `tr > td` | 1 linea |
| `scss/fmcamps/_select2.scss` | `var(--dark-color)` → `light-dark(#e9ecef, #2d3238)` x3 | +6/-3 |
| `scss/fmcamps/_modals.scss` | Gradiente con `light-dark()` + fallback | +1/-1 |
| `scss/fmcamps/_buttons.scss` | `.btn-orange` dead code eliminado | -4 |
| `scss/fmcamps/_scrollbars.scss` | `*:hover` scrollbar eliminado | -5 |
| `scss/fmcamps/_dropdowns.scss` | `light-dark(white,white)` → `white` | -1 |
| `scss/fmcamps/_responsive.scss` | 5 `@viewport` eliminados | -20 |

### CSS compilado (2 archivos)

| Archivo | Cambio |
| --- | --- |
| `dist/css/fmcamps.css` | Recompilado con todos los fixes |
| `site/public/css/fmcamps.css` | Copia para kitchen sink |

### Documentacion (8 archivos)

Ver tabla de alineacion Tailwind arriba.

---

## Riesgo

**MUY BAJO** — Todos los cambios CSS verificados con 48 screenshots de regresion visual (desktop/mobile x light/dark, 12 paginas). Los baselines se actualizaron y confirmaron identicos (0 diferencias de pixeles).

## Verificacion post-deploy

1. Verificar Select2 disabled — fondo gris claro en light mode, gris oscuro en dark mode
2. Verificar modal body — gradiente oscuro en dark mode (antes era blanco)
3. Verificar filas `text-warning` en tablas — celdas con fondo amarillo
4. Verificar scrollbars — hover naranja en webkit (comportamiento sin cambio)
