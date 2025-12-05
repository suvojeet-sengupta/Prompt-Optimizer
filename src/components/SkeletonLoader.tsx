export function SkeletonLoader() {
    return (
        <div className="w-full space-y-4 animate-pulse">
            <div className="flex items-center space-x-4 mb-8">
                <div className="h-12 w-12 bg-zinc-800/50 rounded-full"></div>
                <div className="space-y-2">
                    <div className="h-4 w-32 bg-zinc-800/50 rounded"></div>
                    <div className="h-3 w-24 bg-zinc-800/50 rounded"></div>
                </div>
            </div>
            
            <div className="space-y-3">
                <div className="h-4 bg-zinc-800/50 rounded w-3/4"></div>
                <div className="h-4 bg-zinc-800/50 rounded w-full"></div>
                <div className="h-4 bg-zinc-800/50 rounded w-5/6"></div>
            </div>
            
            <div className="space-y-3 pt-4">
                <div className="h-4 bg-zinc-800/50 rounded w-2/3"></div>
                <div className="h-4 bg-zinc-800/50 rounded w-full"></div>
                <div className="h-4 bg-zinc-800/50 rounded w-4/5"></div>
            </div>

             <div className="space-y-3 pt-4">
                <div className="h-32 bg-zinc-800/50 rounded-xl w-full"></div>
            </div>
        </div>
    );
}
