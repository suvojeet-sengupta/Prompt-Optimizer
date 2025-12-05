import { Copy, Check, FileText, Code2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface OutputSectionProps {
    output: string;
    isLoading: boolean;
    error: string | null;
}

export function OutputSection({ output, isLoading, error }: OutputSectionProps) {
    const [loadingMsg, setLoadingMsg] = useState('Initializing optimization...');
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (!output) return;

        try {
            await navigator.clipboard.writeText(output);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    useEffect(() => {
        if (!isLoading) return;

        const messages = [
            'Analyzing requirements...',
            'Identifying architectural patterns...',
            'Refining context and constraints...',
            'Applying industry best practices...',
            'Structuring final output...'
        ];

        let i = 0;
        setLoadingMsg(messages[0]);

        const interval = setInterval(() => {
            i = (i + 1) % messages.length;
            setLoadingMsg(messages[i]);
        }, 1500);

        return () => clearInterval(interval);
    }, [isLoading]);

    return (
        <div className="glass-card p-6 space-y-4 h-full flex flex-col">
            {/* Section Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                        <FileText className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white">Optimization Output</h2>
                        <p className="text-xs text-blue-200/50 font-medium">Refined instructions for LLM</p>
                    </div>
                </div>

                {/* Copy Button */}
                {output && !isLoading && (
                    <button
                        onClick={handleCopy}
                        className={`
              btn-secondary flex items-center gap-2 transition-all
              ${copied ? 'bg-green-500/20 border-green-500/30 text-green-400' : ''}
            `}
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4" />
                                <span>Copied</span>
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4" />
                                <span>Copy</span>
                            </>
                        )}
                    </button>
                )}
            </div>

            {/* Output Area */}
            <div className="flex-1 min-h-0 overflow-hidden flex flex-col relative bg-slate-900/50 rounded-xl border border-white/5">
                {isLoading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10 glass-panel">
                        <div className="w-full max-w-sm space-y-6">
                            {/* Professional Loader */}
                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12 flex-shrink-0">
                                    <div className="absolute inset-0 rounded-full border-2 border-blue-500/20"></div>
                                    <div className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-blue-400 font-mono animate-pulse">
                                        {loadingMsg}
                                    </p>
                                    <p className="text-xs text-slate-500">Processing via Gemini 2.5 Flash Lite</p>
                                </div>
                            </div>

                            {/* Simulated Terminal Log */}
                            <div className="bg-black/40 rounded-lg p-3 space-y-2 font-mono text-xs border border-white/5 overflow-hidden">
                                <div className="flex items-center gap-2 text-slate-500">
                                    <span className="text-blue-500">➜</span>
                                    <span>Reading input stream...</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-500" style={{ animationDelay: '0.2s' }}>
                                    <span className="text-emerald-500">✔</span>
                                    <span>Context detected</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300">
                                    <span className="text-yellow-500">⚡</span>
                                    <span className="animate-pulse">Optimizing prompt structure...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : error ? (
                    <div className="h-full flex flex-col items-center justify-center gap-4 text-center p-8">
                        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                            <span className="text-2xl">⚠️</span>
                        </div>
                        <div>
                            <p className="text-lg font-medium text-red-400">Optimization Failed</p>
                            <p className="text-sm text-slate-400 mt-2 max-w-md">{error}</p>
                        </div>
                    </div>
                ) : output ? (
                    <div className="output-area h-full overflow-auto p-6 animate-fade-in custom-scrollbar">
                        <ReactMarkdown>{output}</ReactMarkdown>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center gap-4 text-center p-8 opacity-60">
                        <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                            <Code2 className="w-10 h-10 text-slate-400" />
                        </div>
                        <div>
                            <p className="text-lg font-medium text-slate-300">Ready to Optimize</p>
                            <p className="text-sm text-slate-500 mt-2 max-w-sm">
                                Awaiting input for professional refinement.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
