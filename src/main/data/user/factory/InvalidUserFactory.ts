import { Factory } from "../../../interfaces";
import { User } from "../User";
import { faker } from "@faker-js/faker";

export class InvalidUserFactory implements Factory<User> {
  create(): User {
    const password = faker.internet.password();
    return User.Builder.setLastName(faker.person.lastName())
      .setEmail(faker.internet.email())
      .setPassword(password)
      .setConfirmPassword(password)
      .build();
  }
}
