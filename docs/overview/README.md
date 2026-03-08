# Overview

## Arquitectura

FMCamps Design System es un fork customizado de Bootstrap 4.6.2. La capa de personalizacion vive en `scss/fmcamps/` con 31 archivos parciales SCSS organizados por dominio.

## Pipeline CSS

```
scss/fmcamps/fmcamps.scss
    |
    v
dart-sass (--style=expanded --load-path=.)
    |
    v
dist/css/fmcamps.css
    |
    v
postcss (autoprefixer)
    |
    v
clean-css
    |
    v
dist/css/fmcamps.min.css
```

## Orden de imports en fmcamps.scss

1. Variables de Bootstrap (overrides antes de importar)
2. Bootstrap functions, variables, mixins
3. Bootstrap components (selectivos, sin breadcrumb)
4. RFS + Font Awesome 4.7.0
5. FMCAMPS partials (31 archivos por dominio)

## Archivos de salida

| Archivo | Descripcion |
|---------|-------------|
| `dist/css/fmcamps.css` | CSS expandido con source map |
| `dist/css/fmcamps.min.css` | CSS minificado con source map |

## Relacion con app1.css

La app SaaSMono carga **ambos**: `fmcamps.css` (compilado aqui) y un `app1.css` residual (vive en el proyecto SaaSMono). El residual contiene solo reglas que referencian assets app-specific (cursores custom, logos, view-transitions, selectores de ID).
