import React, { useState } from "react";
import { Play, Send, Settings2, RotateCcw, Download, Copy, Maximize2, Minimize2, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EditorToolbarProps {
    language: string;
    code: string;
    isFullscreen: boolean;
    onLanguageChange: (lang: string) => void;
    onReset: () => void;
    onRun: () => void;
    onSubmit: () => void;
    onToggleFullscreen: () => void;
    isRunning: boolean;
    isSubmitting: boolean;
}

export function EditorToolbar({ language, code, isFullscreen, onLanguageChange, onReset, onRun, onSubmit, onToggleFullscreen, isRunning, isSubmitting }: EditorToolbarProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy code");
        }
    };

    const handleDownload = () => {
        const extensions: Record<string, string> = {
            python: ".py", cpp: ".cpp", javascript: ".js", java: ".java", c: ".c", csharp: ".cs", go: ".go"
        };
        const ext = extensions[language] || ".txt";
        const blob = new Blob([code], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `solution${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    return (
        <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-black/40 shadow-sm shrink-0">
            <div className="flex items-center gap-3">
                <select
                    className="bg-[#1e1e1e] text-neutral-300 text-xs px-3 py-1.5 rounded border border-neutral-700 outline-none hover:border-neutral-500 cursor-pointer transition-colors capitalize"
                    value={language}
                    onChange={(e) => onLanguageChange(e.target.value)}
                >
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                    <option value="c">C</option>
                    <option value="csharp">C#</option>
                    <option value="go">Go</option>
                </select>

                <div className="w-px h-4 bg-neutral-700 mx-1"></div>

                <Button variant="ghost" size="sm" onClick={onReset} className="h-7 text-neutral-400 hover:text-neutral-100 hover:bg-[#3d3d3d] px-2 text-xs">
                    <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Reset
                </Button>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={handleCopy} className="h-7 w-7 p-0 text-neutral-400 hover:text-neutral-100 hover:bg-[#3d3d3d] transition-colors">
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleDownload} className="h-7 w-7 p-0 text-neutral-400 hover:text-neutral-100 hover:bg-[#3d3d3d]">
                    <Download className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-neutral-400 hover:text-neutral-100 hover:bg-[#3d3d3d]" title="Settings (Upcoming)">
                    <Settings2 className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="sm" onClick={onToggleFullscreen} className="h-7 w-7 p-0 text-neutral-400 hover:text-neutral-100 hover:bg-[#3d3d3d]">
                    {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </Button>

                <div className="w-px h-4 bg-neutral-700 mx-2"></div>

                <Button variant="secondary" size="sm" onClick={onRun} disabled={isRunning || isSubmitting} className="h-7 bg-[#3d3d3d] text-neutral-200 hover:bg-[#4d4d4d] border-none disabled:opacity-50">
                    <Play className="w-3 h-3 mr-1.5 text-emerald-400" /> {isRunning ? "Running..." : "Run"}
                </Button>
                <Button size="sm" onClick={onSubmit} disabled={isRunning || isSubmitting} className="h-7 bg-emerald-600 hover:bg-emerald-500 text-white border-none disabled:opacity-50">
                    <Send className="w-3 h-3 mr-1.5" /> {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </div>
    );
}
