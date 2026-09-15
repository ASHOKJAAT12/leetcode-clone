"use client";
import React, { useState, useEffect } from "react";
import { contextService } from "@/services/contextService";
import { ProblemContext } from "@/types/context";
import { Button } from "@/components/ui/Button";
import { StepLanguage, StepDomain, StepDifficultyAndExperience, StepProblemType } from "./WizardSteps1";
import { StepSkills } from "./WizardSteps2";
import { StepScenario, StepConstraints } from "./WizardSteps3";
import { StepReview } from "./WizardSteps4";

const STEPS = [
    "Language", "Domain", "Complexity", "Skills", "Type", "Scenario", "Constraints", "Review"
];

export function ContextWizard({ onComplete }: { onComplete: (ctx: ProblemContext) => void }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [context, setContext] = useState<Partial<ProblemContext>>({});
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const draft = contextService.getDraft();
        if (draft) setContext(draft);
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) contextService.saveDraft(context);
    }, [context, mounted]);

    const updateContext = (patch: Partial<ProblemContext>) => setContext(prev => ({ ...prev, ...patch }));

    const validateStep = () => {
        switch (currentStep) {
            case 0: return !!context.language;
            case 1: return !!context.domain;
            case 2: return !!context.difficulty && !!context.experienceLevel;
            case 3: return !!context.skills && context.skills.length > 0;
            case 4: return !!context.problemType;
            case 5: return !!context.scenario && context.scenario.length >= 50;
            case 6: return true;
            case 7: return true;
            default: return false;
        }
    }

    const nextParams = () => {
        if (currentStep === STEPS.length - 1) {
            const fin = contextService.finalizeContext(context as ProblemContext);
            onComplete(fin);
        } else {
            setCurrentStep(c => c + 1);
        }
    }

    const resetForm = () => {
        contextService.deleteDraft();
        setContext({});
        setCurrentStep(0);
    }

    if (!mounted) return <div className="p-8 text-center text-neutral-500 animate-pulse">Loading draft...</div>;

    return (
        <div className="w-full max-w-4xl mx-auto py-8">
            {/* Progress Bar */}
            <div className="mb-8 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800 h-2">
                <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }} />
            </div>
            <div className="flex justify-between mb-8 text-xs font-medium text-neutral-500 hidden sm:flex">
                {STEPS.map((s, i) => (
                    <div key={s} className={`flex-1 text-center ${i === currentStep ? 'text-indigo-600 dark:text-indigo-400' : i < currentStep ? 'text-neutral-900 dark:text-neutral-100' : ''}`}>
                        {s}
                    </div>
                ))}
            </div>

            <div className="min-h-[400px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 md:p-8 rounded-xl shadow-sm">
                {currentStep === 0 && <StepLanguage ctx={context} update={updateContext} />}
                {currentStep === 1 && <StepDomain ctx={context} update={updateContext} />}
                {currentStep === 2 && <StepDifficultyAndExperience ctx={context} update={updateContext} />}
                {currentStep === 3 && <StepSkills ctx={context} update={updateContext} />}
                {currentStep === 4 && <StepProblemType ctx={context} update={updateContext} />}
                {currentStep === 5 && <StepScenario ctx={context} update={updateContext} />}
                {currentStep === 6 && <StepConstraints ctx={context} update={updateContext} />}
                {currentStep === 7 && <StepReview ctx={context} />}
            </div>

            <div className="mt-8 flex justify-between items-center">
                <div className="space-x-2">
                    <Button variant="outline" onClick={() => setCurrentStep(c => Math.max(0, c - 1))} disabled={currentStep === 0}>
                        Back
                    </Button>
                    {currentStep === 0 && Object.keys(context).length > 0 && (
                        <Button variant="ghost" onClick={resetForm} className="text-red-500 hover:text-red-600">Start New</Button>
                    )}
                </div>
                <div className="flex items-center space-x-4">
                    {currentStep < STEPS.length - 1 && Object.keys(context).length > 0 && <span className="hidden sm:inline text-sm text-neutral-500 mr-2">Draft saved</span>}
                    <Button onClick={nextParams} disabled={!validateStep()}>
                        {currentStep === STEPS.length - 1 ? "Analyze Context" : "Next"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
