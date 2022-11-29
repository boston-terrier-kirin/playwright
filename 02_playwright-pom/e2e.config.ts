import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 60000,
  retries: 0,
  testDir: 'tests/e2e',
  use: {
    headless: false,
    actionTimeout: 30000,
    ignoreHTTPSErrors: true,
    screenshot: 'on',
    video: 'on',
    launchOptions: {
      slowMo: 500,
    },
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'Webkit',
      use: { browserName: 'webkit' },
    },
  ],
};

export default config;
