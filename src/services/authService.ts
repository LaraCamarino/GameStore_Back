import bcrypt from "bcrypt";

import * as authRepository from "../repositories/authRepository.js";
import { TypeNewUser } from "../types/authTypes.js";

export async function signUp(newUser: TypeNewUser) {
  const emailInUse = await authRepository.findUserByEmail(newUser.email);
  if (emailInUse) {
    throw {
      type: "conflict",
      message: "This e-mail is alrealdy in use.",
    };
  }

  const encryptedPassword = bcrypt.hashSync(newUser.password, 10);

  await authRepository.insertNewUser({
    ...newUser,
    password: encryptedPassword,
  });
}
