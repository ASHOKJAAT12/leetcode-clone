export const analyzeLanguage = (normalized: any) => {
    const lang = normalized.language;
    let recommendedFeatures = ["Standard library types"];
    let recommendedDataStructures = ["Array"];
    let performanceConsiderations = ["General runtime limits"];
    let commonPitfalls = ["Type coercion bugs"];

    if (lang === "python") {
        recommendedFeatures = ["Generators", "List Comprehensions"];
        recommendedDataStructures = ["dict", "set", "heapq", "list"];
        performanceConsiderations = ["C-level array limits", "GIL bounds if parallel"];
        commonPitfalls = ["Shallow copy issues", "Mutable default arguments"];
    } else if (lang === "c++" || lang === "cpp") {
        recommendedFeatures = ["STL Iterators", "pass-by-reference"];
        recommendedDataStructures = ["std::vector", "std::unordered_map", "std::priority_queue"];
        performanceConsiderations = ["Memory allocation overhead", "Cache misses"];
        commonPitfalls = ["Dangling pointers", "Out of bounds segmentation faults"];
    } else if (lang === "javascript") {
        recommendedFeatures = ["Higher order functions (map/reduce)", "Destructuring"];
        recommendedDataStructures = ["Map", "Set", "Array"];
        performanceConsiderations = ["V8 Optimization bounds", "Single-threaded event loop"];
        commonPitfalls = ["Object prototype pollution", "Unexpected NaN conversions"];
    }

    return {
        language: lang,
        recommendedFeatures,
        recommendedDataStructures,
        performanceConsiderations,
        commonPitfalls
    };
};
