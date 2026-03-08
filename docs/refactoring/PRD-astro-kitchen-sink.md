# PRD: Migración Hugo → Astro — Kitchen Sink del Design System FMCamps

> **Ubicación final:** `docs/refactoring/PRD-astro-kitchen-sink.md`

## 1. Contexto y Motivación

El repositorio bootstrapSaaSMono (fork de Bootstrap 4.6.2) incluye un sitio Hugo heredado de Bootstrap original con 333 archivos (150 páginas de documentación, layouts, shortcodes, data files). Este sitio **no documenta nuestro design system** — documenta Bootstrap genérico.

Tras la migración de app1.css a 31 parciales SCSS y la adopción de dart-sass, necesitamos un sitio de pruebas local que:

1. Muestre visualmente todos los componentes FMCamps en light y dark mode
2. Sirva como referencia viva del design system (kitchen sink)
3. Permita detectar regresiones visuales al modificar SCSS
4. Reemplace el sitio Hugo obsoleto con algo moderno y mantenible

## 2. Objetivo

Reemplazar el sitio Hugo por un sitio Astro estático (zero-JS) que funcione como **kitchen sink / playground visual** del design system FMCamps, cargando `fmcamps.css` + `app1.css` compilados.

### No-Goals

- NO migrar el contenido de documentación de Bootstrap (150 páginas markdown)
- NO crear un sistema de documentación generativo (tipo Storybook)
- NO incluir JavaScript interactivo (jQuery, DataTables JS, etc.) en la primera versión
- NO desplegar públicamente — es solo para desarrollo local

## 3. Arquitectura

### 3.1 Eliminación de Hugo

| Elemento                            | Acción                                                    |
| ----------------------------------- | --------------------------------------------------------- |
| `config.yml`                        | Eliminar                                                  |
| `site/layouts/`                     | Eliminar (49 archivos)                                    |
| `site/content/`                     | Eliminar (150 archivos)                                   |
| `site/data/`                        | Eliminar (12 YAML files)                                  |
| `site/static/`                      | Eliminar (imágenes, CNAME, favicons)                      |
| `site/assets/scss/`                 | Eliminar (SCSS del sitio Hugo)                            |
| `site/assets/js/`                   | Eliminar (JS del sitio Hugo)                              |
| `site/assets/css-fmcamps-saasmono/` | **Mover a `docs/reference-css/`** antes de eliminar       |
| `build/vnu-jar.js`                  | Eliminar                                                  |
| `hugo-bin` en package.json          | Eliminar dependencia                                      |
| `vnu-jar` en package.json           | Eliminar dependencia                                      |
| Scripts `docs-*` en package.json    | Eliminar todos                                            |
| `css-prefix-examples` script        | Eliminar (procesaba `site/content/**/*.css`)              |
| `.gitignore` entradas Hugo          | Eliminar (`/_site/`, `/resources/`, `/.hugo_build.lock`)  |
| `hugo-bin` config en package.json   | Eliminar bloque `"hugo-bin": { "buildTags": "extended" }` |

### 3.2 Estructura del sitio Astro

```text
site/                          # Raíz del sitio Astro (reusa la carpeta existente)
├── astro.config.mjs           # Configuración Astro
├── package.json               # Dependencias del sitio (solo astro)
├── tsconfig.json              # TypeScript config (minimal)
├── public/                    # Assets estáticos (copiados sin procesar)
│   ├── css/
│   │   ├── fmcamps.css        # Symlink o copia de dist/css/fmcamps.css
│   │   └── app1.css           # CSS residual del proyecto SaaSMono
│   └── fonts/                 # Font Awesome si se necesita
├── src/
│   ├── layouts/
│   │   └── Base.astro         # Layout base (head, nav, footer)
│   ├── components/
│   │   ├── Navbar.astro       # Navegación entre páginas
│   │   ├── Section.astro      # Wrapper de sección con título
│   │   ├── CodeExample.astro  # Muestra componente + su HTML
│   │   └── ThemeToggle.astro  # Toggle light/dark (script inline)
│   └── pages/
│       ├── index.astro        # Home — overview + links a todas las páginas
│       ├── tokens.astro       # Colores, tipografía, gradientes, variables CSS
│       ├── buttons.astro      # Todos los botones y variantes
│       ├── forms.astro        # Inputs, switches, readonly, validación
│       ├── tables.astro       # Tablas, striped, bordered, hover
│       ├── cards.astro        # Cards, accordion, jumbotron
│       ├── modals.astro       # Modales con diferentes contenidos
│       ├── alerts.astro       # Alertas por tipo (primary, danger, etc.)
│       ├── navigation.astro   # Navbar, nav-tabs, dropdowns, pagination
│       ├── feedback.astro     # Toasts, dialogs, spinners, badges
│       ├── media.astro        # Images, list-group, file uploader
│       └── dark-theme.astro   # Comparativa side-by-side light vs dark
```

### 3.3 Carga de CSS

```html
<!-- En Base.astro <head> -->
<link rel="stylesheet" href="/css/fmcamps.css" />
<link rel="stylesheet" href="/css/app1.css" />
```

Los CSS se cargan desde `public/css/` sin procesamiento de Astro — son archivos pre-compilados.

### 3.4 Scripts npm (en el package.json raíz)

```json
{
  "site-dev": "npm --prefix site run dev",
  "site-build": "npm --prefix site run build",
  "site-preview": "npm --prefix site run preview"
}
```

El sitio Astro tiene su propio `package.json` dentro de `site/` para aislar dependencias.

## 4. Páginas del Kitchen Sink

### 4.1 Home (`index.astro`)

- Overview del design system
- Links a todas las páginas de componentes
- Versión de Bootstrap, dart-sass, pipeline info

### 4.2 Tokens (`tokens.astro`)

- **Colores corporativos:** Swatches de `--cyan-fmc`, `--orange-fmc`, `--danger-fmc`, `--success-fmc`, `--warning-fmc`, `--blue-fmc`
- **Colores de superficie:** `--light-bg`, `--dark-bg`, `--light-color`, `--dark-color`, `--label-color`, `--border-color`
- **Tipografía:** html font-size (14px), label styles, .h6, .lead, .help-block
- **Gradientes:** `.bg-fmc1`, `.bg-fmc2`, `.bg-fmc3`, `.titulo`, `.tituloright`
- **Blur:** `.bg-black-blur`, `.bg-white-blur`, `.bg-blur`
- **Scrollbar:** Demo de scrollbar customizado

### 4.3 Buttons (`buttons.astro`)

- `.btn-primary`, `.btn-secondary`, `.btn-success`, `.btn-danger`, `.btn-warning`
- `.btn-orange`, `.btn-link`, `.btn-outline-*`
- `.accept-button` (large rounded CTA)
- `.btn-circle`, `.btn-circle2` (icon buttons)
- `.btn-group` con shadow
- `button.close`
- Estados: hover, focus, disabled, active

### 4.4 Forms (`forms.astro`)

- `.form-control` (normal, focus, disabled, readonly)
- `.form-control.readonly-state`
- `.form-control-left`, `.form-control-color`
- `.custom-switch` (toggle)
- `.custom-control-input` (checkbox/radio)
- `.invalid`, `.input-error`, `.error-message`
- `.filtrounico`
- `.headerForm`, `.styleId`
- `textarea` auto-resize
- `@keyframes pulse-border` animation demo

### 4.5 Tables (`tables.astro`)

- `.table` básica con thead/tbody
- `.table-striped` con light-dark
- `.table-bordered`
- `.table.transparente`
- `.table` con hover → `.showTools`
- `.modal-body-with-table`, `.card-body-with-table`

### 4.6 Cards (`cards.astro`)

- `.card` con light-dark background
- `.card .card-header` customizado
- `.card-footer` con border-radius
- `.accordion > .card`
- `.jumbotron`

### 4.7 Modals (`modals.astro`)

- `.modal-content` con border cyan/orange
- `.modal-header`, `.modal-body` (gradient), `.modal-footer`
- `.modal-header > h3`, `> h4`
- `.close` button con hover
- Nota: sin JavaScript, mostrar modals como bloques estáticos visibles

### 4.8 Alerts (`alerts.astro`)

- `.alert-primary`, `.alert-info`, `.alert-danger`, `.alert-warning`, `.alert-success`
- Light mode y dark mode side-by-side
- Border-left styling

### 4.9 Navigation (`navigation.astro`)

- `.navbar-dark` con nav-links y active states
- `.navbar-toggler`
- `.nav-tabs` con `.nav-link.active` (border orange)
- `.tab-content`
- `.dropdown-menu` con backdrop blur
- `.dropdown-item` estados (active, hover)
- `.page-link` pagination (orange)

### 4.10 Feedback (`feedback.astro`)

- `.toast-fmc-info` (estructura completa)
- `.dialog-fmc-success`, `.dialog-fmc-error`, `.dialog-fmc-warning`
- `.fa-spin` spinner
- `.badge-orange`, `.badge.badge-pill`

### 4.11 Media (`media.astro`)

- `.list-group-item` con light-dark
- `.list-group-item-action` hover
- `.efevidencia.thumbnail`, `.img-ef`
- `.gestor-archivos .upload-zone` (drag-drop area)
- `.gestor-archivos .progress-bar`
- `.gestor-archivos .attached-files-list`

### 4.12 Dark Theme (`dark-theme.astro`)

- Toggle para forzar `prefers-color-scheme: dark`
- Comparativa visual de componentes clave en ambos temas
- `.tituloright` dark variant
- `.btn-primary` dark variant
- `.alert` dark variants
- `.text-success`, `.text-danger` dark variants

## 5. Componentes Astro reutilizables

### `Base.astro` (Layout)

```text
<html> → <head> con CSS links → <body> con Navbar + <slot/> + footer
```

### `Navbar.astro`

- Links a todas las páginas del kitchen sink
- Indicador de página activa via `Astro.url.pathname`

### `Section.astro`

- Wrapper con `<section>`, título `<h2>`, descripción, y `<slot/>`
- Genera IDs para deep-linking

### `CodeExample.astro`

- Muestra el componente renderizado + el HTML fuente debajo
- Props: `title`, slot para HTML

### `ThemeToggle.astro`

- Botón que agrega/quita clase en `<html>` para forzar dark mode
- Usa `<script>` inline (Astro lo permite sin hidratación)

## 6. Implementación por fases

### Fase 1: Limpiar Hugo (1 commit)

1. Mover `site/assets/css-fmcamps-saasmono/` a `docs/reference-css/`
2. Eliminar `config.yml`
3. Eliminar `site/` completo
4. Eliminar `build/vnu-jar.js`
5. Limpiar package.json: scripts `docs-*`, `css-prefix-examples`, `start` (quitar docs-serve), dependencias `hugo-bin` + `vnu-jar`, config `hugo-bin`
6. Limpiar `.gitignore` (entradas Hugo)
7. `npm install` para actualizar lock file
8. Commit: "Remove Hugo site and related dependencies"

### Fase 2: Scaffold Astro (1 commit)

1. Crear `site/package.json` con astro como dependencia
2. Crear `site/astro.config.mjs`
3. Crear `site/tsconfig.json`
4. Crear `site/public/css/` con symlink o copia de `dist/css/fmcamps.css`
5. Crear `site/src/layouts/Base.astro`
6. Crear `site/src/components/Navbar.astro`
7. Crear `site/src/components/Section.astro`
8. Crear `site/src/pages/index.astro` (home con links)
9. Agregar scripts `site-dev`, `site-build`, `site-preview` al package.json raíz
10. Verificar `npm run site-dev` funciona
11. Commit: "Add Astro kitchen sink site scaffold"

### Fase 3: Páginas de componentes — Lote 1 (1 commit)

1. `tokens.astro` — colores, tipografía, gradientes
2. `buttons.astro` — todas las variantes
3. `forms.astro` — inputs, switches, validación
4. `tables.astro` — variantes de tablas
5. Commit: "Add kitchen sink pages: tokens, buttons, forms, tables"

### Fase 4: Páginas de componentes — Lote 2 (1 commit)

1. `cards.astro` — cards, accordion, jumbotron
2. `modals.astro` — modal structure estática
3. `alerts.astro` — todos los tipos
4. `navigation.astro` — navbar, tabs, dropdowns, pagination
5. Commit: "Add kitchen sink pages: cards, modals, alerts, navigation"

### Fase 5: Páginas de componentes — Lote 3 (1 commit)

1. `feedback.astro` — toasts, dialogs, spinners, badges
2. `media.astro` — list-group, images, file uploader
3. `dark-theme.astro` — comparativa light/dark
4. `CodeExample.astro` component
5. `ThemeToggle.astro` component
6. Commit: "Add kitchen sink pages: feedback, media, dark theme + components"

### Fase 6: Documentación y cleanup (1 commit)

1. Actualizar `docs/README.md` con referencia al sitio Astro
2. Actualizar `CLAUDE.md` con nuevos comandos (`site-dev`, etc.)
3. Actualizar MEMORY.md
4. Mover PRD a `docs/refactoring/PRD-astro-kitchen-sink.md`
5. Commit: "Update documentation for Astro kitchen sink site"

## 7. Archivos críticos a modificar

| Archivo                                      | Acción                                                             |
| -------------------------------------------- | ------------------------------------------------------------------ |
| `package.json` (raíz)                        | Eliminar deps Hugo, agregar scripts site-\*                        |
| `package-lock.json`                          | Regenerar                                                          |
| `.gitignore`                                 | Eliminar entradas Hugo, agregar `site/node_modules/`, `site/dist/` |
| `config.yml`                                 | Eliminar                                                           |
| `site/` (completo)                           | Eliminar y recrear con estructura Astro                            |
| `build/vnu-jar.js`                           | Eliminar                                                           |
| `CLAUDE.md`                                  | Actualizar comandos y arquitectura                                 |
| `docs/README.md`                             | Agregar referencia al kitchen sink                                 |
| `docs/reference-css/`                        | Crear (mover desde site/assets/css-fmcamps-saasmono/)              |
| `docs/refactoring/PRD-astro-kitchen-sink.md` | Crear este PRD                                                     |

## 8. Verificación

### Por fase

- **Fase 1:** `npm run css` sigue funcionando sin Hugo. `npm install` limpio.
- **Fase 2:** `npm run site-dev` levanta el servidor Astro. Home page carga con fmcamps.css.
- **Fases 3-5:** Cada página muestra los componentes correctamente en light + dark mode.
- **Fase 6:** Toda la documentación está actualizada.

### Checklist final

- [ ] `npm run css` — Pipeline CSS funciona
- [ ] `npm run site-dev` — Dev server Astro arranca
- [ ] Home page carga fmcamps.css (verificar en DevTools)
- [ ] Todas las 12 páginas renderizan componentes
- [ ] Light mode se ve correcto
- [ ] Dark mode se ve correcto (via prefers-color-scheme o toggle)
- [ ] `npm run site-build` genera sitio estático sin errores
- [ ] No quedan archivos Hugo en el repo
- [ ] package.json limpio de dependencias Hugo

## 9. Tracking

### Estado general

| Fase | Descripción                                | Estado         | Notas                                                 |
| ---- | ------------------------------------------ | -------------- | ----------------------------------------------------- |
| 1    | Limpiar Hugo                               | **Completado** | Commit previo                                         |
| 2    | Scaffold Astro                             | **Completado** | Base.astro, Section.astro, index.astro, Astro v5.18.0 |
| 3    | Páginas: tokens, buttons, forms, tables    | **Completado** | 4 páginas creadas                                     |
| 4    | Páginas: cards, modals, alerts, navigation | **Completado** | 4 páginas creadas                                     |
| 5    | Páginas: feedback, media, dark-theme       | **Completado** | 3 páginas + ThemeToggle + CodeExample                 |
| 6    | Documentación y cleanup                    | **Completado** | CLAUDE.md, docs/README.md, MEMORY.md actualizados     |

### Detalle por página

| Página             | Componentes                               | Estado         | Issues |
| ------------------ | ----------------------------------------- | -------------- | ------ |
| `index.astro`      | Overview, links                           | **Completado** |        |
| `tokens.astro`     | Colores, tipografía, gradientes, blur     | **Completado** |        |
| `buttons.astro`    | btn-\*, accept-button, circle, groups     | **Completado** |        |
| `forms.astro`      | form-control, switches, validación        | **Completado** |        |
| `tables.astro`     | table, striped, bordered, hover           | **Completado** |        |
| `cards.astro`      | card, accordion, jumbotron                | **Completado** |        |
| `modals.astro`     | modal-content, header, body, footer       | **Completado** |        |
| `alerts.astro`     | alert-primary/info/danger/warning/success | **Completado** |        |
| `navigation.astro` | navbar, tabs, dropdowns, pagination       | **Completado** |        |
| `feedback.astro`   | toasts, dialogs, spinners, badges         | **Completado** |        |
| `media.astro`      | list-group, images, gestor-archivos       | **Completado** |        |
| `dark-theme.astro` | Toggle, comparativa light/dark            | **Completado** |        |

### Componentes Astro

| Componente          | Propósito                 | Estado                                |
| ------------------- | ------------------------- | ------------------------------------- |
| `Base.astro`        | Layout base con CSS links | **Completado**                        |
| `Navbar.astro`      | Navegación entre páginas  | **Completado** (inline en Base.astro) |
| `Section.astro`     | Wrapper de sección        | **Completado**                        |
| `CodeExample.astro` | Preview + HTML source     | **Completado**                        |
| `ThemeToggle.astro` | Toggle light/dark mode    | **Completado**                        |

### Archivos eliminados (Hugo)

| Elemento                         | Archivos  | Estado        |
| -------------------------------- | --------- | ------------- |
| `config.yml`                     | 1         | **Eliminado** |
| `site/layouts/`                  | 49        | **Eliminado** |
| `site/content/`                  | 150       | **Eliminado** |
| `site/data/`                     | 12        | **Eliminado** |
| `site/static/`                   | ~50       | **Eliminado** |
| `site/assets/scss/`              | 18        | **Eliminado** |
| `site/assets/js/`                | 6         | **Eliminado** |
| `build/vnu-jar.js`               | 1         | **Eliminado** |
| Scripts Hugo (package.json)      | 7 scripts | **Eliminado** |
| Dependencias Hugo (package.json) | 2 deps    | **Eliminado** |

### Decisiones técnicas

| Decisión            | Opción elegida                   | Alternativa descartada | Razón                                      |
| ------------------- | -------------------------------- | ---------------------- | ------------------------------------------ |
| Generador estático  | Astro                            | Hugo, 11ty, plain HTML | Zero-JS, moderno, component-based          |
| Carga de CSS        | `<link>` en public/              | import ESM             | CSS pre-compilado, sin procesamiento       |
| Estructura          | site/ con su propio package.json | Monorepo integrado     | Aislamiento de dependencias                |
| Dark mode toggle    | Script inline + clase en html    | Media query only       | Permite testing manual de ambos temas      |
| Contenido Hugo      | Eliminar todo                    | Migrar parcialmente    | No es nuestro contenido, no agrega valor   |
| CSS reference files | Mover a docs/reference-css/      | Eliminar               | Se necesitan como referencia para SaaSMono |
