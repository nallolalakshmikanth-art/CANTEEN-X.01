import React from 'react';
import { Home, BookOpen, Receipt, Ticket, User as UserIcon } from 'lucide-react';
import { sounds } from '../utils/audio';

interface MobileBottomNavProps {
  currentTab: 'menu' | 'tracker' | 'history';
  setCurrentTab: (tab: 'menu' | 'tracker' | 'history') => void;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
  activeOrderExists: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  setCurrentTab,
  onOpenAuth,
  isLoggedIn,
  activeOrderExists,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0B0B14]/90 backdrop-blur-2xl border-t border-[#1E1B38] px-4 py-2.5 shadow-[0_-8px_32px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => {
            sounds.playPop();
            setCurrentTab('menu');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
            currentTab === 'menu'
              ? 'text-[#8B5CF6] drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Home</span>
        </button>

        {/* Menu */}
        <button
          onClick={() => {
            sounds.playPop();
            setCurrentTab('menu');
            const el = document.getElementById('menu-items-grid');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Menu</span>
        </button>

        {/* Orders */}
        <button
          onClick={() => {
            sounds.playPop();
            setCurrentTab('history');
          }}
          className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
            currentTab === 'history'
              ? 'text-[#8B5CF6] drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Receipt className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Orders</span>
        </button>

        {/* Token */}
        <button
          onClick={() => {
            sounds.playPop();
            setCurrentTab('tracker');
          }}
          className={`flex flex-col items-center gap-1 relative transition-colors cursor-pointer ${
            currentTab === 'tracker'
              ? 'text-[#22D3EE] drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Ticket className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Token</span>
          {activeOrderExists && (
            <span className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-[#22D3EE] shadow-[0_0_6px_#22D3EE] animate-pulse"></span>
          )}
        </button>

        {/* Profile */}
        <button
          onClick={() => {
            sounds.playPop();
            onOpenAuth();
          }}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
        >
          <UserIcon className="w-5 h-5" />
          <span className="text-[10px] font-semibold">{isLoggedIn ? 'Profile' : 'Sign In'}</span>
        </button>
      </div>
    </nav>
  );
};
