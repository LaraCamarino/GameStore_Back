import { Router } from "express";
import {
  getProductsByCategory,
  getAllProducts,
} from "../controllers/productsController.js";

const router = Router();

router.get("/products/:category", getProductsByCategory);
router.get("/products", getAllProducts);

export default router;
