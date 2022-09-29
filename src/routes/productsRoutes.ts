import { Router } from "express";
import { getProductsByCategory } from "../controllers/productsController.js";

const router = Router();

router.get("/products/:category", getProductsByCategory);

export default router;
