import { Request, Response } from 'express';
import { z } from 'zod';
import { hash } from "bcrypt-ts";
import { Employee } from '../../models/index.js';
import { signUpSchema } from "../../validators/auth.schema.js";
import {ApiError} from "../../utils/errors.js";

export const signUp = async (req: Request, res: Response) => {
  const result = signUpSchema.safeParse(req.body);

  if (!result.success) {
    throw new ApiError("INVALID_CREDENTIALS");
  }



  res.status(201).json({
    success: true,
    message: "Signup successful. Please login.",
  })

}

