import { Request, Response, NextFunction } from "express";
import ProblemContext from "../models/ProblemContext";
import DeepAnalysis from "../models/DeepAnalysis";
import { runDeepAnalysis } from "../services/analysis/deepAnalysisEngine";

const MOCK_USER_ID = "60c72b2f9b1d8b001c8e4b7a";

export const analyzeContext = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const context = await ProblemContext.findOne({ _id: req.params.id, userId: MOCK_USER_ID });
        if (!context) {
            res.status(404);
            throw new Error("Context not found or unauthorized");
        }

        // Idempotency check: if analysis exists, return it without rebuilding unnecessarily
        const existingAnalysis = await DeepAnalysis.findOne({ contextId: context._id });
        if (existingAnalysis && existingAnalysis.status === 'completed') {
            res.json({ success: true, message: "Analysis retrieved from cache", data: existingAnalysis });
            return;
        }

        // Generate strict analysis utilizing the independent module rules
        const analysisPayload = runDeepAnalysis(context);

        // Commit to DB mappings
        const finalDocument = await DeepAnalysis.findOneAndUpdate(
            { contextId: context._id },
            {
                $set: {
                    userId: MOCK_USER_ID,
                    contextId: context._id,
                    ...analysisPayload
                }
            },
            { upsert: true, new: true, runValidators: true }
        );

        // Update the base Context status logically mapping to Analysis pipeline progression
        context.status = "ready_for_analysis";
        await context.save();

        res.status(201).json({ success: true, message: "Context analyzed successfully", data: finalDocument });
    } catch (error) {
        next(error);
    }
};

export const getContextAnalysis = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const analysis = await DeepAnalysis.findOne({ contextId: req.params.id, userId: MOCK_USER_ID }).sort({ createdAt: -1 });
        if (!analysis) {
            res.status(404);
            throw new Error("Analysis not found");
        }
        res.json({ success: true, data: analysis });
    } catch (error) {
        next(error);
    }
};

export const getAnalysisById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const analysis = await DeepAnalysis.findOne({ _id: req.params.id, userId: MOCK_USER_ID });
        if (!analysis) {
            res.status(404);
        }
        res.json({ success: true, data: analysis });
    } catch (error) {
        next(error);
    }
};
