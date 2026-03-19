import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
  headless: process.env.HEADLESS !== 'false',
  timeout: parseInt(process.env.TIMEOUT || '30000', 10),
  slowMo: parseInt(process.env.SLOW_MO || '0', 10),
  viewport: {
    width: 1280,
    height: 720,
  },
  screenshotPath: 'screenshots',
  reportsPath: 'reports',
};