import { Prisma, User } from "@prisma/client"
import type { Auth } from "../schemas"


export interface IUserActions {
  create(user: Auth.RegisterBody): Promise<User>
  getById(id: number): Promise<User | null>
  getByEmail(email: string): Promise<User | null>
  updateLoginAt(id: number): Promise<void>
}