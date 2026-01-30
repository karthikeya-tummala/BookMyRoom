import { Request, Response } from 'express';
import { loginSchema } from "../../validators/auth.schema.js";
import {AuthService} from "../../services/authService.js";
import {ApiError} from "../../utils/errors.js";

// TODO: Refresh token implementation
export const login = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);

  if(!result.success) {
    throw new ApiError("VALIDATION_ERROR");
  }

  const token = await AuthService.login(result.data);

  res.status(200).json({
    success: true,
    message: "Logged in successfully.",
    data: token
  });

}

