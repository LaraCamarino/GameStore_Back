import { users as User } from "@prisma/client";

export type TypeNewUser = Omit<User, "id">;
