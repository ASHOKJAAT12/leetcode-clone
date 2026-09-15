import { Request, Response, NextFunction } from "express";
import ProblemContext from "../models/ProblemContext";

// Simple mock user ID for Phase 3 since Authentication isn't fully implemented yet
const MOCK_USER_ID = "60c72b2f9b1d8b001c8e4b7a"; // Requires a valid hex string format for ObjectId

export const createContext = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contextData = { ...req.body, userId: MOCK_USER_ID };
        const newContext = await ProblemContext.create(contextData);
        res.status(201).json({ success: true, message: "Context created successfully", data: newContext });
    } catch (error) {
        next(error);
    }
};

export const getContexts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = Math.min(parseInt(req.query.limit as string) || 20, 50); // limit to 50 max
        const skip = (page - 1) * limit;

        // Filters setup
        const filter: any = { userId: MOCK_USER_ID };
        if (req.query.domain) filter.domain = req.query.domain;
        if (req.query.difficulty) filter.difficulty = req.query.difficulty;
        if (req.query.status) filter.status = req.query.status;

        const total = await ProblemContext.countDocuments(filter);
        const contexts = await ProblemContext.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json({
            success: true,
            data: contexts,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        next(error);
    }
};

export const getContextById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const context = await ProblemContext.findOne({ _id: req.params.id, userId: MOCK_USER_ID });
        if (!context) {
            res.status(404);
            throw new Error("Context not found or unauthorized");
        }
        res.json({ success: true, data: context });
    } catch (error) {
        next(error);
    }
};

export const updateContext = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const context = await ProblemContext.findOneAndUpdate(
            { _id: req.params.id, userId: MOCK_USER_ID },
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!context) {
            res.status(404);
            throw new Error("Context not found or unauthorized");
        }
        res.json({ success: true, message: "Context updated successfully", data: context });
    } catch (error) {
        next(error);
    }
};

export const deleteContext = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const context = await ProblemContext.findOneAndDelete({ _id: req.params.id, userId: MOCK_USER_ID });
        if (!context) {
            res.status(404);
            throw new Error("Context not found or unauthorized");
        }
        res.json({ success: true, message: "Context deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export const validateContextPayload = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validate minimal conditions as requested by Phase 2 rules
        const { language, domain, difficulty, experienceLevel, problemType, skills, scenario } = req.body;
        if (!language || !domain || !difficulty || !experienceLevel || !problemType || !skills || skills.length === 0 || !scenario || scenario.length < 50) {
            res.status(400).json({ success: false, message: "Validation failed: Missing required fields or invalid bounds", code: "VALIDATION_FAILED" });
            return;
        }
        res.json({ success: true, message: "Context is valid" });
    } catch (error) {
        next(error);
    }
};
