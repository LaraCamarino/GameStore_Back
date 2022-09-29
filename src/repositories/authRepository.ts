import prisma from "../dbStrategy/database.js";

import { TypeNewUser, TypeSession } from "../types/authTypes.js";

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

export async function signIn(userData: TypeSession) {
  return prisma.sessions.create({
    data: userData,
  });
}
