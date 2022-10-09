import { Request, Response } from "express";

import * as productsService from "../services/productsService.js";

export async function getAllProducts(req: Request, res: Response) {
  const products = await productsService.getAllProducts();

  res.status(200).send(products);
}

export async function getProductsByCategory(req: Request, res: Response) {
  const category: string = req.params.category;

  const products = await productsService.getProductsByCategory(
    category.toLowerCase()
  );

  res.status(200).send(products);
}

export async function getProductById(req: Request, res: Response) {
  const productId: number = Number(req.params.productId);

  const product = await productsService.getProductById(productId);

  res.status(200).send(product);
}

export async function getProductByName(req: Request, res: Response) {
  const productName: string = req.params.productName;

  const product = await productsService.getProductByName(productName);

  res.status(200).send(product);
}
