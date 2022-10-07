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

export async function findSessionByUserId(userId: number, token: string) {
  return prisma.sessions.findFirst({
    where: { userId, token },
  });
}

export async function signOut(id: number) {
  return prisma.sessions.delete({
    where: { id },
  });
}
