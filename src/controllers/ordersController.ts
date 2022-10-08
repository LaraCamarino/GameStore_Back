import { Request, Response } from "express";

import * as ordersService from "../services/ordersService.js";

export async function checkoutOrder(req: Request, res: Response) {
  const items = req.body;

  const checkoutURL = await ordersService.checkoutOrder(items);

  res.status(200).send(checkoutURL);
}
