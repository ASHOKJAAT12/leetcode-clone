import dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || "development",
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017",
    MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || "realcode",
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000"
};
