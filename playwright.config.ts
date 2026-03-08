import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual',
  snapshotPathTemplate: '{testDir}/__screenshots__/{arg}-{projectName}{ext}',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: 'list',

  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
    },
  },

  use: {
    baseURL: 'http://localhost:4321',
  },

  projects: [
    {
      name: 'desktop-light',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
        colorScheme: 'light',
      },
    },
    {
      name: 'desktop-dark',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
        colorScheme: 'dark',
      },
    },
    {
      name: 'mobile-light',
      use: {
        ...devices['Pixel 5'],
        colorScheme: 'light',
      },
    },
    {
      name: 'mobile-dark',
      use: {
        ...devices['Pixel 5'],
        colorScheme: 'dark',
      },
    },
  ],

  webServer: {
    command: 'npm run site-build && npm run site-preview',
    port: 4321,
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});
