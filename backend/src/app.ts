import express, { Request, Response } from "express";
import cors from "cors";
import { env } from "./config/env";
import apiRoutes from "./routes/api";
import { notFound, errorHandler } from "./middleware/errorMiddleware";

const app = express();

app.use(express.json());
app.use(cors({
    origin: env.CLIENT_URL,
    optionsSuccessStatus: 200
}));

// Health Check
app.get("/api/health", (req: Request, res: Response) => {
    const isDbConnected = require("mongoose").connection.readyState === 1;
    res.status(isDbConnected ? 200 : 503).json({
        success: true,
        service: "RealCode API",
        database: isDbConnected ? "connected" : "disconnected"
    });
});

// API Routes
app.use("/api", apiRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

export default app;
