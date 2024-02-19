import { Page } from "@playwright/test";
import { ApplicationPage } from "../interfaces/ApplicationPage";
import { RegisterForm } from "../components";

export class Main implements ApplicationPage {
  private readonly page: Page;
  private readonly baseURL: string;
  private readonly registerForm: RegisterForm;

  constructor(page: Page, baseURL: string) {
    this.page = page;
    this.baseURL = baseURL;
    this.registerForm = new RegisterForm(page);
  }

  public async open() {
    await this.page.goto(this.baseURL);
  }

  public getRegisterForm() {
    return this.registerForm;
  }

  public getUrl() {
    return this.baseURL;
  }
}
