import { Request, Response } from "express";

import * as productsService from "../services/productsService.js";

export async function getProductsByCategory(req: Request, res: Response) {
  const category: string = req.params.category;

  const products = await productsService.getProductsByCategory(
    category.toLowerCase()
  );

  res.status(200).send(products);
}
