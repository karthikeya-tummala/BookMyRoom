import { Request, Response } from 'express';
import {z} from "zod";
import { EmployeeService } from '../../services/employeeService.js';

import {ApiError} from "../../utils/errors.js";
import {createEmployeeSchema} from "../../validators/auth.schema.js";

export const createEmployee = async (req: Request, res: Response) => {
  const result = createEmployeeSchema.safeParse(req.body);

  if (!result.success) {
    throw new ApiError("VALIDATION_ERROR", z.prettifyError(result.error));
  }

  const data = await EmployeeService.create(result.data);

  return res.status(201).json({
    success: true,
    message: 'Employee created successfully',
    data
  })

}
