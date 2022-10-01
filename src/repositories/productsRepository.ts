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

export async function getProductById(id: number) {
  return prisma.products.findUnique({
    where: { id },
  });
}

export async function getProductByName(name: string) {
  return prisma.products.findMany({
    where: {
      name: {
        startsWith: name,
        mode: "insensitive",
      },
    },
  });
}
