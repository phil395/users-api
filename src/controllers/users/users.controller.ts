import status from 'http-status'
import { multiUserService, requestContext } from "../..";
import { catchAsync } from "../../utils";
import { isSelfLogout } from "./helpers";
import type { GetUsersHandler, UsersActionHandler } from "./types";


export const action: UsersActionHandler = catchAsync(
  async (req, res) => {
    const { actionType, ids } = req.body
    await multiUserService[actionType](ids)
    if (isSelfLogout(actionType, ids)) {
      res.clearCookie('token')
      res.redirect(status.TEMPORARY_REDIRECT, '/login')
      return;
    }
    res.sendStatus(status.NO_CONTENT)
  }
)

export const getUsers: GetUsersHandler = catchAsync(
  async (_, res) => {
    const users = await multiUserService.getUsers()
    res.status(status.OK).json(users)
  }
)
