import { useState, useEffect } from 'react';
import { callGeminiAPI } from './lib/gemini';
import { getHistory, saveToHistory, type HistoryItem } from './lib/storage';
import { TopBar } from './components/TopBar';
import { BottomInputBar } from './components/BottomInputBar';
import { EditorDisplay } from './components/EditorDisplay';
import { Toast } from './components/Toast';
import { HistoryPanel } from './components/HistoryPanel';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [toast, setToast] = useState<{ visible: boolean; message: string; sub?: string }>({ visible: false, message: '' });

  // Load history on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleOptimize = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);
    setToast({ visible: true, message: 'Optimizing prompt...', sub: 'Extracting edits and improving structure.' });

    try {
      const result = await callGeminiAPI(input);
      setOutput(result);

      // Save to history
      saveToHistory({
        input,
        output: result,
        timestamp: Date.now(),
        // Category is removed, handled by universal prompt
      });
      setHistory(getHistory()); // Refresh history

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error(err);
    } finally {
      setIsLoading(false);
      setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000); // Hide toast after delay
    }
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setToast({ visible: true, message: 'Copied to clipboard', sub: 'Ready to paste' });
      setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 2000);
    }
  };

  const handleLoadHistory = (item: HistoryItem) => {
    setInput(item.input);
    setOutput(item.output);
  };

  const handleRefreshHistory = () => {
    setHistory(getHistory());
  };

  return (
    <div className="min-h-screen bg-[#18181b] text-white font-sans selection:bg-indigo-500/30">

      <TopBar
        onCopy={handleCopy}
        onSave={() => setIsHistoryOpen(true)} // Using Save button to open history for now
        onClose={() => { setInput(''); setOutput(''); }}
      />

      <EditorDisplay
        output={output}
        isLoading={isLoading}
        error={error}
      />

      <BottomInputBar
        input={input}
        setInput={setInput}
        onOptimize={handleOptimize}
        isLoading={isLoading}
      />

      <Toast
        isVisible={toast.visible}
        message={toast.message}
        description={toast.sub}
      />

      <HistoryPanel
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onRefresh={handleRefreshHistory}
        onLoadHistory={handleLoadHistory}
      />

    </div>
  );
}

export default App;
