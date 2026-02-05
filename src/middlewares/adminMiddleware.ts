import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/errors.js";
import { USER_ROLES } from "../models/Employee.model.js";

export const adminMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new ApiError("INVALID_CREDENTIALS");
  }

  if (req.user.role !== USER_ROLES.Admin) {
    throw new ApiError("FORBIDDEN");
  }

  next();
};
