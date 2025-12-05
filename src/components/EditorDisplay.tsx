import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { MessageSquare, LayoutTemplate, FileDiff, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkeletonLoader } from './SkeletonLoader';

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
        <main className="flex-1 w-full max-w-5xl mx-auto pt-6 pb-48 px-4 md:px-6 overflow-y-auto custom-scrollbar scroll-smooth flex flex-col">
            
            {/* Header / Tabs */}
            <div className="flex items-center justify-between mb-4 px-1">
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
            <div className="flex-1 min-h-[500px] w-full glass-panel rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col">
                
                {isLoading ? (
                     <div className="w-full h-full flex flex-col justify-center">
                        <SkeletonLoader />
                    </div>
                ) : error ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-red-400 animate-fade-in-up">
                        <div className="bg-red-500/10 p-3 rounded-full mb-3">
                             <MessageSquare className="w-6 h-6" />
                        </div>
                        <p className="font-semibold">Generation Failed</p>
                        <p className="opacity-70 text-sm mt-1">{error}</p>
                    </div>
                ) : !output ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 opacity-40 select-none pointer-events-none">
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
                            className="w-full h-full"
                        >
                            {activeTab === 'optimized' && (
                                <MarkdownView content={output} />
                            )}

                            {activeTab === 'original' && (
                                <div className="whitespace-pre-wrap text-zinc-300 text-sm leading-relaxed font-mono">
                                    {originalInput}
                                </div>
                            )}

                            {activeTab === 'diff' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                                    <div className="flex flex-col h-full border-b md:border-b-0 md:border-r border-zinc-800 pb-6 md:pb-0 md:pr-6 overflow-y-auto custom-scrollbar">
                                        <h4 className="text-xs font-semibold text-zinc-500 uppercase mb-3 sticky top-0 bg-[#131316] py-2 z-10">Original</h4>
                                        <div className="whitespace-pre-wrap text-zinc-400 text-sm leading-relaxed font-mono opacity-80">
                                            {originalInput}
                                        </div>
                                    </div>
                                    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
                                        <h4 className="text-xs font-semibold text-indigo-400 uppercase mb-3 sticky top-0 bg-[#131316] py-2 z-10">Optimized</h4>
                                        <MarkdownView content={output} />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
            
            {output && (
                <div className="mt-4 flex justify-end px-2">
                     <span className="text-[10px] text-zinc-600 bg-zinc-900/80 border border-zinc-800 px-2 py-1 rounded-full">
                        {output.length} chars
                    </span>
                </div>
            )}
        </main>
    );
}

function TabButton({ active, onClick, icon, label, disabled }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, disabled?: boolean }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200
                ${active 
                    ? 'bg-zinc-800 text-indigo-300 shadow-sm' 
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                }
                ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
            `}
        >
            {icon}
            {label}
        </button>
    );
}

function MarkdownView({ content }: { content: string }) {
    return (
        <div className="prose prose-invert prose-sm max-w-none text-zinc-300 h-full overflow-y-auto custom-scrollbar pb-4">
             <ReactMarkdown
                components={{
                    code: ({ node, ...props }) => (
                        <code className="bg-zinc-800/50 border border-zinc-700/50 px-1.5 py-0.5 rounded text-indigo-300 font-mono text-xs" {...props} />
                    ),
                    pre: ({ node, ...props }) => (
                        <pre className="bg-[#0f0f11] border border-zinc-800 rounded-xl p-4 my-4 custom-scrollbar overflow-x-auto shadow-sm" {...props} />
                    ),
                    h1: ({ node, ...props }) => (
                        <h1 className="text-xl font-bold text-zinc-100 mt-6 mb-4 pb-2 border-b border-zinc-800/50" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                        <h2 className="text-lg font-semibold text-zinc-100 mt-6 mb-3" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                        <h3 className="text-base font-medium text-indigo-400 mt-4 mb-2" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                        <p className="leading-relaxed mb-4 text-zinc-300/90" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                        <ul className="list-disc pl-5 space-y-2 my-4 text-zinc-400 marker:text-zinc-600" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                        <ol className="list-decimal pl-5 space-y-2 my-4 text-zinc-400 marker:text-zinc-600" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                        <li className="pl-1" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                        <strong className="text-zinc-100 font-semibold" {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-2 border-indigo-500/50 pl-4 py-1 my-4 text-zinc-400 italic" {...props} />
                    ),
                     hr: ({ node, ...props }) => (
                        <hr className="my-8 border-zinc-800" {...props} />
                    )
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    )
}