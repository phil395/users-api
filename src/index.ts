import express from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { PrismaClient } from "@prisma/client";
import { AsyncLocalStorage } from 'node:async_hooks';
import { router } from "./routes";
import { TokenService, UserService, MultiUserService, AuthService } from "./services";
import type { IRequestContext } from "./interfaces";


const prisma = new PrismaClient()
export const userService = new UserService(prisma)
export const multiUserService = new MultiUserService(prisma)
export const tokenService = new TokenService(jwt, "My_secret")
export const authService = new AuthService(userService, bcrypt, 10)
export const requestContext = new AsyncLocalStorage<IRequestContext>();

const PORT = process.env.PORT ?? 3001
const app = express()

app.use('/api', router)


const beforeShutdown = async () => {
  await new Promise(resolve => {
    setTimeout(resolve, 3000)
  })
  await prisma.$disconnect()
}

process.on('SIGINT', async () => {
  await beforeShutdown()
  process.exit(0)
})

process.on('uncaughtException', async (error) => {
  await beforeShutdown()
  console.error(error)
  process.exit(1)
})

app.listen(PORT, () => {
  console.log('Server started on', PORT)
})