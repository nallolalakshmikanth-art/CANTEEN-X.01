import React, { useState } from 'react';
import { User } from '../types';
import { X, Wallet, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onAddFunds: (amount: number) => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  user,
  onAddFunds,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(250);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isOpen || !user) return null;

  const handleRecharge = () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (isNaN(amount) || amount <= 0) return;

    setIsProcessing(true);
    sounds.playPop();

    setTimeout(() => {
      setIsProcessing(false);
      onAddFunds(amount);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#131226]/95 border border-[#2A274E] rounded-3xl shadow-[0_16px_48px_rgba(0,0,0,0.8)] backdrop-blur-2xl p-6 sm:p-7 text-left overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-48 h-24 bg-[#8B5CF6]/15 rounded-full blur-2xl pointer-events-none"></div>

        <button
          onClick={() => {
            sounds.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1A1835] border border-[#2A274E] text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-5 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#22D3EE]">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-white">
              Campus ID Card Wallet
            </h3>
            <p className="text-xs text-slate-400">
              Account: {user.name} ({user.role.toUpperCase()})
            </p>
          </div>
        </div>

        {/* Current Balance Display */}
        <div className="bg-[#0B0B14] border border-[#221F42] p-4 rounded-2xl mb-5 flex items-center justify-between relative z-10">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase">
              Current Available Balance
            </span>
            <div className="font-mono font-black text-2xl sm:text-3xl text-[#22D3EE] drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
              ₹{user.walletBalance.toFixed(2)}
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
            Active
          </span>
        </div>

        {/* Preset Amounts */}
        <label className="block text-xs font-semibold text-slate-300 mb-2 relative z-10">
          Select Top-Up Amount:
        </label>
        <div className="grid grid-cols-4 gap-2 mb-4 relative z-10">
          {[100, 250, 500, 1000].map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => {
                sounds.playPop();
                setSelectedAmount(amt);
                setCustomAmount('');
              }}
              className={`p-2.5 rounded-xl border font-mono font-bold text-xs transition-all cursor-pointer ${
                selectedAmount === amt && !customAmount
                  ? 'bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                  : 'bg-[#0B0B14] border-[#221F42] text-slate-400 hover:text-white'
              }`}
            >
              +₹{amt}
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="mb-6 relative z-10">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Or Enter Custom Amount (₹):
          </label>
          <input
            type="number"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount(0);
            }}
            placeholder="e.g. 350"
            className="w-full bg-[#0B0B14] border border-[#221F42] focus:border-[#8B5CF6] p-2.5 rounded-xl font-mono text-sm text-white outline-none"
          />
        </div>

        {/* Recharge Action */}
        <button
          disabled={isProcessing}
          onClick={handleRecharge}
          className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#9B6CF7] hover:to-[#8B5CF6] text-white p-3.5 rounded-full font-bold text-sm shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 relative z-10"
        >
          <Sparkles className="w-4 h-4" />
          <span>
            {isProcessing
              ? 'Topping Up...'
              : `Add ₹${customAmount || selectedAmount} to ID Card`}
          </span>
        </button>
      </div>
    </div>
  );
};
