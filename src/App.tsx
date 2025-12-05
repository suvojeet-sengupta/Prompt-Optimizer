import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import { HistoryPanel } from './components/HistoryPanel';
import { callGeminiAPI } from './lib/gemini';
import type { HistoryItem } from './lib/storage';
import { getHistory, saveToHistory } from './lib/storage';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
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
      const result = await callGeminiAPI(input);
      setOutput(result);

      // Save to history
      saveToHistory({
        input: input.trim(),
        output: result,
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
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Background/Overlay elements if desired in CSS */}

      {/* Header */}
      <Header
        onHistoryClick={() => setIsHistoryOpen(true)}
        historyCount={history.length}
      />

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-8 pb-8 pt-4">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:h-[calc(100vh-140px)] h-auto">
            {/* Left Column - Input */}
            <div className="lg:overflow-hidden h-full">
              <InputSection
                input={input}
                onInputChange={setInput}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </div>

            {/* Right Column - Output */}
            <div className="lg:overflow-hidden h-full">
              <OutputSection
                output={output}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>
        </div>
      </main>

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
