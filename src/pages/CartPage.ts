import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartTitle: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartTitle = page.locator('.title');
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
  }

  async getProductInCart(productName: string): Promise<Locator> {
    return this.page.locator(`//div[text()="${productName}"]`);
  }

  async isProductInCart(productName: string): Promise<boolean> {
    const product = await this.getProductInCart(productName);
    return await product.isVisible();
  }

  async getProductPrice(productName: string): Promise<string> {
    const priceLocator = this.page.locator(
      `//div[text()="${productName}"]/ancestor::div[@class="cart_item"]//div[@class="inventory_item_price"]`
    );
    return await priceLocator.innerText();
  }

  async removeProductFromCart(productName: string) {
    const removeButton = this.page.locator(
      `//div[text()="${productName}"]/ancestor::div[@class="cart_item"]//button[contains(@class, "cart_button")]`
    );
    await removeButton.click();
  }

  async isCartEmpty(): Promise<boolean> {
    const cartItems = await this.page.locator('.cart_item').count();
    return cartItems === 0;
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}