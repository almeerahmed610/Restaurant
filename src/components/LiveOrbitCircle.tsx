import React, { useState } from 'react';
import { Flame, Sparkles, X, MapPin, Clock, ShieldCheck, Bot, ShoppingBag } from 'lucide-react';
import { BranchId, BranchInfo } from '../types';

interface LiveOrbitCircleProps {
  currentBranch: BranchId;
  branches: Record<BranchId, BranchInfo>;
  onOpenVoiceAssistant: () => void;
  onOpenCart: () => void;
}

export const LiveOrbitCircle: React.FC<LiveOrbitCircleProps> = ({
  currentBranch,
  branches,
  onOpenVoiceAssistant,
  onOpenCart
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const branch = branches[currentBranch];

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      
      {/* Popover Mini Dashboard Card when Clicked */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-88 bg-stone-900/95 backdrop-blur-xl border border-amber-500/40 rounded-3xl p-5 shadow-2xl shadow-stone-950/80 animate-in zoom-in-95 duration-200 text-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <h4 className="font-serif font-bold text-sm text-white">Live Operations Hub</h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
              <div className="flex items-center justify-between text-stone-400 text-[11px]">
                <span className="flex items-center gap-1 text-amber-400 font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  Active Branch
                </span>
                <span className="text-emerald-400 font-mono font-bold">24/7 OPEN</span>
              </div>
              <p className="text-white font-bold">{branch.name}</p>
              <p className="text-[11px] text-stone-400 truncate">{branch.address}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                <span className="text-stone-400 block">Total Seating</span>
                <span className="text-amber-400 font-mono font-bold text-sm">{branch.totalSeats} Seats</span>
                <span className="text-[10px] text-stone-500 block">({branch.totalTables} Tables)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                <span className="text-stone-400 block">Avg Kitchen Prep</span>
                <span className="text-emerald-400 font-mono font-bold text-sm">18–25 Mins</span>
                <span className="text-[10px] text-stone-500 block">Live Tandoor</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-[11px] text-amber-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>10% Bank Discount active on HBL, Meezan &amp; Alfalah cards.</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenVoiceAssistant();
              }}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
            >
              <Bot className="w-4 h-4 text-stone-950" />
              <span>Ask AI Dost</span>
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenCart();
              }}
              className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200"
              title="Open Order Bag"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* The Animated "Goal Circle" (Rotating Orbital Circle Widget) */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="group relative cursor-pointer flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20"
        title="24/7 Live Operations Orbit (Click to View Status)"
      >
        {/* Glow Halo */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-600/30 via-orange-500/20 to-red-600/30 blur-xl group-hover:scale-125 transition-transform duration-500 animate-pulse" />

        {/* Outer Circular SVG with Spinning Orbit Rings */}
        <svg 
          className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] group-hover:animate-[spin_4s_linear_infinite]"
          viewBox="0 0 100 100"
        >
          {/* Outer Dashed Orbit Circle */}
          <circle 
            cx="50" 
            cy="50" 
            r="46" 
            fill="none" 
            stroke="url(#orbitGradient)" 
            strokeWidth="2.5" 
            strokeDasharray="6 8"
            strokeLinecap="round"
          />
          {/* Orbiting Satellite Dot on Circle */}
          <circle cx="50" cy="4" r="3.5" fill="#f59e0b" className="shadow-lg shadow-amber-500" />
          <circle cx="50" cy="96" r="2.5" fill="#ea580c" />
          
          <defs>
            <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>
        </svg>

        {/* Middle Counter-Rotating Inner Track */}
        <svg 
          className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] animate-[spin_16s_linear_infinite_reverse]"
          viewBox="0 0 80 80"
        >
          <circle 
            cx="40" 
            cy="40" 
            r="36" 
            fill="none" 
            stroke="#78350f" 
            strokeWidth="1.5" 
            strokeDasharray="3 5"
            strokeOpacity="0.8"
          />
          <circle cx="76" cy="40" r="2" fill="#fbbf24" />
        </svg>

        {/* Center Glowing Hub Sphere */}
        <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-stone-950 via-stone-900 to-amber-950/80 border border-amber-500/50 flex flex-col items-center justify-center shadow-lg shadow-stone-950 group-hover:scale-105 transition-all duration-300">
          
          {/* Inner Flame Icon with gentle breath */}
          <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 fill-amber-500/30 group-hover:scale-110 transition-transform duration-300 animate-pulse" />
          
          {/* Tiny 24/7 Live Tag */}
          <span className="text-[8px] sm:text-[9px] font-mono font-black text-amber-300 tracking-tighter -mt-0.5">
            24/7
          </span>

          {/* Live pulsing green beacon badge at edge */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-stone-950"></span>
          </span>
        </div>

      </div>

    </div>
  );
};
