import { User } from "@prisma/client"

export interface IMultiUserActions {
  delete(ids: number[]): Promise<void>
  block(ids: number[]): Promise<void>
  unblock(ids: number[]): Promise<void>
  getUsers(): Promise<Omit<User, 'password'>[]>
}