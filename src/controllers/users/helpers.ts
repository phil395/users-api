import { requestContext } from "../..";
import type { Users } from "../../schemas";

export const isSelfLogout = (
  actionType: Users.ActionBody['actionType'],
  ids: number[]
): boolean => {
  const ctx = requestContext.getStore()
  if (!ctx || !ids.includes(ctx.userId)) {
    return false
  }
  if (actionType === 'block' || actionType === 'delete') {
    return true
  }
  return false
}