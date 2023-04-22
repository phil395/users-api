import { z } from "zod";

const email = z.string().email()
const password = z.string().min(1, "The password must contain at least one character")

export namespace Auth {
  export const loginSchema = z.object({
    email,
    password
  })

  export const registerSchema = z.object({
    name: z.string().min(3, "The name must be longer than three characters"),
    password,
    email
  })

  export type LoginSchema = typeof loginSchema
  export type RegisterSchema = typeof registerSchema

  export type LoginBody = z.infer<LoginSchema>
  export type RegisterBody = z.infer<RegisterSchema>
}

