import {hash} from "bcrypt-ts";
import {env} from "../config/env.js";
import {Employee} from "../models/index.js";
import {ApiError} from "../utils/errors.js";
import {EmployeePayload} from "../validators/auth.schema.js";
import mongoose from "mongoose";

export class EmployeeService {

  static async get({ pagination, filters, sort }: any) {

    const { skip, limit, page } = pagination;

    const [result] = await Employee.aggregate([
      { $match: filters },

      {
        $facet: {
          data: [
            { $sort: sort },
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                name: 1,
                email: 1,
                role: 1,
              },
            },
          ],
          totalCount: [
            { $count: "count" },
          ],
        },
      },
    ])
    .collation({ locale: "en", strength: 2 });

    const totalDocuments = result.totalCount[0]?.count ?? 0;
    const totalPages = Math.ceil(totalDocuments / limit);

    return {
      data: result.data,
      pagination: {
        currentPage: page,
        totalDocuments,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };

  }

  static async getById(id: string) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError("VALIDATION_ERROR");
    }

    const employee = await Employee.findById(id).select('name email role');

    if (!employee) {
      throw new ApiError("NOT_FOUND");
    }

    return employee;
  }

  static async create(payload: EmployeePayload) {

    const { email, name, password, role } = payload;

    const existingEmployee = await Employee.exists({ email: email });

    if (existingEmployee) {
      throw new ApiError("EMAIL_ALREADY_IN_USE");
    }

    const hashedPassword = await hash(password, env.SALT_ROUNDS);

    let employee = await Employee.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    return {
      _id: employee._id,
      name: employee.name,
      email: employee.email,
      role: employee.role,
    };

  }

  static async update(id: string, payload: Partial<EmployeePayload>) {
    const employee = await Employee.findById(id);
    if (!employee) {
      throw new ApiError("NOT_FOUND");
    }

    if (payload.email && payload.email !== employee.email) {
      const exists = await Employee.exists({ email: payload.email });
      if (exists) {
        throw new ApiError("EMAIL_ALREADY_IN_USE");
      }
    }

    if (payload.password) {
      payload.password = await hash(payload.password, env.SALT_ROUNDS);
    }

    Object.assign(employee, payload);

    await employee.save();

    return { employee };
  }

  static async delete(id: string) {
    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      throw new ApiError("NOT_FOUND");
    }

    return { success: true };
  }

}