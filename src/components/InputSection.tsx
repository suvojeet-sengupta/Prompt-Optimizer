import { Sparkles, Wand2, Loader2 } from 'lucide-react';
import type { Category } from '../lib/prompts';
import { CategorySelector } from './CategorySelector';

interface InputSectionProps {
    input: string;
    onInputChange: (value: string) => void;
    category: Category;
    onCategoryChange: (category: Category) => void;
    onSubmit: () => void;
    isLoading: boolean;
}

export function InputSection({
    input,
    onInputChange,
    category,
    onCategoryChange,
    onSubmit,
    isLoading,
}: InputSectionProps) {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && e.ctrlKey && !isLoading && input.trim()) {
            onSubmit();
        }
    };

    return (
        <div className="glass-card p-6 space-y-6 h-full flex flex-col">
            {/* Section Header */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-white">Your Raw Idea</h2>
                    <p className="text-xs text-white/50">Throw in your rough thought, we'll refine it</p>
                </div>
            </div>

            {/* Textarea */}
            <div className="flex-1 min-h-0">
                <textarea
                    value={input}
                    onChange={(e) => onInputChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="E.g., 'weight loss plan' or 'build a todo app' or 'write a birthday poem'..."
                    className="input-area h-full min-h-[200px]"
                    disabled={isLoading}
                />
            </div>

            {/* Category Selector */}
            <CategorySelector selected={category} onSelect={onCategoryChange} />

            {/* Submit Button */}
            <button
                onClick={onSubmit}
                disabled={isLoading || !input.trim()}
                className="btn-primary w-full flex items-center justify-center gap-3 text-lg py-4"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Alchemizing...</span>
                    </>
                ) : (
                    <>
                        <Wand2 className="w-5 h-5" />
                        <span>Alchemize ✨</span>
                    </>
                )}
            </button>

            {/* Keyboard Shortcut Hint */}
            <p className="text-xs text-white/40 text-center">
                Pro tip: Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60">Enter</kbd> to submit
            </p>
        </div>
    );
}
