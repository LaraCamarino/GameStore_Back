import cors from "cors";
import express from "express";
import "express-async-errors";
import dotenv from "dotenv";

import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRoutes, productsRoutes, errorHandler);

export default app;
