import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

Given('I am logged in as {string}', async function (this: CustomWorld, username: string) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.goto();
  await loginPage.login(username, 'secret_sauce');
});

Given('I am on the products page', async function (this: CustomWorld) {
  await expect(this.page!).toHaveURL(/.*inventory.html/);
});

When('I add {string} to the cart', async function (this: CustomWorld, productName: string) {
  const productsPage = new ProductsPage(this.page!);
  await productsPage.addProductToCart(productName);
});

Then('the cart badge should show {string}', async function (this: CustomWorld, count: string) {
  const productsPage = new ProductsPage(this.page!);
  const badgeCount = await productsPage.getCartBadgeCount();
  expect(badgeCount).toBe(count);
});

Then('the product should be added to the cart', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page!);
  const isBadgeDisplayed = await productsPage.isCartBadgeDisplayed();
  expect(isBadgeDisplayed).toBeTruthy();
});

When('I click on the shopping cart', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page!);
  await productsPage.clickShoppingCart();
});

Then('I should see {string} in the cart', async function (this: CustomWorld, productName: string) {
  const cartPage = new CartPage(this.page!);
  const isInCart = await cartPage.isProductInCart(productName);
  expect(isInCart).toBeTruthy();
});

Then('I should see the correct price for {string}', async function (
  this: CustomWorld,
  productName: string
) {
  const cartPage = new CartPage(this.page!);
  const price = await cartPage.getProductPrice(productName);
  expect(price).toMatch(/\$\d+\.\d{2}/);
});

When('I remove {string} from the cart', async function (this: CustomWorld, productName: string) {
  const cartPage = new CartPage(this.page!);
  await cartPage.removeProductFromCart(productName);
});

Then('the cart should be empty', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page!);
  const isEmpty = await cartPage.isCartEmpty();
  expect(isEmpty).toBeTruthy();
});