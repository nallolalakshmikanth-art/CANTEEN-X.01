import React, { useState } from 'react';
import { Order } from '../types';
import { Tv, BellRing, ChefHat, Volume2, CheckCircle2, Sparkles, Flame } from 'lucide-react';
import { sounds } from '../utils/audio';

interface TokenBoardProps {
  orders: Order[];
  onSelectToken: (order: Order) => void;
}

export const TokenBoard: React.FC<TokenBoardProps> = ({ orders, onSelectToken }) => {
  const readyOrders = orders.filter((o) => o.status === 'ready');
  const preparingOrders = orders.filter((o) => o.status === 'preparing');

  // Fallback demo tokens if list is short
  const demoReady = readyOrders.length > 0 ? readyOrders : [
    { id: 'demo1', tokenNumber: '#A-27', counterNumber: 'Counter 01 - Hot Meals', userName: 'Rohan V.', items: [], subtotal: 180, discount: 18, total: 162, paymentMethod: 'upi' as const, paymentStatus: 'paid' as const, status: 'ready' as const, createdAt: '12:30 PM', estimatedPickupTime: '12:38 PM', userRole: 'student' as const },
    { id: 'demo2', tokenNumber: '#B-14', counterNumber: 'Counter 02 - Rolls & Bites', userName: 'Ananya S.', items: [], subtotal: 120, discount: 0, total: 120, paymentMethod: 'counter' as const, paymentStatus: 'paid' as const, status: 'ready' as const, createdAt: '12:32 PM', estimatedPickupTime: '12:40 PM', userRole: 'faculty' as const },
  ];

  const demoPreparing = preparingOrders.length > 0 ? preparingOrders : [
    { id: 'demo3', tokenNumber: '#A-28', counterNumber: 'Counter 01 - Hot Meals', userName: 'Dev K.', items: [], subtotal: 210, discount: 21, total: 189, paymentMethod: 'id_wallet' as const, paymentStatus: 'paid' as const, status: 'preparing' as const, createdAt: '12:34 PM', estimatedPickupTime: '12:44 PM', userRole: 'student' as const },
    { id: 'demo4', tokenNumber: '#C-09', counterNumber: 'Counter 03 - Beverages', userName: 'Meera P.', items: [], subtotal: 60, discount: 0, total: 60, paymentMethod: 'upi' as const, paymentStatus: 'paid' as const, status: 'preparing' as const, createdAt: '12:35 PM', estimatedPickupTime: '12:41 PM', userRole: 'guest' as const },
    { id: 'demo5', tokenNumber: '#A-29', counterNumber: 'Counter 01 - Hot Meals', userName: 'Karthik N.', items: [], subtotal: 150, discount: 15, total: 135, paymentMethod: 'upi' as const, paymentStatus: 'paid' as const, status: 'preparing' as const, createdAt: '12:36 PM', estimatedPickupTime: '12:46 PM', userRole: 'student' as const },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 text-left pb-16">
      {/* Board Title Header */}
      <div className="bg-[#131226]/80 backdrop-blur-xl border border-[#221F42] p-6 rounded-3xl shadow-[0_12px_36px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#22D3EE] shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            <Tv className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                LIVE BROADCAST FEED
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              Campus Kitchen Live Display
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => sounds.playPickupBell()}
            className="flex items-center gap-1.5 bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/40 border border-[#8B5CF6]/50 text-[#C4B5FD] px-3.5 py-1.5 rounded-full text-xs font-bold shadow-[0_0_15px_rgba(139,92,246,0.2)] cursor-pointer transition-colors"
          >
            <Volume2 className="w-4 h-4" />
            <span>Test Sound Bell</span>
          </button>
        </div>
      </div>

      {/* Two Column Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Column 1: READY FOR PICKUP */}
        <div className="bg-[#131226]/80 backdrop-blur-xl border border-emerald-500/40 rounded-3xl p-6 shadow-[0_12px_36px_rgba(0,0,0,0.5)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3 mb-5">
              <div className="flex items-center gap-2">
                <BellRing className="w-5 h-5 text-emerald-400 animate-bounce" />
                <h3 className="font-display font-bold text-xl text-emerald-300 uppercase tracking-tight">
                  READY FOR PICKUP
                </h3>
              </div>
              <span className="font-mono font-bold text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                {demoReady.length} READY
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Present your order token slip or scan the QR at the designated counter.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {demoReady.map((orderItem) => (
                <div
                  key={orderItem.id}
                  onClick={() => {
                    sounds.playPop();
                    onSelectToken(orderItem);
                  }}
                  className="bg-[#0B0B14]/80 border border-emerald-500/30 hover:border-emerald-400 p-4 rounded-2xl shadow-[0_4px_20px_rgba(16,185,129,0.15)] hover:scale-102 transition-all cursor-pointer text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
                      COLLECT NOW
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {orderItem.createdAt}
                    </span>
                  </div>

                  <div className="font-mono font-black text-3xl text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.7)] my-2">
                    {orderItem.tokenNumber}
                  </div>

                  <div className="text-xs text-slate-300 border-t border-[#221F42] pt-2 truncate">
                    {orderItem.counterNumber}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-[#221F42] text-[11px] text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tokens remain displayed for 15 minutes</span>
          </div>
        </div>

        {/* Column 2: NOW PREPARING */}
        <div className="bg-[#131226]/80 backdrop-blur-xl border border-[#8B5CF6]/40 rounded-3xl p-6 shadow-[0_12px_36px_rgba(0,0,0,0.5)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#8B5CF6]/20 pb-3 mb-5">
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-[#8B5CF6] animate-pulse" />
                <h3 className="font-display font-bold text-xl text-[#C4B5FD] uppercase tracking-tight">
                  NOW PREPARING
                </h3>
              </div>
              <span className="font-mono font-bold text-xs bg-[#8B5CF6]/20 text-[#C4B5FD] border border-[#8B5CF6]/40 px-2.5 py-0.5 rounded-full">
                {demoPreparing.length} COOKING
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Kitchen stations are currently crafting these hot fresh orders:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {demoPreparing.map((orderItem) => (
                <div
                  key={orderItem.id}
                  onClick={() => {
                    sounds.playPop();
                    onSelectToken(orderItem);
                  }}
                  className="bg-[#0B0B14]/80 border border-[#8B5CF6]/30 hover:border-[#8B5CF6] p-4 rounded-2xl shadow-[0_4px_20px_rgba(139,92,246,0.15)] hover:scale-102 transition-all cursor-pointer text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                      SIZZLING
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Est. {orderItem.estimatedPickupTime}
                    </span>
                  </div>

                  <div className="font-mono font-black text-3xl text-[#22D3EE] drop-shadow-[0_0_10px_rgba(34,211,238,0.7)] my-2">
                    {orderItem.tokenNumber}
                  </div>

                  <div className="text-xs text-slate-300 border-t border-[#221F42] pt-2 truncate">
                    {orderItem.counterNumber}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-[#221F42] text-[11px] text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>Avg turnaround time ~6.4 minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
};
