import React, { useState, useMemo } from 'react';
import { MenuItem, MenuCategory, BranchId, CartItem } from '../types';
import { 
  Flame, 
  Search, 
  Sparkles, 
  Leaf, 
  Clock, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  Tag, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { MenuItemAvailability, IngredientStockSummary, calculateItemAvailability, findAvailableAlternatives } from '../utils/inventoryEngine';
import { ItemDetailModal } from './ItemDetailModal';

interface MenuSectionProps {
  menuItems: MenuItem[];
  currentBranch: BranchId;
  stockSummary: Map<string, IngredientStockSummary>;
  onAddToCart: (cartItem: CartItem) => void;
  onOpenVoiceAssistant: () => void;
  onOpenReservations: () => void;
}

const CATEGORIES: { id: MenuCategory | 'All'; label: string }[] = [
  { id: 'All', label: 'Full Menu' },
  { id: 'Pakistani cuisine', label: 'Pakistani Karahi & Biryani' },
  { id: 'BBQ & grills', label: 'Charcoal BBQ & Grills' },
  { id: 'Burgers & fast food', label: 'Fast Food & Burgers' },
  { id: 'Pizza & pasta', label: 'Stone Pizza & Pasta' },
  { id: 'Chinese & continental', label: 'Chinese & Steaks' },
  { id: 'Breakfast', label: 'Breakfast (24/7)' },
  { id: 'Desserts & drinks', label: 'Desserts, Lassi & Chai' },
  { id: 'Deals & Combos', label: 'Special Deals' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  menuItems,
  currentBranch,
  stockSummary,
  onAddToCart,
  onOpenVoiceAssistant,
  onOpenReservations
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpicy, setFilterSpicy] = useState(false);
  const [filterVeg, setFilterVeg] = useState(false);
  const [filterInStockOnly, setFilterInStockOnly] = useState(false);

  // Modal item state
  const [activeModalItem, setActiveModalItem] = useState<{
    item: MenuItem;
    availability: MenuItemAvailability;
  } | null>(null);

  // Alternative recommendations state
  const [alternativeTarget, setAlternativeTarget] = useState<MenuItem | null>(null);

  // Pre-calculate availability for items at current branch
  const itemAvailabilityMap = useMemo(() => {
    const map = new Map<string, MenuItemAvailability>();
    menuItems.forEach(item => {
      map.set(item.id, calculateItemAvailability(item, currentBranch, stockSummary));
    });
    return map;
  }, [menuItems, currentBranch, stockSummary]);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesUrdu = item.urduName.includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesUrdu && !matchesDesc && !matchesTags) {
          return false;
        }
      }
      // Dietary filters
      if (filterSpicy && !item.isSpicy) return false;
      if (filterVeg && !item.isVeg) return false;
      // In stock filter
      if (filterInStockOnly) {
        const avail = itemAvailabilityMap.get(item.id);
        if (!avail || !avail.isOrderable || avail.maxPortions <= 0) return false;
      }
      return true;
    });
  }, [menuItems, selectedCategory, searchQuery, filterSpicy, filterVeg, filterInStockOnly, itemAvailabilityMap]);

  // Alternatives list when an item is chosen
  const alternatives = useMemo(() => {
    if (!alternativeTarget) return [];
    return findAvailableAlternatives(menuItems, alternativeTarget, currentBranch, stockSummary);
  }, [alternativeTarget, menuItems, currentBranch, stockSummary]);

  const handleQuickAdd = (item: MenuItem, avail: MenuItemAvailability) => {
    if (!avail.isOrderable || avail.maxPortions <= 0) {
      setAlternativeTarget(item);
      return;
    }
    // If has variants, open modal instead of quick adding
    if (item.variants && item.variants.length > 0) {
      setActiveModalItem({ item, availability: avail });
      return;
    }

    onAddToCart({
      menuItem: item,
      quantity: 1,
      calculatedPrice: item.price
    });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Banner with Karachi Culinary Flair */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950/40 border border-stone-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-amber-400 font-medium">
            <span className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
              <Sparkles className="w-3.5 h-3.5" />
              Karachi Taste · Open 24 Hours, 7 Days
            </span>
            <span className="text-stone-500">·</span>
            <span className="text-stone-300">
              Serving PECHS &amp; Gulshan-e-Iqbal
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight leading-[1.15]">
            Great Food, Every Hour, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">Every Day.</span>
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            From sizzling midnight Charcoal BBQ platters and authentic Shinwari Karahis to sunrise Halwa Puri, smash burgers, and stone-baked pizzas. Dine in, takeaway, home delivery, or pre-order in advance.
          </p>

          {/* Quick Value Callouts */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2 bg-stone-950/60 border border-stone-800 px-3 py-2 rounded-xl text-stone-300">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span><strong>10% Bank Discount</strong> on HBL, Meezan, Alfalah &amp; MCB</span>
            </div>
            
            <button
              onClick={onOpenVoiceAssistant}
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4"
            >
              <Zap className="w-3.5 h-3.5" />
              Try Voice Ordering with Urban Dost AI
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* Alternative Recommendations Banner (if user clicked out-of-stock alternative) */}
      {alternativeTarget && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-semibold text-white">
                Inventory Recommendation: Alternatives for <span className="text-amber-400">{alternativeTarget.name}</span>
              </h3>
            </div>
            <button
              onClick={() => setAlternativeTarget(null)}
              className="text-xs text-stone-400 hover:text-white"
            >
              Dismiss
            </button>
          </div>
          <p className="text-xs text-stone-300">
            Due to real-time ingredient limitations at this branch, our AI assistant has selected these freshly available chef alternatives in the same category:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
            {alternatives.slice(0, 3).map(alt => {
              const avail = itemAvailabilityMap.get(alt.id);
              return (
                <div 
                  key={alt.id}
                  className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{alt.name}</p>
                    <p className="text-[11px] text-amber-400 font-mono">PKR {alt.price.toLocaleString()}</p>
                    <p className="text-[10px] text-emerald-400">✓ {avail?.maxPortions || 'Ready'} portions ready</p>
                  </div>
                  <button
                    onClick={() => {
                      if (avail) handleQuickAdd(alt, avail);
                      setAlternativeTarget(null);
                    }}
                    className="p-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
                  >
                    Add
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Search & Category Filter Navigation */}
      <div className="space-y-4">
        {/* Search & Filter Toggles */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search Karahi, Tikka, Shawarma, Biryani, Naan..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 placeholder:text-stone-500 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Quick Dietary & Stock Toggles */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setFilterSpicy(!filterSpicy)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                filterSpicy
                  ? 'bg-red-950/40 border-red-500/50 text-red-400'
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Spicy BBQ</span>
            </button>

            <button
              onClick={() => setFilterVeg(!filterVeg)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                filterVeg
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400'
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>Vegetarian</span>
            </button>

            <button
              onClick={() => setFilterInStockOnly(!filterInStockOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                filterInStockOnly
                  ? 'bg-amber-950/40 border-amber-500/50 text-amber-400'
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Available ATP Stock</span>
            </button>
          </div>
        </div>

        {/* Category Segmented Scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-950/20'
                  : 'bg-stone-900 hover:bg-stone-800/80 text-stone-300 border border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Menu Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredItems.map(item => {
          const avail = itemAvailabilityMap.get(item.id) || {
            menuItem: item,
            maxPortions: 0,
            isOrderable: false
          };
          const isOutOfStock = !avail.isOrderable || avail.maxPortions <= 0;
          const isLowStock = avail.isOrderable && avail.maxPortions <= 5;

          return (
            <div
              key={item.id}
              className={`group flex flex-col rounded-2xl bg-stone-900/90 border transition-all duration-200 overflow-hidden ${
                isOutOfStock 
                  ? 'border-stone-800/60 opacity-80' 
                  : 'border-stone-800 hover:border-stone-700 hover:shadow-xl hover:shadow-stone-950/50'
              }`}
            >
              {/* Card Image */}
              <div 
                className="relative h-44 w-full overflow-hidden bg-stone-950 cursor-pointer"
                onClick={() => setActiveModalItem({ item, availability: avail })}
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />
                
                {/* Clean Item Code and Category */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] text-stone-300 bg-stone-950/80 backdrop-blur-sm px-2 py-1 rounded-md border border-stone-800">
                  <span className="font-mono text-amber-400 font-semibold">{item.code}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.category.split(' ')[0]}</span>
                </div>

                {/* Tags */}
                {item.tags.length > 0 && (
                  <div className="absolute top-3 right-3 text-[10px] font-semibold text-amber-300 bg-amber-950/80 backdrop-blur-sm border border-amber-500/30 px-2 py-0.5 rounded-md">
                    {item.tags[0]}
                  </div>
                )}

                {/* Urdu title overlay at bottom */}
                <div className="absolute bottom-2.5 right-3 text-right">
                  <span className="text-xs text-stone-300 font-sans tracking-wide" dir="rtl">
                    {item.urduName}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 
                      onClick={() => setActiveModalItem({ item, availability: avail })}
                      className="font-serif font-bold text-base text-white hover:text-amber-400 cursor-pointer transition-colors leading-snug"
                    >
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Metadata & Live ATP Stock Counter */}
                <div className="space-y-2 pt-1 border-t border-stone-800/80">
                  <div className="flex items-center justify-between text-[11px] text-stone-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-stone-500" />
                      {item.prepTimeMinutes}m
                    </span>
                    
                    {item.isSpicy && (
                      <span className="flex items-center gap-0.5 text-red-400">
                        <Flame className="w-3 h-3 fill-red-400" />
                        {item.spiceLevel === 3 ? 'Fiery' : item.spiceLevel === 2 ? 'Medium' : 'Mild'}
                      </span>
                    )}

                    {item.isVeg && (
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Leaf className="w-3 h-3" />
                        Veg
                      </span>
                    )}
                  </div>

                  {/* ATP Portions Tracker */}
                  <div className="text-[11px] flex items-center justify-between">
                    {isOutOfStock ? (
                      <span className="text-rose-400 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Stock Exhausted
                      </span>
                    ) : isLowStock ? (
                      <span className="text-amber-400 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                        Low Stock: {avail.maxPortions} left
                      </span>
                    ) : (
                      <span className="text-emerald-400 flex items-center gap-1 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        {avail.maxPortions} portions ready
                      </span>
                    )}

                    {item.hasVerifiedRecipe ? (
                      <span className="text-[10px] text-stone-500 font-mono" title="Recipe-linked ATP Inventory">
                        Recipe Verified
                      </span>
                    ) : (
                      <span className="text-[10px] text-stone-500 font-mono" title="Catalog item (MENU033+)">
                        Catalog Std
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Price & Action */}
                <div className="pt-2 flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-mono font-bold text-sm sm:text-base text-amber-300">
                        PKR {item.price.toLocaleString()}
                      </span>
                      {item.originalPrice && (
                        <span className="font-mono text-xs text-stone-500 line-through">
                          PKR {item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {item.variants && item.variants.length > 0 && (
                      <span className="text-[10px] text-stone-400">Multiple sizes</span>
                    )}
                  </div>

                  {isOutOfStock ? (
                    <button
                      type="button"
                      onClick={() => setAlternativeTarget(item)}
                      className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold transition-colors"
                    >
                      Alternatives
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleQuickAdd(item, avail)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-all shadow-sm active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      <span>{item.variants && item.variants.length > 0 ? 'Options' : 'Add'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-stone-900/40 border border-stone-800 rounded-2xl p-8 space-y-3">
          <Info className="w-8 h-8 text-amber-400 mx-auto" />
          <h3 className="text-base font-bold text-white">No dishes found</h3>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            Try adjusting your search keywords, clearing dietary filters, or switching branch inventory.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setFilterSpicy(false);
              setFilterVeg(false);
              setFilterInStockOnly(false);
            }}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs text-stone-200 font-medium"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Item Detail / Customization Modal */}
      {activeModalItem && (
        <ItemDetailModal
          item={activeModalItem.item}
          availability={activeModalItem.availability}
          branchId={currentBranch}
          onClose={() => setActiveModalItem(null)}
          onAddToCart={onAddToCart}
          onSuggestAlternatives={item => setAlternativeTarget(item)}
        />
      )}
    </div>
  );
};
