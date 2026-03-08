# Design Tokens

Tokens de diseno definidos en `scss/fmcamps/_variables.scss` y en los overrides de `fmcamps.scss`.

## Colores corporativos (CSS custom properties)

| Token | Uso |
|-------|-----|
| `--cyan-fmc` | Color primario, links, bordes activos |
| `--orange-fmc` | Color secundario, hover, acentos |
| `--danger-fmc` | Estados de error |
| `--success-fmc` | Estados de exito |
| `--warning-fmc` | Estados de advertencia |
| `--blue-fmc` | Complementario |

## Colores de superficie

| Token | Uso |
|-------|-----|
| `--light-bg` | Fondo claro (light mode) |
| `--dark-bg` | Fondo oscuro (dark mode) |
| `--dark-bg2` | Fondo oscuro alternativo |
| `--light-color` | Texto en light mode |
| `--dark-color` | Texto en dark mode |
| `--label-color` | Color de labels de formulario |
| `--border-color` | Bordes generales |
| `--border-color-table` | Bordes de tablas |

## Tipografia

- Base: `14px` (html font-size)
- Labels: `1.15rem`, weight 300
- Form controls: `1.15rem`, weight 500

## Gradientes corporativos

| Clase | Descripcion |
|-------|-------------|
| `.bg-fmc1` | Gradiente principal (dark blue -> orange) |
| `.bg-fmc2` | Gradiente secundario (black -> brown -> blue) |
| `.bg-fmc3` | Gradiente terciario (multicolor) |

## Archivos fuente

- `scss/fmcamps/_variables.scss` — CSS custom properties (:root)
- `scss/fmcamps/fmcamps.scss` — Sass variable overrides (antes de Bootstrap)
