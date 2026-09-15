export const generateTitle = (analysis: any): string => {
    const domain = analysis.domainAnalysis.domain;
    const primaryEntity = analysis.domainAnalysis.entities?.[0] || 'Entity';
    const role = analysis.scenarioAnalysis.scenarioType.includes('High') ? 'Optimizer' : 'Analyzer';

    if (domain.includes('Commerce')) return `Customer Order Spending ${role}`;
    if (domain.includes('Smart City')) return `Emergency Route ${role}`;
    if (domain.includes('Food')) return `Food Delivery Driver ${role}`;
    if (domain.includes('Health')) return `Hospital Patient Queue Manager`;

    return `${domain} ${primaryEntity} ${role}`;
};

export const generateBackground = (analysis: any): string => {
    const domain = analysis.domainAnalysis.domain;
    if (domain.includes('Commerce')) {
        return `An online E-Commerce platform processes millions of transaction requests daily. To maintain scalability, the data team needs a reliable deterministic algorithm to parse transaction chunks and determine top metrics efficiently.`;
    }
    if (domain.includes('Smart City')) {
        return `The city's traffic management grid handles thousands of intersections. Emergency vehicles must parse logical road networks dynamically minimizing delay through optimized structural paths.`;
    }
    return `A system operating in the ${domain} domain processes large volumes of data related to ${analysis.domainAnalysis.entities?.join(', ')}. Scale requires an efficient, logically bound routine.`;
};

export const generateConstraints = (analysis: any) => {
    return {
        explicit: analysis.constraintAnalysis.importantConstraints.map((c: string) => `Explicit Limit: ${c}`),
        inferred: analysis.constraintAnalysis.inferredConstraints.map((c: string) => `Inferred: ${c}`)
    };
};

export const generateStarterCode = (language: string) => {
    const lang = language.toLowerCase();

    if (lang === 'python') {
        return `def solve():
    # Write your solution here
    pass

if __name__ == "__main__":
    solve()`;
    }

    if (lang === 'c++' || lang === 'cpp') {
        return `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Write your solution here
    return 0;
}`;
    }

    if (lang === 'javascript' || lang === 'js') {
        return `function solve() {
    // Write your solution here
}

solve();`;
    }

    if (lang.includes('java')) {
        return `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Write your solution here
    }
}`;
    }

    return `// Write your ${language} solution here`;
};

export const generateExamples = (analysis: any) => {
    return [
        {
            input: `3\n101 500\n102 300\n103 800`,
            output: `103\n101\n102`,
            explanation: `Standard expected ranking prioritizing highest values resolving constraints natively.`
        },
        {
            input: `2\n201 500\n202 500`,
            output: `201\n202`,
            explanation: `Resolving ties deterministically relying on lower IDs sequentially.`
        }
    ];
};
