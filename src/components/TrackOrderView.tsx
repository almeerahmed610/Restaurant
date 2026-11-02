import React, { useState } from 'react';
import { RestaurantOrder, BranchInfo, BranchId } from '../types';
import { 
  Search, 
  Package, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Flame, 
  Truck, 
  ChefHat, 
  MapPin, 
  Phone,
  ShieldCheck
} from 'lucide-react';

interface TrackOrderViewProps {
  orders: RestaurantOrder[];
  branches: Record<BranchId, BranchInfo>;
  onNavigateToMenu: () => void;
  onOpenDutyManager: () => void;
}

export const TrackOrderView: React.FC<TrackOrderViewProps> = ({
  orders,
  branches,
  onNavigateToMenu,
  onOpenDutyManager
}) => {
  const [query, setQuery] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || '');

  const activeOrder = orders.find(o => 
    o.id.toLowerCase() === query.trim().toLowerCase() ||
    o.customerPhone.includes(query.trim()) ||
    o.id === selectedOrderId
  ) || orders[0];

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'received': return 1;
      case 'preparing': return 2;
      case 'ready': return 3;
      case 'dispatched': return 4;
      case 'completed': return 5;
      default: return 1;
    }
  };

  const currentStep = activeOrder ? getStatusStep(activeOrder.status) : 1;

  const branch = activeOrder ? branches[activeOrder.branchId] : branches['UTG-KHI-001'];

  return (
    <div className="space-y-10 pb-16 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold">
          <Truck className="w-3.5 h-3.5" />
          <span>Real-Time Kitchen &amp; Dispatch Tracking</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
          Track Your 24/7 Feast
        </h1>
        <p className="text-stone-300 text-xs sm:text-sm max-w-lg mx-auto">
          Enter your Order ID (e.g. ORD-2026-001) or phone number to see live kitchen preparation and dispatch status.
        </p>

        {/* Search bar */}
        <div className="max-w-md mx-auto relative pt-2">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-5" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Enter Order ID or Mobile Number..."
            className="w-full pl-9 pr-24 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
          />
          <button
            onClick={() => {}}
            className="absolute right-1.5 top-3.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
          >
            Track
          </button>
        </div>
      </div>

      {/* Quick selectable recent orders */}
      <div className="space-y-2">
        <span className="text-[11px] text-stone-400 font-mono uppercase tracking-wider block text-center">
          Recent Active Orders in Queue:
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {orders.slice(0, 4).map(o => (
            <button
              key={o.id}
              onClick={() => {
                setSelectedOrderId(o.id);
                setQuery(o.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeOrder?.id === o.id
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              <span>{o.id}</span>
              <span className="ml-1.5 text-[10px] opacity-75">({o.status})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Order Status Card */}
      {activeOrder ? (
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
          
          {/* Top metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-mono font-bold text-lg text-white">{activeOrder.id}</h2>
                <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs uppercase font-mono font-bold">
                  {activeOrder.fulfillment}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">
                Ordered by <strong className="text-stone-200">{activeOrder.customerName}</strong> ({activeOrder.customerPhone})
              </p>
            </div>

            <div className="sm:text-right">
              <span className="text-xs text-stone-400 font-mono block">Estimated Completion</span>
              <span className="text-base font-bold text-emerald-400 font-mono">
                {activeOrder.estimatedReadyTime}
              </span>
              <span className="text-[11px] text-stone-500 block font-mono">
                Fulfilling at {branch.name}
              </span>
            </div>
          </div>

          {/* Stepper Pipeline */}
          <div className="space-y-3">
            <span className="text-xs text-stone-400 font-medium block">Live Order Pipeline:</span>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {[
                { step: 1, label: 'Order Received', icon: Package, desc: 'Verified by system' },
                { step: 2, label: 'Simmering & BBQ', icon: ChefHat, desc: 'Live coal pit prep' },
                { step: 3, label: 'Ready & Packed', icon: CheckCircle2, desc: 'Thermal insulated pack' },
                { step: 4, label: 'Out for Dispatch', icon: Truck, desc: 'Rider on the road' },
              ].map(s => {
                const Icon = s.icon;
                const isPassed = currentStep >= s.step;
                const isCurrent = currentStep === s.step;

                return (
                  <div 
                    key={s.step} 
                    className={`p-4 rounded-2xl border transition-all ${
                      isCurrent 
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 ring-1 ring-amber-500/20' 
                        : isPassed
                          ? 'bg-stone-950/80 border-emerald-500/30 text-emerald-400'
                          : 'bg-stone-950/40 border-stone-800 text-stone-600'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-bold">{s.label}</span>
                    </div>
                    <p className="text-[10px] text-stone-400">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Items Breakdown */}
          <div className="space-y-3">
            <span className="text-xs text-stone-400 font-medium block">Order Breakdown:</span>
            <div className="space-y-2 bg-stone-950/60 p-4 rounded-2xl border border-stone-800/80 text-xs">
              {activeOrder.items.map((it, idx) => (
                <div key={idx} className="flex items-center justify-between text-stone-300">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-amber-400 font-bold">{it.quantity}x</span>
                    <span>{it.menuItem.name}</span>
                    {it.selectedVariant && (
                      <span className="text-[10px] text-stone-400">({it.selectedVariant.name})</span>
                    )}
                  </div>
                  <span className="font-mono font-semibold text-white">
                    PKR {it.calculatedPrice.toLocaleString()}
                  </span>
                </div>
              ))}

              <div className="pt-3 mt-2 border-t border-stone-800 flex items-center justify-between font-mono">
                <span className="text-stone-400">Total Bill Paid:</span>
                <span className="text-base font-bold text-amber-400">
                  PKR {activeOrder.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Need help or dispute */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-800 text-xs text-stone-400">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Branch Hotline: <strong className="text-white font-mono">{branch.phone}</strong></span>
            </div>

            <button
              onClick={onOpenDutyManager}
              className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2"
            >
              Contact Duty Manager for this Order &rarr;
            </button>
          </div>

        </div>
      ) : (
        <div className="text-center p-12 bg-stone-900 border border-stone-800 rounded-3xl space-y-3">
          <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
          <h3 className="font-bold text-white text-base">No order found with this identifier</h3>
          <p className="text-xs text-stone-400">Please check your Order ID and try again, or place a new order.</p>
          <button
            onClick={onNavigateToMenu}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
          >
            Explore Menu &amp; Order
          </button>
        </div>
      )}

    </div>
  );
};
