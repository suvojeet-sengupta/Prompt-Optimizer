import { useRef, useEffect } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface BottomInputBarProps {
    input: string;
    setInput: (value: string) => void;
    onOptimize: () => void;
    isLoading: boolean;
}

export function BottomInputBar({ input, setInput, onOptimize, isLoading }: BottomInputBarProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [input]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (input.trim() && !isLoading) {
                onOptimize();
            }
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 z-40 flex justify-center bg-gradient-to-t from-[#18181b] via-[#18181b] to-transparent pt-12">
            <div className="w-full max-w-3xl relative">
                {/* Floating Input Container */}
                <div className="bg-[#27272a] rounded-2xl border border-zinc-700 shadow-2xl overflow-hidden transition-shadow hover:border-zinc-600 focus-within:border-zinc-500 focus-within:ring-1 focus-within:ring-zinc-500/50">
                    <div className="flex items-end p-2 gap-2">
                        {/* Textarea */}
                        <div className="flex-1 min-w-0">
                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Describe your use case..."
                                className="w-full bg-transparent text-zinc-100 placeholder:text-zinc-500 text-sm px-4 py-3 focus:outline-none resize-none max-h-[200px] overflow-y-auto custom-scrollbar leading-relaxed"
                                rows={1}
                                disabled={isLoading}
                            />
                        </div>

                        {/* Optimize Button */}
                        <button
                            onClick={onOptimize}
                            disabled={isLoading || !input.trim()}
                            className={`
                                h-9 px-4 rounded-lg flex items-center gap-2 text-xs font-semibold tracking-wide transition-all
                                ${isLoading || !input.trim()
                                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                                    : 'bg-white text-black hover:bg-zinc-200'
                                }
                            `}
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <span className="flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    Optimize
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Footer Hint */}
                <div className="text-center mt-3">
                    <p className="text-[10px] text-zinc-500">
                        To apply <span className="underline decoration-zinc-700 underline-offset-2">best practices</span> for a specific model click Optimize with no input
                    </p>
                </div>
            </div>
        </div>
    );
}
