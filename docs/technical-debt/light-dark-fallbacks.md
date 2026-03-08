# light-dark() Fallbacks — Decision Record

## Fecha: 2026-03-08

## Contexto

El design system usa la funcion CSS `light-dark()` en 89 lugares para soportar dark mode.
Esta funcion es relativamente nueva:

| Browser | Soporte `var()` | Soporte `light-dark()` |
|---------|-----------------|------------------------|
| IE 10-11 | NO | NO |
| Chrome 45-122 | SI | NO |
| Chrome 123+ (Mar 2024) | SI | SI |
| Firefox 38-119 | SI | NO |
| Firefox 120+ (Nov 2023) | SI | SI |
| Safari 9-17.4 | SI | NO |
| Safari 17.5+ (May 2024) | SI | SI |
| Edge 12-122 | SI | NO |
| Edge 123+ (Mar 2024) | SI | SI |

## Descubrimientos

### 1. IE11 ya no es viable

El design system usa CSS custom properties (`var()`) en toda la base de codigo:
variables de color, bordes, fondos, DataTables, Select2, etc.
**IE11 no soporta `var()`**, por lo que el sitio ya estaba fundamentalmente roto en IE11
independientemente de `light-dark()`.

### 2. Fallbacks protegen browsers intermedios

Los fallbacks estaticos (linea con valor fijo antes de la linea `light-dark()`) protegen
a browsers que SI soportan `var()` pero NO `light-dark()`:
- Chrome 60-122 (Jun 2017 - Feb 2024)
- Firefox 60-119 (May 2018 - Oct 2023)
- Safari 12-17.4 (Sep 2018 - Mar 2024)

Estos browsers ignoran la linea `light-dark()` (valor desconocido) y usan el fallback.
El resultado es que ven siempre el **tema claro** (light), sin dark mode.

### 3. Habia 64 instancias sin fallback

De 89 usos de `light-dark()`, solo 25 tenian fallback estatico.
Las 64 restantes se renderizaban como "propiedad no definida" en browsers intermedios,
causando perdida de colores, fondos y bordes.

### 4. Bugs de sintaxis encontrados

- `_typography.scss`: `light-dark(var(--light-color) #21211f, ...)` — faltaba coma
- `_dropdowns.scss`: `light-dark(var(--light-color),)` — segundo argumento vacio

## Decisiones

### Actualizar .browserslistrc

Se elimino IE del browserslist ya que `var()` no funciona en IE y el design system
depende totalmente de CSS custom properties. Nuevo minimo:

```
Chrome >= 60, Firefox >= 60, Edge >= 79, Safari >= 12
```

Esto refleja la realidad: el sitio nunca funciono en IE con el stack actual.

### Mantener TODOS los fallbacks

Se agregan fallbacks a las 64 instancias faltantes. La estrategia es:

```scss
property: lightValue; /* fallback */
property: light-dark(lightValue, darkValue);
```

Los fallbacks se mantienen porque:
1. Hay usuarios en browsers intermedios (Chrome < 123, Safari < 17.5)
2. El costo es minimo (una linea extra por propiedad)
3. No afectan la funcionalidad en browsers modernos
4. Se pueden remover cuando `light-dark()` tenga >98% de soporte global

### Corregir bugs de sintaxis

Ambos bugs corregidos:
- `_typography.scss`: cambiado a `light-dark(#21211f, var(--dark-color))`
- `_dropdowns.scss`: cambiado a `light-dark(white, white)` (dropdown siempre tiene fondo oscuro)

## Mapeo de var() a valores estaticos

Para fallbacks que usan CSS custom properties en el valor light, se resolvieron a:

| Variable | Valor estatico |
|----------|---------------|
| `var(--light-bg)` | `#f8f9fa` |
| `var(--dark-bg)` | `#212529` |
| `var(--light-color)` | `#212529` |
| `var(--dark-color)` | `#f8f9fa` |
| `var(--border-color)` | `#dee2e6` |
| `var(--gris-oscuro)` | `#343a40` |

## Cuando remover los fallbacks

Los fallbacks se pueden eliminar cuando:
- `light-dark()` tenga >98% de soporte global en caniuse.com
- Se confirme via analytics que no hay usuarios en Chrome < 123 / Safari < 17.5
- El browserslist se actualice a solo browsers con soporte `light-dark()`
