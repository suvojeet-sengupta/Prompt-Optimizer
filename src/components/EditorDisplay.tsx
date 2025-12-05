import { useState } from 'react';
import { MessageSquare, LayoutTemplate, FileDiff, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkeletonLoader } from './SkeletonLoader';
import { MarkdownRenderer } from './ui/MarkdownRenderer';
import { TabButton } from './ui/TabButton';

interface EditorDisplayProps {
    output: string;
    originalInput: string;
    isLoading: boolean;
    error: string | null;
}

type Tab = 'optimized' | 'diff' | 'original';

export function EditorDisplay({ output, originalInput, isLoading, error }: EditorDisplayProps) {
    const [activeTab, setActiveTab] = useState<Tab>('optimized');

    // Reset tab when loading starts
    if (isLoading && activeTab !== 'optimized') {
        setActiveTab('optimized');
    }

    const contentVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
    };

    return (
        <main className="flex-1 w-full max-w-5xl mx-auto pt-6 pb-48 px-4 md:px-6 overflow-hidden flex flex-col">
            
            {/* Header / Tabs */}
            <div className="flex items-center justify-between mb-4 px-1 flex-shrink-0">
                <div className="flex items-center space-x-1 bg-zinc-900/50 p-1 rounded-lg border border-zinc-800/50">
                   <TabButton 
                        active={activeTab === 'optimized'} 
                        onClick={() => setActiveTab('optimized')} 
                        icon={<Sparkles className="w-3.5 h-3.5" />}
                        label="Optimized"
                   />
                   <TabButton 
                        active={activeTab === 'original'} 
                        onClick={() => setActiveTab('original')} 
                        icon={<LayoutTemplate className="w-3.5 h-3.5" />}
                        label="Original"
                        disabled={!originalInput}
                   />
                   <TabButton 
                        active={activeTab === 'diff'} 
                        onClick={() => setActiveTab('diff')} 
                        icon={<FileDiff className="w-3.5 h-3.5" />}
                        label="Compare"
                        disabled={!originalInput || !output}
                   />
                </div>
                
                {output && (
                    <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 hidden sm:block">
                        {activeTab === 'optimized' ? 'AI Generated' : activeTab === 'original' ? 'User Input' : 'Comparison'}
                    </span>
                )}
            </div>

            {/* Content Area */}
            <div className="flex-1 min-h-[400px] w-full glass-panel rounded-2xl relative overflow-hidden flex flex-col">
                
                {isLoading ? (
                     <div className="w-full h-full flex flex-col justify-center p-6 md:p-8">
                        <SkeletonLoader />
                    </div>
                ) : error ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-red-400 animate-fade-in-up p-6">
                        <div className="bg-red-500/10 p-3 rounded-full mb-3">
                             <MessageSquare className="w-6 h-6" />
                        </div>
                        <p className="font-semibold">Generation Failed</p>
                        <p className="opacity-70 text-sm mt-1">{error}</p>
                    </div>
                ) : !output ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 opacity-40 select-none pointer-events-none p-6">
                        <Sparkles className="w-12 h-12 mb-4" />
                        <p className="text-sm font-medium">Ready to optimize your prompts</p>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="w-full h-full flex flex-col"
                        >
                            {activeTab === 'optimized' && (
                                <div className="h-full overflow-hidden">
                                    <MarkdownRenderer content={output} className="p-6 md:p-8" />
                                </div>
                            )}

                            {activeTab === 'original' && (
                                <div className="h-full overflow-y-auto custom-scrollbar p-6 md:p-8">
                                    <div className="whitespace-pre-wrap text-zinc-300 text-sm leading-relaxed font-mono">
                                        {originalInput}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'diff' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full">
                                    <div className="flex flex-col h-full border-b md:border-b-0 md:border-r border-zinc-800 overflow-hidden">
                                        <h4 className="text-xs font-semibold text-zinc-500 uppercase px-6 py-3 bg-[#18181b]/50 border-b border-zinc-800/50 flex-shrink-0 backdrop-blur-sm">Original</h4>
                                        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                                            <div className="whitespace-pre-wrap text-zinc-400 text-sm leading-relaxed font-mono opacity-80">
                                                {originalInput}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col h-full overflow-hidden">
                                        <h4 className="text-xs font-semibold text-indigo-400 uppercase px-6 py-3 bg-[#18181b]/50 border-b border-zinc-800/50 flex-shrink-0 backdrop-blur-sm">Optimized</h4>
                                        <div className="flex-1 overflow-hidden">
                                             <MarkdownRenderer content={output} className="p-6" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
            
            {output && (
                <div className="mt-4 flex justify-end px-2 flex-shrink-0">
                     <span className="text-[10px] text-zinc-600 bg-zinc-900/80 border border-zinc-800 px-2 py-1 rounded-full">
                        {output.length} chars
                    </span>
                </div>
            )}
        </main>
    );
}