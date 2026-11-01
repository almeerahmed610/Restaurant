/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  BranchId, 
  CartItem, 
  RestaurantOrder, 
  TableReservation, 
  ComplaintTicket, 
  OrderStatus,
  MenuItem
} from './types';
import { 
  BRANCHES, 
  INITIAL_MENU_ITEMS, 
  INITIAL_BRANCH_STOCK, 
  generateInitialTables, 
  INITIAL_ORDERS, 
  INITIAL_RESERVATIONS, 
  INITIAL_TICKETS,
  RECIPES
} from './data/restaurantData';
import { calculateBranchStockSummary } from './utils/inventoryEngine';
import { Navbar, WebsitePage } from './components/Navbar';
import { WebsiteHome } from './components/WebsiteHome';
import { MenuSection } from './components/MenuSection';
import { TableReservations } from './components/TableReservations';
import { BranchesView } from './components/BranchesView';
import { AboutView } from './components/AboutView';
import { TrackOrderView } from './components/TrackOrderView';
import { StaffPortalView } from './components/StaffPortalView';
import { CartDrawer } from './components/CartDrawer';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { LiveTickerBar } from './components/LiveTickerBar';
import { LiveOrbitCircle } from './components/LiveOrbitCircle';
import { Flame, ShieldAlert, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function App() {
  const [currentBranch, setCurrentBranch] = useState<BranchId>('UTG-KHI-001');
  const [branches] = useState(BRANCHES);
  const [menuItems] = useState(INITIAL_MENU_ITEMS);
  const [stockRecords, setStockRecords] = useState(INITIAL_BRANCH_STOCK);
  const [tables, setTables] = useState(generateInitialTables());
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [reservations, setReservations] = useState(INITIAL_RESERVATIONS);
  const [tickets, setTickets] = useState(INITIAL_TICKETS);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false);
  
  // Primary website page routing
  const [activePage, setActivePage] = useState<WebsitePage>('home');

  // Live branch inventory summary
  const stockSummary = useMemo(() => {
    return calculateBranchStockSummary(currentBranch, stockRecords);
  }, [currentBranch, stockRecords]);

  // Cart calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.calculatedPrice, 0);

  // Cart Operations
  const handleAddToCart = (newItem: CartItem) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(item => 
        item.menuItem.id === newItem.menuItem.id &&
        item.selectedVariant?.id === newItem.selectedVariant?.id
      );

      if (existingIdx >= 0) {
        const updated = [...prev];
        const existing = updated[existingIdx];
        const updatedQty = existing.quantity + newItem.quantity;
        const unitPrice = existing.calculatedPrice / existing.quantity;
        updated[existingIdx] = {
          ...existing,
          quantity: updatedQty,
          calculatedPrice: unitPrice * updatedQty
        };
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCart(prev => {
      const updated = [...prev];
      const item = updated[index];
      const unitPrice = item.calculatedPrice / item.quantity;
      updated[index] = {
        ...item,
        quantity: newQty,
        calculatedPrice: unitPrice * newQty
      };
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Order Placement & Inventory Reservation
  const handlePlaceOrder = (newOrder: RestaurantOrder) => {
    setOrders(prev => [newOrder, ...prev]);

    // Atomically reserve inventory ingredients for items with recipes
    setStockRecords(prev => {
      const updated = [...prev];
      for (const cartItem of newOrder.items) {
        const recipeId = cartItem.menuItem.recipeId;
        if (!recipeId) continue;
        const recipe = RECIPES.find(r => r.id === recipeId);
        if (!recipe) continue;

        const multiplier = cartItem.selectedVariant?.portionMultiplier || 1.0;
        const totalPortions = cartItem.quantity * multiplier;

        for (const req of recipe.ingredients) {
          const needed = req.qtyPerPortion * totalPortions;
          const recordIdx = updated.findIndex(
            s => s.branchId === newOrder.branchId && s.ingredientId === req.ingredientId
          );
          if (recordIdx >= 0) {
            updated[recordIdx] = {
              ...updated[recordIdx],
              reserved: Number((updated[recordIdx].reserved + needed).toFixed(2))
            };
          }
        }
      }
      return updated;
    });

    // Clear cart after order placed
    setCart([]);
  };

  // Kitchen Pipeline Status Updates
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, status: newStatus };
      }
      return o;
    }));
  };

  const handleReleasePreOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, status: 'preparing' };
      }
      return o;
    }));
  };

  // Table Reservations
  const handleAddReservation = (newRes: TableReservation) => {
    setReservations(prev => [newRes, ...prev]);
    // Mark table as reserved
    setTables(prev => prev.map(t => {
      if (t.id === newRes.tableId) {
        return { ...t, status: 'reserved', currentReservationId: newRes.id };
      }
      return t;
    }));
  };

  const handleCancelReservation = (resId: string) => {
    const res = reservations.find(r => r.id === resId);
    if (!res) return;
    setReservations(prev => prev.filter(r => r.id !== resId));
    setTables(prev => prev.map(t => {
      if (t.id === res.tableId) {
        return { ...t, status: 'available', currentReservationId: undefined };
      }
      return t;
    }));
  };

  const handleCheckInGuest = (resId: string, tableId: string) => {
    setReservations(prev => prev.map(r => r.id === resId ? { ...r, status: 'seated' } : r));
    setTables(prev => prev.map(t => t.id === tableId ? { ...t, status: 'occupied' } : t));
  };

  // Inventory Management
  const handleAdjustStock = (branchId: BranchId, ingredientId: string, adjustmentDelta: number) => {
    setStockRecords(prev => prev.map(s => {
      if (s.branchId === branchId && s.ingredientId === ingredientId) {
        return { ...s, adjustment: s.adjustment + adjustmentDelta };
      }
      return s;
    }));
  };

  const handleReceiveDelivery = (branchId: BranchId, ingredientId: string, amount: number) => {
    setStockRecords(prev => prev.map(s => {
      if (s.branchId === branchId && s.ingredientId === ingredientId) {
        return { ...s, received: s.received + amount };
      }
      return s;
    }));
  };

  // Complaints / Feedback Desk
  const handleAddTicket = (ticket: ComplaintTicket) => {
    setTickets(prev => [ticket, ...prev]);
  };

  const handleResolveTicket = (ticketId: string, resolution: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return { ...t, status: 'resolved', resolutionNote: resolution };
      }
      return t;
    }));
  };

  const currentBranchInfo = branches[currentBranch];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      
      {/* Top Running Online Ticker Line */}
      <LiveTickerBar 
        currentBranch={currentBranch}
        onOpenVoiceAssistant={() => setIsVoiceAssistantOpen(true)}
      />

      {/* Primary Website Navigation Bar */}
      <Navbar
        currentBranch={currentBranch}
        branches={branches}
        onSelectBranch={setCurrentBranch}
        activePage={activePage}
        onNavigate={setActivePage}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenVoiceAssistant={() => setIsVoiceAssistantOpen(true)}
      />

      {/* Main Website Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        
        {/* 1. Home / Landing Page */}
        {activePage === 'home' && (
          <WebsiteHome
            currentBranch={currentBranch}
            branches={branches}
            menuItems={menuItems}
            onSelectBranch={setCurrentBranch}
            onNavigate={setActivePage}
            onAddToCart={item => {
              handleAddToCart(item);
              setIsCartOpen(true);
            }}
            onOpenVoiceAssistant={() => setIsVoiceAssistantOpen(true)}
          />
        )}

        {/* 2. Menu & Online Ordering */}
        {activePage === 'menu' && (
          <MenuSection
            menuItems={menuItems}
            currentBranch={currentBranch}
            stockSummary={stockSummary}
            onAddToCart={item => {
              handleAddToCart(item);
              setIsCartOpen(true);
            }}
            onOpenVoiceAssistant={() => setIsVoiceAssistantOpen(true)}
            onOpenReservations={() => setActivePage('reservations')}
          />
        )}

        {/* 3. Table Reservations */}
        {activePage === 'reservations' && (
          <TableReservations
            currentBranch={currentBranch}
            branches={branches}
            tables={tables}
            reservations={reservations}
            onAddReservation={handleAddReservation}
            onCancelReservation={handleCancelReservation}
            onCheckInGuest={handleCheckInGuest}
          />
        )}

        {/* 4. Our Branches Guide */}
        {activePage === 'branches' && (
          <BranchesView
            currentBranch={currentBranch}
            branches={branches}
            onSelectBranch={setCurrentBranch}
            onNavigate={setActivePage}
          />
        )}

        {/* 5. About Us & Culinary Heritage */}
        {activePage === 'about' && (
          <AboutView />
        )}

        {/* 6. Live Order Tracking */}
        {activePage === 'track' && (
          <TrackOrderView
            orders={orders}
            branches={branches}
            onNavigateToMenu={() => setActivePage('menu')}
            onOpenDutyManager={() => setActivePage('portal')}
          />
        )}

        {/* 7. Staff & Operations Portal */}
        {activePage === 'portal' && (
          <StaffPortalView
            currentBranch={currentBranch}
            branches={branches}
            orders={orders}
            stockRecords={stockRecords}
            stockSummary={stockSummary}
            menuItems={menuItems}
            tickets={tickets}
            onSelectBranch={setCurrentBranch}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onReleasePreOrder={handleReleasePreOrder}
            onAdjustStock={handleAdjustStock}
            onReceiveDelivery={handleReceiveDelivery}
            onAddTicket={handleAddTicket}
            onResolveTicket={handleResolveTicket}
            onBackToWebsite={() => setActivePage('home')}
          />
        )}

      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cart}
          currentBranch={currentBranch}
          branches={branches}
          tables={tables}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onPlaceOrder={handlePlaceOrder}
          onNavigateToTracking={orderId => {
            setActivePage('track');
          }}
        />
      )}

      {/* Voice Assistant Modal */}
      {isVoiceAssistantOpen && (
        <VoiceAssistantModal
          isOpen={isVoiceAssistantOpen}
          onClose={() => setIsVoiceAssistantOpen(false)}
          currentBranch={currentBranch}
          branches={branches}
          menuItems={menuItems}
          orders={orders}
          onAddToCartDirect={(item, qty) => {
            handleAddToCart({
              menuItem: item,
              quantity: qty,
              calculatedPrice: item.price * qty
            });
            setIsVoiceAssistantOpen(false);
            setIsCartOpen(true);
          }}
          onBookTableDirect={res => {
            setActivePage('reservations');
            setIsVoiceAssistantOpen(false);
          }}
          onLogTicketDirect={tick => {
            setActivePage('portal');
            setIsVoiceAssistantOpen(false);
          }}
        />
      )}

      {/* Modern Website Footer */}
      <footer className="mt-auto border-t border-stone-800 bg-stone-950 text-stone-400 text-xs py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-stone-800/80">
            
            {/* Brand column */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-stone-950 shadow-md">
                  <Flame className="w-4 h-4 fill-stone-950" />
                </div>
                <span className="font-serif font-bold text-white text-base">URBAN TANDOOR &amp; GRILL</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Karachi's 24/7 culinary landmark. Bringing authentic charcoal-fired Koyla Karahi, tender Bihari BBQ, and midnight comfort feasts across Karachi.
              </p>
              <div className="pt-1 text-[11px] font-mono text-amber-400">
                24 Hours · 7 Days a Week
              </div>
            </div>

            {/* Quick Website Links */}
            <div className="space-y-2">
              <span className="font-bold text-stone-200 uppercase tracking-wider text-[11px] block">Explore Website</span>
              <ul className="space-y-1.5 text-[11px]">
                <li>
                  <button onClick={() => setActivePage('home')} className="hover:text-amber-400 transition-colors">
                    Home &amp; Highlights
                  </button>
                </li>
                <li>
                  <button onClick={() => setActivePage('menu')} className="hover:text-amber-400 transition-colors">
                    Online Menu &amp; Ordering
                  </button>
                </li>
                <li>
                  <button onClick={() => setActivePage('reservations')} className="hover:text-amber-400 transition-colors">
                    Table Reservations (42 Tables)
                  </button>
                </li>
                <li>
                  <button onClick={() => setActivePage('branches')} className="hover:text-amber-400 transition-colors">
                    Our Karachi Branches
                  </button>
                </li>
                <li>
                  <button onClick={() => setActivePage('about')} className="hover:text-amber-400 transition-colors">
                    About &amp; Story
                  </button>
                </li>
                <li>
                  <button onClick={() => setActivePage('track')} className="hover:text-amber-400 transition-colors">
                    Track Live Order
                  </button>
                </li>
              </ul>
            </div>

            {/* Operational Locations */}
            <div className="space-y-2 text-[11px]">
              <span className="font-bold text-stone-200 uppercase tracking-wider block">Karachi Hubs</span>
              <p>
                <strong className="text-amber-400 block">UTG-KHI-001 (PECHS Flagship):</strong>
                Main Shahrah-e-Faisal, Block 2, PECHS<br/>
                <span className="text-stone-500 font-mono">18 Tables · 72 Seats · Valet Available</span>
              </p>
              <p className="pt-1">
                <strong className="text-orange-400 block">UTG-KHI-002 (Gulshan Mega Branch):</strong>
                Main University Road, Block 6, Gulshan-e-Iqbal<br/>
                <span className="text-stone-500 font-mono">24 Tables · 112 Seats · Banquet Pods</span>
              </p>
            </div>

            {/* Privileges & Staff */}
            <div className="space-y-2 text-[11px]">
              <span className="font-bold text-stone-200 uppercase tracking-wider block">Dining Privileges</span>
              <p>• 10% Instant Bank Discount on HBL, Meezan, Alfalah, SCB, MCB cards</p>
              <p>• Fast 35-min insulated delivery across greater Karachi</p>
              <p>• Advance scheduled pre-orders with kitchen hold</p>
              <div className="pt-2">
                <button
                  onClick={() => setActivePage('portal')}
                  className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-[11px] font-mono flex items-center gap-1.5"
                >
                  <span>Staff &amp; Operations Portal</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>

          {/* Prompt Compliance Notice */}
          <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 text-[11px] text-stone-400 flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-stone-300">DEMO DATA NOTICE:</strong> This application demonstrates a fictional restaurant system. Name, locations, capacities, recipes, and menu examples are synthetic test data. Master menu records MENU001–MENU032 preserve recipe-linked ingredient inventory tracking, while MENU033+ represent catalog items.
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-2">
            <p>&copy; {new Date().getFullYear()} Urban Tandoor &amp; Grill Karachi. All rights reserved.</p>
            <p className="font-mono">Serving Karachi 24 Hours a Day · 365 Days a Year</p>
          </div>

        </div>
      </footer>

      {/* Floating Animated 24/7 Live Orbit Circle Widget */}
      <LiveOrbitCircle
        currentBranch={currentBranch}
        branches={branches}
        onOpenVoiceAssistant={() => setIsVoiceAssistantOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
}
