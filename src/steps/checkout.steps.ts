import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

Given('I have added {string} to the cart', async function (this: CustomWorld, productName: string) {
  const productsPage = new ProductsPage(this.page!);
  await productsPage.addProductToCart(productName);
});

Given('I am on the cart page', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page!);
  await productsPage.clickShoppingCart();
});

When('I click on checkout', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page!);
  await cartPage.clickCheckout();
});

When('I fill in the checkout information:', async function (this: CustomWorld, dataTable) {
  const data = dataTable.hashes()[0];
  const checkoutPage = new CheckoutPage(this.page!);
  await checkoutPage.fillCheckoutInformation(data.firstName, data.lastName, data.postalCode);
});

When('I click continue', async function (this: CustomWorld) {
  const checkoutPage = new CheckoutPage(this.page!);
  await checkoutPage.clickContinue();
});

When('I click finish', async function (this: CustomWorld) {
  const checkoutPage = new CheckoutPage(this.page!);
  await checkoutPage.clickFinish();
});

Then('I should see the order confirmation message {string}', async function (
  this: CustomWorld,
  expectedMessage: string
) {
  const checkoutPage = new CheckoutPage(this.page!);
  const message = await checkoutPage.getConfirmationMessage();
  expect(message).toBe(expectedMessage);
});

Then('I should see the {string} button', async function (this: CustomWorld, buttonText: string) {
  const checkoutPage = new CheckoutPage(this.page!);
  const isDisplayed = await checkoutPage.isBackHomeButtonDisplayed();
  expect(isDisplayed).toBeTruthy();
});

When('I click continue without filling information', async function (this: CustomWorld) {
  const checkoutPage = new CheckoutPage(this.page!);
  await checkoutPage.clickContinueWithoutInfo();
});

Then('I should see the checkout summary page', async function (this: CustomWorld) {
  const checkoutPage = new CheckoutPage(this.page!);
  const isDisplayed = await checkoutPage.isSummaryPageDisplayed();
  expect(isDisplayed).toBeTruthy();
});

Then('I should see {string} in the order summary', async function (
  this: CustomWorld,
  productName: string
) {
  const checkoutPage = new CheckoutPage(this.page!);
  const isInSummary = await checkoutPage.isProductInSummary(productName);
  expect(isInSummary).toBeTruthy();
});

Then('I should see the total price including tax', async function (this: CustomWorld) {
  const checkoutPage = new CheckoutPage(this.page!);
  const total = await checkoutPage.getTotalPrice();
  expect(total).toMatch(/Total: \$\d+\.\d{2}/);
});