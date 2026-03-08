# FMCamps Design System

Documentacion del sistema de diseno visual basado en Bootstrap 4.6.2 + FMCAMPS customizations.

## Estructura

| Carpeta | Contenido |
|---------|-----------|
| [overview/](overview/) | Arquitectura general, pipeline CSS, como contribuir |
| [tokens/](tokens/) | Variables de diseno: colores, tipografia, espaciado, bordes |
| [components/](components/) | Documentacion por componente (buttons, forms, cards, modals, etc.) |
| [patterns/](patterns/) | Patrones de UI reutilizables (layouts, navegacion, feedback) |
| [third-party/](third-party/) | Integraciones: DataTables, DateRangePicker, Select2 |
| [dark-theme/](dark-theme/) | Estrategia light/dark, variables CSS, overrides |
| [technical-debt/](technical-debt/) | Deuda tecnica, mejoras pendientes, aspiraciones |
| [changelog/](changelog/) | Historial de cambios relevantes al design system |
| [refactoring/](refactoring/) | PRDs de refactoring (migracion Astro, etc.) |
| [reference-css/](reference-css/) | CSS de referencia del proyecto SaaSMono |

## Quick Start

```bash
# Compilar CSS
npm run css

# Kitchen sink (visualizar componentes)
npm run site-dev
# Abre http://localhost:4321
```

## Kitchen Sink (Astro)

El sitio Astro en `site/` es un playground visual que muestra todos los componentes del design system con `fmcamps.css` cargado. Incluye 12 paginas: tokens, buttons, forms, tables, cards, modals, alerts, navigation, feedback, media, dark-theme, y un toggle para forzar light/dark mode.

```bash
npm run site-dev      # Dev server en puerto 4321
npm run site-build    # Build estatico en site/dist/
npm run site-preview  # Preview del build
```

Pipeline CSS: `scss/fmcamps/` --> dart-sass --> autoprefixer --> clean-css --> `dist/css/fmcamps.css`
