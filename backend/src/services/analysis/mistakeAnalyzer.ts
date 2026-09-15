export const analyzeMistakes = (normalized: any) => {
    return [
        {
            mistake: "Using nested loops where Hash Maps scale linearly.",
            reason: "Large datasets fail violently under O(n^2) timeouts natively.",
            severity: "High"
        },
        {
            mistake: "Ignoring case limits leading to out-of-bounds array reads.",
            reason: "Generic unhandled boundary bounds.",
            severity: "Medium"
        }
    ];
};
