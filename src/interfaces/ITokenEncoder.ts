import type { SignOptions, VerifyOptions, Jwt, SignCallback, VerifyCallback } from 'jsonwebtoken'

export interface ITokenEncoder {
  sign(
    payload: Record<string, unknown>,
    secret: string,
    options: SignOptions,
    callback: SignCallback
  ): string

  verify(
    token: string,
    secret: string,
    options: VerifyOptions & { complete: true },
    callback: VerifyCallback<Jwt>
  ): Jwt
}
