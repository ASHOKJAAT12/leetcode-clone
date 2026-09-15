import { Request, Response, NextFunction } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    let code = "INTERNAL_SERVER_ERROR";

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        message = "Resource not found";
        code = "RESOURCE_NOT_FOUND";
        res.status(404);
    }

    res.status(res.statusCode || statusCode).json({
        success: false,
        message,
        code,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};
