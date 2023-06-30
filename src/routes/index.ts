import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler, authenticate } from "../middlewares";
import { authRouter } from "./auth.route";
import { usersRouter } from "./users.route";

export const router = express.Router()

router.use(express.json())
router.use(cookieParser())

router.use('/auth', authRouter)
router.use('/users', authenticate, usersRouter)

router.use(errorHandler)


