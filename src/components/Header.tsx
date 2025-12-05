import { Sparkles, Wand2 } from 'lucide-react';

interface HeaderProps {
    onHistoryClick: () => void;
    historyCount: number;
}

export function Header({ onHistoryClick, historyCount }: HeaderProps) {
    return (
        <header className="relative py-6 px-4 md:px-8">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo & Title */}
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center animate-pulse-glow">
                            <Wand2 className="w-6 h-6 text-white" />
                        </div>
                        <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-sparkle" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold gradient-text">
                            Prompt Alchemist
                        </h1>
                        <p className="text-sm text-white/60 hidden md:block">
                            Transform your ideas into perfect AI prompts
                        </p>
                    </div>
                </div>

                {/* History Button */}
                <button
                    onClick={onHistoryClick}
                    className="btn-secondary flex items-center gap-2"
                >
                    <span className="hidden md:inline">History</span>
                    {historyCount > 0 && (
                        <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {historyCount}
                        </span>
                    )}
                </button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
                <div className="absolute top-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
            </div>
        </header>
    );
}
