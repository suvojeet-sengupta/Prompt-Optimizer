import { Code2, Feather, Briefcase, Heart, Palette } from 'lucide-react';
import type { Category } from '../lib/prompts';
import { categories } from '../lib/prompts';

const iconMap = {
    Code2,
    Feather,
    Briefcase,
    Heart,
    Palette,
};

interface CategorySelectorProps {
    selected: Category;
    onSelect: (category: Category) => void;
}

export function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
    return (
        <div className="space-y-3">
            <label className="text-sm font-medium text-white/70">
                ✨ Choose Your Alchemy Type
            </label>
            <div className="flex flex-wrap gap-3">
                {categories.map((cat) => {
                    const Icon = iconMap[cat.icon as keyof typeof iconMap];
                    const isActive = selected === cat.id;

                    return (
                        <button
                            key={cat.id}
                            onClick={() => onSelect(cat.id)}
                            className={`
                category-chip flex items-center gap-2 px-4 py-2.5 rounded-xl
                border transition-all duration-300
                ${isActive
                                    ? 'active border-transparent text-white'
                                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                                }
              `}
                            title={cat.description}
                        >
                            <Icon className="w-4 h-4" />
                            <span className="font-medium">{cat.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
