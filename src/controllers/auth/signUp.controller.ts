import { Request, Response } from 'express';
import { z } from 'zod';
import { hash } from "bcrypt-ts";
import { Employee } from '../../models/index.js';

const signUpSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),

});

export const signUp = async (req: Request, res: Response) => {
  try {
    const result = signUpSchema.safeParse(req.body);

    if (!result.success) {
      const error = z.prettifyError(result.error);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error
      })
    }

    const { email, name, password } = result.data;

    const existingEmployee = await Employee.exists({ email: email });

    if (existingEmployee) {
      return res.status(409).send({
        success: false,
        message: 'Email ID already in use.',
      })
    }

    const hashedPassword = await hash(password, Number(process.env.SALT_ROUNDS));

    let employee = await Employee.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "Signup successful. Please login.",
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }

}

