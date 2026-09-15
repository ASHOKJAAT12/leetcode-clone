import React from "react";
import { ProblemContext } from "@/types/context";
import { SKILLS, DOMAINS } from "@/data/constants";
import { Badge } from "@/components/ui/Badge";
import { X, Search } from "lucide-react";
import { Input } from "@/components/ui/Input";

export function StepSkills({ ctx, update }: { ctx: Partial<ProblemContext>, update: (v: Partial<ProblemContext>) => void }) {
    const [search, setSearch] = React.useState("");
    const selectedDomain = DOMAINS.find(d => d.id === ctx.domain);
    const suggested = selectedDomain ? selectedDomain.commonSkills.filter(s => !ctx.skills?.includes(s)) : [];

    const filteredSkills = SKILLS.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) && !ctx.skills?.includes(s.id));

    const addSkill = (id: string) => {
        if (!ctx.skills?.includes(id)) {
            update({ skills: [...(ctx.skills || []), id] });
        }
    }

    const removeSkill = (id: string) => {
        update({ skills: (ctx.skills || []).filter(s => s !== id) });
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Technical Skills</h2>
                <p className="text-neutral-500 dark:text-neutral-400">Select the concepts this problem should involve.</p>
            </div>

            {ctx.skills && ctx.skills.length > 0 && (
                <div className="p-4 border rounded-md dark:border-neutral-800">
                    <div className="text-sm font-medium mb-3">Selected Skills</div>
                    <div className="flex flex-wrap gap-2">
                        {ctx.skills.map(skillId => {
                            const skill = SKILLS.find(s => s.id === skillId);
                            if (!skill) return null;
                            return (
                                <Badge key={skill.id} variant="default" className="text-sm pr-1">
                                    {skill.name}
                                    <button onClick={() => removeSkill(skill.id)} className="ml-2 hover:bg-indigo-700 rounded-full p-0.5"><X className="h-3 w-3" /></button>
                                </Badge>
                            )
                        })}
                    </div>
                    <button onClick={() => update({ skills: [] })} className="text-xs text-neutral-500 hover:underline mt-4">Clear all</button>
                </div>
            )}

            {suggested.length > 0 && (
                <div>
                    <div className="text-sm font-medium mb-2 text-indigo-600 dark:text-indigo-400">Suggested for {selectedDomain?.name}</div>
                    <div className="flex flex-wrap gap-2">
                        {suggested.map(skillId => {
                            const skill = SKILLS.find(s => s.id === skillId);
                            if (!skill) return null;
                            return (
                                <Badge key={skill.id} variant="secondary" className="cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 text-sm" onClick={() => addSkill(skill.id)}>
                                    + {skill.name}
                                </Badge>
                            )
                        })}
                    </div>
                </div>
            )}

            <div>
                <div className="relative mb-3">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
                    <Input placeholder="Search skills..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto p-1">
                    {filteredSkills.map(skill => (
                        <Badge key={skill.id} variant="outline" className="cursor-pointer border-neutral-300 dark:border-neutral-700 hover:border-indigo-500 dark:hover:border-indigo-400 text-sm" onClick={() => addSkill(skill.id)}>
                            {skill.name}
                        </Badge>
                    ))}
                    {filteredSkills.length === 0 && <span className="text-sm text-neutral-500">No matching skills found.</span>}
                </div>
            </div>
        </div>
    )
}
