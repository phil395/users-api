import status from 'http-status'
import { ApiError, catchAsync } from "../utils"
import type { Auth, Users } from "../schemas"
import type { SafeParseError, SafeParseSuccess } from 'zod/lib/types';

type Schema = Auth.LoginSchema | Auth.RegisterSchema | Users.ActionSchema;
type RequestBody = Auth.LoginBody | Auth.RegisterBody | Users.ActionBody;
type ParseResult = SafeParseSuccess<RequestBody> | SafeParseError<RequestBody>

const isError = (result: ParseResult): result is SafeParseError<RequestBody> => {
  return "error" in result ? true : false
}

export const validate = (schema: Schema) => catchAsync(
  async (req, _, next) => {
    const result = await schema.safeParseAsync(req.body)
    if (isError(result)) {
      throw new ApiError(status.BAD_REQUEST, JSON.stringify(result.error.issues))
    }
    next()
  }
)