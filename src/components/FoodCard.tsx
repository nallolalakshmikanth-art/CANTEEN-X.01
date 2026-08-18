import React from 'react';
import { MenuItem, CartItem } from '../types';
import { Plus, Minus, Star, Flame, Clock, Heart, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface FoodCardProps {
  item: MenuItem;
  cartItem?: CartItem;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (itemId: string) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  item,
  cartItem,
  onAddToCart,
  onUpdateQuantity,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const isOutOfStock = !item.inStock || item.stockCount === 0;

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;

    sounds.playPop();
    onAddToCart(item);
  };

  return (
    <div
      onClick={(e) => {
        if (!isOutOfStock && (!cartItem || cartItem.quantity === 0)) {
          handleAddClick(e);
        }
      }}
      className={`group relative bg-[#131226]/80 hover:bg-[#1A1835] border border-[#221F42] hover:border-[#8B5CF6]/50 rounded-2xl p-3.5 transition-all duration-300 flex flex-col justify-between backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_32px_rgba(139,92,246,0.15)] hover:-translate-y-1 ${
        isOutOfStock ? 'opacity-60 grayscale-[40%]' : 'cursor-pointer'
      }`}
    >
      {/* Top Image Container */}
      <div className="relative w-full aspect-square sm:aspect-4/3 rounded-xl overflow-hidden bg-[#0B0B14] mb-3">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Dark subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B14]/80 via-transparent to-transparent"></div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            sounds.playPop();
            if (onToggleFavorite) onToggleFavorite(item.id);
          }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#131226]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#8B5CF6] transition-colors cursor-pointer"
        >
          <Heart
            className={`w-3.5 h-3.5 ${
              isFavorite ? 'fill-[#8B5CF6] text-[#8B5CF6]' : 'text-slate-300'
            }`}
          />
        </button>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-2">
            <span className="bg-red-500/90 text-white font-mono font-black text-xs uppercase px-2.5 py-1 rounded-md tracking-wider border border-red-400">
              SOLD OUT
            </span>
          </div>
        )}

        {/* Prep time badge */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-[#0B0B14]/85 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-mono text-slate-300 border border-white/10">
          <Clock className="w-2.5 h-2.5 text-[#22D3EE]" />
          <span>{item.prepTimeMinutes} min</span>
        </div>
      </div>

      {/* Food Details */}
      <div className="space-y-1.5 text-left flex-1">
        <h3 className="font-display font-bold text-sm text-white line-clamp-1 group-hover:text-cyan-300 transition-colors">
          {item.name}
        </h3>

        <div className="flex items-center justify-between">
          <span className="font-mono font-black text-base text-white">
            ₹{item.price}
          </span>

          <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-400">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{item.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Add to Tray or Quantity Controls */}
      <div className="pt-3 mt-1 flex items-center justify-between border-t border-[#221F42]/60">
        <span className="text-[10px] font-mono text-slate-400">
          {item.stockCount <= 5 && !isOutOfStock ? (
            <span className="text-amber-400 font-bold">Only {item.stockCount} left</span>
          ) : (
            `${item.calories} kcal`
          )}
        </span>

        {cartItem && cartItem.quantity > 0 ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center bg-[#8B5CF6]/20 border border-[#8B5CF6]/60 rounded-full px-1.5 py-0.5 shadow-[0_0_12px_rgba(139,92,246,0.3)]"
          >
            <button
              onClick={() => onUpdateQuantity(item.id, -1)}
              className="w-5 h-5 flex items-center justify-center rounded-full text-white hover:bg-[#8B5CF6] transition-colors cursor-pointer"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="font-mono font-black text-xs text-white px-2">
              {cartItem.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, 1)}
              className="w-5 h-5 flex items-center justify-center rounded-full text-white hover:bg-[#8B5CF6] transition-colors cursor-pointer"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button
            disabled={isOutOfStock}
            onClick={handleAddClick}
            className="bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-40 disabled:pointer-events-none text-white px-4 py-1 rounded-full text-xs font-bold shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
          >
            <span>Add</span>
          </button>
        )}
      </div>
    </div>
  );
};
