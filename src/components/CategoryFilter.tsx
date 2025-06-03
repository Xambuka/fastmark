
import React from 'react';
import { categories } from '@/data/mockData';
import { Category } from '@/types';
import { Card } from '@/components/ui/card';

interface CategoryFilterProps {
  selectedCategory?: string;
  onCategorySelect: (categoryId: string | undefined) => void;
}

const CategoryFilter = ({ selectedCategory, onCategorySelect }: CategoryFilterProps) => {
  return (
    <div className="py-6">
      <h2 className="text-lg font-semibold mb-4">Categorias</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        <Card
          className={`min-w-[120px] p-4 cursor-pointer transition-all hover:shadow-md ${
            !selectedCategory ? 'ring-2 ring-orange-500 bg-orange-50' : ''
          }`}
          onClick={() => onCategorySelect(undefined)}
        >
          <div className="text-center">
            <div className="text-2xl mb-2">🍽️</div>
            <span className="text-sm font-medium">Todos</span>
          </div>
        </Card>
        
        {categories.map((category) => (
          <Card
            key={category.id}
            className={`min-w-[120px] p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedCategory === category.id ? 'ring-2 ring-orange-500 bg-orange-50' : ''
            }`}
            onClick={() => onCategorySelect(category.id)}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">{category.icon}</div>
              <span className="text-sm font-medium">{category.name}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
