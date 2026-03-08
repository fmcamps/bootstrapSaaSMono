# BS4 → Tailwind CSS v4 Class Mapping Reference

> Generated during Fase 0 (Kitchen Sink sandbox).
> Tailwind uses `prefix(tw)` — all utilities are `tw:*`.

## Spacing (non-linear mapping)

BS4 spacing scale: 0 / 0.25 / 0.5 / 1 / 1.5 / 3 rem
Tailwind spacing: `--spacing: 0.25rem` (linear, multiply by step)

| BS4 | rem | Tailwind | Notes |
|-----|-----|----------|-------|
| `m-0` / `p-0` | 0 | `tw:m-0` / `tw:p-0` | Same |
| `m-1` / `p-1` | 0.25 | `tw:m-1` / `tw:p-1` | Same |
| `m-2` / `p-2` | 0.5 | `tw:m-2` / `tw:p-2` | Same |
| `m-3` / `p-3` | 1.0 | `tw:m-4` / `tw:p-4` | **Different name** |
| `m-4` / `p-4` | 1.5 | `tw:m-6` / `tw:p-6` | **Different name** |
| `m-5` / `p-5` | 3.0 | `tw:m-12` / `tw:p-12` | **Different name** |

Same pattern applies to all axes: `mx-`, `my-`, `mt-`, `mb-`, `ml-`, `mr-`, `px-`, `py-`, etc.

## Display

| BS4 | Tailwind |
|-----|----------|
| `d-none` | `tw:hidden` |
| `d-block` | `tw:block` |
| `d-inline` | `tw:inline` |
| `d-inline-block` | `tw:inline-block` |
| `d-flex` | `tw:flex` |
| `d-grid` | `tw:grid` |

## Flexbox

| BS4 | Tailwind |
|-----|----------|
| `justify-content-center` | `tw:justify-center` |
| `justify-content-between` | `tw:justify-between` |
| `justify-content-start` | `tw:justify-start` |
| `justify-content-end` | `tw:justify-end` |
| `align-items-center` | `tw:items-center` |
| `align-items-start` | `tw:items-start` |
| `align-items-end` | `tw:items-end` |
| `flex-column` | `tw:flex-col` |
| `flex-wrap` | `tw:flex-wrap` |

## Text

| BS4 | Tailwind |
|-----|----------|
| `text-center` | `tw:text-center` |
| `text-left` | `tw:text-left` |
| `text-right` | `tw:text-right` |
| `text-white` | `tw:text-white` |
| `font-weight-bold` | `tw:font-bold` |
| `text-truncate` | `tw:truncate` |
| `text-muted` | Keep as BS4 (FMCamps themed) |
| `text-white-50` | Keep as BS4 (no direct TW equivalent) |

## Sizing

| BS4 | Tailwind |
|-----|----------|
| `h-100` | `tw:h-full` |
| `w-100` | `tw:w-full` |

## Position

| BS4 | Tailwind |
|-----|----------|
| `position-relative` | `tw:relative` |
| `position-absolute` | `tw:absolute` |
| `position-fixed` | `tw:fixed` |

## Border

| BS4 | Tailwind |
|-----|----------|
| `rounded` | `tw:rounded` |
| `rounded-circle` | `tw:rounded-full` |

## Margin auto

| BS4 | Tailwind |
|-----|----------|
| `ml-auto` | `tw:ml-auto` |
| `mr-auto` | `tw:mr-auto` |
| `mx-auto` | `tw:mx-auto` |

## Colors (using CSS vars directly)

| BS4 | Tailwind | Notes |
|-----|----------|-------|
| `bg-primary` | `tw:bg-gray-900` | No FMCamps override |
| `bg-danger` | `tw:bg-(--danger-fmc)` | Uses CSS var |
| `bg-success` | `tw:bg-(--success-fmc)` | Uses CSS var |
| `bg-warning` | `tw:bg-(--warning-fmc)` | Uses CSS var |
| `text-primary` | `tw:text-gray-900` | No FMCamps override |
| `text-danger` | `tw:text-(--danger-fmc)` | Uses CSS var |

## Classes to KEEP as BS4 (component classes, not utilities)

These are **not migrated** — they remain as BS4/FMCamps custom classes:

- **Buttons**: `btn`, `btn-*`, `btn-circle`, `btn-circle2`, `accept-button`, `btn-group`
- **Cards**: `card`, `card-body`, `card-header`, `card-footer`, `card-body-with-table`
- **Tables**: `table`, `table-striped`, `table-bordered`, `table-responsive`, `transparente`, `showTools`
- **Forms**: `form-control`, `form-group`, `custom-control`, `custom-switch`, `custom-checkbox`, `custom-radio`, `form-control-left`, `filtrounico`, `readonly-state`
- **Modals**: `modal`, `modal-dialog`, `modal-content`, `modal-header`, `modal-body`, `modal-footer`, `modal-body-with-table`
- **Navigation**: `navbar`, `nav`, `nav-tabs`, `nav-link`, `dropdown-*`, `pagination`, `page-item`, `page-link`
- **Alerts**: `alert`, `alert-*`
- **Badges**: `badge`, `badge-*`, `badge-orange`
- **Lists**: `list-group`, `list-group-item`
- **FMCamps**: `bg-fmc1/2/3`, `titulo`, `tituloright`, `bg-*-blur`, `toast-fmc-*`, `dialog-fmc-*`, `gestor-archivos`, `efevidencia`, `img-ef`
- **Grid**: `row`, `col-*`, `container`, `container-fluid`
- **Typography**: `lead`, `display-4`, `h6`, `help-block`
- **Other**: `text-muted`, `text-white-50`, `text-success`, `text-danger`, `close`, `jumbotron`, `accordion`, `progress`, `progress-bar`, `tab-content`
