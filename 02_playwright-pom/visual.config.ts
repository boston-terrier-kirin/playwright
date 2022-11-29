import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 60000,
  retries: 0,
  testDir: 'tests/visual',
  use: {
    headless: false,
    actionTimeout: 30000,
    ignoreHTTPSErrors: true,
    screenshot: 'off',
    video: 'off',
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
