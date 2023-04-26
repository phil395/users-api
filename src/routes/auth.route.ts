import express from "express";
import { authControllers } from "../controllers";
import { validate } from "../middlewares";
import { Auth } from "../schemas";

export const authRouter = express.Router()

authRouter.post(
  '/register',
  validate(Auth.registerSchema),
  authControllers.register
)

authRouter.post(
  '/login',
  validate(Auth.loginSchema),
  authControllers.login
)

