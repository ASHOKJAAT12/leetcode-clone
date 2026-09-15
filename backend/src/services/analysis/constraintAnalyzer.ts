export const analyzeConstraints = (normalized: any) => {
    const size = normalized.constraints?.inputSize || "Small";
    const isLarge = size.toLowerCase().includes("million") || size.includes("large") || size.includes("1,000,000");

    return {
        inputScale: size,
        timeSensitivity: normalized.constraints?.timeRequirement || "Standard",
        memorySensitivity: normalized.constraints?.memoryRequirement || "Standard",
        scalabilityLevel: isLarge ? "High" : "Standard",
        importantConstraints: [
            `Data Volume: ${size}`
        ],
        inferredConstraints: isLarge ? ["O(n^2) MUST be avoided"] : ["Standard brute force may pass"]
    };
};
