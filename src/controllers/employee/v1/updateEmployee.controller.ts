import { Request, Response } from 'express';
import { z } from 'zod';
import { EmployeeService } from '../../../services/employeeService.js';
import { ApiError } from '../../../utils/errors.js';
import { createEmployeeSchema } from '../../../validators/auth.schema.js';

const updateEmployeeSchema = createEmployeeSchema.partial();

export const updateEmployee = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const result = updateEmployeeSchema.safeParse(req.body);

  if (!result.success) {
    throw new ApiError("VALIDATION_ERROR", z.flattenError(result.error));
  }

  const data = await EmployeeService.update(id, result.data);

  return res.status(200).json({
    success: true,
    message: 'Employee updated successfully',
    data
  });

};

