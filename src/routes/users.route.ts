import express from "express";
import { usersControllers } from "../controllers";
import { validate } from "../middlewares";
import { Users } from "../schemas";

export const usersRouter = express.Router()

usersRouter.get('/', usersControllers.getUsers)
usersRouter.post('/action', validate(Users.actionSchema), usersControllers.action)