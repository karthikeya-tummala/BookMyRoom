import {z} from "zod";

export const loginSchema = z.object({
  email: z.string().nonempty(),
  password: z.string().nonempty().min(8)
});

export const createEmployeeSchema = z.object({
  name: z.string().nonempty().trim(),
  email: z.string().nonempty().trim(),
  password: z.string().nonempty(),
  role: z.string().optional(),

});

export type EmployeePayload = z.infer<typeof createEmployeeSchema>;