import React, { useState } from 'react';
import { MenuItem } from '../types';
import { X, Plus, Check } from 'lucide-react';
import { sounds } from '../utils/audio';

interface FoodCustomizerModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, selectedOption?: string, cookingNote?: string) => void;
}

export const FoodCustomizerModal: React.FC<FoodCustomizerModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [cookingNote, setCookingNote] = useState<string>('');

  if (!isOpen || !item) return null;

  // Default selection if options exist
  const defaultOption = item.customOptions?.[0]?.options[0] || '';
  const currentOption = selectedOption || defaultOption;

  const handleConfirm = () => {
    sounds.playPop();
    onAddToCart(item, currentOption, cookingNote.trim() || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#131226]/95 border border-[#2A274E] rounded-3xl shadow-[0_16px_48px_rgba(0,0,0,0.8)] backdrop-blur-2xl p-6 text-left overflow-hidden">
        {/* Close */}
        <button
          onClick={() => {
            sounds.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1A1835] border border-[#2A274E] text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Item details */}
        <div className="flex items-center gap-3.5 mb-5">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 rounded-2xl object-cover border border-white/10"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`w-2 h-2 rounded-full ${
                  item.isVeg ? 'bg-emerald-400' : 'bg-rose-400'
                }`}
              />
              <span className="font-mono text-xs text-[#22D3EE]">
                {item.prepTimeMinutes}m prep
              </span>
            </div>
            <h3 className="font-display font-bold text-lg text-white leading-tight">
              {item.name}
            </h3>
            <p className="font-mono font-bold text-sm text-white">₹{item.price}</p>
          </div>
        </div>

        {/* Customization Options */}
        {item.customOptions && item.customOptions.length > 0 && (
          <div className="space-y-4 mb-5">
            {item.customOptions.map((group, idx) => (
              <div key={idx}>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  {group.title}:
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {group.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        sounds.playPop();
                        setSelectedOption(opt);
                      }}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        currentOption === opt
                          ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                          : 'bg-[#0B0B14] border-[#221F42] text-slate-300 hover:border-[#8B5CF6]/50'
                      }`}
                    >
                      <span>{opt}</span>
                      {currentOption === opt && <Check className="w-4 h-4 text-[#22D3EE]" />}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Special Instructions */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Custom Cooking Request:
          </label>
          <input
            type="text"
            value={cookingNote}
            onChange={(e) => setCookingNote(e.target.value)}
            placeholder="e.g. Less spicy, extra chutney, separate packing"
            className="w-full bg-[#0B0B14] border border-[#221F42] focus:border-[#8B5CF6] p-2.5 rounded-xl text-xs text-white placeholder-slate-500 outline-none"
          />
        </div>

        {/* Confirm Add */}
        <button
          onClick={handleConfirm}
          className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#9B6CF7] hover:to-[#8B5CF6] text-white p-3.5 rounded-full font-bold text-sm shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add to Tray • ₹{item.price}</span>
        </button>
      </div>
    </div>
  );
};
