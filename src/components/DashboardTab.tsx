import React, { useState, useMemo } from 'react';
import { BranchId, BranchInfo, RestaurantOrder, MenuItem } from '../types';
import { 
  HOURLY_ANALYTICS, 
  SEVEN_DAYS_ANALYTICS, 
  CATEGORY_ANALYTICS, 
  CHANNEL_ANALYTICS,
  TOP_DISHES_PECHS,
  TOP_DISHES_GULSHAN
} from '../data/analyticsData';
import { DailyOrderVolumeChart } from './DailyOrderVolumeChart';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  ComposedChart,
  ReferenceLine,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  TrendingUp, 
  ShoppingBag, 
  Calendar, 
  Clock, 
  PieChart as PieChartIcon, 
  BarChart3, 
  MapPin, 
  ArrowUpRight, 
  DollarSign, 
  Sparkles,
  Flame,
  Award
} from 'lucide-react';

interface DashboardTabProps {
  currentBranch: BranchId;
  branches: Record<BranchId, BranchInfo>;
  orders: RestaurantOrder[];
  menuItems?: MenuItem[];
  onSelectBranch: (branchId: BranchId) => void;
}

type BranchFilter = 'all' | BranchId;
type TimeRange = '24h' | '7d';

export const DashboardTab: React.FC<DashboardTabProps> = ({
  currentBranch,
  branches,
  orders,
  menuItems,
  onSelectBranch
}) => {
  const [selectedBranchFilter, setSelectedBranchFilter] = useState<BranchFilter>(currentBranch);
  const [timeRange, setTimeRange] = useState<TimeRange>('24h');
  const [categoryMetric, setCategoryMetric] = useState<'orders' | 'revenue'>('revenue');

  // Sync selected branch filter if external branch changed
  React.useEffect(() => {
    if (selectedBranchFilter !== 'all') {
      setSelectedBranchFilter(currentBranch);
    }
  }, [currentBranch]);

  // Aggregate high-level stats
  const stats = useMemo(() => {
    let totalOrders = 0;
    let totalRevenue = 0;

    if (timeRange === '24h') {
      HOURLY_ANALYTICS.forEach(h => {
        if (selectedBranchFilter === 'UTG-KHI-001') {
          totalOrders += h.pechsOrders;
          totalRevenue += h.pechsRevenue;
        } else if (selectedBranchFilter === 'UTG-KHI-002') {
          totalOrders += h.gulshanOrders;
          totalRevenue += h.gulshanRevenue;
        } else {
          totalOrders += h.totalOrders;
          totalRevenue += h.totalRevenue;
        }
      });
    } else {
      SEVEN_DAYS_ANALYTICS.forEach(d => {
        if (selectedBranchFilter === 'UTG-KHI-001') {
          totalOrders += d.pechsOrders;
          totalRevenue += d.pechsRevenue;
        } else if (selectedBranchFilter === 'UTG-KHI-002') {
          totalOrders += d.gulshanOrders;
          totalRevenue += d.gulshanRevenue;
        } else {
          totalOrders += d.totalOrders;
          totalRevenue += d.totalRevenue;
        }
      });
    }

    const aov = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    return {
      totalOrders,
      totalRevenue,
      aov,
      topCategory: 'Pakistani cuisine',
      preOrderPct: '8.4%'
    };
  }, [selectedBranchFilter, timeRange]);

  // Normalized time volume data for Recharts AreaChart
  const volumeChartData = useMemo(() => {
    if (timeRange === '24h') {
      return HOURLY_ANALYTICS.map(h => ({
        label: h.time,
        pechsOrders: h.pechsOrders,
        gulshanOrders: h.gulshanOrders,
        totalOrders: h.totalOrders,
        pechsRevenue: h.pechsRevenue,
        gulshanRevenue: h.gulshanRevenue,
        totalRevenue: h.totalRevenue
      }));
    }
    return SEVEN_DAYS_ANALYTICS.map(d => ({
      label: d.day,
      pechsOrders: d.pechsOrders,
      gulshanOrders: d.gulshanOrders,
      totalOrders: d.totalOrders,
      pechsRevenue: d.pechsRevenue,
      gulshanRevenue: d.gulshanRevenue,
      totalRevenue: d.totalRevenue
    }));
  }, [timeRange]);

  // Dedicated calculations for the currently selected branch's 7-day daily order volume & trend line
  const selectedBranchSevenDayTrend = useMemo(() => {
    const isPechs = selectedBranchFilter === 'UTG-KHI-001';
    const isGulshan = selectedBranchFilter === 'UTG-KHI-002';
    const branchName = isPechs 
      ? 'PECHS Flagship Branch (UTG-KHI-001)'
      : isGulshan
      ? 'Gulshan-e-Iqbal Mega Branch (UTG-KHI-002)'
      : 'All Branches Combined (Karachi Total)';
    
    const branchColor = isPechs ? '#f59e0b' : isGulshan ? '#f97316' : '#10b981';

    const points = SEVEN_DAYS_ANALYTICS.map(item => {
      const ordersCount = isPechs 
        ? item.pechsOrders 
        : isGulshan 
        ? item.gulshanOrders 
        : item.totalOrders;
      const revenueAmount = isPechs 
        ? item.pechsRevenue 
        : isGulshan 
        ? item.gulshanRevenue 
        : item.totalRevenue;
      return {
        date: item.date,
        day: item.day,
        label: `${item.day}`,
        fullDate: item.date,
        dailyOrders: ordersCount,
        dailyRevenue: revenueAmount
      };
    });

    const totalOrders = points.reduce((sum, p) => sum + p.dailyOrders, 0);
    const totalRevenue = points.reduce((sum, p) => sum + p.dailyRevenue, 0);
    const avgDailyOrders = Math.round(totalOrders / points.length);
    const peakPoint = points.reduce((max, p) => p.dailyOrders > max.dailyOrders ? p : max, points[0]);
    const firstDay = points[0]?.dailyOrders || 1;
    const lastDay = points[points.length - 1]?.dailyOrders || 1;
    const weeklyGrowthPct = Number((((lastDay - firstDay) / firstDay) * 100).toFixed(1));

    return {
      branchName,
      branchColor,
      isPechs,
      isGulshan,
      points,
      totalOrders,
      totalRevenue,
      avgDailyOrders,
      peakPoint,
      weeklyGrowthPct
    };
  }, [selectedBranchFilter]);

  // Transform Category Data for the Bar and Pie charts
  const categoryChartData = useMemo(() => {
    return CATEGORY_ANALYTICS.map(cat => {
      let ordersValue = cat.totalOrders;
      let revenueValue = cat.totalRevenue;

      if (selectedBranchFilter === 'UTG-KHI-001') {
        ordersValue = cat.pechsOrders;
        revenueValue = cat.pechsRevenue;
      } else if (selectedBranchFilter === 'UTG-KHI-002') {
        ordersValue = cat.gulshanOrders;
        revenueValue = cat.gulshanRevenue;
      }

      return {
        name: cat.category.replace(' & continental', '').replace(' & fast food', ''),
        categoryFullName: cat.category,
        orders: ordersValue,
        revenue: revenueValue,
        pechsOrders: cat.pechsOrders,
        gulshanOrders: cat.gulshanOrders,
        pechsRevenue: cat.pechsRevenue,
        gulshanRevenue: cat.gulshanRevenue,
        color: cat.color
      };
    }).sort((a, b) => (categoryMetric === 'revenue' ? b.revenue - a.revenue : b.orders - a.orders));
  }, [selectedBranchFilter, categoryMetric]);

  // Channel share data
  const channelData = useMemo(() => {
    return CHANNEL_ANALYTICS.map(ch => {
      const count = selectedBranchFilter === 'UTG-KHI-001'
        ? ch.pechsCount
        : selectedBranchFilter === 'UTG-KHI-002'
        ? ch.gulshanCount
        : ch.totalCount;
      return {
        name: ch.channel,
        value: count,
        color: ch.color
      };
    });
  }, [selectedBranchFilter]);

  // Top dishes data
  const topDishes = selectedBranchFilter === 'UTG-KHI-002'
    ? TOP_DISHES_GULSHAN
    : TOP_DISHES_PECHS;

  // Custom tooltips for dark UI
  const CustomVolumeTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-stone-900 border border-stone-700 p-3 rounded-xl shadow-2xl text-xs space-y-1">
          <p className="font-bold text-white mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                {entry.name}:
              </span>
              <span className="font-mono font-bold text-white">
                {entry.value.toLocaleString()} orders
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomCategoryTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-stone-900 border border-stone-700 p-3 rounded-xl shadow-2xl text-xs space-y-1">
          <p className="font-bold text-white">{data.categoryFullName}</p>
          <p className="text-amber-400 font-mono font-bold">
            Revenue: PKR {data.revenue.toLocaleString()}
          </p>
          <p className="text-stone-300 font-mono">
            Orders: {data.orders.toLocaleString()} portions
          </p>
          {selectedBranchFilter === 'all' && (
            <div className="pt-1.5 border-t border-stone-800 text-[11px] text-stone-400 space-y-0.5">
              <div className="flex justify-between">
                <span>PECHS:</span>
                <span className="font-mono text-amber-300">PKR {data.pechsRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Gulshan:</span>
                <span className="font-mono text-orange-300">PKR {data.gulshanRevenue.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const CustomBranchTrendTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const diffFromAvg = data.dailyOrders - selectedBranchSevenDayTrend.avgDailyOrders;
      const diffSign = diffFromAvg >= 0 ? '+' : '';
      const diffPct = ((diffFromAvg / selectedBranchSevenDayTrend.avgDailyOrders) * 100).toFixed(1);

      return (
        <div className="bg-stone-900/95 border border-stone-700/80 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl text-xs space-y-1.5 min-w-[230px]">
          <div className="flex items-center justify-between border-b border-stone-800 pb-1.5">
            <span className="font-bold text-white text-sm">{data.day}day ({data.fullDate})</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
              Daily Volume
            </span>
          </div>
          <div className="flex items-center justify-between font-mono">
            <span className="text-stone-300 font-sans">Orders Volume:</span>
            <span className="font-bold text-sm" style={{ color: selectedBranchSevenDayTrend.branchColor }}>
              {data.dailyOrders.toLocaleString()} orders
            </span>
          </div>
          <div className="flex items-center justify-between font-mono text-[11px] text-stone-400">
            <span className="font-sans">Daily Revenue:</span>
            <span className="text-emerald-400 font-semibold">PKR {data.dailyRevenue.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-stone-800/80 font-mono">
            <span className="text-stone-400 font-sans">vs 7-Day Baseline:</span>
            <span className={`font-bold ${diffFromAvg >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {diffSign}{diffFromAvg} ({diffSign}{diffPct}%)
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  // Active selected branch resolution for the dedicated Dashboard charts
  const effectiveBranchId: BranchId = selectedBranchFilter === 'all' ? currentBranch : selectedBranchFilter;
  const isSelectedBranchPechs = effectiveBranchId === 'UTG-KHI-001';
  const effectiveBranchInfo = branches[effectiveBranchId] || branches[currentBranch];
  const effectiveBranchColor = isSelectedBranchPechs ? '#f59e0b' : '#f97316';

  // 1. Line Chart Data: Daily Order Volumes for the Last 7 Days for Selected Branch
  const selectedBranchDailyVolumes = useMemo(() => {
    const liveTodayOrders = orders.filter(o => o.branchId === effectiveBranchId);

    const points = SEVEN_DAYS_ANALYTICS.map((item, idx) => {
      const isToday = idx === SEVEN_DAYS_ANALYTICS.length - 1;
      const baseOrders = isSelectedBranchPechs ? item.pechsOrders : item.gulshanOrders;
      const baseRev = isSelectedBranchPechs ? item.pechsRevenue : item.gulshanRevenue;
      const liveCount = isToday ? liveTodayOrders.length : 0;
      const liveRev = isToday ? liveTodayOrders.reduce((sum, o) => sum + (o.total || 0), 0) : 0;
      const dayOrders = baseOrders + liveCount;
      const dayRevenue = baseRev + liveRev;

      return {
        date: item.date,
        day: item.day,
        label: `${item.day}`,
        fullDate: item.date,
        orders: dayOrders,
        revenue: dayRevenue
      };
    });

    const totalOrders = points.reduce((sum, d) => sum + d.orders, 0);
    const avgOrders = Math.round(totalOrders / points.length);
    const peakPoint = points.reduce((max, d) => (d.orders > max.orders ? d : max), points[0]);
    const firstOrders = points[0]?.orders || 1;
    const lastOrders = points[points.length - 1]?.orders || 1;
    const growthRate = Number((((lastOrders - firstOrders) / firstOrders) * 100).toFixed(1));

    return {
      points,
      totalOrders,
      avgOrders,
      peakPoint,
      growthRate
    };
  }, [effectiveBranchId, isSelectedBranchPechs, orders]);

  // 2. Pie Chart Data: Order Distribution by Menu Category for Selected Branch
  const selectedBranchCategoryDistribution = useMemo(() => {
    const categoryMap: Record<string, { category: string; orders: number; revenue: number; color: string }> = {};

    CATEGORY_ANALYTICS.forEach(cat => {
      categoryMap[cat.category] = {
        category: cat.category,
        orders: isSelectedBranchPechs ? cat.pechsOrders : cat.gulshanOrders,
        revenue: isSelectedBranchPechs ? cat.pechsRevenue : cat.gulshanRevenue,
        color: cat.color
      };
    });

    // Merge live orders for this branch
    const branchOrders = orders.filter(o => o.branchId === effectiveBranchId);
    branchOrders.forEach(o => {
      o.items.forEach(it => {
        const cat = it.menuItem?.category || 'Pakistani cuisine';
        if (!categoryMap[cat]) {
          categoryMap[cat] = {
            category: cat,
            orders: 0,
            revenue: 0,
            color: '#f59e0b'
          };
        }
        categoryMap[cat].orders += it.quantity;
        categoryMap[cat].revenue += it.calculatedPrice || (it.quantity * it.menuItem.price);
      });
    });

    const list = Object.values(categoryMap);
    const grandTotalOrders = list.reduce((sum, c) => sum + c.orders, 0);

    return list.map(c => ({
      ...c,
      percentage: grandTotalOrders > 0 ? Number(((c.orders / grandTotalOrders) * 100).toFixed(1)) : 0
    })).sort((a, b) => b.orders - a.orders);
  }, [effectiveBranchId, isSelectedBranchPechs, orders]);

  const CustomBranchDailyOrderLineTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-stone-900/95 border border-stone-700/80 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl text-xs space-y-1.5 min-w-[210px]">
          <div className="flex items-center justify-between border-b border-stone-800 pb-1.5">
            <span className="font-bold text-white text-sm">{data.day}day ({data.fullDate})</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
              7-Day Volume
            </span>
          </div>
          <div className="flex items-center justify-between font-mono">
            <span className="text-stone-300 font-sans">Daily Orders:</span>
            <span className="font-bold text-sm" style={{ color: effectiveBranchColor }}>
              {data.orders.toLocaleString()} orders
            </span>
          </div>
          <div className="flex items-center justify-between font-mono text-[11px] text-stone-400">
            <span className="font-sans">Daily Revenue:</span>
            <span className="text-emerald-400 font-semibold">PKR {data.revenue.toLocaleString()}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomBranchCategoryPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-stone-900/95 border border-stone-700/80 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl text-xs space-y-1.5 min-w-[220px]">
          <div className="flex items-center gap-2 border-b border-stone-800 pb-1.5">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: data.color }}></span>
            <span className="font-bold text-white text-sm">{data.category}</span>
          </div>
          <div className="flex items-center justify-between font-mono">
            <span className="text-stone-300 font-sans">Orders Portions:</span>
            <span className="font-bold text-sm text-amber-400">
              {data.orders.toLocaleString()} portions
            </span>
          </div>
          <div className="flex items-center justify-between font-mono">
            <span className="text-stone-300 font-sans">Branch Share:</span>
            <span className="font-bold text-white">{data.percentage}%</span>
          </div>
          <div className="flex items-center justify-between font-mono text-[11px] text-stone-400">
            <span className="font-sans">Sales Value:</span>
            <span className="text-emerald-400 font-semibold">PKR {data.revenue.toLocaleString()}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-stone-900 border border-stone-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <BarChart3 className="w-4 h-4" />
            <span>Executive Operations &amp; Performance Intelligence</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Restaurant Operations Dashboard
          </h2>
          <p className="text-xs text-stone-400">
            Real-time multi-branch order throughput, peak Karachi dining hours, and menu revenue distribution.
          </p>
        </div>

        {/* View Selectors */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Branch Filter */}
          <div className="flex items-center bg-stone-950 border border-stone-800 p-1 rounded-xl">
            <button
              onClick={() => setSelectedBranchFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedBranchFilter === 'all'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              All Branches
            </button>
            <button
              onClick={() => {
                setSelectedBranchFilter('UTG-KHI-001');
                onSelectBranch('UTG-KHI-001');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedBranchFilter === 'UTG-KHI-001'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              PECHS (001)
            </button>
            <button
              onClick={() => {
                setSelectedBranchFilter('UTG-KHI-002');
                onSelectBranch('UTG-KHI-002');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedBranchFilter === 'UTG-KHI-002'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Gulshan (002)
            </button>
          </div>

          {/* Timeframe Filter */}
          <div className="flex items-center bg-stone-950 border border-stone-800 p-1 rounded-xl">
            <button
              onClick={() => setTimeRange('24h')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                timeRange === '24h'
                  ? 'bg-stone-800 text-white font-bold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              24 Hours
            </button>
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                timeRange === '7d'
                  ? 'bg-stone-800 text-white font-bold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              7 Days
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-1">
          <div className="flex items-center justify-between text-stone-400 text-xs">
            <span>Gross Sales</span>
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <p className="font-mono font-bold text-xl sm:text-2xl text-white">
            PKR {stats.totalRevenue.toLocaleString()}
          </p>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            +14.2% vs previous period
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-1">
          <div className="flex items-center justify-between text-stone-400 text-xs">
            <span>Orders Dispatched</span>
            <span className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
              <ShoppingBag className="w-4 h-4" />
            </span>
          </div>
          <p className="font-mono font-bold text-xl sm:text-2xl text-white">
            {stats.totalOrders.toLocaleString()}
          </p>
          <p className="text-[11px] text-stone-400">
            Across 5 fulfillment channels
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-1">
          <div className="flex items-center justify-between text-stone-400 text-xs">
            <span>Average Order Value</span>
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <p className="font-mono font-bold text-xl sm:text-2xl text-white">
            PKR {stats.aov.toLocaleString()}
          </p>
          <p className="text-[11px] text-stone-400">
            Driven by Family BBQ Platters
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-1">
          <div className="flex items-center justify-between text-stone-400 text-xs">
            <span>Top Performing</span>
            <span className="p-1.5 rounded-lg bg-red-500/10 text-red-400">
              <Flame className="w-4 h-4" />
            </span>
          </div>
          <p className="font-serif font-bold text-lg sm:text-xl text-amber-400 truncate">
            {stats.topCategory}
          </p>
          <p className="text-[11px] text-stone-400">
            Karahi &amp; Biryani Lead Sales
          </p>
        </div>
      </div>

      {/* Selected Branch Overview: 7-Day Daily Order Volume & Category Distribution */}
      <section className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-6 shadow-xl relative overflow-hidden">
        {/* Branch decorative background glow */}
        <div 
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ backgroundColor: effectiveBranchColor }}
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <TrendingUp className="w-4 h-4" />
              <span>Branch Operational Performance &bull; {effectiveBranchInfo.code}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2.5">
              <span>{effectiveBranchInfo.name}</span>
              <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full border border-stone-700 bg-stone-950 text-stone-300">
                Selected Branch
              </span>
            </h3>
            <p className="text-xs text-stone-400">
              Showing 7-day daily order volumes line chart and category order distribution pie chart for {effectiveBranchInfo.name}.
            </p>
          </div>

          {/* Quick Branch Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 font-medium hidden sm:inline">Active Branch:</span>
            <div className="flex items-center bg-stone-950 border border-stone-800 p-1 rounded-xl">
              <button
                onClick={() => {
                  setSelectedBranchFilter('UTG-KHI-001');
                  onSelectBranch('UTG-KHI-001');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  effectiveBranchId === 'UTG-KHI-001'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                PECHS (001)
              </button>
              <button
                onClick={() => {
                  setSelectedBranchFilter('UTG-KHI-002');
                  onSelectBranch('UTG-KHI-002');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  effectiveBranchId === 'UTG-KHI-002'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Gulshan (002)
              </button>
            </div>
          </div>
        </div>

        {/* Selected Branch Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/80 space-y-1">
            <span className="text-[11px] text-stone-400 uppercase font-semibold">7-Day Total Orders</span>
            <p className="text-xl sm:text-2xl font-mono font-bold text-white">
              {selectedBranchDailyVolumes.totalOrders.toLocaleString()}
            </p>
            <p className="text-[10px] text-stone-400 font-mono">Past 7 days throughput</p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/80 space-y-1">
            <span className="text-[11px] text-stone-400 uppercase font-semibold">Daily Average</span>
            <p className="text-xl sm:text-2xl font-mono font-bold" style={{ color: effectiveBranchColor }}>
              {selectedBranchDailyVolumes.avgOrders.toLocaleString()} <span className="text-xs font-normal text-stone-400">/ day</span>
            </p>
            <p className="text-[10px] text-stone-400 font-mono">Mean daily order count</p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/80 space-y-1">
            <span className="text-[11px] text-stone-400 uppercase font-semibold">Peak Day Volume</span>
            <p className="text-xl sm:text-2xl font-mono font-bold text-amber-300">
              {selectedBranchDailyVolumes.peakPoint.day} ({selectedBranchDailyVolumes.peakPoint.orders})
            </p>
            <p className="text-[10px] text-stone-400 font-mono">{selectedBranchDailyVolumes.peakPoint.date}</p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/80 space-y-1">
            <span className="text-[11px] text-stone-400 uppercase font-semibold">Top Category</span>
            <p className="text-base sm:text-lg font-bold text-emerald-400 truncate">
              {selectedBranchCategoryDistribution[0]?.category || 'Pakistani cuisine'}
            </p>
            <p className="text-[10px] text-stone-400 font-mono">
              {selectedBranchCategoryDistribution[0]?.percentage || 0}% share of branch orders
            </p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-1">
          
          {/* Chart A: Line Chart showing Daily Order Volumes for Last 7 Days (7 cols) */}
          <div className="lg:col-span-7 p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-3">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  Daily Order Volumes (Last 7 Days)
                </h4>
                <p className="text-[11px] text-stone-400">
                  7-Day daily order volume line chart for {effectiveBranchInfo.name}
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Line Chart
              </span>
            </div>

            <div className="h-64 sm:h-72 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={selectedBranchDailyVolumes.points}
                  margin={{ top: 15, right: 20, left: -10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#292524" vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    stroke="#78716c" 
                    fontSize={11}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#78716c" 
                    fontSize={11}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomBranchDailyOrderLineTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: 8, fontSize: 11 }} />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    name={`${effectiveBranchInfo.name} Daily Orders`}
                    stroke={effectiveBranchColor}
                    strokeWidth={3}
                    dot={{ 
                      r: 4.5, 
                      fill: effectiveBranchColor, 
                      stroke: '#1c1917', 
                      strokeWidth: 2 
                    }}
                    activeDot={{ 
                      r: 7, 
                      fill: '#ffffff', 
                      stroke: effectiveBranchColor, 
                      strokeWidth: 3 
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart B: Pie Chart showing Order Distribution by Menu Category (5 cols) */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div>
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <PieChartIcon className="w-4 h-4 text-amber-400" />
                    Order Distribution by Menu Category
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    Category order portions distribution for {effectiveBranchInfo.name}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Pie Chart
                </span>
              </div>

              <div className="h-56 sm:h-60 w-full pt-2 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={selectedBranchCategoryDistribution}
                      dataKey="orders"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={3}
                    >
                      {selectedBranchCategoryDistribution.map((entry, index) => (
                        <Cell key={`cat-pie-cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomBranchCategoryPieTooltip />} />
                    <Legend wrapperStyle={{ paddingTop: 6, fontSize: 10 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Categories Breakdown Grid */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-800/80 text-[11px]">
              {selectedBranchCategoryDistribution.slice(0, 4).map((cat, idx) => (
                <div key={idx} className="flex items-center justify-between p-1.5 rounded-lg bg-stone-900 border border-stone-800">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }}></span>
                    <span className="text-stone-300 truncate">{cat.category.split(' ')[0]}</span>
                  </div>
                  <span className="font-mono text-amber-400 font-semibold">{cat.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Chart 1: Order Volume Over Time */}
      <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-4">
          <div>
            <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              Order Volume Over Time ({timeRange === '24h' ? '24/7 Hourly Rhythm' : 'Last 7 Days'})
            </h3>
            <p className="text-xs text-stone-400">
              Notice the distinctive Karachi midnight surge (11:00 PM – 2:00 AM) and lunch Karahi rush.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              PECHS Flagship
            </span>
            <span className="flex items-center gap-1.5 text-orange-400">
              <span className="w-3 h-3 rounded-full bg-orange-500"></span>
              Gulshan-e-Iqbal
            </span>
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={volumeChartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="pechsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="gulshanGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#292524" vertical={false} />
              <XAxis 
                dataKey="label" 
                stroke="#78716c" 
                fontSize={11}
                tickLine={false}
              />
              <YAxis 
                stroke="#78716c" 
                fontSize={11}
                tickLine={false}
              />
              <Tooltip content={<CustomVolumeTooltip />} />
              
              {selectedBranchFilter === 'all' || selectedBranchFilter === 'UTG-KHI-001' ? (
                <Area
                  type="monotone"
                  dataKey="pechsOrders"
                  name="PECHS Orders"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#pechsGradient)"
                />
              ) : null}

              {selectedBranchFilter === 'all' || selectedBranchFilter === 'UTG-KHI-002' ? (
                <Area
                  type="monotone"
                  dataKey="gulshanOrders"
                  name="Gulshan Orders"
                  stroke="#f97316"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#gulshanGradient)"
                />
              ) : null}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Dedicated 7-Day Daily Order Volume by Branch Component */}
      <DailyOrderVolumeChart 
        currentBranch={selectedBranchFilter} 
        onSelectBranch={onSelectBranch} 
      />

      {/* Row 3: New Section - Selected Branch 7-Day Order Volume Calculation & Recharts Trend Line */}
      <section className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-6 shadow-xl relative overflow-hidden">
        {/* Ambient branch glow */}
        <div 
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ backgroundColor: selectedBranchSevenDayTrend.branchColor }}
        />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <TrendingUp className="w-4 h-4" />
              <span>Branch Specific 7-Day Order Volume &amp; Trend Line</span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
              {selectedBranchSevenDayTrend.branchName}
            </h3>
            <p className="text-xs text-stone-400">
              Calculates daily order volume metrics for the active branch selection over the past 7 days with velocity trend line.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedBranchSevenDayTrend.branchColor }}></span>
              <span className="text-stone-300 font-medium">Active Branch Trend</span>
            </div>
          </div>
        </div>

        {/* Dynamically Calculated Metric Cards for Selected Branch */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/80 space-y-1">
            <span className="text-[11px] text-stone-400 uppercase font-semibold block">7-Day Total Orders</span>
            <p className="text-xl sm:text-2xl font-mono font-bold text-white">
              {selectedBranchSevenDayTrend.totalOrders.toLocaleString()}
            </p>
            <p className="text-[10px] text-stone-400 font-mono">
              Sum of Mon–Sun daily orders
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/80 space-y-1">
            <span className="text-[11px] text-stone-400 uppercase font-semibold block">Daily Average Volume</span>
            <p className="text-xl sm:text-2xl font-mono font-bold" style={{ color: selectedBranchSevenDayTrend.branchColor }}>
              {selectedBranchSevenDayTrend.avgDailyOrders.toLocaleString()} <span className="text-xs font-normal text-stone-400">/ day</span>
            </p>
            <p className="text-[10px] text-stone-400 font-mono">
              Mean daily fulfillment pace
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/80 space-y-1">
            <span className="text-[11px] text-stone-400 uppercase font-semibold block">Peak Day Volume</span>
            <p className="text-xl sm:text-2xl font-serif font-bold text-amber-300">
              {selectedBranchSevenDayTrend.peakPoint.day}day ({selectedBranchSevenDayTrend.peakPoint.dailyOrders})
            </p>
            <p className="text-[10px] text-emerald-400 font-mono">
              PKR {(selectedBranchSevenDayTrend.peakPoint.dailyRevenue / 1000000).toFixed(2)}M sales
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/80 space-y-1">
            <span className="text-[11px] text-stone-400 uppercase font-semibold block">Weekly Trajectory</span>
            <p className="text-xl sm:text-2xl font-mono font-bold text-emerald-400 flex items-center gap-1">
              <ArrowUpRight className="w-5 h-5" />
              +{selectedBranchSevenDayTrend.weeklyGrowthPct}%
            </p>
            <p className="text-[10px] text-stone-400 font-mono">
              Monday to Sunday surge
            </p>
          </div>
        </div>

        {/* Recharts Trend Line Canvas */}
        <div className="h-72 w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={selectedBranchSevenDayTrend.points}
              margin={{ top: 15, right: 20, left: -10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="selectedBranchAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={selectedBranchSevenDayTrend.branchColor} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={selectedBranchSevenDayTrend.branchColor} stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#292524" vertical={false} />
              <XAxis 
                dataKey="label" 
                stroke="#78716c" 
                fontSize={11}
                tickLine={false}
              />
              <YAxis 
                stroke="#78716c" 
                fontSize={11}
                tickLine={false}
              />
              <Tooltip content={<CustomBranchTrendTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 10, fontSize: 11 }} />
              
              {/* Shading below the trend line */}
              <Area
                type="monotone"
                dataKey="dailyOrders"
                fill="url(#selectedBranchAreaGradient)"
                stroke="none"
              />

              {/* Baseline Reference Line for 7-Day Average */}
              <ReferenceLine 
                y={selectedBranchSevenDayTrend.avgDailyOrders} 
                stroke="#78716c" 
                strokeDasharray="4 4"
                label={{ 
                  value: `Avg: ${selectedBranchSevenDayTrend.avgDailyOrders}`, 
                  fill: '#a8a29e', 
                  fontSize: 10, 
                  position: 'insideTopRight' 
                }}
              />

              {/* The Recharts Trend Line */}
              <Line
                type="monotone"
                dataKey="dailyOrders"
                name={`${selectedBranchSevenDayTrend.branchName} Daily Trend`}
                stroke={selectedBranchSevenDayTrend.branchColor}
                strokeWidth={3.5}
                dot={{ 
                  r: 5, 
                  fill: selectedBranchSevenDayTrend.branchColor, 
                  stroke: '#1c1917', 
                  strokeWidth: 2 
                }}
                activeDot={{ 
                  r: 7, 
                  fill: '#ffffff', 
                  stroke: selectedBranchSevenDayTrend.branchColor, 
                  strokeWidth: 3 
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Dynamic Branch Insight Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-stone-400 pt-3 border-t border-stone-800 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>
              7-Day cumulative turnover for this selection: <strong className="text-white font-mono">PKR {selectedBranchSevenDayTrend.totalRevenue.toLocaleString()}</strong>
            </span>
          </div>
          <span className="text-[11px] text-amber-400/90 font-mono">
            {selectedBranchSevenDayTrend.isPechs ? 'Shahrah-e-Faisal Delivery & Takeaway Hub' : selectedBranchSevenDayTrend.isGulshan ? 'Mega Group Dining & Student Banquets Hub' : 'Combined Karachi Operations'}
          </span>
        </div>
      </section>

      {/* Row 4: Top-Performing Menu Categories for each branch */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Category Performance Bar Chart (8 Cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-400" />
                Top-Performing Menu Categories
              </h3>
              <p className="text-xs text-stone-400">
                Breakdown by {categoryMetric === 'revenue' ? 'Sales Revenue (PKR)' : 'Order Volume (Portions)'}
              </p>
            </div>

            <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs">
              <button
                onClick={() => setCategoryMetric('revenue')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  categoryMetric === 'revenue' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
                }`}
              >
                Revenue (PKR)
              </button>
              <button
                onClick={() => setCategoryMetric('orders')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  categoryMetric === 'orders' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
                }`}
              >
                Portions Sold
              </button>
            </div>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryChartData}
                margin={{ top: 10, right: 10, left: -10, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#292524" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#78716c" 
                  fontSize={10}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                />
                <YAxis 
                  stroke="#78716c" 
                  fontSize={11}
                  tickFormatter={val => categoryMetric === 'revenue' ? `${(val / 1000000).toFixed(1)}M` : `${val}`}
                />
                <Tooltip content={<CustomCategoryTooltip />} />

                {selectedBranchFilter === 'all' ? (
                  <>
                    <Bar 
                      dataKey={categoryMetric === 'revenue' ? 'pechsRevenue' : 'pechsOrders'} 
                      name="PECHS Branch" 
                      fill="#f59e0b" 
                      radius={[4, 4, 0, 0]} 
                    />
                    <Bar 
                      dataKey={categoryMetric === 'revenue' ? 'gulshanRevenue' : 'gulshanOrders'} 
                      name="Gulshan Branch" 
                      fill="#f97316" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </>
                ) : (
                  <Bar 
                    dataKey={categoryMetric === 'revenue' ? 'revenue' : 'orders'} 
                    name={selectedBranchFilter === 'UTG-KHI-001' ? 'PECHS' : 'Gulshan'} 
                    fill="#f59e0b" 
                    radius={[6, 6, 0, 0]} 
                  />
                )}
                {selectedBranchFilter === 'all' && <Legend wrapperStyle={{ paddingTop: 10, fontSize: 11 }} />}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Revenue Share Donut (4 Cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-amber-400" />
              Category Share
            </h3>
            <p className="text-xs text-stone-400">
              Contribution to overall gross turnover.
            </p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="revenue"
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomCategoryTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-stone-800 text-xs">
            {categoryChartData.slice(0, 4).map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-stone-300 truncate">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }}></span>
                  <span className="truncate">{cat.name}</span>
                </span>
                <span className="font-mono text-amber-400 font-semibold">
                  PKR {(cat.revenue / 1000000).toFixed(2)}M
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Channel Fulfillment Mix & Top Selling Dishes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Fulfillment Channel Mix (6 Cols) */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4 shadow-xl">
          <div>
            <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              Fulfillment Channel Breakdown
            </h3>
            <p className="text-xs text-stone-400">
              Distribution between Dine-in, Home Delivery, OTC Takeaway, Pre-orders &amp; Foodpanda.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {channelData.map((channel, idx) => {
              const maxVal = Math.max(...channelData.map(c => c.value));
              const pct = ((channel.value / stats.totalOrders) * 100).toFixed(1);

              return (
                <div key={idx} className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-200">{channel.name}</span>
                    <span className="font-mono text-stone-400">
                      {channel.value.toLocaleString()} orders ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-stone-950 h-2.5 rounded-full overflow-hidden border border-stone-800">
                    <div 
                      className="h-full rounded-full transition-all duration-500" 
                      style={{ 
                        width: `${Math.min(100, (channel.value / maxVal) * 100)}%`,
                        backgroundColor: channel.color 
                      }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top 5 Bestselling Dishes (6 Cols) */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Top 5 Star Dishes ({selectedBranchFilter === 'UTG-KHI-002' ? 'Gulshan' : 'PECHS'})
              </h3>
              <p className="text-xs text-stone-400">
                Highest grossing dishes based on real-time kitchen tickets.
              </p>
            </div>
          </div>

          <div className="space-y-2.5 pt-1">
            {topDishes.map((dish, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800/80 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-400 font-bold flex items-center justify-center font-mono text-[11px] flex-shrink-0">
                    #{idx + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-white truncate">{dish.name}</p>
                    <p className="text-[10px] text-stone-400 font-mono">{dish.code} · {dish.portions} Portions Served</p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="font-mono font-bold text-amber-400">
                    PKR {dish.revenue.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
