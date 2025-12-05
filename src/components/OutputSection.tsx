import { Copy, Check, Sparkles, FileText } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface OutputSectionProps {
    output: string;
    isLoading: boolean;
    error: string | null;
}

export function OutputSection({ output, isLoading, error }: OutputSectionProps) {
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

    return (
        <div className="glass-card p-6 space-y-4 h-full flex flex-col">
            {/* Section Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-white">Optimized Prompt</h2>
                        <p className="text-xs text-white/50">Your refined, professional prompt</p>
                    </div>
                </div>

                {/* Copy Button */}
                {output && !isLoading && (
                    <button
                        onClick={handleCopy}
                        className={`
              btn-secondary flex items-center gap-2 transition-all
              ${copied ? 'bg-green-500/20 border-green-500/30' : ''}
            `}
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4 text-green-400" />
                                <span className="text-green-400">Copied!</span>
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
            <div className="flex-1 min-h-0 overflow-auto">
                {isLoading ? (
                    <div className="h-full flex flex-col items-center justify-center gap-6">
                        {/* Loading Animation */}
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 animate-pulse-glow flex items-center justify-center">
                                <Sparkles className="w-10 h-10 text-white animate-float" />
                            </div>
                            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
                                <div className="w-3 h-3 rounded-full bg-yellow-400 absolute top-0 left-1/2 -translate-x-1/2" />
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-medium gradient-text">Alchemizing your prompt...</p>
                            <p className="text-sm text-white/50 mt-1">Adding magic dust ✨</p>
                        </div>
                        <div className="loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                ) : error ? (
                    <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
                        <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                            <span className="text-3xl">😔</span>
                        </div>
                        <div>
                            <p className="text-lg font-medium text-red-400">Oops! Something went wrong</p>
                            <p className="text-sm text-white/50 mt-2 max-w-md">{error}</p>
                        </div>
                    </div>
                ) : output ? (
                    <div className="output-area h-full overflow-auto animate-fade-in">
                        <ReactMarkdown>{output}</ReactMarkdown>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                            <span className="text-4xl">🧪</span>
                        </div>
                        <div>
                            <p className="text-lg font-medium text-white/70">Ready for Alchemy</p>
                            <p className="text-sm text-white/40 mt-2 max-w-sm">
                                Enter your raw idea on the left, select a category, and watch the magic happen!
                            </p>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/50">✨ AI-Powered</span>
                            <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/50">🎯 Precision</span>
                            <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/50">⚡ Fast</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
