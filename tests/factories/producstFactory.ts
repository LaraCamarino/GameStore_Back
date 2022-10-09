import { faker } from "@faker-js/faker";

export function product() {
  return {
    id: faker.datatype.number(),
    name: faker.word.noun(),
    price: faker.datatype.number(),
    category: faker.word.noun(),
    imageUrl: faker.internet.url(),
    company: faker.word.noun(),
    description: faker.word.noun(),
    inStock: faker.datatype.number(),
  };
}
