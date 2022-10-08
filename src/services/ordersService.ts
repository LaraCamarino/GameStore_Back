import dotenv from "dotenv";

dotenv.config();

import stripe from "../stripeStrategy/stripe.js";
import * as productsRepository from "../repositories/productsRepository.js";
import { IItem } from "../types/ordersTypes.js";

export async function checkoutOrder(items: Array<IItem>) {
  let formattedItems = await getItemsInformation(items);

  let { url } = await createStripeSession(formattedItems);

  return url;
}

async function getItemsInformation(items: Array<IItem>) {
  let result = [];
  for (let i = 0; i < items.length; i++) {
    const product = await productsRepository.getProductById(items[i].productId);
    if (product) {
      const formattedProduct = {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
          },
          unit_amount: Number(product.price),
        },
        quantity: items[i].quantity,
      };
      result.push(formattedProduct);
    }
  }
  return result;
}

async function createStripeSession(items: Array<object>) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: items,
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  return session;
}
