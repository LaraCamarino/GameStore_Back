import * as productsRepository from "../repositories/productsRepository.js";

export async function getProductsByCategory(category: string) {
  await verifyExistingCategory(category);

  const products = await productsRepository.getProductsByCategory(category);

  return products;
}

async function verifyExistingCategory(category: string) {
  const categories = await productsRepository.getAllCategories();
  const existingCategory = categories.filter(
    (item) => item.category === category
  );

  if (existingCategory.length === 0) {
    throw {
      type: "not_found",
      message: "Non-existing category.",
    };
  }
}

export async function getAllProducts() {
  const products = await productsRepository.getAllProducts();

  return products;
}
