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

## Quick Start

```bash
# Compilar CSS
npm run css

# Compilar + watch
npm start
```

Pipeline: `scss/fmcamps/` --> dart-sass --> autoprefixer --> clean-css --> `dist/css/fmcamps.css`
