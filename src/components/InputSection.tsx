import { Sparkles, Wand2, Loader2, Zap } from 'lucide-react';

interface InputSectionProps {
    input: string;
    onInputChange: (value: string) => void;
    onSubmit: () => void;
    isLoading: boolean;
}

export function InputSection({
    input,
    onInputChange,
    onSubmit,
    isLoading,
}: InputSectionProps) {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && e.ctrlKey && !isLoading && input.trim()) {
            onSubmit();
        }
    };

    return (
        <div className="glass-card p-8 space-y-6 h-full flex flex-col relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="w-40 h-40 text-blue-500" />
            </div>

            {/* Section Header */}
            <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">Input Configuration</h2>
                    <p className="text-xs text-blue-200/70 font-medium">Describe your request in detail</p>
                </div>
            </div>

            {/* Textarea */}
            <div className="flex-1 min-h-0 relative z-10">
                <textarea
                    value={input}
                    onChange={(e) => onInputChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Describe what you need... (e.g., 'Write a python script to scrape data' or 'Create a marketing email for a new product')"
                    className="input-area h-full min-h-[200px] text-lg placeholder:text-white/20"
                    disabled={isLoading}
                />
            </div>

            {/* Submit Button */}
            <button
                onClick={onSubmit}
                disabled={isLoading || !input.trim()}
                className="btn-primary w-full flex items-center justify-center gap-3 text-lg py-5 relative z-10 overflow-hidden"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Optimizing...</span>
                    </>
                ) : (
                    <>
                        <Wand2 className="w-6 h-6" />
                        <span>Optimize Prompt 🚀</span>
                    </>
                )}
            </button>

            {/* Keyboard Shortcut Hint */}
            <p className="text-xs text-white/30 text-center relative z-10">
                Press <kbd className="px-1.5 py-0.5 bg-white/5 rounded text-white/60 border border-white/10">Ctrl + Enter</kbd> to optimize
            </p>
        </div>
    );
}
