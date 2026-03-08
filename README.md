# FMCAMPS SaaSMono Styled

Hoja de estilo base `fmcamps.css` personalizada sobre Bootstrap v4.6.2 para la Plataforma FMCAMPS - Proyecto SaaSMono.

## Que es esto

Este repositorio es un fork de Bootstrap 4.6.2 con una capa de personalizacion que genera `fmcamps.css`, la hoja de estilo base del proyecto SaaSMono. Incluye:

- Overrides de variables de color Bootstrap (primary, secondary, danger, success, etc.)
- Paleta corporativa FMCAMPS (cyan, orange, dark blue)
- Font Awesome 4.7.0 integrado
- RFS (Responsive Font Sizes)

El archivo generado `dist/css/fmcamps.css` se consume desde el proyecto SaaSMono en la ruta:

```text
wwwroot/static/libraries/bootstrap/4.6.2/css/fmcamps.css
```

## Prerequisitos

- **Node.js** (cualquier version moderna — dart-sass no tiene restriccion de version)

## Inicio rapido

```bash
npm install
npm run css          # Compila, prefija y minifica CSS
```

## Comandos

| Tarea                                          | Comando               |
| ---------------------------------------------- | --------------------- |
| Compilar CSS (SCSS a CSS)                      | `npm run css-compile` |
| Build CSS completo (compile + prefix + minify) | `npm run css`         |
| Build JS                                       | `npm run js`          |
| Build todo (CSS + JS)                          | `npm run dist`        |
| Lint CSS/SCSS                                  | `npm run css-lint`    |
| Lint JS                                        | `npm run js-lint`     |
| Lint todo                                      | `npm run lint`        |
| Tests JS (Karma + QUnit)                       | `npm run js-test`     |
| Test completo                                  | `npm test`            |
| Kitchen sink dev server (puerto 4321)          | `npm run site-dev`    |
| Kitchen sink build                             | `npm run site-build`  |
| Kitchen sink preview                           | `npm run site-preview`|

## Estructura clave

| Ruta | Descripcion |
| ------ | ------------- |
| [`scss/fmcamps/fmcamps.scss`](scss/fmcamps/fmcamps.scss) | Punto de entrada principal (aqui se personalizan colores) |
| [`scss/fmcamps/_*.scss`](scss/fmcamps/) | 31 parciales SCSS organizados por dominio |
| [`scss/_variables.scss`](scss/_variables.scss) | Variables default de Bootstrap (se sobreescriben desde fmcamps.scss) |
| [`scss/font-awesome-4.7.0/`](scss/font-awesome-4.7.0/) | Font Awesome 4.7 integrado |
| [`dist/css/fmcamps.css`](dist/css/fmcamps.css) | CSS compilado (output) |
| [`dist/css/fmcamps.min.css`](dist/css/fmcamps.min.css) | CSS compilado y minificado |
| [`js/src/`](js/src/) | Modulos JS de Bootstrap (ES6) |
| [`build/`](build/) | Scripts de build (Rollup, PostCSS, etc.) |
| [`site/`](site/) | Kitchen sink Astro (playground visual del design system) |
| [`docs/`](docs/) | Documentacion del proyecto (overview, changelog, refactoring) |

## Personalizacion de colores

La personalizacion se hace en [`scss/fmcamps/fmcamps.scss`](scss/fmcamps/fmcamps.scss) sobreescribiendo variables **antes** del `@import` de Bootstrap:

| Variable Bootstrap | Valor FMCAMPS        | Default Bootstrap |
| ------------------ | -------------------- | ----------------- |
| `$primary`         | `#212529` (gray-900) | `#007bff`         |
| `$secondary`       | `#f8f9fa` (gray-100) | `#6c757d`         |
| `$blue`            | `#0048ff`            | `#007bff`         |
| `$red`             | `#cc0000`            | `#dc3545`         |
| `$green`           | `#21a340`            | `#28a745`         |
| `$yellow`          | `#f8ae02`            | `#ffc107`         |
| `$orange`          | `#ee730e`            | `#fd7e14`         |
| `$body-bg`         | `#fafafa`            | `#fff`            |
| `$body-color`      | `#111`               | `#212529`         |

## Pipeline CSS

```text
scss/fmcamps/fmcamps.scss
  -> dart-sass (compile)
  -> postcss/autoprefixer (prefix)
  -> clean-css (minify)
  -> dist/css/fmcamps.css + fmcamps.min.css
```

## Relacion con app1.css

El proyecto SaaSMono carga **dos** hojas de estilo en este orden:

```html
<link href="/static/libraries/bootstrap/4.6.2/css/fmcamps.css" rel="stylesheet">
<link href="/static/css/app1.css" rel="stylesheet">
```

| Archivo | Donde vive | Que contiene |
| --- | --- | --- |
| `fmcamps.css` | **Este repo** ([`dist/css/`](dist/css/)) | Bootstrap 4.6.2 + overrides FMCAMPS + FA 4.7 + dark theme |
| `app1.css` | **Repo SaaSMono** (`wwwroot/static/css/`) | Reglas que dependen de assets o IDs del proyecto |

`app1.css` es un residual que contiene SOLO reglas que no pueden vivir aqui:

- Cursores custom (`cursor: image-set(url(/static/images/_cursors/...))`)
- Logos e imagenes (`content: url('/static/images/favicon*')`)
- View transitions (`@view-transition`)
- Selectores de ID especificos (`#grilla_stock`, `#overview`, `#logopk`)
- Overrides de Bootbox (modales del proyecto)
- `body { padding-top }` y `user-select`

Cualquier regla nueva de estilo que NO dependa de assets del proyecto SaaSMono debe agregarse a los parciales SCSS de este repo, no a `app1.css`.

## Reglas del proyecto SaaSMono

Al trabajar con este tema, respetar estas convenciones del proyecto principal:

- Usar **Font Awesome 4.7** (`fa fa-*`), no FA 5/6 (`fas`, `far`)
- Usar **Bootstrap 4.6.2** attributes (`data-toggle`, `data-dismiss`), no BS5 (`data-bs-*`)
- Usar la **system font stack**, no importar Google Fonts
- Los colores corporativos se definen como CSS custom properties en [`scss/fmcamps/_variables.scss`](scss/fmcamps/_variables.scss) (`--cyan-fmc`, `--orange-fmc`, etc.)

## Documentacion relacionada

- [Documentacion del proyecto](docs/README.md) — Overview, changelog, decisiones de refactoring
- [Changelog](docs/changelog/README.md) — Historial de cambios del design system
- [Deuda tecnica](docs/technical-debt/README.md) — Estado actual y aspiraciones
- [Kitchen Sink](site/) — Playground visual del design system (Astro, zero-JS)
- [Bootstrap 4.6 Docs](https://getbootstrap.com/docs/4.6/) — Documentacion oficial de Bootstrap 4.6

## Licencia

Bootstrap esta bajo [MIT License](LICENSE). Las personalizaciones FMCAMPS son propiedad de FMCAMPS.
