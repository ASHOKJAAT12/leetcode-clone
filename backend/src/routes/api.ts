import { Router } from "express";
import { getLanguages, getDomains, getTags, getCategories } from "../controllers/masterDataController";
import { createContext, getContexts, getContextById, updateContext, deleteContext, validateContextPayload } from "../controllers/contextController";
import { analyzeContext, getContextAnalysis, getAnalysisById } from "../controllers/analysisController";
import { generateProblem, getProblems, getProblemBySlug } from "../controllers/problemController";
import { runCode } from "../controllers/executionController";
import { submitCode, getSubmissions, getSubmissionById } from "../controllers/submissionController";

const router = Router();

// Master Data Routes
router.get("/languages", getLanguages);
router.get("/domains", getDomains);
router.get("/tags", getTags);
router.get("/categories", getCategories);

// Context Routes
router.post("/contexts", createContext);
router.get("/contexts", getContexts);
router.get("/contexts/:id", getContextById);
router.put("/contexts/:id", updateContext);
router.delete("/contexts/:id", deleteContext);
router.post("/contexts/:id/validate", validateContextPayload);

// Deep Analysis Routes
router.post("/contexts/:id/analyze", analyzeContext);
router.get("/contexts/:id/analysis", getContextAnalysis);
router.get("/analyses/:id", getAnalysisById);

// Problem Generation Routes
router.post("/contexts/:id/generate-problem", generateProblem);
router.get("/problems", getProblems);
router.get("/problems/:slug", getProblemBySlug);

// Phase 7: Judge Execution & Submission Layer
router.post("/execution/run", runCode);
router.post("/submissions", submitCode);
router.get("/submissions", getSubmissions);
router.get("/submissions/:id", getSubmissionById);

export default router;
