# Third-Party Integrations

Overrides de estilos para librerias de terceros.

## Librerias

| Libreria | Version | Parcial SCSS | Tamano |
|----------|---------|-------------|--------|
| DataTables | 2.2.2 | `_datatables.scss` | ~550 lineas |
| DateRangePicker | — | `_daterangepicker.scss` | ~400 lineas |
| Select2 | — | `_select2.scss` | ~350 lineas (default + classic + bootstrap themes) |

## Notas

- Los estilos de cursor `image-set()` para estas librerias viven en `app1.css` (proyecto SaaSMono), no aqui.
- DataTables usa CSS custom properties para row selection/hover (`--dt-row-selected`, `--dt-row-hover`), definidas en `_variables.scss`.
- Select2 incluye 3 temas: default, classic, y bootstrap.
