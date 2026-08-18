import React from 'react';
import { FoodCategory } from '../types';
import { Search, Sparkles, Filter, Leaf, Drumstick, ArrowUpDown } from 'lucide-react';
import { sounds } from '../utils/audio';

interface MenuFilterBarProps {
  selectedCategory: FoodCategory;
  onSelectCategory: (category: FoodCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  dietFilter: 'all' | 'veg' | 'non-veg';
  onDietFilterChange: (diet: 'all' | 'veg' | 'non-veg') => void;
  sortBy: 'popular' | 'price-low' | 'price-high' | 'prep-time';
  onSortByChange: (sort: 'popular' | 'price-low' | 'price-high' | 'prep-time') => void;
  totalCount: number;
}

const CATEGORIES: { id: FoodCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'All Dishes', icon: '🍽️' },
  { id: 'popular', label: 'Bestsellers', icon: '🔥' },
  { id: 'biryani_rice', label: 'Biryani & Rice', icon: '🍚' },
  { id: 'burgers_snacks', label: 'Burgers & Fries', icon: '🍔' },
  { id: 'south_indian', label: 'South Indian', icon: '🥞' },
  { id: 'beverages', label: 'Cold Brew & Shakes', icon: '🥤' },
  { id: 'combos', label: 'Combos & Thali', icon: '🍱' },
];

export const MenuFilterBar: React.FC<MenuFilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  dietFilter,
  onDietFilterChange,
  sortBy,
  onSortByChange,
  totalCount,
}) => {
  return (
    <div className="space-y-4">
      {/* Search Bar & Filters Header */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Field */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="search-input-field"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Chicken Biryani, Dosa, Cold Coffee..."
            className="w-full bg-[#131226]/90 border border-[#221F42] focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 pl-10 pr-4 py-2.5 rounded-full text-xs sm:text-sm text-white placeholder-slate-400 outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Veg/Non-Veg & Sort controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Diet Filter Pills */}
          <div className="flex items-center bg-[#131226] border border-[#221F42] p-1 rounded-full">
            <button
              onClick={() => {
                sounds.playPop();
                onDietFilterChange('all');
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                dietFilter === 'all'
                  ? 'bg-[#8B5CF6] text-white shadow-[0_0_10px_rgba(139,92,246,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => {
                sounds.playPop();
                onDietFilterChange('veg');
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                dietFilter === 'veg'
                  ? 'bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                  : 'text-slate-400 hover:text-emerald-400'
              }`}
            >
              <Leaf className="w-3 h-3" />
              <span>Veg</span>
            </button>
            <button
              onClick={() => {
                sounds.playPop();
                onDietFilterChange('non-veg');
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                dietFilter === 'non-veg'
                  ? 'bg-rose-500 text-white shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                  : 'text-slate-400 hover:text-rose-400'
              }`}
            >
              <Drumstick className="w-3 h-3" />
              <span>Non-Veg</span>
            </button>
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center bg-[#131226] border border-[#221F42] px-3 py-1.5 rounded-full">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#22D3EE] mr-1.5" />
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value as any)}
              className="bg-transparent text-xs font-semibold text-white outline-none cursor-pointer"
            >
              <option value="popular" className="bg-[#131226] text-white">Popularity</option>
              <option value="price-low" className="bg-[#131226] text-white">Price: Low to High</option>
              <option value="price-high" className="bg-[#131226] text-white">Price: High to Low</option>
              <option value="prep-time" className="bg-[#131226] text-white">Fastest Prep</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills (Horizontal Scrollable) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                sounds.playPop();
                onSelectCategory(cat.id);
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-[#8B5CF6] text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] border border-[#A78BFA] scale-105'
                  : 'bg-[#131226]/80 text-slate-300 hover:text-white border border-[#221F42] hover:border-[#8B5CF6]/40 hover:bg-[#1A1835]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
