import { Request, Response } from "express";
import { EmployeeService } from "../../services/employeeService.js";

type Params = { id: string };

export const deleteEmployee = async (
  req: Request<Params>,
  res: Response
) => {
  await EmployeeService.delete(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Employee deleted successfully",
  });
};
