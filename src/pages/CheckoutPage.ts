import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly backHomeButton: Locator;
  readonly confirmationMessage: Locator;
  readonly errorMessage: Locator;
  readonly summaryContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
    this.backHomeButton = page.locator('#back-to-products');
    this.confirmationMessage = page.locator('.complete-header');
    this.errorMessage = page.locator('[data-test="error"]');
    this.summaryContainer = page.locator('.summary_info');
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async clickContinueWithoutInfo() {
    await this.continueButton.click();
  }

  async clickFinish() {
    await this.finishButton.click();
  }

  async getConfirmationMessage(): Promise<string> {
    return await this.confirmationMessage.innerText();
  }

  async isBackHomeButtonDisplayed(): Promise<boolean> {
    return await this.backHomeButton.isVisible();
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.innerText();
  }

  async isSummaryPageDisplayed(): Promise<boolean> {
    return await this.summaryContainer.isVisible();
  }

  async getProductInSummary(productName: string): Promise<Locator> {
    return this.page.locator(`//div[text()="${productName}"]`);
  }

  async isProductInSummary(productName: string): Promise<boolean> {
    const product = await this.getProductInSummary(productName);
    return await product.isVisible();
  }

  async getTotalPrice(): Promise<string> {
    return await this.page.locator('.summary_total_label').innerText();
  }
}