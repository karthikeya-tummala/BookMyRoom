import { Request, Response } from "express";
import { EmployeeService } from "../../../services/employeeService.js";
import {USER_ROLES} from "../../../models/Employee.model.js";
import {EmployeeQuery} from "../../../types/employeeQuery.js";
import {parseSort} from "../../../utils/sortParser.js";
import {escapeRegex} from "../../../utils/escapeRegex.js"

export const getEmployees = async (req: Request, res: Response) => {
  const {
    search,
    sort = {},
    filter = {},
  } = req.query as EmployeeQuery;


  const filters: Record<string, any> = {};

  if (
    filter.role &&
    Object.values(USER_ROLES).includes(filter.role)
  ) {
    filters.role = filter.role;
  }

  if (search) {
    const regex = {
      $regex: escapeRegex(search),
      $options: "i",
    };

    filters.$or = [
      { name: regex },
      { email: regex },
    ];
  }

  const sortQuery = parseSort({
    customSort: sort,
    allowed: ["name"] as const,
    defaultSort: {
      name: 1
    }
});

  const {data, pagination} = await EmployeeService.get({
    pagination: (req as any).paginate,
    filters,
    sort: sortQuery
  });

  return res.status(200).json({
    success: true,
    data,
    pagination,
  });
};
