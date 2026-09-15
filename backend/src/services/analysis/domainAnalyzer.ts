export const analyzeDomain = (normalized: any) => {
    const d = normalized.domain.toLowerCase();

    if (d.includes("smart") || d.includes("city")) {
        return {
            domain: normalized.domain,
            entities: ["Road", "Intersection", "Vehicle", "Sensor"],
            workflows: ["Routing", "Monitoring", "Dispatching"],
            businessConcepts: ["Latency", "Distance", "Efficiency"],
            likelyData: ["Graphs", "Coordinates", "Timestamps"]
        };
    }

    if (d.includes("commerce")) {
        return {
            domain: normalized.domain,
            entities: ["Customer", "Order", "Product", "Cart"],
            workflows: ["Checkout", "Inventory update", "Payments"],
            businessConcepts: ["Discounts", "Totals", "Taxes"],
            likelyData: ["Transactions", "Prices", "Quantities"]
        };
    }

    return {
        domain: normalized.domain,
        entities: ["User", "Record", "System"],
        workflows: ["Process Data", "Calculate Result"],
        businessConcepts: ["Validation", "Execution"],
        likelyData: ["Strings", "Numbers", "Arrays"]
    };
};
