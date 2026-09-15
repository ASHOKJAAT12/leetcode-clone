import { DomainMetadata, ExperienceLevel, ProblemTypeMetadata, SkillMetadata } from "../types/context";

export const EXPERIENCES = [
    { id: "Beginner", name: "Beginner", description: "Learning core syntax and basic loops." },
    { id: "Intermediate", name: "Intermediate", description: "Comfortable with standard library, basic API design." },
    { id: "Advanced", name: "Advanced", description: "Efficient data structures, scaling, and optimizations." },
    { id: "Professional", name: "Professional", description: "Production-grade patterns, tight constraints, high availability." },
];

export const PROBLEM_TYPES: ProblemTypeMetadata[] = [
    { id: "algorithmic", name: "Algorithmic", description: "Standard logic puzzles using core data structures." },
    { id: "data-processing", name: "Data Processing", description: "Transforming, aggregating, and filtering datasets." },
    { id: "debugging", name: "Debugging", description: "Fixing bugs in an existing flawed implementation." },
    { id: "optimization", name: "Optimization", description: "Improving time/space complexity of an existing approach." },
    { id: "api-logic", name: "API Logic", description: "Designing handler functions for web requests." },
    { id: "business-logic", name: "Business Logic", description: "Real application requirements, rules and workflows." },
    { id: "system-design", name: "System Design", description: "Architectural component design and interactions." },
];

export const SKILLS: SkillMetadata[] = [
    { id: "arrays", name: "Arrays" },
    { id: "strings", name: "Strings" },
    { id: "hash-maps", name: "Hash Maps" },
    { id: "sorting", name: "Sorting" },
    { id: "searching", name: "Searching" },
    { id: "stack", name: "Stack" },
    { id: "queue", name: "Queue" },
    { id: "linked-list", name: "Linked List" },
    { id: "tree", name: "Tree" },
    { id: "graph", name: "Graph" },
    { id: "heap", name: "Heap" },
    { id: "dynamic-programming", name: "Dynamic Programming" },
    { id: "greedy", name: "Greedy" },
    { id: "recursion", name: "Recursion" },
    { id: "backtracking", name: "Backtracking" },
    { id: "database", name: "Database" },
    { id: "sql", name: "SQL" },
    { id: "data-processing", name: "Data Processing" },
    { id: "optimization", name: "Optimization" },
    { id: "backend", name: "Backend" },
    { id: "api-design", name: "API Design" },
    { id: "system-design", name: "System Design" },
    { id: "caching", name: "Caching" },
    { id: "authentication", name: "Authentication" }
];

export const DOMAINS: DomainMetadata[] = [
    { id: "ecommerce", name: "E-Commerce", description: "Customer orders, inventory, discounts.", commonSkills: ["hash-maps", "sorting", "database", "api-design"] },
    { id: "banking", name: "Banking & Finance", description: "Ledgers, transactions, rate limits.", commonSkills: ["database", "hash-maps", "optimization", "backend"] },
    { id: "healthcare", name: "Healthcare", description: "Patient queues, scheduling, medical data.", commonSkills: ["queue", "sorting", "data-processing"] },
    { id: "smart-city", name: "Smart City", description: "Traffic, parking, civic resources.", commonSkills: ["graph", "arrays", "optimization"] },
    { id: "social-media", name: "Social Media", description: "News feeds, followers, graphing.", commonSkills: ["graph", "tree", "caching", "system-design"] },
    { id: "logistics", name: "Logistics & Delivery", description: "Routing, inventory tracking, ETAs.", commonSkills: ["graph", "optimization", "hash-maps"] },
];

export const OUTPUT_STYLES = [
    { id: "learning", name: "Learning-focused" },
    { id: "interview", name: "Interview-focused" },
    { id: "production", name: "Production-oriented" },
    { id: "optimization", name: "Optimization-focused" },
    { id: "beginner", name: "Beginner-friendly" },
    { id: "detailed", name: "Detailed technical" },
];
