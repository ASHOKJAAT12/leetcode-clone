export type DifficultyLevel = "Easy" | "Medium" | "Hard" | "Expert";
export type ExperienceLevel = "Beginner" | "Intermediate" | "Advanced" | "Professional";

export interface DomainMetadata {
    id: string;
    name: string;
    description: string;
    commonSkills: string[];
}

export interface SkillMetadata {
    id: string;
    name: string;
}

export interface ProblemTypeMetadata {
    id: string;
    name: string;
    description: string;
}

export interface ProblemContext {
    id?: string;
    language: string;
    domain: string;
    difficulty: DifficultyLevel | "";
    experienceLevel: ExperienceLevel | "";
    problemType: string;
    skills: string[];
    scenario: string;

    constraints: {
        inputSize?: string;
        timeRequirement?: string;
        memoryRequirement?: string;
        dataVolume?: string;
        businessRules?: string;
    };

    outputStyle?: string;

    createdAt?: string;
    updatedAt?: string;
}
