import status from 'http-status'
import { requestContext, tokenService } from "..";
import { ApiError, catchAsync } from "../utils";
import type { RequestHandler } from "express";


export const authenticate: RequestHandler = catchAsync(
  async (req, _, next) => {
    const token: string | undefined = req.cookies?.['token']
    if (!token) {
      throw new ApiError(status.UNAUTHORIZED, "Credentials are not valid")
    }
    const { id } = await tokenService.verifyJwt(token)
    requestContext.run({ userId: id }, () => {
      next()
    })
  }
)