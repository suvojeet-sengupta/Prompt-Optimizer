import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import { HistoryPanel } from './components/HistoryPanel';
import type { Category } from './lib/prompts';
import { callGeminiAPI } from './lib/gemini';
import type { HistoryItem } from './lib/storage';
import { getHistory, saveToHistory } from './lib/storage';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [category, setCategory] = useState<Category>('coding');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const refreshHistory = useCallback(() => {
    setHistory(getHistory());
  }, []);

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setOutput('');

    try {
      const result = await callGeminiAPI(input, category);
      setOutput(result);

      // Save to history
      saveToHistory({
        input: input.trim(),
        output: result,
        category,
      });
      refreshHistory();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadHistory = (item: HistoryItem) => {
    setInput(item.input);
    setOutput(item.output);
    setCategory(item.category);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header
        onHistoryClick={() => setIsHistoryOpen(true)}
        historyCount={history.length}
      />

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:h-[calc(100vh-160px)] h-auto">
            {/* Left Column - Input */}
            <InputSection
              input={input}
              onInputChange={setInput}
              category={category}
              onCategoryChange={setCategory}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />

            {/* Right Column - Output */}
            <OutputSection
              output={output}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-white/30 text-sm">
        <p>Made with ✨ magic | Powered by Gemini AI</p>
      </footer>

      {/* History Panel */}
      <HistoryPanel
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onRefresh={refreshHistory}
        onLoadHistory={handleLoadHistory}
      />
    </div>
  );
}

export default App;
