export type Difficulty = "Easy" | "Medium" | "Hard" | "Expert";

export interface Problem {
    id: string;
    slug: string;
    title: string;
    difficulty: Difficulty;
    category: string;
    tags: string[];
    acceptanceRate: number;
    description?: string;
    expectedSkills?: string[];
}

export interface Submission {
    id: string;
    problemId: string;
    problemTitle: string;
    language: string;
    status: "Accepted" | "Wrong Answer" | "Compilation Error" | "Runtime Error" | "Time Limit Exceeded" | "Memory Limit Exceeded" | "Pending";
    runtime: number; // ms
    memory: number; // MB
    submittedAt: string; // ISO string
}

export interface User {
    id: string;
    username: string;
    joinedDate: string;
    problemsSolved: number;
    streak: number;
    badges: string[];
}

export interface Contest {
    id: string;
    title: string;
    date: string;
    durationMinutes: number;
    problemCount: number;
    status: "Upcoming" | "Active" | "Past";
}

export interface Language {
    id: string;
    name: string;
    monacoLanguage: string;
    starterCode: string;
}
