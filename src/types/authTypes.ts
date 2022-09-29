import { users as User, sessions as Session } from "@prisma/client";

export type TypeNewUser = Omit<User, "id">;

export type TypeSession = Omit<Session, "id" | "createdAt">;
