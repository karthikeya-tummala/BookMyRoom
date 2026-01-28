import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error('Missing database credentials');
}

export const connectDB = async(): Promise<void> => {
    try {
        await mongoose.connect(MONGO_URI, {
            dbName: process.env.DBNAME,
        });
        console.log('Database connected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

