import React from 'react';
import { List } from 'lucide-react';

interface CategorySelectorProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2 flex items-center">
        <List className="mr-2" /> Selecciona una categoría
      </h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;