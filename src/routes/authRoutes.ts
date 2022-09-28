import { Router } from "express";
import { signUp } from "../controllers/authController.js";
import validateSignUp from "../schemas/validateSignUp.js";

const router = Router();

router.post("/sign-up", validateSignUp, signUp);

export default router;