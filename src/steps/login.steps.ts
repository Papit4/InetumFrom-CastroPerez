import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

Given('I am on the Sauce Demo login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.goto();
});

When('I login with username {string} and password {string}', async function (
  this: CustomWorld,
  username: string,
  password: string
) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.login(username, password);
});

Then('I should be redirected to the products page', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page!);
  await expect(this.page!).toHaveURL(/.*inventory.html/);
});

Then('I should see the products inventory', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page!);
  const isDisplayed = await productsPage.isProductsPageDisplayed();
  expect(isDisplayed).toBeTruthy();
});

Then('I should see an error message {string}', async function (
  this: CustomWorld,
  expectedMessage: string
) {
  const loginPage = new LoginPage(this.page!);
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).toContain(expectedMessage);
});