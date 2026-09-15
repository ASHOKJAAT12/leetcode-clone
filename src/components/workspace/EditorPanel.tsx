import React, { useState } from "react";
import { EditorToolbar } from "./EditorToolbar";
import Editor from "@monaco-editor/react";
import { useCodeEditor } from "@/hooks/useCodeEditor";

interface EditorPanelProps {
    problem: any;
    language: string;
    code: string;
    onCodeChange: (val: string) => void;
    onLanguageChange: (lang: string) => void;
    onReset: () => void;
    onRun: () => void;
    onSubmit: () => void;
    hasUnsavedChanges: boolean;
    isRunning: boolean;
    isSubmitting: boolean;
}

export function EditorPanel({ problem, language, code, onCodeChange, onLanguageChange, onReset, onRun, onSubmit, hasUnsavedChanges, isRunning, isSubmitting }: EditorPanelProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);

    if (!problem) return null;

    const baseClasses = "w-full h-full flex flex-col bg-[#1e1e1e] overflow-hidden";
    const fullscreenClasses = isFullscreen ? "fixed inset-0 z-50 rounded-none border-none shadow-2xl" : "rounded-lg";

    return (
        <div className={`${baseClasses} ${fullscreenClasses}`}>
            <EditorToolbar
                language={language}
                code={code}
                isFullscreen={isFullscreen}
                onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
                onLanguageChange={onLanguageChange}
                onReset={onReset}
                onRun={onRun}
                onSubmit={onSubmit}
                isRunning={isRunning}
                isSubmitting={isSubmitting}
            />

            <div className="flex-1 relative">
                <Editor
                    height="100%"
                    language={language}
                    theme="vs-dark"
                    value={code}
                    onChange={(val) => onCodeChange(val || "")}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        wordWrap: "on",
                        tabSize: 4,
                        automaticLayout: true,
                        padding: { top: 16 }
                    }}
                    loading={
                        <div className="flex items-center justify-center w-full h-full text-neutral-500 text-sm font-mono">
                            Initializing Monaco Engine...
                        </div>
                    }
                />
            </div>

            <div className="shrink-0 h-6 bg-[#007acc] text-white flex items-center px-4 justify-between text-xs font-sans tracking-wide">
                <span>Phase 6 Sandbox Editor</span>
                <span className="flex items-center gap-4">
                    {hasUnsavedChanges ? <span className="text-amber-300 italic">Unsaved changes...</span> : <span className="text-emerald-300">Saved locally</span>}
                    <span>UTF-8</span>
                </span>
            </div>
        </div>
    );
}
