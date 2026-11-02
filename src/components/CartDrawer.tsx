import React, { useState } from 'react';
import { 
  CartItem, 
  BranchId, 
  BranchInfo, 
  FulfillmentType, 
  PaymentMethod, 
  RestaurantOrder,
  RestaurantTable 
} from '../types';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MapPin, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  Calendar, 
  ArrowRight,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { ELIGIBLE_BANKS, KARACHI_AREAS } from '../data/restaurantData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currentBranch: BranchId;
  branches: Record<BranchId, BranchInfo>;
  tables: RestaurantTable[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onPlaceOrder: (order: RestaurantOrder) => void;
  onNavigateToTracking: (orderId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currentBranch,
  branches,
  tables,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onPlaceOrder,
  onNavigateToTracking
}) => {
  const branch = branches[currentBranch];

  // Fulfillment & Checkout form state
  const [fulfillment, setFulfillment] = useState<FulfillmentType>('delivery');
  const [isPreOrder, setIsPreOrder] = useState<boolean>(false);
  const [scheduledDateTime, setScheduledDateTime] = useState<string>('');
  
  // Dine-in fields
  const [selectedTableNumber, setSelectedTableNumber] = useState<string>('');

  // Delivery fields
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<string>(KARACHI_AREAS[0].name);
  const [specialNotes, setSpecialNotes] = useState<string>('');

  // Payment fields
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [selectedBankId, setSelectedBankId] = useState<string>(ELIGIBLE_BANKS[0].id);

  // Success view
  const [completedOrder, setCompletedOrder] = useState<RestaurantOrder | null>(null);

  // Calculation
  const subtotal = items.reduce((sum, item) => sum + item.calculatedPrice, 0);

  // Delivery fee
  const areaInfo = KARACHI_AREAS.find(a => a.name === selectedArea);
  const deliveryFee = fulfillment === 'delivery' ? (areaInfo?.deliveryFee || 120) : 0;

  // Bank discount calculation (Demo 10% rule)
  const bankConfig = ELIGIBLE_BANKS.find(b => b.id === selectedBankId);
  let discountAmount = 0;
  let discountReason = '';

  if (paymentMethod === 'bank_card' && bankConfig) {
    if (subtotal >= bankConfig.minSpend) {
      const rawDiscount = Math.round((subtotal * bankConfig.discountPct) / 100);
      discountAmount = Math.min(rawDiscount, bankConfig.maxCap);
      discountReason = `10% Bank Discount (${bankConfig.name} - Max PKR ${bankConfig.maxCap})`;
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  // Available tables for current branch
  const branchTables = tables.filter(t => t.branchId === currentBranch && t.status === 'available');

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please provide your name and phone number for contact.');
      return;
    }

    if (fulfillment === 'delivery' && !deliveryAddress.trim()) {
      alert('Please enter your full delivery address in Karachi.');
      return;
    }

    if (fulfillment === 'dine_in' && !selectedTableNumber) {
      alert('Please select an available table for Dine-in.');
      return;
    }

    if (isPreOrder && !scheduledDateTime) {
      alert('Please select a scheduled pre-order date and time.');
      return;
    }

    const orderNum = `UTG-${Math.floor(1050 + Math.random() * 900)}`;
    const newOrder: RestaurantOrder = {
      id: orderNum,
      orderNumber: orderNum,
      branchId: currentBranch,
      channel: isPreOrder ? 'pre_order' : fulfillment === 'dine_in' ? 'dine_in' : fulfillment === 'takeaway' ? 'otc_takeaway' : 'direct_delivery',
      fulfillment,
      status: isPreOrder ? 'accepted' : 'preparing',
      items: [...items],
      subtotal,
      discountAmount,
      discountReason: discountAmount > 0 ? discountReason : undefined,
      deliveryFee,
      total: grandTotal,
      paymentMethod,
      bankName: paymentMethod === 'bank_card' ? bankConfig?.name : undefined,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deliveryAddress: fulfillment === 'delivery' ? `${deliveryAddress.trim()} (${selectedArea})` : undefined,
      tableNumber: fulfillment === 'dine_in' ? selectedTableNumber : undefined,
      isPreOrder,
      scheduledTime: isPreOrder ? scheduledDateTime : undefined,
      createdAt: new Date().toISOString(),
      estimatedReadyTime: isPreOrder ? `Scheduled for ${scheduledDateTime}` : fulfillment === 'delivery' ? '30-40 mins' : '15-20 mins',
      notes: specialNotes.trim() || undefined
    };

    onPlaceOrder(newOrder);
    setCompletedOrder(newOrder);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-stone-900 border-l border-stone-800 flex flex-col shadow-2xl">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-lg text-white">Your Order Bag</h2>
                <p className="text-xs text-stone-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  {branch.name}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* If Order Placed Successfully */}
            {completedOrder ? (
              <div className="py-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                    Order Confirmed &amp; Dispatched to Kitchen
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    {completedOrder.orderNumber}
                  </h3>
                  <p className="text-xs text-stone-400">
                    Thank you, {completedOrder.customerName}! We have atomically committed kitchen inventory.
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-left text-xs space-y-2">
                  <div className="flex justify-between text-stone-400">
                    <span>Fulfillment Channel</span>
                    <span className="text-white font-medium capitalize">
                      {completedOrder.isPreOrder ? 'Scheduled Pre-Order' : completedOrder.fulfillment}
                    </span>
                  </div>
                  {completedOrder.tableNumber && (
                    <div className="flex justify-between text-stone-400">
                      <span>Assigned Table</span>
                      <span className="text-amber-400 font-bold">{completedOrder.tableNumber}</span>
                    </div>
                  )}
                  {completedOrder.deliveryAddress && (
                    <div className="flex justify-between text-stone-400">
                      <span>Delivery Address</span>
                      <span className="text-stone-200 truncate max-w-[200px]">{completedOrder.deliveryAddress}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-400">
                    <span>Payment Mode</span>
                    <span className="text-stone-200 uppercase font-medium">{completedOrder.paymentMethod.replace('_', ' ')}</span>
                  </div>
                  {completedOrder.discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-medium">
                      <span>10% Bank Savings</span>
                      <span>-PKR {completedOrder.discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-stone-800 flex justify-between font-bold text-white text-sm">
                    <span>Grand Total</span>
                    <span className="font-mono text-amber-400">PKR {completedOrder.total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToTracking(completedOrder.id);
                    }}
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Track in Live Kitchen Queue
                  </button>
                  <button
                    onClick={() => {
                      setCompletedOrder(null);
                      onClearCart();
                      onClose();
                    }}
                    className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-stone-600 mx-auto" />
                <h3 className="text-base font-semibold text-white">Your bag is empty</h3>
                <p className="text-xs text-stone-400 max-w-xs mx-auto">
                  Explore our tandoori grills, royal karahis, and multi-cuisine favorites to start your order.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitOrder} className="space-y-6">
                
                {/* Cart Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span>Selected Items ({items.length})</span>
                    <button
                      type="button"
                      onClick={onClearCart}
                      className="text-stone-500 hover:text-red-400 transition-colors"
                    >
                      Clear Bag
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {items.map((cartItem, idx) => (
                      <div 
                        key={idx}
                        className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-white truncate">{cartItem.menuItem.name}</h4>
                          {cartItem.selectedVariant && (
                            <p className="text-[11px] text-amber-400">{cartItem.selectedVariant.name}</p>
                          )}
                          {cartItem.selectedAddons && cartItem.selectedAddons.length > 0 && (
                            <p className="text-[10px] text-stone-400">
                              + {cartItem.selectedAddons.map(a => a.name).join(', ')}
                            </p>
                          )}
                          <p className="font-mono text-stone-300 font-medium mt-1">
                            PKR {cartItem.calculatedPrice.toLocaleString()}
                          </p>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 rounded-lg p-1">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(idx, cartItem.quantity - 1)}
                            className="p-1 text-stone-400 hover:text-white"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-5 text-center font-mono font-bold text-white">
                            {cartItem.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(idx, cartItem.quantity + 1)}
                            className="p-1 text-stone-400 hover:text-white"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(idx)}
                          className="p-1.5 text-stone-500 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fulfillment Type Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                    Fulfillment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFulfillment('delivery')}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                        fulfillment === 'delivery'
                          ? 'border-amber-500 bg-amber-500/10 text-white'
                          : 'border-stone-800 bg-stone-950 text-stone-400'
                      }`}
                    >
                      Home Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => setFulfillment('takeaway')}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                        fulfillment === 'takeaway'
                          ? 'border-amber-500 bg-amber-500/10 text-white'
                          : 'border-stone-800 bg-stone-950 text-stone-400'
                      }`}
                    >
                      OTC Takeaway
                    </button>
                    <button
                      type="button"
                      onClick={() => setFulfillment('dine_in')}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                        fulfillment === 'dine_in'
                          ? 'border-amber-500 bg-amber-500/10 text-white'
                          : 'border-stone-800 bg-stone-950 text-stone-400'
                      }`}
                    >
                      Dine-In
                    </button>
                  </div>
                </div>

                {/* Pre-Order (Scheduled) Toggle */}
                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-semibold text-white">Pre-Order for Later</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPreOrder}
                        onChange={e => setIsPreOrder(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-stone-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                    </label>
                  </div>
                  {isPreOrder && (
                    <div className="space-y-1.5 animate-in fade-in">
                      <p className="text-[11px] text-stone-400">
                        Kitchen will schedule ingredient pre-allocation and release order at the exact requested time.
                      </p>
                      <input
                        type="datetime-local"
                        value={scheduledDateTime}
                        onChange={e => setScheduledDateTime(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        required={isPreOrder}
                      />
                    </div>
                  )}
                </div>

                {/* Dine-In Table Picker */}
                {fulfillment === 'dine_in' && (
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                      Select Available Table ({branch.code})
                    </label>
                    <select
                      value={selectedTableNumber}
                      onChange={e => setSelectedTableNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-amber-500"
                      required
                    >
                      <option value="">-- Choose an Available Table --</option>
                      {branchTables.map(t => (
                        <option key={t.id} value={t.tableNumber}>
                          {t.tableNumber} · {t.capacity} Seats ({t.section})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Delivery Area & Address */}
                {fulfillment === 'delivery' && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                        Karachi Delivery Zone
                      </label>
                      <select
                        value={selectedArea}
                        onChange={e => setSelectedArea(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-amber-500"
                      >
                        {KARACHI_AREAS.map(area => (
                          <option key={area.name} value={area.name}>
                            {area.name} — PKR {area.deliveryFee} fee ({area.estimatedMins} mins)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                        Full Delivery Address
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress}
                        onChange={e => setDeliveryAddress(e.target.value)}
                        placeholder="House / Apartment #, Street, Block, Landmark"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Customer Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      placeholder="e.g. Asad Khan"
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                      Phone Number (Karachi)
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      placeholder="+92 300 1234567"
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                </div>

                {/* Payment Mode & 10% Bank Discount */}
                <div className="space-y-3 pt-2 border-t border-stone-800">
                  <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center justify-between">
                    <span>Payment Method</span>
                    <span className="text-[11px] text-amber-400 font-normal">10% Card Discount Available</span>
                  </label>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-amber-500 bg-amber-500/10 text-white'
                          : 'border-stone-800 bg-stone-950 text-stone-400'
                      }`}
                    >
                      Cash on Delivery
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('counter_cash')}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                        paymentMethod === 'counter_cash'
                          ? 'border-amber-500 bg-amber-500/10 text-white'
                          : 'border-stone-800 bg-stone-950 text-stone-400'
                      }`}
                    >
                      On-Counter Cash
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank_card')}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all relative ${
                        paymentMethod === 'bank_card'
                          ? 'border-amber-500 bg-amber-500/10 text-white font-bold'
                          : 'border-stone-800 bg-stone-950 text-stone-400'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5 inline mr-1 text-amber-400" />
                      Bank Card
                    </button>
                  </div>

                  {/* Bank Selector if Bank Card chosen */}
                  {paymentMethod === 'bank_card' && (
                    <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2 animate-in fade-in">
                      <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        <span>Select Eligible Card Partner (10% Off)</span>
                      </div>
                      <select
                        value={selectedBankId}
                        onChange={e => setSelectedBankId(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        {ELIGIBLE_BANKS.map(bank => (
                          <option key={bank.id} value={bank.id}>
                            {bank.name} — 10% Off (Max Cap PKR {bank.maxCap})
                          </option>
                        ))}
                      </select>
                      {discountAmount > 0 ? (
                        <p className="text-[11px] text-emerald-400 font-medium">
                          ✓ You save PKR {discountAmount.toLocaleString()} with {bankConfig?.name}!
                        </p>
                      ) : (
                        <p className="text-[11px] text-stone-400">
                          Minimum order of PKR {bankConfig?.minSpend} required to trigger 10% discount.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Order Summary Calculations */}
                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-400">
                    <span>Subtotal</span>
                    <span className="font-mono text-stone-200">PKR {subtotal.toLocaleString()}</span>
                  </div>

                  {fulfillment === 'delivery' && (
                    <div className="flex justify-between text-stone-400">
                      <span>Delivery Fee ({selectedArea})</span>
                      <span className="font-mono text-stone-200">PKR {deliveryFee}</span>
                    </div>
                  )}

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-medium">
                      <span>{discountReason}</span>
                      <span className="font-mono">-PKR {discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-stone-800 flex justify-between text-sm font-bold text-white">
                    <span>Total Payable</span>
                    <span className="font-mono text-amber-400 text-base">PKR {grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Submit Checkout */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-950/40 flex items-center justify-center gap-2"
                >
                  <span>Confirm &amp; Place Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
