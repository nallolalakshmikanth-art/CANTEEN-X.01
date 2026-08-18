import React from 'react';
import { Order, OrderStatus } from '../types';
import { Clock, CheckCircle2, Flame, ArrowRight, Ticket, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface LiveOrderStatusCardProps {
  order: Order | null;
  onViewDetails: () => void;
}

export const LiveOrderStatusCard: React.FC<LiveOrderStatusCardProps> = ({
  order,
  onViewDetails,
}) => {
  // If no order in prop, render a default demo active order as shown in the design mockup
  const displayToken = order ? order.tokenNumber.replace('#', '') : 'A-27';
  const displayOrderId = order ? `#${order.id.slice(-6).toUpperCase()}` : '#CX2048';
  const displayPickupTime = order ? order.estimatedPickupTime : '12:35 PM';
  const displayStatus = order ? order.status : 'preparing';

  const steps: { key: OrderStatus; label: string }[] = [
    { key: 'received', label: 'Order Placed' },
    { key: 'preparing', label: 'Preparing' },
    { key: 'ready', label: 'Ready' },
    { key: 'completed', label: 'Pick Up' },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'received':
        return 0;
      case 'preparing':
        return 1;
      case 'ready':
        return 2;
      case 'completed':
        return 3;
      default:
        return 1;
    }
  };

  const currentStepIdx = getStepIndex(displayStatus as OrderStatus);

  return (
    <div
      onClick={() => {
        sounds.playPop();
        onViewDetails();
      }}
      className="relative bg-[#131226]/85 backdrop-blur-xl border border-[#2A274E] hover:border-[#8B5CF6]/60 rounded-3xl p-6 sm:p-7 shadow-[0_12px_36px_rgba(0,0,0,0.5)] transition-all cursor-pointer group overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-64 h-32 bg-[#22D3EE]/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-32 bg-[#8B5CF6]/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 space-y-6">
        {/* Top Row: Status Title & Token */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <span className="text-xs font-mono font-medium text-slate-400 block tracking-wide">
              Live Order Status
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
              Your Current Order
            </h2>
            <div className="flex items-center gap-2 pt-0.5">
              <span className="text-xs font-mono text-slate-400">Order {displayOrderId}</span>
              <span className="inline-flex items-center gap-1 bg-[#8B5CF6]/20 border border-[#8B5CF6]/50 text-[#C4B5FD] text-[11px] font-bold px-2 py-0.5 rounded-full">
                <Flame className="w-3 h-3 text-[#F43F5E]" />
                <span>
                  {displayStatus === 'preparing'
                    ? 'Being Prepared 🔥'
                    : displayStatus === 'ready'
                    ? 'Ready for Pickup 🚀'
                    : displayStatus === 'completed'
                    ? 'Completed ✅'
                    : 'Order Placed ⏳'}
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 bg-[#0B0B14]/60 border border-[#221F42] px-5 py-3 rounded-2xl backdrop-blur-md">
            <div className="text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Estimated Pickup
              </span>
              <span className="font-display font-bold text-lg sm:text-xl text-white">
                {displayPickupTime}
              </span>
            </div>

            <div className="h-8 w-[1px] bg-[#221F42]"></div>

            <div className="text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Token:
              </span>
              <span className="font-mono font-black text-2xl text-[#22D3EE] drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]">
                {displayToken}
              </span>
            </div>
          </div>
        </div>

        {/* Modern Glowing Progress Bar */}
        <div className="pt-2">
          {/* Track and nodes */}
          <div className="relative flex items-center justify-between">
            {/* Background Line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#221F42] rounded-full"></div>

            {/* Active Progress Line */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
              style={{
                width: `${(currentStepIdx / (steps.length - 1)) * 100}%`,
              }}
            ></div>

            {/* Step Nodes */}
            {steps.map((step, idx) => {
              const isCompleted = idx < currentStepIdx;
              const isCurrent = idx === currentStepIdx;

              return (
                <div key={step.key} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-[#22D3EE] ring-4 ring-[#22D3EE]/30 shadow-[0_0_16px_#22D3EE] scale-110'
                        : isCompleted
                        ? 'bg-[#8B5CF6] shadow-[0_0_10px_#8B5CF6]'
                        : 'bg-[#1E1B38] border border-[#2A274E]'
                    }`}
                  >
                    {isCompleted && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                    {isCurrent && <div className="w-2 h-2 rounded-full bg-white animate-ping"></div>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Step Labels */}
          <div className="flex items-center justify-between mt-3">
            {steps.map((step, idx) => {
              const isCurrent = idx === currentStepIdx;
              return (
                <span
                  key={step.key}
                  className={`text-[11px] sm:text-xs font-semibold tracking-tight transition-colors ${
                    isCurrent
                      ? 'text-[#22D3EE] drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] font-bold'
                      : idx < currentStepIdx
                      ? 'text-slate-300'
                      : 'text-slate-500'
                  }`}
                >
                  {step.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
