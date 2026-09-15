export const analyzeLearningObjectives = (normalized: any) => {
    return [
        {
            objective: `Understand and apply ${normalized.skills[0] || 'core algorithm'} efficiently.`,
            importance: "High"
        },
        {
            objective: `Identify proper bounds bounds matching ${normalized.problemType} domains.`,
            importance: "Medium"
        }
    ];
};
