export type ComparisonResult = {
    isMatch: boolean;
    reason?: string;
};

export type ComparatorConfig = {
    type: "exact" | "whitespace-normalized" | "numeric";
    absoluteTolerance?: number; // E.g., 1e-5
};

export class OutputComparator {

    /**
     * Replaces CR, LF bounds with standard spaces and trims trailing buffers smoothly ensuring naive comparison rules safely.
     */
    private normalizeWhitespace(str: string): string {
        return (str || "").replace(/\r\n/g, "\n").trim().replace(/\s+$/gm, "");
    }

    private normalizeTokens(str: string): string[] {
        return (str || "").trim().split(/\s+/);
    }

    compare(actual: string, expected: string, config: ComparatorConfig = { type: "whitespace-normalized" }): ComparisonResult {
        if (!actual && actual !== "") return { isMatch: false, reason: "No output generated" };

        try {
            switch (config.type) {
                case "exact":
                    return {
                        isMatch: actual === expected,
                        reason: actual === expected ? undefined : "Output did not exactly match."
                    };

                case "whitespace-normalized": {
                    const normActual = this.normalizeWhitespace(actual);
                    const normExpected = this.normalizeWhitespace(expected);

                    if (normActual === normExpected) {
                        return { isMatch: true };
                    }

                    // Token level strict checking to ensure no false positives occur on partial string matches.
                    const actTokens = this.normalizeTokens(normActual);
                    const expTokens = this.normalizeTokens(normExpected);

                    if (actTokens.length !== expTokens.length) {
                        return { isMatch: false, reason: "Output length or format mismatch." };
                    }

                    for (let i = 0; i < actTokens.length; i++) {
                        if (actTokens[i] !== expTokens[i]) {
                            return { isMatch: false, reason: `Mismatch at token ${i + 1}: expected '${expTokens[i]}' got '${actTokens[i]}'` };
                        }
                    }

                    return { isMatch: true };
                }

                case "numeric": {
                    // Parsing sequences for float bindings.
                    const actTokens = this.normalizeTokens(actual);
                    const expTokens = this.normalizeTokens(expected);

                    if (actTokens.length !== expTokens.length) return { isMatch: false };

                    const tol = config.absoluteTolerance || 1e-5;

                    for (let i = 0; i < actTokens.length; i++) {
                        const numAct = parseFloat(actTokens[i]);
                        const numExp = parseFloat(expTokens[i]);

                        if (isNaN(numAct) || isNaN(numExp)) {
                            if (actTokens[i] !== expTokens[i]) return { isMatch: false };
                            continue;
                        }

                        if (Math.abs(numAct - numExp) > tol) {
                            return { isMatch: false };
                        }
                    }
                    return { isMatch: true };
                }

                default:
                    return { isMatch: false, reason: "Unsupported comparator type" };
            }
        } catch (err) {
            return { isMatch: false, reason: "Comparator encountered parsing error." };
        }
    }
}
