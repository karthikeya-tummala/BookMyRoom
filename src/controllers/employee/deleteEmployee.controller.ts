import { Request, Response } from "express";
import { EmployeeService } from "../../services/employeeService.js";
import {ApiError} from "../../utils/errors.js";

type Params = { id: string };

export const deleteEmployee = async (
  req: Request<Params>,
  res: Response
) => {
  const employee = await EmployeeService.delete(req.params.id);

  if (!employee) {
    throw new ApiError("NOT_FOUND");
  }

  return res.status(200).json({
    success: true,
    message: "Room deleted successfully",
  })

};
