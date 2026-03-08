# Design Tokens — Evaluacion

## Estado: No prioritario

Los design tokens son una representacion agnostica de los valores de diseno (colores, tipografia, espaciado, bordes) en un formato estandar (JSON/YAML) que puede generar automaticamente variables para cualquier plataforma.

## Situacion actual

Los valores de diseno viven en dos lugares:

| Tipo | Archivo | Ejemplo | Disponibilidad |
| --- | --- | --- | --- |
| Variables SCSS | `scss/fmcamps/fmcamps.scss` | `$primary: #212529` | Solo en compilacion (desaparecen en CSS final) |
| CSS custom properties | `scss/fmcamps/_variables.scss` | `--cyan-fmc: #17a2b8` | Runtime (disponibles en JS y CSS) |

Esto funciona bien para el caso actual: un unico consumidor web (SaaSMono).

## Que resolveria

- **Fuente unica de verdad:** un archivo JSON define todos los tokens, se generan variables SCSS, CSS custom properties, y cualquier otro formato automaticamente
- **Multi-plataforma:** los mismos tokens pueden generar variables Swift/Kotlin (apps moviles), JSON para Figma, constantes para email templates
- **Sincronizacion diseno-codigo:** plugins de Figma pueden leer/escribir el mismo archivo de tokens

## Herramientas

| Herramienta | Autor | Formato |
| --- | --- | --- |
| [Style Dictionary](https://amzn.github.io/style-dictionary/) | Amazon | JSON propietario (bien establecido) |
| [W3C Design Tokens](https://design-tokens.github.io/community-group/format/) | W3C Community Group | JSON estandar (en draft) |

## Cuando implementar

Implementar design tokens tiene sentido cuando se cumpla **al menos una** de estas condiciones:

1. **Multiples plataformas** — los mismos tokens se necesitan en web + app movil (iOS/Android) o web + email templates
2. **Equipo de diseno activo** — hay disenadores usando Figma (o similar) que necesitan sincronizar tokens con el codigo
3. **Frecuencia de cambio alta** — los valores de diseno cambian regularmente y la sincronizacion manual entre archivos es fuente de errores
4. **Multiples productos** — mas de un proyecto/repo consume los mismos tokens y necesitan mantenerse en sync

## Cuando NO implementar

- Un solo consumidor web (situacion actual de SaaSMono)
- ~20 tokens que cambian raramente
- Sin equipo de diseno separado que necesite sincronizacion
- El costo de setup y mantenimiento de la herramienta no se justifica

## Impacto estimado

| Aspecto | Detalle |
| --- | --- |
| Esfuerzo | Medio — extraer ~20 tokens a JSON, configurar Style Dictionary, integrar en pipeline |
| Riesgo | Bajo — es una capa adicional, no reemplaza nada existente |
| Dependencia | Ninguna — se puede hacer independiente de Bootstrap 5 |
| Beneficio actual | Bajo — no hay consumidores adicionales |

## Si se decide implementar

1. Crear `tokens/` en la raiz del repo con archivos JSON por dominio (color, typography, spacing)
2. Configurar Style Dictionary para generar `_tokens.scss` (variables SCSS) y `:root` (CSS custom properties)
3. Reemplazar las variables manuales en `fmcamps.scss` y `_variables.scss` por las generadas
4. Agregar `npm run tokens` al pipeline de build (antes de `css-compile`)
5. Documentar el flujo en el README
