import { test, expect } from '@playwright/test';

const pages = [
  { name: 'home', path: '/' },
  { name: 'tokens', path: '/tokens/' },
  { name: 'buttons', path: '/buttons/' },
  { name: 'forms', path: '/forms/' },
  { name: 'tables', path: '/tables/' },
  { name: 'cards', path: '/cards/' },
  { name: 'modals', path: '/modals/' },
  { name: 'alerts', path: '/alerts/' },
  { name: 'navigation', path: '/navigation/' },
  { name: 'feedback', path: '/feedback/' },
  { name: 'media', path: '/media/' },
  { name: 'dark-theme', path: '/dark-theme/' },
];

for (const pg of pages) {
  test(`${pg.name} full page`, async ({ page }) => {
    await page.goto(pg.path);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot(`${pg.name}.png`, {
      fullPage: true,
      animations: 'disabled',
    });
  });
}
