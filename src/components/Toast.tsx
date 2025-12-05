import { Loader2 } from 'lucide-react';

interface ToastProps {
    message: string;
    description?: string;
    isVisible: boolean;
}

export function Toast({ message, description, isVisible }: ToastProps) {
    if (!isVisible) return null;

    return (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-slide-up-fade">
            <div className="bg-[#18181b] border border-zinc-700 rounded-xl shadow-2xl p-4 flex items-center gap-4 min-w-[320px]">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 text-zinc-400 animate-spin" />
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-white">{message}</h4>
                    {description && (
                        <p className="text-xs text-zinc-500 mt-0.5">{description}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
