import status from 'http-status'
import { ApiError } from "../utils/ApiError";
import type { PrismaClient, User } from "@prisma/client";
import type { IUserActions } from "../interfaces";


export class UserService implements IUserActions {
  constructor(
    private prisma: PrismaClient
  ) { }

  public async create(user: Parameters<IUserActions['create']>['0']): Promise<User> {
    try {
      return await this.prisma.user.create({ data: user })
    } catch {
      throw this.constructError(status.CONFLICT)
    }
  }

  public async getById(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } })
  }

  public async getByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } })
  }

  public updateLoginAt(id: number): Promise<void> {
    return this.updateProp(id, 'loginAt', new Date())
  }

  private async updateProp<Prop extends keyof User>(
    id: number, prop: Prop, newValue: User[Prop]
  ): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { [prop]: newValue }
    })
  }

  private constructError(statusCode: number) {
    const getMessage = () => {
      switch (statusCode) {
        case status.CONFLICT:
          return "A user with this email already exists"
        default:
          return "Unknown error"
      }
    }
    return new ApiError(statusCode, getMessage())
  }

}


