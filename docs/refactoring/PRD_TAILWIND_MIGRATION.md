# PRD: Migracion Bootstrap 4 → Tailwind CSS

**Version:** 1.2
**Fecha:** 2026-03-08
**Autor:** Equipo Arquitectura FMCAMPS
**Estado:** Fase 0 Paso 0a completado — Coexistencia BS4+Tailwind validada

**Relacion con otros PRDs:**

- **PRD padre:** `saasmono/docs/refactoring/PRD_FRONTEND_STACK_MODERNIZATION.md` (v1.8) — Objetivo O3, Sub-fases F1.4, F3.3, F4.2-F4.4
- **Repo CSS:** bootstrapSaaSMono (este repo) — fork BS4.6.2, 31 partials SCSS, CSS custom properties
- **Repo App:** SaaSMono — 81 Razor Views, 56 archivos JS (19 ya migrados a TS)

---

## 1. RESUMEN EJECUTIVO

### Problema

Bootstrap 4.6.2 (EOL enero 2023) genera ~42 KB gzip de CSS sin tree-shaking ni purge. De las 586 clases unicas encontradas en las 81 Views de SaaSMono, solo ~300 son Bootstrap — el resto son custom FMCamps, Font Awesome, o legacy BS3. El CSS actual carga todo Bootstrap aunque cada vista use solo un subconjunto.

### Solucion

Migrar a **Tailwind CSS v4** con estrategia de coexistencia incremental:

- `@import "tailwindcss" prefix(tw)` — prefijo `tw:` evita colisiones con clases BS4 durante la transicion
- `@theme` — mapea las CSS custom properties existentes de FMCamps (`--cyan-fmc`, `--orange-fmc`, etc.)
- Purge automatico — solo las clases usadas en Views/JS/TS van al bundle final
- Dark mode — compatible con `prefers-color-scheme` (ya implementado) o class-based

### Beneficio Esperado

| Metrica | Bootstrap 4 | Tailwind v4 (purged) | Mejora |
| --- | --- | --- | --- |
| CSS total (gzip) | ~42 KB | ~10-15 KB | -70% |
| Tree-shaking | No | Si (automatico) | Solo clases usadas |
| Dark mode | CSS custom + `light-dark()` | `dark:` variant nativo | Simplificacion |
| Dependencias EOL | 1 (BS4) | 0 | Eliminacion |

---

## 2. INVENTARIO DE CLASES — RESUMEN CUANTITATIVO

### 2.1 Fuentes de Datos

| Fuente | Archivos | Ocurrencias `class=` | Clases unicas |
| --- | --- | --- | --- |
| Razor Views (`.cshtml`) | 81 | 7,248 | 586 |
| Legacy JS (`scriptsbl/*.js`) | ~44 | — | ~120 adicionales |
| TypeScript (`ts/**/*.ts`) | ~93 | — | ~10 adicionales |

### 2.2 Distribucion por Tipo

| Tipo | Clases unicas | % | Usos estimados |
| --- | --- | --- | --- |
| Bootstrap 4 utilities/components | ~300 | 51% | ~5,500 |
| FMCamps custom | ~55 | 9% | ~600 |
| Font Awesome 4.7.0 | ~100 (76 iconos + modifiers) | 17% | ~1,800 |
| App-specific (IDs, selectores JS) | ~80 | 14% | ~400 |
| Legacy BS3 | ~14 | 2% | ~90 |
| Otros (Select2, DT, third-party) | ~37 | 6% | ~200 |

---

## 3. TOP 30 CLASES POR FRECUENCIA (Views)

| # | Clase | Usos | Categoria | Equivalente Tailwind v4 |
| --- | --- | --- | --- | --- |
| 1 | `form-group` | 749 | Formularios | `tw:mb-4` (spacing wrapper) |
| 2 | `fa` | 688 | Font Awesome | Lucide SVG (eliminar) |
| 3 | `btn` | 674 | Botones | `tw:inline-flex tw:items-center tw:px-4 tw:py-2 tw:rounded` |
| 4 | `form-control` | 637 | Formularios | `tw:w-full tw:border tw:rounded tw:px-3 tw:py-2` |
| 5 | `fa-lg` | 447 | FA modifier | Lucide `size` prop |
| 6 | `d-none` | 398 | Display | `tw:hidden` |
| 7 | `row` | 370 | Grid | `tw:flex tw:flex-wrap tw:-mx-4` o `tw:grid` |
| 8 | `col-md-6` | 355 | Grid | `tw:w-full md:tw:w-1/2 tw:px-4` |
| 9 | `btn-outline-dark` | 227 | Botones | `tw:border tw:border-gray-800 tw:text-gray-800 hover:tw:bg-gray-800 hover:tw:text-white` |
| 10 | `fade` | 192 | Transiciones | `tw:transition-opacity tw:opacity-0` |
| 11 | `mb-0` | 163 | Spacing | `tw:mb-0` |
| 12 | `col-12` | 163 | Grid | `tw:w-full` |
| 13 | `nav-link` | 161 | Navegacion | Custom (depende del componente nav) |
| 14 | `btn-lg` | 150 | Botones | `tw:px-6 tw:py-3 tw:text-lg` |
| 15 | `btn-primary` | 144 | Botones | `tw:bg-(--cyan-fmc) tw:text-white hover:tw:bg-(--orange-fmc)` |
| 16 | `col-md-12` | 128 | Grid | `md:tw:w-full` |
| 17 | `fa-print` | 125 | FA icon | `<Printer />` (Lucide) |
| 18 | `d-flex` | 124 | Flexbox | `tw:flex` |
| 19 | `fa-check` | 120 | FA icon | `<Check />` (Lucide) |
| 20 | `dropdown-item` | 116 | Navegacion | Custom dropdown component |
| 21 | `btn-group` | 109 | Botones | `tw:inline-flex tw:rounded-md tw:shadow-sm` |
| 22 | `close` | 105 | Componentes | Custom close button |
| 23 | `nav-item` | 103 | Navegacion | Custom nav component |
| 24 | `container-fluid` | 102 | Layout | `tw:w-full tw:mx-auto tw:px-4` |
| 25 | `active` | 102 | Estado | Variant o `data-[active]:tw:bg-*` |
| 26 | `tab-pane` | 97 | Tabs | Custom tab component |
| 27 | `btn-outline-secondary` | 91 | Botones | `tw:border tw:border-gray-500 tw:text-gray-500` |
| 28 | `mr-2` | 90 | Spacing | `tw:mr-2` |
| 29 | `modal-dialog` | 88 | Modales | `<dialog>` nativo + styling |
| 30 | `modal-content` | 86 | Modales | `<dialog>` content wrapper |

---

## 4. CLASES BOOTSTRAP POR CATEGORIA

### 4.1 Layout y Grid

| Clase | Usos Views | Usos JS/TS | Equivalente Tailwind v4 |
| --- | --- | --- | --- |
| `container-fluid` | 102 | — | `tw:w-full tw:mx-auto tw:px-4` |
| `container` | 20 | — | `tw:container tw:mx-auto tw:px-4` |
| `row` | 370 | — | `tw:flex tw:flex-wrap tw:-mx-4` o `tw:grid tw:grid-cols-12 tw:gap-4` |
| `col-12` | 163 | — | `tw:w-full` |
| `col-md-6` | 355 | 14 | `tw:w-full md:tw:w-1/2 tw:px-4` |
| `col-md-4` | 60 | 14 | `tw:w-full md:tw:w-1/3` |
| `col-md-3` | 39 | — | `tw:w-full md:tw:w-1/4` |
| `col-md-2` | 51 | 14 | `tw:w-full md:tw:w-1/6` |
| `col-md-10` | 73 | — | `tw:w-full md:tw:w-5/6` |
| `col-md-12` | 128 | 3 | `md:tw:w-full` |
| `col-md-8` | 14 | — | `tw:w-full md:tw:w-2/3` |
| `col-md-9` | 13 | — | `tw:w-full md:tw:w-3/4` |
| `col-6` | 24 | — | `tw:w-1/2` |
| `col-4` | 7 | — | `tw:w-1/3` |
| `col-11` | 7 | — | `tw:w-11/12` |
| `col-sm-12` | 31 | — | `sm:tw:w-full` |
| `col-sm-6` | 18 | — | `sm:tw:w-1/2` |
| `col-sm-8` | 10 | — | `sm:tw:w-2/3` |
| `col-sm-4` | 10 | — | `sm:tw:w-1/3` |
| `col-xl-6` | 21 | — | `xl:tw:w-1/2` |
| `col-xl-8` | 5 | — | `xl:tw:w-2/3` |
| `col-lg-8` | 7 | — | `lg:tw:w-2/3` |
| `col-lg-4` | 6 | — | `lg:tw:w-1/3` |
| `offset-md-2` | 2 | — | `md:tw:ml-1/6` |
| `offset-sm-1` | 2 | — | `sm:tw:ml-1/12` |
| `w-100` | 36 | — | `tw:w-full` |
| `h-100` | 10 | — | `tw:h-full` |

**Nota critica:** El sistema de grid BS4 (12 columnas con `row`/`col-*`) es el patron mas extendido (370 `row` + ~1,200 `col-*`). La migracion a Tailwind ofrece dos rutas:

- **Ruta A — Flexbox utilities:** `tw:flex tw:flex-wrap` + fracciones (`tw:w-1/2`, `tw:w-1/3`)
- **Ruta B — CSS Grid:** `tw:grid tw:grid-cols-12 tw:gap-4` + `tw:col-span-6`

**Recomendacion:** Ruta B (CSS Grid) para layouts de formulario, Ruta A para layouts simples.

### 4.2 Flexbox y Alineacion

| Clase | Usos Views | Equivalente Tailwind v4 |
| --- | --- | --- |
| `d-flex` | 124 | `tw:flex` |
| `flex-column` | 56 | `tw:flex-col` |
| `flex-row` | 27 | `tw:flex-row` |
| `justify-content-between` | 68 | `tw:justify-between` |
| `align-items-center` | 44 | `tw:items-center` |
| `ml-auto` | 45 | `tw:ml-auto` |
| `mr-auto` | 7 | `tw:mr-auto` |

### 4.3 Display y Visibilidad

| Clase | Usos Views | Usos JS | Equivalente Tailwind v4 |
| --- | --- | --- | --- |
| `d-none` | 398 | 285+4 | `tw:hidden` |
| `d-md-block` | 86 | — | `md:tw:block` |
| `d-sm-block` | 39 | — | `sm:tw:block` |
| `d-block` | 9 | — | `tw:block` |
| `d-sm-none` | 3 | — | `sm:tw:hidden` |
| `d-md-none` | 1 | — | `md:tw:hidden` |
| `show` | 62 | 2 | Custom (transition state) |
| `fade` | 192 | 10 | `tw:transition-opacity` |
| `collapse` | 24 | — | Custom (JS-driven) |
| `hide` | 4 | — | `tw:hidden` |
| `hidden` | 2 | 1 | `tw:hidden` |

**Hallazgo critico:** `d-none` es la clase mas manipulada dinamicamente (285 addClass + removeClass en JS legacy). El equivalente Tailwind `tw:hidden` debe funcionar identicamente con `classList.add/remove`.

### 4.4 Botones

| Clase | Usos Views | Usos JS/TS | Equivalente Tailwind v4 |
| --- | --- | --- | --- |
| `btn` | 674 | 239 | `tw:inline-flex tw:items-center tw:px-4 tw:py-2 tw:rounded tw:font-medium` |
| `btn-outline-dark` | 227 | 17 | `tw:border tw:border-gray-800 tw:text-gray-800 hover:tw:bg-gray-800 hover:tw:text-white` |
| `btn-lg` | 150 | 80 | `tw:px-6 tw:py-3 tw:text-lg` |
| `btn-primary` | 144 | 8 | `tw:bg-(--cyan-fmc) tw:text-white hover:tw:bg-(--orange-fmc)` (⚠️ `$primary: $gray-900` en BS4, pero `_btn-extended.scss` sobreescribe con `var(--cyan-fmc)`; dark mode invierte a `--orange-fmc` via `_dark-theme.scss`) |
| `btn-group` | 109 | 19 | `tw:inline-flex tw:rounded-md tw:shadow-sm [&>*]:tw:rounded-none first:[&>*]:tw:rounded-l last:[&>*]:tw:rounded-r` |
| `btn-outline-secondary` | 91 | 8 | `tw:border tw:border-gray-500 tw:text-gray-500` |
| `btn-group-lg` | 75 | — | Combinado con btn-lg |
| `btn-toolbar` | 51 | — | `tw:flex tw:flex-wrap tw:gap-2` |
| `btn-danger` | 40 | 10 | `tw:bg-(--danger-fmc) tw:text-white` |
| `btn-success` | 25 | 3 | `tw:bg-(--success-fmc) tw:text-white` |
| `btn-warning` | 12 | 10 | `tw:bg-(--warning-fmc) tw:text-white` |
| `btn-info` | 10 | 1 | `tw:bg-(--blue-fmc) tw:text-white` |
| `btn-secondary` | 13 | 3 | `tw:bg-gray-500 tw:text-white` |
| `btn-sm` | 12 | 34 | `tw:px-2 tw:py-1 tw:text-sm` |
| `btn-block` | 10 | 12 | `tw:w-full` |
| `btn-link` | 5 | — | `tw:bg-transparent tw:text-(--cyan-fmc) tw:underline` |
| `btn-circle` | 0 (Views) | 150 (JS) | `tw:rounded-full tw:w-8 tw:h-8 tw:p-0` |
| `btn-orange` | 0 (Views) | 9 (JS) | `tw:bg-(--orange-fmc) tw:text-white` |

**Nota:** `btn-circle` (150 usos) solo existe en templates JS de DataTables — nunca en Views. `btn-orange` es custom FMCamps.

### 4.5 Formularios

| Clase | Usos Views | Equivalente Tailwind v4 |
| --- | --- | --- |
| `form-group` | 749 | `tw:mb-4` (solo es un spacing wrapper) |
| `form-control` | 637 | `tw:w-full tw:border tw:border-gray-300 tw:rounded tw:px-3 tw:py-2 focus:tw:ring-2 focus:tw:ring-(--cyan-fmc) focus:tw:outline-none` |
| `input-group` | 49 | `tw:flex tw:items-stretch` |
| `input-group-append` | 24 | `tw:flex` |
| `input-group-text` | 15 | `tw:px-3 tw:py-2 tw:bg-gray-100 tw:border tw:border-gray-300` |
| `input-group-prepend` | 10 | `tw:flex` |
| `form-check` | 6 | `tw:flex tw:items-center` |
| `form-check-input` | 10 | `tw:mr-2` |
| `form-check-label` | 5 | `tw:ml-2` |
| `form-inline` | 4 | `tw:flex tw:items-center tw:gap-2` |
| `custom-control` | 12 | — |
| `custom-control-input` | 12 | `tw:sr-only peer` |
| `custom-control-label` | 12 | `peer-checked:tw:bg-(--cyan-fmc)` |
| `custom-switch` | 11 | — |
| `custom-select` | 0 (Views), 20+ (JS/DT) | `tw:appearance-none tw:bg-white tw:border tw:rounded` |
| `radio-inline` | 49 | `tw:inline-flex tw:items-center tw:mr-4` |
| `filtrounico` | 49 | Custom FMCamps (mantener) |
| `form-control-left` | 49 | Custom FMCamps (mantener) |

### 4.6 Tablas

| Clase | Usos Views | Usos JS/TS | Equivalente Tailwind v4 |
| --- | --- | --- | --- |
| `table` | 61 | 17 | `tw:w-full tw:border-collapse` |
| `table-responsive` | 61 | — | `tw:overflow-x-auto` |
| `table-sm` | 60 | 3 | `[&_td]:tw:py-1 [&_th]:tw:py-1` |
| `table-striped` | 50 | 16 | `even:[&_tr]:tw:bg-gray-50` |
| `table-bordered` | 3 | 10 | `[&_td]:tw:border [&_th]:tw:border` |
| `table-hover` | 1 | 2 | `hover:[&_tr]:tw:bg-gray-100` |

**Nota critica:** DataTables 2.x inyecta su propio markup con clases BS4 via el adapter embebido en `_common.js` (118 lineas). Debe crearse un **adapter Tailwind custom** antes de remover BS4.

### 4.7 Cards

| Clase | Usos Views | Equivalente Tailwind v4 |
| --- | --- | --- |
| `card` | 34 | `tw:rounded-lg tw:border tw:border-gray-200 tw:bg-white tw:shadow-sm` |
| `card-body` | 43 | `tw:p-4` |
| `card-header` | 27 | `tw:px-4 tw:py-3 tw:border-b tw:border-gray-200 tw:bg-gray-50` |
| `card-footer` | 34 | `tw:px-4 tw:py-3 tw:border-t tw:border-gray-200 tw:bg-gray-50` |
| `card-title` | 6 | `tw:text-lg tw:font-semibold` |
| `accordion` | 6 | Custom accordion component |

### 4.8 Modales

| Clase | Usos Views | Equivalente Tailwind v4 |
| --- | --- | --- |
| `modal` | 86 | `<dialog>` nativo |
| `modal-dialog` | 88 | `tw:mx-auto tw:my-8 tw:max-w-lg` |
| `modal-content` | 86 | `tw:bg-white tw:rounded-lg tw:shadow-xl` |
| `modal-header` | 85 | `tw:flex tw:items-center tw:justify-between tw:p-4 tw:border-b` |
| `modal-body` | 85 | `tw:p-4` |
| `modal-footer` | 76 | `tw:flex tw:justify-end tw:gap-2 tw:p-4 tw:border-t` |
| `modal-title` | 31 | `tw:text-lg tw:font-semibold` |
| `modal-lg` | 24 | `tw:max-w-3xl` |
| `modal-xl` | 2 | `tw:max-w-5xl` |
| `modal-sm` | 1 | `tw:max-w-sm` |
| `modal-dialog-centered` | 1 | `tw:flex tw:items-center tw:min-h-screen` |

**Nota:** PRD padre F2.3 reemplaza Bootbox por HTML `<dialog>`. Los 86 modales BS4 se migraran a `<dialog>` nativo — no necesitan equivalente Tailwind del componente `modal` sino solo styling del contenido.

### 4.9 Navegacion

| Clase | Usos Views | Equivalente Tailwind v4 |
| --- | --- | --- |
| `navbar` | 49 | `tw:flex tw:items-center tw:justify-between tw:px-4 tw:py-2` |
| `navbar-expand-lg` | 39 | `lg:tw:flex` |
| `navbar-light` | 38 | `tw:bg-white tw:text-gray-800` |
| `navbar-dark` | 4 | `tw:bg-gray-900 tw:text-white` |
| `navbar-nav` | 11 | `tw:flex tw:items-center tw:gap-4` |
| `navbar-brand` | 7 | `tw:text-lg tw:font-bold` |
| `navbar-collapse` | 5 | `tw:hidden lg:tw:flex` |
| `navbar-toggler` | 4 | `tw:lg:hidden tw:p-2` |
| `nav` | 46 | `tw:flex tw:list-none` |
| `nav-tabs` | 44 | `tw:flex tw:border-b tw:border-gray-200` |
| `nav-item` | 103 | `tw:mr-1` |
| `nav-link` | 161 | `tw:px-4 tw:py-2 tw:text-gray-600 hover:tw:text-gray-800` |
| `tab-content` | 44 | `tw:mt-4` |
| `tab-pane` | 97 | `tw:hidden [&.active]:tw:block` |
| `tabbable` | 44 | — (BS3 legacy, sin equivalente) |
| `dropdown-menu` | 34 | `tw:absolute tw:z-50 tw:mt-1 tw:bg-white tw:border tw:rounded-md tw:shadow-lg` |
| `dropdown-item` | 116 | `tw:block tw:px-4 tw:py-2 hover:tw:bg-gray-100` |
| `dropdown-toggle` | 34 | Custom (JS-driven) |
| `dropdown-divider` | 2 | `tw:border-t tw:border-gray-200 tw:my-1` |
| `dropdown` | 6 | `tw:relative tw:inline-block` |

### 4.10 Alertas

| Clase | Usos Views | Equivalente Tailwind v4 |
| --- | --- | --- |
| `alert` | 57 | `tw:px-4 tw:py-3 tw:rounded-lg tw:border` |
| `alert-dismissible` | 45 | `tw:pr-10 tw:relative` |
| `alert-danger` | 35 | `tw:bg-red-50 tw:text-red-800 tw:border-red-200` |
| `alert-heading` | 32 | `tw:font-semibold tw:mb-1` |
| `alert-warning` | 15 | `tw:bg-yellow-50 tw:text-yellow-800 tw:border-yellow-200` |
| `alert-info` | 2 | `tw:bg-blue-50 tw:text-blue-800 tw:border-blue-200` |

### 4.11 Badges

| Clase | Usos Views | Usos JS/TS | Equivalente Tailwind v4 |
| --- | --- | --- | --- |
| `badge` | 62 | 221 | `tw:inline-flex tw:items-center tw:px-2 tw:py-0.5 tw:text-xs tw:font-medium tw:rounded-full` |
| `badge-danger` | 54 | 39 | `tw:bg-red-100 tw:text-red-800` |
| `badge-pill` | 27 | 38 | `tw:rounded-full` (ya default en Tailwind) |
| `badge-success` | 4 | 21 | `tw:bg-green-100 tw:text-green-800` |
| `badge-info` | 2 | 6 | `tw:bg-blue-100 tw:text-blue-800` |
| `badge-warning` | 0 | 17 | `tw:bg-yellow-100 tw:text-yellow-800` |
| `badge-primary` | 0 | 31 | `tw:bg-gray-900/10 tw:text-gray-900` (⚠️ sin override FMCamps — usa `$primary: $gray-900` directo) |
| `badge-secondary` | 1 | 10 | `tw:bg-gray-100 tw:text-gray-800` |
| `badge-orange` | 0 | 6 | `tw:bg-(--orange-fmc)/10 tw:text-(--orange-fmc)` (custom FMCamps) |

**Nota:** Los badges se generan masivamente en JS (templates de DataTables). 221 usos en JS vs 62 en Views.

### 4.12 Tipografia

| Clase | Usos Views | Equivalente Tailwind v4 |
| --- | --- | --- |
| `text-muted` | 47 | `tw:text-gray-500` |
| `text-center` | 46 | `tw:text-center` |
| `text-danger` | 34 | `tw:text-(--danger-fmc)` |
| `text-white` | 14 | `tw:text-white` |
| `text-justify` | 13 | `tw:text-justify` |
| `text-uppercase` | 6 | `tw:uppercase` |
| `font-weight-bold` | 16 | `tw:font-bold` |
| `font-weight-normal` | 8 | `tw:font-normal` |
| `lead` | 14 | `tw:text-lg tw:font-light` |
| `small` | 31 | `tw:text-sm` |
| `h5` | 20 | `tw:text-xl tw:font-semibold` |
| `h4` | 6 | `tw:text-2xl tw:font-semibold` |
| `sr-only` | 8 | `tw:sr-only` |

### 4.13 Spacing

| Clase | Usos Views | Equivalente Tailwind v4 |
| --- | --- | --- |
| `mb-0` | 163 | `tw:mb-0` |
| `mr-2` | 90 | `tw:mr-2` |
| `mb-3` | 71 | `tw:mb-4` ⚠️ |
| `px-4` | 37 | `tw:px-6` ⚠️ |
| `px-0` | 30 | `tw:px-0` |
| `mt-3` | 31 | `tw:mt-4` ⚠️ |
| `ml-auto` | 45 | `tw:ml-auto` |
| `mb-2` | 15 | `tw:mb-2` |
| `mb-4` | 13 | `tw:mb-6` ⚠️ |
| `mb-1` | 14 | `tw:mb-1` |
| `mt-2` | 9 | `tw:mt-2` |
| `py-2` | 11 | `tw:py-2` |
| `py-3` | 6 | `tw:py-4` ⚠️ |
| `pt-0` | 14 | `tw:pt-0` |
| `mr-3` | 12 | `tw:mr-4` ⚠️ |

**⚠️ Correccion post-Fase 0:** La escala de spacing de BS4 es **no lineal** (0, 0.25, 0.5, 1.0, 1.5, 3.0 rem) mientras que Tailwind v4 con `--spacing: 0.25rem` es **lineal** (n × 0.25rem). Los niveles 0-2 coinciden, pero los niveles 3, 4 y 5 divergen. Mapping correcto: BS4 `-3` → `tw:-4` (1rem), BS4 `-4` → `tw:-6` (1.5rem), BS4 `-5` → `tw:-12` (3rem). Ver [tailwind-class-mapping.md](tailwind-class-mapping.md) para la tabla completa validada en Fase 0.

### 4.14 Bordes, Rounded y Sombras

| Clase | Usos Views | Equivalente Tailwind v4 |
| --- | --- | --- |
| `rounded-lg` | 65 | `tw:rounded-lg` |
| `rounded` | 5 | `tw:rounded` |
| `rounded-md` | 5 | `tw:rounded-md` |
| `rounded-top` | 2 | `tw:rounded-t` |
| `border-0` | 14 | `tw:border-0` |
| `border-bottom` | 6 | `tw:border-b` |
| `border-dark` | 3 | `tw:border-gray-800` |
| `border-danger` | 2 | `tw:border-(--danger-fmc)` |
| `shadow-sm` | 10 | `tw:shadow-sm` |
| `shadow` | 4 | `tw:shadow` |

### 4.15 Colores y Fondos

| Clase | Usos Views | Equivalente Tailwind v4 |
| --- | --- | --- |
| `bg-fmc2` | 78 | `tw:bg-fmc2` (custom — definir en @theme) |
| `bg-light` | 4 | `tw:bg-gray-100` |
| `bg-primary` | 3 | `tw:bg-gray-900` (⚠️ sin override FMCamps — usa `$primary: $gray-900` directo; considerar si la intencion era `--cyan-fmc`) |
| `bg-danger` | 3 | `tw:bg-(--danger-fmc)` |
| `bg-info` | 2 | `tw:bg-(--blue-fmc)` |
| `bg-dark` | 2 | `tw:bg-gray-800` |
| `bg-white` | 1 | `tw:bg-white` |
| `bg-warning` | 1 | `tw:bg-(--warning-fmc)` |
| `bg-fmc1` | 2 | `tw:bg-fmc1` (custom — definir en @theme) |

### 4.16 Posicionamiento

| Clase | Usos Views | Equivalente Tailwind v4 |
| --- | --- | --- |
| `sticky-top` | 39 | `tw:sticky tw:top-0` |
| `position-relative` | 26 | `tw:relative` |
| `position-absolute` | 26 | `tw:absolute` |
| `float-right` | 9 | `tw:float-right` |
| `fixed-top` | 4 | `tw:fixed tw:top-0 tw:inset-x-0` |
| `position-fixed` | 1 | `tw:fixed` |

---

## 5. CLASES CUSTOM FMCamps

Clases definidas en los partials SCSS de `bootstrapSaaSMono/scss/fmcamps/`:

| Clase | Usos Views | Partial SCSS | Proposito | Accion migracion |
| --- | --- | --- | --- | --- |
| `label-option` | 80 | `_typography.scss` | Estilo de labels en formularios | Convertir a utility class o @apply |
| `bg-fmc2` | 78 | `_gradients.scss` | Gradiente de marca secundario | Definir en `@theme` como `--color-fmc2` |
| `tituloright` | 49 | `_gradients.scss` | Header con gradiente de marca | Componente custom Tailwind |
| `page-header` | 49 | `_body.scss` | Header de pagina | Utility classes |
| `filtrounico` | 49 | `_forms.scss` | Estilo para filtros unicos | Mantener como clase custom |
| `form-control-left` | 49 | `_forms.scss` / `_utilities.scss` | Input alineado a la izquierda | Utility o custom |
| `auto-resize` | 40 | `_forms.scss` | Textarea auto-resize | Mantener (JS behavior) |
| `dataTables_empty` | 36 | `_datatables.scss` | Tabla vacia DataTables | Mantener (third-party) |
| `help-block` | 29 | `_typography.scss` | Texto de ayuda en forms | `tw:text-sm tw:text-gray-500` |
| `top-right-btn` | 26 | `_utilities.scss` | Boton posicionado arriba-derecha | `tw:absolute tw:top-2 tw:right-2` |
| `copy-btn` | 26 | `_btn-extended.scss` | Boton de copiar | Mantener o utility |
| `centered-cell` | 23 | — | Celda centrada en tabla | `tw:text-center` |
| `help` | 32 | — | Cursor de ayuda | `tw:cursor-help` |
| `expand` | 21 | — | Expandir seccion | JS behavior class |
| `titulo` | 1 | `_gradients.scss` | Titulo con gradiente | Componente custom |
| `transparente` | 8 | `_tables.scss` | Fondo transparente | `tw:bg-transparent` |
| `badge-orange` | 0 (Views) / 6 (JS) | `_badges.scss` | Badge naranja FMCamps | Definir en `@theme` |
| `btn-orange` | 0 (Views) / 9 (JS) | `_btn-extended.scss` | Boton naranja FMCamps | Definir en `@theme` |
| `btn-circle` | 0 (Views) / 150 (JS) | `_buttons.scss` | Boton circular DataTables | Componente custom |
| `btn-circle2` | — | `_buttons.scss` | Boton circular variante (aliceblue bg) | Componente custom o eliminar si no se usa |
| `bg-fmc1` | 2 | `_gradients.scss` | Gradiente de marca primario | Definir en `@theme` |
| `dialog-fmc-*` | — | `_dialogs.scss` | Dialogos FMCamps | Mantener (nuevo sistema) |
| `toast-fmc-*` | — | `_toasts.scss` | Toasts FMCamps | Mantener (nuevo sistema) |
| `gestor-archivos` | — | `_gestor-archivos.scss` | Upload S3 | Mantener |

**Partials que sobreviven la migracion a Tailwind:**

| Partial | Razon | Accion |
| --- | --- | --- |
| `_variables.scss` | CSS custom properties `:root` | Migrar a `@theme` en Tailwind |
| `_datatables.scss` | Overrides DataTables 2.x | Mantener como plugin Tailwind |
| `_select2.scss` | Overrides Select2 (se reemplaza por TomSelect en F2.1) | Eliminar con F2.1 |
| `_daterangepicker.scss` | Overrides DRP (se reemplaza por Flatpickr en F2.2) | Eliminar con F2.2 |
| `_dialogs.scss` | Dialogos FMC nativos | Mantener/adaptar |
| `_toasts.scss` | Toasts FMC nativos | Mantener/adaptar |
| `_gestor-archivos.scss` | Upload S3 | Mantener/adaptar |
| `_dark-theme.scss` | Dark mode overrides | Migrar a `dark:` variants de Tailwind |
| `_gradients.scss` | Brand gradients (bg-fmc1/2/3, titulo) | Mantener como componente |

---

## 6. FONT AWESOME 4.7.0

### 6.1 Inventario de Iconos (76 unicos)

Ordenados por frecuencia combinada (Views + JS/TS):

| Icono FA | Usos Views | Usos JS/TS | Total | Equivalente Lucide |
| --- | --- | --- | --- | --- |
| `fa-refresh` | 48 | 234 | 282 | `RefreshCw` |
| `fa-check` | 120 | 28 | 149 | `Check` |
| `fa-print` | 125 | 17 | 142 | `Printer` |
| `fa-check-circle` | 0 | 97 | 97 | `CheckCircle` |
| `fa-filter` | 69 | 0 | 69 | `Filter` |
| `fa-clone` | 26 | 32 | 58 | `Copy` |
| `fa-trash` | 0 | 56 | 56 | `Trash2` |
| `fa-plus` | 23 | 22 | 45 | `Plus` |
| `fa-pencil` | 13 | 28 | 42 | `Pencil` |
| `fa-download` | 32 | 0 | 32 | `Download` |
| `fa-exclamation-triangle` | 0 | 30 | 30 | `AlertTriangle` |
| `fa-arrow-left` | 29 | 0 | 29 | `ArrowLeft` |
| `fa-paperclip` | 8 | 18 | 26 | `Paperclip` |
| `fa-external-link` | 22 | 3 | 25 | `ExternalLink` |
| `fa-list-ol` | 22 | 0 | 22 | `ListOrdered` |
| `fa-binoculars` | 1 | 21 | 22 | `Search` o `Binoculars` |
| `fa-thumbs-up` | 5 | 13 | 19 | `ThumbsUp` |
| `fa-thumbs-down` | 5 | 13 | 18 | `ThumbsDown` |
| `fa-spinner` | 2 | 16 | 18 | `Loader2` (con `tw:animate-spin`) |
| `fa-times` | 4 | 13 | 17 | `X` |
| `fa-play` | 4 | 12 | 16 | `Play` |
| `fa-user-plus` | 6 | 10 | 16 | `UserPlus` |
| `fa-hourglass-end` | 1 | 15 | 16 | `Hourglass` |
| `fa-user` | 4 | 10 | 14 | `User` |
| `fa-cube` | 0 | 14 | 14 | `Box` |
| `fa-check-square-o` | 1 | 13 | 14 | `CheckSquare` |
| `fa-hospital-o` | 0 | 12 | 12 | `Building2` |
| `fa-share` | 0 | 9 | 10 | `Share` |
| `fa-plus-circle` | 0 | 10 | 10 | `PlusCircle` |
| `fa-cloud-upload` | 2 | 7 | 9 | `CloudUpload` |
| `fa-search` | 7 | 1 | 8 | `Search` |
| `fa-info-circle` | 2 | 8 | 8 | `Info` |
| `fa-edit` | 3 | 5 | 8 | `Edit` |
| `fa-user-secret` | 7 | 6 | 7 | `UserX` |
| `fa-sticky-note-o` | 7 | 0 | 7 | `StickyNote` |
| `fa-sticky-note` | 7 | 0 | 7 | `StickyNote` |
| `fa-times-circle` | 0 | 7 | 7 | `XCircle` |
| `fa-file-o` | 0 | 6 | 6 | `File` |
| `fa-clock-o` | 0 | 6 | 6 | `Clock` |
| `fa-bell` | 3 | 3 | 6 | `Bell` |
| `fa-user-circle-o` | 5 | 0 | 5 | `UserCircle` |
| `fa-font` | 5 | 0 | 5 | `Type` |
| `fa-lightbulb` | 0 | 5 | 5 | `Lightbulb` |
| `fa-exclamation` | 3 | 2 | 5 | `AlertCircle` |
| `fa-eye` | 3 | 0 | 3 | `Eye` |
| `fa-camera` | 3 | 0 | 3 | `Camera` |
| `fa-edge` | 3 | 0 | 3 | (no equivalente — custom) |
| `fa-remove` | 3 | 0 | 3 | `X` (alias de fa-times) |

*(+28 iconos con 1-2 usos cada uno — ver apendice)*

### 6.2 Modificadores Font Awesome

| Modificador | Usos Views | Usos JS/TS |
| --- | --- | --- |
| `fa-lg` | 447 | 212 |
| `fa-fw` | 3 | 287 |
| `fa-spin` | 5 | 250 |
| `fa-2x` | 3 | 48 |
| `fa-3x` | 3 | 21 |
| `fa-xs` | 1 | 168 |
| `fa-1x` | 1 | — |
| `fa-stack` | 2 | — |
| `fa-stack-2x` | 3 | — |

**Total iconos unicos:** 76 (vs ~40 estimado en PRD padre — el conteo real es casi el doble porque JS/TS genera muchos iconos en templates de DataTables).

---

## 7. DATA ATTRIBUTES BOOTSTRAP (Dependencias JS)

Estos atributos requieren JavaScript de Bootstrap para funcionar. Deben reemplazarse con JS nativo o eliminarse.

| Atributo | Valor | Usos | Migracion |
| --- | --- | --- | --- |
| `data-toggle="tooltip"` | — | 314 | Tippy.js o CSS-only tooltip |
| `data-placement="bottom"` | — | 139 | Parametro de Tippy.js |
| `data-placement="left"` | — | 26 | Parametro de Tippy.js |
| `data-dismiss="modal"` | — | 133 | `<dialog>.close()` nativo |
| `data-toggle="tab"` | — | 97 | JS nativo: `addEventListener('click')` |
| `data-dismiss="alert"` | — | 39 | `el.remove()` nativo |
| `data-toggle="dropdown"` | — | 35 | JS nativo: toggle visibility |
| `data-toggle="collapse"` | — | 21 | JS nativo: toggle `tw:hidden` |
| `data-parent="#accordion"` | — | 14 | JS nativo: accordion logic |
| `data-trigger="hover"` | — | 5 | Parametro de Tippy.js |
| `data-target="#navbarCollapse"` | — | 4 | JS nativo: querySelector |
| `data-ride="carousel"` | — | 2 | JS nativo o libreria ligera |
| `data-toggle="modal"` | — | 1 | `<dialog>.showModal()` nativo |

**Total data attributes:** 830 ocurrencias que requieren JS de Bootstrap.

**Estrategia:** Tooltips (314 + 139 + 26 + 5 = 484 attrs) representan el 58% del total. Migrar tooltips a Tippy.js (~3 KB) o CSS-only elimina la mayor dependencia.

---

## 8. CLASES DINAMICAS (Manipulacion JS/TS)

### 8.1 jQuery addClass/removeClass (Legacy JS)

| Clase | addClass | removeClass | Total | Notas |
| --- | --- | --- | --- | --- |
| `d-none` | ~158 | ~127 | 285 | Clase mas manipulada |
| `active` | ~12 | ~12 | 24 | Toggle de estado |
| `selected` | ~10 | ~10 | 20 | Seleccion en tabla |
| `visible-lg-block` | ~18 | — | 18 | BS3 legacy |
| `table-responsiveX` | ~18 | — | 18 | Disable pattern (suffix X) |
| `btn-warning` | ~5 | ~5 | 10 | Toggle color de boton |
| `btn-success` | ~5 | ~5 | 10 | Toggle color de boton |
| `btn-danger` | ~5 | ~5 | 10 | Toggle color de boton |
| `btn-orange` | ~5 | ~4 | 9 | Custom FMCamps |
| `btn-primary` | ~4 | ~4 | 8 | Toggle color de boton |
| `show` | ~1 | ~1 | 2 | Modal visibility |
| `modal-open` | ~2 | ~1 | 3 | Body scroll lock |

### 8.2 classList API (TypeScript)

| Clase | Operacion | Usos | Archivo |
| --- | --- | --- | --- |
| `drag-over` | add/remove | 3 | gestor-archivos |
| `d-none` | add/remove | 3 | varios features |
| `text-success` | add | 2 | feedback |
| `text-warning` | add | 1 | feedback |
| `text-danger` | add | 1 | feedback |
| `text-muted` | add | 1 | feedback |

### 8.3 Templates HTML en JavaScript (clase en template literal)

Las clases mas frecuentes generadas dinamicamente en JS:

| Clase | Usos en templates | Contexto |
| --- | --- | --- |
| `fa` | 732 | Iconos en DataTables renders |
| `fa-fw` | 287 | Iconos fixed-width |
| `fa-spin` | 250 | Spinner animado |
| `btn` | 239 | Botones en DataTables |
| `badge` | 221 | Badges en DataTables |
| `fa-xs` | 168 | Iconos extra-small |
| `btn-circle` | 150 | Botones circulares DT |
| `showTools` | 101 | Toggle toolbar |
| `btn-lg` | 80 | Botones grandes |
| `sr-only` | 74 | Screen reader text |
| `dropdown-item` | 70 | Items de dropdown en DT |

**Hallazgo critico:** Los templates de DataTables en JS generan ~2,500 usos de clases BS4. Estos templates deben actualizarse a clases Tailwind cuando se migre la capa visual.

---

## 9. RANKING DE COMPLEJIDAD POR VISTA

Top 20 vistas por cantidad de atributos `class=`:

| # | Vista | Class attrs | Prioridad migracion |
| --- | --- | --- | --- |
| 1 | `Informes/Index.cshtml` | 684 | Alta (mas compleja) |
| 2 | `Ordenes/_OrdenesModales.cshtml` | 380 | Alta (modales compartidos) |
| 3 | `Movimientos/Index.cshtml` | 252 | Media |
| 4 | `Ordenes/Index.cshtml` | 225 | Alta |
| 5 | `Ordenes/Mp.cshtml` | 223 | Media |
| 6 | `Ordenes/Ma.cshtml` | 220 | Media |
| 7 | `Ordenes/Mc.cshtml` | 217 | Media |
| 8 | `Movimientos/Salida.cshtml` | 193 | Media |
| 9 | `Ordenes/Mcss.cshtml` | 182 | Media |
| 10 | `Ordenes/Reot.cshtml` | 173 | Media |
| 11 | `Materiales/Index.cshtml` | 169 | Media |
| 12 | `Equipos/_EquipoModales.cshtml` | 167 | Media |
| 13 | `Documentos/Index.cshtml` | 153 | Media |
| 14 | `Ordenes/Cierre.cshtml` | 150 | Media |
| 15 | `Configuraciones/_ConfiguracionesModales.cshtml` | 149 | Baja |
| 16 | `Vehiculos/Index.cshtml` | 145 | Media |
| 17 | `Ordenes/Cmp.cshtml` | 132 | Media |
| 18 | `Ordenes/Cma.cshtml` | 131 | Media |
| 19 | `Ordenes/Cmc.cshtml` | 131 | Media |
| 20 | `Ordenes/Backlog.cshtml` | 121 | Media |

**Patron:** Las vistas de Ordenes dominan (10 de las top 20). Modales compartidos (`_OrdenesModales`, `_EquipoModales`) concentran alta densidad de markup.

**Recomendacion:** Migrar primero las vistas de menor complejidad (Error, Start, Account) como PoC, luego las de alta complejidad.

---

## 10. CLASES LEGACY BS3 (Migrar ANTES de Tailwind)

Estas clases pertenecen a Bootstrap 3 y no tienen equivalente en BS4 ni Tailwind. Deben limpiarse primero:

| Clase BS3 | Usos | Equivalente BS4 | Equivalente Tailwind v4 |
| --- | --- | --- | --- |
| `panel` | 10 | `card` | `tw:rounded-lg tw:border tw:shadow-sm` |
| `panel-body` | 11 | `card-body` | `tw:p-4` |
| `panel-collapse` | 11 | `collapse` | JS-driven toggle |
| `panel-default` | 10 | `card` | `tw:border-gray-200` |
| `panel-group` | 8 | `accordion` | Custom accordion |
| `panel-heading` | 2 | `card-header` | `tw:px-4 tw:py-3 tw:border-b` |
| `hidden-xs` | 10 | `d-none d-sm-block` | `tw:hidden sm:tw:block` |
| `visible-xs-block` | 5 | `d-block d-sm-none` | `tw:block sm:tw:hidden` |
| `visible-lg-block` | 1 (+18 JS) | `d-none d-lg-block` | `tw:hidden lg:tw:block` |
| `hidden-sm` | 1 | `d-none d-md-block` | `tw:hidden md:tw:block` |
| `pull-right` | 7 | `float-right` | `tw:float-right` |
| `pull-left` | 2 | `float-left` | `tw:float-left` |
| `input-group-addon` | 9 | `input-group-text` | `tw:px-3 tw:py-2 tw:bg-gray-100 tw:border` |
| `input-group-btn` | 8 | `input-group-append` | `tw:flex` |
| `btn-large` | 6 | `btn-lg` | `tw:px-6 tw:py-3 tw:text-lg` |
| `btn-default` | 2 | `btn-outline-secondary` | `tw:border tw:border-gray-300` |
| `icon-white` | 20 | — | `tw:text-white` (era Glyphicons) |
| `icon-asterisk` | 6 | — | Lucide `Asterisk` o `fa-asterisk` |
| `icon-bar` | 3 | `navbar-toggler-icon` | `tw:block tw:w-6 tw:h-0.5 tw:bg-gray-600` |
| `navbar-fixed-top` | 6 | `fixed-top` | `tw:fixed tw:top-0 tw:inset-x-0 tw:z-50` |
| `navbar-toggle` | 1 | `navbar-toggler` | `tw:lg:hidden tw:p-2` |
| `input-append` | 6 | `input-group-append` | `tw:flex` |
| `tabbable` | 44 | — (removido en BS4) | Eliminar (no tiene efecto) |

**Total legacy BS3:** 22 clases, ~200 usos en Views + ~18 en JS. (`tabbable` contribuye 44 usos solo — es la mas inflada pero la mas trivial de eliminar.)

**Accion recomendada:** Crear un PR de limpieza BS3 → BS4 ANTES de iniciar la migracion Tailwind. Esto reduce complejidad y evita migrar dos saltos (BS3→Tailwind).

---

## 11. ROADMAP DE MIGRACION

### 11.1 Prerequisitos (alineado con PRD padre F1.4)

**Instalar Tailwind v4 en SaaSMono:**

```bash
cd src/FMC.SaaSMono.Web
npm i tailwindcss @tailwindcss/postcss
```

**Crear entry point CSS, PostCSS config, y content paths:** Ver seccion 12 para la configuracion completa propuesta.

### 11.2 Fases de Migracion

#### Fase 0 — Kitchen Sink como sandbox de validacion

**Duracion:** 3-5 dias
**Riesgo:** Nulo (entorno aislado, sin impacto en produccion)
**Estado:** Paso 0a completado (2026-03-08) — coexistencia BS4 + Tailwind validada

El kitchen sink Astro (`site/`) tiene 12 paginas que cubren todas las categorias de componentes del inventario. Migrar esta superficie primero permite validar la configuracion Tailwind v4, el prefijo `tw:`, la coexistencia con `light-dark()`, y producir equivalentes Tailwind verificados antes de tocar las 81 Views de produccion.

| Pagina Kitchen Sink | Seccion PRD | Fase produccion | Valor como PoC |
| --- | --- | --- | --- |
| `tokens.astro` | CSS vars → `@theme` | Setup | Valida config `@theme` + `prefix(tw)` |
| `buttons.astro` | §4.4 Botones | C | Valida 15 variantes de boton |
| `forms.astro` | §4.5 Formularios | D | Valida `form-group`/`form-control` sin backend |
| `tables.astro` | §4.6 Tablas | D | Valida tabla estatica (sin DataTables) |
| `cards.astro` | §4.7 Cards | D | Valida card layout completo |
| `modals.astro` | §4.8 Modales | D | Valida migracion a `<dialog>` nativo |
| `alerts.astro` | §4.10 Alertas | C | Valida 4 variantes de alerta |
| `navigation.astro` | §4.9 Navegacion | D | Valida navbar + tabs + dropdowns |
| `feedback.astro` | §4.11 Badges + spinners | C | Valida badges + toasts |
| `media.astro` | §4.14-4.15 Bordes/fondos | B | Valida utilities visuales |
| `dark-theme.astro` | Dark mode | Transversal | Valida `light-dark()` + `dark:` coexistencia |
| `index.astro` | Layout general | E | Valida grid + estructura |

**Entregables Fase 0:**

1. ~~Instalar Tailwind v4 en `site/`~~ — ✅ `@tailwindcss/vite` v4.2.1 + `tailwindcss` v4.2.1 en `site/package.json`
2. ~~Crear `site/src/styles/tailwind.css`~~ — ✅ `@import "tailwindcss" prefix(tw)` + `@theme { --spacing: 0.25rem; }`
3. ~~Migrar cada pagina del kitchen sink de clases BS4 a `tw:*`, manteniendo BS4 cargado como fallback (doble-carga)~~ — ✅ 12 paginas + 4 componentes con `tw:*` additive (BS4 preservado)
4. ~~Comparar visualmente contra las 48 baselines existentes~~ — ✅ 48/48 tests pasan (0 diff visual)
5. Remover la carga de `fmcamps.css` del kitchen sink y verificar que Tailwind-only produce el mismo resultado — **pendiente (Paso 0b)**
6. ~~Actualizar las 48 baselines Playwright~~ — ✅ `npm run test-visual-update` ejecutado
7. ~~Documentar mapping final validado~~ — ✅ `docs/refactoring/tailwind-class-mapping.md`

**Paso 0a (completado 2026-03-08):** Coexistencia validada. Tailwind v4 instalado con `prefix(tw)`, 12 paginas + 4 componentes migradas con clases `tw:*` junto a BS4. Los 48 visual regression tests pasan sin diferencias. Mapping BS4→Tailwind documentado. Tambien se creo `site/src/styles/fmcamps-custom.css` con design tokens + clases custom extraidas como referencia para Fase B.

**Paso 0b (pendiente):** Remover `fmcamps.css` del kitchen sink, reemplazar clases BS4 de componentes (btn-*, card-*, table-*, etc.) con equivalentes Tailwind, y verificar rendering Tailwind-only. Esto requiere resolver componentes complejos (modales, navbar con JS, formularios) que no tienen equivalente 1:1 en utilities.

**Safety net:** Los 48 visual regression tests (4 projects: desktop/mobile × light/dark) actuan como gate automatico. Despues de Fase 0, las baselines reflejan el rendering Tailwind — cualquier regresion en fases posteriores se detecta automaticamente.

#### Fase A — Limpieza BS3 (prerequisito)

**Duracion:** 1-2 dias
**Riesgo:** Bajo

| Accion | Clases | Usos | Complejidad |
| --- | --- | --- | --- |
| `panel*` → `card*` | 6 clases | 52 | Baja |
| `hidden-*`/`visible-*` → `d-*` | 4 clases | 17 | Baja |
| `pull-*` → `float-*` | 2 clases | 9 | Baja |
| `input-group-addon/btn` → BS4 | 2 clases | 17 | Baja |
| Remover `tabbable` (sin efecto) | 1 clase | 44 | Trivial |
| `btn-large` → `btn-lg` | 1 clase | 6 | Trivial |
| `icon-*` → `fa-*` o eliminar | 3 clases | 29 | Baja |

#### Fase B — Utilities directas (menor riesgo)

**Duracion:** 2-3 semanas (mapeo 1:1, pero ~1,800 usos en 81 Views + JS/TS requieren testing vista por vista)
**Riesgo:** Bajo — mapeo 1:1

| Categoria | Clases | Usos | Complejidad |
| --- | --- | --- | --- |
| Spacing (`m*-*`, `p*-*`) | ~40 | ~700 | Baja (⚠️ escala no-lineal, ver §4.13) |
| Display (`d-none`, `d-flex`, etc.) | ~15 | ~700 | Baja |
| Text (`text-center`, `text-muted`, etc.) | ~15 | ~200 | Baja |
| Borders/Shadows | ~10 | ~100 | Baja |
| Position (`sticky-top`, `position-*`) | ~6 | ~100 | Baja |

#### Fase C — Componentes simples

**Duracion:** 2-3 semanas (badges y botones tienen alto volumen en templates JS de DataTables)
**Riesgo:** Medio

| Categoria | Clases | Usos | Complejidad |
| --- | --- | --- | --- |
| Badges | ~8 | ~350 (Views+JS) | Media (templates JS) |
| Alertas | ~6 | ~180 | Baja |
| Botones (variantes) | ~15 | ~1,500 | Media (muchas variantes) |

#### Fase D — Componentes complejos

**Duracion:** 4-6 semanas (forms: 749 form-group + 637 form-control; modals: coordinar con F2.3 dialog nativo; nav: depende de JS Bootstrap)
**Riesgo:** Alto — requiere JS changes

| Categoria | Clases | Usos | Complejidad |
| --- | --- | --- | --- |
| Forms (`form-group`, `form-control`) | ~15 | ~1,500 | Alta (749 form-group) |
| Tablas + DataTables adapter | ~6 | ~200 | Alta (adapter _common.js) |
| Cards | ~6 | ~150 | Media |
| Navigation (navbar, tabs, dropdowns) | ~20 | ~800 | Alta (JS dependencies) |
| Modales → `<dialog>` | ~10 | ~700 | Alta (coordinar con F2.3) |

#### Fase E — Layout/Grid

**Duracion:** 3-4 semanas (1,600 usos de grid afectan la estructura visual de todas las vistas)
**Riesgo:** Alto — impacta toda la estructura visual

| Categoria | Clases | Usos | Complejidad |
| --- | --- | --- | --- |
| Grid (`row`, `col-*`) | ~25 | ~1,600 | Alta (370 rows + ~1,200 cols) |

#### Fase F — Cleanup Final

**Duracion:** 2-3 semanas (Font Awesome → Lucide: 76 iconos, ~1,400 cambios de markup icon-font → SVG; DT adapter: 118 lineas)
**Riesgo:** Medio

| Accion | Detalle |
| --- | --- |
| Remover BS4 CSS | Eliminar `fmcamps.css` y `fmcamps.min.css` |
| Remover BS4 JS | Eliminar `bootstrap.bundle.min.js` |
| Migrar DataTables adapter | Crear adapter Tailwind custom (reemplazar 118 lineas) |
| Migrar `app1.css` custom properties | Mover a `@theme` de Tailwind |
| Actualizar Service Worker | Nuevos bundles en pre-cache |
| Actualizar Font Awesome → Lucide | 76 iconos → SVG tree-shaked |

### 11.3 Matriz de Prioridad

| Fase | Categoria | Clases | Usos | Complejidad | Duracion | Fase PRD padre |
| --- | --- | --- | --- | --- | --- | --- |
| **0** | **Kitchen Sink sandbox** | **todas** | **12 paginas** | **Nula** | **3-5 dias** | **Pre-F1.4** |
| A | BS3 Legacy | 22 | ~200 | Baja | 1-2 dias | Pre-F1.4 |
| B | Spacing | 40 | 700 | Baja (⚠️ no-lineal) | 2-3 sem | F3.3 |
| B | Display/Visibility | 15 | 700 | Baja | (incl.) | F3.3 |
| B | Typography | 15 | 200 | Baja | (incl.) | F3.3 |
| B | Borders/Shadows/Position | 16 | 200 | Baja | (incl.) | F3.3 |
| C | Badges | 8 | 350 | Media | 2-3 sem | F3.3 |
| C | Alerts | 6 | 180 | Baja | (incl.) | F3.3 |
| C | Buttons | 15 | 1,500 | Media | (incl.) | F3.3 |
| D | Forms | 15 | 1,500 | Alta | 4-6 sem | F3.3 |
| D | Tables + DT | 6 | 200 | Alta | (incl.) | F4.2 |
| D | Cards | 6 | 150 | Media | (incl.) | F3.3 |
| D | Navigation | 20 | 800 | Alta | (incl.) | F3.3 |
| D | Modals | 10 | 700 | Alta | (incl.) | F2.3 + F3.3 |
| E | Grid (row/col) | 25 | 1,600 | Alta | 3-4 sem | F3.3 |
| F | Cleanup + FA→Lucide | — | ~1,400 | Media | 2-3 sem | F4.3 |

**Estimacion total realista: 14-20 semanas (~3.5-5 meses).** Las fases no son paralelizables porque cada una depende de la anterior para evitar regresiones.

---

## 12. CONFIGURACION TAILWIND v4 PROPUESTA

### 12.1 Ownership del build CSS

> **Clarificacion:** La compilacion Tailwind vive en el repo **SaaSMono** (no en bootstrapSaaSMono), porque Tailwind necesita escanear los content sources (Views, JS, TS) para hacer purge. Este repo (bootstrapSaaSMono) solo genera `fmcamps.css` (BS4) que coexiste durante la transicion y se elimina en Fase F.
>
> El kitchen sink (`site/`) tiene su propio build Tailwind independiente para validacion (Fase 0).

### 12.2 Entry Point CSS (SaaSMono)

```css
/* wwwroot/css/tailwind.css */
@import "tailwindcss" prefix(tw);

/* Content sources para Razor Views */
@source "../Views/**/*.cshtml";
@source "../wwwroot/ts/**/*.ts";
@source "../wwwroot/static/scriptsbl/**/*.js";

@theme {
  /* === NO definir colores aqui === */
  /* Los colores FMCamps usan light-dark() en :root, */
  /* se referencian directamente: tw:bg-(--cyan-fmc) */

  /* === Spacing base (alineado con BS4 0.25rem) === */
  --spacing: 0.25rem;

  /* === Shadows === */
  --shadow-soft: 0 2px 8px rgba(0, 0, 0, 0.08);
}
```

> **Decision critica sobre colores y dark mode:**
>
> FMCamps define colores con `light-dark()` en `:root` (ej: `--cyan-fmc: light-dark(#2084ff, #53cfff)`). Hay dos estrategias:
>
> | Estrategia | Sintaxis | Dark mode | Ventaja | Desventaja |
> | --- | --- | --- | --- | --- |
> | A: `@theme` estatica | `tw:bg-(--cyan-fmc)` | Requiere `dark:tw:bg-[#53cfff]` manual | Utilities con nombre, autocompletado IDE | Duplica los valores dark en cada uso |
> | B: CSS vars directas | `tw:bg-(--cyan-fmc)` | Automatico via `light-dark()` | Zero duplicacion, dark mode gratis | Sin autocompletado, nombres mas largos |
>
> **Recomendacion:** Usar **Estrategia B** (`tw:bg-(--cyan-fmc)`) para colores de marca que ya tienen `light-dark()`. Reservar `@theme` para valores que no cambian con el tema (spacing, shadows, breakpoints). Esto evita duplicar la logica dark/light en cada elemento HTML y mantiene la fuente unica de verdad en `_variables.scss`.

### 12.3 Dark Mode

FMCamps ya usa `prefers-color-scheme` con CSS `light-dark()`. Tailwind v4 soporta esto nativamente:

```css
/* Dark mode automatico (prefers-color-scheme) — NO requiere configuracion adicional */
/* Las utilities dark: funcionan automaticamente */
```

Si en el futuro se necesita control manual (toggle button):

```css
@custom-variant dark (&:where(.dark, .dark *));
```

### 12.4 PostCSS Config

```js
// postcss.config.js
export default {
  plugins: ["@tailwindcss/postcss"],
};
```

### 12.5 Integracion con Build existente

El proyecto usa esbuild. Tailwind v4 puede integrarse de dos formas:

**Opcion A — CLI standalone (recomendada para inicio):**

```json
{
  "scripts": {
    "css:tailwind": "npx @tailwindcss/cli -i wwwroot/css/tailwind.css -o wwwroot/css/tailwind.out.css --minify"
  }
}
```

**Opcion B — PostCSS plugin (si se adopta Vite en F1.1):**

Integrado automaticamente via `postcss.config.js`.

---

## 13. RIESGOS Y MITIGACIONES

| Riesgo | Impacto | Probabilidad | Mitigacion |
| --- | --- | --- | --- |
| DataTables BS4 adapter (118 lineas en `_common.js`) | Alto | Alta | Crear adapter Tailwind custom antes de Fase F |
| Third-party overrides (37 `!important` en Select2/DT/DRP) | Medio | Alta | F2.1-F2.2 reemplazan Select2 y DRP; DT overrides se mantienen |
| Clases BS3 legacy mezcladas | Medio | Alta | Fase A: limpiar BS3 antes de empezar |
| Colision de clases BS4 + Tailwind | Medio | Baja | `prefix(tw)` previene colisiones |
| `d-none` manipulado en 285 lugares JS | Alto | Media | `tw:hidden` funciona identicamente con classList |
| Templates JS de DataTables (2,500+ clases) | Alto | Alta | Crear objeto mapping centralizado (ver §13.1); migrar templates en Fase C-D |
| Visual regression | Alto | Media | 48 baselines Playwright en bootstrapSaaSMono; crear E2E tests en SaaSMono |
| `form-group` (749 usos) sin equivalente directo | Medio | Alta | Reemplazar por `tw:mb-4` o `tw:space-y-4` en form containers |
| Rollback en produccion | Alto | Media | Doble-carga CSS (BS4 + Tailwind) durante transicion; kill-switch via feature flag (ver §13.2) |
| 830 `data-*` attrs que dependen de Bootstrap JS | Alto | Alta | Tooltips (484 attrs, 58%) → Tippy.js; modals → `<dialog>`; tabs/dropdowns/collapse → JS nativo (ver §13.3) |
| Font Awesome → Lucide (76 iconos, ~1,400 cambios) | Medio | Alta | Migrar en Fase F dedicada, no como "cleanup"; requiere cambio de icon-font a SVG inline/componente |

### 13.1 Estrategia para templates JS de DataTables

Los ~2,500 usos de clases BS4 en template literals de JS (`_common.js`, renders de DataTables) no se pueden migrar con find-and-replace porque las clases estan interpoladas en strings HTML.

**Solucion propuesta:** Crear un objeto mapping centralizado que los templates consuman:

```js
// css-classes.js — fuente unica de verdad para clases CSS en templates JS
export const CSS = {
  btn:        'tw:inline-flex tw:items-center tw:px-4 tw:py-2 tw:rounded tw:font-medium',
  btnCircle:  'tw:rounded-full tw:w-8 tw:h-8 tw:p-0',
  btnPrimary: 'tw:bg-(--cyan-fmc) tw:text-white hover:tw:bg-(--orange-fmc)',
  btnDanger:  'tw:bg-(--danger-fmc) tw:text-white',
  badge:      'tw:inline-flex tw:items-center tw:px-2 tw:py-0.5 tw:text-xs tw:font-medium tw:rounded-full',
  // ... etc
};

// Uso en template:
`<button class="${CSS.btn} ${CSS.btnCircle} ${CSS.btnDanger}">...</button>`
```

Esto permite migrar una vez en el mapping y que todos los templates se actualicen automaticamente. Tambien facilita rollback (cambiar el mapping de vuelta a clases BS4).

### 13.2 Estrategia de rollback

Durante la transicion, ambos CSS (BS4 + Tailwind) se cargan simultaneamente. El prefijo `tw:` garantiza cero colision.

**Kill-switch:** En `_Layout.cshtml`, cargar ambos CSS condicionalmente:

```html
<!-- Siempre presente durante transicion -->
<link rel="stylesheet" href="/css/fmcamps.min.css" />
<link rel="stylesheet" href="/css/tailwind.out.css" />

<!-- Kill-switch: si Tailwind rompe algo, remover tailwind.out.css y las clases tw: se ignoran silenciosamente -->
```

Dado que `prefix(tw)` hace que todas las clases Tailwind empiecen con `tw:`, remover el CSS de Tailwind solo deja clases `tw:*` sin efecto en el HTML — no rompe nada, solo pierde el styling nuevo. Esto permite rollback instantaneo sin tocar markup.

> **⚠️ Condicion critica:** Este rollback solo funciona si las clases BS4 se **mantienen en el markup** durante toda la transicion (Fases B-E). La estrategia es **additive-first**: agregar clases `tw:*` junto a las clases BS4 existentes. Solo en Fase F (cleanup final), cuando todo esta validado, se remueven las clases BS4 del markup. Si se remueven clases BS4 antes de Fase F, el rollback por kill-switch no es posible para esos elementos.

### 13.3 Esfuerzo JS/TS para reemplazo de Bootstrap JS

El PRD se enfoca en clases CSS pero 830 `data-*` attributes requieren JS nuevo:

| Componente BS JS | Attrs | Usos | Reemplazo | Esfuerzo JS estimado |
| --- | --- | --- | --- | --- |
| Tooltips | `data-toggle="tooltip"` + placement + trigger | 484 | Tippy.js (~3 KB) — init centralizado | Bajo (1 init global) |
| Modals | `data-dismiss="modal"`, `data-toggle="modal"` | 134 | `<dialog>` nativo — coordinar con F2.3 | Alto (86 modales) |
| Tabs | `data-toggle="tab"` | 97 | JS nativo: `addEventListener('click')` + toggle `tw:hidden` | Medio (44 tab groups) |
| Alerts | `data-dismiss="alert"` | 39 | `el.closest('.alert').remove()` — trivial | Bajo |
| Dropdowns | `data-toggle="dropdown"` | 35 | JS nativo: toggle visibility + click-outside | Medio |
| Collapse/Accordion | `data-toggle="collapse"` + parent | 35 | JS nativo: toggle + `<details>` nativo donde aplique | Medio |
| Carousel | `data-ride="carousel"` | 2 | Libreria ligera o CSS-only | Bajo |

**Total:** ~830 attrs. Tooltips (58%) se resuelven con un unico init global de Tippy.js. El resto requiere ~200-300 lineas de JS nativo distribuidas en modulos.

---

## 14. CRITERIOS DE ACEPTACION

### 14.1 Gate Fase 0 (Kitchen Sink) — debe cumplirse ANTES de avanzar a produccion

#### 14.1a Gate Paso 0a — Coexistencia (✅ completado 2026-03-08)

| Criterio | Metrica | Estado |
| --- | --- | --- |
| Tailwind v4 instalado en `site/` | `@import "tailwindcss" prefix(tw)` funcional en Astro | ✅ |
| 12 paginas con `tw:*` utilities | Clases `tw:*` junto a BS4 en 12 paginas + 4 componentes | ✅ |
| 0 regresiones visuales | 48/48 Playwright tests pasan | ✅ |
| Baselines actualizadas | `npm run test-visual-update` ejecutado | ✅ |
| Mapping BS4→Tailwind documentado | `docs/refactoring/tailwind-class-mapping.md` | ✅ |

#### 14.1b Gate Paso 0b — Tailwind-only (pendiente)

| Criterio | Metrica | Estado |
| --- | --- | --- |
| 0 clases BS4 en `.astro` files | Solo `tw:*` + clases FMCamps custom | Pendiente |
| `fmcamps.css` removido del kitchen sink | Tailwind-only produce resultado visual aceptable | Pendiente |
| `light-dark()` + CSS vars funcionan con Tailwind | Dark mode funcional, colores de marca correctos | Pendiente |
| Componentes BS4 reemplazados | btn-*, card-*, table-*, alert-*, modal-*, nav-* con Tailwind | Pendiente |

### 14.2 Gate Final (Produccion)

| Criterio | Metrica |
| --- | --- |
| 0 clases BS4 en Views | `grep -r 'class="' Views/ \| grep -v 'tw:'` retorna 0 |
| 0 clases BS3 legacy | Eliminadas en Fase A |
| Bundle CSS < 15 KB gzip | Tailwind purged |
| Dark mode funcional | `prefers-color-scheme: dark` sin regresion |
| DataTables funcional | Adapter Tailwind custom, paginacion/filtros OK |
| Tooltips funcionales | Tippy.js reemplaza `data-toggle="tooltip"` (484 attrs) |
| 0 dependencias Bootstrap JS | `bootstrap.bundle.min.js` removido; 830 `data-*` attrs migrados |
| Visual regression tests passing | 48 baselines bootstrapSaaSMono + E2E SaaSMono |
| Font Awesome removido | Lucide SVG tree-shaked (~2 KB vs 26 KB) |
| Templates JS migrados | Objeto mapping centralizado (`css-classes.js`) reemplaza clases BS4 en 2,500+ usos |

---

## 15. LECCIONES APRENDIDAS — FASE 0 (2026-03-08)

Hallazgos reales del sandbox que corrigen o matizan las suposiciones originales del PRD.

### 15.1 La escala de spacing NO es 1:1

**Suposicion original (§4.13):** "Spacing utilities tienen mapeo 1:1 directo con Tailwind."

**Realidad:** BS4 usa escala no-lineal (0, 0.25, 0.5, **1.0**, **1.5**, **3.0** rem) mientras que Tailwind v4 con `--spacing: 0.25rem` usa escala lineal (n × 0.25rem). Solo los niveles 0-2 coinciden. Los niveles 3-5 requieren mapeo explicito:

| BS4 | rem | Tailwind | Factor |
| --- | --- | --- | --- |
| `-3` | 1.0 | `tw:-4` | ×4 |
| `-4` | 1.5 | `tw:-6` | ×6 |
| `-5` | 3.0 | `tw:-12` | ×12 |

**Impacto en produccion:** ~170 usos de spacing niveles 3-5 en Views. Un find-and-replace ingenuo (m-3→tw:m-3) produciria 25% menos espacio del esperado. La tabla corregida esta en [tailwind-class-mapping.md](tailwind-class-mapping.md).

### 15.2 Additive-first es mas seguro que el PRD original sugeria

**Suposicion original:** Fase 0 incluia remover `fmcamps.css` y dejar solo Tailwind.

**Realidad:** El paso additive-first (tw:* junto a BS4) resulto valioso como paso intermedio por si solo. Permite validar la configuracion Tailwind, producir el mapping, y probar coexistencia con 0 riesgo. Intentar llegar a Tailwind-only en un solo paso requiere resolver componentes complejos (modales con JS, navbar, formularios) que no son simplemente utilidades. Se dividio Fase 0 en Paso 0a (coexistencia, completado) y Paso 0b (Tailwind-only, pendiente).

### 15.3 Integracion Tailwind v4 + Astro

**Hallazgo:** Para Astro v5, la integracion correcta es `@tailwindcss/vite` como plugin Vite — NO el antiguo `@astrojs/tailwind` (que era para Tailwind v3). La configuracion va en `astro.config.mjs`:

```js
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  vite: { plugins: [tailwindcss()] },
});
```

### 15.4 Referencias a variables CSS eliminadas persisten en templates

**Hallazgo:** `tokens.astro` referenciaba `var(--dark-color)` que fue eliminado en el fix M-5 (split en `--text-dark-mode` + `--surface-light`). El SCSS compilado no contenia la variable, pero el template HTML si la usaba via inline style.

**Leccion para produccion:** Cuando se renombren/eliminen CSS custom properties en `_variables.scss`, buscar en Views (`.cshtml`), JS/TS, y templates — no solo en SCSS. Comando: `grep -r "\-\-dark-color" Views/ ts/ scriptsbl/`.

### 15.5 El prefix `tw:` funciona perfectamente para coexistencia

**Confirmacion:** 48/48 visual regression tests pasaron con 0 diferencias al agregar clases `tw:*` junto a BS4. No se detecto ningun conflicto de especificidad entre BS4 y Tailwind con prefix. Esto valida la estrategia de rollback (§13.2): si Tailwind causa problemas en produccion, remover `tailwind.out.css` deja las clases `tw:*` sin efecto y BS4 sigue funcionando.

### 15.6 `fmcamps-custom.css` como puente de referencia

Se creo `site/src/styles/fmcamps-custom.css` con las CSS custom properties y clases FMCamps que sobreviviran la migracion (tokens, gradientes, blur, accept-button, labelConcentBanner). Este archivo NO se importa en Fase 0 — es una referencia para Fase B cuando se construya el entry point Tailwind con `@theme` mapeando los design tokens.

---

## Apendice A: Iconos FA con 1-2 usos

| Icono | Usos | Equivalente Lucide |
| --- | --- | --- |
| `fa-wrench` | 2 | `Wrench` |
| `fa-user-times` | 2 | `UserMinus` |
| `fa-sign-out` | 2 | `LogOut` |
| `fa-share-alt` | 2 | `Share2` |
| `fa-file-alt` | 2 | `FileText` |
| `fa-external-link-alt` | 2 | `ExternalLink` |
| `fa-cloud-download` | 1 | `CloudDownload` |
| `fa-certificate` | 2 | `Award` |
| `fa-ban` | 2 | `Ban` |
| `fa-whatsapp` | 1 | (no equiv — usar SVG inline) |
| `fa-warning` | 1 | `AlertTriangle` |
| `fa-undo` | 1 | `Undo` |
| `fa-terminal` | 1 | `Terminal` |
| `fa-shield` | 1 | `Shield` |
| `fa-send` | 1 | `Send` |
| `fa-save` | 1 | `Save` |
| `fa-repeat` | 1 | `Repeat` |
| `fa-random` | 1 | `Shuffle` |
| `fa-power-off` | 1 | `Power` |
| `fa-paper-plane` | 1 | `Send` |
| `fa-list-alt` | 1 | `List` |
| `fa-list` | 1 | `List` |
| `fa-link` | 1 | `Link` |
| `fa-key` | 1 | `Key` |
| `fa-id-badge` | 1 | `BadgeCheck` |
| `fa-flask` | 1 | `Flask` |
| `fa-cog` | 1 | `Settings` |
| `fa-code` | 1 | `Code` |
| `fa-chevron-down` | 1 | `ChevronDown` |
| `fa-check-double` | 1 | `CheckCheck` |
| `fa-calendar-check-o` | 1 | `CalendarCheck` |
| `fa-book` | 1 | `Book` |
| `fa-arrow-right` | 1 | `ArrowRight` |
| `fa-angle-down` | 1 | `ChevronDown` |
| `fa-bell-slash` | 1 | `BellOff` |

## Apendice B: Subdirectorios de Views

| Directorio | Archivos .cshtml | Descripcion |
| --- | --- | --- |
| Ordenes | ~15 | Ordenes de trabajo (mayor complejidad) |
| Movimientos | ~3 | Entradas/salidas de almacen |
| Equipos | ~5 | Gestion de equipos |
| Materiales | ~3 | Catalogo de materiales |
| Informes | ~2 | Generacion de informes (vista mas compleja: 684 attrs) |
| Configuraciones | ~3 | Configuracion del sistema |
| Personal | ~3 | Gestion de personal |
| Vehiculos | ~2 | Flota vehicular |
| Tomadedatos | ~3 | Toma de datos de campo |
| ListaMateriales | ~3 | Lista de materiales |
| Documentos | ~2 | Gestion documental |
| Habilitaciones | ~2 | Habilitaciones de personal |
| Importaciones | ~2 | Importacion de datos |
| Os | ~2 | Ordenes de servicio |
| Shared | ~5 | Layout, scripts, footer, modales compartidos |
| Account | ~3 | Login, perfil |
| App | ~2 | App shell |
| Error | ~2 | Paginas de error |
| Start | ~2 | Pagina de inicio |
| Notifications | ~1 | Centro de notificaciones |
| Hse | ~1 | Seguridad e higiene |
