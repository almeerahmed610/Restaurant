import React from 'react';
import { BranchId, BranchInfo, MenuItem, CartItem } from '../types';
import { 
  Flame, 
  MapPin, 
  Clock, 
  Calendar, 
  ShoppingBag, 
  Bot, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  Truck, 
  Award, 
  ArrowRight,
  PhoneCall,
  UtensilsCrossed,
  Users
} from 'lucide-react';

interface WebsiteHomeProps {
  currentBranch: BranchId;
  branches: Record<BranchId, BranchInfo>;
  menuItems: MenuItem[];
  onSelectBranch: (branchId: BranchId) => void;
  onNavigate: (page: 'home' | 'menu' | 'reservations' | 'branches' | 'about' | 'track' | 'portal') => void;
  onAddToCart: (item: CartItem) => void;
  onOpenVoiceAssistant: () => void;
}

export const WebsiteHome: React.FC<WebsiteHomeProps> = ({
  currentBranch,
  branches,
  menuItems,
  onSelectBranch,
  onNavigate,
  onAddToCart,
  onOpenVoiceAssistant
}) => {
  const branch = branches[currentBranch];

  // Signature featured items from the catalog
  const featuredIds = ['MENU001', 'MENU003', 'MENU004', 'MENU005', 'MENU009', 'MENU032'];
  const featuredItems = menuItems.filter(item => featuredIds.includes(item.id));

  // Customer Reviews
  const reviews = [
    {
      id: 'rev-1',
      name: 'Syed Hamza Ali',
      role: 'PECHS Food Connoisseur',
      rating: 5,
      date: 'Yesterday, 2:40 AM',
      branch: 'PECHS Branch (Shahrah-e-Faisal)',
      comment: 'Best Koyla Karahi in Karachi at 2 AM! The chicken was extremely tender and the Roghani naan came steaming hot straight out of the clay tandoor. Their 24/7 delivery to Clifton was under 30 minutes.'
    },
    {
      id: 'rev-2',
      name: 'Dr. Fatima Tariq',
      role: 'Family Diner',
      rating: 5,
      date: '3 days ago',
      branch: 'Gulshan-e-Iqbal Mega Branch',
      comment: 'Reserved a 10-person banquet pod for our family anniversary. The seating was spacious, staff was remarkably attentive, and the 10% Meezan bank card discount was applied smoothly at checkout.'
    },
    {
      id: 'rev-3',
      name: 'Bilal Khan & Group',
      role: 'NED University Alumni',
      rating: 5,
      date: 'This week',
      branch: 'Gulshan-e-Iqbal Mega Branch',
      comment: 'The Mutton Chops Sizzler and Beef Bihari Kababs have authentic melt-in-the-mouth smoke texture. We also tested their AI voice assistant Urban Dost to order from our car, and it worked flawlessly!'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-stone-900 via-stone-900/90 to-stone-950 border border-stone-800 shadow-2xl">
        {/* Background glow & subtle overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.15),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(234,88,12,0.1),transparent_50%)] pointer-events-none" />
        
        <div className="relative max-w-6xl mx-auto px-6 py-14 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Karachi's 24/7 Culinary Landmark</span>
                <span className="text-stone-600">·</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Kitchens Live Now
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Where Coal Tandoor Meets Karachi's <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">Midnight Soul</span>.
              </h1>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Authentic charcoal-smoked Koyla Karahi, tender Bihari kababs, pure desi ghee handis, and late-night comfort delicacies. Handcrafted round-the-clock across our two signature locations in PECHS and Gulshan-e-Iqbal.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('menu')}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-stone-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <ShoppingBag className="w-4 h-4 fill-stone-950" />
                  <span>Order Online Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('reservations')}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-white font-semibold text-sm transition-all"
                >
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Book a Table ({branch.code})</span>
                </button>

                <button
                  onClick={onOpenVoiceAssistant}
                  className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-medium text-sm transition-all"
                >
                  <Bot className="w-4 h-4 text-amber-400" />
                  <span>Urban Dost AI</span>
                </button>
              </div>

              {/* Trust & Guarantee Markers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-stone-800/80 text-xs text-stone-300">
                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>24/7 All Hours</span>
                  </div>
                  <p className="text-[11px] text-stone-400">Breakfast, lunch, midnight</p>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>2 Flagship Hubs</span>
                  </div>
                  <p className="text-[11px] text-stone-400">PECHS &amp; Gulshan-e-Iqbal</p>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>10% Bank Discount</span>
                  </div>
                  <p className="text-[11px] text-stone-400">HBL, Meezan, Alfalah cards</p>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-amber-400" />
                    <span>35-Min Delivery</span>
                  </div>
                  <p className="text-[11px] text-stone-400">Insulated hot bags</p>
                </div>
              </div>
            </div>

            {/* Right Visual Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden border border-stone-700/80 shadow-2xl bg-stone-900 group">
                <img 
                  src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1000&q=80" 
                  alt="Desi Chicken Karahi Sizzling at Urban Tandoor" 
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Visual Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                {/* Floating Card: Active Special */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-stone-900/90 backdrop-blur-md border border-stone-700/80 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-white text-sm">Desi Chicken Karahi</span>
                    <span className="font-mono font-bold text-amber-400 text-sm">PKR 1,450</span>
                  </div>
                  <p className="text-stone-300 text-[11px] line-clamp-1">
                    Wok-tossed in ripe tomatoes, green chillies &amp; freshly cracked black pepper.
                  </p>
                  <div className="flex items-center justify-between pt-1 border-t border-stone-800 text-[10px] text-stone-400">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" /> Live Coal Pit Recipe
                    </span>
                    <button 
                      onClick={() => onNavigate('menu')}
                      className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2"
                    >
                      View on Menu &rarr;
                    </button>
                  </div>
                </div>

                {/* Top Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md border border-stone-700 text-stone-200 text-[11px] font-medium flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Voted Karachi's Best Karahi 2026</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Branch Switcher Bar */}
      <section className="bg-stone-900/60 border border-stone-800 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-bold">Current Operational Branch</span>
              <span className="text-stone-600">·</span>
              <span className="text-xs text-stone-400">Click to switch viewing branch</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-500" />
              <span>{branch.name}</span>
              <span className="text-xs font-normal text-stone-400 font-mono">({branch.area})</span>
            </h2>
            <p className="text-xs text-stone-300">{branch.address}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <button
              onClick={() => onSelectBranch('UTG-KHI-001')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                currentBranch === 'UTG-KHI-001'
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                  : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700/80 border border-stone-700'
              }`}
            >
              <span>PECHS Flagship</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-950/20 font-mono">18 Tables</span>
            </button>

            <button
              onClick={() => onSelectBranch('UTG-KHI-002')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                currentBranch === 'UTG-KHI-002'
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                  : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700/80 border border-stone-700'
              }`}
            >
              <span>Gulshan Mega Branch</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-950/20 font-mono">24 Tables</span>
            </button>

            <button
              onClick={() => onNavigate('branches')}
              className="px-3 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 transition-all flex items-center gap-1"
            >
              <span>Branch Guide</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Signature Specialties (Chef's Recommendations) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Culinary Highlights</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Signature Specialties &amp; Karachi Legends
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Freshly prepped over genuine charcoal pits and clay ovens. Real-time ingredient inventory tracked at {branch.code}.
            </p>
          </div>

          <button
            onClick={() => onNavigate('menu')}
            className="self-start sm:self-auto flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4"
          >
            <span>Explore Full 40-Dish Menu</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map(item => (
            <div 
              key={item.id}
              className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-lg hover:border-stone-700 transition-all group flex flex-col"
            >
              {/* Image & Price Tag */}
              <div className="relative h-48 overflow-hidden bg-stone-950">
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                
                {/* Price Tag */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-stone-950/90 backdrop-blur-md border border-stone-700 font-mono font-bold text-amber-400 text-xs">
                  PKR {item.price.toLocaleString()}
                </div>

                {/* Category kicker */}
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-stone-900/80 backdrop-blur-md text-[10px] text-stone-300 font-medium">
                  {item.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-[11px] text-amber-300/80 font-serif">
                    {item.urduName}
                  </p>
                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-800 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-stone-400 font-mono">
                    Prep: ~{item.prepTimeMinutes} mins
                  </span>

                  <button
                    onClick={() => onAddToCart({
                      menuItem: item,
                      quantity: 1,
                      calculatedPrice: item.price
                    })}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-sm transition-all"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dual Branch Showcase Section */}
      <section className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>Locations &amp; Dining Spaces</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Our Two Flagship Hubs in Karachi
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-2xl">
            Experience our 42 dining tables across Karachi or order doorstep delivery within our extensive dispatch zones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Branch 1: PECHS */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-7 space-y-5 relative overflow-hidden">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-amber-400 uppercase font-bold tracking-wider">Branch 01 · Central Hub</span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">PECHS Flagship</h3>
                <p className="text-xs text-stone-400 mt-0.5">Main Shahrah-e-Faisal, Block 2, PECHS</p>
              </div>
              <div className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold">
                18 Tables · 72 Seats
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Ideally positioned on the Shahrah-e-Faisal business artery. Features an authentic open-pit charcoal BBQ tandoor, cozy family courtyard, and an ultra-fast takeaway &amp; delivery counter catering to Clifton, Defence, and central Karachi.
            </p>

            <div className="space-y-2 text-xs">
              <span className="text-stone-400 font-medium block">Key Amenities:</span>
              <div className="grid grid-cols-2 gap-2 text-stone-300 text-[11px]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  Live Charcoal Grill Pit
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  Family Courtyard
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  24/7 Takeaway Counter
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  Valet Parking Service
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono text-stone-400 flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                +92 21 3455 8901
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onSelectBranch('UTG-KHI-001');
                    onNavigate('reservations');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-all"
                >
                  Book PECHS Table
                </button>
              </div>
            </div>
          </div>

          {/* Branch 2: Gulshan */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-7 space-y-5 relative overflow-hidden">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-orange-400 uppercase font-bold tracking-wider">Branch 02 · Mega Hub</span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">Gulshan-e-Iqbal Mega</h3>
                <p className="text-xs text-stone-400 mt-0.5">Main University Road, Block 6, Gulshan</p>
              </div>
              <div className="px-3 py-1 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-bold">
                24 Tables · 112 Seats
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Karachi's grand multi-level family dining destination. Features extensive banquet pods, children's play area, and high-capacity kitchens serving Gulshan, Johar, FB Area, and the University corridor around the clock.
            </p>

            <div className="space-y-2 text-xs">
              <span className="text-stone-400 font-medium block">Key Amenities:</span>
              <div className="grid grid-cols-2 gap-2 text-stone-300 text-[11px]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-orange-400 flex-shrink-0" />
                  Grand Banquet Dining Pods
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-orange-400 flex-shrink-0" />
                  Children Play Zone
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-orange-400 flex-shrink-0" />
                  Drive-thru &amp; Fast OTC
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-orange-400 flex-shrink-0" />
                  High-Capacity Event Hall
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono text-stone-400 flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
                +92 21 3498 7720
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onSelectBranch('UTG-KHI-002');
                    onNavigate('reservations');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-stone-950 font-bold text-xs transition-all"
                >
                  Book Gulshan Table
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10% Bank Card Discount Promotion Banner */}
      <section className="rounded-3xl bg-gradient-to-r from-amber-950/60 via-stone-900 to-stone-900 border border-amber-500/30 p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Exclusive Dining Privilege</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Flat 10% Instant Discount on Premium Bank Cards
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm max-w-xl">
              Pay using any eligible credit or debit card from our official banking partners and get an automatic 10% reduction on your entire bill (Dine-in, Takeaway &amp; Online Delivery).
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {['Habib Bank Limited (HBL)', 'Meezan Bank', 'Bank Alfalah', 'Standard Chartered (SCB)', 'MCB Bank'].map(bank => (
                <span key={bank} className="px-2.5 py-1 rounded-lg bg-stone-950/70 border border-stone-800 text-[11px] font-mono text-stone-300">
                  {bank}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('menu')}
            className="flex-shrink-0 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
          >
            Order with 10% Off
          </button>
        </div>
      </section>

      {/* Real Karachi Diners Reviews */}
      <section className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-1">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>Guest Experiences</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Loved by Karachi Diners Round-the-Clock
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-1">
            Read what guests from PECHS, Clifton, Gulshan, and DHA say about our smoke-infused dishes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map(review => (
            <div key={review.id} className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-500 font-mono">{review.date}</span>
                </div>
                <p className="text-xs text-stone-300 italic leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-800 text-xs">
                <p className="font-bold text-white">{review.name}</p>
                <p className="text-[11px] text-amber-400/90">{review.role}</p>
                <p className="text-[10px] text-stone-500 font-mono mt-0.5">{review.branch}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Urban Dost AI Assistant Banner */}
      <section className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-stone-950 flex-shrink-0 shadow-lg">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-lg">Meet "Urban Dost"</h3>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-mono font-bold">
                Voice &amp; Chat AI
              </span>
            </div>
            <p className="text-xs text-stone-400 max-w-lg mt-0.5">
              Karachi's bilingual dining AI assistant. Speak in Urdu or English to check live Karahi portion availability, book tables, or inquire about spicy BBQ recipes.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenVoiceAssistant}
          className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Launch Urban Dost</span>
        </button>
      </section>

      {/* Quick FAQ Section */}
      <section className="space-y-4 pt-4 border-t border-stone-800/80">
        <h3 className="font-serif text-xl font-bold text-white">Frequently Asked Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-stone-900/60 border border-stone-800/80 p-4 rounded-xl space-y-1.5">
            <h4 className="font-bold text-amber-300">Are both branches open 24/7?</h4>
            <p className="text-stone-400 leading-relaxed">
              Yes, both our PECHS Flagship and Gulshan Mega Branch operate 24 hours a day, 7 days a week, serving breakfast, lunch, dinner, and late-night Sehri/midnight barbecue.
            </p>
          </div>

          <div className="bg-stone-900/60 border border-stone-800/80 p-4 rounded-xl space-y-1.5">
            <h4 className="font-bold text-amber-300">How do I get the 10% Bank Card discount?</h4>
            <p className="text-stone-400 leading-relaxed">
              Simply choose "Card Payment (10% Bank Discount)" during online checkout or swipe your HBL, Meezan, Alfalah, SCB, or MCB card with our dispatch rider or counter steward.
            </p>
          </div>

          <div className="bg-stone-900/60 border border-stone-800/80 p-4 rounded-xl space-y-1.5">
            <h4 className="font-bold text-amber-300">Can I schedule an advance pre-order?</h4>
            <p className="text-stone-400 leading-relaxed">
              Yes, in our Online Order Bag, you can select "Schedule for Later" and pick your desired date and time. Our kitchen holds and prepares your food fresh to arrive on the dot.
            </p>
          </div>

          <div className="bg-stone-900/60 border border-stone-800/80 p-4 rounded-xl space-y-1.5">
            <h4 className="font-bold text-amber-300">Can I book large family banquet halls?</h4>
            <p className="text-stone-400 leading-relaxed">
              Yes, our Gulshan Mega branch has 6 dedicated group banquet tables (accommodating 9 to 10 guests each) that can be reserved online in real-time.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
