import { promisify } from 'node:util'
import { ApiError } from "../utils";
import status from 'http-status'
import type { IJwtPayload, ITokenEncoder } from "../interfaces";

export class TokenService {
  constructor(
    private jwt: ITokenEncoder,
    private secret: string,
  ) { }

  async makeJwt(payload: IJwtPayload) {
    const sign = promisify(this.jwt.sign)
    return await sign(payload, this.secret, {}) as string
  }

  async verifyJwt(token: string) {
    try {
      const verify = promisify(this.jwt.verify)
      const jwt = await verify(token, this.secret, { complete: true })
      return jwt?.payload as IJwtPayload
    } catch {
      throw new ApiError(status.UNAUTHORIZED, 'credentials are not valid')
    }
  }
}