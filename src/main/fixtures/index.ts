import { test as base } from "@playwright/test";
import { Main, Success } from "../pages/";

type Fixtures = {
  main: Main;
  success: Success;
};

export const test = base.extend<Fixtures>({
  main: async ({ page }, use) => {
    const main = new Main(page, "/");
    await use(main);
  },
  success: async ({ page }, use) => {
    const success = new Success(page, "/success");
    await use(success);
  },
});

export const expect = test.expect;
