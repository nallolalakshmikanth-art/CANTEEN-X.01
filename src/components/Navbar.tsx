import React from 'react';
import { User, Order } from '../types';
import { ShoppingBag, Bell, Search, User as UserIcon, LogOut, Ticket, Wallet } from 'lucide-react';
import { sounds } from '../utils/audio';

interface NavbarProps {
  user: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  cartCount: number;
  onOpenCart: () => void;
  activeOrder: Order | null;
  currentTab: 'menu' | 'tracker' | 'history';
  setCurrentTab: (tab: 'menu' | 'tracker' | 'history') => void;
  onRechargeWallet: () => void;
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenAuth,
  onLogout,
  cartCount,
  onOpenCart,
  activeOrder,
  currentTab,
  setCurrentTab,
  onRechargeWallet,
  onOpenSearch,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0B0B14]/85 backdrop-blur-xl border-b border-[#1E1B38] px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: CanteenX Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              sounds.playPop();
              setCurrentTab('menu');
            }}
            className="flex items-center gap-2 text-left group cursor-pointer"
            id="brand-logo-btn"
          >
            <div className="flex items-center">
              <span className="font-display font-black text-2xl tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                Canteen<span className="text-[#8B5CF6] drop-shadow-[0_0_12px_rgba(139,92,246,0.8)]">X</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] ml-1 shadow-[0_0_8px_#22D3EE] animate-pulse"></span>
            </div>
          </button>
        </div>

        {/* Center: Desktop Navigation Bar with Neon Pill for Active */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#131226]/90 border border-[#221F42] px-2 py-1.5 rounded-full backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <button
            id="nav-home-btn"
            onClick={() => {
              sounds.playPop();
              setCurrentTab('menu');
            }}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              currentTab === 'menu'
                ? 'bg-[#8B5CF6]/25 text-white border border-[#8B5CF6]/60 shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            Home
          </button>

          <button
            id="nav-menu-btn"
            onClick={() => {
              sounds.playPop();
              setCurrentTab('menu');
              const el = document.getElementById('menu-items-grid');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              currentTab === 'menu' && window.scrollY > 300
                ? 'text-white'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Menu
          </button>

          <button
            id="nav-orders-btn"
            onClick={() => {
              sounds.playPop();
              setCurrentTab('history');
            }}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              currentTab === 'history'
                ? 'bg-[#8B5CF6]/25 text-white border border-[#8B5CF6]/60 shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            Orders
          </button>

          <button
            id="nav-token-btn"
            onClick={() => {
              sounds.playPop();
              setCurrentTab('tracker');
            }}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer relative ${
              currentTab === 'tracker'
                ? 'bg-[#8B5CF6]/25 text-white border border-[#8B5CF6]/60 shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <span>Token</span>
            {activeOrder && (
              <span className="w-2 h-2 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE] animate-ping"></span>
            )}
          </button>
        </nav>

        {/* Right Section: Search, Notifications, Cart, User Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Search Icon */}
          <button
            onClick={() => {
              sounds.playPop();
              if (onOpenSearch) onOpenSearch();
              const el = document.getElementById('search-input-field');
              el?.focus();
            }}
            title="Search dishes"
            className="w-9 h-9 rounded-full bg-[#131226] border border-[#221F42] text-slate-300 hover:text-white hover:border-[#8B5CF6]/50 flex items-center justify-center transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Notification Bell */}
          <button
            onClick={() => {
              sounds.playPop();
              if (activeOrder) setCurrentTab('tracker');
            }}
            title="Notifications"
            className="w-9 h-9 rounded-full bg-[#131226] border border-[#221F42] text-slate-300 hover:text-white hover:border-[#8B5CF6]/50 flex items-center justify-center transition-colors relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {activeOrder && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]"></span>
            )}
          </button>

          {/* Cart Icon Button */}
          <button
            id="cart-drawer-trigger-btn"
            onClick={() => {
              sounds.playPop();
              onOpenCart();
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white px-3.5 py-1.5 rounded-full font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="bg-[#22D3EE] text-black font-black text-xs px-1.5 py-0.2 rounded-full leading-none">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar / Sign In */}
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onRechargeWallet}
                title="Campus Card Balance"
                className="hidden sm:flex items-center gap-1.5 bg-[#131226] border border-[#221F42] px-3 py-1 rounded-full text-xs font-mono text-[#22D3EE] hover:border-[#22D3EE]/50 transition-colors cursor-pointer"
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>₹{user.walletBalance.toFixed(0)}</span>
              </button>

              <div className="relative group">
                <button
                  onClick={() => {
                    sounds.playPop();
                  }}
                  className="flex items-center gap-2 bg-[#131226] hover:bg-[#1E1B38] border border-[#2A274E] p-0.5 rounded-full transition-all cursor-pointer"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#8B5CF6]/50"
                  />
                </button>

                {/* Dropdown Menu on hover/click */}
                <div className="absolute right-0 top-full mt-2 w-52 bg-[#131226] border border-[#2A274E] rounded-xl p-3 shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-50">
                  <div className="border-b border-[#221F42] pb-2 mb-2">
                    <p className="text-sm font-bold text-white truncate">{user.name}</p>
                    <p className="text-[11px] text-[#22D3EE] font-mono uppercase">{user.role}</p>
                  </div>
                  <button
                    onClick={onRechargeWallet}
                    className="w-full text-left text-xs py-1.5 px-2 hover:bg-white/5 rounded text-slate-300 flex items-center justify-between cursor-pointer"
                  >
                    <span>Card Balance</span>
                    <span className="text-[#22D3EE] font-mono font-bold">₹{user.walletBalance}</span>
                  </button>
                  <button
                    onClick={() => {
                      sounds.playPop();
                      setCurrentTab('history');
                    }}
                    className="w-full text-left text-xs py-1.5 px-2 hover:bg-white/5 rounded text-slate-300 cursor-pointer"
                  >
                    Order History
                  </button>
                  <button
                    onClick={() => {
                      sounds.playPop();
                      onLogout();
                    }}
                    className="w-full text-left text-xs py-1.5 px-2 hover:bg-red-500/20 text-red-400 rounded flex items-center gap-1.5 mt-1 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Switch Role / Logout</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                sounds.playPop();
                onOpenAuth();
              }}
              className="flex items-center gap-1.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all cursor-pointer"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
