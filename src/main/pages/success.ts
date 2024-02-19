import { Page } from "@playwright/test";
import { ApplicationPage } from "../interfaces/";
import { SuccessForm } from "../components";

export class Success implements ApplicationPage {
  private readonly page: Page;
  private readonly baseURL: string;
  private readonly successForm: SuccessForm;

  constructor(page: Page, baseURL: string) {
    this.page = page;
    this.baseURL = baseURL;
    this.successForm = new SuccessForm(page);
  }

  async open(): Promise<void> {
    await this.page.goto(this.baseURL);
  }

  public getUrl() {
    return this.baseURL;
  }

  public getSuccessForm() {
    return this.successForm;
  }
}
