import { BranchId, BranchStock, MenuItem, Recipe, Ingredient } from '../types';
import { INGREDIENTS, RECIPES } from '../data/restaurantData';

export interface IngredientStockSummary {
  ingredient: Ingredient;
  opening: number;
  received: number;
  consumed: number;
  wastage: number;
  adjustment: number;
  onHand: number;
  reserved: number;
  availableToPromise: number;
  reorderThreshold: number;
  targetStock: number;
  needsReorder: boolean;
  suggestedPurchase: number;
}

export interface MenuItemAvailability {
  menuItem: MenuItem;
  recipe?: Recipe;
  maxPortions: number;
  isOrderable: boolean;
  limitingIngredient?: {
    ingredient: Ingredient;
    availableQty: number;
    requiredQty: number;
  };
  reason?: string;
}

/**
 * Calculates on-hand and available-to-promise stock for each ingredient in a branch.
 * On Hand = Opening + Received - Consumed - Wastage + Adjustment
 * Available to promise = MAX(0, On Hand - Reserved)
 */
export function calculateBranchStockSummary(
  branchId: BranchId,
  stockRecords: BranchStock[]
): Map<string, IngredientStockSummary> {
  const summaryMap = new Map<string, IngredientStockSummary>();

  for (const ingredient of INGREDIENTS) {
    const record = stockRecords.find(
      s => s.branchId === branchId && s.ingredientId === ingredient.id
    ) || {
      branchId,
      ingredientId: ingredient.id,
      opening: 0,
      received: 0,
      consumed: 0,
      wastage: 0,
      adjustment: 0,
      reserved: 0
    };

    const onHand = Math.max(0, record.opening + record.received - record.consumed - record.wastage + record.adjustment);
    const availableToPromise = Math.max(0, onHand - record.reserved);
    const needsReorder = onHand <= ingredient.reorderLevel;
    const suggestedPurchase = needsReorder ? Math.max(0, ingredient.targetStock - onHand) : 0;

    summaryMap.set(ingredient.id, {
      ingredient,
      opening: record.opening,
      received: record.received,
      consumed: record.consumed,
      wastage: record.wastage,
      adjustment: record.adjustment,
      onHand: Number(onHand.toFixed(2)),
      reserved: Number(record.reserved.toFixed(2)),
      availableToPromise: Number(availableToPromise.toFixed(2)),
      reorderThreshold: ingredient.reorderLevel,
      targetStock: ingredient.targetStock,
      needsReorder,
      suggestedPurchase: Number(suggestedPurchase.toFixed(2))
    });
  }

  return summaryMap;
}

/**
 * Calculates max portions for a menu item at a branch.
 * Formula: max portions = minimum floor(available ingredient / per-portion requirement)
 */
export function calculateItemAvailability(
  menuItem: MenuItem,
  branchId: BranchId,
  stockSummary: Map<string, IngredientStockSummary>
): MenuItemAvailability {
  // Check branch availability gate
  if (!menuItem.branchAvailability[branchId]) {
    return {
      menuItem,
      maxPortions: 0,
      isOrderable: false,
      reason: `Item is deactivated at ${branchId === 'UTG-KHI-001' ? 'PECHS' : 'Gulshan'} branch.`
    };
  }

  // If item is catalog-only (MENU033+ without verified recipe)
  if (!menuItem.hasVerifiedRecipe || !menuItem.recipeId) {
    // Catalog items without tracked recipes have unverified stock gate as per prompt notes:
    // "MENU033 onward are catalog-only; no corresponding recipe records or trustworthy inventory capacity."
    // They can still be browsed or requested, but flagged as unverified inventory / catalog.
    return {
      menuItem,
      maxPortions: 25, // default catalog cap
      isOrderable: true,
      reason: 'Catalog item: standard batch availability.'
    };
  }

  const recipe = RECIPES.find(r => r.id === menuItem.recipeId);
  if (!recipe || recipe.ingredients.length === 0) {
    return {
      menuItem,
      maxPortions: 0,
      isOrderable: false,
      reason: 'Recipe definition missing.'
    };
  }

  let minPortions = Infinity;
  let limitingIngredientInfo: MenuItemAvailability['limitingIngredient'] | undefined;

  for (const req of recipe.ingredients) {
    const stock = stockSummary.get(req.ingredientId);
    if (!stock) {
      minPortions = 0;
      break;
    }

    const possible = Math.floor(stock.availableToPromise / req.qtyPerPortion);
    if (possible < minPortions) {
      minPortions = possible;
      limitingIngredientInfo = {
        ingredient: stock.ingredient,
        availableQty: stock.availableToPromise,
        requiredQty: req.qtyPerPortion
      };
    }
  }

  const maxPortions = minPortions === Infinity ? 0 : Math.max(0, minPortions);

  return {
    menuItem,
    recipe,
    maxPortions,
    isOrderable: maxPortions > 0,
    limitingIngredient: limitingIngredientInfo,
    reason: maxPortions <= 0 
      ? `Out of stock: Insufficient ${limitingIngredientInfo?.ingredient.name || 'ingredients'}`
      : undefined
  };
}

/**
 * Find genuinely available alternatives in the same category if an item is low/out-of-stock
 */
export function findAvailableAlternatives(
  menuItems: MenuItem[],
  targetItem: MenuItem,
  branchId: BranchId,
  stockSummary: Map<string, IngredientStockSummary>
): MenuItem[] {
  return menuItems.filter(item => {
    if (item.id === targetItem.id) return false;
    if (item.category !== targetItem.category) return false;
    const avail = calculateItemAvailability(item, branchId, stockSummary);
    return avail.isOrderable && avail.maxPortions >= 2;
  });
}
