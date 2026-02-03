process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION:", reason);
  process.exit(1);
});

import mongoose from "mongoose";
import { env } from './config/env.js';
import { app } from './app.js';
import { connectDB } from "./db.js";

const startUp = async() => {
  try {
    await connectDB();

    const server = app.listen(env.PORT, () => {
      console.log(`Server up on port ${env.PORT}`);
    });

    const shutdown = async (signal: string) => {
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
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

await startUp();