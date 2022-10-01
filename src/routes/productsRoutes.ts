import { Router } from "express";
import {
  getProductsByCategory,
  getAllProducts,
  getProductById,
} from "../controllers/productsController.js";

const router = Router();

router.get("/products", getAllProducts);
router.get("/products/categories/:category", getProductsByCategory);
router.get("/products/:productId", getProductById);

export default router;
