import { Router } from "express";
import { checkoutOrder } from "../controllers/ordersController.js";
import validateToken from "../middlewares/validateToken.js";

const router = Router();

router.post("/checkout", validateToken, checkoutOrder);

export default router;
