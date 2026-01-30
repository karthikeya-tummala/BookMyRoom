import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  MONGO_URI: z.url(),
  DBNAME: z.string().min(1),
  JWT_SECRET: z.string(),
  SALT_ROUNDS: z.coerce.number(),
  JWT_EXPIRY: z.string()
});

export const env = envSchema.parse(process.env);

