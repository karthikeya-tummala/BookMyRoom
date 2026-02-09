import { Router } from 'express';
import {
  createEmployee,
  updateEmployee,
  getEmployees,
  getEmployeeById,
  deleteEmployee
} from "../controllers/employee/v1/index.js";
import {paginate} from "../middlewares/paginate.js";
import {validateId} from "../middlewares/validateId.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import {adminMiddleware} from "../middlewares/adminMiddleware.js";

export const employeeRouter = Router();

employeeRouter.post('/', authMiddleware, adminMiddleware, createEmployee);
employeeRouter.get('/', authMiddleware, adminMiddleware, paginate, getEmployees);
employeeRouter.get('/:id', validateId, authMiddleware, adminMiddleware, getEmployeeById);
employeeRouter.patch('/:id', validateId, authMiddleware, adminMiddleware, updateEmployee);
employeeRouter.delete('/:id', validateId, authMiddleware, adminMiddleware, deleteEmployee);

