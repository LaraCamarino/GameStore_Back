import { Request, Response } from "express";

import * as authService from "../services/authService.js";

export async function signUp(req: Request, res: Response) {
  const newUser = req.body;
  delete newUser.confirmPassword;

  await authService.signUp(newUser);
  res.status(201).send("User registered successfully.");
}

export async function signIn(req: Request, res: Response) {
  const user = req.body;

  const userData = await authService.signIn(user);
  res.status(200).send(userData);
}

export async function signOut(req: Request, res: Response) {
  const { id } = res.locals.user;

  await authService.signOut(id);
  res.status(200).send("User logged out successfully.");
}
