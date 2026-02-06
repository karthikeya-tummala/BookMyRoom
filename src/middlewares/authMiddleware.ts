import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/errors.js";
import {UserRole} from "../models/Employee.model.js";
import {env} from "../config/env.js";

type JwtPayload = {
  _id: string;
  email: string;
  name: string;
  role: UserRole;
};


export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError("INVALID_CREDENTIALS");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      env.JWT_SECRET
    ) as JwtPayload;

    req.user = {
      id: decoded._id,
      name: decoded.name,
      role: decoded.role,
    };

    next();
  } catch(err: any) {

    if (err instanceof Error && err.name === "TokenExpiredError") {
      throw new ApiError("AUTH_TIMEOUT");
    }

    throw new ApiError("INVALID_CREDENTIALS");
  }
};
