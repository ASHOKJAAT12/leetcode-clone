export const mapAlgorithms = (normalized: any, constraints: any) => {
    const techniques = [];
    const joinedSkills = normalized.skills.join(" ").toLowerCase();

    // Basic deterministic algorithm matrix
    if (joinedSkills.includes("graph") || joinedSkills.includes("tree")) {
        techniques.push({
            technique: "BFS/DFS or Dijkstra",
            reason: "Common traversal approach for node architectures.",
            applicability: "High",
            expectedComplexity: "O(V + E)"
        });
    }

    if (joinedSkills.includes("hash") || constraints.inferredConstraints[0].includes("avoided")) {
        techniques.push({
            technique: "Hash Map Cache",
            reason: "Reduces lookups bounds.",
            applicability: "Excellent",
            expectedComplexity: "O(n)"
        });
    }

    if (techniques.length === 0) {
        techniques.push({
            technique: "Brute Force / Linear Scan",
            reason: "Default fallback array parse strategy.",
            applicability: "Good",
            expectedComplexity: "O(n^2)"
        });
    }

    return techniques;
};
