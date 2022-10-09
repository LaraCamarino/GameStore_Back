import { users as User, sessions as Session } from "@prisma/client";

export type TypeNewUser = Omit<User, "id" | "createdAt">;

export type TypeSession = Omit<Session, "id" | "createdAt">;

export interface IToken {
  userId: number;
}
