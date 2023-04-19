import status from 'http-status'
import { ApiError } from "../utils";
import type { IPassEncoder, IUserActions, IAuthActions } from "../interfaces";
import type { Auth } from '../schemas';

export class AuthService implements IAuthActions {
  constructor(
    private userService: IUserActions,
    private passEncoder: IPassEncoder,
    private saltRounds: number = 10
  ) { }

  public async register(user: Auth.RegisterBody) {
    const hash = await this.passEncoder.hash(user.password, this.saltRounds)
    return await this.userService.create({ ...user, password: hash })
  }

  public async login(email: string, password: string) {
    const user = await this.userService.getByEmail(email)
    if (!user) {
      throw this.constructError(status.UNAUTHORIZED)
    }
    const valid = await this.passEncoder.compare(password, user.password)
    if (!valid) {
      throw this.constructError(status.UNAUTHORIZED)
    }
    if (user.status === 'Blocked') {
      throw this.constructError(status.FORBIDDEN)
    }
    await this.userService.updateLoginAt(user.id)
    return user
  }

  private constructError(statusCode: number) {
    const getMessage = () => {
      switch (statusCode) {
        case status.UNAUTHORIZED:
          return "Credentials are not valid"
        case status.FORBIDDEN:
          return "You have been blocked"
        default:
          return "Unknown error"
      }
    }
    return new ApiError(statusCode, getMessage())
  }
}