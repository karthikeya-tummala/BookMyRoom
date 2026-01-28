import dotenv from 'dotenv';
import mongoose from "mongoose";
import { app } from './app.js';
import { connectDB } from "./db.js";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 3000;

// @ts-ignore
await connectDB();

const server = app.listen(PORT, () => {
  console.log(`Server up on port ${PORT}`);
});

const shutdown = async(signal: string) => {
  console.log(`\nReceived: ${signal}. Shutting down.`);

  server.close(async () => {
    console.log('HTTP server down');

    try {
      await mongoose.connection.close();
      console.log('Database connection closed');
      process.exit(0);
    } catch (error) {
      console.error('Error during shut down: ', error);
      process.exit(1);
    }
  })
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

