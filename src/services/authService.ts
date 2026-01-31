import { ApiError } from "../utils/errors.js";
import { env } from "../config/env.js";
import { Employee } from "../models/index.js";
import { z } from "zod";
import {compare, hash} from "bcrypt-ts";
import { loginSchema, signUpSchema } from '../validators/auth.schema.js';
import jwt, { SignOptions } from "jsonwebtoken";

type LoginPayload = z.infer<typeof loginSchema>;
type SignUpPayload = z.infer<typeof signUpSchema>;

export class AuthService {

  static generateJWT(payload: any) : string {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRY } as SignOptions);
  }

  static async login(payload: LoginPayload): Promise<string>  {

    const employee = await Employee.findOne({ email: payload.email }).select('+password');

    if (!employee) {
      throw new ApiError("INVALID_CREDENTIALS");
    }

    const passwordMatch = await compare(payload.password, employee.password);

    if (!passwordMatch) {
      throw new ApiError("INVALID_CREDENTIALS");
    }

    const token = this.generateJWT({
      _id: employee._id,
      email: employee.email,
      name: employee.name,
      role: employee.role
    });

    return token;
  }

  static async signUp(payload: SignUpPayload) : Promise<any> {

    const { email, name, password } = payload;

    const existingEmployee = await Employee.exists({ email: email });

    if (existingEmployee) {
      throw new ApiError("EMAIL_ALREADY_IN_USE");
    }

    const hashedPassword = await hash(password, env.SALT_ROUNDS);

    let employee = await Employee.create({
      name,
      email,
      password: hashedPassword
    });

    return { name: employee.name };
  }



}