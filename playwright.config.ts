import { defineConfig, devices, firefox } from '@playwright/test';
import type { TestOptions } from './testOption';

require('dotenv').config();

export default defineConfig<TestOptions>({
  timeout: 40000,

  expect: {
    timeout: 2000
  },

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['json', { outputFile: 'test-results/jsonReport.json' }],
  // ['allure-playwright'],
  ['html']],

  use: {
    globalsQaURL: '',
    baseURL: process.env.DEV === '1' ? 'http://localhost:4201/'
      : 'http://localhost:4200',

    trace: 'on-first-retry',
    actionTimeout: 20000,
    navigationTimeout: 25000,
    video: {
      mode: 'off',
      size: { width: 1920, height: 1080 }
    }
  },

  projects: [
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200/'
      },

    },
    {
      name: 'chromium'
    },

    {
      name: 'rc',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200/'
      },
    },

    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        ...devices['iPhone 13 Pro']
      }
    }
  ]
});
