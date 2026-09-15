import React from "react";
import { ProblemContext } from "@/types/context";
import { mockLanguages } from "@/data/mock/languages";
import { DOMAINS, EXPERIENCES, PROBLEM_TYPES, SKILLS, OUTPUT_STYLES } from "@/data/constants";

export function StepReview({ ctx }: { ctx: Partial<ProblemContext> }) {
    const language = mockLanguages.find(l => l.id === ctx.language)?.name || "Not selected";
    const domain = DOMAINS.find(d => d.id === ctx.domain)?.name || "Not selected";
    const problemType = PROBLEM_TYPES.find(p => p.id === ctx.problemType)?.name || "Not selected";

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Review Your Context</h2>
                <p className="text-neutral-500 dark:text-neutral-400">Make sure everything looks right before analyzing.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-neutral-500 uppercase text-xs tracking-wider mb-2">Core Identity</h3>
                        <div className="grid grid-cols-2 gap-2 border-l-2 border-indigo-500 pl-4">
                            <div><span className="text-neutral-400 block">Language</span> <span className="font-medium">{language}</span></div>
                            <div><span className="text-neutral-400 block">Domain</span> <span className="font-medium">{domain}</span></div>
                            <div><span className="text-neutral-400 block">Difficulty</span> <span className="font-medium">{ctx.difficulty}</span></div>
                            <div><span className="text-neutral-400 block">Experience</span> <span className="font-medium">{ctx.experienceLevel}</span></div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-neutral-500 uppercase text-xs tracking-wider mb-2">Technical Focus</h3>
                        <div className="border-l-2 border-indigo-500 pl-4 space-y-2">
                            <div><span className="text-neutral-400 block">Problem Type</span> <span className="font-medium">{problemType}</span></div>
                            <div>
                                <span className="text-neutral-400 block">Skills</span>
                                <span className="font-medium line-clamp-2">
                                    {ctx.skills?.map(s => SKILLS.find(x => x.id === s)?.name).join(", ")}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-neutral-500 uppercase text-xs tracking-wider mb-2">Scenario</h3>
                        <div className="border-l-2 border-indigo-500 pl-4 bg-neutral-50 dark:bg-neutral-900/50 p-2 rounded-r-md">
                            <p className="whitespace-pre-wrap">{ctx.scenario}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-neutral-500 uppercase text-xs tracking-wider mb-2">Constraints</h3>
                        <div className="border-l-2 border-indigo-500 pl-4 space-y-1">
                            {ctx.constraints?.inputSize && <div><span className="text-neutral-400">Input Size:</span> {ctx.constraints.inputSize}</div>}
                            {ctx.constraints?.timeRequirement && <div><span className="text-neutral-400">Time:</span> {ctx.constraints.timeRequirement}</div>}
                            {ctx.constraints?.memoryRequirement && <div><span className="text-neutral-400">Memory:</span> {ctx.constraints.memoryRequirement}</div>}
                            {ctx.outputStyle && <div><span className="text-neutral-400">Style:</span> {OUTPUT_STYLES.find(o => o.id === ctx.outputStyle)?.name}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
