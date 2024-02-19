import { UserFactory, InvalidUserFactory } from "../main/data/user/factory/";
import { test, expect } from "../main/fixtures";
import validImages from "./examples/valid_images.json";
import invalidImages from "./examples/invalid_images.json";
import buggyImages from "./examples/buggy_images.json";

test("Case 1", async ({ page, main, success }) => {
  const user = new UserFactory().create();
  await test.step("Open main page", async () => {
    await main.open();
  });

  await test.step("Fill out form", async () => {
    const form = main.getRegisterForm();
    await form.fillForm(user);
    await form.getAvatar().setInputFiles("src/test/assets/avatar.jpeg");
    await form.passCaptcha();
    await form.getSubmitButton().click();
  });

  await test.step("Check success page", async () => {
    const regexp = new RegExp(`/*.${success.getUrl()}`, "g");
    const form = success.getSuccessForm();
    await expect(page).toHaveURL(regexp);
    await expect(form.getTextFromLabel(user.getEmail())).toBeVisible();
    await expect(
      form.getTextFromLabel(`${user.getFirstName()} ${user.getLastName()}`)
    ).toBeVisible();
    await expect(form.getAvatar()).toBeVisible();
  });
});

test("Case 2", async ({ main }) => {
  const invalidUser = new InvalidUserFactory().create();
  await test.step("Open main page", async () => {
    await main.open();
  });

  await test.step("Fill out form", async () => {
    const form = main.getRegisterForm();
    await form.fillForm(invalidUser);
    await form.getAvatar().setInputFiles("src/test/assets/avatar.jpeg");
    await form.passCaptcha();
    await form.getSubmitButton().click();
  });

  await test.step("Check error messages", async () => {
    const form = main.getRegisterForm();
    const validationMessage = await form.getFirstName().evaluate((element) => {
      const input = element as HTMLInputElement;
      return input.validationMessage;
    });
    expect(validationMessage).toMatch(/(f|F)ill out this field(.|)/g);
  });
});

test("Case 3", async ({ main }) => {
  const user = new UserFactory().create();
  await test.step("Open main page", async () => {
    await main.open();
  });

  await test.step("Fill out form", async () => {
    const form = main.getRegisterForm();
    await form.fillForm(user);
    await form.getAvatar().setInputFiles("src/test/assets/avatar.jpeg");
    await form.getSubmitButton().click();
  });

  await test.step("Check that form not passed", async () => {
    const form = main.getRegisterForm();
    await expect(form.getSubmitButton()).toBeVisible();
    await expect(form.getCaptcha()).toBeVisible();
  });
});

validImages.forEach((item) => {
  test(`Case 4 valid: ${item.image}`, async ({ page, main, success }) => {
    const user = new UserFactory().create();
    await test.step("Open main page", async () => {
      await main.open();
    });

    await test.step("Fill out form", async () => {
      const form = main.getRegisterForm();
      await form.fillForm(user);
      await form.getAvatar().setInputFiles(item.image);
      await form.passCaptcha();
      await form.getSubmitButton().click();
    });

    await test.step("Check success page", async () => {
      const regexp = new RegExp(`/*.${success.getUrl()}`, "g");
      const form = success.getSuccessForm();
      await expect(page).toHaveURL(regexp);
      await expect(form.getTextFromLabel(user.getEmail())).toBeVisible();
      await expect(
        form.getTextFromLabel(`${user.getFirstName()} ${user.getLastName()}`)
      ).toBeVisible();
      await expect(form.getAvatar()).toBeVisible();

      const regex = new RegExp(`/*.${item.extension}`, "g");
      const imageSource = await form.getAvatar().getAttribute("src");
      expect(imageSource).toMatch(regex);
    });
  });
});

invalidImages.forEach((item) => {
  test(`Case 4 invalid: ${item.image}`, async ({ page, main, success }) => {
    const user = new UserFactory().create();
    await test.step("Open main page", async () => {
      await main.open();
    });

    await test.step("Fill out form", async () => {
      const form = main.getRegisterForm();
      await form.fillForm(user);
      await form.getAvatar().setInputFiles(item.image);
      await form.passCaptcha();
      await form.getSubmitButton().click();
    });

    await test.step("Check that form not passed", async () => {
      const form = main.getRegisterForm();
      await expect(form.getSubmitButton()).toBeVisible();
      await expect(form.getCaptcha()).toBeVisible();
    });
  });
});

buggyImages.forEach((item) => {
  test(`Case 4 buggy: ${item.image}`, async ({ page, main, success }) => {
    const user = new UserFactory().create();
    await test.step("Open main page", async () => {
      await main.open();
    });

    await test.step("Fill out form", async () => {
      const form = main.getRegisterForm();
      await form.fillForm(user);
      await form.getAvatar().setInputFiles(item.image);
      await form.passCaptcha();
      await form.getSubmitButton().click();
    });

    await test.step("Check that form not passed", async () => {
      const regexp = new RegExp(`/*.${success.getUrl()}`, "g");
      const form = success.getSuccessForm();
      await expect(page).toHaveURL(regexp);
      await expect(form.getTextFromLabel(user.getEmail())).toBeVisible();
      await expect(
        form.getTextFromLabel(`${user.getFirstName()} ${user.getLastName()}`)
      ).toBeVisible();
      await expect(page.getByText("No Avatar Uploaded")).toBeVisible();
    });
  });
});
