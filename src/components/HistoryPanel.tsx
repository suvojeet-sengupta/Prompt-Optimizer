import { X, Trash2, Copy, Check, Clock, Sparkles } from 'lucide-react';
import { useState } from 'react';
import type { HistoryItem } from '../lib/storage';
import { clearHistory, deleteFromHistory } from '../lib/storage';

interface HistoryPanelProps {
    isOpen: boolean;
    onClose: () => void;
    history: HistoryItem[];
    onRefresh: () => void;
    onLoadHistory: (item: HistoryItem) => void;
}

export function HistoryPanel({ isOpen, onClose, history, onRefresh, onLoadHistory }: HistoryPanelProps) {
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = async (item: HistoryItem) => {
        try {
            await navigator.clipboard.writeText(item.output);
            setCopiedId(item.id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleDelete = (id: string) => {
        deleteFromHistory(id);
        onRefresh();
    };

    const handleClearAll = () => {
        if (confirm('Are you sure you want to clear all history?')) {
            clearHistory();
            onRefresh();
        }
    };

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - date.getTime();

        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        return date.toLocaleDateString();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border-l border-white/10 z-50 flex flex-col animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-400" />
                        <h2 className="text-lg font-semibold text-white">History</h2>
                        <span className="text-sm text-white/50">({history.length})</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {history.length > 0 && (
                            <button
                                onClick={handleClearAll}
                                className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                title="Clear all"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="p-2 text-white/70 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* History List */}
                <div className="flex-1 overflow-auto p-4 space-y-3">
                    {history.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                <Clock className="w-8 h-8 text-white/30" />
                            </div>
                            <p className="text-white/50">No history yet</p>
                            <p className="text-sm text-white/30 mt-1">Your optimized prompts will appear here</p>
                        </div>
                    ) : (
                        history.map((item) => {
                            return (
                                <div
                                    key={item.id}
                                    className="group bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer"
                                    onClick={() => {
                                        onLoadHistory(item);
                                        onClose();
                                    }}
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between gap-2 mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                                                <Sparkles className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-xs text-white/50 font-medium">Optimization</span>
                                        </div>
                                        <span className="text-xs text-white/40">{formatTime(item.timestamp)}</span>
                                    </div>

                                    {/* Input Preview */}
                                    <p className="text-sm text-white/70 mb-2 line-clamp-2">
                                        "{item.input}"
                                    </p>

                                    {/* Output Preview */}
                                    <p className="text-xs text-white/40 line-clamp-2 mb-3">
                                        {item.output.slice(0, 150)}...
                                    </p>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCopy(item);
                                            }}
                                            className="flex items-center gap-1 px-2 py-1 text-xs bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                                        >
                                            {copiedId === item.id ? (
                                                <>
                                                    <Check className="w-3 h-3 text-green-400" />
                                                    <span className="text-green-400">Copied</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-3 h-3" />
                                                    <span>Copy</span>
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(item.id);
                                            }}
                                            className="flex items-center gap-1 px-2 py-1 text-xs text-red-400 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
}
