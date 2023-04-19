import type { RequestHandler } from "express";

export const catchAsync = <T1, T2, T3, T4, T5 extends Object>(
  asyncHandler: RequestHandler<T1, T2, T3, T4, T5>
) =>
  (async (req, res, next) => {
    try {
      await asyncHandler(req, res, next)
    } catch (error) {
      next(error)
    }
  }) as RequestHandler<T1, T2, T3, T4, T5>
