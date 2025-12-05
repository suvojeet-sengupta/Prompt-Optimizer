import type { Category } from './prompts';

export interface HistoryItem {
    id: string;
    timestamp: number;
    input: string;
    output: string;
    category: Category;
}

const STORAGE_KEY = 'prompt-alchemist-history';
const MAX_HISTORY_ITEMS = 50;

export function getHistory(): HistoryItem[] {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return [];
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export function saveToHistory(item: Omit<HistoryItem, 'id' | 'timestamp'>): HistoryItem {
    const history = getHistory();

    const newItem: HistoryItem = {
        ...item,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
    };

    // Add to beginning of array
    history.unshift(newItem);

    // Keep only the last MAX_HISTORY_ITEMS
    const trimmedHistory = history.slice(0, MAX_HISTORY_ITEMS);

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
    } catch (error) {
        console.error('Failed to save to history:', error);
    }

    return newItem;
}

export function deleteFromHistory(id: string): void {
    const history = getHistory();
    const filtered = history.filter(item => item.id !== id);

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
        console.error('Failed to delete from history:', error);
    }
}

export function clearHistory(): void {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear history:', error);
    }
}
