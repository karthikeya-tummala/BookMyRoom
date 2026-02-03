import { Request, Response } from "express";
import { EmployeeService } from "../../services/employeeService.js";

export const getEmployees = async (req: Request, res: Response) => {
  const { page, limit, ...filters } = req.query as any;

  const employees = await EmployeeService.get({
    pagination: (req as any).paginate,
    filters,
  });

  return res.status(200).json({
    success: true,
    data: employees,
  });
};
