export class ApiError extends Error {
  constructor(
    public statusCode: any,
    public message: string,
    public cause?: unknown
  ) {
    super()
    this.name = "ApiError"
    this.stack = cause instanceof Error ? cause.stack : undefined
  }
}