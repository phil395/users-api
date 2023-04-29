import type { User } from "@prisma/client"
import type { RequestHandler } from "express"
import type { Users } from "../../schemas"


export type UsersActionHandler = RequestHandler<never, never, Users.ActionBody>
export type GetUsersHandler = RequestHandler<never, Omit<User, 'password'>[], never, never, never>