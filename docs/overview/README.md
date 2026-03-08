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

## Direccion estrategica

SaaSMono migra BS4 → **Tailwind CSS** (BS5 descartado). Este repo evoluciona hacia:

- **Design tokens puros** — CSS custom properties que se mapean a `tailwind.config.js`
- **`light-dark()` nativo** — compatible con el variant `dark:` de Tailwind
- **Partials FMC reutilizables** — los estilos de componente se convierten en utilidades Tailwind

No invertir en features que dependan de la API SCSS de Bootstrap (mixins, extends). Invertir en CSS custom properties y `light-dark()`.

### Estado actual de la migracion

**Fase 0 Paso 0a completado (2026-03-08):** Tailwind CSS v4 instalado en el kitchen sink (`site/`) con `@import "tailwindcss" prefix(tw)`. Las 12 paginas + 4 componentes tienen clases `tw:*` junto a BS4 (coexistencia validada, 48/48 visual tests pasan). Ver [PRD_TAILWIND_MIGRATION.md](../refactoring/PRD_TAILWIND_MIGRATION.md) y [tailwind-class-mapping.md](../refactoring/tailwind-class-mapping.md).

## Relacion con app1.css

La app SaaSMono carga **ambos**: `fmcamps.css` (compilado aqui) y un `app1.css` residual (vive en el proyecto SaaSMono). El residual contiene solo reglas que referencian assets app-specific (cursores custom, logos, view-transitions, selectores de ID).
