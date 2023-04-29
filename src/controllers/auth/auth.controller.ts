import status from 'http-status'
import { tokenService, authService } from "../..";
import { catchAsync } from "../../utils/catchAsync";
import type { AuthResponse, LoginHandler, RegisterHandler } from "./types";


const handleResponse = async (statusCode: number, id: number, res: AuthResponse) => {
  const token = await tokenService.makeJwt({ id })
  res.cookie('token', token, { httpOnly: true, path: '/api' })
  res.sendStatus(statusCode)
}

export const register: RegisterHandler = catchAsync(
  async (req, res) => {
    const { id } = await authService.register(req.body)
    await handleResponse(status.CREATED, id, res)
  }
)

export const login: LoginHandler = catchAsync(
  async (req, res) => {
    const { email, password } = req.body
    const { id } = await authService.login(email, password)
    await handleResponse(status.OK, id, res)
  }
)