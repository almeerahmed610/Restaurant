import React, { useState } from 'react';
import { BranchId, BranchInfo, BranchStock, Recipe, MenuItem } from '../types';
import { 
  Boxes, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Plus, 
  BookOpen, 
  RefreshCw, 
  ShieldCheck,
  Search,
  Scale,
  Sparkles
} from 'lucide-react';
import { INGREDIENTS, RECIPES } from '../data/restaurantData';
import { IngredientStockSummary, calculateItemAvailability } from '../utils/inventoryEngine';

interface InventoryDashboardProps {
  currentBranch: BranchId;
  branches: Record<BranchId, BranchInfo>;
  stockRecords: BranchStock[];
  stockSummary: Map<string, IngredientStockSummary>;
  menuItems: MenuItem[];
  onAdjustStock: (branchId: BranchId, ingredientId: string, adjustmentDelta: number) => void;
  onReceiveDelivery: (branchId: BranchId, ingredientId: string, amount: number) => void;
}

export const InventoryDashboard: React.FC<InventoryDashboardProps> = ({
  currentBranch,
  branches,
  stockRecords,
  stockSummary,
  menuItems,
  onAdjustStock,
  onReceiveDelivery
}) => {
  const branch = branches[currentBranch];
  const [activeTab, setActiveTab] = useState<'ingredients' | 'recipes' | 'portions'>('ingredients');
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(RECIPES[0]);

  // Restock modal state
  const [restockModalItem, setRestockModalItem] = useState<IngredientStockSummary | null>(null);
  const [restockAmount, setRestockAmount] = useState<number>(10);

  const stockList = Array.from(stockSummary.values());

  const filteredStock = stockList.filter(s => 
    s.ingredient.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    s.ingredient.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const reorderCount = stockList.filter(s => s.needsReorder).length;

  const handleRestockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!restockModalItem || restockAmount <= 0) return;
    onReceiveDelivery(currentBranch, restockModalItem.ingredient.id, restockAmount);
    setRestockModalItem(null);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-stone-900 border border-stone-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <Boxes className="w-4 h-4" />
            <span>Recipe-Linked Inventory &amp; Available-to-Promise (ATP) Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {branch.name} Stock Depot
          </h2>
          <p className="text-xs text-stone-400">
            Formula: On-Hand = Opening + Received - Consumed - Wastage + Adjustment · Available = MAX(0, On-Hand - Reserved)
          </p>
        </div>

        {/* Quick Alert Metric */}
        <div className="flex items-center gap-3">
          <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${
              reorderCount > 0 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              {reorderCount > 0 ? <AlertTriangle className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-xs text-stone-400">Reorder Status</span>
              <p className="text-sm font-bold text-white">
                {reorderCount > 0 ? `${reorderCount} Low Stock Alert` : 'All Stock Healthy'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Tabs: Ingredients Stock, Live Recipe Portions, Recipe Inspector */}
      <div className="flex items-center gap-2 border-b border-stone-800 pb-3">
        <button
          onClick={() => setActiveTab('ingredients')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'ingredients'
              ? 'bg-amber-500 text-stone-950'
              : 'text-stone-400 hover:text-white bg-stone-900 border border-stone-800'
          }`}
        >
          <Boxes className="w-3.5 h-3.5" />
          <span>Ingredient ATP Stock ({stockList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('portions')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'portions'
              ? 'bg-amber-500 text-stone-950'
              : 'text-stone-400 hover:text-white bg-stone-900 border border-stone-800'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Menu Portion Availability</span>
        </button>

        <button
          onClick={() => setActiveTab('recipes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'recipes'
              ? 'bg-amber-500 text-stone-950'
              : 'text-stone-400 hover:text-white bg-stone-900 border border-stone-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Recipe Specifications (MENU001–032)</span>
        </button>
      </div>

      {/* Tab 1: Ingredient ATP Stock Table */}
      {activeTab === 'ingredients' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                placeholder="Filter ingredients (Chicken, Mutton, Spices)..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
            <p className="text-xs text-stone-400 hidden sm:block">
              Click "+ Receive Stock" to simulate supplier replenishment.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl bg-stone-900 border border-stone-800 shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-950/80 text-stone-400 text-[11px] uppercase tracking-wider border-b border-stone-800">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Ingredient &amp; Category</th>
                  <th className="py-3.5 px-3 font-semibold">Opening</th>
                  <th className="py-3.5 px-3 font-semibold">Received</th>
                  <th className="py-3.5 px-3 font-semibold">Consumed</th>
                  <th className="py-3.5 px-3 font-semibold">Wastage</th>
                  <th className="py-3.5 px-3 font-semibold text-stone-200">On-Hand</th>
                  <th className="py-3.5 px-3 font-semibold text-amber-400">Reserved</th>
                  <th className="py-3.5 px-3 font-semibold text-emerald-400">Available (ATP)</th>
                  <th className="py-3.5 px-3 font-semibold">Reorder Status</th>
                  <th className="py-3.5 px-4 text-right font-semibold">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60 font-mono">
                {filteredStock.map(item => (
                  <tr key={item.ingredient.id} className="hover:bg-stone-800/40 transition-colors">
                    <td className="py-3 px-4 font-sans">
                      <div className="font-semibold text-white">{item.ingredient.name}</div>
                      <span className="text-[10px] text-stone-400">{item.ingredient.category}</span>
                    </td>
                    <td className="py-3 px-3 text-stone-400">{item.opening} {item.ingredient.unit}</td>
                    <td className="py-3 px-3 text-emerald-400">+{item.received}</td>
                    <td className="py-3 px-3 text-rose-400">-{item.consumed}</td>
                    <td className="py-3 px-3 text-stone-500">-{item.wastage}</td>
                    <td className="py-3 px-3 font-bold text-white">
                      {item.onHand} {item.ingredient.unit}
                    </td>
                    <td className="py-3 px-3 text-amber-400">
                      {item.reserved} {item.ingredient.unit}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        item.availableToPromise <= item.reorderThreshold
                          ? 'bg-rose-950/80 text-rose-300 border border-rose-800/50'
                          : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/50'
                      }`}>
                        {item.availableToPromise} {item.ingredient.unit}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-sans">
                      {item.needsReorder ? (
                        <span className="text-[11px] text-rose-400 font-semibold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Order {item.suggestedPurchase} {item.ingredient.unit}
                        </span>
                      ) : (
                        <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Optimal
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right font-sans">
                      <button
                        onClick={() => {
                          setRestockModalItem(item);
                          setRestockAmount(Math.max(5, item.suggestedPurchase || 10));
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[11px] font-semibold transition-colors"
                      >
                        + Receive
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Menu Portion Availability (Max portions formula) */}
      {activeTab === 'portions' && (
        <div className="space-y-4">
          <p className="text-xs text-stone-300">
            Portion ceiling formula: <code>max portions = min floor(available ingredient / per-portion requirement)</code>.
            If any key ingredient runs out, the dish automatically gates to out-of-stock.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {menuItems.map(item => {
              const avail = calculateItemAvailability(item, currentBranch, stockSummary);
              const isOut = !avail.isOrderable || avail.maxPortions <= 0;
              const isLow = avail.isOrderable && avail.maxPortions <= 5;

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border text-xs flex flex-col justify-between space-y-3 ${
                    isOut
                      ? 'bg-stone-950 border-rose-900/40 opacity-70'
                      : isLow
                      ? 'bg-stone-900 border-amber-500/40'
                      : 'bg-stone-900 border-stone-800'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-amber-400 font-bold">{item.code}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isOut
                          ? 'bg-rose-950 text-rose-400 border border-rose-800/40'
                          : isLow
                          ? 'bg-amber-950 text-amber-400 border border-amber-800/40'
                          : 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                      }`}>
                        {isOut ? 'Exhausted' : `${avail.maxPortions} Portions`}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-white text-sm">{item.name}</h4>
                    <p className="text-[11px] text-stone-400">{item.category}</p>
                  </div>

                  <div className="border-t border-stone-800 pt-2 text-[11px] space-y-1">
                    {avail.limitingIngredient ? (
                      <p className="text-stone-400">
                        <strong>Limiting Stock:</strong> {avail.limitingIngredient.ingredient.name} ({avail.limitingIngredient.availableQty.toFixed(1)} {avail.limitingIngredient.ingredient.unit} remaining)
                      </p>
                    ) : item.hasVerifiedRecipe ? (
                      <p className="text-emerald-400 font-medium">All recipe ingredients well stocked.</p>
                    ) : (
                      <p className="text-stone-500 italic">Catalog item (standard batch capacity).</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Recipe Inspector */}
      {activeTab === 'recipes' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recipe List */}
          <div className="lg:col-span-5 space-y-2">
            <h3 className="text-sm font-semibold text-white">Verified Menu Recipes ({RECIPES.length})</h3>
            <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
              {RECIPES.map(recipe => (
                <button
                  key={recipe.id}
                  onClick={() => setSelectedRecipe(recipe)}
                  className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                    selectedRecipe?.id === recipe.id
                      ? 'bg-amber-500/15 border-amber-500 text-white font-semibold'
                      : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <div>
                    <span className="font-mono text-amber-400 text-[10px] mr-2">{recipe.menuId}</span>
                    <span>{recipe.name}</span>
                  </div>
                  <span className="text-[10px] text-stone-500">{recipe.ingredients.length} ingredients</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recipe Details Inspector */}
          <div className="lg:col-span-7">
            {selectedRecipe ? (
              <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-5">
                <div className="border-b border-stone-800 pb-3">
                  <span className="font-mono text-xs text-amber-400 font-bold">{selectedRecipe.id} · {selectedRecipe.menuId}</span>
                  <h3 className="font-serif font-bold text-xl text-white mt-1">{selectedRecipe.name}</h3>
                  <p className="text-xs text-stone-400">Portion Size: {selectedRecipe.portionUnit}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                    Ingredient Consumption per Serving:
                  </h4>
                  <div className="space-y-2">
                    {selectedRecipe.ingredients.map((req, idx) => {
                      const ing = INGREDIENTS.find(i => i.id === req.ingredientId);
                      const stock = stockSummary.get(req.ingredientId);

                      return (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between text-xs"
                        >
                          <div>
                            <span className="font-semibold text-white">{ing?.name || req.ingredientId}</span>
                            <p className="text-[10px] text-stone-400">{ing?.category}</p>
                          </div>

                          <div className="text-right">
                            <span className="font-mono font-bold text-amber-400">
                              {req.qtyPerPortion} {ing?.unit} / serving
                            </span>
                            <p className="text-[10px] text-stone-400">
                              ATP in kitchen: {stock?.availableToPromise || 0} {ing?.unit}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-stone-500 text-xs">Select a recipe to inspect details</div>
            )}
          </div>
        </div>
      )}

      {/* Quick Restock Modal */}
      {restockModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in zoom-in-95">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <h4 className="font-serif font-bold text-lg text-white">Receive Stock Delivery</h4>
            <p className="text-xs text-stone-400">
              Receiving replenishment for <strong>{restockModalItem.ingredient.name}</strong> at {branch.name}.
            </p>

            <form onSubmit={handleRestockSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-stone-300">
                  Quantity Received ({restockModalItem.ingredient.unit})
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="1"
                  value={restockAmount}
                  onChange={e => setRestockAmount(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white font-mono focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRestockModalItem(null)}
                  className="w-1/2 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold"
                >
                  Confirm Restock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
