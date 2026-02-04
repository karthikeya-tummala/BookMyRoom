import {z} from "zod";

export const loginSchema = z.object({
  email: z.string().nonempty(),
  password: z.string().nonempty().min(8)
});

export const createEmployeeSchema = z.object({
  name: z.string().trim().nonempty(),
  email: z.string().trim().nonempty(),
  password: z.string().nonempty(),
  role: z.string().trim().optional(),

});

export type EmployeePayload = z.infer<typeof createEmployeeSchema>;