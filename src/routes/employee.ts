import { Router } from 'express';
import {
  createEmployee,
  updateEmployee,
  getEmployees,
  getEmployeeById,
  deleteEmployee
} from "../controllers/employee/index.js";
import {paginate} from "../middlewares/paginate.js";
import {validateId} from "../middlewares/validateId.js";

export const employeeRouter = Router();

employeeRouter.post('/', createEmployee);
employeeRouter.get('/', paginate, getEmployees);
employeeRouter.get('/:id', validateId, getEmployeeById);
employeeRouter.patch('/:id', validateId, updateEmployee);
employeeRouter.delete('/:id', validateId, deleteEmployee);

