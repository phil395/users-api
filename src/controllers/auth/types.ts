import type { RequestHandler } from "express";
import type { Auth } from "../../schemas";

export type RegisterHandler = RequestHandler<never, never, Auth.RegisterBody>
export type LoginHandler = RequestHandler<never, never, Auth.LoginBody>

export type AuthResponse = Parameters<RegisterHandler>[1] | Parameters<LoginHandler>[1]