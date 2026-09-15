import { useState, useEffect, useCallback, useRef } from "react";
import { EditorPersistenceService, EditorState } from "@/services/EditorPersistenceService";

// Standardize fallback generator if Phase 5 only saved one generic block natively.
const getStarterTemplate = (lang: string, problem: any) => {
    // If the problem explicitly matched a schema struct for `starterCode[lang]` safely use it.
    if (problem?.starterCode && typeof problem.starterCode === "object" && problem.starterCode[lang]) {
        return problem.starterCode[lang];
    }

    // Otherwise fallback generic bounding
    const dict: Record<string, string> = {
        python: `def solve():\n    # Write your solution here\n    pass\n\nif __name__ == "__main__":\n    solve()`,
        cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // Write your solution here\n    return 0;\n}`,
        javascript: `function solve() {\n    // Write your solution here\n}\n\nsolve();`,
        java: `import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Write your solution here\n    }\n}`,
        c: `#include <stdio.h>\n\nint main() {\n    // Write your solution here\n    return 0;\n}`,
        csharp: `using System;\n\npublic class Program {\n    public static void Main() {\n        // Write your solution here\n    }\n}`,
        go: `package main\n\nimport "fmt"\n\nfunc main() {\n    // Write your solution here\n}`
    };

    return dict[lang] || `// Write your ${lang} solution here`;
};

export function useCodeEditor(problem: any) {
    const [activeLanguage, setActiveLanguage] = useState<string>("python");
    const [codeByLanguage, setCodeByLanguage] = useState<Record<string, string>>({});
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    // Initialization bindings cleanly
    useEffect(() => {
        if (!problem) return;

        const initialLang = (problem.language || "python").toLowerCase();
        setActiveLanguage(initialLang);

        // Attempt load from localStorage securely mapped against problem._id
        const savedCode = EditorPersistenceService.loadLanguageCode(problem._id, initialLang);

        setCodeByLanguage(prev => ({
            ...prev,
            [initialLang]: savedCode || getStarterTemplate(initialLang, problem)
        }));

    }, [problem]);

    const setCode = useCallback((code: string) => {
        setCodeByLanguage(prev => ({ ...prev, [activeLanguage]: code }));
        setHasUnsavedChanges(true);

        // Auto Save logic mapped perfectly explicitly capturing debounce scopes safely.
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
            if (problem?._id) {
                EditorPersistenceService.saveCode(problem._id, activeLanguage, code);
                setHasUnsavedChanges(false);
            }
        }, 1000);
    }, [activeLanguage, problem]);

    const switchLanguage = useCallback((lang: string) => {
        setActiveLanguage(lang);

        // Check if we already loaded it bounds checking in state directly
        if (!codeByLanguage[lang]) {
            const saved = EditorPersistenceService.loadLanguageCode(problem?._id, lang);
            setCodeByLanguage(prev => ({
                ...prev,
                [lang]: saved || getStarterTemplate(lang, problem)
            }));
        }
    }, [codeByLanguage, problem]);

    const resetCode = useCallback(() => {
        const fresh = getStarterTemplate(activeLanguage, problem);
        setCode(fresh);
    }, [activeLanguage, problem, setCode]);

    return {
        activeLanguage,
        currentCode: codeByLanguage[activeLanguage] || "",
        setCode,
        switchLanguage,
        resetCode,
        hasUnsavedChanges
    };
}
