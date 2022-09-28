import prisma from "../dbStrategy/database.js";

import { TypeNewUser } from "../types/authTypes.js";

export async function findUserByEmail(email: string) {
  return prisma.users.findUnique({
    where: { email },
  });
}

export async function insertNewUser(newUser: TypeNewUser) {
  return prisma.users.create({
    data: newUser,
  });
}
