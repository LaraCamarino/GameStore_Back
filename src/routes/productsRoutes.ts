import { Router } from "express";
import {
  getProductsByCategory,
  getAllProducts,
  getProductById,
  getProductByName,
} from "../controllers/productsController.js";

const router = Router();

router.get("/products", getAllProducts);
router.get("/products/categories/:category", getProductsByCategory);
router.get("/products/:productId", getProductById);
router.get("/products/search/:productName", getProductByName);

export default router;
