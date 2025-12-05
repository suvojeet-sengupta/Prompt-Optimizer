import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
    content: string;
    className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
    return (
        <div className={`prose prose-invert prose-sm max-w-none text-zinc-300 h-full overflow-y-auto custom-scrollbar pb-4 ${className}`}>
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
