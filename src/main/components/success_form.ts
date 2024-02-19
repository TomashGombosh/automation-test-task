import { Page, Locator } from "playwright/test";

export class SuccessForm {
  private readonly page: Page;
  private readonly title: Locator;
  private readonly avatar: Locator;
  private readonly backToFormButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = this.page.locator("h1");
    this.avatar = this.page.locator("img");
    this.backToFormButton = this.page.locator("a[href='/']");
  }

  public getTitle() {
    return this.title;
  }

  public getTextFromLabel(text: string) {
    return this.page.getByText(text);
  }

  public getAvatar() {
    return this.avatar;
  }

  public getBackToFormButton() {
    return this.backToFormButton;
  }
}
