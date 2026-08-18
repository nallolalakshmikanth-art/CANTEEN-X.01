import React from 'react';
import { MenuItem, CartItem } from '../types';
import { Sparkles, Heart, Star, Plus, Clock } from 'lucide-react';
import { sounds } from '../utils/audio';

interface RecommendedSectionProps {
  items: MenuItem[];
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const RecommendedSection: React.FC<RecommendedSectionProps> = ({
  items,
  cart,
  onAddToCart,
  favorites,
  onToggleFavorite,
}) => {
  // Take top 3 recommended items (e.g. Biryani, Fried Rice, Masala Dosa)
  const recommendedItems = items.slice(0, 3);

  return (
    <div className="space-y-4 text-left">
      <div>
        <div className="flex items-center gap-1.5">
          <span className="text-[#8B5CF6] text-lg">✨</span>
          <h3 className="font-display font-bold text-xl text-white tracking-tight">
            Recommended For You
          </h3>
        </div>
        <p className="text-xs text-slate-400 font-medium">
          Based on your previous orders
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendedItems.map((item) => {
          const isFav = favorites.includes(item.id);
          const inCart = cart.find((ci) => ci.menuItem.id === item.id);

          return (
            <div
              key={item.id}
              onClick={() => {
                sounds.playPop();
                onAddToCart(item);
              }}
              className="group relative bg-[#131226]/80 hover:bg-[#1A1835] border border-[#221F42] hover:border-[#8B5CF6]/50 rounded-2xl p-4 transition-all duration-300 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_32px_rgba(139,92,246,0.2)] hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container with Heart Button */}
              <div className="relative w-full aspect-16/10 rounded-xl overflow-hidden bg-[#0B0B14] mb-3.5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B14]/80 via-transparent to-transparent"></div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sounds.playPop();
                    onToggleFavorite(item.id);
                  }}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-[#131226]/85 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#8B5CF6] transition-colors cursor-pointer"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFav ? 'fill-[#8B5CF6] text-[#8B5CF6]' : 'text-slate-300'
                    }`}
                  />
                </button>

                <div className="absolute bottom-2 left-2.5 flex items-center gap-1 bg-[#0B0B14]/85 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-mono text-slate-300 border border-white/10">
                  <Clock className="w-3 h-3 text-[#22D3EE]" />
                  <span>{item.prepTimeMinutes} min prep</span>
                </div>
              </div>

              {/* Title & Info */}
              <div className="space-y-1 text-left">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-display font-bold text-base text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {item.name}
                  </h4>
                </div>

                <p className="text-xs text-slate-400 line-clamp-1 font-normal">
                  {item.description}
                </p>
              </div>

              {/* Price & Action */}
              <div className="pt-3.5 mt-2 flex items-center justify-between border-t border-[#221F42]/60">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono font-black text-lg text-white">
                    ₹{item.price}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-semibold text-amber-400">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{item.rating.toFixed(1)}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sounds.playPop();
                    onAddToCart(item);
                  }}
                  className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Tray</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
