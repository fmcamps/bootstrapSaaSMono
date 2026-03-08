# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **customized fork of Bootstrap 4.6.2** for the FMCamps SaaS Mono project. The main customization layer lives in `scss/fmcamps/fmcamps.scss`, which overrides Bootstrap's default variables (colors, body styles) and selectively imports Bootstrap components. It also bundles Font Awesome 4.7.0 and RFS (Responsive Font Sizes).

**SCSS compiler: dart-sass (`sass` package)** — compatible with any Node version.

**Strategic direction:** SaaSMono migrates BS4 → **Tailwind CSS** (not BS5). This repo evolves toward pure design tokens + native CSS custom properties. Invest in `light-dark()`, CSS variables, and FMCamps partials that will survive the Tailwind transition. See `docs/technical-debt/README.md` for details.

## Key Commands

| Task                                       | Command                      |
| ------------------------------------------ | ---------------------------- |
| Build everything (CSS + JS)                | `npm run dist`               |
| Build CSS only                             | `npm run css`                |
| Compile SCSS to CSS                        | `npm run css-compile`        |
| Build JS only                              | `npm run js`                 |
| Lint all                                   | `npm run lint`               |
| Lint CSS/SCSS                              | `npm run css-lint`           |
| Lint JS                                    | `npm run js-lint`            |
| Run JS tests                               | `npm run js-test`            |
| Run single test suite (Karma)              | `npm run js-test-karma`      |
| Full test suite (lint + dist + tests)      | `npm test`                   |
| Watch mode (CSS + JS)                      | `npm start`                  |
| Kitchen sink dev server (Astro, port 4321) | `npm run site-dev`           |
| Kitchen sink build                         | `npm run site-build`         |
| Kitchen sink preview                       | `npm run site-preview`       |
| Visual regression tests (Playwright)       | `npm run test-visual`        |
| Update visual baselines                    | `npm run test-visual-update` |

## Architecture

### Custom Theme Layer

- `scss/fmcamps/fmcamps.scss` — The main custom stylesheet entry point. Overrides Bootstrap variables _before_ importing them, then selectively imports Bootstrap components (note: breadcrumb is excluded), followed by 31 FMCAMPS partial SCSS files organized by domain.
- The `css-compile` script compiles from `scss/fmcamps/` (not `scss/bootstrap.scss`), outputting to `dist/css/`.

### SCSS Structure

- `scss/_variables.scss` — Bootstrap's default variables (all use `!default`, so fmcamps overrides take precedence)
- `scss/mixins/` — Bootstrap mixins
- `scss/font-awesome-4.7.0/` — Bundled Font Awesome 4.7.0

### FMCAMPS Partials (`scss/fmcamps/_*.scss`)

The app's custom styles are organized into partial files imported by `fmcamps.scss`:

| Group                     | Partials                                                                                                                                                                               |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CSS custom properties** | `_variables` (`:root` vars, light-dark theming, DataTables vars)                                                                                                                       |
| **Base overrides**        | `_body`, `_typography`, `_links`, `_scrollbars`                                                                                                                                        |
| **Component overrides**   | `_forms`, `_buttons`, `_btn-extended`, `_badges`, `_navbar`, `_navtabs`, `_dropdowns`, `_pagination`, `_tables`, `_cards`, `_modals`, `_alerts`, `_list-group`, `_spinners`, `_images` |
| **Branding**              | `_gradients` (`.bg-fmc1/2/3`, `.titulo`, blur classes)                                                                                                                                 |
| **Third-party overrides** | `_datatables` (DataTables 2.2.2), `_daterangepicker`, `_select2` (default + classic + bootstrap themes)                                                                                |
| **Layout & utilities**    | `_footer`, `_utilities` (tooltips, popovers, misc), `_responsive` (viewports, media queries)                                                                                           |
| **App components**        | `_dialogs` (FMC dialogs), `_toasts` (bInfo toasts), `_gestor-archivos` (S3 upload)                                                                                                     |
| **Theme**                 | `_dark-theme` (`@media (prefers-color-scheme: dark)` overrides)                                                                                                                        |

**SCSS notes (dart-sass):**

- `light-dark()` passes through dart-sass as-is (unknown function), which is the intended behavior.
- CSS custom properties inside `rgb()`/`rgba()` work natively — no interpolation workaround needed.
- Bootstrap 4.6.2 uses `@import` which dart-sass marks as deprecated (warning only, not an error).

### Relationship with app1.css (SaaSMono project)

The SaaSMono app loads **both** `fmcamps.css` (compiled here) and a residual `app1.css` (lives in the SaaSMono project, not in this repo). The residual `app1.css` contains ONLY rules that reference app-specific assets or IDs:

- Custom cursors (`cursor: image-set(url(/static/images/_cursors/...))`)
- Logo images (`content: url('/static/images/favicon*')`)
- View transitions (`@view-transition`)
- ID selectors (`#grilla_stock`, `#overview`, `#logopk`)
- Bootbox modal overrides
- Body `padding-top` and `user-select`

### JavaScript

- `js/src/` — ES6 source modules (alert, button, carousel, collapse, dropdown, modal, popover, scrollspy, tab, toast, tooltip, util)
- `js/dist/` — Babel-compiled individual plugins
- Built via Rollup: standalone (`bootstrap.js`, needs jQuery + Popper externally) and bundle (`bootstrap.bundle.js`, includes Popper)
- Peer dependencies: jQuery 1.9.1-3, Popper.js ^1.16.1

### Build System

- `build/` — Rollup config, PostCSS config, build scripts
- CSS pipeline: dart-sass → postcss (autoprefixer) → clean-css
- JS pipeline: rollup (with babel) → terser
- Tests: Karma + QUnit
