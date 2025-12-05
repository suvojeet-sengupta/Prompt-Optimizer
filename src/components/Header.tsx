import { Atom, History } from 'lucide-react';

interface HeaderProps {
    onHistoryClick: () => void;
    historyCount: number;
}

export function Header({ onHistoryClick, historyCount }: HeaderProps) {
    return (
        <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.location.reload()}>
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                    <Atom className="w-8 h-8 text-blue-400 animate-spin-slow relative z-10" />
                </div>
                <div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                        Prompt Optimizer
                    </h1>
                    <p className="text-[10px] text-slate-400 tracking-wider font-medium uppercase">AI-Powered Refiner</p>
                </div>
            </div>

            <button
                onClick={onHistoryClick}
                className="relative p-2 rounded-xl hover:bg-white/5 transition-colors group"
                title="History"
            >
                <History className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                {historyCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-slate-900"></span>
                )}
            </button>
        </header>
    );
}
