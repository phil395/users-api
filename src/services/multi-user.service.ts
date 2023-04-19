import status from 'http-status'
import { ApiError } from "../utils/ApiError";
import type { PrismaClient, User } from "@prisma/client";
import type { IMultiUserActions } from "../interfaces";

export class MultiUserService implements IMultiUserActions {
  constructor(
    private prisma: PrismaClient
  ) { }

  public getUsers(): Promise<Omit<User, 'password'>[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        loginAt: true,
        status: true
      }
    })
  }

  public async delete(ids: number[]): Promise<void> {
    try {
      await this.prisma.user.deleteMany({
        where: { id: { in: ids } }
      })
    } catch {
      throw this.constructError(status.BAD_REQUEST)
    }
  }

  public block(ids: number[]): Promise<void> {
    return this.updateProp(ids, 'status', 'Blocked')
  }

  public unblock(ids: number[]): Promise<void> {
    return this.updateProp(ids, 'status', 'Active')
  }

  private async updateProp<Prop extends keyof User>(
    ids: number[], prop: Prop, newValue: User[Prop]
  ): Promise<void> {
    try {
      await this.prisma.user.updateMany({
        where: { id: { in: ids } },
        data: { [prop]: newValue }
      })
    } catch {
      throw this.constructError(status.BAD_REQUEST)
    }
  }

  private constructError(statusCode: number) {
    const getMessage = () => {
      switch (statusCode) {
        case status.BAD_REQUEST:
          return "Invalid list of user identifiers"
        default:
          return "Unknown error"
      }
    }
    return new ApiError(statusCode, getMessage())
  }
}