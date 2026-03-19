import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { CustomWorld } from './world';
import { config } from '../config/config';

BeforeAll(async function () {
  console.log(' Starting test suite...');
  console.log(` Base URL: ${config.baseURL}`);
  console.log(`  Headless: ${config.headless}`);
});

AfterAll(async function () {
  console.log(' Test suite completed');
});

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({
    headless: config.headless,
    slowMo: config.slowMo,
  });
  this.context = await this.browser.newContext({
    viewport: config.viewport,
    baseURL: config.baseURL,
  });
  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(config.timeout);
});

After(async function (this: CustomWorld, { pickle, result }) {
  if (result?.status === 'FAILED' && this.page) {
    const screenshotName = `failed-${pickle.name.replace(/\s+/g, '-')}-${Date.now()}.png`;
    const screenshotPath = `${config.screenshotPath}/${screenshotName}`;

    const screenshot = await this.page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });
    await this.attach(screenshot, 'image/png');

    console.log(` Screenshot saved: ${screenshotPath}`);
  }

  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});