import app from "./app";
import { connectDB } from "./config/database";
import { env } from "./config/env";

const startServer = async () => {
    await connectDB();

    const server = app.listen(env.PORT, () => {
        console.log(`Backend server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    });

    const exitHandler = () => {
        server.close(async () => {
            const mongoose = require("mongoose");
            await mongoose.connection.close();
            console.log("Server and database connections closed.");
            process.exit(0);
        });
    };

    process.on("SIGTERM", exitHandler);
    process.on("SIGINT", exitHandler);
};

startServer();
