
import React from 'react';
import { FoodItem } from '../types';

interface FoodCardProps {
  food: FoodItem;
  onClick: (food: FoodItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food, onClick }) => {
  return (
    <div 
      onClick={() => onClick(food)}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-stone-100 flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={food.imageUrl} 
          alt={food.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-stone-600 rounded-full shadow-sm">
            {food.category}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-serif text-stone-800 mb-2 group-hover:text-amber-700 transition-colors">
          {food.name}
        </h3>
        <p className="text-stone-500 text-sm leading-relaxed line-clamp-2">
          {food.shortDescription}
        </p>
        <div className="mt-auto pt-4 flex items-center text-amber-600 text-xs font-semibold">
          READ ARTICLE
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  );
};
