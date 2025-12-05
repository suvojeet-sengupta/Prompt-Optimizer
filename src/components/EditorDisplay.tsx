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
        <main className="flex-1 w-full max-w-4xl mx-auto pt-20 pb-40 px-6 h-full overflow-y-auto">
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
                                    <code className="bg-zinc-800 px-1 py-0.5 rounded text-indigo-300 font-mono text-xs" {...props} />
                                ),
                                pre: ({ node, ...props }) => (
                                    <pre className="bg-zinc-950/50 border border-zinc-800 rounded-lg p-4 custom-scrollbar" {...props} />
                                ),
                                h1: ({ node, ...props }) => (
                                    <h1 className="text-lg font-semibold text-white mt-6 mb-3 flex items-center gap-2" {...props} />
                                ),
                                h2: ({ node, ...props }) => (
                                    <h2 className="text-base font-semibold text-zinc-100 mt-5 mb-2 border-b border-zinc-800 pb-1" {...props} />
                                ),
                                ul: ({ node, ...props }) => (
                                    <ul className="list-disc pl-4 space-y-1 my-3 text-zinc-400" {...props} />
                                ),
                                strong: ({ node, ...props }) => (
                                    <strong className="text-zinc-200 font-semibold" {...props} />
                                ),
                                blockquote: ({ node, ...props }) => (
                                    <blockquote className="border-l-2 border-indigo-500 pl-4 py-1 my-4 bg-indigo-500/5 text-indigo-200/80 italic" {...props} />
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
