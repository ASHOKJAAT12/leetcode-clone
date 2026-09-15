"use client";
import React from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { Skeleton } from "@/components/ui/Skeleton";

interface CodeEditorProps {
    language: string;
    value: string;
    onChange: (value: string | undefined) => void;
}

export function CodeEditor({ language, value, onChange }: CodeEditorProps) {
    const { theme } = useTheme();

    return (
        <Editor
            height="100%"
            language={language}
            value={value}
            theme={theme === "dark" ? "vs-dark" : "light"}
            onChange={onChange}
            loading={<Skeleton className="h-full w-full rounded-none" />}
            options={{
                minimap: { enabled: false },
                fontSize: 14,
                padding: { top: 16 },
                scrollBeyondLastLine: false,
            }}
        />
    );
}
