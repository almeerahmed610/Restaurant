import React, { useState } from 'react';
import { 
  BranchId, 
  BranchInfo, 
  RestaurantOrder, 
  OrderStatus, 
  BranchStock, 
  MenuItem, 
  ComplaintTicket 
} from '../types';
import { DashboardTab } from './DashboardTab';
import { KitchenPipeline } from './KitchenPipeline';
import { InventoryDashboard } from './InventoryDashboard';
import { ComplaintsDesk } from './ComplaintsDesk';
import { 
  BarChart3, 
  ChefHat, 
  Boxes, 
  MessageSquareWarning, 
  ShieldCheck, 
  ArrowLeft,
  SlidersHorizontal,
  Flame
} from 'lucide-react';

interface StaffPortalViewProps {
  currentBranch: BranchId;
  branches: Record<BranchId, BranchInfo>;
  orders: RestaurantOrder[];
  stockRecords: BranchStock[];
  stockSummary: any;
  menuItems: MenuItem[];
  tickets: ComplaintTicket[];
  onSelectBranch: (branchId: BranchId) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onReleasePreOrder: (orderId: string) => void;
  onAdjustStock: (branchId: BranchId, ingredientId: string, adjustmentDelta: number) => void;
  onReceiveDelivery: (branchId: BranchId, ingredientId: string, amount: number) => void;
  onAddTicket: (ticket: ComplaintTicket) => void;
  onResolveTicket: (ticketId: string, resolution: string) => void;
  onBackToWebsite: () => void;
}

export const StaffPortalView: React.FC<StaffPortalViewProps> = ({
  currentBranch,
  branches,
  orders,
  stockRecords,
  stockSummary,
  menuItems,
  tickets,
  onSelectBranch,
  onUpdateOrderStatus,
  onReleasePreOrder,
  onAdjustStock,
  onReceiveDelivery,
  onAddTicket,
  onResolveTicket,
  onBackToWebsite
}) => {
  const [subTab, setSubTab] = useState<'dashboard' | 'kitchen' | 'inventory' | 'complaints'>('dashboard');

  return (
    <div className="space-y-6 pb-16">
      
      {/* Portal Top Bar */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToWebsite}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Website</span>
          </button>
          <div className="h-4 w-px bg-stone-700 hidden sm:block"></div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">Restaurant Operations &amp; Management Portal</span>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-mono font-bold">
                Staff Only
              </span>
            </div>
            <p className="text-[11px] text-stone-400">
              Active Branch: <strong className="text-stone-200">{branches[currentBranch].name}</strong> ({branches[currentBranch].code})
            </p>
          </div>
        </div>

        {/* Sub-tab navigation */}
        <div className="flex flex-wrap items-center gap-1.5 bg-stone-950 p-1.5 rounded-xl border border-stone-800">
          <button
            onClick={() => setSubTab('dashboard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              subTab === 'dashboard'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setSubTab('kitchen')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              subTab === 'kitchen'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span>Kitchen KDS</span>
          </button>

          <button
            onClick={() => setSubTab('inventory')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              subTab === 'inventory'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Boxes className="w-3.5 h-3.5" />
            <span>Inventory &amp; ATP</span>
          </button>

          <button
            onClick={() => setSubTab('complaints')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              subTab === 'complaints'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <MessageSquareWarning className="w-3.5 h-3.5" />
            <span>Duty Manager Desk</span>
          </button>
        </div>
      </div>

      {/* Portal Active View */}
      <div>
        {subTab === 'dashboard' && (
          <DashboardTab
            currentBranch={currentBranch}
            branches={branches}
            orders={orders}
            menuItems={menuItems}
            onSelectBranch={onSelectBranch}
          />
        )}

        {subTab === 'kitchen' && (
          <KitchenPipeline
            orders={orders}
            currentBranch={currentBranch}
            branches={branches}
            onUpdateOrderStatus={onUpdateOrderStatus}
            onReleasePreOrder={onReleasePreOrder}
          />
        )}

        {subTab === 'inventory' && (
          <InventoryDashboard
            currentBranch={currentBranch}
            branches={branches}
            stockRecords={stockRecords}
            stockSummary={stockSummary}
            menuItems={menuItems}
            onAdjustStock={onAdjustStock}
            onReceiveDelivery={onReceiveDelivery}
          />
        )}

        {subTab === 'complaints' && (
          <ComplaintsDesk
            currentBranch={currentBranch}
            branches={branches}
            tickets={tickets}
            onAddTicket={onAddTicket}
            onResolveTicket={onResolveTicket}
          />
        )}
      </div>

    </div>
  );
};
