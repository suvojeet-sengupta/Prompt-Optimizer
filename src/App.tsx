import { useState, useEffect } from 'react';
import { getHistory, type HistoryItem } from './lib/storage';
import { useOptimizer } from './hooks/useOptimizer';
import { TopBar } from './components/TopBar';
import { BottomInputBar } from './components/BottomInputBar';
import { Sidebar } from './components/Sidebar';
import { EditorDisplay } from './components/EditorDisplay';
import { Toast } from './components/Toast';
import { HistoryPanel } from './components/HistoryPanel';
import { CommandMenu } from './components/CommandMenu';

function App() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [toast, setToast] = useState<{ visible: boolean; message: string; sub?: string }>({ visible: false, message: '' });

  const {
    input,
    setInput,
    output,
    setOutput,
    lastOptimizedInput,
    setLastOptimizedInput,
    isLoading,
    error,
    handleOptimize
  } = useOptimizer(setHistory, setToast);

  // Load history on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setToast({ visible: true, message: 'Copied to clipboard', sub: 'Ready to paste' });
      setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 2000);
    }
  };

  const handleLoadHistory = (item: HistoryItem) => {
    setInput(item.input);
    setLastOptimizedInput(item.input);
    setOutput(item.output);
  };

  const handleRefreshHistory = () => {
    setHistory(getHistory());
  };

  const handleClear = () => {
      setInput('');
      setOutput('');
      setLastOptimizedInput('');
  };

  return (
    <div className="h-screen bg-[#18181b] bg-grid-pattern text-white font-sans selection:bg-indigo-500/30 flex flex-col overflow-hidden">

      <TopBar
        onCopy={handleCopy}
        onSave={() => setIsHistoryOpen(true)}
        onClose={handleClear}
      />

      <div className="flex-1 flex min-h-0 pt-14">
        {/* Sidebar - Visible on Desktop */}
        <div className="hidden md:flex h-full p-3 pr-0">
          <Sidebar
            history={history}
            onLoadHistory={handleLoadHistory}
          />
        </div>

        <div className="flex-1 flex flex-col min-h-0 relative">
          <EditorDisplay
            output={output}
            originalInput={lastOptimizedInput}
            isLoading={isLoading}
            error={error}
          />

          <BottomInputBar
            input={input}
            setInput={setInput}
            onOptimize={handleOptimize}
            isLoading={isLoading}
          />
        </div>
      </div>

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

      <CommandMenu
        onOptimize={handleOptimize}
        onCopy={handleCopy}
        onSave={() => setIsHistoryOpen(true)}
        onClear={handleClear}
      />

    </div>
  );
}

export default App;