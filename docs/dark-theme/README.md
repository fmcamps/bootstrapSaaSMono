# Dark Theme

## Estrategia

El design system soporta light/dark mode mediante dos mecanismos:

### 1. CSS `light-dark()` function (inline)

Usado directamente en propiedades donde se necesita variacion light/dark:

```css
background-color: light-dark(white, black);
color: light-dark(#495057, white);
```

- Soportado nativamente por browsers modernos
- dart-sass lo pasa tal cual (no lo evalua)
- Se usa un fallback estatico antes de cada `light-dark()` para browsers antiguos

### 2. `@media (prefers-color-scheme: dark)` (bloque)

Usado en `_dark-theme.scss` para overrides que requieren reglas completas:

```scss
@media (prefers-color-scheme: dark) {
    .tituloright { ... }
    .btn-primary { ... }
    .alert { ... }
}
```

### 3. CSS custom properties

Variables en `:root` que responden a media queries:

```css
--light-bg, --dark-bg, --light-color, --dark-color
```

## Archivos relevantes

| Archivo | Rol |
|---------|-----|
| `_variables.scss` | Define CSS custom properties (`:root`) |
| `_dark-theme.scss` | Bloque `@media (prefers-color-scheme: dark)` |
| Multiples parciales | Usan `light-dark()` inline |

## Compatibilidad con Tailwind

La estrategia dark mode actual es compatible con la migracion a Tailwind CSS:

| Mecanismo actual | Equivalente Tailwind | Migracion |
|------------------|---------------------|-----------|
| `light-dark(a, b)` | `class="bg-[a] dark:bg-[b]"` | Directa — los valores se mapean 1:1 |
| `@media (prefers-color-scheme: dark)` | `dark:` variant (con `darkMode: 'media'`) | Directa — Tailwind usa la misma media query |
| CSS custom properties en `:root` | `theme.colors` en `tailwind.config.js` | Los custom properties sobreviven como puente |

**Inversion segura:** `light-dark()` y CSS custom properties son CSS nativo — funcionan con o sin Tailwind. No dependen de Bootstrap.
