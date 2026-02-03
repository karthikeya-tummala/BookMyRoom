import { Request, Response } from "express";
import { EmployeeService } from "../../services/employeeService.js";

type Params = { id: string };

export const getEmployeeById = async (
  req: Request<Params>,
  res: Response
) => {
  const employee = await EmployeeService.getById(req.params.id);

  return res.status(200).json({
    success: true,
    data: employee,
  });
};
