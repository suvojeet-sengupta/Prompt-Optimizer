import { useState } from 'react';
import { callGeminiAPI } from '../lib/gemini';
import { saveToHistory, getHistory, type HistoryItem } from '../lib/storage';

interface UseOptimizerReturn {
    input: string;
    setInput: (value: string) => void;
    output: string;
    setOutput: (value: string) => void;
    lastOptimizedInput: string;
    setLastOptimizedInput: (value: string) => void;
    isLoading: boolean;
    error: string | null;
    handleOptimize: () => Promise<void>;
}

export function useOptimizer(
    setHistory: (history: HistoryItem[]) => void,
    setToast: (toast: { visible: boolean; message: string; sub?: string }) => void
): UseOptimizerReturn {
    const [input, setInput] = useState('');
    const [lastOptimizedInput, setLastOptimizedInput] = useState('');
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleOptimize = async () => {
        if (!input.trim()) return;

        setIsLoading(true);
        setError(null);
        setToast({ visible: true, message: 'Optimizing prompt...', sub: 'Applying CO-STAR framework.' });

        try {
            const result = await callGeminiAPI(input);
            setOutput(result);
            setLastOptimizedInput(input);

            // Save to history
            saveToHistory({
                input,
                output: result,
            });
            setHistory(getHistory()); // Refresh history

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            console.error(err);
        } finally {
            setIsLoading(false);
            setTimeout(() => setToast({ visible: false, message: '' }), 3000);
        }
    };

    return {
        input,
        setInput,
        output,
        setOutput,
        lastOptimizedInput,
        setLastOptimizedInput,
        isLoading,
        error,
        handleOptimize
    };
}
