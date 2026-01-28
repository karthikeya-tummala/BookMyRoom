import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import { compare } from 'bcrypt-ts';
import { z } from 'zod';
import { Employee } from '../../models/index.js';


export const login = async (req: Request, res: Response) => {
  const loginSchema = z.object({
    email: z.string(),
    password: z.string()
  });

  try {
    const result = loginSchema.safeParse(req.body);

    if(!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input',
      })
    }

    const { email, password } = result.data;

    const employee = await Employee
    .findOne({ email: email })
    .select('+password');

    if (!employee) {
      return res.status(401).json({
        success: false,
        message: 'Email doesn\'t exist',
      });
    }

    const passwordMatch = await compare(password, employee.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Email ID or password'
      });
    }

    const JWT_SECRET = process.env.JWT_SECRET as string;

    const token = jwt.sign({
        id: employee._id,
        name: employee.name,
        email: employee.email,
        role: employee.role
      }, JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      data: token
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
}

