import React, { useState } from 'react';
import { RestaurantOrder, OrderStatus, BranchId, BranchInfo } from '../types';
import { 
  ChefHat, 
  Clock, 
  CheckCircle2, 
  Bike, 
  Search, 
  Calendar, 
  ArrowRight, 
  Receipt, 
  AlertCircle,
  Play,
  RotateCcw,
  Sparkles,
  MapPin,
  Utensils
} from 'lucide-react';

interface KitchenPipelineProps {
  orders: RestaurantOrder[];
  currentBranch: BranchId;
  branches: Record<BranchId, BranchInfo>;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onReleasePreOrder: (orderId: string) => void;
}

export const KitchenPipeline: React.FC<KitchenPipelineProps> = ({
  orders,
  currentBranch,
  branches,
  onUpdateOrderStatus,
  onReleasePreOrder
}) => {
  const branch = branches[currentBranch];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKOTOrder, setSelectedKOTOrder] = useState<RestaurantOrder | null>(null);

  // Filter orders for current branch
  const branchOrders = orders.filter(o => o.branchId === currentBranch);

  // Separate Pre-orders (scheduled queue) from active kitchen pipeline
  const scheduledPreOrders = branchOrders.filter(o => o.isPreOrder && o.status === 'accepted');
  const activeKitchenOrders = branchOrders.filter(o => !o.isPreOrder || o.status !== 'accepted');

  // Filter by search query if any
  const filteredActiveOrders = activeKitchenOrders.filter(o => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      o.orderNumber.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      (o.deliveryAddress && o.deliveryAddress.toLowerCase().includes(q))
    );
  });

  const acceptedList = filteredActiveOrders.filter(o => o.status === 'accepted');
  const preparingList = filteredActiveOrders.filter(o => o.status === 'preparing');
  const readyList = filteredActiveOrders.filter(o => o.status === 'ready');
  const dispatchedList = filteredActiveOrders.filter(o => o.status === 'dispatched');
  const completedList = filteredActiveOrders.filter(o => o.status === 'completed');

  return (
    <div className="space-y-8 pb-16">
      {/* Header and Live Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-stone-900 border border-stone-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <ChefHat className="w-4 h-4" />
            <span>24/7 Kitchen Display System &amp; Live Order Pipeline</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {branch.name} Kitchen Hub
          </h2>
          <p className="text-xs text-stone-400">
            Real-time multi-channel fulfillment: Dine-in, Takeaway OTC, In-house Delivery &amp; Foodpanda
          </p>
        </div>

        {/* Order Tracking / Lookup bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search Order ID (e.g. UTG-1041)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 placeholder:text-stone-500 text-xs focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Scheduled Pre-Orders Queue (Kept distinct as required by prompt) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-amber-950/20 border border-amber-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-white">
                Scheduled Pre-Orders Queue ({scheduledPreOrders.length})
              </h3>
              <p className="text-xs text-stone-400">
                Future advance orders held separate with reserved inventory until preparation lead time.
              </p>
            </div>
          </div>
        </div>

        {scheduledPreOrders.length === 0 ? (
          <p className="text-xs text-stone-400 italic">No scheduled pre-orders waiting in queue.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            {scheduledPreOrders.map(pre => (
              <div
                key={pre.id}
                className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-amber-400">{pre.orderNumber}</span>
                  <span className="text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded">
                    Scheduled
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-white">{pre.customerName}</h4>
                  <p className="text-stone-400">{pre.customerPhone}</p>
                  <p className="text-amber-300 font-semibold mt-1">
                    Release Time: {pre.scheduledTime ? new Date(pre.scheduledTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'Future Slot'}
                  </p>
                </div>

                <div className="border-t border-stone-800 pt-2 space-y-1 text-stone-300">
                  {pre.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-[11px]">
                      <span>{it.quantity}x {it.menuItem.name}</span>
                      <span className="font-mono text-stone-400">PKR {it.calculatedPrice}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
                  <button
                    onClick={() => onReleasePreOrder(pre.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-stone-950" />
                    <span>Release to Kitchen Now</span>
                  </button>

                  <button
                    onClick={() => setSelectedKOTOrder(pre)}
                    className="p-1.5 text-stone-400 hover:text-white"
                    title="View Kitchen Ticket"
                  >
                    <Receipt className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Kanban Pipeline Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Column 1: New / Accepted */}
        <div className="rounded-2xl bg-stone-900 border border-stone-800 p-4 space-y-3 flex flex-col">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-stone-300">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
              <span>1. Accepted</span>
            </div>
            <span className="font-mono text-xs text-stone-400">{acceptedList.length}</span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px]">
            {acceptedList.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                onSelectKOT={() => setSelectedKOTOrder(order)}
                actionButton={
                  <button
                    onClick={() => onUpdateOrderStatus(order.id, 'preparing')}
                    className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                  >
                    <ChefHat className="w-3.5 h-3.5" />
                    <span>Start Cooking</span>
                  </button>
                }
              />
            ))}
            {acceptedList.length === 0 && (
              <p className="text-center py-8 text-stone-500 text-xs italic">No orders waiting</p>
            )}
          </div>
        </div>

        {/* Column 2: Preparing */}
        <div className="rounded-2xl bg-stone-900 border border-stone-800 p-4 space-y-3 flex flex-col">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
              <span>2. Preparing</span>
            </div>
            <span className="font-mono text-xs text-stone-400">{preparingList.length}</span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px]">
            {preparingList.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                onSelectKOT={() => setSelectedKOTOrder(order)}
                actionButton={
                  <button
                    onClick={() => onUpdateOrderStatus(order.id, 'ready')}
                    className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Ready</span>
                  </button>
                }
              />
            ))}
            {preparingList.length === 0 && (
              <p className="text-center py-8 text-stone-500 text-xs italic">Kitchen is idle</p>
            )}
          </div>
        </div>

        {/* Column 3: Ready for Counter / Dispatch */}
        <div className="rounded-2xl bg-stone-900 border border-stone-800 p-4 space-y-3 flex flex-col">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span>3. Ready</span>
            </div>
            <span className="font-mono text-xs text-stone-400">{readyList.length}</span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px]">
            {readyList.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                onSelectKOT={() => setSelectedKOTOrder(order)}
                actionButton={
                  <button
                    onClick={() => onUpdateOrderStatus(order.id, 'dispatched')}
                    className="w-full py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                  >
                    <Bike className="w-3.5 h-3.5" />
                    <span>Dispatch / Serve</span>
                  </button>
                }
              />
            ))}
            {readyList.length === 0 && (
              <p className="text-center py-8 text-stone-500 text-xs italic">No orders ready</p>
            )}
          </div>
        </div>

        {/* Column 4: Dispatched / Served / Completed */}
        <div className="rounded-2xl bg-stone-900 border border-stone-800 p-4 space-y-3 flex flex-col">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-stone-400">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-500"></span>
              <span>4. En Route / Served</span>
            </div>
            <span className="font-mono text-xs text-stone-400">{dispatchedList.length}</span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px]">
            {dispatchedList.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                onSelectKOT={() => setSelectedKOTOrder(order)}
                actionButton={
                  <button
                    onClick={() => onUpdateOrderStatus(order.id, 'completed')}
                    className="w-full py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Complete Order</span>
                  </button>
                }
              />
            ))}
            {dispatchedList.length === 0 && (
              <p className="text-center py-8 text-stone-500 text-xs italic">None in transit</p>
            )}
          </div>
        </div>
      </div>

      {/* Kitchen Order Ticket (KOT) Modal Slip */}
      {selectedKOTOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in zoom-in-95">
          <div className="bg-stone-900 border border-stone-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl text-xs font-mono text-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-dashed border-stone-700">
              <div>
                <h4 className="font-bold text-base text-white">KITCHEN SLIP (KOT)</h4>
                <p className="text-stone-400 text-[11px]">{branch.name} · {selectedKOTOrder.orderNumber}</p>
              </div>
              <button onClick={() => setSelectedKOTOrder(null)} className="text-stone-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-1">
              <p><strong>Fulfillment:</strong> {selectedKOTOrder.fulfillment.toUpperCase()}</p>
              {selectedKOTOrder.tableNumber && (
                <p className="text-amber-400 font-bold"><strong>TABLE:</strong> {selectedKOTOrder.tableNumber}</p>
              )}
              {selectedKOTOrder.deliveryAddress && (
                <p><strong>Address:</strong> {selectedKOTOrder.deliveryAddress}</p>
              )}
              <p><strong>Customer:</strong> {selectedKOTOrder.customerName} ({selectedKOTOrder.customerPhone})</p>
              <p><strong>Order Placed:</strong> {new Date(selectedKOTOrder.createdAt).toLocaleTimeString()}</p>
            </div>

            <div className="border-t border-dashed border-stone-700 pt-3 space-y-2">
              <p className="font-bold text-white uppercase text-[11px]">Items to Prepare:</p>
              {selectedKOTOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between py-1 border-b border-stone-800/50">
                  <div>
                    <span className="font-bold text-amber-400 text-sm mr-2">{it.quantity}x</span>
                    <span>{it.menuItem.name}</span>
                    {it.selectedVariant && (
                      <p className="text-[10px] text-stone-400 pl-6">{it.selectedVariant.name}</p>
                    )}
                    {it.specialInstructions && (
                      <p className="text-[10px] text-amber-300 italic pl-6">Note: {it.specialInstructions}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-stone-700 pt-2 flex justify-between font-bold text-white">
              <span>Total Bill:</span>
              <span className="text-amber-400">PKR {selectedKOTOrder.total.toLocaleString()}</span>
            </div>

            <button
              onClick={() => setSelectedKOTOrder(null)}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold uppercase"
            >
              Close Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Sub-component for individual Order Card
function OrderCard({
  order,
  onSelectKOT,
  actionButton
}: {
  order: RestaurantOrder;
  onSelectKOT: () => void;
  actionButton: React.ReactNode;
}) {
  return (
    <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3 text-xs">
      <div className="flex items-center justify-between">
        <span className="font-mono font-bold text-white text-sm">{order.orderNumber}</span>
        <button
          onClick={onSelectKOT}
          className="text-stone-400 hover:text-amber-400 p-1"
          title="Print KOT Slip"
        >
          <Receipt className="w-3.5 h-3.5" />
        </button>
      </div>

      <div>
        <div className="flex items-center gap-1.5 text-stone-400">
          {order.fulfillment === 'dine_in' && (
            <span className="text-amber-400 font-bold">
              {order.tableNumber || 'Dine-In'}
            </span>
          )}
          {order.fulfillment === 'delivery' && (
            <span className="flex items-center gap-1 text-stone-300 truncate">
              <Bike className="w-3 h-3 text-amber-400 flex-shrink-0" />
              {order.deliveryAddress || 'Karachi Delivery'}
            </span>
          )}
          {order.fulfillment === 'takeaway' && (
            <span className="text-stone-300">OTC Counter Takeaway</span>
          )}
        </div>
        <p className="text-[11px] text-stone-400 mt-0.5">
          {order.customerName} · {order.customerPhone}
        </p>
      </div>

      {/* Items list */}
      <div className="space-y-1 py-1 border-y border-stone-800/70 text-[11px]">
        {order.items.map((it, idx) => (
          <div key={idx} className="flex justify-between text-stone-300">
            <span><strong>{it.quantity}x</strong> {it.menuItem.name}</span>
            <span className="font-mono text-stone-400">PKR {it.calculatedPrice}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px]">
        <span className="text-stone-400">Total</span>
        <span className="font-mono font-bold text-amber-400">PKR {order.total.toLocaleString()}</span>
      </div>

      {actionButton}
    </div>
  );
}
