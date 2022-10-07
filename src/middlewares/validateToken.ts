import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import * as authRepository from "../repositories/authRepository.js";
import { IToken } from "../types/authTypes.js";

export default async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    throw {
      type: "not_found",
      message: "No token key was sent.",
    };
  }

  const { userId } = jwt.verify(token, process.env.JWT_SECRET) as IToken;

  const user = await authRepository.findSessionByUserId(userId, token);
  if (!user) {
    throw {
      type: "unauthorized",
      message: "Invalid token.",
    };
  }

  res.locals.user = user;

  next();
}
