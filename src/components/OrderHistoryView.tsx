import React from 'react';
import { Order } from '../types';
import { Clock, RotateCcw, ShoppingBag, CheckCircle, Ticket, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/audio';

interface OrderHistoryViewProps {
  orders: Order[];
  onTrackOrder: (order: Order) => void;
  onReorder: (order: Order) => void;
  onBrowseMenu: () => void;
}

export const OrderHistoryView: React.FC<OrderHistoryViewProps> = ({
  orders,
  onTrackOrder,
  onReorder,
  onBrowseMenu,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left pb-16">
      {/* Header */}
      <div className="bg-[#131226]/80 backdrop-blur-xl border border-[#221F42] p-6 rounded-3xl shadow-[0_12px_36px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="bg-[#8B5CF6]/20 text-[#C4B5FD] border border-[#8B5CF6]/50 px-3 py-0.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider">
            YOUR CAMPUS DIARY
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1">
            Order History & Tokens
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Review past tokens, track active runs, and re-order with 1 click.
          </p>
        </div>

        <button
          onClick={() => {
            sounds.playPop();
            onBrowseMenu();
          }}
          className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#9B6CF7] hover:to-[#8B5CF6] text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-[0_0_20px_rgba(139,92,246,0.4)] cursor-pointer whitespace-nowrap transition-all"
        >
          + New Order
        </button>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="bg-[#131226]/80 backdrop-blur-xl border border-[#221F42] p-12 text-center rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="w-16 h-16 rounded-2xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/40 mx-auto mb-3 flex items-center justify-center text-3xl">
            📜
          </div>
          <h3 className="font-display font-bold text-lg text-white">No Previous Orders</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Place your first order from our live menu to unlock digital tokens and instant re-ordering!
          </p>
          <button
            onClick={() => {
              sounds.playPop();
              onBrowseMenu();
            }}
            className="mt-5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-[0_0_15px_rgba(139,92,246,0.4)] cursor-pointer"
          >
            Explore Menu Now
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-[#131226]/80 border border-[#221F42] hover:border-[#8B5CF6]/50 p-5 rounded-2xl shadow-[0_6px_24px_rgba(0,0,0,0.3)] transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#221F42] pb-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-black text-xl text-[#22D3EE] bg-[#0B0B14] px-3 py-0.5 rounded-xl border border-[#221F42]">
                    {order.tokenNumber}
                  </span>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">
                      Ordered at {order.createdAt}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-xs font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                      order.status === 'ready'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : order.status === 'preparing'
                        ? 'bg-[#8B5CF6]/20 text-[#C4B5FD] border-[#8B5CF6]/40'
                        : order.status === 'completed'
                        ? 'bg-[#0B0B14] text-slate-400 border-[#221F42]'
                        : 'bg-[#22D3EE]/20 text-[#22D3EE] border-[#22D3EE]/40'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items in order */}
              <div className="space-y-1.5 mb-4">
                {order.items.map((item, i) => (
                  <div key={i} className="text-xs text-slate-300 flex justify-between">
                    <span>
                      {item.quantity}x {item.menuItem.name}
                      {item.selectedOption ? ` (${item.selectedOption})` : ''}
                    </span>
                    <span className="font-mono font-bold text-white">
                      ₹{item.menuItem.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total & Action Buttons */}
              <div className="pt-3 border-t border-[#221F42] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    Paid via {order.paymentMethod.toUpperCase()}
                  </span>
                  <span className="font-mono font-bold text-base text-white">
                    Total: ₹{order.total}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      sounds.playPop();
                      onTrackOrder(order);
                    }}
                    className="bg-[#0B0B14] hover:bg-[#1A1835] border border-[#221F42] text-[#22D3EE] px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>View Token</span>
                  </button>

                  <button
                    onClick={() => {
                      sounds.playPop();
                      onReorder(order);
                    }}
                    className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-3.5 py-1.5 rounded-full font-bold text-xs shadow-[0_0_12px_rgba(139,92,246,0.4)] flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Re-Order Tray</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
