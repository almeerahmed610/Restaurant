import { BranchId, BranchInfo, Ingredient, Recipe, BranchStock, MenuItem, RestaurantTable, RestaurantOrder, TableReservation, ComplaintTicket } from '../types';

export const BRANCHES: Record<BranchId, BranchInfo> = {
  'UTG-KHI-001': {
    id: 'UTG-KHI-001',
    code: 'PECHS',
    name: 'PECHS Flagship Branch',
    area: 'PECHS / Shahrah-e-Faisal',
    address: 'Main Shahrah-e-Faisal, Block 2, PECHS, Karachi, Sindh',
    phone: '+92 21 3455 8901',
    totalTables: 18,
    totalSeats: 72,
    seatingSummary: '8 four-person, 6 two-person & 4 seven-person tables',
    deliveryZones: ['PECHS (All Blocks)', 'Tariq Road & Bahadurabad', 'Sindhi Muslim Housing Society', 'SMCHS & Nursery', 'Clifton Blocks 1-5', 'DHA Phase 1 & 2', 'Bahria Complex & City'],
    features: ['Live Tandoor & Charcoal Pit', 'Dedicated Family Courtyard', '24/7 OTC Counter', 'In-House Dispatch Fleet', 'Valet Parking']
  },
  'UTG-KHI-002': {
    id: 'UTG-KHI-002',
    code: 'Gulshan',
    name: 'Gulshan-e-Iqbal Mega Branch',
    area: 'Gulshan-e-Iqbal / University Road',
    address: 'Main University Road, Block 6, Gulshan-e-Iqbal, Karachi, Sindh',
    phone: '+92 21 3498 7720',
    totalTables: 24,
    totalSeats: 112,
    seatingSummary: '8 two-person, 10 four-person & 6 group banquet tables (4x 9-person, 2x 10-person)',
    deliveryZones: ['Gulshan-e-Iqbal (Blocks 1-19)', 'Gulistan-e-Johar (Blocks 1-15)', 'University Road & NED Corridor', 'Federal B Area (Blocks 1-12)', 'Rashid Minhas & NIPA', 'Scheme 33 & Safoora'],
    features: ['Grand Family Dining Hall', 'Private Group Feast Pods', '24/7 Fast-Track Drive-thru / OTC', 'Foodpanda Super-Hub Kitchen', 'Children Play Zone']
  }
};

export const INGREDIENTS: Ingredient[] = [
  { id: 'ING_CHK', name: 'Fresh Farm Chicken', category: 'Meat & Poultry', unit: 'kg', costPerUnit: 680, reorderLevel: 25, targetStock: 80 },
  { id: 'ING_MUT', name: 'Karachi Fresh Mutton', category: 'Meat & Poultry', unit: 'kg', costPerUnit: 2200, reorderLevel: 15, targetStock: 45 },
  { id: 'ING_BEEF', name: 'Prime Minced Beef', category: 'Meat & Poultry', unit: 'kg', costPerUnit: 1100, reorderLevel: 15, targetStock: 40 },
  { id: 'ING_RICE', name: 'Super Basmati Sella Rice', category: 'Grains & Flour', unit: 'kg', costPerUnit: 360, reorderLevel: 30, targetStock: 100 },
  { id: 'ING_MAIDA', name: 'Fine Wheat Flour (Maida)', category: 'Grains & Flour', unit: 'kg', costPerUnit: 140, reorderLevel: 40, targetStock: 120 },
  { id: 'ING_TOM', name: 'Sindh Hybrid Tomatoes', category: 'Produce', unit: 'kg', costPerUnit: 160, reorderLevel: 25, targetStock: 70 },
  { id: 'ING_ONION', name: 'Fresh Red Onions', category: 'Produce', unit: 'kg', costPerUnit: 180, reorderLevel: 30, targetStock: 80 },
  { id: 'ING_GINGER_GARLIC', name: 'Ginger-Garlic Paste', category: 'Produce', unit: 'kg', costPerUnit: 420, reorderLevel: 10, targetStock: 30 },
  { id: 'ING_POTATO', name: 'Russet Potatoes', category: 'Produce', unit: 'kg', costPerUnit: 110, reorderLevel: 20, targetStock: 60 },
  { id: 'ING_OIL', name: 'Pure Canola Cooking Oil', category: 'Dairy & Fats', unit: 'L', costPerUnit: 480, reorderLevel: 30, targetStock: 90 },
  { id: 'ING_GHEE', name: 'Desi Pure Cow Ghee', category: 'Dairy & Fats', unit: 'L', costPerUnit: 1850, reorderLevel: 10, targetStock: 30 },
  { id: 'ING_CREAM_MILK', name: 'Dairy Fresh Cream & Milk', category: 'Dairy & Fats', unit: 'L', costPerUnit: 260, reorderLevel: 20, targetStock: 60 },
  { id: 'ING_YOGURT', name: 'Wholesome Dahi (Yogurt)', category: 'Dairy & Fats', unit: 'kg', costPerUnit: 220, reorderLevel: 20, targetStock: 50 },
  { id: 'ING_MOZZ', name: 'Real Mozzarella & Cheddar', category: 'Dairy & Fats', unit: 'kg', costPerUnit: 1450, reorderLevel: 15, targetStock: 40 },
  { id: 'ING_PANEER', name: 'Fresh Malai Paneer', category: 'Dairy & Fats', unit: 'kg', costPerUnit: 1200, reorderLevel: 8, targetStock: 25 },
  { id: 'ING_SPICES', name: 'UTG Secret Tandoori Masala Blend', category: 'Spices & Condiments', unit: 'kg', costPerUnit: 850, reorderLevel: 12, targetStock: 35 },
  { id: 'ING_BUNS', name: 'Brioche Burger Buns', category: 'Bakery & Packaged', unit: 'pcs', costPerUnit: 45, reorderLevel: 40, targetStock: 150 },
  { id: 'ING_PITA', name: 'Tandoori Shawarma Pita Bread', category: 'Bakery & Packaged', unit: 'pcs', costPerUnit: 35, reorderLevel: 40, targetStock: 120 },
  { id: 'ING_SUGAR', name: 'Refined White Sugar', category: 'Spices & Condiments', unit: 'kg', costPerUnit: 160, reorderLevel: 15, targetStock: 50 },
  { id: 'ING_TEA', name: 'Kenya Premium Dust Tea Leaves', category: 'Spices & Condiments', unit: 'kg', costPerUnit: 1350, reorderLevel: 8, targetStock: 25 }
];

export const RECIPES: Recipe[] = [
  {
    id: 'REC_001',
    menuId: 'MENU001',
    name: 'Chicken Karahi (Full)',
    portionUnit: '1 Karahi (serves 3-4)',
    ingredients: [
      { ingredientId: 'ING_CHK', qtyPerPortion: 1.0 },
      { ingredientId: 'ING_TOM', qtyPerPortion: 0.35 },
      { ingredientId: 'ING_OIL', qtyPerPortion: 0.12 },
      { ingredientId: 'ING_GINGER_GARLIC', qtyPerPortion: 0.05 },
      { ingredientId: 'ING_SPICES', qtyPerPortion: 0.04 }
    ]
  },
  {
    id: 'REC_002',
    menuId: 'MENU002',
    name: 'Mutton Karahi (Full)',
    portionUnit: '1 Karahi (serves 3-4)',
    ingredients: [
      { ingredientId: 'ING_MUT', qtyPerPortion: 1.0 },
      { ingredientId: 'ING_TOM', qtyPerPortion: 0.4 },
      { ingredientId: 'ING_GHEE', qtyPerPortion: 0.14 },
      { ingredientId: 'ING_GINGER_GARLIC', qtyPerPortion: 0.06 },
      { ingredientId: 'ING_SPICES', qtyPerPortion: 0.05 }
    ]
  },
  {
    id: 'REC_003',
    menuId: 'MENU003',
    name: 'Chicken White Handi (Boneless)',
    portionUnit: '1 Handi (serves 2-3)',
    ingredients: [
      { ingredientId: 'ING_CHK', qtyPerPortion: 0.65 },
      { ingredientId: 'ING_CREAM_MILK', qtyPerPortion: 0.22 },
      { ingredientId: 'ING_YOGURT', qtyPerPortion: 0.15 },
      { ingredientId: 'ING_OIL', qtyPerPortion: 0.08 },
      { ingredientId: 'ING_SPICES', qtyPerPortion: 0.03 }
    ]
  },
  {
    id: 'REC_004',
    menuId: 'MENU004',
    name: 'Chicken Makhni Handi',
    portionUnit: '1 Handi (serves 2-3)',
    ingredients: [
      { ingredientId: 'ING_CHK', qtyPerPortion: 0.65 },
      { ingredientId: 'ING_TOM', qtyPerPortion: 0.3 },
      { ingredientId: 'ING_GHEE', qtyPerPortion: 0.1 },
      { ingredientId: 'ING_CREAM_MILK', qtyPerPortion: 0.15 },
      { ingredientId: 'ING_SPICES', qtyPerPortion: 0.03 }
    ]
  },
  {
    id: 'REC_005',
    menuId: 'MENU005',
    name: 'UTG Special Chicken Biryani',
    portionUnit: '1 Plate (Single Serving)',
    ingredients: [
      { ingredientId: 'ING_CHK', qtyPerPortion: 0.28 },
      { ingredientId: 'ING_RICE', qtyPerPortion: 0.25 },
      { ingredientId: 'ING_ONION', qtyPerPortion: 0.1 },
      { ingredientId: 'ING_TOM', qtyPerPortion: 0.1 },
      { ingredientId: 'ING_OIL', qtyPerPortion: 0.06 },
      { ingredientId: 'ING_SPICES', qtyPerPortion: 0.025 }
    ]
  },
  {
    id: 'REC_006',
    menuId: 'MENU006',
    name: 'Dum Pukht Mutton Pulao',
    portionUnit: '1 Plate (Single Serving)',
    ingredients: [
      { ingredientId: 'ING_MUT', qtyPerPortion: 0.32 },
      { ingredientId: 'ING_RICE', qtyPerPortion: 0.26 },
      { ingredientId: 'ING_ONION', qtyPerPortion: 0.08 },
      { ingredientId: 'ING_GHEE', qtyPerPortion: 0.07 },
      { ingredientId: 'ING_SPICES', qtyPerPortion: 0.02 }
    ]
  },
  {
    id: 'REC_007',
    menuId: 'MENU007',
    name: 'Daal Makhni / Tarka',
    portionUnit: '1 Bowl',
    ingredients: [
      { ingredientId: 'ING_TOM', qtyPerPortion: 0.15 },
      { ingredientId: 'ING_ONION', qtyPerPortion: 0.1 },
      { ingredientId: 'ING_GHEE', qtyPerPortion: 0.08 },
      { ingredientId: 'ING_CREAM_MILK', qtyPerPortion: 0.08 },
      { ingredientId: 'ING_SPICES', qtyPerPortion: 0.02 }
    ]
  },
  {
    id: 'REC_008',
    menuId: 'MENU008',
    name: 'Paneer Reshmi Karahi',
    portionUnit: '1 Karahi',
    ingredients: [
      { ingredientId: 'ING_PANEER', qtyPerPortion: 0.35 },
      { ingredientId: 'ING_TOM', qtyPerPortion: 0.2 },
      { ingredientId: 'ING_CREAM_MILK', qtyPerPortion: 0.12 },
      { ingredientId: 'ING_OIL', qtyPerPortion: 0.06 },
      { ingredientId: 'ING_SPICES', qtyPerPortion: 0.03 }
    ]
  },
  {
    id: 'REC_009',
    menuId: 'MENU009',
    name: 'Chicken Tikka',
    portionUnit: '1 Piece (Chest/Leg)',
    ingredients: [
      { ingredientId: 'ING_CHK', qtyPerPortion: 0.35 },
      { ingredientId: 'ING_YOGURT', qtyPerPortion: 0.08 },
      { ingredientId: 'ING_OIL', qtyPerPortion: 0.04 },
      { ingredientId: 'ING_SPICES', qtyPerPortion: 0.03 }
    ]
  },
  {
    id: 'REC_010',
    menuId: 'MENU010',
    name: 'Malai Boti',
    portionUnit: '1 Skewer (8 tender pieces)',
    ingredients: [
      { ingredientId: 'ING_CHK', qtyPerPortion: 0.4 },
      { ingredientId: 'ING_CREAM_MILK', qtyPerPortion: 0.12 },
      { ingredientId: 'ING_YOGURT', qtyPerPortion: 0.08 },
      { ingredientId: 'ING_SPICES', qtyPerPortion: 0.025 }
    ]
  },
  {
    id: 'REC_011',
    menuId: 'MENU011',
    name: 'Beef Seekh Kabab',
    portionUnit: '4 Skewers',
    ingredients: [
      { ingredientId: 'ING_BEEF', qtyPerPortion: 0.45 },
      { ingredientId: 'ING_ONION', qtyPerPortion: 0.1 },
      { ingredientId: 'ING_SPICES', qtyPerPortion: 0.035 }
    ]
  },
  {
    id: 'REC_012',
    menuId: 'MENU012',
    name: 'Chicken Reshmi Kabab',
    portionUnit: '4 Skewers',
    ingredients: [
      { ingredientId: 'ING_CHK', qtyPerPortion: 0.42 },
      { ingredientId: 'ING_CREAM_MILK', qtyPerPortion: 0.08 },
      { ingredientId: 'ING_SPICES', qtyPerPortion: 0.03 }
    ]
  },
  {
    id: 'REC_013',
    menuId: 'MENU013',
    name: 'UTG Grand BBQ Platter',
    portionUnit: '1 Mega Platter (Serves 4-5)',
    ingredients: [
      { ingredientId: 'ING_CHK', qtyPerPortion: 0.9 },
      { ingredientId: 'ING_BEEF', qtyPerPortion: 0.5 },
      { ingredientId: 'ING_MAIDA', qtyPerPortion: 0.4 },
      { ingredientId: 'ING_YOGURT', qtyPerPortion: 0.2 },
      { ingredientId: 'ING_SPICES', qtyPerPortion: 0.07 }
    ]
  },
  {
    id: 'REC_014',
    menuId: 'MENU014',
    name: 'Chicken Bihari Boti',
    portionUnit: '1 Skewer',
    ingredients: [
      { ingredientId: 'ING_CHK', qtyPerPortion: 0.38 },
      { ingredientId: 'ING_YOGURT', qtyPerPortion: 0.1 },
      { ingredientId: 'ING_OIL', qtyPerPortion: 0.05 },
      { ingredientId: 'ING_SPICES', qtyPerPortion: 0.035 }
    ]
  },
  {
    id: 'REC_015',
    menuId: 'MENU015',
    name: 'Classic Zinger Crunch Burger',
    portionUnit: '1 Burger with Fries',
    ingredients: [
      { ingredientId: 'ING_CHK', qtyPerPortion: 0.22 },
      { ingredientId: 'ING_BUNS', qtyPerPortion: 1 },
      { ingredientId: 'ING_POTATO', qtyPerPortion: 0.2 },
      { ingredientId: 'ING_OIL', qtyPerPortion: 0.08 }
    ]
  },
  {
    id: 'REC_016',
    menuId: 'MENU016',
    name: 'Royal Beef Smash Burger',
    portionUnit: '1 Double Smash Burger',
    ingredients: [
      { ingredientId: 'ING_BEEF', qtyPerPortion: 0.25 },
      { ingredientId: 'ING_BUNS', qtyPerPortion: 1 },
      { ingredientId: 'ING_MOZZ', qtyPerPortion: 0.06 },
      { ingredientId: 'ING_POTATO', qtyPerPortion: 0.2 }
    ]
  },
  {
    id: 'REC_017',
    menuId: 'MENU017',
    name: 'UTG Club Sandwich',
    portionUnit: '1 Triple Decker Plate',
    ingredients: [
      { ingredientId: 'ING_CHK', qtyPerPortion: 0.18 },
      { ingredientId: 'ING_MAIDA', qtyPerPortion: 0.15 },
      { ingredientId: 'ING_POTATO', qtyPerPortion: 0.2 },
      { ingredientId: 'ING_CREAM_MILK', qtyPerPortion: 0.05 }
    ]
  },
  {
    id: 'REC_018',
    menuId: 'MENU018',
    name: 'Charcoal Chicken Shawarma Roll',
    portionUnit: '1 Jumbo Roll',
    ingredients: [
      { ingredientId: 'ING_CHK', qtyPerPortion: 0.2 },
      { ingredientId: 'ING_PITA', qtyPerPortion: 1 },
      { ingredientId: 'ING_OIL', qtyPerPortion: 0.04 }
    ]
  },
  {
    id: 'REC_019',
    menuId: 'MENU019',
    name: 'Spicy Loaded Peri Fries',
    portionUnit: '1 Box',
    ingredients: [
      { ingredientId: 'ING_POTATO', qtyPerPortion: 0.35 },
      { ingredientId: 'ING_OIL', qtyPerPortion: 0.08 },
      { ingredientId: 'ING_MOZZ', qtyPerPortion: 0.05 }
    ]
  },
  {
    id: 'REC_020',
    menuId: 'MENU020',
    name: 'Crispy Tenders & Nuggets',
    portionUnit: '6 Pieces',
    ingredients: [
      { ingredientId: 'ING_CHK', qtyPerPortion: 0.25 },
      { ingredientId: 'ING_MAIDA', qtyPerPortion: 0.08 },
      { ingredientId: 'ING_OIL', qtyPerPortion: 0.08 }
    ]
  },
  {
    id: 'REC_021',
    menuId: 'MENU021',
    name: 'Chicken Fajita Pizza (Medium)',
    portionUnit: '1 Medium Pizza (10 inch)',
    ingredients: [
      { ingredientId: 'ING_MAIDA', qtyPerPortion: 0.3 },
      { ingredientId: 'ING_CHK', qtyPerPortion: 0.2 },
      { ingredientId: 'ING_MOZZ', qtyPerPortion: 0.18 },
      { ingredientId: 'ING_TOM', qtyPerPortion: 0.1 }
    ]
  },
  {
    id: 'REC_022',
    menuId: 'MENU022',
    name: 'Smoky BBQ Feast Pizza (Medium)',
    portionUnit: '1 Medium Pizza (10 inch)',
    ingredients: [
      { ingredientId: 'ING_MAIDA', qtyPerPortion: 0.3 },
      { ingredientId: 'ING_CHK', qtyPerPortion: 0.22 },
      { ingredientId: 'ING_MOZZ', qtyPerPortion: 0.18 },
      { ingredientId: 'ING_ONION', qtyPerPortion: 0.08 }
    ]
  },
  {
    id: 'REC_023',
    menuId: 'MENU023',
    name: 'Creamy Fettuccine Alfredo',
    portionUnit: '1 Plate Pasta',
    ingredients: [
      { ingredientId: 'ING_MAIDA', qtyPerPortion: 0.2 },
      { ingredientId: 'ING_CHK', qtyPerPortion: 0.18 },
      { ingredientId: 'ING_CREAM_MILK', qtyPerPortion: 0.16 },
      { ingredientId: 'ING_MOZZ', qtyPerPortion: 0.06 }
    ]
  },
  {
    id: 'REC_024',
    menuId: 'MENU024',
    name: 'Penne Arrabbiata (Spicy)',
    portionUnit: '1 Plate Pasta',
    ingredients: [
      { ingredientId: 'ING_MAIDA', qtyPerPortion: 0.2 },
      { ingredientId: 'ING_TOM', qtyPerPortion: 0.25 },
      { ingredientId: 'ING_OIL', qtyPerPortion: 0.05 },
      { ingredientId: 'ING_SPICES', qtyPerPortion: 0.02 }
    ]
  },
  {
    id: 'REC_025',
    menuId: 'MENU025',
    name: 'Chicken Chow Mein',
    portionUnit: '1 Wok Bowl',
    ingredients: [
      { ingredientId: 'ING_MAIDA', qtyPerPortion: 0.22 },
      { ingredientId: 'ING_CHK', qtyPerPortion: 0.18 },
      { ingredientId: 'ING_ONION', qtyPerPortion: 0.1 },
      { ingredientId: 'ING_OIL', qtyPerPortion: 0.05 }
    ]
  },
  {
    id: 'REC_026',
    menuId: 'MENU026',
    name: 'Special Egg Fried Rice',
    portionUnit: '1 Bowl',
    ingredients: [
      { ingredientId: 'ING_RICE', qtyPerPortion: 0.25 },
      { ingredientId: 'ING_ONION', qtyPerPortion: 0.08 },
      { ingredientId: 'ING_OIL', qtyPerPortion: 0.05 }
    ]
  },
  {
    id: 'REC_027',
    menuId: 'MENU027',
    name: 'Chicken Manchurian Gravy',
    portionUnit: '1 Bowl',
    ingredients: [
      { ingredientId: 'ING_CHK', qtyPerPortion: 0.28 },
      { ingredientId: 'ING_TOM', qtyPerPortion: 0.18 },
      { ingredientId: 'ING_OIL', qtyPerPortion: 0.05 },
      { ingredientId: 'ING_SPICES', qtyPerPortion: 0.02 }
    ]
  },
  {
    id: 'REC_028',
    menuId: 'MENU028',
    name: 'Grilled Chicken Steak Mushroom',
    portionUnit: '1 Sizzler Steak',
    ingredients: [
      { ingredientId: 'ING_CHK', qtyPerPortion: 0.35 },
      { ingredientId: 'ING_POTATO', qtyPerPortion: 0.2 },
      { ingredientId: 'ING_CREAM_MILK', qtyPerPortion: 0.12 },
      { ingredientId: 'ING_GHEE', qtyPerPortion: 0.04 }
    ]
  },
  {
    id: 'REC_029',
    menuId: 'MENU029',
    name: 'Traditional Halwa Puri Thali',
    portionUnit: 'Thali (2 Puris, Chana, Aloo, Halwa)',
    ingredients: [
      { ingredientId: 'ING_MAIDA', qtyPerPortion: 0.2 },
      { ingredientId: 'ING_OIL', qtyPerPortion: 0.1 },
      { ingredientId: 'ING_SUGAR', qtyPerPortion: 0.08 },
      { ingredientId: 'ING_POTATO', qtyPerPortion: 0.15 }
    ]
  },
  {
    id: 'REC_030',
    menuId: 'MENU030',
    name: 'Lacha Anda Paratha Roll',
    portionUnit: '1 Paratha Roll',
    ingredients: [
      { ingredientId: 'ING_MAIDA', qtyPerPortion: 0.16 },
      { ingredientId: 'ING_GHEE', qtyPerPortion: 0.05 },
      { ingredientId: 'ING_ONION', qtyPerPortion: 0.04 }
    ]
  },
  {
    id: 'REC_031',
    menuId: 'MENU031',
    name: 'Hot Gulab Jamun (2 pcs)',
    portionUnit: '2 Pieces with Sugar Sheera',
    ingredients: [
      { ingredientId: 'ING_CREAM_MILK', qtyPerPortion: 0.15 },
      { ingredientId: 'ING_MAIDA', qtyPerPortion: 0.06 },
      { ingredientId: 'ING_SUGAR', qtyPerPortion: 0.12 },
      { ingredientId: 'ING_GHEE', qtyPerPortion: 0.04 }
    ]
  },
  {
    id: 'REC_032',
    menuId: 'MENU032',
    name: 'Matka Kheer (Pistachio & Saffron)',
    portionUnit: '1 Clay Pot (Matka)',
    ingredients: [
      { ingredientId: 'ING_CREAM_MILK', qtyPerPortion: 0.35 },
      { ingredientId: 'ING_RICE', qtyPerPortion: 0.06 },
      { ingredientId: 'ING_SUGAR', qtyPerPortion: 0.08 }
    ]
  }
];

// Initial stock representation for PECHS and Gulshan
// Stock logic from prompt: On Hand = Opening + Received - Consumed - Wastage + Adjustment
// Available = MAX(0, On Hand - Reserved)
export const INITIAL_BRANCH_STOCK: BranchStock[] = [
  // UTG-KHI-001 (PECHS)
  { branchId: 'UTG-KHI-001', ingredientId: 'ING_CHK', opening: 65, received: 30, consumed: 28, wastage: 2, adjustment: 0, reserved: 4 },
  { branchId: 'UTG-KHI-001', ingredientId: 'ING_MUT', opening: 18, received: 8, consumed: 17, wastage: 1, adjustment: 0, reserved: 3 }, // low stock demo
  { branchId: 'UTG-KHI-001', ingredientId: 'ING_BEEF', opening: 28, received: 15, consumed: 12, wastage: 1, adjustment: 0, reserved: 2 },
  { branchId: 'UTG-KHI-001', ingredientId: 'ING_RICE', opening: 75, received: 40, consumed: 32, wastage: 1, adjustment: 0, reserved: 6 },
  { branchId: 'UTG-KHI-001', ingredientId: 'ING_MAIDA', opening: 90, received: 50, consumed: 42, wastage: 2, adjustment: 0, reserved: 8 },
  { branchId: 'UTG-KHI-001', ingredientId: 'ING_TOM', opening: 55, received: 25, consumed: 29, wastage: 3, adjustment: 0, reserved: 4 },
  { branchId: 'UTG-KHI-001', ingredientId: 'ING_ONION', opening: 60, received: 30, consumed: 32, wastage: 2, adjustment: 0, reserved: 5 },
  { branchId: 'UTG-KHI-001', ingredientId: 'ING_GINGER_GARLIC', opening: 22, received: 10, consumed: 9, wastage: 0.5, adjustment: 0, reserved: 1 },
  { branchId: 'UTG-KHI-001', ingredientId: 'ING_POTATO', opening: 45, received: 25, consumed: 24, wastage: 1, adjustment: 0, reserved: 3 },
  { branchId: 'UTG-KHI-001', ingredientId: 'ING_OIL', opening: 70, received: 40, consumed: 38, wastage: 1, adjustment: 0, reserved: 5 },
  { branchId: 'UTG-KHI-001', ingredientId: 'ING_GHEE', opening: 24, received: 12, consumed: 10, wastage: 0.5, adjustment: 0, reserved: 2 },
  { branchId: 'UTG-KHI-001', ingredientId: 'ING_CREAM_MILK', opening: 45, received: 25, consumed: 26, wastage: 1, adjustment: 0, reserved: 4 },
  { branchId: 'UTG-KHI-001', ingredientId: 'ING_YOGURT', opening: 38, received: 20, consumed: 22, wastage: 1, adjustment: 0, reserved: 3 },
  { branchId: 'UTG-KHI-001', ingredientId: 'ING_MOZZ', opening: 32, received: 15, consumed: 16, wastage: 0.5, adjustment: 0, reserved: 2 },
  { branchId: 'UTG-KHI-001', ingredientId: 'ING_PANEER', opening: 18, received: 10, consumed: 8, wastage: 0.5, adjustment: 0, reserved: 1 },
  { branchId: 'UTG-KHI-001', ingredientId: 'ING_SPICES', opening: 28, received: 12, consumed: 11, wastage: 0.2, adjustment: 0, reserved: 1 },
  { branchId: 'UTG-KHI-001', ingredientId: 'ING_BUNS', opening: 110, received: 60, consumed: 58, wastage: 4, adjustment: 0, reserved: 8 },
  { branchId: 'UTG-KHI-001', ingredientId: 'ING_PITA', opening: 95, received: 50, consumed: 44, wastage: 3, adjustment: 0, reserved: 6 },
  { branchId: 'UTG-KHI-001', ingredientId: 'ING_SUGAR', opening: 35, received: 20, consumed: 18, wastage: 0.5, adjustment: 0, reserved: 2 },
  { branchId: 'UTG-KHI-001', ingredientId: 'ING_TEA', opening: 18, received: 10, consumed: 9, wastage: 0.2, adjustment: 0, reserved: 1 },

  // UTG-KHI-002 (Gulshan-e-Iqbal)
  { branchId: 'UTG-KHI-002', ingredientId: 'ING_CHK', opening: 85, received: 45, consumed: 40, wastage: 3, adjustment: 0, reserved: 6 },
  { branchId: 'UTG-KHI-002', ingredientId: 'ING_MUT', opening: 32, received: 20, consumed: 18, wastage: 1, adjustment: 0, reserved: 3 },
  { branchId: 'UTG-KHI-002', ingredientId: 'ING_BEEF', opening: 35, received: 20, consumed: 19, wastage: 1.5, adjustment: 0, reserved: 3 },
  { branchId: 'UTG-KHI-002', ingredientId: 'ING_RICE', opening: 95, received: 50, consumed: 48, wastage: 2, adjustment: 0, reserved: 8 },
  { branchId: 'UTG-KHI-002', ingredientId: 'ING_MAIDA', opening: 110, received: 60, consumed: 55, wastage: 3, adjustment: 0, reserved: 10 },
  { branchId: 'UTG-KHI-002', ingredientId: 'ING_TOM', opening: 65, received: 35, consumed: 38, wastage: 3, adjustment: 0, reserved: 5 },
  { branchId: 'UTG-KHI-002', ingredientId: 'ING_ONION', opening: 75, received: 40, consumed: 44, wastage: 2.5, adjustment: 0, reserved: 6 },
  { branchId: 'UTG-KHI-002', ingredientId: 'ING_GINGER_GARLIC', opening: 26, received: 15, consumed: 13, wastage: 0.5, adjustment: 0, reserved: 2 },
  { branchId: 'UTG-KHI-002', ingredientId: 'ING_POTATO', opening: 55, received: 30, consumed: 32, wastage: 1.5, adjustment: 0, reserved: 4 },
  { branchId: 'UTG-KHI-002', ingredientId: 'ING_OIL', opening: 85, received: 45, consumed: 46, wastage: 2, adjustment: 0, reserved: 6 },
  { branchId: 'UTG-KHI-002', ingredientId: 'ING_GHEE', opening: 28, received: 15, consumed: 14, wastage: 0.8, adjustment: 0, reserved: 2 },
  { branchId: 'UTG-KHI-002', ingredientId: 'ING_CREAM_MILK', opening: 55, received: 30, consumed: 31, wastage: 1.5, adjustment: 0, reserved: 5 },
  { branchId: 'UTG-KHI-002', ingredientId: 'ING_YOGURT', opening: 46, received: 25, consumed: 28, wastage: 1.2, adjustment: 0, reserved: 4 },
  { branchId: 'UTG-KHI-002', ingredientId: 'ING_MOZZ', opening: 38, received: 20, consumed: 21, wastage: 1, adjustment: 0, reserved: 3 },
  { branchId: 'UTG-KHI-002', ingredientId: 'ING_PANEER', opening: 22, received: 12, consumed: 11, wastage: 0.5, adjustment: 0, reserved: 2 },
  { branchId: 'UTG-KHI-002', ingredientId: 'ING_SPICES', opening: 32, received: 15, consumed: 14, wastage: 0.3, adjustment: 0, reserved: 2 },
  { branchId: 'UTG-KHI-002', ingredientId: 'ING_BUNS', opening: 140, received: 70, consumed: 72, wastage: 5, adjustment: 0, reserved: 12 },
  { branchId: 'UTG-KHI-002', ingredientId: 'ING_PITA', opening: 110, received: 60, consumed: 58, wastage: 4, adjustment: 0, reserved: 8 },
  { branchId: 'UTG-KHI-002', ingredientId: 'ING_SUGAR', opening: 42, received: 25, consumed: 24, wastage: 0.8, adjustment: 0, reserved: 3 },
  { branchId: 'UTG-KHI-002', ingredientId: 'ING_TEA', opening: 22, received: 12, consumed: 11, wastage: 0.3, adjustment: 0, reserved: 2 }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // 1. Pakistani Cuisine (MENU001 - MENU008)
  {
    id: 'MENU001',
    code: 'PK-01',
    name: 'Desi Chicken Karahi',
    urduName: 'دیسی چکن کڑاہی',
    category: 'Pakistani cuisine',
    description: 'Traditional wok-tossed chicken cooked in ripe tomatoes, green chillies, ginger juliennes and freshly crushed black pepper.',
    price: 1450,
    isVeg: false,
    isSpicy: true,
    spiceLevel: 2,
    prepTimeMinutes: 25,
    allergens: ['Dairy (optional ghee)', 'Poultry'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    isRecommended: true,
    recipeId: 'REC_001',
    hasVerifiedRecipe: true,
    tags: ['Bestseller', 'Chef Special', 'Karachi Classic'],
    variants: [
      { id: 'v1', name: 'Half (0.5 kg)', priceDelta: 0, portionMultiplier: 0.5 },
      { id: 'v2', name: 'Full (1.0 kg)', priceDelta: 950, portionMultiplier: 1.0 }
    ],
    addons: [
      { id: 'a1', name: 'Desi Makhan / Butter Dollop', price: 90 },
      { id: 'a2', name: 'Extra Ginger & Green Chilli Garnish', price: 40 }
    ]
  },
  {
    id: 'MENU002',
    code: 'PK-02',
    name: 'Shinwari Mutton Karahi',
    urduName: 'شنواری مٹن کڑاہی',
    category: 'Pakistani cuisine',
    description: 'Pure Khyber-style succulent mutton simmered gently in lamb fat & sea salt with fresh red tomatoes and whole green chillies.',
    price: 2800,
    isVeg: false,
    isSpicy: true,
    spiceLevel: 2,
    prepTimeMinutes: 35,
    allergens: ['Red Meat', 'Desi Ghee'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1545247181-516773cae7be?auto=format&fit=crop&w=800&q=80',
    isRecommended: true,
    recipeId: 'REC_002',
    hasVerifiedRecipe: true,
    tags: ['Royal Taste', 'Shinwari Style'],
    variants: [
      { id: 'v1', name: 'Half (0.5 kg)', priceDelta: 0, portionMultiplier: 0.5 },
      { id: 'v2', name: 'Full (1.0 kg)', priceDelta: 2150, portionMultiplier: 1.0 }
    ]
  },
  {
    id: 'MENU003',
    code: 'PK-03',
    name: 'Chicken White Handi (Boneless)',
    urduName: 'چکن وائٹ ہانڈی بون لیس',
    category: 'Pakistani cuisine',
    description: 'Silky boneless chicken cubes slow-cooked in a rich blend of heavy dairy cream, fresh yogurt, white pepper and cashews.',
    price: 1650,
    isVeg: false,
    isSpicy: false,
    spiceLevel: 1,
    prepTimeMinutes: 20,
    allergens: ['Dairy', 'Cashews/Nuts'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
    isRecommended: true,
    recipeId: 'REC_003',
    hasVerifiedRecipe: true,
    tags: ['Mild & Creamy', 'Family Favorite'],
    variants: [
      { id: 'v1', name: 'Regular Handi', priceDelta: 0, portionMultiplier: 1.0 },
      { id: 'v2', name: 'Large Handi', priceDelta: 800, portionMultiplier: 1.5 }
    ]
  },
  {
    id: 'MENU004',
    code: 'PK-04',
    name: 'Chicken Makhni Handi',
    urduName: 'چکن مکھنی ہانڈی',
    category: 'Pakistani cuisine',
    description: 'Boneless tender chicken infused with velvety tomato gravy, aromatic fenugreek leaves (kasuri methi) and whipped dairy butter.',
    price: 1690,
    isVeg: false,
    isSpicy: false,
    spiceLevel: 1,
    prepTimeMinutes: 22,
    allergens: ['Dairy', 'Poultry'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
    recipeId: 'REC_004',
    hasVerifiedRecipe: true,
    tags: ['Butter Gravy', 'Mughlai']
  },
  {
    id: 'MENU005',
    code: 'PK-05',
    name: 'UTG Special Chicken Biryani',
    urduName: 'یو ٹی جی اسپیشل چکن بریانی',
    category: 'Pakistani cuisine',
    description: 'Fragrant aged Kainat Basmati rice layered with spiced marinated chicken, saffron milk, caramelized onions, and aloo bukhara.',
    price: 650,
    isVeg: false,
    isSpicy: true,
    spiceLevel: 2,
    prepTimeMinutes: 15,
    allergens: ['Poultry', 'Dairy'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    isRecommended: true,
    recipeId: 'REC_005',
    hasVerifiedRecipe: true,
    tags: ['Karachi Soul Food', 'Daily Fresh Batch'],
    variants: [
      { id: 'v1', name: 'Single Plate (1 pc Chicken + Aloo)', priceDelta: 0, portionMultiplier: 1.0 },
      { id: 'v2', name: 'Double Plate (2 pcs Chicken + Aloo)', priceDelta: 280, portionMultiplier: 1.5 }
    ],
    addons: [
      { id: 'a1', name: 'Zeera Mint Raita', price: 80 },
      { id: 'a2', name: 'Kachumber Salad Bowl', price: 70 }
    ]
  },
  {
    id: 'MENU006',
    code: 'PK-06',
    name: 'Dum Pukht Mutton Pulao',
    urduName: 'دم پخت مٹن پلاؤ',
    category: 'Pakistani cuisine',
    description: 'Slow-steamed Bannu style mutton broth pulao featuring melt-in-the-mouth mutton cuts, whole cardamoms and fried sultanas.',
    price: 980,
    isVeg: false,
    isSpicy: false,
    spiceLevel: 1,
    prepTimeMinutes: 20,
    allergens: ['Red Meat'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80',
    recipeId: 'REC_006',
    hasVerifiedRecipe: true,
    tags: ['Bannu Style', 'Aromatic Yakhni']
  },
  {
    id: 'MENU007',
    code: 'PK-07',
    name: 'Shahi Daal Makhni / Tarka',
    urduName: 'شاہی دال مکھنی / تڑکا',
    category: 'Pakistani cuisine',
    description: 'Black lentils slow cooked overnight on charcoal embers, tempered with golden garlic, cumin seeds, and fresh dairy cream.',
    price: 550,
    isVeg: true,
    isSpicy: false,
    spiceLevel: 1,
    prepTimeMinutes: 15,
    allergens: ['Dairy'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    recipeId: 'REC_007',
    hasVerifiedRecipe: true,
    tags: ['Vegetarian Choice', 'Comfort Food']
  },
  {
    id: 'MENU008',
    code: 'PK-08',
    name: 'Paneer Reshmi Karahi',
    urduName: 'پنیر ریشمی کڑاہی',
    category: 'Pakistani cuisine',
    description: 'House-made fresh cottage cheese cubes tossed with roasted bell peppers, tomatoes, crushed coriander seeds and light cream.',
    price: 1250,
    isVeg: true,
    isSpicy: true,
    spiceLevel: 2,
    prepTimeMinutes: 20,
    allergens: ['Dairy (Paneer)'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1567184109411-b28f2bafb97b?auto=format&fit=crop&w=800&q=80',
    recipeId: 'REC_008',
    hasVerifiedRecipe: true,
    tags: ['Vegetarian Choice', 'Rich Gravy']
  },

  // 2. BBQ & Grills (MENU009 - MENU014)
  {
    id: 'MENU009',
    code: 'BBQ-01',
    name: 'Charcoal Chicken Tikka',
    urduName: 'کوئلہ چکن تکہ',
    category: 'BBQ & grills',
    description: 'Quarter chicken cut skewered and barbecued over glowing babul charcoal, marinated in lemon juice, raw papaya and Karachi red spices.',
    price: 580,
    isVeg: false,
    isSpicy: true,
    spiceLevel: 3,
    prepTimeMinutes: 25,
    allergens: ['Poultry', 'Yogurt'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    isRecommended: true,
    recipeId: 'REC_009',
    hasVerifiedRecipe: true,
    tags: ['Smoky BBQ', 'Hot & Tangy'],
    variants: [
      { id: 'v1', name: 'Breast (Chest) Piece', priceDelta: 0, portionMultiplier: 1.0 },
      { id: 'v2', name: 'Thigh (Leg) Piece', priceDelta: -20, portionMultiplier: 1.0 }
    ]
  },
  {
    id: 'MENU010',
    code: 'BBQ-02',
    name: 'Chicken Malai Boti',
    urduName: 'چکن ملائی بوٹی',
    category: 'BBQ & grills',
    description: 'Boneless chicken breast nuggets steeped in thick dairy cream, green chillies, cardamom powder and roasted cumin, grilled to silky tenderness.',
    price: 890,
    isVeg: false,
    isSpicy: false,
    spiceLevel: 1,
    prepTimeMinutes: 22,
    allergens: ['Dairy', 'Poultry'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    isRecommended: true,
    recipeId: 'REC_010',
    hasVerifiedRecipe: true,
    tags: ['Tender & Creamy', 'Kid Friendly']
  },
  {
    id: 'MENU011',
    code: 'BBQ-03',
    name: 'Royal Beef Seekh Kabab',
    urduName: 'شاہی بیف سیخ کباب',
    category: 'BBQ & grills',
    description: 'Fine beef mince blended with marrow fat, brown onion paste, ginger, mint, roasted chickpea flour, char-grilled on flat skewers (4 pcs).',
    price: 950,
    isVeg: false,
    isSpicy: true,
    spiceLevel: 2,
    prepTimeMinutes: 20,
    allergens: ['Red Meat'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=800&q=80',
    recipeId: 'REC_011',
    hasVerifiedRecipe: true,
    tags: ['Burns Road Classic', '4 Skewers']
  },
  {
    id: 'MENU012',
    code: 'BBQ-04',
    name: 'Chicken Reshmi Kabab',
    urduName: 'چکن ریشمی کباب',
    category: 'BBQ & grills',
    description: 'Feather-soft minced chicken skewers flavored with chopped coriander, white pepper, melted butter and mild green chillies (4 pcs).',
    price: 880,
    isVeg: false,
    isSpicy: false,
    spiceLevel: 1,
    prepTimeMinutes: 20,
    allergens: ['Poultry', 'Dairy'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    recipeId: 'REC_012',
    hasVerifiedRecipe: true,
    tags: ['Melt in Mouth', 'Family Favorite']
  },
  {
    id: 'MENU013',
    code: 'BBQ-05',
    name: 'UTG Grand BBQ Platter',
    urduName: 'یو ٹی جی گرینڈ بی بی کیو پلیٹر',
    category: 'BBQ & grills',
    description: 'Feast for 4-5 people: 1 Chest Tikka, 1 Leg Tikka, 8 pcs Malai Boti, 4 Beef Seekh Kababs, 4 Reshmi Kababs, 4 Roghani Naan, Raita & Salad.',
    price: 3850,
    isVeg: false,
    isSpicy: true,
    spiceLevel: 2,
    prepTimeMinutes: 30,
    allergens: ['Poultry', 'Red Meat', 'Dairy', 'Gluten'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80',
    isRecommended: true,
    recipeId: 'REC_013',
    hasVerifiedRecipe: true,
    tags: ['Mega Feast', 'Serves 4-5', 'Best Value']
  },
  {
    id: 'MENU014',
    code: 'BBQ-06',
    name: 'Chicken Bihari Boti',
    urduName: 'چکن بہاری بوٹی',
    category: 'BBQ & grills',
    description: 'Thin chicken ribbons marinated in raw papaya paste, roasted mustard oil, fried onions and homemade garam masala, smoked to perfection.',
    price: 920,
    isVeg: false,
    isSpicy: true,
    spiceLevel: 3,
    prepTimeMinutes: 22,
    allergens: ['Poultry', 'Mustard'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
    recipeId: 'REC_014',
    hasVerifiedRecipe: true,
    tags: ['Fiery Spiced', 'Bihari Marinade']
  },

  // 3. Burgers & Fast Food (MENU015 - MENU020)
  {
    id: 'MENU015',
    code: 'FF-01',
    name: 'Classic Zinger Crunch Burger',
    urduName: 'کلاسک زنگر کرینچ برگر',
    category: 'Burgers & fast food',
    description: 'Whole crispy fried chicken fillet double-dredged in seasoned batter, iceberg lettuce, signature garlic mayo on a butter-toasted brioche bun. Served with fries.',
    price: 620,
    isVeg: false,
    isSpicy: true,
    spiceLevel: 2,
    prepTimeMinutes: 15,
    allergens: ['Gluten', 'Eggs', 'Poultry'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    isRecommended: true,
    recipeId: 'REC_015',
    hasVerifiedRecipe: true,
    tags: ['Crispy Crust', 'Fries Included'],
    addons: [
      { id: 'a1', name: 'Extra Cheddar Cheese Slice', price: 90 },
      { id: 'a2', name: 'Jalapeño & Peri Drizzle', price: 60 }
    ]
  },
  {
    id: 'MENU016',
    code: 'FF-02',
    name: 'Royal Beef Smash Burger',
    urduName: 'رائل بیف سمیش برگر',
    category: 'Burgers & fast food',
    description: 'Two 100% prime beef patties smashed sizzling hot on the flat-top, melted cheddar, caramelized onions, pickle relish, and house truffle sauce.',
    price: 850,
    isVeg: false,
    isSpicy: false,
    spiceLevel: 1,
    prepTimeMinutes: 18,
    allergens: ['Gluten', 'Dairy', 'Red Meat'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    recipeId: 'REC_016',
    hasVerifiedRecipe: true,
    tags: ['Double Patty', 'Gourmet Beef']
  },
  {
    id: 'MENU017',
    code: 'FF-03',
    name: 'UTG Club Sandwich',
    urduName: 'یو ٹی جی کلب سینڈوچ',
    category: 'Burgers & fast food',
    description: 'Triple-decker toasted sandwich stacked with pulled roasted chicken, fried egg, sliced cheese, fresh tomatoes, cucumbers and coleslaw. Served with fries.',
    price: 680,
    isVeg: false,
    isSpicy: false,
    spiceLevel: 1,
    prepTimeMinutes: 15,
    allergens: ['Gluten', 'Eggs', 'Dairy', 'Poultry'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    recipeId: 'REC_017',
    hasVerifiedRecipe: true,
    tags: ['Triple Decker', 'Comfort Classic']
  },
  {
    id: 'MENU018',
    code: 'FF-04',
    name: 'Charcoal Chicken Shawarma Roll',
    urduName: 'چارکول چکن شوارما رول',
    category: 'Burgers & fast food',
    description: 'Spit-roasted chicken slivers folded into fresh handmade pita bread, pickled cucumbers, crispy fries and Lebanese toum (garlic sauce).',
    price: 420,
    isVeg: false,
    isSpicy: false,
    spiceLevel: 1,
    prepTimeMinutes: 12,
    allergens: ['Gluten', 'Poultry'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80',
    recipeId: 'REC_018',
    hasVerifiedRecipe: true,
    tags: ['Street Wrap', 'Authentic Garlic Mayo']
  },
  {
    id: 'MENU019',
    code: 'FF-05',
    name: 'Spicy Loaded Peri Fries',
    urduName: 'اسپائسی لوڈڈ پیری فرائز',
    category: 'Burgers & fast food',
    description: 'Crispy skin-on potato fries dusted with peri-peri seasoning, topped with warm melted mozzarella cheese sauce, chopped jalapeños and mayo.',
    price: 480,
    isVeg: true,
    isSpicy: true,
    spiceLevel: 2,
    prepTimeMinutes: 12,
    allergens: ['Dairy'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
    recipeId: 'REC_019',
    hasVerifiedRecipe: true,
    tags: ['Cheesy Fries', 'Snack Platter']
  },
  {
    id: 'MENU020',
    code: 'FF-06',
    name: 'Crispy Chicken Tenders & Nuggets',
    urduName: 'کرسپی چکن ٹینڈرز اینڈ نگٹس',
    category: 'Burgers & fast food',
    description: 'Six pieces of golden fried panko-crusted chicken tenders, served with honey mustard and smoky BBQ dipping sauces.',
    price: 450,
    isVeg: false,
    isSpicy: false,
    spiceLevel: 1,
    prepTimeMinutes: 12,
    allergens: ['Gluten', 'Poultry'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    recipeId: 'REC_020',
    hasVerifiedRecipe: true,
    tags: ['Finger Food', 'Kids Choice']
  },

  // 4. Pizza & Pasta (MENU021 - MENU024)
  {
    id: 'MENU021',
    code: 'PZ-01',
    name: 'Chicken Fajita Stone Pizza',
    urduName: 'چکن فجیتا اسٹون پیزا',
    category: 'Pizza & pasta',
    description: 'Tandoori-stone baked pizza crust, spiced Mexican-Pakistani fajita chicken chunks, capsicums, red onions, black olives and stretchy mozzarella.',
    price: 1290,
    isVeg: false,
    isSpicy: true,
    spiceLevel: 2,
    prepTimeMinutes: 20,
    allergens: ['Gluten', 'Dairy', 'Poultry'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    recipeId: 'REC_021',
    hasVerifiedRecipe: true,
    tags: ['Karachi Style Pizza', 'Cheesy Crust'],
    variants: [
      { id: 'v1', name: 'Medium (10 inch)', priceDelta: 0, portionMultiplier: 1.0 },
      { id: 'v2', name: 'Large (13 inch)', priceDelta: 600, portionMultiplier: 1.5 }
    ]
  },
  {
    id: 'MENU022',
    code: 'PZ-02',
    name: 'Smoky BBQ Feast Pizza',
    urduName: 'سموکی بی بی کیو پیزا',
    category: 'Pizza & pasta',
    description: 'BBQ marinated chicken tikka cuts, smoked barbecue glaze sauce swirl, golden corn, purple onions and double mozzarella cheese.',
    price: 1350,
    isVeg: false,
    isSpicy: true,
    spiceLevel: 2,
    prepTimeMinutes: 20,
    allergens: ['Gluten', 'Dairy', 'Poultry'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    recipeId: 'REC_022',
    hasVerifiedRecipe: true,
    tags: ['Smoky Glaze', 'Loaded Toppings'],
    variants: [
      { id: 'v1', name: 'Medium (10 inch)', priceDelta: 0, portionMultiplier: 1.0 },
      { id: 'v2', name: 'Large (13 inch)', priceDelta: 600, portionMultiplier: 1.5 }
    ]
  },
  {
    id: 'MENU023',
    code: 'PZ-03',
    name: 'Creamy Fettuccine Alfredo',
    urduName: 'کیمی فیتوچینی الفریڈو پاستا',
    category: 'Pizza & pasta',
    description: 'Al dente fettuccine pasta tossed in a luxurious parmesan cream sauce, roasted garlic butter and sliced grilled chicken breast.',
    price: 1150,
    isVeg: false,
    isSpicy: false,
    spiceLevel: 1,
    prepTimeMinutes: 18,
    allergens: ['Gluten', 'Dairy', 'Poultry'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80',
    recipeId: 'REC_023',
    hasVerifiedRecipe: true,
    tags: ['Rich Parmesan', 'Italian Continental']
  },
  {
    id: 'MENU024',
    code: 'PZ-04',
    name: 'Penne Arrabbiata (Spicy)',
    urduName: 'پینے ارابیاتا پاستا',
    category: 'Pizza & pasta',
    description: 'Tubular penne pasta cooked in a fiery San Marzano tomato sauce infused with bird-eye chillies, fresh basil, and extra virgin olive oil.',
    price: 980,
    isVeg: true,
    isSpicy: true,
    spiceLevel: 2,
    prepTimeMinutes: 16,
    allergens: ['Gluten'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281781?auto=format&fit=crop&w=800&q=80',
    recipeId: 'REC_024',
    hasVerifiedRecipe: true,
    tags: ['Vegetarian Choice', 'Tangy & Spicy']
  },

  // 5. Chinese & Continental (MENU025 - MENU028)
  {
    id: 'MENU025',
    code: 'CH-01',
    name: 'Wok tossed Chicken Chow Mein',
    urduName: 'چکن چاؤمین',
    category: 'Chinese & continental',
    description: 'Thin egg noodles flash-fried with shredded chicken, crunchy cabbage, julienned carrots, scallions and dark soy sesame seasoning.',
    price: 890,
    isVeg: false,
    isSpicy: false,
    spiceLevel: 1,
    prepTimeMinutes: 18,
    allergens: ['Gluten', 'Eggs', 'Soy', 'Poultry'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
    recipeId: 'REC_025',
    hasVerifiedRecipe: true,
    tags: ['Desi Chinese', 'Wok Hei']
  },
  {
    id: 'MENU026',
    code: 'CH-02',
    name: 'Special Egg Fried Rice',
    urduName: 'اسپیشل ایگ فرائیڈ رائس',
    category: 'Chinese & continental',
    description: 'Fluffy long grain rice wok-tossed with scrambled farm eggs, spring onions, white pepper and light soy.',
    price: 650,
    isVeg: false,
    isSpicy: false,
    spiceLevel: 1,
    prepTimeMinutes: 15,
    allergens: ['Eggs', 'Soy'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    recipeId: 'REC_026',
    hasVerifiedRecipe: true,
    tags: ['Wok Classics', 'Perfect Pair']
  },
  {
    id: 'MENU027',
    code: 'CH-03',
    name: 'Chicken Manchurian Gravy',
    urduName: 'چکن منچورین گریوی',
    category: 'Chinese & continental',
    description: 'Crispy batter-fried chicken bites bathed in a sweet, sour and spicy red garlic glaze with sliced capsicum and onions.',
    price: 980,
    isVeg: false,
    isSpicy: true,
    spiceLevel: 2,
    prepTimeMinutes: 20,
    allergens: ['Poultry', 'Soy'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80',
    recipeId: 'REC_027',
    hasVerifiedRecipe: true,
    tags: ['Sweet & Tangy', 'Best with Fried Rice']
  },
  {
    id: 'MENU028',
    code: 'CH-04',
    name: 'Grilled Chicken Steak (Mushroom Sauce)',
    urduName: 'گرلڈ چکن اسٹیک مشروم ساس',
    category: 'Chinese & continental',
    description: 'Twin charcoal-grilled chicken breasts served on a sizzling hot iron plate with rich creamy button mushroom sauce, sautéed vegetables and mashed potatoes.',
    price: 1490,
    isVeg: false,
    isSpicy: false,
    spiceLevel: 1,
    prepTimeMinutes: 25,
    allergens: ['Poultry', 'Dairy'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    recipeId: 'REC_028',
    hasVerifiedRecipe: true,
    tags: ['Sizzling Sensation', 'Continental Cut']
  },

  // 6. Breakfast (MENU029 - MENU030)
  {
    id: 'MENU029',
    code: 'BK-01',
    name: 'Traditional Halwa Puri Thali',
    urduName: 'روایتی حلوہ پوری تھالی',
    category: 'Breakfast',
    description: 'Karachi Sunday morning special: 2 piping hot puffed puris, spicy tarkari chana, methi aloo bhujia, sweet suji halwa, and mixed pickle.',
    price: 450,
    isVeg: true,
    isSpicy: true,
    spiceLevel: 2,
    prepTimeMinutes: 12,
    allergens: ['Gluten', 'Semolina'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    isRecommended: true,
    recipeId: 'REC_029',
    hasVerifiedRecipe: true,
    tags: ['Karachi Breakfast Staple', 'Served Fresh']
  },
  {
    id: 'MENU030',
    code: 'BK-02',
    name: 'Lacha Anda Paratha Roll',
    urduName: 'لچھے دار انڈا پراٹھا رول',
    category: 'Breakfast',
    description: 'Crispy layered flaky paratha fried in desi ghee, rolled with a fluffy herb omelette, sliced red onions and tangy green mint chutney.',
    price: 320,
    isVeg: false,
    isSpicy: false,
    spiceLevel: 1,
    prepTimeMinutes: 10,
    allergens: ['Gluten', 'Eggs', 'Dairy'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    recipeId: 'REC_030',
    hasVerifiedRecipe: true,
    tags: ['Crispy Layers', 'Grab & Go']
  },

  // 7. Desserts & Drinks (MENU031 - MENU032)
  {
    id: 'MENU031',
    code: 'DS-01',
    name: 'Hot Gulab Jamun with Sheera (2 pcs)',
    urduName: 'گرم گلاب جامن شیرے دار',
    category: 'Desserts & drinks',
    description: 'Golden fried khoya dumplings soaked in fragrant cardamom & saffron sugar syrup, served warm with slivered almonds.',
    price: 260,
    isVeg: true,
    isSpicy: false,
    spiceLevel: 1,
    prepTimeMinutes: 8,
    allergens: ['Dairy (Khoya)', 'Gluten', 'Almonds'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    recipeId: 'REC_031',
    hasVerifiedRecipe: true,
    tags: ['Warm Dessert', 'Sweet Finish']
  },
  {
    id: 'MENU032',
    code: 'DS-02',
    name: 'Shahi Matka Kheer',
    urduName: 'شاہی مٹکا کھیر',
    category: 'Desserts & drinks',
    description: 'Traditional slow-reduced milk and crushed rice pudding set in chilled clay earthen pots, infused with kewra water and crushed pistachios.',
    price: 320,
    isVeg: true,
    isSpicy: false,
    spiceLevel: 1,
    prepTimeMinutes: 5,
    allergens: ['Dairy', 'Pistachios'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    recipeId: 'REC_032',
    hasVerifiedRecipe: true,
    tags: ['Clay Pot Chilled', 'Traditional']
  },

  // CATALOG-ONLY EXPANSION ITEMS (MENU033 onward: hasVerifiedRecipe = false as stated in prompt)
  {
    id: 'MENU033',
    code: 'DS-03',
    name: 'Sizzling Brownie with Vanilla Ice Cream',
    urduName: 'سزلنگ براؤنی آئس کریم',
    category: 'Desserts & drinks',
    description: 'Warm fudgy chocolate walnut brownie on a sizzling iron pan, topped with premium vanilla gelato and hot Belgian chocolate drizzle.',
    price: 550,
    isVeg: true,
    isSpicy: false,
    spiceLevel: 1,
    prepTimeMinutes: 10,
    allergens: ['Dairy', 'Gluten', 'Nuts'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    hasVerifiedRecipe: false, // Catalog only as per specification
    tags: ['Catalog Item', 'Chocolate Lover']
  },
  {
    id: 'MENU034',
    code: 'DR-01',
    name: 'Traditional Sweet Mango Lassi',
    urduName: 'روایتی میٹھی مینگو لسی',
    category: 'Desserts & drinks',
    description: 'Chilled creamy yogurt smoothie blended with ripe Sindhri mango pulp, crushed ice and a touch of cardamoms.',
    price: 340,
    isVeg: true,
    isSpicy: false,
    spiceLevel: 1,
    prepTimeMinutes: 5,
    allergens: ['Dairy'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80',
    hasVerifiedRecipe: false,
    tags: ['Summer Drink', 'Refreshing']
  },
  {
    id: 'MENU035',
    code: 'DR-02',
    name: 'Fresh Mint Lemonade',
    urduName: 'فریش منٹ لیمونیڈ',
    category: 'Desserts & drinks',
    description: 'Freshly squeezed Karachi lemons, crushed garden mint leaves, Himalayan black salt and sparkling club soda.',
    price: 280,
    isVeg: true,
    isSpicy: false,
    spiceLevel: 1,
    prepTimeMinutes: 5,
    allergens: [],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    hasVerifiedRecipe: false,
    tags: ['Digestive', 'Cooling']
  },
  {
    id: 'MENU036',
    code: 'DR-03',
    name: 'Doodh Patti Karak Chai',
    urduName: 'دودھ پتی کڑک چائے',
    category: 'Desserts & drinks',
    description: 'Slow-brewed pure whole buffalo milk infused with roasted Kenyan CTC tea leaves and crushed green cardamoms.',
    price: 160,
    isVeg: true,
    isSpicy: false,
    spiceLevel: 1,
    prepTimeMinutes: 6,
    allergens: ['Dairy'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    hasVerifiedRecipe: false,
    tags: ['24/7 Chai', 'Dhaba Style']
  },
  {
    id: 'MENU037',
    code: 'SD-01',
    name: 'Garlic Butter Roghani Naan',
    urduName: 'گارلک بٹر روغنی نان',
    category: 'Pakistani cuisine',
    description: 'Fluffy tandoori bread brushed with melted butter, roasted garlic mince and toasted sesame seeds.',
    price: 120,
    isVeg: true,
    isSpicy: false,
    spiceLevel: 1,
    prepTimeMinutes: 8,
    allergens: ['Gluten', 'Dairy', 'Sesame'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80',
    hasVerifiedRecipe: false,
    tags: ['Fresh From Tandoor']
  },

  // 8. Deals & Combos (Approved for demonstration)
  {
    id: 'DEAL001',
    code: 'DEAL-01',
    name: 'Karachi Dawat Feast (Family of 4)',
    urduName: 'کراچی دعوت فیسٹ',
    category: 'Deals & Combos',
    description: '1 Full Desi Chicken Karahi, 4 Garlic Roghani Naans, 1 Pitcher Fresh Mint Lemonade, 4 Hot Gulab Jamun. Best seller for families.',
    price: 3150,
    originalPrice: 3570,
    isVeg: false,
    isSpicy: true,
    spiceLevel: 2,
    prepTimeMinutes: 25,
    allergens: ['Dairy', 'Poultry', 'Gluten'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    isRecommended: true,
    hasVerifiedRecipe: false,
    tags: ['Special Combo', 'Save PKR 420']
  },
  {
    id: 'DEAL002',
    code: 'DEAL-02',
    name: 'Midnight BBQ Craver (For 2)',
    urduName: 'مڈنائٹ بی بی کیو کریور',
    category: 'Deals & Combos',
    description: '1 Chicken Malai Boti Skewer, 4 Beef Seekh Kababs, 2 Roghani Naan, Zeera Raita and 2 Chilled Soft Drinks. 24/7 night deal.',
    price: 2190,
    originalPrice: 2450,
    isVeg: false,
    isSpicy: true,
    spiceLevel: 2,
    prepTimeMinutes: 22,
    allergens: ['Poultry', 'Red Meat', 'Dairy', 'Gluten'],
    branchAvailability: { 'UTG-KHI-001': true, 'UTG-KHI-002': true },
    imageUrl: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80',
    isRecommended: true,
    hasVerifiedRecipe: false,
    tags: ['Late Night Special', 'Save PKR 260']
  }
];

// Generate exact 42 tables according to the brief:
// PECHS: 18 tables (8 four-person, 6 two-person, 4 seven-person)
// Gulshan: 24 tables (8 two-person, 10 four-person, 4 nine-person, 2 ten-person)
export function generateInitialTables(): RestaurantTable[] {
  const tables: RestaurantTable[] = [];

  // PECHS (18 tables)
  // 8 four-person: T01 - T08
  for (let i = 1; i <= 8; i++) {
    tables.push({
      id: `P-T0${i}`,
      branchId: 'UTG-KHI-001',
      tableNumber: `Table P-${i < 10 ? '0' + i : i}`,
      capacity: 4,
      type: '4-person',
      section: i <= 4 ? 'Family Hall' : 'Executive Dining',
      status: i === 2 ? 'occupied' : i === 5 ? 'reserved' : 'available'
    });
  }
  // 6 two-person: T09 - T14
  for (let i = 9; i <= 14; i++) {
    tables.push({
      id: `P-T${i}`,
      branchId: 'UTG-KHI-001',
      tableNumber: `Table P-${i}`,
      capacity: 2,
      type: '2-person',
      section: 'Courtyard Tandoor',
      status: i === 10 ? 'occupied' : 'available'
    });
  }
  // 4 seven-person: T15 - T18
  for (let i = 15; i <= 18; i++) {
    tables.push({
      id: `P-T${i}`,
      branchId: 'UTG-KHI-001',
      tableNumber: `Table P-${i}`,
      capacity: 7,
      type: '7-person',
      section: 'Family Hall',
      status: i === 16 ? 'reserved' : 'available'
    });
  }

  // Gulshan-e-Iqbal (24 tables)
  // 8 two-person: G01 - G08
  for (let i = 1; i <= 8; i++) {
    tables.push({
      id: `G-T0${i}`,
      branchId: 'UTG-KHI-002',
      tableNumber: `Table G-${i < 10 ? '0' + i : i}`,
      capacity: 2,
      type: '2-person',
      section: 'Executive Dining',
      status: i === 3 ? 'occupied' : 'available'
    });
  }
  // 10 four-person: G09 - G18
  for (let i = 9; i <= 18; i++) {
    tables.push({
      id: `G-T${i}`,
      branchId: 'UTG-KHI-002',
      tableNumber: `Table G-${i}`,
      capacity: 4,
      type: '4-person',
      section: 'Family Hall',
      status: i === 11 ? 'occupied' : i === 14 ? 'reserved' : 'available'
    });
  }
  // 4 nine-person: G19 - G22
  for (let i = 19; i <= 22; i++) {
    tables.push({
      id: `G-T${i}`,
      branchId: 'UTG-KHI-002',
      tableNumber: `Table G-${i}`,
      capacity: 9,
      type: '9-person',
      section: 'Group Banquet',
      status: i === 20 ? 'reserved' : 'available'
    });
  }
  // 2 ten-person: G23 - G24
  for (let i = 23; i <= 24; i++) {
    tables.push({
      id: `G-T${i}`,
      branchId: 'UTG-KHI-002',
      tableNumber: `Table G-${i}`,
      capacity: 10,
      type: '10-person',
      section: 'Group Banquet',
      status: 'available'
    });
  }

  return tables;
}

export const INITIAL_ORDERS: RestaurantOrder[] = [
  {
    id: 'ORD-1041',
    orderNumber: 'UTG-1041',
    branchId: 'UTG-KHI-001',
    channel: 'ai_assistant',
    fulfillment: 'delivery',
    status: 'preparing',
    items: [
      {
        menuItem: INITIAL_MENU_ITEMS[0], // Chicken Karahi
        quantity: 1,
        selectedVariant: INITIAL_MENU_ITEMS[0].variants?.[1], // Full
        calculatedPrice: 2400
      },
      {
        menuItem: INITIAL_MENU_ITEMS[4], // Biryani
        quantity: 2,
        calculatedPrice: 1300
      }
    ],
    subtotal: 3700,
    discountAmount: 370,
    discountReason: 'Bank Card 10% Off (HBL)',
    deliveryFee: 150,
    total: 3480,
    paymentMethod: 'bank_card',
    bankName: 'Habib Bank Limited (HBL)',
    customerName: 'Zubair Farooqi',
    customerPhone: '+92 300 8291044',
    deliveryAddress: 'House 44-B, Block 2, PECHS, Karachi',
    isPreOrder: false,
    createdAt: new Date(Date.now() - 18 * 60000).toISOString(),
    estimatedReadyTime: '12 mins remaining',
    notes: 'Please send extra mint chutney and tender meat cuts.'
  },
  {
    id: 'ORD-1042',
    orderNumber: 'UTG-1042',
    branchId: 'UTG-KHI-002',
    channel: 'dine_in',
    fulfillment: 'dine_in',
    status: 'preparing',
    tableNumber: 'Table G-11',
    items: [
      {
        menuItem: INITIAL_MENU_ITEMS[9], // Malai Boti
        quantity: 2,
        calculatedPrice: 1780
      },
      {
        menuItem: INITIAL_MENU_ITEMS[10], // Beef Seekh Kabab
        quantity: 1,
        calculatedPrice: 950
      }
    ],
    subtotal: 2730,
    discountAmount: 0,
    deliveryFee: 0,
    total: 2730,
    paymentMethod: 'counter_cash',
    customerName: 'Dine-in Guest (Table G-11)',
    customerPhone: '+92 321 9920194',
    isPreOrder: false,
    createdAt: new Date(Date.now() - 8 * 60000).toISOString(),
    estimatedReadyTime: '14 mins remaining'
  },
  {
    id: 'ORD-1043',
    orderNumber: 'UTG-1043',
    branchId: 'UTG-KHI-001',
    channel: 'otc_takeaway',
    fulfillment: 'takeaway',
    status: 'ready',
    items: [
      {
        menuItem: INITIAL_MENU_ITEMS[14], // Zinger Burger
        quantity: 2,
        calculatedPrice: 1240
      },
      {
        menuItem: INITIAL_MENU_ITEMS[18], // Loaded Fries
        quantity: 1,
        calculatedPrice: 480
      }
    ],
    subtotal: 1720,
    discountAmount: 0,
    deliveryFee: 0,
    total: 1720,
    paymentMethod: 'cod',
    customerName: 'Hamza Tariq',
    customerPhone: '+92 333 4519920',
    isPreOrder: false,
    createdAt: new Date(Date.now() - 22 * 60000).toISOString(),
    estimatedReadyTime: 'Ready at OTC Counter'
  },
  {
    id: 'ORD-1044',
    orderNumber: 'UTG-1044',
    branchId: 'UTG-KHI-002',
    channel: 'pre_order',
    fulfillment: 'delivery',
    status: 'accepted',
    items: [
      {
        menuItem: INITIAL_MENU_ITEMS[12], // BBQ Platter
        quantity: 1,
        calculatedPrice: 3850
      },
      {
        menuItem: INITIAL_MENU_ITEMS[20], // Fajita Pizza
        quantity: 1,
        calculatedPrice: 1290
      }
    ],
    subtotal: 5140,
    discountAmount: 500, // capped at 500
    discountReason: 'Bank Card 10% (Meezan Bank - Capped at 500)',
    deliveryFee: 150,
    total: 4790,
    paymentMethod: 'bank_card',
    bankName: 'Meezan Bank',
    customerName: 'Dr. Asad Siddiqui',
    customerPhone: '+92 312 8847119',
    deliveryAddress: 'Apartment 402, Royal Residency, Block 7, Gulshan-e-Iqbal',
    isPreOrder: true,
    scheduledTime: new Date(Date.now() + 180 * 60000).toISOString(),
    createdAt: new Date(Date.now() - 45 * 60000).toISOString(),
    estimatedReadyTime: 'Pre-order scheduled for release at 8:30 PM',
    notes: 'Scheduled dinner delivery for guest party.'
  }
];

export const INITIAL_RESERVATIONS: TableReservation[] = [
  {
    id: 'RES-501',
    branchId: 'UTG-KHI-001',
    tableId: 'P-T05',
    tableNumber: 'Table P-05',
    guestName: 'Khurram Shehzad',
    guestPhone: '+92 300 2341982',
    partySize: 4,
    date: new Date().toISOString().split('T')[0],
    timeSlot: '20:30',
    notes: 'Family dinner, quiet corner preferred.',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'RES-502',
    branchId: 'UTG-KHI-002',
    tableId: 'G-T20',
    tableNumber: 'Table G-20',
    guestName: 'Syeda Fatima & Family',
    guestPhone: '+92 334 1122849',
    partySize: 9,
    date: new Date().toISOString().split('T')[0],
    timeSlot: '21:00',
    notes: 'Birthday celebration with group table arrangement.',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 7200000).toISOString()
  }
];

export const INITIAL_TICKETS: ComplaintTicket[] = [
  {
    id: 'TCK-201',
    ticketNumber: 'TCK-UTG-201',
    orderNumber: 'UTG-1038',
    customerName: 'Babar Munir',
    customerPhone: '+92 321 8299101',
    category: 'delivery_delay',
    severity: 'medium',
    description: 'Rider took 55 minutes due to rain near Shahrah-e-Faisal. Food was warm but fries lost crispness.',
    status: 'investigating',
    branchId: 'UTG-KHI-001',
    createdAt: new Date(Date.now() - 40 * 60000).toISOString()
  }
];

export const ELIGIBLE_BANKS = [
  { id: 'hbl', name: 'Habib Bank Limited (HBL)', discountPct: 10, maxCap: 500, minSpend: 1000 },
  { id: 'meezan', name: 'Meezan Bank', discountPct: 10, maxCap: 500, minSpend: 1000 },
  { id: 'alfalah', name: 'Bank Alfalah', discountPct: 10, maxCap: 500, minSpend: 1000 },
  { id: 'scb', name: 'Standard Chartered Pakistan', discountPct: 10, maxCap: 600, minSpend: 1200 },
  { id: 'mcb', name: 'MCB Bank', discountPct: 10, maxCap: 500, minSpend: 1000 },
  { id: 'faysal', name: 'Faysal Bank', discountPct: 10, maxCap: 400, minSpend: 1000 }
];

export const KARACHI_AREAS = [
  { name: 'PECHS (Blocks 1 to 6)', assignedBranch: 'UTG-KHI-001', deliveryFee: 120, estimatedMins: '25-35' },
  { name: 'Tariq Road & Bahadurabad', assignedBranch: 'UTG-KHI-001', deliveryFee: 120, estimatedMins: '25-35' },
  { name: 'Sindhi Muslim Society & Nursery', assignedBranch: 'UTG-KHI-001', deliveryFee: 100, estimatedMins: '20-30' },
  { name: 'Clifton (Blocks 1 to 9)', assignedBranch: 'UTG-KHI-001', deliveryFee: 180, estimatedMins: '35-45' },
  { name: 'DHA Defence (Phases 1 to 8)', assignedBranch: 'UTG-KHI-001', deliveryFee: 200, estimatedMins: '35-50' },
  { name: 'Gulshan-e-Iqbal (Blocks 1 to 19)', assignedBranch: 'UTG-KHI-002', deliveryFee: 100, estimatedMins: '20-30' },
  { name: 'Gulistan-e-Johar (Blocks 1 to 20)', assignedBranch: 'UTG-KHI-002', deliveryFee: 140, estimatedMins: '30-40' },
  { name: 'Federal B Area / Water Pump', assignedBranch: 'UTG-KHI-002', deliveryFee: 150, estimatedMins: '30-40' },
  { name: 'University Road / NED / Karachi University', assignedBranch: 'UTG-KHI-002', deliveryFee: 100, estimatedMins: '15-25' },
  { name: 'Scheme 33 & Safoora Goth', assignedBranch: 'UTG-KHI-002', deliveryFee: 180, estimatedMins: '35-45' },
  { name: 'North Nazimabad', assignedBranch: 'UTG-KHI-002', deliveryFee: 200, estimatedMins: '40-50' }
];
