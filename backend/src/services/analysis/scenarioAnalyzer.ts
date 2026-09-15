export const analyzeScenario = (normalized: any, domainData: any) => {
    const text = normalized.scenario.toLowerCase();
    let type = "Standard processing";
    let flows = ["Input receiving", "Processing algorithm", "Output generation"];

    if (text.includes("fast") || text.includes("real-time") || text.includes("latency")) {
        type = "High-performance processing";
        flows = ["Stream ingestion", "Fast calculation", "Real-time output"];
    }

    return {
        scenarioType: type,
        mainActors: ["System", ...domainData.entities.slice(0, 1)],
        mainEntities: domainData.entities,
        processFlow: flows,
        businessRules: ["Input must be validated prior to processing"]
    };
};
