import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Line, 
  ComposedChart 
} from 'recharts';
import { SEVEN_DAYS_ANALYTICS, DailyOrderData } from '../data/analyticsData';
import { BranchId } from '../types';
import { Calendar, TrendingUp, Sparkles, MapPin } from 'lucide-react';

interface DailyOrderVolumeChartProps {
  currentBranch?: BranchId | 'all';
  onSelectBranch?: (branch: BranchId) => void;
}

export const DailyOrderVolumeChart: React.FC<DailyOrderVolumeChartProps> = ({
  currentBranch = 'all',
  onSelectBranch
}) => {
  const [displayMode, setDisplayMode] = useState<'grouped' | 'stacked' | 'trend'>('grouped');

  // Compute 7-day cumulative volume summaries
  const totalPechsVolume = SEVEN_DAYS_ANALYTICS.reduce((acc, curr) => acc + curr.pechsOrders, 0);
  const totalGulshanVolume = SEVEN_DAYS_ANALYTICS.reduce((acc, curr) => acc + curr.gulshanOrders, 0);
  const grandTotalVolume = totalPechsVolume + totalGulshanVolume;
  
  // Find peak volume day
  const peakDay = SEVEN_DAYS_ANALYTICS.reduce((max, curr) => 
    curr.totalOrders > max.totalOrders ? curr : max, SEVEN_DAYS_ANALYTICS[0]
  );

  // Custom high-contrast tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data: DailyOrderData = payload[0].payload;
      const pechsPct = ((data.pechsOrders / data.totalOrders) * 100).toFixed(1);
      const gulshanPct = ((data.gulshanOrders / data.totalOrders) * 100).toFixed(1);

      return (
        <div className="bg-stone-900/95 border border-stone-700/80 backdrop-blur-md p-4 rounded-2xl shadow-2xl text-xs space-y-2.5 min-w-[240px]">
          <div className="border-b border-stone-800 pb-1.5 flex items-center justify-between">
            <span className="font-bold text-white text-sm">{data.day}day ({data.date})</span>
            <span className="text-[10px] bg-amber-500/10 text-amber-400 font-semibold px-2 py-0.5 rounded border border-amber-500/20">
              7-Day Window
            </span>
          </div>

          <div className="space-y-1.5 font-mono">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-amber-400 font-sans">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                PECHS (001):
              </span>
              <span className="font-bold text-white">
                {data.pechsOrders.toLocaleString()} orders ({pechsPct}%)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-orange-400 font-sans">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                Gulshan (002):
              </span>
              <span className="font-bold text-white">
                {data.gulshanOrders.toLocaleString()} orders ({gulshanPct}%)
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-800 flex items-center justify-between font-mono text-stone-300">
            <span className="font-sans font-bold text-white">Karachi Total:</span>
            <span className="font-bold text-amber-300 text-sm">{data.totalOrders.toLocaleString()} orders</span>
          </div>

          <div className="text-[10px] text-stone-400 pt-0.5 font-mono flex justify-between">
            <span>Daily Revenue:</span>
            <span className="text-emerald-400 font-bold">PKR {data.totalRevenue.toLocaleString()}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-5 shadow-xl">
      {/* Header and Toggle Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <Calendar className="w-4 h-4" />
            <span>Branch Performance Matrix</span>
          </div>
          <h3 className="font-serif font-bold text-lg sm:text-xl text-white">
            Daily Order Volume — Last 7 Days
          </h3>
          <p className="text-xs text-stone-400">
            Comparing daily order throughput for PECHS (UTG-KHI-001) vs. Gulshan-e-Iqbal (UTG-KHI-002).
          </p>
        </div>

        {/* Display Mode Segmented Control */}
        <div className="flex items-center bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs">
          <button
            type="button"
            onClick={() => setDisplayMode('grouped')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              displayMode === 'grouped'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Side-by-Side
          </button>
          <button
            type="button"
            onClick={() => setDisplayMode('stacked')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              displayMode === 'stacked'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Stacked Total
          </button>
          <button
            type="button"
            onClick={() => setDisplayMode('trend')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              displayMode === 'trend'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            With Trendline
          </button>
        </div>
      </div>

      {/* Quick Summary Pill Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800/80">
          <span className="text-[10px] text-stone-400 uppercase font-semibold">PECHS 7-Day Volume</span>
          <p className="text-base font-mono font-bold text-amber-400 mt-0.5">
            {totalPechsVolume.toLocaleString()} orders
          </p>
          <span className="text-[10px] text-stone-500">43.9% of total volume</span>
        </div>

        <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800/80">
          <span className="text-[10px] text-stone-400 uppercase font-semibold">Gulshan 7-Day Volume</span>
          <p className="text-base font-mono font-bold text-orange-400 mt-0.5">
            {totalGulshanVolume.toLocaleString()} orders
          </p>
          <span className="text-[10px] text-stone-500">56.1% of total volume</span>
        </div>

        <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800/80">
          <span className="text-[10px] text-stone-400 uppercase font-semibold">7-Day Combined Orders</span>
          <p className="text-base font-mono font-bold text-white mt-0.5">
            {grandTotalVolume.toLocaleString()}
          </p>
          <span className="text-[10px] text-emerald-400">Peak 2,020 on Sunday</span>
        </div>

        <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800/80">
          <span className="text-[10px] text-stone-400 uppercase font-semibold">Highest Surge Day</span>
          <p className="text-base font-serif font-bold text-amber-300 mt-0.5">
            {peakDay.day}day
          </p>
          <span className="text-[10px] text-stone-500 font-mono">PKR {(peakDay.totalRevenue / 1000000).toFixed(2)}M Sales</span>
        </div>
      </div>

      {/* Recharts Chart Canvas */}
      <div className="h-80 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {displayMode === 'trend' ? (
            <ComposedChart
              data={SEVEN_DAYS_ANALYTICS}
              margin={{ top: 15, right: 15, left: -10, bottom: 5 }}
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
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 12, fontSize: 11 }} />
              <Bar 
                dataKey="pechsOrders" 
                name="PECHS Branch" 
                fill="#f59e0b" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="gulshanOrders" 
                name="Gulshan Branch" 
                fill="#f97316" 
                radius={[4, 4, 0, 0]} 
              />
              <Line 
                type="monotone" 
                dataKey="totalOrders" 
                name="Combined Karachi Trend" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ r: 4, fill: '#10b981' }}
              />
            </ComposedChart>
          ) : (
            <BarChart
              data={SEVEN_DAYS_ANALYTICS}
              margin={{ top: 15, right: 15, left: -10, bottom: 5 }}
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
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 12, fontSize: 11 }} />
              <Bar 
                dataKey="pechsOrders" 
                name="PECHS Branch (UTG-KHI-001)" 
                fill="#f59e0b" 
                stackId={displayMode === 'stacked' ? 'a' : undefined}
                radius={displayMode === 'stacked' ? [0, 0, 0, 0] : [6, 6, 0, 0]} 
              />
              <Bar 
                dataKey="gulshanOrders" 
                name="Gulshan Branch (UTG-KHI-002)" 
                fill="#f97316" 
                stackId={displayMode === 'stacked' ? 'a' : undefined}
                radius={[6, 6, 0, 0]} 
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Insight Footer Note */}
      <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-800">
        <span className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          <span>Weekend volumes (Fri–Sun) increase by +55% over weekday averages across both kitchens.</span>
        </span>
        <span className="text-stone-500 font-mono hidden sm:inline">Updated as of Nov 1, 2026</span>
      </div>
    </div>
  );
};
