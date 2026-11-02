import React, { useState } from 'react';
import { MenuItem, MenuVariant, MenuAddon, CartItem, BranchId } from '../types';
import { X, Flame, Plus, Minus, Check, Clock, AlertTriangle, ShieldAlert } from 'lucide-react';
import { MenuItemAvailability } from '../utils/inventoryEngine';

interface ItemDetailModalProps {
  item: MenuItem;
  availability: MenuItemAvailability;
  branchId: BranchId;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
  onSuggestAlternatives: (item: MenuItem) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  availability,
  branchId,
  onClose,
  onAddToCart,
  onSuggestAlternatives
}) => {
  const [selectedVariant, setSelectedVariant] = useState<MenuVariant | undefined>(
    item.variants && item.variants.length > 0 ? item.variants[0] : undefined
  );
  const [selectedAddons, setSelectedAddons] = useState<MenuAddon[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const basePrice = item.price;
  const variantDelta = selectedVariant ? selectedVariant.priceDelta : 0;
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const singleUnitPrice = basePrice + variantDelta + addonsTotal;
  const calculatedPrice = singleUnitPrice * quantity;

  const toggleAddon = (addon: MenuAddon) => {
    if (selectedAddons.some(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleAdd = () => {
    if (!availability.isOrderable || availability.maxPortions <= 0) return;
    onAddToCart({
      menuItem: item,
      quantity,
      selectedVariant,
      selectedAddons,
      specialInstructions: specialInstructions.trim() || undefined,
      calculatedPrice
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-stone-950 flex-shrink-0">
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/30 to-transparent" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-950/70 hover:bg-stone-950 text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-1">
              <span>{item.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                {item.prepTimeMinutes} mins prep
              </span>
              {item.isSpicy && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-0.5 text-red-400">
                    <Flame className="w-3.5 h-3.5 fill-red-400" />
                    Spice Level {item.spiceLevel}/3
                  </span>
                </>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
              {item.name}
            </h2>
            <p className="text-sm text-stone-400 font-sans mt-0.5" dir="rtl">
              {item.urduName}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6 flex-1">
          {/* Description */}
          <p className="text-sm text-stone-300 leading-relaxed">
            {item.description}
          </p>

          {/* Inventory & ATP Status Banner */}
          <div className={`p-3.5 rounded-xl border text-xs flex items-start justify-between gap-3 ${
            availability.isOrderable && availability.maxPortions > 5
              ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-300'
              : availability.isOrderable && availability.maxPortions > 0
              ? 'bg-amber-950/20 border-amber-900/40 text-amber-300'
              : 'bg-rose-950/30 border-rose-900/50 text-rose-300'
          }`}>
            <div className="space-y-0.5">
              <div className="font-semibold flex items-center gap-1.5">
                {availability.isOrderable && availability.maxPortions > 0 ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Available to Promise ({branchId === 'UTG-KHI-001' ? 'PECHS' : 'Gulshan'} Kitchen)
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    Branch Inventory Exhausted
                  </>
                )}
              </div>
              <p className="text-[11px] opacity-80">
                {availability.isOrderable 
                  ? `Live verified stock: ${availability.maxPortions} portions can be prepared immediately from fresh ingredients.`
                  : availability.reason || 'This dish is currently unavailable due to stock depletion in this branch.'}
              </p>
            </div>

            {!availability.isOrderable && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSuggestAlternatives(item);
                }}
                className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[11px] whitespace-nowrap transition-colors"
              >
                View Alternatives
              </button>
            )}
          </div>

          {/* Variants Selection (if present) */}
          {item.variants && item.variants.length > 0 && (
            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                Select Portion Size / Variant
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.variants.map(variant => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedVariant(variant)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs text-left transition-all ${
                      selectedVariant?.id === variant.id
                        ? 'border-amber-500 bg-amber-500/10 text-white font-medium'
                        : 'border-stone-800 bg-stone-950/40 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <span>{variant.name}</span>
                    <span className="font-mono text-amber-400 font-semibold">
                      PKR {(basePrice + variant.priceDelta).toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons Selection (if present) */}
          {item.addons && item.addons.length > 0 && (
            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                Optional Tandoor Add-ons
              </label>
              <div className="space-y-1.5">
                {item.addons.map(addon => {
                  const isChecked = selectedAddons.some(a => a.id === addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs transition-all ${
                        isChecked
                          ? 'border-amber-500/50 bg-amber-500/5 text-stone-200'
                          : 'border-stone-800 bg-stone-950/40 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isChecked ? 'bg-amber-500 border-amber-500 text-stone-950' : 'border-stone-700'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>{addon.name}</span>
                      </div>
                      <span className="font-mono text-amber-400 font-medium">
                        +PKR {addon.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Cooking Instructions */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
              Special Kitchen Instructions
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={e => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Mild spice, extra crispy, no green chillies"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs placeholder:text-stone-600 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Allergen & Demo Safety Note */}
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-950/60 border border-stone-800/80 text-[11px] text-stone-400">
            <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>
              Allergens: {item.allergens.length > 0 ? item.allergens.join(', ') : 'None specified'}. 
              Dietary hints are demo indicators; please notify staff for specific allergies.
            </span>
          </div>
        </div>

        {/* Modal Footer with Quantity and Add Button */}
        <div className="p-4 sm:p-5 border-t border-stone-800 bg-stone-950/60 flex items-center justify-between gap-4">
          <div className="flex items-center border border-stone-800 rounded-xl bg-stone-900 p-1">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white disabled:opacity-30 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-xs font-semibold text-white font-mono">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(Math.min(availability.maxPortions || 10, quantity + 1))}
              disabled={!availability.isOrderable || quantity >= availability.maxPortions}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white disabled:opacity-30 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!availability.isOrderable || availability.maxPortions <= 0}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:from-stone-800 disabled:to-stone-800 disabled:text-stone-600 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md"
          >
            <span>{availability.isOrderable ? 'Add to Order' : 'Item Unavailable'}</span>
            <span className="font-mono font-black">
              · PKR {calculatedPrice.toLocaleString()}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
