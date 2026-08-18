import React, { useState, useEffect } from 'react';
import { Order, OrderStatus } from '../types';
import {
  Ticket,
  Clock,
  CheckCircle2,
  ChefHat,
  BellRing,
  QrCode,
  ArrowRight,
  Printer,
  Sparkles,
  ShoppingBag,
  RotateCw,
  Play,
  Volume2,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

interface TokenTrackerProps {
  order: Order | null;
  allOrders: Order[];
  onSelectOrder: (order: Order) => void;
  onAdvanceOrderStatus: (orderId: string, nextStatus: OrderStatus) => void;
  onBrowseMenu: () => void;
}

const STAGES: { status: OrderStatus; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
  {
    status: 'received',
    label: 'Order Placed',
    desc: 'Ticket sent to kitchen terminal',
    icon: Ticket,
  },
  {
    status: 'preparing',
    label: 'Preparing',
    desc: 'Chef is cooking your fresh meal',
    icon: ChefHat,
  },
  {
    status: 'ready',
    label: 'Ready for Pickup',
    desc: 'Collect food at designated counter',
    icon: BellRing,
  },
  {
    status: 'completed',
    label: 'Pick Up / Done',
    desc: 'Order collected & served',
    icon: CheckCircle2,
  },
];

export const TokenTracker: React.FC<TokenTrackerProps> = ({
  order,
  allOrders,
  onSelectOrder,
  onAdvanceOrderStatus,
  onBrowseMenu,
}) => {
  const [isAutoSimulating, setIsAutoSimulating] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(360);

  // Active orders
  const activeOrders = allOrders.filter((o) => o.status !== 'completed');

  // Countdown timer simulation
  useEffect(() => {
    if (!order || order.status === 'completed') return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [order]);

  // Auto-simulation timer
  useEffect(() => {
    if (!isAutoSimulating || !order) return;

    const autoTimer = setInterval(() => {
      if (order.status === 'received') {
        onAdvanceOrderStatus(order.id, 'preparing');
      } else if (order.status === 'preparing') {
        onAdvanceOrderStatus(order.id, 'ready');
        sounds.playPickupBell();
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.5 },
          colors: ['#8B5CF6', '#22D3EE', '#F43F5E'],
        });
      } else if (order.status === 'ready') {
        onAdvanceOrderStatus(order.id, 'completed');
        setIsAutoSimulating(false);
      }
    }, 6000);

    return () => clearInterval(autoTimer);
  }, [isAutoSimulating, order, onAdvanceOrderStatus]);

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center">
        <div className="bg-[#131226]/80 backdrop-blur-xl border border-[#221F42] p-8 sm:p-12 rounded-3xl shadow-[0_12px_36px_rgba(0,0,0,0.5)]">
          <div className="w-20 h-20 bg-[#8B5CF6]/15 border border-[#8B5CF6]/40 rounded-2xl mx-auto mb-4 flex items-center justify-center text-4xl shadow-[0_0_25px_rgba(139,92,246,0.3)]">
            🎟️
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
            NO ACTIVE TOKEN FOUND
          </h2>
          <p className="text-sm font-medium text-slate-400 mt-2 max-w-md mx-auto">
            You don’t have an active order in the kitchen queue. Browse our menu to place an order and get an instant live token!
          </p>

          <button
            onClick={() => {
              sounds.playPop();
              onBrowseMenu();
            }}
            className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#9B6CF7] hover:to-[#8B5CF6] text-white px-6 py-3 rounded-full font-bold text-sm shadow-[0_0_25px_rgba(139,92,246,0.5)] cursor-pointer transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Browse Campus Menu</span>
          </button>
        </div>
      </div>
    );
  }

  const currentStageIndex = STAGES.findIndex((s) => s.status === order.status);
  const nextStatusMap: Record<OrderStatus, OrderStatus | null> = {
    received: 'preparing',
    preparing: 'ready',
    ready: 'completed',
    completed: null,
  };
  const nextStatus = nextStatusMap[order.status];

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleManualAdvance = () => {
    if (!nextStatus) return;
    sounds.playPop();
    if (nextStatus === 'ready') {
      sounds.playPickupBell();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#8B5CF6', '#22D3EE', '#F43F5E'],
      });
    }
    onAdvanceOrderStatus(order.id, nextStatus);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left pb-16">
      {/* Active Orders Switcher if multiple */}
      {activeOrders.length > 1 && (
        <div className="bg-[#131226]/80 border border-[#221F42] p-3 rounded-2xl flex items-center justify-between gap-2 overflow-x-auto">
          <span className="text-xs font-mono uppercase text-slate-400 whitespace-nowrap">
            Active Tokens:
          </span>
          <div className="flex items-center gap-2">
            {activeOrders.map((o) => (
              <button
                key={o.id}
                onClick={() => {
                  sounds.playPop();
                  onSelectOrder(o);
                }}
                className={`px-3 py-1 rounded-full font-mono font-bold text-xs border transition-all cursor-pointer ${
                  o.id === order.id
                    ? 'bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-[0_0_12px_rgba(139,92,246,0.5)]'
                    : 'bg-[#0B0B14] text-slate-400 border-[#221F42] hover:text-white'
                }`}
              >
                {o.tokenNumber} ({o.status.toUpperCase()})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Token Banner Card */}
      <div className="relative bg-[#131226]/90 backdrop-blur-xl border border-[#2A274E] rounded-3xl p-6 sm:p-8 shadow-[0_12px_36px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-80 h-40 bg-[#22D3EE]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-40 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Status Header */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-[#221F42] pb-4">
          <div className="flex items-center gap-2">
            <span className="bg-[#8B5CF6]/20 text-[#C4B5FD] border border-[#8B5CF6]/50 px-3 py-0.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider">
              LIVE CANTEEN TOKEN
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Created {order.createdAt}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-300 bg-[#0B0B14]/80 border border-[#221F42] px-3 py-1 rounded-full">
              {order.counterNumber}
            </span>
          </div>
        </div>

        {/* Token Number Highlight & Estimated Pickup */}
        <div className="relative z-10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-slate-400 tracking-wider block">
              YOUR ORDER TOKEN NUMBER
            </span>
            <div className="inline-block bg-[#0B0B14]/80 border border-[#22D3EE]/40 px-6 py-2 rounded-2xl shadow-[0_0_25px_rgba(34,211,238,0.25)]">
              <span className="font-mono font-black text-5xl sm:text-6xl text-[#22D3EE] drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
                {order.tokenNumber}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 pt-1">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
              Customer: <span className="font-bold text-white">{order.userName}</span> (
              {order.userRole.toUpperCase()}
              {order.userIdCard ? ` • ${order.userIdCard}` : ''})
            </p>
          </div>

          {/* Status Badge & Pickup Countdown */}
          <div className="bg-[#0B0B14]/70 border border-[#221F42] p-5 rounded-2xl min-w-[240px] text-left backdrop-blur-md">
            <div className="text-[11px] font-mono text-slate-400 uppercase">
              Current Live Status
            </div>
            <div className="font-display font-bold text-xl text-white uppercase mt-1 flex items-center gap-2">
              {order.status === 'ready' && <BellRing className="w-5 h-5 text-emerald-400 animate-bounce" />}
              {order.status === 'preparing' && <ChefHat className="w-5 h-5 text-[#8B5CF6] animate-pulse" />}
              {order.status === 'received' && <Ticket className="w-5 h-5 text-[#22D3EE]" />}
              {order.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              <span>{order.status.replace('_', ' ')}</span>
            </div>

            {order.status !== 'completed' ? (
              <div className="mt-3 pt-2.5 border-t border-[#221F42] flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-[#22D3EE]" />
                  <span>Est. Pickup:</span>
                </div>
                <span className="font-mono font-bold text-sm text-[#22D3EE]">
                  {formatTime(secondsRemaining)}
                </span>
              </div>
            ) : (
              <div className="mt-2 text-xs font-semibold text-emerald-400">
                Order successfully collected. Enjoy!
              </div>
            )}
          </div>
        </div>

        {/* Ready Notification Banner if ready */}
        {order.status === 'ready' && (
          <div className="relative z-10 mb-5 bg-emerald-500/15 border border-emerald-500/40 p-4 rounded-2xl flex items-center justify-between gap-3 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-black flex items-center justify-center font-bold">
                <BellRing className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-emerald-300">
                  🔔 YOUR FOOD IS READY FOR PICKUP!
                </h4>
                <p className="text-xs text-slate-300">
                  Please proceed to <span className="font-bold text-white">{order.counterNumber}</span> with token {order.tokenNumber}.
                </p>
              </div>
            </div>

            <button
              onClick={() => sounds.playPickupBell()}
              className="bg-emerald-500 hover:bg-emerald-400 text-black px-3 py-1.5 rounded-full font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Chime</span>
            </button>
          </div>
        )}

        {/* Multi-Stage Stepper */}
        <div className="relative z-10 bg-[#0B0B14]/60 border border-[#221F42] p-4 rounded-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {STAGES.map((stage, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              const IconComponent = stage.icon;

              return (
                <div
                  key={stage.status}
                  className={`p-3 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                      : isPast
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-300'
                      : 'bg-[#131226]/40 border-transparent text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-slate-400">
                      0{idx + 1}
                    </span>
                    <IconComponent
                      className={`w-4 h-4 ${
                        isCurrent
                          ? 'text-[#22D3EE] animate-pulse'
                          : isPast
                          ? 'text-emerald-400'
                          : 'text-slate-500'
                      }`}
                    />
                  </div>

                  <h5 className="font-display font-bold text-xs text-white">
                    {stage.label}
                  </h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {stage.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Simulator Controls */}
      <div className="bg-[#131226]/80 border border-[#221F42] p-4 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#22D3EE] animate-ping"></div>
          <span className="text-xs font-mono uppercase text-slate-300">
            Kitchen Simulator:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {nextStatus && (
            <button
              onClick={handleManualAdvance}
              className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-4 py-1.5 rounded-full font-bold text-xs shadow-[0_0_15px_rgba(139,92,246,0.4)] flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <span>Advance to: {nextStatus.toUpperCase()}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => {
              sounds.playPop();
              setIsAutoSimulating(!isAutoSimulating);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
              isAutoSimulating
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                : 'bg-[#0B0B14] text-slate-400 border-[#221F42] hover:text-white'
            }`}
          >
            {isAutoSimulating ? (
              <>
                <RotateCw className="w-3 h-3 animate-spin" />
                <span>Stop Auto-Sim</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                <span>Auto-Simulate</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Receipt Details & Counter QR Code */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Items Summary */}
        <div className="md:col-span-2 bg-[#131226]/80 border border-[#221F42] p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#221F42] pb-3">
            <h3 className="font-display font-bold text-base text-white">
              Ordered Items ({order.items.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>
            <span className="font-mono text-xs text-slate-400 bg-[#0B0B14] px-2 py-0.5 rounded border border-[#221F42]">
              ID: {order.id.slice(-6).toUpperCase()}
            </span>
          </div>

          <div className="space-y-2.5 divide-y divide-[#221F42]">
            {order.items.map((item, idx) => (
              <div key={idx} className="pt-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-xs bg-[#8B5CF6]/20 text-[#C4B5FD] px-2 py-0.5 rounded border border-[#8B5CF6]/40">
                    {item.quantity}x
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-xs sm:text-sm text-white">
                      {item.menuItem.name}
                    </h4>
                    {item.selectedOption && (
                      <p className="text-[10px] text-[#22D3EE] font-mono">
                        • {item.selectedOption}
                      </p>
                    )}
                  </div>
                </div>
                <div className="font-mono font-bold text-xs text-white">
                  ₹{item.menuItem.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="pt-3 border-t border-[#221F42] space-y-1 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-mono text-white">₹{order.subtotal}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Campus Discount:</span>
                <span className="font-mono font-bold">-₹{order.discount}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#221F42]">
              <span>Total Paid ({order.paymentMethod.toUpperCase()}):</span>
              <span className="font-mono text-base text-[#22D3EE]">₹{order.total}</span>
            </div>
          </div>
        </div>

        {/* Counter QR Code */}
        <div className="bg-[#131226]/80 border border-[#221F42] p-6 rounded-3xl flex flex-col justify-between text-center">
          <div>
            <span className="text-xs font-mono uppercase text-slate-400 block mb-3">
              Counter QR Verification
            </span>

            <div className="w-36 h-36 bg-[#0B0B14] border border-[#22D3EE]/40 rounded-2xl mx-auto p-2.5 flex items-center justify-center relative shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <QrCode className="w-full h-full text-[#22D3EE] stroke-[1.5]" />
            </div>

            <p className="text-[11px] text-slate-400 mt-3">
              Show this token at <span className="text-white font-bold">{order.counterNumber}</span>.
            </p>
          </div>

          <div className="mt-6 space-y-2">
            <button
              onClick={() => {
                sounds.playPop();
                window.print();
              }}
              className="w-full bg-[#0B0B14] hover:bg-[#1A1835] border border-[#221F42] text-white p-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Slip</span>
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                onBrowseMenu();
              }}
              className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white p-2.5 rounded-full text-xs font-bold shadow-[0_0_15px_rgba(139,92,246,0.4)] cursor-pointer transition-colors"
            >
              + Order More Food
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
