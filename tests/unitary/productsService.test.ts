import * as productsService from "../../src/services/productsService";
import * as productsRepository from "../../src/repositories/productsRepository";
import * as productsFactory from "../factories/producstFactory";

describe("Teste getAllProducts function", () => {
  it("Should get all prducts from the database", async () => {
    const product = productsFactory.product();

    jest
      .spyOn(productsRepository, "getAllProducts")
      .mockImplementationOnce((): any => {
        return [product];
      });

    const result = productsService.getAllProducts();

    expect(productsRepository.getAllProducts).toBeCalled();
    expect(result).not.toBeNull();
  });
});

describe("Test getProductsByCategory function", () => {
  it("Should get products by category from the database", async () => {
    const product = productsFactory.product();
    const category = product.category;

    jest
      .spyOn(productsRepository, "getAllCategories")
      .mockImplementationOnce((): any => {
        return [{ category: category }];
      });

    jest
      .spyOn(productsRepository, "getProductsByCategory")
      .mockImplementationOnce((): any => {
        return [product];
      });

    const result = await productsService.getProductsByCategory(category);

    expect(productsRepository.getAllCategories).toBeCalled();
    expect(productsRepository.getProductsByCategory).toBeCalled();
    expect(result).not.toBeNull();
  });

  it("If the category does not exist, should not get any products", async () => {
    const category = "not_valid_category";

    jest
      .spyOn(productsRepository, "getAllCategories")
      .mockImplementationOnce((): any => {
        return ["valid_category"];
      });

    const result = productsService.getProductsByCategory(category);

    expect(productsRepository.getAllProducts).toBeCalled();
    expect(result).rejects.toEqual({
      type: "not_found",
      message: "Non-existing category.",
    });
  });
});

describe("Test getProductById function ", () => {
  it("Should get the product that corresponds to the given ID from the database", async () => {
    const product = productsFactory.product();
    const id = product.id;

    jest
      .spyOn(productsRepository, "getProductById")
      .mockImplementationOnce((): any => {
        return product;
      });

    const result = productsService.getProductById(id);

    expect(productsRepository.getProductById).toBeCalled();
    expect(result).toBeInstanceOf(Object);
  });

  it("If the ID does not correspond to any product, should not get any products", async () => {
    const product = productsFactory.product();
    const id = product.id + 1;

    jest
      .spyOn(productsRepository, "getProductById")
      .mockImplementationOnce((): any => {});

    const result = productsService.getProductById(id);

    expect(productsRepository.getProductById).toBeCalled();
    expect(result).rejects.toEqual({
      type: "not_found",
      message: "No product was found.",
    });
  });
});

describe("Test getProductByName function", () => {
  it("Should return an array with the products whose names include the searched word", async () => {
    const product = productsFactory.product();
    const name = product.name;

    jest
      .spyOn(productsRepository, "getProductByName")
      .mockImplementationOnce((): any => {
        return [product];
      });

    const result = productsService.getProductByName(name);

    expect(productsRepository.getProductByName).toBeCalled();
    expect(result).not.toBeNull();
  });

  it("If the searched word does not match any of the products name, should not get any products", async () => {
    const name = "no_matches";

    jest
      .spyOn(productsRepository, "getProductByName")
      .mockImplementationOnce((): any => {
        return [];
      });

    const result = productsService.getProductByName(name);

    expect(productsRepository.getProductByName).toBeCalled();
    expect(result).rejects.toEqual({
      type: "not_found",
      message: "No product was found.",
    });
  });
});
