import { useState } from 'react';
import type { HistoryItem } from '../lib/storage';
import { Clock, MessageSquare, PanelLeftClose, PanelLeft } from 'lucide-react';

interface SidebarProps {
    history: HistoryItem[];
    onLoadHistory: (item: HistoryItem) => void;
}

export function Sidebar({ history, onLoadHistory }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside
            className={`
                flex-shrink-0 h-full flex flex-col overflow-hidden select-none
                glass-panel border-r-0 rounded-r-2xl
                transition-all duration-300 ease-out
                ${isCollapsed ? 'w-16' : 'w-[280px]'}
            `}
        >
            {/* Header */}
            <div className="h-14 flex items-center justify-between px-4 border-b border-zinc-800/50">
                {!isCollapsed && (
                    <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider animate-fade-in-up">
                        Original Prompt
                    </span>
                )}
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
                {history.length === 0 ? (
                    <div className="text-center py-10 opacity-40">
                        {!isCollapsed && <span className="text-xs text-zinc-500">No history yet</span>}
                    </div>
                ) : (
                    history.map((item, index) => {
                        const added = item.output.split('\n').length;
                        const removed = item.input.split('\n').length;

                        return (
                            <div
                                key={item.id}
                                onClick={() => onLoadHistory(item)}
                                className={`
                                    group flex flex-col gap-3 p-4 rounded-xl 
                                    glass-button cursor-pointer
                                    hover:scale-[1.02] active:scale-[0.98]
                                    animate-fade-in-up
                                `}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {!isCollapsed ? (
                                    <>
                                        {/* Time */}
                                        <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>
                                                {new Date(item.timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                                            </span>
                                        </div>

                                        {/* Diff Stats */}
                                        <div className="flex items-center gap-3 text-xs font-mono">
                                            <span className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded-md">
                                                +{added}
                                            </span>
                                            <span className="text-red-400 bg-red-500/10 px-2 py-0.5 rounded-md">
                                                -{removed}
                                            </span>
                                            <MessageSquare className="w-3.5 h-3.5 text-zinc-600 ml-auto" />
                                        </div>

                                        {/* Preview */}
                                        <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                                            {item.input.trim()}
                                        </p>
                                    </>
                                ) : (
                                    <div className="flex justify-center">
                                        <MessageSquare className="w-4 h-4 text-zinc-500" />
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {/* Collapse Button */}
            <div className="p-3 border-t border-zinc-800/50">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl glass-button text-zinc-400 hover:text-white text-xs"
                >
                    {isCollapsed ? (
                        <PanelLeft className="w-4 h-4" />
                    ) : (
                        <>
                            <PanelLeftClose className="w-4 h-4" />
                            <span>Collapse</span>
                        </>
                    )}
                </button>
            </div>
        </aside>
    );
}
