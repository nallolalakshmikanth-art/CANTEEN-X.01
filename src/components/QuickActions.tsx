import React from 'react';
import { Utensils, Ticket, CreditCard } from 'lucide-react';
import { sounds } from '../utils/audio';

interface QuickActionsProps {
  onBrowseMenu: () => void;
  onViewToken: () => void;
  onOpenCard: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onBrowseMenu,
  onViewToken,
  onOpenCard,
}) => {
  return (
    <div className="space-y-3.5 text-left">
      <h3 className="font-display font-bold text-xl text-white tracking-tight">
        Quick Actions
      </h3>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {/* Browse Menu */}
        <button
          onClick={() => {
            sounds.playPop();
            onBrowseMenu();
          }}
          className="group relative bg-[#131226]/80 hover:bg-[#1A1835] border border-[#221F42] hover:border-[#22D3EE]/50 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center gap-2.5 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] hover:-translate-y-1 transition-all cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/30 flex items-center justify-center text-[#22D3EE] group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all">
            <Utensils className="w-6 h-6" />
          </div>
          <span className="font-display font-bold text-xs sm:text-sm text-white group-hover:text-[#22D3EE] transition-colors whitespace-nowrap">
            Browse Menu
          </span>
        </button>

        {/* My Token */}
        <button
          onClick={() => {
            sounds.playPop();
            onViewToken();
          }}
          className="group relative bg-[#131226]/80 hover:bg-[#1A1835] border border-[#221F42] hover:border-[#8B5CF6]/50 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center gap-2.5 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.25)] hover:-translate-y-1 transition-all cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6] group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all">
            <Ticket className="w-6 h-6" />
          </div>
          <span className="font-display font-bold text-xs sm:text-sm text-white group-hover:text-[#8B5CF6] transition-colors whitespace-nowrap">
            My Token
          </span>
        </button>

        {/* My Card */}
        <button
          onClick={() => {
            sounds.playPop();
            onOpenCard();
          }}
          className="group relative bg-[#131226]/80 hover:bg-[#1A1835] border border-[#221F42] hover:border-[#22D3EE]/50 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center gap-2.5 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] hover:-translate-y-1 transition-all cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/30 flex items-center justify-center text-[#22D3EE] group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all">
            <CreditCard className="w-6 h-6" />
          </div>
          <span className="font-display font-bold text-xs sm:text-sm text-white group-hover:text-[#22D3EE] transition-colors whitespace-nowrap">
            My Card
          </span>
        </button>
      </div>
    </div>
  );
};
