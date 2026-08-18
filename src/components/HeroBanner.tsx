import React from 'react';
import { ArrowRight, Sparkles, Utensils, Zap, Clock, Flame } from 'lucide-react';
import { sounds } from '../utils/audio';

interface HeroBannerProps {
  onBrowseMenu: () => void;
  onFilterQuickPrep: () => void;
  onFilterBestsellers: () => void;
  activeOrdersCount: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onBrowseMenu,
  onFilterQuickPrep,
  onFilterBestsellers,
  activeOrdersCount,
}) => {
  return (
    <div className="relative overflow-hidden pt-8 pb-10 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#22D3EE]/12 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Headline, Subtitle, CTA buttons */}
        <div className="lg:col-span-7 text-left space-y-6">
          <div className="space-y-4">
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
              Hungry? Skip <br />
              <span className="text-white">the Queue. </span>
              <span className="inline-block transform hover:rotate-12 transition-transform">🍔</span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base max-w-lg leading-relaxed font-normal">
              Order from your college canteen and collect your food when it’s ready.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              id="hero-order-now-btn"
              onClick={() => {
                sounds.playPop();
                onBrowseMenu();
              }}
              className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#9B6CF7] hover:to-[#8B5CF6] text-white px-7 py-3 rounded-full font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:shadow-[0_0_35px_rgba(139,92,246,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Order Now</span>
            </button>

            <button
              id="hero-view-menu-btn"
              onClick={() => {
                sounds.playPop();
                onBrowseMenu();
              }}
              className="bg-[#191833]/70 hover:bg-[#25224A] border border-[#8B5CF6]/40 hover:border-[#8B5CF6] text-white px-7 py-3 rounded-full font-bold text-sm sm:text-base backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>View Menu</span>
            </button>
          </div>
        </div>

        {/* Right Column: 3D Food Platter Illustration */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
            {/* Glowing circular backdrop ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#8B5CF6]/20 to-[#22D3EE]/20 blur-2xl animate-pulse -z-10"></div>
            
            {/* 3D Food Illustration Container */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden p-2 flex items-center justify-center">
              <img
                src="/src/assets/images/hero_3d_food_platter_1786857756713.jpg"
                alt="Futuristic Canteen Food Platter with Burgers, Fries, Drinks"
                className="w-full h-full object-contain rounded-2xl drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] filter contrast-105 animate-float"
                onError={(e) => {
                  // Fallback if image path has dynamic hash
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80';
                }}
              />

              {/* Sparkle overlay accents */}
              <div className="absolute top-4 right-6 text-[#22D3EE] animate-pulse">✦</div>
              <div className="absolute bottom-8 left-6 text-[#8B5CF6] animate-pulse delay-300">✦</div>
              <div className="absolute top-1/2 left-2 text-[#22D3EE] text-xs opacity-70">★</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
