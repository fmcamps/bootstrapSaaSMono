Visual inspection of the FMCamps kitchen sink design system pages.

## Instructions

1. First, compile the latest CSS by running `npm run css`
2. Copy the compiled CSS to the kitchen sink site: copy `dist/css/fmcamps.css` to `site/public/css/fmcamps.css`
3. Build the Astro site by running `npm run site-build`
4. Start the Astro preview server on port 4321 by running `npm run site-preview` in the background
5. Wait a few seconds for the server to start
6. Use the MCP Playwright tools to navigate to each of these pages on <http://localhost:4321> and take a screenshot of each one:
   - / (home)
   - /tokens/
   - /buttons/
   - /forms/
   - /tables/
   - /cards/
   - /modals/
   - /alerts/
   - /navigation/
   - /feedback/
   - /media/
   - /dark-theme/
7. For each page: use `browser_navigate` to go to the URL, then `browser_take_screenshot` to capture it
8. After inspecting all pages, report a summary of the visual state of each page — flag any obvious issues like broken layouts, missing styles, or rendering problems
9. Stop the preview server when done

## Notes

- This is a visual inspection using Claude's multimodal capabilities, NOT the automated pixel-diff tests
- For automated regression testing with baseline comparison, use `npm run test-visual` instead
- For updating baselines after intentional changes, use `npm run test-visual-update`
