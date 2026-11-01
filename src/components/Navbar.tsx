import React, { useState } from 'react';
import { BranchId, BranchInfo } from '../types';
import { 
  Flame, 
  MapPin, 
  Phone, 
  Clock, 
  ShoppingBag, 
  Bot, 
  Calendar, 
  ChefHat, 
  ShieldCheck,
  Sparkles, 
  Menu as MenuIcon, 
  X, 
  Lock, 
  Building2, 
  Info, 
  Truck,
  Layers
} from 'lucide-react';

export type WebsitePage = 'home' | 'menu' | 'reservations' | 'branches' | 'about' | 'track' | 'portal';

interface NavbarProps {
  currentBranch: BranchId;
  branches: Record<BranchId, BranchInfo>;
  onSelectBranch: (branchId: BranchId) => void;
  activePage: WebsitePage;
  onNavigate: (page: WebsitePage) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenVoiceAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentBranch,
  branches,
  onSelectBranch,
  activePage,
  onNavigate,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenVoiceAssistant
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const branch = branches[currentBranch];

  const handleNavClick = (page: WebsitePage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-stone-800">
      
      {/* Top Utility Announcement Bar */}
      <div className="border-b border-stone-800/60 bg-stone-900/60 text-xs text-stone-300 py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium text-amber-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              24/7 Operations Live
            </span>
            <span className="text-stone-600 hidden sm:inline">·</span>
            <span className="hidden sm:flex items-center gap-1 text-stone-400">
              <Clock className="w-3.5 h-3.5 text-stone-500" />
              Kitchens, Dine-in &amp; Midnight Delivery Round-the-Clock
            </span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <span className="hidden md:flex items-center gap-1 text-stone-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              10% Instant Discount on HBL, Meezan &amp; Alfalah Cards
            </span>
            <span className="text-stone-600 hidden md:inline">·</span>
            <a 
              href={`tel:${branch.phone}`} 
              className="flex items-center gap-1 text-stone-200 hover:text-amber-400 transition-colors font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{branch.phone}</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Brand & Website Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none" 
            onClick={() => handleNavClick('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-700 flex items-center justify-center shadow-lg shadow-orange-950/50 ring-1 ring-amber-400/30 flex-shrink-0">
              <Flame className="w-6 h-6 text-stone-950 fill-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-white">
                  URBAN TANDOOR <span className="text-amber-400">&amp;</span> GRILL
                </span>
              </div>
              <p className="text-[10px] text-stone-400 tracking-wider uppercase font-medium">
                Karachi 24/7 Dining · Coal Pit &amp; Delivery
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePage === 'home'
                  ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900/60'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('menu')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePage === 'menu'
                  ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900/60'
              }`}
            >
              Menu &amp; Ordering
            </button>

            <button
              onClick={() => handleNavClick('reservations')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePage === 'reservations'
                  ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900/60'
              }`}
            >
              Table Reservations
            </button>

            <button
              onClick={() => handleNavClick('branches')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePage === 'branches'
                  ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900/60'
              }`}
            >
              Our Branches
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePage === 'about'
                  ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900/60'
              }`}
            >
              About &amp; Story
            </button>

            <button
              onClick={() => handleNavClick('track')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePage === 'track'
                  ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900/60'
              }`}
            >
              Track Order
            </button>
          </nav>

          {/* Right Controls: Branch Switcher, AI, Bag & Staff Portal */}
          <div className="flex items-center gap-2">
            
            {/* Quick Branch Indicator Button */}
            <div className="hidden xl:flex items-center bg-stone-900 border border-stone-800 rounded-xl p-0.5 text-xs">
              <button
                onClick={() => onSelectBranch('UTG-KHI-001')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  currentBranch === 'UTG-KHI-001'
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
                title="PECHS Branch (18 Tables)"
              >
                PECHS (18T)
              </button>
              <button
                onClick={() => onSelectBranch('UTG-KHI-002')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  currentBranch === 'UTG-KHI-002'
                    ? 'bg-orange-500 text-stone-950 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
                title="Gulshan Branch (24 Tables)"
              >
                Gulshan (24T)
              </button>
            </div>

            {/* AI Assistant Button */}
            <button
              onClick={onOpenVoiceAssistant}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-stone-950 font-bold text-xs transition-all shadow-md shadow-orange-950/40 hover:scale-[1.02]"
              title="Talk to Urban Dost AI Assistant"
            >
              <Bot className="w-4 h-4 fill-stone-950/20" />
              <span className="hidden sm:inline">Urban Dost</span>
              <span className="text-[10px] bg-stone-950/20 px-1 py-0.2 rounded font-bold">AI</span>
            </button>

            {/* Order Bag Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700/80 text-stone-200 text-xs font-semibold transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Bag</span>
              {cartCount > 0 && (
                <span className="flex items-center justify-center bg-amber-500 text-stone-950 font-bold text-[10px] px-1.5 py-0.5 rounded-full min-w-5">
                  {cartCount}
                </span>
              )}
              {cartTotal > 0 && (
                <span className="hidden md:inline font-mono font-semibold text-amber-300 ml-0.5">
                  PKR {cartTotal.toLocaleString()}
                </span>
              )}
            </button>

            {/* Staff & Management Portal Button */}
            <button
              onClick={() => handleNavClick('portal')}
              className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                activePage === 'portal'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                  : 'bg-stone-900/60 text-stone-400 hover:text-stone-200 border-stone-800'
              }`}
              title="Restaurant Staff & Management Portal (Analytics, KDS, Stock, Complaints)"
            >
              <Lock className="w-3.5 h-3.5 text-stone-400" />
              <span className="hidden lg:inline text-[11px]">Staff Portal</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-stone-800 space-y-2 pb-2">
            
            {/* Mobile Branch Switcher */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-stone-900 border border-stone-800 mb-2">
              <span className="text-xs text-stone-400">Selected Branch:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onSelectBranch('UTG-KHI-001')}
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    currentBranch === 'UTG-KHI-001' ? 'bg-amber-500 text-stone-950' : 'text-stone-400'
                  }`}
                >
                  PECHS
                </button>
                <button
                  onClick={() => onSelectBranch('UTG-KHI-002')}
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    currentBranch === 'UTG-KHI-002' ? 'bg-orange-500 text-stone-950' : 'text-stone-400'
                  }`}
                >
                  Gulshan
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => handleNavClick('home')}
                className={`p-2.5 rounded-xl text-left text-xs font-semibold ${
                  activePage === 'home' ? 'bg-amber-500/20 text-amber-400' : 'text-stone-300 bg-stone-900/60'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('menu')}
                className={`p-2.5 rounded-xl text-left text-xs font-semibold ${
                  activePage === 'menu' ? 'bg-amber-500/20 text-amber-400' : 'text-stone-300 bg-stone-900/60'
                }`}
              >
                Menu &amp; Ordering
              </button>
              <button
                onClick={() => handleNavClick('reservations')}
                className={`p-2.5 rounded-xl text-left text-xs font-semibold ${
                  activePage === 'reservations' ? 'bg-amber-500/20 text-amber-400' : 'text-stone-300 bg-stone-900/60'
                }`}
              >
                Table Booking
              </button>
              <button
                onClick={() => handleNavClick('branches')}
                className={`p-2.5 rounded-xl text-left text-xs font-semibold ${
                  activePage === 'branches' ? 'bg-amber-500/20 text-amber-400' : 'text-stone-300 bg-stone-900/60'
                }`}
              >
                Our Branches
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className={`p-2.5 rounded-xl text-left text-xs font-semibold ${
                  activePage === 'about' ? 'bg-amber-500/20 text-amber-400' : 'text-stone-300 bg-stone-900/60'
                }`}
              >
                About &amp; Story
              </button>
              <button
                onClick={() => handleNavClick('track')}
                className={`p-2.5 rounded-xl text-left text-xs font-semibold ${
                  activePage === 'track' ? 'bg-amber-500/20 text-amber-400' : 'text-stone-300 bg-stone-900/60'
                }`}
              >
                Track Order
              </button>
            </div>

            <button
              onClick={() => handleNavClick('portal')}
              className="w-full mt-2 p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Staff &amp; Operations Portal (Dashboard, KDS, Stock)</span>
            </button>

          </div>
        )}

      </div>
    </header>
  );
};
