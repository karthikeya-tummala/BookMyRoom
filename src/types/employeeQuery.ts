import { SortOrder } from "../utils/sortParser.js";
import { UserRole } from "../models/Employee.model.js";

export interface EmployeeQuery {
  search?: string;
  sort?: {
    name?: SortOrder;
  };
  filter?: {
    role?: UserRole;
  };
}
