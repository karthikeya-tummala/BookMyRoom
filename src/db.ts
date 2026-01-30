import { env } from "./config/env.js";
import mongoose from 'mongoose';

if (!env.MONGO_URI) {
  throw new Error('Missing database credentials');
}

export const connectDB = async(): Promise<void> => {
  try {
    await mongoose.connect(env.MONGO_URI, {
      dbName: process.env.DBNAME,
    });
    console.log('Database connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

