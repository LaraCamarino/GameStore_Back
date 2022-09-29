import prisma from "../dbStrategy/database.js";

export async function getProductsByCategory(category: string) {
  return prisma.products.findMany({
    where: { category },
  });
}

export async function getAllCategories() {
  return prisma.products.findMany({
    select: {
      category: true,
    },
  });
}

export async function getAllProducts() {
  return prisma.products.findMany({});
}
