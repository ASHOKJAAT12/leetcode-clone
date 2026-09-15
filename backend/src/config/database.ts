import mongoose from "mongoose";
import { env } from "./env";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(env.MONGODB_URI, {
            dbName: env.MONGODB_DB_NAME,
            maxPoolSize: 10,
        });
        console.log(`MongoDB Connected: ${conn.connection.host} (${env.MONGODB_DB_NAME})`);
        return conn;
    } catch (error: any) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};
