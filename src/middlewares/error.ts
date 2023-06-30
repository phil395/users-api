import status from 'http-status'
import type { ErrorRequestHandler } from "express";
import { ApiError } from "../utils/ApiError";

const DEFAULT_CODE = status.BAD_REQUEST
const DEFAULT_MESSAGE = 'Something broke. Try again later'

const getCode = (error: unknown) => {
  if (error instanceof ApiError) {
    return error.statusCode
  }
  return DEFAULT_CODE
}

const getMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  }
  return DEFAULT_MESSAGE
}

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  res.status(getCode(error)).json({ message: getMessage(error) })
}