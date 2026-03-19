import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly productsTitle: Locator;
  readonly inventoryContainer: Locator;
  readonly cartBadge: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.productsTitle = page.locator('.title');
    this.inventoryContainer = page.locator('.inventory_list');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
  }

  async isProductsPageDisplayed(): Promise<boolean> {
    return await this.productsTitle.isVisible();
  }

  async getProductsTitle(): Promise<string> {
    return await this.productsTitle.innerText();
  }

  async addProductToCart(productName: string) {
    const addToCartButton = this.page.locator(
      `//div[text()="${productName}"]/ancestor::div[@class="inventory_item"]//button[contains(@class, "btn_inventory")]`
    );
    await addToCartButton.click();
  }

  async getCartBadgeCount(): Promise<string> {
    return await this.cartBadge.innerText();
  }

  async isCartBadgeDisplayed(): Promise<boolean> {
    return await this.cartBadge.isVisible();
  }

  async clickShoppingCart() {
    await this.shoppingCartLink.click();
  }
}