import React from 'react';
import { Clock, Users, Flame, Zap } from 'lucide-react';

interface LiveCanteenStatusProps {
  activeOrdersCount: number;
}

export const LiveCanteenStatus: React.FC<LiveCanteenStatusProps> = ({
  activeOrdersCount,
}) => {
  return (
    <div className="bg-[#131226]/80 backdrop-blur-xl border border-[#221F42] rounded-2xl p-5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.3)] space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
          Live status
        </span>
        <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Canteen Open
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="bg-[#0B0B14]/60 border border-[#221F42] p-3 rounded-xl">
          <span className="text-[11px] text-slate-400 block font-medium">Currently serving</span>
          <span className="font-display font-bold text-sm text-white flex items-center gap-1.5 mt-0.5">
            <Users className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>{Math.max(1, activeOrdersCount)} active batches</span>
          </span>
        </div>

        <div className="bg-[#0B0B14]/60 border border-[#221F42] p-3 rounded-xl">
          <span className="text-[11px] text-slate-400 block font-medium">Average prep time</span>
          <span className="font-display font-bold text-sm text-white flex items-center gap-1.5 mt-0.5">
            <Clock className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>~8 min</span>
          </span>
        </div>
      </div>
    </div>
  );
};
