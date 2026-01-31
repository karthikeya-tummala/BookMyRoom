import { Request, Response } from 'express';
import { signUpSchema } from "../../validators/auth.schema.js";
import { ApiError } from "../../utils/errors.js";
import { AuthService } from "../../services/authService.js";
import {z} from "zod";

export const signUp = async (req: Request, res: Response) => {
  const result = signUpSchema.safeParse(req.body);

  if (!result.success) {
    throw new ApiError("VALIDATION_ERROR", z.flattenError(result.error));
  }

  await AuthService.signUp(result.data);

  res.status(201).json({
    success: true,
    message: "Signup successful. Please login.",
  })

}

