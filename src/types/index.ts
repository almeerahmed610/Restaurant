export type BranchId = 'UTG-KHI-001' | 'UTG-KHI-002';

export interface BranchInfo {
  id: BranchId;
  code: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  totalTables: number;
  totalSeats: number;
  seatingSummary: string;
  deliveryZones: string[];
  features: string[];
}

export type MenuCategory = 
  | 'Pakistani cuisine'
  | 'BBQ & grills'
  | 'Burgers & fast food'
  | 'Pizza & pasta'
  | 'Chinese & continental'
  | 'Breakfast'
  | 'Desserts & drinks'
  | 'Deals & Combos';

export interface MenuVariant {
  id: string;
  name: string;
  priceDelta: number; // relative to base or absolute
  portionMultiplier: number; // ingredient usage factor
}

export interface MenuAddon {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string; // e.g. MENU001
  code: string;
  name: string;
  urduName: string;
  category: MenuCategory;
  description: string;
  price: number; // in PKR
  originalPrice?: number;
  isVeg: boolean;
  isSpicy: boolean;
  spiceLevel: 1 | 2 | 3;
  prepTimeMinutes: number;
  allergens: string[];
  branchAvailability: {
    [key in BranchId]: boolean;
  };
  imageUrl: string;
  isRecommended?: boolean;
  recipeId?: string;
  variants?: MenuVariant[];
  addons?: MenuAddon[];
  hasVerifiedRecipe: boolean; // MENU001-MENU032: true, MENU033+: catalog only until recipe assigned
  tags: string[];
}

export interface IngredientRequirement {
  ingredientId: string;
  qtyPerPortion: number; // in unit (kg, L, pcs)
}

export interface Recipe {
  id: string;
  menuId: string;
  name: string;
  portionUnit: string;
  ingredients: IngredientRequirement[];
}

export interface Ingredient {
  id: string;
  name: string;
  category: 'Meat & Poultry' | 'Grains & Flour' | 'Produce' | 'Dairy & Fats' | 'Spices & Condiments' | 'Bakery & Packaged';
  unit: 'kg' | 'L' | 'pcs';
  costPerUnit: number; // PKR
  reorderLevel: number;
  targetStock: number;
}

export interface BranchStock {
  branchId: BranchId;
  ingredientId: string;
  opening: number;
  received: number;
  consumed: number;
  wastage: number;
  adjustment: number;
  reserved: number;
}

export type TableType = '2-person' | '4-person' | '7-person' | '9-person' | '10-person';
export type TableStatus = 'available' | 'reserved' | 'occupied';

export interface RestaurantTable {
  id: string;
  branchId: BranchId;
  tableNumber: string;
  capacity: number;
  type: TableType;
  section: 'Family Hall' | 'Executive Dining' | 'Courtyard Tandoor' | 'Group Banquet';
  status: TableStatus;
  currentReservationId?: string;
}

export interface TableReservation {
  id: string;
  branchId: BranchId;
  tableId: string;
  tableNumber: string;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  partySize: number;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "20:00"
  notes?: string;
  status: 'confirmed' | 'seated' | 'completed' | 'cancelled';
  createdAt: string;
}

export type OrderChannel = 'ai_assistant' | 'dine_in' | 'otc_takeaway' | 'direct_delivery' | 'foodpanda' | 'pre_order';
export type FulfillmentType = 'dine_in' | 'takeaway' | 'delivery';
export type OrderStatus = 'accepted' | 'preparing' | 'ready' | 'dispatched' | 'completed' | 'cancelled';
export type PaymentMethod = 'cod' | 'counter_cash' | 'bank_card';

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedVariant?: MenuVariant;
  selectedAddons?: MenuAddon[];
  specialInstructions?: string;
  calculatedPrice: number;
}

export interface RestaurantOrder {
  id: string;
  orderNumber: string;
  branchId: BranchId;
  channel: OrderChannel;
  fulfillment: FulfillmentType;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  discountReason?: string;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  bankName?: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress?: string;
  tableNumber?: string;
  isPreOrder: boolean;
  scheduledTime?: string; // ISO string or format
  createdAt: string;
  estimatedReadyTime: string;
  notes?: string;
}

export type TicketSeverity = 'low' | 'medium' | 'high' | 'urgent';

export interface ComplaintTicket {
  id: string;
  ticketNumber: string;
  orderNumber?: string;
  customerName: string;
  customerPhone: string;
  category: 'food_quality' | 'delivery_delay' | 'wrong_item' | 'staff_service' | 'reservation_issue' | 'other';
  severity: TicketSeverity;
  description: string;
  status: 'open' | 'investigating' | 'resolved';
  resolutionNote?: string;
  branchId: BranchId;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  intent?: 'order' | 'recommendation' | 'reservation' | 'tracking' | 'complaint' | 'general' | 'out_of_stock';
  actionData?: {
    suggestedItems?: MenuItem[];
    orderPreview?: Partial<RestaurantOrder>;
    reservationPreview?: Partial<TableReservation>;
    ticketCreated?: ComplaintTicket;
    trackingOrder?: RestaurantOrder;
    outOfStockAlternative?: {
      requestedItem: string;
      alternatives: MenuItem[];
    };
  };
}
