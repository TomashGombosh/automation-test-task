import { Page, Locator } from "playwright/test";
import { User } from "../data/user/User";

export class RegisterForm {
  private readonly page: Page;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly email: Locator;
  private readonly password: Locator;
  private readonly confirmPassword: Locator;
  private readonly avatar: Locator;
  private readonly captcha: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator("input[name='first_name']");
    this.lastName = page.locator("input[name='last_name']");
    this.email = page.locator("input[name='email']");
    this.password = page.locator("input[name='password']");
    this.confirmPassword = page.locator("input[name='confirm_password']");
    this.avatar = page.locator("input[name='avatar']");
    this.captcha = page.locator("#slider-captcha");
    this.submitButton = page.locator("input[type='submit']");
  }

  public async fillForm(user: User) {
    await this.firstName.fill(user.getFirstName());
    await this.lastName.fill(user.getLastName());
    await this.email.fill(user.getEmail());
    await this.password.fill(user.getPassword());
    await this.confirmPassword.fill(user.getConfirmPassword());
  }

  public async passCaptcha() {
    const captchaTrack = this.captcha.locator("#slider-track");
    const captchaTumb = this.captcha.locator("#slider-thumb");
    const sliderOffsetWidth = await captchaTrack.evaluate((el) => {
      return el.getBoundingClientRect().width;
    });

    await captchaTumb.hover({ force: true, position: { x: 0, y: 0 } });
    await this.page.mouse.down();
    await captchaTumb.hover({
      force: true,
      position: { x: sliderOffsetWidth, y: 0 },
    });
    await this.page.mouse.up();
  }

  public getFirstName() {
    return this.firstName;
  }

  public getLastName() {
    return this.lastName;
  }

  public getEmail() {
    return this.email;
  }

  public getPassword() {
    return this.password;
  }

  public getConfirmPassword() {
    return this.confirmPassword;
  }

  public getAvatar() {
    return this.avatar;
  }

  public getCaptcha() {
    return this.captcha;
  }

  public getSubmitButton() {
    return this.submitButton;
  }
}
