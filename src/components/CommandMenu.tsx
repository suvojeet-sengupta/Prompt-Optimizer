import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { Search, Sparkles, Copy, Save, Trash2, Clock } from 'lucide-react';

interface CommandMenuProps {
    onOptimize: () => void;
    onCopy: () => void;
    onSave: () => void;
    onClear: () => void;
}

export function CommandMenu({ onOptimize, onCopy, onSave, onClear }: CommandMenuProps) {
    const [open, setOpen] = useState(false);

    // Toggle with Ctrl+K or Cmd+K
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    return (
        <Command.Dialog
            open={open}
            onOpenChange={setOpen}
            label="Global Command Menu"
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[640px] bg-[#18181b]/90 backdrop-blur-xl border border-zinc-700/50 rounded-xl shadow-2xl z-50 overflow-hidden animate-scale-in"
        >
            {/* Decorative Gradient */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-50" />

            <div className="flex items-center border-b border-zinc-800/50 px-4">
                <Search className="w-5 h-5 text-zinc-500 mr-2" />
                <Command.Input
                    placeholder="Type a command or search..."
                    className="w-full h-14 bg-transparent text-zinc-100 placeholder:text-zinc-500 focus:outline-none text-sm"
                />
            </div>

            <Command.List className="max-h-[300px] overflow-y-auto custom-scrollbar p-2">
                <Command.Empty className="py-6 text-center text-sm text-zinc-500">
                    No results found.
                </Command.Empty>

                <Command.Group heading="Actions" className="text-[10px] uppercase text-zinc-500 font-semibold tracking-wider mb-2 px-2 mt-2">
                    <Command.Item
                        onSelect={() => { onOptimize(); setOpen(false); }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800/50 hover:text-white cursor-pointer transition-colors aria-selected:bg-zinc-800/80 aria-selected:text-white"
                    >
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        <span>Optimize Prompt</span>
                        <span className="ml-auto text-xs text-zinc-600 font-mono">Enter</span>
                    </Command.Item>

                    <Command.Item
                        onSelect={() => { onCopy(); setOpen(false); }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800/50 hover:text-white cursor-pointer transition-colors aria-selected:bg-zinc-800/80 aria-selected:text-white"
                    >
                        <Copy className="w-4 h-4" />
                        <span>Copy Output</span>
                    </Command.Item>

                    <Command.Item
                        onSelect={() => { onSave(); setOpen(false); }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800/50 hover:text-white cursor-pointer transition-colors aria-selected:bg-zinc-800/80 aria-selected:text-white"
                    >
                        <Save className="w-4 h-4" />
                        <span>Save to History</span>
                    </Command.Item>

                    <Command.Item
                        onSelect={() => { onClear(); setOpen(false); }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800/50 hover:text-white cursor-pointer transition-colors aria-selected:bg-zinc-800/80 aria-selected:text-white"
                    >
                        <Trash2 className="w-4 h-4 text-red-400" />
                        <span>Clear Editor</span>
                    </Command.Item>
                </Command.Group>

                <Command.Group heading="Navigation" className="text-[10px] uppercase text-zinc-500 font-semibold tracking-wider mb-2 px-2 mt-2">
                    <Command.Item disabled className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-500 opacity-50 cursor-not-allowed">
                        <Clock className="w-4 h-4" />
                        <span>Recent History (Coming Soon)</span>
                    </Command.Item>
                </Command.Group>

            </Command.List>

            <div className="h-8 border-t border-zinc-800/50 flex items-center justify-end px-3 bg-zinc-900/30">
                <span className="text-[10px] text-zinc-500">
                    <kbd className="font-sans bg-zinc-800 px-1 rounded mx-1">↑</kbd>
                    <kbd className="font-sans bg-zinc-800 px-1 rounded mx-1">↓</kbd>
                    to navigate
                </span>
            </div>
        </Command.Dialog>
    );
}
