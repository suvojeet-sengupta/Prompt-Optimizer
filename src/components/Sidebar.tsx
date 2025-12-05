import type { HistoryItem } from '../lib/storage';
import { Clock, MessageSquare } from 'lucide-react';

interface SidebarProps {
    history: HistoryItem[];
    onLoadHistory: (item: HistoryItem) => void;
    isOpen?: boolean;
}

export function Sidebar({ history, onLoadHistory, isOpen = true }: SidebarProps) {
    if (!isOpen) return null;

    return (
        <aside className="w-[300px] flex-shrink-0 bg-[#18181b] border-r border-zinc-800 flex flex-col h-full overflow-hidden select-none">
            {/* Header */}
            <div className="h-12 flex items-center px-4 border-b border-zinc-800">
                <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                    History
                </span>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
                {history.length === 0 ? (
                    <div className="text-center py-10 opacity-40">
                        <span className="text-xs text-zinc-500">No history yet</span>
                    </div>
                ) : (
                    history.map((item) => {
                        // Calculate stats
                        const added = item.output.split('\n').length;
                        const removed = item.input.split('\n').length;

                        return (
                            <div
                                key={item.id}
                                onClick={() => onLoadHistory(item)}
                                className="group flex flex-col gap-2 p-3 rounded-lg hover:bg-[#27272a] cursor-pointer transition-all border border-transparent hover:border-zinc-700/50"
                            >
                                {/* Top Row: Time and ID? */}
                                <div className="flex items-center justify-between text-[10px] text-zinc-500">
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-3 h-3" />
                                        <span>
                                            {new Date(item.timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>

                                {/* Diff Stats - GitHub Style */}
                                <div className="flex items-center gap-2 text-xs font-mono bg-black/20 p-1.5 rounded w-fit">
                                    <span className="text-green-400 flex items-center gap-0.5">
                                        +{added}
                                    </span>
                                    <span className="text-zinc-600">|</span>
                                    <span className="text-red-400 flex items-center gap-0.5">
                                        -{removed}
                                    </span>
                                    <MessageSquare className="w-3 h-3 text-zinc-600 ml-1" />
                                </div>

                                {/* Truncated Preview */}
                                <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                                    {item.input.trim()}
                                </p>
                            </div>
                        );
                    })
                )}
            </div>
        </aside>
    );
}
