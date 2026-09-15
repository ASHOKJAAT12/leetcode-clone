import { Request, Response } from "express";
import ProblemContext from "../models/ProblemContext";
import DeepAnalysis from "../models/DeepAnalysis";
import GeneratedProblem from "../models/GeneratedProblem";
import { generateRealWorldProblem } from "../services/generation/RuleBasedProblemGenerationEngine";

export const generateProblem = async (req: Request, res: Response): Promise<void> => {
    try {
        const contextId = req.params.id;

        // Validate Context
        const context = await ProblemContext.findById(contextId);
        if (!context) {
            res.status(404).json({ error: "Context not found" });
            return;
        }

        // Load Latest Valid Analysis
        const analysis = await DeepAnalysis.findOne({ contextId, status: "completed" }).sort({ version: -1 });
        if (!analysis) {
            res.status(409).json({ error: "Analysis required before problem generation." });
            return;
        }

        // Check Idempotency - if problem exists for this analysis, return it
        const existingProblem = await GeneratedProblem.findOne({ analysisId: analysis._id });
        if (existingProblem) {
            res.json(existingProblem);
            return;
        }

        // Generate Problem
        const generatedData = generateRealWorldProblem(context, analysis);

        // Ensure unique slug explicitly mapping numeric increments
        let slug = generatedData.slug;
        let counter = 1;
        while (await GeneratedProblem.exists({ slug })) {
            slug = `${generatedData.slug}-${counter}`;
            counter++;
        }

        generatedData.slug = slug;

        // Save and Validate
        const problem = new GeneratedProblem(generatedData);
        await problem.save();

        res.status(201).json(problem);
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Failed to generate problem" });
    }
};

export const getProblemBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
        const problem = await GeneratedProblem.findOne({ slug: req.params.slug });
        if (!problem) {
            res.status(404).json({ error: "Problem not found" });
            return;
        }
        res.json(problem);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getProblems = async (req: Request, res: Response): Promise<void> => {
    try {
        const filters: any = { status: "published" };

        // Allowed Admin Fetch matching explicit query overrides securely
        if (req.query.status) filters.status = req.query.status;
        if (req.query.domain) filters.domain = req.query.domain;
        if (req.query.difficulty) filters.difficulty = req.query.difficulty;

        const problems = await GeneratedProblem.find(filters).sort({ createdAt: -1 });
        res.json(problems);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
