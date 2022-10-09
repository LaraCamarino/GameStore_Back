import supertest from "supertest";

import app from "../../src/app";
import prisma from "../../src/dbStrategy/database";
import * as userFactory from "../factories/userFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "users" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "sessions";`;
});

describe("Test POST /sign-up", () => {
  it("Should create an user and return statusCode 201", async () => {
    const newUser = userFactory.createNewUser();

    const result = await supertest(app).post("/sign-up").send(newUser);
    expect(result.status).toEqual(201);

    const createdUser = await prisma.users.findFirst({
      where: { email: newUser.email },
    });
    expect(createdUser).not.toBeNull();
  });

  it("If password and confirmPassword are not the same, should return statusCode 422", async () => {
    const newUser = userFactory.userWithPasswordsNotMatching();

    const result = await supertest(app).post("/sign-up").send(newUser);
    expect(result.status).toEqual(422);
  });

  it("If e-mail is already in use, should return statusCode 409", async () => {
    const newUser = userFactory.createNewUser();

    await supertest(app).post("/sign-up").send(newUser);

    const result = await supertest(app).post("/sign-up").send(newUser);
    expect(result.status).toEqual(409);
  });
});

describe("Test POST /sign-in", () => {
  it("Should login the user, return an object with token and userId and statusCode 200", async () => {
    const user = userFactory.createNewUser();

    await supertest(app).post("/sign-up").send(user);

    const result = await supertest(app)
      .post("/sign-in")
      .send({ email: user.email, password: user.password });

    expect(result.status).toEqual(200);
    expect(result.body).not.toBeNull();
  });

  it("If e-mail is incorrect, should return statusCode 401", async () => {
    const user = userFactory.createNewUser();

    await supertest(app).post("/sign-up").send(user);

    const result = await supertest(app)
      .post("/sign-in")
      .send({ email: "wrong@email.com", password: user.password });

    expect(result.status).toEqual(401);
  });

  it("If password is incorrect, should return statusCode 401", async () => {
    const user = userFactory.createNewUser();

    await supertest(app).post("/sign-up").send(user);

    const result = await supertest(app)
      .post("/sign-in")
      .send({ email: user.email, password: "wrong_password" });

    expect(result.status).toEqual(401);
  });
});

describe("Test DELETE /sign-out", () => {
  it("Should logout the user and return statusCode 200", async () => {
    const user = userFactory.createNewUser();

    await supertest(app).post("/sign-up").send(user);

    const loggedUser = await supertest(app)
      .post("/sign-in")
      .send({ email: user.email, password: user.password });
    const token = loggedUser.body.token;

    expect(token).not.toBeNull();

    const result = await supertest(app)
      .delete("/sign-out")
      .set({ Authorization: `Bearer ${token}` });

    expect(result.status).toEqual(200);
    expect(result.text).toBe("User logged out successfully.");
  });

  it("If no token is sent, should return statusCode 404", async () => {
    const result = await supertest(app).delete("/sign-out").set({});

    expect(result.status).toEqual(404);
    expect(result.text).toBe("No token key was sent.");
  });

  it("If the token sent is invalid, should return statusCode 401", async () => {
    const invalidToken = "invalid_token";

    const result = await supertest(app)
      .delete("/sign-out")
      .set({ Authorization: `Bearer ${invalidToken}` });

    expect(result.status).toEqual(401);
    expect(result.text).toBe("Invalid token.");
  });
});

describe("Test GET /products", () => {
  it("Should return array with all the products and statusCode 200", async () => {
    const result = await supertest(app).get("/products");

    expect(result.status).toEqual(200);
    expect(result.body).toBeInstanceOf(Array);
  });
});

describe("Test GET /products/categories/:category", () => {
  it("Should return array with all the products of the given category and statusCode 200", async () => {
    const category = "sports";

    const result = await supertest(app).get(`/products/categories/${category}`);

    expect(result.status).toEqual(200);
    expect(result.body).toBeInstanceOf(Array);
  });

  it("If category does not exist, should return statusCode 404", async () => {
    const category = "non_existing_category";

    const result = await supertest(app).get(`/products/categories/${category}`);

    expect(result.status).toEqual(404);
    expect(result.text).toBe("Non-existing category.");
  });
});

describe("Test GET /products/:productId", () => {
  it("Should return the product that corresponds to the given ID and statusCode 200", async () => {
    const productId = 1;

    const result = await supertest(app).get(`/products/${productId}`);

    expect(result.status).toEqual(200);
    expect(result.body).toBeInstanceOf(Object);
  });

  it("If the ID does not correspond to any products, should return statusCode 404", async () => {
    const productId = 0;

    const result = await supertest(app).get(`/products/${productId}`);

    expect(result.status).toEqual(404);
    expect(result.text).toBe("No product was found.");
  });
});

describe("Test GET /products/search/:productName", () => {
  it("Should return an array with the products whose names include the searched word and statusCode 200", async () => {
    const productName = "The";

    const result = await supertest(app).get(`/products/search/${productName}`);

    expect(result.status).toEqual(200);
    expect(result.body).toBeInstanceOf(Array);
  });

  it("If the searched word does not match any of the products name, should return statusCode 404", async () => {
    const productName = "no_matches_at_all";

    const result = await supertest(app).get(`/products/search/${productName}`);

    expect(result.status).toEqual(404);
    expect(result.text).toBe("No product was found.");
  });
});

describe("Test POST /checkout", () => {
  it("Should return an URL to the checkout page and statusCode 200", async () => {
    const user = userFactory.createNewUser();

    await supertest(app).post("/sign-up").send(user);

    const loggedUser = await supertest(app)
      .post("/sign-in")
      .send({ email: user.email, password: user.password });

    const token = loggedUser.body.token;
    expect(token).not.toBeNull();

    const items = [
      {
        productId: 1,
        quantity: 2,
      },
      {
        productId: 2,
        quantity: 3,
      },
    ];

    const result = await supertest(app)
      .post("/checkout")
      .set({ Authorization: `Bearer ${token}` })
      .send(items);

    expect(result.status).toEqual(200);
    expect(result.text).not.toBeNull();
  });

  it("If no token is sent, should return statusCode 404", async () => {
    const items = [
      {
        productId: 1,
        quantity: 2,
      },
      {
        productId: 2,
        quantity: 3,
      },
    ];

    const result = await supertest(app).post("/checkout").set({}).send(items);

    expect(result.status).toEqual(404);
    expect(result.text).toBe("No token key was sent.");
  });

  it("If the token sent is invalid, should return statusCode 401", async () => {
    const invalidToken = "invalid_token";
    const items = [
      {
        productId: 1,
        quantity: 2,
      },
      {
        productId: 2,
        quantity: 3,
      },
    ];

    const result = await supertest(app)
      .post("/checkout")
      .set({ Authorization: `Bearer ${invalidToken}` })
      .send(items);

    expect(result.status).toEqual(401);
    expect(result.text).toBe("Invalid token.");
  });
});
