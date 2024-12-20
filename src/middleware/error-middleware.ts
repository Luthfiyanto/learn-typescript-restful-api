import { NextFunction, Response, Request } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";

export const ErrorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      error: `Validation Error: ${JSON.stringify(error)}`,
    });
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      errors: error.message,
    });
  } else {
    res.status(500).json({
      error: `Internal Server Error: ${error.message}`,
    });
  }
};
