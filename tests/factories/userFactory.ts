import { faker } from "@faker-js/faker";

export function createNewUser() {
  const password = faker.internet.password(10);
  return {
    username: faker.word.noun(10),
    email: faker.internet.email(),
    password: password,
    confirmPassword: password,
  };
}

export function userWithPasswordsNotMatching() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    confirmPassword: faker.internet.password(),
  };
}
