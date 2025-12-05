import ReactMarkdown from 'react-markdown';
import { MessageSquare } from 'lucide-react';

interface EditorDisplayProps {
    output: string;
    isLoading: boolean;
    error: string | null;
}

export function EditorDisplay({ output, isLoading, error }: EditorDisplayProps) {
    if (isLoading) return null; // Loading is handled by Toast/Overlay usually, but we keep the editor clean

    return (
        <main className="flex-1 w-full max-w-4xl mx-auto pt-24 pb-48 px-4 md:px-6 overflow-y-auto custom-scrollbar scroll-smooth">
            {/* Label */}
            <div className="flex items-center gap-2 mb-2 px-2">
                <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                    Developer Message
                </span>
            </div>

            {/* Editor Content Area */}
            <div className="min-h-[400px] w-full bg-[#1e1e22] rounded-lg border border-zinc-800/50 p-6 relative group">
                {/* Empty State / Error / Output */}
                {!output && !error ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-600 opacity-50 select-none pointer-events-none">
                        <MessageSquare className="w-8 h-8 mb-2" />
                        <p className="text-sm">Output will appear here...</p>
                    </div>
                ) : error ? (
                    <div className="text-red-400 text-sm p-4 text-center">
                        <p className="font-semibold">Error</p>
                        <p className="opacity-70">{error}</p>
                    </div>
                ) : (
                    <div className="prose prose-invert prose-sm max-w-none text-zinc-300">
                        <ReactMarkdown
                            components={{
                                code: ({ node, ...props }) => (
                                    <code className="bg-zinc-800/50 border border-zinc-700/50 px-1.5 py-0.5 rounded text-indigo-300 font-mono text-xs" {...props} />
                                ),
                                pre: ({ node, ...props }) => (
                                    <pre className="bg-[#131316] border border-zinc-800 rounded-xl p-5 my-6 custom-scrollbar overflow-x-auto shadow-sm" {...props} />
                                ),
                                h1: ({ node, ...props }) => (
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-10 mb-6 flex items-center gap-2 pb-3 border-b border-zinc-800/50" {...props} />
                                ),
                                h2: ({ node, ...props }) => (
                                    <h2 className="text-lg font-semibold text-zinc-100 mt-10 mb-4 flex items-center gap-2" {...props} />
                                ),
                                h3: ({ node, ...props }) => (
                                    <h3 className="text-base font-medium text-indigo-400 mt-8 mb-3" {...props} />
                                ),
                                p: ({ node, ...props }) => (
                                    <p className="leading-relaxed mb-4 text-zinc-300/90" {...props} />
                                ),
                                ul: ({ node, ...props }) => (
                                    <ul className="list-disc pl-5 space-y-3 my-6 text-zinc-400 marker:text-indigo-500 leading-relaxed" {...props} />
                                ),
                                ol: ({ node, ...props }) => (
                                    <ol className="list-decimal pl-5 space-y-3 my-6 text-zinc-400 marker:text-indigo-500 leading-relaxed" {...props} />
                                ),
                                li: ({ node, ...props }) => (
                                    <li className="pl-1" {...props} />
                                ),
                                strong: ({ node, ...props }) => (
                                    <strong className="text-zinc-200 font-semibold" {...props} />
                                ),
                                blockquote: ({ node, ...props }) => (
                                    <blockquote className="border-l-4 border-indigo-500 pl-6 py-3 my-8 bg-zinc-900/50 rounded-r-lg text-indigo-200/90 italic shadow-sm leading-relaxed" {...props} />
                                ),
                                hr: ({ node, ...props }) => (
                                    <hr className="my-10 border-zinc-800" {...props} />
                                )
                            }}
                        >
                            {output}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            {/* Original Prompt Toggle (Placeholder) */}
            <div className="mt-8 px-2 flex items-center justify-between">
                <button className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                    View original prompt usage
                </button>
                <span className="text-[10px] text-zinc-700 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">
                    Markdown Supported
                </span>
            </div>
        </main>
    );
}
