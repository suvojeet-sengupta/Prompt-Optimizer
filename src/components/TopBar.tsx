import { Copy, Save, X, ChevronDown, Sparkles } from 'lucide-react';

interface TopBarProps {
    onCopy: () => void;
    onSave?: () => void;
    onClose?: () => void;
}

export function TopBar({ onCopy, onSave, onClose }: TopBarProps) {
    return (
        <header className="h-14 border-b border-zinc-800 bg-[#18181b] flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-40 select-none">
            {/* Left: Model Selector */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-zinc-800/50 cursor-pointer transition-colors group">
                <span className="text-sm font-medium text-zinc-300 group-hover:text-white">Optimize for GPT-5.1</span>
                <ChevronDown className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            </div>

            {/* Center: Title (Optional, hidden on small screens) */}
            <div className="hidden md:flex items-center gap-2 opacity-0 hover:opacity-100 transition-opacity duration-500">
                <Sparkles className="w-4 h-4 text-zinc-600" />
                <span className="text-xs font-mono text-zinc-600">PROMPT OPTIMIZER</span>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
                <button
                    onClick={onCopy}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors"
                >
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                </button>
                <button
                    onClick={onSave}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors"
                >
                    <Save className="w-3.5 h-3.5" />
                    Save
                </button>
                <div className="w-px h-4 bg-zinc-800 mx-1"></div>
                <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </header>
    );
}
