import React from 'react';
import { 
  Flame, 
  CreditCard, 
  Bike, 
  Calendar, 
  ShieldCheck, 
  Bot, 
  Coffee,
  Zap
} from 'lucide-react';
import { BranchId } from '../types';

interface LiveTickerBarProps {
  currentBranch: BranchId;
  onOpenVoiceAssistant?: () => void;
  onOpenDeals?: () => void;
}

export const LiveTickerBar: React.FC<LiveTickerBarProps> = ({
  currentBranch,
  onOpenVoiceAssistant,
  onOpenDeals
}) => {
  const tickerItems = [
    {
      icon: <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />,
      highlight: "24/7 LIVE CHARCOAL GRILL & TANDOOR:",
      text: "Shinwari Mutton Karahi, Charcoal Chicken Tikka, Malai Boti, Beef Seekh Kababs & Hot Roghani Naan"
    },
    {
      icon: <CreditCard className="w-3.5 h-3.5 text-emerald-400" />,
      highlight: "10% INSTANT BANK DISCOUNT:",
      text: "Save up to PKR 500 on eligible HBL, Meezan Bank, Bank Alfalah, Standard Chartered & MCB cards"
    },
    {
      icon: <Bike className="w-3.5 h-3.5 text-orange-400" />,
      highlight: "DIRECT HOME DELIVERY ACROSS KARACHI:",
      text: "Express dispatch to PECHS, Tariq Road, Gulshan-e-Iqbal, Clifton, DHA, Johar & FB Area (30-40 mins)"
    },
    {
      icon: <Coffee className="w-3.5 h-3.5 text-amber-300" />,
      highlight: "ROUND-THE-CLOCK BREAKFAST:",
      text: "Karachi's Favorite Halwa Puri Thali (2 Puris, Chana, Aloo Bhujia, Suji Halwa) & Lacha Anda Paratha Rolls"
    },
    {
      icon: <Calendar className="w-3.5 h-3.5 text-cyan-400" />,
      highlight: "TABLE RESERVATIONS OPEN:",
      text: "42 Total Tables & 184 Seats across PECHS (72 seats) & Gulshan (112 seats) · Instant Confirmation"
    },
    {
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />,
      highlight: "LIVE INVENTORY ENGINE:",
      text: "Available-to-Promise (ATP) real-time recipe and stock tracking active at both kitchen depots"
    },
    {
      icon: <Bot className="w-3.5 h-3.5 text-amber-400" />,
      highlight: "URBAN DOST AI ASSISTANT ONLINE:",
      text: "Tap the microphone to order, inquire recipes, reserve dining tables, or track orders naturally"
    },
    {
      icon: <Zap className="w-3.5 h-3.5 text-yellow-400" />,
      highlight: "SCHEDULED PRE-ORDERS:",
      text: "Book future pickup or home delivery with guaranteed automatic kitchen inventory reservation"
    }
  ];

  return (
    <div className="relative w-full bg-stone-950 border-b border-amber-500/30 overflow-hidden select-none z-50 text-[11px] h-8 flex items-center shadow-md shadow-stone-950">
      
      {/* Left Fixed Live Beacon Badge with Rotating Goal Circle */}
      <div className="relative z-20 flex items-center gap-2 px-3 sm:px-4 h-full bg-gradient-to-r from-stone-950 via-stone-950 to-stone-950/95 border-r border-stone-800 text-stone-200 flex-shrink-0">
        {/* Animated Rotating Goal Circle Ring */}
        <div className="relative w-4 h-4 flex items-center justify-center">
          <svg className="w-full h-full animate-[spin_5s_linear_infinite]" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="5 4" strokeLinecap="round" />
            <circle cx="12" cy="2" r="2" fill="#34d399" />
          </svg>
          <span className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
        </div>
        <span className="font-bold tracking-wider uppercase text-[10px] text-emerald-400 font-mono flex items-center gap-1">
          ONLINE <span className="text-stone-500 font-normal hidden md:inline">· 24/7 LIVE</span>
        </span>
      </div>

      {/* Full-Width Infinite Running Marquee Line */}
      <div className="relative flex-1 overflow-hidden h-full flex items-center">
        {/* Left and right fade gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-stone-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-stone-950 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap py-1">
          {/* Double array for seamless infinite marquee loop */}
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-stone-300">
              <span className="p-1 rounded bg-stone-900 border border-stone-800/80 flex items-center justify-center">
                {item.icon}
              </span>
              <strong className="text-amber-400 font-bold tracking-tight">
                {item.highlight}
              </strong>
              <span className="text-stone-300">
                {item.text}
              </span>
              <span className="text-stone-600 font-black ml-4" aria-hidden="true">
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
