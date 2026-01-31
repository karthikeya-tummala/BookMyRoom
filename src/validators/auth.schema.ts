import {z} from "zod";

export const loginSchema = z.object({
  email: z.string().nonempty(),
  password: z.string().nonempty().min(8)
});

export const signUpSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().nonempty(),
  password: z.string().nonempty(),

});