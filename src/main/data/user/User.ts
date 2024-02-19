export class User {
  private readonly firstName: string;
  private readonly lastName: string;
  private readonly email: string;
  private readonly password: string;
  private readonly confirmPassword: string;
  private readonly avatar: string;

  constructor(builder: UserBuilder) {
    this.firstName = builder.firstName;
    this.lastName = builder.lastName;
    this.email = builder.email;
    this.password = builder.password;
    this.confirmPassword = builder.confirmPassword;
    this.avatar = builder.avatar;
  }

  static get Builder() {
    return new UserBuilder();
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

  public toString() {
    return `User: ${this.firstName} ${this.lastName} ${this.email} ${this.password} ${this.confirmPassword} ${this.avatar}`;
  }
}

class UserBuilder {
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  avatar: string = "";

  setFirstName(firstName: string) {
    this.firstName = firstName;
    return this;
  }

  setLastName(lastName: string) {
    this.lastName = lastName;
    return this;
  }

  setEmail(email: string) {
    this.email = email;
    return this;
  }

  setPassword(password: string) {
    this.password = password;
    return this;
  }

  setConfirmPassword(confirmPassword: string) {
    this.confirmPassword = confirmPassword;
    return this;
  }

  setAvatar(avatar: string) {
    this.avatar = avatar;
    return this;
  }

  build() {
    return new User(this);
  }
}
