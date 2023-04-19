import type { User } from "@prisma/client";
import type { IUserActions } from "./IUserActions";


export interface IAuthActions {
  register: (...args: Parameters<IUserActions['create']>) => Promise<User>
  login: (email: string, password: string) => Promise<User>
}