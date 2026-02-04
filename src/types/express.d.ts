import "express";
import { USER_ROLES } from "../models/employee.model";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        role: USER_ROLES;
      };
    }
  }
}

export {};
