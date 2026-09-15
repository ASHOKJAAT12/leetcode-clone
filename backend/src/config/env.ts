import dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || "development",
    MONGO_URI: process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://localhost:27017/realcode",
    MONGODB_URI: process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://localhost:27017/realcode",
    MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || "realcode",
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
    JUDGE0_API_URL: process.env.JUDGE0_API_URL || "http://localhost:2358",
    JUDGE0_API_KEY: process.env.JUDGE0_API_KEY || "",
    JUDGE0_ENABLED: process.env.JUDGE0_ENABLED !== "false",
    MAX_SOURCE_CODE_BYTES: parseInt(process.env.MAX_SOURCE_CODE_BYTES || "102400", 10), // 100KB Safe limit
    SUBMISSION_RATE_LIMIT_MS: parseInt(process.env.SUBMISSION_RATE_LIMIT_MS || "10000", 10), // 10s default buffer
};
