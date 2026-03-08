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

- **Node.js 18 LTS** (obligatorio)

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
| Watch + docs server (puerto 9001)              | `npm start`           |

## Estructura clave

```text
scss/fmcamps/fmcamps.scss    <- Punto de entrada principal (aqui se personalizan colores)
scss/_variables.scss          <- Variables default de Bootstrap (se sobreescriben desde fmcamps.scss)
scss/font-awesome-4.7.0/     <- Font Awesome 4.7 integrado
dist/css/fmcamps.css         <- CSS compilado (output)
dist/css/fmcamps.min.css     <- CSS compilado y minificado
js/src/                      <- Modulos JS de Bootstrap (ES6)
build/                       <- Scripts de build (Rollup, PostCSS, etc.)
```

## Personalizacion de colores

La personalizacion se hace en `scss/fmcamps/fmcamps.scss` sobreescribiendo variables **antes** del `@import` de Bootstrap:

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
  -> node-sass (compile)
  -> postcss/autoprefixer (prefix)
  -> clean-css (minify)
  -> dist/css/fmcamps.css + fmcamps.min.css
```

## Reglas del proyecto SaaSMono

Al trabajar con este tema, respetar estas convenciones del proyecto principal:

- Usar **Font Awesome 4.7** (`fa fa-*`), no FA 5/6 (`fas`, `far`)
- Usar **Bootstrap 4.6.2** attributes (`data-toggle`, `data-dismiss`), no BS5 (`data-bs-*`)
- Usar la **system font stack**, no importar Google Fonts
- Los colores corporativos se definen como CSS custom properties en `app1.css` del proyecto SaaSMono (`--cyan-fmc`, `--orange-fmc`, etc.)

## Documentacion relacionada

- [Design System](../v4.1/saasmono/docs/03-technical-design/frontend/design-system.en.md) - Sistema de diseno completo de FMCAMPS
- [Bootstrap 4.6 Docs](https://getbootstrap.com/docs/4.6/) - Documentacion oficial de Bootstrap 4.6

## Licencia

Bootstrap esta bajo [MIT License](LICENSE). Las personalizaciones FMCAMPS son propiedad de FMCAMPS.
